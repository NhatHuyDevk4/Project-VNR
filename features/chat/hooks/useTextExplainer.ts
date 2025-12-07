import { useCallback } from "react";
import { useTextSelection } from "./useTextSelection";
import { useChat } from "@/providers/ChatProvider";
import { useAutoSendMode } from "./useAutoSendMode";

export function useTextExplainer(isEnabled = true) {
  const { openChat, sendMessage, isChatOpen } = useChat();
  const { isAutoSendEnabled, enableAutoSend } = useAutoSendMode();

  const handleTextSelected = useCallback(
    (text: string) => {
      // Only auto-send if chat is already open
      if (isAutoSendEnabled && isChatOpen && text) {
        setTimeout(() => {
          sendMessage(text);
        }, 100);
      }
    },
    [isAutoSendEnabled, isChatOpen, sendMessage]
  );

  const { selectedText, position, isVisible, clearSelection } =
    useTextSelection(isEnabled, handleTextSelected);

  const handleExplain = async () => {
    if (!selectedText) return;

    const explainPrompt = `Hãy giải thích đoạn văn bản sau:\n\n"${selectedText}"`;

    openChat();

    setTimeout(() => {
      sendMessage(explainPrompt);
      clearSelection();
    }, 100);
  };

  const handleAutoSend = async () => {
    if (!selectedText) return;

    // Enable auto-send mode if not already enabled
    await enableAutoSend();

    openChat();

    setTimeout(() => {
      sendMessage(selectedText);
      clearSelection();
    }, 100);
  };

  // Hide popup if auto-send is enabled AND chat is open
  const shouldShowPopup = isVisible && (!isAutoSendEnabled || !isChatOpen);

  return {
    selectedText,
    position,
    isVisible: shouldShowPopup,
    clearSelection,
    handleExplain,
    handleAutoSend,
    isAutoSendEnabled,
    isChatOpen,
  };
}
