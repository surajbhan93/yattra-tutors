import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

import { Lora } from 'next/font/google';

import NavBar from '@/components/navbar/NavBar';
import Footer from '@/components/landing/Footer';
import OnboardingStepper from '@/pages/find-tutor-flow/OnboardingStepper';

import TutorPremiumCard from './TutorPremiumCard';
import apiClient from '../../lib/apiauth';

const lora = Lora({ subsets: ['latin'], weight: ['500', '600'], style: ['italic', 'normal'] });

/* ---------------- TYPES ---------------- */
interface ApiTutor {
  _id: string;
  fullName: string;
  email: string;
  subjects: string[];
  yearsOfExperience: number;
  price: number;
  rating: number;
  testimonial: string;
}

/* ---------------- MOTION VARIANTS ---------------- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const TutorMatches: React.FC = () => {
  const router = useRouter();
  const { query } = router;

  const [allTutors, setAllTutors] = useState<ApiTutor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    subject: '',
    experience: '',
    price: 12000,
  });

  /* ---------------- AUTH CHECK ---------------- */
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.replace('/create-account');
  }, [router]);

  /* ---------------- FETCH TUTORS ---------------- */
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setIsLoading(true);
        const res = await apiClient.get('/auth/parent/tutors');
        setAllTutors(res.data || []);
      } catch {
        setError('Failed to fetch tutors. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTutors();
  }, []);

  /* ---------------- FILTER LOGIC ---------------- */
  const normalizeSubject = (value: string) =>
    value.toLowerCase().trim().replace(/s$/, '');

  const filteredTutors = useMemo(() => {
    let tutors = [...allTutors];

    const subjectPref =
      (filters.subject || query.subject) as string;

    if (subjectPref) {
      const normalized = normalizeSubject(subjectPref);
      tutors = tutors.filter((t) =>
        t.subjects.map(normalizeSubject).includes(normalized)
      );
    }

    if (filters.experience) {
      tutors = tutors.filter((t) => {
        const exp = t.yearsOfExperience;
        if (filters.experience === '0-1') return exp <= 1;
        if (filters.experience === '2-5') return exp >= 2 && exp <= 5;
        if (filters.experience === '5+') return exp >= 5;
        return true;
      });
    }

    return tutors.filter((t) => t.price <= filters.price);
  }, [allTutors, filters, query.subject]);

  /* ---------------- UI ---------------- */
  return (
    <>
      <NavBar />

      <main className="min-h-screen bg-[#F7F2E9] px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <OnboardingStepper currentStep={3} />

          {/* HEADER */}
          <div className="mt-10 mb-12 text-center">
            <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-2`}>Selected for you</p>
            <h1 className={`${lora.className} text-3xl md:text-4xl font-semibold text-[#1C2B22]`}>
              Your best tutor matches
            </h1>
            <p className="mt-3 text-sm text-[#58646C]">
              Premium tutors selected just for your learning goals
            </p>
          </div>

          {/* FILTER BAR */}
          <div className="bg-white rounded-lg border border-[#1C2B22]/10 p-6 mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-medium text-[#1C2B22] block mb-1.5">
                Subject
              </label>
              <select
                value={filters.subject}
                onChange={(e) =>
                  setFilters({ ...filters, subject: e.target.value })
                }
                className="w-full px-3.5 py-2 border border-[#1C2B22]/15 rounded-md text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
              >
                <option value="">All Subjects</option>

{/* Core School Subjects */}
<option value="Maths">Maths</option>
<option value="Physics">Physics</option>
<option value="Chemistry">Chemistry</option>
<option value="Biology">Biology</option>
<option value="English">English</option>
<option value="Hindi">Hindi</option>
<option value="Social Science">Social Science</option>
<option value="History">History</option>
<option value="Geography">Geography</option>
<option value="Political Science">Political Science</option>
<option value="Economics">Economics</option>

{/* Commerce */}
<option value="Accountancy">Accountancy</option>
<option value="Business Studies">Business Studies</option>

{/* Computer & Tech */}
<option value="Computer Science">Computer Science</option>
<option value="Information Technology">Information Technology</option>
<option value="Programming">Programming</option>
<option value="Coding">Coding</option>

{/* Competitive & Skill-based */}
<option value="Science">General Science</option>
<option value="Environmental Studies">Environmental Studies</option>
<option value="Reasoning">Logical Reasoning</option>
<option value="Quantitative Aptitude">Quantitative Aptitude</option>
<option value="Spoken English">Spoken English</option>
<option value="Olympiad Preparation">Olympiad Preparation</option>
<option value="JEE Preparation">JEE Preparation</option>
<option value="NEET Preparation">NEET Preparation</option>

              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-[#1C2B22] block mb-1.5">
                Experience
              </label>
              <select
                value={filters.experience}
                onChange={(e) =>
                  setFilters({ ...filters, experience: e.target.value })
                }
                className="w-full px-3.5 py-2 border border-[#1C2B22]/15 rounded-md text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
              >
                <option value="">All</option>
                <option value="0-1">0–1 years</option>
                <option value="2-5">2–5 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-[#1C2B22] block mb-1.5">
                Max price: ₹{filters.price.toLocaleString()}
              </label>
              <input
                type="range"
                min={500}
                max={12000}
                step={500}
                value={filters.price}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    price: Number(e.target.value),
                  })
                }
                className="w-full accent-[#D79A2C]"
              />
            </div>
          </div>

          {/* STATES */}
          {isLoading && (
            <p className="text-center text-sm text-[#9AA3AB]">
              Loading premium tutors...
            </p>
          )}

          {error && (
            <p className="text-center text-sm text-red-600">{error}</p>
          )}

          {!isLoading && filteredTutors.length === 0 && (
            <div className="text-center py-24 text-sm text-[#58646C]">
              No tutors found for the selected filters.
            </div>
          )}

          {/* PREMIUM TUTOR GRID */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="
              grid gap-10
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {filteredTutors.map((tutor) => (
              <TutorPremiumCard
                key={tutor._id}
                tutor={tutor}
                onOpenProfile={() =>
                  router.push(`/tutors/${tutor._id}`)
                }
              />
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default TutorMatches;
