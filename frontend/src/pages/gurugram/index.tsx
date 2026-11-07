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
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Search,
  ChevronDown,
  Zap,
  Target,
} from "lucide-react";

import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/landing/Footer";
import { GURUGRAM_AREAS } from "@/lib/gurugram/gurugramAreas";

/* =========================
   CONSTANTS
========================= */
const PHONE_NUMBER = "+916363453870";
const WHATSAPP_NUMBER = "916363453870";
const WHATSAPP_DEFAULT_MSG = "Hello%2C%20I%20need%20a%20home%20tutor%20in%20Gurugram";
const GOOGLE_BUSINESS_LINK = "https://share.google/9srzoEeknq8tpchsp";

const TUTOR_COUNT = 1500;
const HAPPY_FAMILIES = 12000;

/* =========================
   FAQ DATA
========================= */
const FAQS = [
  {
    q: "How can I find a home tutor in Gurugram (Gurgaon)?",
    a: "Simply visit Yattra Tutors, select your area in Gurugram (like DLF Phase, Golf Course Road, Sushant Lok, etc.), choose your class and subject requirements, and we'll connect you with verified tutors in your locality within 24 hours. You can take a free demo class before confirming.",
  },
  {
    q: "Are tutors on Yattra Tutors background verified?",
    a: "Yes, absolutely. Every tutor on Yattra Tutors undergoes a comprehensive verification process including ID proof check, qualification verification, and reference checks. We also continuously collect parent feedback to maintain quality.",
  },
  {
    q: "What subjects and classes do you cover in Gurugram?",
    a: "We cover all subjects from Class 1 to Class 12 including Maths, Science, Physics, Chemistry, Biology, English, Hindi, Social Science, and more. We also provide specialized tutors for JEE, NEET, CBSE, ICSE, and competitive exam preparation.",
  },
  {
    q: "Can I get a free demo class?",
    a: "Yes! Yattra Tutors offers a completely free demo class with your selected tutor. You can evaluate their teaching style, communication, and subject expertise before making any payment commitment.",
  },
  {
    q: "What are the home tuition fees in Gurugram?",
    a: "Home tuition fees in Gurugram typically range from ₹600 to ₹2500 per month depending on class level, subject, tutor experience, and location. Contact us for a customized quote based on your specific requirements.",
  },
  {
    q: "Do you provide female tutors in Gurugram?",
    a: "Yes, we have both male and female tutors available across all areas of Gurugram. You can specify your preference when making a tutor request, and we'll match you accordingly.",
  },
  {
    q: "How quickly can I get a tutor in Gurugram?",
    a: "Typically within 24 to 48 hours. We match you with 2-3 verified tutors based on your requirements, and you can take a free demo class to decide which tutor suits best.",
  },
  {
    q: "Do you provide tutors for CBSE and ICSE boards in Gurgaon?",
    a: "Yes, we have experienced tutors for both CBSE and ICSE boards across all areas of Gurgaon. Our tutors are familiar with the respective board syllabus and examination patterns.",
  },
  {
    q: "Can I get a JEE or NEET tutor in Gurugram?",
    a: "Absolutely. Yattra Tutors has specialized JEE and NEET tutors in Gurugram who provide focused coaching for Physics, Chemistry, Maths, and Biology with proven teaching methods and regular test preparation.",
  },
  {
    q: "Which areas of Gurugram do you cover?",
    a: "We cover all major areas of Gurugram including DLF Phase 1-5, Golf Course Road, Sushant Lok, Sohna Road, MG Road, Palam Vihar, Old Gurgaon, Dwarka Expressway, New Gurgaon, Manesar, and all nearby sectors.",
  },
];

const WHY_US = [
  { icon: ShieldCheck, title: "Verified tutors", description: "Background-checked tutors with verified qualifications and references" },
  { icon: Target, title: "Personalized learning", description: "One-to-one classes tailored to your child's learning pace and style" },
  { icon: Users, title: "Experienced teachers", description: "Qualified tutors with a proven track record in academic excellence" },
  { icon: Clock, title: "Flexible timings", description: "Choose convenient time slots that fit your family schedule" },
  { icon: BookOpen, title: "Subject specialists", description: "Expert tutors for Maths, Science, English and all subjects" },
  { icon: Award, title: "Affordable fees", description: "Transparent pricing with options to suit different budgets" },
  { icon: Heart, title: "Parent-friendly", description: "Free demo class and easy tutor replacement if not satisfied" },
  { icon: MapPin, title: "Local matching", description: "Tutors available in your exact neighborhood across Gurugram" },
];

