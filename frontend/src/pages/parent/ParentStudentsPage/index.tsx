import React, { useEffect, useMemo, useState } from "react";
import ParentDashboardLayout from "@/layouts/ParentDashboardLayout";
import apiClient from "@/lib/apiClient";
import { lora } from "@/lib/fonts";

// Icons
import {
  Users,
  BookOpen,
  School,
  Calendar,
  Search,
} from "lucide-react";

// Recharts
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

/* ======================
   TYPES
====================== */
interface Student {
  id: string;
  full_name: string;
  class?: string;
  board?: string;
  institution_name?: string;
  subjects_required?: string[];
  additional_notes?: string;
  createdAt: string;
}

interface ApiResponse {
  success: boolean;
  count: number;
  students: Student[];
}

/* ======================
   COLORS
====================== */
const COLORS = [
  "#D79A2C",
  "#3E5C83",
  "#7A4E6E",
  "#B06A2E",
  "#1F6F54",
  "#7C9484",
];

/* ======================
   PAGE
====================== */
export default function ParentStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  /* ======================
     FETCH API
  ====================== */
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await apiClient.get<ApiResponse>(
          "/parent/students"
        );
        setStudents(res.data.students || []);
      } catch (err) {
        console.error("Failed to fetch students", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  /* ======================
     SEARCH FILTER
  ====================== */
  const filteredStudents = useMemo(() => {
    return students.filter((s) =>
      s.full_name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [students, search]);

  /* ======================
     STATS
  ====================== */
  const totalStudents = students.length;

  const boardStats = useMemo(() => {
    const map: Record<string, number> = {};
    students.forEach((s) => {
      if (!s.board) return;
      map[s.board] = (map[s.board] || 0) + 1;
    });

    return Object.entries(map).map(
      ([name, value]) => ({
        name,
        value,
      })
    );
  }, [students]);

  const classStats = useMemo(() => {
    const map: Record<string, number> = {};
    students.forEach((s) => {
      if (!s.class) return;
      map[s.class] = (map[s.class] || 0) + 1;
    });

    return Object.entries(map).map(
      ([name, count]) => ({
        name,
        count,
      })
    );
  }, [students]);

  /* ======================
     UI
  ====================== */
  return (
    <ParentDashboardLayout>
      <div className="space-y-8">

        {/* ===== HEADER ===== */}
        <div className="rounded-md border border-[#1C2B22]/10 bg-[#0E211C] p-6 text-[#F7F2E9]">
          <h1 className={`${lora.className} text-2xl font-semibold`}>
            My students
          </h1>
          <p className="mt-1 text-sm text-[#AAB6A2]">
            Manage all students added to your account and track academic distribution.
          </p>
        </div>

        {/* ===== STATS ===== */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total students"
            value={totalStudents}
            icon={Users}
          />
          <StatCard
            title="Boards"
            value={boardStats.length}
            icon={School}
          />
          <StatCard
            title="Classes"
            value={classStats.length}
            icon={BookOpen}
          />
          <StatCard
            title="Recently added"
            value={
              students.filter((s) => {
                const days =
                  (Date.now() -
                    new Date(s.createdAt).getTime()) /
                  (1000 * 60 * 60 * 24);
                return days <= 7;
              }).length
            }
            icon={Calendar}
          />
        </div>

        {/* ===== CHARTS ===== */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Board Distribution */}
          <div className="rounded-md border border-[#1C2B22]/10 bg-white p-5">
            <h3 className="mb-2 font-semibold text-[#1C2B22]">
              Board distribution
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={boardStats}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    label
                  >
                    {boardStats.map((_, i) => (
                      <Cell
                        key={i}
                        fill={
                          COLORS[i % COLORS.length]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Class Distribution */}
          <div className="rounded-md border border-[#1C2B22]/10 bg-white p-5">
            <h3 className="mb-2 font-semibold text-[#1C2B22]">
              Class distribution
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1C2B22" strokeOpacity={0.08} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="count"
                    fill="#D79A2C"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ===== SEARCH ===== */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9AA3AB]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student by name..."
            className="w-full rounded-md border border-[#1C2B22]/15 px-10 py-2 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
          />
        </div>

        {/* ===== STUDENT LIST ===== */}
        {loading ? (
          <p className="text-sm text-[#58646C]">Loading students...</p>
        ) : filteredStudents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStudents.map((s) => (
              <StudentCard key={s.id} student={s} />
            ))}
          </div>
        ) : (
          <div className="rounded-md border-2 border-dashed border-[#1C2B22]/15 bg-[#F7F2E9] py-12 text-center text-sm text-[#58646C]">
            No students found.
          </div>
        )}
      </div>
    </ParentDashboardLayout>
  );
}

/* ======================
   STAT CARD
====================== */
function StatCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-md border border-[#1C2B22]/10 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#58646C]">
          {title}
        </p>
        <Icon className="h-4 w-4 text-[#8a5f18]" />
      </div>
      <p className="mt-3 text-2xl font-semibold text-[#1C2B22]">
        {value}
      </p>
    </div>
  );
}

/* ======================
   STUDENT CARD
====================== */
function StudentCard({ student }: { student: Student }) {
  return (
    <div className="rounded-md border border-[#1C2B22]/10 bg-white p-5">
      <h3 className="text-base font-semibold text-[#1C2B22]">
        {student.full_name}
      </h3>

      <p className="mt-1 text-sm text-[#58646C]">
        Class: {student.class || "—"} |{" "}
        {student.board || "—"}
      </p>

      <p className="mt-1 text-sm text-[#58646C]">
        Institute:{" "}
        {student.institution_name || "—"}
      </p>

      {student.subjects_required?.length ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {student.subjects_required.map((sub, i) => (
            <span
              key={i}
              className="rounded-full bg-[#D79A2C]/15 px-3 py-1 text-xs text-[#8a5f18]"
            >
              {sub}
            </span>
          ))}
        </div>
      ) : null}

      {student.additional_notes && (
        <p className="mt-2 text-xs text-[#9AA3AB]">
          {student.additional_notes}
        </p>
      )}

      <p className="mt-3 text-xs text-[#9AA3AB]">
        Added on{" "}
        {new Date(
          student.createdAt
        ).toLocaleDateString()}
      </p>
    </div>
  );
}
