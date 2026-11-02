
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Lora } from "next/font/google";
import apiClient from "@/lib/apiClient";
import AdminDashboardLayout from "@/components/admin-dashboard/AdminDashboardLayout";
import { resolveImage } from "@/lib/resolveImage";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  BookOpen,
  Languages,
  GraduationCap,
  Users,
  IndianRupee,
  CalendarDays,
  Clock,
  MapPin,
  Monitor,
  CheckCircle,
  XCircle,
} from "lucide-react";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"] });

export default function TutorViewPage() {
  const router = useRouter();
  const { id } = router.query;

  const [tutor, setTutor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchTutor();
  }, [id]);

  const fetchTutor = async () => {
    try {
      const res = await apiClient.get(`/admin/tutors/${id}`);
      setTutor(res.data.data);
    } catch (err) {
      console.error("Failed to fetch tutor", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status: "approved" | "rejected") => {
    await apiClient.patch(`/admin/tutors/${id}`, { status });
    fetchTutor();
  };

  if (loading)
    return (
      <AdminDashboardLayout>
        <div className="bg-[#F7F2E9] p-6 text-[#58646C]">Loading tutor...</div>
      </AdminDashboardLayout>
    );

  if (!tutor)
    return (
      <AdminDashboardLayout>
        <div className="bg-[#F7F2E9] p-6 text-[#8a3f3f]">Tutor not found</div>
      </AdminDashboardLayout>
    );

  const InfoRow = ({ icon: Icon, label, value }: any) => (
    <div className="flex items-start gap-3 text-sm text-[#58646C]">
      <Icon size={16} className="mt-0.5 text-[#D79A2C]" />
      <div>
        <span className="font-medium text-[#17261D]">{label}</span>
        <div className="text-[#58646C]">{value || "N/A"}</div>
      </div>
    </div>
  );

  return (
    <AdminDashboardLayout>
      <div className="relative min-h-screen space-y-8 bg-[#F7F2E9] p-4 sm:p-6">
        {/* grain texture overlay */}
        <svg className="pointer-events-none fixed inset-0 h-full w-full opacity-[0.035]" aria-hidden="true">
          <filter id="tutor-detail-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#tutor-detail-grain)" />
        </svg>

        {/* Header Card */}
        <div className="relative flex flex-col items-start gap-6 rounded-md border border-[#1C2B22]/10 bg-white p-6 lg:flex-row lg:items-center">
          <div className="h-40 w-32 overflow-hidden rounded-md border border-[#1C2B22]/10 bg-[#F7F2E9]">
            <img
              src={resolveImage(tutor.profileImage)}
              alt={tutor.fullName}
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="flex-1">
            <h1 className={`${lora.className} flex items-center gap-2 text-2xl font-semibold text-[#17261D]`}>
              <User className="text-[#D79A2C]" size={22} /> {tutor.fullName}
            </h1>

            <div className="mt-3 flex flex-wrap gap-2">
              <span
                className={`rounded-sm px-3 py-1 text-xs font-medium ${
                  tutor.status === "approved"
                    ? "bg-[#eef3f0] text-[#3f8a5f]"
                    : tutor.status === "rejected"
                    ? "bg-[#f5ebe9] text-[#8a3f3f]"
                    : "bg-[#F7F2E9] text-[#8a5f18]"
                }`}
              >
                {tutor.status.charAt(0).toUpperCase() + tutor.status.slice(1)}
              </span>

              <span className="rounded-sm bg-[#F7F2E9] px-3 py-1 text-xs font-medium text-[#17261D]">
                Profile {tutor.isProfileComplete ? "complete" : "incomplete"}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => updateStatus("approved")}
              className="inline-flex items-center gap-2 rounded-md bg-[#0E211C] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#132B22]"
            >
              <CheckCircle size={16} /> Approve
            </button>

            <button
              onClick={() => updateStatus("rejected")}
              className="inline-flex items-center gap-2 rounded-md border border-[#1C2B22]/15 bg-white px-4 py-2 text-sm font-medium text-[#8a3f3f] transition-colors hover:border-[#8a3f3f]"
            >
              <XCircle size={16} /> Reject
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Contact */}
          <div className="space-y-4 rounded-md border border-[#1C2B22]/10 bg-white p-6">
            <h3 className={`${lora.className} text-lg font-semibold text-[#17261D]`}>Contact information</h3>
            <InfoRow icon={Mail} label="Email" value={tutor.email} />
            <InfoRow icon={Phone} label="Phone" value={tutor.phone} />
            <InfoRow icon={ShieldCheck} label="Gender" value={tutor.gender} />
          </div>

          {/* Pricing */}
          <div className="space-y-4 rounded-md border border-[#1C2B22]/10 bg-white p-6">
            <h3 className={`${lora.className} text-lg font-semibold text-[#17261D]`}>Pricing</h3>
            <InfoRow
              icon={IndianRupee}
              label="Price"
              value={`₹${tutor.price} (${tutor.priceType})`}
            />
            <InfoRow
              icon={CheckCircle}
              label="Demo available"
              value={tutor.demoAvailable ? "Yes" : "No"}
            />
          </div>

          {/* Teaching */}
          <div className="space-y-4 rounded-md border border-[#1C2B22]/10 bg-white p-6">
            <h3 className={`${lora.className} text-lg font-semibold text-[#17261D]`}>Teaching details</h3>
            <InfoRow
              icon={BookOpen}
              label="Subjects"
              value={tutor.subjects?.join(", ")}
            />
            <InfoRow
              icon={Languages}
              label="Languages"
              value={tutor.languages?.join(", ")}
            />
            <InfoRow
              icon={Users}
              label="Classes"
              value={tutor.classesTaught?.join(", ")}
            />
            <InfoRow
              icon={Monitor}
              label="Mode"
              value={
                Array.isArray(tutor.teachingMode)
                  ? tutor.teachingMode.join(", ")
                  : tutor.teachingMode
              }
            />
            <InfoRow
              icon={CalendarDays}
              label="Availability"
              value={
                Array.isArray(tutor.availability)
                  ? tutor.availability.join(", ")
                  : tutor.availability
              }
            />
          </div>

          {/* Qualification */}
          <div className="space-y-4 rounded-md border border-[#1C2B22]/10 bg-white p-6">
            <h3 className={`${lora.className} text-lg font-semibold text-[#17261D]`}>
              Qualification & experience
            </h3>
            <InfoRow
              icon={GraduationCap}
              label="Qualification"
              value={tutor.qualification}
            />
            <InfoRow
              icon={GraduationCap}
              label="College"
              value={tutor.college}
            />
            <InfoRow
              icon={Clock}
              label="Experience"
              value={`${tutor.yearsOfExperience} years`}
            />
            <p className="text-sm text-[#58646C]">
              {tutor.experienceDescription}
            </p>
          </div>

          {/* Documents */}
          <div className="space-y-4 rounded-md border border-[#1C2B22]/10 bg-white p-6 lg:col-span-2">
            <h3 className={`${lora.className} text-lg font-semibold text-[#17261D]`}>Documents</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoRow
                icon={CheckCircle}
                label="12th Certificate / Marksheet"
                value={
                  tutor.documents?.twelfthCertificate ? (
                    <a
                      href={resolveImage(tutor.documents.twelfthCertificate)}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-[#D79A2C] underline"
                    >
                      View document
                    </a>
                  ) : "Not uploaded"
                }
              />

              <InfoRow
                icon={CheckCircle}
                label="Aadhar Card (Identity Proof)"
                value={
                  (tutor.documents?.aadharCard || tutor.documents?.identityProof) ? (
                    <a
                      href={resolveImage(tutor.documents?.aadharCard || tutor.documents?.identityProof)}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-[#D79A2C] underline"
                    >
                      View document
                    </a>
                  ) : "Not uploaded"
                }
              />

              <InfoRow
                icon={CheckCircle}
                label="Graduation Degree / Certificate"
                value={
                  (tutor.documents?.graduationCertificate || tutor.documents?.educationProof) ? (
                    <a
                      href={resolveImage(tutor.documents?.graduationCertificate || tutor.documents?.educationProof)}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-[#D79A2C] underline"
                    >
                      View document
                    </a>
                  ) : "Not uploaded"
                }
              />

              <InfoRow
                icon={CheckCircle}
                label="10th Certificate / Marksheet"
                value={
                  tutor.documents?.tenthCertificate ? (
                    <a
                      href={resolveImage(tutor.documents.tenthCertificate)}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-[#D79A2C] underline"
                    >
                      View document
                    </a>
                  ) : "Not uploaded"
                }
              />
            </div>

            {/* Verification Status */}
            <div className="mt-4">
              <span className="text-sm font-medium text-[#17261D]">
                Verification status:{" "}
                {tutor.isDocumentsVerified ? (
                  <span className="text-[#3f8a5f]">Approved</span>
                ) : (
                  <span className="text-[#8a5f18]">Pending</span>
                )}
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4 rounded-md border border-[#1C2B22]/10 bg-white p-6 lg:col-span-2">
            <h3 className={`${lora.className} text-lg font-semibold text-[#17261D]`}>Location</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <InfoRow icon={MapPin} label="City" value={tutor.location?.city} />
              <InfoRow icon={MapPin} label="Area" value={tutor.location?.area} />
              <InfoRow icon={MapPin} label="State" value={tutor.location?.state} />
              <InfoRow
                icon={MapPin}
                label="Country"
                value={tutor.location?.country}
              />
              <InfoRow
                icon={MapPin}
                label="Pincode"
                value={tutor.location?.pincode}
              />
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
