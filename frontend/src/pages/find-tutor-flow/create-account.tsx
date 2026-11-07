import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { lora, dmSans } from "@/lib/fonts";
import NavBar from '@/components/navbar/NavBar';
import Footer from '@/components/landing/Footer';
import InputField from '@/components/find-tutor-flow/InputField';
import apiClient from '@/lib/apiClient';
import OnboardingStepper from '@/pages/find-tutor-flow/OnboardingStepper';

/* ------------------ Animations ------------------ */
const pageVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ------------------ Journey steps ------------------ */
const journeySteps = [
  { num: '01', text: 'Create your Yattra Tutors account' },
  { num: '02', text: 'Tell us your preferences' },
  { num: '03', text: 'Get matched with verified tutors' },
  { num: '04', text: 'Send your learning requirements' },
  { num: '05', text: 'Track sessions & progress' },
];

/* ------------------ Component ------------------ */
const CreateAccount: React.FC = () => {
  const router = useRouter();

  /* ── STATE — UNTOUCHED ── */
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    location: {
      city: 'Unknown',
      area: 'Unknown',
      coordinates: {
        type: 'Point',
        coordinates: [78.9629, 20.5937],
      },
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ── HANDLERS — UNTOUCHED ── */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const res = await apiClient.post('/auth/parent/signup', form);
      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
      }
      const redirect = router.query.redirect as string;
      const action = router.query.action as string;

      if (redirect) {
        let finalUrl = redirect;

        if (action) {
          finalUrl = `${redirect}?action=${action}`;
        }

        router.push(finalUrl);
      } else {
        router.push('/find-tutor-flow/preferences');
      }
    } catch (err: any) {
      const backendMessage = err.response?.data?.error || err.response?.data?.message;
      setError(backendMessage || 'This email is already registered. Please login instead.');
    } finally {
      setIsLoading(false);
    }
  };

  /* ────────────────────────────────────────────
     RENDER
  ──────────────────────────────────────────── */
  return (
    <motion.div
      variants={pageVariant}
      initial="hidden"
      animate="visible"
      className={`flex min-h-screen flex-col bg-[#F7F2E9] ${dmSans.className}`}
    >
      <NavBar />

      {/* ════════════════════════════════════════
          HERO HEADER
      ════════════════════════════════════════ */}
      <div className="relative overflow-hidden bg-[#0E211C] py-12 sm:py-16">
        {/* Grain texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <motion.div variants={fadeUp} className="relative z-10 mx-auto max-w-2xl px-4 text-center">
          <p className={`${lora.className} italic text-sm text-[#AAB6A2] mb-3`}>Step 1 of 5 — Account setup</p>

          <h1 className={`${lora.className} text-3xl font-semibold text-white sm:text-4xl`}>
            Start your Yattra Tutors journey
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#AAB6A2]">
            Create your account and get matched with trusted tutors, tailored exactly to your learning needs.
          </p>
        </motion.div>
      </div>

      {/* ════════════════════════════════════════
          STEPPER
      ════════════════════════════════════════ */}
      <div className="border-b border-[#1C2B22]/10 bg-white px-4 py-4">
        <div className="mx-auto max-w-5xl">
          <OnboardingStepper currentStep={1} />
        </div>
      </div>

      {/* ════════════════════════════════════════
          MAIN CONTENT
      ════════════════════════════════════════ */}
      <div className="flex flex-1 items-start justify-center px-4 py-10 sm:py-14">
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-start">
            {/* ══════════════════════════════
                LEFT PANEL — JOURNEY
            ══════════════════════════════ */}
            <motion.div variants={fadeUp}>
              <div className="rounded-lg border border-[#1C2B22]/10 bg-white p-6 sm:p-7">
                <h3 className={`${lora.className} mb-5 text-base font-semibold text-[#1C2B22]`}>
                  Your learning journey
                </h3>

                <ul className="list-none space-y-0 p-0">
                  {journeySteps.map((step, i) => (
                    <li key={step.num} className="relative flex items-start gap-4 pb-5 last:pb-0">
                      {i < journeySteps.length - 1 && (
                        <div
                          aria-hidden="true"
                          className="absolute left-[18px] top-[36px] bottom-0 w-px bg-[#1C2B22]/10"
                        />
                      )}

                      <div
                        className={`relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold ${lora.className} ${
                          i === 0 ? 'bg-[#0E211C] text-[#D79A2C]' : 'border border-[#1C2B22]/15 text-[#9AA3AB]'
                        }`}
                      >
                        {step.num}
                      </div>

                      <div className="pt-1.5">
                        <p className={`text-sm font-medium leading-tight ${i === 0 ? 'text-[#1C2B22]' : 'text-[#58646C]'}`}>
                          {step.text}
                        </p>
                        {i === 0 && (
                          <span className="mt-1 inline-block text-xs font-medium text-[#8a5f18]">
                            You are here
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-md border border-[#1C2B22]/10 bg-[#F7F2E9] p-3.5">
                  <p className="text-xs leading-relaxed text-[#58646C]">
                    The entire setup takes less than <strong className="text-[#1C2B22]">3 minutes</strong>, and includes
                    a free demo session.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ══════════════════════════════
                RIGHT PANEL — FORM
            ══════════════════════════════ */}
            <motion.div variants={fadeUp}>
              <div className="rounded-lg border border-[#1C2B22]/10 bg-white p-6 sm:p-8">
                {/* Title */}
                <div className="mb-6 text-center">
                  <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>Create your account</h2>
                  <p className="mt-1.5 text-sm text-[#58646C]">
                    Join thousands of learners finding the right tutors on Yattra Tutors.
                  </p>
                </div>

                {/* ── FORM — ALL LOGIC UNTOUCHED ── */}
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-[#1C2B22]">Full name</label>
                    <InputField
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      type="text"
                      disabled={isLoading}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-[#1C2B22]">Email address</label>
                    <InputField
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      type="email"
                      disabled={isLoading}
                    />
                  </div>

                  {/* City + Area — 2-col grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-[#1C2B22]">City</label>
                      <InputField
                        name="city"
                        placeholder="e.g. Delhi"
                        onChange={(e) => setForm({ ...form, location: { ...form.location, city: e.target.value } })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-[#1C2B22]">Area</label>
                      <InputField
                        name="area"
                        placeholder="e.g. Lajpat Nagar"
                        onChange={(e) => setForm({ ...form, location: { ...form.location, area: e.target.value } })}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-[#1C2B22]">Password</label>
                    <InputField
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                      type="password"
                      disabled={isLoading}
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-[#1C2B22]">Mobile number</label>
                    <InputField
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      type="tel"
                      disabled={isLoading}
                    />
                  </div>

                  {/* CTA Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-2 w-full rounded-md bg-[#D79A2C] py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading ? 'Creating account...' : 'Continue'}
                  </button>

                  {/* Error message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-md border border-red-200 bg-red-50 p-3"
                    >
                      <p className="text-xs text-red-700">{error}</p>
                    </motion.div>
                  )}
                </form>

                {/* Trust line */}
                <p className="mt-6 text-center text-xs text-[#9AA3AB]">
                  Secure · Verified tutors · Free demo included
                </p>

                {/* Login link */}
                <p className="mt-3 text-center text-sm text-[#58646C]">
                  Already registered?{' '}
                  <Link
                    href={`/login?redirect=${router.query.redirect}&action=${router.query.action}`}
                    className="font-semibold text-[#8a5f18] hover:underline"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default CreateAccount;
