import React from "react";
import Head from "next/head";
import { city } from "@/components/seoIndia/locations/up/meerut";

import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/landing/Footer";

// Import modular components from the same folder
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

export default function MeerutHomeTutorPage() {
  const pageTitle = `Home Tutor in ${city.name} | Best Verified Home Tuition | Yattra Tutors`;
  const metaDescription = `Looking for the best Home Tutor in ${city.name}? Yattra Tutors provides 100% background-verified 1-on-1 private home tutors for CBSE, ICSE, UP Board, Class 1-12, Math, Science, JEE & NEET across ${city.name}. Book a free demo today!`;
  const canonicalUrl = `https://yattratutors.com/india/${city.slug}`;
  const ogImageUrl = `https://res.cloudinary.com/dbezxtffm/image/upload/v1785499574/20260731_1735_image_mxfwaz.png`;

  const metaKeywords = [
    "Home Tutor in Meerut",
    "Best Home Tuition in Meerut",
    "Home Tuition Meerut",
    "Home Tuition in Meerut",
    "Home Tutor Meerut",
    "Verified Home Tutor in Meerut",
    "Private Tutor in Meerut",
    "Female Home Tutor in Meerut",
    "Math Tutor Meerut",
    "Science Tutor Meerut",
    "CBSE Home Tutor Meerut",
    "Class 10 Tuition Meerut",
    "JEE Tutor Meerut",
    "NEET Tutor Meerut",
    "Tutor Near Me",
    "Home Tutor Shastri Nagar Meerut",
    "Home Tuition Saket Meerut",
    "Private Tuition Pallavpuram Meerut",
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
        <meta name="twitter:card" content="https://res.cloudinary.com/dbezxtffm/image/upload/v1785499574/20260731_1735_image_mxfwaz.png" />
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

      <main className="min-h-screen bg-[#0E211C] text-[#F7F2E9] font-sans antialiased">

        {/* Navigation Bar Header */}
        <nav className="bg-[#132B22] border-b border-[#F7F2E9]/10 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="text-xl font-semibold tracking-tight text-[#F7F2E9]" style={{ fontFamily: "'Lora', serif" }}>
                Yattra Tutors
              </span>
              <span className="hidden sm:inline-block text-[11px] font-medium text-[#D79A2C] border border-[#D79A2C]/25 rounded px-2 py-0.5">
                {city.name} Center
              </span>
            </a>

            <div className="flex items-center gap-4">
              <a
                href="#service-areas"
                className="hidden md:inline-block text-xs font-medium text-[#F7F2E9]/70 hover:text-[#D79A2C] transition-colors"
              >
                Localities in {city.name}
              </a>
              <a
                href={`tel:${city.contact.phone}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold text-[#0E211C] bg-[#D79A2C] hover:bg-[#c4891f] transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.12.45 2.33.69 3.58.69.55 0 1 .45 1 1V20a1 1 0 01-1 1C10.5 21 3 13.5 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.24 2.46.69 3.57.11.35.03.74-.27 1.02l-2.3 2.2z" />
                </svg>
                <span>{city.contact.phone}</span>
              </a>
            </div>
          </div>
        </nav>
        <NavBar />
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. EEAT & Why Yattra Tutors Section */}
        <WhyTutvex />

        {/* 3. Subject Matrix & Boards */}
        <Subjects />

        {/* 4. Deep Informational GEO Content Article Section (Entity-Rich, High Semantic Relevance) */}
        <section className="py-16 sm:py-24 bg-[#132B22] text-[#F7F2E9] border-b border-[#F7F2E9]/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="space-y-4">
              <span className="text-xs font-medium text-[#D79A2C]">
                Comprehensive Educational Guide for {city.name} Parents
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#F7F2E9] leading-tight" style={{ fontFamily: "'Lora', serif" }}>
                Navigating School Education & Home Tuition in {city.name}: A Complete Parent Handbook
              </h2>
              <p className="text-base sm:text-lg text-[#F7F2E9]/70 leading-relaxed">
                As one of Uttar Pradesh’s major educational hubs, {city.name} boasts prestigious schools affiliated with CBSE, ICSE, and the UP State Board. However, as academic competition intensifies for board examinations and national entrance tests like JEE Main, JEE Advanced, and NEET UG, classroom instruction alone often leaves students with unresolved doubts. Personal 1-on-1 home tuition has emerged as the most effective solution for custom-paced learning, conceptual clarity, and confidence building.
              </p>
            </div>

            {/* Subsection 1: Why 1-on-1 Tuition beats Coaching Institutes */}
            <div className="space-y-4 border-t border-[#F7F2E9]/10 pt-8">
              <h3 className="text-2xl font-semibold text-[#F7F2E9]" style={{ fontFamily: "'Lora', serif" }}>
                Why 1-on-1 Home Tuition Beats Group Coaching Centers in {city.name}
              </h3>
              <p className="text-sm sm:text-base text-[#F7F2E9]/70 leading-relaxed">
                In large batch coaching centers across commercial centers like <em>Begum Bridge, Abu Lane, or Central Market</em>, a single teacher often addresses 60 to 100 students simultaneously. In contrast, hiring a verified private home tutor in {city.name} guarantees that 100% of the teacher’s attention is focused on your child. Tutors adapt to the student's unique learning speed—spending extra hours on complex topics like Class 10 Quadratic Equations or Class 12 Organic Chemistry mechanisms—while bypassing areas the student has already mastered.
              </p>
              <ul className="divide-y divide-[#F7F2E9]/10 border-y border-[#F7F2E9]/10 text-sm text-[#F7F2E9]/70 pt-2">
                <li className="py-2.5">Zero commuting stress or wasted travel time</li>
                <li className="py-2.5">Customized study schedule aligned with school tests</li>
                <li className="py-2.5">Safe learning environment inside parent supervision</li>
                <li className="py-2.5">Regular weekly progress reports and parent updates</li>
              </ul>
            </div>

            {/* Subsection 2: Locality Coverage & Localized Learning */}
            <div className="space-y-4 border-t border-[#F7F2E9]/10 pt-8">
              <h3 className="text-2xl font-semibold text-[#F7F2E9]" style={{ fontFamily: "'Lora', serif" }}>
                Serving All Key Residential Localities Across {city.name}
              </h3>
              <p className="text-sm sm:text-base text-[#F7F2E9]/70 leading-relaxed">
                Yattra Tutors operates a dense network of certified teachers across every nook and corner of {city.name}. Whether you reside in premier residential townships like <strong className="text-[#F7F2E9]">Shastri Nagar, Saket, Rajendra Nagar, Pallavpuram, Kankerkhera, Ganga Nagar, or Modipuram</strong>, our hyper-local assignment system connects you with qualified educators who live nearby. This ensures punctual arrivals, zero session cancellations, and flexible timings even during peak examination seasons.
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

        <Footer />
      </main>
    </>
  );
}
