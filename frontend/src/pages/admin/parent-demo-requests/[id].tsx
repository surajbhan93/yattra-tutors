import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { lora, dmSans } from "@/lib/fonts";
import AdminDashboardLayout from "@/components/admin-dashboard/AdminDashboardLayout";
import adminApi from "@/lib/adminApi";

/* ======================
   TYPES
====================== */
interface Tutor {
  _id: string;
  fullName: string;
}

interface DemoRequest {
  _id: string;

  academicNeeds: string[];
  scheduling: string[];        // ✅ ADD
  location: string;            // ✅ ADD
  urgency: string;

  board: string;               // ✅ ADD
  classGrade: string;          // ✅ ADD

  status: string;
  adminNote?: string;          // ✅ ADD
  createdAt: string;

  parent: {
    _id: string;
    fullName: string;
    email: string;
    phone?: string;
  };

  requestedTutor: {
    _id: string;
    fullName: string;
    subjects?: string[];
  };

  tutor?: {
    _id: string;
    fullName: string;
    subjects?: string[];
  } | null;

  student?: {
  _id: string;
  full_name: string;
  class_grade: string;

};
// 🔥 ADD THIS LINE
  studentDisplayName?: string | null;

}

/* ======================
   PAGE
====================== */
export default function ParentDemoRequestViewPage() {
  const router = useRouter();
  const { id } = router.query;

  const [request, setRequest] = useState<DemoRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [tutors, setTutors] = useState<Tutor[]>([]);
const [selectedTutor, setSelectedTutor] = useState("");
  /* ======================
     FETCH
  ====================== */
  useEffect(() => {
    if (!id) return;

    const fetchRequest = async () => {
      try {
        const res = await adminApi.get(
          `/admin/parent-requests/${id}`
        );
        setRequest(res.data.data);
        setStatus(res.data.data.status);
      } catch (err) {
        alert("Failed to load demo request");
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [id]);

  // get tutors list

  useEffect(() => {
  const fetchTutors = async () => {
    try {
      // /admin/tutors
      const res = await adminApi.get("/tutors");
      setTutors(res.data.data);
    } catch (err) {
      console.error("Failed to load tutors");
    }
  };

  fetchTutors();
}, []);

const assignTutor = async () => {
  try {
    const res = await adminApi.patch(
      `/admin/parent-requests/${id}`,
      {
        status: "assigned",
        tutorId: selectedTutor,
        adminNote: "Tutor assigned by admin",
      }
    );

    setRequest(res.data.data);
    setStatus("assigned");

    alert("Tutor assigned successfully");
  } catch (err: any) {
    console.error(err?.response?.data || err);
    alert(
      err?.response?.data?.error ||
      "Failed to assign tutor"
    );
  }
};

  /* ======================
     UPDATE STATUS
  ====================== */
 const updateStatus = async () => {
  try {
    const res = await adminApi.patch(
      `/admin/parent-requests/${id}`,
      {
        status,
        adminNote: "Updated from admin panel",
      }
    );

    // 🔥 IMPORTANT: local state update
    setRequest(res.data.data);

    alert("Status updated successfully");
  } catch (err: any) {
    console.error(err?.response?.data || err);
    alert("Failed to update status");
  }
};

  if (loading) {
    return (
      <AdminDashboardLayout>
        <p className={`${dmSans.className} text-sm text-[#58646C]`}>Loading...</p>
      </AdminDashboardLayout>
    );
  }

  if (!request) {
    return (
      <AdminDashboardLayout>
        <p className={`${dmSans.className} text-sm text-[#58646C]`}>Request not found</p>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout>
      <div className={`${dmSans.className} max-w-4xl space-y-5`}>
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#0E211C]/10 pb-4">
          <div>
            <h1 className={`${lora.className} text-2xl font-semibold text-[#0E211C]`}>
              Demo Request Details
            </h1>
            <p className="text-xs text-[#58646C] mt-1">
              Request ID: {request._id}
            </p>
          </div>

          <button
            onClick={() => router.back()}
            className="text-sm font-medium text-[#8a5f18] hover:underline"
          >
            ← Back
          </button>
        </div>

        {/* Parent */}
        <div className="overflow-hidden rounded-md border border-[#0E211C]/10 bg-white">
          <div className="border-b border-[#0E211C]/10 bg-[#F7F2E9] px-5 py-2.5">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-[#58646C]">
              Parent Information
            </h2>
          </div>
          <div className="px-5 py-4">
            <p
              className="font-medium text-[#8a5f18] cursor-pointer hover:underline"
              onClick={() =>
                router.push(`/admin/parent/${request.parent._id}`)
              }
            >
              {request.parent.fullName}
            </p>

            <p className="text-sm text-[#58646C] mt-1">
              {request.parent.email}
            </p>
            {request.parent.phone && (
              <p className="text-sm text-[#58646C]">
                {request.parent.phone}
              </p>
            )}
          </div>
        </div>

        {/* Tutor */}
<div className="overflow-hidden rounded-md border border-[#0E211C]/10 bg-white">
  <div className="border-b border-[#0E211C]/10 bg-[#F7F2E9] px-5 py-2.5">
    <h2 className="text-xs font-semibold uppercase tracking-wide text-[#58646C]">
      Tutor Information
    </h2>
  </div>

  <div className="px-5 py-4">
  {request.tutor ? (
  <>
    <p className="text-xs text-[#58646C]">Assigned Tutor</p>
    <p
      className="font-medium text-[#8a5f18] cursor-pointer hover:underline"
      onClick={() =>
        router.push(`/admin/tutor/${request.tutor!._id}`)
      }
    >
      {request.tutor.fullName}
    </p>
  </>
) : request.requestedTutor ? (
  <>
    <p className="text-xs text-[#58646C]">
      Requested Tutor (Parent Preference)
    </p>
    <p
      className="font-medium text-[#8a5f18] cursor-pointer hover:underline"
      onClick={() =>
        router.push(
          `/admin/tutor/${request.requestedTutor._id}`
        )
      }
    >
      {request.requestedTutor.fullName}
    </p>
  </>
) : (
  <p className="text-[#58646C]">
    Tutor information not available
  </p>
)}

 {!request.tutor && (
  <div className="mt-3 space-y-2">
    <select
      value={selectedTutor}
      onChange={(e) => setSelectedTutor(e.target.value)}
      className="w-full rounded-md border border-[#0E211C]/15 px-3 py-2 text-sm text-[#0E211C] outline-none focus:border-[#D79A2C]"
    >
      <option value="">Select Tutor</option>
      {tutors.map((t) => (
        <option key={t._id} value={t._id}>
          {t.fullName}
        </option>
      ))}
    </select>

    <button
      disabled={!selectedTutor}
      onClick={assignTutor}
      className="rounded-md bg-[#0E211C] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#132B22] disabled:opacity-40"
    >
      Assign Tutor
    </button>
  </div>
)}
  </div>
</div>

 {/* Student Information */}
{/* {request.student && (
  <div className="rounded-xl border bg-white p-4 shadow">
    <h2 className="font-semibold mb-2">
      Student Information
    </h2>

    <p>
      <b>Name:</b> {request.student.full_name}
    </p>

    <p>
      <b>Class:</b> {request.student.class_grade}
    </p>
  </div>
)} */}
{(request.student || request.studentDisplayName) && (
  <div className="overflow-hidden rounded-md border border-[#0E211C]/10 bg-white">
    <div className="border-b border-[#0E211C]/10 bg-[#F7F2E9] px-5 py-2.5">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-[#58646C]">
        Student Information
      </h2>
    </div>

    <div className="divide-y divide-[#0E211C]/10">
      <div className="flex items-baseline justify-between gap-4 px-5 py-3">
        <span className="text-xs font-medium text-[#58646C]">Name</span>
        <span className="text-sm font-medium text-[#0E211C]">
          {request.student
            ? request.student.full_name
            : request.studentDisplayName}
        </span>
      </div>

      {request.student && (
        <div className="flex items-baseline justify-between gap-4 px-5 py-3">
          <span className="text-xs font-medium text-[#58646C]">Class</span>
          <span className="text-sm font-medium text-[#0E211C]">
            {request.student.class_grade}
          </span>
        </div>
      )}
    </div>
  </div>
)}

        {/* Academic */}
<div className="overflow-hidden rounded-md border border-[#0E211C]/10 bg-white">
  <div className="border-b border-[#0E211C]/10 bg-[#F7F2E9] px-5 py-2.5">
    <h2 className="text-xs font-semibold uppercase tracking-wide text-[#58646C]">
      Academic Details
    </h2>
  </div>

  <div className="divide-y divide-[#0E211C]/10">
    <div className="flex items-baseline justify-between gap-4 px-5 py-3">
      <span className="text-xs font-medium text-[#58646C]">Subjects</span>
      <span className="text-sm font-medium text-[#0E211C] text-right">
        {request.academicNeeds.join(", ")}
      </span>
    </div>

    <div className="flex items-baseline justify-between gap-4 px-5 py-3">
      <span className="text-xs font-medium text-[#58646C]">Board</span>
      <span className="text-sm font-medium text-[#0E211C]">{request.board}</span>
    </div>

    <div className="flex items-baseline justify-between gap-4 px-5 py-3">
      <span className="text-xs font-medium text-[#58646C]">Class</span>
      <span className="text-sm font-medium text-[#0E211C]">{request.classGrade}</span>
    </div>

    <div className="flex items-baseline justify-between gap-4 px-5 py-3">
      <span className="text-xs font-medium text-[#58646C]">Preferred Schedule</span>
      <span className="text-sm font-medium text-[#0E211C] text-right">
        {request.scheduling.length
          ? request.scheduling.join(", ")
          : "Not specified"}
      </span>
    </div>

    <div className="flex items-baseline justify-between gap-4 px-5 py-3">
      <span className="text-xs font-medium text-[#58646C]">Location</span>
      <span className="text-sm font-medium text-[#0E211C]">{request.location}</span>
    </div>

    <div className="flex items-baseline justify-between gap-4 px-5 py-3">
      <span className="text-xs font-medium text-[#58646C]">Urgency</span>
      <span className="text-sm font-medium text-[#0E211C]">{request.urgency}</span>
    </div>

    <div className="flex items-baseline justify-between gap-4 px-5 py-3">
      <span className="text-xs font-medium text-[#58646C]">Requested On</span>
      <span className="text-sm font-medium text-[#0E211C]">
        {new Date(request.createdAt).toLocaleString()}
      </span>
    </div>
  </div>
</div>

        {/* Actions */}
        <div className="overflow-hidden rounded-md border border-[#0E211C]/10 bg-white">
          <div className="border-b border-[#0E211C]/10 bg-[#F7F2E9] px-5 py-2.5">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-[#58646C]">
              Admin Actions
            </h2>
          </div>

          <div className="px-5 py-4 space-y-3">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-md border border-[#0E211C]/15 px-3 py-2 text-sm text-[#0E211C] outline-none focus:border-[#D79A2C]"
            >
              <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
          <option
  value="assigned"
  disabled={!request.tutor}
>
  Assigned
</option>

            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>

            </select>
            {request.adminNote && (
  <div className="rounded-md border border-[#D79A2C]/30 bg-[#D79A2C]/10 p-3 text-sm text-[#0E211C]">
    <b>Admin Note:</b> {request.adminNote}
  </div>
)}

            <div>
              <button
                onClick={updateStatus}
                className="rounded-md bg-[#D79A2C] px-4 py-2 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
