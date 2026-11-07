import { motion, Variants } from "framer-motion";
import {
  Search,
  UserPlus,
  ClipboardList,
  Users,
  ShieldCheck,
  Home,
  RefreshCcw,
  LayoutDashboard,
  BarChart3,
  Wallet,
  CalendarCheck,
  Video,
  ArrowRight,
} from "lucide-react";
import { lora, dmSans } from "@/lib/fonts";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

/* ====================== DATA — untouched ====================== */
const PARENT_STEPS = [
  { step: "1", title: "Create parent account", desc: "Click on “Find a Tutor” and register on Yattra Tutors by creating your parent account.", icon: UserPlus },
  { step: "2", title: "Add student details", desc: "Enter student class, subject, board, medium, and learning preferences.", icon: ClipboardList },
  { step: "3", title: "Get matching tutors", desc: "Based on your requirements, we show you the most suitable verified tutors.", icon: Search },
  { step: "4", title: "Send tutor request", desc: "Review tutor profiles and send a request to the tutor you prefer.", icon: Users },
  { step: "5", title: "Parent verification", desc: "Our team verifies parent details to ensure a safe and trusted learning environment.", icon: ShieldCheck },
  { step: "6", title: "Tutor assigned to home", desc: "A verified Yattra Tutors tutor is sent to your home for teaching.", icon: Home },
  { step: "7", title: "Replacement if needed", desc: "If you are not satisfied, we provide another verified tutor at no extra hassle.", icon: RefreshCcw },
  { step: "8", title: "Access parent dashboard", desc: "Manage students, track performance, attendance, payments, and more.", icon: LayoutDashboard },
];

const DASHBOARD_FEATURES = [
  { label: "Multiple students", icon: Users },
  { label: "Monthly performance reports", icon: BarChart3 },
  { label: "Attendance tracking", icon: CalendarCheck },
  { label: "Test series & assessments", icon: ClipboardList },
  { label: "Payments & invoices", icon: Wallet },
  { label: "Tutor communication", icon: Video },
];

export default function ParentFlow() {
  return (
    <section className={`relative mt-16 sm:mt-20 space-y-14 sm:space-y-20 ${dmSans.className}`}>
      {/* HEADER */}
      <motion.header
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center space-y-4 px-4"
      >
        <p className={`${lora.className} italic text-sm text-[#8a5f18]`}>For parents & students</p>

        <h2 className={`${lora.className} text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1C2B22]`}>
          How it works for parents
        </h2>

        <p className="text-sm sm:text-base text-[#58646C]">
          Yattra Tutors simplifies the entire process of finding, verifying,
          and managing tutors for your child — ensuring quality, safety, and
          measurable academic progress.
        </p>

        <a
          href="/find-tutor-flow/create-account/"
          className="inline-flex items-center gap-2 rounded-md bg-[#D79A2C] px-6 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
        >
          Find a tutor
          <ArrowRight size={15} />
        </a>
      </motion.header>

      {/* STEP LEDGER */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 px-4"
      >
        {PARENT_STEPS.map((s) => (
          <motion.div
            key={s.step}
            variants={fadeUp}
            className="h-full rounded-lg border border-[#1C2B22]/10 bg-white p-5 border-l-4 border-l-[#D79A2C]"
          >
            <div className="flex items-start gap-3">
              <s.icon size={18} className="text-[#D79A2C] mt-0.5 shrink-0" />
              <div>
                <p className={`${lora.className} text-xs font-semibold text-[#8a5f18]`}>Step {s.step}</p>
                <h3 className="text-sm font-semibold text-[#1C2B22] mt-0.5">{s.title}</h3>
                <p className="mt-1.5 text-xs text-[#58646C] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* DASHBOARD FEATURES — LEDGER */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-4 rounded-lg bg-[#0E211C] p-6 sm:p-10"
      >
        <h3 className={`${lora.className} text-xl sm:text-2xl font-semibold text-[#F7F2E9] mb-6 text-center`}>
          Parent dashboard features
        </h3>

        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 divide-y sm:divide-y-0 divide-x-0 sm:divide-x divide-[#F7F2E9]/10">
          {DASHBOARD_FEATURES.map((f, i) => (
            <div key={f.label} className={`flex items-center gap-3 px-2 sm:px-6 py-3 ${i % 2 === 0 ? "" : ""}`}>
              <f.icon size={16} className="text-[#D79A2C] shrink-0" />
              <p className="text-sm text-[#AAB6A2]">{f.label}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* FINAL CTA */}
      <motion.footer
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center space-y-5 px-4"
      >
        <h3 className={`${lora.className} text-2xl sm:text-3xl font-semibold text-[#1C2B22]`}>
          Ready to find the right tutor for your child?
        </h3>

        <p className="max-w-xl mx-auto text-sm sm:text-base text-[#58646C]">
          Join thousands of parents who trust Yattra Tutors for safe,
          reliable, and result-oriented home tutoring.
        </p>

        <a
          href="/find-tutor-flow/create-account/"
          className="inline-flex items-center gap-2 rounded-md bg-[#D79A2C] px-6 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
        >
          Get started now
        </a>
      </motion.footer>
    </section>
  );
}
