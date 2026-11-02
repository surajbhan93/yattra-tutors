import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Lora } from "next/font/google";
import AdminDashboardLayout from "@/components/admin-dashboard/AdminDashboardLayout";
import apiClient from "@/lib/apiClient";
import {
  User,
  Users,
  ClipboardList,
  GraduationCap,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Clock,
  UserCircle2,
} from "lucide-react";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"] });

/* ======================
   TYPES
====================== */
interface ParentDashboard {
  parent: {
    _id: string;
    fullName: string;
    email: string;
    phone?: string;
     // ✅ ADD LOCATION
    location?: {
      city?: string;
      area?: string;
      state?: string;
      country?: string;
      pincode?: string;
    };
  };

  

  students: {
    total: number;
    classWise: Record<string, number>;
  };

  demoRequests: {
    total: number;
    statusWise: Record<string, number>;
  };

  studentTutorMap: {
    student: {
      full_name: string;
      class_grade: string;
    };
    tutor: {
      fullName: string;
      subjects: string[];
    } | null;
  }[];
}

export default function ParentDashboardPage() {
  const router = useRouter();
  const { parentId } = router.query;

  const [data, setData] = useState<ParentDashboard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!parentId) return;

    const fetchDashboard = async () => {
      try {
        const res = await apiClient.get(
          `/admin/parent-dashboard/${parentId}`
        );
        setData(res.data.data);
      } catch {
        alert("Failed to load parent dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [parentId]);

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="flex min-h-[400px] items-center justify-center bg-[#F7F2E9] p-6">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#D79A2C] border-t-transparent"></div>
            <p className="text-sm font-medium text-[#58646C]">Loading dashboard...</p>
          </div>
        </div>
      </AdminDashboardLayout>
    );
  }

  if (!data) {
    return (
      <AdminDashboardLayout>
        <div className="bg-[#F7F2E9] p-6 text-center">
          <p className="text-[#58646C]">No data found</p>
        </div>
      </AdminDashboardLayout>
    );
  }

  const locationStr = data.parent.location
    ? [data.parent.location.area, data.parent.location.city, data.parent.location.state]
        .filter(Boolean)
        .join(", ")
    : "Not provided";

  return (
    <AdminDashboardLayout>
      <div className="relative min-h-screen space-y-6 bg-[#F7F2E9] p-4 sm:p-6">
        {/* grain texture overlay */}
        <svg className="pointer-events-none fixed inset-0 h-full w-full opacity-[0.035]" aria-hidden="true">
          <filter id="parent-detail-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#parent-detail-grain)" />
        </svg>

        {/* HEADER with Back Button */}
        <div className="relative flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className={`${lora.className} text-2xl font-semibold text-[#17261D]`}>
              Parent dashboard
            </h1>
            <p className="mt-1 text-sm text-[#58646C]">
              Complete overview of {data.parent.fullName}'s account
            </p>
          </div>

          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 rounded-md border border-[#1C2B22]/10 bg-white px-4 py-2 text-sm font-medium text-[#17261D] transition-colors hover:border-[#D79A2C]"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        {/* PARENT INFO CARD */}
        <div className="relative overflow-hidden rounded-md border border-[#1C2B22]/10 bg-white">
          <div className="border-b border-[#1C2B22]/10 bg-[#0E211C] px-6 py-4">
            <div className="flex items-center gap-3 text-white">
              <UserCircle2 size={20} className="text-[#D79A2C]" />
              <h2 className="text-lg font-semibold">Parent information</h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-md bg-[#F7F2E9] text-2xl font-semibold text-[#17261D]">
                  {data.parent.fullName?.charAt(0).toUpperCase() || "P"}
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid flex-1 gap-4 sm:grid-cols-2">
                {/* Name */}
                <div className="flex items-start gap-3">
                  <User size={18} className="mt-0.5 text-[#D79A2C]" />
                  <div>
                    <p className="text-xs text-[#58646C]">Full name</p>
                    <p className="mt-0.5 text-sm font-medium text-[#17261D]">{data.parent.fullName}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail size={18} className="mt-0.5 text-[#D79A2C]" />
                  <div>
                    <p className="text-xs text-[#58646C]">Email</p>
                    <a
                      href={`mailto:${data.parent.email}`}
                      className="mt-0.5 block text-sm font-medium text-[#17261D] transition-colors hover:text-[#D79A2C] hover:underline"
                    >
                      {data.parent.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                {data.parent.phone && (
                  <div className="flex items-start gap-3">
                    <Phone size={18} className="mt-0.5 text-[#D79A2C]" />
                    <div>
                      <p className="text-xs text-[#58646C]">Phone</p>
                      <a
                        href={`tel:${data.parent.phone}`}
                        className="mt-0.5 block text-sm font-medium text-[#3f8a5f] hover:underline"
                      >
                        {data.parent.phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* Location */}
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 text-[#D79A2C]" />
                  <div>
                    <p className="text-xs text-[#58646C]">Location</p>
                    <p className="mt-0.5 text-sm font-medium text-[#17261D]">{locationStr}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="relative grid grid-cols-1 divide-y divide-[#1C2B22]/10 rounded-md border border-[#1C2B22]/10 bg-white sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
          <StatCard
            title="Total students"
            value={data.students.total}
            icon={Users}
            subtext="Registered"
          />
          <StatCard
            title="Demo requests"
            value={data.demoRequests.total}
            icon={ClipboardList}
            subtext="All time"
          />
          <StatCard
            title="Assigned tutors"
            value={data.studentTutorMap.filter(i => i.tutor).length}
            icon={GraduationCap}
            subtext="Active"
          />
        </div>

        {/* BREAKDOWN - Side by Side */}
        <div className="relative grid gap-6 md:grid-cols-2">
          {/* STUDENTS CLASSWISE */}
          <div className="overflow-hidden rounded-md border border-[#1C2B22]/10 bg-white">
            <div className="border-b border-[#1C2B22]/10 bg-[#F7F2E9] px-6 py-4">
              <h3 className="flex items-center gap-2 text-sm font-medium text-[#17261D]">
                <TrendingUp size={16} className="text-[#D79A2C]" />
                Students by class
              </h3>
            </div>
            <div className="p-6">
              {Object.keys(data.students.classWise).length === 0 ? (
                <p className="py-4 text-center text-sm text-[#58646C]">No students yet</p>
              ) : (
                <div className="divide-y divide-[#1C2B22]/10">
                  {Object.entries(data.students.classWise).map(([cls, count]) => (
                    <div
                      key={cls}
                      className="flex items-center justify-between py-3"
                    >
                      <span className="text-sm font-medium text-[#17261D]">Class {cls}</span>
                      <span className="rounded-sm bg-[#F7F2E9] px-3 py-1 text-sm font-medium text-[#17261D]">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* DEMO STATUS */}
          <div className="overflow-hidden rounded-md border border-[#1C2B22]/10 bg-white">
            <div className="border-b border-[#1C2B22]/10 bg-[#F7F2E9] px-6 py-4">
              <h3 className="flex items-center gap-2 text-sm font-medium text-[#17261D]">
                <ClipboardList size={16} className="text-[#D79A2C]" />
                Demo request status
              </h3>
            </div>
            <div className="p-6">
              {Object.keys(data.demoRequests.statusWise).length === 0 ? (
                <p className="py-4 text-center text-sm text-[#58646C]">No demo requests</p>
              ) : (
                <div className="divide-y divide-[#1C2B22]/10">
                  {Object.entries(data.demoRequests.statusWise).map(([status, count]) => {
                    const statusConfig: any = {
                      completed: { icon: CheckCircle2, color: "text-[#3f8a5f]" },
                      pending: { icon: Clock, color: "text-[#D79A2C]" },
                      cancelled: { icon: XCircle, color: "text-[#8a3f3f]" },
                    };
                    const config = statusConfig[status] || { icon: Clock, color: "text-[#58646C]" };
                    const StatusIcon = config.icon;

                    return (
                      <div
                        key={status}
                        className="flex items-center justify-between py-3"
                      >
                        <div className="flex items-center gap-2">
                          <StatusIcon size={16} className={config.color} />
                          <span className="text-sm font-medium capitalize text-[#17261D]">{status}</span>
                        </div>
                        <span className="rounded-sm bg-[#F7F2E9] px-3 py-1 text-sm font-medium text-[#17261D]">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* STUDENT → TUTOR MAP */}
        <div className="relative overflow-hidden rounded-md border border-[#1C2B22]/10 bg-white">
          <div className="border-b border-[#1C2B22]/10 bg-[#0E211C] px-6 py-4">
            <h3 className="flex items-center gap-2 text-sm font-medium text-white">
              <Users size={16} className="text-[#D79A2C]" />
              Student – tutor assignments
            </h3>
          </div>

          <div className="p-6">
            {data.studentTutorMap.length === 0 ? (
              <div className="py-8 text-center">
                <Users size={28} className="mx-auto mb-3 text-[#9AA3AB]" />
                <p className="text-sm font-medium text-[#58646C]">No tutor assignments yet</p>
              </div>
            ) : (
              <div className="divide-y divide-[#1C2B22]/10">
                {data.studentTutorMap.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-start justify-between gap-4 py-4 sm:flex-row sm:items-center"
                  >
                    {/* Student Info */}
                    <div className="flex items-center gap-3">
                      <UserCircle2 size={28} className="text-[#D79A2C]" />
                      <div>
                        <p className="font-medium text-[#17261D]">{item.student.full_name}</p>
                        <p className="text-xs text-[#58646C]">
                          Class {item.student.class_grade}
                        </p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden sm:block">
                      <span className="text-[#9AA3AB]">→</span>
                    </div>

                    {/* Tutor Info */}
                    <div className="text-left sm:text-right">
                      {item.tutor ? (
                        <div className="flex items-center gap-3 sm:flex-row-reverse">
                          <GraduationCap size={28} className="text-[#3f8a5f]" />
                          <div>
                            <p className="font-medium text-[#17261D]">{item.tutor.fullName}</p>
                            <p className="text-xs text-[#58646C]">
                              {item.tutor.subjects.join(", ")}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-sm bg-[#F7F2E9] px-4 py-2 text-sm font-medium text-[#58646C]">
                          Not assigned
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}

/* ======================
   COMPONENTS
====================== */

function StatCard({
  title,
  value,
  icon: Icon,
  subtext,
}: {
  title: string;
  value: number;
  icon: any;
  gradient?: string;
  subtext?: string;
}) {
  return (
    <div className="flex items-center justify-between p-5">
      <div>
        <p className="mb-1 text-xs text-[#58646C]">{title}</p>
        <p className="text-2xl font-semibold text-[#17261D]">{value}</p>
        {subtext && (
          <p className="mt-1 text-xs text-[#9AA3AB]">{subtext}</p>
        )}
      </div>
      <Icon size={20} className="text-[#D79A2C]" />
    </div>
  );
}
