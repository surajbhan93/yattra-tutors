import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminDashboardLayout from "@/components/admin-dashboard/AdminDashboardLayout";
import leadService, { StudentLead } from "@/services/leadService";
import {
  Plus, Eye, Edit, Trash2, CheckCircle, XCircle,
  Clock, MapPin, BookOpen, DollarSign, Users,
  Search, Download,
  AlertCircle, Loader
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { Lora } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"] });

const AdminLeadsPage = () => {
  const router = useRouter();

  const [leads, setLeads] = useState<StudentLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    // Debug logging
    const authStorage = localStorage.getItem('auth-storage');
    console.log('Auth storage on mount:', authStorage);

    if (authStorage) {
      const authState = JSON.parse(authStorage);
      console.log('Auth state:', authState);
      console.log('Token:', authState?.state?.token);
      console.log('User:', authState?.state?.user);
    }

    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);

      // Debug: Check if user is logged in
      const authStorage = localStorage.getItem('auth-storage');
      if (!authStorage) {
        console.error("No auth storage found");
        toast.error("Please login first");
        router.push('/login');
        return;
      }

      const authState = JSON.parse(authStorage);
      const token = authState?.state?.token;

      if (!token) {
        console.error("No token found in auth storage");
        toast.error("Session expired. Please login again");
        router.push('/login');
        return;
      }

      console.log("Fetching leads with auth token...");
      const response = await leadService.adminGetAllLeads();
      console.log("Leads response:", response);

      const leadsList: StudentLead[] = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response?.leads)
        ? response.leads
        : [];

      setLeads(leadsList);
      toast.success(`Loaded ${leadsList.length} leads`);
    } catch (error: any) {
      console.error("Failed to fetch leads:", error);
      console.error("Error response:", error.response);

      // Check if it's an auth error
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error("Authentication failed. Please login again");
        router.push('/login');
      } else {
        toast.error(error.response?.data?.message || error.message || "Failed to load leads");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    try {
      await leadService.adminDeleteLead(leadId);
      toast.success("Lead deleted successfully");
      setShowDeleteConfirm(false);
      setSelectedLead(null);
      fetchLeads(); // Refresh the list
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete lead");
      setShowDeleteConfirm(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { text: string; icon: any }> = {
      new: { text: "text-[#3E5C83]", icon: Clock },
      active: { text: "text-[#1F6F54]", icon: CheckCircle },
      assigned: { text: "text-[#7A4E6E]", icon: Users },
      closed: { text: "text-[#9AA3AB]", icon: XCircle },
      expired: { text: "text-red-600", icon: AlertCircle },
    };

    const config = statusConfig[status] || statusConfig.new || { text: "text-[#3E5C83]", icon: Clock };
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${config.text}`}>
        <Icon className="h-3.5 w-3.5" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === "" || lead.status === statusFilter;
    const matchesSearch =
      searchTerm === "" ||
      lead.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.studentClass.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.location.city?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === "new").length,
    active: leads.filter(l => l.status === "active").length,
    closed: leads.filter(l => l.status === "closed").length,
  };

  return (
    <AdminDashboardLayout>
      <div className="space-y-6 p-6 bg-[#F7F2E9] min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>Student leads</h1>
            <p className="text-sm text-[#58646C] mt-1">Manage student requirements and tutoring opportunities</p>
          </div>
          <Link href="/admin/create-lead">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#D79A2C] text-sm font-semibold text-[#17261D] hover:bg-[#c4891f] transition-colors">
              <Plus className="h-4 w-4" />
              Add lead
            </button>
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-x divide-[#1C2B22]/10 rounded-lg border border-[#1C2B22]/10 bg-white">
          <div className="p-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-[#9AA3AB]">Total leads</span>
              <Users className="h-4 w-4 text-[#D79A2C]" />
            </div>
            <div className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>{stats.total}</div>
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-[#9AA3AB]">New</span>
              <Clock className="h-4 w-4 text-[#3E5C83]" />
            </div>
            <div className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>{stats.new}</div>
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-[#9AA3AB]">Active</span>
              <CheckCircle className="h-4 w-4 text-[#1F6F54]" />
            </div>
            <div className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>{stats.active}</div>
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-[#9AA3AB]">Closed</span>
              <XCircle className="h-4 w-4 text-[#9AA3AB]" />
            </div>
            <div className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>{stats.closed}</div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-lg p-4 border border-[#1C2B22]/10">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9AA3AB]" />
              <input
                type="text"
                placeholder="Search by subject, class, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-md border border-[#1C2B22]/15 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-md border border-[#1C2B22]/15 px-3 py-2 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
            >
              <option value="">All status</option>
              <option value="new">New</option>
              <option value="active">Active</option>
              <option value="assigned">Assigned</option>
              <option value="closed">Closed</option>
              <option value="expired">Expired</option>
            </select>

            <button className="p-2 rounded-md border border-[#1C2B22]/15 hover:border-[#D79A2C]/50 transition-colors">
              <Download className="h-4 w-4 text-[#58646C]" />
            </button>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-lg border border-[#1C2B22]/10 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="h-6 w-6 text-[#D79A2C] animate-spin" />
            </div>
          ) : filteredLeads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-[#1C2B22]/10">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-medium text-[#9AA3AB]">Lead ID</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-[#9AA3AB]">Student</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-[#9AA3AB]">Class &amp; subject</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-[#9AA3AB]">Location</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-[#9AA3AB]">Budget</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-[#9AA3AB]">Mode</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-[#9AA3AB]">Status</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-[#9AA3AB]">Unlocks</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-[#9AA3AB]">Created</th>
                    <th className="px-5 py-3 text-center text-xs font-medium text-[#9AA3AB]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1C2B22]/[.06]">
                  {filteredLeads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-[#F7F2E9]/60 transition-colors">
                      <td className="px-5 py-3">
                        <span className="text-sm font-mono text-[#58646C]">
                          {lead._id.slice(-8)}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="text-sm font-medium text-[#1C2B22]">
                          {lead.studentName || "Not specified"}
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="text-sm text-[#1C2B22]">
                          <div className="font-medium">{lead.studentClass}</div>
                          <div className="text-[#58646C]">{lead.subject}</div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1 text-sm text-[#1C2B22]">
                          <MapPin className="h-3.5 w-3.5 text-[#9AA3AB]" />
                          <span>{lead.location?.area || 'N/A'}, {lead.location?.city || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1 text-sm text-[#1C2B22]">
                          <DollarSign className="h-3.5 w-3.5 text-[#9AA3AB]" />
                          <span>₹{lead.budget ? lead.budget.toLocaleString() : '0'}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1 text-sm text-[#1C2B22]">
                          <BookOpen className="h-3.5 w-3.5 text-[#9AA3AB]" />
                          <span className="capitalize">{lead.teachingMode || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        {getStatusBadge(lead.status)}
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-sm font-medium text-[#1C2B22]">
                          {lead.totalUnlocks || 0}/{lead.maxUnlocks || 0}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-sm text-[#9AA3AB]">
                          {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'N/A'}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-center gap-1">
                          <Link href={`/admin/leads/${lead._id}`}>
                            <button className="p-1.5 rounded-md hover:bg-[#3E5C83]/10 text-[#3E5C83] transition-colors">
                              <Eye className="h-4 w-4" />
                            </button>
                          </Link>
                          <Link href={`/admin/leads/${lead._id}/edit`}>
                            <button className="p-1.5 rounded-md hover:bg-[#D79A2C]/10 text-[#8a5f18] transition-colors">
                              <Edit className="h-4 w-4" />
                            </button>
                          </Link>
                          <button
                            onClick={() => {
                              setSelectedLead(lead._id);
                              setShowDeleteConfirm(true);
                            }}
                            className="p-1.5 rounded-md hover:bg-red-50 text-red-600 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <AlertCircle className="h-10 w-10 text-[#9AA3AB] mx-auto mb-3" />
              <h3 className={`${lora.className} text-lg font-semibold text-[#1C2B22] mb-1`}>No leads found</h3>
              <p className="text-sm text-[#58646C] mb-5">Create your first lead to get started</p>
              <Link href="/admin/create-lead">
                <button className="px-5 py-2.5 rounded-md bg-[#D79A2C] text-sm font-semibold text-[#17261D] hover:bg-[#c4891f] transition-colors">
                  Create lead
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 border border-[#1C2B22]/10">
              <div className="text-center">
                <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
                <h2 className={`${lora.className} text-xl font-semibold text-[#1C2B22] mb-2`}>Delete lead?</h2>
                <p className="text-sm text-[#58646C] mb-6">
                  This action cannot be undone. The lead will be permanently deleted.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-5 py-2.5 rounded-md border border-[#1C2B22]/15 text-sm font-medium text-[#1C2B22] hover:border-[#D79A2C]/50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => selectedLead && handleDeleteLead(selectedLead)}
                    className="flex-1 px-5 py-2.5 rounded-md bg-red-600 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminLeadsPage;
