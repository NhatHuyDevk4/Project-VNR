'use client';

import { ReactNode } from 'react';

interface QuestionCardProps {
  question: string;
  questionNumber: number;
  children: ReactNode;
}

export default function QuestionCard({ question, questionNumber, children }: QuestionCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 border-2 border-amber-500/30">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-sm px-4 py-2 rounded-full shadow-lg">
            Câu {questionNumber}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
          {question}
        </h3>
      </div>

      {children}
    </div>
  );
}
