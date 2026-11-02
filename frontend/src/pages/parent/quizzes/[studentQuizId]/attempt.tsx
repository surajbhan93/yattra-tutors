"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import apiClient from "@/lib/apiClient";
import {
  CheckCircle,
  Circle,
  Clock,
} from "lucide-react";
import { Lora } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"] });

const QUIZ_DURATION_SECONDS = 60 * 60; // ⏱ 10 minutes

export default function AttemptQuizPage() {
  const router = useRouter();
  const { studentQuizId } = router.query;

  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION_SECONDS);
  const [submitting, setSubmitting] = useState(false);

  /* ================= FETCH QUIZ ================= */
  useEffect(() => {
    if (!studentQuizId) return;

    apiClient
      .get(`/parent/quizzes/${studentQuizId}/attempt`)
      .then((res) => setQuiz(res.data.data));
  }, [studentQuizId]);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (!quiz) return;

    if (timeLeft <= 0) {
      autoSubmit();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [quiz, timeLeft]);

  /* ================= SUBMIT ================= */
  const autoSubmit = async () => {
    if (submitting) return;

    setSubmitting(true);
    await apiClient.post(
      `/parent/quizzes/${studentQuizId}/submit`,
      { answers }
    );

    alert("Time over! Quiz auto-submitted ⏱");
    router.push("/parent/quizzes");
  };

  const manualSubmit = async () => {
    if (submitting) return;

    setSubmitting(true);
    await apiClient.post(
      `/parent/quizzes/${studentQuizId}/submit`,
      { answers }
    );

    alert("Quiz submitted successfully ✅");
    router.push("/parent/quizzes");
  };

  /* ================= HELPERS ================= */
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (!quiz)
    return (
      <div className="p-6 text-sm text-[#58646C]">
        Loading quiz...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F7F2E9] p-4 md:p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between rounded-md border border-[#1C2B22]/10 bg-white p-4">
          <div>
            <h1 className={`${lora.className} text-lg font-semibold text-[#1C2B22]`}>
              {quiz.title}
            </h1>
            <p className="text-sm text-[#58646C]">
              Do not refresh or switch tabs
            </p>
          </div>

          {/* TIMER */}
          <div
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${
              timeLeft <= 60
                ? "bg-[#b23b2e]/10 text-[#b23b2e]"
                : "bg-[#3E5C83]/10 text-[#3E5C83]"
            }`}
          >
            <Clock className="h-4 w-4" />
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </div>
        </div>

        {/* ================= QUESTIONS ================= */}
        {quiz.questions.map((q: any, idx: number) => {
          const selected = answers[idx]?.selected_option;

          return (
            <div
              key={q._id}
              className="rounded-md border border-[#1C2B22]/10 bg-white p-5"
            >
              <p className="mb-4 font-medium text-[#1C2B22]">
                {idx + 1}. {q.question}
              </p>

              <div className="space-y-2">
                {q.options.map((opt: string) => {
                  const isSelected = selected === opt;

                  return (
                    <label
                      key={opt}
                      className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 transition-colors ${
                        isSelected
                          ? "border-[#D79A2C] bg-[#D79A2C]/10"
                          : "border-[#1C2B22]/10 hover:bg-[#F7F2E9]"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q-${idx}`}
                        className="hidden"
                        onChange={() => {
                          const copy = [...answers];
                          copy[idx] = {
                            question_id: q._id,
                            selected_option: opt,
                          };
                          setAnswers(copy);
                        }}
                      />

                      {isSelected ? (
                        <CheckCircle className="h-5 w-5 text-[#D79A2C]" />
                      ) : (
                        <Circle className="h-5 w-5 text-[#9AA3AB]" />
                      )}

                      <span className="text-sm text-[#1C2B22]">
                        {opt}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* ================= SUBMIT ================= */}
        <button
          disabled={submitting}
          onClick={manualSubmit}
          className={`w-full rounded-md py-3 text-sm font-semibold transition-colors ${
            submitting
              ? "cursor-not-allowed bg-[#9AA3AB] text-white"
              : "bg-[#D79A2C] text-[#17261D] hover:bg-[#c4891f]"
          }`}
        >
          {submitting ? "Submitting..." : "Submit quiz"}
        </button>
      </div>
    </div>
  );
}
