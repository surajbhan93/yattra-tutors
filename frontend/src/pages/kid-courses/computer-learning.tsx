import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Head from 'next/head';
import NavBar from '@/components/navbar/NavBar';
import Footer from '@/components/landing/Footer';
import { motion } from 'framer-motion';
import { lora, dmSans } from "@/lib/fonts";

/* ─── TOPIC DATA with class groups, icons, descriptions ─── */
const topicGroups = [
  {
    grade: 'Class 1 – 2',
    emoji: '🌱',
    color: '#1F6F54',
    topics: [
      { title: 'Introduction to Computers', icon: '💻', desc: 'What is a computer? Parts and purpose explained simply.' },
      { title: 'Parts of a Computer', icon: '🖥️', desc: 'Monitor, keyboard, mouse, CPU — learn each one.' },
      { title: 'Using Keyboard & Mouse', icon: '⌨️', desc: 'Control and navigate with confidence.' },
      { title: 'Basic Typing Skills', icon: '✍️', desc: 'Start touch-typing the fun way.' },
      { title: 'Drawing with Paint App', icon: '🎨', desc: 'Express creativity using digital painting tools.' },
    ],
  },
  {
    grade: 'Class 3 – 5',
    emoji: '🚀',
    color: '#3E5C83',
    topics: [
      { title: 'Introduction to MS Word', icon: '📝', desc: 'Create and format documents like a pro.' },
      { title: 'Basic Word Processing', icon: '🗒️', desc: 'Edit, format, and save text documents.' },
      { title: 'MS PowerPoint Basics', icon: '📊', desc: 'Build beautiful slides and present ideas.' },
      { title: 'Simple Presentations', icon: '🎤', desc: 'Tell stories through engaging slideshows.' },
      { title: 'Internet & Search Engines', icon: '🌐', desc: 'Navigate the web and find reliable information.' },
      { title: 'Safe Internet Practices', icon: '🛡️', desc: 'Stay safe, smart, and responsible online.' },
      { title: 'Email Basics', icon: '📧', desc: 'Write, send, and manage emails correctly.' },
    ],
  },
  {
    grade: 'Class 6 – 8',
    emoji: '🧠',
    color: '#7A4E6E',
    topics: [
      { title: 'MS Excel & Formulas', icon: '📈', desc: 'Spreadsheets, data, and basic formulas.' },
      { title: 'Intermediate Typing', icon: '⚡', desc: 'Build speed and accuracy on the keyboard.' },
      { title: 'Scratch Programming', icon: '🐱', desc: 'Drag-and-drop coding with visual blocks.' },
      { title: 'Basic Python Concepts', icon: '🐍', desc: 'Write your first real programs in Python.' },
      { title: 'Digital Ethics & Cyber Safety', icon: '🔐', desc: 'Understand online rights, privacy, and risks.' },
      { title: 'File Handling & Organization', icon: '📁', desc: 'Manage digital files like a professional.' },
      { title: 'Fun Projects', icon: '🎮', desc: 'Create games, animations, and stories using code.' },
    ],
  },
];

const stats = [
  { val: '19+', label: 'Topics Covered' },
  { val: '3', label: 'Learning Stages' },
  { val: 'Class 1–8', label: 'All Grades' },
  { val: '100%', label: 'Hands-On' },
];

const benefits = [
  { icon: '🖥️', title: 'Real Software Skills', desc: 'MS Word, Excel, PowerPoint — tools used in school and work.' },
  { icon: '🐍', title: 'Coding from Scratch', desc: 'Scratch and Python introduce programming thinking early.' },
  { icon: '🛡️', title: 'Internet Safety', desc: 'Children learn responsible, safe digital behaviour.' },
  { icon: '🎨', title: 'Digital Creativity', desc: 'Paint, design, animate — express yourself digitally.' },
  { icon: '📈', title: 'Progress at Every Stage', desc: 'Curriculum grows with the child — Class 1 to 8.' },
  { icon: '👨‍🏫', title: 'Expert Tutors', desc: 'Experienced educators guide every step.' },
];

