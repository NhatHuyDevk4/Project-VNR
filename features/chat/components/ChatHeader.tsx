"use client";

import React from "react";
import { MessageSquare, History, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  title: string;
  isHistoryOpen: boolean;
  onToggleHistory: () => void;
  onNewChat: () => void;
  onClose: () => void;
}

export default function ChatHeader({
  title,
  isHistoryOpen,
  onToggleHistory,
  onNewChat,
  onClose,
}: ChatHeaderProps) {
  return (
    <div className="bg-linear-to-r from-blue-600 to-blue-700 text-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
          <MessageSquare className="w-4 h-4" />
        </div>
        <h1 className="text-base font-semibold truncate">{title}</h1>
      </div>
      <div className="flex items-center gap-1">
        <Button
          onClick={onToggleHistory}
          variant="ghost"
          size="icon-sm"
          className="text-white hover:bg-white/20 border-0 shadow-none"
          title={isHistoryOpen ? "Ẩn lịch sử" : "Hiện lịch sử"}
        >
          <History className="w-4 h-4" />
        </Button>
        <Button
          onClick={onNewChat}
          variant="ghost"
          size="icon-sm"
          className="text-white hover:bg-white/20 border-0 shadow-none"
          title="Chat mới"
        >
          <Plus className="w-4 h-4" />
        </Button>
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon-sm"
          className="text-white hover:bg-white/20 border-0 shadow-none"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
