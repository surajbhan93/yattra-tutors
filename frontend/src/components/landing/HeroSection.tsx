"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
interface HeroSectionProps {
  ctaText?: string;
  imageUrl?: string;
}
import { playfair } from "@/lib/fonts";
import dynamic from "next/dynamic";

const DynamicLightsThree = dynamic(() => import("@/components/tutors/DynamicLightsThree"), {
  ssr: false,
});

const cities = [
  "Meerut",
  "Lucknow",
  "Allahabad",
  "Noida",
  "Banaras",
  "Agra",
  "Kanpur",
];

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const trustBadges = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 013 10c0 5.592 3.824 10.29 9 11.623C17.176 20.29 21 15.592 21 10c0-1.362-.195-2.68-.555-3.927a11.956 11.956 0 01-3.118-1.109A11.96 11.96 0 0112 2.964z" />
      </svg>
    ),
    label: "Verified Tutors",
    sublabel: "Background-checked",
    iconBg: "bg-emerald-500/10 border border-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
    label: "Safe Payments",
    sublabel: "100% secure & encrypted",
    iconBg: "bg-teal-500/10 border border-teal-500/20",
    iconColor: "text-teal-400",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    label: "1-on-1 Learning",
    sublabel: "Personalized attention",
    iconBg: "bg-emerald-500/10 border border-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    label: "Expert Approved",
    sublabel: "Interviewed & assessed",
    iconBg: "bg-green-500/10 border border-green-500/20",
    iconColor: "text-green-400",
  },
];

const stats = [
  { value: 12000, suffix: "+", label: "Active Students" },
  { value: 3500,  suffix: "+", label: "Expert Tutors"   },
  { value: 98,    suffix: "%", label: "Satisfaction"    },
  { value: 7,     suffix: "+", label: "Cities Covered"  },
];

/* ─────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────── */
function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let startTime: number | null = null;
          const step = (ts: number) => {
            if (!startTime) startTime = ts;
            const progress = Math.min((ts - startTime) / 1800, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * to));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(to);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to]);

  return (
    <span ref={ref} aria-label={`${to}${suffix}`}>
      {count.toLocaleString("en-IN")}{suffix}
    </span>
  );
}

