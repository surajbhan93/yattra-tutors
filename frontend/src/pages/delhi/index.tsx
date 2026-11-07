import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { lora, dmSans } from "@/lib/fonts";
import {
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Users,
  Heart,
  Clock,
  Award,
  BookOpen,
  GraduationCap,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Search,
  ChevronDown,
  Zap,
  Target,
} from "lucide-react";

import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/landing/Footer";
import { DELHI_AREAS } from "@/lib/delhi/delhiAreas";
import FAQSchema from "@/components/seoIndia/FAQSchema";
import LocalBusinessSchema from "@/components/seoIndia/LocalBusinessSchema";

/* =========================
   CONSTANTS
========================= */
const PHONE_NUMBER = "+916363453870";
const WHATSAPP_NUMBER = "916363453870";
const WHATSAPP_DEFAULT_MSG = "Hello%2C%20I%20need%20a%20home%20tutor%20in%20Delhi";
const GOOGLE_BUSINESS_LINK = "https://share.google/9srzoEeknq8tpchsp";

const TUTOR_COUNT = 2500;
const HAPPY_FAMILIES = 15000;

/* =========================
   FAQ DATA
========================= */
const FAQS = [
  {
    q: "How can I find a home tutor in Delhi?",
    a: "Simply visit Yattra Tutors, select your area in Delhi (like South Delhi, Rohini, Dwarka, etc.), choose your class and subject requirements, and we'll connect you with verified tutors in your locality within 24 hours. You can take a free demo class before confirming.",
  },
  {
    q: "Are tutors on Yattra Tutors background verified?",
    a: "Yes, absolutely. Every tutor on Yattra Tutors undergoes a comprehensive verification process including ID proof check, qualification verification, and reference checks. We also continuously collect parent feedback to maintain quality.",
  },
  {
    q: "What subjects and classes do you cover in Delhi?",
    a: "We cover all subjects from Class 1 to Class 12 including Maths, Science, Physics, Chemistry, Biology, English, Hindi, Social Science, Computer Science, and more. We also provide specialized tutors for JEE, NEET, CBSE, ICSE, and competitive exam preparation.",
  },
  {
    q: "Can I get a free demo class?",
    a: "Yes! Yattra Tutors offers a completely free demo class with your selected tutor. You can evaluate their teaching style, communication, and subject expertise before making any payment commitment.",
  },
  {
    q: "What are the home tuition fees in Delhi?",
    a: "Home tuition fees in Delhi typically range from ₹500 to ₹2500 per month depending on class level, subject, tutor experience, and location. Contact us for a customized quote based on your specific requirements.",
  },
  {
    q: "Do you provide female tutors in Delhi?",
    a: "Yes, we have both male and female tutors available across all areas of Delhi. You can specify your preference when making a tutor request, and we'll match you accordingly.",
  },
  {
    q: "How quickly can I get a tutor in Delhi?",
    a: "Typically within 24 to 48 hours. We match you with 2-3 verified tutors based on your requirements, and you can take a free demo class to decide which tutor suits best.",
  },
  {
    q: "Do you provide tutors for CBSE and ICSE boards in Delhi?",
    a: "Yes, we have experienced tutors for both CBSE and ICSE boards across all areas of Delhi. Our tutors are familiar with the respective board syllabus and examination patterns.",
  },
  {
    q: "Can I get a JEE or NEET tutor in Delhi?",
    a: "Absolutely. Yattra Tutors has specialized JEE and NEET tutors in Delhi who provide focused coaching for Physics, Chemistry, Maths, and Biology with proven teaching methods and regular test preparation.",
  },
  {
    q: "Which areas of Delhi do you cover?",
    a: "We cover all major areas of Delhi including South Delhi, North Delhi, West Delhi, East Delhi, Central Delhi, Rohini, Dwarka, Janakpuri, Laxmi Nagar, Saket, Greater Kailash, Mayur Vihar, Karol Bagh, and all nearby localities.",
  },
  {
    q: "Can I find a home tutor near me in Delhi?",
    a: "Yes, Yattra Tutors has tutors available in all Delhi neighborhoods. Simply specify your locality when registering, and we'll connect you with tutors available in your exact area.",
  },
  {
    q: "Do you provide one-to-one home tuition in Delhi?",
    a: "Yes, all our tutors provide personalized one-to-one home tuition where the tutor visits your home and gives individual attention to your child.",
  },
];

