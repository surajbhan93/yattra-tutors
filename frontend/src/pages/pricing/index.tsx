import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { lora, dmSans } from "@/lib/fonts";
import Footer from "@/components/landing/Footer";
import NavBar from "@/components/navbar/NavBar";
import WhatsappFloat from "@/components/common/WhatsappFloat";
import FloatingChatButton from "@/components/common/FloatingChatButton";
import {
  BookOpen,
  GraduationCap,
  Laptop,
  Award,
  MapPin,
  CheckCircle,
  Clock,
  ChevronDown,
  Users,
  Target,
  SearchCheck,
  ShieldOff,
} from "lucide-react";

/* =========================
   PRICING FAQ SCHEMA — untouched content, reused for JSON-LD + render
========================= */
interface Faq {
  name: string;
  acceptedAnswer: { text: string };
}

const pricingFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Yattra Tutors free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Yattra Tutors allows parents to browse tutors, attend demo classes, and explore options completely free. You pay only after confirming a tutor.",
      },
    },
    {
      "@type": "Question",
      name: "Does Yattra Tutors charge any registration fees?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Yattra Tutors does not charge any registration or platform fees for parents or students.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a tutor cost on Yattra Tutors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tutor fees vary based on class, subject, board, and experience. On average, fees range from ₹300 to ₹1200 per hour.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to subscribe to a monthly plan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No subscription is mandatory. Yattra Tutors follows a pay-after-confirmation model so parents can choose freely.",
      },
    },
    {
      "@type": "Question",
      name: "Are tutors verified on Yattra Tutors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All tutors on Yattra Tutors go through phone verification, document checks, subject evaluation, and interviews before approval.",
      },
    },
  ],
};

