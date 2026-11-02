import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Lora, DM_Sans } from "next/font/google";
import {
  Search, Filter, Calendar, User, Mail, Phone, BookOpen,
  Clock, CheckCircle, XCircle, Eye, AlertCircle, TrendingUp,
  Users, Bell, MessageSquare, Loader, ArrowUpRight, Target
} from "lucide-react";

import AdminDashboardLayout from "@/components/admin-dashboard/AdminDashboardLayout";
import adminApi from "@/lib/adminApi";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

/* ======================
   TYPES
====================== */
interface ParentDemoRequest {
  _id: string;
  academicNeeds: string[];
  status: string;
  createdAt: string;
  parent: {
    _id: string;
    fullName: string;
    email: string;
    phone?: string;
  };

  // Parent requested this tutor
  requestedTutor: {
    _id: string;
    fullName: string;
    subjects?: string[];
  };

  // Admin assigned tutor (optional)
  tutor?: {
    _id: string;
    fullName: string;
    subjects?: string[];
  } | null;

  urgency?: string;
  location?: {
    city?: string;
    area?: string;
  };
}

/* ======================
   STATUS BADGE
====================== */
const StatusBadge = ({ status }: { status: string }) => {
  const configs = {
    pending: {
      bg: 'bg-amber-50 border-amber-200',
      text: 'text-amber-700',
      icon: Clock,
      dot: 'bg-amber-500'
    },
    contacted: {
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-700',
      icon: MessageSquare,
      dot: 'bg-blue-500'
    },
    assigned: {
      bg: 'bg-indigo-50 border-indigo-200',
      text: 'text-indigo-700',
      icon: Users,
      dot: 'bg-indigo-500'
    },
    completed: {
      bg: 'bg-emerald-50 border-emerald-200',
      text: 'text-emerald-700',
      icon: CheckCircle,
      dot: 'bg-emerald-500'
    },
    cancelled: {
      bg: 'bg-rose-50 border-rose-200',
      text: 'text-rose-700',
      icon: XCircle,
      dot: 'bg-rose-500'
    },
  };

  const config = configs[status as keyof typeof configs] || configs.pending;
  const Icon = config.icon;

  return (
    <div className="inline-flex items-center gap-1.5 rounded-md border border-[#0E211C]/10 bg-[#F7F2E9] px-2.5 py-1">
      <Icon size={13} className="text-[#58646C]" />
      <span className="text-xs font-medium text-[#0E211C] capitalize">{status}</span>
    </div>
  );
};

