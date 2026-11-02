import React from "react";
import { city } from "@/components/seoIndia/locations/up/meerut";

export const Fees: React.FC = () => {
  const feeStructure = [
    {
      category: "Primary School (Class 1 - 5)",
      frequency: "5 Days / Week",
      hourlyRate: "₹250 - ₹350 / hr",
      monthlyFee: "₹2,500 - ₹4,000 / month",
      popularIn: "Shastri Nagar, Saket, Rajendra Nagar",
      features: ["All subjects coverage", "Daily homework support", "Base building"],
    },
    {
      category: "Middle School (Class 6 - 8)",
      frequency: "5 Days / Week",
      hourlyRate: "₹350 - ₹450 / hr",
      monthlyFee: "₹3,500 - ₹5,500 / month",
      popularIn: "Pallavpuram, Modipuram, Kankerkhera",
      features: ["Maths & Science focus", "Weekly surprise tests", "Conceptual clarity"],
    },
    {
      category: "Secondary (Class 9 & 10 Board)",
      frequency: "5-6 Days / Week",
      hourlyRate: "₹450 - ₹600 / hr",
      monthlyFee: "₹5,000 - ₹8,000 / month",
      popularIn: "Ganga Nagar, Central Market, Abu Lane",
      features: ["CBSE / ICSE board paper drills", "Competency questions", "1-on-1 revision"],
    },
    {
      category: "Senior Secondary (Class 11 & 12 PCM/PCB)",
      frequency: "4-5 Days / Week",
      hourlyRate: "₹600 - ₹900 / hr",
      monthlyFee: "₹7,000 - ₹12,000 / month",
      popularIn: "Garh Road, Defense Colony, University Road",
      features: ["Physics, Chem, Maths/Bio", "Lab practical guidance", "Board exam focus"],
    },
    {
      category: "Competitive Exams (JEE Main & NEET)",
      frequency: "Flexible / 6 Days",
      hourlyRate: "₹800 - ₹1,200 / hr",
      monthlyFee: "₹10,000 - ₹15,000 / month",
      popularIn: "Medical College Area, Roorkee Road",
      features: ["IITian / Doctor faculty", "Advanced problem sets", "Speed & accuracy focus"],
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#0E211C] text-[#F7F2E9] border-t border-b border-[#F7F2E9]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-medium text-[#D79A2C]">Transparent Pricing Structure</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#F7F2E9]" style={{ fontFamily: "'Lora', serif" }}>
            Home Tuition Fees in {city.name} ({new Date().getFullYear()})
          </h2>
          <p className="text-base sm:text-lg text-[#F7F2E9]/70">
            Yattra Tutors maintains 100% transparent and affordable home tuition fee structures across all {city.name} localities with no hidden agent fees or registration charges.
          </p>
        </div>

        {/* Pricing Table */}
        <div className="overflow-x-auto rounded-xl border border-[#F7F2E9]/10">
          <table className="w-full text-left text-sm text-[#F7F2E9]/80">
            <thead className="text-[#F7F2E9] text-xs tracking-wide border-b border-[#F7F2E9]/15">
              <tr>
                <th scope="col" className="py-4 px-6 font-semibold">Academic Level</th>
                <th scope="col" className="py-4 px-6 font-semibold">Weekly Frequency</th>
                <th scope="col" className="py-4 px-6 font-semibold text-[#D79A2C]">Approx Hourly Rate</th>
                <th scope="col" className="py-4 px-6 font-semibold text-[#D79A2C]">Estimated Monthly Fee</th>
                <th scope="col" className="py-4 px-6 font-semibold">Popular Areas in {city.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F7F2E9]/10">
              {feeStructure.map((item, idx) => (
                <tr key={`fee-${idx}`} className="hover:bg-[#132B22] transition-colors">
                  <td className="py-5 px-6 font-semibold text-[#F7F2E9]">
                    {item.category}
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {item.features.map((feat, fIdx) => (
                        <span key={`feat-${fIdx}`} className="text-[10px] text-[#F7F2E9]/50">
                          {feat}{fIdx < item.features.length - 1 ? " ·" : ""}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-5 px-6">{item.frequency}</td>
                  <td className="py-5 px-6 font-medium text-[#D79A2C]">{item.hourlyRate}</td>
                  <td className="py-5 px-6 font-semibold text-[#F7F2E9]">{item.monthlyFee}</td>
                  <td className="py-5 px-6 text-xs text-[#F7F2E9]/55">{item.popularIn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Factors Affecting Fees — ledger list */}
        <div className="divide-y divide-[#F7F2E9]/10 border-y border-[#F7F2E9]/10">
          <div className="py-5 grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-2">
            <h3 className="font-semibold text-[#F7F2E9] text-base">Tutor Qualification & Experience</h3>
            <p className="text-sm text-[#F7F2E9]/65 leading-relaxed">
              Senior teachers, school faculties, and IITians/Medicals command higher hourly rates compared to university graduate tutors.
            </p>
          </div>
          <div className="py-5 grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-2">
            <h3 className="font-semibold text-[#F7F2E9] text-base">Class Duration & Frequency</h3>
            <p className="text-sm text-[#F7F2E9]/65 leading-relaxed">
              Sessions ranging from 1 hour to 2 hours per day, 3 to 6 days a week, adjust monthly pricing proportionately.
            </p>
          </div>
          <div className="py-5 grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-2">
            <h3 className="font-semibold text-[#F7F2E9] text-base">Board & Exam Level</h3>
            <p className="text-sm text-[#F7F2E9]/65 leading-relaxed">
              ICSE & Senior Secondary Board syllabi require specialized test series preparation, influencing monthly tuition packages.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center bg-[#132B22] border border-[#D79A2C]/25 rounded-xl p-8 space-y-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-[#F7F2E9]" style={{ fontFamily: "'Lora', serif" }}>
            Need a Customized Home Tuition Fee Quote in {city.name}?
          </h3>
          <p className="text-sm text-[#F7F2E9]/70 max-w-2xl mx-auto">
            Contact our {city.name} counselor to get an exact tuition fee estimate based on your specific locality, subjects, and schedule.
          </p>
          <a
            href={`tel:${city.contact.phone}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-[#0E211C] bg-[#D79A2C] hover:bg-[#c4891f] transition-colors text-sm"
          >
            Get Custom Fee Quote: {city.contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Fees;
