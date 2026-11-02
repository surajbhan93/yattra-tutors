import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';
import { Lora, DM_Sans } from 'next/font/google';
import NavBar from '@/components/navbar/NavBar';
import Footer from '@/components/landing/Footer';
import {
  Calculator,
  FlaskConical,
  BookOpen,
  PenLine,
  Globe2,
  Monitor,
  Palette,
  Bot,
  Code2,
  Cpu,
  BarChart3,
  GraduationCap,
  Sparkles,
  Award,
  Mic,
  Music,
  ArrowRight,
  ArrowUpRight,
  Star,
  Trophy,
  Users,
  BookMarked,
} from 'lucide-react';

const lora = Lora({ subsets: ['latin'], weight: ['500', '600'], style: ['italic', 'normal'] });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600'] });

/* ─── DATA (content preserved, decorative color hooks dropped) ─── */
const subjects = [
  { name: 'Mathematics', icon: Calculator, desc: 'Algebra, Geometry, Mensuration, Fractions, Decimals, Word Problems & Logical Reasoning.', tags: ['Algebra', 'Geometry', 'Reasoning'] },
  { name: 'Science', icon: FlaskConical, desc: 'Physics, Chemistry, Biology with experiments, observations, and scientific thinking.', tags: ['Physics', 'Chemistry', 'Biology'] },
  { name: 'English', icon: BookOpen, desc: 'Grammar, Writing, Literature, Reading Comprehension, Vocabulary & Speaking Practice.', tags: ['Grammar', 'Literature', 'Writing'] },
  { name: 'Hindi', icon: PenLine, desc: 'Grammar, Vocabulary, Creative Writing, Literature, Comprehension & Speaking Skills.', tags: ['Grammar', 'Vocabulary', 'Writing'] },
  { name: 'Social Science', icon: Globe2, desc: 'History, Civics, Geography, Cultural Awareness, Map Skills & Current Affairs.', tags: ['History', 'Geography', 'Civics'] },
  { name: 'Computer Basics', icon: Monitor, desc: 'MS Office, Typing, Internet Basics, Coding Fundamentals & Cyber Safety.', tags: ['Coding', 'MS Office', 'Safety'] },
  { name: 'Art & Craft', icon: Palette, desc: 'Drawing, Painting, DIY Projects, Creative Expression & School Projects.', tags: ['Drawing', 'Painting', 'DIY'] },
];

const highlights = [
  { icon: Trophy, val: '1200+', label: 'Students Enrolled' },
  { icon: Star, val: '4.8/5', label: 'Average Rating' },
  { icon: Users, val: '700+', label: 'Expert Tutors' },
  { icon: BookMarked, val: '7', label: 'Subjects Covered' },
];

const features = [
  { title: 'Concept-Based Learning', desc: 'Deep understanding over rote memorization — we explain the "why" behind every topic.' },
  { title: 'Live Experiments', desc: 'Hands-on experiments and observations make science come alive beyond the textbook.' },
  { title: 'Logical Reasoning', desc: 'Exercises that sharpen analytical thinking and problem-solving from an early age.' },
  { title: 'Progress Tracking', desc: "Regular assessments and parent reports to monitor your child's academic growth." },
];

const testimonials = [
  { name: 'Priya Sharma', grade: 'Class 7 Parent', text: "My daughter's grades improved drastically in just 2 months. The tutors are incredibly patient!", stars: 5 },
  { name: 'Rahul Gupta', grade: 'Class 6 Student', text: 'Science was my weakest subject. Now I actually look forward to it! The experiments are so cool.', stars: 5 },
  { name: 'Anita Mehta', grade: 'Class 8 Parent', text: "Exceptional teachers and a structured approach. My son's confidence has grown tremendously.", stars: 5 },
];

