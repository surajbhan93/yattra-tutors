// src/components/tutor-flow/CompleteProfile.tsx
import type { NextPage } from 'next';
import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import NavBar from '@/components/navbar/NavBar';
import Footer from '@/components/landing/Footer';
import { UserCircle } from 'lucide-react';
import { Lora } from 'next/font/google';

const lora = Lora({ subsets: ['latin'], weight: ['500', '600'] });

type CompleteProfileForm = {
  bio: string;
  subject: string;
  method: 'Online' | 'Offline' | 'Hybrid' | '';
  certifications: string;
};

const initial: CompleteProfileForm = {
  bio: '',
  subject: '',
  method: '',
  certifications: '',
};

const inputClass =
  'w-full rounded-md border border-[#1C2B22]/15 p-3 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]';

const CompleteProfile: NextPage = () => {
  const [form, setForm] = useState<CompleteProfileForm>(initial);
  const [image, setImage] = useState<File | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value as any }));
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      setImage(null);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append('bio', form.bio);
    payload.append('subject', form.subject);
    payload.append('method', form.method);
    payload.append('certifications', form.certifications);
    if (image) payload.append('profilePicture', image);

    // Mock success
    alert('Profile saved successfully!');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F2E9]">
      <NavBar />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 px-4 py-12">
        <div className="w-full max-w-2xl rounded-lg border border-[#1C2B22]/10 bg-white p-8 sm:p-10">
          {/* Header / Title */}
          <div className="flex flex-col items-center mb-6 text-center">
            <UserCircle className="h-14 w-14 text-[#D79A2C]" />
            <h2 className={`${lora.className} mt-4 text-2xl font-semibold text-[#1C2B22]`}>
              Complete your profile
            </h2>
            <p className="mt-2 max-w-md text-sm text-[#58646C]">
              Fill in your details to help students know you better. Add your bio, subjects, teaching method, and
              certifications to create a strong profile.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Bio */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#1C2B22]">Short bio</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Write a short professional bio..."
                className={inputClass}
                rows={3}
              />
            </div>

            {/* Profile Picture */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#1C2B22]">Upload profile picture</label>
              <input type="file" accept="image/*" onChange={handleFile} className="w-full text-sm text-[#58646C]" />
              {image && <p className="mt-2 text-sm text-[#58646C]">{image.name}</p>}
            </div>

            {/* Subject */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#1C2B22]">Subject specializations</label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Add subject specializations"
                className={inputClass}
              />
            </div>

            {/* Teaching Method */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#1C2B22]">Preferred teaching method</label>
              <select name="method" value={form.method} onChange={handleChange} className={inputClass}>
                <option value="">Select method</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            {/* Certifications */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#1C2B22]">Certifications &amp; awards</label>
              <textarea
                name="certifications"
                value={form.certifications}
                onChange={handleChange}
                placeholder="Certifications & awards"
                className={inputClass}
                rows={2}
              />
            </div>

            {/* Submit Button */}
            <button
              className="w-full rounded-md bg-[#D79A2C] py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
              type="submit"
            >
              Save profile
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CompleteProfile;
