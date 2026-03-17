interface RecordStampProps {
  label: string;
  status?: "pending" | "approved" | "rejected";
  date?: string;
  className?: string;
}

export function RecordStamp({ 
  label, 
  status = "approved", 
  date, 
  className = "" 
}: RecordStampProps) {
  const colors = {
    approved: "text-seal border-seal shadow-[0_0_8px_rgba(139,30,30,0.1)]",
    pending: "text-ink/60 border-ink/30",
    rejected: "text-[#B22222] border-[#B22222]",
  };

  return (
    <div className={`inline-block border-[3px] rounded-sm px-4 py-2 uppercase tracking-widest font-bold text-center select-none transform -rotate-6 bg-transparent ${colors[status]} ${className}`}>
      <div className="border border-current px-2 py-1 leading-none">
        <div className="text-sm md:text-xl font-archival whitespace-nowrap">{label}</div>
        {date && (
          <div className="text-[10px] md:text-xs mt-1 font-mono tracking-tighter border-t border-current pt-1">
            {date}
          </div>
        )}
      </div>
    </div>
  );
}