const CLASS_CATEGORIES = [
  { name: "Class 1-5", link: "/tutors?class=1-5&city=Gurugram" },
  { name: "Class 6-8", link: "/tutors?class=6-8&city=Gurugram" },
  { name: "Class 9-10", link: "/tutors?class=9-10&city=Gurugram" },
  { name: "Class 11-12", link: "/tutors?class=11-12&city=Gurugram" },
  { name: "JEE Foundation", link: "/tutors?exam=JEE&city=Gurugram" },
  { name: "JEE Main & Advanced", link: "/tutors?exam=JEE&city=Gurugram" },
  { name: "NEET", link: "/tutors?exam=NEET&city=Gurugram" },
  { name: "CBSE", link: "/tutors?board=CBSE&city=Gurugram" },
  { name: "ICSE / ISC", link: "/tutors?board=ICSE&city=Gurugram" },
  { name: "State Boards", link: "/tutors?city=Gurugram" },
  { name: "International Boards", link: "/tutors?city=Gurugram" },
  { name: "Competitive Exams", link: "/tutors?city=Gurugram" },
];

const SUBJECTS = [
  "Maths", "Science", "Physics", "Chemistry", "Biology", "English",
  "Computer Science", "Hindi", "Social Science", "Accountancy", "Economics", "Commerce",
];

const STEPS = [
  { num: "01", title: "Tell us what you need", description: "Share your requirements: class, subject, area, and preferred timings", icon: Search },
  { num: "02", title: "Get matched with tutors", description: "We connect you with 2-3 verified tutors based on your needs", icon: Users },
  { num: "03", title: "Take a free demo class", description: "Evaluate the tutor's teaching style with a complimentary trial class", icon: GraduationCap },
  { num: "04", title: "Start learning", description: "Begin your personalized learning journey at home", icon: CheckCircle },
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
        <span className="text-[15px] font-medium text-[#1C2B22]">{q}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-[#D79A2C] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <p className="pb-5 text-sm leading-relaxed text-[#58646C]">{a}</p>}
    </div>
  );
}

