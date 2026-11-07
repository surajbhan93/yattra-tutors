import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { lora, dmSans } from "@/lib/fonts";
import {
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Users,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Search,
  ChevronDown,
  Home,
  GraduationCap,
} from "lucide-react";

import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/landing/Footer";
import { GURUGRAM_AREAS, GurugramArea } from "@/lib/gurugram/gurugramAreas";
import CityServicePageView from "@/components/seo/CityServicePageView";
import { CITIES_DATA, SERVICES_DATA, CityData, ServiceData, ORDERED_SERVICES } from "@/lib/cityServicesData";

/* =========================
   CONSTANTS
========================= */
const PHONE_NUMBER = "+916363453870";
const WHATSAPP_NUMBER = "916363453870";

/* =========================
   COMPONENTS
========================= */
function Breadcrumb({ area }: { area: GurugramArea }) {
  return (
    <nav className="mb-8 flex items-center gap-2 text-sm text-[#AAB6A2]">
      <Link href="/" className="transition-colors hover:text-white">
        <Home className="h-4 w-4" />
      </Link>
      <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
      <Link href="/gurugram" className="transition-colors hover:text-white">
        Gurugram
      </Link>
      <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
      <span className="font-medium text-[#D79A2C]">{area.displayName}</span>
    </nav>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#1C2B22]/[.08] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-[15px] font-medium text-[#1C2B22]">{q}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-[#D79A2C] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <p className="pb-5 text-sm leading-relaxed text-[#58646C]">{a}</p>}
    </div>
  );
}

/* =========================
   MAIN PAGE
========================= */
interface Props {
  area?: GurugramArea;
  isService?: boolean;
  city?: CityData;
  service?: ServiceData;
}

