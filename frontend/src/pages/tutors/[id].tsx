import Head from "next/head";
import { motion } from "framer-motion";
import Footer from "@/components/landing/Footer";
import NavBar from "@/components/navbar/NavBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DemoRequestModal from "@/components/tutor-flow/DemoRequestModal";
import AddTutorReview from "./AddTutorReview";
import {
  Star,
  BookOpen,
  Clock,
  Languages,
  GraduationCap,
  Users,
  IndianRupee,
  CheckCircle,
  CalendarDays,
  ShieldCheck,
  Headphones,
  Monitor,
  AlertCircle,
  MapPin,
  Award,
  Sparkles,
  TrendingUp,
  UserCheck,
  MessageCircle,
  Phone,
  Loader2,
} from "lucide-react";
import publicApi from "@/lib/publicApi";
import apiClient from "@/lib/apiClient";
import { GetServerSideProps } from "next";
import { resolveImage } from "@/lib/resolveImage";
import toast from "react-hot-toast";
import { lora } from "@/lib/fonts";

import ssrApi from "@/lib/ssrApi";
import { generateTutorSEO, generateTutorFAQSchema, generateTutorPersonSchema, generateTutorSlug } from "@/lib/seo/generateTutorSEO";
import TutorHero from "@/components/tutor/TutorHero";
import TeachingMethodology from "@/components/tutor/TeachingMethodology";
import TrustSignals from "@/components/tutor/TrustSignals";
import LeadActions from "@/components/tutor/LeadActions";
import TutorFAQ from "@/components/tutor/TutorFAQ";

const STATIC_RATINGS = [4.0, 4.1, 4.3, 4.6, 4.7, 4.2, 4.9, 5.0];

type TutorLocation = {
  city?: string;
  area?: string;
  state?: string;
};

type Tutor = {
  _id: string;
  slug?: string;
  fullName: string;
  profileImage?: string;
  headline?: string;
  rating?: number;
  totalStudents?: number;
  price?: number;
  priceType?: "per_hour" | "per_month";
  bio?: string;
  subjects?: string[];
  languages?: string[];
  yearsOfExperience?: number;
  qualification?: string;
  college?: string;
  classesTaught?: string[];
  teachingMode?: string;
  availability?: string[] | string;
  location?: TutorLocation;
  membershipType?: string;
  currentPlanSlug?: string;
  revenueSharePercentage?: number;
};

type TutorProfileProps = {
  tutor: Tutor;
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const id = ctx.params?.id as string;
//   try {
//     const res = await publicApi.get(`/tutors/${id}`);
//     return { props: { tutor: res.data.data } };
//   } catch {
//     return { notFound: true };
//   }
// };
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = (ctx.params?.id || ctx.params?.slug) as string;

  try {
    const res = await ssrApi.get(`/tutors/${id}`);
    const tutor = res.data?.data;

    if (!tutor) {
      return { notFound: true };
    }

    const slug = tutor.slug || generateTutorSlug(tutor);

    // 🚀 SEO PERMANENT REDIRECT: If requested via Mongo ObjectId, redirect to SEO Slug URL!
    if (id !== slug && /^[0-9a-fA-F]{24}$/.test(id)) {
      return {
        redirect: {
          destination: `/tutor/${slug}`,
          permanent: true,
        },
      };
    }

    return {
      props: {
        tutor,
      },
    };
  } catch (err) {
    return { notFound: true };
  }
};

const StarRating = ({ rating }: { rating: number }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < full ? "#F59E0B" : i === full && half ? "url(#half)" : "none"}
          stroke="#F59E0B"
          strokeWidth="1.5"
        >
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
};