/* AI & Speciality Courses */
const aiCourses = [
  { name: 'AI & Machine Learning for Kids', icon: Bot, badge: 'NEW', desc: 'Introduction to AI concepts, how machines learn, ChatGPT basics, simple ML models using Scratch & Python.', tags: ['AI Basics', 'Python', 'Scratch', 'ChatGPT'], level: 'Class 6–8', duration: '3 Months' },
  { name: 'Coding & Web Development', icon: Code2, badge: 'HOT', desc: 'HTML, CSS, JavaScript basics. Build your first website and small games. Learn the language of the web.', tags: ['HTML', 'CSS', 'JavaScript', 'Projects'], level: 'Class 6–10', duration: '4 Months' },
  { name: 'Robotics & Arduino', icon: Cpu, badge: 'STEM', desc: 'Build real robots! Learn electronics, sensors, Arduino programming, and logic with hands-on kits.', tags: ['Arduino', 'Electronics', 'Sensors', 'Logic'], level: 'Class 7–10', duration: '3 Months' },
  { name: 'Data Science Foundations', icon: BarChart3, badge: 'FUTURE', desc: 'Charts, patterns, statistics, and Python for data. Understand how data powers the modern world.', tags: ['Python', 'Statistics', 'Charts', 'Excel'], level: 'Class 8–10', duration: '3 Months' },
];

/* Other Course Types */
const otherCourses = [
  { name: 'Senior Section', sub: 'Class 9th – 10th', icon: GraduationCap, desc: 'Board exam prep, CBSE/ICSE syllabus mastery, Maths, Science, English & SST with expert tutors.', href: '/subjects', tags: ['CBSE', 'ICSE', 'Board Prep'] },
  { name: 'Primary Section', sub: 'Class 1st – 5th', icon: Sparkles, desc: 'Fun, activity-based learning for young minds. Maths, EVS, English, Hindi, and creative skills.', href: '/subjects', tags: ['Fun Learning', 'Activity-Based', 'Foundation'] },
  { name: 'Competitive Exam Prep', sub: 'Olympiad & NTSE', icon: Award, desc: 'Crack Olympiads, NTSE, and scholarship exams. Advanced problem-solving and exam strategies.', href: '/subjects', tags: ['Olympiad', 'NTSE', 'Scholarship'] },
  { name: 'Spoken English & Communication', sub: 'All Classes', icon: Mic, desc: 'Build fluency, confidence, and communication skills through structured speaking and writing practice.', href: '/subjects', tags: ['Fluency', 'Speaking', 'Writing'] },
  { name: 'Creative Arts & Music', sub: 'All Ages', icon: Music, desc: 'Drawing, painting, digital art, music theory and keyboard — nurture your child\'s creative side.', href: '/subjects', tags: ['Drawing', 'Music', 'Digital Art'] },
  { name: 'Vedic Maths & Mental Ability', sub: 'Class 4th – 10th', icon: Calculator, desc: 'Speed calculation, mental math tricks, and logical puzzles to sharpen young minds rapidly.', href: '/subjects', tags: ['Speed Math', 'Mental Ability', 'Logic'] },
];

