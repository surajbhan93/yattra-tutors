"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import apiClient from "@/lib/apiClient";
import ParentDashboardLayout from "@/layouts/ParentDashboardLayout";
import toast from "react-hot-toast";

import { motion } from "framer-motion";
import {  Users, School } from "lucide-react";
import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  FileText,
  UploadCloud,
  CheckCircle,

} from "lucide-react";
import { Lora } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"] });

export default function AssignmentDetailPage() {
  const router = useRouter();
  const { assignmentId } = router.query;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  /* ======================
     FETCH ASSIGNMENT DETAIL
  ====================== */
  useEffect(() => {
    if (!assignmentId) return;

    apiClient
      .get(`/parent/assignments/${assignmentId}`)
      .then((res) => setData(res.data.data))
      .catch(() => toast.error("Failed to load assignment"))
      .finally(() => setLoading(false));
  }, [assignmentId]);

  /* ======================
     SUBMIT ASSIGNMENT
  ====================== */
  const submitAssignment = async () => {
   if (!file) {
    toast.error("Please select a file");
    return;
  }
    if (!data?.assignment?._id) {
    toast.error("Assignment ID missing");
    return;
  }
    const formData = new FormData();
    formData.append("file", file);
    try {
      setSubmitting(true);
      await apiClient.post(
        `/student/assignments/${data.assignment._id}/submit`,
        formData
      );
      toast.success("Assignment submitted successfully");
    } catch (err: any) {
      toast.error(
        err.response?.data?.error || "Submission failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <ParentDashboardLayout>
        <div className="p-6 text-sm text-[#58646C]">Loading...</div>
      </ParentDashboardLayout>
    );

  if (!data)
    return (
      <ParentDashboardLayout>

        <div className="p-6 text-sm text-[#58646C]">
          Assignment not found
        </div>
      </ParentDashboardLayout>
    );

  const assignment = data.assignment;

  // 🔥 STATUS (UI only)
  const submissionStatus =
    data.status || data.studentAssignment?.status || "Pending";

  const isSubmitted =
    submissionStatus === "Submitted" ||
    submissionStatus === "Checked";

  const statusStyle =
    submissionStatus === "Checked"
      ? "bg-[#1F6F54]/10 text-[#1F6F54]"
      : submissionStatus === "Submitted"
      ? "bg-[#3E5C83]/10 text-[#3E5C83]"
      : "bg-[#D79A2C]/15 text-[#8a5f18]";

  return (
    <ParentDashboardLayout>
      {/* text content */}
        <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 rounded-md border border-[#1C2B22]/10 bg-[#0E211C] p-5 text-[#F7F2E9]"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* LEFT TEXT */}
        <div>
          <h2 className="text-base font-semibold">
            Assignment submission guidelines
          </h2>
          <p className="mt-1 max-w-xl text-sm text-[#AAB6A2]">
            Complete your assignment honestly. Do not cheat.
            Write the assignment properly, take clear screenshots or photos,
            convert them into a single PDF file, and upload it here.
          </p>
        </div>

        {/* RIGHT TAGS */}
        <div className="flex flex-wrap gap-3 text-xs font-medium">
          <span className="flex items-center gap-1.5 rounded-full border border-[#D79A2C]/30 px-3 py-1 text-[#D79A2C]">
            <School className="h-3.5 w-3.5" />
            Institution
          </span>

          <span className="flex items-center gap-1.5 rounded-full border border-[#D79A2C]/30 px-3 py-1 text-[#D79A2C]">
            <GraduationCap className="h-3.5 w-3.5" />
            Student responsibility
          </span>

          <span className="flex items-center gap-1.5 rounded-full border border-[#D79A2C]/30 px-3 py-1 text-[#D79A2C]">
            <Users className="h-3.5 w-3.5" />
            Parent supervision
          </span>
        </div>
      </div>
    </motion.div>

      <div className="min-h-screen p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-3xl space-y-6 rounded-md border border-[#1C2B22]/10 bg-white p-6"
        >
          {/* ================= HEADER ================= */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#8a5f18]" />
              <h1 className={`${lora.className} text-xl font-semibold text-[#1C2B22]`}>
                {assignment.title}
              </h1>
            </div>

            {/* STATUS BADGE */}
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyle}`}
            >
              {submissionStatus}
            </span>
          </div>

          {/* ================= META ================= */}
          <div className="grid gap-3 text-sm text-[#1C2B22] md:grid-cols-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-[#58646C]" />
              {assignment.subject} — {assignment.class_grade}
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-[#58646C]" />
              {assignment.due_date || "No due date"}
            </div>
          </div>

          {/* ================= INSTRUCTIONS ================= */}
          {assignment.instructions && (
            <div className="rounded-md bg-[#F7F2E9] p-4 text-sm">
              <p className="mb-1 font-semibold text-[#1C2B22]">
                Instructions
              </p>
              <p className="text-[#58646C]">
                {assignment.instructions}
              </p>
            </div>
          )}

          {/* ================= ATTACHMENTS ================= */}
          {assignment.attachments?.length > 0 && (
            <div>
              <p className="mb-2 font-semibold text-[#1C2B22]">
                Attachments
              </p>
              <ul className="space-y-2">
                {assignment.attachments.map((f: any) => (
                  <li key={f.url}>
                    <a
                      href={f.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm text-[#8a5f18] underline"
                    >
                      <FileText className="h-4 w-4" />
                      {f.filename}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ================= SUBMISSION ================= */}
          <div className="rounded-md border border-[#1C2B22]/10 bg-white p-4">
            <p className="mb-2 font-semibold text-[#1C2B22]">
              Submit assignment
            </p>

            {isSubmitted ? (
              <div className="flex items-center gap-2 rounded-md bg-[#1F6F54]/10 p-3 text-sm text-[#1F6F54]">
                <CheckCircle className="h-4 w-4" />
                Assignment already submitted. Waiting for review.
              </div>
            ) : (
              <>
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-[#D79A2C]/30 bg-[#F7F2E9] p-4 text-sm text-[#8a5f18] hover:bg-[#EFE8D7]">
                  <UploadCloud className="mb-1 h-6 w-6" />
                  {file ? file.name : "Click to upload file"}
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    onChange={(e) =>
                      setFile(e.target.files?.[0] || null)
                    }
                  />
                </label>

                <button
                  disabled={submitting}
                  onClick={submitAssignment}
                  className="mt-4 w-full rounded-md bg-[#D79A2C] py-2 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting
                    ? "Submitting..."
                    : "Submit assignment"}
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </ParentDashboardLayout>
  );
}
