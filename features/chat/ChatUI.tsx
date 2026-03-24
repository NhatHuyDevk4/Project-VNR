"use client";

import { useRef } from "react";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ChatHeader,
  ChatSidebar,
  ChatMessages,
  ChatInput,
  AutoSendToggle,
} from "./components";
import SelectionSuggestionPopup from "./components/SelectionSuggestionPopup";
import ChatQuickBar from "./components/ChatQuickBar";
import { useChatUI } from "./hooks/useChatUI";
import { useSelectionSuggestion } from "./hooks/useSelectionSuggestion";

export default function ChatUI() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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
    handleSend,
    handleNewChat,
    handleDeleteSession,
    isAutoSendEnabled,
    toggleAutoSend,
  } = useChatUI();

  const {
    selectedText,
    detectedFood,
    activeFood,
    setActiveFood,
    position,
    visible,
    containerRef: setSelectionRootRef,
    applySuggestion,
    dismiss,
  } = useSelectionSuggestion({
    onApplySuggestion: (text) => {
      setInputValue(text);
      requestAnimationFrame(() => textAreaRef.current?.focus());
    },
  });

  const setChatColumnRef = (node: HTMLDivElement | null) => {
    setSelectionRootRef(node);
  };

  const handleSendWithDismiss = async () => {
    dismiss();
    await handleSend();
  };

  if (!isChatOpen) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
        <button
          onClick={toggleChat}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-full shadow-2xl shadow-amber-600/30 flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm"
          aria-label="Open chat"
        >
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <AutoSendToggle enabled={isAutoSendEnabled} onToggle={toggleAutoSend} />
      </div>
    );
  }

  const chatWidth = isHistoryOpen
    ? "w-full sm:w-[720px] lg:w-[800px]"
    : "w-full sm:w-[450px] lg:w-[480px]";

  return (
    <>
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
        <AutoSendToggle enabled={isAutoSendEnabled} onToggle={toggleAutoSend} />
      </div>

      <div
        className={cn(
          "fixed z-50 transition-all duration-300 ease-out",
          "inset-0 sm:inset-auto",
          "sm:bottom-20 sm:right-6",
          chatWidth,
          "h-full sm:h-[580px] lg:h-[620px]"
        )}
      >
        <div className="bg-linear-to-br from-amber-950/95 to-amber-900/95 backdrop-blur-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl border-2 border-amber-500/50 flex flex-col h-full overflow-hidden">
          <ChatHeader
            title={currentSession?.title || "Trợ lý AI"}
            isHistoryOpen={isHistoryOpen}
            onToggleHistory={() => setIsHistoryOpen(!isHistoryOpen)}
            onNewChat={handleNewChat}
            onClose={closeChat}
          />

          <div className="flex flex-1 overflow-hidden min-h-0">
            {isHistoryOpen && (
              <ChatSidebar
                sessions={sessions}
                currentSessionId={currentSessionId}
                onSelectSession={setCurrentSessionId}
                onDeleteSession={handleDeleteSession}
              />
            )}

            <div
              ref={setChatColumnRef}
              className="relative flex-1 flex flex-col min-w-0 min-h-0"
            >
              {/* Selection suggestion popup — fixed viewport position */}
              <SelectionSuggestionPopup
                selectedText={selectedText}
                detectedFood={detectedFood}
                activeFood={activeFood}
                onSelectFood={setActiveFood}
                position={position}
                visible={visible}
                onPick={applySuggestion}
              />

              <ChatMessages messages={messages} isLoading={isLoading} />

              <ChatQuickBar
                disabled={isLoading}
                onFillPrompt={(text) => {
                  setInputValue(text);
                  requestAnimationFrame(() => textAreaRef.current?.focus());
                }}
              />

              <ChatInput
                value={inputValue}
                onChange={setInputValue}
                onSend={handleSendWithDismiss}
                isLoading={isLoading}
                textAreaRef={textAreaRef}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
