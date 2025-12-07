'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface QuestionCardProps {
  question: string;
  questionNumber: number;
  children: ReactNode;
}

export default function QuestionCard({ question, questionNumber, children }: QuestionCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-xl shadow-2xl p-6 md:p-8 border-4 border-[#FFD700]"
    >
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-gradient-to-r from-[#DC143C] to-[#8B0000] text-[#FFD700] font-bold text-sm px-4 py-2 rounded-full">
            Câu {questionNumber}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed">
          {question}
        </h3>
      </div>

      {children}
    </motion.div>
  );
}