function FaqItem({ faq, index }: { faq: Faq; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center gap-4 px-6 py-4 text-left"
      >
        <span className="font-medium text-sm sm:text-base text-[#1C2B22]">{faq.name}</span>
        <ChevronDown size={16} className={`shrink-0 text-[#D79A2C] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-6 pb-4 text-sm text-[#58646C] leading-relaxed">{faq.acceptedAnswer.text}</div>
      )}
    </div>
  );
}

/* =========================
   DATA — untouched
========================= */
const platformPlans = [
  {
    id: "free",
    name: "Free Discovery",
    price: "₹0",
    duration: "No charges",
    description: "Explore tutors, attend demo classes, and decide without any upfront cost.",
    features: [
      "Browse verified tutors",
      "Free demo classes",
      "Unlimited tutor discovery",
      "Pay only after confirmation",
      "No platform registration fee",
    ],
    cta: "Find Tutors",
    highlighted: false,
  },
  {
    id: "assisted",
    name: "Assisted Learning",
    price: "Custom",
    duration: "Based on needs",
    description: "Get personalized support from Yattra Tutors experts for the best learning outcome.",
    features: [
      "Dedicated academic counselor",
      "Tutor matching & coordination",
      "Replacement guarantee",
      "Priority parent support",
      "Progress & performance tracking",
    ],
    cta: "Talk to Expert",
    highlighted: true,
  },
];

const whyDifferent = [
  { icon: ShieldOff, badge: "No inflated fees", title: "No commission pressure", desc: "Tutors decide their own fees. We never push commissions or force subscriptions." },
  { icon: Target, badge: "Risk-free learning", title: "Pay after satisfaction", desc: "Attend demo classes, interact with tutors, and pay only after you're confident." },
  { icon: SearchCheck, badge: "Nothing hidden", title: "Transparent matching", desc: "Pricing depends only on subject, experience, and teaching mode — no surprises." },
];

const pricingFactors = [
  { title: "Subject difficulty", desc: "Advanced subjects or deeper syllabi require specialized expertise.", icon: BookOpen },
  { title: "Class & board", desc: "CBSE, ICSE, IB, or State boards vary in curriculum complexity.", icon: GraduationCap },
  { title: "Mode of teaching", desc: "Online classes are generally more affordable than home tuition.", icon: Laptop },
  { title: "Tutor experience", desc: "Highly experienced and certified tutors typically charge more.", icon: Award },
  { title: "Location demand", desc: "Pricing varies based on city demand and availability of tutors.", icon: MapPin },
  { title: "Teaching frequency", desc: "Longer duration and higher frequency sessions may reduce per-hour cost.", icon: Clock },
];

const PARENT_POINTS = ["No registration fees", "Free demo classes", "Verified & trained tutors", "Replacement guarantee", "Dedicated dashboard & progress reports"];
const TUTOR_POINTS = ["No upfront joining fee", "More students, less marketing", "Transparent payout system", "Tutor dashboard & analytics", "Long-term teaching opportunities"];

/* =========================
   PAGE
========================= */
export default function PricingPage() {
  return (
    <>
      <NavBar />

      <Head>
        <title>Pricing & Fees | Transparent Tutor Costs | Yattra Tutors</title>
        <meta
          name="description"
          content="Understand Yattra Tutors pricing. No registration fees, free demo classes, and transparent tutor costs for CBSE, ICSE & State Board students."
        />
        <link rel="canonical" href="https://www.yattratutors.com/pricing" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingFaqSchema) }} />
      </Head>

      <div className={`relative w-full overflow-x-hidden bg-[#F7F2E9] ${dmSans.className}`}>
        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden bg-[#0E211C] px-6 sm:px-10 py-16 sm:py-20 text-center">
          <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-[.04]">
            <filter id="pricingGrain">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#pricingGrain)" />
          </svg>

          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`${lora.className} italic text-sm text-[#D79A2C] mb-4`}
            >
              Pricing you can see before you commit
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className={`${lora.className} text-3xl sm:text-4xl md:text-5xl font-semibold text-[#F7F2E9] leading-[1.15] mb-5`}
            >
              Simple, transparent pricing
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="mx-auto max-w-xl text-sm sm:text-base text-[#AAB6A2] leading-relaxed mb-9"
            >
              Yattra Tutors follows a transparent pricing model with no hidden
              charges or forced subscriptions. You pay only when you&apos;re
              completely satisfied with your tutor.
            </motion.p>

            <div className="mx-auto my-8 h-px w-16 bg-[#D79A2C]/20" />

            <p className="text-xs sm:text-sm text-[#7C9484]">
              {["Zero platform fee", "Free demo classes", "10,000+ verified tutors", "All boards covered"].join("  ·  ")}
            </p>
          </div>
        </section>

        {/* ================= STATS LEDGER ================= */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 relative z-10 pb-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-[#1C2B22]/[.08] rounded-lg bg-white border border-[#1C2B22]/[.08] shadow-[0_18px_40px_rgba(0,0,0,.08)]">
            {[
              { num: "10K+", label: "Verified tutors" },
              { num: "₹300", label: "Starting per hour" },
              { num: "15+", label: "Cities covered" },
              { num: "98%", label: "Parent satisfaction" },
            ].map(({ num, label }) => (
              <div key={label} className="flex flex-col items-center justify-center px-4 py-7 text-center">
                <span className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>{num}</span>
                <span className="mt-0.5 text-xs text-[#58646C] font-medium">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ================= PLATFORM PLANS ================= */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
          <div className="text-center mb-12">
            <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-3`}>Plans & pricing</p>
            <h2 className={`${lora.className} text-3xl sm:text-4xl font-semibold text-[#1C2B22]`}>Choose your path</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {platformPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-lg p-8 ${
                  plan.highlighted
                    ? "bg-[#0E211C] border border-[#D79A2C]/25"
                    : "bg-white border border-[#1C2B22]/10"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute top-0 right-6 -translate-y-1/2 text-[0.65rem] font-semibold tracking-wide px-3 py-1 rounded-full bg-[#D79A2C] text-[#17261D]">
                    Most popular
                  </span>
                )}

                <h3 className={`${lora.className} text-xl font-semibold ${plan.highlighted ? "text-[#F7F2E9]" : "text-[#1C2B22]"}`}>
                  {plan.name}
                </h3>
                <p className={`mt-1 text-sm ${plan.highlighted ? "text-[#AAB6A2]" : "text-[#9AA3AB]"}`}>
                  Best for {plan.id === "free" ? "parents exploring tutors risk-free" : "parents who want expert guidance"}
                </p>
                <p className={`mt-4 text-sm leading-relaxed ${plan.highlighted ? "text-[#AAB6A2]" : "text-[#58646C]"}`}>
                  {plan.description}
                </p>

                <div className="mt-7 flex items-end gap-2">
                  <span className={`${lora.className} text-4xl font-semibold ${plan.highlighted ? "text-[#D79A2C]" : "text-[#1C2B22]"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm mb-1 ${plan.highlighted ? "text-[#AAB6A2]" : "text-[#9AA3AB]"}`}>{plan.duration}</span>
                </div>

                <div className={`my-6 h-px ${plan.highlighted ? "bg-white/10" : "bg-[#1C2B22]/[.08]"}`} />

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle size={16} className={`mt-0.5 shrink-0 ${plan.highlighted ? "text-[#D79A2C]" : "text-[#1F6F54]"}`} />
                      <span className={`text-sm ${plan.highlighted ? "text-[#AAB6A2]" : "text-[#374151]"}`}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.id === "free" ? "/tutors" : "/contact"}
                  className={`mt-8 block w-full rounded-md px-6 py-3 text-center text-sm font-semibold transition-colors ${
                    plan.highlighted
                      ? "bg-[#D79A2C] text-[#17261D] hover:bg-[#c4891f]"
                      : "border border-[#1C2B22]/15 text-[#1C2B22] hover:border-[#1C2B22]/30"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ================= WHY DIFFERENT ================= */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-3`}>Our philosophy</p>
              <h2 className={`${lora.className} text-3xl sm:text-4xl font-semibold text-[#1C2B22]`}>
                Why our pricing is different
              </h2>
              <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-[#58646C]">
                We believe pricing should feel fair, honest, and completely in
                your control — not confusing or sales-driven.
              </p>
            </div>

            <div className="grid gap-0 sm:grid-cols-3 rounded-lg border border-[#1C2B22]/10 bg-white divide-y sm:divide-y-0 sm:divide-x divide-[#1C2B22]/10">
              {whyDifferent.map((item) => (
                <div key={item.title} className="p-7">
                  <item.icon size={20} className="text-[#D79A2C] mb-4" />
                  <span className="inline-block text-xs font-medium text-[#8a5f18] mb-2">{item.badge}</span>
                  <h4 className={`${lora.className} text-base font-semibold text-[#1C2B22] mb-1.5`}>{item.title}</h4>
                  <p className="text-sm text-[#58646C] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PRICING FACTORS ================= */}
        <section className="relative overflow-hidden bg-[#0E211C] py-16 sm:py-20 px-4 sm:px-6">
          <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-[.03]">
            <filter id="factorsGrain">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#factorsGrain)" />
          </svg>

          <div className="relative z-10 max-w-5xl mx-auto grid gap-12 md:grid-cols-2 items-start">
            {/* Left: heading + intro */}
            <div className="md:sticky md:top-28">
              <p className={`${lora.className} italic text-sm text-[#D79A2C] mb-3`}>Price breakdown</p>
              <h2 className={`${lora.className} text-3xl sm:text-4xl font-semibold text-[#F7F2E9] leading-[1.15] mb-5`}>
                What affects tutor pricing?
              </h2>
              <p className="text-sm sm:text-base text-[#AAB6A2] leading-relaxed mb-7">
                Tutor fees are determined by transparent, merit-based factors.
                Average fees range from{" "}
                <span className="text-[#D79A2C] font-semibold">₹300 to ₹1,200 per hour</span> — always in your control.
              </p>

              <div className="rounded-md border border-[#D79A2C]/20 bg-[#D79A2C]/[.06] p-4">
                <p className="text-sm text-[#D79A2C] leading-relaxed">
                  <strong>Pro tip:</strong> online classes cost less than home
                  tuition — a great way to save while getting quality education.
                </p>
              </div>
            </div>

            {/* Right: factor ledger */}
            <div className="divide-y divide-[#F7F2E9]/10 border-t border-[#F7F2E9]/10">
              {pricingFactors.map((item) => (
                <div key={item.title} className="flex gap-4 py-5">
                  <item.icon size={18} className="text-[#D79A2C] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm text-[#F7F2E9] mb-1">{item.title}</h4>
                    <p className="text-sm text-[#AAB6A2] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PARENTS vs TUTORS ================= */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-3`}>Ecosystem</p>
              <h2 className={`${lora.className} text-3xl sm:text-4xl font-semibold text-[#1C2B22]`}>
                Built for parents & tutors
              </h2>
              <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-[#58646C]">
                Yattra Tutors creates a fair ecosystem where parents get
                quality education and tutors grow with confidence.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-[#1C2B22]/10 bg-white p-7">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#1C2B22]/[.08]">
                  <Users size={18} className="text-[#1F6F54]" />
                  <h3 className={`${lora.className} text-lg font-semibold text-[#1C2B22]`}>For parents</h3>
                </div>
                <ul className="divide-y divide-[#1C2B22]/[.06]">
                  {PARENT_POINTS.map((item) => (
                    <li key={item} className="flex items-center gap-3 py-3">
                      <CheckCircle size={15} className="text-[#1F6F54] shrink-0" />
                      <span className="text-sm text-[#374151]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-[#D79A2C]/20 bg-white p-7">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#1C2B22]/[.08]">
                  <GraduationCap size={18} className="text-[#D79A2C]" />
                  <h3 className={`${lora.className} text-lg font-semibold text-[#1C2B22]`}>For tutors</h3>
                </div>
                <ul className="divide-y divide-[#1C2B22]/[.06]">
                  {TUTOR_POINTS.map((item) => (
                    <li key={item} className="flex items-center gap-3 py-3">
                      <CheckCircle size={15} className="text-[#D79A2C] shrink-0" />
                      <span className="text-sm text-[#374151]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-3`}>FAQ</p>
              <h2 className={`${lora.className} text-3xl sm:text-4xl font-semibold text-[#1C2B22]`}>
                Common pricing questions
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#58646C]">
                Everything you need to know about Yattra Tutors pricing, demos, and payments.
              </p>
            </div>

            <div className="rounded-lg border border-[#1C2B22]/10 bg-white divide-y divide-[#1C2B22]/10">
              {pricingFaqSchema.mainEntity.map((faq, idx) => (
                <FaqItem key={faq.name} faq={faq} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="relative overflow-hidden bg-[#0E211C] py-16 sm:py-20 px-6 text-center">
          <div className="relative z-10 max-w-xl mx-auto">
            <p className={`${lora.className} italic text-sm text-[#D79A2C] mb-4`}>
              &quot;Education should be a decision, not a gamble&quot;
            </p>

            <h2 className={`${lora.className} text-2xl sm:text-3xl md:text-4xl font-semibold text-[#F7F2E9] leading-[1.15] mb-5`}>
              Education should be a decision, not a risk
            </h2>

            <p className="max-w-xl mx-auto text-sm sm:text-base text-[#AAB6A2] leading-relaxed mb-9">
              With Yattra Tutors, you explore tutors freely, attend demo
              classes, and move forward only when you&apos;re confident and satisfied.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link
                href="/tutors"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#D79A2C] px-7 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
              >
                Find a tutor
              </Link>
              <Link
                href="/tutor-flow/tutor-registration/"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[#F7F2E9]/20 px-7 py-3 text-sm font-semibold text-[#F7F2E9] transition-colors hover:border-[#F7F2E9]/40 hover:bg-white/5"
              >
                Become a tutor
              </Link>
            </div>
          </div>
        </section>
      </div>

      <FloatingChatButton />
      <WhatsappFloat />
      <Footer />
    </>
  );
}
