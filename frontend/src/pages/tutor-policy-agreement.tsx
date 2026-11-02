import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/landing/Footer";
import { Lora, DM_Sans } from "next/font/google";
import {
  ShieldCheck,
  Award,
  AlertTriangle,
  CheckCircle2,
  Lock,
  DollarSign,
  PhoneCall,
  Check,
  X,
  Gift,
  Clock,
  Sparkles,
} from "lucide-react";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["italic", "normal"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

const SECTION_NAV = [
  { href: "#revenue-sharing", label: "1. Revenue share & payments" },
  { href: "#operational-policies", label: "2. Operational & non-circumvention rules" },
  { href: "#membership-plans", label: "3. Membership plans" },
  { href: "#tutor-benefits", label: "4. Tutor benefits" },
  { href: "#digital-signature", label: "5. Digital consent & sign", highlight: true },
];

export default function TutorPolicyAgreementPage() {
  const [tutorName, setTutorName] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [panNo, setPanNo] = useState("");
  const [signatureDate, setSignatureDate] = useState(new Date().toISOString().split("T")[0]);
  const [signed, setSigned] = useState(false);

  const handleDigitalSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorName.trim() || !panNo.trim()) {
      alert("Please fill in your Full Name and PAN Number.");
      return;
    }
    setSigned(true);
  };

  return (
    <>
      <Head>
        <title>Yattra Tutors Tutor Agreement, Operational Policies &amp; Pricing Terms</title>
        <meta
          name="description"
          content="Unified Yattra Tutors Tutor Agreement (Annexure A & B), Revenue Sharing Models (30% 1st month with Subscription / 50% without Subscription), Policies, and Digital Consent."
        />
      </Head>

      <NavBar />

      <div className={`min-h-screen bg-[#F7F2E9] ${dmSans.className}`}>
        {/* HERO */}
        <div className="relative overflow-hidden bg-[#0E211C] py-14 md:py-20 px-4">
          <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-[.04]">
            <filter id="agreementGrain">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#agreementGrain)" />
          </svg>

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
            <p className={`${lora.className} italic text-sm text-[#D79A2C]`}>
              Unified Yattra Tutors tutor agreement &amp; terms
            </p>

            <h1 className={`${lora.className} text-2xl sm:text-3xl md:text-4xl font-semibold text-[#F7F2E9] leading-[1.2]`}>
              Tutor agreement, annexure A, B &amp; pricing policies
            </h1>

            <p className="text-sm text-[#AAB6A2] max-w-2xl mx-auto leading-relaxed">
              Complete operational guidelines, revenue sharing models (30% 1st month for subscription
              tutors / 50% for revenue-share tutors), non-circumvention rules, and tutor benefits.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-2.5 text-xs font-medium">
              {SECTION_NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={
                    item.highlight
                      ? "px-3.5 py-2 rounded-md bg-[#D79A2C] text-[#17261D] font-semibold"
                      : "px-3.5 py-2 rounded-md border border-[#F7F2E9]/15 text-[#AAB6A2] transition-colors hover:border-[#F7F2E9]/30"
                  }
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14 space-y-10">
          {/* SECTION 1: REVENUE SHARING */}
          <section id="revenue-sharing" className="rounded-lg border border-[#1C2B22]/10 bg-white p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#1C2B22]/[.08]">
              <span className={`${lora.className} text-lg font-semibold text-[#D79A2C]`}>01</span>
              <div>
                <h2 className={`${lora.className} text-lg md:text-xl font-semibold text-[#1C2B22]`}>
                  Revenue sharing models &amp; payment handling policy
                </h2>
                <p className="text-xs text-[#9AA3AB] mt-0.5">
                  Yattra Tutors operates on two clear tutor engagement models (subscription vs 50% revenue share)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="rounded-lg bg-[#0E211C] p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-[#D79A2C] text-[#17261D] text-[10px] font-semibold uppercase tracking-wide">
                    Recommended model
                  </span>
                  <Sparkles size={16} className="text-[#D79A2C]" />
                </div>
                <h3 className="text-base font-semibold text-[#F7F2E9]">Subscription model (priority access)</h3>
                <div className="space-y-2 text-xs text-[#AAB6A2] leading-relaxed">
                  <p>
                    <strong className="text-[#D79A2C] text-sm">30% revenue share (1st month only)</strong>: subscription
                    tutors get priority student lead matching and pay only 30% revenue share for the first month.
                  </p>
                  <p>
                    <strong className="text-[#F7F2E9]">Includes lead credits:</strong> access direct parent contact
                    details, featured profile promotion, analytics, and priority placement.
                  </p>
                  <p className="text-[11px] text-[#7C9484] pt-1">
                    Subscription plans range from ₹299/mo (10 credits), ₹699/mo (30 credits), to ₹1499/mo (75 credits).
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-[#1C2B22]/10 bg-[#F7F2E9] p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-[#1F6F54]/10 text-[#1F6F54] text-[10px] font-semibold uppercase tracking-wide">
                    No upfront fee
                  </span>
                  <DollarSign size={16} className="text-[#1F6F54]" />
                </div>
                <h3 className="text-base font-semibold text-[#1C2B22]">50% revenue-share model (no subscription)</h3>
                <div className="space-y-2 text-xs text-[#58646C] leading-relaxed">
                  <p>
                    <strong className="text-[#1F6F54] text-sm">50% revenue share:</strong> don&apos;t want to purchase a
                    subscription? Work with Yattra Tutors on a 50% revenue-sharing model without any upfront investment.
                  </p>
                  <p>Opportunities are provided based on lead availability and student-tutor matching criteria.</p>
                  <p className="text-[11px] text-[#9AA3AB] pt-1">
                    Interested? WhatsApp us directly at{" "}
                    <a href="https://wa.me/916363453870" target="_blank" rel="noreferrer" className="text-[#1F6F54] font-semibold underline">
                      +91-6363453870
                    </a>.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-md bg-[#F7F2E9] border border-[#1C2B22]/10 p-5 space-y-3 text-xs text-[#58646C]">
              <div className="font-semibold text-[#1C2B22] flex items-center gap-2 text-sm">
                <Lock size={15} className="text-[#D79A2C]" />
                Mandatory payment handling rules:
              </div>
              <ul className="space-y-2 list-disc pl-5 leading-relaxed">
                <li>
                  <strong className="text-[#1C2B22]">All payments through Yattra Tutors only:</strong> all tuition
                  payments from parents or students shall be made only to Yattra Tutors. Tutors shall not accept cash,
                  UPI, bank transfers, or any direct payment from parents/students.
                </li>
                <li>
                  <strong className="text-[#1C2B22]">Fee discussion routing:</strong> any discussion related to fees,
                  discounts, demo classes, or payment schedules must be routed strictly through the Yattra Tutors team only.
                </li>
                <li>
                  <strong className="text-[#1C2B22]">Platform usage:</strong> tutors must strictly follow the schedule,
                  subject, class format, and duration assigned by Yattra Tutors. Tutors cannot independently alter fees
                  or terms with parents/students.
                </li>
              </ul>
            </div>
          </section>

          {/* SECTION 2: OPERATIONAL & NON-CIRCUMVENTION */}
          <section id="operational-policies" className="rounded-lg border border-[#1C2B22]/10 bg-white p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#1C2B22]/[.08]">
              <span className={`${lora.className} text-lg font-semibold text-[#D79A2C]`}>02</span>
              <div>
                <h2 className={`${lora.className} text-lg md:text-xl font-semibold text-[#1C2B22]`}>
                  Operational guidelines, confidentiality &amp; non-circumvention
                </h2>
                <p className="text-xs text-[#9AA3AB] mt-0.5">
                  Rules regarding lead protection, student interaction, and post-assignment lock
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-[#D79A2C]/[.06] border border-[#D79A2C]/20 p-6 space-y-3">
              <div className="flex items-center gap-2 font-semibold text-[#8a5f18] text-sm">
                <AlertTriangle size={17} className="text-[#D79A2C] shrink-0" />
                Restriction on direct coaching &amp; independent dealings (annexure A &amp; B)
              </div>
              <p className="text-xs text-[#6B5636] leading-relaxed">
                Tutors are free to teach independently or be associated with any school or institute of their choice.
                However, tutors are <strong>strictly prohibited from providing any direct coaching, tuition, or
                educational services (online or offline) to any parent or student introduced through Yattra
                Tutors</strong>, except through Yattra Tutors.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-medium text-[#1C2B22] pt-1">
                {[
                  "No private coaching to Yattra Tutors parents/students",
                  "No inviting students to personal batches",
                  "No bypassing through friends or 3rd parties",
                  "12-month post-assignment restriction",
                ].map((rule) => (
                  <div key={rule} className="p-3 bg-white rounded-md border border-[#D79A2C]/20 flex items-center gap-2">
                    <X size={14} className="text-red-500 shrink-0" /> {rule}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#58646C]">
              <div className="p-5 rounded-md bg-[#F7F2E9] border border-[#1C2B22]/10 space-y-2">
                <div className="font-semibold text-[#1C2B22] text-sm flex items-center gap-2">
                  <Lock size={15} className="text-[#D79A2C]" />
                  Data protection &amp; confidentiality
                </div>
                <p className="leading-relaxed">
                  Tutors shall not share, forward, sell, or misuse parent contact details, student info, or Yattra
                  Tutors internal records with any individual, coaching institute, or third-party organization. This
                  obligation remains valid even after agreement termination.
                </p>
              </div>

              <div className="p-5 rounded-md bg-[#F7F2E9] border border-[#1C2B22]/10 space-y-2">
                <div className="font-semibold text-[#1C2B22] text-sm flex items-center gap-2">
                  <PhoneCall size={15} className="text-[#D79A2C]" />
                  Immediate lead disclosure
                </div>
                <p className="leading-relaxed">
                  If a tutor receives any inquiry, referral, or request from a Yattra Tutors-associated parent or
                  student, it must be immediately reported to Yattra Tutors. Non-disclosure of referrals shall be
                  treated as intentional misconduct.
                </p>
              </div>

              <div className="p-5 rounded-md bg-[#F7F2E9] border border-[#1C2B22]/10 space-y-2">
                <div className="font-semibold text-[#1C2B22] text-sm flex items-center gap-2">
                  <ShieldCheck size={15} className="text-[#D79A2C]" />
                  Professional conduct &amp; discipline
                </div>
                <p className="leading-relaxed">
                  Tutors must maintain professional language, discipline, punctuality, and commitment. Any form of
                  misbehavior or unprofessional conduct may result in immediate disciplinary action.
                </p>
              </div>

              <div className="p-5 rounded-md bg-[#F7F2E9] border border-[#1C2B22]/10 space-y-2">
                <div className="font-semibold text-[#1C2B22] text-sm flex items-center gap-2">
                  <Clock size={15} className="text-[#D79A2C]" />
                  12-month post-assignment lock
                </div>
                <p className="leading-relaxed">
                  Even after completion or termination of a Yattra Tutors assignment, the tutor shall not contact or
                  teach the same parent/student independently for a minimum period of 12 months.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-md bg-red-50 border border-red-200 space-y-3">
              <div className="font-semibold text-red-900 text-sm flex items-center gap-2">
                <AlertTriangle size={15} className="text-red-600" />
                Consequences of policy violations:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs font-semibold text-red-700">
                {["Permanent removal from platform", "Forfeiture of 5% security deposit", "Financial penalty up to ₹10,000", "Legal action as required"].map((c) => (
                  <div key={c} className="p-3 bg-white rounded-md border border-red-200 text-center">{c}</div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 3: MEMBERSHIP PLANS */}
          <section id="membership-plans" className="rounded-lg border border-[#1C2B22]/10 bg-white p-6 md:p-8 space-y-7">
            <div className="flex items-center gap-3 pb-4 border-b border-[#1C2B22]/[.08]">
              <span className={`${lora.className} text-lg font-semibold text-[#D79A2C]`}>03</span>
              <div>
                <h2 className={`${lora.className} text-lg md:text-xl font-semibold text-[#1C2B22]`}>
                  Tutor membership plans &amp; credit bundles
                </h2>
                <p className="text-xs text-[#9AA3AB] mt-0.5">
                  Choose the plan that fits your tutoring goals and lead requirements
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* FREE */}
              <div className="rounded-lg border border-[#1C2B22]/10 p-6 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-base text-[#1C2B22]">Free</h3>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[#1C2B22]/[.06] text-[#58646C]">Current</span>
                  </div>
                  <div className="mt-3">
                    <span className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>₹0</span>
                    <span className="text-xs text-[#9AA3AB]">/mo</span>
                  </div>
                  <p className="text-xs text-[#9AA3AB] mt-1">0 lead credits</p>
                  <ul className="mt-5 space-y-2 text-xs text-[#58646C]">
                    <li className="flex items-center gap-2"><Check size={14} className="text-[#9AA3AB] shrink-0" /> Basic tutor profile</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-[#9AA3AB] shrink-0" /> Standard lead search</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-[#9AA3AB] shrink-0" /> 50% revenue share model</li>
                  </ul>
                </div>
                <button className="w-full py-2.5 rounded-md bg-[#F7F2E9] text-[#58646C] font-semibold text-xs cursor-default">Active free plan</button>
              </div>

              {/* STARTER */}
              <div className="rounded-lg border border-[#1C2B22]/10 p-6 flex flex-col justify-between gap-6">
                <div>
                  <h3 className="font-semibold text-base text-[#1C2B22]">Starter</h3>
                  <div className="mt-3">
                    <span className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>₹299</span>
                    <span className="text-xs text-[#9AA3AB]">/mo</span>
                  </div>
                  <p className="text-xs font-semibold text-[#8a5f18] mt-1">10 credits included</p>
                  <ul className="mt-5 space-y-2 text-xs text-[#58646C]">
                    <li className="flex items-center gap-2"><Check size={14} className="text-[#D79A2C] shrink-0" /> 30% 1st month share</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-[#D79A2C] shrink-0" /> Featured profile</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-[#D79A2C] shrink-0" /> Direct contact access</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-[#D79A2C] shrink-0" /> Priority matching</li>
                  </ul>
                </div>
                <Link href="/tutor-flow/tutor-registration" className="w-full block text-center py-2.5 rounded-md border border-[#1C2B22]/15 text-[#1C2B22] font-semibold text-xs transition-colors hover:border-[#1C2B22]/30">
                  Get started
                </Link>
              </div>

              {/* PRO */}
              <div className="relative rounded-lg bg-[#0E211C] p-6 flex flex-col justify-between gap-6 border border-[#D79A2C]/25">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D79A2C] text-[#17261D] text-[10px] font-semibold uppercase px-3 py-1 rounded-full tracking-wide">
                  Most popular
                </span>
                <div>
                  <h3 className="font-semibold text-base text-[#F7F2E9]">Pro</h3>
                  <div className="mt-3">
                    <span className={`${lora.className} text-2xl font-semibold text-[#F7F2E9]`}>₹699</span>
                    <span className="text-xs text-[#AAB6A2]">/mo</span>
                  </div>
                  <p className="text-xs font-semibold text-[#D79A2C] mt-1">30 credits included</p>
                  <ul className="mt-5 space-y-2 text-xs text-[#AAB6A2]">
                    <li className="flex items-center gap-2"><Check size={14} className="text-[#D79A2C] shrink-0" /> 30% 1st month share</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-[#D79A2C] shrink-0" /> High-rank featured profile</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-[#D79A2C] shrink-0" /> High priority matching</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-[#D79A2C] shrink-0" /> Verified gold badge &amp; support</li>
                  </ul>
                </div>
                <Link href="/tutor-flow/tutor-registration" className="w-full block text-center py-2.5 rounded-md bg-[#D79A2C] text-[#17261D] font-semibold text-xs transition-colors hover:bg-[#c4891f]">
                  Get started
                </Link>
              </div>

              {/* PREMIUM */}
              <div className="rounded-lg border border-[#1C2B22]/10 p-6 flex flex-col justify-between gap-6">
                <div>
                  <h3 className="font-semibold text-base text-[#1C2B22]">Premium</h3>
                  <div className="mt-3">
                    <span className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>₹1499</span>
                    <span className="text-xs text-[#9AA3AB]">/mo</span>
                  </div>
                  <p className="text-xs font-semibold text-[#8a5f18] mt-1">75 credits included</p>
                  <ul className="mt-5 space-y-2 text-xs text-[#58646C]">
                    <li className="flex items-center gap-2"><Check size={14} className="text-[#D79A2C] shrink-0" /> 30% 1st month share</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-[#D79A2C] shrink-0" /> VIP featured profile</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-[#D79A2C] shrink-0" /> Top lead priority</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-[#D79A2C] shrink-0" /> Dedicated 24/7 support</li>
                  </ul>
                </div>
                <Link href="/tutor-flow/tutor-registration" className="w-full block text-center py-2.5 rounded-md border border-[#1C2B22]/15 text-[#1C2B22] font-semibold text-xs transition-colors hover:border-[#1C2B22]/30">
                  Get started
                </Link>
              </div>
            </div>
          </section>

          {/* SECTION 4: TUTOR BENEFITS */}
          <section id="tutor-benefits" className="rounded-lg border border-[#1C2B22]/10 bg-white p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#1C2B22]/[.08]">
              <span className={`${lora.className} text-lg font-semibold text-[#D79A2C]`}>04</span>
              <div>
                <h2 className={`${lora.className} text-lg md:text-xl font-semibold text-[#1C2B22]`}>
                  Yattra Tutors educator benefits &amp; growth assurance
                </h2>
                <p className="text-xs text-[#9AA3AB] mt-0.5">We protect your income and support your long-term teaching career</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-lg border border-[#1C2B22]/10 divide-y md:divide-y-0 md:divide-x divide-[#1C2B22]/10 text-xs">
              <div className="p-5 space-y-2">
                <div className="flex items-center gap-2 text-[#1C2B22] font-semibold text-sm">
                  <ShieldCheck size={17} className="text-[#D79A2C]" />
                  1. Payment protection
                </div>
                <p className="text-[#58646C] leading-relaxed">
                  If you complete one full month of tutoring and the parent defaults on payment, Yattra Tutors will
                  ensure your payment subject to verification, protecting you from non-paying parents.
                </p>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center gap-2 text-[#1C2B22] font-semibold text-sm">
                  <Award size={17} className="text-[#D79A2C]" />
                  2. Verified experience certificate
                </div>
                <p className="text-[#58646C] leading-relaxed">
                  After receiving 3 genuine student reviews, tutors become eligible for an official Experience
                  Certificate verified by Yattra Tutors, building professional credibility.
                </p>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center gap-2 text-[#1C2B22] font-semibold text-sm">
                  <Gift size={17} className="text-[#D79A2C]" />
                  3. Referral cashback &amp; growth
                </div>
                <p className="text-[#58646C] leading-relaxed">
                  Refer another qualified tutor to receive ₹100 cashback after onboarding, plus profile
                  promotion and priority access to higher-paying tuitions.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 5: DIGITAL CONSENT & SIGNATURE */}
          <section id="digital-signature" className="rounded-lg border border-[#D79A2C]/25 bg-white p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#1C2B22]/[.08]">
              <span className={`${lora.className} text-lg font-semibold text-[#D79A2C]`}>05</span>
              <div>
                <h2 className={`${lora.className} text-lg md:text-xl font-semibold text-[#1C2B22]`}>
                  Digital consent &amp; tutor signature
                </h2>
                <p className="text-xs text-[#9AA3AB] mt-0.5">
                  Record your voluntary acceptance of the Yattra Tutors Tutor Agreement (Annexure A, B &amp; Pricing)
                </p>
              </div>
            </div>

            {signed ? (
              <div className="p-6 rounded-md bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 size={44} className="text-emerald-600 mx-auto" />
                <h3 className="text-base font-semibold text-emerald-900">Consent recorded &amp; signed successfully!</h3>
                <div className="text-xs text-emerald-800 space-y-1">
                  <p><strong>Tutor name:</strong> {tutorName}</p>
                  <p><strong>PAN number:</strong> {panNo}</p>
                  <p><strong>Date:</strong> {signatureDate}</p>
                  <p><strong>Status:</strong> Legally binding Yattra Tutors agreement accepted</p>
                </div>
                <Link
                  href="/tutor-flow/tutor-registration"
                  className="inline-block mt-4 px-6 py-3 rounded-md bg-emerald-600 text-white font-semibold text-xs transition-colors hover:bg-emerald-700"
                >
                  Proceed to tutor registration →
                </Link>
              </div>
            ) : (
              <form onSubmit={handleDigitalSign} className="space-y-4 text-xs max-w-xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-[#1C2B22] block mb-1.5">
                      Full name (tutor) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={tutorName}
                      onChange={(e) => setTutorName(e.target.value)}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full p-3 rounded-md border border-[#1C2B22]/15 font-medium outline-none transition-colors focus:border-[#D79A2C]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#1C2B22] block mb-1.5">S/o / D/o name (optional)</label>
                    <input
                      type="text"
                      value={guardianName}
                      onChange={(e) => setGuardianName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full p-3 rounded-md border border-[#1C2B22]/15 font-medium outline-none transition-colors focus:border-[#D79A2C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-[#1C2B22] block mb-1.5">
                      PAN number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={panNo}
                      onChange={(e) => setPanNo(e.target.value.toUpperCase())}
                      placeholder="e.g. ABCDE1234F"
                      className="w-full p-3 rounded-md border border-[#1C2B22]/15 font-medium uppercase outline-none transition-colors focus:border-[#D79A2C]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#1C2B22] block mb-1.5">Date</label>
                    <input
                      type="date"
                      value={signatureDate}
                      onChange={(e) => setSignatureDate(e.target.value)}
                      className="w-full p-3 rounded-md border border-[#1C2B22]/15 font-medium outline-none transition-colors focus:border-[#D79A2C]"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-md bg-[#F7F2E9] border border-[#1C2B22]/10 leading-relaxed text-[#58646C]">
                  By clicking &quot;Accept &amp; Digital Sign&quot;, I voluntarily agree to follow all Yattra Tutors
                  rules, policies, revenue sharing terms (30% 1st month subscription / 50% non-subscription), and
                  guidelines (Annexure A &amp; B) and understand that my association with Yattra Tutors is based on
                  trust, transparency, and professional conduct.
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-md bg-[#D79A2C] text-[#17261D] font-semibold text-sm transition-colors hover:bg-[#c4891f]"
                >
                  Accept &amp; digital sign Yattra Tutors agreement →
                </button>
              </form>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