/* =========================
   COMPONENTS
========================= */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#1C2B22]/[.08] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-base font-semibold text-[#1C2B22]">{q}</span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-[#D79A2C] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && <p className="pb-5 leading-relaxed text-[#58646C]">{a}</p>}
    </div>
  );
}

/* =========================
   MAIN PAGE
========================= */
export default function DelhiCityPage() {
  const areaKeys = Object.keys(DELHI_AREAS);

  return (
    <>
      <Head>
        <title>Home Tutor in Delhi | Home Tuition for Class 1–12 | Yattra Tutors</title>
        <meta
          name="description"
          content="Find experienced home tutors in Delhi for Class 1–12, CBSE, ICSE, JEE, NEET and more. Get personalized one-to-one home tuition with Yattra Tutors. Free demo class available."
        />
        <meta
          name="keywords"
          content="home tutor in Delhi, home tuition in Delhi, private tutor Delhi, home tutor near me Delhi, CBSE tutor Delhi, ICSE tutor Delhi, JEE tutor Delhi, NEET tutor Delhi, home tuition near me, best home tutor Delhi, tutor in Delhi, home teacher Delhi"
        />
        <link rel="canonical" href="https://yattratutors.com/delhi" />

        {/* Open Graph */}
        <meta property="og:title" content="Home Tutor in Delhi | Home Tuition | Yattra Tutors" />
        <meta
          property="og:description"
          content="Find verified home tutors in Delhi for all classes, CBSE, ICSE, JEE, NEET. Book free demo class."
        />
        <meta property="og:url" content="https://yattratutors.com/delhi" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home Tutor in Delhi | Home Tuition | Yattra Tutors" />
        <meta
          name="twitter:description"
          content="Find verified home tutors in Delhi for all classes. Free demo class available."
        />

        {/* Structured Data */}
        <FAQSchema cityName="Delhi" location="Delhi" intent="Home Tutors in Delhi" />
        <LocalBusinessSchema city="delhi" cityName="Delhi" location="Delhi" />
      </Head>

      <div className={`min-h-screen bg-[#F7F2E9] ${dmSans.className}`}>
        <NavBar />

        {/* ========== HERO SECTION ========== */}
        <section className="relative overflow-hidden bg-[#0E211C] py-20 lg:py-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[.04]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative z-10 mx-auto w-full max-w-6xl px-4">
            {/* Google Rating Badge */}
            <motion.a
              href={GOOGLE_BUSINESS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10 inline-flex items-center gap-3 rounded-md border border-white/15 bg-white/5 px-5 py-3 transition-colors hover:bg-white/10"
            >
              <Star className="h-4 w-4 fill-[#D79A2C] text-[#D79A2C]" />
              <div className="flex flex-col">
                <span className="text-[11px] text-[#AAB6A2]">Google reviews</span>
                <span className="text-sm font-semibold text-white">5.0 / 5</span>
              </div>
              <ArrowRight className="h-4 w-4 text-[#AAB6A2]" />
            </motion.a>

            <div className="flex flex-col gap-16 lg:flex-row lg:items-center">
              {/* Left Content */}
              <div className="flex-1">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                  <p className={`${lora.className} italic text-sm text-[#AAB6A2] mb-3`}>Delhi NCR</p>
                  <h1 className={`${lora.className} text-4xl font-semibold leading-tight text-white sm:text-5xl`}>
                    Find the right home tutor in Delhi
                  </h1>

                  <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#AAB6A2]">
                    Connect with experienced home tutors for Class 1–12, CBSE, ICSE, JEE, NEET and more. Get
                    personalized one-to-one tuition from tutors available across Delhi.
                  </p>

                  {/* Trust line */}
                  <p className="mt-6 text-sm text-[#AAB6A2]">
                    Verified tutors · 5/5 rating · Free demo class · Result focused
                  </p>

                  {/* CTAs */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href="/tutors?city=Delhi&source=DELHI_HERO"
                      className="inline-flex items-center gap-2 rounded-md bg-[#D79A2C] px-6 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
                    >
                      <Search className="h-4 w-4" />
                      Find a tutor
                    </Link>

                    <Link
                      href="/find-students?source=DELHI_HERO"
                      className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
                    >
                      <Users className="h-4 w-4" />
                      Find students
                    </Link>

                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_DEFAULT_MSG}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md bg-[#3f8a5f] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#357a52]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp us
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Right: Stats Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="shrink-0 lg:w-[340px]"
              >
                <div className="rounded-md border border-white/10 bg-white/5">
                  <div className="border-b border-white/10 px-6 py-4">
                    <h3 className={`${lora.className} text-sm font-semibold text-white`}>Delhi</h3>
                    <p className="mt-0.5 text-xs text-[#AAB6A2]">Live tutor network</p>
                  </div>
                  <div className="divide-y divide-white/10">
                    {[
                      { icon: <Users className="h-4 w-4" />, label: "Active tutors", value: `${TUTOR_COUNT}+` },
                      { icon: <Heart className="h-4 w-4" />, label: "Happy families", value: `${HAPPY_FAMILIES}+` },
                      { icon: <Star className="h-4 w-4" />, label: "Google rating", value: "5.0/5" },
                      { icon: <Zap className="h-4 w-4" />, label: "Match time", value: "24 hrs" },
                    ].map((stat) => (
                      <div key={stat.label} className="flex items-center justify-between px-6 py-3.5">
                        <span className="flex items-center gap-2.5 text-sm text-[#AAB6A2]">
                          {stat.icon}
                          {stat.label}
                        </span>
                        <span className="text-sm font-semibold text-white">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========== SEARCH / FIND TUTOR SECTION ========== */}
        <section className="py-16">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-10 text-center">
              <h2 className={`${lora.className} text-3xl font-semibold text-[#1C2B22]`}>Find your perfect tutor</h2>
              <p className="mt-2 text-sm text-[#58646C]">Search by area, class, subject, or board</p>
            </div>

            <div className="rounded-lg border border-[#1C2B22]/10 bg-white p-8">
              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#1C2B22]">City / Area</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9AA3AB]" />
                    <input
                      type="text"
                      placeholder="Saket, Rohini, Dwarka..."
                      className="w-full rounded-md border border-[#1C2B22]/15 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#D79A2C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#1C2B22]">Class</label>
                  <select className="w-full rounded-md border border-[#1C2B22]/15 px-4 py-2.5 text-sm outline-none focus:border-[#D79A2C]">
                    <option>Select class</option>
                    <option>Class 1-5</option>
                    <option>Class 6-8</option>
                    <option>Class 9-10</option>
                    <option>Class 11-12</option>
                    <option>JEE</option>
                    <option>NEET</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#1C2B22]">Subject</label>
                  <select className="w-full rounded-md border border-[#1C2B22]/15 px-4 py-2.5 text-sm outline-none focus:border-[#D79A2C]">
                    <option>Select subject</option>
                    <option>Mathematics</option>
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>Biology</option>
                    <option>English</option>
                    <option>Science</option>
                    <option>Hindi</option>
                    <option>Social Science</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#1C2B22]">Board</label>
                  <select className="w-full rounded-md border border-[#1C2B22]/15 px-4 py-2.5 text-sm outline-none focus:border-[#D79A2C]">
                    <option>Select board</option>
                    <option>CBSE</option>
                    <option>ICSE</option>
                    <option>State Board</option>
                    <option>International</option>
                  </select>
                </div>
              </div>

              <Link
                href="/tutors?city=Delhi"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-[#D79A2C] py-3.5 text-base font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
              >
                <Search className="h-4 w-4" />
                Find tutor now
              </Link>
            </div>
          </div>
        </section>

        {/* ========== WHY CHOOSE YATTRA TUTORS ========== */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-14 text-center">
              <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-2`}>Why choose us</p>
              <h2 className={`${lora.className} text-3xl font-semibold text-[#1C2B22]`}>
                Why choose Yattra Tutors for home tuition in Delhi
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-[#58646C]">
                We connect families with verified, experienced tutors who deliver measurable results
              </p>
            </div>

            <div className="divide-y divide-[#1C2B22]/[.06] rounded-lg border border-[#1C2B22]/10 bg-white">
              {[
                { icon: <ShieldCheck className="h-5 w-5" />, title: "Verified tutors", description: "Background-checked tutors with verified qualifications and references" },
                { icon: <Target className="h-5 w-5" />, title: "Personalized learning", description: "One-to-one classes tailored to your child's learning pace and style" },
                { icon: <Users className="h-5 w-5" />, title: "Experienced teachers", description: "Qualified tutors with a proven track record in academic excellence" },
                { icon: <Clock className="h-5 w-5" />, title: "Flexible timings", description: "Choose convenient time slots that fit your family schedule" },
                { icon: <BookOpen className="h-5 w-5" />, title: "Subject specialists", description: "Expert tutors for Maths, Science, English and all subjects" },
                { icon: <Award className="h-5 w-5" />, title: "Affordable fees", description: "Transparent pricing with options to suit different budgets" },
                { icon: <Heart className="h-5 w-5" />, title: "Parent-friendly", description: "Free demo class and easy tutor replacement if not satisfied" },
                { icon: <MapPin className="h-5 w-5" />, title: "Local matching", description: "Tutors available in your exact neighborhood across Delhi" },
              ].map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-6"
                >
                  <div className="mt-0.5 text-[#D79A2C]">{feature.icon}</div>
                  <div>
                    <h3 className="font-semibold text-[#1C2B22]">{feature.title}</h3>
                    <p className="mt-1 text-sm text-[#58646C]">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== CLASSES / ACADEMIC CATEGORIES ========== */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-14 text-center">
              <h2 className={`${lora.className} text-3xl font-semibold text-[#1C2B22]`}>
                Home tuition for all classes &amp; boards
              </h2>
              <p className="mt-2 text-sm text-[#58646C]">From primary classes to competitive exams</p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {[
                { name: "Class 1-5", link: "/tutors?class=1-5&city=Delhi" },
                { name: "Class 6-8", link: "/tutors?class=6-8&city=Delhi" },
                { name: "Class 9-10", link: "/tutors?class=9-10&city=Delhi" },
                { name: "Class 11-12", link: "/tutors?class=11-12&city=Delhi" },
                { name: "JEE Foundation", link: "/tutors?exam=JEE&city=Delhi" },
                { name: "JEE Main & Advanced", link: "/tutors?exam=JEE&city=Delhi" },
                { name: "NEET", link: "/tutors?exam=NEET&city=Delhi" },
                { name: "CBSE", link: "/tutors?board=CBSE&city=Delhi" },
                { name: "ICSE / ISC", link: "/tutors?board=ICSE&city=Delhi" },
                { name: "State Boards", link: "/tutors?city=Delhi" },
                { name: "International Boards", link: "/tutors?city=Delhi" },
                { name: "Competitive Exams", link: "/tutors?city=Delhi" },
              ].map((category) => (
                <Link
                  key={category.name}
                  href={category.link}
                  className="rounded-md border border-[#1C2B22]/10 bg-white px-4 py-4 text-center text-sm font-medium text-[#1C2B22] transition-colors hover:border-[#D79A2C]/50"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ========== SUBJECT-WISE TUTORS ========== */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-14 text-center">
              <h2 className={`${lora.className} text-3xl font-semibold text-[#1C2B22]`}>Find tutors by subject</h2>
              <p className="mt-2 text-sm text-[#58646C]">Expert subject specialists available in Delhi</p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {[
                "Maths Tutor", "Science Tutor", "Physics Tutor", "Chemistry Tutor",
                "Biology Tutor", "English Tutor", "Computer Science Tutor", "Hindi Tutor",
                "Social Science Tutor", "Accountancy Tutor", "Economics Tutor", "Commerce Tutor",
              ].map((subject) => (
                <Link
                  key={subject}
                  href={`/tutors?subject=${encodeURIComponent(subject.replace(" Tutor", ""))}&city=Delhi`}
                  className="rounded-md border border-[#1C2B22]/10 bg-white px-4 py-4 text-center text-sm font-medium text-[#1C2B22] transition-colors hover:border-[#D79A2C]/50"
                >
                  {subject}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ========== DELHI LOCAL AREA SECTION ========== */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-14 text-center">
              <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-2`}>Local coverage</p>
              <h2 className={`${lora.className} text-3xl font-semibold text-[#1C2B22]`}>
                Find home tutors across Delhi
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-[#58646C]">
                We cover all major localities in Delhi with verified, experienced tutors
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {areaKeys.map((key) => {
                const area = DELHI_AREAS[key];
                if (!area) return null;
                return (
                  <Link
                    key={key}
                    href={`/delhi/${key}`}
                    className="rounded-lg border border-[#1C2B22]/10 bg-white p-6 transition-colors hover:border-[#D79A2C]/50"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className={`${lora.className} text-lg font-semibold text-[#1C2B22]`}>{area.name}</h3>
                      <span className="text-xs text-[#9AA3AB]">Delhi</span>
                    </div>

                    <p className="mb-4 line-clamp-2 text-sm text-[#58646C]">
                      {area.introduction.substring(0, 100)}...
                    </p>

                    <p className="mb-4 text-xs text-[#9AA3AB]">
                      {area.localities.slice(0, 3).join(" · ")}
                      {area.localities.length > 3 && ` + ${area.localities.length - 3} more`}
                    </p>

                    <div className="flex items-center justify-between border-t border-[#1C2B22]/[.06] pt-4">
                      <span className="text-sm font-semibold text-[#8a5f18]">Find tutors</span>
                      <ArrowRight className="h-4 w-4 text-[#8a5f18]" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========== HOW IT WORKS ========== */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-14 text-center">
              <h2 className={`${lora.className} text-3xl font-semibold text-[#1C2B22]`}>How Yattra Tutors works</h2>
              <p className="mt-2 text-sm text-[#58646C]">Get started in 4 simple steps</p>
            </div>

            <div className="grid grid-cols-1 divide-y divide-[#1C2B22]/[.06] rounded-lg border border-[#1C2B22]/10 bg-white md:grid-cols-4 md:divide-y-0">
              {[
                { step: "01", title: "Tell us your requirements", description: "Share your class, subject, board, and locality details" },
                { step: "02", title: "Get matched with tutors", description: "We find 2-3 verified tutors in your area within 24 hours" },
                { step: "03", title: "Take a free demo", description: "Evaluate teaching style and subject expertise before deciding" },
                { step: "04", title: "Start learning", description: "Begin personalized one-to-one home tuition with your chosen tutor" },
              ].map((item, idx) => (
                <div key={item.step} className={`p-6 ${idx > 0 ? "md:border-l md:border-[#1C2B22]/[.06]" : ""}`}>
                  <span className={`${lora.className} text-sm font-semibold text-[#D79A2C]`}>{item.step}</span>
                  <h3 className="mt-2 font-semibold text-[#1C2B22]">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-[#58646C]">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/tutors?city=Delhi"
                className="inline-flex items-center gap-2 rounded-md bg-[#D79A2C] px-8 py-3.5 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
              >
                <Search className="h-4 w-4" />
                Get started now
              </Link>
            </div>
          </div>
        </section>

        {/* ========== FAQ SECTION ========== */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-4">
            <div className="mb-10 text-center">
              <h2 className={`${lora.className} text-3xl font-semibold text-[#1C2B22]`}>Frequently asked questions</h2>
              <p className="mt-2 text-sm text-[#58646C]">Everything you need to know about home tuition in Delhi</p>
            </div>

            <div className="rounded-lg border border-[#1C2B22]/10 bg-white px-6">
              {FAQS.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ========== FINAL CTA ========== */}
        <section className="bg-[#0E211C] py-20 text-white">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className={`${lora.className} text-3xl font-semibold sm:text-4xl`}>
              Ready to find your perfect home tutor?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[#AAB6A2]">
              Join thousands of families across Delhi who trust Yattra Tutors for quality home tuition
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/tutors?city=Delhi"
                className="inline-flex items-center gap-2 rounded-md bg-[#D79A2C] px-7 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
              >
                <Search className="h-4 w-4" />
                Find a tutor
              </Link>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_DEFAULT_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-[#3f8a5f] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#357a52]"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp us
              </a>

              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex items-center gap-2 rounded-md border border-white/20 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
              >
                <Phone className="h-4 w-4" />
                Call us
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
