"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Atom,
  Code2,
  CalendarCheck,
  ChevronRight,
  Zap,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

/* ─── DATA ─── */
const mathsCourses = [
  {
    id: "01",
    title: "Abacus Learning",
    badge: "Ages 5 – 13",
    tagline: "Mental arithmetic & memory",
    description:
      "Boosts concentration, numerical visualization, and lightning-fast mental calculations without pen and paper.",
    imageUrl: "/images/abacusImage.png",
    link: "/subjects?subject=Abacus",
    highlights: ["Speed Math", "Focus Boost", "Visual Memory"],
  },
  {
    id: "02",
    title: "Vedic Mathematics",
    badge: "Classes 6 – 12+",
    tagline: "Ancient speed shortcuts",
    description:
      "Master high-speed calculation sutras to solve complex algebra, multiplication, and squares in mere seconds.",
    imageUrl: "/images/VedicMathsImage.png",
    link: "/subjects?subject=Vedic%20Maths",
    highlights: ["Exam Hacks", "Fast Formulas", "Zero Errors"],
  },
];

const tutoringCards = [
  {
    title: "CBSE Board",
    grade: "Classes 1 – 12",
    description:
      "Structured NCERT concept-building, regular chapter revision tests, and exam-pattern practice for maximum score.",
    imageUrl: "/images/cbseImage.png",
    icon: GraduationCap,
    subject: "Board Exam",
    cta: "Find CBSE Tutor",
    accent: "emerald",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    buttonBg: "bg-emerald-600 hover:bg-emerald-700",
  },
  {
    title: "ICSE Board",
    grade: "Classes 1 – 10",
    description:
      "Detailed syllabus coverage with emphasis on comprehensive literature, science practicals, and math problem-solving.",
    imageUrl: "/images/icseImage.png",
    icon: BookOpen,
    subject: "Board Exam",
    cta: "Find ICSE Tutor",
    accent: "teal",
    badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
    buttonBg: "bg-teal-600 hover:bg-teal-700",
  },
  {
    title: "IIT-JEE & NEET",
    grade: "Foundation & 11–12",
    description:
      "Rigorous problem-solving, advanced numericals, formula mastery, and strategic test analysis from top faculty.",
    imageUrl: "/images/jeeImage.png",
    icon: Atom,
    subject: "Competitive",
    cta: "Start JEE/NEET Prep",
    accent: "emerald",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    buttonBg: "bg-emerald-700 hover:bg-emerald-800",
  },
  {
    title: "Coding for Kids",
    grade: "Ages 8 – 16",
    description:
      "Hands-on interactive 1-on-1 coding lessons in Python, JavaScript, game design, and computational problem-solving.",
    imageUrl: "/images/codingImage.png",
    icon: Code2,
    subject: "Tech Skills",
    cta: "Learn Coding 1-to-1",
    accent: "teal",
    badgeColor: "bg-teal-50 text-teal-800 border-teal-200",
    buttonBg: "bg-teal-700 hover:bg-teal-800",
  },
];

