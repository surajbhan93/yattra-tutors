import React from "react";
import { city } from "@/components/seoIndia/locations/up/meerut";

export const WhyTutvex: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#0E211C] text-[#F7F2E9] border-b border-[#F7F2E9]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-medium text-[#D79A2C]">EEAT & Academic Excellence</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#F7F2E9]" style={{ fontFamily: "'Lora', serif" }}>
            Why Parents & Students Choose Yattra Tutors in {city.name}
          </h2>
          <p className="text-base sm:text-lg text-[#F7F2E9]/70 leading-relaxed">
            With over {new Date().getFullYear() - city.establishedYear}+ years of operational leadership in {city.state}, Yattra Tutors has set the golden standard for private home tuition, academic mentorship, and student safety.
          </p>
        </div>

        {/* EEAT Ledger: Founder, Verification, Safety, Track Record */}
        <div className="divide-y divide-[#F7F2E9]/10 border-y border-[#F7F2E9]/10">
          <div className="py-6 grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-3">
            <h3 className="text-lg font-semibold text-[#F7F2E9]">Strict 7-Step Verification</h3>
            <p className="text-sm text-[#F7F2E9]/70 leading-relaxed">
              Every home tutor in {city.name} undergoes government ID check (Aadhaar/PAN), educational degree verification, police background screening, written subject testing, and real classroom trial sessions before entering your home.
            </p>
          </div>

          <div className="py-6 grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-3">
            <h3 className="text-lg font-semibold text-[#F7F2E9]">Personalized Pace & Syllabi</h3>
            <p className="text-sm text-[#F7F2E9]/70 leading-relaxed">
              Unlike crowded coaching institutes in {city.name}, private home tuition allows tutors to target student weaknesses directly, clear doubts instantly, and customize mock test series aligned with CBSE, ICSE, and UP Board schedules.
            </p>
          </div>

          <div className="py-6 grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-3">
            <h3 className="text-lg font-semibold text-[#F7F2E9]">Subject Specialists & IITians</h3>
            <p className="text-sm text-[#F7F2E9]/70 leading-relaxed">
              Our roster in {city.name} includes M.Sc, B.Tech, M.Tech, and Gold Medalist educators specializing in Class 10/12 Board preparation, JEE Advanced numerical problem solving, and NEET medical biology mastery.
            </p>
          </div>

          <div className="py-6 grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-3">
            <h3 className="text-lg font-semibold text-[#F7F2E9]">Instant Replacement Support</h3>
            <p className="text-sm text-[#F7F2E9]/70 leading-relaxed">
              Parent satisfaction is paramount. If you ever feel the tutor&apos;s pace or teaching method is not aligned with your child&apos;s learning style, Yattra Tutors provides a free, instant replacement within 24 hours.
            </p>
          </div>
        </div>

        {/* Deep EEAT Narrative Block */}
        <div className="bg-[#132B22] border border-[#F7F2E9]/10 rounded-2xl p-8 sm:p-12 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-medium text-[#D79A2C]">Founder Statement & Academic Philosophy</span>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#F7F2E9] leading-snug" style={{ fontFamily: "'Lora', serif" }}>
                &ldquo;Every child in {city.name} deserves a dedicated teacher who understands their individual potential.&rdquo;
              </h3>
              <p className="text-sm sm:text-base text-[#F7F2E9]/70 leading-relaxed">
                Founded with a mission to bridge the gap between classroom teaching and individual comprehension, Yattra Tutors has empowered over <strong className="text-[#F7F2E9]">48,500+ students across {city.name}</strong>. We recognize that every student learns at a different velocity. Classroom lectures often move too quickly for foundational topics in Class 9-10 Science or Class 11-12 Mathematics. By deploying top-vetted private home tutors across residential hubs like <em>Shastri Nagar, Saket, Pallavpuram, Kankerkhera, and Ganga Nagar</em>, we deliver structured, safe, and stress-free academic growth directly to your home.
              </p>
              <div className="flex flex-wrap items-center gap-6 pt-4 text-xs sm:text-sm text-[#F7F2E9]/55">
                <div>
                  <span className="block font-semibold text-[#F7F2E9] text-base">{city.establishedYear}</span>
                  <span>Established Year</span>
                </div>
                <div className="w-px h-8 bg-[#F7F2E9]/15" />
                <div>
                  <span className="block font-semibold text-[#F7F2E9] text-base">12,450+</span>
                  <span>Registered Tutors in {city.name}</span>
                </div>
                <div className="w-px h-8 bg-[#F7F2E9]/15" />
                <div>
                  <span className="block font-semibold text-[#F7F2E9] text-base">4.9 / 5.0</span>
                  <span>Google Parent Rating</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-[#0E211C] border border-[#F7F2E9]/10 rounded-xl text-center space-y-4">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                alt={`Yattra Tutors Founder and Academic Operations Director in ${city.name}`}
                title={`Yattra Tutors Educational Team ${city.name}`}
                loading="lazy"
                width="96"
                height="96"
                className="w-24 h-24 rounded-full object-cover border-2 border-[#D79A2C]/40"
              />
              <div>
                <h4 className="font-semibold text-[#F7F2E9] text-base">Academic Directorate</h4>
                <p className="text-xs text-[#D79A2C]">Yattra Tutors India Learning Committee</p>
              </div>
              <p className="text-xs text-[#F7F2E9]/55 italic">
                &ldquo;Ensuring background safety, subject expertise, and regular test performance monitoring across all {city.name} localities.&rdquo;
              </p>
            </div>
          </div>

          {/* 7-Step Verification Workflow — ledger */}
          <div className="pt-8 border-t border-[#F7F2E9]/10">
            <h4 className="text-lg font-semibold text-[#F7F2E9] mb-6 text-center" style={{ fontFamily: "'Lora', serif" }}>
              Our Rigorous 7-Step Tutor Selection Process
            </h4>
            <div className="divide-y sm:divide-y-0 sm:divide-x divide-[#F7F2E9]/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7">
              {[
                { step: "01", title: "Aadhaar & ID", desc: "Government KYC Verification" },
                { step: "02", title: "Degrees", desc: "Original Marksheet Audit" },
                { step: "03", title: "Police Clearance", desc: "Criminal Background Check" },
                { step: "04", title: "Written Exam", desc: "Subject Knowledge Test" },
                { step: "05", title: "Demo Class", desc: "Pedagogy & Teaching Style" },
                { step: "06", title: "Soft Skills", desc: "Communication & Punctuality" },
                { step: "07", title: "Continuous Review", desc: "Weekly Parent Feedback" },
              ].map((item, idx) => (
                <div key={`step-${idx}`} className="p-3.5 text-center space-y-1">
                  <span className="text-xs font-semibold text-[#D79A2C]">Step {item.step}</span>
                  <h5 className="text-xs sm:text-sm font-semibold text-[#F7F2E9]">{item.title}</h5>
                  <p className="text-[11px] text-[#F7F2E9]/50">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const WhyYattraTutors = WhyTutvex;
export default WhyTutvex;
