"use client";

import { PostType } from "@/common/types/post.type";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Calendar, ExternalLink, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { DocumentCard } from "@/components/ui/DocumentCard";

interface TimelineDetailPageProps {
  post: PostType;
}

const TimelineDetailPage: React.FC<TimelineDetailPageProps> = ({ post }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const actionsBarRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (actionsBarRef.current) {
        gsap.fromTo(
          actionsBarRef.current,
          { opacity: 0, y: -12 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0, ease: "power2.out" }
        );
      }
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: "power3.out" }
        );
      }
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 30, rotationX: 10 },
          { opacity: 1, y: 0, rotationX: 0, duration: 0.8, delay: 0.25, ease: "power3.out" }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="container mx-auto px-4 md:px-6 py-12 font-archival text-ink">
      <div className="max-w-4xl mx-auto">
        {/* Archival Actions */}
        <div ref={actionsBarRef} className="flex justify-between items-center mb-8 opacity-0">
           <Link
             href="/tai-lieu"
             className="inline-flex items-center gap-2 text-ink-light hover:text-seal transition-colors font-bold text-sm tracking-widest uppercase border-b border-transparent hover:border-seal pb-1"
           >
             <ArrowLeft className="w-4 h-4" /> Đóng hồ sơ
           </Link>
           <div className="font-mono text-xs tracking-[0.2em] text-ink/50 uppercase">
              Tài liệu đính kèm
           </div>
        </div>

        {/* Header / Dossier Cover Data */}
        <div ref={headerRef} className="mb-12 border-b-2 border-double border-ink/20 pb-8 text-center relative mt-8 opacity-0">
          
          <div className="absolute top-0 right-0 w-24 h-24 border-[3px] border-seal rounded-full opacity-60 flex items-center justify-center transform rotate-12 pointer-events-none hidden md:flex mix-blend-multiply bg-[#F9F1E1]">
            <span className="text-seal font-bold text-xs tracking-widest text-center uppercase leading-tight">
              Đã thẩm<br/>định nội dung
            </span>
          </div>

          <div className="inline-block mb-6 px-4 py-1 border border-ink/30 bg-[#EADCBF] shadow-sm transform -rotate-2">
            <span className="text-ink font-bold text-sm tracking-widest uppercase flex items-center gap-2">
               <Calendar className="w-4 h-4 text-seal" />
               Giai đoạn: {post.milestone}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-ink mb-6 leading-tight uppercase tracking-tight">
            {post.title}
          </h1>

          {post.shortDescription && (
            <p className="text-ink-light text-xl leading-relaxed italic max-w-2xl mx-auto">
              {post.shortDescription}
            </p>
          )}
        </div>

        {/* Main Document Content */}
        <div ref={contentRef} className="opacity-0" style={{ perspective: "1000px" }}>
           <DocumentCard padding="lg" className="w-full">
             
             {/* Archival Document Header */}
             <div className="flex justify-between items-end border-b-2 border-ink/80 pb-2 mb-10 w-full">
                <div className="flex flex-col">
                   <span className="font-bold tracking-widest text-xs uppercase text-seal mb-1">Mã tham chiếu:</span>
                   <span className="font-mono text-xl text-ink font-bold tracking-tighter">{post.slug.toUpperCase().slice(0, 15)}</span>
                </div>
                <div className="text-right">
                   <span className="text-[10px] tracking-[0.2em] uppercase text-ink/60">Trang 01 / Bản Gốc</span>
                </div>
             </div>

             {/* Hero Image - Styled as attached photo */}
             {post.image && post.image.length > 0 && (
               <div className="mb-12 relative w-full md:w-5/6 mx-auto transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                 {/* Tape elements */}
                 <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow-900/10 backdrop-blur-sm border border-yellow-800/20 transform rotate-2 z-20 shadow-sm"></div>
                 
                 <div className="p-2 bg-[#F5E6C8] border border-ink/20 shadow-document-hover">
                   <img
                     src={post.image[0]}
                     alt={post.title}
                     className="w-full h-auto object-cover sepia-[0.2] contrast-[1.1] brightness-[0.9]"
                     loading="lazy"
                     crossOrigin="anonymous"
                   />
                 </div>
                 <div className="mt-3 text-center text-sm italic font-archival text-ink-light">Ảnh đính kèm. Hồ sơ lưu trữ: {post.milestone}</div>
               </div>
             )}

             {/* Markdown Content rendered as typewriter / printed text */}
             <div className="prose prose-lg max-w-none text-ink prose-headings:font-archival prose-headings:text-seal prose-p:font-archival prose-p:leading-relaxed prose-p:text-lg prose-a:text-seal prose-a:underline prose-li:font-archival prose-strong:text-ink prose-strong:font-bold">
               <ReactMarkdown
                 remarkPlugins={[remarkGfm]}
                 components={{
                   h2: ({ children }) => (
                     <h2 className="text-3xl font-bold uppercase tracking-wide border-b border-ink/20 pb-2 mt-12 mb-6 flex items-center gap-3">
                       <span className="text-seal opacity-50">§</span>
                       {children}
                     </h2>
                   ),
                   h3: ({ children }) => (
                     <h3 className="text-2xl font-bold italic mt-8 mb-4">
                       {children}
                     </h3>
                   ),
                   blockquote: ({ children }) => (
                     <blockquote className="border-l-[4px] border-accent-green pl-6 py-2 my-8 bg-[#EADCBF]/30 italic opacity-90 mx-0 md:mx-4">
                       <div className="text-accent-green text-xl leading-relaxed">
                         {children}
                       </div>
                     </blockquote>
                   ),
                 }}
               >
                 {post.content}
               </ReactMarkdown>
             </div>

             {/* Divider */}
             <div className="flex justify-center my-16 opacity-30">
               <span className="text-2xl tracking-[1em]">***</span>
             </div>

             {/* References & Additional Info */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 pt-12 border-t-2 border-dotted border-ink/40">
                {/* Additional Images */}
                <div className="order-2 md:order-1">
                  {post.image && post.image.length > 1 && (
                     <div>
                        <h4 className="font-bold text-sm tracking-widest uppercase mb-6 text-seal">Phụ bản hình ảnh:</h4>
                        <div className="grid grid-cols-2 gap-4">
                           {post.image.slice(1).map((img, idx) => (
                           <div key={idx} className="p-1 border border-ink/20 bg-white shadow-sm transform -rotate-2 hover:rotate-1 transition-transform">
                              <img
                                 src={img}
                                 alt={`${post.title} - ${idx + 2}`}
                                 className="w-full h-32 object-cover sepia-[0.3]"
                              />
                           </div>
                           ))}
                        </div>
                     </div>
                  )}
                </div>

                {/* Status and Links */}
                <div className="order-1 md:order-2 flex flex-col items-start md:items-end">
                  <h4 className="font-bold text-sm tracking-widest uppercase mb-4 text-seal">Tình trạng hồ sơ:</h4>
                  <div className="w-24 h-24 rounded-full border-[3px] border-seal flex items-center justify-center text-seal transform rotate-6 mb-8 bg-transparent mix-blend-multiply">
                     <span className="font-bold text-xs uppercase tracking-widest leading-tight text-center">Đã xuất<br/>bản</span>
                  </div>

                  {/* Resource Links */}
                  {post.linkResource && post.linkResource.length > 0 && (
                     <div className="w-full text-left md:text-right mt-auto">
                        <h4 className="font-bold text-sm tracking-widest uppercase mb-4 text-ink-light">Nguồn trích dẫn:</h4>
                        <div className="flex flex-col gap-2 items-start md:items-end w-full">
                           {post.linkResource.map((link, idx) => (
                           <a
                              key={idx}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1.5 border border-ink/30 text-ink text-sm bg-paper-texture hover:bg-[#EADCBF] transition-colors overflow-hidden"
                           >
                              <ExternalLink className="w-4 h-4" />
                              <span className="font-mono truncate max-w-[200px]">
                                 {new URL(link).hostname.replace('www.', '')}
                              </span>
                           </a>
                           ))}
                        </div>
                     </div>
                  )}
                </div>
             </div>
           </DocumentCard>
        </div>
      </div>
    </div>
  );
};
export default TimelineDetailPage;
