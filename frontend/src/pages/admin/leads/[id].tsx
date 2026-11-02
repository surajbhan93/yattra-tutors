import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminDashboardLayout from "@/components/admin-dashboard/AdminDashboardLayout";
import leadService, { StudentLead } from "@/services/leadService";
import {
  ArrowLeft, User, Phone, Mail, MapPin, BookOpen,
  DollarSign, Clock, Calendar, Target, Users,
  Eye, Edit, AlertCircle, Loader, CheckCircle
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { Lora } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"] });

const AdminLeadDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [lead, setLead] = useState<StudentLead | null>(null);
  const [loading, setLoading] = useState(true);
  const [unlocks, setUnlocks] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      fetchLeadDetails();
    }
  }, [id]);

  const fetchLeadDetails = async () => {
    try {
      setLoading(true);
      const response = await leadService.getLeadById(id as string);
      setLead(response.data);

      // Fetch unlock history
      try {
        const unlocksResponse = await leadService.adminGetLeadUnlocks(id as string);
        setUnlocks(unlocksResponse.data || []);
      } catch (error) {
        console.log("Could not fetch unlock history:", error);
        setUnlocks([]);
      }
    } catch (error: any) {
      console.error("Failed to fetch lead:", error);
      toast.error(error.response?.data?.message || "Failed to load lead details");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { text: string }> = {
      new: { text: "text-[#3E5C83]" },
      active: { text: "text-[#1F6F54]" },
      assigned: { text: "text-[#7A4E6E]" },
      closed: { text: "text-[#9AA3AB]" },
      expired: { text: "text-red-600" },
    };

    const config = statusConfig[status] || statusConfig.new || { text: "text-[#3E5C83]" };

    return (
      <span className={`inline-flex text-xs font-semibold capitalize ${config.text}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="flex items-center justify-center min-h-screen bg-[#F7F2E9]">
          <div className="text-center">
            <Loader className="h-10 w-10 text-[#D79A2C] animate-spin mx-auto mb-4" />
            <p className="text-sm text-[#58646C]">Loading lead details...</p>
          </div>
        </div>
      </AdminDashboardLayout>
    );
  }

  if (!lead) {
    return (
      <AdminDashboardLayout>
        <div className="p-6 bg-[#F7F2E9] min-h-screen">
          <div className="text-center py-16">
            <AlertCircle className="h-12 w-12 text-[#9AA3AB] mx-auto mb-4" />
            <h2 className={`${lora.className} text-xl font-semibold text-[#1C2B22] mb-2`}>Lead not found</h2>
            <p className="text-sm text-[#58646C] mb-6">This lead may have been removed</p>
            <Link href="/admin/leads">
              <button className="px-5 py-2.5 rounded-md bg-[#D79A2C] text-sm font-semibold text-[#17261D] hover:bg-[#c4891f] transition-colors">
                Back to leads
              </button>
            </Link>
          </div>
        </div>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout>
      <div className="p-6 space-y-6 bg-[#F7F2E9] min-h-screen">
        {/* Back Button */}
        <Link href="/admin/leads">
          <button className="flex items-center gap-2 text-sm text-[#58646C] hover:text-[#1C2B22] transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to leads</span>
          </button>
        </Link>

        {/* Header */}
        <div className="bg-white rounded-lg p-6 border border-[#1C2B22]/10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>
                  {lead.studentClass} {lead.subject}
                </h1>
                {getStatusBadge(lead.status)}
              </div>
              <div className="flex items-center gap-5 text-sm text-[#58646C]">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-[#9AA3AB]" />
                  <span>Created {new Date(lead.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-[#9AA3AB]" />
                  <span>{lead.totalUnlocks} unlocks</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5 text-[#9AA3AB]" />
                  <span>Quality: {lead.qualityScore}/100</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link href={`/admin/leads/${lead._id}/edit`}>
                <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#D79A2C] text-sm font-semibold text-[#17261D] hover:bg-[#c4891f] transition-colors">
                  <Edit className="h-4 w-4" />
                  Edit
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Requirement Details */}
            <div className="bg-white rounded-lg p-6 border border-[#1C2B22]/10">
              <h2 className={`${lora.className} text-lg font-semibold text-[#1C2B22] mb-4`}>Requirement details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 divide-[#1C2B22]/[.06]">
                <div className="flex items-start gap-3 py-3 sm:pr-4">
                  <BookOpen className="h-4 w-4 text-[#D79A2C] mt-0.5" />
                  <div>
                    <div className="text-xs text-[#9AA3AB]">Teaching mode</div>
                    <div className="text-sm font-medium text-[#1C2B22] capitalize">{lead.teachingMode}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-3 sm:pl-4">
                  <DollarSign className="h-4 w-4 text-[#D79A2C] mt-0.5" />
                  <div>
                    <div className="text-xs text-[#9AA3AB]">Budget</div>
                    <div className="text-sm font-medium text-[#1C2B22]">
                      ₹{lead.budget.toLocaleString()}/{lead.budgetType.replace('_', ' ')}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-3 sm:pr-4">
                  <MapPin className="h-4 w-4 text-[#D79A2C] mt-0.5" />
                  <div>
                    <div className="text-xs text-[#9AA3AB]">Location</div>
                    <div className="text-sm font-medium text-[#1C2B22]">
                      {lead.location.area}, {lead.location.city}
                    </div>
                    {lead.location.pincode && (
                      <div className="text-xs text-[#9AA3AB]">PIN: {lead.location.pincode}</div>
                    )}
                  </div>
                </div>

                {lead.preferredTime && (
                  <div className="flex items-start gap-3 py-3 sm:pl-4">
                    <Calendar className="h-4 w-4 text-[#D79A2C] mt-0.5" />
                    <div>
                      <div className="text-xs text-[#9AA3AB]">Preferred time</div>
                      <div className="text-sm font-medium text-[#1C2B22]">{lead.preferredTime}</div>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 py-3 sm:pr-4">
                  <Target className="h-4 w-4 text-[#D79A2C] mt-0.5" />
                  <div>
                    <div className="text-xs text-[#9AA3AB]">Urgency</div>
                    <div className="text-sm font-medium text-[#1C2B22] capitalize">
                      {lead.urgency.replace('_', ' ')}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-3 sm:pl-4">
                  <CheckCircle className="h-4 w-4 text-[#D79A2C] mt-0.5" />
                  <div>
                    <div className="text-xs text-[#9AA3AB]">Credits required</div>
                    <div className="text-sm font-medium text-[#1C2B22]">{lead.creditsRequired}</div>
                  </div>
                </div>
              </div>

              {lead.additionalRequirements && (
                <div className="mt-5 p-4 rounded-md bg-[#F7F2E9] border border-[#1C2B22]/10">
                  <h3 className="text-xs font-semibold text-[#1C2B22] mb-1.5">Additional requirements</h3>
                  <p className="text-sm text-[#58646C] leading-relaxed">{lead.additionalRequirements}</p>
                </div>
              )}
            </div>

            {/* Parent Contact */}
            {(lead.parentName || lead.parentPhone) && (
              <div className="bg-white rounded-lg p-6 border border-[#1C2B22]/10">
                <h2 className={`${lora.className} text-lg font-semibold text-[#1C2B22] mb-4`}>Parent / student contact</h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#1C2B22]/[.06]">
                  {lead.parentName && (
                    <div className="flex items-center gap-3 py-3 sm:px-4 sm:first:pl-0">
                      <User className="h-4 w-4 text-[#D79A2C]" />
                      <div>
                        <div className="text-xs text-[#9AA3AB]">Parent name</div>
                        <div className="text-sm font-medium text-[#1C2B22]">{lead.parentName}</div>
                      </div>
                    </div>
                  )}

                  {lead.parentPhone && (
                    <div className="flex items-center gap-3 py-3 sm:px-4">
                      <Phone className="h-4 w-4 text-[#D79A2C]" />
                      <div>
                        <div className="text-xs text-[#9AA3AB]">Phone</div>
                        <a
                          href={`tel:${lead.parentPhone}`}
                          className="text-sm font-medium text-[#1F6F54] hover:underline"
                        >
                          {lead.parentPhone}
                        </a>
                      </div>
                    </div>
                  )}

                  {lead.parentEmail && (
                    <div className="flex items-center gap-3 py-3 sm:px-4">
                      <Mail className="h-4 w-4 text-[#D79A2C]" />
                      <div>
                        <div className="text-xs text-[#9AA3AB]">Email</div>
                        <a
                          href={`mailto:${lead.parentEmail}`}
                          className="text-sm font-medium text-[#3E5C83] hover:underline break-all"
                        >
                          {lead.parentEmail}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 p-3 rounded-md bg-[#D79A2C]/10 border border-[#D79A2C]/30">
                  <p className="text-xs text-[#8a5f18]">
                    This contact information is visible to admin only. Tutors can see it after unlocking the lead.
                  </p>
                </div>
              </div>
            )}

            {/* Unlock History */}
            <div className="bg-white rounded-lg p-6 border border-[#1C2B22]/10">
              <h2 className={`${lora.className} text-lg font-semibold text-[#1C2B22] mb-4`}>Unlock history</h2>

              {unlocks.length > 0 ? (
                <div className="divide-y divide-[#1C2B22]/[.06]">
                  {unlocks.map((unlock: any) => (
                    <div key={unlock._id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          {unlock.tutorId?.profilePicture ? (
                            <img
                              src={unlock.tutorId.profilePicture}
                              alt={unlock.tutorId.fullName}
                              className="w-9 h-9 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-[#F7F2E9] flex items-center justify-center">
                              <User className="h-4 w-4 text-[#D79A2C]" />
                            </div>
                          )}
                          <div>
                            <h3 className="text-sm font-semibold text-[#1C2B22]">{unlock.tutorId?.fullName || 'Unknown tutor'}</h3>
                            <p className="text-xs text-[#9AA3AB]">{unlock.tutorId?.email || 'N/A'}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-[#9AA3AB]">
                            {new Date(unlock.unlockedAt).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-[#9AA3AB]">
                            {new Date(unlock.unlockedAt).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 text-sm">
                        <div className="flex items-center gap-4">
                          {unlock.tutorId?.phone && (
                            <a
                              href={`tel:${unlock.tutorId.phone}`}
                              className="flex items-center gap-1 text-[#1F6F54] hover:underline"
                            >
                              <Phone className="h-3 w-3" />
                              {unlock.tutorId.phone}
                            </a>
                          )}
                          <span className="text-[#58646C]">
                            {unlock.creditsUsed} credit{unlock.creditsUsed !== 1 ? 's' : ''} used
                          </span>
                        </div>
                        <span className={`text-xs font-semibold capitalize ${
                          unlock.status === 'converted' ? 'text-[#1F6F54]' :
                          unlock.status === 'contacted' ? 'text-[#3E5C83]' :
                          unlock.status === 'demo_scheduled' ? 'text-[#7A4E6E]' :
                          unlock.status === 'lost' ? 'text-red-600' :
                          'text-[#9AA3AB]'
                        }`}>
                          {unlock.status.replace('_', ' ')}
                        </span>
                      </div>

                      {unlock.notes && (
                        <div className="mt-2 text-sm text-[#58646C] italic">
                          "{unlock.notes}"
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <Eye className="h-10 w-10 text-[#9AA3AB] mx-auto mb-3" />
                  <p className="text-sm text-[#58646C]">No tutors have unlocked this lead yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lead Info */}
            <div className="bg-white rounded-lg p-6 border border-[#1C2B22]/10">
              <h3 className={`${lora.className} text-base font-semibold text-[#1C2B22] mb-4`}>Lead information</h3>
              <div className="divide-y divide-[#1C2B22]/[.06]">
                <div className="flex items-center justify-between text-sm py-2 first:pt-0">
                  <span className="text-[#9AA3AB]">Lead ID</span>
                  <span className="font-mono text-[#1C2B22]">{lead._id.slice(-8)}</span>
                </div>
                <div className="flex items-center justify-between text-sm py-2">
                  <span className="text-[#9AA3AB]">Student name</span>
                  <span className="font-medium text-[#1C2B22]">{lead.studentName || "N/A"}</span>
                </div>
                <div className="flex items-center justify-between text-sm py-2">
                  <span className="text-[#9AA3AB]">Total unlocks</span>
                  <span className="font-medium text-[#1C2B22]">{lead.totalUnlocks}</span>
                </div>
                <div className="flex items-center justify-between text-sm py-2">
                  <span className="text-[#9AA3AB]">Max unlocks</span>
                  <span className="font-medium text-[#1C2B22]">{lead.maxUnlocks}</span>
                </div>
                <div className="flex items-center justify-between text-sm py-2">
                  <span className="text-[#9AA3AB]">Quality score</span>
                  <span className="font-medium text-[#1C2B22]">{lead.qualityScore}/100</span>
                </div>
                <div className="flex items-center justify-between text-sm py-2 last:pb-0">
                  <span className="text-[#9AA3AB]">Expires</span>
                  <span className="font-medium text-[#1C2B22]">
                    {new Date(lead.expiryDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#0E211C] rounded-lg p-6">
              <h3 className={`${lora.className} text-base font-semibold text-white mb-4`}>Quick actions</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/15 text-sm font-medium text-white hover:bg-white/10 transition-colors">
                  Publish lead
                </button>
                <button className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/15 text-sm font-medium text-white hover:bg-white/10 transition-colors">
                  Pause lead
                </button>
                <button className="w-full px-4 py-2 rounded-md bg-white/5 border border-red-400/30 text-sm font-medium text-red-300 hover:bg-red-400/10 transition-colors">
                  Archive lead
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminLeadDetailPage;
