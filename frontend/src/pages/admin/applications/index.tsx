import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import apiClient from "@/lib/apiClient";
import AdminDashboardLayout from "@/components/admin-dashboard/AdminDashboardLayout";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Search, Filter, UserCheck, Clock, CheckCircle, XCircle, Eye, Download, Mail, Phone, MapPin, AlertCircle, LayoutDashboard } from 'lucide-react';
import { displayFormattedPhone } from "@/lib/phoneUtils";
import { Lora } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"] });

interface TutorApplication {
  _id: string;
  id?: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  state?: string;
  status: "pending" | "approved" | "rejected";
  appliedDate: string;
  profileImage?: string;
}

const StatusBadge = ({ status }: { status: string }) => {
  const configs = {
    pending: { text: 'text-[#8a5f18]', icon: Clock, dot: 'bg-[#D79A2C]' },
    approved: { text: 'text-[#3f8a5f]', icon: CheckCircle, dot: 'bg-[#3f8a5f]' },
    rejected: { text: 'text-red-600', icon: XCircle, dot: 'bg-red-500' },
  };

  const config = configs[status.toLowerCase() as keyof typeof configs] || configs.pending;
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 text-xs font-semibold ${config.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      <Icon size={13} />
      <span className="capitalize">{status}</span>
    </div>
  );
};

export default function TutorApplicationsPage() {
  const [applications, setApplications] = useState<TutorApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await apiClient.get<TutorApplication[]>(
        "/auth/tutor-applications?status=all&limit=2000"
      );

      const safeData = (res.data || []).filter((app) => app && app._id);
      setApplications(safeData);
    } catch (err) {
      console.error("Failed to fetch applications", err);
      setError("Failed to load tutor applications");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (appId: string) => {
    if (!confirm("Are you sure you want to approve this tutor application?")) {
      return;
    }

    try {
      await apiClient.patch(`/auth/tutor-applications/${appId}`, {
        status: "approved"
      });

      setApplications(prev => prev.filter(app => app._id !== appId));
      alert("Tutor application approved successfully!");
    } catch (err: any) {
      alert("Failed to approve application. Please try again.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const filteredApplications = applications.filter(
    (app) =>
      (statusFilter === 'All' || app.status === statusFilter) &&
      (app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (app.phone && app.phone.includes(searchQuery)))
  );

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="flex h-[80vh] items-center justify-center">
          <div className="space-y-3 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#1C2B22]/15 border-t-[#D79A2C]" />
            <p className="text-sm text-[#58646C]">Loading applications...</p>
          </div>
        </div>
      </AdminDashboardLayout>
    );
  }

  if (error) {
    return (
      <AdminDashboardLayout>
        <div className="mx-auto mt-12 max-w-3xl">
          <div className="rounded-md border border-red-200 bg-red-50 p-8 text-center">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
            <h3 className={`${lora.className} mb-2 text-lg font-semibold text-red-700`}>Error loading data</h3>
            <p className="text-sm text-red-600">{error}</p>
            <button
              onClick={fetchApplications}
              className="mt-4 rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              Try again
            </button>
          </div>
        </div>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout>
      <div className="space-y-6 p-6">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Admin", href: "/admin/dashboard", icon: LayoutDashboard },
            { label: "Tutor Applications", icon: UserCheck },
          ]}
        />

        {/* Header Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>Tutor applications</h1>
            <p className="mt-1 text-sm text-[#58646C]">Review and manage tutor registration requests</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-md border border-[#1C2B22]/15 px-4 py-2 text-sm font-medium text-[#1C2B22] transition-colors hover:border-[#D79A2C]/50">
            <Download size={16} />
            Export CSV
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 divide-x divide-[#1C2B22]/[.06] rounded-md border border-[#1C2B22]/10 bg-white sm:grid-cols-4">
          {[
            { label: 'Total applications', value: stats.total, icon: UserCheck },
            { label: 'Pending review', value: stats.pending, icon: Clock },
            { label: 'Approved', value: stats.approved, icon: CheckCircle },
            { label: 'Rejected', value: stats.rejected, icon: XCircle },
          ].map((stat, idx) => (
            <div key={idx} className="flex items-center gap-3 p-5">
              <stat.icon className="h-5 w-5 flex-shrink-0 text-[#D79A2C]" />
              <div>
                <p className="text-xs text-[#9AA3AB]">{stat.label}</p>
                <p className={`${lora.className} text-xl font-semibold text-[#1C2B22]`}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AA3AB]" size={16} />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-[#1C2B22]/15 py-2.5 pl-10 pr-4 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-[#9AA3AB]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-md border border-[#1C2B22]/15 px-3 py-2.5 text-sm font-medium text-[#1C2B22] outline-none focus:border-[#D79A2C]"
            >
              <option value="All">All statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <div className="rounded-md border border-dashed border-[#1C2B22]/15 p-16 text-center">
            <Search className="mx-auto mb-4 h-10 w-10 text-[#9AA3AB]" />
            <h3 className={`${lora.className} mb-1 text-base font-semibold text-[#1C2B22]`}>No applications found</h3>
            <p className="text-sm text-[#58646C]">
              {applications.length === 0
                ? "No pending tutor applications at the moment."
                : "Try adjusting your filters or search query."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#1C2B22]/[.06] rounded-md border border-[#1C2B22]/10 bg-white">
            {filteredApplications.map((app) => {
              const address = [app.city, app.state].filter(Boolean).join(', ') || 'Not provided';
              const isPending = app.status.toLowerCase() === 'pending';

              return (
                <div key={app._id} className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
                  {/* Left: Tutor Info */}
                  <div className="flex flex-1 items-start gap-4">
                    {/* Profile Image/Avatar */}
                    <div className="flex-shrink-0">
                      {app.profileImage ? (
                        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-[#1C2B22]/10">
                          <Image src={app.profileImage} alt={app.name} fill className="object-cover" sizes="48px" />
                        </div>
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0E211C] text-base font-semibold text-[#D79A2C]">
                          {app.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Tutor Details */}
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-sm font-semibold text-[#1C2B22]">{app.name}</h3>
                        <StatusBadge status={app.status} />
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#58646C]">
                        <span className="flex items-center gap-1">
                          <Mail size={12} /> {app.email}
                        </span>
                        {app.phone && (
                          <span className="flex items-center gap-1">
                            <Phone size={12} /> {displayFormattedPhone(app.phone)}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <MapPin size={12} /> {address}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[#9AA3AB]">
                        <Clock size={12} />
                        Applied on {new Date(app.appliedDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2">
                    {isPending && (
                      <button
                        onClick={() => handleApprove(app._id)}
                        className="flex items-center gap-1.5 rounded-md bg-[#3f8a5f] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#357a52]"
                      >
                        <CheckCircle size={14} />
                        Approve
                      </button>
                    )}
                    <Link
                      href={`/admin/applications/${app._id}`}
                      className="flex items-center gap-1.5 rounded-md bg-[#D79A2C] px-4 py-2 text-xs font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
                    >
                      <Eye size={14} />
                      View details
                    </Link>
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
