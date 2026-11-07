"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ParentDashboardLayout from "@/layouts/ParentDashboardLayout";
import apiClient from "@/lib/apiClient";
import { motion } from "framer-motion";
import {
  User,
  BookOpen,
  GraduationCap,
  CreditCard,
} from "lucide-react";
import { lora } from "@/lib/fonts";

export default function StudentTutorsPage() {
  const [tutors, setTutors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await apiClient.get("/auth/parent/my-tutors");
        setTutors(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch tutors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  return (
    <ParentDashboardLayout>
      <div className="min-h-screen p-4 md:p-6">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-md border border-[#1C2B22]/10 bg-[#0E211C] p-5 text-[#F7F2E9]"
        >
          <h1 className={`${lora.className} text-xl font-semibold`}>My tutors</h1>
          <p className="mt-1 text-sm text-[#AAB6A2]">
            View assigned tutors, linked students, and payment status at one place.
          </p>
        </motion.div>

        {/* ================= CONTENT ================= */}
        {loading && (
          <div className="rounded-md border border-[#1C2B22]/10 bg-white p-6 text-sm text-[#58646C]">
            Loading tutors...
          </div>
        )}

        {!loading && tutors.length === 0 && (
          <div className="rounded-md border border-[#1C2B22]/10 bg-white p-6 text-sm text-[#58646C]">
            No tutors assigned yet.
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tutors.map((item) => (
            <motion.div
              key={item.requestId}
              whileHover={{ y: -2 }}
              className="rounded-md border border-[#1C2B22]/10 bg-white p-5 transition-transform"
            >
              {/* ================= TUTOR PROFILE ================= */}
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F2E9] text-[#8a5f18]">
                  <User className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-base font-semibold text-[#1C2B22]">
                    {item.tutor?.fullName ??
                      "Tutor not available"}
                  </p>
                  <p className="text-xs text-[#58646C]">
                    Tutor
                  </p>
                </div>
              </div>

              {/* SUBJECTS */}
              <div className="mt-3 flex items-start gap-2 text-sm text-[#1C2B22]">
                <BookOpen className="mt-0.5 h-4 w-4 text-[#58646C]" />
                <span>
                  <b>Subjects:</b>{" "}
                  {item.tutor?.subjects?.join(", ") ??
                    "N/A"}
                </span>
              </div>

              {/* STUDENT */}
              <div className="mt-3 flex items-start gap-2 text-sm text-[#1C2B22]">
                <GraduationCap className="mt-0.5 h-4 w-4 text-[#58646C]" />
                {item.student ? (
                  <span>
                    <b>Student:</b>{" "}
                    {item.student.full_name} (Class{" "}
                    {item.student.class_grade})
                  </span>
                ) : (
                  <span className="italic text-[#9AA3AB]">
                    Student not linked
                  </span>
                )}
              </div>

              {/* ================= ACTIONS ================= */}
              <div className="mt-5 flex items-center justify-between">
                {item.tutor?._id ? (
                  <Link
                    href={`/tutors/${item.tutor._id}`}
                    className="rounded-md bg-[#0E211C] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#132B22]"
                  >
                    View tutor
                  </Link>
                ) : (
                  <span className="text-sm italic text-[#9AA3AB]">
                    Tutor unavailable
                  </span>
                )}

                {item.paymentStatus === "paid" ? (
                  <span className="flex items-center gap-1 text-sm font-medium text-[#3f8a5f]">
                    <CreditCard className="h-4 w-4" />
                    Paid
                  </span>
                ) : (
                  <Link
                    href={`/parent/payments?requestId=${item.requestId}`}
                    className="rounded-md bg-[#D79A2C] px-3 py-1.5 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
                  >
                    Pay now
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </ParentDashboardLayout>
  );
}