const JuniorSection = () => {
  const router = useRouter();

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Junior Section - Class 6th to 8th Tuition",
    "description": "Premium concept-based learning for Class 6, 7, and 8 students covering Mathematics, Science, English, Hindi, Social Science, Computer Basics, AI & Art.",
    "provider": { "@type": "EducationalOrganization", "name": "Yattra Tutors", "url": "https://yattratutors.com" },
    "educationalLevel": "Middle School",
    "hasCourseInstance": { "@type": "CourseInstance", "courseMode": "online", "inLanguage": ["en", "hi"] },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "120" },
  };

  return (
    <>
      <Head>
        <title>Junior Section (Class 6-8) | Expert Online Tuition + AI Courses | Yattra Tutors</title>
        <meta name="description" content="Yattra Tutors Junior Section — Premium online tuition for Class 6-8 + AI & Coding courses. Expert tutors, live classes, concept-based learning. Join 500+ students." />
        <meta name="keywords" content="class 6 tuition online, class 7 tuition, class 8 tutor, AI courses for kids, coding for kids, junior section online classes, online tuition India, Yattra Tutors junior" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Junior Section (Class 6-8) + AI Courses | Yattra Tutors" />
        <meta property="og:description" content="Top-rated online tuition + AI & Coding courses for Class 6-8. Expert tutors, live sessions. Join Yattra Tutors." />
        <meta property="og:image" content="/images/kids-courses/junior.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://yattratutors.com/kids-courses/junior" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
      </Head>

      <div className={`min-h-screen w-full overflow-x-hidden bg-[#F7F2E9] ${dmSans.className}`}>
        <NavBar />

        {/* ════════════════════ HERO ════════════════════ */}
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
            <button
              onClick={() => router.push('/#kids-courses')}
              className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-[#AAB6A2] transition-colors hover:text-white"
            >
              <ArrowRight size={14} className="rotate-180" />
              Back to courses
            </button>

            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              {/* LEFT */}
              <div>
                <p className={`${lora.className} italic text-sm text-[#D79A2C] mb-3`}>Class 6th — 8th</p>

                <h1 className={`${lora.className} text-4xl font-semibold text-white sm:text-5xl`}>
                  Junior section
                </h1>
                <p className="mt-2 text-lg text-[#AAB6A2]">Learn. Explore. Grow.</p>

                <p className="mt-6 text-[15px] leading-relaxed text-[#AAB6A2]">
                  Strengthen your child&apos;s academic foundation with <strong className="text-white">concept-based learning</strong> and analytical thinking. Our lessons encourage logic, reasoning, and creativity through live experiments and practical projects.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-[#AAB6A2]">
                  We build confidence and curiosity — so every student walks into class excited to learn, not anxious to perform.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => router.push('/find-tutor-flow/create-account')}
                    className="inline-flex items-center gap-2 rounded-md bg-[#D79A2C] px-6 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
                  >
                    Find a tutor
                    <ArrowRight size={15} />
                  </button>
                  <a
                    href="#subjects"
                    className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-[#D79A2C]/60"
                  >
                    View subjects
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#AAB6A2]">
                  {['Free Demo Class', '7 Core Subjects', 'Certified Tutors', 'AI-Powered Tools'].map((t, i) => (
                    <span key={i}>{t}</span>
                  ))}
                </div>
              </div>

              {/* RIGHT */}
              <div className="relative overflow-hidden rounded-lg border border-white/10">
                <img
                  src="/images/kids-courses/junior.png"
                  alt="Junior Section Class 6-8 Online Tuition Yattra Tutors"
                  className="block w-full object-cover"
                  style={{ maxHeight: 420 }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════ STATS ════════════════════ */}
        <section className="bg-white py-14">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {highlights.map((h, i) => (
                <div key={i} className="rounded-md border border-[#1C2B22]/10 p-6 text-center">
                  <h.icon size={24} className="mx-auto mb-3 text-[#D79A2C]" />
                  <div className={`${lora.className} text-3xl font-semibold text-[#1C2B22]`}>{h.val}</div>
                  <div className="mt-1.5 text-xs text-[#58646C]">{h.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════ SUBJECTS ════════════════════ */}
        <section id="subjects" className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 text-center">
              <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-2`}>Curriculum</p>
              <h2 className={`${lora.className} text-3xl font-semibold text-[#1C2B22] sm:text-4xl`}>
                Subjects covered for Class 6–8
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-[#58646C]">
                7 core subjects with structured lesson plans, live doubt-clearing, and concept-first teaching.
              </p>
            </div>

            <div className="divide-y divide-[#1C2B22]/[.07] rounded-lg border border-[#1C2B22]/10 bg-white">
              {subjects.map((s) => (
                <div key={s.name} className="flex flex-col gap-3 p-6 sm:flex-row sm:items-start sm:gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#F7F2E9] text-[#D79A2C]">
                      <s.icon size={20} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className={`${lora.className} text-lg font-semibold text-[#1C2B22]`}>{s.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#58646C]">{s.desc}</p>
                    <p className="mt-2 text-xs text-[#9AA3AB]">{s.tags.join(' · ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════ AI COURSES ════════════════════ */}
        <section id="ai-courses" className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 text-center">
              <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-2`}>AI & future skills</p>
              <h2 className={`${lora.className} text-3xl font-semibold text-[#1C2B22] sm:text-4xl`}>
                AI &amp; tech courses for young learners
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-[#58646C]">
                Future-proof your child&apos;s education with cutting-edge AI, coding, and technology courses designed for curious young minds.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {aiCourses.map((c, i) => (
                <div key={i} className="flex flex-col gap-3 rounded-md border border-[#1C2B22]/10 p-5">
                  <div className="flex items-start justify-between">
                    <c.icon size={28} className="text-[#D79A2C]" />
                    <span className="text-[10px] font-semibold tracking-wide text-[#8a5f18]">{c.badge}</span>
                  </div>
                  <h3 className={`${lora.className} text-base font-semibold text-[#1C2B22]`}>{c.name}</h3>
                  <p className="flex-1 text-xs leading-relaxed text-[#58646C]">{c.desc}</p>
                  <p className="text-xs text-[#9AA3AB]">{c.level} · {c.duration}</p>
                  <p className="text-xs text-[#9AA3AB]">{c.tags.join(' · ')}</p>
                  <button
                    onClick={() => router.push('/find-tutor-flow/create-account')}
                    className="mt-1 w-full rounded-md bg-[#D79A2C] py-2 text-xs font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
                  >
                    Enroll now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════ WHY YATTRA TUTORS ════════════════════ */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-10 text-center">
              <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-2`}>Why Yattra Tutors</p>
              <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22] sm:text-3xl`}>
                How we make learning different
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((f, i) => (
                <div key={i} className="rounded-md border border-[#1C2B22]/10 bg-white p-6">
                  <h3 className={`${lora.className} text-base font-semibold text-[#1C2B22]`}>{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#58646C]">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════ OTHER COURSES ════════════════════ */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 text-center">
              <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-2`}>Explore more</p>
              <h2 className={`${lora.className} text-3xl font-semibold text-[#1C2B22] sm:text-4xl`}>
                Other courses on Yattra Tutors
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-[#58646C]">
                A complete learning ecosystem — from Primary to Senior, Olympiads to AI. Something for every student.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {otherCourses.map((c, i) => (
                <div
                  key={i}
                  onClick={() => router.push(c.href)}
                  className="group flex cursor-pointer flex-col gap-3 rounded-md border border-[#1C2B22]/10 p-5 transition-colors hover:border-[#D79A2C]/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md bg-[#F7F2E9] text-[#D79A2C]">
                      <c.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <div className={`${lora.className} text-base font-semibold text-[#1C2B22]`}>{c.name}</div>
                      <div className="text-xs text-[#8a5f18]">{c.sub}</div>
                    </div>
                    <ArrowUpRight size={16} className="text-[#9AA3AB] transition-colors group-hover:text-[#D79A2C]" />
                  </div>
                  <p className="text-xs leading-relaxed text-[#58646C]">{c.desc}</p>
                  <p className="text-xs text-[#9AA3AB]">{c.tags.join(' · ')}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════ TESTIMONIALS ════════════════════ */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-10 text-center">
              <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-2`}>Testimonials</p>
              <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22] sm:text-3xl`}>
                What students &amp; parents are saying
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {testimonials.map((tm, i) => (
                <div key={i} className="rounded-md border border-[#1C2B22]/10 bg-white p-6">
                  <div className="mb-3">
                    <div className={`${lora.className} text-sm font-semibold text-[#1C2B22]`}>{tm.name}</div>
                    <div className="text-xs text-[#8a5f18]">{tm.grade}</div>
                  </div>
                  <p className={`${lora.className} italic text-sm leading-relaxed text-[#58646C]`}>&quot;{tm.text}&quot;</p>
                  <div className="mt-3 text-sm text-[#D79A2C]">{'★'.repeat(tm.stars)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════ QUOTE ════════════════════ */}
        <section className="pb-16">
          <div className="mx-auto max-w-4xl px-4">
            <div className="rounded-lg bg-[#0E211C] p-10 text-center">
              <p className={`${lora.className} italic text-lg text-white sm:text-xl`}>
                &quot;Explore, question, and grow — that&apos;s how knowledge blooms.&quot;
              </p>
              <p className="mt-3 text-xs text-[#AAB6A2]">— Yattra Tutors Junior Section Motto</p>
            </div>
          </div>
        </section>

        {/* ════════════════════ CTA ════════════════════ */}
        <section className="pb-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="relative overflow-hidden rounded-lg bg-[#0E211C] px-6 py-16 text-center sm:px-16">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[.04]"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
              />
              <div className="relative z-10">
                <p className={`${lora.className} italic text-sm text-[#D79A2C] mb-4`}>Get started today</p>
                <h2 className={`${lora.className} text-3xl font-semibold text-white sm:text-4xl`}>
                  Find the perfect tutor for your child
                </h2>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#AAB6A2]">
                  Book a <strong className="text-white">free demo class</strong> today. No commitments — just see the difference expert tutoring makes in your child&apos;s confidence and grades.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => router.push('/tutors')}
                    className="inline-flex items-center gap-2 rounded-md bg-[#D79A2C] px-6 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
                  >
                    Find a tutor for your child
                    <ArrowRight size={15} />
                  </button>
                  <button
                    onClick={() => router.push('/#kids-courses')}
                    className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-[#D79A2C]/60"
                  >
                    Explore other courses
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default JuniorSection;
