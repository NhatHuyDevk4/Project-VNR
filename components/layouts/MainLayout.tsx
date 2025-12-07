"use client";

import Image from "next/image";
import { ReactNode, useRef, useState } from "react";
import NavigateButton from "./NavigateButton";
import MusicPlay from "../MusicPlay";
import { ChatBox, ChatBoxHandle, TextExplainer } from "@/components/chat";
import { Button } from "@/components/ui/button";
import { Lightbulb, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Conversation } from "@/lib/types/chat";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const chatBoxRef = useRef<ChatBoxHandle>(null);
  const [isExplainEnabled, setIsExplainEnabled] = useState(false);

  const handleExplainText = (text: string) => {
    if (chatBoxRef.current) {
      chatBoxRef.current.handleExplainText(text);
    }
  };

  const handleSendMessage = (message: string, conversationId: string) => {
    console.log("Message sent:", message, "Conversation:", conversationId);
    // TODO: Integrate with your backend API
  };

  // Sample conversation data
  const sampleConversations: Conversation[] = [
    {
      id: "1",
      title: "Welcome Chat",
      messages: [
        {
          id: "1-1",
          role: "assistant",
          content: "Xin chào! Tôi có thể giúp gì cho bạn?",
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
        },
      ],
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image Layer */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/bg-1.png"
          alt="Background"
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
        />
        {/* Optional: Add overlay for better content readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Navigation Sidebar */}
      <NavigateButton />

      {/* Music Player */}
      <MusicPlay />

      {/* Content Layer */}
      <div className="relative z-10">{children}</div>

      {/* Text Explainer - appears when text is selected and feature is enabled */}
      <TextExplainer isEnabled={isExplainEnabled} onExplain={handleExplainText} />

      {/* Chat Widget - Fixed at bottom-right */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <div className="flex items-center gap-0 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            <button
              onClick={() => setIsExplainEnabled(!isExplainEnabled)}
              className={cn(
                "relative h-14 w-20 px-3 flex items-center transition-all duration-300 group rounded-l-2xl",
                isExplainEnabled ? "bg-linear-to-br from-amber-500/90 to-orange-500/90" : "bg-white/10 hover:bg-white/15"
              )}
              aria-label="Toggle text explainer"
              title={isExplainEnabled ? "Disable text explainer" : "Enable text explainer"}
            >
              <div className={cn(
                "relative w-full h-7 rounded-full transition-all duration-300",
                isExplainEnabled ? "bg-white/30" : "bg-white/20"
              )}>
                <div className={cn(
                  "absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg",
                  "flex items-center justify-center transition-all duration-300",
                  isExplainEnabled ? "left-[calc(100%-22px)]" : "left-1"
                )}>
                  <Lightbulb 
                    className={cn(
                      "w-3 h-3 transition-colors duration-300",
                      isExplainEnabled ? "text-amber-600 fill-amber-600" : "text-gray-400"
                    )} 
                  />
                </div>
              </div>
            </button>

            {/* Vertical Divider */}
            <div className="w-px h-10 bg-white/20" />
            
            <div className="bg-white/10">
              <Button
                onClick={() => chatBoxRef.current?.toggle()}
                size="icon-lg"
                className="rounded-r-2xl h-14 w-14 bg-transparent hover:bg-white/10 text-white border-0 shadow-none"
                aria-label="Toggle chat"
              >
                <MessageSquare className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <ChatBox
            ref={chatBoxRef}
            initialConversations={sampleConversations}
            onSendMessage={handleSendMessage}
            onExplainText={handleExplainText}
          />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
