"use client";

import { Lightbulb, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTextExplainer } from "./hooks/useTextExplainer";

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

  // Don't show popup if auto-send is enabled AND chat is open (text will be sent automatically)
  if (!isVisible || !position) return null;

  return (
    <div
      data-text-explainer
      className="fixed z-9999 animate-in fade-in slide-in-from-bottom-2 duration-200"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translateX(-50%)",
      }}
    >
      <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200 p-3 max-w-sm">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-linear-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center shrink-0 border border-amber-200">
            <Lightbulb className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-600 mb-2 line-clamp-2 italic">
              {selectedText}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExplain}
                className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
              >
                Giải thích
              </button>
              {!isAutoSendEnabled && (
                <>
                  <span className="text-xs text-gray-400">•</span>
                  <button
                    onClick={handleAutoSend}
                    className="text-xs font-medium text-green-600 hover:text-green-700 hover:underline flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    Gửi ngay
                  </button>
                </>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={clearSelection}
            className="shrink-0 -mt-1 -mr-1 hover:bg-gray-100 text-gray-600 h-6 w-6"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Arrow pointing up */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-2">
        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-white/95" />
      </div>
    </div>
  );
}
