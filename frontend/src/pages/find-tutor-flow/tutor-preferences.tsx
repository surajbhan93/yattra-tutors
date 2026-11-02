// src/pages/find-tutor-flow/tutor-preferences.tsx
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Lora } from 'next/font/google';

import Button from '../../components/find-tutor-flow/Button';
import Checkbox from '../../components/find-tutor-flow/CheckBox';
import RadioGroup from '../../components/find-tutor-flow/RadioGroup';
import OnboardingStepper from '@/pages/find-tutor-flow/OnboardingStepper';

const lora = Lora({ subsets: ['latin'], weight: ['500', '600'] });

const subjects = ['Math', 'Science', 'English', 'History', 'Social Science', 'All Subject'];
const classes = [
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7',
  'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'
];
const boards = ['CBSE', 'ICSE', 'State Board', 'IB', 'Cambridge'];
const languages = ['English', 'Hindi', 'Tamil', 'Telugu', 'Marathi', 'Gujarati'];
const timeSlots = ['Morning', 'Afternoon', 'Evening'];

const urgencyOptions = [
  { label: 'Within 24 hours', value: '24h' },
  { label: 'Within 1 week', value: '1w' },
  { label: 'Other & ASAP', value: 'other' },
];

const otherPreferencesOptions = [
  { label: 'Online', value: 'online' },
  { label: 'Offline', value: 'offline' },
  { label: 'One-on-One', value: 'one-on-one' },
  { label: 'Group', value: 'group' },
];

const selectClass =
  'w-full px-3.5 py-3 mb-4 rounded-md border border-[#1C2B22]/15 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]';

const TutorPreferences: React.FC = () => {
  const router = useRouter();

  const [subject, setSubject] = useState('');
  const [classGrade, setClassGrade] = useState('');
  const [board, setBoard] = useState('');
  const [language, setLanguage] = useState('');
  const [time, setTime] = useState('');
  const [scheduling, setScheduling] = useState<string[]>([]);
  const [urgency, setUrgency] = useState('');
  const [otherPrefs, setOtherPrefs] = useState<string[]>([]);

  const handleCheckbox = (setter: any, state: string[], e: any) => {
    const { value, checked } = e.target;
    if (checked) setter([...state, value]);
    else setter(state.filter((item) => item !== value));
  };

  const handleNext = () => {
    router.push({
      pathname: '/find-tutor-flow/tutor-matches',
      query: {
        subject,
        classGrade,
        board,
        language,
        time,
        scheduling: scheduling.join(','),
        urgency,
        otherPreferences: otherPrefs.join(','),
      },
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F2E9]">
      <div className="mx-auto w-full max-w-2xl px-4 pt-10">
        <OnboardingStepper currentStep={2} />
      </div>

      {/* Center Form */}
      <div className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-xl rounded-lg border border-[#1C2B22]/10 bg-white p-8 sm:p-10">
          <h2 className={`${lora.className} mb-8 text-center text-2xl font-semibold text-[#1C2B22]`}>
            Tell us what you are looking for
          </h2>

          {/* Academic Needs */}
          <div className="mb-6">
            <label className="mb-2.5 block text-sm font-medium text-[#1C2B22]">Academic needs</label>

            {[
              { value: subject, onChange: (e: any) => setSubject(e.target.value), placeholder: 'Select subject', list: subjects },
              { value: classGrade, onChange: (e: any) => setClassGrade(e.target.value), placeholder: 'Select class', list: classes },
              { value: board, onChange: (e: any) => setBoard(e.target.value), placeholder: 'Select board', list: boards },
              { value: language, onChange: (e: any) => setLanguage(e.target.value), placeholder: 'Select language', list: languages },
            ].map((item, index) => (
              <select key={index} className={selectClass} value={item.value} onChange={item.onChange}>
                <option value="">{item.placeholder}</option>
                {item.list.map((v: any) => <option key={v} value={v}>{v}</option>)}
              </select>
            ))}
          </div>

          {/* Scheduling */}
          <div className="mb-6">
            <label className="mb-2.5 block text-sm font-medium text-[#1C2B22]">Scheduling &amp; time</label>

            <Checkbox
              label="Weekends"
              value="weekends"
              checked={scheduling.includes('weekends')}
              onChange={(e) => handleCheckbox(setScheduling, scheduling, e)}
            />
            <Checkbox
              label="Weekdays"
              value="weekdays"
              checked={scheduling.includes('weekdays')}
              onChange={(e) => handleCheckbox(setScheduling, scheduling, e)}
            />

            <select className={`${selectClass} mt-3 mb-0`} value={time} onChange={(e) => setTime(e.target.value)}>
              <option value="">Select time</option>
              {timeSlots.map((ts) => <option key={ts} value={ts}>{ts}</option>)}
            </select>
          </div>

          {/* Other Preferences */}
          <div className="mb-6">
            <label className="mb-2.5 block text-sm font-medium text-[#1C2B22]">Other preferences</label>
            {otherPreferencesOptions.map((opt) => (
              <Checkbox
                key={opt.value}
                label={opt.label}
                value={opt.value}
                checked={otherPrefs.includes(opt.value)}
                onChange={(e) => handleCheckbox(setOtherPrefs, otherPrefs, e)}
              />
            ))}
          </div>

          {/* Urgency */}
          <div className="mb-8">
            <label className="mb-2.5 block text-sm font-medium text-[#1C2B22]">Urgency</label>
            <RadioGroup name="urgency" options={urgencyOptions} selectedValue={urgency} onChange={setUrgency} />
          </div>

          {/* CTA */}
          <Button onClick={handleNext} variant="primary" fullWidth>
            Find my tutors
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TutorPreferences;
