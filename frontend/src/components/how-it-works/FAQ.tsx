import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { lora, dmSans } from "@/lib/fonts";

const faqs = [
  { q: "Is Yattra Tutors free for parents?", a: "Yes. Parents can create an account, search tutors, compare profiles, and book demo classes for free. Payment is required only after finalizing a tutor." },
  { q: "How does Yattra Tutors verify tutors?", a: "All tutors go through phone verification, profile screening, subject expertise review, and interview before approval." },
  { q: "How do tutors get students?", a: "Approved tutors receive student requests based on subject, class, and location through the Yattra Tutors dashboard." },
  { q: "How are tutor payments managed?", a: "Tutors can track earnings, payments, and payout history transparently from their dashboard." },
  { q: "Is Yattra Tutors safe and reliable?", a: "Yes. Yattra Tutors verifies both parents and tutors to ensure a secure and trusted learning experience." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={`${dmSans.className}`}>
      {/* HEADER */}
      <div className="max-w-xl mx-auto text-center mb-10">
        <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-3`}>Common questions</p>
        <h2 className={`${lora.className} text-2xl sm:text-3xl font-semibold text-[#1C2B22]`}>
          Frequently asked questions
        </h2>
        <p className="mt-3 text-sm text-[#58646C]">
          Common questions asked by parents and tutors on Yattra Tutors
        </p>
      </div>

      {/* FAQ LEDGER */}
      <div className="max-w-2xl mx-auto rounded-lg border border-[#1C2B22]/10 bg-white divide-y divide-[#1C2B22]/10">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.q}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex justify-between items-center gap-4 px-6 py-4 text-left"
              >
                <span className="font-medium text-sm sm:text-base text-[#1C2B22]">{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-[#D79A2C] transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-4 text-sm text-[#58646C] leading-relaxed">{faq.a}</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
