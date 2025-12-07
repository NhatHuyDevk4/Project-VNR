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
    <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-3 sm:px-4 py-3 sm:py-3.5 flex items-center justify-between backdrop-blur-sm">
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-lg">
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <h1 className="text-sm sm:text-base font-semibold truncate">{title}</h1>
      </div>
      <div className="flex items-center gap-0.5 sm:gap-1">
        <Button
          onClick={onToggleHistory}
          variant="ghost"
          size="icon-sm"
          className="text-white hover:bg-white/20 border-0 shadow-none transition-all h-8 w-8 sm:h-9 sm:w-9"
          title={isHistoryOpen ? "Ẩn lịch sử" : "Hiện lịch sử"}
        >
          <History className="w-4 h-4" />
        </Button>
        <Button
          onClick={onNewChat}
          variant="ghost"
          size="icon-sm"
          className="text-white hover:bg-white/20 border-0 shadow-none transition-all h-8 w-8 sm:h-9 sm:w-9"
          title="Chat mới"
        >
          <Plus className="w-4 h-4" />
        </Button>
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon-sm"
          className="text-white hover:bg-white/20 border-0 shadow-none transition-all h-8 w-8 sm:h-9 sm:w-9"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
