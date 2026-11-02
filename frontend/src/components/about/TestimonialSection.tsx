import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import AddTestimonialForm from "@/components/testimonials/AddTestimonialForm";
import { motion } from "framer-motion";
import { Lora, DM_Sans } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"], style: ["italic", "normal"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  rating: number;
  message: string;
  image?: string;
  date: string;
}

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3010";

  const resolveImage = (path?: string) => {
    if (!path) return "/images/default-avatar.png";
    if (path.startsWith("http")) return path;
    return `${BACKEND_URL}${path}`;
  };

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await apiClient.get("/testimonials");
        setTestimonials(res.data.data || []);
      } catch {
        setError("Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials" className={`relative py-16 sm:py-20 px-4 ${dmSans.className}`}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-3`}>In their words</p>
        <h2 className={`${lora.className} text-2xl sm:text-3xl font-semibold text-[#1C2B22]`}>What our users say</h2>
      </motion.div>

      {loading && <p className="text-center text-sm text-[#9AA3AB]">Loading testimonials...</p>}
      {!loading && error && <p className="text-center text-sm text-red-600">{error}</p>}
      {!loading && !error && testimonials.length === 0 && (
        <p className="text-center text-sm text-[#9AA3AB]">No testimonials yet.</p>
      )}

      <div className="max-w-3xl mx-auto rounded-lg border border-[#1C2B22]/10 bg-white divide-y divide-[#1C2B22]/10">
        {testimonials.map((t, index) => (
          <motion.div
            key={t._id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            viewport={{ once: true }}
            className="p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={resolveImage(t.image)}
                alt={t.name}
                className="w-11 h-11 rounded-full object-cover border border-[#1C2B22]/10"
              />
              <div>
                <p className="font-semibold text-sm text-[#1C2B22]">{t.name}</p>
                <p className="text-xs text-[#9AA3AB] capitalize">{t.role}</p>
              </div>
              <div className="ml-auto text-xs text-[#9AA3AB]">
                {new Date(t.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </div>
            </div>

            <p className={`${lora.className} italic text-sm text-[#58646C] leading-relaxed`}>&quot;{t.message}&quot;</p>

            <div className="mt-2.5 text-sm text-[#D79A2C]">
              {"★".repeat(t.rating)}
              <span className="text-[#1C2B22]/15">{"★".repeat(5 - t.rating)}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-14 max-w-3xl mx-auto">
        <AddTestimonialForm />
      </div>
    </section>
  );
}
