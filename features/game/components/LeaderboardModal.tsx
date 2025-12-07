'use client';

import { useEffect, useState } from 'react';
import { X, Trophy, Medal, Award, Clock } from 'lucide-react';
import { getTopLeaderboard } from '../lib/storage';
import { LeaderboardEntry } from '@/types/game';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserId?: string;
}

export default function LeaderboardModal({ isOpen, onClose, currentUserId }: LeaderboardModalProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    if (isOpen) {
      const topEntries = getTopLeaderboard(10);
      setEntries(topEntries);
    }
  }, [isOpen]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-amber-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-500" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center font-bold text-white/70">{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-amber-500/30 to-amber-400/30 border-amber-400';
      case 2:
        return 'bg-gradient-to-r from-gray-500/20 to-gray-400/20 border-gray-400';
      case 3:
        return 'bg-gradient-to-r from-amber-600/20 to-amber-500/20 border-amber-500';
      default:
        return 'bg-white/10 border-white/30';
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 z-50 backdrop-blur-md"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border-2 border-amber-500/30">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-900/90 to-amber-800/90 backdrop-blur-md p-6 border-b-2 border-amber-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-amber-400" />
                <h2 className="text-2xl md:text-3xl font-bold text-amber-300">
                  Bảng xếp hạng
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors border border-white/20"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <p className="text-white/80 mt-2">Top 10 người chơi nhanh nhất</p>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            {entries.length === 0 ? (
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/70 text-lg">Chưa có người chơi nào</p>
                <p className="text-white/50 text-sm mt-2">Hãy là người đầu tiên!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {entries.map((entry, index) => {
                  const rank = index + 1;
                  const isCurrentUser = entry.id === currentUserId;

                  return (
                    <div
                      key={entry.id}
                      className={`
                        flex items-center gap-4 p-4 rounded-xl border-2 transition-all backdrop-blur-sm
                        ${getRankBg(rank)}
                        ${isCurrentUser ? 'ring-4 ring-amber-400 scale-105' : ''}
                      `}
                    >
                      {/* Rank */}
                      <div className="flex-shrink-0">
                        {getRankIcon(rank)}
                      </div>

                      {/* Name */}
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold truncate text-white ${rank <= 3 ? 'text-lg' : 'text-base'}`}>
                          {entry.name}
                          {isCurrentUser && (
                            <span className="ml-2 text-xs bg-amber-400 text-amber-900 px-2 py-1 rounded-full">
                              Bạn
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-white/60">{entry.date}</p>
                      </div>

                      {/* Time */}
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/30">
                        <Clock className="w-4 h-4 text-white/80" />
                        <span className="font-mono font-bold text-white">
                          {formatTime(entry.time)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
