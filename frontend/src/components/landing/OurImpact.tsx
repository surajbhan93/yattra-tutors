"use client";

import { Globe, Video, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { lora, dmSans } from "@/lib/fonts";

/*
 * ═══════════════════════════════════════════════════════
 *  OUR IMPACT — "The Ledger"
 *  Numbers as a single typeset ledger (one accent, Lora
 *  numerals) instead of seven differently-coloured gradient
 *  stat cards; the map keeps its floating labels but in the
 *  pine/gold palette instead of blue/indigo SaaS chips.
 * ═══════════════════════════════════════════════════════
 */

type StatItem = {
  value: number;
  unit: string;
  description: string;
};

const statsData: StatItem[] = [
  { value: 2800, unit: "tutors", description: "in Allahabad" },
  { value: 1000, unit: "tutors", description: "in Lucknow" },
  { value: 11500, unit: "tutors", description: "across other regions" },
  { value: 4000, unit: "students", description: "taught in the last 2 years" },
  { value: 2800, unit: "students", description: "scored 99% & above" },
  { value: 2300, unit: "students", description: "scored 98% & above" },
  { value: 1500, unit: "students", description: "scored 90% & above" },
];

const avatarsData = [
  { src: "/images/avatars/avatar-1.jpg", className: "top-8 left-10 h-12 w-12" },
  { src: "/images/avatars/avatar-2.jpg", className: "top-1/3 right-10 h-16 w-16" },
  { src: "/images/avatars/avatar-3.jpg", className: "bottom-20 left-1/3 h-10 w-10" },
  { src: "/images/avatars/avatar-4.jpg", className: "bottom-10 right-1/4 h-14 w-14" },
];

const OurImpact = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className={`relative overflow-hidden bg-[#F7F2E9] py-16 sm:py-24 ${dmSans.className}`}>
      <div ref={ref} className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-xl mb-14"
        >
          <p className={`${lora.className} italic text-sm text-[#6B5636] mb-3`}>Trusted across India</p>
          <h2 className={`${lora.className} text-[32px] sm:text-[40px] font-semibold leading-[1.15] text-[#1C2B22]`}>
            Our impact, by the numbers
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14">
          {/* LEFT — the ledger */}
          <motion.dl
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="divide-y divide-[#1C2B22]/[.08] border-y border-[#1C2B22]/[.08]"
          >
            {statsData.map((stat, i) => (
              <div key={stat.description} className="flex items-baseline justify-between gap-4 py-4">
                <dd className="text-sm text-[#58646C]">{stat.description}</dd>
                <dt className={`${lora.className} text-2xl sm:text-[28px] font-semibold text-[#D79A2C] whitespace-nowrap`}>
                  {inView ? <CountUp end={stat.value} duration={2} separator="," delay={i * 0.05} /> : 0}
                  <span className="text-sm font-normal text-[#58646C] ml-1.5">{stat.unit}</span>
                </dt>
              </div>
            ))}
          </motion.dl>

          {/* RIGHT — map + floaters */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="relative hidden min-h-[420px] lg:block"
          >
            <div className="absolute inset-6 rounded-xl border border-[#1C2B22]/[.08] bg-white/60" />

            <div className="absolute inset-0">
              <Image src="/images/india-map-dotted-blue.png" alt="India Map" fill className="object-contain opacity-20 grayscale" />
            </div>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute left-[14%] top-[18%] flex items-center gap-3 rounded-lg bg-[#1C2B22] px-4 py-3 shadow-[0_14px_30px_rgba(0,0,0,.18)]"
            >
              <Video className="h-5 w-5 text-[#D79A2C] flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-[#F5F1E6]">Short animated</p>
                <p className="text-xs text-[#AAB6A2]">videos for concepts</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[26%] right-[13%] flex items-center gap-3 rounded-lg bg-[#1C2B22] px-4 py-3 shadow-[0_14px_30px_rgba(0,0,0,.18)]"
            >
              <Globe className="h-5 w-5 text-[#D79A2C] flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-[#F5F1E6]">Yattra Tutors</p>
                <p className="text-xs text-[#AAB6A2]">Pan-India network</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-[14%] left-[16%] flex items-center gap-2 rounded-full bg-[#D79A2C] px-4 py-2 shadow-[0_10px_24px_rgba(215,154,44,.3)]"
            >
              <MapPin className="h-3.5 w-3.5 text-[#17261D]" />
              <p className="text-xs font-semibold text-[#17261D]">4,000+ students taught</p>
            </motion.div>

            {avatarsData.map((avatar, i) => (
              <motion.div
                key={avatar.src}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5 + i, ease: "easeInOut", delay: i * 0.4 }}
                className={`absolute ${avatar.className}`}
              >
                <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-white shadow-[0_8px_20px_rgba(0,0,0,.15)]">
                  <Image src={avatar.src} alt="Student" fill className="object-cover" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurImpact;
