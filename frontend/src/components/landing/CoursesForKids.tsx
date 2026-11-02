"use client";

import { motion } from "framer-motion";
import { BookText, Calculator, Code2, Languages } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Lora, DM_Sans } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600", "700"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

/*
 * ═══════════════════════════════════════════════════════
 *  COURSES FOR KIDS — "The Register"
 *  Four age-stage rows on parchment, each with a subject-tint
 *  monogram (reusing the tint language from the Subject
 *  Directory) instead of four different rainbow gradient cards.
 * ═══════════════════════════════════════════════════════
 */

const kidsCourses = [
  {
    id: 1,
    title: "Primary Section",
    classRange: "Class 1 – 5",
    description: "Unlock the joy of learning with fun & clarity.",
    icon: BookText,
    tint: "#3E5C83",
    mono: "PR",
    slug: "primary-section",
  },
  {
    id: 2,
    title: "Junior Section",
    classRange: "Class 6 – 8",
    description: "Build a strong academic foundation early.",
    icon: Languages,
    tint: "#7A4E6E",
    mono: "JR",
    slug: "junior-section",
  },
  {
    id: 3,
    title: "Computer Learning",
    classRange: "Class 1 – 8",
    description: "Learn computers in a fun & easy way.",
    icon: Calculator,
    tint: "#B06A2E",
    mono: "CL",
    slug: "computer-learning",
  },
  {
    id: 4,
    title: "Spoken English & Communication",
    classRange: "Class 1 – 8",
    description: "Speak confidently and express freely.",
    icon: Code2,
    tint: "#1F6F54",
    mono: "SE",
    slug: "spoken-english",
  },
];

const CoursesForKids = () => {
  return (
    <section id="kids-courses" className={`relative bg-[#F7F2E9] py-16 sm:py-24 ${dmSans.className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-lg">
            <p className={`${lora.className} italic text-sm text-[#6B5636] mb-3`}>For younger learners</p>
            <h2 className={`${lora.className} text-[32px] sm:text-[40px] font-semibold leading-[1.15] text-[#1C2B22]`}>
              Courses for kids, by age and stage
            </h2>
          </div>

          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-[#D79A2C]/25 flex-shrink-0 self-start">
            <Image src="/images/kids-courses-center.png" alt="Happy child learning" fill className="object-contain bg-white" />
          </div>
        </div>

        {/* Register rows */}
        <div className="divide-y divide-[#1C2B22]/[.08] border-y border-[#1C2B22]/[.08]">
          {kidsCourses.map((course, index) => {
            const Icon = course.icon;
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Link
                  href={{
                    pathname: `/kid-courses/${course.slug}`,
                    query: {
                      section: course.title,
                      classRange: course.classRange,
                      source: "KIDS_COURSE_CARD",
                      fromPage: "/",
                      campaign: "KIDS_LEARNING",
                      medium: "website",
                    },
                  }}
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 py-6 hover:bg-[#1C2B22]/[.03] transition-colors -mx-4 px-4 sm:-mx-6 sm:px-6"
                >
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-md flex items-center justify-center font-semibold text-white"
                    style={{ backgroundColor: course.tint }}
                  >
                    <span className={`${lora.className} text-sm`}>{course.mono}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Icon className="w-4 h-4" style={{ color: course.tint }} />
                      <span className="text-[11px] font-semibold uppercase tracking-[.06em]" style={{ color: course.tint }}>
                        {course.classRange}
                      </span>
                    </div>
                    <h3 className={`${lora.className} text-lg sm:text-xl font-semibold text-[#1C2B22]`}>
                      {course.title}
                    </h3>
                    <p className="text-sm text-[#58646C] mt-0.5">{course.description}</p>
                  </div>

                  <span className="flex-shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-[#1C2B22] group-hover:text-[#D79A2C] transition-colors">
                    Explore
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoursesForKids;
