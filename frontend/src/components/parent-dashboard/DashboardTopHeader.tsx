"use client";

import { motion } from "framer-motion";
import { GraduationCap, Users, School } from "lucide-react";

export default function DashboardTopHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 rounded-md border border-[#1C2B22]/10 bg-[#0E211C] p-5 text-[#F7F2E9]"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* LEFT TEXT */}
        <div>
          <h2 className="text-base font-semibold">Assignment submission guidelines</h2>
          <p className="mt-1 max-w-xl text-sm text-[#AAB6A2]">
            Complete your assignment honestly. Do not cheat. Write the assignment properly, take clear
            screenshots or photos, convert them into a single PDF file, and upload it here.
          </p>
        </div>

        {/* RIGHT TAGS */}
        <div className="flex flex-wrap gap-3 text-xs font-medium">
          <span className="flex items-center gap-1.5 rounded-full border border-[#D79A2C]/30 px-3 py-1 text-[#D79A2C]">
            <School className="h-3.5 w-3.5" />
            Institution
          </span>

          <span className="flex items-center gap-1.5 rounded-full border border-[#D79A2C]/30 px-3 py-1 text-[#D79A2C]">
            <GraduationCap className="h-3.5 w-3.5" />
            Student responsibility
          </span>

          <span className="flex items-center gap-1.5 rounded-full border border-[#D79A2C]/30 px-3 py-1 text-[#D79A2C]">
            <Users className="h-3.5 w-3.5" />
            Parent supervision
          </span>
        </div>
      </div>
    </motion.div>
  );
}
