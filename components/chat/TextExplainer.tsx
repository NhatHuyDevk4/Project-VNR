"use client";

import React, { useState, useEffect } from "react";

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
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 max-w-md">
        {/* Header */}
        <div className="flex items-start gap-2 mb-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
            <svg 
              className="w-5 h-5 text-blue-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Explaining:</h4>
            <p className="text-xs text-gray-600 italic line-clamp-2">"{selectedText}"</p>
          </div>
        </div>

        {/* Explanation Content */}
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
          {isLoading ? (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg className="animate-spin h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Generating explanation...</span>
            </div>
          ) : (
            <p className="text-sm text-gray-700 leading-relaxed">
              {explanation}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-3 flex justify-end">
          <button
            onClick={() => {
              setIsVisible(false);
              setExplanation("");
              window.getSelection()?.removeAllRanges();
            }}
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* Arrow pointing up to selected text */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -top-2">
        <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white"></div>
      </div>
    </div>
  );
};
