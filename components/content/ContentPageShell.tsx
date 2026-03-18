"use client";

import type { ReactNode } from "react";
import ContentNavigation from "@/components/ContentNavigation";

interface ContentPageShellProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  meta?: string;
  metaSide?: "left" | "right";
  showHeader?: boolean;
  sidebar?: ReactNode;
  mainClassName?: string;
  children: ReactNode;
}

const metaPositionClasses = {
  left: "absolute top-0 left-0 text-left",
  right: "absolute top-0 right-0 text-right",
} as const;

export default function ContentPageShell({
  title,
  subtitle,
  eyebrow,
  meta,
  metaSide = "left",
  showHeader = true,
  sidebar,
  mainClassName = "lg:col-span-8 lg:col-start-3 space-y-16",
  children,
}: ContentPageShellProps) {
  return (
    <div className="min-h-screen bg-paper-texture font-archival text-ink selection:bg-seal selection:text-[#F9F1E1]">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          {showHeader && (
            <div className="text-center mb-16 border-b-4 border-double border-ink/30 pb-12 relative animate-fade-in">
              {meta && (
                <div
                  className={`font-mono text-xs tracking-widest text-ink/50 uppercase whitespace-pre-line ${metaPositionClasses[metaSide]}`}
                >
                  {meta}
                </div>
              )}

              {eyebrow && (
                <div className="inline-block mt-8 mb-6 border border-ink/20 px-6 py-2 shadow-sm bg-[#F9F1E1]">
                  <span className="text-xs tracking-[0.3em] uppercase font-bold text-seal">
                    {eyebrow}
                  </span>
                </div>
              )}

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink mb-6 uppercase tracking-tight leading-tight">
                {title}
              </h1>

              {subtitle && (
                <p className="text-xl md:text-2xl text-ink-light italic">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className={mainClassName}>{children}</div>

            {sidebar && (
              <div className="hidden lg:block lg:col-span-2 space-y-32 pt-32">
                {sidebar}
              </div>
            )}
          </div>

          <div className="mt-24 border-t-2 border-ink pb-12 pt-12">
            <ContentNavigation />
          </div>
        </div>
      </div>
    </div>
  );
}
