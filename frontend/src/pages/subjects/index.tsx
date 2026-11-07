import Head from "next/head";
import dynamic from "next/dynamic";
import Footer from "@/components/landing/Footer";
import NavBar from "@/components/navbar/NavBar";
import FilterSidebar from "@/components/filters/FilterSidebar";
import MobileFilterDrawer from "@/components/filters/MobileFilterDrawer";
import SubjectsGrid from "@/components/subjects/SubjectsGrid";
import { GraduationCap, ShieldCheck, Star, ArrowRight, BookOpen, Users } from "lucide-react";
import { lora, dmSans } from "@/lib/fonts";

/* ======================
   LAZY LOAD SEO CONTENT
====================== */
const SubjectsContent = dynamic(
  () => import("@/components/seo/SubjectsContent"),
  {
    ssr: false,
    loading: () => (
      <div className="mt-16 text-center text-[#9AA3AB] animate-pulse">
        Loading detailed information...
      </div>
    ),
  }
);

/* ======================
   DATA — untouched
====================== */
const STATS = [
  { icon: Users, value: "12,000+", label: "Active students" },
  { icon: GraduationCap, value: "800+", label: "Verified tutors" },
  { icon: BookOpen, value: "40+", label: "Subjects covered" },
  { icon: Star, value: "4.9/5", label: "Average rating" },
];

const BOARDS = ["CBSE", "ICSE", "Maharashtra Board", "UP Board", "Karnataka Board", "Tamil Nadu Board"];

const VALUE_PROPS = [
  { icon: ShieldCheck, title: "Background verified", desc: "Every tutor goes through a strict ID & credential verification process before being listed." },
  { icon: GraduationCap, title: "Board-specialist tutors", desc: "Tutors specialise in CBSE, ICSE, and specific State Boards — no generalists." },
  { icon: Star, title: "Rated & reviewed", desc: "Real ratings from real parents and students. Transparent, honest reviews only." },
];

/*
 * ═══════════════════════════════════════════════════════
 *  SUBJECTS PAGE — "The Catalogue Room"
 *  Same pine / parchment / gold identity as the homepage —
 *  a dark pine hero band, a plain ledger stats row, a
 *  parchment catalogue, and one pine CTA banner — instead
 *  of the indigo/violet/teal glass-and-glow look.
 * ═══════════════════════════════════════════════════════
 */
