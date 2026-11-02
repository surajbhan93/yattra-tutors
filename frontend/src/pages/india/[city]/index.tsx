import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import CountUp from "react-countup";
import { Loader2, Phone, Star, MapPin, ChevronDown, ChevronUp, ExternalLink, ShieldCheck, GraduationCap, BookOpen, Gift } from "lucide-react";
import { Lora, DM_Sans } from "next/font/google";

import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/landing/Footer";

// 👇 city configs
import { city as agra } from "@/components/seoIndia/locations/up/agra";
import { city as banaras } from "@/components/seoIndia/locations/up/banaras";
// import { city as meerut } from "@/components/seoIndia/locations/up/meerut";
import { city as noida } from "@/components/seoIndia/locations/up/noida";
import LocationsSection from "./Locationssection";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"], style: ["italic", "normal"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

/* =========================
   CITY REGISTRY
========================= */
const CITY_MAP: Record<string, any> = {
  agra,
  banaras,
  // meerut,
  noida,
};

/* =========================
   GOOGLE BUSINESS PROFILES
========================= */
const GOOGLE_BUSINESS: Record<string, string> = {
  noida: "https://share.google/cxxuZwe8K4llKWiHt",
  banaras: "https://share.google/cxxuZwe8K4llKWiHewrt",
  // meerut: "https://share.google/cxxuZwe8K4llKWiHasdfg",
  agra: "https://share.google/cxxuZwe8K4llKWadsfg",
};

const CONTACT_NUMBER = "+91-6363453870";
const PLATFORM_RATING = 4.9;
const TOTAL_REVIEWS = 1240;

/* =========================
   FAQ DATA
========================= */
const FAQS = [
  {
    q: "How do I find a verified home tutor in my city?",
    a: "Simply select your city and area from our platform, browse verified tutors, and connect instantly. Every tutor on Yattra Tutors is background-verified and reviewed by real students.",
  },
  {
    q: "What subjects and classes do tutors cover?",
    a: "Our tutors cover Class 1–12 (CBSE, ICSE, State Board), competitive exams like JEE, NEET, UPSC, SSC, along with spoken English, coding, music, and more.",
  },
  {
    q: "How are tutors verified on Yattra Tutors?",
    a: "Each tutor undergoes document verification, a teaching demo, and community ratings. Only tutors with a consistent track record appear on the platform.",
  },
  {
    q: "What is the fee structure for home tutors?",
    a: "Fees vary by subject, class, and location. On average, tutors charge ₹800–₹3000/month for school subjects and ₹2000–₹8000/month for competitive exam prep. You can negotiate directly with tutors.",
  },
  {
    q: "Can I get a free demo class before committing?",
    a: "Yes! Most tutors on Yattra Tutors offer a free first demo session. You can evaluate the tutor's teaching style before making any payment.",
  },
  {
    q: "How quickly can I get a tutor assigned?",
    a: "In most major cities, we match you with a suitable tutor within 24–48 hours of submitting your request. Call us at " + CONTACT_NUMBER + " for urgent requirements.",
  },
];

/* =========================
   STAR RATING COMPONENT
========================= */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= Math.floor(rating)
              ? "fill-[#D79A2C] text-[#D79A2C]"
              : star - 0.5 <= rating
              ? "fill-[#D79A2C]/40 text-[#D79A2C]"
              : "fill-transparent text-[#9AA3AB]"
          }`}
        />
      ))}
    </div>
  );
}

/* =========================
   FAQ ITEM COMPONENT
========================= */
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rounded-lg border transition-colors ${
        open ? "border-[#D79A2C]/40 bg-white" : "border-[#1C2B22]/10 bg-white hover:border-[#D79A2C]/30"
      }`}
    >
      <button
        className="flex w-full items-center justify-between px-6 py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="flex items-center gap-3">
          <span className={`${lora.className} flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F7F2E9] text-xs font-bold text-[#8a5f18]`}>
            {index + 1}
          </span>
          <span className="font-semibold text-[#1C2B22]">{q}</span>
        </span>
        {open ? (
          <ChevronUp className="h-5 w-5 shrink-0 text-[#D79A2C]" />
        ) : (
          <ChevronDown className="h-5 w-5 shrink-0 text-[#9AA3AB]" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-5 pt-0">
          <p className="border-t border-[#1C2B22]/[.08] pt-4 leading-relaxed text-[#58646C]">{a}</p>
        </div>
      )}
    </div>
  );
}

