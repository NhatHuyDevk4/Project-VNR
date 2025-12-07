import React, { useState, useRef, KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled = false }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`;
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-3">
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={disabled}
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
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          size="icon"
          className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-md"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
