import { ShieldCheck, Users, BookOpen, Wallet, BarChart3, Star } from "lucide-react";
import { Lora, DM_Sans } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"], style: ["italic", "normal"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

const PARENT_POINTS = [
  { icon: ShieldCheck, strong: "Verified tutors:", text: "every tutor is phone-verified, interviewed, and approved by Yattra Tutors experts." },
  { icon: BookOpen, strong: "All subjects & boards:", text: "Maths, Science, Commerce, Languages for CBSE, ICSE & State Boards." },
  { icon: Star, strong: "Replacement guarantee:", text: "not satisfied? We assign another verified tutor — no stress." },
  { icon: BarChart3, strong: "Parent dashboard:", text: "track attendance, performance reports, test scores, and payments." },
];

const TUTOR_POINTS = [
  { icon: Users, strong: "Real student leads:", text: "get matched with students based on subject, class, and location." },
  { icon: Wallet, strong: "Transparent payments:", text: "track earnings, payouts, and payment history from your dashboard." },
  { icon: ShieldCheck, strong: "Professional growth:", text: "build credibility with verified profiles and long-term students." },
  { icon: BarChart3, strong: "Tutor dashboard:", text: "manage assignments, students taught, availability, and income easily." },
];

export default function WhyYattraTutors() {
  return (
    <section className={`relative bg-[#0E211C] px-6 sm:px-10 py-14 sm:py-20 ${dmSans.className}`}>
      {/* HEADER */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <p className={`${lora.className} italic text-sm text-[#D79A2C] mb-3`}>Why Yattra Tutors</p>
        <h2 className={`${lora.className} text-2xl sm:text-3xl md:text-4xl font-semibold text-[#F7F2E9]`}>
          Built for both sides of the classroom
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#AAB6A2]">
          A trusted school-tutoring platform for parents seeking reliable
          teachers, and tutors looking to grow their teaching career — in
          one secure ecosystem.
        </p>
      </div>

      {/* TWO-COLUMN LEDGER */}
      <div className="max-w-5xl mx-auto grid gap-8 sm:gap-10 lg:grid-cols-2">
        <div>
          <h3 className={`${lora.className} text-lg font-semibold text-[#F7F2E9] mb-4 pb-3 border-b border-[#F7F2E9]/10`}>
            For parents & students
          </h3>
          <ul className="divide-y divide-[#F7F2E9]/[.08]">
            {PARENT_POINTS.map((p) => (
              <li key={p.strong} className="flex gap-3 py-4">
                <p.icon size={16} className="text-[#D79A2C] mt-1 shrink-0" />
                <span className="text-sm text-[#AAB6A2] leading-relaxed">
                  <strong className="text-[#F7F2E9]">{p.strong}</strong> {p.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={`${lora.className} text-lg font-semibold text-[#F7F2E9] mb-4 pb-3 border-b border-[#F7F2E9]/10`}>
            For tutors
          </h3>
          <ul className="divide-y divide-[#F7F2E9]/[.08]">
            {TUTOR_POINTS.map((p) => (
              <li key={p.strong} className="flex gap-3 py-4">
                <p.icon size={16} className="text-[#D79A2C] mt-1 shrink-0" />
                <span className="text-sm text-[#AAB6A2] leading-relaxed">
                  <strong className="text-[#F7F2E9]">{p.strong}</strong> {p.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* TRUST FOOTER */}
      <p className="max-w-2xl mx-auto mt-12 text-center text-sm text-[#7C9484]">
        Yattra Tutors bridges the gap between parents and quality teachers by
        ensuring trust, transparency, and results — making learning
        stress-free and effective for everyone.
      </p>
    </section>
  );
}
