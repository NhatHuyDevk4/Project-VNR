"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AnimatedTitle = () => {
  const topDecoRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const fleuronRef = useRef<HTMLSpanElement>(null);
  const bottomDecoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Top decoration: fade in
      if (topDecoRef.current) {
        gsap.fromTo(
          topDecoRef.current,
          { opacity: 0 },
          { opacity: 0.6, duration: 0.5, delay: 0, ease: "power2.out" }
        );
      }

      // "Hương vị": fade + slide up
      if (titleLine1Ref.current) {
        gsap.fromTo(
          titleLine1Ref.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.2, ease: "power2.out" }
        );
      }

      // "Bao cấp": stagger after line 1
      if (titleLine2Ref.current) {
        gsap.fromTo(
          titleLine2Ref.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.45, ease: "power2.out" }
        );
      }

      // Stamp effect for the seal
      if (sealRef.current) {
        gsap.fromTo(
          sealRef.current,
          { scale: 2, opacity: 0, rotation: -20 },
          { scale: 1, opacity: 0.8, rotation: -12, duration: 0.6, delay: 0.8, ease: "back.out(2)" }
        );
      }

      // Subtitle block: fade + slide up
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.5, delay: 1.0, ease: "power2.out" }
        );
      }

      // Fleuron: slight rotation
      if (fleuronRef.current) {
        gsap.fromTo(
          fleuronRef.current,
          { rotation: 0 },
          { rotation: -6, duration: 0.4, delay: 1.0, ease: "power2.out" }
        );
      }

      // Bottom decoration: fade in
      if (bottomDecoRef.current) {
        gsap.fromTo(
          bottomDecoRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, delay: 1.35, ease: "power2.out" }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-12 py-16 px-4">
      {/* Top Decoration */}
      <div
        ref={topDecoRef}
        className="flex items-center gap-4 w-full max-w-md mx-auto opacity-0"
      >
        <div className="h-px bg-ink flex-1"></div>
        <div className="font-archival text-sm tracking-[0.3em] uppercase text-ink-light font-bold">Lưu trữ Quốc gia</div>
        <div className="h-px bg-ink flex-1"></div>
      </div>

      <div className="relative">
        {/* Main Title */}
        <h1
          className="font-archival text-5xl md:text-7xl lg:text-8xl font-bold text-ink leading-[1.1] tracking-tight [text-shadow:0_1px_2px_rgba(0,0,0,0.06)]"
        >
          <span ref={titleLine1Ref} className="inline-block opacity-0">Hương vị</span>
          <br />
          <span ref={titleLine2Ref} className="italic font-normal inline-block opacity-0">Bao cấp</span>
        </h1>

        {/* Red Seal */}
        <div
          ref={sealRef}
          className="absolute -bottom-8 -right-16 md:-bottom-8 md:-right-24 w-24 h-24 md:w-32 md:h-32 rounded-full border-[4px] border-seal flex flex-col items-center justify-center text-seal opacity-0 shadow-[0_0_15px_rgba(139,30,30,0.15)] bg-paper-texture mix-blend-multiply pointer-events-none"
        >
          <div className="text-[0.6rem] md:text-sm tracking-[0.2em] font-archival uppercase font-bold text-center leading-tight">
            Đã xác thực<br/>
            <span className="text-[1.2rem] md:text-2xl mt-1 block">76—86</span>
          </div>
        </div>
      </div>

      {/* Subtitle / Descriptive Text */}
      <div
        ref={subtitleRef}
        className="max-w-2xl mx-auto pt-8 border-t border-ink/20 relative opacity-0"
      >
        <span
          ref={fleuronRef}
          className="absolute -top-3 left-1/2 -translate-x-1/2 bg-paper-texture px-4 text-ink-light text-xl inline-block"
        >
          ❧
        </span>
        <p className="font-archival text-lg md:text-2xl text-ink-light leading-relaxed italic opacity-90">
          Ký ức về một thời tem phiếu, nơi bữa ăn đơn giản — bo bo, cơm độn khoai, cháo cám — trở thành minh chứng cho sức sống của cả một thế hệ.
        </p>
      </div>

      {/* Bottom Decoration */}
      <div
        ref={bottomDecoRef}
        className="flex flex-col items-center gap-2 mt-12 opacity-0"
      >
        <div className="w-16 h-px bg-ink/30"></div>
        <div className="w-8 h-px bg-ink/20"></div>
      </div>
    </div>
  );
};

export default AnimatedTitle;
