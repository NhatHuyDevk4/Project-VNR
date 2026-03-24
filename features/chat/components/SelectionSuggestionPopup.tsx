"use client";

import type { ReactNode } from "react";
import { ChefHat, Leaf, BookOpen, Scale } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FOOD_SUGGESTIONS,
  type Suggestion,
} from "../hooks/useSelectionSuggestion";
import type { FoodMatch } from "../hooks/useFoodDetection";

const SUGGESTION_ICONS: Record<string, ReactNode> = {
  "cach-nau": <ChefHat className="w-4 h-4" />,
  "nguyen-lieu": <Leaf className="w-4 h-4" />,
  "cau-chuyen": <BookOpen className="w-4 h-4" />,
  "so-sanh": <Scale className="w-4 h-4" />,
};

export interface SelectionSuggestionPopupProps {
  selectedText: string;
  detectedFood: FoodMatch[];
  activeFood: string;
  onSelectFood: (food: string) => void;
  position: { top: number; left: number } | null;
  visible: boolean;
  onPick: (suggestion: Suggestion) => void;
}

export default function SelectionSuggestionPopup({
  selectedText,
  detectedFood,
  activeFood,
  onSelectFood,
  position,
  visible,
  onPick,
}: Readonly<SelectionSuggestionPopupProps>) {
  if (!visible || !position) return null;

  const panelW = 280;
  const left = Math.max(
    8,
    Math.min(position.left, globalThis.innerWidth - panelW - 8)
  );
  const top = Math.min(position.top, globalThis.innerHeight - 280);

  const hasFood = detectedFood.length > 0;

  return (
    <div
      className="fixed z-60 w-[min(280px,calc(100vw-16px))] animate-in fade-in zoom-in-95 duration-150"
      style={{ top, left }}
    >
      <div className="bg-amber-950/98 backdrop-blur-md border border-amber-600/40 rounded-xl shadow-xl overflow-hidden">

        {/* Header: selected text + food pills */}
        <div className="px-3 py-2 border-b border-amber-600/30 bg-amber-900/30">
          <p className="text-xs text-amber-400/80 font-medium leading-snug mb-1.5">
            Bôi đen: &ldquo;{selectedText}&rdquo;
          </p>

          {hasFood ? (
            <div className="flex flex-wrap gap-1">
              {detectedFood.map((m) => (
                <button
                  key={m.start}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => onSelectFood(m.matchedWord)}
                  className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium transition-all duration-150",
                    m.matchedWord === activeFood
                      ? "bg-amber-500 text-amber-950 ring-1 ring-amber-400"
                      : "bg-amber-800/60 text-amber-200 hover:bg-amber-700/60"
                  )}
                >
                  🍲 {m.matchedWord}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-[10px] text-amber-500/60 italic leading-snug">
              Không có tên món trong danh sách — sẽ dùng toàn bộ text
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div className="p-2 grid grid-cols-2 gap-1">
          {FOOD_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion.id}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onPick(suggestion)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all duration-150",
                "hover:bg-amber-800/50 active:scale-95",
                "text-amber-100 hover:text-amber-50"
              )}
            >
              <span className="shrink-0 text-amber-300">
                {SUGGESTION_ICONS[suggestion.id] ?? (
                  <ChefHat className="w-4 h-4" />
                )}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{suggestion.label}</p>
                {suggestion.description && (
                  <p className="text-xs text-amber-400/60 truncate">
                    {suggestion.description}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Footer hint */}
        <div className="px-3 py-1.5 border-t border-amber-600/20 bg-amber-900/20">
          <p className="text-[10px] text-amber-500/60">
            {hasFood
              ? "Chọn món → chọn hành động → gửi chat"
              : "Chọn hành động → gửi chat"}
          </p>
        </div>
      </div>
    </div>
  );
}
