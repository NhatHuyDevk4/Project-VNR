"use client";

import { Lightbulb, X, Send } from "lucide-react";
import { useTextExplainer } from "./hooks/useTextExplainer";
import { cn } from "@/lib/utils";

interface TextExplainerUIProps {
  isEnabled?: boolean;
}

export default function TextExplainerUI({
  isEnabled = true,
}: TextExplainerUIProps) {
  const {
    selectedText,
    position,
    isVisible,
    clearSelection,
    handleExplain,
    handleAutoSend,
    isAutoSendEnabled,
  } = useTextExplainer(isEnabled);

  if (!isVisible || !position) {
    return null;
  }

  const truncated =
    selectedText.length > 80
      ? selectedText.substring(0, 80) + "…"
      : selectedText;

  return (
    <div
      data-text-explainer
      className="fixed z-[9999] animate-in fade-in slide-in-from-bottom-2 duration-200"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translateX(-50%)",
      }}
    >
      {/* Main card */}
      <div className="bg-slate-900/95 border border-amber-500/50 rounded-2xl shadow-2xl p-4 max-w-xs w-[280px]">
        {/* Selected text preview */}
        <div className="bg-amber-950/60 rounded-xl px-3 py-2.5 mb-3 border border-amber-600/30">
          <p className="text-xs text-amber-200 font-semibold leading-relaxed">
            &ldquo;{truncated}&rdquo;
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          {/* Giải thích */}
          <button
            type="button"
            onClick={handleExplain}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5",
              "rounded-xl py-2 px-3",
              "bg-amber-600 hover:bg-amber-500 active:scale-[0.98]",
              "text-white text-sm font-semibold shadow-md",
              "transition-all duration-150"
            )}
          >
            <Lightbulb className="w-4 h-4 shrink-0" />
            Giải thích
          </button>

          {/* Gửi ngay (only when auto-send is off) */}
          {!isAutoSendEnabled && (
            <button
              type="button"
              onClick={handleAutoSend}
              className={cn(
                "flex items-center justify-center gap-1",
                "rounded-xl py-2 px-3",
                "bg-emerald-700/80 hover:bg-emerald-600/90 active:scale-[0.98]",
                "border border-emerald-500/40",
                "text-emerald-100 text-sm font-semibold",
                "transition-all duration-150"
              )}
            >
              <Send className="w-3.5 h-3.5 shrink-0" />
              Gửi
            </button>
          )}

          {/* Close */}
          <button
            type="button"
            onClick={clearSelection}
            className={cn(
              "shrink-0 w-9 h-9 rounded-xl flex items-center justify-center",
              "bg-white/5 hover:bg-white/10 text-amber-400/70 hover:text-amber-200",
              "transition-all duration-150 active:scale-95"
            )}
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tooltip arrow pointing up */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-2">
        <div className="w-0 h-0 border-l-[7px] border-r-[7px] border-b-[7px] border-l-transparent border-r-transparent border-b-slate-900/95" />
      </div>
    </div>
  );
}
