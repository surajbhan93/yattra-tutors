"use client";

import { useState } from "react";
import apiClient from "@/lib/apiClient";
import ParentDashboardLayout from "@/layouts/ParentDashboardLayout";
import { Lora } from "next/font/google";
// import ParentTopBar from "@/components/parent-dashboard/ParentTopBar";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"] });
const inputClass = "w-full rounded-md border border-[#1C2B22]/15 px-3 py-2 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]";

export default function AddStudentPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    class: "",
    board: "",
    institution_name: "",
    subjects_required: "",
    additional_notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.full_name ||
      !form.class ||
      !form.board ||
      !form.institution_name ||
      !form.subjects_required
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      await apiClient.post("/auth/parent/student", {
        full_name: form.full_name,
        class: form.class,
        board: form.board,
        institution_name: form.institution_name,
        subjects_required: form.subjects_required
          .split(",")
          .map((s) => s.trim()),
        additional_notes: form.additional_notes,
      });

      alert("Student added successfully");

      setForm({
        full_name: "",
        class: "",
        board: "",
        institution_name: "",
        subjects_required: "",
        additional_notes: "",
      });
    } catch (err) {
      alert("Failed to add student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ParentDashboardLayout>
      <div className="mx-auto mt-6 max-w-2xl">
        <h1 className={`${lora.className} mb-4 text-2xl font-semibold text-[#1C2B22]`}>Add new student</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-md border border-[#1C2B22]/10 bg-white p-6"
        >
          <input
            className={inputClass}
            placeholder="Student full name"
            value={form.full_name}
            onChange={(e) =>
              setForm({ ...form, full_name: e.target.value })
            }
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              className={inputClass}
              placeholder="Class (e.g. 8)"
              value={form.class}
              onChange={(e) =>
                setForm({ ...form, class: e.target.value })
              }
            />

            <input
              className={inputClass}
              placeholder="Board (CBSE / ICSE / State)"
              value={form.board}
              onChange={(e) =>
                setForm({ ...form, board: e.target.value })
              }
            />
          </div>

          <input
            className={inputClass}
            placeholder="School / college name"
            value={form.institution_name}
            onChange={(e) =>
              setForm({
                ...form,
                institution_name: e.target.value,
              })
            }
          />

          <input
            className={inputClass}
            placeholder="Subjects required (comma separated)"
            value={form.subjects_required}
            onChange={(e) =>
              setForm({
                ...form,
                subjects_required: e.target.value,
              })
            }
          />

          <textarea
            className={inputClass}
            placeholder="Additional notes (optional)"
            rows={3}
            value={form.additional_notes}
            onChange={(e) =>
              setForm({
                ...form,
                additional_notes: e.target.value,
              })
            }
          />

          <button
            disabled={loading}
            className="rounded-md bg-[#D79A2C] px-4 py-2 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add student"}
          </button>
        </form>
      </div>
    </ParentDashboardLayout>
  );
}
