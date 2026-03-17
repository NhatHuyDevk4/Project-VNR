import { HTMLAttributes } from "react";

interface DocumentCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "hoverable";
  padding?: "none" | "sm" | "md" | "lg";
}

export function DocumentCard({ 
  children, 
  className = "", 
  variant = "default",
  padding = "lg",
  ...props 
}: DocumentCardProps) {
  const paddingClasses = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8 md:p-12",
  };

  const hoverClasses = variant === "hoverable" 
    ? "transition-all duration-300 hover:shadow-document-hover hover:-translate-y-1 hover:border-seal/10 cursor-pointer" 
    : "";

  return (
    <div 
      className={`bg-[#F9F1E1] border border-border shadow-document relative ${paddingClasses[padding]} ${hoverClasses} ${className}`}
      {...props}
    >
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-ink/40"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-ink/40"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-ink/40"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-ink/40"></div>
      
      {children}
    </div>
  );
}
