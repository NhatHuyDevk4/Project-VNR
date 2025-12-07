'use client';

import { useState, useEffect } from 'react';
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
    const colors = ['#F59E0B', '#D97706', '#FBBF24', '#FFF'];
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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
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

      <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full border-4 border-amber-500/50">
        {/* Trophy Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-full shadow-lg shadow-amber-500/50">
            <Trophy className="w-20 h-20 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-amber-300 mb-4">
          Chúc mừng!
        </h1>

        <p className="text-center text-white/80 text-lg mb-8">
          Bạn đã hoàn thành trò chơi thành công!
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border-2 border-amber-400/30">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-amber-300" />
              <span className="text-sm font-semibold text-amber-300">Thời gian</span>
            </div>
            <p className="text-2xl font-bold text-white">{formattedTime}</p>
          </div>

          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border-2 border-green-400/30">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm font-semibold text-green-400">Đúng</span>
            </div>
            <p className="text-2xl font-bold text-white">{correctAnswers}/{totalQuestions}</p>
          </div>
        </div>

        {/* Name Input */}
        {!saved && (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-white/90 mb-2">
              Nhập tên của bạn để lưu vào bảng xếp hạng:
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Tên của bạn (tối đa 20 ký tự)"
              maxLength={20}
              className="w-full p-3 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 text-white placeholder:text-white/50"
            />
            {error && (
              <p className="text-red-400 text-sm mt-2">{error}</p>
            )}
          </div>
        )}

        {saved && (
          <div className="mb-6 bg-green-500/20 backdrop-blur-sm border-2 border-green-400 rounded-xl p-4 flex items-center gap-3">
            <Award className="w-6 h-6 text-green-400" />
            <p className="text-green-200 font-semibold">Đã lưu điểm thành công!</p>
          </div>
        )}

        {/* Buttons */}
        <div className="space-y-3">
          {!saved && (
            <button
              onClick={handleSaveScore}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-amber-500/50"
            >
              Lưu điểm
            </button>
          )}

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onPlayAgain}
              className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/30 hover:border-amber-400 transition-all duration-300"
            >
              <RotateCcw className="w-5 h-5" />
              Chơi lại
            </button>

            <button
              onClick={onShowLeaderboard}
              className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm border-2 border-amber-400/50 text-white font-semibold py-3 px-6 rounded-xl hover:bg-amber-500/30 hover:border-amber-400 transition-all duration-300"
            >
              <Trophy className="w-5 h-5" />
              Xếp hạng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
