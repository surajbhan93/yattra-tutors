import React from "react";
import { DM_Sans } from "next/font/google";
import { city } from "@/components/seoIndia/locations/up/agra";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const InternalLinks: React.FC = () => {
  const internalLinkBlocks = [
    { title: "Female Home Tutor in Agra", slug: "female-home-tutor-agra", count: "1,150+ Tutors" },
    { title: "Math Tutor Agra", slug: "math-tutor-agra", count: "2,300+ Tutors" },
    { title: "Science Tutor Agra", slug: "science-tutor-agra", count: "2,050+ Tutors" },
    { title: "English Tutor Agra", slug: "english-tutor-agra", count: "1,400+ Tutors" },
    { title: "CBSE Home Tutor Agra", slug: "cbse-home-tutor-agra", count: "3,600+ Tutors" },
    { title: "ICSE Home Tutor Agra", slug: "icse-home-tutor-agra", count: "1,050+ Tutors" },
    { title: "UP Board Home Tutor Agra", slug: "up-board-tutor-agra", count: "2,800+ Tutors" },
    { title: "Commerce Tutor Agra", slug: "commerce-tutor-agra", count: "800+ Tutors" },
    { title: "JEE Tutor Agra", slug: "jee-tutor-agra", count: "880+ Tutors" },
    { title: "NEET Tutor Agra", slug: "neet-tutor-agra", count: "920+ Tutors" },
    { title: "Coding Tutor Agra", slug: "coding-tutor-agra", count: "600+ Tutors" },
  ];

  return (
    <section className={`py-12 bg-[#132B22] text-[#F7F2E9] border-b border-[#2B4038] ${dmSans.className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-[#2B4038] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-[#F7F2E9]">Popular Home Tuition Search Categories in {city.name}</h3>
            <p className="text-xs text-[#9AA3AB]">Explore specialized home tutors by subject, board, and entrance exam requirements</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#D79A2C]/10 text-[#D79A2C] border border-[#D79A2C]/20 italic">
            SEO Keyword Links
          </span>
        </div>

        {/* Dynamic Internal Links Navigation Grid (ledger directory) */}
        <nav aria-label={`Home Tutor Categories in ${city.name}`} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {internalLinkBlocks.map((item, idx) => (
            <a
              key={`int-link-agra-${idx}`}
              href={`/india/${city.slug}/${item.slug}`}
              className="p-3.5 bg-[#0E211C] border border-[#2B4038] rounded-xl hover:border-[#D79A2C]/50 transition-all flex flex-col justify-between group"
              title={`${item.title} - Yattra Tutors`}
            >
              <span className="text-xs font-bold text-[#F7F2E9] group-hover:text-[#D79A2C] transition-colors">
                {item.title}
              </span>
              <span className="text-[10px] text-[#9AA3AB] mt-2 block font-mono">
                {item.count}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default InternalLinks;