export default function GurugramAreaPage({ area, isService, city, service }: Props) {
  if (isService && city && service) {
    return <CityServicePageView city={city} service={service} />;
  }

  if (!area) return null;

  const whatsappMsg = encodeURIComponent(
    `Hello, I need a home tutor in ${area.name}, Gurugram`
  );

  return (
    <>
      <Head>
        <title>{area.title}</title>
        <meta name="description" content={area.metaDescription} />
        <meta name="keywords" content={area.keywords.join(", ")} />
        <link rel="canonical" href={`https://yattratutors.com/gurugram/${area.slug}`} />

        {/* Open Graph */}
        <meta property="og:title" content={area.title} />
        <meta property="og:description" content={area.metaDescription} />
        <meta property="og:url" content={`https://yattratutors.com/gurugram/${area.slug}`} />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={area.title} />
        <meta name="twitter:description" content={area.metaDescription} />
      </Head>

      <div className={`min-h-screen bg-[#F7F2E9] ${dmSans.className}`}>
        <NavBar />

        {/* ========== HERO SECTION ========== */}
        <section className="relative overflow-hidden bg-[#0E211C] py-16 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[.04]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative z-10 mx-auto max-w-6xl px-4">
            <Breadcrumb area={area} />

            <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
              {/* Left Content */}
              <div className="flex-1">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-2">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-[#D79A2C] text-[#D79A2C]" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-white">Verified tutors</span>
                  </div>

                  <h1 className={`${lora.className} text-4xl font-semibold leading-tight text-white sm:text-5xl`}>
                    {area.h1}
                  </h1>

                  <p className="mt-5 max-w-xl text-base leading-relaxed text-[#AAB6A2]">{area.subheading}</p>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#AAB6A2]/80">{area.introduction}</p>

                  {/* CTAs */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href={`/tutors?city=Gurugram&area=${encodeURIComponent(area.name)}`}
                      className="inline-flex items-center gap-2 rounded-md bg-[#D79A2C] px-6 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
                    >
                      <Search className="h-4 w-4" />
                      Find a tutor
                    </Link>

                    <Link
                      href="/find-students"
                      className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40"
                    >
                      <Users className="h-4 w-4" />
                      Find students
                    </Link>

                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md bg-[#3f8a5f] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#357a52]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Right: Local Info Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="shrink-0 rounded-md border border-white/10 bg-white/5 lg:w-[320px]"
              >
                <div className="border-b border-white/10 px-6 py-4">
                  <h3 className={`${lora.className} text-sm font-semibold text-white`}>{area.displayName}</h3>
                  <p className="mt-0.5 text-xs text-[#AAB6A2]">Local coverage</p>
                </div>
                <div className="p-6">
                  <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#AAB6A2]">
                    Areas covered
                  </h4>
                  <div className="max-h-48 space-y-2 overflow-y-auto">
                    {area.localities.slice(0, 8).map((locality) => (
                      <div key={locality} className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 shrink-0 text-[#D79A2C]" />
                        <span className="text-sm text-[#AAB6A2]">{locality}</span>
                      </div>
                    ))}
                    {area.localities.length > 8 && (
                      <p className="text-xs italic text-[#AAB6A2]/70">
                        +{area.localities.length - 8} more localities
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========== TUTOR SEARCH FORM ========== */}
        <section className="py-14">
          <div className="mx-auto max-w-3xl px-4">
            <div className="rounded-lg border border-[#1C2B22]/10 bg-white p-6">
              <h3 className={`${lora.className} mb-5 text-center text-lg font-semibold text-[#1C2B22]`}>
                Find a tutor in {area.name}
              </h3>
              <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#1C2B22]">Class</label>
                  <select className="w-full rounded-md border border-[#1C2B22]/15 px-3 py-2.5 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]">
                    <option>Select class</option>
                    <option>Class 1-5</option>
                    <option>Class 6-8</option>
                    <option>Class 9-10</option>
                    <option>Class 11-12</option>
                    <option>JEE</option>
                    <option>NEET</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#1C2B22]">Subject</label>
                  <select className="w-full rounded-md border border-[#1C2B22]/15 px-3 py-2.5 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]">
                    <option>Select subject</option>
                    <option>Mathematics</option>
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>Biology</option>
                    <option>English</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#1C2B22]">Board</label>
                  <select className="w-full rounded-md border border-[#1C2B22]/15 px-3 py-2.5 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]">
                    <option>Select board</option>
                    <option>CBSE</option>
                    <option>ICSE</option>
                    <option>State Board</option>
                  </select>
                </div>
              </div>
              <Link
                href={`/tutors?city=Gurugram&area=${encodeURIComponent(area.name)}`}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-[#D79A2C] py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
              >
                <Search className="h-4 w-4" />
                Find tutor
              </Link>
            </div>
          </div>
        </section>

        {/* ========== WHY CHOOSE YATTRA TUTORS IN AREA ========== */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-12 text-center">
              <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22] sm:text-3xl`}>
                Why choose Yattra Tutors in {area.name}?
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-[#58646C]">{area.whyChooseContent}</p>
            </div>

            <div className="grid grid-cols-1 divide-y divide-[#1C2B22]/[.08] rounded-lg border border-[#1C2B22]/10 sm:grid-cols-2 sm:divide-y-0">
              {area.uniqueFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 p-6 ${
                    idx % 2 === 0 ? "sm:border-r sm:border-[#1C2B22]/[.08]" : ""
                  }`}
                >
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#D79A2C]" />
                  <p className="text-sm font-medium leading-relaxed text-[#1C2B22]">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== HOME TUITION SERVICES ========== */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-10 text-center">
              <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22] sm:text-3xl`}>
                Home tuition services available in {area.name}
              </h2>
              <p className="mt-2 text-sm text-[#58646C]">Expert tutors for all classes and competitive exams</p>
            </div>

            <div className="grid grid-cols-2 divide-x divide-y divide-[#1C2B22]/[.08] overflow-hidden rounded-lg border border-[#1C2B22]/10 bg-white sm:grid-cols-3 lg:grid-cols-4">
              {[
                { name: "Class 1-5", link: `/tutors?class=1-5&area=${encodeURIComponent(area.name)}` },
                { name: "Class 6-8", link: `/tutors?class=6-8&area=${encodeURIComponent(area.name)}` },
                { name: "Class 9-10", link: `/tutors?class=9-10&area=${encodeURIComponent(area.name)}` },
                { name: "Class 11-12", link: `/tutors?class=11-12&area=${encodeURIComponent(area.name)}` },
                { name: "JEE preparation", link: `/tutors?exam=JEE&area=${encodeURIComponent(area.name)}` },
                { name: "NEET preparation", link: `/tutors?exam=NEET&area=${encodeURIComponent(area.name)}` },
                { name: "CBSE", link: `/tutors?board=CBSE&area=${encodeURIComponent(area.name)}` },
                { name: "ICSE / ISC", link: `/tutors?board=ICSE&area=${encodeURIComponent(area.name)}` },
              ].map((service) => (
                <Link
                  key={service.name}
                  href={service.link}
                  className="p-5 text-center text-sm font-medium text-[#1C2B22] transition-colors hover:bg-[#F7F2E9] hover:text-[#8a5f18]"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ========== POPULAR SUBJECTS ========== */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-10 text-center">
              <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22] sm:text-3xl`}>
                Popular subjects in {area.name}
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Maths", "Physics", "Chemistry", "Biology", "English", "Science",
                "Hindi", "Computer Science", "Social Science", "Accountancy", "Economics", "Commerce",
              ].map((subject) => (
                <Link
                  key={subject}
                  href={`/tutors?subject=${encodeURIComponent(subject)}&area=${encodeURIComponent(area.name)}`}
                  className="rounded-full border border-[#1C2B22]/15 px-4 py-2 text-sm font-medium text-[#1C2B22] transition-colors hover:border-[#D79A2C] hover:text-[#8a5f18]"
                >
                  {subject}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ========== AREAS WE COVER NEAR ========== */}
        {area.nearbyAreas.length > 0 && (
          <section className="py-20">
            <div className="mx-auto max-w-5xl px-4">
              <div className="mb-10 text-center">
                <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22] sm:text-3xl`}>
                  Areas we cover near {area.name}
                </h2>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {area.nearbyAreas.map((nearbyArea) => {
                  const nearbySlug = Object.keys(GURUGRAM_AREAS).find(
                    (key) => GURUGRAM_AREAS[key]?.name === nearbyArea
                  );
                  return nearbySlug ? (
                    <Link
                      key={nearbyArea}
                      href={`/gurugram/${nearbySlug}`}
                      className="inline-flex items-center gap-2 rounded-md border border-[#1C2B22]/15 bg-white px-5 py-3 transition-colors hover:border-[#D79A2C]/50"
                    >
                      <MapPin className="h-4 w-4 text-[#D79A2C]" />
                      <span className="text-sm font-medium text-[#1C2B22]">{nearbyArea}</span>
                    </Link>
                  ) : null;
                })}
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/gurugram"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#8a5f18] hover:text-[#6e4a13]"
                >
                  View all Gurugram areas
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ========== HOW YATTRA TUTORS WORKS ========== */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-14 text-center">
              <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22] sm:text-3xl`}>
                How Yattra Tutors works
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {[
                { step: "01", title: "Tell us what you need", description: "Share your class, subject, and location details" },
                { step: "02", title: "Get matched with tutors", description: "We connect you with 2-3 verified tutors" },
                { step: "03", title: "Review tutor details", description: "Check profiles and take a free demo class" },
                { step: "04", title: "Start learning at home", description: "Begin your personalized learning journey" },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className={`${lora.className} mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0E211C] text-base font-semibold text-[#D79A2C]`}>
                    {item.step}
                  </div>
                  <h3 className="mb-1.5 text-base font-semibold text-[#1C2B22]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[#58646C]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== LOCAL CONTEXT SECTION ========== */}
        {area.localContext && (
          <section className="py-20">
            <div className="mx-auto max-w-3xl px-4">
              <div className="rounded-lg border border-[#1C2B22]/10 bg-white p-8">
                <div className="mb-4 flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-[#D79A2C]" />
                  <h2 className={`${lora.className} text-xl font-semibold text-[#1C2B22]`}>About {area.name}</h2>
                </div>
                <p className="text-sm leading-relaxed text-[#58646C]">{area.localContext}</p>
              </div>
            </div>
          </section>
        )}

        {/* ========== CTA SECTION ========== */}
        <section className="relative overflow-hidden bg-[#0E211C] py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[.04]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
          <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
            <h2 className={`${lora.className} text-3xl font-semibold text-white sm:text-4xl`}>
              Find a tutor in {area.name} today
            </h2>
            <p className="mx-auto mb-10 mt-4 max-w-xl text-sm text-[#AAB6A2]">
              Join families in {area.name} who trust Yattra Tutors for quality home tuition
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href={`/tutors?city=Gurugram&area=${encodeURIComponent(area.name)}`}
                className="inline-flex items-center gap-2 rounded-md bg-[#D79A2C] px-7 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
              >
                <Search className="h-4 w-4" />
                Find a tutor
              </Link>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex items-center gap-2 rounded-md border border-white/20 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40"
              >
                <Phone className="h-4 w-4" />
                Call now
              </a>
            </div>
          </div>
        </section>

        {/* ========== FAQ SECTION ========== */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-4">
            <div className="mb-10 text-center">
              <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22] sm:text-3xl`}>
                Frequently asked questions
              </h2>
              <p className="mt-2 text-sm text-[#58646C]">Everything about home tuition in {area.name}</p>
            </div>

            <div className="rounded-lg border border-[#1C2B22]/10 bg-white px-6">
              {area.faqs.map((faq, idx) => (
                <FAQItem key={idx} q={faq.question} a={faq.answer} />
              ))}
            </div>
          </div>
        </section>

        {/* ========== SEO CONTENT (HIDDEN) ========== */}
        <section className="sr-only" aria-hidden="false">
          <div className="max-w-7xl mx-auto px-6">
            <h2>Home Tutors in {area.name}, Gurugram – Complete Guide</h2>

            <h3>About {area.name}</h3>
            <p>{area.introduction}</p>
            <p>{area.localContext}</p>

            <h3>Localities Covered in {area.name}</h3>
            <ul>
              {area.localities.map((locality) => (
                <li key={locality}>Home tutor in {locality}</li>
              ))}
            </ul>

            <h3>Schools Near {area.name}</h3>
            <ul>
              {area.schoolsNearby.map((school) => (
                <li key={school}>Tutor for {school} students</li>
              ))}
            </ul>

            {area.residentialSocieties.length > 0 && (
              <>
                <h3>Residential Societies in {area.name}</h3>
                <ul>
                  {area.residentialSocieties.map((society) => (
                    <li key={society}>Home tutor in {society}</li>
                  ))}
                </ul>
              </>
            )}

            <h3>Why Choose Yattra Tutors in {area.name}?</h3>
            <p>{area.whyChooseContent}</p>
            <ul>
              {area.uniqueFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </section>

        <Footer />
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": area.faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
              },
            })),
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": `Yattra Tutors Home Tuition ${area.name} Gurugram`,
            "description": area.metaDescription,
            "url": `https://yattratutors.com/gurugram/${area.slug}`,
            "telephone": PHONE_NUMBER,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": area.name,
              "addressRegion": "Gurugram, Haryana",
              "addressCountry": "IN",
            },
            "areaServed": area.localities.map((locality) => ({
              "@type": "Place",
              "name": locality,
            })),
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://yattratutors.com",
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Gurugram",
                "item": "https://yattratutors.com/gurugram",
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": area.displayName,
                "item": `https://yattratutors.com/gurugram/${area.slug}`,
              },
            ],
          }),
        }}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const areaSlugs = Object.keys(GURUGRAM_AREAS);
  const paths = [
    ...areaSlugs.map((areaKey) => ({ params: { area: areaKey } })),
    ...ORDERED_SERVICES.map((slug) => ({ params: { area: slug } })),
  ];

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const paramSlug = (params?.area as string)?.toLowerCase();

  // 1. Check if this is an SEO service (e.g. maths-tutor, home-tutor)
  if (SERVICES_DATA[paramSlug]) {
    return {
      props: {
        isService: true,
        city: CITIES_DATA['gurugram'],
        service: SERVICES_DATA[paramSlug],
      },
      revalidate: 86400,
    };
  }

  // 2. Otherwise check if it's a specific Gurugram area
  const area = GURUGRAM_AREAS[paramSlug];

  if (!area) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      area,
    },
    revalidate: 86400, // Revalidate once per day
  };
};
