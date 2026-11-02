import React from "react";
import { Lora, DM_Sans } from "next/font/google";
import { city } from "@/components/seoIndia/locations/up/agra";

const lora = Lora({ subsets: ["latin"], weight: ["600", "700"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const CTA: React.FC = () => {
  return (
    <section className={`py-16 sm:py-20 bg-[#0E211C] text-[#F7F2E9] relative overflow-hidden ${dmSans.className}`}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#132B22] border border-[#2B4038] rounded-3xl p-8 sm:p-12 text-center space-y-8 shadow-2xl">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#D79A2C]/10 text-[#D79A2C] border border-[#D79A2C]/20 italic">
              Transform Your Child's Academic Journey Today
            </span>
            <h2 className={`text-3xl sm:text-5xl font-semibold text-[#F7F2E9] tracking-tight leading-tight ${lora.className}`}>
              Get the Best <span className="text-[#D79A2C]">Home Tutor in {city.name}</span>
            </h2>
            <p className="text-base sm:text-lg text-[#AAB6A2] leading-relaxed">
              Book a 100% free 1-on-1 demo session at your home with a background-verified tutor. No upfront fees, no obligation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="#book-tutor-form"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-[#17261D] bg-[#D79A2C] hover:bg-[#c4891f] transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D79A2C]"
              aria-label={`Book Free Demo Class in ${city.name}`}
            >
              Book Free Demo Class Now
            </a>

            <a
              href={`tel:${city.contact.phone}`}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-[#F7F2E9] bg-[#15302A] border border-[#2B4038] hover:border-[#D79A2C]/50 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#2B4038]"
              aria-label={`Call Yattra Tutors counselor directly at ${city.contact.phone}`}
            >
              <svg className="w-5 h-5 text-[#D79A2C] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.12.45 2.33.69 3.58.69.55 0 1 .45 1 1V20a1 1 0 01-1 1C10.5 21 3 13.5 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.24 2.46.69 3.57.11.35.03.74-.27 1.02l-2.3 2.2z" />
              </svg>
              Direct Support: {city.contact.phone}
            </a>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#9AA3AB] border-t border-[#2B4038]">
            <span>✓ Zero Registration Fees</span>
            <span>✓ 2-Hour Tutor Matching</span>
            <span>✓ Free Replacement Guarantee</span>
            <span>✓ All {city.locations.length}+ {city.name} Localities Covered</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
