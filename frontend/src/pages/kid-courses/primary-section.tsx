import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Head from 'next/head';
import { lora, dmSans } from "@/lib/fonts";
import NavBar from '@/components/navbar/NavBar';
import Footer from '@/components/landing/Footer';
import {
  FaFlask, FaPalette, FaCalculator, FaGlobe, FaLanguage,
  FaArrowLeft, FaStar, FaCheckCircle, FaRobot, FaBrain,
  FaLightbulb, FaSpinner, FaChevronRight, FaBookOpen,
} from 'react-icons/fa';

/* ══════════════════════════════════════════════════════
   SEO Structured Data
══════════════════════════════════════════════════════ */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Primary Section – Class 1 to 5 Online Tutoring",
  "description": "Interactive online tuition for Class 1 to 5 covering English, Hindi, Mathematics, Science, Social Studies, and Art & Craft. Expert tutors, AI-powered tools, and personalised lessons for young minds.",
  "provider": { "@type": "Organization", "name": "TutorKids", "sameAs": "https://yattratutors.com" },
  "educationalLevel": "Primary School – Grade 1 to 5",
  "audience": { "@type": "EducationalAudience", "educationalRole": "student", "audienceType": "Children aged 6–11" },
  "hasCourseInstance": ["English","Hindi","Mathematics","Science","Social Studies","Art & Craft"].map(name => ({
    "@type": "CourseInstance", "name": name, "courseMode": "online"
  }))
};

/* ══════════════════════════════════════════════════════
   Static Data — UNCHANGED
══════════════════════════════════════════════════════ */
const subjects = [
  { name:'English',      desc:'Reading comprehension, creative writing, grammar, vocabulary & storytelling skills.', icon:<FaLanguage/>,   color:'#3E5C83', bg:'#EEF3F8', tag:'Language Arts',    highlights:['Phonics & Reading','Creative Writing','Grammar & Vocab'] },
  { name:'Hindi',        desc:'Vyakaran, shabda bhandar, creative writing, and comprehension exercises.',            icon:<FaLanguage/>,   color:'#B06A2E', bg:'#FBF2EA', tag:'भाषा',             highlights:['व्याकरण','वर्तनी & शब्द','रचनात्मक लेखन'] },
  { name:'Mathematics',  desc:'Numbers, operations, shapes, measurements, data handling & logical reasoning.',       icon:<FaCalculator/>, color:'#7A4E6E', bg:'#F6EEF4', tag:'STEM',             highlights:['Arithmetic','Geometry & Shapes','Problem Solving'] },
  { name:'Science',      desc:'Curiosity-led experiments, natural phenomena, living things, and hands-on learning.', icon:<FaFlask/>,      color:'#1F6F54', bg:'#EAF4EF', tag:'Explore & Discover',highlights:['Living World','Matter & Energy','Fun Experiments'] },
  { name:'Social Studies',desc:'Community, geography, history, civic values, and cultural awareness activities.',    icon:<FaGlobe/>,      color:'#3E5C83', bg:'#EEF3F8', tag:'Our World',         highlights:['Maps & Geography','History & Heritage','Civic Values'] },
  { name:'Art & Craft',  desc:'Drawing, painting, clay modelling, DIY projects & creative self-expression.',        icon:<FaPalette/>,    color:'#B06A2E', bg:'#FBF2EA', tag:'Creativity',        highlights:['Sketching & Painting','Craft Projects','Design Thinking'] },
];

const stats = [
  { value:'1100+', label:'Happy Students' },
  { value:'900+',  label:'Expert Tutors' },
  { value:'6',    label:'Core Subjects' },
  { value:'4.9★', label:'Avg Rating' },
];

const benefits = ['Live 1-on-1 Sessions','CBSE & ICSE Aligned','Progress Reports','Doubt Clearing','Flexible Scheduling','AI-Powered Tools'];

