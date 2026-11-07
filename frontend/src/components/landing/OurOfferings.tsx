import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { lora, dmSans } from "@/lib/fonts";

/*
 * ═══════════════════════════════════════════════════════
 *  OUR OFFERINGS — "The Catalogue"
 *  A printed-catalogue style directory of every programme
 *  we teach, on the pine background — small plate photos
 *  and plain text rows instead of a colourful card grid.
 * ═══════════════════════════════════════════════════════
 */

const offeringsData = [
  {
    title: "Class 9th",
    description:
      "Strong fundamentals with concept-based learning, revision tests, and personalised doubt support.",
    imageUrl: "/images/offerings/class-09.jpg",
  },
  {
    title: "Class 10th",
    description:
      "Board-oriented preparation with NCERT mastery, numericals practice, and exam-focused strategy.",
    imageUrl: "/images/offerings/class-010.jpg",
  },
  {
    title: "Class 11th",
    description:
      "Advanced foundation for JEE/NEET & Boards with topic-wise tests and in-depth conceptual clarity.",
    imageUrl: "/images/offerings/class-011.jpg",
  },
  {
    title: "Class 12th",
    description:
      "Complete syllabus coverage, PYQs, revision marathons, and full-length mock tests.",
    imageUrl: "/images/offerings/class-012.jpg",
  },
  {
    title: "Competitive Exams",
    description:
      "Expert-led preparation for JEE, NEET, NDA, CUET, and other competitive exams.",
    imageUrl: "/images/offerings/jee-neet0.jpg",
  },
  {
    title: "Coding Classes",
    description:
      "Beginner to advanced coding – Python, C++, Web Dev, DSA, and project-based learning.",
    imageUrl: "/images/offerings/coding.jpg",
  },
  {
    title: "Skill Development",
    description:
      "Personality development, communication mastery, public speaking, and writing skills.",
    imageUrl: "/images/offerings/skills0.jpg",
  },
  {
    title: "Language Learning",
    description:
      "English, Hindi, and foreign languages taught through interactive speaking-focused sessions.",
    imageUrl: "/images/offerings/language0.jpg",
  },
];

const OurOfferings = () => {
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

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-14 max-w-xl"
        >
          <p className={`${lora.className} italic text-sm text-[#D79A2C] mb-3`}>The catalogue</p>
          <h2 className={`${lora.className} text-[32px] sm:text-[40px] font-semibold leading-[1.15] text-[#F5F1E6]`}>
            Every subject, every class, taught one-to-one
          </h2>
        </motion.div>

        {/* Catalogue grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 list-none p-0 m-0">
          {offeringsData.map((offering, index) => (
            <motion.li
              key={offering.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (index % 4) * 0.08 }}
              className="border-t border-[#D79A2C]/15 py-6 px-0 sm:px-5 sm:odd:border-l-0 lg:border-t-0 lg:border-l lg:px-6 lg:[&:nth-child(4n+1)]:border-l-0 lg:[&:nth-child(-n+4)]:border-t-0"
            >
              <div className="relative w-16 h-16 rounded-md overflow-hidden border border-[#2B4A3D] mb-4">
                <Image src={offering.imageUrl} alt={offering.title} fill className="object-cover" />
              </div>

              <h3 className={`${lora.className} text-lg font-semibold text-[#F5F1E6] mb-1.5`}>
                {offering.title}
              </h3>

              <p className="text-[13px] leading-relaxed text-[#AAB6A2] mb-4">
                {offering.description}
              </p>

              <Link
                href={{
                  pathname: "/subjects",
                  query: {
                    subject: offering.title,
                    source: "OFFERINGS_CARD",
                    fromPage: "/",
                  },
                }}
                className="text-[13px] font-medium text-[#D79A2C] border-b border-[#D79A2C]/40 hover:border-[#D79A2C] hover:text-[#F2C169] transition-colors pb-0.5"
              >
                View subject
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OurOfferings;
