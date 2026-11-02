import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTwitter,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaChevronDown,
} from "react-icons/fa";
import { Lora } from "next/font/google";
import { useCookieConsentStore } from "@/stores/useCookieConsentStore";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600", "700"] });

/* =======================
   DATA
======================= */

const indiaCities = [
  {
    city: "Allahabad",
    cityHref: "/allahabad",
    links: [
      { label: "Home Tutor", href: "/allahabad" },
      // { label: "Private Tutor", href: "/allahabad/allahabad/private-tutor" },
      { label: "Maths Tutor", href: "/allahabad/allahabad/maths-tutor" },
      { label: "JEE Tutor", href: "/allahabad/allahabad/jee-tutor" },
      { label: "NEET Tutor", href: "/allahabad/allahabad/neet-tutor" },
      // { label: "Tutor Job", href: "/allahabad/allahabad/tutor-job" },
    ],
  },
   {
    city: "Varanasi",
    cityHref: "/india/banaras",
    links: [
      { label: "Home Tutor", href: "/india/banaras" },
      // { label: "1-to-1-tuition", href: "india/banaras/benia-bagh/1-to-1-tuition" },
      { label: "Maths Tutor", href: "/india/banaras/mahmoorganj/math-tutor" },
      { label: "JEE Tutor", href: "/india/banaras/mahmoorganj/jee-tuto" },
      { label: "NEET Tutor", href: "/india/banaras/mahmoorganj/neet-tutor" },
      // { label: "earn-by-teaching", href: "/india/banaras/sigra/earn-by-teaching" },
    ],
  },
  {
    city: "Lucknow",
    cityHref: "/lucknow",
    links: [
      { label: "Home Tutor", href: "/lucknow" },
      // { label: "Private Tutor", href: "/lucknow/Aminabad/private-tutor" },
      { label: "ICSE Tutor", href: "/lucknow/Hasanganj/icse-tutor" },
      { label: "JEE Tutor", href: "/lucknow/Gomti Nagar/jee-tutor" },
      { label: "NEET Tutor", href: "/lucknow/Vibhuti Khand/neet-tutor" },
      // { label: "Tutor Job", href: "/lucknow/Vikas Khand/tutor-job" },
    ],
  },
  {
    city: "Kanpur",
    cityHref: "/kanpur",
    links: [
      { label: "Home Tutor", href: "/kanpur" },
      { label: "Private Tutor", href: "/kanpur/Civil Lines/private-tutor" },
      // { label: "Personal Tutor", href: "/kanpur/Arya Nagar/personal-tutor" },
      { label: "JEE Tutor", href: "/kanpur/Yashoda Nagar/jee-tutor" },
      { label: "NEET Tutor", href: "/kanpur/Karachi Khana/neet-tutor" },
      // { label: "Tutor Job", href: "/kanpur/Lajpat Nagar/tutor-job" },
    ],
  },
  {
    city: "Noida",
    cityHref: "/india/noida",
    links: [
      { label: "Home Tutor", href: "/india/noida" },
      { label: "Private Tutor", href: "/india/noida/Sector 63/private-tutor" },
      { label: "JEE Tutor", href: "/india/noida/Greater Noida West/jee-tutor" },
      { label: "NEET Tutor", href: "/india/noida/Techzone 4/neet-tutor" },
      // { label: "Best Tutor", href: "/india/noida/Sector 125 IT Area/best-tutor" },
      // { label: "Tutor Job", href: "/india/noida/Surajpur/tutor-job" },
    ],
  },
  {
    city: "Agra",
    cityHref: "/india/agra",
    links: [
      { label: "Home Tutor", href: "/india/agra" },
      { label: "Private Tutor", href: "/india/agra/Civil Lines/private-tutor" },
      { label: "JEE Tutor", href: "/india/agra/Mantola/jee-tutor" },
      { label: "NEET Tutor", href: "/india/agra/Kamla Nagar/neet-tutor" },
      // { label: "Best Tutor", href: "/india/agra/Fatehabad Road/best-tutor" },
    ],
  },
  {
    city: "Meerut",
    cityHref: "/india/meerut",
    links: [
      { label: "Home Tutor", href: "/india/meerut" },
      { label: "Private Tutor", href: "/india/meerut/Begum Bridge/private-tutor" },
      { label: "JEE Tutor", href: "/india/meerut/Jagriti Vihar/jee-tutor" },
      { label: "NEET Tutor", href: "/india/meerut/Shradhapuri/neet-tutor" },
      // { label: "Best Tutor", href: "/india/meerut/Zakir Colony/best-tutor" },
    ],
  },
];
const onlineLinks = [
  {
    label: "Online Tuition",
    href: "/country/india/online-tuition",
  },
  {
    label: "Maths Online",
    href: "/country/india/maths-online",
  },
  {
    label: "Science Online",
    href: "/country/india/science-online",
  },
  {
    label: "JEE Online Coaching",
    href: "/country/india/jee-online-coaching",
  },
  {
    label: "NEET Online Coaching",
    href: "/country/india/neet-online-coaching",
  },
  {
    label: "CBSE Online Tutor",
    href: "/country/india/cbse-online-tutor",
  },
];

