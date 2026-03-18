"use client";

import contentData from "./data/content.json";
import HeroHeader from "./components/HeroHeader";
import Section from "./components/Section";
import ContentPageShell from "@/components/content/ContentPageShell";

export default function Content7Page() {
  return (
    <ContentPageShell
      title={contentData.documentTitle}
      eyebrow="Tài liệu tham khảo"
      meta={`Hồ sơ lưu trữ: 07\nTheo: ${contentData.documentTitle}`}
      showHeader={false}
      mainClassName="lg:col-span-10 lg:col-start-2 space-y-16"
    >
      <div className="min-h-screen bg-gradient-to-br from-stone-950 via-amber-950 to-stone-950">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Header */}
          <HeroHeader title={contentData.documentTitle} />

          {/* Sections */}
          <div className="space-y-8">
            {contentData.uiStructure.map((section) => (
              <Section
                key={section.sectionId}
                sectionId={section.sectionId}
                sectionTitle={section.sectionTitle}
                icon={section.icon}
                subsections={section.children}
              />
            ))}
          </div>

          {/* Content Navigation */}
        </div>
      </div>
      </div>
    </ContentPageShell>
  );
}
