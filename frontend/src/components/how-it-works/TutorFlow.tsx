import { motion, Variants } from "framer-motion";
import {
  UserPlus,
  ClipboardCheck,
  ShieldCheck,
  Video,
  CheckCircle,
  LayoutDashboard,
  Wallet,
  Users,
  ArrowRight,
} from "lucide-react";
import { Lora, DM_Sans } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["italic", "normal"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

/* ====================== DATA — untouched ====================== */
const STEPS = [
  { step: "1", title: "Register as a tutor", desc: "Click on “Become a Tutor” and complete the registration form with your subjects, qualifications, and teaching experience.", icon: UserPlus },
  { step: "2", title: "OTP & profile verification", desc: "Verify your phone number via OTP and submit your details for background and profile verification.", icon: ShieldCheck },
  { step: "3", title: "Internal review (2–3 days)", desc: "Our team reviews your profile, documents, and subject expertise to ensure quality standards.", icon: ClipboardCheck },
  { step: "4", title: "Interview & demo session", desc: "Attend a short interview or demo session to evaluate teaching skills and subject clarity.", icon: Video },
  { step: "5", title: "Final selection", desc: "Once you pass all rounds, you are officially onboarded as a Yattra Tutors tutor.", icon: CheckCircle },
  { step: "6", title: "Get tutor dashboard", desc: "Access your personal dashboard to manage students, assignments, payments, and teaching schedule.", icon: LayoutDashboard },
];

const DASHBOARD_FEATURES = [
  { label: "Assignments & classes", icon: ClipboardCheck },
  { label: "Payments & earnings", icon: Wallet },
  { label: "Students you teach", icon: Users },
  { label: "Online / offline teaching", icon: Video },
];

export default function TutorFlow() {
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
        <p className={`${lora.className} italic text-sm text-[#8a5f18]`}>Become a tutor at Yattra Tutors</p>

        <h2 className={`${lora.className} text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1C2B22]`}>
          How it works for tutors
        </h2>

        <p className="text-sm sm:text-base text-[#58646C]">
          Join Yattra Tutors as a subject expert and start teaching students
          across CBSE, ICSE, and State Boards through a structured,
          transparent onboarding process.
        </p>

        <a
          href="/tutor-flow/tutor-registration/"
          className="inline-flex items-center gap-2 rounded-md bg-[#D79A2C] px-6 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
        >
          Become a tutor
          <ArrowRight size={15} />
        </a>
      </motion.header>

      {/* STEP LEDGER */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 px-4"
      >
        {STEPS.map((s) => (
          <motion.div
            key={s.step}
            variants={fadeUp}
            className="h-full rounded-lg border border-[#1C2B22]/10 bg-white p-5 border-l-4 border-l-[#D79A2C]"
          >
            <div className="flex items-start gap-3">
              <s.icon size={18} className="text-[#D79A2C] mt-0.5 shrink-0" />
              <div>
                <p className={`${lora.className} text-xs font-semibold text-[#8a5f18]`}>Step {s.step}</p>
                <h3 className="text-sm sm:text-base font-semibold text-[#1C2B22] mt-0.5">{s.title}</h3>
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
          Your tutor dashboard includes
        </h3>

        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 divide-y sm:divide-y-0 divide-x-0 sm:divide-x divide-[#F7F2E9]/10">
          {DASHBOARD_FEATURES.map((f) => (
            <div key={f.label} className="flex items-center gap-3 px-2 sm:px-6 py-3">
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
          Ready to start teaching?
        </h3>

        <p className="max-w-xl mx-auto text-sm sm:text-base text-[#58646C]">
          Join Yattra Tutors today and become part of a growing community of
          professional tutors making real academic impact.
        </p>

        <a
          href="/tutor-flow/tutor-registration/"
          className="inline-flex items-center gap-2 rounded-md bg-[#D79A2C] px-6 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
        >
          Register as a tutor
        </a>
      </motion.footer>
    </section>
  );
}
