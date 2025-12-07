'use client';

import { useState, useEffect } from 'react';
import { GameProvider, useGame } from '@/features/game/context/GameContext';
import WelcomeScreen from '@/features/game/components/WelcomeScreen';
import GameHeader from '@/features/game/components/GameHeader';
import Stage1MultipleChoice from '@/features/game/components/Stage1MultipleChoice';
import Stage2FillInBlank from '@/features/game/components/Stage2FillInBlank';
import Stage3PuzzleGame from '@/features/game/components/Stage3PuzzleGame';
import VictoryScreen from '@/features/game/components/VictoryScreen';
import InstructionsModal from '@/features/game/components/InstructionsModal';
import LeaderboardModal from '@/features/game/components/LeaderboardModal';
import { getInstructionsSeen } from '@/features/game/lib/storage';

function GameContent() {
  const { state, startGame, answerQuestion, nextQuestion, nextStage, resetGame, completeGame, resumeTimer } = useGame();
  const [showInstructions, setShowInstructions] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    const seen = getInstructionsSeen();
    if (!seen && state.stage === 'welcome') {
      setShowInstructions(true);
    }
  }, [state.stage]);

  useEffect(() => {
    if (state.stage === 1 || state.stage === 2) {
      const stageOffset = state.stage === 1 ? 0 : 9;
      const piecesInCurrentStage = state.collectedPieces.filter(
        p => p >= stageOffset && p < stageOffset + 9
      ).length;

      if (piecesInCurrentStage >= 9) {
        setTimeout(() => {
          nextStage();
        }, 1500);
      }
    }
  }, [state.collectedPieces, state.stage, nextStage]);

  const handleStart = () => startGame();
  const handleAnswer = (answer: string) => answerQuestion(answer);
  const handleNextQuestion = () => nextQuestion();
  const handlePause = () => setShowInstructions(true);
  const handlePlayAgain = () => resetGame();
  const handleShowLeaderboard = () => setShowLeaderboard(true);
  const handleCloseLeaderboard = () => setShowLeaderboard(false);

  const handleCloseInstructions = () => {
    setShowInstructions(false);
    if (state.stage !== 'welcome' && state.stage !== 'victory') {
      resumeTimer();
    }
  };

  const renderStage = () => {
    switch (state.stage) {
      case 'welcome':
        return (
          <WelcomeScreen
            onStart={handleStart}
            onShowInstructions={() => setShowInstructions(true)}
            onShowLeaderboard={handleShowLeaderboard}
          />
        );

      case 1:
      case 2: {
        const offset = state.stage === 1 ? 0 : 15;
        const actualIndex = offset + state.currentQuestionIndex;
        const currentQuestion = state.selectedQuestions[actualIndex];

        if (!currentQuestion) return null;

        const StageComponent = state.stage === 1 ? Stage1MultipleChoice : Stage2FillInBlank;

        return (
          <>
            <GameHeader
              stage={state.stage}
              collectedPieces={state.collectedPieces.length}
              totalPieces={18}
              correctAnswers={state.correctAnswers}
              wrongAnswers={state.wrongAnswers}
              onPause={handlePause}
              onShowInstructions={() => setShowInstructions(true)}
            />
            <StageComponent
              question={currentQuestion}
              onAnswer={handleAnswer}
              onNext={handleNextQuestion}
              attempts={state.attempts}
            />
          </>
        );
      }

      case 3:
        return (
          <>
            <GameHeader
              stage={3}
              collectedPieces={state.collectedPieces.length}
              totalPieces={18}
              correctAnswers={state.correctAnswers}
              wrongAnswers={state.wrongAnswers}
              onPause={handlePause}
              onShowInstructions={() => setShowInstructions(true)}
            />
            <Stage3PuzzleGame
              collectedPieces={state.collectedPieces}
              imageId={state.selectedImageId}
              onComplete={completeGame}
            />
          </>
        );

      case 'victory':
        return (
          <VictoryScreen
            correctAnswers={state.correctAnswers}
            wrongAnswers={state.wrongAnswers}
            totalQuestions={18}
            onPlayAgain={handlePlayAgain}
            onShowLeaderboard={handleShowLeaderboard}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      {renderStage()}
      <InstructionsModal isOpen={showInstructions} onClose={handleCloseInstructions} />
      <LeaderboardModal isOpen={showLeaderboard} onClose={handleCloseLeaderboard} />
    </>
  );
}

export default function GamePage() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}
