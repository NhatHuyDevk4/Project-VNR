"use client";

import ContentPageShell from "@/components/content/ContentPageShell";
import type {
  FoodArticleData,
  FoodArticlePoint,
  FoodArticleVirtues,
} from "../../features/contents/foodArticles";
import { Star, AlertTriangle, PenTool } from "lucide-react";
import { DocumentCard } from "@/components/ui/DocumentCard";
import { MarginalNote } from "@/components/ui/MarginalNote";

interface FoodArticlePageProps {
  data: FoodArticleData;
}

export default function FoodArticlePage({ data }: FoodArticlePageProps) {
  const purposeSections = data.moralityPoints.slice(0, 2) as FoodArticlePoint[];
  const virtuesData = data.moralityPoints[2] as FoodArticleVirtues;
  const sidebar = data.sidebarNotes?.length
    ? data.sidebarNotes.map((note, index) => (
        <div key={note.title} className={index > 0 ? "mt-80" : undefined}>
          <MarginalNote title={note.title} className="border-accent-gold text-accent-gold">
            <span className="text-ink-light text-sm italic">{note.text}</span>
          </MarginalNote>
        </div>
      ))
    : null;

  return (
    <ContentPageShell
      title={data.title}
      subtitle={data.subtitle}
      eyebrow="Ẩm thực bao cấp"
      showHeader={true}
      sidebar={sidebar ?? undefined}
    >
      <div className="space-y-16">
        <section>
          <DocumentCard padding="lg">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <span className="text-5xl text-seal font-serif pt-2 pr-2 border-r border-ink/20 leading-none h-full md:min-h-[100px]">
                "
              </span>
              <div className="flex-1">
                <p className="text-sm font-mono tracking-widest uppercase text-ink/50 mb-3">
                  {data.introduction.context}
                </p>
                <blockquote className="text-2xl font-bold text-ink mb-4 italic leading-relaxed">
                  {data.introduction.quote}
                </blockquote>
                <p className="text-ink-light text-lg text-justify leading-relaxed">
                  {data.introduction.description}
                </p>
                <p className="text-right mt-4 font-bold text-seal uppercase tracking-widest text-sm">
                  — {data.introduction.author}
                </p>
              </div>
            </div>
          </DocumentCard>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-ink mb-8 flex items-center gap-4 border-b border-ink/20 pb-4">
            <span className="text-seal opacity-50">§1.</span>
            <span className="uppercase tracking-wide">Bối Cảnh Ra Đời</span>
          </h2>
          <div className="space-y-12">
            {purposeSections.map((point) => (
              <div key={point.title} className="relative pl-6 lg:pl-12 border-l-2 border-dashed border-ink/20">
                <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-paper-texture border-[3px] border-seal text-seal font-bold font-mono flex items-center justify-center text-sm shadow-sm">
                  {point.id}
                </div>
                <h3 className="text-xl font-bold text-ink mb-4 tracking-wide uppercase">
                  {point.title}
                </h3>
                <p className="text-ink-light text-lg leading-relaxed text-justify mb-6">
                  {point.content}
                </p>

                {point.highlights && (
                  <div className="flex flex-wrap gap-2">
                    {point.highlights.map((hl: string) => (
                      <span key={hl} className="text-xs font-bold uppercase tracking-widest bg-ink/5 border border-ink/10 px-2 py-1 text-ink-light">
                        {hl}
                      </span>
                    ))}
                  </div>
                )}

                {point.keyPoints && (
                  <div className="flex flex-wrap gap-2">
                    {point.keyPoints.map((kp: string) => (
                      <span key={kp} className="text-xs font-bold uppercase tracking-widest bg-seal/5 border border-seal/20 px-2 py-1 text-seal">
                        ✓ {kp}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <DocumentCard padding="lg" className="bg-[#EADCBF] border-ink/40 relative">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-seal shadow-md opacity-90 border border-ink"></div>

            <h2 className="text-3xl font-bold text-ink mt-4 mb-6 text-center uppercase tracking-widest">
              {virtuesData.title}
            </h2>
            <p className="text-ink-light text-xl leading-relaxed mb-8 italic text-center px-4">
              {virtuesData.content}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-ink/20 pt-8 mt-8">
              <div>
                <h3 className="text-lg font-bold uppercase tracking-widest text-seal mb-4 border-b border-ink/10 pb-2 flex items-center gap-2">
                  <PenTool className="w-5 h-5" />
                  {virtuesData.virtues.title}
                </h3>
                <ul className="space-y-2 font-mono text-sm tracking-mid mt-2 list-inside list-disc text-ink-light marker:text-seal">
                  {virtuesData.virtues.items.map((item: string) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-widest text-seal mb-4 border-b border-ink/10 pb-2">
                  Phẩm chất
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {virtuesData.qualities.map((q: string) => (
                    <span key={q} className="border border-ink text-ink font-bold text-xs uppercase px-2 py-1 tracking-widest transform rotate-1 bg-white hover:rotate-0 transition-transform">
                      {q}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 bg-paper-texture border border-ink/20 p-6 text-center shadow-inner">
              <blockquote className="font-bold text-xl text-ink">
                "{virtuesData.quote}"
              </blockquote>
            </div>
          </DocumentCard>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-ink mb-6 flex items-center gap-4 border-b border-ink/20 pb-4">
            <span className="text-seal opacity-50">§2.</span>
            <span className="uppercase tracking-wide">{data.civilizedParty.title}</span>
          </h2>
          <p className="text-ink-light text-lg leading-relaxed mb-10 first-letter:text-4xl first-letter:font-bold first-letter:text-seal first-letter:float-left first-letter:mr-2">
            {data.civilizedParty.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.civilizedParty.characteristics.map((char) => (
              <DocumentCard key={char.id} padding="sm" variant="hoverable" className="h-full">
                <h3 className="text-lg font-bold text-ink mb-3 uppercase tracking-wide border-b border-ink/10 pb-2">
                  {char.title}
                </h3>
                <p className="text-ink-light text-justify leading-relaxed">
                  {char.content}
                </p>
              </DocumentCard>
            ))}
          </div>
        </section>

        <section>
          <div className="border-[3px] border-seal p-1">
            <div className="border border-seal p-6 lg:p-10 text-center bg-[#F9F1E1] relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-b border-r border-seal"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-b border-l border-seal"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-t border-r border-seal"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-t border-l border-seal"></div>

              <AlertTriangle className="w-10 h-10 text-seal mx-auto mb-4" />
              <h2 className="text-2xl font-bold uppercase tracking-widest text-ink mb-6">
                {data.warning.title}
              </h2>

              <blockquote className="text-xl italic text-seal font-bold mb-4 leading-relaxed">
                "{data.warning.quote}"
              </blockquote>
              <p className="text-sm font-mono tracking-widest uppercase text-ink/70 mb-8 border-b border-ink/20 pb-4 inline-block">
                — {data.warning.author}
              </p>

              <p className="text-ink-light leading-relaxed font-bold">
                {data.warning.message}
              </p>

              <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full border-2 border-seal text-seal flex items-center justify-center transform -rotate-12 opacity-60 pointer-events-none mix-blend-multiply">
                <span className="text-[10px] font-bold tracking-widest uppercase text-center leading-tight">
                  Tuyệt<br />Mật
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-8">
          <DocumentCard padding="lg">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 border-[3px] border-ink rounded-full mb-6 shadow-sm bg-paper-texture">
                <Star className="w-8 h-8 text-ink" />
              </div>
            </div>
            <p className="text-ink text-xl leading-relaxed text-center font-bold italic">
              {data.conclusion.text}
            </p>
          </DocumentCard>
        </section>
      </div>
    </ContentPageShell>
  );
}
