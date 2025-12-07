"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ContentsPage = () => {
  const pathname = usePathname();

  const contentLinks = [
    { name: "Content 1", path: "/contents/content-1" },
    { name: "Content 2", path: "/contents/content-2" },
    { name: "Content 3", path: "/contents/content-3" },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-amber-100 mb-12 text-center">
          Contents Navigation
        </h1>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contentLinks.map((link) => {
            const isActive = pathname === link.path;

            return (
              <Link
                key={link.path}
                href={link.path}
                className={`group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 ${
                  isActive
                    ? "bg-amber-600/60 shadow-2xl shadow-amber-600/30 scale-105"
                    : "bg-white/10 hover:bg-amber-700/40 hover:scale-105"
                } backdrop-blur-md border ${
                  isActive ? "border-amber-500/50" : "border-white/20"
                }`}
              >
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-amber-100 mb-3">
                    {link.name}
                  </h2>
                  <p className="text-white/70 group-hover:text-white/90 transition-colors">
                    Click to view {link.name.toLowerCase()}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="absolute bottom-4 right-4 text-amber-300 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContentsPage;