const testimonials = [
  { name:'Priya Sharma',  role:'Parent of Class 3 student', text:"My daughter used to dread Maths. Now she looks forward to sessions! The AI quiz tool is brilliant and the tutors are so patient.", rating:5, avatar:'PS' },
  { name:'Rahul Mehta',   role:'Parent of Class 2 student', text:"The AI Explainer is a game changer. My son asks it questions at night and comes to class prepared. Fantastic platform!", rating:5, avatar:'RM' },
  { name:'Anjali Patel',  role:'Parent of Class 5 student', text:"Excellent teaching quality. Very happy with Science and English progress. The AI study planner keeps us organised.", rating:5, avatar:'AP' },
];
type ClaudeMessage = {
  role: 'user' | 'assistant'
  content: string
}
/* ══════════════════════════════════════════════════════
   Shared API helper — UNCHANGED
══════════════════════════════════════════════════════ */
async function callClaude(
  messages: ClaudeMessage[],
  systemPrompt: string
): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages
    }),
  })

  const data = await res.json()
  return data.content?.map((b: any) => b.text || '').join('') || ''
}

type PrimaryBtnProps = {
  onClick: () => void
  loading?: boolean
  disabled?: boolean
  color?: string
  full?: boolean
  children: React.ReactNode
}

function PrimaryBtn({ onClick, loading = false, disabled = false, full = false, children }: PrimaryBtnProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-colors ${
        full ? 'w-full' : ''
      } ${
        loading || disabled
          ? 'cursor-not-allowed bg-[#1C2B22]/15 text-[#9AA3AB]'
          : 'bg-[#D79A2C] text-[#17261D] hover:bg-[#c4891f]'
      }`}
    >
      {loading ? (
        <>
          <FaSpinner className="animate-spin" /> Please wait...
        </>
      ) : (
        children
      )}
    </button>
  );
}

function ToolHeader({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#0E211C] text-lg text-[#D79A2C]">
        {icon}
      </div>
      <div>
        <h3 className={`${lora.className} text-lg font-semibold text-[#1C2B22]`}>{title}</h3>
        <p className="text-xs text-[#9AA3AB]">{sub}</p>
      </div>
    </div>
  );
}

const selectClass =
  'rounded-md border border-[#1C2B22]/15 bg-white px-3.5 py-2.5 text-sm font-medium text-[#1C2B22] outline-none focus:border-[#D79A2C]';

