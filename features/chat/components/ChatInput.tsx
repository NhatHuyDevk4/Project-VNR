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
    <div className="border-t border-gray-200 bg-white p-3">
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
            "flex-1 resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "placeholder:text-gray-400"
          )}
          style={{ minHeight: "36px", maxHeight: "100px" }}
        />
        <Button
          onClick={onSend}
          disabled={!value.trim() || isLoading}
          size="icon"
          className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-md"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
