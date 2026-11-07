import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import apiClient from "@/lib/apiClient";
import AdminDashboardLayout from "@/components/admin-dashboard/AdminDashboardLayout";
import {
  ArrowLeft, User, Mail, Phone, MapPin, GraduationCap, BookOpen,
  Languages, Award, DollarSign, Star, Clock, CheckCircle, XCircle,
  AlertCircle, Loader, Shield, Building, MapPinned, Calendar,
  Briefcase, Target, MessageSquare, Hash, Eye
} from 'lucide-react';
import Link from "next/link";
import Image from "next/image";
import { resolveImage } from "@/lib/resolveImage";
import { displayFormattedPhone } from "@/lib/phoneUtils";
import { lora } from "@/lib/fonts";

export default function TutorApplicationDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [tutor, setTutor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchTutor = async (tutorId: string) => {
    try {
      const res = await apiClient.get(`/auth/admin/tutor/${tutorId}`);
      setTutor(res.data);
    } catch (err) {
      console.error("Failed to fetch tutor", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status: "approved" | "rejected") => {
    if (!id) return;

    const confirmMsg = status === "approved"
      ? "Are you sure you want to APPROVE this tutor application?"
      : "Are you sure you want to REJECT this tutor application?";

    if (!confirm(confirmMsg)) return;

    try {
      setUpdating(true);
      await apiClient.put(`/auth/admin/tutor/${id}/status`, { status });
      alert(`Tutor ${status} successfully!`);
      router.push("/admin/applications");
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (typeof id !== "string") return;
    fetchTutor(id);
  }, [router.isReady, id]);

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center space-y-3">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#1C2B22]/15 border-t-[#D79A2C]" />
            <p className="text-sm text-[#58646C]">Loading tutor details...</p>
          </div>
        </div>
      </AdminDashboardLayout>
    );
  }

  if (!tutor) {
    return (
      <AdminDashboardLayout>
        <div className="max-w-3xl mx-auto mt-12">
          <div className="rounded-md border border-red-200 bg-red-50 p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className={`${lora.className} text-lg font-semibold text-red-700 mb-2`}>Tutor not found</h3>
            <p className="text-sm text-red-600 mb-4">The requested tutor application could not be found.</p>
            <Link href="/admin/applications" className="text-sm font-semibold text-red-700 hover:underline">
              ← Back to applications
            </Link>
          </div>
        </div>
      </AdminDashboardLayout>
    );
  }

  const isFinalized = tutor.status !== "pending";
  const statusConfig = {
    pending: { text: 'text-[#8a5f18]', icon: Clock, label: 'Pending review' },
    approved: { text: 'text-[#3f8a5f]', icon: CheckCircle, label: 'Approved' },
    rejected: { text: 'text-red-600', icon: XCircle, label: 'Rejected' },
  };

  const currentStatus = statusConfig[tutor.status as keyof typeof statusConfig] || statusConfig.pending;
  const StatusIcon = currentStatus.icon;

  return (
    <AdminDashboardLayout>
      <div className="space-y-6 p-6">

        {/* Header with Back Button */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin/applications"
            className="inline-flex items-center gap-2 rounded-md border border-[#1C2B22]/15 px-4 py-2 text-sm font-medium text-[#1C2B22] transition-colors hover:border-[#D79A2C]/50"
          >
            <ArrowLeft size={16} />
            <span>Back to applications</span>
          </Link>

          <div className={`flex items-center gap-1.5 text-sm font-semibold ${currentStatus.text}`}>
            <StatusIcon size={16} />
            <span>{currentStatus.label}</span>
          </div>
        </div>

        {/* Main Title */}
        <div className="rounded-md bg-[#0E211C] p-7">
          <div className="flex items-start justify-between">
            <div>
              <h1 className={`${lora.className} text-2xl font-semibold text-[#F7F2E9]`}>Tutor verification</h1>
              <p className="mt-1 text-sm text-[#F7F2E9]/70">Review all details before approval</p>
            </div>
            {tutor.phone_verified && (
              <div className="flex items-center gap-1.5 rounded-md border border-[#F7F2E9]/15 px-3 py-1.5 text-xs font-medium text-[#F7F2E9]">
                <Shield size={14} className="text-[#D79A2C]" />
                <span>Phone verified</span>
              </div>
            )}
          </div>
        </div>

        {/* Profile Card */}
        <div className="rounded-md border border-[#1C2B22]/10 bg-white p-7">
          <div className="flex items-start gap-6">
            {/* Profile Image */}
            <div className="relative flex-shrink-0">
              {tutor.profileImage ? (
                <div className="relative h-24 w-24 overflow-hidden rounded-md border border-[#1C2B22]/10">
                  <Image
                    src={tutor.profileImage}
                    alt={tutor.fullName || 'Tutor'}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-md bg-[#0E211C] text-3xl font-semibold text-[#D79A2C]">
                  {tutor.fullName?.charAt(0).toUpperCase() || 'T'}
                </div>
              )}
              {tutor.phone_verified && (
                <div className="absolute -bottom-1.5 -right-1.5 rounded-full bg-[#3f8a5f] p-1">
                  <CheckCircle className="text-white" size={16} />
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <h2 className={`${lora.className} text-xl font-semibold text-[#1C2B22] mb-2`}>{tutor.fullName}</h2>
              <div className="space-y-1.5 text-sm text-[#58646C]">
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  <span>{tutor.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  <span>{displayFormattedPhone(tutor.phone)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={14} />
                  <span className="capitalize">{tutor.role}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 divide-x divide-[#1C2B22]/[.08] rounded-md border border-[#1C2B22]/10">
              <div className="p-4 text-center">
                <DollarSign className="mx-auto mb-1.5 h-5 w-5 text-[#D79A2C]" />
                <p className={`${lora.className} text-lg font-semibold text-[#1C2B22]`}>₹{tutor.price}</p>
                <p className="text-xs text-[#9AA3AB]">Price</p>
              </div>
              <div className="p-4 text-center">
                <Star className="mx-auto mb-1.5 h-5 w-5 text-[#D79A2C]" />
                <p className={`${lora.className} text-lg font-semibold text-[#1C2B22]`}>{tutor.rating || 'N/A'}</p>
                <p className="text-xs text-[#9AA3AB]">Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Location */}
          <div className="rounded-md border border-[#1C2B22]/10 bg-white p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <MapPin size={18} className="text-[#D79A2C]" />
              <h3 className={`${lora.className} text-base font-semibold text-[#1C2B22]`}>Location details</h3>
            </div>
            <div className="space-y-3">
              <InfoRow icon={Building} label="City" value={tutor.location?.city || "—"} />
              <InfoRow icon={MapPinned} label="Area" value={tutor.location?.area || "—"} />
              {tutor.location?.pincode && (
                <InfoRow icon={Hash} label="Pincode" value={tutor.location.pincode} />
              )}
            </div>
          </div>

          {/* Academic Info */}
          <div className="rounded-md border border-[#1C2B22]/10 bg-white p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <GraduationCap size={18} className="text-[#D79A2C]" />
              <h3 className={`${lora.className} text-base font-semibold text-[#1C2B22]`}>Academic info &amp; boards</h3>
            </div>
            <div className="space-y-3">
              <InfoRow icon={Award} label="Qualification" value={tutor.qualification || "N/A"} />
              <InfoRow icon={Building} label="College" value={tutor.college || "N/A"} />
              <InfoRow icon={BookOpen} label="10th class board" value={tutor.board10th || "Not specified"} />
              <InfoRow icon={BookOpen} label="12th class board" value={tutor.board12th || "Not specified"} />
              <InfoRow icon={Briefcase} label="Experience" value={`${tutor.yearsOfExperience || 0} years`} />
            </div>
          </div>

          {/* Submitted Verification Documents */}
          <div className="rounded-md border border-[#1C2B22]/10 bg-white p-6 lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <Shield size={18} className="text-[#D79A2C]" />
              <div>
                <h3 className={`${lora.className} text-base font-semibold text-[#1C2B22]`}>Submitted verification documents</h3>
                <p className="text-xs text-[#9AA3AB]">12th certificate, Aadhar card, graduation degree &amp; marksheets</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 12th Certificate */}
              <div className="flex flex-col justify-between rounded-md border border-[#1C2B22]/10 p-4 text-center">
                <div>
                  <p className="mb-1 text-xs font-semibold text-[#1C2B22]">12th certificate</p>
                  {tutor.documents?.twelfthCertificate ? (
                    <div className="my-2 flex h-28 items-center justify-center overflow-hidden rounded-md border border-[#1C2B22]/10 bg-[#F7F2E9]">
                      <img
                        src={resolveImage(tutor.documents.twelfthCertificate)}
                        alt="12th Certificate"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="my-2 flex h-28 items-center justify-center rounded-md border border-dashed border-[#1C2B22]/15 text-xs text-[#9AA3AB]">
                      Not uploaded
                    </div>
                  )}
                </div>
                {tutor.documents?.twelfthCertificate && (
                  <a
                    href={resolveImage(tutor.documents.twelfthCertificate)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1 rounded-md border border-[#1C2B22]/15 py-1.5 px-3 text-xs font-semibold text-[#1C2B22] hover:border-[#D79A2C]/50"
                  >
                    <Eye size={13} /> View document
                  </a>
                )}
              </div>

              {/* Aadhar Card */}
              <div className="flex flex-col justify-between rounded-md border border-[#1C2B22]/10 p-4 text-center">
                <div>
                  <p className="mb-1 text-xs font-semibold text-[#1C2B22]">Aadhar card</p>
                  {(tutor.documents?.aadharCard || tutor.documents?.identityProof) ? (
                    <div className="my-2 flex h-28 items-center justify-center overflow-hidden rounded-md border border-[#1C2B22]/10 bg-[#F7F2E9]">
                      <img
                        src={resolveImage(tutor.documents?.aadharCard || tutor.documents?.identityProof)}
                        alt="Aadhar Card"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="my-2 flex h-28 items-center justify-center rounded-md border border-dashed border-[#1C2B22]/15 text-xs text-[#9AA3AB]">
                      Not uploaded
                    </div>
                  )}
                </div>
                {(tutor.documents?.aadharCard || tutor.documents?.identityProof) && (
                  <a
                    href={resolveImage(tutor.documents?.aadharCard || tutor.documents?.identityProof)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1 rounded-md border border-[#1C2B22]/15 py-1.5 px-3 text-xs font-semibold text-[#1C2B22] hover:border-[#D79A2C]/50"
                  >
                    <Eye size={13} /> View document
                  </a>
                )}
              </div>

              {/* Graduation Certificate */}
              <div className="flex flex-col justify-between rounded-md border border-[#1C2B22]/10 p-4 text-center">
                <div>
                  <p className="mb-1 text-xs font-semibold text-[#1C2B22]">Graduation degree</p>
                  {(tutor.documents?.graduationCertificate || tutor.documents?.educationProof) ? (
                    <div className="my-2 flex h-28 items-center justify-center overflow-hidden rounded-md border border-[#1C2B22]/10 bg-[#F7F2E9]">
                      <img
                        src={resolveImage(tutor.documents?.graduationCertificate || tutor.documents?.educationProof)}
                        alt="Graduation Degree"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="my-2 flex h-28 items-center justify-center rounded-md border border-dashed border-[#1C2B22]/15 text-xs text-[#9AA3AB]">
                      Not uploaded
                    </div>
                  )}
                </div>
                {(tutor.documents?.graduationCertificate || tutor.documents?.educationProof) && (
                  <a
                    href={resolveImage(tutor.documents?.graduationCertificate || tutor.documents?.educationProof)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1 rounded-md border border-[#1C2B22]/15 py-1.5 px-3 text-xs font-semibold text-[#1C2B22] hover:border-[#D79A2C]/50"
                  >
                    <Eye size={13} /> View document
                  </a>
                )}
              </div>

              {/* 10th Certificate */}
              <div className="flex flex-col justify-between rounded-md border border-[#1C2B22]/10 p-4 text-center">
                <div>
                  <p className="mb-1 text-xs font-semibold text-[#1C2B22]">10th certificate</p>
                  {tutor.documents?.tenthCertificate ? (
                    <div className="my-2 flex h-28 items-center justify-center overflow-hidden rounded-md border border-[#1C2B22]/10 bg-[#F7F2E9]">
                      <img
                        src={resolveImage(tutor.documents.tenthCertificate)}
                        alt="10th Certificate"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="my-2 flex h-28 items-center justify-center rounded-md border border-dashed border-[#1C2B22]/15 text-xs text-[#9AA3AB]">
                      Not uploaded
                    </div>
                  )}
                </div>
                {tutor.documents?.tenthCertificate && (
                  <a
                    href={resolveImage(tutor.documents.tenthCertificate)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1 rounded-md border border-[#1C2B22]/15 py-1.5 px-3 text-xs font-semibold text-[#1C2B22] hover:border-[#D79A2C]/50"
                  >
                    <Eye size={13} /> View document
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Teaching Details */}
          <div className="rounded-md border border-[#1C2B22]/10 bg-white p-6 lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <BookOpen size={18} className="text-[#D79A2C]" />
              <h3 className={`${lora.className} text-base font-semibold text-[#1C2B22]`}>Teaching details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#58646C] mb-2">
                  <Target size={14} />
                  <span>Subjects</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tutor.subjects?.length ? (
                    tutor.subjects.map((subject: string, idx: number) => (
                      <span key={idx} className="rounded-md border border-[#1C2B22]/10 px-2.5 py-1 text-xs font-medium text-[#1C2B22]">
                        {subject}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-[#9AA3AB]">N/A</span>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#58646C] mb-2">
                  <Languages size={14} />
                  <span>Languages</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tutor.languages?.length ? (
                    tutor.languages.map((lang: string, idx: number) => (
                      <span key={idx} className="rounded-md border border-[#1C2B22]/10 px-2.5 py-1 text-xs font-medium text-[#1C2B22]">
                        {lang}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-[#9AA3AB]">N/A</span>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#58646C] mb-2">
                  <BookOpen size={14} />
                  <span>Classes taught</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tutor.classesTaught?.length ? (
                    tutor.classesTaught.map((cls: string, idx: number) => (
                      <span key={idx} className="rounded-md border border-[#1C2B22]/10 px-2.5 py-1 text-xs font-medium text-[#1C2B22]">
                        {cls}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-[#9AA3AB]">N/A</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          {tutor.testimonial && (
            <div className="rounded-md border border-[#1C2B22]/10 bg-white p-6 lg:col-span-2">
              <div className="flex items-start gap-3">
                <MessageSquare className="mt-0.5 text-[#D79A2C]" size={18} />
                <div>
                  <h3 className={`${lora.className} text-base font-semibold text-[#1C2B22] mb-1.5`}>Testimonial</h3>
                  <p className="text-sm italic text-[#58646C]">&ldquo;{tutor.testimonial}&rdquo;</p>
                </div>
              </div>
            </div>
          )}

          {/* Meta Info */}
          <div className="rounded-md border border-[#1C2B22]/10 bg-white p-6 lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <Calendar size={18} className="text-[#D79A2C]" />
              <h3 className={`${lora.className} text-base font-semibold text-[#1C2B22]`}>Application info</h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#58646C]">
              <Clock size={14} />
              <span>Applied on {new Date(tutor.createdAt).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {!isFinalized && (
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              disabled={updating}
              onClick={() => updateStatus("approved")}
              className="flex items-center justify-center gap-2.5 rounded-md bg-[#3f8a5f] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#357a52] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updating ? (
                <Loader className="animate-spin" size={18} />
              ) : (
                <CheckCircle size={18} />
              )}
              <span>Approve tutor</span>
            </button>

            <button
              disabled={updating}
              onClick={() => updateStatus("rejected")}
              className="flex items-center justify-center gap-2.5 rounded-md border border-red-200 bg-white px-8 py-3.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updating ? (
                <Loader className="animate-spin" size={18} />
              ) : (
                <XCircle size={18} />
              )}
              <span>Reject application</span>
            </button>
          </div>
        )}

        {isFinalized && (
          <div className={`rounded-md border border-[#1C2B22]/10 p-6 text-center ${currentStatus.text}`}>
            <StatusIcon className="mx-auto mb-2.5 h-10 w-10" />
            <p className="text-base font-semibold">This application has been {tutor.status}</p>
            <p className="mt-1 text-sm opacity-75">No further action can be taken</p>
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}

// Helper Component
const InfoRow = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex items-start gap-2.5">
    <Icon size={16} className="mt-0.5 text-[#9AA3AB]" />
    <div className="flex-1">
      <p className="text-xs text-[#9AA3AB]">{label}</p>
      <p className="text-sm font-medium text-[#1C2B22]">{value}</p>
    </div>
  </div>
);
