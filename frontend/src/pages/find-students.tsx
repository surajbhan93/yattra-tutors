import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Users, Target, Zap, TrendingUp, Shield, CheckCircle2,
  MapPin, BookOpen, Clock, DollarSign, ArrowRight, Loader, User, Phone, Filter, X,
  Eye, ChevronDown, Search, Sparkles, SlidersHorizontal, ArrowUpDown
} from "lucide-react";
import { Lora, DM_Sans } from "next/font/google";
import { useAuthStore } from "@/stores/useAuthStore";
import api from "@/lib/apiClient";
import Head from "next/head";
import NavBar from "@/components/navbar/NavBar";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"], style: ["italic", "normal"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

type Lead = {
  _id: string;
  studentName?: string;
  studentClass: string;
  board?: string;
  schoolName?: string;
  subject: string;
  teachingMode: "online" | "home" | "hybrid";
  location: {
    city?: string;
    area?: string;
    state?: string;
  };
  budget: number;
  budgetType: string;
  urgency: string;
  availability: "active" | "already_filled";
  qualityScore: number;
  creditsRequired: number;
  totalUnlocks: number;
  maxUnlocks: number;
  createdAt: string;
  additionalRequirements?: string;
};

type MatchedLead = {
  lead: Lead;
  matchScore: number;
  reasons: string[];
};

type Filters = {
  search: string;
  subject: string;
  studentClass: string;
  city: string;
  state: string;
  teachingMode: string;
  budgetRange: string;
  urgency: string;
  board: string;
  sortBy: string;
};

const initialFilters: Filters = {
  search: "",
  subject: "",
  studentClass: "",
  city: "",
  state: "",
  teachingMode: "",
  budgetRange: "",
  urgency: "",
  board: "",
  sortBy: "newest",
};