/* ─────────────────────────────────────────
   PARTICLES
───────────────────────────────────────── */
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    const pts = Array.from({ length: 45 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.3 + 0.3,
      dx: (Math.random() - 0.5) * 0.25, dy: (Math.random() - 0.5) * 0.25,
      a: Math.random() * 0.4 + 0.08,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      pts.forEach((p) => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16,185,129,${p.a})`; ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" aria-hidden="true" />;
}

/* ─────────────────────────────────────────
   VIDEO MODAL
───────────────────────────────────────── */
function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Yattra Tutors intro video"
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/92 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-700 to-emerald-400 -z-10" />
        <div className="relative rounded-2xl overflow-hidden bg-black">
          <button
            onClick={onClose}
            aria-label="Close video"
            className="absolute right-3 top-3 sm:right-4 sm:top-4 z-10 w-9 h-9 flex items-center justify-center rounded-full
                       bg-emerald-500/20 border border-emerald-500/40 text-white
                       hover:bg-emerald-500/35 hover:scale-110 transition-all duration-200"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <iframe
            className="w-full aspect-video"
            src="https://www.youtube.com/embed/L1YVA3k7R2A?autoplay=1"
            title="How Yattra Tutors works — Find verified home tutors across India"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN HERO SECTION
───────────────────────────────────────── */
const HeroSection: React.FC<HeroSectionProps> = ({
  ctaText = "Watch How It Works",
  imageUrl = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80",
}) => {
  const [videoOpen, setVideoOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [heroSearchQuery, setHeroSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Remove artificial delay to improve LCP
    setMounted(true);
  }, []);

  const fu = (delay: string) =>
    `transition-all duration-700 ease-out ${delay} ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`;

  /* JSON-LD structured data */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Yattra Tutors",
    description:
      "India's most trusted home tutoring platform connecting students with verified tutors for Maths, Science, Coding and competitive exams.",
    url: "https://yattratutors.com",
    areaServed: { "@type": "Country", name: "India" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "8000",
    },
  };

  return (
    <>
      {/* ── SEO Head ── */}
      <Head>
        <title>
  Yattra Tutors – Find Your Perfect Home Tutor Across India & Prayagraj
</title>
        <meta
  name="description"
  content="Yattra Tutors – Find your perfect home tutor across India and Prayagraj. Verified tutors for Maths, Science, Coding & competitive exams. Free demo available."
/>
        <meta
  name="keywords"
  content="
  home tutor in Prayagraj,
  home tutor in Allahabad,
  tution teacher in prayagraj,
  best home tutor Prayagraj,
  private home tutor Prayagraj,
  home tuition in Prayagraj for all classes,
  home tuition Allahabad near me,
  home tutor near me in Prayagraj,
  experienced home tutor Prayagraj,
  female home tutor Prayagraj,
  maths home tutor Prayagraj,
  science home tutor Prayagraj,
  physics chemistry tutor Prayagraj,
  CBSE home tutor in Prayagraj,
  ICSE home tutor in Prayagraj,
  state board tutor Prayagraj,
  class 10 home tutor Prayagraj,
  class 12 home tutor Prayagraj,
  JEE preparation tutor Prayagraj,
  NEET preparation tutor Prayagraj,
  affordable home tuition Prayagraj,
  one to one home tutor Prayagraj,
  verified home tutor Prayagraj,
  online tutor Prayagraj India,
  home tutor India,
  private tutor India,
  Yattra Tutors home tutor services
  "
/>
        <meta property="og:title" content="Yattra Tutors — Find Verified Home Tutors Across India" />
        <meta
          property="og:description"
          content="Personalized 1-on-1 home tutoring. Verified tutors, free demo, secure payments. Serving 7+ cities across India."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yattratutors.com" />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Yattra Tutors — Find Verified Home Tutors" />
        <meta
          name="twitter:description"
          content="India's most trusted home tutoring platform. 12,000+ students. 3,500+ verified tutors."
        />
        <link rel="canonical" href="https://yattratutors.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {/* ── Keyframes ── */}
      <style>{`
        .font-playfair { font-family: 'Playfair Display', Georgia, serif; }

        @keyframes float-hero {
          0%,100% { transform: translateY(0px)   rotate(.2deg);  }
          50%      { transform: translateY(-10px) rotate(-.2deg); }
        }
        .animate-float { animation: float-hero 7s ease-in-out infinite; }

        @keyframes glow-breathe {
          0%,100% { opacity: .5;  transform: scale(1);    }
          50%      { opacity: .95; transform: scale(1.05); }
        }
        .animate-glow-breathe { animation: glow-breathe 4.5s ease-in-out infinite; }

        @keyframes live-blink { 0%,100% { opacity:1; } 50% { opacity:.2; } }
        .animate-live-blink { animation: live-blink 1.5s ease-in-out infinite; }

        @keyframes tag-pulse {
          0%,100% { opacity:1;    transform:scale(1);   }
          50%      { opacity:.3;  transform:scale(.6);  }
        }
        .animate-tag-pulse { animation: tag-pulse 2s ease-in-out infinite; }

        @keyframes scroll-bounce {
          0%,100% { transform: translateY(0);   opacity: 1;  }
          50%      { transform: translateY(6px); opacity: .3; }
        }
        .animate-scroll-bounce { animation: scroll-bounce 1.8s ease-in-out infinite; }

        @keyframes shimmer-slide {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .btn-emerald-shimmer {
          background: linear-gradient(
            110deg,
            #059669 0%, #34D399 30%, #059669 50%, #047857 75%, #10B981 100%
          );
          background-size: 300% auto;
          animation: shimmer-slide 4s linear infinite;
        }

        /* ── Premium alignment helpers ── */
        .hero-left-align { text-align: left; }

        @media (max-width: 1023px) {
          .hero-left-align { text-align: center; }
          .hero-left-align-flex { justify-content: center; }
          .hero-badge-center { margin-left: auto; margin-right: auto; }
          .hero-subtext-center { margin-left: auto; margin-right: auto; }
        }

        @media (min-width: 1024px) {
          .hero-left-align-flex { justify-content: flex-start; }
          .hero-badge-center { margin-left: 0; margin-right: 0; }
          .hero-subtext-center { margin-left: 0; margin-right: 0; }
        }
      `}</style>

      {/* ════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════ */}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden bg-[#021d16] text-stone-200"
      >
        {/* BG mesh */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 85% 65% at 72% -15%, rgba(16,185,129,.18) 0%, transparent 60%),
              radial-gradient(ellipse 55% 45% at 8%  85%,  rgba(5,150,105,.14) 0%, transparent 55%),
              radial-gradient(ellipse 65% 55% at 92% 95%,  rgba(52,211,153,.12) 0%, transparent 50%)
            `,
          }}
        />

        {/* Noise texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Three.js Dynamic Lights 3D Scene — kept as a quiet background accent */}
        <DynamicLightsThree className="opacity-60" />

        {/* Top emerald rule */}
        <div aria-hidden="true" className="relative z-10 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

        {/* ─── CONTAINER ─── */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-3 sm:px-5 md:px-6 lg:px-8 xl:px-10 pt-10 sm:pt-14 pb-14 sm:pb-20">

          {/* ── TRUST TAG ── */}
          <div className={`flex justify-center lg:justify-start ${fu("delay-[0ms]")}`}>
            <p
              role="note"
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-[5px] rounded-full
                         border border-emerald-500/35 bg-emerald-500/[.07]
                         text-emerald-400 text-[10px] sm:text-[11px] font-medium tracking-widest uppercase
                         mb-6 sm:mb-8"
            >
              <span
                aria-hidden="true"
                className="w-[6px] h-[6px] rounded-full bg-emerald-400 animate-tag-pulse flex-shrink-0"
              />
              Over 12,000 students already learning with us
            </p>
          </div>

          {/* ── COLUMNS ── */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-14">

            {/* ══ LEFT ══ */}
            <div className="w-full lg:w-[50%] flex-shrink-0 flex flex-col items-center lg:items-start">

              {/* H1 */}
              <div className={`w-full ${fu("delay-[100ms]")}`}>
              <h1
  id="hero-heading"
  className={`${playfair.className} font-bold leading-[1.08] text-stone-100 tracking-tight mb-4 sm:mb-5
    text-4xl sm:text-5xl lg:text-[clamp(42px,4.5vw,64px)]
    text-center lg:text-left`}
>
  Home Tutors in Prayagraj
  <br />
  Trusted Across India
</h1>
<p className="hidden">
  Find the best home tutor in Prayagraj (Allahabad) for Maths, Science, CBSE, ICSE, JEE and NEET preparation. Get verified private tutors near you with free demo classes from Yattra Tutors.
</p>
              </div>

              {/* Subtext */}
              <div className={`w-full ${fu("delay-[180ms]")}`}>
                <p className="text-base sm:text-[16.5px] leading-[1.8] text-stone-300
                  max-w-[460px] mb-6 sm:mb-8
                  text-center lg:text-left
                  mx-auto lg:mx-0">
                  Every tutor is{" "}
                  <strong className="font-semibold text-white">background-checked and interviewed</strong>{" "}
                  before they meet your child. Pick Maths, Science, Coding or exam prep, sit in on a
                  free demo class, and pay securely only once you're sure.
                </p>
              </div>

              {/* Quick Search Bar */}
              <div className={`w-full max-w-[480px] mb-6 ${fu("delay-[220ms]")}`}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (heroSearchQuery.trim()) {
                      router.push(`/tutors?q=${encodeURIComponent(heroSearchQuery.trim())}`);
                    } else {
                      router.push("/tutors");
                    }
                  }}
                  className="relative flex items-center p-1.5 rounded-full bg-black/60 border border-emerald-500/40 shadow-xl backdrop-blur-xl"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-emerald-400 ml-3 mr-2 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  <input
                    type="text"
                    value={heroSearchQuery}
                    onChange={(e) => setHeroSearchQuery(e.target.value)}
                    placeholder="Search by subject or city (e.g. Maths in Prayagraj)..."
                    className="w-full bg-transparent text-white placeholder-stone-400 text-xs sm:text-sm outline-none font-medium py-1"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:scale-105 text-white font-bold text-xs uppercase tracking-wider transition-all flex-shrink-0 shadow-md shadow-emerald-500/25"
                  >
                    Find Tutors
                  </button>
                </form>
              </div>

              {/* CTA BUTTONS */}
              <div className={`flex flex-wrap gap-3 mb-10 sm:mb-12 justify-center lg:justify-start ${fu("delay-[260ms]")}`}>
                <button
                  onClick={() => setVideoOpen(true)}
                  aria-label="Watch how Yattra Tutors works — opens video"
                  className="btn-emerald-shimmer inline-flex items-center gap-3 px-5 sm:px-7 py-3 sm:py-[14px] rounded-full
                             text-white font-bold text-sm sm:text-[15px] tracking-wide
                             hover:scale-[1.04] hover:-translate-y-[2px] hover:shadow-[0_16px_40px_rgba(5,150,105,.5)]
                             active:scale-[.98] transition-all duration-300"
                >
                  <span
                    aria-hidden="true"
                    className="w-8 h-8 sm:w-9 sm:h-9 bg-black/25 rounded-full flex items-center justify-center flex-shrink-0"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  {ctaText}
                </button>

                <a
                  href="/tutors"
                  aria-label="Find a home tutor near you"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-[13px] rounded-full
                             border border-emerald-500/40 text-emerald-300 font-semibold text-sm sm:text-[14px]
                             hover:bg-emerald-500/10 hover:border-emerald-400 hover:text-white hover:-translate-y-[1px]
                             transition-all duration-300"
                >
                  Find a Tutor
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </a>
              </div>

              {/* ── STATS ── */}
              <div className={`w-full ${fu("delay-[360ms]")}`}>

                {/* Brain Booster CTA */}
                <div className="flex justify-center lg:justify-start mb-6">
                  {/* <button
                    onClick={() => router.push("/games")}
                    className="
                      px-6 sm:px-8
                      py-3 sm:py-4
                      rounded-full
                      border border-emerald-500/40
                      text-emerald-300
                      text-sm sm:text-base
                      font-semibold
                      bg-emerald-500/10
                      hover:bg-emerald-500/20
                      hover:text-white
                      hover:scale-105
                      hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]
                      transition-all duration-300
                    "
                  >
                    🧠 Try Brain Booster
                  </button> */}
                </div>

                <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent mb-4 sm:mb-5" />

                <dl className="grid grid-cols-2 sm:grid-cols-4 gap-y-5 gap-x-2 sm:gap-y-0 sm:divide-x sm:divide-emerald-500/10">
                  {stats.map((s, i) => (
                    <div key={i} className="text-center px-1 sm:px-2 py-1">
                      <dt className={`${playfair.className} text-[22px] sm:text-2xl font-bold text-emerald-400 leading-none mb-1.5`}>
                        <AnimatedCounter to={s.value} suffix={s.suffix} />
                      </dt>
                      <dd className="text-[9px] sm:text-[10.5px] uppercase tracking-[.06em] text-stone-400 leading-tight">
                        {s.label}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent mt-4 sm:mt-5" />
              </div>
            </div>

            {/* ══ RIGHT — IMAGE ══ */}
            <div className={`relative w-full lg:flex-1 lg:self-start lg:mt-2 ${fu("delay-[200ms]")}`}>

              {/* Glow halo */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 sm:-inset-6 rounded-3xl bg-emerald-500/20 blur-3xl animate-glow-breathe pointer-events-none"
              />

              {/* Float wrapper */}
              <div className="relative animate-float">

                {/* Image frame */}
                <div
                  className="relative rounded-2xl sm:rounded-3xl overflow-hidden
                              border border-emerald-500/25
                              shadow-[0_0_0_1px_rgba(16,185,129,.1),0_30px_60px_rgba(0,0,0,.6)]"
                >
                  {/* Corner brackets */}
                  <span aria-hidden="true" className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-l-2 border-emerald-400 rounded-tl z-10 pointer-events-none" />
                  <span aria-hidden="true" className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 w-4 h-4 sm:w-5 sm:h-5 border-b-2 border-r-2 border-emerald-400 rounded-br z-10 pointer-events-none" />

                  <figure className="relative aspect-[4/3] sm:aspect-[16/10]">
                    <Image
                      src={imageUrl}
                      alt="A student studying with a verified Yattra Tutors home tutor in India"
                      fill
                      priority
                      fetchPriority="high"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 55vw"
                      className="object-cover"
                    />
                    {/* Gradient overlay */}
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </figure>

                  {/* Floating chip — top right */}
                  <div
                    role="status"
                    aria-label="Live tutoring sessions are available"
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10
                               flex items-center gap-1.5 sm:gap-2
                               px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl
                               backdrop-blur-md bg-black/80 border border-emerald-500/25"
                  >
                    <span aria-hidden="true" className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399] animate-live-blink flex-shrink-0" />
                    <span className="text-[10px] sm:text-[12px] font-semibold text-stone-100 whitespace-nowrap">
                      Live Sessions Available
                    </span>
                  </div>

                  {/* Floating chip — bottom left */}
                  <div
                    className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10
                               flex items-center gap-2 sm:gap-3
                               px-2.5 sm:px-3 py-2 sm:py-3 rounded-lg sm:rounded-xl
                               backdrop-blur-md bg-black/80 border border-emerald-500/25"
                  >
                    <span
                      aria-hidden="true"
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700
                                 flex items-center justify-center text-base sm:text-lg flex-shrink-0"
                    >
                      🎓
                    </span>
                    <div>
                      <p className="text-[11px] sm:text-[13px] font-semibold text-stone-100 leading-tight">
                        Demo Session Free
                      </p>
                      <p className="text-[9px] sm:text-[11px] text-stone-400">No credit card needed</p>
                    </div>
                  </div>
                </div>

                {/* ── REVIEW BUBBLE ── */}
                <div
                  aria-label="Rated 4.9 out of 5 stars from over 8000 reviews"
                  className="
                    mt-3 flex w-fit items-center gap-3 mx-auto
                    px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl
                    backdrop-blur-xl bg-black/90 border border-emerald-500/25
                    shadow-[0_12px_30px_rgba(0,0,0,.4)]
                    sm:mt-0 sm:mx-0 sm:absolute sm:-bottom-5 sm:-right-3 sm:z-20
                  "
                >
                  <p aria-hidden="true" className="text-emerald-400 text-sm tracking-wide">★★★★★</p>
                  <div>
                    <p className="text-[12px] font-semibold text-stone-100">4.9 / 5.0 Rating</p>
                    <p className="text-[10px] text-stone-400">From 8,000+ reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cities Covered */}
          <div className="mt-10 sm:mt-14 w-full">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-emerald-400/80
              text-center lg:text-right mb-3 font-semibold">
              Cities We Serve
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-end max-w-full">
              {cities.map((city, i) => (
                <span
                  key={i}
                  className="
                    px-3 sm:px-4 py-1 sm:py-1.5
                    text-[10px] sm:text-xs
                    rounded-full
                    bg-gradient-to-r from-emerald-400/10 to-teal-600/10
                    border border-emerald-500/30
                    text-emerald-300
                    backdrop-blur-sm
                    hover:scale-105
                    hover:border-emerald-400
                    hover:bg-emerald-500/20
                    hover:text-white
                    transition-all duration-300
                    whitespace-nowrap
                    cursor-default
                  "
                >
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* ── TRUST BADGES ── */}
          <div className={`mt-14 sm:mt-20 ${fu("delay-[440ms]")}`}>
            <div aria-hidden="true" className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-7">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
              <span className="text-[9.5px] sm:text-[11px] uppercase tracking-[.12em] text-emerald-400/70 whitespace-nowrap font-medium">
                Why Parents &amp; Students Trust Us
              </span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-emerald-500/30 to-transparent" />
            </div>

            <ul
              aria-label="Trust and safety features"
              className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 list-none p-0 m-0"
            >
              {trustBadges.map((badge, i) => (
                <li
                  key={i}
                  className="group relative flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl
                             bg-white/[.03] border border-emerald-500/[.15]
                             hover:border-emerald-400/50 hover:-translate-y-1
                             hover:shadow-[0_20px_40px_rgba(0,0,0,.4),0_0_28px_rgba(16,185,129,.12)]
                             transition-all duration-300 backdrop-blur-sm overflow-hidden"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-br from-emerald-500/[.07] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div
                    className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${badge.iconBg} ${badge.iconColor}`}
                  >
                    {badge.icon}
                  </div>
                  <div className="relative min-w-0">
                    <p className="font-semibold text-[13px] sm:text-[14px] text-stone-100 mb-0.5 truncate">
                      {badge.label}
                    </p>
                    <p className="text-[11px] sm:text-[12px] text-stone-400 truncate">{badge.sublabel}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Scroll indicator ── */}
          <div aria-hidden="true" className="flex flex-col items-center gap-1.5 mt-12 sm:mt-16 opacity-35">
            <span className="text-[10px] uppercase tracking-[.1em] text-stone-400">Scroll</span>
            <div className="animate-scroll-bounce">
              <svg viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom emerald rule */}
        <div aria-hidden="true" className="relative z-10 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
      </section>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </>
  );
};

export default HeroSection;