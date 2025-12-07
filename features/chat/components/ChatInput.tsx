"use client";

import React, { useRef } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  isLoading,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  };

  const canSend = value.trim() && !isLoading;

  return (
    <div className="border-t border-amber-100 bg-white/80 backdrop-blur-md px-4 py-3">
      <div className="flex items-end gap-3 bg-white rounded-2xl border border-amber-200/60 shadow-sm focus-within:border-amber-400 focus-within:shadow-md transition-all duration-200 px-3 py-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Nhập tin nhắn..."
          disabled={isLoading}
          rows={1}
          className={cn(
            "flex-1 resize-none bg-transparent text-sm text-gray-800",
            "focus:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "placeholder:text-gray-400"
          )}
          style={{ minHeight: "24px", maxHeight: "120px" }}
        />
        <button
          onClick={onSend}
          disabled={!canSend}
          className={cn(
            "shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200",
            canSend
              ? "bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          )}
          aria-label="Gửi tin nhắn"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
