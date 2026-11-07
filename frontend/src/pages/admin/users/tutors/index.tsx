import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { lora } from "@/lib/fonts";
import apiClient from "@/lib/apiClient";
import AdminDashboardLayout from "@/components/admin-dashboard/AdminDashboardLayout";
import {
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  MapPin,
  Filter,
  RotateCcw,
  BookOpen,
  Phone,
  UserCheck,
  Download,
} from "lucide-react";
import * as XLSX from "xlsx";

/* -------------------- COMPREHENSIVE CITY NORMALIZER -------------------- */
const normalizeCity = (c: any): string => {
  if (!c || typeof c !== "string") return "";
  const str = c.toLowerCase().trim();

  // All variations and misspellings of Prayagraj / Allahabad
  if (
    str.includes("allahabad") ||
    str.includes("allhabad") ||
    str.includes("allahabaad") ||
    str.includes("prayagraj") ||
    str.includes("prayag") ||
    str.includes("prayagaraj") ||
    str.includes("paraygraj") ||
    str.includes("pragraaj") ||
    str.includes("pragraj") ||
    str.includes("pragyraj") ||
    str.includes("prayaraaj") ||
    str.includes("praygraj") ||
    str.includes("pryagraj")
  ) {
    return "prayagraj";
  }

  if (str.includes("delhi")) return "delhi";
  if (str.includes("noida")) return "noida";
  if (str.includes("varanasi") || str.includes("banaras")) return "varanasi";
  if (str.includes("lucknow")) return "lucknow";
  if (str.includes("kanpur")) return "kanpur";
  if (str.includes("pune")) return "pune";
  if (str.includes("mumbai")) return "mumbai";
  if (str.includes("bangalore") || str.includes("bengaluru")) return "bengaluru";

  return str.replace(/[^a-z0-9\s]/gi, "").trim();
};

