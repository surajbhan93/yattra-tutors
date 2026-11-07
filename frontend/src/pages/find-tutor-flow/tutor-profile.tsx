import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { lora } from "@/lib/fonts";

import Button from '../../components/find-tutor-flow/Button';
import Calendar from '../../components/find-tutor-flow/Calendar';

const tutorData = {
  id: '1',
  name: 'Dr. Amelie Werper',
  education: 'PhD in Neuroscience, Stanford University',
  bio: `Dr. Werper is a highly experienced neuroscientist with a focus on brain research and educational neuroscience. She specializes in calculus, algebra, and psychology.`,
  rating: 5,
  ratingBreakdown: {
    '5 Stars': 80,
    '4 Stars': 15,
    '3 Stars': 5,
    '2 Stars': 0,
    '1 Star': 0,
  },
  subjects: ['Math', 'Physics', 'Biology', 'Chemistry', 'Social Science'],
  teachingModes: ['Online', 'Offline'],
  experience: 'Type of License',
  availability: ['2024-07-10', '2024-07-28', '2024-08-13'],
  avatarUrl: 'https://randomuser.me/api/portraits/women/50.jpg',
};

const pillBase = 'rounded-full px-3.5 py-1.5 text-sm transition-colors';

const TutorProfile: React.FC = () => {
  const router = useRouter();

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedMode, setSelectedMode] = useState<string>('');
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const toggleSubject = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const handleDateSelect = (date: string) => {
    setSelectedDates([date]); // single select
  };

  const handleBooking = () => {
    router.push('/find-tutor/request-sent');
  };

  return (
    <div className="mx-auto my-12 max-w-2xl rounded-lg border border-[#1C2B22]/10 bg-white p-6 sm:p-8">
      <div className="mb-7 flex items-center gap-5">
        <img
          src={tutorData.avatarUrl}
          alt={tutorData.name}
          className="h-24 w-24 rounded-full border border-[#1C2B22]/10 object-cover"
        />
        <div>
          <h2 className={`${lora.className} text-xl font-semibold text-[#1C2B22]`}>{tutorData.name}</h2>
          <p className={`${lora.className} italic text-sm text-[#58646C]`}>{tutorData.education}</p>
        </div>
      </div>

      <section className="mb-6 border-t border-[#1C2B22]/[.06] pt-6">
        <h3 className={`${lora.className} mb-2 text-base font-semibold text-[#1C2B22]`}>About</h3>
        <p className="text-sm leading-relaxed text-[#58646C]">{tutorData.bio}</p>
      </section>

      <section className="mb-6 border-t border-[#1C2B22]/[.06] pt-6">
        <h3 className={`${lora.className} mb-2 text-base font-semibold text-[#1C2B22]`}>Ratings</h3>
        <p className="mb-3 text-sm font-semibold text-[#D79A2C]">{tutorData.rating} stars</p>
        <div className="space-y-2">
          {Object.entries(tutorData.ratingBreakdown).map(([star, percent]) => (
            <div key={star} className="flex items-center gap-2 text-xs text-[#58646C]">
              <div className="w-16">{star}</div>
              <div className="h-2 flex-grow rounded-full bg-[#1C2B22]/[.08]">
                <div className="h-full rounded-full bg-[#D79A2C]" style={{ width: `${percent}%` }} />
              </div>
              <div className="w-10 text-right">{percent}%</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6 border-t border-[#1C2B22]/[.06] pt-6">
        <h3 className={`${lora.className} mb-2 text-base font-semibold text-[#1C2B22]`}>Subjects (select one or more)</h3>
        <div className="flex flex-wrap gap-2">
          {tutorData.subjects.map((subject) => (
            <button
              key={subject}
              type="button"
              onClick={() => toggleSubject(subject)}
              className={`${pillBase} border ${
                selectedSubjects.includes(subject)
                  ? 'border-[#D79A2C] bg-[#D79A2C]/10 text-[#8a5f18]'
                  : 'border-[#1C2B22]/15 text-[#1C2B22]'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </section>

      <section className="mb-6 border-t border-[#1C2B22]/[.06] pt-6">
        <h3 className={`${lora.className} mb-2 text-base font-semibold text-[#1C2B22]`}>Teaching mode</h3>
        <div className="flex gap-2.5">
          {tutorData.teachingModes.map((mode) => (
            <button
              key={mode}
              onClick={() => setSelectedMode(mode)}
              className={`${pillBase} border ${
                selectedMode === mode
                  ? 'border-[#D79A2C] bg-[#D79A2C]/10 text-[#8a5f18]'
                  : 'border-[#1C2B22]/15 text-[#1C2B22]'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </section>

      <section className="mb-6 border-t border-[#1C2B22]/[.06] pt-6">
        <h3 className={`${lora.className} mb-2 text-base font-semibold text-[#1C2B22]`}>Experience</h3>
        <p className="text-sm text-[#58646C]">{tutorData.experience}</p>
      </section>

      <section className="border-t border-[#1C2B22]/[.06] pt-6">
        <h3 className={`${lora.className} mb-3 text-base font-semibold text-[#1C2B22]`}>Availability</h3>
        <div className="flex flex-wrap gap-5">
          <Calendar
            year={2024}
            month={7}
            availableDates={tutorData.availability}
            selectedDates={selectedDates}
            onSelectDate={handleDateSelect}
          />
          <Calendar
            year={2024}
            month={8}
            availableDates={tutorData.availability}
            selectedDates={selectedDates}
            onSelectDate={handleDateSelect}
          />
        </div>
      </section>

      <Button onClick={handleBooking} variant="primary" fullWidth className="mt-7">
        Book a demo
      </Button>
    </div>
  );
};

export default TutorProfile;
