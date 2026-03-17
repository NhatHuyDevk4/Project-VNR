"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  src: string;
  title?: string;
}

export default function AudioPlayer({ src, title }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full">
      <div className="border border-ink/15 bg-[#f8efdc] p-4 shadow-sm">
        <div className="mb-4 border-b border-ink/10 pb-4">
          <div className="flex items-center gap-2 text-seal">
            <Volume2 className="h-4 w-4" />
            <p className="text-xs font-semibold uppercase tracking-[0.22em]">Audio dinh kem</p>
          </div>
          <h3 className="mt-2 text-base font-bold leading-6 text-ink">
            {title || "Phat audio"}
          </h3>
        </div>

        <audio ref={audioRef} src={src} preload="metadata" />

        <div className="mb-4">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="h-2 w-full cursor-pointer appearance-none border border-ink/10 bg-transparent"
            style={{
              background: `linear-gradient(to right, #8B1E1E 0%, #8B1E1E ${progress}%, rgba(43,43,43,0.12) ${progress}%, rgba(43,43,43,0.12) 100%)`,
            }}
          />
          <div className="mt-2 flex justify-between text-xs text-ink-light">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="flex h-11 w-11 items-center justify-center border border-seal bg-seal text-paper transition-colors hover:bg-[#741818]"
            aria-label={isPlaying ? "Tam dung" : "Phat"}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
          </button>

          <button
            onClick={toggleMute}
            className="flex h-11 w-11 items-center justify-center border border-ink/15 bg-white/60 text-ink transition-colors hover:border-seal/30 hover:text-seal"
            aria-label={isMuted ? "Bat tieng" : "Tat tieng"}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>

          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-seal">
              Trang thai
            </div>
            <div className="mt-1 text-sm text-ink-light">
              {isPlaying ? "Dang phat ban ghi" : "San sang phat lai"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
