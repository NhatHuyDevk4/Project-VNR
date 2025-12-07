'use client';

import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Stage1MultipleChoice from './components/Stage1MultipleChoice';
import GameHeader from './components/GameHeader';
import InstructionsModal from './components/InstructionsModal';
import LeaderboardModal from './components/LeaderboardModal';
import { useGameContext } from './context/GameContext';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function GamePage() {
  const { state, startGame, answerQuestion, nextQuestion } = useGameContext();
  const [showInstructions, setShowInstructions] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  if (state.stage === 'welcome') {
    return (
      <>
        <WelcomeScreen
          onStart={startGame}
          onShowInstructions={() => setShowInstructions(true)}
          onShowLeaderboard={() => setShowLeaderboard(true)}
        />
        {showInstructions && <InstructionsModal onClose={() => setShowInstructions(false)} />}
        {showLeaderboard && <LeaderboardModal onClose={() => setShowLeaderboard(false)} />}
      </>
    );
  }

  if (typeof state.stage === 'number' && state.stage >= 1 && state.stage <= 3) {
    const currentQuestion = state.selectedQuestions[state.currentQuestionIndex];

    if (!currentQuestion) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <p className="text-xl">Đang tải câu hỏi...</p>
          </div>
        </div>
      );
    }

    return (
      <>
        <GameHeader
          stage={state.stage}
          collectedPieces={state.collectedPieces.length}
          totalPieces={9} // Total puzzle pieces
          correctAnswers={state.correctAnswers}
          wrongAnswers={state.wrongAnswers}
          onPause={() => setShowInstructions(true)}
          onShowInstructions={() => setShowInstructions(true)}
        />

        {state.stage === 1 && (
          <Stage1MultipleChoice
            question={currentQuestion}
            onAnswer={answerQuestion}
            onNext={nextQuestion}
            attempts={state.attempts}
          />
        )}

        {/* Back button - Fixed position */}
        <Link
          href="/"
          className="fixed top-4 left-4 z-40 inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border-2 border-white/30 hover:border-amber-400/50 rounded-xl transition-all duration-300 hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          Thoát
        </Link>

        {showInstructions && <InstructionsModal onClose={() => setShowInstructions(false)} />}
      </>
    );
  }

  // Victory or other stages
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center text-white">
        <p className="text-2xl font-bold mb-4">Chúc mừng!</p>
        <p className="text-lg">Bạn đã hoàn thành trò chơi!</p>
      </div>
    </div>
  );
}
