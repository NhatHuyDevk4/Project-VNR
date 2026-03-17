"use client";

import { PostType } from "@/common/types/post.type";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { DocumentCard } from "@/components/ui/DocumentCard";

interface TimelineItemProps {
  post: PostType;
  index: number;
  linkPrefix?: string;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  post,
  index,
  linkPrefix = "/tai-lieu",
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  // Stack on mobile, alternate on desktop
  const isEvenDesktop = index % 2 === 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate card appearing like it's being placed on a desk
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          {
            opacity: 0,
            y: 30,
            rotation: isEvenDesktop ? -2 : 2,
          },
          {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: itemRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Animate the stamp/node
      if (nodeRef.current) {
        gsap.fromTo(
          nodeRef.current,
          {
            scale: 0.5,
            opacity: 0,
            rotation: -45,
          },
          {
            scale: 1,
            opacity: 1,
            rotation: isEvenDesktop ? 12 : -8,
            duration: 0.6,
            delay: 0.2,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: itemRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [isEvenDesktop]);

  return (
    <div
      ref={itemRef}
      className={`relative flex flex-col md:flex-row items-start md:items-center mb-16 md:mb-24 w-full ${
        isEvenDesktop ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Node Stamp (Mobile layout positioned absolutely, desktop flex) */}
      <div className="absolute left-4 md:static md:w-2/12 flex justify-center z-10 top-6 md:top-auto translate-x-[-50%] md:translate-x-0">
         <div 
            ref={nodeRef}
            className="w-10 h-10 md:w-16 md:h-16 rounded border-2 md:border-[3px] border-ink/80 text-ink flex items-center justify-center bg-[#F9F1E1] shadow-sm transform rotate-12"
         >
            <span className="font-archival font-bold text-[10px] md:text-sm tracking-tighter uppercase leading-none text-center">
               Mốc<br/>{index + 1}
            </span>
         </div>
      </div>

      {/* Content Card */}
      <div
        ref={cardRef}
        className={`w-full pl-16 pr-4 md:w-5/12 md:px-8 mt-2 md:mt-0 ${
          isEvenDesktop ? "md:text-right" : "md:text-left"
        }`}
      >
        <Link href={`${linkPrefix}/${post.slug}`} className="block group">
          <DocumentCard variant="hoverable" padding="lg" className="text-left">
            {/* Archival metadata strip */}
            <div className="flex justify-between items-center border-b border-ink/20 pb-3 mb-4">
               <span className="font-mono text-xs tracking-widest text-ink/50">HỒ SƠ MÓN: {post.id}</span>
               <span className="font-mono text-sm tracking-widest font-bold bg-ink/5 px-2 py-0.5 border border-ink/10 text-ink">
                 {post.milestone}
               </span>
            </div>

            {/* Title */}
            <h3 className="font-archival text-3xl font-bold text-ink mb-3 group-hover:text-seal transition-colors leading-tight">
              {post.title}
            </h3>

            {/* Description */}
            {post.shortDescription && (
              <p className="text-ink-light text-[1.05rem] leading-relaxed mb-6 italic">
                {post.shortDescription}
              </p>
            )}

            {/* Faded Photo attachment */}
            {post.image && post.image.length > 0 && (
              <div className="mb-6 relative border-[4px] border-[#F5E6C8] bg-white shadow-sm p-1 transform rotate-1 group-hover:rotate-0 transition-transform duration-500">
                {/* Simulated photo corners */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-ink/30 z-10 -translate-x-1 -translate-y-1"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-ink/30 z-10 translate-x-1 -translate-y-1"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-ink/30 z-10 -translate-x-1 translate-y-1"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-ink/30 z-10 translate-x-1 translate-y-1"></div>
                
                <img
                  src={post.image[0]}
                  alt={post.title}
                  className="w-full h-48 md:h-56 object-cover sepia-[0.3] contrast-[0.9] brightness-[0.95] group-hover:sepia-0 transition-all duration-700"
                  loading="lazy"
                  crossOrigin="anonymous"
                />
              </div>
            )}

            {/* Action Link */}
            <div className="pt-4 border-t border-ink/10 flex items-center justify-between">
               <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink/40">Ký duyệt xem</span>
               <div className="flex items-center gap-2 text-seal font-bold uppercase tracking-widest text-sm group-hover:translate-x-2 transition-transform">
                 <span>Mở Hồ Sơ</span>
                 <ArrowRight className="w-4 h-4" />
               </div>
            </div>
          </DocumentCard>
        </Link>
      </div>

      {/* Empty space on other side for desktop */}
      <div className="hidden md:block md:w-5/12" />
    </div>
  );
};
