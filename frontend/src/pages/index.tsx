import dynamic from 'next/dynamic';
import NavBar from '@/components/navbar/NavBar';
import AllahabadSEO from '@/components/seo/AllahabadSEO';
import LocalSchema from '@/components/seo/LocalSchema';
import HeroSection from '@/components/landing/HeroSection';
import CourseHighlights from '@/components/landing/CourseHighlights';

// Lazy load below-the-fold components
const OurOfferings = dynamic(() => import('@/components/landing/OurOfferings'));
const CoursesForKids = dynamic(() => import('@/components/landing/CoursesForKids'));
const FeaturedTutors = dynamic(() => import('@/components/landing/FeaturedTutors'));
const HowItWorks = dynamic(() => import('@/components/landing/HowItWorks'));
const TutorCTA = dynamic(() => import('@/components/landing/TutorCTA'));
const OurImpact = dynamic(() => import('@/components/landing/OurImpact'));
const Footer = dynamic(() => import('@/components/landing/Footer'));
const WhatsappFloat = dynamic(() => import('@/components/common/WhatsappFloat'), { ssr: false });
const FloatingChatButton = dynamic(() => import("@/components/common/FloatingChatButton"), { ssr: false });

const heroData = {
  title:
    'Learn from expert tutors – personalized for every student with Yattra Tutors',
  subtitle: 'Trusted by 5000+ parents last year.',
  ctaText: 'About Yattra Tutors',
  ctaLink: {
    pathname: '/',
    query: {
      source: 'HERO_CTA',
      fromPage: '/',
      campaign: 'FIND_TUTORS',
      medium: 'website',
    },
  },
  imageUrl: '/images/heroBanner.png',
};

/*
 * ═══════════════════════════════════════════════════════
 *  LANDING PAGE
 *  Each section owns its own background and sets up a
 *  deliberate alternating rhythm — pine (dark) / parchment
 *  (light) / pine / parchment — rather than one global
 *  gradient-blob wrapper sitting behind every section:
 *
 *    Hero (pine) → Course Highlights (parchment)
 *    → Offerings (pine) → Kids Courses (parchment)
 *    → Featured Tutors (pine) → How it Works (parchment)
 *    → Tutor CTA (pine) → Our Impact (parchment)
 *    → Footer (pine)
 * ═══════════════════════════════════════════════════════
 */
const LandingPage = () => {
  return (
    <>
      {/* 🔥 SEO */}
      <AllahabadSEO pageType="home" />
      <LocalSchema />

      <NavBar />

      <main className="relative">
        <HeroSection ctaText={heroData.ctaText} imageUrl={heroData.imageUrl} />

        <CourseHighlights />
        <OurOfferings />
        <CoursesForKids />
        <FeaturedTutors />
        <HowItWorks />
        <TutorCTA />
        <OurImpact />

        {/* 🔥 SEO AUTHORITY (HIDDEN) */}
        <section style={{ display: 'none' }}>
          <h1>Best Home Tutors in Allahabad</h1>
          <p>
            Yattra Tutors provides verified home tutors in Allahabad, Prayagraj,
            Jhusi, Naini, Civil Lines, Katra, Rajapur and nearby areas.
          </p>
        </section>

        <WhatsappFloat />
        {/* <FloatingChatButton /> */}
        <Footer />
      </main>
    </>
  );
};

export default LandingPage;
