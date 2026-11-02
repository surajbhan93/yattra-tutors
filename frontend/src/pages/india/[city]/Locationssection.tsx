// =====================================================
// DROP-IN REPLACEMENT: Replace your existing <main>
// section in index.tsx with this component
// =====================================================

// ---- Add this import at top of index.tsx ----
// import { TrendingUp, TrendingDown, Minus } from "lucide-react";

// ---- Replace the existing <main> block with: ----

// <LocationsSection city={city} googleBizUrl={googleBizUrl} redirectWithLoader={redirectWithLoader} />

// ---- And paste this component in the same file (or a separate file) ----

import { useState } from "react";
import CountUp from "react-countup";
import { ExternalLink, TrendingUp, Minus, MapPin, Flame, Star, TrendingUp as TrendingUpIcon } from "lucide-react";
import { Lora } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"], style: ["italic", "normal"] });

const FALLBACK_DEMAND = [
  20, 34, 40, 56, 10, 28, 45, 62,
  30, 25, 23, 56, 9, 10, 32, 42,
];

const AREA_RATINGS: Record<string, number> = {
  "Civil Lines": 4.8,
  Kalyani: 4.4,
  "Gomti Nagar": 4.9,
  Alambagh: 4.5,
  Hazratganj: 4.8,
  "Indira Nagar": 4.6,
};

const AVATAR_INITIALS = ["TK", "RS", "PM", "SA"];

type FilterType = "all" | "hot" | "rated" | "trending";

function getDemandConfig(demand: number) {
  if (demand >= 50) {
    return {
      band: "bg-[#D79A2C]",
      pill: "bg-[#D79A2C]/10 text-[#8a5f18] border border-[#D79A2C]/25",
      dot: "bg-[#D79A2C] animate-ping",
      dotStatic: "bg-[#D79A2C]",
      label: "High demand",
      TrendIcon: TrendingUp,
      trendColor: "text-[#D79A2C]",
    };
  }
  if (demand >= 35) {
    return {
      band: "bg-[#3f8a5f]",
      pill: "bg-[#3f8a5f]/10 text-[#3f8a5f] border border-[#3f8a5f]/20",
      dot: "bg-[#3f8a5f]",
      dotStatic: "bg-[#3f8a5f]",
      label: "Rising",
      TrendIcon: TrendingUp,
      trendColor: "text-[#3f8a5f]",
    };
  }
  return {
    band: "bg-[#1C2B22]/20",
    pill: "bg-[#1C2B22]/[.05] text-[#58646C] border border-[#1C2B22]/10",
    dot: "bg-[#9AA3AB]",
    dotStatic: "bg-[#9AA3AB]",
    label: "Steady",
    TrendIcon: Minus,
    trendColor: "text-[#9AA3AB]",
  };
}

interface LocationsSectionProps {
  city: any;
  googleBizUrl?: string;
  redirectWithLoader: (url: string) => void;
}

