import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import { Lora } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"] });

export default function FeaturedTutors() {
  const [tutors, setTutors] = useState<any[]>([]);

  useEffect(() => {
    apiClient
      .get("/api/v1/tutors/featured")
      .then((res) => setTutors(res.data.data))
      .catch(console.error);
  }, []);

  return (
    <section className="mt-14">
      <h2 className={`${lora.className} mb-4 text-xl font-semibold text-[#1C2B22]`}>Featured tutors</h2>

      <div className="divide-y divide-[#1C2B22]/10 rounded-lg border border-[#1C2B22]/10 bg-white">
        {tutors.map((t) => (
          <div key={t._id} className="flex items-center justify-between p-4">
            <h3 className="font-semibold text-[#1C2B22]">{t.fullName}</h3>
            <p className="text-sm text-[#58646C]">
              ★ {t.rating} · {t.profileViews} views
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
