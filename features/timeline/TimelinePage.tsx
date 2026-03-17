"use client";

import { posts } from "@/common/constants/posts";
import { TimelineItem } from "../home/components/TimelineItem";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft } from "lucide-react";

// Register GSAP ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TimelinePageProps {
  showHeader?: boolean;
}

const TimelinePage = ({ showHeader = true }: TimelinePageProps) => {
  const lineRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate header
    if (headerRef.current && showHeader) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }

    // Scroll-linked timeline line (ink drawing down)
    if (lineRef.current) {
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 0.3,
        },
      });
    }
  }, [showHeader]);

  // Sort posts by milestone year
  const sortedPosts = [...posts].sort((a, b) => {
    const yearA = parseInt(a.milestone.split("–")[0] || a.milestone);
    const yearB = parseInt(b.milestone.split("–")[0] || b.milestone);
    return yearA - yearB;
  });

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 font-archival text-ink">
      <div className="max-w-5xl mx-auto relative">
        {/* Header - Optional */}
        {showHeader && (
          <div ref={headerRef} className="text-center mb-24 relative border-b-2 border-double border-ink/20 pb-12">
            <Link
              href="/"
              className="absolute left-0 top-0 inline-flex items-center gap-2 text-ink-light hover:text-seal transition-colors font-bold text-sm tracking-widest uppercase"
            >
              <ArrowLeft className="w-4 h-4" /> Bìa Hồ Sơ
            </Link>

            <div className="inline-block mt-8 mb-4 border border-ink/20 px-6 py-2 bg-paper-texture shadow-sm">
               <span className="text-xs tracking-[0.3em] uppercase font-bold text-ink/60">Sổ cái lịch sử</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-ink uppercase tracking-widest leading-tight mb-6">
              Hành trình<br/>Ẩm thực
            </h1>

            <p className="text-ink-light text-xl max-w-2xl mx-auto italic">
              Bảy món ăn gắn với ký ức tem phiếu — đơn giản, no lòng và đầy hoài niệm.
            </p>
          </div>
        )}

        {/* Archival Ledger Timeline */}
        <div className="relative">
          {/* Main Ink Rail */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-8 flex justify-center transform md:-translate-x-1/2 z-0">
             {/* Background dotted line */}
             <div className="absolute h-full border-l-2 border-dotted border-ink/20"></div>
             {/* Animated solid ink line */}
             <div
               ref={lineRef}
               className="absolute top-0 bottom-0 border-l-[3px] border-ink"
               style={{ transformOrigin: "top center", transform: "scaleY(0)" }}
             />
          </div>

          {/* Timeline Items */}
          <div className="relative pt-12 z-10">
            {sortedPosts.map((post, index) => (
              <TimelineItem key={post.id} post={post} index={index} />
            ))}
          </div>

          {/* End stamp marker */}
          <div className="relative flex justify-start md:justify-center pt-16 pl-1 md:pl-0">
             <div className="w-14 h-14 rounded-full border-[3px] border-seal text-seal flex items-center justify-center bg-paper-texture transform -rotate-12 select-none shadow-[0_0_10px_rgba(139,30,30,0.1)]">
               <span className="text-[10px] font-bold tracking-widest uppercase text-center leading-tight">Hết<br/>Hồ Sơ</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;
