import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { lora } from "@/lib/fonts";
import AdminDashboardLayout from "@/components/admin-dashboard/AdminDashboardLayout";
import { Users, UserCircle2, TrendingUp, MapPin, CheckCircle, Clock, XCircle } from "lucide-react";
import apiClient from "@/lib/apiClient";

interface TutorStats {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
}

export default function UserManagementPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"parents" | "tutors">("parents");
  const [parentsCount, setParentsCount] = useState(0);
  const [tutorStats, setTutorStats] = useState<TutorStats>({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch parents
        const parentsRes = await apiClient.get("/admin/parents");
        setParentsCount(parentsRes.data.data?.length || 0);

        // Fetch ALL tutors to get accurate stats
        const tutorsRes = await apiClient.get("/admin_dashboard/tutors?page=1&limit=5000");
        const tutors = tutorsRes.data.data || [];

        // Calculate actual stats
        const stats = {
          total: tutors.length,
          approved: tutors.filter((t: any) => t.status === "approved").length,
          pending: tutors.filter((t: any) => t.status !== "approved" && t.status !== "rejected").length,
          rejected: tutors.filter((t: any) => t.status === "rejected").length,
        };

        setTutorStats(stats);
      } catch (err) {
        console.error("Failed to fetch counts", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const handleViewParents = () => {
    router.push("/admin/users/parent");
  };

  const handleViewTutors = () => {
    router.push("/admin/users/tutors");
  };

  return (
    <AdminDashboardLayout>
      <div className="relative min-h-screen bg-[#F7F2E9] p-4 sm:p-6 space-y-6">
        {/* grain texture overlay */}
        <svg
          className="pointer-events-none fixed inset-0 h-full w-full opacity-[0.035]"
          aria-hidden="true"
        >
          <filter id="users-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#users-grain)" />
        </svg>

        {/* Page Header */}
        <div className="relative flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-md bg-[#0E211C]">
            <Users className="h-7 w-7 text-[#D79A2C]" />
          </div>
          <div>
            <h1 className={`${lora.className} text-2xl font-semibold text-[#17261D]`}>
              User Management
            </h1>
            <p className="mt-1 text-sm text-[#58646C]">
              Manage all parents and tutors registered on the platform
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="relative z-10 w-fit rounded-md border border-[#1C2B22]/10 bg-white p-1 flex">
          {/* Animated Slider */}
          <span
            className={`absolute top-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-sm bg-[#D79A2C] transition-all duration-300 ease-in-out ${
              activeTab === "parents" ? "left-1" : "left-[calc(50%+2px)]"
            }`}
          />

          {/* Parents Tab */}
          <button
            onClick={() => setActiveTab("parents")}
            className={`relative z-10 px-6 py-2.5 text-sm font-medium transition-colors ${
              activeTab === "parents" ? "text-[#17261D]" : "text-[#58646C]"
            }`}
          >
            <div className="flex items-center gap-2">
              <UserCircle2 size={16} />
              <span>Parents</span>
            </div>
          </button>

          {/* Tutors Tab */}
          <button
            onClick={() => setActiveTab("tutors")}
            className={`relative z-10 px-6 py-2.5 text-sm font-medium transition-colors ${
              activeTab === "tutors" ? "text-[#17261D]" : "text-[#58646C]"
            }`}
          >
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>Tutors</span>
            </div>
          </button>
        </div>

        {/* Content - Parents */}
        {activeTab === "parents" && (
          <div className="relative space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 divide-y divide-[#1C2B22]/10 rounded-md border border-[#1C2B22]/10 bg-white sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
              <StatCard
                title="Total parents"
                value={loading ? "..." : parentsCount}
                icon={UserCircle2}
              />
              <StatCard
                title="Active this month"
                value={loading ? "..." : Math.floor(parentsCount * 0.7)}
                icon={TrendingUp}
              />
              <StatCard title="Locations" value={loading ? "..." : "12+"} icon={MapPin} />
            </div>

            {/* Info Card */}
            <div className="rounded-md border border-[#1C2B22]/10 bg-white p-6">
              <h3 className={`${lora.className} mb-3 flex items-center gap-2 text-lg font-semibold text-[#17261D]`}>
                <UserCircle2 className="text-[#D79A2C]" size={20} />
                Parents management
              </h3>
              <p className="mb-4 leading-relaxed text-[#58646C]">
                View and manage all registered parents on the platform. Monitor their activity,
                review contact details, track demo requests, and manage student-tutor assignments.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleViewParents}
                  className="flex items-center gap-2 rounded-md bg-[#0E211C] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#132B22]"
                >
                  <UserCircle2 size={16} />
                  View all parents
                </button>
                <div className="rounded-md border border-[#1C2B22]/10 bg-[#F7F2E9] px-4 py-2.5 text-sm font-medium text-[#17261D]">
                  {parentsCount} parents registered
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid divide-y divide-[#1C2B22]/10 rounded-md border border-[#1C2B22]/10 bg-white md:grid-cols-2 md:divide-y-0 md:divide-x">
              <FeatureCard
                title="Parent profiles"
                description="Access detailed parent information including contact details, location, and registration history."
                icon={UserCircle2}
              />
              <FeatureCard
                title="Student tracking"
                description="Monitor all students registered under each parent account with their class and subject details."
                icon={Users}
              />
              <FeatureCard
                title="Demo management"
                description="Track demo requests, schedule sessions, and manage tutor assignments for each student."
                icon={Clock}
              />
              <FeatureCard
                title="Location insights"
                description="Filter parents by city and location to better understand your user distribution."
                icon={MapPin}
              />
            </div>
          </div>
        )}

        {/* Content - Tutors */}
        {activeTab === "tutors" && (
          <div className="relative space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 divide-y divide-[#1C2B22]/10 rounded-md border border-[#1C2B22]/10 bg-white sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
              <StatCard title="Total tutors" value={loading ? "..." : tutorStats.total} icon={Users} />
              <StatCard
                title="Approved"
                value={loading ? "..." : tutorStats.approved}
                icon={CheckCircle}
              />
              <StatCard
                title="Pending review"
                value={loading ? "..." : tutorStats.pending}
                icon={Clock}
              />
            </div>

            {/* Info Card */}
            <div className="rounded-md border border-[#1C2B22]/10 bg-white p-6">
              <h3 className={`${lora.className} mb-3 flex items-center gap-2 text-lg font-semibold text-[#17261D]`}>
                <Users className="text-[#D79A2C]" size={20} />
                Tutors management
              </h3>
              <p className="mb-4 leading-relaxed text-[#58646C]">
                Manage all tutor registrations and applications. Review their profiles, approve or reject applications,
                monitor their subjects and experience, and track their performance metrics.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleViewTutors}
                  className="flex items-center gap-2 rounded-md bg-[#0E211C] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#132B22]"
                >
                  <Users size={16} />
                  View all tutors
                </button>
                <div className="rounded-md border border-[#1C2B22]/10 bg-[#F7F2E9] px-4 py-2.5 text-sm font-medium text-[#17261D]">
                  {tutorStats.total} tutors registered
                </div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="grid grid-cols-1 divide-y divide-[#1C2B22]/10 rounded-md border border-[#1C2B22]/10 bg-white sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
              <div className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-sm font-medium text-[#17261D]">Approved</h4>
                  <CheckCircle className="text-[#3f8a5f]" size={18} />
                </div>
                <p className="text-2xl font-semibold text-[#17261D]">{tutorStats.approved}</p>
                <p className="mt-1 text-xs text-[#58646C]">Active on platform</p>
              </div>

              <div className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-sm font-medium text-[#17261D]">Pending</h4>
                  <Clock className="text-[#D79A2C]" size={18} />
                </div>
                <p className="text-2xl font-semibold text-[#17261D]">{tutorStats.pending}</p>
                <p className="mt-1 text-xs text-[#58646C]">Awaiting review</p>
              </div>

              <div className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-sm font-medium text-[#17261D]">Rejected</h4>
                  <XCircle className="text-[#8a3f3f]" size={18} />
                </div>
                <p className="text-2xl font-semibold text-[#17261D]">{tutorStats.rejected}</p>
                <p className="mt-1 text-xs text-[#58646C]">Not approved</p>
              </div>
            </div>

            {/* Features */}
            <div className="grid divide-y divide-[#1C2B22]/10 rounded-md border border-[#1C2B22]/10 bg-white md:grid-cols-2 md:divide-y-0 md:divide-x">
              <FeatureCard
                title="Tutor applications"
                description="Review and process new tutor registrations with detailed profile verification."
                icon={CheckCircle}
              />
              <FeatureCard
                title="Subjects & classes"
                description="Filter tutors by subjects taught, classes, and experience level for better matching."
                icon={Users}
              />
              <FeatureCard
                title="Status management"
                description="Approve, reject, or set tutors to pending status based on verification results."
                icon={Clock}
              />
              <FeatureCard
                title="Location-based search"
                description="Find tutors by city with advanced filtering for better student-tutor pairing."
                icon={MapPin}
              />
            </div>
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}

/* Components */

function StatCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  icon: any;
}) {
  return (
    <div className="flex items-center justify-between p-5">
      <div>
        <p className="mb-1 text-xs text-[#58646C]">{title}</p>
        <p className="text-2xl font-semibold text-[#17261D]">{value}</p>
      </div>
      <Icon size={20} className="text-[#D79A2C]" />
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: any;
}) {
  return (
    <div className="flex items-start gap-3 p-5">
      <Icon size={20} className="mt-0.5 shrink-0 text-[#D79A2C]" />
      <div>
        <h4 className="mb-1 text-sm font-medium text-[#17261D]">{title}</h4>
        <p className="text-sm leading-relaxed text-[#58646C]">{description}</p>
      </div>
    </div>
  );
}