export default function LocationsSection({
  city,
  googleBizUrl,
  redirectWithLoader,
}: LocationsSectionProps) {
  const [filter, setFilter] = useState<FilterType>("all");

  const enriched = city.locations.map((area: string, index: number) => ({
    area,
    slug: area.toLowerCase().replace(/\s+/g, "-"),
    demand: FALLBACK_DEMAND[index % FALLBACK_DEMAND.length] ?? 20,
    rating: AREA_RATINGS[area] ?? 4.3,
  }));

  const filtered = (() => {
    if (filter === "hot") return enriched.filter((a: any) => a.demand >= 50);
    if (filter === "rated") return [...enriched].sort((a: any, b: any) => b.rating - a.rating);
    if (filter === "trending") return [...enriched].sort((a: any, b: any) => b.demand - a.demand);
    return enriched;
  })();

  const filters: { key: FilterType; label: string; icon: any }[] = [
    { key: "all", label: "All areas", icon: MapPin },
    { key: "hot", label: "High demand", icon: Flame },
    { key: "rated", label: "Top rated", icon: Star },
    { key: "trending", label: "Trending", icon: TrendingUpIcon },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
      {/* Section header */}
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-2`}>Browse by neighbourhood</p>
          <h2 className={`${lora.className} text-3xl font-semibold text-[#1C2B22] md:text-4xl`}>
            Popular areas in {city.name}
          </h2>
        </div>

        {/* Google Maps link */}
        {googleBizUrl && (
          <a
            href={googleBizUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-md border border-[#1C2B22]/15 bg-white px-4 py-2.5 text-sm font-medium text-[#1C2B22] transition-colors hover:border-[#D79A2C]/50"
          >
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            View on Google Maps
            <ExternalLink className="h-3 w-3 text-[#9AA3AB]" />
          </a>
        )}
      </div>

      {/* Filter chips */}
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              filter === key
                ? "bg-[#0E211C] text-white"
                : "border border-[#1C2B22]/15 bg-white text-[#58646C] hover:border-[#D79A2C]/40"
            }`}
          >
            <Icon size={12} />
            {label}
            {key === "hot" && (
              <span
                className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  filter === key ? "bg-white/20 text-white" : "bg-[#D79A2C]/10 text-[#8a5f18]"
                }`}
              >
                {enriched.filter((a: any) => a.demand >= 50).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map(
          ({ area, slug, demand, rating }: { area: string; slug: string; demand: number; rating: number }) => {
            const cfg = getDemandConfig(demand);
            const { TrendIcon } = cfg;

            return (
              <button
                key={area}
                onClick={() => redirectWithLoader(`/india/${city.slug}/${slug}/home-tutor`)}
                className="group relative overflow-hidden rounded-lg border border-[#1C2B22]/10 bg-white text-left transition-colors hover:border-[#D79A2C]/40"
              >
                {/* Top accent band */}
                <div className={`h-1 w-full ${cfg.band}`} />

                <div className="p-4">
                  {/* Top row: demand pill + rating */}
                  <div className="mb-3 flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${cfg.pill}`}>
                      <span className="relative flex h-1.5 w-1.5">
                        {demand >= 50 && (
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${cfg.dot}`} />
                        )}
                        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${cfg.dotStatic}`} />
                      </span>
                      {cfg.label}
                    </span>

                    <span className="flex items-center gap-0.5 text-[11px] font-semibold text-[#58646C]">
                      <span className="text-xs text-[#D79A2C]">★</span>
                      {rating}
                    </span>
                  </div>

                  {/* Title */}
                  <p className="mb-1 text-sm font-semibold leading-snug text-[#1C2B22]">
                    Home tutor in {area}
                  </p>
                  <p className="mb-4 text-xs text-[#9AA3AB]">Verified tutors available</p>

                  {/* Footer: avatars + count + arrow */}
                  <div className="flex items-center justify-between border-t border-[#1C2B22]/[.06] pt-3">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {AVATAR_INITIALS.map((ini, i) => (
                          <div
                            key={i}
                            className={`flex h-5 w-5 items-center justify-center rounded-full border-[1.5px] border-white bg-[#F7F2E9] text-[8px] font-bold text-[#58646C] ${
                              i > 0 ? "-ml-1.5" : ""
                            }`}
                          >
                            {ini}
                          </div>
                        ))}
                      </div>

                      <span className="text-[11px] font-semibold text-[#8a5f18]">
                        <CountUp end={demand} duration={1.5} />+ tutors
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <TrendIcon className={`h-3 w-3 ${cfg.trendColor}`} />
                      <span className="text-sm font-bold text-[#9AA3AB] group-hover:text-[#D79A2C]">→</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          }
        )}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center py-16 text-center">
          <p className="font-semibold text-[#58646C]">No areas match this filter</p>
          <button
            onClick={() => setFilter("all")}
            className="mt-3 text-sm font-semibold text-[#8a5f18] hover:underline"
          >
            Show all areas
          </button>
        </div>
      )}
    </main>
  );
}