/* ─── ANIMATION VARIANTS ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

/* ──────────────────────────────────────────────────
   COMPONENT
────────────────────────────────────────────────── */
const CourseHighlights = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/25 to-white py-16 sm:py-24">
      {/* Decorative ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-36 top-1/4 h-96 w-96 rounded-full bg-emerald-200/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 top-1/2 h-96 w-96 rounded-full bg-teal-200/25 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ════════════════════════════════
            SECTION HEADING
        ════════════════════════════════ */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-12 sm:mb-16 text-center"
        >
          {/* Pill badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-800 shadow-sm">
            <Sparkles size={14} className="text-emerald-600" />
            Curated Learning Programs
          </span>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Course{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
              Highlights
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600 sm:text-lg leading-relaxed">
            Expert-designed 1-on-1 programs for every student — from foundational calculation speed to board and competitive exam excellence.
          </p>
        </motion.div>

        {/* ════════════════════════════════
            PART 1: MATHS & SPEED MASTERY (Dark Emerald Showcase)
        ════════════════════════════════ */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#063828] via-[#04281c] to-[#021711] p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(2,23,17,0.35)] border border-emerald-500/25"
        >
          {/* Subtle glow overlay inside */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-teal-500/15 blur-3xl"
          />

          <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 border border-emerald-400/30 px-3.5 py-1 text-xs font-semibold tracking-wide text-emerald-300">
                <Zap size={13} className="text-amber-400" />
                MATHS & CALCULATION MASTERY
              </div>

              <h3 className="mt-4 text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                Maths Home Tuition that{" "}
                <span className="text-amber-300 underline decoration-amber-400/40 underline-offset-4">
                  Builds Strong Academic Basics
                </span>
              </h3>

              <p className="mt-3 text-sm sm:text-base font-medium text-emerald-100/90 leading-relaxed">
                Smart mental math techniques designed to improve calculation speed, accuracy &amp; exam confidence.
              </p>

              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Our specialized maths home tutoring programs include <strong>Abacus</strong> and <strong>Vedic Maths</strong>, designed for school students to eliminate calculation fear, sharpen numerical intuition, and boost logical thinking through personalized 1-on-1 home mentoring.
              </p>

              {/* Feature Chips */}
              <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-2">
                <div className="flex items-center gap-2 rounded-xl bg-white/[0.07] border border-white/10 px-3 py-2 text-xs font-medium text-emerald-100">
                  <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" />
                  <span>1-on-1 Home Mentoring</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white/[0.07] border border-white/10 px-3 py-2 text-xs font-medium text-emerald-100">
                  <Zap size={15} className="text-amber-400 flex-shrink-0" />
                  <span>10x Calculation Speed</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white/[0.07] border border-white/10 px-3 py-2 text-xs font-medium text-emerald-100">
                  <UserCheck size={15} className="text-emerald-400 flex-shrink-0" />
                  <span>All School Classes (1–12)</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white/[0.07] border border-white/10 px-3 py-2 text-xs font-medium text-emerald-100">
                  <ShieldCheck size={15} className="text-amber-400 flex-shrink-0" />
                  <span>Free Trial Demo Class</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/book-demo">
                  <button className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 px-7 py-3 text-sm font-bold text-slate-900 shadow-lg shadow-amber-400/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-amber-400/40 active:scale-[0.98]">
                    <span>Join Maths Program</span>
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </Link>

                <Link href="/subjects?subject=Mathematics">
                  <button className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-white/5 px-5 py-3 text-xs font-semibold text-emerald-200 backdrop-blur-sm transition hover:bg-emerald-500/15 hover:text-white">
                    <span>View Curriculum</span>
                    <ChevronRight size={14} />
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Cards Showcase (5 cols) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {mathsCourses.map((course) => (
                <motion.div
                  key={course.title}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-4 shadow-xl border border-slate-100 transition-all duration-300 hover:shadow-2xl hover:border-emerald-200"
                >
                  <div>
                    {/* Top row: Number and Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white shadow-sm">
                        {course.id}
                      </span>
                      <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                        {course.badge}
                      </span>
                    </div>

                    {/* Illustration Container */}
                    <div className="relative mx-auto my-2 h-32 w-full flex items-center justify-center rounded-xl bg-gradient-to-b from-emerald-50/60 to-slate-50 p-2">
                      <Image
                        src={course.imageUrl}
                        alt={`${course.title} tuition by Yattra Tutors`}
                        fill
                        className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Title & Tagline */}
                    <div className="mt-3">
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {course.title}
                      </h4>
                      <p className="text-[11px] font-medium text-emerald-600 mt-0.5">
                        {course.tagline}
                      </p>
                      <p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {course.description}
                      </p>
                    </div>

                    {/* Highlight Pills */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {course.highlights.map((h) => (
                        <span
                          key={h}
                          className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[9.5px] font-medium text-slate-600"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Explore Link */}
                  <Link
                    href={course.link}
                    className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                  >
                    <span>Explore Course</span>
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ════════════════════════════════
            PART 2: 1-ON-1 CURRICULUM TUTORING
        ════════════════════════════════ */}
        <div className="mt-16 sm:mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                Syllabus &amp; Exam Prep
              </span>
              <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
                Personalised <span className="text-emerald-600">1-to-1 Tutoring</span>
              </h3>
              <p className="mt-1 text-sm text-slate-600 max-w-xl">
                Dedicated subject experts for CBSE, ICSE, Competitive Exams, and Tech Skills at your doorstep or online.
              </p>
            </div>

            <Link href="/tutors">
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:underline">
                View all tutoring subjects
                <ChevronRight size={16} />
              </span>
            </Link>
          </div>

          {/* Cards Grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {tutoringCards.map((card) => {
              const IconComponent = card.icon;
              return (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-5 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300"
                >
                  <div>
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm group-hover:scale-110 transition-transform">
                        <IconComponent size={20} />
                      </div>
                      <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${card.badgeColor}`}>
                        {card.subject}
                      </span>
                    </div>

                    {/* Illustration Container */}
                    <div className="relative mx-auto my-3 h-32 w-full flex items-center justify-center rounded-xl bg-gradient-to-b from-slate-50 to-emerald-50/40 p-2">
                      <Image
                        src={card.imageUrl}
                        alt={`${card.title} program`}
                        fill
                        className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="mt-2">
                      <div className="flex items-baseline justify-between">
                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {card.title}
                        </h4>
                        <span className="text-[11px] font-medium text-slate-500">
                          {card.grade}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-3">
                        {card.description}
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={{
                      pathname: "/subjects",
                      query: { subject: card.title, source: "HIGHLIGHTS_CARD", fromPage: "/" },
                    }}
                    className="mt-5 block"
                  >
                    <button className={`w-full flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 ${card.buttonBg} active:scale-[0.98]`}>
                      <span>{card.cta}</span>
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ════════════════════════════════
            PART 3: ACADEMIC ADVISOR REASSURANCE CARD
        ════════════════════════════════ */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-50/90 via-teal-50/50 to-emerald-50/90 border border-emerald-200/80 p-5 sm:p-7 shadow-sm"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md">
                <CalendarCheck size={22} />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Not sure which tutoring program is right for your child?
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Book a free 1-on-1 academic consultation with our senior advisor. We will assess your child's syllabus, grade level, and match the best verified tutor near your home.
                </p>
              </div>
            </div>

            <div className="flex-shrink-0 w-full md:w-auto">
              <Link href="/book-demo" className="block w-full">
                <button className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                  <span>Book Free Consultation</span>
                  <ArrowRight size={15} />
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CourseHighlights;