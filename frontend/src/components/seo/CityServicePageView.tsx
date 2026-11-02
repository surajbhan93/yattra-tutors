import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  CheckCircle2, Star, Phone, MessageSquare, ShieldCheck,
  MapPin, Clock, ArrowRight, Award, Users, ChevronDown,
  BookOpen, Sparkles, HelpCircle, GraduationCap, Home,
  Send, AlertCircle
} from 'lucide-react';
import NavBar from '@/components/navbar/NavBar';
import Footer from '@/components/landing/Footer';
import { CityData, ServiceData, SERVICES_DATA } from '@/lib/cityServicesData';

interface CityServicePageViewProps {
  city: CityData;
  service: ServiceData;
}

const PHONE_NUMBER = '+91-6363453870';
const WHATSAPP_NUMBER = '916363453870';

export default function CityServicePageView({ city, service }: CityServicePageViewProps) {
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    classGrade: 'Class 9-10',
    mode: 'Home Tuition (Offline)',
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const pageTitle = `${service.title} in ${city.name} | Verified 1-on-1 Tuition – Yattra Tutors`;
  const pageDescription = `Find top-rated ${service.title.toLowerCase()} in ${city.name} across ${city.popularAreas.slice(0, 4).join(', ')}. Verified teachers, 1-on-1 personalized home tuition & free demo class from Yattra Tutors.`;
  const canonicalUrl = `https://yattratutors.com/${city.slug}/${service.slug}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone || formData.phone.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    setSubmitted(true);
    const msg = encodeURIComponent(
      `Hello Yattra Tutors, I need a ${service.shortTitle} in ${city.name}.\nParent Name: ${formData.parentName}\nPhone: ${formData.phone}\nGrade: ${formData.classGrade}\nMode: ${formData.mode}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  // Structured Data Schema
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${canonicalUrl}#business`,
        name: `Yattra Tutors - ${service.title} in ${city.name}`,
        url: canonicalUrl,
        telephone: PHONE_NUMBER,
        email: 'yattratutorial@gmail.com',
        priceRange: '₹₹',
        address: {
          '@type': 'PostalAddress',
          addressLocality: city.name,
          addressRegion: city.state,
          addressCountry: 'IN',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: city.rating,
          reviewCount: city.reviewsCount,
        },
      },
      {
        '@type': 'Service',
        '@id': `${canonicalUrl}#service`,
        name: `${service.title} in ${city.name}`,
        provider: {
          '@type': 'EducationalOrganization',
          name: 'Yattra Tutors',
          url: 'https://yattratutors.com',
        },
        areaServed: {
          '@type': 'City',
          name: city.name,
        },
        description: service.overview,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://yattratutors.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: city.name,
            item: `https://yattratutors.com/${city.slug}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: service.title,
            item: canonicalUrl,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: service.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
    ],
  };

  const otherServices = (Object.values(SERVICES_DATA).filter(Boolean) as ServiceData[]).filter(
    (s) => s && s.slug !== service.slug
  );

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`${service.title.toLowerCase()} in ${city.name.toLowerCase()}, home tutor ${city.shortName.toLowerCase()}, best ${service.shortTitle.toLowerCase()} near me, private tuition ${city.shortName.toLowerCase()}, yattra tutors ${city.slug}`} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Yattra Tutors" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      <NavBar />

      <main className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
        {/* ── Breadcrumb Bar ── */}
        <div className="border-b border-slate-200/80 bg-white/70 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Link href="/" className="hover:text-indigo-600 transition flex items-center gap-1">
                <Home size={13} />
                <span>Home</span>
              </Link>
              <span>/</span>
              <span className="text-slate-400">Our Services</span>
              <span>/</span>
              <Link href={`/${city.slug}`} className="hover:text-indigo-600 transition">
                {city.name}
              </Link>
              <span>/</span>
              <span className="text-indigo-600 font-semibold">{service.title}</span>
            </nav>
          </div>
        </div>

        {/* ── Hero Section ── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 py-12 text-white sm:py-16 lg:py-20">
          <div className="absolute inset-0 -z-10 opacity-30">
            <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blue-600/40 blur-3xl" />
            <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-indigo-500/30 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
              
              {/* Left Column: Heading & Value Proposition */}
              <div className="space-y-6 lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-300 backdrop-blur-md">
                  <Sparkles size={14} className="text-cyan-400" />
                  <span>{city.name} • 1-on-1 Home Tuition</span>
                </div>

                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white leading-tight">
                  {service.title} in{' '}
                  <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                    {city.name}
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  {service.overview} Get matched with top background-verified teachers in{' '}
                  <strong className="text-white">{city.shortName}</strong> for CBSE, ICSE &amp; State Boards.
                </p>

                {/* Highlights Pill Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
                  <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                    <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-slate-200">1-on-1 Personal Attention</span>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                    <ShieldCheck size={18} className="text-cyan-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-slate-200">100% Verified Tutors</span>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                    <Star size={18} className="text-amber-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-slate-200">Free 1-Hour Demo Class</span>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                    <Clock size={18} className="text-indigo-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-slate-200">Teacher in 24 Hours</span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <a
                    href={`tel:${PHONE_NUMBER.replace(/-/g, '')}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    <Phone size={16} />
                    <span>Call Helpline: {PHONE_NUMBER}</span>
                  </a>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi Yattra Tutors, I am looking for ${service.title} in ${city.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/20 px-6 py-3.5 text-sm font-bold text-emerald-300 hover:bg-emerald-500/30 transition-all"
                  >
                    <MessageSquare size={16} />
                    <span>WhatsApp Us</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Instant Booking Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl border border-white/15 bg-white/10 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-black/40">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Quick Request</span>
                      <h3 className="text-xl font-bold text-white">Book Free Demo Class</h3>
                    </div>
                    <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-bold text-emerald-300 border border-emerald-500/30">
                      Zero Advance Fee
                    </span>
                  </div>

                  {submitted ? (
                    <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center space-y-3">
                      <CheckCircle2 size={40} className="mx-auto text-emerald-400" />
                      <h4 className="text-lg font-bold text-white">Request Received!</h4>
                      <p className="text-xs text-slate-300">
                        Our relationship manager for {city.name} is connecting with you within 30 minutes.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Parent / Student Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ramesh Kumar"
                          value={formData.parentName}
                          onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="10-digit phone number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                            Grade / Level
                          </label>
                          <select
                            value={formData.classGrade}
                            onChange={(e) => setFormData({ ...formData, classGrade: e.target.value })}
                            className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-3 text-xs text-white focus:border-cyan-400 focus:outline-none"
                          >
                            <option>Class 1 - 5 (Primary)</option>
                            <option>Class 6 - 8 (Middle)</option>
                            <option>Class 9 - 10 (Secondary)</option>
                            <option>Class 11 - 12 (Senior)</option>
                            <option>IIT-JEE / NEET Prep</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                            Teaching Mode
                          </label>
                          <select
                            value={formData.mode}
                            onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                            className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-3 text-xs text-white focus:border-cyan-400 focus:outline-none"
                          >
                            <option>Home Tuition (Offline)</option>
                            <option>Online 1-on-1 Class</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full mt-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg shadow-cyan-500/25 hover:from-cyan-300 hover:to-blue-400 hover:shadow-cyan-500/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                      >
                        <Send size={16} />
                        <span>Schedule Free Demo in {city.shortName}</span>
                      </button>

                      <p className="text-center text-[11px] text-slate-400">
                        🔒 Safe &amp; confidential. No spam guaranteed.
                      </p>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Stats Strip ── */}
        <section className="border-b border-slate-200 bg-white py-6 shadow-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4 md:divide-x md:divide-slate-200">
              <div className="p-2">
                <div className="text-2xl sm:text-3xl font-black text-indigo-600">{city.activeTutors}+</div>
                <div className="text-xs font-semibold text-slate-500">Verified Tutors in {city.shortName}</div>
              </div>
              <div className="p-2">
                <div className="text-2xl sm:text-3xl font-black text-blue-600">{city.studentsHelped}+</div>
                <div className="text-xs font-semibold text-slate-500">Students Taught</div>
              </div>
              <div className="p-2">
                <div className="text-2xl sm:text-3xl font-black text-amber-500">★ {city.rating}/5.0</div>
                <div className="text-xs font-semibold text-slate-500">{city.reviewsCount}+ Parent Ratings</div>
              </div>
              <div className="p-2">
                <div className="text-2xl sm:text-3xl font-black text-emerald-600">100%</div>
                <div className="text-xs font-semibold text-slate-500">Tutor Replacement Guarantee</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section: Why Choose Yattra Tutors for this Subject ── */}
        <section className="py-14 sm:py-18 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Tailored Pedagogy</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
                Why Choose Our {service.shortTitle} in {city.name}?
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600">
                Individualized academic mentorship designed to transform student confidence and academic performance.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {service.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">Benefit #{idx + 1}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section: Comprehensive Syllabus Covered ── */}
        <section className="py-14 sm:py-18 bg-white border-y border-slate-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-5">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Exhaustive Curriculum</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Curriculum &amp; Exam Formats Covered
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Our private tutors in {city.name} align strictly with school test calendars, monthly mock exams, and board standards.
                </p>
                <div className="rounded-2xl bg-indigo-50/60 p-5 border border-indigo-100 space-y-2">
                  <div className="text-xs font-bold text-indigo-900 uppercase">Applicable Boards</div>
                  <div className="flex flex-wrap gap-2">
                    {['CBSE', 'ICSE / ISC', 'UP Board / State', 'IB / Cambridge', 'JEE / NEET'].map((b) => (
                      <span key={b} className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-slate-700 border border-slate-200 shadow-2xs">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-3">
                {service.syllabusTopics.map((topic, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition hover:bg-slate-50"
                  >
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 leading-snug">{topic}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Section: Popular Localities in City ── */}
        <section className="py-14 sm:py-18 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Local Area Coverage</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Available Across All Sectors &amp; Localities in {city.name}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Our tutors travel directly to student residences in these prime neighborhood areas:
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
              {city.popularAreas.map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-700 shadow-2xs hover:border-indigo-400 hover:text-indigo-600 transition"
                >
                  <MapPin size={13} className="text-indigo-500" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section: Other 9 SEO Services in This City ── */}
        <section className="py-14 sm:py-18 bg-white border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Explore Services</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Other Tutoring Services in {city.name}
                </h2>
              </div>
              <Link
                href={`/${city.slug}`}
                className="text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group"
              >
                <span>View Full {city.shortName} Directory</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3.5">
              {otherServices.map((other) => (
                <Link
                  key={other.slug}
                  href={`/${city.slug}/${other.slug}`}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 hover:border-indigo-400 hover:bg-white hover:shadow-md transition-all group"
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-indigo-600 transition-colors">
                    {other.category}
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mt-1 group-hover:text-indigo-600 transition-colors">
                    {other.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {other.gradeLevel}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-bold text-indigo-600">
                    <span>Explore Page</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section: FAQs ── */}
        <section className="py-14 sm:py-18 bg-slate-50 border-t border-slate-200">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Have Questions?</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Frequently Asked Questions ({city.name})
              </h2>
            </div>

            <div className="space-y-3">
              {service.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="flex w-full items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-indigo-600' : ''}`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="border-t border-slate-100 bg-slate-50/50 p-5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-800 py-14 text-white">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
              Ready to Connect with Top {service.shortTitle} in {city.name}?
            </h2>
            <p className="mx-auto max-w-2xl text-sm sm:text-base text-indigo-100">
              Book a 100% free, no-obligation demo trial session today. Our {city.shortName} team will assign the most suitable educator for your child within 24 hours.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href={`tel:${PHONE_NUMBER.replace(/-/g, '')}`}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-black text-indigo-900 shadow-xl hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all"
              >
                <Phone size={16} />
                <span>Call {PHONE_NUMBER}</span>
              </a>
              <Link
                href="/find-tutor-flow"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 bg-white/10 backdrop-blur-md px-7 py-3.5 text-sm font-black text-white hover:bg-white/20 hover:scale-105 active:scale-95 transition-all"
              >
                <span>Find Tutor Flow</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
