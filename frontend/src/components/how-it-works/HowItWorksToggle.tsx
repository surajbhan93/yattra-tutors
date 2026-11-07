import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { Users, GraduationCap, ShieldCheck, BookOpen, Wallet, BarChart3 } from "lucide-react";
import { lora, dmSans } from "@/lib/fonts";

import ParentFlow from "./ParentFlow";
import TutorFlow from "./TutorFlow";

type ViewType = "parent" | "tutor";

/* ======================
   SUMMARY DATA — untouched
====================== */
const SUMMARY = {
  parent: [
    { icon: ShieldCheck, title: "Verified tutors", desc: "Background-checked, interviewed & approved tutors only." },
    { icon: BookOpen, title: "All subjects & boards", desc: "CBSE, ICSE & State Board tutors for all major subjects." },
    { icon: BarChart3, title: "Parent dashboard", desc: "Track attendance, performance & monthly reports." },
  ],
  tutor: [
    { icon: Users, title: "Real student leads", desc: "Get matched with students based on subject & location." },
    { icon: Wallet, title: "Transparent payments", desc: "Clear earnings, payouts & payment history." },
    { icon: BarChart3, title: "Tutor dashboard", desc: "Manage students, assignments & income easily." },
  ],
};

export default function HowItWorksToggle() {
  const router = useRouter();
  const { type } = router.query;

  const [active, setActive] = useState<ViewType>("parent");

  useEffect(() => {
    if (type === "parent" || type === "tutor") {
      setActive(type);
    }
  }, [type]);

  const changeView = (view: ViewType) => {
    setActive(view);
    router.replace(
      { pathname: router.pathname, query: { ...router.query, type: view } },
      undefined,
      { shallow: true }
    );
  };

  return (
    <section className={`${dmSans.className}`}>
      {/* ======================
          TOGGLE
      ====================== */}
      <div className="flex justify-center">
        <div className="relative inline-flex w-full sm:w-auto max-w-md rounded-md border border-[#1C2B22]/10 bg-white p-1">
          <button
            onClick={() => changeView("parent")}
            className={`relative z-10 flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm text-sm font-semibold transition ${
              active === "parent" ? "text-[#F7F2E9]" : "text-[#58646C]"
            }`}
          >
            <Users size={16} />
            Parents
          </button>

          <button
            onClick={() => changeView("tutor")}
            className={`relative z-10 flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm text-sm font-semibold transition ${
              active === "tutor" ? "text-[#F7F2E9]" : "text-[#58646C]"
            }`}
          >
            <GraduationCap size={16} />
            Tutors
          </button>

          <motion.div
            layout
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-sm bg-[#1C2B22]"
            style={{ left: active === "parent" ? "4px" : "calc(50%)" }}
          />
        </div>
      </div>

      {/* ======================
          SUMMARY LEDGER
      ====================== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="mt-10 sm:mt-12 max-w-5xl mx-auto grid gap-0 sm:grid-cols-3 rounded-lg border border-[#1C2B22]/10 bg-white divide-y sm:divide-y-0 sm:divide-x divide-[#1C2B22]/10"
        >
          {SUMMARY[active].map((item) => (
            <div key={item.title} className="p-6">
              <item.icon size={18} className="text-[#D79A2C] mb-3" />
              <h4 className={`${lora.className} text-base font-semibold text-[#1C2B22] mb-1.5`}>
                {item.title}
              </h4>
              <p className="text-sm text-[#58646C] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* ======================
          FLOW CONTENT
      ====================== */}
      <AnimatePresence mode="wait">
        {active === "parent" ? (
          <motion.div key="parent" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
            <ParentFlow />
          </motion.div>
        ) : (
          <motion.div key="tutor" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
            <TutorFlow />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
