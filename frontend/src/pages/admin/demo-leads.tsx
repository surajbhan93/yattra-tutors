import React, { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import { Lora } from "next/font/google";
import apiClient from "@/lib/apiClient";
// import AdminSidebar from "@/components/admin-dashboard/AdminSidebar";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"] });

interface DemoLeadItem {
  _id: string;
  leadId: string;
  city: string;
  state: string;
  studentClass: string;
  locality: string;
  phone: string;
  sourceUrl?: string;
  status: "PENDING" | "CONTACTED" | "DEMO_SCHEDULED" | "CONVERTED" | "CANCELLED";
  assignedCounselor?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

interface StatsData {
  totalLeads: number;
  pendingLeads: number;
  contactedLeads: number;
  scheduledLeads: number;
  convertedLeads: number;
  conversionRate: string;
  cityBreakdown: Array<{ _id: string; count: number }>;
}

export default function AdminDemoLeadsPage() {
  const [leads, setLeads] = useState<DemoLeadItem[]>([]);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Filters & Search State
  const [search, setSearch] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalLeadsCount, setTotalLeadsCount] = useState<number>(0);

  // Edit / Action Modal State
  const [selectedLead, setSelectedLead] = useState<DemoLeadItem | null>(null);
  const [editStatus, setEditStatus] = useState<string>("");
  const [editCounselor, setEditCounselor] = useState<string>("");
  const [editNotes, setEditNotes] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // Fetch Stats from Fastify Admin API
  const fetchStats = useCallback(async () => {
    try {
      const response = await apiClient.get("/admin/demo-leads/stats");
      if (response.data?.success && response.data?.stats) {
        setStats(response.data.stats);
      }
    } catch (err: any) {
      console.warn("Failed to fetch lead stats:", err.message);
    }
  }, []);

  // Fetch Leads List from Fastify Admin API
  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await apiClient.get("/admin/demo-leads", {
        params: {
          page,
          limit: 15,
          search: search || undefined,
          city: selectedCity || undefined,
          status: selectedStatus || undefined,
        },
      });

      if (response.data?.success) {
        setLeads(response.data.data || []);
        setTotalPages(response.data.totalPages || 1);
        setTotalLeadsCount(response.data.total || 0);
      } else {
        throw new Error(response.data?.message || "Failed to fetch leads");
      }
    } catch (err: any) {
      setError(err.message || "Failed to load admin lead records.");
    } finally {
      setLoading(false);
    }
  }, [page, search, selectedCity, selectedStatus]);

  useEffect(() => {
    fetchStats();
    fetchLeads();
  }, [fetchStats, fetchLeads]);

  // Open Edit Modal
  const handleOpenEdit = (lead: DemoLeadItem) => {
    setSelectedLead(lead);
    setEditStatus(lead.status);
    setEditCounselor(lead.assignedCounselor || "");
    setEditNotes(lead.adminNotes || "");
  };

  // Submit Update to Fastify Admin API
  const handleSaveUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;

    setIsUpdating(true);
    try {
      const response = await apiClient.patch(`/admin/demo-leads/${selectedLead._id}`, {
        status: editStatus,
        assignedCounselor: editCounselor,
        adminNotes: editNotes,
      });

      if (response.data?.success) {
        setSelectedLead(null);
        fetchLeads();
        fetchStats();
      } else {
        alert(response.data?.message || "Failed to update lead.");
      }
    } catch (err: any) {
      alert("Error updating lead: " + err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete Lead
  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead record?")) return;

    try {
      const response = await apiClient.delete(`/admin/demo-leads/${id}`);
      if (response.data?.success) {
        fetchLeads();
        fetchStats();
      }
    } catch (err: any) {
      alert("Error deleting lead: " + err.message);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-[#D79A2C]/10 text-[#D79A2C] border-[#D79A2C]/30";
      case "CONTACTED":
        return "bg-sky-500/10 text-sky-300 border-sky-500/30";
      case "DEMO_SCHEDULED":
        return "bg-indigo-500/10 text-indigo-300 border-indigo-500/30";
      case "CONVERTED":
        return "bg-[#3f8a5f]/10 text-[#3f8a5f] border-[#3f8a5f]/30";
      case "CANCELLED":
        return "bg-rose-500/10 text-rose-300 border-rose-500/30";
      default:
        return "bg-[#F7F2E9]/5 text-[#F7F2E9]/60 border-[#F7F2E9]/15";
    }
  };

  return (
    <>
     {/* <AdminSidebar /> */}
      <Head>
        <title>Demo Lead Management | Yattra Tutors Admin Dashboard</title>
      </Head>

      <main className="min-h-screen bg-[#0E211C] text-[#F7F2E9] p-4 sm:p-8">

        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F7F2E9]/10 pb-6">
            <div>
              <span className="text-xs font-medium text-[#D79A2C]">
                Yattra Tutors Admin Panel
              </span>
              <h1 className={`${lora.className} text-3xl font-semibold text-[#F7F2E9]`}>
                Demo Session Lead Management
              </h1>
              <p className="text-xs sm:text-sm text-[#F7F2E9]/55">
                Track, assign counselors, and manage student demo inquiries from Agra, Meerut, and all cities.
              </p>
            </div>

            <button
              onClick={() => {
                fetchStats();
                fetchLeads();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-medium text-[#17261D] bg-[#D79A2C] hover:bg-[#c4891f] transition-colors shrink-0"
            >
              Refresh leads
            </button>
          </div>

          {/* Stats Bar */}
          {stats && (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div className="bg-[#132B22] border border-[#F7F2E9]/10 rounded-md p-4 space-y-1">
                <span className="text-xs text-[#F7F2E9]/55">Total Inquiries</span>
                <p className={`${lora.className} text-2xl font-semibold text-[#F7F2E9]`}>{stats.totalLeads}</p>
              </div>
              <div className="bg-[#132B22] border border-[#D79A2C]/30 rounded-md p-4 space-y-1">
                <span className="text-xs text-[#D79A2C]">Pending Leads</span>
                <p className={`${lora.className} text-2xl font-semibold text-[#D79A2C]`}>{stats.pendingLeads}</p>
              </div>
              <div className="bg-[#132B22] border border-sky-500/30 rounded-md p-4 space-y-1">
                <span className="text-xs text-sky-300">Contacted</span>
                <p className={`${lora.className} text-2xl font-semibold text-sky-300`}>{stats.contactedLeads}</p>
              </div>
              <div className="bg-[#132B22] border border-indigo-500/30 rounded-md p-4 space-y-1">
                <span className="text-xs text-indigo-300">Demo Scheduled</span>
                <p className={`${lora.className} text-2xl font-semibold text-indigo-300`}>{stats.scheduledLeads}</p>
              </div>
              <div className="bg-[#132B22] border border-[#3f8a5f]/30 rounded-md p-4 space-y-1 col-span-2 sm:col-span-1">
                <span className="text-xs text-[#3f8a5f]">Converted Ratio</span>
                <p className={`${lora.className} text-2xl font-semibold text-[#3f8a5f]`}>{stats.conversionRate}</p>
              </div>
            </div>
          )}

          {/* Search & Filter Bar */}
          <div className="bg-[#132B22] border border-[#F7F2E9]/10 rounded-md p-4 grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-6">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by phone, locality, or Lead ID (e.g. TUT-AGRA-...)..."
                className="w-full bg-[#0E211C] border border-[#F7F2E9]/15 rounded-md px-3.5 py-2.5 text-sm text-[#F7F2E9] placeholder:text-[#F7F2E9]/35 focus:outline-none focus:border-[#D79A2C]"
              />
            </div>

            <div className="sm:col-span-3">
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-[#0E211C] border border-[#F7F2E9]/15 rounded-md px-3.5 py-2.5 text-sm text-[#F7F2E9] focus:outline-none focus:border-[#D79A2C]"
              >
                <option value="">All Cities</option>
                <option value="Agra">Agra</option>
                <option value="Meerut">Meerut</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-[#0E211C] border border-[#F7F2E9]/15 rounded-md px-3.5 py-2.5 text-sm text-[#F7F2E9] focus:outline-none focus:border-[#D79A2C]"
              >
                <option value="">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="CONTACTED">Contacted</option>
                <option value="DEMO_SCHEDULED">Demo Scheduled</option>
                <option value="CONVERTED">Converted</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-4 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm">
              {error}
            </div>
          )}

          {/* Data Table */}
          <div className="bg-[#132B22] border border-[#F7F2E9]/10 rounded-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#F7F2E9]/80">
                <thead className="bg-[#0E211C] text-[#F7F2E9]/55 text-xs border-b border-[#F7F2E9]/10">
                  <tr>
                    <th scope="col" className="py-3.5 px-6 font-medium">Lead ID & Date</th>
                    <th scope="col" className="py-3.5 px-6 font-medium">City & Locality</th>
                    <th scope="col" className="py-3.5 px-6 font-medium">Class / Grade</th>
                    <th scope="col" className="py-3.5 px-6 font-medium">Mobile Number</th>
                    <th scope="col" className="py-3.5 px-6 font-medium">Status</th>
                    <th scope="col" className="py-3.5 px-6 font-medium">Counselor</th>
                    <th scope="col" className="py-3.5 px-6 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F7F2E9]/[.07]">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-[#F7F2E9]/45">
                        Loading lead records from server...
                      </td>
                    </tr>
                  ) : leads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-[#F7F2E9]/45">
                        No demo leads found matching filters.
                      </td>
                    </tr>
                  ) : (
                    leads.map((lead) => (
                      <tr key={lead._id} className="hover:bg-[#F7F2E9]/[.03] transition-colors">
                        <td className="py-4 px-6">
                          <span className="block font-medium text-[#F7F2E9] text-sm font-mono">{lead.leadId}</span>
                          <span className="text-[11px] text-[#F7F2E9]/45">
                            {new Date(lead.createdAt).toLocaleString("en-IN")}
                          </span>
                        </td>

                        <td className="py-4 px-6">
                          <span className="font-medium text-[#D79A2C] text-sm block">{lead.city}</span>
                          <span className="text-xs text-[#F7F2E9]/60">{lead.locality}</span>
                        </td>

                        <td className="py-4 px-6 text-[#F7F2E9]/80">
                          {lead.studentClass}
                        </td>

                        <td className="py-4 px-6">
                          <a
                            href={`tel:${lead.phone}`}
                            className="font-mono font-medium text-[#3f8a5f] hover:underline"
                          >
                            {lead.phone}
                          </a>
                        </td>

                        <td className="py-4 px-6">
                          <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusBadge(lead.status)}`}>
                            {lead.status}
                          </span>
                        </td>

                        <td className="py-4 px-6 text-xs text-[#F7F2E9]/70">
                          {lead.assignedCounselor || <span className="text-[#F7F2E9]/35 italic">Unassigned</span>}
                        </td>

                        <td className="py-4 px-6 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEdit(lead)}
                            className="px-3 py-1.5 rounded-md text-xs font-medium bg-[#D79A2C]/10 text-[#D79A2C] border border-[#D79A2C]/30 hover:bg-[#D79A2C]/20 transition-colors"
                          >
                            Edit / Assign
                          </button>
                          <button
                            onClick={() => handleDeleteLead(lead._id)}
                            className="px-3 py-1.5 rounded-md text-xs font-medium bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:bg-rose-500/20 transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="py-4 px-6 bg-[#0E211C] border-t border-[#F7F2E9]/10 flex items-center justify-between">
                <span className="text-xs text-[#F7F2E9]/45">
                  Showing page {page} of {totalPages} ({totalLeadsCount} leads total)
                </span>
                <div className="flex gap-2">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-3 py-1.5 rounded-md text-xs font-medium bg-[#132B22] border border-[#F7F2E9]/10 hover:border-[#D79A2C]/40 disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-3 py-1.5 rounded-md text-xs font-medium bg-[#132B22] border border-[#F7F2E9]/10 hover:border-[#D79A2C]/40 disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Edit / Status Update Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-[#0E211C]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#132B22] border border-[#F7F2E9]/10 rounded-md p-6 sm:p-8 max-w-lg w-full space-y-6">
            <div className="flex items-center justify-between border-b border-[#F7F2E9]/10 pb-4">
              <div>
                <h3 className={`${lora.className} text-xl font-semibold text-[#F7F2E9]`}>Manage Lead: {selectedLead.leadId}</h3>
                <p className="text-xs text-[#D79A2C]">{selectedLead.city} - {selectedLead.locality} ({selectedLead.phone})</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-[#F7F2E9]/45 hover:text-[#F7F2E9] text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#F7F2E9]/60 mb-1.5">
                  Lead Status *
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full bg-[#0E211C] border border-[#F7F2E9]/15 rounded-md px-3.5 py-2.5 text-sm text-[#F7F2E9] focus:outline-none focus:border-[#D79A2C]"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="DEMO_SCHEDULED">DEMO_SCHEDULED</option>
                  <option value="CONVERTED">CONVERTED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#F7F2E9]/60 mb-1.5">
                  Assigned Counselor Name / ID
                </label>
                <input
                  type="text"
                  value={editCounselor}
                  onChange={(e) => setEditCounselor(e.target.value)}
                  placeholder="e.g. Counselor Rohit Agrawal"
                  className="w-full bg-[#0E211C] border border-[#F7F2E9]/15 rounded-md px-3.5 py-2.5 text-sm text-[#F7F2E9] placeholder:text-[#F7F2E9]/35 focus:outline-none focus:border-[#D79A2C]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#F7F2E9]/60 mb-1.5">
                  Admin Internal Notes
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Add internal remarks about parent preferences, demo time, assigned tutor..."
                  className="w-full bg-[#0E211C] border border-[#F7F2E9]/15 rounded-md px-3.5 py-2.5 text-sm text-[#F7F2E9] placeholder:text-[#F7F2E9]/35 focus:outline-none focus:border-[#D79A2C]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#F7F2E9]/10">
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2.5 rounded-md font-medium text-[#F7F2E9]/70 bg-[#F7F2E9]/5 hover:bg-[#F7F2E9]/10 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-5 py-2.5 rounded-md font-medium text-[#17261D] bg-[#D79A2C] hover:bg-[#c4891f] text-xs disabled:opacity-50"
                >
                  {isUpdating ? "Saving Changes..." : "Save Lead Status"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </>
  );
}
