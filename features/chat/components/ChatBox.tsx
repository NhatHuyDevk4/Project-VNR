"use client";

import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { Conversation, Message, MessageRole } from "@/lib/types/chat";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ConversationList } from "./ConversationList";
import { MessageSquare, History, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatBoxProps {
  initialConversations?: Conversation[];
  onSendMessage?: (message: string, conversationId: string) => void;
  onExplainText?: (text: string) => void;
}

export interface ChatBoxHandle {
  handleExplainText: (text: string) => void;
  toggle: () => void;
}

export const ChatBox = forwardRef<ChatBoxHandle, ChatBoxProps>(({
  initialConversations = [],
  onSendMessage,
  onExplainText,
}, ref) => {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(
    initialConversations.length > 0 ? initialConversations[0].id : null
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const currentConversation = conversations.find((c) => c.id === currentConversationId);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentConversation?.messages]);

  // Create a new conversation if none exists
  useEffect(() => {
    if (conversations.length === 0) {
      const newConversation: Conversation = {
        id: generateId(),
        title: "New Conversation",
        messages: [],
        lastMessageTime: new Date(),
      };
      setConversations([newConversation]);
      setCurrentConversationId(newConversation.id);
    }
  }, [conversations.length]);

  const generateId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleSendMessage = async (content: string) => {
    if (!currentConversationId || isSending) return;

    setIsSending(true);

    const newMessage: Message = {
      id: generateId(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    // Add user message
    setConversations((prevConversations) =>
      prevConversations.map((conv) => {
        if (conv.id === currentConversationId) {
          const updatedMessages = [...conv.messages, newMessage];
          const newTitle = conv.messages.length === 0 
            ? content.slice(0, 30) + (content.length > 30 ? "..." : "")
            : conv.title;
          
          return {
            ...conv,
            title: newTitle,
            messages: updatedMessages,
            lastMessageTime: new Date(),
          };
        }
        return conv;
      })
    );

    // Call external handler if provided
    if (onSendMessage) {
      onSendMessage(content, currentConversationId);
    }

    // Simulate assistant response (replace with actual API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: "This is a simulated response. Replace this with your actual API integration.",
        timestamp: new Date(),
      };

      setConversations((prevConversations) =>
        prevConversations.map((conv) => {
          if (conv.id === currentConversationId) {
            return {
              ...conv,
              messages: [...conv.messages, assistantMessage],
              lastMessageTime: new Date(),
            };
          }
          return conv;
        })
      );

      setIsSending(false);
    }, 1000);
  };

  const handleExplainText = (text: string) => {
    // Open chat if closed
    if (!isOpen) {
      setIsOpen(true);
    }

    // Send the text with explanation prompt
    const explainPrompt = `Please explain the following text:\n\n"${text}"`;
    
    // Wait a bit for the chat to open before sending
    setTimeout(() => {
      handleSendMessage(explainPrompt);
    }, isOpen ? 0 : 300);

    // Call external handler if provided
    if (onExplainText) {
      onExplainText(text);
    }
  };

  // Expose handleExplainText and toggle to parent component
  useImperativeHandle(ref, () => ({
    handleExplainText,
    toggle: () => setIsOpen(!isOpen),
  }));

  const handleNewConversation = () => {
    const newConversation: Conversation = {
      id: generateId(),
      title: "New Conversation",
      messages: [],
      lastMessageTime: new Date(),
    };
    setConversations([newConversation, ...conversations]);
    setCurrentConversationId(newConversation.id);
    setIsHistoryOpen(false);
  };

  const toggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  // Chat window (small or expanded)
  const chatWidth = isHistoryOpen ? "w-[700px]" : "w-[400px]";
  const chatHeight = "h-[600px]";

  return (
    <>
      {/* Chat Window - appears above when open */}
      {isOpen && (
        <div 
          className={cn(
            "absolute transition-all duration-300",
            chatWidth,
            chatHeight
          )}
          style={{ 
            bottom: 'calc(100% + 8px)',
            right: 0,
            zIndex: 9999
          }}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="bg-gray-50 text-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-200">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                </div>
                <h1 className="text-base font-semibold truncate">
                  {currentConversation?.title || "Chat Assistant"}
                </h1>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  onClick={toggleHistory}
                  variant="ghost"
                  size="icon-sm"
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-200/50 border-0 shadow-none"
                  aria-label={isHistoryOpen ? "Hide history" : "Show history"}
                  title={isHistoryOpen ? "Hide history" : "Show history"}
                >
                  <History className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleNewConversation}
                  variant="ghost"
                  size="icon-sm"
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-200/50 border-0 shadow-none"
                  aria-label="New chat"
                  title="New chat"
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="icon-sm"
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-200/50 border-0 shadow-none"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
          {/* History Sidebar (conditional) */}
          {isHistoryOpen && (
            <div className="w-[300px] border-r border-gray-200 bg-gray-50 flex flex-col">
              <div className="p-3 border-b border-gray-200 bg-gray-100">
                <h2 className="text-sm font-semibold text-gray-800">Chat History</h2>
              </div>
              <div className="flex-1 overflow-y-auto">
                {conversations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full px-4 text-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                      <MessageSquare className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500">No chat history</p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/5">
                    {conversations.map((conversation) => {
                      const formatDate = (date: Date) => {
                        const now = new Date();
                        const diffInMs = now.getTime() - date.getTime();
                        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
                        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
                        
                        if (diffInMinutes < 1) return "Just now";
                        if (diffInMinutes < 60) return `${diffInMinutes}m`;
                        if (diffInHours < 24) return `${diffInHours}h`;
                        
                        return new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          day: "numeric",
                        }).format(date);
                      };

                      const getPreview = () => {
                        if (conversation.messages.length === 0) return "No messages";
                        const lastMsg = conversation.messages[conversation.messages.length - 1];
                        return lastMsg.content.slice(0, 40) + (lastMsg.content.length > 40 ? "..." : "");
                      };

                      return (
                        <button
                          key={conversation.id}
                          onClick={() => setCurrentConversationId(conversation.id)}
                          className={cn(
                            "w-full text-left p-3 rounded-lg hover:bg-gray-200 transition-colors",
                            currentConversationId === conversation.id && "bg-gray-300"
                          )}
                        >
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="font-medium text-xs truncate flex-1 text-gray-800">
                              {conversation.title}
                            </h3>
                            <span className="text-xs text-gray-500 ml-2 shrink-0">
                              {formatDate(conversation.lastMessageTime)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 line-clamp-1">
                            {getPreview()}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto px-4 py-3 bg-gray-50"
            >
              {currentConversation && currentConversation.messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 border border-blue-200">
                    <MessageSquare className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-sm font-semibold mb-1 text-gray-800">
                    Start chatting
                  </h2>
                  <p className="text-xs text-gray-600 max-w-xs">
                    Send a message to begin your conversation
                  </p>
                </div>
              ) : (
                <>
                  {currentConversation?.messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input */}
            <ChatInput onSend={handleSendMessage} disabled={isSending} />
          </div>
        </div>
          </div>
        </div>
      )}
    </>
  );
});

ChatBox.displayName = "ChatBox";
