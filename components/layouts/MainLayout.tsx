"use client";

import { ReactNode } from "react";
import NavigateButton from "./NavigateButton";
import MusicPlay from "../MusicPlay";
import { ChatProvider } from "@/providers/ChatProvider";
import { ChatUI, TextExplainerUI } from "@/features/chat";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <ChatProvider>
      <div className="relative min-h-screen w-full bg-paper-texture font-archival text-ink selection:bg-seal/20 selection:text-seal">
        
        {/* Archival layout container */}
        <div className="flex min-h-screen max-w-7xl mx-auto shadow-document bg-[#F9F1E1] border-x border-border">
          {/* Book Spine / Index Sidebar (Desktop) */}
          <div className="hidden md:flex flex-col w-72 border-r border-border bg-[#EADCBF] shrink-0 sticky top-0 h-screen overflow-y-auto">
            <NavigateButton />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 relative flex flex-col min-w-0">
            {/* Mobile Header / Nav */}
            <div className="md:hidden z-50">
                <NavigateButton mobile /> 
            </div>

            <main className="flex-1 relative z-10 p-6 md:p-12 lg:p-16 overflow-y-auto w-full">
               {children}
            </main>
          </div>
        </div>

        {/* Music Player */}
        <div className="fixed bottom-6 right-6 z-50">
           <MusicPlay />
        </div>
        <ChatUI />
        <TextExplainerUI />
      </div>
    </ChatProvider>
  );
};

export default MainLayout;