/* =========================
   HERO GRAIN TEXTURE (replaces blur-orb background)
========================= */
const HeroTexture = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 opacity-[.05]"
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
    }}
  />
);

/* =========================
   STATS BAR
========================= */
const stats = [
  { label: "Cities Covered", value: 50, suffix: "+" },
  { label: "Verified Tutors", value: 12000, suffix: "+" },
  { label: "Happy Students", value: 48000, suffix: "+" },
  { label: "Avg. Rating", value: 4.9, suffix: "/5", decimals: 1 },
];

const TRUST_ITEMS = [
  { label: "Background verified", Icon: ShieldCheck },
  { label: "Qualified teachers", Icon: GraduationCap },
  { label: "Free demo class", Icon: Gift },
  { label: "All boards", Icon: BookOpen },
];

interface Props {
  cityKey: string;
}

export default function IndiaCityHub({ cityKey }: Props) {
  const city = CITY_MAP[cityKey];
  const [redirecting, setRedirecting] = useState(false);
  const googleBizUrl = GOOGLE_BUSINESS[cityKey];

  if (!city) return null;

  const redirectWithLoader = (url: string) => {
    setRedirecting(true);
    setTimeout(() => {
      window.location.href = url;
    }, 700);
  };

  return (
    <>
      {/* ================= SEO ================= */}
      <Head>
        <title>
          Home Tutors in {city.name}, {city.state} | Verified Tutors – Yattra Tutors
        </title>
        <meta
          name="description"
          content={`Find verified home tutors in ${city.name}, ${city.state} across ${city.locations
            .slice(0, 5)
            .join(", ")} and more. Rated ${PLATFORM_RATING}/5 by ${TOTAL_REVIEWS}+ students.`}
        />
        <link rel="canonical" href={`https://yattratutors.com/india/${city.slug}`} />
      </Head>

      <NavBar />

      <main className={dmSans.className}>
        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden bg-[#0E211C] text-white">
          <HeroTexture />

          <div className="relative mx-auto max-w-7xl px-4 py-20 lg:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              {/* ══════════════ LEFT COLUMN ══════════════ */}
              <div>
                {/* ── Signal row ── */}
                <div className="mb-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#AAB6A2]">
                  <span className="inline-flex items-center gap-2">
                    <StarRating rating={PLATFORM_RATING} />
                    <span className="font-semibold text-white">{PLATFORM_RATING}/5</span>
                    <span>({TOTAL_REVIEWS}+ reviews)</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-[#D79A2C]" />
                    {city.name}, {city.state}
                  </span>
                  {googleBizUrl && (
                    <a
                      href={googleBizUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 underline underline-offset-2 hover:text-white"
                    >
                      Google Business
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>

                {/* ── Main heading ── */}
                <h1 className={`${lora.className} text-4xl font-semibold leading-tight text-white md:text-5xl`}>
                  Verified home tutors in {city.name}
                </h1>

                {/* ── Description ── */}
                <p className="mt-6 max-w-xl text-base leading-relaxed text-[#AAB6A2]">
                  Connect with trusted, background-verified tutors in{" "}
                  <strong className="font-semibold text-white">{city.name}</strong> for CBSE, ICSE, NEET, JEE
                  &amp; competitive exams — right from your neighbourhood.
                </p>

                {/* ── Live tutor badge ── */}
                <div className="mt-6 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-2">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D79A2C] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D79A2C]" />
                  </span>
                  <span className="text-sm font-semibold text-white">
                    <CountUp end={city.tutorCount ?? 800} duration={2} />+ verified tutors active now
                  </span>
                </div>

                {/* ── CTA buttons ── */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/tutors?source=noida&campaign=FIND_TUTOR"
                    className="inline-flex items-center gap-2 rounded-md bg-[#D79A2C] px-6 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
                  >
                    Find my tutor →
                  </Link>

                  <a
                    href={`tel:${CONTACT_NUMBER.replace(/-/g, "")}`}
                    className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
                  >
                    <Phone className="h-4 w-4 text-[#D79A2C]" />
                    {CONTACT_NUMBER}
                  </a>

                  <Link
                    href="/subjects/?source=CITY_HUB&campaign=SUBJECTS"
                    className="text-sm font-medium text-[#AAB6A2] underline underline-offset-4 hover:text-white"
                  >
                    Browse subjects
                  </Link>
                </div>

                {/* ── Trust strip ── */}
                <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
                  {TRUST_ITEMS.map(({ label, Icon }) => (
                    <span key={label} className="inline-flex items-center gap-1.5 text-xs font-medium text-[#AAB6A2]">
                      <Icon className="h-3.5 w-3.5 text-[#D79A2C]" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {/* ══════════════ RIGHT COLUMN ══════════════ */}
              <div className="flex flex-col gap-4">
                {/* ── Stats grid 2×2 ── */}
                <div className="grid grid-cols-2 gap-3">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg border border-white/10 bg-white/[.04] px-5 py-5 text-center"
                    >
                      <div className={`${lora.className} text-3xl font-semibold text-white`}>
                        <CountUp end={stat.value} duration={2.5} decimals={stat.decimals ?? 0} />
                        {stat.suffix}
                      </div>
                      <div className="mt-1.5 text-xs font-medium text-[#AAB6A2]">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* ── Google review card ── */}
                {googleBizUrl && (
                  <a
                    href={googleBizUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-lg border border-white/10 bg-white/[.04] px-5 py-4 transition-colors hover:border-[#D79A2C]/30"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white">
                      <svg className="h-6 w-6" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white">Yattra Tutors on Google</p>
                      <div className="mt-0.5 flex items-center gap-1.5">
                        <StarRating rating={PLATFORM_RATING} />
                        <span className="text-sm font-bold text-white">{PLATFORM_RATING}</span>
                        <span className="text-xs text-[#AAB6A2]">· {TOTAL_REVIEWS}+ reviews</span>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 shrink-0 text-[#AAB6A2] transition-colors group-hover:text-white" />
                  </a>
                )}

                {/* ── Quick subject pills ── */}
                <div className="rounded-lg border border-white/10 bg-white/[.04] px-5 py-4">
                  <p className={`${lora.className} italic mb-3 text-xs text-[#AAB6A2]`}>Popular subjects</p>
                  <div className="flex flex-wrap gap-2">
                    {["CBSE Class 10", "JEE Maths", "NEET Biology", "ICSE English", "Class 12 Physics", "SSC GK"].map(
                      (subj) => (
                        <span
                          key={subj}
                          className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-[#AAB6A2]"
                        >
                          {subj}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* ── Contact card ── */}
                <div className="flex items-center justify-between gap-4 rounded-lg border border-[#D79A2C]/25 bg-[#D79A2C]/10 px-5 py-4">
                  <div>
                    <p className="mb-0.5 text-xs font-medium text-[#AAB6A2]">Need help choosing?</p>
                    <p className="text-sm font-bold text-white">Call us — we match in 24h</p>
                  </div>
                  <a
                    href={`tel:${CONTACT_NUMBER.replace(/-/g, "")}`}
                    className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[#D79A2C] px-4 py-2.5 text-sm font-bold text-[#17261D] transition-colors hover:bg-[#c4891f]"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    Call now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= TRUST BAR ================= */}
        <div className="bg-[#15302A]">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-[#AAB6A2]">
              {TRUST_ITEMS.map(({ label, Icon }) => (
                <span key={label} className="flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-[#D79A2C]" />
                  {label}
                </span>
              ))}
            </div>
            <a
              href={`tel:${CONTACT_NUMBER.replace(/-/g, "")}`}
              className="flex items-center gap-2 text-sm font-bold text-white"
            >
              <Phone className="h-4 w-4 text-[#D79A2C]" />
              {CONTACT_NUMBER}
            </a>
          </div>
        </div>

        {/* ================= LOCATIONS ================= */}
        <LocationsSection city={city} googleBizUrl={googleBizUrl} redirectWithLoader={redirectWithLoader} />

        {/* ================= GOOGLE BUSINESS PROFILE CARD ================= */}
        {googleBizUrl && (
          <section className="mx-auto max-w-6xl px-4 pb-16">
            <div className="overflow-hidden rounded-lg border border-[#1C2B22]/10 bg-white">
              <div className="flex flex-col md:flex-row">
                <div className="h-1.5 w-full shrink-0 bg-[#D79A2C] md:h-auto md:w-1.5" />

                <div className="flex flex-1 flex-col items-center gap-6 p-8 md:flex-row">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-[#1C2B22]/10 bg-[#F7F2E9]">
                    <svg className="h-9 w-9" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <p className={`${lora.className} italic mb-1 text-xs text-[#8a5f18]`}>
                      Google Business Profile
                    </p>
                    <h3 className="text-xl font-bold text-[#1C2B22]">
                      Yattra Tutors — home tutors in {city.name}
                    </h3>
                    <div className="mt-2 flex items-center justify-center gap-2 md:justify-start">
                      <StarRating rating={PLATFORM_RATING} />
                      <span className="font-bold text-[#1C2B22]">{PLATFORM_RATING}</span>
                      <span className="text-sm text-[#9AA3AB]">({TOTAL_REVIEWS}+ reviews)</span>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                    <a
                      href={googleBizUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-[#D79A2C] px-5 py-2.5 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
                    >
                      View on Google
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={`tel:${CONTACT_NUMBER.replace(/-/g, "")}`}
                      className="inline-flex items-center justify-center gap-2 rounded-md border border-[#1C2B22]/15 px-5 py-2.5 text-sm font-semibold text-[#1C2B22] transition-colors hover:border-[#D79A2C]/50"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      Call now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= CTA ================= */}
        <section className="mx-6 mb-16">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-lg bg-[#0E211C] px-6 py-10 text-white">
            <HeroTexture />
            <div className="relative flex flex-col items-center justify-between gap-8 md:flex-row">
              <div>
                <h3 className={`${lora.className} text-2xl font-semibold md:text-3xl`}>
                  Find a verified tutor near you
                </h3>
                <p className="mt-3 text-[#AAB6A2]">Connect with trusted tutors within minutes.</p>
                <div className="mt-4 flex items-center gap-2">
                  <StarRating rating={PLATFORM_RATING} />
                  <span className="font-bold text-white">{PLATFORM_RATING}/5</span>
                  <span className="text-sm text-[#AAB6A2]">from {TOTAL_REVIEWS}+ students</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/tutors?source=Main_page&campaign=FIND_TUTOR"
                  className="rounded-md bg-[#D79A2C] px-7 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
                >
                  Find tutor
                </Link>

                <a
                  href={`tel:${CONTACT_NUMBER.replace(/-/g, "")}`}
                  className="flex items-center gap-2 rounded-md border border-white/25 px-7 py-3 text-sm font-semibold transition-colors hover:bg-white/5"
                >
                  <Phone className="h-4 w-4 text-[#D79A2C]" />
                  {CONTACT_NUMBER}
                </a>

                <button
                  onClick={() => redirectWithLoader("/tutors/")}
                  className="rounded-md border border-white/25 px-7 py-3 text-sm font-semibold transition-colors hover:bg-white/5"
                >
                  Check tutors
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FAQS ================= */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="mb-12 text-center">
            <p className={`${lora.className} italic mb-2 text-sm text-[#8a5f18]`}>Got questions?</p>
            <h2 className={`${lora.className} text-3xl font-semibold text-[#1C2B22] md:text-4xl`}>
              Frequently asked questions
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#58646C]">
              Everything you need to know about finding the right tutor in {city.name}. Can&rsquo;t find an answer?{" "}
              <a
                href={`tel:${CONTACT_NUMBER.replace(/-/g, "")}`}
                className="font-semibold text-[#8a5f18] hover:underline"
              >
                Call us at {CONTACT_NUMBER}
              </a>
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => (
              <FaqItem key={index} q={faq.q} a={faq.a} index={index} />
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* ================= LOADER ================= */}
      {redirecting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E211C]/60 backdrop-blur">
          <div className="flex items-center gap-3 rounded-lg bg-white px-6 py-4 shadow-xl">
            <Loader2 className="h-6 w-6 animate-spin text-[#D79A2C]" />
            <span className="font-medium text-[#1C2B22]">Finding best tutors for you…</span>
          </div>
        </div>
      )}
    </>
  );
}

/* =========================
   STATIC GENERATION
========================= */
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: Object.keys(CITY_MAP)
    .filter((city) => city !== "agra" && city !== "meerut")
    .map((city) => ({
      params: { city },
    })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: {
    cityKey: params?.city,
  },
  revalidate: 86400,
});
