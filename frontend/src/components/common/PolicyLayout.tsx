import React from "react";
import { Lora, DM_Sans } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"], style: ["italic", "normal"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

/* ======================
   POLICY HERO — pine band with grain texture
====================== */
export function PolicyHero({
  icon: Icon,
  title,
  subtitle,
  lastUpdated,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: React.ReactNode;
  lastUpdated?: boolean;
}) {
  return (
    <section className={`relative overflow-hidden bg-[#0E211C] px-6 py-16 sm:py-20 text-center ${dmSans.className}`}>
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-[.04]">
        <filter id="policyGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#policyGrain)" />
      </svg>

      <div className="relative z-10 max-w-2xl mx-auto">
        <Icon size={32} className="mx-auto text-[#D79A2C] mb-5" strokeWidth={1.5} />
        <h1 className={`${lora.className} text-3xl sm:text-4xl md:text-5xl font-semibold text-[#F7F2E9] leading-[1.15] mb-5`}>
          {title}
        </h1>
        <p className="mx-auto max-w-xl text-sm sm:text-base text-[#AAB6A2] leading-relaxed">{subtitle}</p>
        {lastUpdated && (
          <p className="mt-4 text-xs text-[#7C9484]">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        )}
      </div>
    </section>
  );
}

/* ======================
   POLICY SECTION — ledger row, not a floating glass card
====================== */
export function PolicySection({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 sm:gap-5 py-7 border-b border-[#1C2B22]/[.08] last:border-b-0">
      <Icon size={18} className="text-[#D79A2C] mt-1 shrink-0" />
      <div>
        <h2 className={`${lora.className} text-lg font-semibold text-[#1C2B22] mb-2`}>{title}</h2>
        <div className="text-sm text-[#58646C] leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_strong]:text-[#1C2B22] [&_strong]:font-semibold">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ======================
   POLICY BODY WRAPPER
====================== */
export function PolicyBody({ children }: { children: React.ReactNode }) {
  return (
    <section className={`max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20 ${dmSans.className}`}>
      <div className="rounded-lg border border-[#1C2B22]/10 bg-white px-6 sm:px-8">{children}</div>
    </section>
  );
}

/* ======================
   POLICY FOOTNOTE
====================== */
export function PolicyFootnote({ children }: { children: React.ReactNode }) {
  return <p className="text-center text-sm text-[#9AA3AB] pb-16 -mt-6">{children}</p>;
}

/* ======================
   PAGE WRAPPER (bg)
====================== */
export function PolicyPageWrapper({ children }: { children: React.ReactNode }) {
  return <div className="relative w-full overflow-x-hidden bg-[#F7F2E9]">{children}</div>;
}
