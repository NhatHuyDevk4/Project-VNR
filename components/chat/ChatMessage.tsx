import React from "react";
import { Message } from "@/lib/types/chat";

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
        <div className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex mb-3 ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex flex-col max-w-[75%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`rounded-2xl px-3 py-2 ${
            isUser
              ? "bg-blue-500 text-white rounded-br-sm"
              : "bg-gray-100 text-gray-900 rounded-bl-sm"
          }`}
        >
          <p className="text-sm whitespace-pre-wrap wrap-break-word">
            {message.content}
          </p>
        </div>
        <span className="text-xs text-gray-400 mt-0.5 px-1">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
};
