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
      <div className="flex-1 overflow-y-auto px-4 py-3 bg-gray-50">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 border border-blue-200">
            <MessageSquare className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-sm font-semibold mb-1 text-gray-800">
            Bắt đầu trò chuyện
          </h2>
          <p className="text-xs text-gray-600 max-w-xs">
            Gửi tin nhắn để bắt đầu cuộc trò chuyện
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 bg-gray-50">
      {messages.map((message, index) => {
        const isUser = message.role === "user";
        return (
          <div
            key={index}
            className={cn(
              "flex gap-3 mb-4",
              isUser ? "justify-end" : "justify-start"
            )}
          >
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
                {isUser ? (
                  <p className="text-sm whitespace-pre-wrap wrap-break-word leading-relaxed">
                    {message.content}
                  </p>
                ) : (
                  <div className="text-sm prose prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5 prose-headings:my-2 prose-pre:my-2 prose-blockquote:my-2">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
              <span
                className={cn(
                  "text-xs mt-1 px-1",
                  isUser ? "text-right" : "text-left",
                  "text-gray-500"
                )}
              >
                {formatTime(message.createdAt)}
              </span>
            </div>
            {isUser && (
              <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        );
      })}
      {isLoading && (
        <div className="flex gap-3 mb-4">
          <div className="shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
            <Bot className="w-4 h-4 text-blue-600" />
          </div>
          <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm border border-gray-200">
            <div className="flex gap-1">
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
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
