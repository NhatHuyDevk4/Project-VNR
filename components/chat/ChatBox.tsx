"use client";

import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { Conversation, Message, MessageRole } from "@/lib/types/chat";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ConversationList } from "./ConversationList";

interface ChatBoxProps {
  initialConversations?: Conversation[];
  onSendMessage?: (message: string, conversationId: string) => void;
  onExplainText?: (text: string) => void;
}

export interface ChatBoxHandle {
  handleExplainText: (text: string) => void;
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

  // Expose handleExplainText to parent component
  useImperativeHandle(ref, () => ({
    handleExplainText,
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
      {/* Chat Button - always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-500 text-white rounded-r-2xl hover:bg-blue-600 transition-colors flex items-center justify-center"
        aria-label="Toggle chat"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
          />
        </svg>
      </button>

      {/* Chat Window - appears above when open */}
      {isOpen && (
        <div className={`absolute bottom-16 right-0 ${chatWidth} ${chatHeight} transition-all duration-300`}>
          <div className="bg-white rounded-lg shadow-2xl flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="bg-blue-500 text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <h1 className="text-base font-semibold truncate">
                  {currentConversation?.title || "Chat"}
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleHistory}
                  className="p-1.5 hover:bg-blue-600 rounded transition-colors"
                  aria-label={isHistoryOpen ? "Hide history" : "Show history"}
                  title={isHistoryOpen ? "Hide history" : "Show history"}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <button
                  onClick={handleNewConversation}
                  className="p-1.5 hover:bg-blue-600 rounded transition-colors"
                  aria-label="New chat"
                  title="New chat"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-blue-600 rounded transition-colors"
                  aria-label="Close chat"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
          {/* History Sidebar (conditional) */}
          {isHistoryOpen && (
            <div className="w-[300px] border-r bg-gray-50 flex flex-col">
              <div className="p-3 border-b bg-white">
                <h2 className="text-sm font-semibold text-gray-900">Chat History</h2>
              </div>
              <div className="flex-1 overflow-y-auto">
                {conversations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full px-4 text-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-500">No chat history</p>
                  </div>
                ) : (
                  <div className="divide-y">
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
                          className={`w-full text-left p-3 hover:bg-white transition-colors ${
                            currentConversationId === conversation.id ? "bg-white" : ""
                          }`}
                        >
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="font-medium text-xs text-gray-900 truncate flex-1">
                              {conversation.title}
                            </h3>
                            <span className="text-xs text-gray-400 ml-2 shrink-0">
                              {formatDate(conversation.lastMessageTime)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-1">
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
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h2 className="text-sm font-semibold text-gray-900 mb-1">
                    Start chatting
                  </h2>
                  <p className="text-xs text-gray-500 max-w-xs">
                    Send a message to begin
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
