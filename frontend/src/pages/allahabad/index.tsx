import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Loader2,
  PhoneCall,
  BookOpen,
  GraduationCap,
  Star,
  Users,
  MapPin,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Building2,
  Navigation,
  Search,
  UserPlus,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { Lora, DM_Sans } from "next/font/google";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/landing/Footer";
import { ALLAHABAD_LOCATION_SNIPPETS } from "@/components/seo/content/allahabadLocationSnippets";
import { ALLAHABAD_LOCATIONS } from "@/components/seo/seo.config";
import AllahabadFAQSchema from "@/components/seo/Allahabad_FAQ";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"], style: ["italic", "normal"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

/* =========================
   CONTACT & GBP CONFIG
========================= */
const PHONE_NUMBER = "+916363453870";
const WHATSAPP_NUMBER = "916363453870";
const WHATSAPP_DEFAULT_MSG = "Hello%2C%20I%20need%20a%20tutor%20in%20Allahabad";
const GOOGLE_BUSINESS_LINK = "https://share.google/S33LPeNKRG5whFEke";
const GOOGLE_CID_LINK = "https://www.google.com/maps?cid=7024959596788940233";
const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230660.86914568208!2d81.66150881640627!3d25.4022638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x862286d3776211db%3A0x617dab8890137dc9!2sYattra%20Tutors%20%E2%80%93%20Home%20Tuition%20Provider%2C%20Prayagraj!5e0!3m2!1sen!2sin!4v1784877450430!5m2!1sen!2sin";

/* =========================
   OPTIMIZED UNSPLASH IMAGES
========================= */
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  tutor: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
  student: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
  online: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80",
  parent: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
  books: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80",
  education: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
};

/* =========================
   FALLBACK COUNTS
========================= */
const FALLBACK_COUNTS = [
  20, 34, 40, 56, 10, 28, 45, 62, 30, 25, 23, 56, 9, 10, 32, 42,
];

const getFallbackNumeric = (index: number): number =>
  FALLBACK_COUNTS[index % FALLBACK_COUNTS.length] ?? 20;

/* =========================
   AREA RATINGS
========================= */
const AREA_RATINGS: Record<string, number> = {
  "Civil Lines": 4.8,
  Katra: 4.6,
  Naini: 4.2,
  Jhusi: 4.1,
  GeorgeTown: 4.7,
  Prayagraj: 4.9,
};

/* =========================
   COUNT UP HOOK
========================= */
const useCountUp = (value: number) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const step = Math.max(1, Math.ceil(value / 15));
    const interval = setInterval(() => {
      current += step;
      if (current >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [value]);

  return count;
};

/* =========================
   AREA CARD COMPONENT
========================= */
function AreaCard({
  area,
  index,
  count,
  onRedirect,
}: {
  area: string;
  index: number;
  count: number;
  onRedirect: (url: string) => void;
}) {
  const rating = AREA_RATINGS[area] ?? 4.5;
  const animated = useCountUp(count);
  const demand = count >= 60 ? "High demand" : count >= 40 ? "Rising" : "Available";

  return (
    <motion.button
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index, 10) * 0.03, duration: 0.3 }}
      onClick={() => onRedirect(`/tutors?city=allahabad&area=${area}`)}
      className="group relative w-full rounded-lg border border-[#1C2B22]/10 bg-white p-5 text-left transition-colors hover:border-[#D79A2C]/50"
      aria-label={`View home tutors in ${area}`}
    >
      <span className="mb-3 inline-block text-xs font-medium text-[#8a5f18]">{demand}</span>

      <h3 className="flex items-center gap-1.5 text-base font-semibold leading-tight text-[#1C2B22]">
        <MapPin className="h-3.5 w-3.5 text-[#D79A2C]" />
        {area}
      </h3>

      <p className="mt-0.5 text-xs text-[#9AA3AB]">Home tutor available</p>

      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="flex items-center gap-1 font-semibold text-[#1C2B22]">
          <Star className="h-3.5 w-3.5 fill-[#D79A2C] text-[#D79A2C]" />
          {rating}
        </span>

        <span className="flex items-center gap-1 font-semibold text-[#58646C]">
          <Users className="h-3.5 w-3.5" />
          {animated}+ tutors
        </span>
      </div>

      <ChevronRight className="absolute top-5 right-4 h-4 w-4 text-[#9AA3AB] transition-transform group-hover:translate-x-0.5 group-hover:text-[#D79A2C]" />
    </motion.button>
  );
}

