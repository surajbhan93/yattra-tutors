import Head from "next/head";
import { lora, dmSans } from "@/lib/fonts";

import HeroSection from "@/components/how-it-works/HeroSection";
import HowItWorksToggle from "@/components/how-it-works/HowItWorksToggle";
import WhyYattraTutors from "@/components/how-it-works/WhyTutorEdge";
import FAQ from "@/components/how-it-works/FAQ";
import Footer from "@/components/landing/Footer";
import NavBar from "@/components/navbar/NavBar";

export default function HowItWorksPage() {
  return (
    <>
      <Head>
        <title>How Yattra Tutors Works | For Parents & Tutors</title>
        <meta
          name="description"
          content="Learn how Yattra Tutors works for parents and tutors. Find verified tutors, book classes, or start teaching with a simple and trusted process."
        />
      </Head>

      <div className="relative w-full overflow-x-hidden bg-[#F7F2E9]">
        <NavBar />

        <main className="relative">
          {/* HERO */}
          <HeroSection />

          {/* HOW IT WORKS */}
          <section className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
            <HowItWorksToggle />
          </section>

          {/* WHY YATTRA TUTORS */}
          <WhyYattraTutors />

          {/* FAQ */}
          <section className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
            <FAQ />
          </section>

          {/* FINAL CTA */}
          <section className="relative overflow-hidden bg-[#0E211C] px-6 py-14 sm:py-20">
            <div className="relative z-10 max-w-xl mx-auto text-center">
              <p className={`${lora.className} italic text-sm text-[#D79A2C] mb-3`}>Still deciding?</p>
              <h2 className={`${lora.className} text-2xl sm:text-3xl md:text-4xl font-semibold text-[#F7F2E9]`}>
                Ready to get started with Yattra Tutors?
              </h2>

              <p className={`mt-4 text-sm sm:text-base text-[#AAB6A2] ${dmSans.className}`}>
                Whether you&apos;re a parent searching for a reliable tutor or
                a teacher looking to grow your career — Yattra Tutors is
                built for you.
              </p>

              <div className={`mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 ${dmSans.className}`}>
                <a
                  href="/find-tutor-flow"
                  className="w-full sm:w-auto flex justify-center items-center rounded-md bg-[#D79A2C] px-6 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
                >
                  Find a tutor
                </a>

                <a
                  href="/tutor-flow/tutor-registration"
                  className="w-full sm:w-auto flex justify-center items-center rounded-md border border-[#F7F2E9]/20 px-6 py-3 text-sm font-semibold text-[#F7F2E9] transition-colors hover:border-[#F7F2E9]/40 hover:bg-white/5"
                >
                  Become a tutor
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
