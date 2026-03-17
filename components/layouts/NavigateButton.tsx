"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Gamepad2,
  BookOpen,
  Bot,
  ClipboardList,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

interface NavigateButtonProps {
  mobile?: boolean;
}

const NavigateButton = ({ mobile }: NavigateButtonProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    { name: "Trang bia", path: "/", icon: Home },
    { name: "Muc luc ho so", path: "/contents", icon: ClipboardList },
    { name: "Tu lieu hien vat", path: "/tai-lieu", icon: BookOpen },
    { name: "Hoc vu xac nhan", path: "/game", icon: Gamepad2 },
    { name: "Phu luc AI", path: "/used-ai", icon: Bot },
  ];

  if (mobile) {
    return (
      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-[#EADCBF] px-4 py-3 shadow-sm">
        <div className="flex items-center gap-2 font-archival text-lg font-bold uppercase tracking-widest text-seal">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#F9F1E1] bg-seal">
            <span className="text-[0.6rem] font-bold uppercase tracking-tighter text-[#F5E6C8]">76-86</span>
          </div>
          <span className="mt-1">Luu tru Bao cap</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="rounded-md border border-ink/20 p-2 text-ink">
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        {isOpen && (
          <div className="absolute left-0 right-0 top-full flex flex-col gap-2 border-b border-border bg-[#F9F1E1] p-4 shadow-document">
            {routes.map((route) => {
              const isActive = pathname === route.path;
              return (
                <Link
                  key={route.path}
                  href={route.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 rounded-md p-3 transition-colors ${isActive ? "border border-seal/30 bg-[#EADCBF] font-bold text-seal" : "text-ink-light hover:bg-[#EADCBF]/50 hover:text-ink"}`}
                >
                  <route.icon className="h-5 w-5 text-current" />
                  <span className="pt-1 font-archival text-xl leading-none text-current">{route.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <nav className="flex h-full w-full flex-col gap-8 p-6">
      <div className="mt-4 flex flex-col items-center gap-2 space-y-4 border-b border-ink/30 pb-8">
        <div className="relative mb-2 flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#F9F1E1] bg-seal shadow-document -rotate-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-[#F9F1E1]/40">
            <span className="text-sm font-bold uppercase tracking-tighter text-[#F5E6C8]">76-86</span>
          </div>
        </div>
        <h2 className="text-center font-archival text-2xl font-bold uppercase leading-tight tracking-widest text-seal">
          Huong vi
          <br />
          Bao cap
        </h2>
        <div className="relative mt-2 border-t border-ink/20 px-4 pt-3 text-center text-xs uppercase tracking-[0.2em] text-ink-light">
          <span className="absolute left-1/2 top-[-5px] -translate-x-1/2 bg-[#EADCBF] px-2 text-[10px] text-ink/50">*</span>
          Ho so luu tru
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-2">
        {routes.map((route) => {
          const Icon = route.icon;
          const isActive = pathname === route.path;

          return (
            <Link
              key={route.path}
              href={route.path}
              className={`group relative flex items-center gap-4 rounded-md px-4 py-3 transition-all duration-300 ${isActive ? "border border-seal/20 bg-[#F9F1E1] font-bold text-seal shadow-sm" : "border border-transparent text-ink-light hover:bg-[#F9F1E1]/50 hover:text-ink"}`}
              title={route.name}
            >
              {isActive && <div className="absolute left-0 top-1/2 h-full w-1.5 -translate-y-1/2 rounded-l-md bg-seal" />}

              <div className={`rounded-md p-2 transition-colors ${isActive ? "bg-seal/10 text-seal" : "text-current group-hover:bg-ink/5"}`}>
                <Icon className="h-5 w-5 text-current" strokeWidth={isActive ? 2.5 : 2} />
              </div>

              <span className="whitespace-nowrap pt-1 font-archival text-[1.1rem] tracking-wide text-current">{route.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto flex flex-col gap-3 border-t border-ink/20 pb-4 pt-6 text-xs font-archival text-ink-light">
        <div className="flex w-full justify-between px-2">
          <span className="tracking-wider">SO H. SO:</span>
          <span className="rounded border border-ink/10 bg-ink/5 px-2 py-0.5 font-mono text-ink">VN-BAOCAP-01</span>
        </div>
        <div className="flex w-full items-center justify-between px-2">
          <span className="tracking-wider">TRANG THAI:</span>
          <span className="inline-block rounded-sm border border-seal px-2 py-0.5 text-[10px] font-bold uppercase text-seal -rotate-2">
            Da luu tru
          </span>
        </div>
      </div>
    </nav>
  );
};

export default NavigateButton;
