"use client";

import { Type, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface AutoSendToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export default function AutoSendToggle({
  enabled,
  onToggle,
}: AutoSendToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "relative inline-flex items-center rounded-full p-0.5 transition-all duration-300 shadow-lg",
        "hover:shadow-xl active:scale-95",
        enabled ? "bg-slate-800" : "bg-gray-300"
      )}
      style={{ width: "110px", height: "48px" }}
      title={enabled ? "Bôi text → Tự động gửi" : "Bôi text → Hiện menu"}
    >
      {/* Sliding background */}
      <div
        className={cn(
          "absolute top-0.5 h-[44px] w-[52px] rounded-full bg-white shadow-md transition-all duration-300",
          enabled ? "left-[calc(100%-54px)]" : "left-0.5"
        )}
      />

      {/* Left icon - Text selection */}
      <div
        className={cn(
          "relative z-10 flex h-[44px] w-[52px] items-center justify-center rounded-full transition-colors duration-300",
          !enabled ? "text-slate-800" : "text-white"
        )}
      >
        <Type className="h-5 w-5" strokeWidth={2.5} />
      </div>

      {/* Right icon - Chat */}
      <div
        className={cn(
          "relative z-10 flex h-[44px] w-[52px] items-center justify-center rounded-full transition-colors duration-300",
          enabled ? "text-slate-800" : "text-white"
        )}
      >
        <MessageSquare className="h-5 w-5" strokeWidth={2.5} />
      </div>
    </button>
  );
}
