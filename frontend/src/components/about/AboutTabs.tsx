"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Info,
  Users,
  MessageSquare,
  Briefcase,
  ShieldCheck,
  RefreshCcw,
  FileText,
  Map,
} from "lucide-react";

interface Tab {
  key: string;
  label: string;
  icon: React.ElementType;
  count?: number;
  type: "section" | "route";
  href?: string;
}

const tabs: Tab[] = [
  { key: "about", label: "About us", icon: Info, type: "section" },
  { key: "team", label: "Team", icon: Users, count: 20, type: "section" },
  { key: "testimonials", label: "Testimonials", icon: MessageSquare, type: "section" },
  { key: "careers", label: "Careers", icon: Briefcase, count: 5, type: "section" },
  { key: "privacy", label: "Privacy policy", icon: ShieldCheck, type: "route", href: "/privacy" },
  { key: "refund", label: "Refund & cancellation", icon: RefreshCcw, type: "route", href: "/refund" },
  { key: "terms", label: "Terms & conditions", icon: FileText, type: "route", href: "/terms" },
  { key: "sitemap", label: "Sitemap", icon: Map, type: "route", href: "/sitemap" },
];

interface Props {
  active: string;
  onChange: (key: string) => void;
}

export default function AboutTabs({ active, onChange }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) onChange(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.1 }
    );

    tabs
      .filter((tab) => tab.type === "section")
      .forEach((tab) => {
        const el = document.getElementById(tab.key);
        if (el) observer.observe(el);
      });

    return () => observer.disconnect();
  }, [onChange]);

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-[#1C2B22]/10">
      <div className="max-w-5xl mx-auto px-3">
        <div className="flex gap-1.5 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.key || (tab.type === "route" && pathname === tab.href);

            return (
              <button
                key={tab.key}
                onClick={() => {
                  if (tab.type === "route" && tab.href) {
                    router.push(tab.href);
                    return;
                  }
                  onChange(tab.key);
                  document.getElementById(tab.key)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                  isActive ? "bg-[#1C2B22] text-[#F7F2E9]" : "text-[#58646C] hover:text-[#1C2B22]"
                }`}
              >
                <Icon size={14} />
                {tab.label}
                {tab.count && (
                  <span className={`px-1.5 py-0.5 text-[11px] rounded-full ${isActive ? "bg-white/15 text-[#F7F2E9]" : "bg-[#1C2B22]/[.06] text-[#58646C]"}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
