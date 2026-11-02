"use client";

import { CircleUserRound, MapPin, Clock, School } from "lucide-react";
import React from "react";

/* ======================
   TYPES
====================== */
export interface StudentCardData {
  id: string;
  studentName: string;
  classGrade: string;
  board?: string;
  institution_name?: string;
  parentName: string;
  location: string;
  urgency: string;
  assignedAt: string;
  // 🔥 ADD THIS
  isActive: boolean;
}

/* ======================
   HELPERS
====================== */
const urgencyLabel = (urgency?: string) => {
  switch (urgency) {
    case "within_24_hours":
      return "Urgent (24h)";
    case "within_3_days":
      return "Within 3 days";
    case "within_a_week":
      return "Within a week";
    default:
      return "Not specified";
  }
};

/* ======================
   COMPONENT
====================== */
const StudentCard: React.FC<{ student: StudentCardData }> = ({
  student,
}) => {
  return (
    <div className="flex h-full flex-col gap-4 rounded-md border border-[#1C2B22]/10 bg-white p-4 transition-transform hover:-translate-y-0.5">

      {/* HEADER */}
      <div className="flex items-center gap-3">
        <CircleUserRound className="size-12 text-[#9AA3AB]" />
        <div>
          <p className="font-medium text-[#1C2B22]">
            {student.studentName}
          </p>
          <p className="text-sm text-[#58646C]">
            Class {student.classGrade}
            {student.board && ` · ${student.board}`}
          </p>
        </div>
      </div>

      {/* SCHOOL */}
      {student.institution_name && (
        <p className="flex items-center gap-2 text-sm text-[#1C2B22]">
          <School className="size-4 text-[#58646C]" /> {student.institution_name}
        </p>
      )}

      {/* META */}
      <div className="flex flex-col gap-2 text-sm text-[#1C2B22]">
        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-[#58646C]" />
          {student.location}
        </div>

        <div className="flex items-center gap-2">
          <Clock className="size-4 text-[#58646C]" />
          {urgencyLabel(student.urgency)}
        </div>
      </div>

      {/* PARENT */}
      <div className="rounded-md bg-[#F7F2E9] px-3 py-2 text-sm text-[#1C2B22]">
        <b>Parent:</b> {student.parentName}
      </div>

      {/* FOOTER */}
      <div className="mt-auto text-xs text-[#9AA3AB]">
        Assigned on{" "}
        {new Date(student.assignedAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default StudentCard;
