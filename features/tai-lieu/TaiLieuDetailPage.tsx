'use client';

import { useEffect, useRef } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import {
  ArrowLeft,
  BookOpenText,
  CalendarDays,
  ExternalLink,
  Files,
  Image as ImageIcon,
} from 'lucide-react';
import 'katex/dist/katex.min.css';
import { getPostBySlug } from '@/features/tai-lieu/data';
import { DocumentCard } from '@/components/ui/DocumentCard';
import { MarginalNote } from '@/components/ui/MarginalNote';
import { RecordStamp } from '@/components/ui/RecordStamp';

export default function TaiLieuDetailPage({ slug }: { slug: string }) {
  const router = useRouter();
  const post = getPostBySlug(slug);

  const backBtnRef = useRef<HTMLButtonElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const contentCardRef = useRef<HTMLDivElement>(null);
  const extraImagesCardRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (backBtnRef.current) {
        gsap.fromTo(backBtnRef.current, { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.5, delay: 0, ease: 'power2.out' });
      }
      if (stampRef.current) {
        gsap.fromTo(stampRef.current, { opacity: 0, x: 8 }, { opacity: 1, x: 0, duration: 0.5, delay: 0, ease: 'power2.out' });
      }
      const mainCards = [heroCardRef.current, contentCardRef.current].filter(Boolean);
      if (mainCards.length) {
        gsap.fromTo(mainCards, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.12, stagger: 0.1, ease: 'power2.out' });
      }
      if (extraImagesCardRef.current) {
        gsap.fromTo(extraImagesCardRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.35, ease: 'power2.out' });
      }
      if (asideRef.current) {
        const cards = asideRef.current.querySelectorAll('[data-aside-card]');
        if (cards.length) {
          gsap.fromTo(cards, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.45, delay: 0.4, stagger: 0.08, ease: 'power2.out' });
        }
      }
    });
    return () => ctx.revert();
  }, []);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen px-4 py-8 md:px-6 md:py-12 text-ink">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            ref={backBtnRef}
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 border-b border-transparent pb-1 text-sm font-semibold uppercase tracking-[0.24em] text-ink-light transition-colors hover:border-seal hover:text-seal"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại kho tư liệu
          </button>

          <div ref={stampRef}>
            <RecordStamp label="Đã lưu trữ" date={post.milestone} />
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-8">
            <div ref={heroCardRef} className="opacity-0">
              <DocumentCard className="bg-paper-texture">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-ink/10 pb-6">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-ink-light">
                      <span className="inline-flex items-center gap-2 border border-seal/20 bg-seal/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-seal">
                        <Files className="h-4 w-4" />
                        Hồ sơ {post.id.toString().padStart(2, '0')}
                      </span>
                      <span className="inline-flex items-center gap-2 border border-ink/15 bg-white/55 px-3 py-1">
                        <CalendarDays className="h-4 w-4 text-seal" />
                        {post.milestone}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
                        {post.title}
                      </h1>
                      {post.shortDescription && (
                        <p className="max-w-3xl text-base leading-8 text-ink-light md:text-lg">
                          {post.shortDescription}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {post.image?.[0] && (
                  <div className="mt-8 space-y-3">
                    <div className="overflow-hidden border border-ink/15 bg-[#efe2c5] p-3 shadow-sm">
                      <img
                        src={post.image[0]}
                        alt={post.title}
                        className="max-h-[520px] w-full object-cover"
                        loading="lazy"
                        crossOrigin="anonymous"
                      />
                    </div>
                    <p className="text-sm italic leading-6 text-ink-light">
                      Hình đính kèm trong hồ sơ hiện vật, dùng để tăng khả năng ghi nhớ nội dung khi học.
                    </p>
                  </div>
                )}
              </DocumentCard>
            </div>

            <div ref={contentCardRef} className="opacity-0">
              <DocumentCard className="bg-[#f8efdc]">
                <div className="border-b border-ink/10 pb-5">
                  <h2 className="text-2xl font-bold">Nội dung tư liệu</h2>
                  <p className="mt-2 text-sm leading-7 text-ink-light md:text-base">
                    Trình bày theo nhịp đọc thoáng hơn để người học dễ tập trung vào mốc chính, câu chuyện và ý nghĩa lịch sử.
                  </p>
                </div>

                <MarginalNote title="Gợi ý đọc nhanh" className="mt-6">
                  Hãy đọc tiêu đề lớn trước, xem ảnh hiện vật, sau đó mới đi vào từng mục nhỏ để giữ mạch hiểu tốt hơn.
                </MarginalNote>

                <div className="prose mt-8 max-w-none prose-headings:font-archival prose-headings:text-seal prose-p:text-ink prose-p:leading-8 prose-li:text-ink prose-li:leading-8 prose-strong:text-ink prose-a:text-seal prose-blockquote:border-l-4 prose-blockquote:border-accent-green prose-blockquote:bg-[#e9dcc0] prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:text-accent-green">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                      h2: ({ children }) => (
                        <h2 className="mt-10 border-b border-ink/10 pb-3 text-3xl font-bold leading-tight">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="mt-8 text-2xl font-bold leading-tight text-ink">
                          {children}
                        </h3>
                      ),
                      p: ({ children }) => (
                        <p className="text-[1rem] leading-8 text-ink md:text-[1.06rem]">{children}</p>
                      ),
                      ul: ({ children }) => (
                        <ul className="my-5 space-y-3 pl-6 text-[1rem] leading-8 text-ink marker:text-seal">
                          {children}
                        </ul>
                      ),
                      li: ({ children }) => <li>{children}</li>,
                      blockquote: ({ children }) => (
                        <blockquote className="my-8 border-l-4 border-accent-green bg-[#e7dbc2] px-6 py-4 italic leading-8 text-accent-green">
                          {children}
                        </blockquote>
                      ),
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>
              </DocumentCard>
            </div>

            {post.image && post.image.length > 1 && (
              <div ref={extraImagesCardRef} className="opacity-0">
                <DocumentCard className="bg-[#f8efdc]">
                  <div className="flex items-center gap-3 border-b border-ink/10 pb-4">
                    <ImageIcon className="h-5 w-5 text-seal" />
                    <h2 className="text-2xl font-bold">Hình ảnh bổ sung</h2>
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {post.image.slice(1).map((image, index) => (
                      <div key={image + index} className="overflow-hidden border border-ink/15 bg-[#efe2c5] p-2 shadow-sm">
                        <img
                          src={image}
                          alt={`${post.title} - hình ${index + 2}`}
                          className="h-64 w-full object-cover"
                          loading="lazy"
                          crossOrigin="anonymous"
                        />
                      </div>
                    ))}
                  </div>
                </DocumentCard>
              </div>
            )}
          </div>

          <aside ref={asideRef} className="space-y-6 xl:sticky xl:top-8 xl:self-start">
            <DocumentCard data-aside-card className="bg-[#efe2c5] p-6 opacity-0">
              <div className="mb-4 flex items-center gap-3 border-b border-ink/10 pb-4">
                <BookOpenText className="h-5 w-5 text-seal" />
                <div>
                  <h2 className="text-lg font-bold">Thông tin hồ sơ</h2>
                  <p className="text-sm text-ink-light">Tóm tắt nhanh trước khi đọc sâu.</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-ink-light">
                <div className="flex items-start justify-between gap-4 border-b border-dashed border-ink/10 pb-3">
                  <span className="uppercase tracking-[0.22em]">Mã hồ sơ</span>
                  <span className="font-mono text-ink">{post.slug.toUpperCase()}</span>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-dashed border-ink/10 pb-3">
                  <span className="uppercase tracking-[0.22em]">Mốc thời gian</span>
                  <span className="font-semibold text-ink">{post.milestone}</span>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-dashed border-ink/10 pb-3">
                  <span className="uppercase tracking-[0.22em]">Số ảnh</span>
                  <span className="font-semibold text-ink">{post.image?.length ?? 0}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="uppercase tracking-[0.22em]">Tài liệu nguồn</span>
                  <span className="font-semibold text-ink">{post.linkResource?.length ?? 0}</span>
                </div>
              </div>
            </DocumentCard>

            {post.linkResource && post.linkResource.length > 0 && (
              <DocumentCard data-aside-card className="bg-[#efe2c5] p-6 opacity-0">
                <div className="mb-4 border-b border-ink/10 pb-4">
                  <h2 className="text-lg font-bold">Tài liệu tham khảo</h2>
                  <p className="mt-1 text-sm text-ink-light">
                    Mở nguồn gốc khi cần kiểm tra hoặc đọc mở rộng.
                  </p>
                </div>

                <div className="space-y-3">
                  {post.linkResource.map((link, index) => (
                    <a
                      key={link + index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start justify-between gap-3 border border-ink/15 bg-white/60 px-4 py-3 text-sm text-ink transition-colors hover:border-seal/30 hover:bg-white"
                    >
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.2em] text-seal">
                          Nguồn {index + 1}
                        </div>
                        <div className="mt-1 break-all leading-6 text-ink-light">{link}</div>
                      </div>
                      <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-seal" />
                    </a>
                  ))}
                </div>
              </DocumentCard>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
