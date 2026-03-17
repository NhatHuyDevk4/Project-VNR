"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import AnimatedTitle from "./components/AnimatedTitle";
import Link from "next/link";
import { BookOpen } from "lucide-react";

const Homepage = () => {
  const cornerTLRef = useRef<HTMLDivElement>(null);
  const cornerTRRef = useRef<HTMLDivElement>(null);
  const cornerBLRef = useRef<HTMLDivElement>(null);
  const cornerBRRef = useRef<HTMLDivElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const corners = [cornerTLRef.current, cornerTRRef.current, cornerBLRef.current, cornerBRRef.current].filter(Boolean);
      if (corners.length) {
        gsap.to(corners, { opacity: 1, duration: 0.4, stagger: 0.06, delay: 0.35 });
      }
      if (metadataRef.current) {
        gsap.fromTo(
          metadataRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, delay: 1.2, ease: "power2.out" }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative max-w-4xl mx-auto">
      
      {/* Vintage borders container */}
      <div className="w-full border-[6px] border-double border-ink/20 p-4 md:p-8 lg:p-12 relative bg-[#F9F1E1] shadow-document group transition-all duration-700 hover:border-ink/30 hover:shadow-document-hover">
        
        {/* Corner ornaments */}
        <div ref={cornerTLRef} className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-ink/40 opacity-0"></div>
        <div ref={cornerTRRef} className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-ink/40 opacity-0"></div>
        <div ref={cornerBLRef} className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-ink/40 opacity-0"></div>
        <div ref={cornerBRRef} className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-ink/40 opacity-0"></div>

        {/* Cover Title */}
        <AnimatedTitle />

        {/* Call to Action: Open Archive */}
        <div className="mt-16 flex justify-center">
           <Link 
              href="/contents"
              className="group/btn relative inline-flex items-center gap-3 px-8 py-4 bg-ink text-[#F5E6C8] font-archival uppercase tracking-widest text-lg md:text-xl font-bold transition-all duration-300 hover:bg-seal hover:scale-[1.02] shadow-document hover:shadow-document-hover overflow-hidden rounded-sm"
           >
              {/* Bookmark ribbon effect */}
              <div className="absolute -left-2 top-0 bottom-0 w-4 bg-seal/20 transform skew-x-12 translate-x-[-100%] group-hover/btn:translate-x-[200px] transition-transform duration-700 ease-in-out"></div>
              
              <BookOpen className="w-6 h-6 opacity-80" />
              <span>Mở Hồ Sơ</span>
           </Link>
        </div>
        
        {/* Archival metadata */}
        <div ref={metadataRef} className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center w-full opacity-0">
           <div className="font-archival text-[10px] md:text-xs text-ink/40 tracking-widest">
              LƯU TRỮ SỐ: 1976-1986 / BẢN SAO SỐ 01
           </div>
        </div>

      </div>

    </div>
  );
};

export default Homepage;
