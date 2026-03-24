"use client";

import { useState, useCallback } from "react";
import { Sparkles, UtensilsCrossed, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { QUICK_SCENARIOS, QUICK_ACTION_CHIPS } from "../constants/chatQuickPrompts";

const STORAGE_KEY = "hcm-chat-quickbar-open";

interface ChatQuickBarProps {
  onFillPrompt: (text: string) => void;
  disabled?: boolean;
}

export default function ChatQuickBar({
  onFillPrompt,
  disabled,
}: Readonly<ChatQuickBarProps>) {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored === null || stored === "true";
      } catch {
      return true;
    }
  });

  const toggle = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const chipClass = cn(
    "shrink-0 rounded-lg px-2.5 py-1.5 text-xs text-left leading-snug",
    "bg-amber-900/50 border border-amber-600/35 text-amber-100/95",
    "hover:bg-amber-800/55 hover:border-amber-500/45 active:scale-[0.98]",
    "transition-all duration-150",
    disabled && "opacity-40 pointer-events-none"
  );

  return (
    <div className="border-t border-amber-600/25 bg-amber-950/35">
      {/* Toggle header */}
      <button
        type="button"
        onClick={toggle}
        className={cn(
          "w-full flex items-center justify-between px-3 py-1.5",
          "text-[10px] font-medium text-amber-400/70 hover:text-amber-300/80",
          "transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
        )}
        aria-expanded={isOpen}
        aria-controls="chat-quickbar-content"
      >
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3" />
          Gợi ý nhanh
          <span className="text-amber-600/50">·</span>
          <span className="text-amber-500/60">
            {QUICK_SCENARIOS.length + QUICK_ACTION_CHIPS.length} gợi ý
          </span>
        </span>
        {isOpen ? (
          <ChevronUp className="w-3.5 h-3.5" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5" />
        )}
      </button>

      {/* Expandable content */}
      <div
        id="chat-quickbar-content"
        className={cn(
          "overflow-hidden transition-all duration-250 ease-in-out",
          isOpen ? "max-h-[200px] pb-2" : "max-h-0"
        )}
      >
        <div className="px-3 space-y-2">
          <div>
            <p className="text-[10px] font-medium text-amber-400/80 uppercase tracking-wide mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 shrink-0" />
              Tình huống
            </p>
            <div
              className={cn(
                "flex gap-1.5 overflow-x-auto pb-0.5 -mx-0.5 px-0.5",
                "[scrollbar-width:thin] [scrollbar-color:rgba(180,83,9,0.45)_transparent]"
              )}
            >
              {QUICK_SCENARIOS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => onFillPrompt(s.prompt)}
                  className={cn(chipClass, "max-w-[200px]")}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-medium text-amber-400/80 uppercase tracking-wide mb-1.5 flex items-center gap-1">
              <UtensilsCrossed className="w-3 h-3 shrink-0" />
              Món &amp; hành động
            </p>
            <div
              className={cn(
                "flex gap-1.5 overflow-x-auto pb-0.5 -mx-0.5 px-0.5",
                "[scrollbar-width:thin] [scrollbar-color:rgba(180,83,9,0.45)_transparent]"
              )}
            >
              {QUICK_ACTION_CHIPS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => onFillPrompt(c.prompt)}
                  className={cn(chipClass, "max-w-[220px]")}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
