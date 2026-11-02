"use client";

import React from "react";
import Image from "next/image";
import { Gem, History, Target, MapPin, CheckCircle } from "lucide-react";
import { Lora, DM_Sans } from "next/font/google";

import InvestorSection from "./InvestorSection";
import PublicStudentCharts from "./PublicStudentCharts";
import { PageMode } from "./types";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"], style: ["italic", "normal"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

const pageMode: PageMode =
  process.env.NEXT_PUBLIC_INVESTOR_MODE === "true" ? "investor" : "public";

export default function AboutUsPage() {
  return (
    <div className={`relative min-h-screen bg-[#F7F2E9] ${dmSans.className}`}>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0E211C] px-6 py-16 sm:py-20 text-center">
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-[.04]">
          <filter id="aboutGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#aboutGrain)" />
        </svg>

        <div className="relative z-10 max-w-2xl mx-auto">
          <p className={`${lora.className} italic text-sm text-[#D79A2C] mb-4`}>Our story</p>
          <h1 className={`${lora.className} text-3xl sm:text-4xl md:text-5xl font-semibold text-[#F7F2E9] leading-[1.15] mb-5`}>
            Learn the Yattra Tutors way
          </h1>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-[#AAB6A2]">
            A structured tutoring ecosystem powered by AI, expert educators,
            and measurable learning outcomes.
          </p>
          <div className="mt-7 text-xs sm:text-sm text-[#7C9484]">
            {["Structured curriculum", "AI learning paths", "Verified tutors", "Measurable progress"].join("  ·  ")}
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-5">
            <h2 className={`${lora.className} text-2xl sm:text-3xl font-semibold text-[#1C2B22]`}>
              Professional home tutors across India
            </h2>
            <p className="text-sm sm:text-base text-[#58646C] leading-relaxed">
              At <strong className="text-[#1C2B22]">Yattra Tutors</strong>, we design personalized
              learning journeys that build confidence and consistency.
            </p>
            <p className="text-sm sm:text-base text-[#58646C] leading-relaxed">
              One-to-one tutoring ensures every student learns at their own pace
              while parents track real progress transparently.
            </p>
            <p className={`${lora.className} italic text-base text-[#8a5f18]`}>
              &quot;Together, we move closer to excellence.&quot;
            </p>
          </div>

          <div className="relative h-[320px] sm:h-[400px] rounded-lg overflow-hidden border border-[#1C2B22]/10">
            <Image src="/images/about/collage-main.jpg" alt="Yattra Tutors learning" fill className="object-cover" />
            <div className="absolute -bottom-5 -left-5 h-28 w-28 rounded-md overflow-hidden border-4 border-[#F7F2E9]">
              <Image src="/images/about/collage-1.png" alt="" fill className="object-cover" />
            </div>
            <div className="absolute -top-5 -right-5 h-24 w-24 rounded-md overflow-hidden border-4 border-[#F7F2E9]">
              <Image src="/images/about/collage-2.png" alt="" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-16 sm:py-20 bg-white border-y border-[#1C2B22]/10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="divide-y divide-[#1C2B22]/[.08]">
            <InfoCard icon={History} title="Our journey" text="Started with one goal — make quality tutoring structured and measurable." />
            <InfoCard icon={Target} title="Mission & vision" text="To become India's most trusted personalized tutoring platform." />
            <InfoCard icon={Gem} title="Core values" text="Integrity, patience, accountability, and growth." />
          </div>

          <div className="rounded-lg border border-[#1C2B22]/10 overflow-hidden">
            <div className="relative h-[220px] bg-[#F7F2E9]">
              <Image src="/images/about/mission.png" alt="Mission" fill className="object-contain" />
            </div>
            <div className="p-7">
              <h3 className={`${lora.className} text-xl font-semibold text-[#1C2B22] mb-2`}>
                Guiding students to their finish line
              </h3>
              <p className="text-sm text-[#58646C]">Every student follows a visible, stress-free growth path.</p>
              <div className="mt-5 h-px w-12 bg-[#D79A2C]" />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
        <h2 className={`${lora.className} text-center text-2xl sm:text-3xl font-semibold text-[#1C2B22] mb-10`}>
          How Yattra Tutors works
        </h2>

        <div className="grid sm:grid-cols-3 rounded-lg border border-[#1C2B22]/10 bg-white divide-y sm:divide-y-0 sm:divide-x divide-[#1C2B22]/10">
          <ProcessCard step="1" title="Assess the student" text="Learning level & goals" />
          <ProcessCard step="2" title="AI tutor matching" text="Best tutor alignment" />
          <ProcessCard step="3" title="Track progress" text="Clear milestones & reports" />
        </div>
      </section>

      {pageMode === "public" && <PublicStudentCharts />}
      {pageMode === "investor" && <InvestorSection />}

      {/* WHY US */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
        <h2 className={`${lora.className} text-center text-2xl sm:text-3xl font-semibold text-[#1C2B22] mb-10`}>
          Why choose Yattra Tutors
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 rounded-lg border border-[#1C2B22]/10 bg-white divide-y sm:divide-y-0 sm:divide-x divide-[#1C2B22]/10">
          <Feature text="Verified expert tutors" />
          <Feature text="Personalized learning" />
          <Feature text="Flexible scheduling" />
          <Feature text="Stress-free progress" />
        </div>
      </section>

      {/* PAN INDIA */}
      <section className="relative overflow-hidden bg-[#0E211C] py-14 sm:py-16 text-center">
        <MapPin size={28} className="mx-auto mb-4 text-[#D79A2C]" />
        <h2 className={`${lora.className} text-2xl sm:text-3xl font-semibold text-[#F7F2E9]`}>Pan-India tutor network</h2>
        <p className="max-w-xl mx-auto text-sm text-[#AAB6A2] mt-2">
          Students & tutors connected across India.
        </p>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid sm:grid-cols-3 rounded-lg border border-[#1C2B22]/10 bg-white divide-y sm:divide-y-0 sm:divide-x divide-[#1C2B22]/10">
          <Stat number="10,000+" label="Students guided" />
          <Stat number="2,000+" label="Verified tutors" />
          <Stat number="20+" label="Cities covered" />
        </div>
      </section>
    </div>
  );
}

/* ====================== COMPONENTS ====================== */

const InfoCard = ({ icon: Icon, title, text }: { icon: React.ElementType; title: string; text: string }) => (
  <div className="flex gap-4 py-5 first:pt-0">
    <Icon size={18} className="text-[#D79A2C] mt-0.5 shrink-0" />
    <div>
      <h4 className="font-semibold text-sm text-[#1C2B22]">{title}</h4>
      <p className="text-sm text-[#58646C] mt-1">{text}</p>
    </div>
  </div>
);

const Feature = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3 p-6">
    <CheckCircle size={17} className="text-[#1F6F54] shrink-0" />
    <span className="text-sm font-medium text-[#1C2B22]">{text}</span>
  </div>
);

const Stat = ({ number, label }: { number: string; label: string }) => (
  <div className="flex flex-col items-center justify-center text-center py-8">
    <p className={`${lora.className} text-3xl font-semibold text-[#1C2B22]`}>{number}</p>
    <p className="mt-1.5 text-sm text-[#58646C]">{label}</p>
  </div>
);

const ProcessCard = ({ step, title, text }: { step: string; title: string; text: string }) => (
  <div className="p-7">
    <span className={`${lora.className} text-xl font-semibold text-[#D79A2C]`}>{step}</span>
    <h3 className="text-base font-semibold text-[#1C2B22] mt-2">{title}</h3>
    <p className="mt-1.5 text-sm text-[#58646C]">{text}</p>
  </div>
);
