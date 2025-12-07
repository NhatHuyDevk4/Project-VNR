"use client";

import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ChatHeader,
  ChatSidebar,
  ChatMessages,
  ChatInput,
  AutoSendToggle,
} from "./components";
import { useChatUI } from "./hooks/useChatUI";

export default function ChatUI() {
  const {
    inputValue,
    setInputValue,
    isHistoryOpen,
    setIsHistoryOpen,
    currentSession,
    sessions,
    currentSessionId,
    setCurrentSessionId,
    messages,
    isLoading,
    isChatOpen,
    toggleChat,
    closeChat,
    isAutoSendEnabled,
    toggleAutoSend,
    handleSend,
    handleNewChat,
    handleDeleteSession,
  } = useChatUI();

  if (!isChatOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <button
          onClick={toggleChat}
          className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
          aria-label="Open chat"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
        <AutoSendToggle enabled={isAutoSendEnabled} onToggle={toggleAutoSend} />
      </div>
    );
  }

  const chatWidth = isHistoryOpen ? "w-[700px]" : "w-[400px]";

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AutoSendToggle enabled={isAutoSendEnabled} onToggle={toggleAutoSend} />
      </div>
      <div
        className={cn(
          "fixed bottom-[88px] right-6 z-50 transition-all duration-300",
          chatWidth,
          "h-[600px]"
        )}
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col h-full overflow-hidden">
          <ChatHeader
            title={currentSession?.title || "Chat Assistant"}
            isHistoryOpen={isHistoryOpen}
            onToggleHistory={() => setIsHistoryOpen(!isHistoryOpen)}
            onNewChat={handleNewChat}
            onClose={closeChat}
          />

          <div className="flex flex-1 overflow-hidden">
            {isHistoryOpen && (
              <ChatSidebar
                sessions={sessions}
                currentSessionId={currentSessionId}
                onSelectSession={setCurrentSessionId}
                onDeleteSession={handleDeleteSession}
              />
            )}

            <div className="flex-1 flex flex-col">
              <ChatMessages messages={messages} isLoading={isLoading} />
              <ChatInput
                value={inputValue}
                onChange={setInputValue}
                onSend={handleSend}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
