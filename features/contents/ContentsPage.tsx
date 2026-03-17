"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CONTENT_ROUTES } from "@/common/constants/routes";

const ContentsPage = () => {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in container
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        }
      );

      // Animate lit items
      const validItems = itemsRef.current.filter(Boolean);
      if (validItems.length > 0) {
        gsap.fromTo(
          validItems,
          {
            opacity: 0,
            x: -20,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.3,
            ease: "power2.out",
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-12 px-6" ref={containerRef}>
      
      {/* Archival Header */}
      <div className="mb-16 border-b-2 border-ink space-y-4 pb-8 text-center md:text-left relative">
        <h1 className="font-archival text-4xl md:text-5xl lg:text-6xl font-bold text-ink uppercase tracking-wider">
          Mục Lục Hồ Sơ
        </h1>
        <p className="font-archival text-lg text-ink-light italic">
          Ghi chép bối cảnh lịch sử và ý nghĩa ẩm thực thời kỳ tem phiếu
        </p>

        {/* Vintage stamp decoration */}
        <div className="absolute right-0 top-0 w-20 h-20 border-[3px] border-seal rounded-full opacity-30 flex items-center justify-center transform rotate-12 pointer-events-none hidden md:flex">
          <span className="text-seal font-bold text-[10px] tracking-widest text-center uppercase leading-tight">
            Lưu trữ<br/>Tối mật
          </span>
        </div>
      </div>

      {/* Table of Contents List */}
      <div className="space-y-6">
        {CONTENT_ROUTES.map((link, index) => {
          const isActive = pathname === link.path;

          return (
            <Link
              key={link.path}
              href={link.path}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className={`group flex items-baseline w-full relative transition-transform duration-300 hover:translate-x-2 ${
                isActive ? "text-seal font-bold" : "text-ink"
              }`}
            >
              {/* Chapter Number/Identifier */}
              <div className="w-12 shrink-0 font-mono text-xl tracking-tighter opacity-70">
                {link.number}.
              </div>

              {/* Title */}
              <div className="font-archival text-xl md:text-2xl tracking-wide group-hover:underline decoration-2 underline-offset-4 decoration-ink/40">
                {link.name}
              </div>

              {/* Dot Leaders */}
              <div className="flex-1 mx-4 border-b-2 border-dotted border-ink/30 mb-2 opacity-50 relative top-[-6px]"></div>

              {/* Page Number Placeholder / Era */}
              <div className="w-20 text-right shrink-0 font-mono text-sm opacity-60 tracking-widest">
                [T.{link.number}]
              </div>
              
              {isActive && (
                 <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-seal shadow-[0_0_5px_rgba(139,30,30,0.5)]"></div>
              )}
            </Link>
          );
        })}
      </div>
      
      {/* Archival Footer signature */}
      <div className="mt-20 pt-8 border-t border-ink/20 flex flex-col items-end opacity-60">
         <span className="font-archival italic text-sm">Xác nhận sao y bản chính</span>
         <span className="font-archival font-bold text-xl mt-4" style={{ fontFamily: "var(--font-serif), 'Brush Script MT', cursive" }}>Nguyễn Văn A</span>
      </div>
    </div>
  );
};

export default ContentsPage;
