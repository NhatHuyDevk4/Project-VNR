"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, MessageSquare, BookOpen, Code } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AITool {
  name: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  link: string;
}

const aiTools: AITool[] = [
  {
    name: "ChatGPT",
    icon: <MessageSquare className="h-8 w-8" />,
    description:
      "Tro ly AI ho tro nghien cuu, viet noi dung va giai dap cac cau hoi ve am thuc thoi bao cap, tem phieu va van hoa doi song.",
    features: [
      "Tong hop tai lieu ve thoi bao cap",
      "Ho tro viet noi dung va tom tat",
      "Giai dap cau hoi ve bo bo, com don khoai, chao cam",
      "De xuat huong trinh bay cho du an",
    ],
    link: "https://chat.openai.com",
  },
  {
    name: "Google Gemini",
    icon: <Sparkles className="h-8 w-8" />,
    description:
      "Cong cu AI da phuong thuc cua Google, phu hop khi can tong hop thong tin, phan tich hinh anh va mo rong y tuong noi dung.",
    features: [
      "Tim kiem va tong hop thong tin",
      "Phan tich hinh anh",
      "De xuat cau truc noi dung",
      "Mo rong y tuong trinh bay",
    ],
    link: "https://gemini.google.com",
  },
  {
    name: "NotebookLM",
    icon: <BookOpen className="h-8 w-8" />,
    description:
      "Cong cu phu hop cho viec doc nhieu tai lieu, tong hop y chinh va dat cau hoi dua tren nguon da nap vao.",
    features: [
      "Tom tat tai lieu dai",
      "Trich xuat y chinh",
      "Hoi dap dua tren nguon tai lieu",
      "Ho tro hoc tap theo chu de",
    ],
    link: "https://notebooklm.google.com",
  },
  {
    name: "Cursor",
    icon: <Code className="h-8 w-8" />,
    description:
      "Trinh soan thao code co AI ho tro, phu hop cho viec sua giao dien, tai cau truc component va tang toc qua trinh phat trien.",
    features: [
      "Code completion",
      "Refactor nhanh",
      "Doc context codebase",
      "Ho tro sua UI theo component",
    ],
    link: "https://cursor.sh",
  },
];

const referenceLinks = [
  {
    title: "Thu muc tai lieu du an",
    url: "https://drive.google.com/drive/u/1/folders/1oF-H7fpcAPZw7JGKDVIwdICHPJblJTrc",
  },
  {
    title: "Bao tang Lich su Viet Nam",
    url: "https://baotanglichsu.vn",
  },
  {
    title: "Am thuc Viet Nam - Wikipedia",
    url: "https://vi.wikipedia.org/wiki/%E1%BA%A8m_th%E1%BB%B1c_Vi%E1%BB%87t_Nam",
  },
  {
    title: "Thoi bao cap tai Viet Nam",
    url: "https://vi.wikipedia.org/wiki/Th%E1%BB%9Di_bao_c%E1%BA%A5p_t%E1%BA%A1i_Vi%E1%BB%87t_Nam",
  },
];

const UsedAIPage = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: -30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          }
        );
      }

      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.2,
            ease: "power2.out",
          }
        );
      }

      if (introRef.current) {
        gsap.fromTo(
          introRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.4,
            ease: "power2.out",
          }
        );
      }

      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          {
            opacity: 0,
            y: 40,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.6,
            ease: "back.out(1.2)",
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="container mx-auto px-6 py-16 text-ink">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-seal transition-colors hover:text-ink"
        >
          <span>-</span> Quay lai
        </Link>

        <h1
          ref={titleRef}
          className="mb-4 text-center text-4xl font-bold text-seal sm:text-5xl md:text-6xl"
        >
          Cong Cu AI Su Dung
        </h1>

        <p
          ref={subtitleRef}
          className="mb-12 text-center text-lg text-ink-light"
        >
          Cac cong cu AI ho tro nghien cuu, phat trien va hoan thien du an
        </p>

        <div
          ref={introRef}
          className="mb-12 rounded-2xl border border-ink/10 bg-[#f8efdc] p-8 shadow-document"
        >
          <p className="mb-4 text-lg leading-relaxed text-ink">
            Du an nay duoc xay dung voi su ho tro cua cong cu AI, giup toi uu hoa qua trinh nghien cuu va sang tao noi dung.
          </p>
          <p className="text-base text-ink-light">
            Moi cong cu dong vai tro rieng trong viec tong hop thong tin, phan tich du lieu va ho tro phat trien giao dien.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {aiTools.map((tool, index) => (
            <div
              key={tool.name}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group rounded-2xl border border-ink/10 bg-[#f8efdc] p-6 shadow-document transition-all duration-300 hover:border-seal/30 hover:shadow-document-hover"
            >
              <div className="mb-4 flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-seal/20 bg-seal/5 text-seal transition-transform duration-300 group-hover:scale-110">
                  {tool.icon}
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-2xl font-bold text-seal">
                    {tool.name}
                  </h3>
                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ink-light transition-colors hover:text-seal hover:underline"
                  >
                    {tool.link.replace("https://", "")}
                  </a>
                </div>
              </div>

              <p className="mb-4 leading-relaxed text-ink-light">
                {tool.description}
              </p>

              <div className="space-y-2">
                <p className="mb-2 text-sm font-semibold text-seal">
                  Tinh nang chinh:
                </p>
                <ul className="space-y-1.5">
                  {tool.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-ink"
                    >
                      <span className="mt-1 text-seal">-</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="mb-6 text-center text-3xl font-bold text-seal">
            Nguon tai lieu tham khao
          </h3>
          <p className="mb-8 text-center text-ink-light">
            Cac nguon tham khao ve am thuc, thoi bao cap va van hoa Viet Nam
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {referenceLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-xl border border-ink/10 bg-[#f8efdc] p-4 transition-all duration-300 hover:border-seal/30 hover:bg-[#f4ead5]"
              >
                <svg
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-seal"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-ink transition-colors group-hover:text-seal">
                    {link.title}
                  </p>
                  <p className="mt-1 truncate text-xs text-ink-light">
                    {link.url}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-ink-light">
            Cac cong cu AI duoc su dung co kiem chung, co doi chieu va chi dong vai tro ho tro trong qua trinh phat trien.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UsedAIPage;
