"use client";

import { useEffect, useMemo, useState } from "react";
import ParentDashboardLayout from "@/layouts/ParentDashboardLayout";
import apiClient from "@/lib/apiClient";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  BookOpen,
  User,
  GraduationCap,
  CalendarDays,
  ArrowRight,
  Search,
} from "lucide-react";
import { Lora } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"] });

/* ======================
   TYPES
====================== */
interface ParentAssignmentItem {
  _id: string;
  status: "Pending" | "Submitted" | "Checked";
  due_date: string;

  assignment: {
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
  };
}

/* ======================
   STATUS STYLE
====================== */
const statusStyle = {
  Pending: "bg-[#D79A2C]/15 text-[#8a5f18] ring-[#D79A2C]/25",
  Submitted: "bg-[#3E5C83]/10 text-[#3E5C83] ring-[#3E5C83]/20",
  Checked: "bg-[#1F6F54]/10 text-[#1F6F54] ring-[#1F6F54]/20",
};

const statusTabs = ["All", "Pending", "Submitted", "Checked"];

export default function ParentAssignmentsPage() {
  const [assignments, setAssignments] = useState<ParentAssignmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState("All");
  const [search, setSearch] = useState("");

  const router = useRouter();

  /* ======================
     FETCH DATA
  ====================== */
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await apiClient.get("/parent/assignments");
        setAssignments(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  /* ======================
     FILTER + SEARCH
  ====================== */
  const filteredAssignments = useMemo(() => {
    return assignments.filter((a) => {
      const matchStatus =
        activeStatus === "All" || a.status === activeStatus;

      const keyword = search.toLowerCase();
      const matchSearch =
        a.assignment.title.toLowerCase().includes(keyword) ||
        a.assignment.subject.toLowerCase().includes(keyword) ||
        a.student.full_name.toLowerCase().includes(keyword);

      return matchStatus && matchSearch;
    });
  }, [assignments, activeStatus, search]);

  return (
    <>
      {/* ================= SEO ================= */}
      <Head>
        <title>Parent Assignments | Dashboard</title>
        <meta
          name="description"
          content="Track assignments, submission status, and tutor updates."
        />
      </Head>

      <ParentDashboardLayout>
        {/* ================= PAGE WRAPPER ================= */}
        <div className="min-h-screen p-4 md:p-6">
          {/* ================= HEADER ================= */}
          <div className="mb-6 rounded-md border border-[#1C2B22]/10 bg-[#0E211C] p-6 text-[#F7F2E9]">
            <h1 className={`${lora.className} text-xl font-semibold`}>Assignments</h1>
            <p className="mt-1 text-sm text-[#AAB6A2]">
              Search and track your child&rsquo;s assignments easily. Stay updated with submission status and
              deadlines.
            </p>
          </div>

          {/* ================= FILTER BAR ================= */}
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* STATUS TABS */}
            <div className="flex flex-wrap gap-2">
              {statusTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveStatus(tab)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                    activeStatus === tab
                      ? "bg-[#0E211C] text-white"
                      : "bg-white text-[#58646C] hover:bg-[#F7F2E9]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* SEARCH */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#9AA3AB]" />
              <input
                type="text"
                placeholder="Search by title, subject, student"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-md border border-[#1C2B22]/15 bg-white py-2 pl-9 pr-3 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
              />
            </div>
          </div>

          {/* ================= CONTENT ================= */}
          {loading ? (
            <div className="rounded-md border border-[#1C2B22]/10 bg-white p-6 text-sm text-[#58646C]">
              Loading assignments...
            </div>
          ) : filteredAssignments.length === 0 ? (
            <div className="rounded-md border border-[#1C2B22]/10 bg-white p-6 text-sm text-[#58646C]">
              No matching assignments found.
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="divide-y divide-[#1C2B22]/10 rounded-md border border-[#1C2B22]/10 bg-white"
            >
              {filteredAssignments.map((a) => (
                <div key={a._id} className="p-4">
                  {/* TOP */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 font-medium text-[#1C2B22]">
                      <BookOpen className="h-4 w-4 text-[#8a5f18]" />
                      {a.assignment.title}
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ${
                        statusStyle[a.status]
                      }`}
                    >
                      {a.status}
                    </span>
                  </div>

                  {/* DETAILS */}
                  <div className="mt-3 grid gap-3 text-sm text-[#1C2B22] md:grid-cols-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-[#58646C]" />
                      {a.student.full_name} ({a.student.class_grade})
                    </div>

                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-[#58646C]" />
                      {a.tutor.fullName}
                    </div>

                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-[#58646C]" />
                      {a.due_date
                        ? new Date(a.due_date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                          })
                        : "No due date"}
                    </div>

                    <div className="text-right">
                      <button
                        onClick={() =>
                          router.push(`/parent/assignments/${a._id}`)
                        }
                        className="inline-flex items-center gap-1 rounded-md bg-[#D79A2C] px-3 py-1.5 text-xs font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
                      >
                        View
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </ParentDashboardLayout>
    </>
  );
}