/* =========================
   MAIN LANDING PAGE
========================= */
export default function AllahabadLandingPage() {
  const [loading, setLoading] = useState(false);
  const [areaTutorCount, setAreaTutorCount] = useState<Record<string, number>>({});
  const [totalTutors, setTotalTutors] = useState(800);

  useEffect(() => {
    fetch("/api/tutors/count?city=allahabad")
      .then((res) => res.json())
      .then((data) => {
        setTotalTutors(data.total || 800);
        setAreaTutorCount(data.areas || {});
      })
      .catch(() => {
        setTotalTutors(800);
        setAreaTutorCount({});
      });
  }, []);

  const sortedAreas = useMemo(() => {
    return [...ALLAHABAD_LOCATIONS].sort((a, b) => {
      const aCount =
        areaTutorCount[a] ?? getFallbackNumeric(ALLAHABAD_LOCATIONS.indexOf(a));
      const bCount =
        areaTutorCount[b] ?? getFallbackNumeric(ALLAHABAD_LOCATIONS.indexOf(b));
      if (bCount !== aCount) return bCount - aCount;
      const aRating = AREA_RATINGS[a] ?? 4.0;
      const bRating = AREA_RATINGS[b] ?? 4.0;
      return bRating - aRating;
    });
  }, [areaTutorCount]);

  const handleRedirect = (url: string) => {
    setLoading(true);
    setTimeout(() => (window.location.href = url), 600);
  };

  const animatedTotal = useCountUp(totalTutors);

  // Full Rich Schemas
  const pageCanonical = "https://yattratutors.com/allahabad";
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Yattra Tutors – Home Tuition Provider, Prayagraj",
    url: pageCanonical,
    telephone: PHONE_NUMBER,
    logo: "https://yattratutors.com/logo.png",
    image: IMAGES.hero,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Civil Lines, Near Subhash Chauraha",
      addressLocality: "Allahabad",
      addressRegion: "UP",
      postalCode: "211001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.4526,
      longitude: 81.8349,
    },
    areaServed: [
      { "@type": "City", name: "Prayagraj", alternateName: "Allahabad" },
      { "@type": "Place", name: "Civil Lines, Prayagraj" },
      { "@type": "Place", name: "Katra, Prayagraj" },
      { "@type": "Place", name: "George Town, Prayagraj" },
      { "@type": "Place", name: "Tagore Town, Prayagraj" },
      { "@type": "Place", name: "Teliarganj, Prayagraj" },
      { "@type": "Place", name: "Salori, Prayagraj" },
      { "@type": "Place", name: "Allapur, Prayagraj" },
      { "@type": "Place", name: "Bada Baghada, Prayagraj" },
      { "@type": "Place", name: "Chhota Baghada, Prayagraj" },
      { "@type": "Place", name: "Daraganj, Prayagraj" },
      { "@type": "Place", name: "Colonelganj, Prayagraj" },
      { "@type": "Place", name: "Mumfordganj, Prayagraj" },
      { "@type": "Place", name: "Ashok Nagar, Prayagraj" },
      { "@type": "Place", name: "Rajrooppur, Prayagraj" },
      { "@type": "Place", name: "Dhoomanganj, Prayagraj" },
      { "@type": "Place", name: "Preetam Nagar, Prayagraj" },
      { "@type": "Place", name: "Kalindipuram, Prayagraj" },
      { "@type": "Place", name: "Lukerganj, Prayagraj" },
      { "@type": "Place", name: "Naini, Prayagraj" },
      { "@type": "Place", name: "Jhusi, Prayagraj" },
      { "@type": "Place", name: "Phaphamau, Prayagraj" },
      { "@type": "Place", name: "Jhalwa, Prayagraj" },
      { "@type": "Place", name: "Bamrauli, Prayagraj" },
      { "@type": "Place", name: "Sulem Sarai, Prayagraj" },
      { "@type": "Place", name: "Leader Road, Prayagraj" },
      { "@type": "Place", name: "Chowk, Prayagraj" },
      { "@type": "Place", name: "Kareli, Prayagraj" },
      { "@type": "Place", name: "Allahpur, Prayagraj" },
    ],
    serviceType: [
      "1-to-1 Home Tuition",
      "Home Tutoring for Classes 1 to 12",
      "CBSE Home Tuition",
      "ICSE Home Tuition",
      "ISC Home Tuition",
      "UP Board Home Tuition",
      "Mathematics Home Tuition",
      "Science Home Tuition",
      "Physics Home Tuition",
      "Chemistry Home Tuition",
      "Biology Home Tuition",
      "English Home Tuition",
      "JEE Home Tutoring",
      "NEET Home Tutoring",
    ],
    knowsAbout: [
      "Home Tuition",
      "Home Tutoring",
      "Private Tutoring",
      "One-to-One Tutoring",
      "Primary School Education",
      "Secondary School Education",
      "Senior Secondary Education",
      "CBSE",
      "ICSE",
      "ISC",
      "UP Board",
      "Mathematics",
      "Science",
      "Physics",
      "Chemistry",
      "Biology",
      "English",
      "JEE",
      "NEET",
    ],
    hasMap: GOOGLE_BUSINESS_LINK,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://yattratutors.com" },
      { "@type": "ListItem", position: 2, name: "Allahabad Tutors", item: pageCanonical },
    ],
  };

  return (
    <>
      <Head>
        <title>Home Tuition in Prayagraj (Allahabad) | Verified Home Tutors – Yattra Tutors</title>
        <meta
          name="description"
          content="Find verified home tuition in Prayagraj (Allahabad) with experienced home tutors for CBSE, ICSE, ISC & UP Board. Classes 1–12, JEE & NEET tutors near you."
        />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={pageCanonical} />

        {/* Local Geo Meta */}
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Allahabad, Prayagraj, Uttar Pradesh, India" />
        <meta name="geo.position" content="25.4358;81.8463" />
        <meta name="ICBM" content="25.4358, 81.8463" />

        {/* Open Graph */}
        <meta property="og:title" content="Home Tuition in Prayagraj (Allahabad) | Verified Home Tutors – Yattra Tutors" />
        <meta
          property="og:description"
          content="Find verified home tutors and home tuition in Prayagraj (Allahabad) for Classes 1–12, CBSE, ICSE, ISC & UP Board, JEE and NEET."
        />
        <meta property="og:url" content={pageCanonical} />
        <meta property="og:image" content={IMAGES.hero} />

        {/* Schemas */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <div className={dmSans.className}>
        <NavBar />

        {/* ── TOP CONTACT BAR ── */}
        <div className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-1.5 bg-[#0E211C] px-4 py-2.5 text-sm text-[#AAB6A2]">
          <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-2 whitespace-nowrap font-medium transition-colors hover:text-white">
            <PhoneCall size={13} className="text-[#D79A2C]" /> Call now: {PHONE_NUMBER}
          </a>
          <span className="hidden opacity-30 sm:inline">|</span>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_DEFAULT_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 whitespace-nowrap font-medium transition-colors hover:text-white"
          >
            <MessageCircle size={13} className="text-[#D79A2C]" /> Chat on WhatsApp
          </a>
          <span className="hidden opacity-30 sm:inline">|</span>
          <a
            href={GOOGLE_BUSINESS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 whitespace-nowrap font-medium transition-colors hover:text-white"
          >
            View Yattra Tutors on Google Maps
          </a>
        </div>

        {/* ── HERO SECTION ── */}
        <section className="relative overflow-hidden bg-[#0E211C] py-16 text-white md:py-24">
          <div className="absolute inset-0 z-0 opacity-20">
            <Image src={IMAGES.hero} alt="Home tuition in Prayagraj with verified home tutors" fill priority sizes="100vw" className="object-cover object-center" />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 opacity-[.04]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className={`${lora.className} italic text-sm text-[#AAB6A2] mb-4`}>
                Prayagraj's most trusted tutor platform
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`${lora.className} text-4xl font-semibold leading-tight md:text-5xl`}
              >
                Home tuition in Prayagraj (Allahabad)
                <br />
                <span className="text-[#D79A2C]">verified home tutors</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className="mt-6 max-w-2xl text-sm leading-relaxed text-[#AAB6A2]"
              >
                Find trusted <strong className="text-white">home tutors in Prayagraj</strong> for personalized 1-to-1{" "}
                <strong className="text-white">home tuition in Allahabad</strong>. Choose from{" "}
                <span className="font-semibold text-white">{animatedTotal}+</span> background-verified tutors for CBSE, ICSE, ISC, UP Board,
                Classes 1–12, JEE &amp; NEET.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => handleRedirect("/subjects/?source=ALLAHABAD_HERO&campaign=SUBJECTS")}
                  className="inline-flex items-center gap-2 rounded-md bg-[#D79A2C] px-6 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
                >
                  <BookOpen className="h-4 w-4" />
                  Browse subjects in your area
                </button>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_DEFAULT_MSG}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp karo
                </a>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#AAB6A2]">
                <a href={GOOGLE_BUSINESS_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium hover:text-white">
                  View reviews on Google Maps <ExternalLink size={13} />
                </a>
                <span>Background verified tutors</span>
                <span>Home + online classes</span>
              </motion.div>
            </div>

            <div className="relative hidden lg:col-span-5 lg:block">
              <div className="relative h-[400px] w-full overflow-hidden rounded-lg border border-white/10">
                <Image src={IMAGES.tutor} alt="Verified home tutor in Prayagraj for Classes 1 to 12" fill sizes="(max-width: 1024px) 100vw, 500px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E211C] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 rounded-md border border-white/15 bg-white/10 p-4 text-white backdrop-blur-sm">
                  <p className="text-sm font-semibold">1-on-1 personalized mentorship</p>
                  <p className="text-xs text-[#AAB6A2]">Available across all 30+ localities of Prayagraj</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS BAND ── */}
        <div className="border-b border-[#1C2B22]/10 bg-[#F7F2E9]">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-6 text-center md:grid-cols-4">
            {[
              { value: `${animatedTotal}+`, label: "Verified tutors" },
              { value: "30+", label: "Areas covered" },
              { value: "4.9", label: "Avg rating" },
              { value: "100+", label: "Subjects" },
            ].map((s) => (
              <div key={s.label}>
                <div className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>{s.value}</div>
                <div className="mt-0.5 text-sm text-[#58646C]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── AI SEARCH & DIRECT OVERVIEW SECTION ── */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="rounded-lg border border-[#1C2B22]/10 bg-white p-6 sm:p-10">
            <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-3`}>Allahabad home tuition (2026) — direct answer</p>

            <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22] sm:text-3xl`}>
              Best home tutors in Prayagraj (Allahabad) for Classes 1–12
            </h2>

            <p className="mt-3 text-base leading-relaxed text-[#58646C]">
              <strong className="text-[#1C2B22]">Yattra Tutors</strong> is a trusted{" "}
              <strong className="text-[#1C2B22]">home tuition provider in Prayagraj</strong>, connecting students and parents with experienced{" "}
              <strong className="text-[#1C2B22]">home tutors in Allahabad</strong> for personalized 1-to-1 learning. We provide{" "}
              <strong className="text-[#1C2B22]">home tuition in Prayagraj</strong> for Classes 1–12, CBSE, ICSE, ISC and UP Board, along with
              JEE and NEET preparation. Tutors are available across{" "}
              <span className="font-semibold text-[#1C2B22]">
                Civil Lines, Katra, George Town, Naini, Jhusi, Teliarganj, Rajrooppur, Dhoomanganj, Preetam Nagar and Phaphamau
              </span>.
            </p>

            <div className="mt-6 grid gap-4 border-t border-[#1C2B22]/10 pt-6 sm:grid-cols-3">
              <div>
                <span className="text-xs font-medium text-[#8a5f18]">Average fees</span>
                <p className="mt-1 text-sm font-semibold text-[#1C2B22]">₹300 – ₹750 / hour (free demo)</p>
              </div>
              <div>
                <span className="text-xs font-medium text-[#8a5f18]">Boards covered</span>
                <p className="mt-1 text-sm font-semibold text-[#1C2B22]">CBSE, ICSE, ISC & UP Board</p>
              </div>
              <div>
                <span className="text-xs font-medium text-[#8a5f18]">Tutor verification</span>
                <p className="mt-1 text-sm font-semibold text-[#1C2B22]">100% ID & academic verified</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── AREA-WISE HOME TUITION IN ALLAHABAD ── */}
        <section className="mx-auto max-w-6xl px-6 pb-4">
          <div className="mb-10">
            <h2 className={`${lora.className} text-3xl font-semibold text-[#1C2B22] md:text-4xl`}>
              Home tuition in Allahabad — tutors available in your area
            </h2>
            <p className="mt-2 text-sm text-[#58646C]">
              Find verified home tutors across major areas of Allahabad (Prayagraj), including Civil Lines, Katra, Naini, Jhusi, Teliarganj and
              Phaphamau.
            </p>
          </div>

          <div className="divide-y divide-[#1C2B22]/[.06] rounded-lg border border-[#1C2B22]/10 bg-white sm:grid sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-3">
            {Object.entries(ALLAHABAD_LOCATION_SNIPPETS).map(([area, desc]) => (
              <div key={area} className="flex flex-col gap-2 p-5 sm:border-r sm:border-[#1C2B22]/[.06]">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-1.5 text-sm font-semibold capitalize text-[#1C2B22]">
                    <MapPin className="h-3.5 w-3.5 text-[#D79A2C]" />
                    {area}
                  </h3>
                  <span className="text-[11px] font-medium text-[#3f8a5f]">Available</span>
                </div>
                <p className="text-sm leading-relaxed text-[#58646C]">{desc}</p>
                <Link href={`/tutors?city=allahabad&area=${area}`} className="mt-auto text-xs font-medium text-[#8a5f18] hover:underline">
                  Find tutors →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── AREA GRID ── */}
        <section className="bg-[#F7F2E9] py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10">
              <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22] md:text-3xl`}>Find home tutors near you in Prayagraj</h2>
              <p className="mt-2 text-sm text-[#58646C]">
                Looking for home tuition near you? Explore verified home tutors available across major areas of Prayagraj (Allahabad) for
                Classes 1–12, CBSE, ICSE, ISC and UP Board.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {sortedAreas.map((area, index) => {
                const count = areaTutorCount[area] ?? getFallbackNumeric(index);
                return <AreaCard key={area} area={area} index={index} count={count} onRedirect={handleRedirect} />;
              })}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="mx-auto max-w-5xl px-6 py-20">
          <div className="mb-12 text-center">
            <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22] md:text-3xl`}>How to find home tuition in Prayagraj</h2>
            <p className="mt-2 text-sm text-[#58646C]">Find a verified home tutor in Prayagraj (Allahabad) in 3 simple steps.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { step: "01", title: "Choose your area", desc: "Select your locality in Prayagraj (Allahabad) and explore home tutors available near your area." },
              { step: "02", title: "Pick your tutor", desc: "Browse profiles, ratings, and verified credentials." },
              { step: "03", title: "Start learning", desc: "Book your first class and start improving your grades." },
            ].map((s) => (
              <div key={s.step} className="relative rounded-lg border border-[#1C2B22]/10 bg-white p-6">
                <span className={`${lora.className} absolute top-5 right-5 text-3xl font-semibold text-[#1C2B22]/10`}>{s.step}</span>
                <h3 className="text-base font-semibold text-[#1C2B22]">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#58646C]">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* ── HOME TUITION SERVICES IN PRAYAGRAJ ── */}
          <div className="mt-16 rounded-lg border border-[#1C2B22]/10 bg-[#F7F2E9] p-6 md:p-8">
            <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22] md:text-3xl`}>Home tuition services in Prayagraj</h2>
            <p className="mt-3 leading-relaxed text-[#58646C]">
              Yattra Tutors helps parents find verified home tutors in Prayagraj (Allahabad) for school subjects, board preparation and
              competitive exams. Explore tutors by subject or browse available teachers in your area.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
              <Link href="/tutors" className="font-semibold text-[#8a5f18] hover:underline">
                Find home tutors in Prayagraj
              </Link>
              <span className="text-[#1C2B22]/20">·</span>
              <Link href="/subjects" className="font-semibold text-[#8a5f18] hover:underline">
                Browse tuition by subject
              </Link>
            </div>
          </div>

          {/* ── PRAYAGRAJ HOME TUITION FAQ ── */}
          <div className="mt-16">
            <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22] md:text-3xl`}>
              Home tuition in Prayagraj — frequently asked questions
            </h2>
            <p className="mt-2 text-sm text-[#58646C]">Common questions from parents and students looking for home tutors in Prayagraj (Allahabad).</p>

            <div className="mt-6 divide-y divide-[#1C2B22]/10 rounded-lg border border-[#1C2B22]/10 bg-white">
              {[
                { q: "How can I find a home tutor in Prayagraj?", a: "You can use Yattra Tutors to find verified home tutors in Prayagraj based on your class, subject, board and locality." },
                { q: "Is home tuition available near me in Prayagraj?", a: "Home tutors are available across multiple areas of Prayagraj, including Civil Lines, Katra, Teliarganj, Salori, Allapur, Naini, Jhusi and Phaphamau, subject to tutor availability." },
                { q: "Do you provide CBSE and ICSE home tutors in Allahabad?", a: "Yes. Yattra Tutors connects students with tutors for CBSE, ICSE, ISC and UP Board across different classes and subjects." },
                { q: "What are the home tuition fees in Prayagraj?", a: "Home tuition fees depend on the student's class, subjects, board, tutor experience, number of classes and location. Contact Yattra Tutors to get options based on your requirements." },
                { q: "How do I choose the best home tutor in Prayagraj?", a: "Compare tutors based on subject expertise, teaching experience, verification, availability and compatibility with the student's learning requirements." },
              ].map((item) => (
                <div key={item.q} className="p-5">
                  <h3 className="font-semibold text-[#1C2B22]">{item.q}</h3>
                  <p className="mt-2 leading-relaxed text-[#58646C]">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── HOME TUITION BY BOARD & CLASS ── */}
          <div className="mt-16">
            <div className="mb-8 text-center">
              <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22] md:text-3xl`}>
                Home tutors for CBSE, ICSE, ISC & UP Board in Prayagraj
              </h2>
              <p className="mx-auto mt-3 max-w-3xl leading-relaxed text-[#58646C]">
                Find experienced tutors for Classes 1–12 across major school boards in Prayagraj (Allahabad). Get personalized 1-to-1 support
                for regular studies, homework, exams and concept improvement.
              </p>
            </div>

            <div className="divide-y divide-[#1C2B22]/[.06] rounded-lg border border-[#1C2B22]/10 bg-white sm:grid sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
              {[
                { title: "CBSE home tuition", desc: "Home tutors for CBSE students from Classes 1–12." },
                { title: "ICSE & ISC home tuition", desc: "Subject tutors for ICSE and ISC students in Prayagraj." },
                { title: "UP Board home tuition", desc: "Personalized tuition for UP Board students across major subjects." },
                { title: "JEE & NEET preparation", desc: "Tutors for Physics, Chemistry, Maths and Biology preparation." },
              ].map((item) => (
                <div key={item.title} className="p-5">
                  <h3 className="font-semibold text-[#1C2B22]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#58646C]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <button
              onClick={() => handleRedirect("/tutors/?source=ALLAHABAD_HOW&campaign=HOW_IT_WORKS")}
              className="inline-flex items-center gap-2 rounded-md bg-[#D79A2C] px-8 py-3.5 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
            >
              <GraduationCap className="h-4 w-4" />
              Find my tutor now
            </button>
          </div>
        </section>

        {/* ── ENHANCED INTERNAL LINKING HUB ── */}
        <section className="mx-auto mb-16 max-w-6xl rounded-lg border border-[#1C2B22]/10 bg-white p-6 px-6 sm:p-10">
          <h2 className={`${lora.className} mb-6 text-xl font-semibold text-[#1C2B22]`}>Explore Yattra Tutors</h2>
          <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
            <Link href="/find-tutor-flow/create-account/?source=LANDING_INTERNAL" className="flex flex-col items-center gap-2 rounded-md border border-[#1C2B22]/10 p-4 transition-colors hover:border-[#D79A2C]/40">
              <Search className="h-5 w-5 text-[#D79A2C]" />
              <span className="text-xs font-semibold text-[#1C2B22]">Find tutor</span>
            </Link>
            <Link href="/tutor-flow/tutor-registration/?role=tutor&source=LANDING_INTERNAL" className="flex flex-col items-center gap-2 rounded-md border border-[#1C2B22]/10 p-4 transition-colors hover:border-[#D79A2C]/40">
              <UserPlus className="h-5 w-5 text-[#D79A2C]" />
              <span className="text-xs font-semibold text-[#1C2B22]">Tutor registration</span>
            </Link>
            <Link href="/subjects" className="flex flex-col items-center gap-2 rounded-md border border-[#1C2B22]/10 p-4 transition-colors hover:border-[#D79A2C]/40">
              <BookOpen className="h-5 w-5 text-[#D79A2C]" />
              <span className="text-xs font-semibold text-[#1C2B22]">Popular subjects</span>
            </Link>
            <Link href="/about" className="flex flex-col items-center gap-2 rounded-md border border-[#1C2B22]/10 p-4 transition-colors hover:border-[#D79A2C]/40">
              <Building2 className="h-5 w-5 text-[#D79A2C]" />
              <span className="text-xs font-semibold text-[#1C2B22]">About Yattra Tutors</span>
            </Link>
          </div>
        </section>

        {/* ── FLOATING CTAs ── */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
          <motion.a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_DEFAULT_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 180 }}
            className="flex items-center gap-2 rounded-full bg-[#3f8a5f] px-5 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#357a52]"
          >
            <MessageCircle size={15} />
            WhatsApp
          </motion.a>

          <motion.a
            href={`tel:${PHONE_NUMBER}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.65, type: "spring", stiffness: 180 }}
            className="flex items-center gap-2 rounded-full bg-[#D79A2C] px-6 py-3 text-sm font-semibold text-[#17261D] shadow-lg transition-colors hover:bg-[#c4891f]"
          >
            <PhoneCall size={15} />
            Call now
          </motion.a>
        </div>

        {/* ── LOADER MODAL ── */}
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E211C]/60 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4 rounded-lg bg-white px-8 py-6">
              <Loader2 className="h-7 w-7 animate-spin text-[#D79A2C]" />
              <p className="text-sm font-medium text-[#1C2B22]">Finding best tutors for you…</p>
            </div>
          </div>
        )}

        <AllahabadFAQSchema area="Allahabad" intent="" />

        {/* ── GOOGLE BUSINESS PROFILE SECTION ── */}
        <section className="mx-auto my-16 max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-lg border border-[#1C2B22]/15 bg-[#0E211C] p-6 text-white sm:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-12">
              <div className="space-y-3 lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#3f8a5f]/30 bg-[#3f8a5f]/10 px-4 py-1.5 text-xs font-medium text-[#8fd4ab]">
                  <ShieldCheck className="h-4 w-4" />
                  Verified Google Business Profile
                </div>

                <div>
                  <h2 className={`${lora.className} text-2xl font-semibold text-white sm:text-3xl`}>
                    Yattra Tutors official Prayagraj HQ &amp; local tutors
                  </h2>
                  <p className="mt-2 text-sm text-[#AAB6A2]">
                    Headquartered in Civil Lines, Allahabad (Prayagraj). Serving students near Prayagraj Junction, Bus Stand, Sangam, and
                    surrounding residential colonies.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 rounded-md border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-1.5">
                    <span className={`${lora.className} text-2xl font-semibold text-[#D79A2C]`}>4.9</span>
                    <div className="flex text-[#D79A2C]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#D79A2C] text-[#D79A2C]" />
                      ))}
                    </div>
                  </div>
                  <div className="hidden h-6 w-px bg-white/10 sm:block" />
                  <div className="text-xs text-[#AAB6A2] sm:text-sm">
                    <strong className="font-semibold text-white">542+ Google reviews</strong>
                    <div className="text-xs text-[#AAB6A2]">#1 Yattra Tutors – Home Tuition Provider, Prayagraj</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
                  <a href={GOOGLE_BUSINESS_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 rounded-md bg-[#D79A2C] px-3 py-3 text-center text-xs font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]">
                    <ExternalLink className="h-3.5 w-3.5" />
                    View on Google Maps
                  </a>
                  <a href={GOOGLE_CID_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 rounded-md border border-white/15 px-3 py-3 text-center text-xs font-semibold text-[#AAB6A2] transition-colors hover:border-white/30">
                    <Navigation className="h-3.5 w-3.5" />
                    Get directions
                  </a>
                  <a href={`tel:${PHONE_NUMBER}`} className="flex items-center justify-center gap-1.5 rounded-md bg-[#3f8a5f] px-3 py-3 text-center text-xs font-semibold text-white transition-colors hover:bg-[#357a52]">
                    <PhoneCall className="h-3.5 w-3.5" />
                    Call office
                  </a>
                  <a href={GOOGLE_BUSINESS_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 rounded-md border border-white/15 px-3 py-3 text-center text-xs font-semibold text-[#AAB6A2] transition-colors hover:border-white/30">
                    <Star className="h-3.5 w-3.5" />
                    Read reviews
                  </a>
                </div>
              </div>

              <div className="h-72 overflow-hidden rounded-md border border-white/10 bg-[#132B22] lg:col-span-5">
                <iframe
                  title="Yattra Tutors Google Business Profile Map Allahabad"
                  src={MAP_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full opacity-90 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
