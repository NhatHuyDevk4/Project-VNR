"use client";

import { useRef, useEffect } from "react";
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
      <div className="flex-1 overflow-y-auto px-4 py-6 bg-gray-50/50">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <MessageSquare className="w-8 h-8 text-amber-600" />
          </div>
          <h2 className="text-sm font-semibold mb-1 text-gray-800">
            Bắt đầu trò chuyện
          </h2>
          <p className="text-xs text-gray-500 max-w-xs">
            Gửi tin nhắn để bắt đầu cuộc trò chuyện với trợ lý AI
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50/50">
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
              <div className="shrink-0 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                <Bot className="w-4 h-4 text-amber-600" />
              </div>
            )}
            <div className="flex flex-col max-w-[85%] min-w-0">
              <div
                className={cn(
                  "rounded-2xl px-4 py-3 overflow-hidden",
                  isUser
                    ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white"
                    : "bg-white text-gray-800 border border-gray-200 shadow-sm"
                )}
              >
                {isUser ? (
                  <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                    {message.content}
                  </p>
                ) : (
                  <div className="text-sm w-full overflow-hidden">
                    <div
                      className="prose prose-sm max-w-none
                      prose-p:my-1 prose-p:leading-relaxed prose-p:text-gray-800 prose-p:break-words
                      prose-ul:my-1.5 prose-ul:pl-4 prose-li:my-0.5 prose-li:text-gray-800
                      prose-ol:my-1.5 prose-ol:pl-4
                      prose-headings:my-1.5 prose-headings:font-semibold prose-headings:text-amber-800
                      prose-h1:text-base prose-h2:text-sm prose-h3:text-sm
                      prose-strong:text-amber-700 prose-strong:font-semibold
                      prose-blockquote:my-1.5 prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:pl-3 prose-blockquote:italic prose-blockquote:text-gray-700
                      prose-code:text-amber-700 prose-code:bg-amber-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
                      prose-pre:my-1.5 prose-pre:bg-gray-100 prose-pre:p-2 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:text-xs
                      prose-a:text-amber-600 prose-a:underline hover:prose-a:text-amber-700
                      [&>*:first-child]:mt-0 [&>*:last-child]:mb-0
                      [&_p]:break-words [&_li]:break-words [&_strong]:break-words [&_a]:break-all"
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
              <span
                className={cn(
                  "text-xs mt-1.5 px-1",
                  isUser ? "text-right" : "text-left",
                  "text-gray-500"
                )}
              >
                {formatTime(message.createdAt)}
              </span>
            </div>
            {isUser && (
              <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        );
      })}
      {isLoading && (
        <div className="flex gap-3 mb-4">
          <div className="shrink-0 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
            <Bot className="w-4 h-4 text-amber-600" />
          </div>
          <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 border border-gray-200 shadow-sm">
            <div className="flex gap-1.5">
              <div
                className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
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
