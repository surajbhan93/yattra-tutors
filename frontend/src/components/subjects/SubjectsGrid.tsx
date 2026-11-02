import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, BookOpen } from "lucide-react";
import type { Variants } from "framer-motion";
import { Lora, DM_Sans } from "next/font/google";
import SubjectCard from "./SubjectCard";
import { POPULAR_SUBJECTS, SUBJECT_CATEGORIES } from "@/lib/constants";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600", "700"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

/* ======================
   CONFIG — untouched
====================== */
const PAGE_SIZE = 8;

const CATEGORY_KEYS = Object.keys(SUBJECT_CATEGORIES) as Array<
  keyof typeof SUBJECT_CATEGORIES
>;

const CATEGORY_TABS = [
  { key: "all", label: "All" },
  ...CATEGORY_KEYS.map((key) => ({
    key,
    label: SUBJECT_CATEGORIES[key].label,
  })),
] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function SubjectsGrid() {
  /* ——— LOGIC UNTOUCHED ——— */
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const filteredSubjects = useMemo(() => {
    const searchLower = search.toLowerCase();
    const subjects = CATEGORY_KEYS.flatMap((key) => {
      if (activeTab !== "all" && activeTab !== key) return [];
      return SUBJECT_CATEGORIES[key].subjects.filter((subject) =>
        subject.toLowerCase().includes(searchLower)
      );
    });
    const popular = subjects.filter((s) => POPULAR_SUBJECTS.includes(s));
    const nonPopular = subjects.filter((s) => !POPULAR_SUBJECTS.includes(s));
    return [...popular, ...nonPopular];
  }, [search, activeTab]);

  const visibleSubjects = useMemo(() => {
    return filteredSubjects.slice(0, page * PAGE_SIZE);
  }, [filteredSubjects, page]);

  const hasMore = visibleSubjects.length < filteredSubjects.length;

  useEffect(() => {
    setPage(1);
  }, [search, activeTab]);

  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) setPage((prev) => prev + 1);
      },
      { threshold: 1 }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore]);
  /* ——— END LOGIC ——— */

  const resultCount = filteredSubjects.length;
  const hasSearch = search.trim().length > 0;

  return (
    <section aria-label="Browse school subjects and find tutors" className={`relative ${dmSans.className}`}>
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className={`${lora.className} italic text-sm text-[#6B5636] mb-2`}>The directory</p>
            <h2 className={`${lora.className} text-2xl sm:text-[28px] font-semibold text-[#1C2B22] leading-tight`}>
              Browse all subjects
            </h2>
            <p className="mt-1.5 text-sm text-[#58646C] max-w-md leading-relaxed">
              School · Competitive · Languages · Skill-based — tutors for every board &amp; level.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-80 flex-shrink-0">
            <div
              className="flex items-center gap-2 rounded-md border bg-white px-4 py-3 transition-colors duration-200"
              style={{ borderColor: hasSearch ? "#D79A2C" : "#1C2B22" + "1A" }}
            >
              <Search size={16} className="text-[#7C9484] flex-shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search subject e.g. Maths, Physics…"
                className="flex-1 text-sm bg-transparent outline-none text-[#1C2B22] placeholder-[#9AA3AB]"
                aria-label="Search subjects"
                autoComplete="off"
              />
              {hasSearch && (
                <button onClick={() => setSearch("")} className="flex-shrink-0 text-[#7C9484] hover:text-[#1C2B22] transition-colors" aria-label="Clear search">
                  <X size={14} />
                </button>
              )}
            </div>

            {hasSearch && (
              <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="absolute -bottom-7 left-0 text-xs text-[#58646C] font-medium">
                {resultCount === 0 ? "No results found" : `${resultCount} subject${resultCount > 1 ? "s" : ""} found`}
              </motion.div>
            )}
          </div>
        </div>

        {!hasSearch && (
          <div className="mt-4 flex items-center gap-2 text-xs text-[#9AA3AB]">
            <SlidersHorizontal size={12} />
            <span>
              Showing <span className="font-semibold text-[#58646C]">{visibleSubjects.length}</span> of{" "}
              <span className="font-semibold text-[#58646C]">{filteredSubjects.length}</span> subjects
              {activeTab !== "all" && (
                <> in <span className="font-semibold text-[#D79A2C]">{CATEGORY_TABS.find((t) => t.key === activeTab)?.label}</span></>
              )}
            </span>
          </div>
        )}
      </header>

      {/* Category tabs */}
      <nav aria-label="Filter subjects by category" className="mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                aria-pressed={isActive}
                aria-label={`Filter by ${tab.label}`}
                className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 border ${
                  isActive
                    ? "bg-[#1C2B22] text-[#F7F2E9] border-[#1C2B22]"
                    : "bg-white text-[#58646C] border-[#1C2B22]/10 hover:border-[#D79A2C]/50"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <div className="mt-3 h-px w-full bg-[#1C2B22]/[.08]" />
      </nav>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
        aria-label="Subject cards grid"
      >
        <AnimatePresence mode="popLayout">
          {visibleSubjects.map((subject, index) => (
            <motion.div key={`${subject}-${index}`} variants={itemVariants} layout>
              <SubjectCard subject={subject} highlight={POPULAR_SUBJECTS.includes(subject)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      <AnimatePresence>
        {!visibleSubjects.length && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-20 flex flex-col items-center justify-center text-center"
            role="status"
            aria-live="polite"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-[#1C2B22]/[.04]">
              <BookOpen size={26} className="text-[#D79A2C]" />
            </div>
            <h3 className={`${lora.className} text-lg font-semibold text-[#1C2B22] mb-2`}>No subjects found</h3>
            <p className="text-sm text-[#58646C] max-w-xs leading-relaxed">
              Try a different keyword or browse all categories to find the right subject tutor.
            </p>
            <button
              onClick={() => { setSearch(""); setActiveTab("all"); }}
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#D79A2C] px-5 py-2.5 text-sm font-semibold text-[#17261D] hover:bg-[#c4891f] transition-colors"
            >
              <X size={14} /> Clear filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Infinite scroll loader */}
      {hasMore && (
        <div ref={loaderRef} className="mt-14 flex flex-col items-center gap-3" aria-live="polite" aria-label="Loading more subjects">
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-2 w-2 rounded-full bg-[#D79A2C]"
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>
          <span className="text-xs text-[#9AA3AB] font-medium">Loading more subjects…</span>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