/* =========================
   MAIN PAGE
========================= */
export default function GurugramCityPage() {
  const areaKeys = Object.keys(GURUGRAM_AREAS);

  return (
    <>
      <Head>
        <title>Home Tutor in Gurugram (Gurgaon) | Home Tuition | Yattra Tutors</title>
        <meta
          name="description"
          content="Find verified home tutors in Gurugram (Gurgaon) for Class 1-12, CBSE, ICSE, JEE, NEET. Expert home tuition across DLF Phase, Golf Course Road, Sushant Lok and all areas. Free demo class."
        />
        <meta
          name="keywords"
          content="home tutor in Gurugram, home tutor in Gurgaon, home tuition in Gurugram, private tutor Gurugram, home tutor near me Gurgaon, CBSE tutor Gurugram, ICSE tutor Gurgaon, JEE tutor Gurugram, NEET tutor Gurgaon, home tuition near me, best home tutor Gurugram"
        />
        <link rel="canonical" href="https://yattratutors.com/gurugram" />

        {/* Open Graph */}
        <meta property="og:title" content="Home Tutor in Gurugram (Gurgaon) | Yattra Tutors" />
        <meta
          property="og:description"
          content="Find verified home tutors in Gurugram for all classes, CBSE, ICSE, JEE, NEET. Book free demo class."
        />
        <meta property="og:url" content="https://yattratutors.com/gurugram" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home Tutor in Gurugram (Gurgaon) | Yattra Tutors" />
        <meta
          name="twitter:description"
          content="Find verified home tutors in Gurugram for all classes. Free demo class available."
        />
      </Head>

      <div className={`min-h-screen bg-[#F7F2E9] ${dmSans.className}`}>
        <NavBar />

        {/* ========== HERO SECTION ========== */}
        <section className="relative overflow-hidden bg-[#0E211C] py-20 sm:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[.04]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative z-10 mx-auto max-w-6xl px-4">
            {/* Google Rating */}
            <motion.a
              href={GOOGLE_BUSINESS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10 inline-flex items-center gap-3 rounded-md border border-white/15 bg-white/5 px-5 py-3 transition-colors hover:bg-white/10"
            >
              <Star className="h-4 w-4 fill-[#D79A2C] text-[#D79A2C]" />
              <span className="text-sm font-semibold text-white">5.0 / 5 on Google Reviews</span>
              <ArrowRight className="h-4 w-4 text-[#AAB6A2]" />
            </motion.a>

            <div className="flex flex-col gap-14 lg:flex-row lg:items-center">
              {/* Left Content */}
              <div className="flex-1">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <p className={`${lora.className} italic text-sm text-[#AAB6A2] mb-3`}>Gurugram (Gurgaon)</p>
                  <h1 className={`${lora.className} text-4xl font-semibold text-white sm:text-5xl lg:text-6xl`}>
                    Find the right home tutor in Gurugram
                  </h1>

                  <p className="mt-6 max-w-xl text-base leading-relaxed text-[#AAB6A2]">
                    Connect with verified tutors for Class 1–12, CBSE, ICSE, JEE, NEET and other academic needs.
                    Get personalized one-to-one learning at your home.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-[#AAB6A2]">
                    <span>Verified tutors</span>
                    <span>·</span>
                    <span>5/5 rating</span>
                    <span>·</span>
                    <span>Free demo class</span>
                    <span>·</span>
                    <span>Result focused</span>
                  </div>

                  {/* CTAs */}
                  <div className="mt-9 flex flex-wrap gap-3">
                    <Link
                      href="/tutors?city=Gurugram&source=GURUGRAM_HERO"
                      className="inline-flex items-center gap-2 rounded-md bg-[#D79A2C] px-6 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
                    >
                      <Search className="h-4 w-4" />
                      Find a tutor
                    </Link>

                    <Link
                      href="/find-students?source=GURUGRAM_HERO"
                      className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40"
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
                transition={{ delay: 0.25 }}
                className="shrink-0 rounded-md border border-white/10 bg-white/5 lg:w-[320px]"
              >
                <div className="border-b border-white/10 px-6 py-4">
                  <h3 className={`${lora.className} text-sm font-semibold text-white`}>Live tutor network</h3>
                </div>
                <div className="divide-y divide-white/[.08] px-6">
                  {[
                    { icon: Users, label: "Active tutors", value: `${TUTOR_COUNT}+` },
                    { icon: Heart, label: "Happy families", value: `${HAPPY_FAMILIES}+` },
                    { icon: Star, label: "Google rating", value: "5.0/5" },
                    { icon: Zap, label: "Match time", value: "24 hrs" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between py-3.5">
                      <span className="flex items-center gap-2.5 text-sm text-[#AAB6A2]">
                        <stat.icon className="h-4 w-4 text-[#D79A2C]" />
                        {stat.label}
                      </span>
                      <span className={`${lora.className} text-base font-semibold text-white`}>{stat.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========== SEARCH / FIND TUTOR SECTION ========== */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4">
            <div className="mb-8 text-center">
              <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22] sm:text-3xl`}>
                Find your perfect tutor
              </h2>
              <p className="mt-2 text-sm text-[#58646C]">Search by area, class, subject, or board</p>
            </div>

            <div className="rounded-lg border border-[#1C2B22]/10 bg-white p-6 sm:p-8">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#1C2B22]">City / area</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9AA3AB]" />
                    <input
                      type="text"
                      placeholder="DLF Phase, Sushant Lok..."
                      className="w-full rounded-md border border-[#1C2B22]/15 py-2.5 pl-9 pr-3 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#1C2B22]">Class</label>
                  <select className="w-full rounded-md border border-[#1C2B22]/15 px-3 py-2.5 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]">
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
                  <select className="w-full rounded-md border border-[#1C2B22]/15 px-3 py-2.5 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]">
                    <option>Select subject</option>
                    <option>Mathematics</option>
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>Biology</option>
                    <option>English</option>
                    <option>Science</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#1C2B22]">Board</label>
                  <select className="w-full rounded-md border border-[#1C2B22]/15 px-3 py-2.5 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]">
                    <option>Select board</option>
                    <option>CBSE</option>
                    <option>ICSE</option>
                    <option>State Board</option>
                    <option>International</option>
                  </select>
                </div>
              </div>

              <Link
                href="/tutors?city=Gurugram"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-[#D79A2C] py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
              >
                <Search className="h-4 w-4" />
                Find tutor now
              </Link>
            </div>
          </div>
        </section>

        {/* ========== WHY CHOOSE YATTRA TUTORS ========== */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-12 text-center">
              <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-3`}>Why choose us</p>
              <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22] sm:text-3xl`}>
                Why choose Yattra Tutors for home tuition in Gurugram?
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-[#58646C]">
                We connect families with verified, experienced tutors who deliver measurable results.
              </p>
            </div>

            <div className="grid grid-cols-1 divide-y divide-[#1C2B22]/[.08] border border-[#1C2B22]/10 rounded-lg sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
              {WHY_US.map((feature, idx) => (
                <div
                  key={feature.title}
                  className={`p-6 ${idx % 2 === 0 ? "sm:border-r sm:border-[#1C2B22]/[.08]" : ""} ${
                    idx % 4 !== 3 ? "lg:border-r lg:border-[#1C2B22]/[.08]" : ""
                  }`}
                >
                  <feature.icon className="mb-3 h-5 w-5 text-[#D79A2C]" />
                  <h3 className="mb-1.5 text-base font-semibold text-[#1C2B22]">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-[#58646C]">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== CLASSES / ACADEMIC CATEGORIES ========== */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-10 text-center">
              <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22] sm:text-3xl`}>
                Home tuition for all classes &amp; boards
              </h2>
              <p className="mt-2 text-sm text-[#58646C]">From primary classes to competitive exams</p>
            </div>

            <div className="grid grid-cols-2 divide-x divide-y divide-[#1C2B22]/[.08] overflow-hidden rounded-lg border border-[#1C2B22]/10 bg-white sm:grid-cols-3 lg:grid-cols-4">
              {CLASS_CATEGORIES.map((category) => (
                <Link
                  key={category.name}
                  href={category.link}
                  className="p-5 text-center text-sm font-medium text-[#1C2B22] transition-colors hover:bg-[#F7F2E9] hover:text-[#8a5f18]"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ========== SUBJECT-WISE TUTORS ========== */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-10 text-center">
              <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22] sm:text-3xl`}>
                Find tutors by subject
              </h2>
              <p className="mt-2 text-sm text-[#58646C]">Expert subject specialists available in Gurugram</p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {SUBJECTS.map((subject) => (
                <Link
                  key={subject}
                  href={`/tutors?subject=${encodeURIComponent(subject)}&city=Gurugram`}
                  className="rounded-full border border-[#1C2B22]/15 px-4 py-2 text-sm font-medium text-[#1C2B22] transition-colors hover:border-[#D79A2C] hover:text-[#8a5f18]"
                >
                  {subject}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ========== GURUGRAM LOCAL AREA SECTION ========== */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-12 text-center">
              <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-3`}>Local coverage</p>
              <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22] sm:text-3xl`}>
                Find home tutors across Gurugram
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-[#58646C]">
                We cover all major localities in Gurugram (Gurgaon) with verified, experienced tutors.
              </p>
            </div>

            <div className="mb-10 grid grid-cols-1 divide-y divide-[#1C2B22]/[.08] rounded-lg border border-[#1C2B22]/10 bg-white sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-3">
              {areaKeys.map((areaKey, idx) => {
                const area = GURUGRAM_AREAS[areaKey];
                if (!area) return null;
                return (
                  <Link
                    key={area.slug}
                    href={`/gurugram/${area.slug}`}
                    className={`group p-6 transition-colors hover:bg-[#F7F2E9] sm:border-r sm:border-[#1C2B22]/[.08] ${
                      idx % 3 !== 2 ? "lg:border-r" : "lg:border-r-0"
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-base font-semibold text-[#1C2B22] group-hover:text-[#8a5f18]">
                        {area.displayName}
                      </h3>
                      <ArrowRight className="h-4 w-4 text-[#D79A2C] opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <p className="mb-2 line-clamp-2 text-xs leading-relaxed text-[#58646C]">
                      Home tutors for CBSE, ICSE, JEE, NEET in {area.name}
                    </p>
                    <p className="text-xs font-medium text-[#8a5f18]">{area.localities.length} localities</p>
                  </Link>
                );
              })}
            </div>

            {/* Can't Find Area */}
            <div className="mx-auto max-w-xl rounded-lg border border-dashed border-[#1C2B22]/20 bg-white p-8 text-center">
              <h3 className={`${lora.className} mb-2 text-lg font-semibold text-[#1C2B22]`}>
                Can&rsquo;t find your area?
              </h3>
              <p className="mb-6 text-sm text-[#58646C]">
                Tell us your locality and we&rsquo;ll help you find a suitable tutor nearby.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/tutors?city=Gurugram"
                  className="inline-flex items-center gap-2 rounded-md bg-[#D79A2C] px-5 py-2.5 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
                >
                  <Search className="h-4 w-4" />
                  Find a tutor
                </Link>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_DEFAULT_MSG}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-[#1C2B22]/15 px-5 py-2.5 text-sm font-semibold text-[#1C2B22] transition-colors hover:border-[#D79A2C]/50"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========== HOW IT WORKS ========== */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-14 text-center">
              <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22] sm:text-3xl`}>
                How Yattra Tutors works
              </h2>
              <p className="mt-2 text-sm text-[#58646C]">Get matched with the perfect tutor in 4 simple steps</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {STEPS.map((item) => (
                <div key={item.num} className="text-center">
                  <div className={`${lora.className} mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0E211C] text-base font-semibold text-[#D79A2C]`}>
                    {item.num}
                  </div>
                  <h3 className="mb-1.5 text-base font-semibold text-[#1C2B22]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[#58646C]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== CTA SECTION ========== */}
        <section className="relative overflow-hidden bg-[#0E211C] py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[.04]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
          <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
            <h2 className={`${lora.className} text-3xl font-semibold text-white sm:text-4xl`}>
              Find your perfect home tutor in Gurugram today
            </h2>
            <p className="mx-auto mb-10 mt-4 max-w-xl text-sm text-[#AAB6A2]">
              Join thousands of satisfied families across Gurugram who trust Yattra Tutors for quality home tuition.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/tutors?city=Gurugram"
                className="inline-flex items-center gap-2 rounded-md bg-[#D79A2C] px-7 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
              >
                <Search className="h-4 w-4" />
                Find a tutor
              </Link>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex items-center gap-2 rounded-md border border-white/20 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40"
              >
                <Phone className="h-4 w-4" />
                Call now
              </a>
            </div>
          </div>
        </section>

        {/* ========== FAQ SECTION ========== */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-4">
            <div className="mb-10 text-center">
              <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22] sm:text-3xl`}>
                Frequently asked questions
              </h2>
              <p className="mt-2 text-sm text-[#58646C]">Everything you need to know about home tuition in Gurugram</p>
            </div>

            <div className="rounded-lg border border-[#1C2B22]/10 bg-white px-6">
              {FAQS.map((faq, idx) => (
                <FAQItem key={idx} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ========== SEO CONTENT (HIDDEN) ========== */}
        <section className="sr-only" aria-hidden="false">
          <div className="max-w-7xl mx-auto px-6">
            <h2>Home Tutors in Gurugram (Gurgaon) – Complete Guide</h2>

            <h3>Best Home Tutors in Gurugram for CBSE, ICSE, NEET & JEE</h3>
            <p>
              Yattra Tutors provides verified home tutors in Gurugram (Gurgaon) for all classes from Class 1 to Class 12.
              Our tutors cover CBSE, ICSE, ISC, and State Board syllabus across all major subjects including
              Mathematics, Physics, Chemistry, Biology, English, Hindi, and Social Science. We specialize in
              providing personalized one-to-one home tuition that delivers measurable academic results.
            </p>

            <h3>Home Tutors in Gurugram by Area</h3>
            <ul>
              <li>Home tutor in DLF Phase Gurgaon (Phase 1, 2, 3, 4, 5, DLF City)</li>
              <li>Home tutor in Golf Course Road Gurugram (Sectors 53, 54, 55, 56)</li>
              <li>Home tutor in MG Road and Sikanderpur Gurgaon</li>
              <li>Home tutor in Sushant Lok Gurugram (Sushant Lok 1, 2, 3, South City)</li>
              <li>Home tutor in Sohna Road Gurgaon (Sectors 47-71)</li>
              <li>Home tutor in Palam Vihar Gurugram (Sectors 21, 22, 23)</li>
              <li>Home tutor in Old Gurgaon (Sectors 14-18)</li>
              <li>Home tutor in Dwarka Expressway Gurugram (Sectors 81-93)</li>
              <li>Home tutor in New Gurgaon (Sectors 90-105)</li>
              <li>Home tutor in Manesar Gurgaon (IMT Manesar)</li>
            </ul>

            <h3>Home Tutors by Subject in Gurugram</h3>
            <ul>
              <li>Mathematics home tutor in Gurugram for all classes</li>
              <li>Physics home tutor in Gurgaon for Class 11, 12, JEE</li>
              <li>Chemistry home tutor in Gurugram for NEET, JEE, CBSE</li>
              <li>Biology home tutor in Gurgaon for NEET, Class 11, 12</li>
              <li>English home tutor in Gurugram for all classes</li>
              <li>Hindi home tutor in Gurgaon for CBSE students</li>
              <li>Science home tutor in Gurugram for Class 6, 7, 8, 9, 10</li>
              <li>Accountancy and Commerce tutor in Gurgaon</li>
              <li>Computer Science tutor in Gurugram</li>
              <li>Social Science tutor in Gurgaon</li>
            </ul>

            <h3>Competitive Exam Tutors in Gurugram</h3>
            <ul>
              <li>JEE Main and JEE Advanced home tutor in Gurugram</li>
              <li>NEET home tutor in Gurgaon for medical entrance preparation</li>
              <li>Foundation courses for JEE and NEET in Gurugram</li>
              <li>CUET tutor in Gurgaon</li>
              <li>Olympiad preparation tutor in Gurugram</li>
              <li>NTSE coaching at home in Gurgaon</li>
            </ul>

            <h3>Home Tutors for Top Schools in Gurugram</h3>
            <ul>
              <li>Tutor for DPS DLF City Gurgaon students</li>
              <li>Tutor for The Shri Ram School Gurugram</li>
              <li>Tutor for Pathways World School Gurgaon</li>
              <li>Tutor for Scottish High International School Gurugram</li>
              <li>Tutor for GD Goenka Public School Gurgaon</li>
              <li>Tutor for Shiv Nadar School Gurugram</li>
              <li>Tutor for Lancers International School Gurgaon</li>
              <li>Tutor for Amity International School Gurugram</li>
              <li>Tutor for Suncity School Gurgaon</li>
              <li>Tutor for DAV Public School Gurugram</li>
            </ul>

            <h3>Why Choose Yattra Tutors for Home Tutoring in Gurugram?</h3>
            <p>
              Yattra Tutors is Gurugram's most trusted home tutoring platform with 1500+ verified tutors
              available across all localities. Every tutor is background checked, qualification verified,
              and parent approved. We offer a free demo class before any commitment, flexible scheduling,
              and weekly progress tracking for every student. Our tutors understand the competitive
              academic environment of Gurgaon and provide result-focused home tuition.
            </p>

            <h3>Frequently Asked Questions – Home Tutors in Gurugram</h3>
            <dl>
              <dt>How much does a home tutor cost in Gurugram?</dt>
              <dd>
                Home tutor fees in Gurugram range from ₹600 to ₹2500 per month depending on the subject,
                class level, tutor experience, and location. Premium areas like DLF Phase and Golf Course Road
                may have slightly higher rates. Contact Yattra Tutors for a free customized quote.
              </dd>

              <dt>How do I find a verified home tutor in Gurgaon?</dt>
              <dd>
                Visit Yattra Tutors and select your area in Gurugram, class, and subject. We match you with 2 to 3
                verified tutors within 24 hours. You can review their profiles, qualifications, and take a
                free demo class before confirming.
              </dd>

              <dt>Are Yattra Tutors tutors available for home visits in DLF Phase and Sushant Lok?</dt>
              <dd>
                Yes. Yattra Tutors has verified home tutors available in DLF Phase 1-5, Sushant Lok 1-3, Golf Course Road,
                MG Road, Sohna Road, and all other major localities of Gurugram. Our tutors provide home-based
                tuition at your convenience.
              </dd>

              <dt>Can I get a female tutor for home tuition in Gurugram?</dt>
              <dd>
                Yes, you can specify your preference for a male or female tutor when making your request.
                We have both male and female tutors available across all subjects and areas in Gurugram.
              </dd>

              <dt>Do you provide CBSE and ICSE tutors in Gurgaon?</dt>
              <dd>
                Yes, we have experienced tutors for both CBSE and ICSE boards across all classes and subjects
                in Gurgaon. Our tutors are familiar with the respective board patterns and syllabus.
              </dd>
            </dl>
          </div>
        </section>

        <Footer />
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": FAQS.map((faq) => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a,
              },
            })),
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Yattra Tutors Home Tuition Gurugram",
            "description": "Find verified home tutors in Gurugram (Gurgaon) for Class 1-12, CBSE, ICSE, JEE, NEET",
            "url": "https://yattratutors.com/gurugram",
            "telephone": PHONE_NUMBER,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Gurugram",
              "addressRegion": "Haryana",
              "addressCountry": "IN",
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "reviewCount": "250",
            },
            "areaServed": [
              {
                "@type": "City",
                "name": "Gurugram",
              },
              {
                "@type": "City",
                "name": "Gurgaon",
              },
            ],
          }),
        }}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 86400, // Revalidate once per day
  };
};
