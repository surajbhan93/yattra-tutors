import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Head from 'next/head';
import { lora, dmSans } from "@/lib/fonts";
import {
  BookOpen,
  MessageCircle,
  Mic,
  Ear,
  Sparkles,
  PenLine,
  Brain,
  Gamepad2,
  GraduationCap,
  BarChart3,
  Clock,
  Globe,
  ClipboardList,
  Map,
  Trophy,
  ArrowLeft,
} from 'lucide-react';
import NavBar from '@/components/navbar/NavBar';
import Footer from '@/components/landing/Footer';

const SpokenEnglish = () => {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const topics = [
    {
      icon: BookOpen,
      title: 'Basic Grammar & Vocabulary',
      desc: 'Master tenses, parts of speech, and 1000+ everyday words through immersive games and stories.',
      tag: 'Foundation',
    },
    {
      icon: MessageCircle,
      title: 'Daily Conversation Practice',
      desc: 'Practice real-life dialogues — greetings, shopping, school, and social situations.',
      tag: 'Fluency',
    },
    {
      icon: Mic,
      title: 'Public Speaking & Storytelling',
      desc: 'Develop stage presence, voice modulation, and the art of storytelling through debates and skits.',
      tag: 'Advanced',
    },
    {
      icon: Ear,
      title: 'Listening & Pronunciation',
      desc: 'Train accent, intonation, stress patterns, and active listening with expert guidance.',
      tag: 'Clarity',
    },
    {
      icon: Sparkles,
      title: 'Confidence & Personality',
      desc: 'Build unshakeable self-confidence through role plays, group discussions, and communication techniques.',
      tag: 'Mindset',
    },
    {
      icon: PenLine,
      title: 'Reading & Comprehension',
      desc: 'Enhance reading speed and understanding through structured passages and critical thinking.',
      tag: 'Literacy',
    },
  ];

  const stats = [
    { value: '1000+', label: 'Students trained' },
    { value: '95%', label: 'Fluency improvement' },
    { value: '500+', label: 'Expert tutors' },
    { value: '4.9★', label: 'Average rating' },
  ];

  const faqs = [
    {
      q: 'What age group is this course designed for?',
      a: 'This course is tailored for children aged 6–16 years. We have separate batches for different age groups to ensure age-appropriate, engaging learning experiences.',
    },
    {
      q: 'How are the live classes conducted?',
      a: 'All classes are conducted online via interactive video sessions with certified tutors. Recorded sessions are also provided for revision and missed classes.',
    },
    {
      q: 'How soon will my child see real improvement?',
      a: 'Most students show noticeable improvement in pronunciation and speaking confidence within 4–6 weeks of consistent practice.',
    },
    {
      q: 'Is there a free demo class available?',
      a: 'Absolutely! We offer a complimentary 30-minute demo class so your child can experience our teaching approach before enrolling.',
    },
  ];

  const testimonials = [
    {
      name: 'Priya S.',
      child: 'Mother of Aryan, Age 10',
      review: 'My son was very shy and afraid to speak English. After just 2 months, he now presents in class without any fear. Truly life-changing!',
      avatar: 'P',
    },
    {
      name: 'Rahul M.',
      child: 'Father of Ishaan, Age 8',
      review: 'The tutors are incredibly patient and fun. Ishaan actually looks forward to his English classes every day now. Amazing transformation!',
      avatar: 'R',
    },
    {
      name: 'Sunita K.',
      child: 'Mother of Diya, Age 13',
      review: "Diya's pronunciation and vocabulary have improved drastically. She even won a debate competition at school. Couldn't be prouder!",
      avatar: 'S',
    },
  ];

  const whyUs = [
    { icon: Brain, title: 'Brain-friendly learning', desc: 'Lessons designed using child psychology for maximum retention and engagement.' },
    { icon: Gamepad2, title: 'Gamified sessions', desc: 'Interactive games, quizzes, and challenges that keep children motivated.' },
    { icon: GraduationCap, title: 'TEFL/CELTA certified', desc: 'Expert tutors with proven experience in teaching English to young learners.' },
    { icon: BarChart3, title: 'Progress tracking', desc: 'Regular assessments and detailed reports to monitor and celebrate improvement.' },
    { icon: Clock, title: 'Flexible scheduling', desc: "Classes that adapt to your child's school schedule and extracurriculars." },
    { icon: Globe, title: 'Global standards', desc: 'Curriculum aligned with Cambridge English and international benchmarks.' },
  ];

  const howItWorks = [
    { step: '01', icon: ClipboardList, title: 'Free assessment', desc: "We evaluate your child's current English level." },
    { step: '02', icon: Map, title: 'Custom roadmap', desc: 'A personalized learning plan is created for them.' },
    { step: '03', icon: BookOpen, title: 'Live sessions', desc: '1-on-1 or group classes with expert tutors.' },
    { step: '04', icon: Trophy, title: 'Track & celebrate', desc: 'Regular reports and milestone celebrations.' },
  ];

  return (
    <>
      <Head>
        <title>Spoken English Course for Kids | Build Fluency & Confidence | TutorApp</title>
        <meta name="description" content="Best Spoken English course for children. Improve pronunciation, vocabulary, public speaking & confidence with expert tutors. Interactive online classes for kids aged 6-16." />
        <meta name="keywords" content="spoken english for kids, english speaking course, children english class, pronunciation improvement, public speaking kids, english fluency online" />
        <meta property="og:title" content="Spoken English Course for Kids | Build Fluency & Confidence" />
        <meta property="og:description" content="Help your child speak English confidently. Expert tutors, interactive sessions, proven results." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://yoursite.com/courses/spoken-english" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'Spoken English for Kids',
            description: 'Interactive spoken English course for children aged 6-16',
            provider: { '@type': 'Organization', name: 'TutorApp' },
            courseMode: 'online',
            educationalLevel: 'beginner to intermediate',
            audience: { '@type': 'EducationalAudience', educationalRole: 'student' },
          }),
        }} />
      </Head>

      <div className={`min-h-screen bg-[#F7F2E9] ${dmSans.className}`}>
        <NavBar />

        {/* ══════════════ HERO ══════════════ */}
        <section className="relative overflow-hidden bg-[#0E211C] py-20 sm:py-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[.04]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <button
              onClick={() => router.push('/#kids-courses')}
              className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-[#AAB6A2] transition-colors hover:text-white"
            >
              <ArrowLeft size={15} /> Back to courses
            </button>

            <div className="flex flex-col items-center gap-14 lg:flex-row lg:items-center">
              {/* LEFT */}
              <div className="flex-1 text-center lg:text-left">
                <p className={`${lora.className} italic text-sm text-[#D79A2C] mb-4`}>Premium English program</p>

                <h1 className={`${lora.className} mb-5 text-4xl font-semibold leading-tight text-white sm:text-5xl`}>
                  Speak English fearlessly
                </h1>

                <p className="mb-9 max-w-lg text-base leading-relaxed text-[#AAB6A2] mx-auto lg:mx-0">
                  Transform your child from a hesitant speaker to a confident communicator. Expert-led, interactive,
                  and built for young learners.
                </p>

                <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                  <button
                    onClick={() => router.push('/find-tutor-flow/create-account')}
                    className="rounded-md bg-[#D79A2C] px-7 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
                  >
                    Find a tutor
                  </button>
                  <button
                    onClick={() => router.push('/tutors')}
                    className="rounded-md border border-white/20 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40"
                  >
                    Free demo class
                  </button>
                </div>

                {/* Trust row */}
                <div className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs text-[#AAB6A2] lg:justify-start">
                  <span>Live 1-on-1 sessions</span>
                  <span>·</span>
                  <span>TEFL-certified tutors</span>
                  <span>·</span>
                  <span>Flexible scheduling</span>
                </div>
              </div>

              {/* RIGHT — Image card */}
              <div className="flex-1 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="relative rounded-lg border border-white/10 bg-white/5 p-3">
                    <img
                      src="/images/kids-courses/english.png"
                      alt="Child learning spoken English online"
                      className="w-64 rounded-md object-contain sm:w-72 lg:w-80"
                    />
                  </div>

                  {/* Floating stat card 1 */}
                  <div className="absolute -bottom-6 -left-6 rounded-md border border-white/10 bg-[#132B22] px-5 py-3.5">
                    <p className="text-xs text-[#AAB6A2] mb-1">Avg. improvement</p>
                    <p className={`${lora.className} text-2xl font-semibold text-[#D79A2C]`}>+85%</p>
                    <p className="text-xs text-[#AAB6A2]">within 8 weeks</p>
                  </div>

                  {/* Floating stat card 2 */}
                  <div className="absolute -top-5 -right-5 rounded-md border border-white/10 bg-[#132B22] px-4 py-3">
                    <p className={`${lora.className} text-xl font-semibold text-white`}>4.9 ★</p>
                    <p className="text-xs text-[#AAB6A2]">500+ reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ STATS ══════════════ */}
        <section className="border-b border-[#1C2B22]/10 bg-white py-14">
          <div className="mx-auto max-w-4xl px-6">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className={`${lora.className} text-3xl font-semibold text-[#1C2B22]`}>{s.value}</p>
                  <p className="mt-1 text-sm text-[#9AA3AB]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ WHY US ══════════════ */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-14 text-center">
              <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-3`}>Why choose us</p>
              <h2 className={`${lora.className} text-3xl font-semibold text-[#1C2B22] sm:text-4xl`}>Built for young minds</h2>
              <p className="mt-3 text-sm text-[#58646C] max-w-xl mx-auto">
                Every feature designed with your child&apos;s growth and confidence in mind.
              </p>
            </div>

            <div className="grid divide-y divide-[#1C2B22]/[.06] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-3">
              {whyUs.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="p-6 sm:border-r sm:border-[#1C2B22]/[.06] sm:last:border-r-0">
                    <Icon size={22} className="mb-3 text-[#D79A2C]" />
                    <h3 className="mb-1.5 text-base font-semibold text-[#1C2B22]">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-[#58646C]">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════ CURRICULUM ══════════════ */}
        <section className="py-20 bg-[#0E211C]">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-14 text-center">
              <p className={`${lora.className} italic text-sm text-[#D79A2C] mb-3`}>Course curriculum</p>
              <h2 className={`${lora.className} text-3xl font-semibold text-white sm:text-4xl`}>Six modules to mastery</h2>
              <p className="mt-3 text-sm text-[#AAB6A2] max-w-xl mx-auto">
                A comprehensive, structured path from beginner to confident speaker.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topics.map((topic, index) => {
                const Icon = topic.icon;
                return (
                  <div
                    key={index}
                    className="rounded-md border border-white/10 bg-white/5 p-6 transition-colors hover:border-[#D79A2C]/40"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <Icon size={22} className="text-[#D79A2C]" />
                      <span className="text-xs font-medium text-[#D79A2C]">{topic.tag}</span>
                    </div>
                    <h3 className="mb-1.5 font-semibold text-white">{topic.title}</h3>
                    <p className="text-sm leading-relaxed text-[#AAB6A2]">{topic.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════ HOW IT WORKS ══════════════ */}
        <section className="bg-[#F7F2E9] py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-14 text-center">
              <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-3`}>The process</p>
              <h2 className={`${lora.className} text-3xl font-semibold text-[#1C2B22] sm:text-4xl`}>How it works</h2>
              <p className="mt-3 text-sm text-[#58646C]">Four simple steps to transform your child&apos;s English</p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {howItWorks.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="text-center">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-[#1C2B22]/10 bg-white">
                      <Icon size={22} className="text-[#D79A2C]" />
                    </div>
                    <p className={`${lora.className} mb-1 text-xs font-semibold text-[#D79A2C]`}>{item.step}</p>
                    <h3 className="mb-1 font-semibold text-[#1C2B22]">{item.title}</h3>
                    <p className="text-sm text-[#58646C]">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════ TESTIMONIALS ══════════════ */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-14 text-center">
              <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-3`}>Testimonials</p>
              <h2 className={`${lora.className} text-3xl font-semibold text-[#1C2B22] sm:text-4xl`}>Parents love us</h2>
              <p className="mt-3 text-sm text-[#58646C]">Real transformations from real families across India</p>
            </div>

            <div className="divide-y divide-[#1C2B22]/10 rounded-lg border border-[#1C2B22]/10 sm:grid sm:grid-cols-3 sm:divide-y-0">
              {testimonials.map((t, i) => (
                <div key={i} className="p-7 sm:border-r sm:border-[#1C2B22]/10 sm:last:border-r-0">
                  <p className="mb-1 text-sm text-[#D79A2C]">★★★★★</p>
                  <p className={`${lora.className} italic mb-6 text-sm leading-relaxed text-[#58646C]`}>&quot;{t.review}&quot;</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0E211C] text-sm font-semibold text-[#D79A2C]">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1C2B22]">{t.name}</p>
                      <p className="text-xs text-[#9AA3AB]">{t.child}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ FAQ ══════════════ */}
        <section className="bg-[#F7F2E9] py-20">
          <div className="mx-auto max-w-2xl px-6">
            <div className="mb-10 text-center">
              <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-3`}>FAQ</p>
              <h2 className={`${lora.className} text-3xl font-semibold text-[#1C2B22]`}>Common questions</h2>
            </div>
            <div className="divide-y divide-[#1C2B22]/10 rounded-lg border border-[#1C2B22]/10 bg-white">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <button
                    className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-semibold text-[#1C2B22]"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{faq.q}</span>
                    <span className="ml-4 flex-shrink-0 text-[#D79A2C]">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5">
                      <p className="text-sm leading-relaxed text-[#58646C]">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ FINAL CTA ══════════════ */}
        <section className="relative overflow-hidden bg-[#0E211C] py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[.04]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
            <p className={`${lora.className} italic text-sm text-[#D79A2C] mb-5`}>Limited seats available</p>

            <h2 className={`${lora.className} mb-5 text-3xl font-semibold leading-tight text-white sm:text-4xl`}>
              Give your child the gift of confidence
            </h2>

            <p className="mb-9 text-base text-[#AAB6A2] max-w-xl mx-auto leading-relaxed">
              Join 500+ students who have already transformed their English speaking skills. Your first demo class is
              completely free.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => router.push('/find-tutor-flow/create-account')}
                className="rounded-md bg-[#D79A2C] px-8 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
              >
                Find a tutor now
              </button>
              <button
                onClick={() => router.push('/tutors')}
                className="rounded-md border border-white/20 px-8 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40"
              >
                Book free demo
              </button>
            </div>

            <p className="mt-6 text-xs text-[#7C9484]">
              No credit card required · Cancel anytime · 100% satisfaction guarantee
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default SpokenEnglish;
