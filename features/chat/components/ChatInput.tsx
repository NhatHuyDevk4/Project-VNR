"use client";

import React, { useRef, useEffect } from "react";
import { Send, Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSpeechToText } from "../hooks/useSpeechToText";

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
  const isResettingRef = useRef(false);
  const {
    isListening,
    isSupported: isSpeechSupported,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechToText();

  // Update input value when transcript changes (but not when resetting)
  useEffect(() => {
    if (transcript && !isResettingRef.current) {
      onChange(transcript);
    }
  }, [transcript, onChange]);

  // Reset transcript when input is cleared externally (after sending)
  useEffect(() => {
    // If input was cleared and we have transcript
    if (!value && transcript) {
      // Set flag to prevent transcript from filling input again
      isResettingRef.current = true;
      resetTranscript();
      // Clear flag after a short delay to allow new speech
      setTimeout(() => {
        isResettingRef.current = false;
      }, 100);
    }
  }, [value, transcript, resetTranscript]);

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

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
    }
  };

  return (
    <div className="border-t border-amber-100 bg-white/80 backdrop-blur-md px-4 py-3">
      {/* Listening indicator */}
      {isListening && (
        <div className="mb-2 flex items-center gap-2 text-xs text-red-600 animate-pulse">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
          <span className="font-medium">Đang nghe...</span>
        </div>
      )}

      <div
        className={cn(
          "flex items-end gap-2 bg-white rounded-2xl border shadow-sm transition-all duration-200 px-3 py-2",
          isListening
            ? "border-red-400 shadow-lg ring-2 ring-red-200"
            : "border-amber-200/60 focus-within:border-amber-400 focus-within:shadow-md"
        )}
      >
        {/* Mic button */}
        {isSpeechSupported && (
          <button
            onClick={handleMicClick}
            disabled={isLoading}
            className={cn(
              "shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200",
              isListening
                ? "bg-red-500 hover:bg-red-600 text-white shadow-md animate-pulse"
                : "bg-gray-100 hover:bg-amber-100 text-gray-600 hover:text-amber-600",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
            title={isListening ? "Dừng ghi âm" : "Nói để nhập text"}
            aria-label={isListening ? "Stop recording" : "Start recording"}
          >
            {isListening ? (
              <MicOff className="w-4 h-4" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </button>
        )}

        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={
            isListening ? "Đang nghe bạn nói..." : "Nhập tin nhắn..."
          }
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
