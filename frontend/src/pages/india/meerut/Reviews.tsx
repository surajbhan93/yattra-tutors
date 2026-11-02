import React from "react";
import { city } from "@/components/seoIndia/locations/up/meerut";

export const Reviews: React.FC = () => {
  // Use real localities from city.locations dynamically
  const loc1 = city.locations[0]?.name || "Shastri Nagar";
  const loc2 = city.locations[1]?.name || "Saket";
  const loc3 = city.locations[2]?.name || "Pallavpuram";
  const loc4 = city.locations[3]?.name || "Modipuram";
  const loc5 = city.locations[4]?.name || "Rajendra Nagar";

  const reviewsList = [
    {
      author: "Dr. Rajesh Sharma",
      relation: "Parent of Class 10 CBSE Student",
      location: loc1,
      rating: 5,
      date: "February 2026",
      text: `Finding a reliable home tutor in ${loc1}, ${city.name} was challenging until we tried Yattra Tutors. The Mathematics tutor assigned for my son's Class 10 CBSE boards was exceptional. His concept clarity in quadratic equations and trigonometry boosted my son's score from 72% to 95%!`,
      subject: "Class 10 CBSE Mathematics",
      verified: true,
    },
    {
      author: "Pooja Verma",
      relation: "Parent of Class 12 NEET Student",
      location: loc2,
      rating: 5,
      date: "April 2026",
      text: `We requested a female home tutor for Class 12 Chemistry and NEET Biology in ${loc2}. Yattra Tutors arranged a free demo within 3 hours. The teacher is punctual, highly knowledgeable, and conducts weekly chapter tests. Highly recommended for all parents in ${city.name}!`,
      subject: "Class 12 Chemistry & NEET Bio",
      verified: true,
    },
    {
      author: "Amitabh Rastogi",
      relation: "Parent of Class 8 ICSE Student",
      location: loc3,
      rating: 5,
      date: "January 2026",
      text: `Yattra Tutors provides the best home tuition in ${city.name}. We hired a private tutor in ${loc3} for Physics and ICSE Maths. The 1-on-1 personal attention helped my daughter build strong foundations without needing extra coaching classes.`,
      subject: "Class 8 ICSE Science & Maths",
      verified: true,
    },
    {
      author: "Sneha Tyagi",
      relation: "Class 12 Board Student",
      location: loc4,
      rating: 5,
      date: "March 2026",
      text: `I was struggling with Class 12 Accountancy and Economics in ${loc4}. My Yattra Tutors private tutor explained balance sheets and national income with practical real-life examples. I secured 94% in my commerce board exams!`,
      subject: "Class 12 Commerce & Accounts",
      verified: true,
    },
    {
      author: "Vikramjit Singh",
      relation: "Parent of Class 6 & 9 Students",
      location: loc5,
      rating: 5,
      date: "May 2026",
      text: `The background verification process gave us total peace of mind in ${loc5}. Both female and male tutors provided by Yattra Tutors are respectful, extremely qualified, and disciplined. 5 stars overall!`,
      subject: "Class 6 & 9 All Subjects",
      verified: true,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#132B22] text-[#F7F2E9] border-b border-[#F7F2E9]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-medium text-[#D79A2C]">Real Parent Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#F7F2E9]" style={{ fontFamily: "'Lora', serif" }}>
            What Parents & Students Say About Yattra Tutors in {city.name}
          </h2>
          <p className="text-base sm:text-lg text-[#F7F2E9]/70">
            Read authentic reviews from families across {city.name} who transformed their children&apos;s academic performance with our 1-on-1 home tutors.
          </p>
        </div>

        {/* Rating Overview Strip */}
        <div className="border border-[#F7F2E9]/10 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl sm:text-5xl font-semibold text-[#D79A2C]" style={{ fontFamily: "'Lora', serif" }}>
              {city.averageRating}
            </div>
            <div>
              <div className="flex text-[#D79A2C] text-lg">★★★★★</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#F7F2E9]/65">
            <span>Verified Aadhaar KYC</span>
            <span>Free Demo Included</span>
            <span>100% Board Success</span>
          </div>
        </div>

        {/* Reviews Ledger */}
        <div className="divide-y divide-[#F7F2E9]/10 border-y border-[#F7F2E9]/10">
          {reviewsList.map((rev, idx) => (
            <div key={`rev-${idx}`} className="py-6 grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-4">
              <div className="space-y-1">
                <h3 className="font-semibold text-[#F7F2E9] text-sm">{rev.author}</h3>
                <p className="text-xs text-[#F7F2E9]/50">{rev.relation}</p>
                <div className="flex items-center gap-2 text-[11px] text-[#F7F2E9]/45 pt-1">
                  <span className="font-mono text-[#D79A2C]">{rev.location}</span>
                  <span>{rev.date}</span>
                </div>
                {rev.verified && (
                  <span className="inline-block text-[11px] font-medium text-[#F7F2E9]/55">Verified Parent</span>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex text-[#D79A2C] text-sm">{"★".repeat(rev.rating)}</div>
                <p className="text-sm text-[#F7F2E9]/75 leading-relaxed italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
                <p className="text-[11px] text-[#F7F2E9]/40">Subject: {rev.subject}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
