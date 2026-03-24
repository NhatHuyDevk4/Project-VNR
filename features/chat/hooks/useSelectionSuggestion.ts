"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { detectFood, type FoodMatch } from "./useFoodDetection";

export interface Suggestion {
  id: string;
  label: string;
  icon: string;
  prefix: string;
  description?: string;
}

export const FOOD_SUGGESTIONS: Suggestion[] = [
  {
    id: "cach-nau",
    label: "Cách nấu",
    icon: "🍲",
    prefix: "Cách nấu ",
    description: "Hướng dẫn từng bước",
  },
  {
    id: "nguyen-lieu",
    label: "Nguyên liệu",
    icon: "🥬",
    prefix: "Nguyên liệu nấu ",
    description: "Cần chuẩn bị gì",
  },
  {
    id: "cau-chuyen",
    label: "Câu chuyện",
    icon: "📖",
    prefix: "Kể về ",
    description: "Câu chuyện phía sau",
  },
  {
    id: "so-sanh",
    label: "So sánh",
    icon: "⚖️",
    prefix: "So sánh ",
    description: "Khác gì món khác",
  },
];

export interface SelectionSuggestionState {
  /** Text user bôi đen */
  selectedText: string;
  /** Tên món ăn detect được từ selection */
  detectedFood: FoodMatch[];
  /** Tên món đã chọn từ detectedFood */
  activeFood: string;
  position: { top: number; left: number } | null;
  visible: boolean;
}

interface UseSelectionSuggestionOptions {
  onApplySuggestion: (text: string) => void;
}

export function useSelectionSuggestion({
  onApplySuggestion,
}: UseSelectionSuggestionOptions) {
  const [selectedText, setSelectedText] = useState<string>("");
  const [detectedFood, setDetectedFood] = useState<FoodMatch[]>([]);
  const [activeFood, setActiveFood] = useState<string>("");
  const [position, setPosition] = useState<{ top: number; left: number } | null>(
    null
  );
  const containerRef = useRef<HTMLElement | null>(null);

  const handleSelectionChange = useCallback(() => {
    const selection = globalThis.getSelection();
    if (!selection || selection.isCollapsed) {
      setSelectedText("");
      setDetectedFood([]);
      setActiveFood("");
      return;
    }

    const raw = selection.toString();
    if (!raw.trim()) return;

    // Check if selection is inside our chat root
    const anchorNode = selection.anchorNode;
    if (!anchorNode || !containerRef.current?.contains(anchorNode)) return;

    const trimmed = raw.trim();
    const detected = detectFood(trimmed);

    setSelectedText(trimmed);

    if (detected.length > 0) {
      setDetectedFood(detected);
      setActiveFood(detected[0].matchedWord);
    } else {
      // No food detected — use full selection as active food
      setDetectedFood([]);
      setActiveFood(trimmed);
    }

    // Fixed viewport coords — works when selecting in scrollable messages
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (rect.width > 0 || rect.height > 0) {
        setPosition({
          top: rect.bottom + 8,
          left: rect.left,
        });
      }
    }
  }, []);

  const setContainerRef = useCallback((node: HTMLElement | null) => {
    if (containerRef.current) {
      document.removeEventListener("selectionchange", handleSelectionChange);
    }
    containerRef.current = node;
    if (node) {
      document.addEventListener("selectionchange", handleSelectionChange);
    }
  }, [handleSelectionChange]);

  const applySuggestion = useCallback(
    (suggestion: Suggestion) => {
      const foodToUse = activeFood || selectedText;
      if (!foodToUse) return;
      const newText = suggestion.prefix + foodToUse;
      onApplySuggestion(newText);
      globalThis.getSelection()?.removeAllRanges();
      setSelectedText("");
      setDetectedFood([]);
      setActiveFood("");
    },
    [activeFood, selectedText, onApplySuggestion]
  );

  const dismiss = useCallback(() => {
    setSelectedText("");
    setDetectedFood([]);
    setActiveFood("");
  }, []);

  // Đóng khi click ra ngoài vùng chat
  useEffect(() => {
    if (!containerRef.current) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        dismiss();
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [dismiss]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, [handleSelectionChange]);

  return {
    selectedText,
    detectedFood,
    activeFood,
    setActiveFood,
    position,
    visible: selectedText.length >= 2,
    containerRef: setContainerRef,
    applySuggestion,
    dismiss,
    suggestions: FOOD_SUGGESTIONS,
  };
}
