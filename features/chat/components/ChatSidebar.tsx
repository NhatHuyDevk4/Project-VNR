"use client";

import React from "react";
import { MessageSquare, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatSession } from "@/lib/idb/chatIdb";

interface ChatSidebarProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string, e: React.MouseEvent) => void;
}

export default function ChatSidebar({
  sessions,
  currentSessionId,
  onSelectSession,
  onDeleteSession,
}: ChatSidebarProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInMinutes < 1) return "Vừa xong";
    if (diffInMinutes < 60) return `${diffInMinutes} phút`;
    if (diffInHours < 24) return `${diffInHours} giờ`;

    return new Intl.DateTimeFormat("vi-VN", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="w-[300px] border-r border-gray-200 bg-gray-50 flex flex-col">
      <div className="p-3 border-b border-gray-200 bg-white">
        <h2 className="text-sm font-semibold text-gray-800">Lịch sử chat</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-4 text-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-3">
              <MessageSquare className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500">Chưa có lịch sử chat</p>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={cn(
                  "group relative rounded-lg p-3 cursor-pointer transition-colors",
                  currentSessionId === session.id
                    ? "bg-blue-50 border border-blue-200"
                    : "hover:bg-gray-100 border border-transparent"
                )}
                onClick={() => onSelectSession(session.id)}
              >
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-medium text-xs truncate flex-1 text-gray-800 pr-2">
                    {session.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500 shrink-0">
                      {formatDate(session.updatedAt)}
                    </span>
                    <button
                      onClick={(e) => onDeleteSession(session.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-opacity"
                      title="Xóa"
                    >
                      <Trash2 className="w-3 h-3 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