export default function SubjectsPage() {
  return (
    <>
      <NavBar />

      {/* ======================
          SEO HEAD — untouched
      ====================== */}
      <Head>
        <title>School Subject Tutors | CBSE, ICSE & State Board | Yattra Tutors</title>
        <meta
          name="description"
          content="Find expert Maths, Science, Commerce & Language tutors for CBSE, ICSE and State Board students. English medium, verified tutors available on Yattra Tutors."
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0E211C" />
        <link rel="canonical" href="https://www.yattratutors.com/subjects" />

        <meta property="og:title" content="School Subject Tutors | Yattra Tutors" />
        <meta property="og:description" content="Verified subject-wise tutors for CBSE, ICSE & State Board students." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.yattratutors.com/subjects" />
        <meta property="og:site_name" content="Yattra Tutors" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="School Subject Tutors | Yattra Tutors" />
        <meta name="twitter:description" content="Verified subject-wise tutors for CBSE, ICSE & State Board students." />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.yattratutors.com" },
                { "@type": "ListItem", position: 2, name: "Subjects", item: "https://www.yattratutors.com/subjects" },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Are Yattra Tutors tutors verified?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, all tutors on Yattra Tutors undergo thorough background verification before being listed on the platform.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Which boards do Yattra Tutors tutors cover?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yattra Tutors tutors cover CBSE, ICSE, and various State Boards including Maharashtra, UP, Karnataka, and Tamil Nadu boards.",
                  },
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Yattra Tutors",
              url: "https://www.yattratutors.com",
              description: "India's leading platform for finding verified school subject tutors for CBSE, ICSE, and State Board students.",
            }),
          }}
        />
      </Head>

      {/* ======================
          PAGE WRAPPER
      ====================== */}
      <div className={`relative min-h-screen w-full overflow-x-hidden bg-[#F7F2E9] ${dmSans.className}`}>

        {/* ======================
            HERO BAND (pine)
        ====================== */}
        <header className="relative overflow-hidden bg-[#0E211C]">
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-[.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-8 pb-14 sm:pt-10 sm:pb-20">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-[#AAB6A2]">
              <a href="/" className="hover:text-[#D79A2C] transition-colors font-medium">Home</a>
              <span className="text-[#AAB6A2]/40">/</span>
              <span className="text-[#D79A2C] font-medium">Subjects</span>
            </nav>

            <p className={`${lora.className} italic text-sm text-[#D79A2C] mb-3`}>
              India&apos;s most trusted tutors platform
            </p>

            <h1 className={`${lora.className} text-4xl sm:text-5xl lg:text-[56px] font-semibold text-[#F5F1E6] leading-[1.1] mb-5`}>
              Find the perfect subject tutor
            </h1>

            <p className="max-w-2xl text-[#AAB6A2] text-[15px] sm:text-base leading-relaxed mb-8">
              Expert tutors for <strong className="text-[#F5F1E6] font-semibold">CBSE, ICSE &amp; State Board</strong>{" "}
              students — all teaching in <strong className="text-[#F5F1E6] font-semibold">English medium</strong>, background verified and results-driven.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href="#subjects-grid"
                className="inline-flex items-center gap-2 rounded-md bg-[#D79A2C] px-6 py-3 text-sm font-semibold text-[#17261D]
                           hover:bg-[#c4891f] hover:-translate-y-[1px] transition-all duration-200"
              >
                Browse all subjects <ArrowRight size={15} />
              </a>
              <a
                href="/tutors"
                className="text-[#D79A2C] font-medium text-sm border-b border-[#D79A2C]/40 hover:border-[#D79A2C] hover:text-[#F2C169] transition-colors pb-0.5"
              >
                View all tutors
              </a>
            </div>

            {/* Board tags */}
            <div className="flex flex-wrap gap-2 border-t border-[#D79A2C]/15 pt-6" aria-label="Supported boards">
              {BOARDS.map((board) => (
                <span key={board} className="rounded-full border border-[#D79A2C]/20 px-3 py-1 text-xs font-medium text-[#AAB6A2]">
                  {board}
                </span>
              ))}
            </div>
          </div>
        </header>

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">

          {/* ======================
              STATS LEDGER
          ====================== */}
          <section aria-label="Platform statistics" className="-mt-8 relative z-10 mb-14">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-[#1C2B22]/[.08] rounded-lg bg-white border border-[#1C2B22]/[.08] shadow-[0_18px_40px_rgba(0,0,0,.08)]">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex flex-col items-center justify-center px-4 py-6 text-center">
                  <Icon size={18} className="text-[#D79A2C] mb-2" />
                  <span className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>{value}</span>
                  <span className="mt-0.5 text-xs text-[#58646C] font-medium">{label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Mobile filter */}
          <div className="lg:hidden mb-4">
            <MobileFilterDrawer />
          </div>

          {/* ======================
              MAIN LAYOUT
          ====================== */}
          <div id="subjects-grid" className="flex gap-8 items-start pb-16 overflow-x-hidden">
            <FilterSidebar />

            <main className="flex-1 min-w-0 max-w-full">
              {/* Trust badges */}
              <div className="hidden sm:flex items-center justify-end gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <ShieldCheck size={12} /> Verified
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D79A2C]/10 border border-[#D79A2C]/25 px-3 py-1 text-xs font-semibold text-[#8a5f18]">
                  <GraduationCap size={12} /> Board expert
                </span>
              </div>

              <SubjectsGrid />

              {/* Value props */}
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-[#1C2B22]/[.08] pt-10">
                {VALUE_PROPS.map(({ icon: Icon, title, desc }) => (
                  <div key={title}>
                    <Icon size={20} className="text-[#D79A2C] mb-3" />
                    <h3 className={`${lora.className} text-base font-semibold text-[#1C2B22] mb-1.5`}>{title}</h3>
                    <p className="text-sm text-[#58646C] leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </main>
          </div>

          {/* ======================
              SEO CONTENT (LAZY)
          ====================== */}
          <section aria-label="Detailed subject information" className="pb-16">
            <SubjectsContent />
          </section>

          {/* ======================
              BOTTOM CTA (pine)
          ====================== */}
          <section
            aria-label="Call to action"
            className="relative overflow-hidden rounded-lg bg-[#0E211C] text-center px-6 py-14 mb-16"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none opacity-[.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />
            <div className="relative z-10">
              <p className={`${lora.className} italic text-sm text-[#D79A2C] mb-4`}>Join 12,000+ students</p>
              <h2 className={`${lora.className} text-2xl sm:text-4xl font-semibold text-[#F5F1E6] leading-tight mb-3`}>
                Ready to find your perfect tutor?
              </h2>
              <p className="text-[#AAB6A2] text-sm sm:text-base max-w-xl mx-auto mb-8">
                Book a free demo class today. No commitments, no hidden fees.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/tutors"
                  className="inline-flex items-center gap-2 rounded-md bg-[#D79A2C] px-8 py-3.5 text-sm font-semibold text-[#17261D]
                             hover:bg-[#c4891f] hover:-translate-y-[1px] transition-all duration-200"
                >
                  Find a tutor now <ArrowRight size={16} />
                </a>
                <a
                  href="/how-it-works"
                  className="text-[#D79A2C] font-medium text-sm border-b border-[#D79A2C]/40 hover:border-[#D79A2C] hover:text-[#F2C169] transition-colors pb-0.5"
                >
                  How it works
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        *:focus-visible { outline: 2px solid #D79A2C; outline-offset: 2px; border-radius: 4px; }
      `}</style>
    </>
  );
}
