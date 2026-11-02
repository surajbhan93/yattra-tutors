export default function CareerSection() {
  return (
    <section id="careers" className="max-w-2xl mx-auto px-4 py-20 text-center">
      <p className="italic text-sm text-[#8a5f18] mb-3" style={{ fontFamily: "Lora, serif" }}>
        Join the team
      </p>
      <h2 className="text-3xl font-semibold text-[#1C2B22] mb-4" style={{ fontFamily: "Lora, serif" }}>
        Careers at Yattra Tutors
      </h2>
      <p className="text-[#58646C] mb-7">Join us in shaping the future of education.</p>

      <button className="rounded-md bg-[#D79A2C] px-6 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]">
        View open positions
      </button>
    </section>
  );
}