const faqs = [
  { q: 'What age group is this course for?', a: 'This course is designed for children from Class 1 (approx. 6 years) to Class 8 (approx. 14 years), with age-appropriate content at each level.' },
  { q: 'Does my child need a computer at home?', a: 'Yes, access to a computer or laptop is recommended for practice. A tablet can work for basic lessons but a computer is ideal for MS Office and coding.' },
  { q: 'Is coding included in the syllabus?', a: 'Yes! Classes 6–8 include both Scratch (visual block programming) and Basic Python, giving children a strong foundation in programming.' },
  { q: 'How are the sessions conducted?', a: 'Sessions are conducted online via video call, with screen-sharing and interactive exercises. Tutors provide personalised attention.' },
  { q: 'Will my child get any projects or assignments?', a: 'Absolutely. Each level includes hands-on projects like creating a presentation, building a simple game in Scratch, or making an Excel report.' },
];

const howItWorks = [
  { step: '01', title: 'Choose your class', desc: "Select your child's class level." },
  { step: '02', title: 'Match a tutor', desc: 'Pick from expert, verified tutors.' },
  { step: '03', title: 'Book a demo', desc: 'Start with a free demo class.' },
  { step: '04', title: 'Start learning', desc: 'Live sessions at flexible times.' },
];

const trustBadges = ['Expert tutors', 'Flexible timings', 'Live online classes', 'Completion certificate'];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

