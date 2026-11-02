import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import AdminDashboardLayout from "@/components/admin-dashboard/AdminDashboardLayout";
import { Lora } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"] });

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  rating: number;
  message: string;
  image?: string;
  isApproved: boolean;
  isFeatured: boolean;
  date: string;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3010";

  const resolveImage = (path?: string) => {
    if (!path) return "/images/default-avatar.png";
    if (path.startsWith("http")) return path;
    return `${BACKEND_URL}${path}`;
  };

  const fetchTestimonials = async () => {
    setLoading(true);
    const res = await apiClient.get("/admin/testimonials");
    setTestimonials(res.data.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const approveTestimonial = async (id: string) => {
    await apiClient.patch(`/admin/testimonials/${id}/approve`);
    fetchTestimonials();
  };

  const featureTestimonial = async (id: string) => {
    await apiClient.patch(`/admin/testimonials/${id}/feature`);
    fetchTestimonials();
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await apiClient.delete(`/admin/testimonials/${id}`);
    fetchTestimonials();
  };

  return (
    <AdminDashboardLayout>
      <div className="bg-[#F7F2E9] p-6">
        {/* Page Heading */}
        <div className="mb-6 border-b border-[#1C2B22]/10 pb-5">
          <h1 className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>
            Testimonials
          </h1>
          <p className="mt-1 text-sm text-[#58646C]">
            Manage user testimonials (approve, feature, delete)
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-sm text-[#58646C]">Loading testimonials...</p>
        ) : (
          <div className="divide-y divide-[#1C2B22]/8 rounded-md border border-[#1C2B22]/10 bg-white">
            {testimonials.map((t) => (
              <div key={t._id} className="flex gap-4 p-5">
                {/* Image */}
                <img
                  src={resolveImage(t.image)}
                  alt={t.name}
                  className="h-11 w-11 flex-shrink-0 rounded-sm border border-[#1C2B22]/10 object-cover"
                />

                {/* Details */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#1C2B22]">{t.name}</p>
                      <p className="text-xs capitalize text-[#58646C]">{t.role}</p>
                    </div>

                    <span className="text-xs text-[#9AA3AB]">
                      {new Date(t.date).toLocaleDateString("en-IN")}
                    </span>
                  </div>

                  <p className="mt-2 text-sm italic text-[#58646C]">
                    "{t.message}"
                  </p>

                  <div className="mt-2 text-sm text-[#D79A2C]">
                    {"★".repeat(t.rating)}
                    {"☆".repeat(5 - t.rating)}
                  </div>

                  {/* Status */}
                  <div className="mt-3 flex gap-2 text-xs">
                    {!t.isApproved && (
                      <span className="rounded-sm border border-[#D79A2C]/40 px-2 py-0.5 font-medium text-[#8a5f18]">
                        Pending
                      </span>
                    )}
                    {t.isApproved && (
                      <span className="rounded-sm border border-[#3f8a5f]/40 px-2 py-0.5 font-medium text-[#3f8a5f]">
                        Approved
                      </span>
                    )}
                    {t.isFeatured && (
                      <span className="rounded-sm border border-[#1C2B22]/20 px-2 py-0.5 font-medium text-[#1C2B22]">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-4">
                    {!t.isApproved && (
                      <button
                        onClick={() => approveTestimonial(t._id)}
                        className="text-xs font-semibold text-[#3f8a5f] underline-offset-2 hover:underline"
                      >
                        Approve
                      </button>
                    )}

                    {t.isApproved && !t.isFeatured && (
                      <button
                        onClick={() => featureTestimonial(t._id)}
                        className="text-xs font-semibold text-[#1C2B22] underline-offset-2 hover:underline"
                      >
                        Feature
                      </button>
                    )}

                    <button
                      onClick={() => deleteTestimonial(t._id)}
                      className="text-xs font-semibold text-red-700 underline-offset-2 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}
