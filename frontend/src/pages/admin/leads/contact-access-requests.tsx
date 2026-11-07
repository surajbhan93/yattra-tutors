import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminDashboardLayout from "@/components/admin-dashboard/AdminDashboardLayout";
import api from "@/lib/apiClient";
import {
  Phone, Mail, User, MapPin, BookOpen, Clock, CheckCircle,
  XCircle, Loader, AlertCircle, Eye, Shield, ChevronRight
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { lora } from "@/lib/fonts";

type ContactAccessRequest = {
  unlockId: string;
  lead: {
    _id: string;
    studentName?: string;
    studentClass: string;
    subject: string;
    location?: {
      city?: string;
      area?: string;
    };
    parentName?: string;
    parentPhone?: string;
    parentEmail?: string;
  };
  tutor: {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
  };
  requestedAt: string;
  notes?: string;
};

const ContactAccessRequestsPage = () => {
  const router = useRouter();
  const [requests, setRequests] = useState<ContactAccessRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await api.get("/leads/admin/contact-access-requests");
      setRequests(response.data.data || []);
    } catch (error: any) {
      console.error("Failed to fetch contact access requests:", error);
      toast.error(error.response?.data?.message || "Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (request: ContactAccessRequest) => {
    if (!confirm(`Approve contact access for ${request.tutor.fullName}?`)) {
      return;
    }

    try {
      setProcessing(request.unlockId);

      console.log('[Frontend] Approving contact access:', {
        leadId: request.lead._id,
        tutorId: request.tutor._id,
        url: `/leads/admin/${request.lead._id}/contact-access/${request.tutor._id}`
      });

      await api.patch(
        `/leads/admin/${request.lead._id}/contact-access/${request.tutor._id}`,
        {
          granted: true,
          notes: "Approved by admin"
        }
      );

      toast.success("Contact access approved!");
      fetchRequests(); // Refresh list
    } catch (error: any) {
      console.error("Failed to approve:", error);
      console.error("Error response:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to approve request");
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (request: ContactAccessRequest) => {
    const reason = prompt("Enter rejection reason (optional):");

    try {
      setProcessing(request.unlockId);
      await api.patch(
        `/leads/admin/${request.lead._id}/contact-access/${request.tutor._id}`,
        {
          granted: false,
          notes: reason || "Rejected by admin"
        }
      );

      toast.success("Contact access rejected");
      fetchRequests(); // Refresh list
    } catch (error: any) {
      console.error("Failed to reject:", error);
      toast.error(error.response?.data?.message || "Failed to reject request");
    } finally {
      setProcessing(null);
    }
  };

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="flex items-center justify-center min-h-screen bg-[#F7F2E9]">
          <div className="text-center">
            <Loader className="h-10 w-10 text-[#D79A2C] animate-spin mx-auto mb-4" />
            <p className="text-sm text-[#58646C]">Loading contact access requests...</p>
          </div>
        </div>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout>
      <div className="min-h-screen bg-[#F7F2E9] py-8">
        <div className="max-w-6xl mx-auto px-4">

          {/* Header */}
          <div className="mb-6 bg-white rounded-lg p-6 border border-[#1C2B22]/10">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <Shield className="h-5 w-5 text-[#D79A2C]" />
                  <h1 className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>
                    Contact access requests
                  </h1>
                </div>
                <p className="text-sm text-[#58646C]">
                  Review and approve tutor requests to view parent contact details
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#9AA3AB]">Pending requests</p>
                <p className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>{requests.length}</p>
              </div>
            </div>
          </div>

          {/* Requests List */}
          {requests.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center border border-[#1C2B22]/10">
              <CheckCircle className="h-10 w-10 text-[#1F6F54] mx-auto mb-4" />
              <h3 className={`${lora.className} text-lg font-semibold text-[#1C2B22] mb-1`}>
                All caught up
              </h3>
              <p className="text-sm text-[#58646C]">
                No pending contact access requests at the moment.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <div
                  key={request.unlockId}
                  className="bg-white rounded-lg border border-[#1C2B22]/10 p-6"
                >
                  <div className="flex flex-col lg:flex-row gap-6">

                    {/* Left: Lead Info */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <BookOpen className="h-4 w-4 text-[#D79A2C]" />
                            <h3 className={`${lora.className} text-lg font-semibold text-[#1C2B22]`}>
                              {request.lead.subject} &mdash; {request.lead.studentClass}
                            </h3>
                          </div>
                          {request.lead.studentName && (
                            <p className="text-sm text-[#58646C] mb-1.5">
                              Student: {request.lead.studentName}
                            </p>
                          )}
                          {request.lead.location && (
                            <div className="flex items-center gap-1.5 text-sm text-[#58646C]">
                              <MapPin className="h-3.5 w-3.5 text-[#9AA3AB]" />
                              <span>
                                {request.lead.location.area}, {request.lead.location.city}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8a5f18]">
                          <Clock className="h-3.5 w-3.5" />
                          <span>Pending</span>
                        </div>
                      </div>

                      {/* Parent Contact (Hidden from Tutor) */}
                      <div className="rounded-md p-4 border border-[#1C2B22]/10 bg-[#F7F2E9]">
                        <p className="text-xs font-semibold text-[#58646C] mb-2 flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          Parent contact (hidden from tutor)
                        </p>
                        <div className="space-y-1.5 text-sm">
                          <div className="flex items-center gap-2">
                            <User className="h-3.5 w-3.5 text-[#D79A2C]" />
                            <span className="font-medium text-[#1C2B22]">
                              {request.lead.parentName || "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-3.5 w-3.5 text-[#D79A2C]" />
                            <a
                              href={`tel:${request.lead.parentPhone}`}
                              className="font-medium text-[#1F6F54] hover:underline"
                            >
                              {request.lead.parentPhone || "N/A"}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-3.5 w-3.5 text-[#D79A2C]" />
                            <a
                              href={`mailto:${request.lead.parentEmail}`}
                              className="font-medium text-[#3E5C83] hover:underline"
                            >
                              {request.lead.parentEmail || "N/A"}
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Request Info */}
                      <div className="flex items-center gap-1.5 text-sm text-[#9AA3AB]">
                        <Clock className="h-3.5 w-3.5" />
                        <span>
                          Requested on {new Date(request.requestedAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Right: Tutor Info & Actions */}
                    <div className="lg:w-80 space-y-4">
                      {/* Tutor Info */}
                      <div className="rounded-md p-4 border border-[#1C2B22]/10">
                        <p className="text-xs font-semibold text-[#9AA3AB] mb-3">Requesting tutor</p>
                        <div className="space-y-1.5 text-sm">
                          <div className="flex items-center gap-2">
                            <User className="h-3.5 w-3.5 text-[#58646C]" />
                            <span className="font-semibold text-[#1C2B22]">
                              {request.tutor.fullName}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-3.5 w-3.5 text-[#58646C]" />
                            <span className="text-[#58646C]">{request.tutor.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-3.5 w-3.5 text-[#58646C]" />
                            <span className="text-[#58646C]">{request.tutor.email}</span>
                          </div>
                        </div>
                        <Link
                          href={`/admin/users/tutors/${request.tutor._id}`}
                          className="mt-3 flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md border border-[#1C2B22]/15 text-sm font-medium text-[#1C2B22] hover:border-[#D79A2C]/50 transition-colors"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View profile
                        </Link>
                      </div>

                      {/* Actions */}
                      <div className="space-y-2">
                        <button
                          onClick={() => handleApprove(request)}
                          disabled={processing === request.unlockId}
                          className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-[#D79A2C] text-sm font-semibold text-[#17261D] hover:bg-[#c4891f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {processing === request.unlockId ? (
                            <>
                              <Loader className="h-4 w-4 animate-spin" />
                              <span>Processing...</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4" />
                              <span>Approve access</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleReject(request)}
                          disabled={processing === request.unlockId}
                          className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-md border border-red-300 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <XCircle className="h-4 w-4" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default ContactAccessRequestsPage;
