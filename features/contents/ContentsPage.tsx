"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Card from "@/components/Card";
import { CONTENT_ROUTES } from "@/common/constants/routes";

const ContentsPage = () => {
  const pathname = usePathname();

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-amber-100 mb-4 text-center">
          Nội Dung
        </h1>

        {/* Subtitle */}
        <p className="text-amber-200/70 text-center mb-16 text-lg">
          Chọn nội dung để xem chi tiết
        </p>

        {/* Content List */}
        <div className="space-y-4">
          {CONTENT_ROUTES.map((link, index) => {
            const isActive = pathname === link.path;

            return (
              <Link
                key={link.path}
                href={link.path}
                className={`group block transition-all duration-300 ${
                  isActive ? "scale-[1.02]" : "hover:scale-[1.01]"
                }`}
              >
                <Card
                  variant="list"
                  delay={index * 0.1}
                  className={`relative transition-all duration-300 ${
                    isActive
                      ? "!border-amber-600/60 !bg-amber-900/20"
                      : "hover:!border-amber-700/50 hover:!bg-black/20"
                  }`}
                >
                  <div className="flex items-baseline gap-6">
                    {/* Number */}
                    <span
                      className={`text-5xl font-bold transition-colors duration-300 ${
                        isActive
                          ? "text-amber-500"
                          : "text-amber-800/50 group-hover:text-amber-600/70"
                      }`}
                    >
                      {link.number}
                    </span>

                    {/* Content */}
                    <div className="flex-1">
                      <h2
                        className={`text-2xl font-semibold mb-2 transition-colors duration-300 ${
                          isActive
                            ? "text-amber-100"
                            : "text-amber-200/80 group-hover:text-amber-100"
                        }`}
                      >
                        {link.name}
                      </h2>
                      <p
                        className={`text-sm transition-colors duration-300 ${
                          isActive
                            ? "text-amber-300/70"
                            : "text-amber-400/50 group-hover:text-amber-300/60"
                        }`}
                      >
                        Nhấn để xem nội dung
                      </p>
                    </div>

                    {/* Arrow */}
                    <div
                      className={`text-2xl transition-all duration-300 ${
                        isActive
                          ? "text-amber-500 translate-x-0"
                          : "text-amber-700/40 -translate-x-2 group-hover:translate-x-0 group-hover:text-amber-600/60"
                      }`}
                    >
                      →
                    </div>
                  </div>

                  {/* Active indicator line */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 rounded-l-xl" />
                  )}
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContentsPage;
