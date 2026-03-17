"use client";

import { Star, Trophy, HelpCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface WelcomeScreenProps {
  onStart: () => void;
  onShowInstructions: () => void;
  onShowLeaderboard: () => void;
}

export default function WelcomeScreen({
  onStart,
  onShowInstructions,
  onShowLeaderboard,
}: WelcomeScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    starsRef.current.forEach((star, index) => {
      if (star) {
        gsap.fromTo(
          star,
          { scale: 0, rotation: -180, opacity: 0 },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(1.7)",
          }
        );
      }
    });

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power3.out" }
      );
    }

    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 0.5 }
      );
    }

    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: 0.7,
          ease: "back.out(1.5)",
        }
      );
    }

    if (secondaryRef.current) {
      gsap.fromTo(
        secondaryRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 0.9 }
      );
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden p-6 text-ink"
    >
      <div
        ref={(el) => {
          starsRef.current[0] = el;
        }}
        className="absolute left-8 top-8"
      >
        <Star className="h-16 w-16 fill-[#c9a227] text-[#c9a227] drop-shadow-[0_6px_12px_rgba(201,162,39,0.25)]" />
      </div>
      <div
        ref={(el) => {
          starsRef.current[1] = el;
        }}
        className="absolute right-8 top-8"
      >
        <Star className="h-16 w-16 fill-[#c9a227] text-[#c9a227] drop-shadow-[0_6px_12px_rgba(201,162,39,0.25)]" />
      </div>
      <div
        ref={(el) => {
          starsRef.current[2] = el;
        }}
        className="absolute bottom-8 left-1/4"
      >
        <Star className="h-12 w-12 fill-[#c9a227] text-[#c9a227] opacity-60" />
      </div>
      <div
        ref={(el) => {
          starsRef.current[3] = el;
        }}
        className="absolute bottom-8 right-1/4"
      >
        <Star className="h-12 w-12 fill-[#c9a227] text-[#c9a227] opacity-60" />
      </div>

      <div className="max-w-4xl text-center">
        <h1
          ref={titleRef}
          className="mb-6 text-5xl font-bold text-seal drop-shadow-[0_12px_32px_rgba(139,30,30,0.16)] md:text-7xl"
        >
          HUONG VI BAO CAP
        </h1>

        <h2
          ref={subtitleRef}
          className="mb-12 px-4 text-xl font-semibold leading-relaxed text-ink md:text-2xl"
        >
          Am thuc thoi tem phieu
          <br />
          Bo bo, com don khoai, chao cam
        </h2>

        <button
          ref={buttonRef}
          onClick={onStart}
          className="mb-8 rounded-2xl bg-gradient-to-r from-seal to-[#a82b2b] px-12 py-4 text-xl font-bold text-[#F5E6C8] shadow-2xl shadow-[rgba(139,30,30,0.24)] transition-all duration-300 hover:scale-105 hover:shadow-[rgba(139,30,30,0.32)] md:text-2xl"
        >
          BAT DAU CHOI
        </button>

        <div
          ref={secondaryRef}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={onShowInstructions}
            className="flex items-center gap-2 rounded-xl border-2 border-ink/15 bg-[#f8efdc]/90 px-6 py-3 font-semibold text-ink transition-all duration-300 hover:scale-105 hover:border-seal/30 hover:bg-[#f3e7cf]"
          >
            <HelpCircle className="h-5 w-5" />
            Huong dan
          </button>

          <button
            onClick={onShowLeaderboard}
            className="flex items-center gap-2 rounded-xl border-2 border-ink/15 bg-[#f8efdc]/90 px-6 py-3 font-semibold text-ink transition-all duration-300 hover:scale-105 hover:border-seal/30 hover:bg-[#f3e7cf]"
          >
            <Trophy className="h-5 w-5" />
            Bang xep hang
          </button>
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-lg text-ink-light">
          Tra loi cau hoi ve am thuc thoi bao cap de thu thap manh ghep va hoan thanh buc tranh.
        </p>
      </div>
    </div>
  );
}
