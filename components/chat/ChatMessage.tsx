import React from "react";
import { Message } from "@/lib/types/chat";
import { User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user";
  const isSystem = message.role === "system";

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (isSystem) {
    return (
      <div className="flex justify-center my-3">
        <div className="bg-white text-gray-700 text-xs px-3 py-1.5 rounded-full border border-gray-200">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex gap-3 mb-4", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
          <Bot className="w-4 h-4 text-blue-600" />
        </div>
      )}
      <div className="flex flex-col max-w-[75%]">
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 shadow-sm",
            isUser
              ? "bg-blue-600 text-white rounded-br-sm"
              : "bg-white text-gray-800 rounded-bl-sm border border-gray-200"
          )}
        >
          <p className="text-sm whitespace-pre-wrap wrap-break-word leading-relaxed">
            {message.content}
          </p>
        </div>
        <span className={cn(
          "text-xs mt-1 px-1",
          isUser ? "text-right" : "text-left",
          "text-gray-500"
        )}>
          {formatTime(message.timestamp)}
        </span>
      </div>
      {isUser && (
        <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
};
