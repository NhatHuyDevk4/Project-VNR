"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote, Sparkles, Star, Award, Bookmark, CheckSquare } from "lucide-react";
import contentData from "./data/nha-nuoc-content.json";
import ContentNavigation from "@/components/ContentNavigation";
import { DocumentCard } from "@/components/ui/DocumentCard";

interface Content {
  type: string;
  text?: string;
  author?: string;
  title?: string;
  description?: string;
  items?: any[];
}

export default function Content4Page() {
  const [currentSection, setCurrentSection] = useState(0);

  const nextSection = () => {
    if (currentSection < contentData.sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const renderContent = (content: Content) => {
    switch (content.type) {
      case "intro":
        return (
          <div className="mb-8 p-6 bg-[#F9F1E1] border-l-4 border-seal shadow-sm">
            <div className="flex items-start gap-4">
              <span className="text-seal mt-1 font-serif text-2xl font-bold">¶</span>
              <p className="text-lg leading-relaxed text-ink font-medium tracking-wide">
                {content.text}
              </p>
            </div>
          </div>
        );

      case "quote":
        return (
          <div className="my-10 px-8 py-6 border-y border-ink/20 relative">
            <span className="absolute -top-6 left-4 text-7xl text-seal/20 font-serif leading-none">"</span>
            <div className="relative z-10 pl-6 border-l-[3px] border-ink/30">
              <p className="text-2xl italic mb-4 text-ink font-bold leading-relaxed">{content.text}</p>
              <p className="text-sm text-ink-light tracking-widest uppercase font-mono mt-4 text-right">
                — {content.author}
              </p>
            </div>
          </div>
        );

      case "points":
        return (
          <div className="space-y-6 my-8">
            {content.title && (
              <h4 className="text-xl font-bold mb-6 text-ink uppercase tracking-widest border-b border-ink/20 pb-2">
                {content.title}
              </h4>
            )}
            <Accordion type="single" collapsible className="w-full space-y-4">
              {content.items?.map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border border-ink/30 bg-paper-texture shadow-sm data-[state=open]:border-seal transition-colors">
                  <AccordionTrigger className="text-left hover:no-underline hover:bg-ink/5 px-6 py-4 font-bold text-ink transition-all">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-sm border border-ink text-ink px-2 py-0.5 min-w-[32px] text-center">
                        {item.number}
                      </span>
                      <span className="text-lg uppercase tracking-wide">{item.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="px-6 py-4 bg-[#F9F1E1] border-t border-ink/20">
                      <p className="text-ink-light text-base leading-relaxed mb-4 italic">{item.description}</p>
                      {item.details && (
                        <ul className="space-y-3 mt-4 border-l-[3px] border-seal/30 pl-4 py-2">
                          {item.details.map((detail: string, detailIdx: number) => (
                            <li key={detailIdx} className="text-ink flex items-start gap-3">
                              <span className="text-seal text-lg mt-[-2px]">▸</span>
                              <span className="font-medium text-justify">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        );

      case "subsection":
        return (
          <div className="my-8 bg-[#EADCBF] border border-ink/40 p-6 relative">
             <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-seal/40"></div>
             <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-seal/40"></div>
            <h4 className="text-lg font-bold text-ink mb-3 uppercase tracking-widest flex items-center gap-2 border-b border-ink/20 pb-2">
              <span className="text-seal/50 text-2xl font-serif">§</span>
              {content.title}
            </h4>
            <p className="text-ink-light text-lg leading-relaxed text-justify mt-4">{content.description}</p>
          </div>
        );

      case "principles":
        return (
          <div className="space-y-12 my-10 relative">
             <div className="absolute left-6 top-0 bottom-0 border-l border-dashed border-ink/30 z-0 hidden md:block"></div>
            {content.items?.map((item, idx) => (
              <div key={idx} className="relative z-10 bg-paper-texture border-[3px] border-ink p-8 shadow-sm">
                <div className="absolute -top-4 -left-4 bg-[#F9F1E1] border border-ink px-3 py-1 font-mono font-bold text-ink shadow-sm">
                   CHỈ MỤC {idx + 1}
                </div>
                <h4 className="text-2xl font-bold text-ink mb-8 mt-2 uppercase tracking-wide text-center">
                  {item.title}
                </h4>
                <div className="space-y-8">
                  {item.quotes?.map((quote: any, qIdx: number) => (
                    <div key={qIdx} className="p-6 bg-[#F9F1E1] border border-ink/20 italic text-ink-light">
                      <p className="mb-4 text-xl leading-relaxed text-justify text-ink font-serif font-medium">"{quote.text}"</p>
                      <p className="text-right text-sm font-bold tracking-widest uppercase mt-4">
                        — {quote.author}
                      </p>
                    </div>
                  ))}
                  {item.keyPoints && (
                    <div className="mt-8 pt-6 border-t-[3px] border-double border-ink/20">
                      <p className="font-bold text-seal uppercase tracking-widest text-sm mb-6 pb-2 border-b border-seal/20 inline-block">
                        Ghi chú Trọng điểm:
                      </p>
                      <ul className="space-y-4">
                        {item.keyPoints.map((point: string, pIdx: number) => (
                          <li key={pIdx} className="text-lg text-ink font-medium flex items-start gap-4">
                             <CheckSquare className="w-5 h-5 text-seal mt-1 flex-shrink-0" />
                            <span className="text-justify">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const currentSectionData = contentData.sections[currentSection];

  return (
    <div className="min-h-screen bg-paper-texture font-archival text-ink selection:bg-seal selection:text-[#F9F1E1]">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16 border-b-4 border-double border-ink/30 pb-12 relative animate-fade-in">
             <div className="absolute top-0 left-0 text-left font-mono text-xs tracking-widest text-ink/50 uppercase hidden md:block">
                Hồ sơ lưu trữ: 04<br/>
                Theo: {contentData.title}
             </div>
             
             <div className="inline-block mt-8 mb-6 border border-ink/20 px-6 py-2 shadow-sm bg-[#F9F1E1]">
               <span className="text-xs tracking-[0.3em] uppercase font-bold text-seal">Tài liệu tham khảo</span>
             </div>

            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-ink mb-6 uppercase tracking-tight leading-tight">
              {contentData.title}
            </h1>
            
            <div className="flex justify-center items-center gap-4 text-ink-light">
               <span className="w-16 h-px bg-ink/30"></span>
               <Star className="w-5 h-5 text-seal opacity-50 fill-current" />
               <span className="w-16 h-px bg-ink/30"></span>
            </div>
          </div>

          {/* Navigation Tabs (Styled as Manila Folder Tabs) */}
          <div className="mb-0">
             <div className="flex overflow-x-auto no-scrollbar pb-0 gap-1 border-b-[3px] border-ink">
               {contentData.sections.map((section, idx) => (
                 <button
                   key={section.id}
                   onClick={() => setCurrentSection(idx)}
                   className={`px-6 pt-4 pb-3 rounded-t-lg font-bold tracking-wide uppercase transition-all whitespace-nowrap min-w-[120px] text-center border-t-2 border-x-2 ${
                     currentSection === idx 
                     ? "bg-paper-texture border-ink text-ink translate-y-[3px] border-b-paper-texture shadow-sm z-10 relative" 
                     : "bg-[#EADCBF] border-ink/30 text-ink/50 hover:bg-[#F9F1E1] hover:text-ink/80"
                   }`}
                 >
                   Phần {idx + 1}
                 </button>
               ))}
             </div>
          </div>

          {/* Content Dossier */}
          <DocumentCard padding="lg" variant="default" className="border-t-0 rounded-tl-none relative z-0 shadow-lg">
             <div className="absolute -right-4 -top-8 transform rotate-12 opacity-80 pointer-events-none mix-blend-multiply w-24 h-24 border-4 border-seal rounded-full flex items-center justify-center">
                <span className="text-seal font-bold text-xl uppercase tracking-wider transform -rotate-12">Lưu<br/>Trữ</span>
             </div>

             <div className="mb-12 border-b border-ink/20 pb-6 text-center">
               <h2 className="text-3xl font-bold text-ink mb-4 uppercase tracking-widest leading-relaxed">
                 {currentSectionData.title}
               </h2>
               <p className="text-xl text-ink-light italic font-serif">
                 {currentSectionData.subtitle}
               </p>
             </div>
             
             <div className="space-y-10 prose prose-lg prose-headings:font-archival prose-p:font-archival max-w-none text-ink pb-8">
               {currentSectionData.content.map((content, idx) => (
                 <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                    {renderContent(content as Content)}
                 </div>
               ))}
             </div>
             
             {/* Pagination Bottom */}
             <div className="flex justify-between items-center mt-16 pt-8 border-t-[3px] border-double border-ink/30">
               <button
                 onClick={prevSection}
                 disabled={currentSection === 0}
                 className="flex items-center gap-2 border border-ink/50 px-4 py-2 text-ink uppercase tracking-widest font-bold text-sm bg-paper-texture hover:bg-[#EADCBF] disabled:opacity-30 disabled:hover:bg-paper-texture transition-colors"
               >
                 <ChevronLeft className="w-4 h-4" /> TRANG TRƯỚC
               </button>

               <div className="text-sm font-mono text-ink-light tracking-widest px-4 border-x border-ink/20">
                 TẬP {currentSection + 1} / {contentData.sections.length}
               </div>

               <button
                 onClick={nextSection}
                 disabled={currentSection === contentData.sections.length - 1}
                 className="flex items-center gap-2 border border-ink/50 px-4 py-2 text-ink uppercase tracking-widest font-bold text-sm bg-paper-texture hover:bg-[#EADCBF] disabled:opacity-30 disabled:hover:bg-paper-texture transition-colors"
               >
                 TRANG SAU <ChevronRight className="w-4 h-4" />
               </button>
             </div>
          </DocumentCard>

          {/* Content Navigation Footer */}
          <div className="mt-24 border-t-2 border-ink pb-8 pt-8">
             <ContentNavigation />
          </div>

        </div>
      </div>
    </div>
  );
}
