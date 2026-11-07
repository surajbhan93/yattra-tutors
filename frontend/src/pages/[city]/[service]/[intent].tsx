import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/landing/Footer";
import NavBar from "@/components/navbar/NavBar";
import { INTENT_CONTENT } from "@/components/seoIndia/content/intentContent";
import { LOCATION_SNIPPETS } from "@/components/seoIndia/content/locationSnippets";
import FAQSchema from "@/components/seoIndia/FAQSchema";
import {
  KANPUR_LOCATIONS,
  LUCKNOW_LOCATIONS,
  INTENTS,
  SUBJECTS,
} from "@/components/seo/seo.config";
import LocalSchema from "@/components/seo/LocalSchema";
import { ArrowRight, Loader2 } from "lucide-react";
import CountUp from "react-countup";
import { lora, dmSans } from "@/lib/fonts";

/* ===============================
   TYPES
================================ */
interface PageProps {
  city: string;
  location: string;
  intent: string;
  notFound?: boolean;
}

/* ===============================
   CITY CONFIG
================================ */
const CITY_CONFIG: Record<string, { name: string; locations: string[] }> = {
  lucknow: {
    name: "Lucknow",
    locations: LUCKNOW_LOCATIONS,
  },
  kanpur: {
    name: "Kanpur",
    locations: KANPUR_LOCATIONS,
  },
};

/* ===============================
   VALID INTENTS (flattened from config)
================================ */
const VALID_INTENTS = Object.values(INTENTS).flat();

/* ===============================
   CITY TUTOR COUNT
================================ */
const CITY_TUTOR_COUNT: Record<string, number> = {
  lucknow: 1200,
  kanpur: 950,
};

/* ===============================
   UX HELPERS
================================ */
const FALLBACK_DEMAND = [
  20, 34, 40, 56, 10, 28, 45, 62,
  30, 25, 23, 56, 9, 10, 32, 42,
];

const AREA_RATINGS: Record<string, number> = {
  "Civil Lines": 4.8,
  Kalyanpur: 4.4,
  Kakadeo: 4.5,
  "Gomti Nagar": 4.9,
  Alambagh: 4.6,
  Hazratganj: 4.8,
};

const getHeatmapClass = (count: number) =>
  count >= 60
    ? "bg-[#b3432f]/10 border-[#b3432f]/30"
    : count >= 40
    ? "bg-[#D79A2C]/10 border-[#D79A2C]/35"
    : "bg-[#F7F2E9] border-[#1C2B22]/15";

const getTrend = (count: number) =>
  count >= 50 ? "↑" : count >= 30 ? "→" : "↓";

/* ===============================
   VALIDATION HELPER
================================ */
function isValidCombination(city: string, location: string, intent: string): boolean {
  const cityData = CITY_CONFIG[city];
  if (!cityData) return false;

  const normalizedLocation = location.toLowerCase().replace(/-/g, ' ');
  const locationExists = cityData.locations.some(
    loc => loc.toLowerCase() === normalizedLocation
  );
  
  if (!locationExists) return false;

  const normalizedIntent = intent.toLowerCase().replace(/-/g, ' ');
  const intentExists = VALID_INTENTS.some(
    validIntent => validIntent.toLowerCase() === normalizedIntent
  );

  return intentExists;
}

