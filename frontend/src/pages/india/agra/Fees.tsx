import React from "react";
import { Lora, DM_Sans } from "next/font/google";
import { city } from "@/components/seoIndia/locations/up/agra";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600", "700"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const Fees: React.FC = () => {
  const feeStructure = [
    {
      category: "Primary School (Class 1 - 5)",
      frequency: "5 Days / Week",
      hourlyRate: "₹250 - ₹350 / hr",
      monthlyFee: "₹2,500 - ₹4,000 / month",
      popularIn: "Kamla Nagar, Dayalbagh, Civil Lines",
      features: ["All subjects coverage", "Daily homework support", "Base building"],
    },
    {
      category: "Middle School (Class 6 - 8)",
      frequency: "5 Days / Week",
      hourlyRate: "₹350 - ₹450 / hr",
      monthlyFee: "₹3,500 - ₹5,500 / month",
      popularIn: "Sadar Bazaar, Shahganj, Bodla",
      features: ["Maths & Science focus", "Weekly surprise tests", "Conceptual clarity"],
    },
    {
      category: "Secondary (Class 9 & 10 Board)",
      frequency: "5-6 Days / Week",
      hourlyRate: "₹450 - ₹600 / hr",
      monthlyFee: "₹5,000 - ₹8,000 / month",
      popularIn: "Sikandra, Khandari, Lohamandi",
      features: ["CBSE / ICSE / UP board paper drills", "Competency questions", "1-on-1 revision"],
    },
    {
      category: "Senior Secondary (Class 11 & 12 PCM/PCB)",
      frequency: "4-5 Days / Week",
      hourlyRate: "₹600 - ₹900 / hr",
      monthlyFee: "₹7,000 - ₹12,000 / month",
      popularIn: "DEI Campus, Agra University, Taj Ganj",
      features: ["Physics, Chem, Maths/Bio", "Lab practical guidance", "Board exam focus"],
    },
    {
      category: "Competitive Exams (JEE Main & NEET)",
      frequency: "Flexible / 6 Days",
      hourlyRate: "₹800 - ₹1,200 / hr",
      monthlyFee: "₹10,000 - ₹15,000 / month",
      popularIn: "Anand Engg College Area, Trans Yamuna",
      features: ["IITian / Doctor faculty", "Advanced problem sets", "Speed & accuracy focus"],
    },
  ];

  return (
    <section className={`py-16 sm:py-24 bg-[#15302A] text-[#F7F2E9] border-t border-b border-[#2B4038] ${dmSans.className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs sm:text-sm font-bold italic text-[#D79A2C]">
            Transparent Pricing Structure
          </span>
          <h2 className={`text-3xl sm:text-4xl font-semibold text-[#F7F2E9] ${lora.className}`}>
            Home Tuition Fees in {city.name} ({new Date().getFullYear()})
          </h2>
          <p className="text-base sm:text-lg text-[#AAB6A2]">
            Yattra Tutors maintains 100% transparent and affordable home tuition fee structures across all {city.name} localities with no hidden agent fees or registration charges.
          </p>
        </div>

        {/* Pricing Table (Responsive Layout) */}
        <div className="overflow-x-auto rounded-2xl border border-[#2B4038] bg-[#132B22] shadow-2xl">
          <table className="w-full text-left text-sm text-[#AAB6A2]">
            <thead className="bg-[#0E211C] text-[#F7F2E9] uppercase text-xs tracking-wider border-b border-[#2B4038]">
              <tr>
                <th scope="col" className="py-4 px-6 font-bold text-[#F7F2E9]">Academic Level</th>
                <th scope="col" className="py-4 px-6 font-bold text-[#F7F2E9]">Weekly Frequency</th>
                <th scope="col" className="py-4 px-6 font-bold text-[#D79A2C]">Approx Hourly Rate</th>
                <th scope="col" className="py-4 px-6 font-bold text-[#D79A2C]">Estimated Monthly Fee</th>
                <th scope="col" className="py-4 px-6 font-bold text-[#F7F2E9]">Popular Areas in {city.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2B4038]">
              {feeStructure.map((item, idx) => (
                <tr key={`fee-agra-${idx}`} className="hover:bg-[#0E211C]/50 transition-colors">
                  <td className="py-5 px-6 font-bold text-[#F7F2E9]">
                    {item.category}
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.features.map((feat, fIdx) => (
                        <span key={`feat-agra-${fIdx}`} className="text-[10px] px-1.5 py-0.5 rounded bg-[#0E211C] text-[#9AA3AB]">
                          {feat}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-5 px-6 text-[#AAB6A2]">{item.frequency}</td>
                  <td className="py-5 px-6 font-semibold text-[#D79A2C]">{item.hourlyRate}</td>
                  <td className="py-5 px-6 font-bold text-[#D79A2C] text-base">{item.monthlyFee}</td>
                  <td className="py-5 px-6 text-xs text-[#9AA3AB]">{item.popularIn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Factors Affecting Fees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-[#132B22] border border-[#2B4038] rounded-xl p-5 space-y-2">
            <h3 className="font-bold text-[#F7F2E9] text-base">Tutor Qualification & Experience</h3>
            <p className="text-xs text-[#AAB6A2] leading-relaxed">
              Senior teachers, school faculties, and IITians/DEI alumni command higher hourly rates compared to university graduate tutors.
            </p>
          </div>

          <div className="bg-[#132B22] border border-[#2B4038] rounded-xl p-5 space-y-2">
            <h3 className="font-bold text-[#F7F2E9] text-base">Class Duration & Frequency</h3>
            <p className="text-xs text-[#AAB6A2] leading-relaxed">
              Sessions ranging from 1 hour to 2 hours per day, 3 to 6 days a week, adjust monthly pricing proportionately.
            </p>
          </div>

          <div className="bg-[#132B22] border border-[#2B4038] rounded-xl p-5 space-y-2">
            <h3 className="font-bold text-[#F7F2E9] text-base">Board & Exam Level</h3>
            <p className="text-xs text-[#AAB6A2] leading-relaxed">
              ICSE & Senior Secondary Board syllabi require specialized test series preparation, influencing monthly tuition packages.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center bg-[#132B22] border border-[#D79A2C]/30 rounded-2xl p-8 space-y-4">
          <h3 className={`text-xl sm:text-2xl font-semibold text-[#F7F2E9] ${lora.className}`}>
            Need a Customized Home Tuition Fee Quote in {city.name}?
          </h3>
          <p className="text-sm text-[#AAB6A2] max-w-2xl mx-auto">
            Contact our {city.name} counselor to get an exact tuition fee estimate based on your specific locality, subjects, and schedule.
          </p>
          <a
            href={`tel:${city.contact.phone}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-[#17261D] bg-[#D79A2C] hover:bg-[#c4891f] transition-colors text-sm uppercase tracking-wide"
          >
            Get Custom Fee Quote: {city.contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Fees;