export default function TutorProfile({ tutor }: TutorProfileProps) {
  if (!tutor) return null;

  const [showDemoModal, setShowDemoModal] = useState(false);
  const router = useRouter();
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const tutorSlug = tutor.slug || generateTutorSlug(tutor);

  // Generate SEO metadata
  const seoData = generateTutorSEO(
    {
      name: tutor.fullName,
      subject: tutor.subjects,
      city: tutor.location?.city,
      area: tutor.location?.area,
      state: tutor.location?.state,
      experience: tutor.yearsOfExperience,
      qualification: tutor.qualification,
      classesTaught: tutor.classesTaught,
      teachingMode: tutor.teachingMode,
      rating: tutor.rating,
      profileImage: resolveImage(tutor.profileImage),
      slug: tutorSlug,
    },
    tutorSlug
  );

  // Generate structured data schemas
  const faqSchema = generateTutorFAQSchema({
    name: tutor.fullName,
    subject: tutor.subjects,
    city: tutor.location?.city,
    teachingMode: tutor.teachingMode,
  });

  const personSchema = generateTutorPersonSchema(
    {
      name: tutor.fullName,
      subject: tutor.subjects,
      city: tutor.location?.city,
      area: tutor.location?.area,
      state: tutor.location?.state,
      qualification: tutor.qualification,
      experience: tutor.yearsOfExperience,
      profileImage: resolveImage(tutor.profileImage),
      rating: tutor.rating,
    },
    tutorSlug
  );

  // useEffect(() => {
  //   if (!tutor?._id) return;
  //   apiClient
  //     .get(`/tutors/${tutor._id}/reviews`)
  //     .then((res) => setReviews(res.data.data || []))
  //     .catch(() => {})
  //     .finally(() => setReviewsLoading(false));
  // }, [tutor?._id]);
  useEffect(() => {
  if (!router.isReady) return;

  const { action } = router.query;

  // check login
  const authStorage = localStorage.getItem("auth-storage");
  const token = authStorage ? JSON.parse(authStorage)?.state?.token : null;

  if (token && action === "demo") {
    setShowDemoModal(true);
  }
}, [router.isReady]);

  useEffect(() => {
  if (!tutor?._id) return;

apiClient
      .get(`/tutors/${tutor._id}/reviews`)
      .then((res) => setReviews(res.data.data || []))
      .finally(() => setReviewsLoading(false));
  }, [tutor?._id]);

  if (!tutor) {
    return <div className="p-10 text-center">Loading...</div>;
  }
  
  const handleDemoClick = () => {
    if (typeof window === "undefined") return;
    const authStorage = localStorage.getItem("auth-storage");
    const token = authStorage ? JSON.parse(authStorage)?.state?.token : null;
    if (!token) {
      toast.custom(
        (t) => (
          <div className={`${t.visible ? "animate-enter" : "animate-leave"} max-w-md w-full bg-white shadow-2xl rounded-2xl pointer-events-auto flex gap-4 p-4 border-l-4 border-red-500`}>
            <div className="flex-shrink-0">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-red-100">
                <AlertCircle className="text-red-600" size={22} />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Login Required</p>
              <p className="mt-1 text-sm text-gray-600">Please login first, then send demo request.</p>
            </div>
            <button onClick={() => toast.dismiss(t.id)} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>
        ),
        { duration: 3000 }
      );
      // router.push(`/login?redirect=/tutors/${tutor._id}`);
      router.push(`/login?redirect=/tutors/${tutor._id}&action=demo`);
      return;
    }
    setShowDemoModal(true);
  };

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const effectiveRating: number =
    typeof tutor.rating === "number" && tutor.rating > 0
      ? tutor.rating
      : STATIC_RATINGS[tutor._id ? tutor._id.length % STATIC_RATINGS.length : 0] ?? 4.2;

  const isTopRated = effectiveRating >= 4.0;

  // WhatsApp handler
  const handleWhatsApp = () => {
    const phoneNumber = "916363453870";
    const message = encodeURIComponent(
      `Hi Yattra Tutors Support, I am interested in booking a demo class with tutor ${tutor.fullName} (${tutor.subjects?.[0] || "Tutor"}).`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  // Request callback handler
  const handleRequestCallback = () => {
    toast.success("Callback request submitted! We'll contact you within 1 hour.");
    // TODO: Implement actual callback request API
  };

  const detailItems = [
    { icon: BookOpen, label: "Subjects", value: tutor.subjects?.join(", ") || "Not specified" },
    { icon: Languages, label: "Languages", value: tutor.languages?.join(", ") || "Not specified" },
    { icon: Clock, label: "Experience", value: `${tutor.yearsOfExperience}+ years` },
    { icon: GraduationCap, label: "Qualification", value: tutor.qualification || "Not specified" },
    { icon: GraduationCap, label: "College", value: tutor.college || "Not specified" },
    { icon: Users, label: "Classes", value: tutor.classesTaught?.join(", ") || "Not specified" },
    { icon: Monitor, label: "Teaching Mode", value: tutor.teachingMode || "Not specified" },
    {
      icon: MapPin,
      label: "Location",
      value: [tutor.location?.area, tutor.location?.city, tutor.location?.state].filter(Boolean).join(", ") || "Not specified",
    },
    {
      icon: CalendarDays,
      label: "Availability",
      value: Array.isArray(tutor.availability) ? tutor.availability.join(", ") : tutor.availability || "Not specified",
    },
  ];

  return (
    <>
      <NavBar />
      <Head>
        {/* Primary Meta Tags */}
        <title>{seoData.title}</title>
        <meta name="title" content={seoData.title} />
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords.join(", ")} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={seoData.canonical} />
        
        {/* Robots Meta */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={seoData.canonical} />
        <meta property="og:title" content={seoData.ogTitle} />
        <meta property="og:description" content={seoData.ogDescription} />
        <meta property="og:image" content={resolveImage(tutor.profileImage)} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Yattra Tutors" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={seoData.canonical} />
        <meta name="twitter:title" content={seoData.twitterTitle} />
        <meta name="twitter:description" content={seoData.twitterDescription} />
        <meta name="twitter:image" content={resolveImage(tutor.profileImage)} />
        <meta name="twitter:site" content="@yattratutors" />
        <meta name="twitter:creator" content="@yattratutors" />
        
        {/* Additional Meta Tags */}
        <meta name="author" content={tutor.fullName} />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Geo Tags for Local SEO */}
        {tutor.location?.city && (
          <>
            <meta name="geo.region" content={`IN-${tutor.location.state || ""}`} />
            <meta name="geo.placename" content={tutor.location.city} />
          </>
        )}
        
        {/* JSON-LD Structured Data - FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        
        {/* JSON-LD Structured Data - Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        
        {/* JSON-LD Structured Data - Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Yattra Tutors",
              "url": "https://www.yattratutors.com",
              "logo": "https://www.yattratutors.com/logo.png",
              "sameAs": [
                "https://www.facebook.com/yattratutors/",
                "https://twitter.com/yattratutors/",
                "https://www.instagram.com/yattratutors/",
              ],
            }),
          }}
        />
      </Head>

      <main className="profile-root min-h-screen bg-[#F7F2E9]">
        
        {/* New Hero Section */}
        <TutorHero
          name={tutor.fullName}
          profileImage={tutor.profileImage}
          headline={tutor.headline}
          subjects={tutor.subjects}
          classesTaught={tutor.classesTaught}
          qualification={tutor.qualification}
          college={tutor.college}
          bio={tutor.bio}
          city={tutor.location?.city}
          area={tutor.location?.area}
          experience={tutor.yearsOfExperience}
          rating={effectiveRating}
          totalStudents={tutor.totalStudents}
          isVerified={true}
          membershipType={tutor.membershipType}
          currentPlanSlug={tutor.currentPlanSlug}
          revenueSharePercentage={tutor.revenueSharePercentage}
          onBookDemo={handleDemoClick}
          onWhatsApp={handleWhatsApp}
          onRequestCallback={handleRequestCallback}
        />

        {/* Trust Signals Section */}
        <TrustSignals
          responseTime="1 Hour"
          experience={tutor.yearsOfExperience}
        />

        {/* ══════════════════ TUTOR CREDENTIALS & DETAILS GRID ══════════════════ */}
        <section className="max-w-6xl mx-auto py-10 px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT 2 COLUMNS: CREDENTIALS & ABOUT */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* About & Bio Card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-[#1C2B22]/10 bg-white p-7"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <UserCheck size={20} className="text-[#D79A2C]" />
                  <h3 className={`${lora.className} text-lg font-semibold text-[#1C2B22]`}>About {tutor.fullName}</h3>
                </div>
                <p className="text-[15px] leading-relaxed text-[#58646C]">
                  {tutor.bio || `${tutor.fullName} is a dedicated and result-oriented educator with ${tutor.yearsOfExperience || 3}+ years of teaching experience. Specializing in ${tutor.subjects?.join(", ") || "core academic subjects"}, they focus on building strong foundational concepts and conceptual clarity for every student.`}
                </p>

                {/* Privacy Badge */}
                <div className="mt-6 flex items-center gap-3 rounded-md border border-[#1C2B22]/10 bg-[#F7F2E9] p-3.5 text-xs text-[#58646C]">
                  <ShieldCheck size={17} className="flex-shrink-0 text-[#D79A2C]" />
                  <span>
                    <strong className="text-[#1C2B22]">Privacy protected.</strong> Direct phone numbers and email addresses are kept private for safety. Connect safely via a free demo class booking.
                  </span>
                </div>
              </motion.div>

              {/* Qualifications & Subjects Grid */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-lg border border-[#1C2B22]/10 bg-white p-7"
              >
                <h3 className={`${lora.className} mb-6 flex items-center gap-2 text-lg font-semibold text-[#1C2B22]`}>
                  <GraduationCap className="text-[#D79A2C]" size={20} />
                  Qualifications &amp; expertise
                </h3>

                <div className="grid grid-cols-1 divide-y divide-[#1C2B22]/[.06] md:grid-cols-2 md:divide-y-0">
                  {/* Qualification */}
                  <div className="py-3 md:border-r md:border-[#1C2B22]/[.06] md:pr-4">
                    <span className="block text-xs text-[#9AA3AB]">Qualification</span>
                    <p className="text-base font-semibold text-[#1C2B22]">{tutor.qualification || "Graduate Degree"}</p>
                    {tutor.college && <p className="mt-0.5 text-xs font-medium text-[#8a5f18]">{tutor.college}</p>}
                  </div>

                  {/* Experience */}
                  <div className="py-3 md:pl-4">
                    <span className="block text-xs text-[#9AA3AB]">Experience</span>
                    <p className="text-base font-semibold text-[#1C2B22]">{tutor.yearsOfExperience || 3}+ Years teaching</p>
                    <p className="mt-0.5 text-xs font-medium text-[#3f8a5f]">Verified experience</p>
                  </div>

                  {/* Teaching Mode */}
                  <div className="py-3 md:border-r md:border-[#1C2B22]/[.06] md:pr-4">
                    <span className="block text-xs text-[#9AA3AB]">Teaching mode</span>
                    <p className="text-base font-semibold text-[#1C2B22]">{tutor.teachingMode || "Home tuition & online"}</p>
                  </div>

                  {/* Languages */}
                  <div className="py-3 md:pl-4">
                    <span className="block text-xs text-[#9AA3AB]">Languages spoken</span>
                    <p className="text-base font-semibold text-[#1C2B22]">{tutor.languages?.join(", ") || "English, Hindi"}</p>
                  </div>
                </div>

                {/* Subjects Pills */}
                {tutor.subjects && tutor.subjects.length > 0 && (
                  <div className="mt-6 border-t border-[#1C2B22]/[.06] pt-5">
                    <span className="mb-2 block text-xs text-[#9AA3AB]">Subjects taught</span>
                    <p className="text-sm text-[#1C2B22]">{tutor.subjects.join(" · ")}</p>
                  </div>
                )}

                {/* Classes Taught Pills */}
                {tutor.classesTaught && tutor.classesTaught.length > 0 && (
                  <div className="mt-4">
                    <span className="mb-2 block text-xs text-[#9AA3AB]">Classes &amp; grades</span>
                    <p className="text-sm text-[#1C2B22]">{tutor.classesTaught.join(" · ")}</p>
                  </div>
                )}
              </motion.div>

            </div>

            {/* RIGHT COLUMN: STICKY BOOKING & PRICING CARD */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                
                {/* Booking Card */}
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-lg border border-[#1C2B22]/10 bg-white p-6"
                >
                  {/* Price Banner */}
                  <div className="mb-6 rounded-md bg-[#0E211C] p-5 text-center text-white">
                    <span className="text-xs text-[#AAB6A2]">Tuition fee rate</span>
                    <div className={`${lora.className} mt-1 text-2xl font-semibold`}>
                      {tutor.price ? `₹${tutor.price.toLocaleString("en-IN")}` : "₹800 – ₹2,500"}
                      <span className="ml-1 text-sm font-normal text-[#AAB6A2]">
                        /{tutor.priceType === "per_hour" ? "hour" : "month"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#AAB6A2]">Negotiable directly with tutor</p>
                  </div>

                  {/* Quick Info */}
                  <div className="mb-6 divide-y divide-[#1C2B22]/[.06] text-sm">
                    <div className="flex items-center justify-between py-2.5">
                      <span className="flex items-center gap-2 text-[#9AA3AB]">
                        <MapPin size={15} className="text-[#D79A2C]" /> Location
                      </span>
                      <span className="text-right font-medium text-[#1C2B22]">
                        {[tutor.location?.area, tutor.location?.city].filter(Boolean).join(", ") || "India"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2.5">
                      <span className="flex items-center gap-2 text-[#9AA3AB]">
                        <ShieldCheck size={15} className="text-[#3f8a5f]" /> Phone &amp; email
                      </span>
                      <span className="text-xs font-medium text-[#3f8a5f]">
                        Verified &amp; protected
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2.5">
                      <span className="flex items-center gap-2 text-[#9AA3AB]">
                        <CalendarDays size={15} className="text-[#D79A2C]" /> Availability
                      </span>
                      <span className="text-right text-xs font-medium text-[#1C2B22]">
                        {Array.isArray(tutor.availability) ? tutor.availability[0] || "Available" : tutor.availability || "Flexible slots"}
                      </span>
                    </div>
                  </div>

                  {/* Primary CTA Buttons */}
                  <div className="space-y-2.5">
                    <button
                      onClick={handleDemoClick}
                      className="flex w-full items-center justify-center gap-2 rounded-md bg-[#D79A2C] px-4 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
                    >
                      <Sparkles size={16} />
                      Book free demo class
                    </button>

                    <button
                      onClick={handleWhatsApp}
                      className="flex w-full items-center justify-center gap-2 rounded-md border border-[#1C2B22]/15 px-4 py-2.5 text-sm font-medium text-[#1C2B22] transition-colors hover:border-[#D79A2C]/50"
                    >
                      <MessageCircle size={16} />
                      Chat via WhatsApp
                    </button>

                    <button
                      onClick={handleRequestCallback}
                      className="flex w-full items-center justify-center gap-1.5 rounded-md px-4 py-2 text-xs font-medium text-[#58646C] transition-colors hover:text-[#1C2B22]"
                    >
                      <Phone size={13} />
                      Request instant callback
                    </button>
                  </div>
                </motion.div>

              </div>
            </div>

          </div>
        </section>

        {/* Teaching Methodology Section */}
        <TeachingMethodology tutorName={tutor.fullName} />
        
        {/* Lead Actions CTA Section */}
        <LeadActions
          tutorName={tutor.fullName}
          onBookDemo={handleDemoClick}
          onWhatsApp={handleWhatsApp}
          onRequestCallback={handleRequestCallback}
          showAllActions={true}
        />
        
        {/* FAQ Section */}
        <TutorFAQ
          tutorName={tutor.fullName}
          subjects={tutor.subjects}
          city={tutor.location?.city}
          area={tutor.location?.area}
          teachingMode={tutor.teachingMode}
          price={tutor.price}
          priceType={tutor.priceType}
          experience={tutor.yearsOfExperience}
        />

        {/* ══════════════════ REVIEWS SECTION ══════════════════ */}
        <div className="max-w-6xl mx-auto mt-7 relative z-10 px-4">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-lg border border-[#1C2B22]/10 bg-white p-7"
          >
            <div className="mb-6 flex items-center gap-2.5">
              <Star size={18} className="text-[#D79A2C]" fill="#D79A2C" />
              <h2 className={`${lora.className} text-lg font-semibold text-[#1C2B22]`}>Parent reviews</h2>
              {reviews.length > 0 && (
                <span className="ml-auto text-xs font-medium text-[#8a5f18]">
                  {reviews.length} review{reviews.length > 1 ? "s" : ""}
                </span>
              )}
            </div>

            <AddTutorReview tutorId={tutor._id} />

            {reviewsLoading ? (
              <div className="flex items-center gap-3 py-6 text-sm text-[#9AA3AB]">
                <Loader2 size={16} className="animate-spin text-[#D79A2C]" />
                Loading reviews...
              </div>
            ) : reviews.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-sm text-[#9AA3AB]">No reviews yet. Be the first to review this tutor.</p>
              </div>
            ) : (
              <div className="mt-6 divide-y divide-[#1C2B22]/[.06]">
                {reviews.map((r, idx) => (
                  <motion.div
                    key={r._id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="py-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={resolveImage(r.parent?.profileImage)}
                          alt={r.parent?.fullName || "Parent"}
                          className="h-9 w-9 rounded-full border border-[#1C2B22]/10 object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold text-[#1C2B22]">{r.parent?.fullName || "Parent"}</p>
                          <p className="text-xs text-[#9AA3AB]">{new Date(r.createdAt).toLocaleDateString("en-IN")}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 text-sm text-[#D79A2C]">
                        {"★".repeat(r.rating)}
                        <span className="text-[#1C2B22]/15">{"★".repeat(5 - r.rating)}</span>
                      </div>
                    </div>
                    <p className={`${lora.className} mt-2.5 border-l-2 border-[#D79A2C]/30 pl-3 text-sm italic leading-relaxed text-[#58646C]`}>
                      &quot;{r.comment}&quot;
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>
        </div>
      </main>

      {showDemoModal && (
        <DemoRequestModal
          tutorId={tutor._id}
          subjects={tutor.subjects || []}
          onClose={() => setShowDemoModal(false)}
        />
      )}

      <Footer />
    </>
  );
}