import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Lora } from "next/font/google";
import AdminDashboardLayout from "@/components/admin-dashboard/AdminDashboardLayout";
import apiClient from "@/lib/apiClient";
import { Search, Users, Eye, MapPin, Phone, Mail, Filter, RotateCcw, UserCircle2, Calendar, ArrowUpRight, Download } from "lucide-react";
import * as XLSX from "xlsx";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"] });

interface Parent {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  createdAt?: string;
  location?: {
    city?: string;
    area?: string;
    state?: string;
    country?: string;
    pincode?: string;
  };
}

// City normalizer for filtering
const normalizeCity = (c: any): string => {
  if (!c || typeof c !== "string") return "";
  const str = c.toLowerCase().trim();
  
  if (str.includes("prayagraj") || str.includes("allahabad")) return "prayagraj";
  if (str.includes("delhi")) return "delhi";
  if (str.includes("noida")) return "noida";
  if (str.includes("varanasi")) return "varanasi";
  if (str.includes("lucknow")) return "lucknow";
  if (str.includes("kanpur")) return "kanpur";
  
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
  return c.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
};

export default function ParentListPage() {
  const router = useRouter();
  const [parents, setParents] = useState<Parent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const res = await apiClient.get("/admin/parents");
        setParents(res.data.data || []);
      } catch (err) {
        console.error("Failed to load parents", err);
      } finally {
        setLoading(false);
      }
    };

    fetchParents();
  }, []);

  // Extract unique cities
  const cities = useMemo(() => {
    const cleaned = parents
      .map(p => normalizeCity(p.location?.city || ""))
      .filter(c => Boolean(c));
    return Array.from(new Set(cleaned)).sort();
  }, [parents]);

  // City counts
  const cityCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    parents.forEach(p => {
      const c = normalizeCity(p.location?.city || "");
      if (c) counts[c] = (counts[c] || 0) + 1;
    });
    return counts;
  }, [parents]);

  // Filtered parents
  const filteredParents = useMemo(() => {
    const q = search.toLowerCase().trim();
    
    return parents.filter(p => {
      // City filter
      if (cityFilter) {
        const parentCity = normalizeCity(p.location?.city || "");
        if (parentCity !== cityFilter) return false;
      }
      
      // Search filter
      if (q) {
        const name = (p.fullName || "").toLowerCase();
        const email = (p.email || "").toLowerCase();
        const phone = (p.phone || "").toLowerCase();
        const area = (p.location?.area || "").toLowerCase();
        const city = (p.location?.city || "").toLowerCase();
        
        return name.includes(q) || email.includes(q) || phone.includes(q) || 
               area.includes(q) || city.includes(q);
      }
      
      return true;
    });
  }, [parents, search, cityFilter]);

  const resetFilters = () => {
    setSearch("");
    setCityFilter("");
  };

  const isFiltered = Boolean(search || cityFilter);
  const selectedCityName = cityFilter ? formatCityName(cityFilter) : null;

  // Export to Excel function
  const exportToExcel = () => {
    const exportData = filteredParents.map((parent) => {
      const locationStr = [
        parent.location?.area,
        parent.location?.city,
        parent.location?.state,
        parent.location?.country
      ].filter(Boolean).join(", ") || "Not provided";

      return {
        "Name": parent.fullName || "N/A",
        "Email": parent.email || "N/A",
        "Phone": parent.phone || "Not provided",
        "City": parent.location?.city || "N/A",
        "Area": parent.location?.area || "N/A",
        "State": parent.location?.state || "N/A",
        "Country": parent.location?.country || "N/A",
        "Pincode": parent.location?.pincode || "N/A",
        "Full Location": locationStr,
        "Registration Date": parent.createdAt ? new Date(parent.createdAt).toLocaleDateString() : "N/A",
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // Set column widths
    worksheet["!cols"] = [
      { wch: 25 }, // Name
      { wch: 30 }, // Email
      { wch: 15 }, // Phone
      { wch: 15 }, // City
      { wch: 20 }, // Area
      { wch: 15 }, // State
      { wch: 15 }, // Country
      { wch: 10 }, // Pincode
      { wch: 50 }, // Full Location
      { wch: 15 }, // Registration Date
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Parents");

    const dateStr = new Date().toISOString().split("T")[0];
    const cityStr = selectedCityName ? `_${selectedCityName}` : "_AllCities";
    const filename = `Parents_Data${cityStr}_${dateStr}.xlsx`;

    XLSX.writeFile(workbook, filename);
  };

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="flex min-h-[400px] items-center justify-center bg-[#F7F2E9] p-6">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#D79A2C] border-t-transparent"></div>
            <p className="text-sm font-medium text-[#58646C]">Loading parents...</p>
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
          <filter id="parents-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#parents-grain)" />
        </svg>

        {/* Header */}
        <div className="relative flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className={`${lora.className} text-2xl font-semibold text-[#17261D]`}>
              Parents management
              {selectedCityName && (
                <span className="ml-2 text-lg text-[#58646C]">
                  · {selectedCityName}
                </span>
              )}
            </h1>
            <p className="mt-1 text-sm text-[#58646C]">
              {selectedCityName
                ? `Showing ${filteredParents.length} parents in ${selectedCityName}`
                : `Manage ${parents.length} registered parents across all locations`}
            </p>
          </div>

          {/* Export Button */}
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 rounded-md bg-[#0E211C] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#132B22]"
          >
            <Download size={16} />
            Export to Excel ({filteredParents.length})
          </button>
        </div>

        {/* Stats */}
        <div className="relative grid grid-cols-1 divide-y divide-[#1C2B22]/10 rounded-md border border-[#1C2B22]/10 bg-white sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
          <StatCard
            title={selectedCityName ? `In ${selectedCityName}` : "Total parents"}
            value={filteredParents.length}
            subtext={selectedCityName ? `Filtered results` : "Registered"}
            icon={Users}
          />
          <StatCard
            title="Unique cities"
            value={cities.length}
            subtext="Locations covered"
            icon={MapPin}
          />
          <StatCard
            title="Platform total"
            value={parents.length}
            subtext="All parents"
            icon={UserCircle2}
          />
        </div>

        {/* Filter Bar */}
        <div className="relative space-y-4 rounded-md border border-[#1C2B22]/10 bg-white p-5">
          <div className="flex items-center justify-between border-b border-[#1C2B22]/10 pb-3">
            <div className="flex items-center gap-2 text-sm font-medium text-[#17261D]">
              <Filter size={16} className="text-[#D79A2C]" />
              <span>Filters</span>
              {selectedCityName && (
                <span className="rounded-sm bg-[#F7F2E9] px-3 py-1 text-xs font-medium text-[#17261D]">
                  {selectedCityName} · {filteredParents.length}
                </span>
              )}
            </div>
            {isFiltered && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-xs font-medium text-[#8a3f3f] transition-colors hover:underline"
              >
                <RotateCcw size={14} />
                Reset all
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {/* Search Input */}
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-3 text-[#9AA3AB]" size={16} />
              <input
                type="text"
                placeholder="Search by name, email, phone, location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-md border border-[#1C2B22]/15 py-2.5 pl-10 pr-4 text-sm text-[#17261D] outline-none transition-colors focus:border-[#D79A2C]"
              />
            </div>

            {/* City Dropdown */}
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-3 text-[#9AA3AB]" size={16} />
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full cursor-pointer rounded-md border border-[#1C2B22]/15 py-2.5 pl-10 pr-4 text-sm font-medium text-[#17261D] outline-none transition-colors focus:border-[#D79A2C]"
              >
                <option value="">All cities ({parents.length})</option>
                {cities.map((c, i) => (
                  <option key={i} value={c}>
                    {formatCityName(c)} ({cityCounts[c] ?? 0})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="relative flex items-center justify-between px-1">
          <p className="text-sm text-[#58646C]">
            Showing <span className="font-medium text-[#17261D]">{filteredParents.length}</span> of <span className="font-medium text-[#17261D]">{parents.length}</span> parents
          </p>
        </div>

        {/* Parents Table with Borders */}
        {filteredParents.length === 0 ? (
          <div className="relative rounded-md border border-[#1C2B22]/10 bg-white p-12 text-center">
            <div className="flex flex-col items-center justify-center gap-3">
              <Filter className="text-[#9AA3AB]" size={32} />
              <p className="text-lg font-medium text-[#17261D]">
                No parents found
              </p>
              <p className="text-sm text-[#58646C]">
                {selectedCityName
                  ? `No parents match your criteria in ${selectedCityName}`
                  : "Try adjusting your search or filters"}
              </p>
              {isFiltered && (
                <button
                  onClick={resetFilters}
                  className="mt-2 rounded-md bg-[#0E211C] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#132B22]"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-md border border-[#1C2B22]/10 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1C2B22]/10 bg-[#F7F2E9]">
                    <th className="border-r border-[#1C2B22]/10 px-4 py-3 text-left text-xs font-medium text-[#58646C]">
                      #
                    </th>
                    <th className="border-r border-[#1C2B22]/10 px-4 py-3 text-left text-xs font-medium text-[#58646C]">
                      <div className="flex items-center gap-2">
                        <UserCircle2 size={14} />
                        <span>Name</span>
                      </div>
                    </th>
                    <th className="border-r border-[#1C2B22]/10 px-4 py-3 text-left text-xs font-medium text-[#58646C]">
                      <div className="flex items-center gap-2">
                        <Mail size={14} />
                        <span>Email</span>
                      </div>
                    </th>
                    <th className="border-r border-[#1C2B22]/10 px-4 py-3 text-left text-xs font-medium text-[#58646C]">
                      <div className="flex items-center gap-2">
                        <Phone size={14} />
                        <span>Phone</span>
                      </div>
                    </th>
                    <th className="border-r border-[#1C2B22]/10 px-4 py-3 text-left text-xs font-medium text-[#58646C]">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} />
                        <span>Location</span>
                      </div>
                    </th>
                    <th className="border-r border-[#1C2B22]/10 px-4 py-3 text-left text-xs font-medium text-[#58646C]">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>Joined</span>
                      </div>
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-[#58646C]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1C2B22]/10">
                  {filteredParents.map((parent, idx) => {
                    const locationStr =
                      [parent.location?.area, parent.location?.city, parent.location?.state]
                        .filter(Boolean)
                        .join(", ") || "Not provided";

                    return (
                      <tr
                        key={parent._id}
                        className="transition-colors hover:bg-[#F7F2E9]/60"
                      >
                        <td className="border-r border-[#1C2B22]/10 px-4 py-3 text-sm text-[#58646C]">
                          {idx + 1}
                        </td>
                        <td className="border-r border-[#1C2B22]/10 px-4 py-3">
                          <span className="font-medium text-[#17261D]">
                            {parent.fullName || "N/A"}
                          </span>
                        </td>
                        <td className="border-r border-[#1C2B22]/10 px-4 py-3">
                          {parent.email ? (
                            <a
                              href={`mailto:${parent.email}`}
                              className="text-sm text-[#17261D] transition-colors hover:text-[#D79A2C] hover:underline"
                              title={parent.email}
                            >
                              {parent.email}
                            </a>
                          ) : (
                            <span className="text-sm italic text-[#9AA3AB]">Not provided</span>
                          )}
                        </td>
                        <td className="border-r border-[#1C2B22]/10 px-4 py-3">
                          {parent.phone ? (
                            <a
                              href={`tel:${parent.phone}`}
                              className="text-sm font-medium text-[#3f8a5f] transition-colors hover:underline"
                            >
                              {parent.phone}
                            </a>
                          ) : (
                            <span className="text-sm italic text-[#9AA3AB]">Not provided</span>
                          )}
                        </td>
                        <td className="border-r border-[#1C2B22]/10 px-4 py-3">
                          <div className="flex items-start gap-2">
                            <MapPin size={13} className="mt-0.5 flex-shrink-0 text-[#D79A2C]" />
                            <span className="line-clamp-2 text-sm text-[#58646C]" title={locationStr}>
                              {locationStr}
                            </span>
                          </div>
                        </td>
                        <td className="border-r border-[#1C2B22]/10 px-4 py-3">
                          {parent.createdAt ? (
                            <span className="text-sm text-[#58646C]">
                              {new Date(parent.createdAt).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          ) : (
                            <span className="text-sm italic text-[#9AA3AB]">N/A</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => router.push(`/admin/users/parent/${parent._id}`)}
                            className="inline-flex items-center gap-1.5 rounded-md bg-[#0E211C] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#132B22]"
                          >
                            <Eye size={13} />
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({
  title,
  value,
  subtext,
  icon: Icon,
}: {
  title: string;
  value: number;
  subtext?: string;
  icon?: any;
  gradient?: string;
}) {
  const DisplayIcon = Icon || Users;

  return (
    <div className="flex items-center justify-between p-5">
      <div>
        <p className="mb-1 text-xs text-[#58646C]">{title}</p>
        <p className="text-2xl font-semibold text-[#17261D]">{value}</p>
        {subtext && (
          <p className="mt-1 text-xs text-[#9AA3AB]">{subtext}</p>
        )}
      </div>
      <DisplayIcon size={20} className="text-[#D79A2C]" />
    </div>
  );
}
