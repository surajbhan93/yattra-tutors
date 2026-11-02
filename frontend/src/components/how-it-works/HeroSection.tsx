import { Users, GraduationCap, ArrowRight } from "lucide-react";
import { Lora, DM_Sans } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"], style: ["italic", "normal"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function HeroSection() {
  return (
    <section
      aria-label="Yattra Tutors platform introduction"
      className={`relative overflow-hidden bg-[#0E211C] px-6 sm:px-10 py-16 sm:py-20 ${dmSans.className}`}
    >
      {/* grain texture */}
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-[.04]">
        <filter id="howHeroGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#howHeroGrain)" />
      </svg>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className={`${lora.className} italic text-sm text-[#D79A2C] mb-4`}>
          A shared process for parents and tutors
        </p>

        <h1 className={`${lora.className} text-3xl sm:text-4xl md:text-5xl font-semibold text-[#F7F2E9] leading-[1.15] mb-5`}>
          How Yattra Tutors works
        </h1>

        <p className="mx-auto max-w-xl text-sm sm:text-base text-[#AAB6A2] leading-relaxed mb-9">
          One platform, two sides of the same process — parents find a verified
          tutor for their child, and tutors find real students, in a few
          straightforward steps.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="/how-it-works?type=parent"
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-[#D79A2C] px-7 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
          >
            <Users size={16} />
            For parents
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </a>

          <a
            href="/how-it-works?type=tutor"
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md border border-[#F7F2E9]/20 px-7 py-3 text-sm font-semibold text-[#F7F2E9] transition-colors hover:border-[#F7F2E9]/40 hover:bg-white/5"
          >
            <GraduationCap size={16} />
            For tutors
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="mx-auto my-8 h-px w-16 bg-[#D79A2C]/20" />

        <p className="text-xs sm:text-sm text-[#7C9484]">
          {["Verified tutors", "Parent dashboard", "Secure payments", "Replacement support"].join("  ·  ")}
        </p>
      </div>
    </section>
  );
}
