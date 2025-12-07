"use client";

import React, { useRef } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
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
        100
      )}px`;
    }
  };

  return (
    <div className="border-t border-amber-700/20 bg-white/50 backdrop-blur-sm p-3 sm:p-4">
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Nhập tin nhắn..."
          disabled={isLoading}
          rows={1}
          className={cn(
            "flex-1 resize-none rounded-xl border border-amber-700/20 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-800",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:border-amber-500",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "placeholder:text-gray-400 shadow-sm"
          )}
          style={{ minHeight: "40px", maxHeight: "120px" }}
        />
        <Button
          onClick={onSend}
          disabled={!value.trim() || isLoading}
          size="icon"
          className="shrink-0 h-10 w-10 sm:h-11 sm:w-11 bg-gradient-to-br from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white border-0 shadow-lg shadow-amber-600/30 transition-all hover:scale-105"
        >
          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </div>
    </div>
  );
}
