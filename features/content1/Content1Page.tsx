"use client";

import { useState } from "react";
import contentData from "./data/content.json";
import { Anchor, Compass, Ship, Users, Sparkles, BookOpen, Award, Target, Info } from "lucide-react";
import ContentNavigation from "@/components/ContentNavigation";
import { DocumentCard } from "@/components/ui/DocumentCard";
import { MarginalNote } from "@/components/ui/MarginalNote";

export default function Content1Page() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-paper-texture font-archival text-ink selection:bg-seal selection:text-[#F9F1E1]">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          
          {/* Document Header */}
          <div className="text-center mb-16 border-b-4 border-double border-ink/30 pb-12 relative animate-fade-in">
             <div className="absolute top-0 left-0 text-left font-mono text-xs tracking-widest text-ink/50 uppercase">
                Hồ sơ số: 01<br/>
                Lưu trữ mật
             </div>
             
             <div className="inline-block mt-8 mb-6 border border-ink/20 px-6 py-2 shadow-sm bg-[#F9F1E1]">
               <span className="text-xs tracking-[0.3em] uppercase font-bold text-seal">Chuyên đề học tập</span>
             </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink mb-6 uppercase tracking-tight leading-tight">
              {contentData.title}
            </h1>
            
            <div className="flex justify-center items-center gap-4 text-ink-light">
               <span className="w-12 h-px bg-ink/30"></span>
               <Ship className="w-6 h-6 text-seal opacity-80" />
               <span className="w-12 h-px bg-ink/30"></span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
             {/* Main Content Column */}
             <div className="lg:col-span-8 lg:col-start-3 space-y-16">
                
                {/* Introduction Quote */}
                <section>
                  <DocumentCard padding="lg">
                    <div className="flex items-start gap-4 mb-6 relative">
                       <span className="absolute -top-4 -left-2 text-6xl text-seal/20 font-serif leading-none">"</span>
                      <div className="flex-1 relative z-10">
                        <blockquote className="text-2xl font-bold text-ink mb-6 italic leading-relaxed">
                          {contentData.introduction.quote}
                        </blockquote>
                        <div className="flex justify-end flex-col items-end">
                           <p className="text-ink font-bold text-lg">— {contentData.introduction.author}</p>
                           <p className="text-sm text-ink-light mt-1 font-mono tracking-widest uppercase">{contentData.introduction.source}</p>
                        </div>
                      </div>
                    </div>

                    {/* Metaphor Section */}
                    <div className="mt-8 pt-6 border-t border-dashed border-ink/20">
                      <div className="flex items-center gap-3 mb-3">
                        <Anchor className="w-5 h-5 text-seal" />
                        <h3 className="text-xl font-bold uppercase tracking-widest text-ink">Ghi chú Hình tượng</h3>
                      </div>
                      <p className="text-ink-light text-lg leading-relaxed italic">
                        {contentData.introduction.metaphor.description}
                      </p>
                    </div>
                  </DocumentCard>
                </section>

                {/* Necessity Section */}
                <section>
                  <h2 className="text-3xl font-bold text-ink mb-8 flex items-center gap-4 border-b border-ink/20 pb-4">
                    <span className="text-seal opacity-50">§1.</span>
                    <span className="uppercase tracking-wide">{contentData.necessity.title}</span>
                  </h2>
                  <div className="space-y-6">
                    {contentData.necessity.mainPoints.map((point, index) => (
                      <div key={point.id} className="relative pl-12">
                         <div className="absolute left-0 top-1 w-8 h-8 rounded-full border border-ink text-ink font-bold font-mono flex items-center justify-center text-sm">
                            {point.id}
                         </div>
                         <h3 className="text-xl font-bold text-ink mb-2">{point.title}</h3>
                         <p className="text-ink-light text-lg leading-relaxed text-justify">
                           {point.content}
                         </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Foundation Section */}
                <section>
                   <DocumentCard padding="lg">
                     <h2 className="text-3xl font-bold text-ink mb-8 border-b-2 border-ink/80 pb-4 uppercase tracking-wide">
                        <span className="text-seal mr-3">§2.</span>{contentData.foundation.title}
                     </h2>
                     <p className="text-ink-light text-xl leading-relaxed mb-10 first-letter:text-5xl first-letter:font-bold first-letter:text-seal first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                        {contentData.foundation.description}
                     </p>

                     <div className="border border-ink/20 p-6 bg-[#F9F1E1] shadow-inner relative">
                        {/* Corner pins */}
                        <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-seal/40"></div>
                        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-seal/40"></div>
                        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-seal/40"></div>
                        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-seal/40"></div>

                        <h3 className="text-xl font-bold text-ink mb-6 uppercase tracking-widest text-center border-b border-ink/10 pb-4">
                           {contentData.foundation.hoChiMinhContribution.title}
                        </h3>
                        <ul className="space-y-4 font-serif text-lg text-ink-light list-none pl-0">
                           <li className="flex items-start gap-4">
                              <span className="text-seal mt-1">▶</span>
                              <span className="font-medium">{contentData.foundation.hoChiMinhContribution.loyalty}</span>
                           </li>
                           <li className="flex items-start gap-4">
                              <span className="text-seal mt-1">▶</span>
                              <span className="font-medium">{contentData.foundation.hoChiMinhContribution.creativity}</span>
                           </li>
                        </ul>
                     </div>
                   </DocumentCard>
                </section>

                <div className="flex justify-center my-12 opacity-30">
                  <span className="text-2xl tracking-[1em] text-ink">***</span>
                </div>

                {/* Birth of Party - Comparison */}
                <section>
                  <h2 className="text-3xl font-bold text-ink mb-10 flex items-center gap-4 border-b border-ink/20 pb-4">
                    <span className="text-seal opacity-50">§3.</span>
                    <span className="uppercase tracking-wide">{contentData.birthOfParty.title}</span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* World */}
                    <div className="border-r-0 md:border-r border-dashed border-ink/30 pr-0 md:pr-8">
                      <h3 className="text-xl font-bold text-ink mb-6 uppercase tracking-widest text-center">{contentData.birthOfParty.comparison.world.title}</h3>
                      <div className="border border-ink p-4 mb-6 text-center shadow-sm">
                        <p className="text-ink font-mono font-bold tracking-tight">
                          {contentData.birthOfParty.comparison.world.formula}
                        </p>
                      </div>
                      <ul className="space-y-3 list-disc list-inside text-ink-light marker:text-seal">
                        {contentData.birthOfParty.comparison.world.elements.map((element, idx) => (
                          <li key={idx} className="leading-relaxed">{element}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Vietnam */}
                    <div className="pl-0 md:pl-8">
                      <h3 className="text-xl font-bold text-seal mb-6 uppercase tracking-widest text-center flex items-center justify-center gap-2">
                         <Sparkles className="w-4 h-4" />
                         {contentData.birthOfParty.comparison.vietnam.title}
                      </h3>
                      <div className="border-[3px] border-seal p-4 mb-6 text-center shadow-document-hover bg-[#F9F1E1]">
                        <p className="text-seal font-mono font-bold tracking-tight text-lg">
                          {contentData.birthOfParty.comparison.vietnam.formula}
                        </p>
                      </div>
                      <ul className="space-y-3 list-disc list-inside text-ink marker:text-seal font-medium">
                        {contentData.birthOfParty.comparison.vietnam.elements.map((element, idx) => (
                          <li key={idx} className="leading-relaxed">{element}</li>
                        ))}
                      </ul>
                      <div className="mt-8 border border-seal/30 bg-seal/5 p-4 italic text-ink-light text-center">
                        Điểm sáng tạo: {contentData.birthOfParty.comparison.vietnam.innovation}
                      </div>
                    </div>
                  </div>

                  {/* Reasoning */}
                  <DocumentCard padding="sm" className="bg-[#EADCBF] border-ink/40">
                    <div className="p-6">
                       <h3 className="text-xl font-bold text-ink mb-4 uppercase tracking-widest">Ghi chép: {contentData.birthOfParty.reasoning.title}</h3>
                       <p className="text-ink-light text-lg mb-6 leading-relaxed italic border-l-4 border-ink/20 pl-4">{contentData.birthOfParty.reasoning.context}</p>

                       <div className="mt-6 pt-6 border-t border-ink/20 border-dotted">
                         <h4 className="font-bold text-seal mb-2 uppercase tracking-wide text-sm">{contentData.birthOfParty.reasoning.contradictions.title}</h4>
                         <p className="text-ink-light mb-4">{contentData.birthOfParty.reasoning.contradictions.description}</p>
                         <div className="border border-seal p-4 text-center bg-paper-texture">
                           <p className="text-ink font-bold font-mono uppercase tracking-tight">
                             Kết luận: {contentData.birthOfParty.reasoning.contradictions.mainContradiction}
                           </p>
                         </div>
                       </div>
                    </div>
                  </DocumentCard>
                </section>

                <div className="flex justify-center my-12 opacity-30">
                  <span className="text-2xl tracking-[1em] text-ink">***</span>
                </div>

                {/* Historical Development */}
                <section>
                  <h2 className="text-3xl font-bold text-ink mb-10 flex items-center gap-4 border-b border-ink/20 pb-4">
                    <span className="text-seal opacity-50">§4.</span>
                    <span className="uppercase tracking-wide">{contentData.historicalDevelopment.title}</span>
                  </h2>
                  <div className="relative border-l-2 border-ink/30 pl-8 ml-4 space-y-12 py-4">
                    {(contentData.historicalDevelopment.movements as any[]).map((movement, index) => (
                      <div key={movement.id} className="relative">
                        {/* Timeline dot */}
                        <div className="absolute -left-10 mt-1.5 w-4 h-4 rounded-full bg-seal border-4 border-paper-bg z-10 shadow-sm"></div>
                        
                        <h3 className="text-2xl font-bold text-ink mb-3">{movement.title}</h3>
                        
                        <div className="flex flex-wrap gap-4 mb-4 text-xs font-mono tracking-widest uppercase">
                           {movement.milestone && (
                             <span className="border border-ink/20 bg-ink/5 px-2 py-1 text-ink">{movement.milestone}</span>
                           )}
                           {movement.founder && (
                             <span className="border border-ink/20 bg-ink/5 px-2 py-1 text-ink">{movement.founder}</span>
                           )}
                        </div>

                        <p className="text-ink-light text-lg leading-relaxed mb-4 text-justify">{movement.description}</p>
                        
                        {movement.commonGoal && (
                          <div className="bg-[#F9F1E1] border border-ink/20 p-4 inline-block w-full text-center">
                            <span className="font-bold uppercase tracking-widest text-sm text-seal">Mục tiêu chung: </span>
                            <span className="italic font-medium text-ink">{movement.commonGoal}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                {/* Conclusion */}
                <section className="pt-8">
                  <DocumentCard padding="lg">
                    <div className="text-center mb-10">
                      <div className="inline-flex items-center justify-center w-20 h-20 border-[3px] border-seal rounded-full mb-6 transform rotate-12 shadow-sm bg-paper-texture mix-blend-multiply">
                        <span className="font-bold uppercase tracking-widest text-seal text-xs leading-none text-center">Tổng<br/>Kết</span>
                      </div>
                      <h2 className="text-3xl font-bold text-ink uppercase tracking-widest">{contentData.conclusion.title}</h2>
                    </div>

                    <div className="space-y-8">
                      {contentData.conclusion.mainPoints.map((point, idx) => (
                        <div key={idx} className="border-b border-dashed border-ink/20 pb-8 last:border-0 last:pb-0">
                          <div className="flex justify-between items-baseline mb-4">
                             <h3 className="text-2xl font-bold text-ink">{point.title}</h3>
                             {point.milestone && (
                               <span className="font-mono text-sm font-bold text-seal tracking-widest border border-seal/30 px-2 py-1 transform rotate-2">
                                 {point.milestone}
                               </span>
                             )}
                          </div>
                          
                          <p className="text-ink-light text-lg leading-relaxed mb-6 italic">{point.content}</p>
                          
                          {point.missions && (
                            <div className="pl-6 border-l-[3px] border-ink/30 space-y-3">
                              {point.missions.map((mission, mIdx) => (
                                <p key={mIdx} className="text-ink font-medium leading-relaxed">
                                   <span className="text-seal mr-2 font-bold">—</span>
                                   {mission}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </DocumentCard>
                </section>

             </div>

             {/* Right Sidebar for Marginal Notes (Desktop only) */}
             <div className="hidden lg:block lg:col-span-2 space-y-32 pt-32">
                <MarginalNote 
                  title="Chú thích Thư khế"
                  className="border-accent-gold text-accent-gold"
                >
                  <span className="text-ink-light text-sm italic">
                    Hình tượng con tàu thể hiện rõ khát vọng tìm đường cứu nước của Bác từ Bến cảng Nhà Rồng.
                  </span>
                </MarginalNote>
                
                <div className="mt-64">
                   <MarginalNote 
                     title="Sự khác biệt"
                     className="border-seal text-seal"
                   >
                     <span className="text-ink-light text-sm italic">
                       Ở Châu Âu, phong trào công nhân phát triển trước dẫn đến sự ra đời của Đảng. Tại Việt Nam, phong trào yêu nước lại là ngòi nổ mạnh mẽ nhất.
                     </span>
                   </MarginalNote>
                </div>

                <div className="mt-[600px]">
                   <DocumentCard padding="sm" className="bg-[#EADCBF] transform rotate-3">
                      <p className="font-archival italic text-sm text-ink-light text-center">
                         Hồ sơ lưu trữ<br/>có dấu xác nhận<br/>của Cục Lịch sử.
                      </p>
                   </DocumentCard>
                </div>
             </div>
          </div>

          {/* Footer Navigation */}
          <div className="mt-24 border-t-2 border-ink pb-12 pt-12">
             <ContentNavigation />
          </div>

        </div>
      </div>
    </div>
  );
}
