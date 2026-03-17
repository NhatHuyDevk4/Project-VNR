import { ReactNode } from "react";
import { Info } from "lucide-react";

interface MarginalNoteProps {
  title?: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function MarginalNote({ title, children, icon, className = "" }: MarginalNoteProps) {
  return (
    <aside className={`my-8 pl-4 pr-2 py-3 border-l-4 border-accent-green bg-[#EADCBF]/30 relative font-archival text-ink ${className}`}>
      <div className="absolute -left-[14px] top-4 bg-paper-texture p-0.5 rounded-full border border-accent-green text-accent-green">
        {icon || <Info className="w-4 h-4" />}
      </div>
      {title && (
        <h4 className="font-bold text-sm tracking-widest uppercase mb-1 text-accent-green">
          {title}
        </h4>
      )}
      <div className="text-[1.05rem] leading-relaxed italic opacity-90">
        {children}
      </div>
    </aside>
  );
}
