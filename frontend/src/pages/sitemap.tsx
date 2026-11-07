import React, { useState } from "react";
import Link from "next/link";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/landing/Footer";
import { lora, dmSans } from "@/lib/fonts";
import {
  FaBook,
  FaUserGraduate,
  FaFileAlt,
  FaClipboardList,
  FaMapMarkerAlt,
  FaGlobe,
  FaEnvelope,
  FaPhone,
  FaChevronDown,
  FaChevronRight,
  FaBrain,
  FaCalculator,
  FaLanguage,
  FaFemale,
  FaHome,
  FaLaptop,
  FaGraduationCap,
  FaCode,
  FaPaintBrush,
  FaBusinessTime,
  FaShieldAlt,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";

/* ═══════════════════════════════════════════════
   DATA — CITIES
═══════════════════════════════════════════════ */

const runningCities = [
  { name: "Prayagraj", slug: "allahabad", state: "UP" },
  { name: "Varanasi", slug: "india/banaras", state: "UP" },
  { name: "Lucknow", slug: "lucknow", state: "UP" },
  { name: "Kanpur", slug: "kanpur", state: "UP" },
  { name: "Noida", slug: "india/noida", state: "UP" },
  { name: "Agra", slug: "india/agra", state: "UP" },
  { name: "Meerut", slug: "india/meerut", state: "UP" },
];

const upcomingCities = [
  { name: "Delhi", slug: "india/delhi", state: "Delhi" },
  { name: "Gurugram", slug: "india/gurugram", state: "HR" },
  { name: "Faridabad", slug: "india/faridabad", state: "HR" },
  { name: "Jaipur", slug: "india/jaipur", state: "RJ" },
  { name: "Jodhpur", slug: "india/jodhpur", state: "RJ" },
  { name: "Udaipur", slug: "india/udaipur", state: "RJ" },
  { name: "Kota", slug: "india/kota", state: "RJ" },
  { name: "Patna", slug: "india/patna", state: "BR" },
  { name: "Ranchi", slug: "india/ranchi", state: "JH" },
  { name: "Bhopal", slug: "india/bhopal", state: "MP" },
  { name: "Indore", slug: "india/indore", state: "MP" },
  { name: "Nagpur", slug: "india/nagpur", state: "MH" },
];

/* ═══════════════════════════════════════════════
   DATA — SERVICES  (comprehensive)
═══════════════════════════════════════════════ */

const allServiceCategories = [
  {
    category: "Home & Private Tutors",
    icon: <FaHome />,
    services: ["Home Tutor", "Private Tutor", "Personal Tutor", "Individual Tutor", "One-on-One Tutor"],
  },
  {
    category: "Maths & Science",
    icon: <FaCalculator />,
    services: [
      "Maths Tutor", "Science Tutor", "Physics Tutor", "Chemistry Tutor",
      "Biology Tutor", "Statistics Tutor", "Algebra Tutor", "Geometry Tutor",
      "Calculus Tutor", "Trigonometry Tutor",
    ],
  },
  {
    category: "Competitive Exams",
    icon: <FaBrain />,
    services: [
      "JEE Tutor", "NEET Tutor", "UPSC Tutor", "NDA Tutor", "CDS Tutor",
      "SSC Tutor", "Bank PO Tutor", "CAT Tutor", "GMAT Tutor", "GRE Tutor",
      "CLAT Tutor", "CUET Tutor",
    ],
  },
  {
    category: "Board Exam Tutors",
    icon: <FaBook />,
    services: [
      "CBSE Tutor", "ICSE Tutor", "ISC Tutor", "UP Board Tutor",
      "MP Board Tutor", "Bihar Board Tutor", "RBSE Tutor", "State Board Tutor",
    ],
  },
  {
    category: "Language & English",
    icon: <FaLanguage />,
    services: [
      "English Tutor", "Hindi Tutor", "Sanskrit Tutor", "French Tutor",
      "German Tutor", "Spanish Tutor", "English Speaking Tutor", "IELTS Tutor",
      "TOEFL Tutor", "Creative Writing Tutor",
    ],
  },
  {
    category: "Online Tutoring",
    icon: <FaLaptop />,
    services: [
      "Online Tuition", "Maths Online", "Science Online", "JEE Online Coaching",
      "NEET Online Coaching", "CBSE Online Tutor", "Online Home Tutor",
      "Live Online Classes", "Recorded Classes", "Online Test Series",
    ],
  },
  {
    category: "Female Tutors",
    icon: <FaFemale />,
    services: [
      "Female Tutor", "Female Home Tutor", "Female Maths Tutor",
      "Female Science Tutor", "Female English Tutor", "Female CBSE Tutor",
      "Female JEE Tutor", "Female NEET Tutor",
    ],
  },
  {
    category: "School Level",
    icon: <FaGraduationCap />,
    services: [
      "Primary Tutor", "Class 6 Tutor", "Class 7 Tutor", "Class 8 Tutor",
      "Class 9 Tutor", "Class 10 Tutor", "Class 11 Tutor", "Class 12 Tutor",
      "Nursery Tutor", "Kindergarten Tutor", "Playgroup Tutor",
    ],
  },
  {
    category: "Coding & Tech",
    icon: <FaCode />,
    services: [
      "Coding Tutor", "Python Tutor", "Java Tutor", "Web Development Tutor",
      "Computer Science Tutor", "AI & ML Tutor", "Data Science Tutor",
      "C++ Tutor", "App Development Tutor",
    ],
  },
  {
    category: "Arts, Music & Sports",
    icon: <FaPaintBrush />,
    services: [
      "Music Tutor", "Guitar Tutor", "Keyboard Tutor", "Violin Tutor",
      "Drawing & Painting Tutor", "Dance Tutor", "Chess Tutor",
      "Yoga Tutor", "Sports Coach", "Drama Tutor",
    ],
  },
];

/* ═══════════════════════════════════════════════
   DATA — CITY-SPECIFIC LINKS (Offline)
═══════════════════════════════════════════════ */

const offlineDetailedLinks = [
  {
    city: "Prayagraj (Allahabad)",
    slug: "allahabad",
    areas: ["Civil Lines", "George Town", "Naini", "Phaphamau", "Jhunsi"],
    links: [
      { label: "Home Tutor", href: "/allahabad" },
      { label: "Maths Tutor", href: "/allahabad/allahabad/maths-tutor" },
      { label: "JEE Tutor", href: "/allahabad/allahabad/jee-tutor" },
      { label: "NEET Tutor", href: "/allahabad/allahabad/neet-tutor" },
      { label: "CBSE Tutor", href: "/allahabad/allahabad/cbse-tutor" },
      { label: "Female Tutor", href: "/allahabad/allahabad/female-tutor" },
    ],
  },
  {
    city: "Varanasi",
    slug: "india/banaras",
    areas: ["Mahmoorganj", "Lanka", "Sigra", "BHU Area", "Godowlia"],
    links: [
      { label: "Home Tutor", href: "/india/banaras" },
      { label: "Maths Tutor", href: "/india/banaras/mahmoorganj/math-tutor" },
      { label: "JEE Tutor", href: "/india/banaras/mahmoorganj/jee-tuto" },
      { label: "NEET Tutor", href: "/india/banaras/mahmoorganj/neet-tutor" },
      { label: "CBSE Tutor", href: "/india/banaras/sigra/cbse-tutor" },
      { label: "Science Tutor", href: "/india/banaras/lanka/science-tutor" },
    ],
  },
  {
    city: "Lucknow",
    slug: "lucknow",
    areas: ["Gomti Nagar", "Hazratganj", "Hasanganj", "Vibhuti Khand", "Aliganj"],
    links: [
      { label: "Home Tutor", href: "/lucknow" },
      { label: "ICSE Tutor", href: "/lucknow/Hasanganj/icse-tutor" },
      { label: "JEE Tutor", href: "/lucknow/Gomti%20Nagar/jee-tutor" },
      { label: "NEET Tutor", href: "/lucknow/Vibhuti%20Khand/neet-tutor" },
      { label: "CBSE Tutor", href: "/lucknow/Aliganj/cbse-tutor" },
      { label: "Female Tutor", href: "/lucknow/Hazratganj/female-tutor" },
    ],
  },
  {
    city: "Kanpur",
    slug: "kanpur",
    areas: ["Civil Lines", "Yashoda Nagar", "Kakadeo", "Swaroop Nagar", "Karachi Khana"],
    links: [
      { label: "Home Tutor", href: "/kanpur" },
      { label: "Private Tutor", href: "/kanpur/Civil%20Lines/private-tutor" },
      { label: "JEE Tutor", href: "/kanpur/Yashoda%20Nagar/jee-tutor" },
      { label: "NEET Tutor", href: "/kanpur/Karachi%20Khana/neet-tutor" },
      { label: "Maths Tutor", href: "/kanpur/Kakadeo/maths-tutor" },
      { label: "Science Tutor", href: "/kanpur/Swaroop%20Nagar/science-tutor" },
    ],
  },
  {
    city: "Noida",
    slug: "india/noida",
    areas: ["Sector 63", "Greater Noida West", "Techzone 4", "Sector 18", "Sector 50"],
    links: [
      { label: "Home Tutor", href: "/india/noida" },
      { label: "Private Tutor", href: "/india/noida/Sector%2063/private-tutor" },
      { label: "JEE Tutor", href: "/india/noida/Greater%20Noida%20West/jee-tutor" },
      { label: "NEET Tutor", href: "/india/noida/Techzone%204/neet-tutor" },
      { label: "CBSE Tutor", href: "/india/noida/Sector%2018/cbse-tutor" },
      { label: "Coding Tutor", href: "/india/noida/Sector%2050/coding-tutor" },
    ],
  },
  {
    city: "Agra",
    slug: "india/agra",
    areas: ["Civil Lines", "Mantola", "Kamla Nagar", "Tajganj", "Bodla"],
    links: [
      { label: "Home Tutor", href: "/india/agra" },
      { label: "Private Tutor", href: "/india/agra/Civil%20Lines/private-tutor" },
      { label: "JEE Tutor", href: "/india/agra/Mantola/jee-tutor" },
      { label: "NEET Tutor", href: "/india/agra/Kamla%20Nagar/neet-tutor" },
      { label: "Maths Tutor", href: "/india/agra/Tajganj/maths-tutor" },
      { label: "Female Tutor", href: "/india/agra/Bodla/female-tutor" },
    ],
  },
  {
    city: "Meerut",
    slug: "india/meerut",
    areas: ["Begum Bridge", "Jagriti Vihar", "Shradhapuri", "Pallavpuram", "Saket"],
    links: [
      { label: "Home Tutor", href: "/india/meerut" },
      { label: "Private Tutor", href: "/india/meerut/Begum%20Bridge/private-tutor" },
      { label: "JEE Tutor", href: "/india/meerut/Jagriti%20Vihar/jee-tutor" },
      { label: "NEET Tutor", href: "/india/meerut/Shradhapuri/neet-tutor" },
      { label: "CBSE Tutor", href: "/india/meerut/Pallavpuram/cbse-tutor" },
      { label: "Science Tutor", href: "/india/meerut/Saket/science-tutor" },
    ],
  },
];

/* ═══════════════════════════════════════════════
   DATA — ONLINE / GLOBAL
═══════════════════════════════════════════════ */

const onlineGlobalLinks = [
  {
    region: "Online India",
    links: [
      { label: "Online Tuition", href: "/country/india/online-tuition" },
      { label: "Maths Online", href: "/country/india/maths-online" },
      { label: "Science Online", href: "/country/india/science-online" },
      { label: "JEE Online Coaching", href: "/country/india/jee-online-coaching" },
      { label: "NEET Online Coaching", href: "/country/india/neet-online-coaching" },
      { label: "CBSE Online Tutor", href: "/country/india/cbse-online-tutor" },
      { label: "Online Home Tutor", href: "/country/india/online-home-tutor" },
      { label: "Live Online Classes", href: "/country/india/live-online-classes" },
    ],
  },
  {
    region: "United Kingdom",
    links: [
      { label: "UK Tutoring", href: "/country/uk/uk-tutoring" },
      { label: "Home Tutor UK", href: "/country/uk/home-tutor-uk" },
      { label: "Online Tutor UK", href: "/country/uk/online-tutor-uk" },
      { label: "GCSE Tutor UK", href: "/country/uk/gcse-tutor-uk" },
      { label: "A-Level Tutor UK", href: "/country/uk/a-level-tutor-uk" },
      { label: "Tutor Job UK", href: "/country/uk/tutor-job-uk" },
      { label: "Maths Tutor UK", href: "/country/uk/maths-tutor-uk" },
      { label: "Science Tutor UK", href: "/country/uk/science-tutor-uk" },
    ],
  },
  {
    region: "Canada",
    links: [
      { label: "Canada Tutoring", href: "/country/canada/canada-tutoring" },
      { label: "Home Tutor Canada", href: "/country/canada/home-tutor-canada" },
      { label: "Online Tutor Canada", href: "/country/canada/online-tutor-canada" },
      { label: "Toronto Tutor", href: "/country/canada/toronto-tutor" },
      { label: "Maths Tutor Canada", href: "/country/canada/maths-tutor-canada" },
      { label: "Tutor Job Canada", href: "/country/canada/tutor-job-canada" },
      { label: "Vancouver Tutor", href: "/country/canada/vancouver-tutor" },
      { label: "Calgary Tutor", href: "/country/canada/calgary-tutor" },
    ],
  },
  {
    region: "UAE",
    links: [
      { label: "Home Tutor UAE", href: "/country/uae/home-tutor-uae" },
      { label: "Online Tutor Dubai", href: "/country/uae/online-tutor-dubai" },
      { label: "Tutor Abu Dhabi", href: "/country/uae/tutor-abu-dhabi" },
      { label: "CBSE Tutor Dubai", href: "/country/uae/cbse-tutor-dubai" },
      { label: "Maths Tutor UAE", href: "/country/uae/maths-tutor-uae" },
      { label: "Tutor Job UAE", href: "/country/uae/tutor-job-uae" },
      { label: "IB Tutor Dubai", href: "/country/uae/ib-tutor-dubai" },
      { label: "Sharjah Tutor", href: "/country/uae/sharjah-tutor" },
    ],
  },
  {
    region: "Singapore",
    links: [
      { label: "Home Tutor Singapore", href: "/country/singapore/home-tutor-singapore" },
      { label: "Online Tutor SG", href: "/country/singapore/online-tutor-sg" },
      { label: "Maths Tutor SG", href: "/country/singapore/maths-tutor-sg" },
      { label: "Primary Tutor SG", href: "/country/singapore/primary-tutor-sg" },
      { label: "Tutor Job Singapore", href: "/country/singapore/tutor-job-singapore" },
      { label: "Science Tutor SG", href: "/country/singapore/science-tutor-sg" },
    ],
  },
  {
    region: "Australia",
    links: [
      { label: "Home Tutor Australia", href: "/country/australia/home-tutor-australia" },
      { label: "Online Tutor AU", href: "/country/australia/online-tutor-au" },
      { label: "Sydney Tutor", href: "/country/australia/sydney-tutor" },
      { label: "Melbourne Tutor", href: "/country/australia/melbourne-tutor" },
      { label: "Maths Tutor AU", href: "/country/australia/maths-tutor-au" },
      { label: "Tutor Job Australia", href: "/country/australia/tutor-job-australia" },
      { label: "Brisbane Tutor", href: "/country/australia/brisbane-tutor" },
      { label: "Perth Tutor", href: "/country/australia/perth-tutor" },
    ],
  },
  {
    region: "USA",
    links: [
      { label: "Online Tutor USA", href: "/country/usa/online-tutor-usa" },
      { label: "Home Tutor USA", href: "/country/usa/home-tutor-usa" },
      { label: "New York Tutor", href: "/country/usa/new-york-tutor" },
      { label: "SAT Tutor USA", href: "/country/usa/sat-tutor-usa" },
      { label: "ACT Tutor USA", href: "/country/usa/act-tutor-usa" },
      { label: "Tutor Job USA", href: "/country/usa/tutor-job-usa" },
    ],
  },
  {
    region: "New Zealand",
    links: [
      { label: "Home Tutor NZ", href: "/country/newzealand/home-tutor-nz" },
      { label: "Online Tutor NZ", href: "/country/newzealand/online-tutor-nz" },
      { label: "Auckland Tutor", href: "/country/newzealand/auckland-tutor" },
      { label: "Maths Tutor NZ", href: "/country/newzealand/maths-tutor-nz" },
      { label: "Tutor Job NZ", href: "/country/newzealand/tutor-job-nz" },
    ],
  },
];

/* ═══════════════════════════════════════════════
   DATA — COMPANY PAGES
═══════════════════════════════════════════════ */

const companyLinks = [
  { name: "About Us", href: "/about", icon: <FaUserGraduate />, desc: "Our story & mission" },
  { name: "Contact Us", href: "/contact", icon: <FaEnvelope />, desc: "Get in touch" },
  { name: "Privacy Policy", href: "/privacy", icon: <FaShieldAlt />, desc: "How we protect your data" },
  { name: "Refund Policy", href: "/refund", icon: <FaClipboardList />, desc: "Our refund process" },
  { name: "Terms & Conditions", href: "/terms", icon: <FaFileAlt />, desc: "Rules & guidelines" },
  { name: "Become a Tutor", href: "/tutor-flow/tutor-registration", icon: <FaGraduationCap />, desc: "Join our tutor network" },
  { name: "Find a Tutor", href: "/tutors", icon: <FaHome />, desc: "Browse all tutors" },
  { name: "How it Works", href: "/how-it-works", icon: <FaBusinessTime />, desc: "Platform overview" },
  { name: "Subjects", href: "/subjects", icon: <FaBook />, desc: "All subjects offered" },
  { name: "Pricing", href: "/pricing", icon: <FaClipboardList />, desc: "Plans & packages" },
];

/* ═══════════════════════════════════════════════
   CHART DATA
═══════════════════════════════════════════════ */

const barData = [
  { name: "Running\nCities", count: runningCities.length },
  { name: "Upcoming\nCities", count: upcomingCities.length },
  { name: "Service\nCategories", count: allServiceCategories.length },
  { name: "Global\nRegions", count: onlineGlobalLinks.length },
];

const pieData = allServiceCategories.map((cat) => ({
  name: cat.category,
  value: cat.services.length,
}));

// House palette for charts: gold accent plus the four subject tints
const CHART_COLORS = ["#D79A2C", "#3E5C83", "#7A4E6E", "#B06A2E", "#1F6F54", "#8a5f18", "#58646C", "#9AA3AB", "#3f8a5f", "#1C2B22"];

/* ═══════════════════════════════════════════════
   COMPONENTS
═══════════════════════════════════════════════ */

function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="mb-7 flex items-center gap-3">
      <span className="text-[#D79A2C]">{icon}</span>
      <div>
        <h2 className={`${lora.className} text-xl font-semibold text-[#1C2B22]`}>{title}</h2>
        {subtitle && <p className="mt-0.5 text-sm text-[#58646C]">{subtitle}</p>}
      </div>
    </div>
  );
}

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-[#1C2B22]/10 bg-white p-7 sm:p-8 ${className}`}>
      {children}
    </div>
  );
}

