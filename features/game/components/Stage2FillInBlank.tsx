'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Question, FeedbackType } from '@/types/game';
import QuestionCard from './QuestionCard';
import AnswerFeedback from './AnswerFeedback';

interface Stage2Props {
  question: Question;
  onAnswer: (answer: string) => FeedbackType;
  onNext: () => void;
  attempts: number;
}

export default function Stage2FillInBlank({ question, onAnswer, onNext, attempts }: Stage2Props) {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  useEffect(() => {
    // Reset state when question changes
    setAnswer('');
    setFeedback(null);
    setIsDisabled(false);
    setShowCorrectAnswer(false);
  }, [question.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim() || isDisabled) return;

    setIsDisabled(true);

    const result = onAnswer(answer);
    setFeedback(result);

    if (result === 'correct') {
      // Auto advance after 1.5 seconds
      setTimeout(() => {
        onNext();
      }, 1500);
    } else {
      // Check current attempts (will be incremented after onAnswer)
      const currentAttempts = attempts + 1;

      // Allow retry after 1 second if attempts < 2
      setTimeout(() => {
        if (currentAttempts < 2) {
          setIsDisabled(false);
          setAnswer('');
          setFeedback(null);
        } else {
          // Show correct answer and move on after 2 seconds
          setShowCorrectAnswer(true);
          setTimeout(() => {
            onNext();
          }, 2000);
        }
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen revolutionary-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl"
      >
        <QuestionCard question={question.content} questionNumber={question.id}>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={isDisabled}
                placeholder="Nhập đáp án..."
                className="w-full p-4 text-lg border-2 border-[#DC143C] rounded-lg focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                autoFocus
              />
            </div>

            <motion.button
              type="submit"
              disabled={!answer.trim() || isDisabled}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-revolutionary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Xác nhận
            </motion.button>
          </form>

          {feedback && (
            <AnswerFeedback
              type={feedback}
              correctAnswer={showCorrectAnswer ? question.correct_answer : undefined}
            />
          )}
        </QuestionCard>
      </motion.div>
    </div>
  );
}
