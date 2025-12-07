'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { GameState, Question, FeedbackType } from '@/types/game';
import questionsData from '../data/questions.json';

interface GameContextType {
  state: GameState;
  startGame: () => void;
  answerQuestion: (answer: string) => FeedbackType;
  nextQuestion: () => void;
  nextStage: () => void;
  resetGame: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  completeGame: () => void;
}

type GameAction =
  | { type: 'START_GAME'; payload: { questions: Question[] } }
  | { type: 'ANSWER_CORRECT' }
  | { type: 'ANSWER_WRONG' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'NEXT_STAGE' }
  | { type: 'RESET_GAME' }
  | { type: 'TICK_TIMER' }
  | { type: 'PAUSE_TIMER' }
  | { type: 'RESUME_TIMER' }
  | { type: 'COMPLETE_GAME' };

const initialState: GameState = {
  stage: 'welcome',
  currentQuestionIndex: 0,
  selectedQuestions: [],
  collectedPieces: [],
  attempts: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  timer: 0,
  isPaused: false,
  isTimerRunning: false,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        stage: 1,
        selectedQuestions: action.payload.questions,
        isTimerRunning: true,
      };

    case 'ANSWER_CORRECT': {
      // Calculate unique piece ID based on stage
      // Each stage has 9 pieces (0-8 for stage 1, 9-17 for stage 2)
      const offset = state.stage === 1 ? 0 : 9;
      const piecesInStage = state.collectedPieces.filter(
        p => p >= offset && p < offset + 9
      ).length;

      // Only add piece if we don't have 9 pieces yet
      const pieceId = offset + piecesInStage;
      const newCollectedPieces = piecesInStage < 9
        ? [...state.collectedPieces, pieceId]
        : state.collectedPieces;

      return {
        ...state,
        correctAnswers: state.correctAnswers + 1,
        collectedPieces: newCollectedPieces,
        attempts: 0,
      };
    }

    case 'ANSWER_WRONG':
      return {
        ...state,
        wrongAnswers: state.wrongAnswers + 1,
        attempts: state.attempts + 1,
      };

    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        attempts: 0,
      };

    case 'NEXT_STAGE':
      return {
        ...state,
        stage: (state.stage === 1 ? 2 : 3) as GameState['stage'],
        currentQuestionIndex: 0,
        attempts: 0,
      };

    case 'TICK_TIMER':
      return state.isTimerRunning && !state.isPaused
        ? { ...state, timer: state.timer + 1 }
        : state;

    case 'PAUSE_TIMER':
      return { ...state, isPaused: true };

    case 'RESUME_TIMER':
      return { ...state, isPaused: false };

    case 'COMPLETE_GAME':
      return {
        ...state,
        stage: 'victory',
        isTimerRunning: false,
      };

    case 'RESET_GAME':
      return initialState;

    default:
      return state;
  }
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Timer effect
  useEffect(() => {
    if (state.isTimerRunning && !state.isPaused) {
      const interval = setInterval(() => {
        dispatch({ type: 'TICK_TIMER' });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [state.isTimerRunning, state.isPaused]);

  const selectRandomQuestions = useCallback((count: number, type: 'MC' | 'text', excludeIds: number[]): Question[] => {
    const allQuestions = questionsData as Question[];
    const filtered = allQuestions.filter(
      q => q.type === type && !excludeIds.includes(q.id)
    );

    // Fisher-Yates shuffle
    const shuffled = [...filtered];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, count);
  }, []);

  const startGame = useCallback(() => {
    // Select more questions than needed (15 per stage) to allow for wrong answers
    const mcQuestions = selectRandomQuestions(15, 'MC', []);
    const usedIds = mcQuestions.map(q => q.id);
    const textQuestions = selectRandomQuestions(15, 'text', usedIds);
    const allQuestions = [...mcQuestions, ...textQuestions];

    dispatch({ type: 'START_GAME', payload: { questions: allQuestions } });
  }, [selectRandomQuestions]);

  const answerQuestion = useCallback((answer: string): FeedbackType => {
    // Calculate the actual index in the selectedQuestions array
    // Stage 1: 0-14 (MC), Stage 2: 15-29 (text)
    const offset = state.stage === 1 ? 0 : state.stage === 2 ? 15 : 0;
    const actualIndex = offset + state.currentQuestionIndex;
    const currentQuestion = state.selectedQuestions[actualIndex];

    if (!currentQuestion) return null;

    const normalizedAnswer = answer.trim().toLowerCase();
    const normalizedCorrect = currentQuestion.correct_answer.trim().toLowerCase();

    if (normalizedAnswer === normalizedCorrect) {
      dispatch({ type: 'ANSWER_CORRECT' });
      return 'correct';
    } else {
      dispatch({ type: 'ANSWER_WRONG' });
      return 'wrong';
    }
  }, [state.selectedQuestions, state.currentQuestionIndex, state.stage]);

  const nextQuestion = useCallback(() => {
    dispatch({ type: 'NEXT_QUESTION' });
  }, []);

  const nextStage = useCallback(() => {
    dispatch({ type: 'NEXT_STAGE' });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  const pauseTimer = useCallback(() => {
    dispatch({ type: 'PAUSE_TIMER' });
  }, []);

  const resumeTimer = useCallback(() => {
    dispatch({ type: 'RESUME_TIMER' });
  }, []);

  const completeGame = useCallback(() => {
    dispatch({ type: 'COMPLETE_GAME' });
  }, []);

  return (
    <GameContext.Provider
      value={{
        state,
        startGame,
        answerQuestion,
        nextQuestion,
        nextStage,
        resetGame,
        pauseTimer,
        resumeTimer,
        completeGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}