/* ======================
   PAGE
====================== */
export default function ParentDemoRequestsPage() {
  const router = useRouter();

  const [requests, setRequests] = useState<ParentDemoRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  /* ======================
     FETCH
  ====================== */
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await adminApi.get("/admin/parent-requests");
        setRequests(res.data.data);
      } catch (err) {
        alert("Failed to load parent demo requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  /* ======================
     FILTER
  ====================== */
const filteredRequests = useMemo(() => {
  return requests
    .filter((r) => r.parent && r.requestedTutor) // ← skip null records
    .filter((r) => statusFilter === "all" || r.status === statusFilter)
    .filter((r) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        r.parent?.fullName?.toLowerCase().includes(q) ||
        r.tutor?.fullName?.toLowerCase().includes(q) ||
        r.requestedTutor?.fullName?.toLowerCase().includes(q)
      );
    });
}, [requests, searchQuery, statusFilter]);
  /* ======================
     UI
  ====================== */

  // Calculate stats
  const stats = useMemo(() => ({
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    contacted: requests.filter(r => r.status === 'contacted').length,
    assigned: requests.filter(r => r.status === 'assigned').length,
    completed: requests.filter(r => r.status === 'completed').length,
    cancelled: requests.filter(r => r.status === 'cancelled').length,
  }), [requests]);

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className={`${dmSans.className} flex items-center justify-center h-[80vh]`}>
          <div className="text-center space-y-4">
            <Loader className="w-8 h-8 text-[#D79A2C] animate-spin mx-auto" />
            <p className="text-[#58646C] text-sm">Loading demo requests...</p>
          </div>
        </div>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout>
      <div className={`${dmSans.className} space-y-5 p-6`}>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#0E211C]/10 pb-5">
          <div>
            <h1 className={`${lora.className} text-3xl font-semibold text-[#0E211C]`}>
              Demo Requests
            </h1>
            <p className="mt-1 text-sm text-[#58646C]">
              Manage parent demo class requests and assignments
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-md border border-[#0E211C]/10 bg-[#F7F2E9] px-4 py-2">
            <Calendar className="text-[#8a5f18]" size={16} />
            <span className="text-sm font-medium text-[#0E211C]">{stats.total} Total Requests</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <StatCard label="Total" value={stats.total} color="indigo" icon={Target} />
          <StatCard label="Pending" value={stats.pending} color="amber" icon={Clock} />
          <StatCard label="Contacted" value={stats.contacted} color="blue" icon={MessageSquare} />
          <StatCard label="Assigned" value={stats.assigned} color="purple" icon={Users} />
          <StatCard label="Completed" value={stats.completed} color="emerald" icon={CheckCircle} />
          <StatCard label="Cancelled" value={stats.cancelled} color="rose" icon={XCircle} />
        </div>

        {/* Filters */}
        <div className="rounded-md border border-[#0E211C]/10 bg-white p-4">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA3AB]" size={16} />
              <input
                type="text"
                placeholder="Search by parent, tutor, or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-[#0E211C]/15 rounded-md focus:ring-1 focus:ring-[#D79A2C] focus:border-[#D79A2C] outline-none transition-colors text-sm text-[#0E211C]"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-[#9AA3AB]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-[#0E211C]/15 rounded-md focus:ring-1 focus:ring-[#D79A2C] outline-none text-sm text-[#0E211C] cursor-pointer bg-white min-w-[160px]"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="assigned">Assigned</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Demo Requests Ledger */}
        {filteredRequests.length === 0 ? (
          <div className="rounded-md border border-dashed border-[#0E211C]/20 bg-white p-16 text-center">
            <AlertCircle className="w-10 h-10 text-[#9AA3AB] mx-auto mb-3" />
            <h3 className="text-base font-semibold text-[#0E211C] mb-1">No Demo Requests Found</h3>
            <p className="text-sm text-[#58646C]">
              {requests.length === 0
                ? "No demo requests have been submitted yet."
                : "Try adjusting your filters or search query."}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-md border border-[#0E211C]/10 bg-white">
            <div className="divide-y divide-[#0E211C]/10">
              {filteredRequests.map((req) => (
                <div key={req._id} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-5 py-4 hover:bg-[#F7F2E9]/60 transition-colors">

                  {/* Left: Request Info */}
                  <div className="flex-1 space-y-2.5">

                    {/* Parent & Tutor Row */}
                    <div className="flex flex-wrap items-start gap-6">

                      {/* Parent Info */}
                      <div className="flex items-start gap-2.5 min-w-[200px]">
                        <User className="mt-0.5 text-[#9AA3AB] flex-shrink-0" size={16} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] text-[#58646C] font-medium">Parent</p>
                          <button
                            onClick={() => router.push(`/admin/parent/${req.parent._id}`)}
                            className="font-medium text-[#0E211C] hover:text-[#8a5f18] transition-colors truncate block text-left"
                          >
                            {req.parent.fullName}
                          </button>
                          <div className="flex items-center gap-1.5 text-xs text-[#58646C] mt-0.5">
                            <Mail size={11} />
                            <span className="truncate">{req.parent.email}</span>
                          </div>
                          {req.parent.phone && (
                            <div className="flex items-center gap-1.5 text-xs text-[#58646C] mt-0.5">
                              <Phone size={11} />
                              <span>{req.parent.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="hidden lg:block">
                        <ArrowUpRight className="text-[#0E211C]/15" size={18} />
                      </div>

                      {/* Tutor Info */}
                      <div className="flex items-start gap-2.5 min-w-[200px]">
                        <Users className="mt-0.5 text-[#9AA3AB] flex-shrink-0" size={16} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] text-[#58646C] font-medium">
                            {req.tutor ? 'Assigned Tutor' : 'Requested Tutor'}
                          </p>
                          <button
                            onClick={() => {
                              const tutorId = req.tutor?._id || req.requestedTutor?._id;
                              if (tutorId) router.push(`/admin/tutor/${tutorId}`);
                            }}
                            className="font-medium text-[#0E211C] hover:text-[#8a5f18] transition-colors truncate block text-left"
                          >
                            {req.tutor?.fullName || req.requestedTutor?.fullName || "—"}
                          </button>
                          {(req.tutor?.subjects || req.requestedTutor?.subjects) && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {(req.tutor?.subjects || req.requestedTutor?.subjects)?.slice(0, 2).map((subject, idx) => (
                                <span key={idx} className="px-2 py-0.5 border border-[#0E211C]/10 text-[#58646C] rounded text-[11px] font-medium">
                                  {subject}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Subjects & Details */}
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="text-[#9AA3AB]" size={14} />
                        <div className="flex flex-wrap gap-1">
                          {req.academicNeeds.map((subject, idx) => (
                            <span key={idx} className="px-2 py-0.5 border border-[#0E211C]/10 bg-[#F7F2E9] text-[#0E211C] rounded text-[11px] font-medium">
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>

                      {req.location?.city && (
                        <div className="flex items-center gap-1.5 text-xs text-[#58646C]">
                          <div className="w-1 h-1 rounded-full bg-[#9AA3AB]" />
                          <span>{req.location.city}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-1.5 text-xs text-[#9AA3AB]">
                        <Clock size={11} />
                        <span>{new Date(req.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Status & Actions */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-2.5">
                    <StatusBadge status={req.status} />
                    <button
                      onClick={() => router.push(`/admin/parent-demo-requests/${req._id}`)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0E211C] hover:bg-[#132B22] text-white rounded-md text-sm font-medium transition-colors"
                    >
                      <Eye size={14} />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}

/* ======================
   STAT CARD
====================== */
function StatCard({
  label,
  value,
  color,
  icon: Icon
}: {
  label: string;
  value: number;
  color: string;
  icon: any;
}) {
  const colors = {
    indigo: 'from-indigo-500 to-purple-500',
    amber: 'from-amber-500 to-orange-500',
    blue: 'from-blue-500 to-cyan-500',
    purple: 'from-purple-500 to-pink-500',
    emerald: 'from-emerald-500 to-teal-500',
    rose: 'from-rose-500 to-pink-500',
  };

  return (
    <div className="rounded-md border border-[#0E211C]/10 bg-white p-3.5">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] font-medium text-[#58646C]">{label}</p>
        <Icon className="w-3.5 h-3.5 text-[#9AA3AB]" />
      </div>
      <p className={`${lora.className} text-2xl font-semibold text-[#0E211C]`}>{value}</p>
    </div>
  );
}