const internationalSections = [
  {
    flag: "🇬🇧",
    label: "United Kingdom",
    links: [
      {
        label: "UK Tutoring",
        href: "/country/uk/uk-tutoring",
      },
      {
        label: "Home Tutor UK",
        href: "/country/uk/home-tutor-uk",
      },
      {
        label: "Online Tutor UK",
        href: "/country/uk/online-tutor-uk",
      },
      {
        label: "GCSE Tutor UK",
        href: "/country/uk/gcse-tutor-uk",
      },
      {
        label: "A-Level Tutor UK",
        href: "/country/uk/a-level-tutor-uk",
      },
      {
        label: "Tutor Job UK",
        href: "/country/uk/tutor-job-uk",
      },
    ],
  },

  {
    flag: "🇨🇦",
    label: "Canada",
    links: [
      {
        label: "Canada Tutoring",
        href: "/country/canada/canada-tutoring",
      },
      {
        label: "Home Tutor Canada",
        href: "/country/canada/home-tutor-canada",
      },
      {
        label: "Online Tutor Canada",
        href: "/country/canada/online-tutor-canada",
      },
      {
        label: "Toronto Tutor",
        href: "/country/canada/toronto-tutor",
      },
      {
        label: "Maths Tutor Canada",
        href: "/country/canada/maths-tutor-canada",
      },
      {
        label: "Tutor Job Canada",
        href: "/country/canada/tutor-job-canada",
      },
    ],
  },

  {
    flag: "🇦🇪",
    label: "UAE (Dubai / Abu Dhabi)",
    links: [
      {
        label: "Home Tutor UAE",
        href: "/country/uae/home-tutor-uae",
      },
      {
        label: "Online Tutor Dubai",
        href: "/country/uae/online-tutor-dubai",
      },
      {
        label: "Tutor Abu Dhabi",
        href: "/country/uae/tutor-abu-dhabi",
      },
      {
        label: "CBSE Tutor Dubai",
        href: "/country/uae/cbse-tutor-dubai",
      },
      {
        label: "Maths Tutor UAE",
        href: "/country/uae/maths-tutor-uae",
      },
      {
        label: "Tutor Job UAE",
        href: "/country/uae/tutor-job-uae",
      },
    ],
  },

  {
    flag: "🇸🇬",
    label: "Singapore",
    links: [
      {
        label: "Home Tutor Singapore",
        href: "/country/singapore/home-tutor-singapore",
      },
      {
        label: "Online Tutor SG",
        href: "/country/singapore/online-tutor-sg",
      },
      {
        label: "Maths Tutor SG",
        href: "/country/singapore/maths-tutor-sg",
      },
      {
        label: "Primary Tutor SG",
        href: "/country/singapore/primary-tutor-sg",
      },
      {
        label: "Tutor Job Singapore",
        href: "/country/singapore/tutor-job-singapore",
      },
    ],
  },

  {
    flag: "🇦🇺",
    label: "Australia",
    links: [
      {
        label: "Home Tutor Australia",
        href: "/country/australia/home-tutor-australia",
      },
      {
        label: "Online Tutor AU",
        href: "/country/australia/online-tutor-au",
      },
      {
        label: "Sydney Tutor",
        href: "/country/australia/sydney-tutor",
      },
      {
        label: "Melbourne Tutor",
        href: "/country/australia/melbourne-tutor",
      },
      {
        label: "Maths Tutor AU",
        href: "/country/australia/maths-tutor-au",
      },
      {
        label: "Tutor Job Australia",
        href: "/country/australia/tutor-job-australia",
      },
    ],
  },
];

