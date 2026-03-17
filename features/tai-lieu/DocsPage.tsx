"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  Files,
  Headphones,
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
  const totalAudio = posts.filter((post) => post.audio).length;
  const totalResources = posts.reduce(
    (count, post) => count + (post.linkResource?.length ?? 0),
    0
  );

  return (
    <div className="min-h-screen px-4 py-8 md:px-6 md:py-12 text-ink">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 border-b border-transparent pb-1 text-sm font-semibold uppercase tracking-[0.24em] text-ink-light transition-colors hover:border-seal hover:text-seal"
          >
            <span aria-hidden="true">-</span>
            Quay lai trang bia
          </Link>

          <RecordStamp label="Kho tu lieu" date="1976-1986" className="hidden sm:inline-block" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)]">
          <DocumentCard className="bg-paper-texture">
            <div className="flex flex-wrap items-start justify-between gap-6 border-b border-ink/15 pb-6">
              <div className="max-w-3xl space-y-4">
                <span className="inline-flex items-center gap-2 border border-seal/25 bg-seal/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-seal">
                  <LibraryBig className="h-4 w-4" />
                  Tu lieu hien vat
                </span>
                <div className="space-y-3">
                  <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
                    Khong gian luu tru de doc hon, goi cam giac mo tung ho so lich su.
                  </h1>
                  <p className="max-w-3xl text-base leading-8 text-ink-light md:text-lg">
                    Moi tu lieu duoc trinh bay nhu mot ho so hien vat: co moc thoi gian,
                    mo ta ngan, hinh dinh kem, audio va nguon tham khao. Muc tieu la giup
                    nguoi hoc xem thoai mai hon, it roi mat hon va de tim lai noi dung can doc.
                  </p>
                </div>
              </div>

              <div className="grid min-w-[240px] gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <div className="border border-ink/15 bg-white/55 p-4 shadow-sm">
                  <div className="mb-2 flex items-center gap-2 text-seal">
                    <Files className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em]">Ho so</span>
                  </div>
                  <div className="text-3xl font-bold">{posts.length}</div>
                  <p className="mt-1 text-sm text-ink-light">Muc dang luu tru</p>
                </div>
                <div className="border border-ink/15 bg-white/55 p-4 shadow-sm">
                  <div className="mb-2 flex items-center gap-2 text-seal">
                    <Headphones className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em]">Audio</span>
                  </div>
                  <div className="text-3xl font-bold">{totalAudio}</div>
                  <p className="mt-1 text-sm text-ink-light">Ban nghe dinh kem</p>
                </div>
                <div className="border border-ink/15 bg-white/55 p-4 shadow-sm">
                  <div className="mb-2 flex items-center gap-2 text-seal">
                    <BookOpenText className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em]">Nguon</span>
                  </div>
                  <div className="text-3xl font-bold">{totalResources}</div>
                  <p className="mt-1 text-sm text-ink-light">Lien ket tham khao</p>
                </div>
              </div>
            </div>
          </DocumentCard>

          <DocumentCard className="bg-[#efe2c5] p-6 md:p-8">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-seal">
                Cach xem goi y
              </p>
              <h2 className="text-2xl font-bold leading-tight">
                Uu tien doc theo tung ho so thay vi cuon mot mach dai.
              </h2>
              <ul className="space-y-3 text-sm leading-7 text-ink-light md:text-base">
                <li>- Mo theo thu tu moc thoi gian de giu mach lich su.</li>
                <li>- Dung phan mo ta ngan de quet nhanh truoc khi doc sau.</li>
                <li>- Khi can on tap, nghe audio va xem lai nguon o cot phu.</li>
              </ul>
            </div>
          </DocumentCard>
        </div>

        <section className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.slug} href={`/tai-lieu/${post.slug}`} className="group block">
              <DocumentCard
                variant="hoverable"
                className="flex h-full flex-col bg-[#f8efdc] transition-transform duration-300 group-hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-4 border-b border-ink/10 pb-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-seal">
                      Ho so {post.id.toString().padStart(2, "0")}
                    </p>
                    <p className="mt-1 text-sm text-ink-light">{post.milestone}</p>
                  </div>
                  <div className="border border-ink/15 bg-white/60 px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-ink-light">
                    {post.audio ? "Co audio" : "Van ban"}
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
                    <div className="text-[11px] uppercase tracking-[0.2em] text-seal">Nguon</div>
                    <div className="mt-1 font-semibold text-ink">{post.linkResource?.length ?? 0} lien ket</div>
                  </div>
                  <div className="border border-ink/10 bg-white/55 px-3 py-2">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-seal">Dinh dang</div>
                    <div className="mt-1 font-semibold text-ink">{post.audio ? "Bai + audio" : "Bai doc"}</div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-dashed border-ink/20 pt-4 text-sm font-semibold uppercase tracking-[0.22em] text-seal">
                  <span>Mo ho so</span>
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