const FindStudentsLanding = () => {
  const router = useRouter();
  const { isLoggedIn, user } = useAuthStore();
  const [allLeads, setAllLeads] = useState<MatchedLead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<MatchedLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState<Filters>(initialFilters);

  useEffect(() => {
    // Redirect authenticated tutors to leads dashboard
    if (isLoggedIn && user?.role === "tutor") {
      router.push("/tutor/leads");
      return;
    }

    // Fetch all leads for public preview (without authentication)
    const fetchAllLeads = async () => {
      try {
        const response = await api.get("/leads/public/preview");
        const rawArray = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.data)
          ? response.data.data
          : Array.isArray(response.data?.leads)
          ? response.data.leads
          : [];

        const normalizedLeads: MatchedLead[] = rawArray
          .map((item: any) => {
            if (item && item.lead) {
              return {
                lead: item.lead,
                matchScore: item.matchScore || 85,
                reasons: item.reasons || [],
              };
            }
            return {
              lead: item,
              matchScore: 85,
              reasons: [],
            };
          })
          .filter((item: any) => item && item.lead && (item.lead._id || item.lead.subject));

        setAllLeads(normalizedLeads);
        setFilteredLeads(normalizedLeads);
      } catch (error) {
        console.log("Could not fetch public leads:", error);
        setAllLeads([]);
        setFilteredLeads([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllLeads();
  }, [isLoggedIn, user, router]);

  // Apply Advanced Filters
  useEffect(() => {
    let result = [...allLeads];

    // Keyword Search (Subject, Class, City, Area)
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(({ lead }) =>
        (lead?.subject && lead.subject.toLowerCase().includes(q)) ||
        (lead?.studentClass && lead.studentClass.toLowerCase().includes(q)) ||
        (lead?.location?.city && lead.location.city.toLowerCase().includes(q)) ||
        (lead?.location?.area && lead.location.area.toLowerCase().includes(q)) ||
        (lead?.additionalRequirements && lead.additionalRequirements.toLowerCase().includes(q))
      );
    }

    // Subject filter
    if (filters.subject) {
      result = result.filter(({ lead }) =>
        lead?.subject && lead.subject.toLowerCase().includes(filters.subject.toLowerCase())
      );
    }

    // Class filter
    if (filters.studentClass) {
      result = result.filter(({ lead }) =>
        lead?.studentClass && lead.studentClass.toLowerCase().includes(filters.studentClass.toLowerCase())
      );
    }

    // City filter
    if (filters.city) {
      const selectedCity = filters.city.toLowerCase();
      result = result.filter(({ lead }) => {
        const leadCity = lead?.location?.city?.toLowerCase() || "";
        const leadArea = lead?.location?.area?.toLowerCase() || "";
        const leadState = lead?.location?.state?.toLowerCase() || "";

        if (selectedCity === "prayagraj" || selectedCity === "allahabad") {
          return leadCity.includes("prayagraj") || leadCity.includes("allahabad") || leadArea.includes("prayagraj") || leadArea.includes("allahabad");
        }
        return leadCity.includes(selectedCity) || leadArea.includes(selectedCity) || leadState.includes(selectedCity);
      });
    }

    // Teaching mode filter
    if (filters.teachingMode) {
      result = result.filter(({ lead }) =>
        lead?.teachingMode === filters.teachingMode
      );
    }

    // Board filter
    if (filters.board) {
      result = result.filter(({ lead }) =>
        lead?.board && lead.board.toLowerCase().includes(filters.board.toLowerCase())
      );
    }

    // Budget Preset Ranges
    if (filters.budgetRange) {
      if (filters.budgetRange === "under2k") {
        result = result.filter(({ lead }) => (lead?.budget || 0) <= 2000);
      } else if (filters.budgetRange === "2k-5k") {
        result = result.filter(({ lead }) => (lead?.budget || 0) >= 2000 && (lead?.budget || 0) <= 5000);
      } else if (filters.budgetRange === "5k-10k") {
        result = result.filter(({ lead }) => (lead?.budget || 0) >= 5000 && (lead?.budget || 0) <= 10000);
      } else if (filters.budgetRange === "above10k") {
        result = result.filter(({ lead }) => (lead?.budget || 0) >= 10000);
      }
    }

    // Urgency filter
    if (filters.urgency) {
      result = result.filter(({ lead }) =>
        lead?.urgency === filters.urgency
      );
    }

    // Sort By
    if (filters.sortBy === "budget_high") {
      result.sort((a, b) => (b.lead?.budget || 0) - (a.lead?.budget || 0));
    } else if (filters.sortBy === "quality") {
      result.sort((a, b) => (b.lead?.qualityScore || 0) - (a.lead?.qualityScore || 0));
    } else {
      // Default: newest
      result.sort((a, b) => new Date(b.lead?.createdAt || 0).getTime() - new Date(a.lead?.createdAt || 0).getTime());
    }

    setFilteredLeads(result);
  }, [filters, allLeads]);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const activeFilterCount = Object.entries(filters).filter(([k, v]) => k !== 'sortBy' && Boolean(v)).length;

  const selectClass =
    "w-full rounded-md border border-[#1C2B22]/15 bg-white px-3 py-2 text-xs text-[#1C2B22] outline-none focus:border-[#D79A2C]";

  return (
    <>
      <Head>
        <title>Find Students - Live Tutor Requirements | Yattra Tutors</title>
        <meta
          name="description"
          content="Discover live student requirements matched to your subjects, location, and teaching mode. Join 1000+ tutors growing their business with Yattra Tutors."
        />
      </Head>

      <NavBar />

      <div className={`min-h-screen bg-[#F7F2E9] ${dmSans.className}`}>
        {/* ======================================================== */}
        {/* HERO SECTION */}
        {/* ======================================================== */}
        <div className="relative overflow-hidden bg-[#0E211C] py-20 sm:py-24">
          {/* Grain texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[.04]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
            <p className={`${lora.className} italic text-sm text-[#AAB6A2] mb-4`}>
              1000+ active tutors · live student leads
            </p>

            <h1 className={`${lora.className} text-4xl font-semibold text-white sm:text-5xl`}>
              Find your perfect students
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base text-[#AAB6A2]">
              Verified student enquiries, instant matching, and flexible pricing.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/tutor-flow/tutor-registration">
                <button className="flex w-full items-center justify-center gap-2 rounded-md bg-[#D79A2C] px-7 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f] sm:w-auto">
                  Create profile free
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>

              <Link href="/login">
                <button className="w-full rounded-md border border-white/25 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-white/50 sm:w-auto">
                  Login
                </button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#AAB6A2]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#D79A2C]" />
                No hidden fees
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-[#D79A2C]" />
                100% verified enquiries
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-[#D79A2C]" />
                Instant access
              </span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* FILTER SECTION & LEADS GRID */}
        {/* ======================================================== */}
        <div className="py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-1`}>Live requirements</p>
                <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22] sm:text-3xl`}>
                  Recent student requirements available
                </h2>
                <p className="mt-1 text-xs text-[#58646C]">
                  Contact details unlocked after tutor login · Pay per lead or subscribe
                </p>
              </div>
              <div className="shrink-0 text-right">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-[#D79A2C]/30 bg-white px-3 py-1.5 text-xs font-semibold text-[#8a5f18]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Showing {filteredLeads.length} lead{filteredLeads.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* FILTER CONTAINER */}
            <div className="mb-8 overflow-hidden rounded-lg border border-[#1C2B22]/10 bg-white">
              {/* Search Bar Header */}
              <div className="border-b border-[#1C2B22]/[.06] p-4 sm:p-5">
                <div className="flex flex-col items-center gap-3 sm:flex-row">
                  <div className="relative w-full flex-1">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9AA3AB]" />
                    <input
                      type="text"
                      placeholder="Search by subject, class, city, locality, or requirement..."
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                      className="w-full rounded-md border border-[#1C2B22]/15 bg-white py-2.5 pl-10 pr-4 text-xs text-[#1C2B22] outline-none focus:border-[#D79A2C] sm:text-sm"
                    />
                    {filters.search && (
                      <button
                        onClick={() => handleFilterChange('search', '')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9AA3AB] hover:text-[#58646C]"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Filter Toggle & Clear */}
                  <div className="flex w-full items-center justify-between gap-2 sm:w-auto">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center gap-2 rounded-md border border-[#1C2B22]/15 bg-white px-4 py-2.5 text-xs font-semibold text-[#1C2B22] transition-colors hover:border-[#D79A2C]/50"
                    >
                      <SlidersHorizontal className="h-4 w-4 text-[#D79A2C]" />
                      <span>{showFilters ? 'Hide advanced filters' : 'Show advanced filters'}</span>
                      {activeFilterCount > 0 && (
                        <span className="ml-1 rounded-full bg-[#D79A2C] px-2 py-0.5 text-[10px] font-bold text-[#17261D]">
                          {activeFilterCount}
                        </span>
                      )}
                    </button>

                    {activeFilterCount > 0 && (
                      <button
                        onClick={clearFilters}
                        className="flex items-center gap-1 rounded-md border border-red-200 px-3 py-2.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
                      >
                        <X className="h-3.5 w-3.5" />
                        Clear all
                      </button>
                    )}
                  </div>
                </div>

                {/* Quick Preset Filter Chips */}
                <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                  <span className="mr-1 shrink-0 text-[11px] font-medium text-[#9AA3AB]">Quick presets:</span>
                  {[
                    { label: "Urgent needs", key: "urgency", val: "immediate" },
                    { label: "High budget (>₹5k)", key: "budgetRange", val: "5k-10k" },
                    { label: "Prayagraj", key: "city", val: "Prayagraj" },
                    { label: "Online tuition", key: "teachingMode", val: "online" },
                    { label: "Home tuition", key: "teachingMode", val: "home" },
                    { label: "Mathematics", key: "subject", val: "Mathematics" },
                    { label: "Physics", key: "subject", val: "Physics" },
                  ].map((preset) => {
                    const isSelected = (filters as any)[preset.key] === preset.val;
                    return (
                      <button
                        key={preset.label}
                        onClick={() => handleFilterChange(preset.key as keyof Filters, isSelected ? "" : preset.val)}
                        className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                          isSelected
                            ? "bg-[#0E211C] text-white"
                            : "border border-[#1C2B22]/15 text-[#1C2B22] hover:border-[#D79A2C]/50"
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Advanced Filters Expandable Panel */}
              {showFilters && (
                <div className="border-t border-[#1C2B22]/[.06] p-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Subject Filter */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-[#1C2B22]">Subject</label>
                      <select
                        value={filters.subject}
                        onChange={(e) => handleFilterChange('subject', e.target.value)}
                        className={selectClass}
                      >
                        <option value="">All subjects</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Biology">Biology</option>
                        <option value="English">English / Spoken English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Computer Science">Computer Science / Coding</option>
                        <option value="Accounts">Accounts / Commerce</option>
                        <option value="Economics">Economics</option>
                        <option value="All Subject">All subjects (all-in-one)</option>
                      </select>
                    </div>

                    {/* Class / Course Filter */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-[#1C2B22]">Class / exam</label>
                      <select
                        value={filters.studentClass}
                        onChange={(e) => handleFilterChange('studentClass', e.target.value)}
                        className={selectClass}
                      >
                        <option value="">All classes &amp; exams</option>
                        <option value="Class 1">Class 1</option><option value="Class 2">Class 2</option>
                        <option value="Class 3">Class 3</option><option value="Class 4">Class 4</option>
                        <option value="Class 5">Class 5</option><option value="Class 6">Class 6</option>
                        <option value="Class 7">Class 7</option><option value="Class 8">Class 8</option>
                        <option value="Class 9">Class 9</option><option value="Class 10">Class 10</option>
                        <option value="Class 11">Class 11</option><option value="Class 12">Class 12</option>
                        <option value="JEE">IIT-JEE prep</option>
                        <option value="NEET">NEET UG prep</option>
                        <option value="NDA">NDA exam</option>
                      </select>
                    </div>

                    {/* City Filter */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-[#1C2B22]">City</label>
                      <select
                        value={filters.city}
                        onChange={(e) => handleFilterChange('city', e.target.value)}
                        className={selectClass}
                      >
                        <option value="">All cities</option>
                        <option value="Prayagraj">Prayagraj (Allahabad)</option>
                        <option value="Varanasi">Varanasi</option>
                        <option value="Lucknow">Lucknow</option>
                        <option value="Kanpur">Kanpur</option>
                        <option value="Noida">Noida</option>
                        <option value="Agra">Agra</option>
                        <option value="Meerut">Meerut</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Gurugram">Gurugram</option>
                        <option value="Faridabad">Faridabad</option>
                        <option value="Jaipur">Jaipur</option>
                        <option value="Jodhpur">Jodhpur</option>
                        <option value="Udaipur">Udaipur</option>
                        <option value="Kota">Kota</option>
                        <option value="Patna">Patna</option>
                        <option value="Ranchi">Ranchi</option>
                        <option value="Bhopal">Bhopal</option>
                        <option value="Indore">Indore</option>
                        <option value="Nagpur">Nagpur</option>
                      </select>
                    </div>

                    {/* Teaching Mode */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-[#1C2B22]">Teaching mode</label>
                      <select
                        value={filters.teachingMode}
                        onChange={(e) => handleFilterChange('teachingMode', e.target.value)}
                        className={selectClass}
                      >
                        <option value="">All modes</option>
                        <option value="home">Home tuition (at student's home)</option>
                        <option value="online">Online tuition</option>
                        <option value="hybrid">Hybrid mode</option>
                      </select>
                    </div>

                    {/* Budget Range */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-[#1C2B22]">Budget range</label>
                      <select
                        value={filters.budgetRange}
                        onChange={(e) => handleFilterChange('budgetRange', e.target.value)}
                        className={selectClass}
                      >
                        <option value="">All budgets</option>
                        <option value="under2k">Under ₹2,000 / month</option>
                        <option value="2k-5k">₹2,000 – ₹5,000 / month</option>
                        <option value="5k-10k">₹5,000 – ₹10,000 / month</option>
                        <option value="above10k">Above ₹10,000 / month</option>
                      </select>
                    </div>

                    {/* Urgency */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-[#1C2B22]">Urgency</label>
                      <select
                        value={filters.urgency}
                        onChange={(e) => handleFilterChange('urgency', e.target.value)}
                        className={selectClass}
                      >
                        <option value="">All urgencies</option>
                        <option value="immediate">Immediate requirement</option>
                        <option value="within_week">Within a week</option>
                        <option value="flexible">Flexible timing</option>
                      </select>
                    </div>

                    {/* Board */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-[#1C2B22]">Board</label>
                      <select
                        value={filters.board}
                        onChange={(e) => handleFilterChange('board', e.target.value)}
                        className={selectClass}
                      >
                        <option value="">All educational boards</option>
                        <option value="CBSE">CBSE board</option>
                        <option value="ICSE">ICSE / ISC board</option>
                        <option value="State">UP state board</option>
                        <option value="IB">IB / international board</option>
                      </select>
                    </div>

                    {/* Sort By */}
                    <div>
                      <label className="mb-1.5 flex items-center gap-1 text-xs font-medium text-[#1C2B22]">
                        <ArrowUpDown className="h-3 w-3 text-[#D79A2C]" /> Sort by
                      </label>
                      <select
                        value={filters.sortBy}
                        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                        className={`${selectClass} font-semibold text-[#1C2B22]`}
                      >
                        <option value="newest">Newest leads first</option>
                        <option value="budget_high">Highest budget first</option>
                        <option value="quality">Highest quality score</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* LEADS GRID */}
            {loading ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-[#1C2B22]/10 bg-white py-20">
                <Loader className="mb-3 h-8 w-8 animate-spin text-[#D79A2C]" />
                <p className="text-sm text-[#58646C]">Fetching live student requirements...</p>
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="rounded-lg border border-[#1C2B22]/10 bg-white p-12 text-center">
                <Search className="mx-auto mb-3 h-10 w-10 text-[#9AA3AB]" />
                <h3 className={`${lora.className} mb-1 text-lg font-semibold text-[#1C2B22]`}>No matching student leads found</h3>
                <p className="mx-auto mb-5 max-w-md text-xs text-[#58646C]">
                  Try adjusting your search keywords, city, or filter options to explore available tutoring enquiries.
                </p>
                <button
                  onClick={clearFilters}
                  className="rounded-md bg-[#D79A2C] px-5 py-2.5 text-xs font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filteredLeads.map(({ lead, matchScore }) => (
                  <LeadCard key={lead._id} lead={lead} matchScore={matchScore} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

/* ======================================================== */
/* LEAD CARD COMPONENT */
/* ======================================================== */
const LeadCard = ({ lead, matchScore }: { lead: Lead; matchScore: number }) => {
  const isFilled = lead.availability === "already_filled";

  return (
    <div
      className={`flex flex-col justify-between overflow-hidden rounded-lg border border-[#1C2B22]/10 bg-white transition-colors hover:border-[#D79A2C]/50 ${
        isFilled ? 'opacity-70' : ''
      }`}
    >
      {/* Top Header */}
      <div className="border-b border-[#1C2B22]/[.06] p-5 pb-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold text-[#1C2B22]">{lead.subject}</h3>
            <p className="mt-0.5 text-xs font-medium text-[#58646C]">
              {lead.studentClass} {lead.board ? `· ${lead.board}` : ''}
            </p>
            {lead.schoolName && <p className="mt-0.5 truncate text-[11px] text-[#9AA3AB]">{lead.schoolName}</p>}
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            {isFilled ? (
              <span className="rounded px-2 py-0.5 text-[10px] font-semibold text-[#9AA3AB]">Filled</span>
            ) : (
              <span className="flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-semibold text-[#3f8a5f]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3f8a5f]" /> Active
              </span>
            )}
            <span className="rounded px-2 py-0.5 text-[10px] font-semibold text-[#8a5f18]">
              {matchScore}% match
            </span>
          </div>
        </div>
      </div>

      {/* Info Rows */}
      <div className="flex-1 space-y-2 p-5 text-xs">
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#9AA3AB]" />
          <span className="w-16 shrink-0 text-[#9AA3AB]">Location</span>
          <span className="truncate font-medium text-[#1C2B22]">
            {lead.location?.area ? `${lead.location.area}, ${lead.location.city}` : lead.location?.city || "Not specified"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <BookOpen className="h-3.5 w-3.5 shrink-0 text-[#9AA3AB]" />
          <span className="w-16 shrink-0 text-[#9AA3AB]">Mode</span>
          <span className="font-medium capitalize text-[#1C2B22]">{lead.teachingMode} tuition</span>
        </div>

        <div className="flex items-center gap-2">
          <DollarSign className="h-3.5 w-3.5 shrink-0 text-[#9AA3AB]" />
          <span className="w-16 shrink-0 text-[#9AA3AB]">Budget</span>
          <span className="font-semibold text-[#1C2B22]">
            ₹{lead.budget?.toLocaleString()}{" "}
            <span className="font-normal text-[#9AA3AB]">/{lead.budgetType === "per_hour" ? "hr" : "month"}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 shrink-0 text-[#9AA3AB]" />
          <span className="w-16 shrink-0 text-[#9AA3AB]">Urgency</span>
          <span className="font-medium capitalize text-[#1C2B22]">{lead.urgency?.replace("_", " ")}</span>
        </div>

        {lead.additionalRequirements && (
          <div className="truncate border-t border-[#1C2B22]/[.06] pt-2 text-[11px] italic text-[#58646C]">
            &quot;{lead.additionalRequirements}&quot;
          </div>
        )}
      </div>

      {/* Locked Contact CTA Footer */}
      <div className="p-5 pt-0">
        <div className="mb-3 rounded-md border border-[#1C2B22]/10 bg-[#F7F2E9] p-3 text-center">
          <div className="mb-1 flex items-center justify-center gap-2 text-xs font-medium text-[#58646C]">
            <User className="h-3.5 w-3.5 text-[#9AA3AB]" />
            <span className="select-none blur-[3px]">Parent name hidden</span>
            <Phone className="ml-2 h-3.5 w-3.5 text-[#9AA3AB]" />
            <span className="select-none blur-[3px]">+91 9876543210</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#9AA3AB]">
            <span>{lead.totalUnlocks}/{lead.maxUnlocks} unlocked</span>
            <span className="font-semibold text-[#8a5f18]">{lead.creditsRequired} credits</span>
          </div>
        </div>

        <Link href={isFilled ? "#" : "/tutor-flow/tutor-registration"}>
          <button
            disabled={isFilled}
            className={`flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-xs font-semibold transition-colors ${
              isFilled
                ? 'cursor-not-allowed border border-[#1C2B22]/10 text-[#9AA3AB]'
                : 'bg-[#D79A2C] text-[#17261D] hover:bg-[#c4891f]'
            }`}
          >
            <span>{isFilled ? 'Position filled' : 'Unlock parent contact details'}</span>
            {!isFilled && <ArrowRight className="h-3.5 w-3.5" />}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FindStudentsLanding;
