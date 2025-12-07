'use client';

import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { FeedbackType } from '@/types/game';

interface AnswerFeedbackProps {
  type: FeedbackType;
  correctAnswer?: string;
}

export default function AnswerFeedback({ type, correctAnswer }: AnswerFeedbackProps) {
  if (!type) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4"
    >
      {type === 'correct' ? (
        <div className="flex items-center gap-3 bg-green-100 border-2 border-green-500 rounded-lg p-4">
          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div>
            <p className="text-green-800 font-bold">Chính xác!</p>
            <p className="text-green-700 text-sm">Bạn đã nhận được một mảnh ghép</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 bg-red-100 border-2 border-red-500 rounded-lg p-4">
          <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-red-800 font-bold">Chưa đúng!</p>
            {correctAnswer && (
              <p className="text-red-700 text-sm mt-1">
                Đáp án đúng: <span className="font-semibold">{correctAnswer}</span>
              </p>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