function AccordionCity({ city }: { city: typeof offlineDetailedLinks[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-md border transition-colors ${open ? "border-[#D79A2C]/40" : "border-[#1C2B22]/10"}`}>
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between px-5 py-4 text-left">
        <div className="flex items-center gap-3">
          <FaMapMarkerAlt className="text-[#D79A2C]" />
          <div>
            <p className="text-sm font-semibold text-[#1C2B22]">{city.city}</p>
            <p className="text-xs text-[#9AA3AB]">{city.areas.slice(0, 3).join(" · ")} ···</p>
          </div>
        </div>
        <FaChevronDown className={`text-[#9AA3AB] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="border-t border-[#1C2B22]/[.06] px-5 pb-5">
          <p className="mb-2 mt-4 text-xs text-[#9AA3AB]">Popular areas</p>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {city.areas.map((a) => (
              <span key={a} className="rounded-full border border-[#1C2B22]/10 px-2.5 py-0.5 text-xs text-[#58646C]">
                {a}
              </span>
            ))}
          </div>
          <p className="mb-2 text-xs text-[#9AA3AB]">Services</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {city.links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-[#58646C] transition-colors hover:bg-[#F7F2E9] hover:text-[#8a5f18]"
              >
                <FaChevronRight className="text-[10px] text-[#D79A2C]" />
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════ */

export default function SitemapPage() {
  const [activeServiceTab, setActiveServiceTab] = useState(0);
  const [activeOnlineTab, setActiveOnlineTab] = useState(0);

  return (
    <>
      <NavBar />

      {/* ── HERO ── */}
      <section className={`relative overflow-hidden bg-[#0E211C] py-16 sm:py-20 ${dmSans.className}`}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <p className={`${lora.className} italic text-sm text-[#AAB6A2] mb-3`}>Complete platform overview</p>
          <h1 className={`${lora.className} text-4xl font-semibold text-white sm:text-5xl`}>Yattra Tutors sitemap</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#AAB6A2]">
            Every service, every city, every tutor — all in one place. Explore India&apos;s fastest-growing tutoring
            platform.
          </p>

          {/* Stats strip */}
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { n: "7+", label: "Active cities" },
              { n: "100+", label: "Services" },
              { n: "8", label: "Global regions" },
              { n: "5000+", label: "Verified tutors" },
            ].map((s) => (
              <div key={s.label} className="rounded-md border border-white/10 px-4 py-4">
                <p className={`${lora.className} text-2xl font-semibold text-white`}>{s.n}</p>
                <p className="mt-1 text-xs text-[#AAB6A2]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <main className={`bg-[#F7F2E9] py-16 sm:py-20 ${dmSans.className}`}>
        <div className="mx-auto max-w-5xl space-y-10 px-4 sm:px-6">
          {/* 1. SERVICES */}
          <SectionCard>
            <SectionHeader icon={<FaBook />} title="All our services" subtitle="Browse by category — select any to explore" />

            {/* Category tabs */}
            <div className="mb-7 flex flex-wrap gap-2">
              {allServiceCategories.map((cat, i) => (
                <button
                  key={cat.category}
                  onClick={() => setActiveServiceTab(i)}
                  className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                    activeServiceTab === i
                      ? "border-[#D79A2C] bg-[#D79A2C]/10 text-[#8a5f18]"
                      : "border-[#1C2B22]/15 text-[#58646C] hover:border-[#D79A2C]/40"
                  }`}
                >
                  <span className="text-xs text-[#D79A2C]">{cat.icon}</span>
                  {cat.category}
                </button>
              ))}
            </div>

            {/* Active category services */}
            {allServiceCategories.map(
              (cat, i) =>
                i === activeServiceTab && (
                  <div key={cat.category}>
                    <div className="mb-5 flex items-center gap-3 rounded-md bg-[#0E211C] p-5 text-white">
                      <span className="text-xl text-[#D79A2C]">{cat.icon}</span>
                      <div>
                        <p className={`${lora.className} text-base font-semibold`}>{cat.category}</p>
                        <p className="text-sm text-[#AAB6A2]">{cat.services.length} services available across our cities</p>
                      </div>
                    </div>

                    {/* Service × City grid */}
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {cat.services.flatMap((service) =>
                        runningCities.map((city) => (
                          <Link
                            key={`${service}-${city.name}`}
                            href={`/${city.slug}/${city.name.toLowerCase().replace(/\s+/g, "-")}/${service.toLowerCase().replace(/\s+/g, "-")}`}
                            className="group flex items-center gap-2 rounded-md border border-[#1C2B22]/10 px-3 py-2.5 text-sm text-[#58646C] transition-colors hover:border-[#D79A2C]/40 hover:text-[#1C2B22]"
                          >
                            <FaChevronRight className="flex-shrink-0 text-[10px] text-[#D79A2C] opacity-60 transition-opacity group-hover:opacity-100" />
                            <span className="truncate">{service} in {city.name}</span>
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                )
            )}
          </SectionCard>

          {/* 2. OFFLINE CITIES */}
          <SectionCard>
            <SectionHeader icon={<FaMapMarkerAlt />} title="Offline tutor centers" subtitle="Expand a city to see areas & available services" />

            <div className="mb-7 grid gap-3 md:grid-cols-2">
              {offlineDetailedLinks.map((city) => (
                <AccordionCity key={city.city} city={city} />
              ))}
            </div>

            {/* Upcoming */}
            <div className="rounded-md border border-[#1C2B22]/10 bg-[#F7F2E9] p-6">
              <p className="mb-1 flex items-center gap-2 font-semibold text-[#1C2B22]">
                <FaGlobe className="text-[#D79A2C]" /> Expanding soon
              </p>
              <p className="mb-4 text-xs text-[#58646C]">We&apos;re launching in these cities soon — register your interest.</p>
              <div className="flex flex-wrap gap-2">
                {upcomingCities.map((city) => (
                  <span
                    key={city.name}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#1C2B22]/10 bg-white px-3 py-1 text-xs font-medium text-[#58646C]"
                  >
                    {city.name}
                    <span className="text-[#9AA3AB]">· {city.state}</span>
                  </span>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* 3. ONLINE / GLOBAL */}
          <SectionCard>
            <SectionHeader icon={<FaGlobe />} title="Online & global tutoring" subtitle="World-class tutors available worldwide" />

            {/* Region tabs */}
            <div className="mb-6 flex flex-wrap gap-2">
              {onlineGlobalLinks.map((region, i) => (
                <button
                  key={region.region}
                  onClick={() => setActiveOnlineTab(i)}
                  className={`rounded-md border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    activeOnlineTab === i
                      ? "border-[#D79A2C] bg-[#D79A2C]/10 text-[#8a5f18]"
                      : "border-[#1C2B22]/15 text-[#58646C] hover:border-[#D79A2C]/40"
                  }`}
                >
                  {region.region}
                </button>
              ))}
            </div>

            {onlineGlobalLinks.map((region, i) =>
              i === activeOnlineTab ? (
                <div key={region.region} className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                  {region.links.map((l) => (
                    <Link
                      key={l.label}
                      href={l.href}
                      className="group flex items-center gap-2 rounded-md border border-[#1C2B22]/10 px-4 py-3 text-sm text-[#58646C] transition-colors hover:border-[#D79A2C]/40 hover:text-[#1C2B22]"
                    >
                      <FaChevronRight className="text-[10px] text-[#D79A2C] opacity-60 transition-opacity group-hover:opacity-100" />
                      {l.label}
                    </Link>
                  ))}
                </div>
              ) : null
            )}
          </SectionCard>

          {/* 4. CHARTS */}
          <div className="grid gap-6 md:grid-cols-2">
            <SectionCard>
              <SectionHeader icon={<FaGlobe />} title="Platform at a glance" />
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} barCategoryGap="30%">
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#58646C" }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#58646C" }} />
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #1C2B2220", fontSize: 12 }} />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="#D79A2C" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </SectionCard>

            <SectionCard>
              <SectionHeader icon={<FaBook />} title="Services by category" />
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={95} dataKey="value" paddingAngle={2}>
                      {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #1C2B2220", fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </SectionCard>
          </div>

          {/* 5. COMPANY PAGES */}
          <SectionCard>
            <SectionHeader icon={<FaUserGraduate />} title="Company pages" subtitle="Everything you need to know about Yattra Tutors" />
            <div className="grid gap-3 divide-[#1C2B22]/[.06] sm:grid-cols-2 md:grid-cols-5">
              {companyLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex flex-col items-center gap-2 rounded-md border border-[#1C2B22]/10 px-4 py-5 text-center transition-colors hover:border-[#D79A2C]/40"
                >
                  <span className="text-lg text-[#D79A2C]">{link.icon}</span>
                  <p className="text-sm font-semibold text-[#1C2B22]">{link.name}</p>
                  <p className="text-xs text-[#9AA3AB]">{link.desc}</p>
                </Link>
              ))}
            </div>
          </SectionCard>

          {/* 6. CONTACT */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col justify-between rounded-lg bg-[#0E211C] p-7 text-white">
              <div>
                <FaPhone className="mb-4 text-xl text-[#D79A2C]" />
                <h3 className={`${lora.className} mb-1 text-lg font-semibold`}>Call us</h3>
                <p className="mb-4 text-sm text-[#AAB6A2]">Mon – Sat, 9 AM – 7 PM</p>
                <p className="text-xl font-semibold">+91-6363453870</p>
              </div>
              <a
                href="tel:+916363453870"
                className="mt-6 inline-flex w-max items-center gap-2 rounded-md bg-[#D79A2C] px-5 py-2.5 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
              >
                Call now <FaChevronRight />
              </a>
            </div>

            <div className="flex flex-col justify-between rounded-lg border border-[#1C2B22]/10 bg-white p-7">
              <div>
                <FaEnvelope className="mb-4 text-xl text-[#D79A2C]" />
                <h3 className={`${lora.className} mb-1 text-lg font-semibold text-[#1C2B22]`}>Email us</h3>
                <p className="mb-4 text-sm text-[#58646C]">We reply within 24 hours</p>
                <p className="break-all text-lg font-semibold text-[#1C2B22]">yattratutorial@gmail.com</p>
              </div>
              <a
                href="mailto:yattratutorial@gmail.com"
                className="mt-6 inline-flex w-max items-center gap-2 rounded-md border border-[#1C2B22]/15 px-5 py-2.5 text-sm font-semibold text-[#1C2B22] transition-colors hover:border-[#D79A2C]/50"
              >
                Send email <FaChevronRight />
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