/* ══════════════════════════════════════════════════════
   Tool 1 – AI Concept Explainer (logic unchanged)
══════════════════════════════════════════════════════ */
function AIExplainer() {
  const [subject, setSubject]   = useState('Mathematics');
  const [cls, setCls]           = useState('3');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer]     = useState('');
  const [loading, setLoading]   = useState(false);

  const quickQuestions = ['What is photosynthesis?','How do fractions work?','What is the water cycle?','Why is the sky blue?'];

  const ask = async () => {
    if (!question.trim()) return;
    setLoading(true); setAnswer('');
    try {
      const r = await callClaude(
        [{ role:'user', content:`Subject: ${subject}\nClass: ${cls}\nQuestion: ${question}` }],
        `You are a warm, encouraging primary school tutor for Class 1–5 students in India (CBSE/ICSE).
Explain things simply using fun examples, relatable Indian references (cricket, festivals, food), and emojis.
Keep answers under 150 words. End with one short practice tip or question to check understanding.`
      );
      setAnswer(r);
    } catch { setAnswer('Oops! Something went wrong. Please try again.'); }
    setLoading(false);
  };

  return (
    <div className="rounded-lg border border-[#1C2B22]/10 bg-white p-7">
      <ToolHeader icon={<FaBrain/>} title="AI concept explainer" sub="Ask any doubt — get a simple, clear explanation instantly" />

      <div className="mb-4 flex flex-wrap gap-3">
        <select value={subject} onChange={e=>setSubject(e.target.value)} className={`${selectClass} flex-1 min-w-[140px]`}>
          {subjects.map(s=><option key={s.name}>{s.name}</option>)}
        </select>
        <select value={cls} onChange={e=>setCls(e.target.value)} className={`${selectClass} w-28`}>
          {[1,2,3,4,5].map(c=><option key={c} value={c}>Class {c}</option>)}
        </select>
      </div>

      <div className="flex gap-2.5">
        <input
          value={question}
          onChange={e=>setQuestion(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&ask()}
          placeholder="e.g. What is photosynthesis? How do fractions work?"
          className="flex-1 rounded-md border border-[#1C2B22]/15 px-4 py-2.5 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
        />
        <PrimaryBtn onClick={ask} loading={loading} disabled={!question.trim()}>
          Ask AI <FaChevronRight size={11}/>
        </PrimaryBtn>
      </div>

      {answer && (
        <div className="mt-5 rounded-md border border-[#1C2B22]/10 bg-[#F7F2E9] p-5 text-sm leading-relaxed text-[#1C2B22] whitespace-pre-wrap">
          <div className="mb-2.5 flex items-center gap-2">
            <FaRobot className="text-[#D79A2C]" size={13}/>
            <span className="text-xs font-semibold text-[#8a5f18]">AI Tutor</span>
          </div>
          {answer}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {quickQuestions.map(q=>(
          <button key={q} onClick={()=>setQuestion(q)}
            className="rounded-full border border-[#1C2B22]/15 bg-[#F7F2E9] px-3.5 py-1.5 text-xs font-medium text-[#58646C] hover:border-[#D79A2C]/50">
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

type QuizItem = {
  q: string
  options: string[]
  answer: string
  explanation?: string
}

/* ══════════════════════════════════════════════════════
   Tool 2 – AI Practice Quiz (logic unchanged)
══════════════════════════════════════════════════════ */
function AIQuiz() {
  const [subject, setSubject]   = useState('Mathematics');
  const [cls, setCls]           = useState('3');
  const [quiz, setQuiz] = useState<QuizItem[] | null>(null);
  const [selected, setSelected] = useState<Record<number, string | undefined>>({});
  const [loading, setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const generate = async () => {
    setLoading(true); setQuiz(null); setSelected({}); setSubmitted(false);
    try {
      const raw = await callClaude(
        [{ role:'user', content:`4-question MCQ quiz for Class ${cls} ${subject} (Indian CBSE). Return ONLY a raw JSON array:\n[{"q":"...","options":["A","B","C","D"],"answer":"A","explanation":"..."}]` }],
        'Return ONLY a raw JSON array of 4 MCQ objects. No markdown, no explanation, just the JSON.'
      );
      const parsed = JSON.parse(raw.replace(/```json|```/g,'').trim());
      setQuiz(parsed);
    } catch { setQuiz([{ q:'Failed to generate quiz. Please try again.', options:[], answer:'', explanation:'' }]); }
    setLoading(false);
  };

  const score =
    quiz && submitted
      ? quiz.filter((q: QuizItem, i: number) => selected[i] === q.answer).length
      : 0;

  return (
    <div className="rounded-lg border border-[#1C2B22]/10 bg-white p-7">
      <ToolHeader icon={<FaBookOpen/>} title="AI practice quiz" sub="AI-generated MCQs tailored to your class & subject" />

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <select value={subject} onChange={e=>setSubject(e.target.value)} className={`${selectClass} flex-1 min-w-[140px]`}>
          {subjects.map(s=><option key={s.name}>{s.name}</option>)}
        </select>
        <select value={cls} onChange={e=>setCls(e.target.value)} className={`${selectClass} w-28`}>
          {[1,2,3,4,5].map(c=><option key={c} value={c}>Class {c}</option>)}
        </select>
        <PrimaryBtn onClick={generate} loading={loading}>
          Generate quiz
        </PrimaryBtn>
      </div>

      {quiz && !submitted && (
        <div>
          {quiz.map((q: QuizItem, qi: number) => (
            <div key={qi} className="mb-5 rounded-md border border-[#1C2B22]/10 bg-[#F7F2E9] p-5">
              <p className="mb-3.5 text-sm font-semibold text-[#1C2B22]">{qi + 1}. {q.q}</p>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {q.options.map((opt: string, oi: number) => {
                  const letter = ['A', 'B', 'C', 'D'][oi];
                  const active = selected[qi] === letter;

                  return (
                    <button
                      key={oi}
                      onClick={() => setSelected(prev => ({ ...prev, [qi]: letter }))}
                      className={`rounded-md px-3.5 py-2.5 text-left text-sm font-medium transition-colors border ${
                        active ? 'border-[#D79A2C] bg-white text-[#8a5f18]' : 'border-[#1C2B22]/15 bg-white text-[#58646C]'
                      }`}
                    >
                      <span className="mr-1.5 font-semibold">{letter}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <button
            onClick={() => setSubmitted(true)}
            disabled={Object.keys(selected).length < (quiz?.length ?? 0)}
            className={`w-full rounded-md py-3 text-sm font-semibold transition-colors ${
              Object.keys(selected).length < (quiz?.length ?? 0)
                ? 'cursor-not-allowed bg-[#1C2B22]/10 text-[#9AA3AB]'
                : 'bg-[#D79A2C] text-[#17261D] hover:bg-[#c4891f]'
            }`}
          >
            Submit quiz ({Object.keys(selected).length}/{quiz?.length ?? 0} answered)
          </button>
        </div>
      )}

      {quiz && submitted && (
        <div>
          {quiz.map((q,qi)=>(
            <div key={qi} className="mb-5 rounded-md border border-[#1C2B22]/10 bg-[#F7F2E9] p-5">
              <p className="mb-3.5 text-sm font-semibold text-[#1C2B22]">{qi+1}. {q.q}</p>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {q.options.map((opt,oi)=>{
                  const letter=['A','B','C','D'][oi];
                  const isCorrect=letter===q.answer;
                  const isWrong=selected[qi]===letter&&!isCorrect;
                  return (
                    <div key={oi} className={`rounded-md border px-3.5 py-2.5 text-sm font-medium ${
                      isCorrect ? 'border-[#1F6F54] bg-[#EAF4EF] text-[#1F6F54]' : isWrong ? 'border-red-300 bg-red-50 text-red-700' : 'border-[#1C2B22]/15 bg-white text-[#58646C]'
                    }`}>
                      <span className="mr-1.5 font-semibold">{letter}.</span>{opt} {isCorrect&&'✓'}{isWrong&&'✗'}
                    </div>
                  );
                })}
              </div>
              {q.explanation && <div className="mt-2.5 rounded-md border border-[#D79A2C]/25 bg-white px-3.5 py-2.5 text-sm text-[#58646C]">{q.explanation}</div>}
            </div>
          ))}
          <div className="rounded-md bg-[#0E211C] p-6 text-center">
            <div className={`${lora.className} text-2xl font-semibold text-white`}>{score}/{quiz.length} correct</div>
            <div className="mb-4 mt-1.5 text-sm text-[#AAB6A2]">{score===quiz.length?'Perfect score! Amazing!':score>=quiz.length/2?'Great job! Keep practising!':"Keep trying, you'll get there!"}</div>
            <button onClick={generate} className="rounded-full bg-[#D79A2C] px-6 py-2 text-sm font-semibold text-[#17261D] hover:bg-[#c4891f]">Try another quiz</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   Tool 3 – AI Study Planner (logic unchanged)
══════════════════════════════════════════════════════ */
function AIStudyPlanner() {
  const [cls, setCls]                   = useState('3');
  const [weakSubjects, setWeakSubjects] = useState<string[]>([]);
  const [hours, setHours]               = useState('1');
  const [plan, setPlan]                 = useState('');
  const [loading, setLoading]           = useState(false);

  const toggle = (s: string) =>
    setWeakSubjects(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);

  const generate = async () => {
    if (!weakSubjects.length) return;
    setLoading(true); setPlan('');
    try {
      const r = await callClaude(
        [{ role:'user', content:`Class: ${cls}\nFocus subjects: ${weakSubjects.join(', ')}\nStudy time per day: ${hours} hr(s)\n\nCreate a 7-day personalised study plan.` }],
        `You are a friendly academic planner for Indian primary school students (CBSE/ICSE).
Create a practical 7-day plan. Use day names (Monday–Sunday) as headers. Include specific topics, short breaks, and fun activities.
Be encouraging and achievable. Use emojis. Max 300 words.`
      );
      setPlan(r);
    } catch { setPlan('Could not generate plan. Please try again.'); }
    setLoading(false);
  };

  return (
    <div className="rounded-lg border border-[#1C2B22]/10 bg-white p-7">
      <ToolHeader icon={<FaLightbulb/>} title="AI study planner" sub="Get a personalised 7-day study plan for your child" />

      <div className="mb-5 flex flex-wrap gap-3">
        <div className="flex-1 min-w-[140px]">
          <label className="mb-1.5 block text-xs font-medium text-[#58646C]">Class level</label>
          <select value={cls} onChange={e=>setCls(e.target.value)} className={`${selectClass} w-full`}>
            {[1,2,3,4,5].map(c=><option key={c} value={c}>Class {c}</option>)}
          </select>
        </div>
        <div className="flex-1 min-w-[140px]">
          <label className="mb-1.5 block text-xs font-medium text-[#58646C]">Study hours / day</label>
          <select value={hours} onChange={e=>setHours(e.target.value)} className={`${selectClass} w-full`}>
            {['0.5','1','1.5','2','3'].map(h=><option key={h} value={h}>{h} hr{h==='1'?'':'s'}</option>)}
          </select>
        </div>
      </div>

      <div className="mb-5">
        <label className="mb-2.5 block text-xs font-medium text-[#58646C]">Select subjects to focus on:</label>
        <div className="flex flex-wrap gap-2.5">
          {subjects.map(s=>{
            const on=weakSubjects.includes(s.name);
            return (
              <button key={s.name} onClick={()=>toggle(s.name)}
                className="rounded-full px-4 py-1.5 text-sm font-semibold transition-colors border"
                style={{ borderColor: on ? s.color : '#1C2B2226', background: on ? s.bg : '#fff', color: on ? s.color : '#9AA3AB' }}>
                {on&&'✓ '}{s.name}
              </button>
            );
          })}
        </div>
      </div>

      <PrimaryBtn onClick={generate} loading={loading} disabled={!weakSubjects.length} full>
        Generate my study plan
      </PrimaryBtn>

      {plan && (
        <div className="mt-5 rounded-md border border-[#1C2B22]/10 bg-[#F7F2E9] p-5 text-sm leading-relaxed text-[#1C2B22] whitespace-pre-wrap">
          {plan}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════ */
const PrimarySection = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('explainer');

  const aiTools = [
    { id:'explainer', label:'AI Explainer',  component:<AIExplainer/> },
    { id:'quiz',      label:'Practice Quiz',  component:<AIQuiz/> },
    { id:'planner',   label:'Study Planner',  component:<AIStudyPlanner/> },
  ];

  return (
    <>
      <Head>
        <title>Primary Section Tuition | Class 1–5 Online Tutoring with AI Tools | English, Maths, Science</title>
        <meta name="description" content="Top-rated online tuition for Class 1 to 5 with AI learning tools. Covers English, Hindi, Maths, Science, Social Studies & Art. Fun interactive lessons by certified tutors. Book a free demo today!" />
        <meta name="keywords" content="primary section tuition, class 1 to 5 tutor, online tuition for kids, grade 1 2 3 4 5 tutoring, english maths science tutor, primary school home tutor, AI learning tools for kids, CBSE ICSE primary tuition" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yattratutors.com/courses/primary-section" />
        <meta property="og:title" content="Primary Section Tuition – Class 1 to 5 | AI-Powered Online Learning" />
        <meta property="og:description" content="Fun & effective online tuition for Class 1–5 with AI tools. English, Hindi, Maths, Science, SST & Art. Expert tutors, flexible timings. Enrol today!" />
        <meta property="og:image" content="https://yattratutors.com/images/kids-courses/primary-og.png" />
        <meta property="og:url" content="https://yattratutors.com/courses/primary-section" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Primary Section Tuition | Class 1–5 Online Tutoring with AI" />
        <meta name="twitter:description" content="Interactive online tuition for Class 1–5 with AI-powered tools. Expert tutors, live sessions, CBSE/ICSE aligned. Book a free demo!" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <div className={`min-h-screen bg-[#F7F2E9] ${dmSans.className}`}>
        <NavBar/>

        {/* ════ HERO ════ */}
        <section aria-label="Primary Section Introduction" className="relative overflow-hidden bg-[#0E211C] px-6 py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[.04]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
          />

          <div className="relative z-10 mx-auto max-w-5xl">
            <button onClick={()=>router.push('/#kids-courses')} aria-label="Back to all courses"
              className="mb-9 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-sm font-medium text-[#AAB6A2] transition-colors hover:border-[#D79A2C]/50 hover:text-white">
              <FaArrowLeft size={11}/> Back to all courses
            </button>

            <div className="flex flex-wrap items-center justify-between gap-10">
              {/* Left */}
              <div className="max-w-xl flex-1" style={{ minWidth: 320 }}>
                <p className={`${lora.className} italic text-sm text-[#AAB6A2] mb-3`}>Class 1st – 5th · Primary school</p>
                <h1 className={`${lora.className} text-3xl font-semibold text-white sm:text-4xl`}>
                  Fun and effective primary tuition, with AI tools
                </h1>
                <p className="mt-5 text-sm leading-relaxed text-[#AAB6A2]">
                  Expert 1-on-1 online tutoring for Class 1 to 5 — now with AI-powered learning tools. Ask doubts
                  anytime, take practice quizzes, and get personalised study plans. Building strong foundations has
                  never been this engaging.
                </p>
                <div className="mb-8 mt-6 flex flex-wrap gap-2">
                  {benefits.map(b=>(
                    <span key={b} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-[#AAB6A2]">
                      <FaCheckCircle size={10} className="text-[#D79A2C]"/> {b}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={()=>router.push('/find-tutor-flow/create-account')} aria-label="Find a tutor for your child"
                    className="rounded-md bg-[#D79A2C] px-7 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]">
                    Find a tutor
                  </button>
                  <button onClick={()=>router.push('/tutors')} aria-label="Book a free demo class"
                    className="rounded-md border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-[#D79A2C]/60">
                    Free demo class
                  </button>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-1 justify-center" style={{ minWidth: 260 }}>
                <div className="relative">
                  <img src="/images/kids-courses/primary.png" alt="Happy primary school students learning online with a tutor" width={340} height={340} loading="eager"
                    className="relative z-10 rounded-lg object-cover" style={{ width: 'min(320px,90vw)', height: 'auto' }}/>
                  <div className="absolute -top-4 -right-4 z-20 flex items-center gap-2 rounded-md bg-white px-4 py-2.5 shadow-sm">
                    <FaStar className="text-[#D79A2C]" size={14}/>
                    <span className="text-sm font-semibold text-[#1C2B22]">4.9 / 5 Rating</span>
                  </div>
                  <div className="absolute -bottom-4 -left-4 z-20 flex items-center gap-2 rounded-md bg-[#D79A2C] px-4 py-2.5 text-sm font-semibold text-[#17261D]">
                    <FaRobot size={13}/> AI-powered learning
                  </div>
                </div>
              </div>
            </div>

            {/* Stats bar */}
            <div className="mt-14 flex flex-wrap divide-x divide-white/10 rounded-md border border-white/10" role="list" aria-label="Key statistics">
              {stats.map((s)=>(
                <div key={s.label} role="listitem" className="flex-1 px-4 py-6 text-center" style={{ minWidth: 120 }}>
                  <div className={`${lora.className} text-2xl font-semibold text-[#D79A2C]`}>{s.value}</div>
                  <div className="mt-1 text-xs text-[#AAB6A2]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════ AI TOOLS ════ */}
        <section aria-labelledby="ai-tools-heading" className="px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-2`}>Powered by AI</p>
              <h2 id="ai-tools-heading" className={`${lora.className} text-2xl font-semibold text-[#1C2B22] sm:text-3xl`}>Free AI learning tools</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-[#58646C]">Three powerful tools to supercharge your child&apos;s learning — available free, right here on this page.</p>
            </div>

            <div className="mb-8 flex flex-wrap justify-center gap-2.5">
              {aiTools.map(tool=>(
                <button key={tool.id} onClick={()=>setActiveTab(tool.id)}
                  className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
                    activeTab===tool.id ? 'border-[#D79A2C] bg-[#D79A2C] text-[#17261D]' : 'border-[#1C2B22]/15 bg-white text-[#1C2B22] hover:border-[#D79A2C]/40'
                  }`}>
                  {tool.label}
                </button>
              ))}
            </div>

            {aiTools.find(t=>t.id===activeTab)?.component}
          </div>
        </section>

        {/* ════ SUBJECTS ════ */}
        <section aria-labelledby="subjects-heading" className="bg-white px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 id="subjects-heading" className={`${lora.className} text-2xl font-semibold text-[#1C2B22] sm:text-3xl`}>What your child will learn</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-[#58646C]">A comprehensive CBSE &amp; ICSE aligned curriculum designed to make every subject enjoyable for Classes 1–5.</p>
            </div>
            <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))' }} role="list">
              {subjects.map(sub=>(
                <article key={sub.name} role="listitem" aria-label={`${sub.name} - ${sub.tag}`}
                  className="rounded-lg border p-6 transition-colors" style={{ background: sub.bg, borderColor: `${sub.color}26` }}>
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full text-white" style={{ background: sub.color }} aria-hidden>{sub.icon}</div>
                    <span className="rounded-full px-3 py-1 text-xs font-medium" style={{ background: `${sub.color}18`, color: sub.color }}>{sub.tag}</span>
                  </div>
                  <h3 className={`${lora.className} mb-1.5 text-lg font-semibold text-[#1C2B22]`}>{sub.name}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-[#58646C]">{sub.desc}</p>
                  <ul className="space-y-1.5">
                    {sub.highlights.map(h=>(
                      <li key={h} className="flex items-center gap-2 text-sm text-[#1C2B22]">
                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: sub.color }} aria-hidden/> {h}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ════ WHY US ════ */}
        <section aria-labelledby="why-heading" className="px-6 py-16">
          <div className="mx-auto max-w-5xl text-center">
            <h2 id="why-heading" className={`${lora.className} text-2xl font-semibold text-[#1C2B22] sm:text-3xl`}>Why parents choose us</h2>
            <p className="mx-auto mb-12 mt-3 max-w-md text-sm text-[#58646C]">Trusted by 500+ families across India for quality, personalised primary education.</p>
            <div className="grid gap-px overflow-hidden rounded-lg border border-[#1C2B22]/10 bg-[#1C2B22]/10 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title:'Verified expert tutors', desc:'All tutors are background-checked with proven teaching experience for young learners.' },
                { title:'AI-powered tools', desc:'Free AI explainer, quiz generator, and study planner available 24/7 for every student.' },
                { title:'Progress tracking',  desc:'Regular assessments and detailed reports so parents stay informed every step of the way.' },
                { title:'Flexible scheduling', desc:'Book sessions at times that suit your child — weekdays, evenings, or weekends.' },
              ].map(item=>(
                <div key={item.title} className="bg-white p-7 text-left">
                  <h3 className={`${lora.className} mb-2 text-base font-semibold text-[#1C2B22]`}>{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[#58646C]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════ TESTIMONIALS ════ */}
        <section aria-labelledby="reviews-heading" className="bg-white px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <h2 id="reviews-heading" className={`${lora.className} text-2xl font-semibold text-[#1C2B22] sm:text-3xl`}>What parents are saying</h2>
              <p className="mt-2 text-sm text-[#58646C]">Real reviews from real families across India</p>
            </div>
            <div className="divide-y divide-[#1C2B22]/[.06] rounded-lg border border-[#1C2B22]/10">
              {testimonials.map((t,i)=>(
                <div key={i} className="p-6">
                  <div className="mb-3 flex gap-0.5 text-[#D79A2C]">
                    {Array.from({length:t.rating}).map((_,j)=><FaStar key={j} size={13}/>)}
                  </div>
                  <p className={`${lora.className} mb-4 text-sm italic leading-relaxed text-[#58646C]`}>&quot;{t.text}&quot;</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0E211C] text-xs font-semibold text-[#D79A2C]">{t.avatar}</div>
                    <div>
                      <div className="text-sm font-semibold text-[#1C2B22]">{t.name}</div>
                      <div className="text-xs text-[#9AA3AB]">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════ CTA ════ */}
        <section aria-label="Enrol your child" className="bg-[#0E211C] px-6 py-16 text-center">
          <div className="mx-auto max-w-xl">
            <h2 className={`${lora.className} text-2xl font-semibold text-white sm:text-3xl`}>
              Ready to supercharge your child&apos;s learning?
            </h2>
            <p className="mb-9 mt-4 text-sm leading-relaxed text-[#AAB6A2]">
              Join 500+ happy students. Get expert tutors and free AI tools. Book a free demo — no commitment required.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={()=>router.push('/find-tutor-flow/create-account')} aria-label="Find a primary section tutor now"
                className="rounded-md bg-[#D79A2C] px-7 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]">
                Find a tutor now
              </button>
              <button onClick={()=>router.push('/tutors')} aria-label="Book a free demo class"
                className="rounded-md border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-[#D79A2C]/60">
                Book free demo
              </button>
            </div>
          </div>
        </section>

        <Footer/>
      </div>
    </>
  );
};

export default PrimarySection;
