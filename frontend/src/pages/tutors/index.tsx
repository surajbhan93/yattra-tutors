import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import apiClient from "@/lib/apiClient";
import {
  Clock,
  BookOpen,
  IndianRupee,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Lora, DM_Sans } from "next/font/google";

import Footer from "@/components/landing/Footer";
import NavBar from "@/components/navbar/NavBar";
import TutorFilterPanel from "@/components/filters/TutorFilterPanel";
import TutorSearchHero from "@/components/tutors/TutorSearchHero";
import { filterTutors, DEFAULT_FILTERS, type TutorFilters } from "@/lib/filterTutor";
import { resolveImage } from "@/lib/resolveImage";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"], style: ["italic", "normal"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

/* ─────────────────────────────────────────────
   STATIC DATA (same as original)
───────────────────────────────────────────── */
const ITEMS_PER_PAGE = 24;
const STATIC_RATINGS = [4.0, 4.1, 4.3, 4.6, 4.7, 4.8, 4.9, 5.0];

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────── */
const cardContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: Math.min(i, 8) * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  }),
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

/* ─────────────────────────────────────────────
   HELPER: STAR RENDER
───────────────────────────────────────────── */
function StarRow({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-[#D79A2C] font-semibold">
      ★ {rating.toFixed(1)}
    </span>
  );
}

/* ─────────────────────────────────────────────
   TUTOR CARD — ledger-style row, not a SaaS tile
───────────────────────────────────────────── */
function TutorCard({
  tutor,
  i,
  isLoading = false,
  onNavigate,
  onPrefetch,
}: {
  tutor: any;
  i: number;
  isLoading?: boolean;
  onNavigate?: () => void;
  onPrefetch?: () => void;
}) {
  const router = useRouter();

  const isTopRated = tutor.rating >= 4.7;

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate ? onNavigate() : router.push(`/tutors/${tutor._id}`);
  };

  return (
    <motion.article
      key={tutor._id}
      custom={i}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={handleCardClick}
      onMouseEnter={() => (onPrefetch ? onPrefetch() : router.prefetch(`/tutors/${tutor._id}`))}
      className="group relative cursor-pointer rounded-lg border border-[#1C2B22]/10 bg-white p-5 transition-colors hover:border-[#D79A2C]/50"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="h-16 w-16 overflow-hidden rounded-full border border-[#1C2B22]/10">
            <img
              src={resolveImage(tutor.profileImage)}
              alt={tutor.fullName}
              className="h-full w-full object-cover"
            />
          </div>
          <div
            className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white"
            style={{ background: "#3f8a5f" }}
            title="Online"
          />
        </div>

        {/* Main info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className={`${lora.className} truncate text-[15px] font-semibold text-[#1C2B22]`}>
              {tutor.fullName}
            </h3>
            <CheckCircle size={13} className="flex-shrink-0 text-[#D79A2C]" />
          </div>
          <p className="mt-0.5 line-clamp-1 text-xs text-[#58646C]">
            {tutor.headline || "Experienced subject expert"}
          </p>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#9AA3AB]">
            <StarRow rating={tutor.rating} />
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={11} /> {tutor.yearsOfExperience}+ yrs
            </span>
            {tutor.location?.area && tutor.location?.city && (
              <>
                <span>·</span>
                <span>{tutor.location.area}, {tutor.location.city}</span>
              </>
            )}
            {isTopRated && (
              <>
                <span>·</span>
                <span className="text-[#8a5f18] font-medium">Top rated</span>
              </>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="flex-shrink-0 text-right">
          <div className="flex items-center justify-end gap-0.5 text-[#1C2B22]">
            <IndianRupee size={14} />
            <span className="text-lg font-semibold">{tutor.price?.toLocaleString("en-IN")}</span>
          </div>
          <p className="text-[11px] text-[#9AA3AB]">/ {tutor.priceType === "per_hour" ? "hour" : "month"}</p>
        </div>
      </div>

      {/* Subject tags + CTA */}
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#1C2B22]/[.06] pt-3">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#58646C]">
          <BookOpen size={12} className="text-[#D79A2C]" />
          {tutor.subjects?.slice(0, 3).join(" · ") || "Multiple subjects"}
        </div>

        <button
          onClick={handleCardClick}
          disabled={isLoading}
          className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-md bg-[#D79A2C] px-4 py-1.5 text-xs font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f] disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Loader2 size={13} className="animate-spin" />
              Opening...
            </>
          ) : (
            <>
              View profile
              <ArrowUpRight size={13} />
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────
   SKELETON CARD
───────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="rounded-lg border border-[#1C2B22]/10 bg-white p-5">
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 rounded-full bg-[#1C2B22]/[.06] animate-pulse" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-3.5 w-1/2 rounded bg-[#1C2B22]/[.06] animate-pulse" />
          <div className="h-3 w-2/3 rounded bg-[#1C2B22]/[.06] animate-pulse" />
          <div className="h-3 w-1/3 rounded bg-[#1C2B22]/[.06] animate-pulse" />
        </div>
      </div>
      <div className="mt-4 h-8 rounded bg-[#1C2B22]/[.06] animate-pulse" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function TutorsPage() {
  const router = useRouter();

  /* ── STATE (same as original) ── */
  const [tutors, setTutors] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("recommended");
  const [loadingProfileId, setLoadingProfileId] = useState<string | null>(null);

  const [filters, setFilters] = useState<TutorFilters>(DEFAULT_FILTERS);

  const handleNavigateToProfile = (tutorId: string) => {
    setLoadingProfileId(tutorId);
    router.push(`/tutors/${tutorId}`);
  };

  useEffect(() => {
    const handleComplete = () => setLoadingProfileId(null);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const handleFiltersChange = (newFilters: TutorFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const filteredTutors = useMemo(() => filterTutors(tutors, filters), [tutors, filters]);

  /* ── FETCH (Real Tutors from DB) ── */
  useEffect(() => {
    setLoading(true);
    const queryParams: Record<string, string> = {
      page: String(page),
      limit: String(ITEMS_PER_PAGE),
    };
    if (filters.q) queryParams.q = filters.q;
    if (filters.subject) queryParams.subject = filters.subject;
    if (filters.city) queryParams.city = filters.city;
    if (filters.area) queryParams.area = filters.area;
    if (filters.gender && filters.gender !== "any") queryParams.gender = filters.gender;

    const queryString = new URLSearchParams(queryParams).toString();

    apiClient
      .get(`/tutors?${queryString}`)
      .then((res) => {
        const rawData = res.data.data || [];
        const data = rawData.map((tutor: any, index: number) => ({
          ...tutor,
          rating:
            tutor.rating && tutor.rating > 0
              ? tutor.rating
              : STATIC_RATINGS[index % STATIC_RATINGS.length],
        }));
        setTutors(data);
        const backendTotal = res.data.pagination?.total ?? data.length;
        setTotal(backendTotal);
      })
      .catch(() => {
        setTutors([]);
        setTotal(0);
      })
      .finally(() => setLoading(false));
  }, [page, filters]);

  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));
  const displayTotal = total > 0 ? total : filteredTutors.length;

  return (
    <>
      <NavBar />

      <div className={`min-h-screen bg-[#F7F2E9] ${dmSans.className}`}>
        {/* ── HERO (search) ── */}
        <TutorSearchHero
          filters={filters}
          onChange={handleFiltersChange}
          totalResults={total}
          tutorsList={tutors}
        />

        {/* ── FILTER + CONTENT ── */}
        <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
          {/* Header Row: Count + Sort */}
          <div className="flex flex-col items-start justify-between gap-4 pt-8 pb-6 sm:flex-row sm:items-center">
            <div>
              <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>
                {loading ? "..." : displayTotal} tutors found
              </h2>
              <p className="mt-1 text-xs text-[#58646C]">
                Based on your current search preferences and verified educator credentials.
              </p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <span className="text-xs text-[#58646C]">Sort by</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-md border border-[#1C2B22]/15 bg-white px-3 py-1.5 text-xs font-medium text-[#1C2B22] outline-none focus:border-[#D79A2C]"
              >
                <option value="recommended">Recommended</option>
                <option value="rating">High rating</option>
                <option value="experience">Experience</option>
                <option value="price_low">Price: low to high</option>
                <option value="price_high">Price: high to low</option>
              </select>
            </div>
          </div>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            {/* LEFT SIDEBAR: FILTER TUTORS */}
            <div className="lg:col-span-3 lg:sticky lg:top-24">
              <TutorFilterPanel filters={filters} onChange={handleFiltersChange} />
            </div>

            {/* RIGHT MAIN CONTENT */}
            <div className="lg:col-span-9 space-y-8">
              {/* Top tutors strip */}
              {!loading && filteredTutors.length > 0 && (
                <div className="rounded-lg border border-[#D79A2C]/25 bg-white p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className={`${lora.className} italic text-sm text-[#8a5f18]`}>Top matches for you</h3>
                    <span className="text-[11px] text-[#9AA3AB]">Highest verified match</span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {filteredTutors.slice(0, 3).map((tutor) => {
                      const isCardLoading = loadingProfileId === tutor._id;
                      return (
                        <div
                          key={tutor._id}
                          onMouseEnter={() => router.prefetch(`/tutors/${tutor._id}`)}
                          onClick={() => handleNavigateToProfile(tutor._id)}
                          className="group flex cursor-pointer flex-col items-center rounded-md border border-[#1C2B22]/10 p-4 text-center transition-colors hover:border-[#D79A2C]/40"
                        >
                          <div className="relative mb-2.5 h-14 w-14 overflow-hidden rounded-full border border-[#1C2B22]/10">
                            <img
                              src={resolveImage(tutor.profileImage)}
                              alt={tutor.fullName || tutor.name}
                              className="h-full w-full object-cover"
                            />
                            {isCardLoading && (
                              <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                                <Loader2 size={16} className="animate-spin text-[#D79A2C]" />
                              </div>
                            )}
                          </div>
                          <h4 className="truncate max-w-full text-sm font-semibold text-[#1C2B22]">
                            {tutor.fullName || tutor.name}
                          </h4>
                          <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-[#58646C]">
                            {tutor.headline || tutor.qualification || "Expert educator"}
                          </p>
                          <div className="mt-2 text-xs font-semibold text-[#D79A2C]">
                            {isCardLoading ? "Opening..." : `★ ${tutor.rating ? Number(tutor.rating).toFixed(1) : "4.9"}`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Skeleton Grid */}
              {loading && (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {[...Array(6)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              )}

              {/* Cards Grid */}
              {!loading && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={page}
                    variants={cardContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 gap-4 lg:grid-cols-2"
                  >
                    {filteredTutors.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="col-span-2 rounded-lg border border-[#1C2B22]/10 bg-white py-20 text-center"
                      >
                        <GraduationCap size={40} className="mx-auto mb-3 text-[#9AA3AB]" />
                        <p className="text-base font-medium text-[#1C2B22]">No tutors match your filters</p>
                        <p className="mt-1 text-xs text-[#9AA3AB]">Try adjusting your search criteria</p>
                      </motion.div>
                    ) : (
                      filteredTutors.map((tutor, i) => (
                        <TutorCard
                          key={tutor._id}
                          tutor={tutor}
                          i={i}
                          isLoading={loadingProfileId === tutor._id}
                          onNavigate={() => handleNavigateToProfile(tutor._id)}
                          onPrefetch={() => router.prefetch(`/tutors/${tutor._id}`)}
                        />
                      ))
                    )}
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Pagination */}
              {total > 12 && !loading && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="flex items-center gap-1.5 rounded-md border border-[#1C2B22]/15 px-4 py-2 text-sm font-medium text-[#1C2B22] transition-colors hover:border-[#D79A2C]/50 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ChevronLeft size={15} />
                    Previous
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(totalPages, 5) }).map((_, idx) => {
                      const p = idx + 1;
                      const isActive = p === page;
                      return (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          className={`h-9 w-9 rounded-md text-sm font-semibold transition-colors ${
                            isActive
                              ? "bg-[#D79A2C] text-[#17261D]"
                              : "text-[#58646C] hover:bg-[#1C2B22]/[.05]"
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}
                    {totalPages > 5 && <span className="px-1 text-sm text-[#9AA3AB]">…{totalPages}</span>}
                  </div>

                  <button
                    disabled={page * ITEMS_PER_PAGE >= total}
                    onClick={() => setPage((p) => p + 1)}
                    className="flex items-center gap-1.5 rounded-md bg-[#D79A2C] px-4 py-2 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                    <ChevronRight size={15} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
