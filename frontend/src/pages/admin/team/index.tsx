import { useEffect, useState } from "react";
import AdminDashboardLayout from "@/components/admin-dashboard/AdminDashboardLayout";
import apiClient from "@/lib/adminApi";
import toast from "react-hot-toast";
import { Lora } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"] });

/* ======================
   TYPES
====================== */
interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
  linkedin?: string;
  isFounder?: boolean; // 👈 ADD
}


/* ======================
   PAGE
====================== */
export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);

  const [form, setForm] = useState({
  name: "",
  role: "",
  bio: "",
  image: "",
  linkedin: "",
  isFounder: false, // 👈 ADD
});


  /* ======================
     FETCH TEAM
  ====================== */
  const fetchTeam = async () => {
    try {
      const res = await apiClient.get("/team");
      setTeam(res.data.data || []);
    } catch {
      toast.error("Failed to load team");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  /* ======================
     FORM HANDLERS
  ====================== */
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setEditing(null);
    setForm({
      name: "",
      role: "",
      bio: "",
      image: "",
      linkedin: "",
      isFounder: false, // 👈 ADD
    });
    setOpen(true);
  };

  const openEditModal = (m: TeamMember) => {
    setEditing(m);
    setForm({
        name: m.name,
        role: m.role,
        bio: m.bio || "",
        image: m.image || "",
        linkedin: m.linkedin || "",
        isFounder: m.isFounder || false, // 👈 ADD
      });

    setOpen(true);
  };

  /* ======================
     SUBMIT (ADD / UPDATE)
  ====================== */
  const submitForm = async () => {
    try {
      if (editing) {
        await apiClient.put(`/admin/team/${editing._id}`, form);
        toast.success("Team member updated");
      } else {
        await apiClient.post("/admin/team", form);
        toast.success("Team member added");
      }

      setOpen(false);
      fetchTeam();
    } catch {
      toast.error("Action failed");
    }
  };

  /* ======================
     DELETE
  ====================== */
  const deleteTeam = async (id: string) => {
    if (!confirm("Delete this team member?")) return;

    try {
      await apiClient.delete(`/admin/team/${id}`);
      toast.success("Team member deleted");
      fetchTeam();
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ======================
     UI
  ====================== */
  return (
    <AdminDashboardLayout>
      <div className="space-y-6 bg-[#F7F2E9] p-6">
        <div className="flex items-center justify-between border-b border-[#1C2B22]/10 pb-5">
          <h1 className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>Team management</h1>

          <button
            onClick={openAddModal}
            className="rounded-sm bg-[#D79A2C] px-4 py-2 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
          >
            + Add member
          </button>
        </div>

        {/* TABLE */}
        {loading ? (
          <p className="text-sm text-[#58646C]">Loading...</p>
        ) : team.length === 0 ? (
          <p className="text-sm text-[#9AA3AB]">No team members found</p>
        ) : (
          <div className="overflow-x-auto rounded-md border border-[#1C2B22]/10 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1C2B22]/10 text-left text-xs font-semibold uppercase tracking-wide text-[#58646C]">
                  <th className="p-4">Name</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C2B22]/8">
                {team.map((m) => (
                  <tr key={m._id} className="hover:bg-[#F7F2E9]/60">
                    <td className="p-4 font-medium text-[#1C2B22]">
                      {m.name}
                      {m.isFounder && (
                        <span className="ml-2 rounded-sm border border-[#D79A2C]/40 px-1.5 py-0.5 text-[10px] font-semibold text-[#8a5f18]">
                          Founder
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-[#58646C]">{m.role}</td>
                    <td className="p-4 space-x-4">
                      <button
                        onClick={() => openEditModal(m)}
                        className="text-xs font-semibold text-[#1C2B22] underline-offset-2 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTeam(m._id)}
                        className="text-xs font-semibold text-red-700 underline-offset-2 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* MODAL */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E211C]/50">
            <div className="w-full max-w-md space-y-4 rounded-md border border-[#1C2B22]/10 bg-white p-6">
              <h2 className={`${lora.className} text-lg font-semibold text-[#1C2B22]`}>
                {editing ? "Edit team member" : "Add team member"}
              </h2>

              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-sm border border-[#1C2B22]/15 px-3 py-2 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
              />

              <input
                name="role"
                placeholder="Role"
                value={form.role}
                onChange={handleChange}
                className="w-full rounded-sm border border-[#1C2B22]/15 px-3 py-2 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
              />

              <textarea
                name="bio"
                placeholder="Bio"
                value={form.bio}
                onChange={handleChange}
                className="w-full rounded-sm border border-[#1C2B22]/15 px-3 py-2 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
              />

              <input
                name="image"
                placeholder="Image URL"
                value={form.image}
                onChange={handleChange}
                className="w-full rounded-sm border border-[#1C2B22]/15 px-3 py-2 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
              />

              <input
                name="linkedin"
                placeholder="LinkedIn URL"
                value={form.linkedin}
                onChange={handleChange}
                className="w-full rounded-sm border border-[#1C2B22]/15 px-3 py-2 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
              />

               <label className="flex items-center gap-2 text-sm text-[#1C2B22]">
              <input
                type="checkbox"
                checked={form.isFounder}
                onChange={(e) =>
                  setForm({ ...form, isFounder: e.target.checked })
                }
                className="accent-[#D79A2C]"
              />
              Set as founder
            </label>


              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-sm border border-[#1C2B22]/15 px-4 py-2 text-sm font-medium text-[#1C2B22] hover:border-[#1C2B22]/30"
                >
                  Cancel
                </button>
                <button
                  onClick={submitForm}
                  className="rounded-sm bg-[#D79A2C] px-4 py-2 text-sm font-semibold text-[#17261D] hover:bg-[#c4891f]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}
