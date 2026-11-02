import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { GraduationCap, CheckCircle2, ArrowRight, Star } from "lucide-react";
import { Lora } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600", "700"] });

/* ======================
   UTILS — untouched
====================== */
const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-");

interface Props {
  subject: string;
  highlight?: boolean;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ======================
   SUBJECT → TINT  (reuses the Subject-Directory palette
   instead of a bespoke rainbow gradient per subject)
====================== */
const TINTS = ["#3E5C83", "#7A4E6E", "#B06A2E", "#1F6F54"];
const getTint = (subject: string) => {
  let hash = 0;
  for (let i = 0; i < subject.length; i++) hash = (hash * 31 + subject.charCodeAt(i)) >>> 0;
  return TINTS[hash % TINTS.length];
};
const monogram = (subject: string) =>
  subject
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

export default function SubjectCard({ subject, highlight }: Props) {
  const router = useRouter();

  const subjectSlug = useMemo(() => slugify(subject), [subject]);

  const handleNavigation = useCallback(() => {
    router.push({
      pathname: "/find-tutor-flow",
      query: { subject: subjectSlug, board: "cbse", medium: "english" },
    });
  }, [router, subjectSlug]);

  const tint = getTint(subject);

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      onClick={handleNavigation}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleNavigation()}
      aria-label={`Find ${subject} tutor — CBSE, ICSE & State Board`}
      className="group relative cursor-pointer rounded-lg bg-white border border-[#1C2B22]/[.08] hover:border-[#D79A2C]/50
                 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D79A2C] overflow-hidden"
    >
      <div className="flex flex-col h-full p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-md flex items-center justify-center text-white"
              style={{ backgroundColor: tint }}
            >
              <span className={`${lora.className} text-xs font-semibold`}>{monogram(subject)}</span>
            </div>
            <div>
              <h3 className={`${lora.className} text-base font-semibold text-[#1C2B22] leading-tight`}>
                {subject}
              </h3>
              <p className="text-[11px] text-[#7C9484] font-medium mt-0.5">Expert &amp; verified</p>
            </div>
          </div>

          {highlight && (
            <span
              className="inline-flex items-center gap-1 flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold bg-[#D79A2C]/10 border border-[#D79A2C]/30"
              style={{ color: "#8a5f18" }}
              aria-label="Popular subject"
            >
              <Star size={9} className="text-[#D79A2C] fill-[#D79A2C]" />
              Popular
            </span>
          )}
        </div>

        <div className="h-px w-full bg-[#1C2B22]/[.08] mb-4" />

        {/* Meta */}
        <div className="flex flex-col gap-2 mb-5">
          <div className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium bg-[#1C2B22]/[.03] text-[#1C2B22]">
            <GraduationCap size={13} style={{ color: tint }} />
            <span>CBSE · ICSE · State Board</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium bg-emerald-50/70 text-emerald-800 border border-emerald-100">
            <CheckCircle2 size={13} className="text-emerald-600" />
            <span>English medium · Background verified</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto flex items-center justify-between text-sm font-medium text-[#1C2B22] group-hover:text-[#D79A2C] transition-colors">
          View tutors
          <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </motion.article>
  );
}
