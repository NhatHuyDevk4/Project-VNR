"use client";

import React, { useState, useEffect } from "react";
import { Lightbulb, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TextExplainerProps {
  isEnabled: boolean;
  onExplain: (text: string) => void;
}

export const TextExplainer: React.FC<TextExplainerProps> = ({ isEnabled, onExplain }) => {
  const [selectedText, setSelectedText] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isEnabled) {
      setIsVisible(false);
      return;
    }

    const handleSelection = () => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();

      if (text && text.length > 0) {
        setSelectedText(text);
        
        // Get selection position
        const range = selection?.getRangeAt(0);
        const rect = range?.getBoundingClientRect();
        
        if (rect) {
          setPosition({
            x: rect.left + rect.width / 2,
            y: rect.bottom + 10, // Show below the selected text
          });
          setIsVisible(true);
          
          // Auto explain after a short delay
          setTimeout(() => {
            handleAutoExplain(text);
          }, 500);
        }
      } else {
        setIsVisible(false);
        setExplanation("");
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.explain-popup')) {
        const selection = window.getSelection();
        if (!selection || selection.toString().trim().length === 0) {
          setIsVisible(false);
          setExplanation("");
        }
      }
    };

    document.addEventListener("mouseup", handleSelection);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleSelection);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEnabled]);

  const handleAutoExplain = (text: string) => {
    setIsLoading(true);
    onExplain(text);
    
    // Simulate loading (replace with actual API call)
    setTimeout(() => {
      setExplanation("This is a simulated explanation. Replace this with your actual AI explanation.");
      setIsLoading(false);
    }, 1000);
  };

  const handleClose = () => {
    setIsVisible(false);
    setExplanation("");
    window.getSelection()?.removeAllRanges();
  };

  if (!isVisible || !isEnabled) return null;

  return (
    <div
      className="explain-popup fixed z-9999 animate-in fade-in slide-in-from-bottom-2 duration-200"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translateX(-50%)",
      }}
    >
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-4 max-w-md">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 bg-linear-to-br from-amber-500/20 to-orange-500/20 rounded-lg flex items-center justify-center shrink-0 backdrop-blur-sm border border-amber-300/30">
            <Lightbulb className="w-5 h-5 text-amber-600 fill-amber-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold mb-1 text-gray-800">Explaining:</h4>
            <p className="text-xs text-gray-600 italic line-clamp-2">
              "{selectedText}"
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleClose}
            className="shrink-0 -mt-1 -mr-1 hover:bg-gray-100/50 text-gray-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Explanation Content */}
        <div className="bg-linear-to-br from-blue-50/50 to-purple-50/50 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50">
          {isLoading ? (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
              <span>Generating explanation...</span>
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-gray-800">
              {explanation}
            </p>
          )}
        </div>
      </div>

      {/* Arrow pointing up to selected text */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -top-2">
        <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white"></div>
      </div>
    </div>
  );
};