const formatCityName = (c: string): string => {
  if (!c) return "";
  if (c === "prayagraj") return "Prayagraj";
  if (c === "delhi") return "Delhi";
  if (c === "noida") return "Noida";
  if (c === "varanasi") return "Varanasi";
  if (c === "lucknow") return "Lucknow";
  if (c === "kanpur") return "Kanpur";
  return c
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

export default function AdminTutorsPage() {
  const [tutors, setTutors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("");
  const [profileFilter, setProfileFilter] = useState("all");

  const router = useRouter();

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/admin_dashboard/tutors?page=1&limit=1500");
      setTutors(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch tutors", err);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- DYNAMIC CITIES -------------------- */
  const cities = useMemo(() => {
    const cleaned = tutors
      .map((t) =>
        normalizeCity(
          t.location?.city || t.city || t.location?.area || ""
        )
      )
      .filter((c): c is string => Boolean(c));

    return Array.from(new Set(cleaned)).sort((a, b) => a.localeCompare(b));
  }, [tutors]);

  /* -------------------- CITY COUNTS -------------------- */
  const cityCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    tutors.forEach((t) => {
      const c = normalizeCity(
        t.location?.city || t.city || t.location?.area || ""
      );
      if (c) {
        counts[c] = (counts[c] || 0) + 1;
      }
    });
    return counts;
  }, [tutors]);

  /* -------------------- COUNTS (CITY & FILTER AWARE) -------------------- */
  const stats = useMemo(() => {
    // Filter base tutors by city if selected
    const baseTutors = city
      ? tutors.filter((t) => {
          const tutorCity = normalizeCity(
            t.location?.city || t.city || t.location?.area || ""
          );
          return tutorCity === city;
        })
      : tutors;

    return {
      total: baseTutors.length,
      approved: baseTutors.filter((t) => t.status === "approved").length,
      rejected: baseTutors.filter((t) => t.status === "rejected").length,
      pending: baseTutors.filter(
        (t) => t.status !== "approved" && t.status !== "rejected"
      ).length,
    };
  }, [tutors, city]);

  const uniqueClasses = useMemo(() => {
    const classSet = new Set<string>();
    tutors.forEach((t) => {
      if (Array.isArray(t.classesTaught)) {
        t.classesTaught.forEach((c: string) => {
          if (c && typeof c === "string") classSet.add(c.trim());
        });
      } else if (typeof t.classesTaught === "string" && t.classesTaught) {
        t.classesTaught.split(",").forEach((c: string) => {
          if (c) classSet.add(c.trim());
        });
      }
    });
    return Array.from(classSet).sort();
  }, [tutors]);

  /* -------------------- ADVANCED FILTER -------------------- */
  const filteredTutors = useMemo(() => {
    const q = search.toLowerCase().trim();

    return tutors.filter((t) => {
      // 1. Status Filter
      if (statusFilter !== "all") {
        if (statusFilter === "pending") {
          if (t.status === "approved" || t.status === "rejected") return false;
        } else if (t.status !== statusFilter) {
          return false;
        }
      }

      // 2. Profile Completion Filter
      if (profileFilter !== "all") {
        const isComplete = Boolean(t.isProfileComplete);
        if (profileFilter === "complete" && !isComplete) return false;
        if (profileFilter === "incomplete" && isComplete) return false;
      }

      // 3. Location / City Filter
      const tutorCity = normalizeCity(
        t.location?.city || t.city || t.location?.area || ""
      );
      if (city && tutorCity !== city) {
        return false;
      }

      // 4. Class Level Filter
      if (classFilter) {
        let matchesClass = false;
        if (Array.isArray(t.classesTaught)) {
          matchesClass = t.classesTaught.some(
            (c: string) => c.toLowerCase().trim() === classFilter.toLowerCase().trim()
          );
        } else if (typeof t.classesTaught === "string") {
          matchesClass = t.classesTaught
            .toLowerCase()
            .includes(classFilter.toLowerCase());
        }
        if (!matchesClass) return false;
      }

      // 5. Global Search (Name, Email, Phone, Location Area/City/State, Classes, Subjects)
      if (q) {
        const fullName = (t.fullName || "").toLowerCase();
        const email = (t.email || "").toLowerCase();
        const phone = (t.phone || t.mobileNumber || t.phoneNumber || "").toLowerCase();
        const area = (t.location?.area || "").toLowerCase();
        const state = (t.location?.state || "").toLowerCase();
        const tutorCityStr = (t.location?.city || t.city || "").toLowerCase();
        const classesStr = Array.isArray(t.classesTaught)
          ? t.classesTaught.join(" ").toLowerCase()
          : (t.classesTaught || "").toLowerCase();
        const subjectsStr = Array.isArray(t.subjects)
          ? t.subjects.join(" ").toLowerCase()
          : (t.subjects || "").toLowerCase();

        const matchesSearch =
          fullName.includes(q) ||
          email.includes(q) ||
          phone.includes(q) ||
          area.includes(q) ||
          tutorCityStr.includes(q) ||
          state.includes(q) ||
          classesStr.includes(q) ||
          subjectsStr.includes(q);

        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [search, tutors, city, statusFilter, classFilter, profileFilter]);

  const resetFilters = () => {
    setSearch("");
    setCity("");
    setStatusFilter("all");
    setClassFilter("");
    setProfileFilter("all");
  };

  const isFiltered = Boolean(
    search || city || statusFilter !== "all" || classFilter || profileFilter !== "all"
  );

  const selectedCityName = city ? formatCityName(city) : null;

  // Export to Excel function
  const exportToExcel = () => {
    // Prepare data for export
    const exportData = filteredTutors.map((tutor) => {
      const locationStr =
        [tutor.location?.area, tutor.location?.city, tutor.location?.state]
          .filter(Boolean)
          .join(", ") ||
        tutor.city ||
        "Not provided";

      const classesStr = Array.isArray(tutor.classesTaught)
        ? tutor.classesTaught.join(", ")
        : tutor.classesTaught || "Not specified";

      const subjectsStr = Array.isArray(tutor.subjects)
        ? tutor.subjects.join(", ")
        : tutor.subjects || "Not specified";

      const phoneNum =
        tutor.phone || tutor.mobileNumber || tutor.phoneNumber || "Not provided";

      return {
        "Name": tutor.fullName || "N/A",
        "Email": tutor.email || "N/A",
        "Mobile Number": phoneNum,
        "Location": locationStr,
        "City": tutor.location?.city || tutor.city || "N/A",
        "State": tutor.location?.state || "N/A",
        "Area": tutor.location?.area || "N/A",
        "Classes Taught": classesStr,
        "Subjects": subjectsStr,
        "Status": tutor.status || "Pending",
        "Profile Complete": tutor.isProfileComplete ? "Yes" : "No",
        "Qualification": tutor.qualification || "N/A",
        "Experience": tutor.experience || "N/A",
        "Preferred Mode": tutor.preferredMode || "N/A",
        "Registration Date": tutor.createdAt ? new Date(tutor.createdAt).toLocaleDateString() : "N/A",
      };
    });

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // Set column widths
    const columnWidths = [
      { wch: 25 }, // Name
      { wch: 30 }, // Email
      { wch: 15 }, // Mobile
      { wch: 40 }, // Location
      { wch: 15 }, // City
      { wch: 15 }, // State
      { wch: 20 }, // Area
      { wch: 30 }, // Classes
      { wch: 40 }, // Subjects
      { wch: 12 }, // Status
      { wch: 15 }, // Profile Complete
      { wch: 20 }, // Qualification
      { wch: 15 }, // Experience
      { wch: 15 }, // Preferred Mode
      { wch: 15 }, // Registration Date
    ];
    worksheet["!cols"] = columnWidths;

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tutors");

    // Generate filename with date and city filter
    const dateStr = new Date().toISOString().split("T")[0];
    const cityStr = selectedCityName ? `_${selectedCityName}` : "_AllCities";
    const filename = `Tutors_Data${cityStr}_${dateStr}.xlsx`;

    // Download file
    XLSX.writeFile(workbook, filename);
  };

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="flex min-h-[400px] items-center justify-center bg-[#F7F2E9] p-6">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#D79A2C] border-t-transparent"></div>
            <p className="text-sm font-medium text-[#58646C]">Loading tutors management...</p>
          </div>
        </div>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout>
      <div className="relative min-h-screen space-y-6 bg-[#F7F2E9] p-4 sm:p-6">
        {/* grain texture overlay */}
        <svg className="pointer-events-none fixed inset-0 h-full w-full opacity-[0.035]" aria-hidden="true">
          <filter id="tutors-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#tutors-grain)" />
        </svg>

        {/* Page Header */}
        <div className="relative flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className={`${lora.className} text-2xl font-semibold text-[#17261D]`}>
              Tutors management
              {selectedCityName && (
                <span className="ml-2 text-lg text-[#58646C]">
                  · {selectedCityName}
                </span>
              )}
            </h1>
            <p className="text-sm text-[#58646C]">
              {selectedCityName
                ? `Showing statistics and tutors in ${selectedCityName}`
                : "View, search, and manage all registered tutors and their applications"}
            </p>
          </div>

          {/* Export Button */}
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 rounded-md bg-[#0E211C] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#132B22]"
          >
            <Download size={16} />
            Export to Excel ({filteredTutors.length})
          </button>
        </div>

        {/* Stats (City-Aware & Clickable Filters) */}
        <div className="relative grid grid-cols-1 divide-y divide-[#1C2B22]/10 rounded-md border border-[#1C2B22]/10 bg-white sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
          <StatCard
            title={selectedCityName ? `Total in ${selectedCityName}` : "Total tutors"}
            value={stats.total}
            subtext={selectedCityName ? `In ${selectedCityName}` : "All cities"}
            icon={UserCheck}
            active={statusFilter === "all"}
            onClick={() => setStatusFilter("all")}
          />
          <StatCard
            title="Approved"
            value={stats.approved}
            subtext={selectedCityName ? `Approved in ${selectedCityName}` : "All cities"}
            icon={CheckCircle}
            active={statusFilter === "approved"}
            onClick={() => setStatusFilter("approved")}
          />
          <StatCard
            title="Pending"
            value={stats.pending}
            subtext={selectedCityName ? `Pending in ${selectedCityName}` : "All cities"}
            icon={Clock}
            active={statusFilter === "pending"}
            onClick={() => setStatusFilter("pending")}
          />
          <StatCard
            title="Rejected"
            value={stats.rejected}
            subtext={selectedCityName ? `Rejected in ${selectedCityName}` : "All cities"}
            icon={XCircle}
            active={statusFilter === "rejected"}
            onClick={() => setStatusFilter("rejected")}
          />
        </div>

        {/* Advanced Filter Bar */}
        <div className="relative space-y-4 rounded-md border border-[#1C2B22]/10 bg-white p-5">
          <div className="flex items-center justify-between border-b border-[#1C2B22]/10 pb-3">
            <div className="flex items-center gap-2 text-sm font-medium text-[#17261D]">
              <Filter size={16} className="text-[#D79A2C]" />
              <span>Filters</span>
              {selectedCityName && (
                <span className="rounded-sm bg-[#F7F2E9] px-3 py-1 text-xs font-medium text-[#17261D]">
                  City: {selectedCityName} ({stats.total} tutors)
                </span>
              )}
            </div>
            {isFiltered && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-xs font-medium text-[#8a3f3f] transition-colors hover:underline"
              >
                <RotateCcw size={14} />
                Reset filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {/* Search Input */}
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-2.5 text-[#9AA3AB]" size={16} />
              <input
                type="text"
                placeholder="Search by name, email, phone, location, subject..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-md border border-[#1C2B22]/15 py-2 pl-9 pr-3 text-sm text-[#17261D] outline-none transition-colors focus:border-[#D79A2C]"
              />
            </div>

            {/* City Dropdown */}
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-2.5 text-[#9AA3AB]" size={16} />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-md border border-[#1C2B22]/15 py-2 pl-9 pr-3 text-sm font-medium text-[#17261D] outline-none transition-colors focus:border-[#D79A2C]"
              >
                <option value="">All cities ({tutors.length})</option>
                {cities.map((c, i) => (
                  <option key={i} value={c}>
                    {formatCityName(c)} ({cityCounts[c] ?? 0})
                  </option>
                ))}
              </select>
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-md border border-[#1C2B22]/15 px-3 py-2 text-sm text-[#17261D] outline-none transition-colors focus:border-[#D79A2C]"
              >
                <option value="all">All statuses</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Class Filter Dropdown */}
            <div className="relative">
              <BookOpen className="pointer-events-none absolute left-3 top-2.5 text-[#9AA3AB]" size={16} />
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="w-full rounded-md border border-[#1C2B22]/15 py-2 pl-9 pr-3 text-sm text-[#17261D] outline-none transition-colors focus:border-[#D79A2C]"
              >
                <option value="">All classes</option>
                {uniqueClasses.map((cls, i) => (
                  <option key={i} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tutors Data Table */}
        <div className="relative overflow-hidden rounded-md border border-[#1C2B22]/10 bg-white">
          <div className="flex items-center justify-between border-b border-[#1C2B22]/10 bg-[#F7F2E9] px-4 py-3 text-xs font-medium text-[#58646C]">
            <span>
              Showing {filteredTutors.length} of {stats.total}{" "}
              {selectedCityName ? `tutors in ${selectedCityName}` : "total tutors"}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#1C2B22]/10 bg-[#F7F2E9]">
                  <th className="border-r border-[#1C2B22]/10 px-4 py-3 text-xs font-medium text-[#58646C]">Name</th>
                  <th className="border-r border-[#1C2B22]/10 px-4 py-3 text-xs font-medium text-[#58646C]">Email</th>
                  <th className="border-r border-[#1C2B22]/10 px-4 py-3 text-xs font-medium text-[#58646C]">
                    <div className="flex items-center gap-1">
                      <Phone size={14} />
                      <span>Mobile number</span>
                    </div>
                  </th>
                  <th className="border-r border-[#1C2B22]/10 px-4 py-3 text-xs font-medium text-[#58646C]">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>Location</span>
                    </div>
                  </th>
                  <th className="border-r border-[#1C2B22]/10 px-4 py-3 text-xs font-medium text-[#58646C]">
                    <div className="flex items-center gap-1">
                      <BookOpen size={14} />
                      <span>Classes taught</span>
                    </div>
                  </th>
                  <th className="border-r border-[#1C2B22]/10 px-4 py-3 text-xs font-medium text-[#58646C]">Status</th>
                  <th className="border-r border-[#1C2B22]/10 px-4 py-3 text-xs font-medium text-[#58646C]">Profile</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-[#58646C]">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#1C2B22]/10">
                {filteredTutors.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-10 text-center text-[#58646C]">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Filter className="text-[#9AA3AB]" size={28} />
                        <p className="font-medium text-[#17261D]">
                          No tutors match the selected criteria
                          {selectedCityName ? ` in ${selectedCityName}` : ""}
                        </p>
                        {isFiltered && (
                          <button
                            onClick={resetFilters}
                            className="mt-1 text-xs font-medium text-[#D79A2C] hover:underline"
                          >
                            Clear all filters
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredTutors.map((tutor, index) => {
                    const locationStr =
                      [tutor.location?.area, tutor.location?.city, tutor.location?.state]
                        .filter(Boolean)
                        .join(", ") ||
                      tutor.city ||
                      "Not provided";

                    const classesStr = Array.isArray(tutor.classesTaught)
                      ? tutor.classesTaught.join(", ")
                      : tutor.classesTaught || "Not specified";

                    const phoneNum =
                      tutor.phone || tutor.mobileNumber || tutor.phoneNumber || "Not provided";

                    return (
                      <tr
                        key={tutor._id}
                        className="transition-colors hover:bg-[#F7F2E9]/60"
                      >
                        {/* Name */}
                        <td className="border-r border-[#1C2B22]/10 px-4 py-3 font-medium text-[#17261D]">
                          {tutor.fullName || "N/A"}
                        </td>

                        {/* Email */}
                        <td className="border-r border-[#1C2B22]/10 px-4 py-3 text-[#58646C]">
                          {tutor.email || "N/A"}
                        </td>

                        {/* Mobile Number */}
                        <td className="border-r border-[#1C2B22]/10 px-4 py-3 font-medium text-[#17261D]">
                          {phoneNum !== "Not provided" ? (
                            <a
                              href={`tel:${phoneNum}`}
                              className="transition-colors hover:text-[#D79A2C]"
                            >
                              {phoneNum}
                            </a>
                          ) : (
                            <span className="italic text-[#9AA3AB]">Not provided</span>
                          )}
                        </td>

                        {/* Location */}
                        <td
                          className="max-w-[200px] truncate border-r border-[#1C2B22]/10 px-4 py-3 text-[#58646C]"
                          title={locationStr}
                        >
                          {locationStr}
                        </td>

                        {/* Classes Taught */}
                        <td
                          className="max-w-[180px] truncate border-r border-[#1C2B22]/10 px-4 py-3 text-[#58646C]"
                          title={classesStr}
                        >
                          <span className="rounded-sm bg-[#F7F2E9] px-2 py-0.5 text-xs font-medium text-[#17261D]">
                            {classesStr}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="border-r border-[#1C2B22]/10 px-4 py-3">
                          <StatusBadge status={tutor.status} />
                        </td>

                        {/* Profile Completion */}
                        <td className="border-r border-[#1C2B22]/10 px-4 py-3">
                          <span
                            className={`rounded-sm px-2.5 py-1 text-xs font-medium ${
                              tutor.isProfileComplete
                                ? "bg-[#eef3f0] text-[#3f8a5f]"
                                : "bg-[#F7F2E9] text-[#58646C]"
                            }`}
                          >
                            {tutor.isProfileComplete ? "Complete" : "Incomplete"}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() =>
                              router.push(`/admin/users/tutors/${tutor._id}`)
                            }
                            className="inline-flex items-center gap-1.5 rounded-md bg-[#0E211C] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#132B22]"
                          >
                            <Eye size={13} /> View
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}

/* -------------------- COMPONENTS -------------------- */

function StatCard({
  title,
  value,
  subtext,
  icon: Icon,
  active = false,
  onClick,
}: any) {
  const DisplayIcon = Icon || UserCheck;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between p-5 text-left transition-colors ${
        active ? "bg-[#F7F2E9]" : "hover:bg-[#F7F2E9]/60"
      }`}
    >
      <div>
        <p className="mb-1 text-xs text-[#58646C]">{title}</p>
        <p className="text-2xl font-semibold text-[#17261D]">{typeof value === "number" ? value : (value ?? 0)}</p>
        {subtext && <p className="mt-0.5 text-[11px] text-[#9AA3AB]">{subtext}</p>}
      </div>
      <DisplayIcon size={20} className="text-[#D79A2C]" />
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: any = {
    approved: "bg-[#eef3f0] text-[#3f8a5f]",
    rejected: "bg-[#f5ebe9] text-[#8a3f3f]",
    pending: "bg-[#F7F2E9] text-[#8a5f18]",
  };

  const statusLabel = status
    ? status.charAt(0).toUpperCase() + status.slice(1)
    : "Pending";

  return (
    <span
      className={`rounded-sm px-2.5 py-1 text-xs font-medium ${
        map[status] || "bg-[#F7F2E9] text-[#8a5f18]"
      }`}
    >
      {statusLabel}
    </span>
  );
}
