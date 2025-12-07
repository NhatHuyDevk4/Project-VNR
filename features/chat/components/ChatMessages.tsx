"use client";

import React, { useRef, useEffect } from "react";
import { MessageSquare, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatMessage } from "@/lib/idb/chatIdb";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export default function ChatMessages({
  messages,
  isLoading,
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 bg-gradient-to-b from-white/30 to-white/10 backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-600/20 to-amber-700/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 border border-amber-700/30 shadow-lg">
            <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600" />
          </div>
          <h2 className="text-sm font-semibold mb-1 text-gray-800">
            Bắt đầu trò chuyện
          </h2>
          <p className="text-xs text-gray-600 max-w-xs px-4">
            Gửi tin nhắn để bắt đầu cuộc trò chuyện với trợ lý AI
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 sm:py-4 bg-gradient-to-b from-white/30 to-white/10 backdrop-blur-sm">
      {messages.map((message, index) => {
        const isUser = message.role === "user";
        return (
          <div
            key={index}
            className={cn(
              "flex gap-2 sm:gap-3 mb-3 sm:mb-4",
              isUser ? "justify-end" : "justify-start"
            )}
          >
            {!isUser && (
              <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-amber-600/20 to-amber-700/20 backdrop-blur-sm flex items-center justify-center border border-amber-700/30 shadow-md">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
              </div>
            )}
            <div className="flex flex-col max-w-[85%] sm:max-w-[80%]">
              <div
                className={cn(
                  "rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 shadow-lg backdrop-blur-sm",
                  isUser
                    ? "bg-gradient-to-br from-amber-600 to-amber-700 text-white rounded-br-md"
                    : "bg-white/90 text-gray-800 rounded-bl-md border border-amber-700/20"
                )}
              >
                {isUser ? (
                  <p className="text-sm whitespace-pre-wrap wrap-break-word leading-relaxed">
                    {message.content}
                  </p>
                ) : (
                  <div className="text-sm prose prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5 prose-headings:my-2 prose-pre:my-2 prose-blockquote:my-2 prose-strong:text-amber-700 prose-headings:text-amber-800">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
              <span
                className={cn(
                  "text-xs mt-1 sm:mt-1.5 px-1",
                  isUser ? "text-right" : "text-left",
                  "text-gray-600"
                )}
              >
                {formatTime(message.createdAt)}
              </span>
            </div>
            {isUser && (
              <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-600/30">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            )}
          </div>
        );
      })}
      {isLoading && (
        <div className="flex gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-amber-600/20 to-amber-700/20 backdrop-blur-sm flex items-center justify-center border border-amber-700/30 shadow-md">
            <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl rounded-bl-md px-4 sm:px-5 py-2.5 sm:py-3 shadow-lg border border-amber-700/20">
            <div className="flex gap-1.5">
              <div
                className="w-2 h-2 bg-amber-600 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 bg-amber-700 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-2 h-2 bg-amber-600 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
