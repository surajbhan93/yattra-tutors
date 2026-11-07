import { useEffect, useState } from "react";
import Link from "next/link";
import apiClient from "@/lib/apiClient";
import AdminDashboardLayout from "@/components/admin-dashboard/AdminDashboardLayout";
import {
  Search, Check, X, User, Mail, Phone, MapPin, Calendar,
  Filter, Eye, CheckCircle, XCircle, Clock, AlertCircle,
  Loader, Users, TrendingUp
} from "lucide-react";
import toast from "react-hot-toast";
import { lora } from "@/lib/fonts";

/* ---------------- TYPES ---------------- */
interface Parent {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  location?: {
    city?: string;
    area?: string;
  } | null;
}

/* ---------------- STATUS BADGE ---------------- */
const StatusBadge = ({ status }: { status: string }) => {
  const configs = {
    pending: {
      text: "text-[#8a5f18] border-[#D79A2C]/40",
      icon: Clock,
      dot: "bg-[#D79A2C]",
    },
    approved: {
      text: "text-[#3f8a5f] border-[#3f8a5f]/40",
      icon: CheckCircle,
      dot: "bg-[#3f8a5f]",
    },
    rejected: {
      text: "text-red-700 border-red-400/40",
      icon: XCircle,
      dot: "bg-red-500",
    },
  };

  const config = configs[status as keyof typeof configs] || configs.pending;
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 ${config.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      <Icon size={13} />
      <span className="text-xs font-semibold capitalize">{status}</span>
    </div>
  );
};

/* ---------------- PAGE ---------------- */
export default function AdminParentsPage() {
  const [parents, setParents] = useState<Parent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  /* ---------------- FETCH ---------------- */
  const fetchParents = async () => {
    try {
      const res = await apiClient.get("/auth/admin/parents");
      setParents(res.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to load parents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParents();
  }, []);

  /* ---------------- UPDATE STATUS ---------------- */
  const updateStatus = async (
    parentId: string,
    status: "approved" | "rejected"
  ) => {
    if (!confirm(`Are you sure you want to ${status} this parent?`)) return;

    try {
      setUpdatingId(parentId);
      await apiClient.patch(`/auth/admin/parent/${parentId}/status`, { status });
      toast.success(`Parent ${status} successfully!`);

      setParents((prev) =>
        prev.map((p) => (p._id === parentId ? { ...p, status } : p))
      );
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Update failed");
    } finally {
      setUpdatingId(null);
    }
  };

  /* ---------------- FILTER ---------------- */
  const filtered = parents.filter((p) => {
    const matchesSearch =
      p.fullName.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search) ||
      p.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || p.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  /* ---------------- STATS ---------------- */
  const stats = {
    total: parents.length,
    pending: parents.filter(p => p.status === 'pending').length,
    approved: parents.filter(p => p.status === 'approved').length,
    rejected: parents.filter(p => p.status === 'rejected').length,
  };

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="flex h-[80vh] items-center justify-center bg-[#F7F2E9]">
          <div className="space-y-3 text-center">
            <Loader className="mx-auto h-8 w-8 animate-spin text-[#D79A2C]" />
            <p className="text-sm text-[#58646C]">Loading parents...</p>
          </div>
        </div>
      </AdminDashboardLayout>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <AdminDashboardLayout>
      <div className="space-y-6 bg-[#F7F2E9] p-6">

        {/* Header */}
        <div className="flex flex-col gap-3 border-b border-[#1C2B22]/10 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>
              Parent registrations
            </h1>
            <p className="mt-1 text-sm text-[#58646C]">
              Manage and approve parent accounts
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#58646C]">
            <Users size={16} className="text-[#D79A2C]" />
            <span>{stats.total} total parents</span>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 divide-x divide-[#1C2B22]/10 rounded-md border border-[#1C2B22]/10 bg-white md:grid-cols-4">
          <StatCell label="Total" value={stats.total} />
          <StatCell label="Pending" value={stats.pending} accent="text-[#8a5f18]" />
          <StatCell label="Approved" value={stats.approved} accent="text-[#3f8a5f]" />
          <StatCell label="Rejected" value={stats.rejected} accent="text-red-700" />
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 rounded-md border border-[#1C2B22]/10 bg-white p-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA3AB]" size={16} />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-sm border border-[#1C2B22]/15 py-2 pl-9 pr-3 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-[#9AA3AB]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="min-w-[150px] cursor-pointer rounded-sm border border-[#1C2B22]/15 bg-white px-3 py-2 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
            >
              <option value="all">All statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Parent list */}
        {filtered.length === 0 ? (
          <div className="rounded-md border border-dashed border-[#1C2B22]/20 bg-white p-14 text-center">
            <AlertCircle className="mx-auto mb-3 h-10 w-10 text-[#9AA3AB]" />
            <h3 className="text-base font-semibold text-[#1C2B22]">No parents found</h3>
            <p className="mt-1 text-sm text-[#58646C]">
              {parents.length === 0
                ? "No parent registrations yet."
                : "Try adjusting your filters or search query."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#1C2B22]/8 rounded-md border border-[#1C2B22]/10 bg-white">
            {filtered.map((parent) => {
              const isPending = parent.status === 'pending';

              return (
                <div key={parent._id} className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">

                  {/* Left: Parent Info */}
                  <div className="flex flex-1 items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm border border-[#1C2B22]/15 text-sm font-semibold text-[#1C2B22]">
                      {parent.fullName.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-semibold text-[#1C2B22]">{parent.fullName}</h3>
                          <div className="mt-1.5 flex flex-wrap items-center gap-4 text-xs text-[#58646C]">
                            <span className="flex items-center gap-1.5">
                              <Mail size={12} />
                              {parent.email}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Phone size={12} />
                              {parent.phone}
                            </span>
                            {parent.location?.city && (
                              <span className="flex items-center gap-1.5">
                                <MapPin size={12} />
                                {parent.location.area ? `${parent.location.area}, ` : ''}{parent.location.city}
                              </span>
                            )}
                          </div>
                        </div>
                        <StatusBadge status={parent.status} />
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-[#9AA3AB]">
                        <Calendar size={11} />
                        <span>Joined {new Date(parent.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-shrink-0 gap-2">
                    {isPending ? (
                      <>
                        <button
                          disabled={updatingId === parent._id}
                          onClick={() => updateStatus(parent._id, "approved")}
                          className="flex items-center gap-1.5 rounded-sm bg-[#3f8a5f] px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#357a52] disabled:cursor-not-allowed disabled:bg-[#9AA3AB]"
                        >
                          {updatingId === parent._id ? (
                            <Loader className="animate-spin" size={14} />
                          ) : (
                            <CheckCircle size={14} />
                          )}
                          <span>Approve</span>
                        </button>

                        <button
                          disabled={updatingId === parent._id}
                          onClick={() => updateStatus(parent._id, "rejected")}
                          className="flex items-center gap-1.5 rounded-sm border border-red-300 px-3.5 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {updatingId === parent._id ? (
                            <Loader className="animate-spin" size={14} />
                          ) : (
                            <XCircle size={14} />
                          )}
                          <span>Reject</span>
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center gap-1.5 rounded-sm border border-[#1C2B22]/10 px-3 py-1.5 text-xs text-[#9AA3AB]">
                        <AlertCircle size={13} />
                        <span>No actions available</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}

/* ---------------- STAT CELL ---------------- */
function StatCell({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: string;
}) {
  return (
    <div className="p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-[#9AA3AB]">{label}</p>
      <p className={`mt-1 text-2xl font-semibold ${accent || "text-[#1C2B22]"}`}>{value}</p>
    </div>
  );
}