/* ══════════════════════════ COMPONENT ══════════════════════════ */
const ComputerLearning = () => {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Head>
        {/* ── SEO Meta Tags ── */}
        <title>Computer Learning for Kids (Class 1–8) | Coding, MS Office & Internet Safety</title>
        <meta name="description" content="Comprehensive computer learning course for children Class 1 to 8. Covers MS Word, Excel, PowerPoint, Python, Scratch, internet safety, typing, and digital creativity. Expert online tutors." />
        <meta name="keywords" content="computer learning for kids, computer course class 1 to 8, coding for children, MS Office for students, Python for kids, Scratch programming, internet safety for children, typing skills, digital literacy" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="EduTutor" />
        <link rel="canonical" href="https://yattratutors.com/kids-courses/computer-learning" />

        {/* ── Open Graph ── */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Computer Learning for Kids (Class 1–8) | Coding, MS Office & Internet Safety" />
        <meta property="og:description" content="Fun, hands-on computer education for children. Learn typing, MS Office, Python, Scratch, and internet safety with expert online tutors." />
        <meta property="og:image" content="https://yattratutors.com/images/kids-courses/computer.png" />
        <meta property="og:url" content="https://yattratutors.com/kids-courses/computer-learning" />

        {/* ── Twitter Card ── */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Computer Learning for Kids (Class 1–8)" />
        <meta name="twitter:description" content="Coding, MS Office, internet safety and digital creativity for children — Class 1 to 8." />
        <meta name="twitter:image" content="https://yattratutors.com/images/kids-courses/computer.png" />

        {/* ── Structured Data (JSON-LD) ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              "name": "Computer Learning for Kids – Class 1 to 8",
              "description": "Comprehensive computer education covering MS Office, coding (Python & Scratch), internet safety, typing, and digital creativity for children from Class 1 to 8.",
              "provider": {
                "@type": "Organization",
                "name": "EduTutor",
                "sameAs": "https://yattratutors.com"
              },
              "educationalLevel": "Primary and Middle School",
              "teaches": ["Computer Basics", "MS Word", "MS Excel", "MS PowerPoint", "Python Programming", "Scratch", "Internet Safety", "Typing Skills"],
              "hasCourseInstance": {
                "@type": "CourseInstance",
                "courseMode": "online",
                "inLanguage": "en"
              }
            })
          }}
        />
      </Head>

      <div className={`${dmSans.className} min-h-screen overflow-x-hidden bg-[#F7F2E9]`}>
        <NavBar />

        {/* ══════════ HERO ══════════ */}
        <section className="relative overflow-hidden bg-[#0E211C]" aria-label="Computer Learning Course Hero">
          {/* Grain texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[.04]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative z-10 mx-auto max-w-6xl px-4 pt-10 pb-16 sm:pt-14">
            {/* Back button */}
            <motion.button
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => router.push('/#kids-courses')}
              className="mb-9 inline-flex items-center gap-2 rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-[#AAB6A2] transition-colors hover:border-[#D79A2C]/50 hover:text-white"
            >
              ← Back to courses
            </motion.button>

            <div className="flex flex-wrap items-center gap-10">
              {/* Left text */}
              <div className="min-w-[280px] flex-1">
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className={`${lora.className} italic text-sm text-[#D79A2C] mb-3`}
                >
                  Kids course · Class 1–8
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className={`${lora.className} text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl`}
                >
                  Computer learning
                  <span className="block text-[#D79A2C]">for smart kids</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="mt-4 max-w-[520px] text-[17px] leading-relaxed text-[#AAB6A2]"
                >
                  From <strong className="text-white">typing and MS Office</strong> to{' '}
                  <strong className="text-white">Python coding</strong> and{' '}
                  <strong className="text-white">internet safety</strong> — our structured curriculum grows with your
                  child from Class 1 all the way to Class 8.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 }}
                  className="mt-3 max-w-[520px] text-sm leading-relaxed text-[#AAB6A2]/80"
                >
                  Hands-on projects, interactive lessons, and expert tutors help children build real digital skills —
                  preparing them for school, exams, and the future.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 }}
                  className="mt-7 flex flex-wrap gap-3"
                >
                  <button
                    onClick={() => router.push('/find-tutor')}
                    className="rounded-md bg-[#D79A2C] px-7 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
                  >
                    Find a tutor now
                  </button>
                  <button
                    onClick={() => document.getElementById('topics')?.scrollIntoView({ behavior: 'smooth' })}
                    className="rounded-md border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-[#D79A2C]/50"
                  >
                    View topics
                  </button>
                </motion.div>

                {/* Trust badges */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.28 }}
                  className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#AAB6A2]"
                >
                  {trustBadges.map((b, i) => (
                    <React.Fragment key={b}>
                      {i > 0 && <span>·</span>}
                      <span>{b}</span>
                    </React.Fragment>
                  ))}
                </motion.div>
              </div>

              {/* Right image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, x: 16 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex min-w-[240px] flex-1 justify-center"
              >
                <img
                  src="/images/kids-courses/computer.png"
                  alt="Child learning computer skills with a tutor"
                  className="relative z-10 w-full max-w-[380px] object-contain"
                />
              </motion.div>
            </div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 grid grid-cols-2 gap-6 rounded-lg border border-white/10 bg-white/[.04] p-6 sm:grid-cols-4"
            >
              {stats.map(({ val, label }) => (
                <div key={label} className="text-center">
                  <div className={`${lora.className} text-2xl font-semibold text-[#D79A2C]`}>{val}</div>
                  <div className="mt-1 text-xs text-[#AAB6A2]">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════ TOPICS BY CLASS ══════════ */}
        <section id="topics" className="bg-[#F7F2E9] px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center"
            >
              <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-2`}>Full syllabus</p>
              <h2 className={`${lora.className} text-3xl font-semibold text-[#1C2B22]`}>
                Topics covered — Class 1 to 8
              </h2>
              <p className="mx-auto mt-3 max-w-[560px] text-sm text-[#58646C]">
                Our curriculum is structured in 3 stages, ensuring every child learns at the right pace with the
                right content.
              </p>
            </motion.div>

            {topicGroups.map((group, gi) => (
              <motion.div
                key={group.grade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={gi}
                className="mb-10"
              >
                {/* Group header */}
                <div className="mb-4 flex items-center gap-3 border-b border-[#1C2B22]/10 pb-3">
                  <h3 className={`${lora.className} text-xl font-semibold`} style={{ color: group.color }}>
                    {group.grade}
                  </h3>
                  <p className="text-xs text-[#9AA3AB]">{group.topics.length} topics</p>
                </div>

                {/* Topic list */}
                <div className="divide-y divide-[#1C2B22]/[.06] rounded-lg border border-[#1C2B22]/10 bg-white">
                  {group.topics.map((topic) => (
                    <div key={topic.title} className="flex items-start gap-4 px-5 py-4">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-semibold text-[#1C2B22]">{topic.title}</h4>
                        <p className="mt-0.5 text-xs leading-relaxed text-[#58646C]">{topic.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══════════ WHY CHOOSE ══════════ */}
        <section className="bg-white px-4 py-16" aria-label="Benefits of Computer Learning Course">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 text-center"
            >
              <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-2`}>Why this course</p>
              <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22] sm:text-3xl`}>
                What your child will gain
              </h2>
              <p className="mx-auto mt-3 max-w-[500px] text-sm text-[#58646C]">
                Skills that matter — both in the classroom and in life.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-[#1C2B22]/10 bg-[#1C2B22]/10 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                  className="bg-white p-6"
                >
                  <h3 className={`${lora.className} mb-2 text-base font-semibold text-[#1C2B22]`}>{b.title}</h3>
                  <p className="text-sm leading-relaxed text-[#58646C]">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ HOW IT WORKS ══════════ */}
        <section className="bg-[#F7F2E9] px-4 py-16" aria-label="How Computer Learning Course Works">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-2`}>Simple process</p>
              <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22] sm:text-3xl`}>How it works</h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {howItWorks.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                  className="text-center"
                >
                  <div className={`${lora.className} mb-2 text-xs font-semibold tracking-wide text-[#D79A2C]`}>
                    {s.step}
                  </div>
                  <h4 className="mb-1.5 text-sm font-semibold text-[#1C2B22]">{s.title}</h4>
                  <p className="text-xs leading-relaxed text-[#58646C]">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ FAQ ══════════ */}
        <section className="bg-white px-4 py-16" aria-label="Frequently Asked Questions about Computer Learning">
          <div className="mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 text-center"
            >
              <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-2`}>FAQ</p>
              <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22] sm:text-3xl`}>
                Common questions
              </h2>
            </motion.div>

            <div className="divide-y divide-[#1C2B22]/[.08] rounded-lg border border-[#1C2B22]/10">
              {faqs.map((faq, i) => (
                <div key={i} itemScope itemType="https://schema.org/Question">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-[#F7F2E9]"
                    aria-expanded={openFaq === i}
                  >
                    <span itemProp="name" className="text-sm font-semibold leading-snug text-[#1C2B22]">
                      {faq.q}
                    </span>
                    <span
                      className="flex-shrink-0 text-lg text-[#D79A2C] transition-transform"
                      style={{ transform: openFaq === i ? 'rotate(45deg)' : 'none' }}
                    >
                      +
                    </span>
                  </button>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      itemScope
                      itemType="https://schema.org/Answer"
                      className="px-5 pb-4"
                    >
                      <p itemProp="text" className="text-sm leading-relaxed text-[#58646C]">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ CTA BANNER ══════════ */}
        <section className="relative overflow-hidden bg-[#0E211C] px-4 py-16" aria-label="Call to Action">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[.04]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 mx-auto max-w-2xl text-center"
          >
            <h2 className={`${lora.className} text-2xl font-semibold text-white sm:text-3xl`}>
              Ready to start your child&rsquo;s digital journey?
            </h2>
            <p className="mx-auto mt-4 max-w-[520px] text-sm leading-relaxed text-[#AAB6A2]">
              Join hundreds of children already learning computer skills with our expert tutors. Book a{' '}
              <strong className="text-[#D79A2C]">free demo class</strong> today — no commitment needed.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => router.push('/tutors')}
                className="rounded-md bg-[#D79A2C] px-7 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
              >
                Find a tutor for your child
              </button>
              <button
                onClick={() => router.push('/#kids-courses')}
                className="rounded-md border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-[#D79A2C]/50"
              >
                ← Browse all courses
              </button>
            </div>

            {/* Social proof */}
            <p className="mt-6 text-xs text-[#AAB6A2]">
              ★★★★★ Trusted by <strong className="text-white">5000+ families</strong> across India
            </p>
          </motion.div>
        </section>

        <Footer />
      </div>
    </>
  );
};
export default ComputerLearning;
