import React from "react";
import { Lora, DM_Sans } from "next/font/google";
import { city } from "@/components/seoIndia/locations/up/agra";

const lora = Lora({ subsets: ["latin"], weight: ["600", "700"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const Subjects: React.FC = () => {
  const subjectCategories = [
    {
      title: "Mathematics Home Tutor in Agra",
      badge: "Highest Demand",
      description: `Expert 1-on-1 Math tutors in ${city.name} for Class 1 to 12, CBSE, ICSE, and UP Board. Specialized focus on algebra, geometry, trigonometry, calculus, and board exam model paper drills.`,
      tags: ["Class 10 Maths", "Class 12 Maths", "IIT-JEE Maths", "Vedic Maths"],
      icon: "∑",
    },
    {
      title: "Science & Physics / Chemistry / Biology",
      badge: "Top Rated Tutors",
      description: `Comprehensive home tuition in ${city.name} covering Physics numericals, Organic & Inorganic Chemistry, and NEET Biology with visual note-making and concept clarity.`,
      tags: ["Class 10 Science", "Class 12 Physics", "Organic Chem", "NEET Biology"],
      icon: "⚛",
    },
    {
      title: "CBSE, ICSE & UP Board Home Tutor Agra",
      badge: "Board Specialists",
      description: `Dedicated home tutors familiar with the latest CBSE 2026 pattern, Competency-Based Questions (CBQs), ICSE Council curriculum, and UP Board exam techniques for top percentage scores.`,
      tags: ["CBSE Board", "ICSE Board", "UP Board", "Sample Papers"],
      icon: "📜",
    },
    {
      title: "JEE Main & NEET Medical Entrance",
      badge: "Rank Booster",
      description: `Mentorship by IITians, doctors, and DEI engineering graduates in ${city.name}. In-depth doubt resolution, formula applications, and previous 15-year question bank practice at home.`,
      tags: ["JEE Physics", "JEE Maths", "NEET Biology", "NEET Chemistry"],
      icon: "🎯",
    },
    {
      title: "Commerce, Accountancy & Economics",
      badge: "Commerce Hub",
      description: `Qualified CA-foundation & M.Com private tutors for Class 11 & 12 Accountancy, Economics, Business Studies, and Financial Management in ${city.name}.`,
      tags: ["Accountancy", "Economics", "Business Studies", "Applied Maths"],
      icon: "📊",
    },
    {
      title: "Female Home Tutor in Agra",
      badge: "Parent Preferred",
      description: `Empathetic, highly qualified female home tutors available across all ${city.name} localities for young learners, girls' education, primary, and secondary school subjects.`,
      tags: ["All Subjects (Class 1-8)", "Lady Tutors", "Primary Care", "Safe Mentorship"],
      icon: "👩‍🏫",
    },
    {
      title: "English & Foreign Languages",
      badge: "Grammar & Speaking",
      description: `Improve English grammar, literature comprehension, answer writing skills, and spoken fluency for students across CBSE, ICSE, and international boards in ${city.name}.`,
      tags: ["English Literature", "Grammar", "Spoken English", "French / German"],
      icon: "🗣",
    },
    {
      title: "Coding, Computers & Python",
      badge: "Future Skills",
      description: `One-on-one computer science tuition in ${city.name} covering Python programming, Java, C++, Scratch, Web Development, and CBSE Computer Applications (Code 165/083).`,
      tags: ["Python Coding", "Java ICSE", "Computer Apps", "Web Basics"],
      icon: "💻",
    },
  ];

  return (
    <section className={`py-16 sm:py-24 bg-[#15302A] text-[#F7F2E9] ${dmSans.className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs sm:text-sm font-bold italic text-[#D79A2C]">
            Comprehensive Subject Coverage
          </span>
          <h2 className={`text-3xl sm:text-4xl font-semibold text-[#F7F2E9] ${lora.className}`}>
            Home Tuition in {city.name} for Every Class & Subject
          </h2>
          <p className="text-base sm:text-lg text-[#AAB6A2]">
            From primary school foundations to senior secondary board excellence and entrance exam coaching, Yattra Tutors provides specialized subject teachers right at your residence.
          </p>
        </div>

        {/* Subject Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjectCategories.map((item, idx) => (
            <div
              key={`subject-agra-${idx}`}
              className="bg-[#0E211C] border border-[#2B4038] rounded-2xl p-6 flex flex-col justify-between hover:border-[#D79A2C]/40 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#132B22] border border-[#2B4038] flex items-center justify-center text-2xl text-[#D79A2C]">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#D79A2C]/10 text-[#D79A2C] border border-[#D79A2C]/20">
                    {item.badge}
                  </span>
                </div>

                <h3 className={`text-xl font-semibold text-[#F7F2E9] ${lora.className}`}>
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#AAB6A2] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Tag Pills */}
              <div className="pt-6 border-t border-[#2B4038] flex flex-wrap gap-1.5">
                {item.tags.map((tag, tIdx) => (
                  <span
                    key={`tag-agra-${idx}-${tIdx}`}
                    className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#132B22] text-[#AAB6A2] border border-[#2B4038]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Class-wise Breakdown Ribbon */}
        <div className="bg-[#0E211C] border border-[#2B4038] rounded-2xl p-6 sm:p-8">
          <h3 className={`text-lg sm:text-xl font-semibold text-[#F7F2E9] mb-4 text-center ${lora.className}`}>
            Classes We Cover in {city.name} Home Tuition
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
            {[
              { label: "Class 1 to 5", detail: "All Primary Subjects" },
              { label: "Class 6 to 8", detail: "Maths, Science, English" },
              { label: "Class 9 & 10", detail: "Board Foundations" },
              { label: "Class 11 & 12", detail: "PCM / PCB / Commerce" },
              { label: "JEE Main / Adv", detail: "IIT Entrance Prep" },
              { label: "NEET Medical", detail: "Biology Specialist" },
            ].map((cls, cIdx) => (
              <div key={`cls-agra-${cIdx}`} className="p-3 bg-[#132B22] border border-[#2B4038] rounded-xl">
                <span className="block font-bold text-[#D79A2C] text-sm">{cls.label}</span>
                <span className="text-[11px] text-[#9AA3AB]">{cls.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subjects;
