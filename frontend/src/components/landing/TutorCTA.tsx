"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Lora, DM_Sans } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600", "700"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

/*
 * ═══════════════════════════════════════════════════════
 *  TUTOR CTA — "Become a Tutor"
 *  Reuses the Hero's pinned-photograph treatment (one tilted
 *  frame + a stamped backing card) instead of a floating
 *  circular collage with blurred glow orbs.
 * ═══════════════════════════════════════════════════════
 */

const bigImage = "/images/tutors/collage-main.jpg";

const TutorCTA = () => {
  const ctaVariants = [
    "Start Teaching & Earn Monthly",
    "Join 5,000+ Verified Tutors on Yattra Tutors",
  ];

  const [ctaText, setCtaText] = useState(ctaVariants[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCtaText((prev) =>
        prev === ctaVariants[0] ? ctaVariants[1] : ctaVariants[0]
      );
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="become-a-tutor" className={`relative overflow-hidden bg-[#0E211C] py-16 sm:py-24 ${dmSans.className}`}>
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-14">
          {/* LEFT */}
          <div className="text-center lg:text-left">
            <p className={`${lora.className} italic text-sm text-[#D79A2C] mb-3`}>For educators</p>
            <h2 className={`${lora.className} text-[32px] sm:text-[40px] font-semibold leading-[1.15] text-[#F5F1E6] mb-5`}>
              Become a home tutor with Yattra Tutors
            </h2>

            <p className="text-[15px] leading-[1.75] text-[#AAB6A2] max-w-lg mx-auto lg:mx-0 mb-6">
              Yattra Tutors helps teachers, subject experts, and professionals find nearby home
              tutoring jobs. Teach students one-to-one, earn a stable monthly income, and grow
              your teaching career with verified students across India.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-sm text-[#AAB6A2] mb-7 border-t border-[#D79A2C]/15 pt-5">
              <span>5,000+ active tutors</span>
              <span className="text-[#D79A2C]/40">·</span>
              <span>Secure monthly payouts</span>
            </div>

            <Link
              href={{
                pathname: "/tutor-flow/tutor-registration/",
                query: {
                  role: "tutor",
                  source: "HOME_TUTOR_CTA",
                  campaign: "BECOME_TUTOR",
                },
              }}
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-md bg-[#D79A2C] text-[#17261D] font-semibold text-sm
                         tracking-wide hover:bg-[#c4891f] hover:-translate-y-[1px] transition-all duration-200"
            >
              {ctaText}
            </Link>

            <p className="text-xs text-[#7C9484] mt-4">
              Limited tutor onboarding slots available in your area
            </p>
          </div>

          {/* RIGHT — pinned photograph */}
          <div className="relative max-w-[380px] mx-auto lg:mx-0 lg:ml-auto">
            <div
              aria-hidden="true"
              className="absolute -right-3 -bottom-3 w-full h-full rounded-lg border border-[#D79A2C]/30 bg-[#D79A2C]/[.06] rotate-[2deg]"
            />
            <div className="relative rounded-lg overflow-hidden border border-[#2B4A3D] bg-[#132B22] shadow-[0_28px_60px_rgba(0,0,0,.5)] rotate-[-1.5deg]">
              <figure className="relative aspect-[4/5]">
                <Image src={bigImage} alt="Verified home tutor on Yattra Tutors" fill className="object-cover" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TutorCTA;
