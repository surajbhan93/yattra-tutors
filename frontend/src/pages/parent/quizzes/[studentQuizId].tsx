"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import apiClient from "@/lib/apiClient";
import ParentDashboardLayout from "@/layouts/ParentDashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList,
  BookOpen,
  GraduationCap,
  HelpCircle,
  PlayCircle,
} from "lucide-react";
import { Lora } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"] });

export default function QuizDetailsPage() {
  const router = useRouter();
  const { studentQuizId } = router.query;

  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Countdown states
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (!studentQuizId) return;

    apiClient
      .get(`/parent/quizzes/${studentQuizId}`)
      .then((res) => setQuiz(res.data.data))
      .finally(() => setLoading(false));
  }, [studentQuizId]);

  // ⏱ Countdown effect
  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      router.push(`/parent/quizzes/${studentQuizId}/attempt`);
      return;
    }

    const timer = setTimeout(
      () => setCountdown((c) => (c as number) - 1),
      1000
    );

    return () => clearTimeout(timer);
  }, [countdown, router, studentQuizId]);

  if (loading)
    return (
      <ParentDashboardLayout>
        <div className="p-6 text-sm text-[#58646C]">
          Loading quiz details...
        </div>
      </ParentDashboardLayout>
    );

  if (!quiz)
    return (
      <ParentDashboardLayout>
        <div className="p-6 text-sm text-[#58646C]">
          Quiz not found
        </div>
      </ParentDashboardLayout>
    );

  const statusStyle =
    quiz.status === "Checked"
      ? "bg-[#1F6F54]/10 text-[#1F6F54]"
      : quiz.status === "Submitted"
      ? "bg-[#3E5C83]/10 text-[#3E5C83]"
      : "bg-[#D79A2C]/15 text-[#8a5f18]";

  return (
    <ParentDashboardLayout>
      <div className="relative min-h-screen p-4 md:p-6">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-md border border-[#1C2B22]/10 bg-[#0E211C] p-5 text-[#F7F2E9]"
        >
          <div className="flex items-center gap-3">
            <ClipboardList className="h-6 w-6 text-[#D79A2C]" />
            <div>
              <h1 className={`${lora.className} text-xl font-semibold`}>Quiz details</h1>
              <p className="text-sm text-[#AAB6A2]">
                Review quiz information before starting.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ================= CONTENT CARD ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-3xl space-y-6 rounded-md border border-[#1C2B22]/10 bg-white p-6"
        >
          {/* TITLE */}
          <div className="flex items-center justify-between gap-3">
            <h2 className={`${lora.className} text-xl font-semibold text-[#1C2B22]`}>{quiz.title}</h2>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyle}`}
            >
              {quiz.status}
            </span>
          </div>

          {/* META */}
          <div className="grid gap-4 text-sm text-[#1C2B22] md:grid-cols-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#58646C]" />
              {quiz.subject}
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-[#58646C]" />
              Class {quiz.class_grade}
            </div>
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-[#58646C]" />
              {quiz.total_questions} questions
            </div>
          </div>

          {/* INSTRUCTIONS */}
          <div className="rounded-md bg-[#F7F2E9] p-4 text-sm text-[#1C2B22]">
            <p className="mb-1 font-semibold text-[#1C2B22]">
              Important instructions
            </p>
            <p className="text-[#58646C]">
              Attempt the quiz honestly. Do not refresh or switch tabs. Once started, the quiz must be
              completed.
            </p>
          </div>

          {/* ACTION */}
          {quiz.status === "assigned" && (
            <button
              disabled={countdown !== null}
              onClick={() => setCountdown(3)}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-[#D79A2C] py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <PlayCircle className="h-5 w-5" />
              {countdown ? "Starting..." : "Start quiz"}
            </button>
          )}

          {quiz.status !== "assigned" && (
            <div className="rounded-md bg-[#F7F2E9] p-4 text-sm text-[#58646C]">
              This quiz has already been {quiz.status.toLowerCase()}.
            </div>
          )}
        </motion.div>

        {/* ================= COUNTDOWN OVERLAY ================= */}
        <AnimatePresence>
          {countdown !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex items-center justify-center bg-black/60"
            >
              <motion.div
                key={countdown}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-6xl font-semibold text-white"
              >
                {countdown}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ParentDashboardLayout>
  );
}
