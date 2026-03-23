"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  Files,
  LibraryBig,
} from "lucide-react";
import { getAllPosts } from "@/features/tai-lieu/data";
import { DocumentCard } from "@/components/ui/DocumentCard";
import { RecordStamp } from "@/components/ui/RecordStamp";

const truncate = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim()}...`;
};

const TaiLieuPage = () => {
  const posts = getAllPosts();
  const totalResources = posts.reduce(
    (count, post) => count + (post.linkResource?.length ?? 0),
    0
  );

  const backLinkRef = useRef<HTMLAnchorElement>(null);
  const stampRef = useRef<HTMLSpanElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const tipsCardRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (backLinkRef.current) {
        gsap.fromTo(
          backLinkRef.current,
          { opacity: 0, x: -8 },
          { opacity: 1, x: 0, duration: 0.5, delay: 0, ease: "power2.out" }
        );
      }
      if (stampRef.current) {
        gsap.fromTo(
          stampRef.current,
          { opacity: 0, x: 8 },
          { opacity: 1, x: 0, duration: 0.5, delay: 0, ease: "power2.out" }
        );
      }
      const topCards = [heroCardRef.current, tipsCardRef.current].filter(Boolean);
      if (topCards.length) {
        gsap.fromTo(
          topCards,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.15, stagger: 0.1, ease: "power2.out" }
        );
      }
      const cards = cardRefs.current.filter(Boolean);
      if (cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, delay: 0.5, ease: "power2.out" }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen px-4 py-8 md:px-6 md:py-12 text-ink">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            ref={backLinkRef}
            href="/"
            className="inline-flex items-center gap-2 border-b border-transparent pb-1 text-sm font-semibold uppercase tracking-[0.24em] text-ink-light transition-all duration-300 hover:border-seal hover:text-seal hover:translate-x-0.5 opacity-0"
          >
            <span aria-hidden="true">-</span>
            Quay lại trang bìa
          </Link>

          <span ref={stampRef} className="hidden sm:inline-block opacity-0">
            <RecordStamp label="Kho tư liệu" date="1976-1986" />
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)]">
          <div ref={heroCardRef} className="opacity-0">
          <DocumentCard className="bg-paper-texture">
            <div className="flex flex-wrap items-start justify-between gap-6 border-b border-ink/15 pb-6">
              <div className="max-w-3xl space-y-4">
                <span className="inline-flex items-center gap-2 border border-seal/25 bg-seal/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-seal">
                  <LibraryBig className="h-4 w-4" />
                  Tư liệu hiện vật
                </span>
                <div className="space-y-3">
                  <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
                    Không gian lưu trữ dễ đọc hơn, gợi cảm giác mở từng hồ sơ lịch sử.
                  </h1>
                  <p className="max-w-3xl text-base leading-8 text-ink-light md:text-lg">
                    Mỗi tư liệu được trình bày như một hồ sơ hiện vật: có mốc thời gian,
                    mô tả ngắn, hình đính kèm và nguồn tham khảo. Mục tiêu là giúp
                    người học xem thoải mái hơn, ít rối mắt hơn và dễ tìm lại nội dung cần đọc.
                  </p>
                </div>
              </div>

              <div className="grid min-w-[240px] gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div className="border border-ink/15 bg-white/55 p-4 shadow-sm transition-all duration-200 hover:bg-white/70 hover:shadow-sm hover:border-seal/20">
                  <div className="mb-2 flex items-center gap-2 text-seal">
                    <Files className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em]">Hồ sơ</span>
                  </div>
                  <div className="text-3xl font-bold">{posts.length}</div>
                  <p className="mt-1 text-sm text-ink-light">Mục đang lưu trữ</p>
                </div>
                <div className="border border-ink/15 bg-white/55 p-4 shadow-sm transition-all duration-200 hover:bg-white/70 hover:shadow-sm hover:border-seal/20">
                  <div className="mb-2 flex items-center gap-2 text-seal">
                    <BookOpenText className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em]">Nguồn</span>
                  </div>
                  <div className="text-3xl font-bold">{totalResources}</div>
                  <p className="mt-1 text-sm text-ink-light">Liên kết tham khảo</p>
                </div>
              </div>
            </div>
          </DocumentCard>
          </div>

          <div ref={tipsCardRef} className="opacity-0">
          <DocumentCard className="bg-[#efe2c5] p-6 md:p-8">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-seal">
                Cách xem gợi ý
              </p>
              <h2 className="text-2xl font-bold leading-tight">
                Ưu tiên đọc theo từng hồ sơ thay vì cuộn một mạch dài.
              </h2>
              <ul className="space-y-3 text-sm leading-7 text-ink-light md:text-base">
                <li className="transition-transform duration-200 hover:translate-x-1">- Mở theo thứ tự mốc thời gian để giữ mạch lịch sử.</li>
                <li className="transition-transform duration-200 hover:translate-x-1">- Dùng phần mô tả ngắn để quét nhanh trước khi đọc sâu.</li>
                <li className="transition-transform duration-200 hover:translate-x-1">- Khi cần ôn tập, đọc lại văn bản và xem lại nguồn ở cột phụ.</li>
              </ul>
            </div>
          </DocumentCard>
          </div>
        </div>

        <section className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-2">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              ref={(el) => { cardRefs.current[index] = el; }}
              href={`/tai-lieu/${post.slug}`}
              className="group block opacity-0"
            >
              <DocumentCard
                variant="hoverable"
                className="flex h-full flex-col bg-[#f8efdc] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-document-hover group-hover:border-seal/15"
              >
                <div className="flex items-start justify-between gap-4 border-b border-ink/10 pb-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-seal">
                      Hồ sơ {post.id.toString().padStart(2, "0")}
                    </p>
                    <p className="mt-1 text-sm text-ink-light">{post.milestone}</p>
                  </div>
                  <div className="border border-ink/15 bg-white/60 px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-ink-light">
                    Văn bản
                  </div>
                </div>

                {post.image?.[0] && (
                  <div className="mt-5 overflow-hidden border border-ink/15 bg-[#efe2c5] p-2">
                    <img
                      src={post.image[0]}
                      alt={post.title}
                      className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] lg:h-72"
                      loading="lazy"
                      crossOrigin="anonymous"
                    />
                  </div>
                )}

                <div className="mt-5 flex flex-1 flex-col">
                  <h3 className="text-2xl font-bold leading-snug text-ink transition-colors group-hover:text-seal">
                    {post.title}
                  </h3>
                  {post.shortDescription && (
                    <p className="mt-3 flex-1 text-[1rem] leading-7 text-ink-light">
                      {truncate(post.shortDescription, 155)}
                    </p>
                  )}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-ink/10 pt-4 text-sm text-ink-light">
                  <div className="border border-ink/10 bg-white/55 px-3 py-2">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-seal">Nguồn</div>
                    <div className="mt-1 font-semibold text-ink">
                      {post.linkResource?.length ?? 0} liên kết
                    </div>
                  </div>
                  <div className="border border-ink/10 bg-white/55 px-3 py-2">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-seal">Định dạng</div>
                    <div className="mt-1 font-semibold text-ink">
                      Bài đọc
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-dashed border-ink/20 pt-4 text-sm font-semibold uppercase tracking-[0.22em] text-seal transition-all duration-200 group-hover:bg-seal/5 group-hover:border-seal/25">
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">Mở hồ sơ</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </DocumentCard>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
};

export default TaiLieuPage;
