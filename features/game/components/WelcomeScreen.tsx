'use client';

import { motion } from 'framer-motion';
import { Star, Trophy, HelpCircle } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
  onShowInstructions: () => void;
  onShowLeaderboard: () => void;
}

export default function WelcomeScreen({ onStart, onShowInstructions, onShowLeaderboard }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen revolutionary-gradient flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative stars */}
      <div className="absolute top-8 left-8">
        <Star className="w-16 h-16 text-[#FFD700] fill-[#FFD700]" />
      </div>
      <div className="absolute top-8 right-8">
        <Star className="w-16 h-16 text-[#FFD700] fill-[#FFD700]" />
      </div>
      <div className="absolute bottom-8 left-1/4">
        <Star className="w-12 h-12 text-[#FFD700] fill-[#FFD700] opacity-50" />
      </div>
      <div className="absolute bottom-8 right-1/4">
        <Star className="w-12 h-12 text-[#FFD700] fill-[#FFD700] opacity-50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl"
      >
        {/* Title */}
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-[#FFD700] mb-4 drop-shadow-lg"
        >
          TƯ TƯỞNG HỒ CHÍ MINH
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl md:text-3xl font-semibold text-white mb-8 px-4"
        >
          Đảng Cộng sản Việt Nam và<br />
          Nhà nước của nhân dân, do nhân dân, vì nhân dân
        </motion.h2>

        {/* Main CTA Button */}
        <motion.button

          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={onStart}
          className="btn-revolutionary text-xl md:text-2xl mb-8"
        >
          BẮT ĐẦU CHƠI
        </motion.button>

        {/* Secondary Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={onShowInstructions}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border-2 border-white/50 
                     font-semibold py-2 px-6 rounded-lg transition-all duration-300 hover:scale-105"
          >
            <HelpCircle className="w-5 h-5" />
            Hướng dẫn
          </button>

          <button
            onClick={onShowLeaderboard}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border-2 border-white/50 
                     font-semibold py-2 px-6 rounded-lg transition-all duration-300 hover:scale-105"
          >
            <Trophy className="w-5 h-5" />
            Bảng xếp hạng
          </button>
        </motion.div>

        {/* Game Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-white/80 text-lg max-w-2xl mx-auto"
        >
          Trả lời câu hỏi để thu thập mảnh ghép và hoàn thành bức tranh lịch sử!
        </motion.p>
      </motion.div>
    </div>
  );
}
