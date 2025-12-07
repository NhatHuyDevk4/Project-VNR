"use client";

import { useState, useEffect } from "react";
import {
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
  Award,
  TrendingUp,
} from "lucide-react";
import { useTimer } from "../hooks/useTimer";
import { getCurrentPlayer } from "@/lib/idb/playerIdb";

// Calculate score locally
function calculateScore(
  correctAnswers: number,
  wrongAnswers: number,
  duration: number
): number {
  return correctAnswers * 100 - wrongAnswers * 10 - Math.floor(duration / 10);
}

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
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [calculatedScore, setCalculatedScore] = useState(0);

  useEffect(() => {
    // Calculate score
    const score = calculateScore(correctAnswers, wrongAnswers, time);
    setCalculatedScore(score);

    // Auto-submit score
    submitScoreToLeaderboard();

    // Create confetti effect
    const colors = ["#F59E0B", "#D97706", "#FBBF24", "#FFF"];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 3 + "s";
      confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitScoreToLeaderboard = async () => {
    setIsSubmitting(true);
    try {
      const player = await getCurrentPlayer();
      if (!player || !player.name) {
        setError("Không tìm thấy thông tin người chơi");
        return;
      }

      const response = await fetch("/api/game", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceId: player.deviceId,
          name: player.name,
          correctAnswers,
          wrongAnswers,
          duration: time,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Không thể lưu điểm");
        return;
      }

      const result = await response.json();
      if (result.success && result.data) {
        setSaved(true);
        setIsNewRecord(result.data.is_new_record);
        setError("");
      } else {
        setError("Không thể lưu điểm");
      }
    } catch (err) {
      console.error("Error submitting score:", err);
      setError("Có lỗi xảy ra khi lưu điểm");
    } finally {
      setIsSubmitting(false);
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
          <div className="bg-linear-to-br from-amber-500 to-amber-600 p-6 rounded-full shadow-lg shadow-amber-500/50">
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border-2 border-amber-400/30">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-amber-300" />
              <span className="text-sm font-semibold text-amber-300">
                Thời gian
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{formattedTime}</p>
          </div>

          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border-2 border-green-400/30">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm font-semibold text-green-400">Đúng</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {correctAnswers}/{totalQuestions}
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border-2 border-blue-400/30 col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-semibold text-blue-400">Điểm</span>
            </div>
            <p className="text-2xl font-bold text-white">{calculatedScore}</p>
          </div>
        </div>

        {/* Status Messages */}
        {isSubmitting && (
          <div className="mb-6 bg-blue-500/20 backdrop-blur-sm border-2 border-blue-400 rounded-xl p-4 flex items-center gap-3">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-400 border-t-transparent"></div>
            <p className="text-blue-200 font-semibold">Đang lưu điểm...</p>
          </div>
        )}

        {saved && isNewRecord && (
          <div className="mb-6 bg-green-500/20 backdrop-blur-sm border-2 border-green-400 rounded-xl p-4 flex items-center gap-3">
            <Award className="w-6 h-6 text-green-400" />
            <div>
              <p className="text-green-200 font-semibold">Kỷ lục mới! 🎉</p>
              <p className="text-green-300/80 text-sm">
                Điểm của bạn đã được cập nhật
              </p>
            </div>
          </div>
        )}

        {saved && !isNewRecord && (
          <div className="mb-6 bg-amber-500/20 backdrop-blur-sm border-2 border-amber-400 rounded-xl p-4 flex items-center gap-3">
            <Award className="w-6 h-6 text-amber-400" />
            <div>
              <p className="text-amber-200 font-semibold">Đã lưu điểm!</p>
              <p className="text-amber-300/80 text-sm">
                Chưa phá kỷ lục cũ, cố gắng lần sau nhé!
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-500/20 backdrop-blur-sm border-2 border-red-400 rounded-xl p-4 flex items-center gap-3">
            <XCircle className="w-6 h-6 text-red-400" />
            <p className="text-red-200 font-semibold">{error}</p>
          </div>
        )}

        {/* Buttons */}
        <div className="space-y-3">
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
