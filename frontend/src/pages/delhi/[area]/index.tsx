import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Lora, DM_Sans } from "next/font/google";
import {
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Users,
  BookOpen,
  GraduationCap,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Search,
  ChevronDown,
  Home,
  Train,
} from "lucide-react";

import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/landing/Footer";
import { DELHI_AREAS, DelhiArea, getAllDelhiAreaSlugs } from "@/lib/delhi/delhiAreas";
import FAQSchema from "@/components/seoIndia/FAQSchema";
import LocalBusinessSchema from "@/components/seoIndia/LocalBusinessSchema";
import CityServicePageView from "@/components/seo/CityServicePageView";
import { CITIES_DATA, SERVICES_DATA, CityData, ServiceData, ORDERED_SERVICES } from "@/lib/cityServicesData";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"], style: ["italic", "normal"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

/* =========================
   CONSTANTS
========================= */
const PHONE_NUMBER = "+916363453870";
const WHATSAPP_NUMBER = "916363453870";

/* =========================
   COMPONENTS
========================= */
function Breadcrumb({ area }: { area: DelhiArea }) {
  return (
    <nav className="mb-8 flex items-center gap-2 text-sm text-[#AAB6A2]">
      <Link href="/" className="transition-colors hover:text-white">
        <Home className="h-4 w-4" />
      </Link>
      <ChevronDown className="h-3.5 w-3.5 rotate-[-90deg]" />
      <Link href="/delhi" className="transition-colors hover:text-white">
        Delhi
      </Link>
      <ChevronDown className="h-3.5 w-3.5 rotate-[-90deg]" />
      <span className="font-semibold text-[#D79A2C]">{area.displayName}</span>
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
        <span className="text-base font-semibold text-[#1C2B22]">{q}</span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-[#D79A2C] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && <p className="pb-5 leading-relaxed text-[#58646C]">{a}</p>}
    </div>
  );
}

/* =========================
   MAIN PAGE
========================= */
interface Props {
  area?: DelhiArea;
  isService?: boolean;
  city?: CityData;
  service?: ServiceData;
}

export default function DelhiAreaPage({ area, isService, city, service }: Props) {
  if (isService && city && service) {
    return <CityServicePageView city={city} service={service} />;
  }

  if (!area) return null;

  const whatsappMsg = encodeURIComponent(
    `Hello, I need a home tutor in ${area.name}, Delhi`
  );

  return (
    <>
      <Head>
        <title>{area.title}</title>
        <meta name="description" content={area.metaDescription} />
        <meta name="keywords" content={area.keywords.join(", ")} />
        <link rel="canonical" href={`https://yattratutors.com/delhi/${area.slug}`} />

        {/* Open Graph */}
        <meta property="og:title" content={area.title} />
        <meta property="og:description" content={area.metaDescription} />
        <meta property="og:url" content={`https://yattratutors.com/delhi/${area.slug}`} />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={area.title} />
        <meta name="twitter:description" content={area.metaDescription} />

        {/* Structured Data */}
        <FAQSchema cityName="Delhi" location={area.name} intent={`Home Tutors in ${area.name}`} />
        <LocalBusinessSchema city="delhi" cityName="Delhi" location={area.name} />
      </Head>

      <div className={`min-h-screen bg-[#F7F2E9] ${dmSans.className}`}>
        <NavBar />

        {/* ========== HERO SECTION ========== */}
        <section className="relative overflow-hidden bg-[#0E211C] py-20 lg:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[.04]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative z-10 mx-auto w-full max-w-6xl px-4">
            <Breadcrumb area={area} />

            <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
              {/* Left Content */}
              <div className="flex-1">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  {/* Trust Badge */}
                  <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-2">
                    <Star className="h-3.5 w-3.5 fill-[#D79A2C] text-[#D79A2C]" />
                    <span className="text-xs font-medium text-white">Verified tutors</span>
                  </div>

                  <p className={`${lora.className} italic text-sm text-[#AAB6A2] mb-3`}>{area.displayName}, Delhi</p>

                  <h1 className={`${lora.className} text-4xl font-semibold leading-tight text-white sm:text-5xl`}>
                    {area.h1}
                  </h1>

                  <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#AAB6A2]">{area.subheading}</p>

                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#AAB6A2]/90">{area.introduction}</p>

                  {/* CTAs */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href={`/tutors?city=Delhi&area=${encodeURIComponent(area.name)}`}
                      className="inline-flex items-center gap-2 rounded-md bg-[#D79A2C] px-6 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
                    >
                      <Search className="h-4 w-4" />
                      Find a tutor
                    </Link>

                    <Link
                      href="/find-students"
                      className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
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
                transition={{ delay: 0.3 }}
                className="shrink-0 lg:w-[340px]"
              >
                <div className="rounded-md border border-white/10 bg-white/5">
                  <div className="border-b border-white/10 px-6 py-4">
                    <h3 className={`${lora.className} text-sm font-semibold text-white`}>{area.displayName}</h3>
                    <p className="mt-0.5 text-xs text-[#AAB6A2]">Local coverage</p>
                  </div>

                  <div className="p-6">
                    <h4 className="mb-3 text-xs font-semibold text-[#AAB6A2]">Areas covered</h4>
                    <div className="max-h-48 space-y-2 overflow-y-auto">
                      {area.localities.slice(0, 8).map((locality) => (
                        <div key={locality} className="flex items-center gap-2">
                          <MapPin className="h-3 w-3 shrink-0 text-[#D79A2C]" />
                          <span className="text-sm text-white/90">{locality}</span>
                        </div>
                      ))}
                      {area.localities.length > 8 && (
                        <p className="text-xs italic text-[#AAB6A2]">
                          +{area.localities.length - 8} more localities
                        </p>
                      )}
                    </div>

                    {area.metroStations.length > 0 && (
                      <>
                        <h4 className="mb-2 mt-4 text-xs font-semibold text-[#AAB6A2]">Metro stations</h4>
                        <div className="space-y-1.5">
                          {area.metroStations.slice(0, 3).map((station) => (
                            <div key={station} className="flex items-center gap-2">
                              <Train className="h-3 w-3 shrink-0 text-[#D79A2C]" />
                              <span className="text-xs text-white/85">{station}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========== TUTOR SEARCH FORM ========== */}
        <section className="py-12">
          <div className="mx-auto max-w-3xl px-4">
            <div className="rounded-lg border border-[#1C2B22]/10 bg-white p-6">
              <h3 className={`${lora.className} mb-4 text-center text-xl font-semibold text-[#1C2B22]`}>
                Find a tutor in {area.name}
              </h3>
              <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#1C2B22]">Class</label>
                  <select className="w-full rounded-md border border-[#1C2B22]/15 px-3 py-2 text-sm outline-none focus:border-[#D79A2C]">
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
                  <label className="mb-1 block text-xs font-medium text-[#1C2B22]">Subject</label>
                  <select className="w-full rounded-md border border-[#1C2B22]/15 px-3 py-2 text-sm outline-none focus:border-[#D79A2C]">
                    <option>Select subject</option>
                    <option>Mathematics</option>
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>Biology</option>
                    <option>English</option>
                    <option>Science</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#1C2B22]">Board</label>
                  <select className="w-full rounded-md border border-[#1C2B22]/15 px-3 py-2 text-sm outline-none focus:border-[#D79A2C]">
                    <option>Select board</option>
                    <option>CBSE</option>
                    <option>ICSE</option>
                    <option>State Board</option>
                  </select>
                </div>
              </div>
              <Link
                href={`/tutors?city=Delhi&area=${encodeURIComponent(area.name)}`}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-[#D79A2C] py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
              >
                <Search className="h-4 w-4" />
                Find tutor
              </Link>
            </div>
          </div>
        </section>

        {/* ========== WHY CHOOSE YATTRA TUTORS IN AREA ========== */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-12 text-center">
              <h2 className={`${lora.className} text-3xl font-semibold text-[#1C2B22]`}>
                Why choose Yattra Tutors in {area.name}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-[#58646C]">{area.whyChooseContent}</p>
            </div>

            <div className="divide-y divide-[#1C2B22]/[.06] rounded-lg border border-[#1C2B22]/10 bg-white">
              {area.uniqueFeatures.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-6"
                >
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#D79A2C]" />
                  <p className="text-sm font-medium leading-relaxed text-[#1C2B22]">{feature}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== HOME TUITION SERVICES ========== */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-12 text-center">
              <h2 className={`${lora.className} text-3xl font-semibold text-[#1C2B22]`}>
                Home tuition services available in {area.name}
              </h2>
              <p className="mt-2 text-sm text-[#58646C]">Expert tutors for all classes and competitive exams</p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {[
                { name: "Class 1-5", link: `/tutors?class=1-5&area=${encodeURIComponent(area.name)}&city=Delhi` },
                { name: "Class 6-8", link: `/tutors?class=6-8&area=${encodeURIComponent(area.name)}&city=Delhi` },
                { name: "Class 9-10", link: `/tutors?class=9-10&area=${encodeURIComponent(area.name)}&city=Delhi` },
                { name: "Class 11-12", link: `/tutors?class=11-12&area=${encodeURIComponent(area.name)}&city=Delhi` },
                { name: "JEE Preparation", link: `/tutors?exam=JEE&area=${encodeURIComponent(area.name)}&city=Delhi` },
                { name: "NEET Preparation", link: `/tutors?exam=NEET&area=${encodeURIComponent(area.name)}&city=Delhi` },
                { name: "CBSE", link: `/tutors?board=CBSE&area=${encodeURIComponent(area.name)}&city=Delhi` },
                { name: "ICSE / ISC", link: `/tutors?board=ICSE&area=${encodeURIComponent(area.name)}&city=Delhi` },
              ].map((service) => (
                <Link
                  key={service.name}
                  href={service.link}
                  className="rounded-md border border-[#1C2B22]/10 bg-white px-4 py-4 text-center text-sm font-medium text-[#1C2B22] transition-colors hover:border-[#D79A2C]/50"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ========== POPULAR SUBJECTS ========== */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-12 text-center">
              <h2 className={`${lora.className} text-3xl font-semibold text-[#1C2B22]`}>
                Popular subjects in {area.name}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {[
                "Maths", "Physics", "Chemistry", "Biology", "English", "Science",
                "Hindi", "Computer Science", "Social Science", "Accountancy", "Economics", "Commerce",
              ].map((subject) => (
                <Link
                  key={subject}
                  href={`/tutors?subject=${encodeURIComponent(subject)}&area=${encodeURIComponent(area.name)}&city=Delhi`}
                  className="rounded-md border border-[#1C2B22]/10 bg-white px-3 py-3.5 text-center text-sm font-medium text-[#1C2B22] transition-colors hover:border-[#D79A2C]/50"
                >
                  {subject}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ========== SCHOOLS NEARBY ========== */}
        {area.schoolsNearby.length > 0 && (
          <section className="py-20">
            <div className="mx-auto max-w-5xl px-4">
              <div className="mb-12 text-center">
                <h2 className={`${lora.className} text-3xl font-semibold text-[#1C2B22]`}>
                  Schools near {area.name}
                </h2>
                <p className="mt-2 text-sm text-[#58646C]">We provide tutors for students from these schools</p>
              </div>

              <div className="divide-y divide-[#1C2B22]/[.06] rounded-lg border border-[#1C2B22]/10 bg-white md:grid md:grid-cols-2 md:divide-y-0 lg:grid-cols-3">
                {area.schoolsNearby.map((school, idx) => (
                  <div
                    key={school}
                    className={`flex items-center gap-3 p-5 ${
                      idx % 3 !== 0 ? "md:border-l md:border-[#1C2B22]/[.06]" : ""
                    }`}
                  >
                    <GraduationCap className="h-5 w-5 shrink-0 text-[#D79A2C]" />
                    <span className="text-sm font-medium text-[#1C2B22]">{school}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ========== AREAS WE COVER NEAR ========== */}
        {area.nearbyAreas.length > 0 && (
          <section className="py-20">
            <div className="mx-auto max-w-5xl px-4">
              <div className="mb-12 text-center">
                <h2 className={`${lora.className} text-3xl font-semibold text-[#1C2B22]`}>
                  Areas we cover near {area.name}
                </h2>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {area.nearbyAreas.map((nearbyArea) => {
                  const nearbySlug = Object.keys(DELHI_AREAS).find(
                    (key) => DELHI_AREAS[key]?.name === nearbyArea
                  );
                  return nearbySlug ? (
                    <Link
                      key={nearbyArea}
                      href={`/delhi/${nearbySlug}`}
                      className="inline-flex items-center gap-2 rounded-md border border-[#1C2B22]/10 bg-white px-5 py-2.5 transition-colors hover:border-[#D79A2C]/50"
                    >
                      <MapPin className="h-3.5 w-3.5 text-[#D79A2C]" />
                      <span className="text-sm font-medium text-[#1C2B22]">{nearbyArea}</span>
                    </Link>
                  ) : (
                    <div
                      key={nearbyArea}
                      className="inline-flex items-center gap-2 rounded-md border border-[#1C2B22]/10 bg-[#F7F2E9] px-5 py-2.5"
                    >
                      <MapPin className="h-3.5 w-3.5 text-[#9AA3AB]" />
                      <span className="text-sm text-[#58646C]">{nearbyArea}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/delhi"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#8a5f18]"
                >
                  View all Delhi areas
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ========== HOW YATTRA TUTORS WORKS ========== */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-12 text-center">
              <h2 className={`${lora.className} text-3xl font-semibold text-[#1C2B22]`}>How Yattra Tutors works</h2>
            </div>

            <div className="grid grid-cols-1 divide-y divide-[#1C2B22]/[.06] rounded-lg border border-[#1C2B22]/10 bg-white md:grid-cols-4 md:divide-y-0">
              {[
                { step: "01", title: "Tell us what you need", description: "Share your class, subject, and location details" },
                { step: "02", title: "Get matched with tutors", description: "We connect you with 2-3 verified tutors" },
                { step: "03", title: "Review tutor details", description: "Check profiles and take a free demo class" },
                { step: "04", title: "Start learning at home", description: "Begin your personalized learning journey" },
              ].map((item, idx) => (
                <div key={item.step} className={`p-6 ${idx > 0 ? "md:border-l md:border-[#1C2B22]/[.06]" : ""}`}>
                  <span className={`${lora.className} text-sm font-semibold text-[#D79A2C]`}>{item.step}</span>
                  <h3 className="mt-2 font-semibold text-[#1C2B22]">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-[#58646C]">{item.description}</p>
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
                  <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>About {area.name}</h2>
                </div>
                <p className="leading-relaxed text-[#58646C]">{area.localContext}</p>

                {area.academicProfile && (
                  <div className="mt-5 border-t border-[#1C2B22]/[.08] pt-5">
                    <h3 className="mb-2 font-semibold text-[#1C2B22]">Academic profile</h3>
                    <p className="leading-relaxed text-[#58646C]">{area.academicProfile}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ========== FAQ SECTION ========== */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-4">
            <div className="mb-10 text-center">
              <h2 className={`${lora.className} text-3xl font-semibold text-[#1C2B22]`}>
                Frequently asked questions
              </h2>
              <p className="mt-2 text-sm text-[#58646C]">Common questions about home tuition in {area.name}</p>
            </div>

            <div className="rounded-lg border border-[#1C2B22]/10 bg-white px-6">
              {area.faqs.map((faq, idx) => (
                <FAQItem key={idx} q={faq.question} a={faq.answer} />
              ))}
            </div>
          </div>
        </section>

        {/* ========== FINAL CTA ========== */}
        <section className="bg-[#0E211C] py-20 text-white">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className={`${lora.className} text-3xl font-semibold sm:text-4xl`}>
              Ready to find your home tutor in {area.name}?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[#AAB6A2]">
              Connect with verified, experienced tutors in your locality
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href={`/tutors?city=Delhi&area=${encodeURIComponent(area.name)}`}
                className="inline-flex items-center gap-2 rounded-md bg-[#D79A2C] px-7 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
              >
                <Search className="h-4 w-4" />
                Find a tutor now
              </Link>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-[#3f8a5f] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#357a52]"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp us
              </a>

              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex items-center gap-2 rounded-md border border-white/20 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
              >
                <Phone className="h-4 w-4" />
                Call us
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

/* =========================
   STATIC PATH GENERATION
========================= */
export const getStaticPaths: GetStaticPaths = async () => {
  const areaSlugs = getAllDelhiAreaSlugs();
  const paths = [
    ...areaSlugs.map((slug) => ({ params: { area: slug } })),
    ...ORDERED_SERVICES.map((slug) => ({ params: { area: slug } })),
  ];

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const paramSlug = (params?.area as string)?.toLowerCase();

  // 1. Check if this is one of our SEO services (e.g. maths-tutor, home-tutor)
  if (SERVICES_DATA[paramSlug]) {
    return {
      props: {
        isService: true,
        city: CITIES_DATA['delhi'],
        service: SERVICES_DATA[paramSlug],
      },
      revalidate: 86400,
    };
  }

  // 2. Otherwise check if it's a specific Delhi area
  const area = DELHI_AREAS[paramSlug];

  if (!area) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      area,
    },
    revalidate: 86400,
  };
};
