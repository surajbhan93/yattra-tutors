import React from "react";
import { city } from "@/components/seoIndia/locations/up/meerut";

export const InternalLinks: React.FC = () => {
  const internalLinkBlocks = [
    { title: "Female Home Tutor in Meerut", slug: "female-home-tutor-meerut", count: "1,200+ Tutors" },
    { title: "Math Tutor Meerut", slug: "math-tutor-meerut", count: "2,400+ Tutors" },
    { title: "Science Tutor Meerut", slug: "science-tutor-meerut", count: "2,100+ Tutors" },
    { title: "English Tutor Meerut", slug: "english-tutor-meerut", count: "1,500+ Tutors" },
    { title: "CBSE Home Tutor Meerut", slug: "cbse-home-tutor-meerut", count: "3,800+ Tutors" },
    { title: "ICSE Home Tutor Meerut", slug: "icse-home-tutor-meerut", count: "1,100+ Tutors" },
    { title: "Commerce Tutor Meerut", slug: "commerce-tutor-meerut", count: "850+ Tutors" },
    { title: "JEE Tutor Meerut", slug: "jee-tutor-meerut", count: "920+ Tutors" },
    { title: "NEET Tutor Meerut", slug: "neet-tutor-meerut", count: "980+ Tutors" },
    { title: "Coding Tutor Meerut", slug: "coding-tutor-meerut", count: "650+ Tutors" },
  ];

  return (
    <section className="py-12 bg-[#132B22] text-[#F7F2E9] border-b border-[#F7F2E9]/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-[#F7F2E9]/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-semibold text-[#F7F2E9]" style={{ fontFamily: "'Lora', serif" }}>
              Popular Home Tuition Search Categories in {city.name}
            </h3>
            <p className="text-xs text-[#F7F2E9]/55">Explore specialized home tutors by subject, board, and entrance exam requirements</p>
          </div>
          <span className="text-xs font-medium text-[#D79A2C]">SEO Keyword Links</span>
        </div>

        {/* Dynamic Internal Links — ledger list */}
        <nav aria-label={`Home Tutor Categories in ${city.name}`} className="divide-y divide-[#F7F2E9]/10">
          {internalLinkBlocks.map((item, idx) => (
            <a
              key={`int-link-${idx}`}
              href={`/india/${city.slug}/${item.slug}`}
              className="flex items-center justify-between gap-4 py-3.5 hover:bg-[#15302A] transition-colors px-2 -mx-2 rounded"
              title={`${item.title} - Yattra Tutors`}
            >
              <span className="text-sm font-medium text-[#F7F2E9]/90">
                {item.title}
              </span>
              <span className="text-xs text-[#F7F2E9]/45 font-mono shrink-0">
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
