'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';
import { addLeaderboardEntry, validatePlayerName } from '../lib/storage';
import { useTimer } from '../hooks/useTimer';

interface VictoryScreenProps {
  correctAnswers: number;
  wrongAnswers: number;
  totalQuestions: number;
  onPlayAgain: () => void;
  onShowLeaderboard: () => void;
}

export default function VictoryScreen({
  correctAnswers,
  wrongAnswers,
  totalQuestions,
  onPlayAgain,
  onShowLeaderboard,
}: VictoryScreenProps) {
  const { time, formattedTime } = useTimer();
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Create confetti effect
    const colors = ['#FFD700', '#DC143C', '#FF6B6B', '#FFF'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 3 + 's';
      confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 5000);
    }
  }, []);

  const handleSaveScore = () => {
    const validation = validatePlayerName(playerName);

    if (!validation.valid) {
      setError(validation.error || '');
      return;
    }

    const success = addLeaderboardEntry(playerName || 'Người chơi', time);

    if (success) {
      setSaved(true);
      setError('');
      setTimeout(() => {
        onShowLeaderboard();
      }, 1500);
    } else {
      setError('Không thể lưu điểm. Vui lòng thử lại.');
    }
  };

  return (
    <div className="min-h-screen revolutionary-gradient flex items-center justify-center p-4 relative overflow-hidden">
      <style jsx>{`
        .confetti {
          position: fixed;
          width: 10px;
          height: 10px;
          top: -10px;
          z-index: 100;
          animation: confetti linear forwards;
        }
        
        @keyframes confetti {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full border-4 border-[#FFD700]"
      >
        {/* Trophy Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="flex justify-center mb-6"
        >
          <div className="bg-gradient-to-br from-[#FFD700] to-[#DAA520] p-6 rounded-full">
            <Trophy className="w-20 h-20 text-white" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold text-center text-[#DC143C] mb-4"
        >
          Chúc mừng!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-600 text-lg mb-8"
        >
          Bạn đã hoàn thành trò chơi thành công!
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border-2 border-blue-300">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-800">Thời gian</span>
            </div>
            <p className="text-2xl font-bold text-blue-900">{formattedTime}</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border-2 border-green-300">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold text-green-800">Đúng</span>
            </div>
            <p className="text-2xl font-bold text-green-900">{correctAnswers}/{totalQuestions}</p>
          </div>
        </motion.div>

        {/* Name Input */}
        {!saved && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-6"
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nhập tên của bạn để lưu vào bảng xếp hạng:
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Tên của bạn (tối đa 20 ký tự)"
              maxLength={20}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/50"
            />
            {error && (
              <p className="text-red-600 text-sm mt-2">{error}</p>
            )}
          </motion.div>
        )}

        {saved && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 bg-green-100 border-2 border-green-500 rounded-lg p-4 flex items-center gap-3"
          >
            <Award className="w-6 h-6 text-green-600" />
            <p className="text-green-800 font-semibold">Đã lưu điểm thành công!</p>
          </motion.div>
        )}

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          {!saved && (
            <button
              onClick={handleSaveScore}
              className="w-full btn-revolutionary"
            >
              Lưu điểm
            </button>
          )}

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onPlayAgain}
              className="flex items-center justify-center gap-2 bg-white border-2 border-[#DC143C] text-[#DC143C] font-semibold py-3 px-6 rounded-lg hover:bg-[#DC143C] hover:text-white transition-all duration-300"
            >
              <RotateCcw className="w-5 h-5" />
              Chơi lại
            </button>

            <button
              onClick={onShowLeaderboard}
              className="flex items-center justify-center gap-2 bg-white border-2 border-[#FFD700] text-[#DC143C] font-semibold py-3 px-6 rounded-lg hover:bg-[#FFD700] hover:text-white transition-all duration-300"
            >
              <Trophy className="w-5 h-5" />
              Xếp hạng
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
