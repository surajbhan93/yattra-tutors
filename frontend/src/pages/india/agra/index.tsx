import React from "react";
import Head from "next/head";
import { lora, dmSans } from "@/lib/fonts";
import { city } from "@/components/seoIndia/locations/up/agra";

// Import modular subcomponents from the same folder
import Schema from "./Schema";
import Hero from "./Hero";
import WhyTutvex from "./WhyTutvex";
import Subjects from "./Subjects";
import Fees from "./Fees";
import ServiceAreas from "./ServiceAreas";
import GoogleBusiness from "./GoogleBusiness";
import Reviews from "./Reviews";
import FAQ from "./FAQ";
import InternalLinks from "./InternalLinks";
import CTA from "./CTA";

export default function AgraHomeTutorPage() {
  const pageTitle = `Home Tutor in ${city.name} | Best Verified Home Tuition | Yattra Tutors`;
  const metaDescription = `Looking for the best Home Tutor in ${city.name}? Yattra Tutors provides 100% background-verified 1-on-1 private home tutors for CBSE, ICSE, UP Board, Class 1-12, Math, Science, JEE & NEET across ${city.name} (Kamla Nagar, Dayalbagh, Sadar Bazaar & more). Book a free demo today!`;
  const canonicalUrl = `https://yattratutors.com/india/${city.slug}`;
  const ogImageUrl = `https://yattratutors.com/images/og-home-tutor-agra.jpg`;

  const metaKeywords = [
    "Home Tutor in Agra",
    "Best Home Tuition in Agra",
    "Home Tuition Agra",
    "Home Tuition in Agra",
    "Home Tutor Agra",
    "Verified Home Tutor in Agra",
    "Private Tutor in Agra",
    "Female Home Tutor in Agra",
    "Math Tutor Agra",
    "Science Tutor Agra",
    "CBSE Home Tutor Agra",
    "Class 10 Tuition Agra",
    "JEE Tutor Agra",
    "NEET Tutor Agra",
    "Tutor Near Me",
    "Home Tutor Kamla Nagar Agra",
    "Home Tuition Dayalbagh Agra",
    "Private Tuition Sadar Bazaar Agra",
  ].join(", ");

  return (
    <>
      <Head>
        {/* Basic SEO Tags */}
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <meta name="author" content="Yattra Tutors Learning Systems India Pvt. Ltd." />
        <meta name="language" content="en-IN" />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="theme-color" content="#0E211C" />

        {/* Geo-Targeting SEO Tags */}
        <meta name="geo.region" content={city.geo.region} />
        <meta name="geo.placename" content={city.geo.placename} />
        <meta name="geo.position" content={`${city.geo.latitude};${city.geo.longitude}`} />
        <meta name="ICBM" content={`${city.geo.latitude}, ${city.geo.longitude}`} />

        {/* OpenGraph / Facebook Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Yattra Tutors Home Tutors" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:alt" content={`Best Home Tutor Service in ${city.name} - Yattra Tutors`} />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yattratutors" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="twitter:image:alt" content={`Home Tutor in ${city.name}`} />

        {/* Mobile Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* JSON-LD Rich Results Schemas */}
      <Schema />

      <main className={`min-h-screen bg-[#0E211C] text-[#F7F2E9] antialiased ${dmSans.className}`}>
        {/* Navigation Bar Header */}
        <nav className="bg-[#132B22] border-b border-[#2B4038] sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className={`text-2xl font-semibold tracking-tight text-[#F7F2E9] ${lora.className}`}>
                Yattra <span className="text-[#D79A2C]">Tutors</span>
              </span>
              <span className="hidden sm:inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-[#D79A2C]/10 text-[#D79A2C] border border-[#D79A2C]/20">
                {city.name} Center
              </span>
            </a>

            <div className="flex items-center gap-4">
              <a
                href="#service-areas"
                className="hidden md:inline-block text-xs font-semibold text-[#AAB6A2] hover:text-[#D79A2C] transition-colors"
              >
                Localities in {city.name}
              </a>
              <a
                href={`tel:${city.contact.phone}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-[#17261D] bg-[#D79A2C] hover:bg-[#c4891f] transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.12.45 2.33.69 3.58.69.55 0 1 .45 1 1V20a1 1 0 01-1 1C10.5 21 3 13.5 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.24 2.46.69 3.57.11.35.03.74-.27 1.02l-2.3 2.2z" />
                </svg>
                <span>{city.contact.phone}</span>
              </a>
            </div>
          </div>
        </nav>

        {/* 1. Hero Section */}
        <Hero />

        {/* 2. EEAT & Why Yattra Tutors Section */}
        <WhyTutvex />

        {/* 3. Subject Matrix & Boards */}
        <Subjects />

        {/* 4. Deep Informational GEO Content Article Section (Entity-Rich, High Semantic Relevance for Agra) */}
        <section className="py-16 sm:py-24 bg-[#15302A] text-[#AAB6A2] border-b border-[#2B4038]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#D79A2C] italic">
                Comprehensive Educational Guide for {city.name} Parents
              </span>
              <h2 className={`text-3xl sm:text-4xl font-semibold text-[#F7F2E9] leading-tight ${lora.className}`}>
                Navigating School Education & Home Tuition in {city.name}: A Complete Parent Handbook
              </h2>
              <p className="text-base sm:text-lg text-[#AAB6A2] leading-relaxed">
                As one of Uttar Pradesh’s most iconic educational destinations, {city.name} boasts historic institutions like St. John's College, Dr. Bhimrao Ambedkar University, Dayalbagh Educational Institute (DEI), and top schools affiliated with CBSE, ICSE, and the UP State Board. However, as competitive exam standards rise for CBSE Class 10/12 boards, JEE Main, and NEET, classroom instruction alone often leaves students with gaps in conceptual understanding. Personal 1-on-1 home tuition provides tailored mentorship directly at your residence.
              </p>
            </div>

            {/* Subsection 1: Why 1-on-1 Tuition beats Coaching Institutes */}
            <div className="space-y-4 bg-[#0E211C] border border-[#2B4038] p-6 sm:p-8 rounded-2xl">
              <h3 className={`text-2xl font-semibold text-[#F7F2E9] ${lora.className}`}>
                Why 1-on-1 Home Tuition Beats Group Coaching Centers in {city.name}
              </h3>
              <p className="text-sm sm:text-base text-[#AAB6A2] leading-relaxed">
                In crowded coaching institutes across commercial hubs like <em>Sadar Bazaar, Sanjay Place, or Raja Ki Mandi</em>, a single teacher often lectures 80 to 100 students simultaneously. Hiring a verified private home tutor in {city.name} guarantees 100% focused attention on your child. Tutors adapt to the student's unique learning velocity—spending extra sessions on complex topics like Class 10 Trigonometry or Class 12 Electrostatics—while progressing quickly through familiar concepts.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-[#AAB6A2] pt-2">
                <li className="flex items-center gap-2">
                  <span className="text-[#D79A2C] font-bold">✓</span> Zero commuting stress or wasted travel time across Agra traffic
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#D79A2C] font-bold">✓</span> Customized study schedule aligned with school unit tests & term exams
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#D79A2C] font-bold">✓</span> Safe learning environment under direct parental supervision
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#D79A2C] font-bold">✓</span> Regular weekly test reports and direct parent feedback
                </li>
              </ul>
            </div>

            {/* Subsection 2: Locality Coverage & Localized Learning */}
            <div className="space-y-4 bg-[#0E211C] border border-[#2B4038] p-6 sm:p-8 rounded-2xl">
              <h3 className={`text-2xl font-semibold text-[#F7F2E9] ${lora.className}`}>
                Serving All {city.locations.length}+ Residential Localities Across {city.name}
              </h3>
              <p className="text-sm sm:text-base text-[#AAB6A2] leading-relaxed">
                Yattra Tutors operates a dense network of background-verified teachers across every sector of {city.name}. Whether you live in <strong className="text-[#F7F2E9]">Kamla Nagar, Dayalbagh, Sadar Bazaar, Civil Lines, Shahganj, Bodla, Khandari, Sikandra, Taj Ganj, or Trans Yamuna Colony</strong>, our local assignment system connects you with qualified educators residing nearby. This ensures punctual sessions, minimal cancellations, and flexible timings even during board examination season.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Tuition Fees Structure Section */}
        <Fees />

        {/* 6. Dynamic Service Areas (Locality Cards looping over city.locations) */}
        <ServiceAreas />

        {/* 7. Google Business Profile Card */}
        <GoogleBusiness />

        {/* 8. Parent Reviews & Ratings */}
        <Reviews />

        {/* 9. AEO-Optimized FAQ Section */}
        <FAQ />

        {/* 10. Internal Links Grid */}
        <InternalLinks />

        {/* 11. Final CTA Banner */}
        <CTA />

        {/* Footer */}
        <footer className="bg-[#0E211C] text-[#9AA3AB] text-xs border-t border-[#2B4038] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <span className={`text-xl font-semibold text-[#F7F2E9] ${lora.className}`}>
                  Yattra <span className="text-[#D79A2C]">Tutors</span>
                </span>
                <p className="text-[#9AA3AB] mt-1">
                  India's premier verified home tutor network for {city.name}, {city.state}.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <a href="/" className="hover:text-[#D79A2C]">Home</a>
                <a href="/india" className="hover:text-[#D79A2C]">India Locations</a>
                <a href={`/india/${city.slug}`} className="text-[#D79A2C] font-semibold">Home Tutor in {city.name}</a>
                <a href="#book-tutor-form" className="hover:text-[#D79A2C]">Book Demo</a>
              </div>
            </div>

            <div className="pt-6 border-t border-[#2B4038] flex flex-col sm:flex-row items-center justify-between gap-4 text-[#9AA3AB]">
              <p>© {new Date().getFullYear()} Yattra Tutors Learning Systems India Pvt. Ltd. All rights reserved.</p>
              <p>Designed for Google Top 3, AI Overview, Perplexity & Gemini Search.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
