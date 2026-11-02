"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import React from "react";
import { Lora, DM_Sans } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600", "700"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

/*
 * ═══════════════════════════════════════════════════════
 *  HOW IT WORKS — "The Process Card"
 *  A genuine 4-step sequence, so numbering stays — but as
 *  plain bordered cards on parchment with a single gold/pine
 *  accent, not four different neon colours behind glass.
 * ═══════════════════════════════════════════════════════
 */

const stepsData = [
  {
    id: 1,
    img: "/images/how-it-works/demo.svg",
    title: "1 to 3 tutors give a demo session to your child",
    label: "Demo",
  },
  {
    id: 2,
    img: "/images/how-it-works/selection.svg",
    title: "Parents select the best tutor based on the demo",
    label: "Selection",
  },
  {
    id: 3,
    img: "/images/how-it-works/test.svg",
    title: "Tutor conducts monthly test series on our platform",
    label: "Testing",
  },
  {
    id: 4,
    img: "/images/how-it-works/analytics.svg",
    title: "Student's scorecard is displayed on the dashboard",
    label: "Analytics",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const HowItWorks = () => {
  return (
    <section id="how-it-works" className={`relative bg-[#F7F2E9] py-16 sm:py-24 ${dmSans.className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mb-14 sm:mb-18"
        >
          <p className={`${lora.className} italic text-sm text-[#6B5636] mb-3`}>Our process</p>
          <h2 className={`${lora.className} text-[32px] sm:text-[40px] font-semibold leading-[1.15] text-[#1C2B22] mb-3`}>
            How Yattra Tutors works
          </h2>
          <p className="text-[15px] text-[#58646C] leading-relaxed">
            A simple, transparent and result-driven learning journey — from the first demo session to performance tracking.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — desktop only */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-[26px] left-[12.5%] right-[12.5%] h-px border-t border-dashed border-[#1C2B22]/20"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stepsData.map((step, index) => (
              <motion.div
                key={step.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Number */}
                <div
                  className={`${lora.className} relative z-10 w-[52px] h-[52px] rounded-full bg-[#1C2B22] text-[#F7F2E9]
                               flex items-center justify-center text-lg font-semibold mb-5 border-4 border-[#F7F2E9]`}
                >
                  {step.id}
                </div>

                {/* Card */}
                <div className="w-full bg-white border border-[#1C2B22]/[.08] rounded-xl px-6 py-7 hover:border-[#D79A2C]/50 hover:-translate-y-1 transition-all duration-300">
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-[.1em] text-[#D79A2C] mb-5">
                    {step.label}
                  </span>

                  <div className="flex justify-center mb-5">
                    <div className="w-[72px] h-[72px] rounded-xl bg-[#F7F2E9] border border-[#1C2B22]/[.08] flex items-center justify-center">
                      <Image src={step.img} alt={`Step ${step.id} — ${step.title}`} width={44} height={44} className="object-contain" />
                    </div>
                  </div>

                  <p className="text-[13.5px] font-medium leading-relaxed text-[#1C2B22]">{step.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`${lora.className} italic text-center mt-14 text-sm text-[#6B5636]`}
        >
          Trusted by 5,000+ families · Transparent process · Result driven
        </motion.p>
      </div>
    </section>
  );
};

export default HowItWorks;
