import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import apiClient from "@/lib/apiClient";
import ParentDashboardLayout from "@/layouts/ParentDashboardLayout";
import { motion } from "framer-motion";
import {
  ClipboardList,
  GraduationCap,
  User,
  CalendarDays,
} from "lucide-react";
import { lora } from "@/lib/fonts";

interface QuizItem {
  _id: string;
  status: "Pending" | "Submitted" | "Checked";
  due_date?: string;
  assigned_at: string;
  quiz: {
    title: string;
    subject: string;
    class_grade: string;
  };
  student: {
    full_name: string;
    class_grade: string;
  };
  tutor: {
    fullName: string;
    email?: string;
  };
}

export default function ParentQuizzesPage() {
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await apiClient.get("/parent/quizzes");
      setQuizzes(res.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch quizzes", err);
    } finally {
      setLoading(false);
    }
  };

  const statusStyle = (status: string) => {
    if (status === "Pending")
      return "bg-[#D79A2C]/15 text-[#8a5f18]";
    if (status === "Submitted")
      return "bg-[#3E5C83]/10 text-[#3E5C83]";
    if (status === "Checked")
      return "bg-[#1F6F54]/10 text-[#1F6F54]";
    return "bg-[#F7F2E9] text-[#58646C]";
  };

  return (
    <ParentDashboardLayout>
      <div className="min-h-screen p-4 md:p-6">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-md border border-[#1C2B22]/10 bg-[#0E211C] p-5 text-[#F7F2E9]"
        >
          <div className="flex items-center gap-3">
            <ClipboardList className="h-6 w-6 text-[#D79A2C]" />
            <div>
              <h1 className={`${lora.className} text-xl font-semibold`}>
                Assigned quizzes
              </h1>
              <p className="text-sm text-[#AAB6A2]">
                View quiz status, deadlines, and performance updates for your child. Ensure quizzes are
                attempted honestly and submitted on time.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ================= CONTENT ================= */}
        {loading ? (
          <div className="rounded-md border border-[#1C2B22]/10 bg-white p-6 text-sm text-[#58646C]">
            Loading quizzes...
          </div>
        ) : quizzes.length === 0 ? (
          <div className="rounded-md border border-[#1C2B22]/10 bg-white p-6 text-sm text-[#58646C]">
            No quizzes assigned yet.
          </div>
        ) : (
          <>
            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full rounded-md border border-[#1C2B22]/10 bg-white">
                <thead className="bg-[#F7F2E9] text-sm">
                  <tr>
                    <th className="p-3 text-left font-medium text-[#58646C]">Quiz</th>
                    <th className="p-3 text-left font-medium text-[#58646C]">Student</th>
                    <th className="p-3 text-left font-medium text-[#58646C]">Tutor</th>
                    <th className="p-3 text-left font-medium text-[#58646C]">Due</th>
                    <th className="p-3 text-left font-medium text-[#58646C]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {quizzes.map((q) => (
                    <tr
                      key={q._id}
                      onClick={() =>
                        router.push(`/parent/quizzes/${q._id}`)
                      }
                      className="cursor-pointer border-t border-[#1C2B22]/10 hover:bg-[#F7F2E9]/60"
                    >
                      <td className="p-3">
                        <p className="font-medium text-[#1C2B22]">
                          {q.quiz.title}
                        </p>
                        <p className="text-xs text-[#58646C]">
                          {q.quiz.subject} · Class{" "}
                          {q.quiz.class_grade}
                        </p>
                      </td>

                      <td className="p-3 text-sm text-[#1C2B22]">
                        {q.student.full_name}
                        <p className="text-xs text-[#58646C]">
                          Class {q.student.class_grade}
                        </p>
                      </td>

                      <td className="p-3 text-sm text-[#1C2B22]">
                        {q.tutor.fullName}
                        {q.tutor.email && (
                          <p className="text-xs text-[#58646C]">
                            {q.tutor.email}
                          </p>
                        )}
                      </td>

                      <td className="p-3 text-sm text-[#1C2B22]">
                        {q.due_date
                          ? new Date(
                              q.due_date
                            ).toLocaleDateString()
                          : "—"}
                      </td>

                      <td className="p-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyle(
                            q.status
                          )}`}
                        >
                          {q.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ================= MOBILE CARDS ================= */}
            <div className="space-y-4 md:hidden">
              {quizzes.map((q) => (
                <motion.div
                  key={q._id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    router.push(`/parent/quizzes/${q._id}`)
                  }
                  className="cursor-pointer rounded-md border border-[#1C2B22]/10 bg-white p-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-[#1C2B22]">
                      {q.quiz.title}
                    </p>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyle(
                        q.status
                      )}`}
                    >
                      {q.status}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-[#58646C]">
                    {q.quiz.subject} · Class{" "}
                    {q.quiz.class_grade}
                  </p>

                  <div className="mt-3 space-y-2 text-sm text-[#1C2B22]">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-[#58646C]" />
                      {q.student.full_name}
                    </div>

                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-[#58646C]" />
                      {q.tutor.fullName}
                    </div>

                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-[#58646C]" />
                      {q.due_date
                        ? new Date(
                            q.due_date
                          ).toLocaleDateString()
                        : "No due date"}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </ParentDashboardLayout>
  );
}
