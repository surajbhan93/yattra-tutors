import React, { useState, useMemo } from "react";
import { lora, dmSans } from "@/lib/fonts";
import { city } from "@/components/seoIndia/locations/up/agra";

export const ServiceAreas: React.FC = () => {
  // Search filter state
  const [searchTerm, setSearchTerm] = useState("");

  // Transform raw locations array safely
  const formattedLocations = useMemo(() => {
    return city.locations.map((loc) => {
      const name = typeof loc === "string" ? loc : (loc as any).name;
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return {
        name,
        slug,
        description: `Top residential locality in ${city.name} with high demand for verified 1-on-1 home tutors for CBSE, ICSE, and UP Board.`,
        popularSubjects: ["Mathematics", "Science", "Physics", "Chemistry", "English"],
      };
    });
  }, []);

  // Memoized search filtering for 60fps rendering
  const filteredLocations = useMemo(() => {
    if (!searchTerm.trim()) return formattedLocations;
    const term = searchTerm.toLowerCase().trim();
    return formattedLocations.filter(
      (loc) =>
        loc.name.toLowerCase().includes(term) ||
        loc.description.toLowerCase().includes(term)
    );
  }, [searchTerm, formattedLocations]);

  return (
    <section id="service-areas" className={`py-16 sm:py-24 bg-[#15302A] text-[#F7F2E9] border-b border-[#2B4038] ${dmSans.className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs sm:text-sm font-bold italic text-[#D79A2C]">
            Hyper-Local Coverage
          </span>
          <h2 className={`text-3xl sm:text-4xl font-semibold text-[#F7F2E9] ${lora.className}`}>
            Areas We Serve: Home Tutor in {city.name} Localities
          </h2>
          <p className="text-base sm:text-lg text-[#AAB6A2]">
            Yattra Tutors deploys background-verified home tutors across all <strong className="text-[#F7F2E9]">{city.locations.length}+ key residential, educational, and commercial areas in {city.name}</strong>. Find an expert tutor near your home in under 2 hours.
          </p>

          {/* Search Filter Bar */}
          <div className="pt-4 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Instant search locality in ${city.name} (e.g. Kamla Nagar, Dayalbagh)...`}
                className="w-full bg-[#0E211C] border border-[#2B4038] rounded-xl py-3.5 pl-11 pr-4 text-sm text-[#F7F2E9] placeholder-[#9AA3AB] focus:outline-none focus:border-[#D79A2C] focus:ring-1 focus:ring-[#D79A2C] transition-colors shadow-inner"
                aria-label={`Search localities in ${city.name}`}
              />
              <svg className="w-5 h-5 text-[#9AA3AB] absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchTerm && (
              <p className="text-xs text-[#9AA3AB] mt-2 text-left">
                Showing {filteredLocations.length} of {city.locations.length} localities matching "{searchTerm}"
              </p>
            )}
          </div>
        </div>

        {/* Dynamic Locality Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map((location) => (
            <article
              key={`loc-card-agra-${location.slug}`}
              className="bg-[#0E211C] border border-[#2B4038] rounded-2xl p-6 flex flex-col justify-between hover:border-[#D79A2C]/40 transition-colors duration-200 group"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-[#D79A2C] uppercase tracking-wider block mb-1">
                      {city.name}, {city.state}
                    </span>
                    <h3 className={`text-xl font-semibold text-[#F7F2E9] group-hover:text-[#D79A2C] transition-colors ${lora.className}`}>
                      Home Tutor in {location.name}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#AAB6A2] leading-relaxed">
                  {location.description}
                </p>

                {/* Popular Subjects */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-semibold text-[#9AA3AB] block">Popular Tutors:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {location.popularSubjects.map((sub, sIdx) => (
                      <span
                        key={`sub-tag-agra-${location.slug}-${sIdx}`}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#D79A2C]/10 text-[#D79A2C] border border-[#D79A2C]/20"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button & Availability */}
              <div className="pt-6 mt-6 border-t border-[#2B4038] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#D79A2C]" />
                  <span className="text-xs text-[#9AA3AB]">Tutors Available</span>
                </div>

                <a
                  href="#book-tutor-form"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#D79A2C] hover:text-[#c4891f] transition-colors"
                  aria-label={`Find Home Tutor in ${location.name}, ${city.name}`}
                >
                  Find Tutor in {location.name}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Fallback */}
        {filteredLocations.length === 0 && (
          <div className="text-center py-12 bg-[#0E211C] border border-[#2B4038] rounded-2xl p-8 space-y-4">
            <p className="text-base text-[#AAB6A2]">
              No specific locality found matching "{searchTerm}". However, Yattra Tutors provides home tutors across all neighborhoods of {city.name}.
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="px-4 py-2 text-xs font-bold text-[#17261D] bg-[#D79A2C] rounded-lg hover:bg-[#c4891f]"
            >
              Reset Locality Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceAreas;
