import React from "react";
import { city } from "@/components/seoIndia/locations/up/meerut";

const grainStyle: React.CSSProperties = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
};

export const CTA: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#0E211C] text-[#F7F2E9] relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay" style={grainStyle} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-[#D79A2C]/30 rounded-2xl bg-[#132B22] p-8 sm:p-12 text-center space-y-8">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-medium text-[#D79A2C]">
              Transform your child&apos;s academic journey today
            </span>
            <h2
              className="text-3xl sm:text-5xl font-semibold text-[#F7F2E9] leading-tight"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Get the Best Home Tutor in {city.name}
            </h2>
            <p className="text-base sm:text-lg text-[#F7F2E9]/75 leading-relaxed">
              Book a 100% free 1-on-1 demo session at your home with a background-verified tutor. No upfront fees, no obligation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="#book-tutor-form"
              className="w-full sm:w-auto px-8 py-4 rounded-md text-base font-semibold text-[#0E211C] bg-[#D79A2C] hover:bg-[#c4891f] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D79A2C]"
              aria-label={`Book Free Demo Class in ${city.name}`}
            >
              Book Free Demo Class Now
            </a>

            <a
              href={`tel:${city.contact.phone}`}
              className="w-full sm:w-auto px-8 py-4 rounded-md text-base font-semibold text-[#F7F2E9] border border-[#F7F2E9]/25 hover:bg-[#15302A] transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#D79A2C]"
              aria-label={`Call Yattra Tutors counselor directly at ${city.contact.phone}`}
            >
              <svg className="w-5 h-5 text-[#D79A2C] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.12.45 2.33.69 3.58.69.55 0 1 .45 1 1V20a1 1 0 01-1 1C10.5 21 3 13.5 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.24 2.46.69 3.57.11.35.03.74-.27 1.02l-2.3 2.2z" />
              </svg>
              Direct Support: {city.contact.phone}
            </a>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#F7F2E9]/60 border-t border-[#F7F2E9]/10">
            <span>Zero Registration Fees</span>
            <span>2-Hour Tutor Matching</span>
            <span>Free Replacement Guarantee</span>
            <span>All {city.locations.length}+ {city.name} Localities Covered</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
