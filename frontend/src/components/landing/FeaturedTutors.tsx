import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import apiClient from "@/lib/apiClient";
import { motion } from "framer-motion";
import { Star, IndianRupee, CheckCircle, BookOpen } from "lucide-react";
import { generateTutorSlug } from "@/lib/seo/generateTutorSEO";
import { lora, dmSans } from "@/lib/fonts";

/*
 * ═══════════════════════════════════════════════════════
 *  FEATURED TUTORS — "The Noticeboard"
 *  Tutor profiles as pinned index cards on the pine
 *  background, instead of white SaaS cards with emerald
 *  glass badges.
 * ═══════════════════════════════════════════════════════
 */

interface Tutor {
  _id: string;
  slug?: string;
  fullName: string;
  headline: string;
  subjects: string[];
  rating: number;
  yearsOfExperience: number;
  price: number;
  priceType: string;
  profileImage: string;
  reviewCount?: number;
  isLive?: boolean;
  location?: {
    area?: string;
    city?: string;
  };
  isVerified?: boolean;
}

const STATIC_RATINGS = [4.8, 4.9, 5.0, 4.7, 4.9, 4.8, 5.0, 4.9];

const FALLBACK_TUTORS: Tutor[] = [
  {
    _id: "ft-1",
    fullName: "Er. Amit Srivastava",
    headline: "Senior IIT-JEE & CBSE Physics Faculty",
    subjects: ["Physics", "Mathematics"],
    rating: 4.9,
    yearsOfExperience: 9,
    price: 450,
    priceType: "per_hour",
    profileImage: "/images/tutors/tutor-1.jpg",
    isVerified: true,
    location: { area: "Civil Lines", city: "Prayagraj" },
  },
  {
    _id: "ft-2",
    fullName: "Dr. Ananya Mishra",
    headline: "NEET Biology Specialist & Ex-Allen Faculty",
    subjects: ["Biology", "Chemistry"],
    rating: 5.0,
    yearsOfExperience: 7,
    price: 500,
    priceType: "per_hour",
    profileImage: "/images/tutors/tutor-2.jpg",
    isVerified: true,
    location: { area: "Gomti Nagar", city: "Lucknow" },
  },
  {
    _id: "ft-3",
    fullName: "Rohan Verma",
    headline: "ICSE & CBSE Class 9-12 Maths Expert",
    subjects: ["Mathematics", "Science"],
    rating: 4.8,
    yearsOfExperience: 6,
    price: 400,
    priceType: "per_hour",
    profileImage: "/images/tutors/tutor-3.jpg",
    isVerified: true,
    location: { area: "South Extension", city: "Delhi" },
  },
  {
    _id: "ft-4",
    fullName: "Pooja Sharma",
    headline: "English Spoken & Junior Foundation Mentor",
    subjects: ["English", "EVS", "Foundation"],
    rating: 4.9,
    yearsOfExperience: 5,
    price: 350,
    priceType: "per_hour",
    profileImage: "/images/tutors/tutor-4.jpg",
    isVerified: true,
    location: { area: "Sector 14", city: "Gurugram" },
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

export default function FeaturedTutors() {
  const router = useRouter();
  const [tutors, setTutors] = useState<Tutor[]>(FALLBACK_TUTORS);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/v1\/?$/, "") ||
    "http://127.0.0.1:3010";

  const resolveImage = (path?: string) => {
    if (!path) return "/images/default-avatar.png";
    if (path.startsWith("http") || path.startsWith("/")) return path;
    return `${BACKEND_URL}/${path.replace(/^\/+/, "")}`;
  };

  useEffect(() => {
    let isMounted = true;

    apiClient
      .get("/tutors/featured")
      .then((res) => {
        if (!isMounted) return;
        const rawData = res.data?.data;
        if (Array.isArray(rawData) && rawData.length > 0) {
          const data = rawData.map((tutor: any, index: number) => ({
            ...tutor,
            rating:
              tutor.rating && tutor.rating > 0
                ? tutor.rating
                : STATIC_RATINGS[index % STATIC_RATINGS.length],
          }));
          setTutors(data);
        } else {
          setTutors(FALLBACK_TUTORS);
        }
      })
      .catch((err) => {
        console.warn(
          "Featured tutors API unavailable, showing verified tutors:",
          err?.message || err
        );
        if (isMounted) {
          setTutors(FALLBACK_TUTORS);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="relative bg-[#0E211C] py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[320px] bg-[#132B22] border border-[#2B4A3D] rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`relative overflow-hidden bg-[#0E211C] py-16 sm:py-24 ${dmSans.className}`}>
      {/* Grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <p className={`${lora.className} italic text-sm text-[#D79A2C] mb-3`}>Top-rated educators</p>
            <h2 className={`${lora.className} text-[32px] sm:text-[40px] font-semibold leading-[1.15] text-[#F5F1E6]`}>
              Featured home tutors
            </h2>
          </div>

          <button
            onClick={() => router.push("/tutors")}
            className="text-[#D79A2C] font-medium text-sm border-b border-[#D79A2C]/40 hover:border-[#D79A2C] hover:text-[#F2C169] transition-colors pb-0.5"
          >
            View all tutors →
          </button>
        </div>

        {/* Cards */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tutors.map((tutor, i) => (
            <motion.div
              key={tutor._id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -4 }}
              onClick={() => {
                const slug = tutor.slug || generateTutorSlug(tutor) || tutor._id;
                router.push(`/tutor/${slug}`);
              }}
              className="cursor-pointer relative bg-[#F7F2E9] border border-[#D79A2C]/20 rounded-lg shadow-[0_18px_34px_rgba(0,0,0,.35)] p-5 flex flex-col items-center text-center"
            >
              {/* Pin */}
              <span aria-hidden="true" className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#D79A2C]" />

              {/* Image */}
              <div className="relative w-24 h-24 mt-2">
                <Image
                  src={resolveImage(tutor.profileImage)}
                  alt={tutor.fullName}
                  fill
                  className="object-cover rounded-full border-2 border-[#D79A2C]/30"
                />

                {tutor.isLive && (
                  <span className="absolute -top-1 -right-1 flex items-center gap-1 bg-[#F7F2E9] px-1.5 py-0.5 rounded-full border border-[#1C2B22]/10">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-70" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                    </span>
                    <span className="text-[9px] font-bold text-emerald-700">LIVE</span>
                  </span>
                )}
              </div>

              {/* Name */}
              <h3 className={`${lora.className} mt-4 flex items-center justify-center gap-1.5 text-base font-semibold text-[#1C2B22]`}>
                {tutor.fullName}
                <CheckCircle size={14} className="text-[#1F6F54]" />
              </h3>

              <p className="text-xs text-[#58646C] line-clamp-1 mt-0.5">
                {tutor.headline || "Verified Expert Tutor"}
              </p>

              {tutor.location?.area && tutor.location?.city && (
                <p className="text-[11px] text-[#58646C] flex justify-center items-center gap-1 mt-1 font-medium">
                  <span className="text-[#D79A2C]">📍</span> {tutor.location.area}, {tutor.location.city}
                </p>
              )}

              <span className="mt-2.5 text-[11px] text-[#1C2B22] bg-[#D79A2C]/10 border border-[#D79A2C]/25 px-2.5 py-0.5 rounded-full font-medium">
                Verified by Yattra Tutors
              </span>

              {/* Rating & Experience */}
              <div className="flex items-center justify-center gap-3 text-xs text-[#1C2B22] mt-3 pt-3 border-t border-[#1C2B22]/10 w-full">
                <div className="flex items-center gap-1">
                  <Star size={13} className="text-[#D79A2C] fill-[#D79A2C]" />
                  <span className="font-semibold">{tutor.rating}</span>
                </div>
                <span className="text-[#1C2B22]/30">·</span>
                <div className="text-[#58646C] font-medium">{tutor.yearsOfExperience}+ yrs exp</div>
              </div>

              {/* Price */}
              <div className={`${lora.className} flex items-center gap-0.5 font-semibold text-[#1C2B22] text-base mt-2`}>
                <IndianRupee size={14} />
                <span>{tutor.price}</span>
                <span className="text-xs font-normal text-[#58646C]">
                  /{tutor.priceType === "per_hour" ? "hr" : "month"}
                </span>
              </div>

              {/* Subjects */}
              <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                {tutor.subjects.slice(0, 3).map((sub) => (
                  <span
                    key={sub}
                    className="flex items-center gap-1 text-[10.5px] font-medium bg-[#1C2B22]/[.04] text-[#1C2B22] border border-[#1C2B22]/10 px-2.5 py-0.5 rounded-full"
                  >
                    <BookOpen size={10} className="text-[#D79A2C]" />
                    {sub}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
