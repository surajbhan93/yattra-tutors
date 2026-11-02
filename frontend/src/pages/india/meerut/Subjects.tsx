import React from "react";
import { city } from "@/components/seoIndia/locations/up/meerut";

export const Subjects: React.FC = () => {
  const subjectCategories = [
    {
      title: "Mathematics Home Tutor in Meerut",
      badge: "Highest Demand",
      description: `Expert 1-on-1 Math tutors in ${city.name} for Class 1 to 12, CBSE, ICSE, and UP Board. Specialized focus on algebra, geometry, trigonometry, calculus, and board exam model paper drills.`,
      tags: ["Class 10 Maths", "Class 12 Maths", "IIT-JEE Maths", "Vedic Maths"],
    },
    {
      title: "Science & Physics / Chemistry / Biology",
      badge: "Top Rated Tutors",
      description: `Comprehensive home tuition in ${city.name} covering Physics numericals, Organic & Inorganic Chemistry, and NEET Biology with visual note-making and concept clarity.`,
      tags: ["Class 10 Science", "Class 12 Physics", "Organic Chem", "NEET Biology"],
    },
    {
      title: "CBSE & ICSE Board Home Tutor Meerut",
      badge: "Board Specialists",
      description: `Dedicated home tutors familiar with the latest CBSE 2026 pattern, Competency-Based Questions (CBQs), and ICSE Council curriculum for top percentage scores.`,
      tags: ["CBSE Board", "ICSE Board", "UP Board (English)", "Sample Papers"],
    },
    {
      title: "JEE Main & NEET Medical Entrance",
      badge: "Rank Booster",
      description: `Mentorship by IITians and medical specialists in ${city.name}. In-depth doubt resolution, formula applications, and previous 15-year question bank practice at home.`,
      tags: ["JEE Physics", "JEE Maths", "NEET Biology", "NEET Chemistry"],
    },
    {
      title: "Commerce, Accountancy & Economics",
      badge: "Commerce Hub",
      description: `Qualified CA-foundation & M.Com private tutors for Class 11 & 12 Accountancy, Economics, Business Studies, and Financial Management in ${city.name}.`,
      tags: ["Accountancy", "Economics", "Business Studies", "Applied Maths"],
    },
    {
      title: "Female Home Tutor in Meerut",
      badge: "Parent Preferred",
      description: `Empathetic, highly qualified female home tutors available across all ${city.name} localities for young learners, girls' education, primary, and secondary school subjects.`,
      tags: ["All Subjects (Class 1-8)", "Lady Tutors", "Primary Care", "Safe Mentorship"],
    },
    {
      title: "English & Foreign Languages",
      badge: "Grammar & Speaking",
      description: `Improve English grammar, literature comprehension, answer writing skills, and spoken fluency for students across CBSE, ICSE, and international boards in ${city.name}.`,
      tags: ["English Literature", "Grammar", "Spoken English", "French / German"],
    },
    {
      title: "Coding, Computers & Python",
      badge: "Future Skills",
      description: `One-on-one computer science tuition in ${city.name} covering Python programming, Java, C++, Scratch, Web Development, and CBSE Computer Applications (Code 165/083).`,
      tags: ["Python Coding", "Java ICSE", "Computer Apps", "Web Basics"],
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#132B22] text-[#F7F2E9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-medium text-[#D79A2C]">Comprehensive Subject Coverage</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#F7F2E9]" style={{ fontFamily: "'Lora', serif" }}>
            Home Tuition in {city.name} for Every Class & Subject
          </h2>
          <p className="text-base sm:text-lg text-[#F7F2E9]/70">
            From primary school foundations to senior secondary board excellence and entrance exam coaching, Yattra Tutors provides specialized subject teachers right at your residence.
          </p>
        </div>

        {/* Subject Ledger */}
        <div className="divide-y divide-[#F7F2E9]/10 border-y border-[#F7F2E9]/10">
          {subjectCategories.map((item, idx) => (
            <div key={`subject-${idx}`} className="py-6 grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-3">
              <div className="space-y-1.5">
                <span className="text-[11px] font-medium text-[#D79A2C]">{item.badge}</span>
                <h3 className="text-lg font-semibold text-[#F7F2E9]">{item.title}</h3>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-[#F7F2E9]/70 leading-relaxed">{item.description}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#F7F2E9]/45">
                  {item.tags.map((tag, tIdx) => (
                    <span key={`tag-${idx}-${tIdx}`}>{tag}{tIdx < item.tags.length - 1 ? " ·" : ""}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Class-wise Breakdown Ledger */}
        <div className="border border-[#F7F2E9]/10 rounded-xl p-6 sm:p-8">
          <h3 className="text-lg sm:text-xl font-semibold text-[#F7F2E9] mb-4 text-center" style={{ fontFamily: "'Lora', serif" }}>
            Classes We Cover in {city.name} Home Tuition
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 divide-x divide-y sm:divide-y-0 divide-[#F7F2E9]/10">
            {[
              { label: "Class 1 to 5", detail: "All Primary Subjects" },
              { label: "Class 6 to 8", detail: "Maths, Science, English" },
              { label: "Class 9 & 10", detail: "Board Foundations" },
              { label: "Class 11 & 12", detail: "PCM / PCB / Commerce" },
              { label: "JEE Main / Adv", detail: "IIT Entrance Prep" },
              { label: "NEET Medical", detail: "Biology Specialist" },
            ].map((cls, cIdx) => (
              <div key={`cls-${cIdx}`} className="p-3 text-center">
                <span className="block font-semibold text-[#D79A2C] text-sm">{cls.label}</span>
                <span className="text-[11px] text-[#F7F2E9]/50">{cls.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subjects;