/* ===============================
   PAGE
================================ */
export default function CityAutoPage({
  city,
  location,
  intent,
  notFound,
}: PageProps) {
  const cityData = CITY_CONFIG[city];
  const [redirecting, setRedirecting] = useState(false);

  // Server-side validation already handled via notFound in getStaticProps
  if (notFound || !cityData) {
    return null; // This will never render as Next.js shows 404 page
  }

  const intentText = intent.replace(/-/g, " ");
  const formattedIntent = intentText.replace(/\b\w/g, (c) => c.toUpperCase());

  const title = `${formattedIntent} in ${location}, ${cityData.name} | Verified Tutors`;
  const description = `Looking for ${formattedIntent} in ${location}, ${cityData.name}? Hire verified tutors for all subjects and classes.`;

  /* ---------- delayed redirect ---------- */
  const handleDelayedRedirect = (url: string) => {
    setRedirecting(true);
    setTimeout(() => {
      window.location.href = url;
    }, 700);
  };
   const demand =
    FALLBACK_DEMAND[
      Math.abs(
        `${city}-${location}`.length % FALLBACK_DEMAND.length
      )
    ] ?? 20;

  const rating = AREA_RATINGS[location] ?? 4.4;

  return (
    <>
      <NavBar />

      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link
          rel="canonical"
          href={`https://yattratutors.com/${city}/${location.toLowerCase().replace(/\s+/g, '-')}/${intent}`}
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://yattratutors.com/${city}/${location.toLowerCase().replace(/\s+/g, '-')}/${intent}`} />
        <meta property="og:type" content="website" />
      </Head>

      <LocalSchema />

      <main className={`${dmSans.className} min-h-screen bg-[#F7F2E9]`}>
        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden bg-[#0E211C] text-white">
          <svg className="pointer-events-none absolute inset-0 opacity-[.04]" width="100%" height="100%">
            <filter id="intentGrain">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#intentGrain)" />
          </svg>

          <div className="relative max-w-6xl mx-auto px-6 py-20">
            <h1 className={`${lora.className} text-4xl md:text-5xl font-semibold leading-tight`}>
              <span className="text-[#D79A2C]">{formattedIntent}</span>{" "}
              in {location}, {cityData.name}
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-[#AAB6A2]">
              Find verified and experienced tutors in {location},{" "}
              {cityData.name} for CBSE, ICSE and competitive exams.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#AAB6A2]">
              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">
                <CountUp end={CITY_TUTOR_COUNT[city] ?? 500} duration={2} />+ tutors
              </span>

              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">
                {rating} rating
              </span>

              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">
                Demand {getTrend(demand)}
              </span>

              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 font-medium text-white">
                {CITY_TUTOR_COUNT[city] ?? 500}+ tutors available
              </span>
            </div>

            {/* CTA */}
            <Link
              href="/subjects/?source=NAVBAR&campaign=SUBJECTS_NAV&medium=website"
              className="inline-block mt-8"
            >
              <button className="rounded-full bg-[#D79A2C] px-6 py-3 font-semibold text-[#17261D] shadow-lg transition-colors hover:bg-[#c4891f]">
                Browse your subject
              </button>
            </Link>
          </div>
        </section>

        {/* ================= CONTENT ================= */}
        <section className="max-w-6xl mx-auto px-6 py-14">
          {/* Intent Intro */}
          {INTENT_CONTENT[intentText] && (
            <p className="text-[#1C2B22] text-lg leading-relaxed">
              {INTENT_CONTENT[intentText].intro
                .replace("{location}", location)
                .replace("{city}", cityData.name)}
            </p>
          )}

          {/* Location Snippet */}
          {LOCATION_SNIPPETS[location.toLowerCase()] && (
            <p className="mt-6 text-[#58646C]">
              {LOCATION_SNIPPETS[location.toLowerCase()]}
            </p>
          )}

          {/* ================= SUBJECTS ================= */}
          <h2 className={`${lora.className} mt-14 text-3xl font-semibold text-[#1C2B22]`}>
            Subjects available
          </h2>

          <div className="mt-8 divide-y divide-[#1C2B22]/10 rounded-xl border border-[#1C2B22]/10 bg-white">
            {SUBJECTS.map((sub) => (
              <button
                key={sub}
                onClick={() => handleDelayedRedirect("/tutors/")}
                className="group flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-[#F7F2E9]"
              >
                <span className="font-medium text-[#1C2B22]">{sub}</span>
                <ArrowRight className="h-5 w-5 text-[#8a5f18] transition-transform group-hover:translate-x-1" />
              </button>
            ))}
          </div>

          {/* ================= LOCAL DEMAND ================= */}
          <div
            className={`mt-16 rounded-2xl border p-6 ${getHeatmapClass(
              demand
            )}`}
          >
            <h3 className="font-semibold text-[#1C2B22]">
              Tutor availability in {location}
            </h3>

            <p className="mt-2 text-sm text-[#58646C]">
              <CountUp end={demand} duration={1.5} />+ tutors actively available ·
              Popular choice {getTrend(demand)}
            </p>

            {demand >= 50 && (
              <span className="inline-block mt-3 text-xs px-3 py-1 rounded-full bg-[#b3432f]/10 text-[#b3432f] font-medium">
                High demand area
              </span>
            )}
          </div>

          {/* ================= MID PAGE CTA ================= */}
          <div className="my-20 rounded-3xl bg-[#0E211C] px-8 py-14 text-center text-white shadow-xl">
            <h2 className={`${lora.className} text-3xl font-semibold`}>
              Need a tutor in {location}, {cityData.name}?
            </h2>

            <p className="mt-4 text-[#AAB6A2] text-lg">
              Get matched with verified tutors within minutes.
            </p>

            <button
              onClick={() =>
                handleDelayedRedirect(
                  "/tutors/?source=SEO_PAGE&campaign=FIND_TUTOR"
                )
              }
              className="mt-8 rounded-full bg-[#D79A2C] px-8 py-3 font-semibold text-[#17261D] shadow-lg transition-colors hover:bg-[#c4891f]"
            >
              Find a tutor now
            </button>
          </div>

          {/* ================= RELATED SEARCHES ================= */}
          <h2 className={`${lora.className} mt-20 text-2xl font-semibold text-[#1C2B22]`}>
            Related searches in {cityData.name}
          </h2>

          <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cityData.locations.slice(0, 6).map((area) => (
              <Link
                key={area}
                href={`/${city}/${area
                  .toLowerCase()
                  .replace(/\s+/g, "-")}/${intent}`}
                className="rounded-xl border border-[#1C2B22]/10 bg-white p-5 text-[#1C2B22] transition-colors hover:border-[#D79A2C]/40 hover:bg-[#F7F2E9]"
              >
                {formattedIntent} in {area}, {cityData.name}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <FAQSchema
        cityName={cityData.name}
        location={location}
        intent={formattedIntent}
      />

      <Footer />

      {/* ================= LOADER ================= */}
      {redirecting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E211C]/40 backdrop-blur">
          <div className="flex items-center gap-3 rounded-xl bg-white px-6 py-4 shadow-xl">
            <Loader2 className="h-6 w-6 animate-spin text-[#8a5f18]" />
            <span className="font-medium text-[#1C2B22]">
              Finding best tutors for you…
            </span>
          </div>
        </div>
      )}
    </>
  );
}

/* ===============================
   STATIC GENERATION
================================ */
export const getStaticPaths: GetStaticPaths = async () => {
  const paths: any[] = [];

  // Only generate paths for VALID combinations
  Object.entries(CITY_CONFIG).forEach(([city, data]) => {
    data.locations.forEach((location) => {
      // Flatten all intents
      const allIntents = Object.values(INTENTS).flat();
      
      allIntents.forEach((intent) => {
        paths.push({
          params: {
            city,
            service: location.toLowerCase().replace(/\s+/g, "-"),
            intent: intent.toLowerCase().replace(/\s+/g, "-"),
          },
        });
      });
    });
  });

  console.log(`Generated ${paths.length} static paths for [city]/[service]/[intent]`);

  return { 
    paths, 
    fallback: false // Changed from "blocking" to false - invalid URLs will get proper 404
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const city = params?.city?.toString().toLowerCase() || '';
  const location = (params?.service?.toString() || params?.location?.toString() || '').toLowerCase();
  const intent = params?.intent?.toString().toLowerCase() || '';

  // Validate the combination
  if (!isValidCombination(city, location, intent)) {
    return {
      notFound: true, // Returns proper 404 HTTP status
    };
  }

  const locationFormatted = location.replace(/-/g, ' ');

  return {
    props: {
      city,
      location: locationFormatted,
      intent,
    },
    revalidate: 86400, // 24 hours
  };
};
