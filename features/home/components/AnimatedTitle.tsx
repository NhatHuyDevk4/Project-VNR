"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AnimatedTitle = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in the whole container
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
      );
      
      // Stamp effect for the seal
      if (sealRef.current) {
         gsap.fromTo(
            sealRef.current,
            { scale: 2, opacity: 0, rotation: -20 },
            { scale: 1, opacity: 0.8, rotation: -12, duration: 0.6, delay: 0.8, ease: "back.out(2)" }
         );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center text-center space-y-12 py-16 px-4">
      
      {/* Top Decoration */}
      <div className="flex items-center gap-4 w-full max-w-md mx-auto opacity-60">
        <div className="h-px bg-ink flex-1"></div>
        <div className="font-archival text-sm tracking-[0.3em] uppercase text-ink-light font-bold">Lưu trữ Quốc gia</div>
        <div className="h-px bg-ink flex-1"></div>
      </div>

      <div className="relative">
         {/* Main Title */}
         <h1 
            ref={titleRef}
            className="font-archival text-5xl md:text-7xl lg:text-8xl font-bold text-ink leading-[1.1] tracking-tight"
         >
            Hương vị<br />
            <span className="italic font-normal">Bao cấp</span>
         </h1>
         
         {/* Red Seal */}
         <div 
            ref={sealRef}
            className="absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 w-24 h-24 md:w-32 md:h-32 rounded-full border-[4px] border-seal flex flex-col items-center justify-center text-seal opacity-0 shadow-[0_0_15px_rgba(139,30,30,0.15)] bg-paper-texture mix-blend-multiply pointer-events-none"
         >
            <div className="text-[0.6rem] md:text-sm tracking-[0.2em] font-archival uppercase font-bold text-center leading-tight">
               Đã xác thực<br/>
               <span className="text-[1.2rem] md:text-2xl mt-1 block">76—86</span>
            </div>
         </div>
      </div>

      {/* Subtitle / Descriptive Text */}
      <div className="max-w-2xl mx-auto pt-8 border-t border-ink/20 relative">
         <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-paper-texture px-4 text-ink-light text-xl">❧</span>
         <p className="font-archival text-lg md:text-2xl text-ink-light leading-relaxed italic opacity-90">
            Ký ức về một thời tem phiếu, nơi bữa ăn đơn giản — bo bo, cơm độn khoai, cháo cám — trở thành minh chứng cho sức sống của cả một thế hệ.
         </p>
      </div>

      {/* Bottom Decoration */}
      <div className="flex flex-col items-center gap-2 mt-12">
         <div className="w-16 h-px bg-ink/30"></div>
         <div className="w-8 h-px bg-ink/20"></div>
      </div>
    </div>
  );
};

export default AnimatedTitle;
