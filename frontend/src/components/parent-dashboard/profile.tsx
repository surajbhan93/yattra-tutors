
"use client";

import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import ParentDashboardLayout from "@/layouts/ParentDashboardLayout";
import ParentTopBar from "@/components/parent-dashboard/ParentTopBar";
import { Pencil, AlertTriangle } from "lucide-react";
import { lora } from "@/lib/fonts";

const inputClass = "w-full rounded-md border border-[#1C2B22]/15 px-3 py-2 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]";

export default function ParentProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [students, setStudents] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
   const [isProfileComplete, setIsProfileComplete] = useState(true);
  //  add
 const [photo, setPhoto] = useState<string>("");
const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    notificationWhatsapp: true,
  });

  const [newStudent, setNewStudent] = useState({
    full_name: "",
    class: "",
    board: "",
    institution_name: "",
    subjects_required: "",
    additional_notes: "",
  });

  // 🔹 Load profile & students
  useEffect(() => {
    Promise.all([
      apiClient.get("/auth/parent/profile"),
      apiClient.get("/auth/parent/students"),
    ])
      .then(([profileRes, studentsRes]) => {
        const p = profileRes.data.parent;
        setForm({
          fullName: p.fullName || "",
          phone: p.phone || "",
          email: p.email || "",
          notificationWhatsapp: p.notificationWhatsapp ?? true,
        });
         // ✅ YE LINE ADD KARO
      setPhoto(p.profileImage || "");
       setIsProfileComplete(profileRes.data.isProfileComplete);
        setStudents(studentsRes.data.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Save parent profile
  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      await apiClient.put("/auth/parent/profile", {
        fullName: form.fullName,
        phone: form.phone,
        notificationWhatsapp: form.notificationWhatsapp,
      });
      alert("Profile updated");
    } catch {
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  // ✅ YE FUNCTION ADD KARO
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("photo", file);
    try {
      setUploading(true);
      const res = await apiClient.post("/parent/upload-photo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPhoto(res.data.url);
      alert("Photo uploaded!");
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // 🔹 Add student
 const handleAddStudent = async () => {
  if (
    !newStudent.full_name ||
    !newStudent.class ||
    !newStudent.board ||
    !newStudent.institution_name ||
    !newStudent.subjects_required
  ) {
    alert("Please fill all required fields");
    return;
  }

  try {
    const res = await apiClient.post("/auth/parent/student", {
      full_name: newStudent.full_name,
      class_grade: newStudent.class, // ✅ FIX
      board: newStudent.board,
      institution_name: newStudent.institution_name,
      subjects_required: newStudent.subjects_required
        .split(",")
        .map((s) => s.trim()),
      additional_notes: newStudent.additional_notes,
    });

    setStudents((prev) => [...prev, res.data.data]);
    setShowAddModal(false);

    setNewStudent({
      full_name: "",
      class: "",
      board: "",
      institution_name: "",
      subjects_required: "",
      additional_notes: "",
    });
  } catch (err: any) {
    console.error("Add student error:", err);
    alert(
      err?.response?.data?.message ||
      "Failed to add student"
    );
  }
};

  if (loading) {
    return (
      <ParentDashboardLayout>
        {/* <ParentTopBar /> */}
        <div className="p-6 text-sm text-[#58646C]">Loading profile...</div>
      </ParentDashboardLayout>
    );
  }

  return (
    <ParentDashboardLayout>
                  <ParentTopBar
            parentName={form.fullName}
            studentName={students[0]?.full_name || "No student"}
            notificationsCount={0}
            onMenuClick={() => {}}
          />

      {!isProfileComplete && (
  <div className="flex items-start gap-2 rounded-md border border-[#D79A2C]/30 bg-[#D79A2C]/10 p-4 text-sm text-[#8a5f18]">
    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
    <span>
      Your profile is not complete yet. You can continue using the platform, but completing your profile
      helps tutors understand your requirements better.
    </span>
  </div>
)}

      <div className="mx-auto mt-4 max-w-3xl space-y-6">

        <h1 className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>Profile</h1>

        {/* ================= Parent Info ================= */}
        <section className="rounded-md border border-[#1C2B22]/10 bg-white p-6">
          <h2 className="mb-4 text-base font-semibold text-[#1C2B22]">Parent information</h2>

          {/* ✅ YE BLOCK ADD KARO */}
<div className="mb-6 flex items-center gap-4">
  <div className="relative">
    <img
      src={photo || "/default-avatar.png"}
      alt="Profile"
      className="h-20 w-20 rounded-full border-2 border-[#1C2B22]/10 object-cover"
    />
    <label className="absolute bottom-0 right-0 flex h-6 w-6 cursor-pointer items-center justify-center
                       rounded-full bg-[#D79A2C] text-[#17261D] transition-colors hover:bg-[#c4891f]">
      <Pencil className="h-3 w-3" />
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handlePhotoUpload}
      />
    </label>
  </div>
  <div>
    <p className="font-medium text-[#1C2B22]">{form.fullName}</p>
    <p className="text-sm text-[#58646C]">
      {uploading ? "Uploading..." : "Click pencil to change photo"}
    </p>
  </div>
</div>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              className={inputClass}
              value={form.fullName}
              onChange={(e) =>
                setForm({ ...form, fullName: e.target.value })
              }
            />
            <input
              className={inputClass}
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
            <input
              disabled
              className={`${inputClass} bg-[#F7F2E9] text-[#58646C]`}
              value={form.email}
            />
          </div>
        </section>

        {/* ================= Students ================= */}
        <section className="space-y-4 rounded-md border border-[#1C2B22]/10 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#1C2B22]">Students</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="rounded-md bg-[#D79A2C] px-3 py-1.5 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
            >
              + Add student
            </button>
          </div>

          {students.length === 0 && (
            <p className="text-sm text-[#58646C]">No students added yet</p>
          )}

          <div className="divide-y divide-[#1C2B22]/10">
            {students.map((student) => (
              <div
                key={student._id}
                className="space-y-1 py-4 first:pt-0"
              >
                <p className="font-medium text-[#1C2B22]">{student.full_name}</p>
                <p className="text-sm text-[#58646C]">
                  Class {student.class} · {student.board}
                </p>
                <p className="text-sm text-[#1C2B22]">{student.institution_name}</p>
                <p className="text-sm text-[#58646C]">
                  Subjects: {student.subjects_required.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= Preferences ================= */}
        <section className="rounded-md border border-[#1C2B22]/10 bg-white p-6">
          <label className="flex items-center justify-between">
            <span className="font-medium text-[#1C2B22]">WhatsApp notifications</span>
            <input
              type="checkbox"
              checked={form.notificationWhatsapp}
              onChange={(e) =>
                setForm({
                  ...form,
                  notificationWhatsapp: e.target.checked,
                })
              }
              className="accent-[#D79A2C]"
            />
          </label>
        </section>

        <button
          onClick={handleSaveProfile}
          disabled={saving}
          className="rounded-md bg-[#D79A2C] px-6 py-2 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save profile"}
        </button>
      </div>

      {/* ================= Add Student Modal ================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-96 space-y-3 rounded-md bg-white p-6">
            <h3 className="text-base font-semibold text-[#1C2B22]">Add student</h3>

            <input
              className={inputClass}
              placeholder="Student name"
              value={newStudent.full_name}
              onChange={(e) =>
                setNewStudent({ ...newStudent, full_name: e.target.value })
              }
            />

            <div className="grid grid-cols-2 gap-2">
              <input
                className={inputClass}
                placeholder="Class"
                value={newStudent.class}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, class: e.target.value })
                }
              />
              <input
                className={inputClass}
                placeholder="Board"
                value={newStudent.board}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, board: e.target.value })
                }
              />
            </div>

            <input
              className={inputClass}
              placeholder="School / college"
              value={newStudent.institution_name}
              onChange={(e) =>
                setNewStudent({
                  ...newStudent,
                  institution_name: e.target.value,
                })
              }
            />

            <input
              className={inputClass}
              placeholder="Subjects (comma separated)"
              value={newStudent.subjects_required}
              onChange={(e) =>
                setNewStudent({
                  ...newStudent,
                  subjects_required: e.target.value,
                })
              }
            />

            <textarea
              className={inputClass}
              placeholder="Additional notes (optional)"
              rows={2}
              value={newStudent.additional_notes}
              onChange={(e) =>
                setNewStudent({
                  ...newStudent,
                  additional_notes: e.target.value,
                })
              }
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-md border border-[#1C2B22]/15 px-4 py-1.5 text-sm text-[#1C2B22]"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStudent}
                className="rounded-md bg-[#D79A2C] px-4 py-1.5 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </ParentDashboardLayout>
  );
}