const socialLinks = [
  { icon: <FaFacebookF />, href: "https://facebook.com", label: "Facebook" },
  { icon: <FaInstagram />, href: "https://www.instagram.com/yattratutors/", label: "Instagram" },
  { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/company/mentorsetu/", label: "LinkedIn" },
  { icon: <FaYoutube />, href: "https://www.youtube.com/@yattratutors", label: "YouTube" },
  { icon: <FaTwitter />, href: "https://x.com/yattratutors", label: "Twitter" },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Refund & Cancellation", href: "/refund" },
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Sitemap", href: "/sitemap", highlight: true },
];

const paymentMethods = ["VISA", "Mastercard", "UPI", "Razorpay", "NetBanking"];

/* =======================
   FOOTER COMPONENT
======================= */

const Footer = () => {
  const { resetConsent } = useCookieConsentStore();

  const handleCookieSettings = () => {
    resetConsent();
  };

  return (
    <footer className="relative overflow-hidden bg-[#06150F] text-stone-400">
      {/* Top brand rule */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />

      {/* Subtle radial glow, consistent with the hero's lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 h-[480px] w-[480px] rounded-full bg-emerald-500/[.06] blur-[120px]"
      />

      {/* ── TOP BAND: Brand + Newsletter, side by side ── */}
      <div className="relative mx-auto max-w-[1800px] px-6 sm:px-8 lg:px-16 pt-14 sm:pt-16 pb-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Brand */}
          <div className="min-w-0 max-w-md">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-[#06150F]">
                YT
              </span>
              <span className={`${lora.className} text-xl font-bold text-white`}>Yattra Tutors</span>
            </div>

            <p className="mt-4 text-[13.5px] leading-relaxed text-stone-400">
              India's home tutor bureau for verified home tuition, personalised
              one-on-one learning and academic success.
            </p>

            {/* Contact, inline */}
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-stone-400">
              <span className="flex items-center gap-2">
                <FaMapMarkerAlt className="shrink-0 text-emerald-500" /> Allahabad &amp; Noida, India
              </span>
              <span className="flex items-center gap-2">
                <FaEnvelope className="shrink-0 text-emerald-500" /> yattratutorial@gmail.com
              </span>
              <span className="flex items-center gap-2">
                <FaPhone className="shrink-0 text-emerald-500" /> +91-6363453870
              </span>
            </div>

            {/* Socials */}
            <div className="mt-5 flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[.03] text-stone-400 text-xs transition-all duration-200 hover:border-emerald-500/50 hover:bg-emerald-500 hover:text-[#06150F]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter card */}
          <div className="w-full max-w-sm flex-shrink-0 rounded-2xl border border-white/10 bg-white/[.03] p-5 lg:p-6">
            <p className={`${lora.className} text-[15px] font-semibold text-white`}>
              Get tutoring tips &amp; offers
            </p>
            <p className="mt-1 text-[12.5px] text-stone-500">
              One email a month — study tips, exam dates, no spam.
            </p>
            <div className="mt-3.5 flex rounded-full border border-white/10 bg-black/20 p-1 focus-within:border-emerald-500/50">
              <input
                type="email"
                placeholder="your@email.com"
                className="min-w-0 flex-1 bg-transparent px-3.5 py-2 text-xs text-white placeholder-stone-500 outline-none"
              />
              <button className="flex-shrink-0 rounded-full bg-emerald-500 px-4 text-xs font-semibold text-[#06150F] transition-opacity hover:opacity-90">
                Subscribe
              </button>
            </div>

            {/* Company links, as a quiet list inside the card */}
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/[.06] pt-4">
              {companyLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[12px] font-medium transition-colors ${
                    link.highlight
                      ? "text-amber-300 hover:text-amber-200"
                      : "text-stone-400 hover:text-emerald-400"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── DIRECTORY: expandable regions instead of parallel columns ── */}
      <div className="relative mx-auto max-w-[1800px] px-6 sm:px-8 lg:px-16 pb-14 sm:pb-16">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-stone-600">
          Find tutors by location
        </p>

        <div className="divide-y divide-white/[.06] rounded-2xl border border-white/[.06]">
          {/* India cities */}
          <details open className="group/acc">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6 [&::-webkit-details-marker]:hidden">
              <span className={`${lora.className} flex items-center gap-2 text-[15px] font-semibold text-white`}>
                <span className="text-base">🇮🇳</span> Home tutors, city by city
              </span>
              <FaChevronDown
                aria-hidden="true"
                className="h-3 w-3 flex-shrink-0 text-stone-500 transition-transform duration-300 group-open/acc:rotate-180"
              />
            </summary>
            <div className="grid grid-cols-2 gap-x-6 gap-y-6 px-5 pb-6 sm:px-6 sm:grid-cols-3 lg:grid-cols-4">
              {indiaCities.map((c) => (
                <div key={c.city}>
                  <Link
                    href={c.cityHref || "#"}
                    className="mb-2.5 block text-[12.5px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    {c.city}
                  </Link>
                  <ul className="space-y-1.5">
                    {c.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="group flex items-center gap-1.5 text-[12.5px] text-stone-500 transition-colors hover:text-stone-200"
                        >
                          <span className="h-1 w-1 shrink-0 rounded-full bg-white/15 transition-colors group-hover:bg-emerald-400" />
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>

          {/* Online + UK + Canada */}
          <details className="group/acc">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6 [&::-webkit-details-marker]:hidden">
              <span className={`${lora.className} text-[15px] font-semibold text-white`}>Learn online, from anywhere</span>
              <FaChevronDown
                aria-hidden="true"
                className="h-3 w-3 flex-shrink-0 text-stone-500 transition-transform duration-300 group-open/acc:rotate-180"
              />
            </summary>
            <div className="grid grid-cols-2 gap-x-6 gap-y-6 px-5 pb-6 sm:px-6 sm:grid-cols-3">
              <div>
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/[.08] px-3 py-1 text-[11px] font-semibold text-emerald-400">
                  🌐 Online India
                </span>
                <ul className="space-y-1.5">
                  {onlineLinks.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="group flex items-center gap-1.5 text-[12.5px] text-stone-500 transition-colors hover:text-stone-200">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-white/15 transition-colors group-hover:bg-emerald-400" />
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {internationalSections.slice(0, 2).map((section) => (
                <div key={section.label}>
                  <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/[.08] px-3 py-1 text-[11px] font-semibold text-emerald-400">
                    {section.flag} {section.label}
                  </span>
                  <ul className="space-y-1.5">
                    {section.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="group flex items-center gap-1.5 text-[12.5px] text-stone-500 transition-colors hover:text-stone-200">
                          <span className="h-1 w-1 shrink-0 rounded-full bg-white/15 transition-colors group-hover:bg-emerald-400" />
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>

          {/* UAE + Singapore + Australia */}
          <details className="group/acc">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6 [&::-webkit-details-marker]:hidden">
              <span className={`${lora.className} text-[15px] font-semibold text-white`}>Yattra Tutors, worldwide</span>
              <FaChevronDown
                aria-hidden="true"
                className="h-3 w-3 flex-shrink-0 text-stone-500 transition-transform duration-300 group-open/acc:rotate-180"
              />
            </summary>
            <div className="grid grid-cols-2 gap-x-6 gap-y-6 px-5 pb-6 sm:px-6 sm:grid-cols-3">
              {internationalSections.slice(2).map((section) => (
                <div key={section.label}>
                  <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/[.08] px-3 py-1 text-[11px] font-semibold text-emerald-400">
                    {section.flag} {section.label}
                  </span>
                  <ul className="space-y-1.5">
                    {section.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="group flex items-center gap-1.5 text-[12.5px] text-stone-500 transition-colors hover:text-stone-200">
                          <span className="h-1 w-1 shrink-0 rounded-full bg-white/15 transition-colors group-hover:bg-emerald-400" />
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>

      {/* ── App Download + Payment ── */}
      <div className="relative border-t border-white/[.06]">
        <div className="mx-auto flex max-w-[1800px] flex-col items-center justify-between gap-4 px-6 sm:px-8 lg:px-16 py-5 md:flex-row">
          {/* App Buttons */}
          <div className="flex gap-3">
            <a
              href="#"
              className="group inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[.03] px-3.5 py-2 transition-all hover:border-emerald-500/40"
            >
              <svg className="h-5 w-5 text-stone-400 transition-colors group-hover:text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left">
                <div className="text-[9px] text-stone-500">Download on the</div>
                <div className="text-xs font-semibold text-stone-200">App Store</div>
              </div>
            </a>
            <a
              href="#"
              className="group inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[.03] px-3.5 py-2 transition-all hover:border-emerald-500/40"
            >
              <svg className="h-5 w-5 text-stone-400 transition-colors group-hover:text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 20.5v-17c0-.83 1-1.3 1.7-.8l14 8.5c.7.4.7 1.5 0 1.9l-14 8.5c-.7.5-1.7 0-1.7-.8" />
              </svg>
              <div className="text-left">
                <div className="text-[9px] text-stone-500">Get it on</div>
                <div className="text-xs font-semibold text-stone-200">Google Play</div>
              </div>
            </a>
          </div>

          {/* Payment Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${
                  method === "UPI" || method === "Razorpay"
                    ? "border-emerald-500/30 bg-emerald-500/[.08] text-emerald-400"
                    : "border-white/10 bg-white/[.03] text-stone-400"
                }`}
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Copyright ── */}
      <div className="border-t border-white/[.06] bg-black/30 py-4">
        <div className="mx-auto flex max-w-[1800px] flex-col items-center justify-between gap-2 px-6 sm:px-8 lg:px-16 text-xs text-stone-500 md:flex-row">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-emerald-400">Yattra Tutors</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={handleCookieSettings}
              className="underline decoration-dotted underline-offset-2 transition-colors hover:text-emerald-400"
            >
              Cookie Settings
            </button>
            <p>Trusted by students across India &amp; worldwide</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;