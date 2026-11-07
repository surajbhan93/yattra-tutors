"use client";

import React, { useEffect, useMemo, useState } from "react";
import apiClient from "@/lib/apiClient";
import StudentCard, { StudentCardData } from "./StudentCard";
import { Users, UserCheck, UserX, Search } from "lucide-react";
import { lora } from "@/lib/fonts";

/* ======================
   API TYPE
====================== */
interface ApiItem {
  studentId: string;
  student: {
    full_name: string;
    class: string;
    board: string;
    institution_name: string;
    subjects: string[];
    isActive?: boolean; // 🔹 future proof
  };
  parent: {
    fullName: string;
  };
  location: string;
  urgency: string;
  assignedAt: string;
}

type StudentFilter = "total" | "active" | "inactive";

/* ======================
   STAT CARD
====================== */
const StatCard = ({
  title,
  value,
  icon: Icon,
  isActive,
  onClick,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`rounded-md p-6 text-left transition-colors
      ${
        isActive
          ? "border-2 border-[#D79A2C] bg-[#D79A2C]/10"
          : "border border-[#1C2B22]/10 bg-white hover:border-[#1C2B22]/25"
      }`}
  >
    <div className="flex items-center justify-between">
      <h3 className="text-sm text-[#58646C]">{title}</h3>
      <Icon
        className={`size-5 ${
          isActive ? "text-[#8a5f18]" : "text-[#9AA3AB]"
        }`}
      />
    </div>
    <p className="mt-4 text-2xl font-semibold text-[#1C2B22]">
      {value}
    </p>
  </button>
);

/* ======================
   PAGE
====================== */
const MyStudentsPage = () => {
  const [items, setItems] = useState<ApiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] =
    useState<StudentFilter>("total");

  /* ======================
     FETCH API
  ====================== */
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await apiClient.get("/auth/tutor/my-student");
        setItems(res.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch students", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  /* ======================
     MAP API → CARD DATA
  ====================== */
  const studentCards: StudentCardData[] = useMemo(() => {
    return items.map((item) => ({
      id: item.studentId,
      studentName: item.student.full_name,
      classGrade: item.student.class,
      board: item.student.board,
      institution_name: item.student.institution_name,
      parentName: item.parent.fullName,
      location: item.location,
      urgency: item.urgency,
      assignedAt: item.assignedAt,
      isActive: item.student.isActive ?? true, // default active
    }));
  }, [items]);

  /* ======================
     FILTER + SEARCH
  ====================== */
  const filteredStudents = useMemo(() => {
    return studentCards.filter((student) => {
      // 🔍 Search
      const matchSearch = student.studentName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // 🟢 Filter
      const matchFilter =
        activeFilter === "total"
          ? true
          : activeFilter === "active"
          ? student.isActive
          : !student.isActive;

      return matchSearch && matchFilter;
    });
  }, [studentCards, searchQuery, activeFilter]);

  /* ======================
     STATS
  ====================== */
  const totalCount = studentCards.length;
  const activeCount = studentCards.filter(
    (s) => s.isActive
  ).length;
  const inactiveCount = totalCount - activeCount;

  return (
    <div className="flex flex-col gap-8">

      <div className="mb-2 rounded-md border border-[#1C2B22]/10 bg-[#0E211C] p-5 text-[#F7F2E9]">
  <h1 className={`${lora.className} text-xl font-semibold`}>
    My students
  </h1>
  <p className="mt-1 text-sm text-[#AAB6A2]">
    View and manage your assigned students, track their progress,
    and stay connected for effective learning.
  </p>
  </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <StatCard
          title="Total students"
          value={totalCount}
          icon={Users}
          isActive={activeFilter === "total"}
          onClick={() => setActiveFilter("total")}
        />
        <StatCard
          title="Active"
          value={activeCount}
          icon={UserCheck}
          isActive={activeFilter === "active"}
          onClick={() => setActiveFilter("active")}
        />
        <StatCard
          title="Inactive"
          value={inactiveCount}
          icon={UserX}
          isActive={activeFilter === "inactive"}
          onClick={() => setActiveFilter("inactive")}
        />
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA3AB]"
          size={18}
        />
        <input
          type="text"
          placeholder="Search by student name..."
          value={searchQuery}
          onChange={(e) =>
            setSearchQuery(e.target.value)
          }
          className="w-full rounded-md border border-[#1C2B22]/15 bg-white py-2 pl-10 pr-4 text-[#1C2B22] outline-none focus:border-[#D79A2C]"
        />
      </div>

      {/* GRID */}
      {loading ? (
        <p className="text-sm text-[#58646C]">Loading students...</p>
      ) : filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-md border-2 border-dashed border-[#1C2B22]/15 bg-[#F7F2E9] py-12 text-center text-sm text-[#58646C]">
          No students found.
        </div>
      )}
    </div>
  );
};

export default MyStudentsPage;
