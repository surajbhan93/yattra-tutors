import React, { useState } from "react";
import { city } from "@/components/seoIndia/locations/up/meerut";

export const ServiceAreas: React.FC = () => {
  // Search filter for fast user navigation across Meerut's 25+ localities
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLocations = city.locations.filter((loc) =>
    loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (loc.pincode && loc.pincode.includes(searchTerm)) ||
    loc.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="service-areas" className="py-16 sm:py-24 bg-[#132B22] text-[#F7F2E9] border-b border-[#F7F2E9]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-medium text-[#D79A2C]">Hyper-Local Coverage</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#F7F2E9]" style={{ fontFamily: "'Lora', serif" }}>
            Areas We Serve: Home Tutor in {city.name} Localities
          </h2>
          <p className="text-base sm:text-lg text-[#F7F2E9]/70">
            Yattra Tutors deploys background-verified home tutors across all <strong className="text-[#F7F2E9]">{city.locations.length}+ key residential sectors and localities in {city.name}</strong>. Find an expert tutor near your home in under 2 hours.
          </p>

          {/* Search Filter Bar */}
          <div className="pt-4 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search locality in ${city.name} (e.g. Shastri Nagar, Saket, 250004)...`}
                className="w-full bg-[#0E211C] border border-[#F7F2E9]/15 rounded-md py-3 pl-11 pr-4 text-sm text-[#F7F2E9] focus:outline-none focus:border-[#D79A2C] focus:ring-1 focus:ring-[#D79A2C]"
                aria-label={`Search localities in ${city.name}`}
              />
              <svg className="w-5 h-5 text-[#F7F2E9]/40 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchTerm && (
              <p className="text-xs text-[#F7F2E9]/50 mt-2 text-left">
                Showing {filteredLocations.length} of {city.locations.length} localities matching &ldquo;{searchTerm}&rdquo;
              </p>
            )}
          </div>
        </div>

        {/* Dynamic Locality Ledger looping over city.locations */}
        <div className="divide-y divide-[#F7F2E9]/10 border-y border-[#F7F2E9]/10">
          {filteredLocations.map((location) => (
            <article
              key={`loc-card-${location.slug}`}
              className="py-6 grid grid-cols-1 lg:grid-cols-[2fr_3fr_auto] gap-4 items-start"
            >
              <div>
                <span className="text-[11px] font-medium text-[#D79A2C] block mb-1">
                  {city.name}, {city.state}{location.pincode ? ` · PIN ${location.pincode}` : ""}
                </span>
                <h3 className="text-lg font-semibold text-[#F7F2E9]">
                  Home Tutor in {location.name}
                </h3>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-[#F7F2E9]/70 leading-relaxed">
                  {location.description}
                </p>

                {location.popularSubjects && location.popularSubjects.length > 0 && (
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#F7F2E9]/45">
                    <span className="text-[#F7F2E9]/55">Popular tutors:</span>
                    {location.popularSubjects.map((sub, sIdx) => (
                      <span key={`sub-tag-${location.slug}-${sIdx}`}>
                        {sub}{sIdx < location.popularSubjects.length - 1 ? " ·" : ""}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 lg:flex-col lg:items-end lg:gap-2 shrink-0">
                <span className="text-xs text-[#F7F2E9]/45">Tutors Available</span>
                <a
                  href="#book-tutor-form"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#D79A2C] hover:text-[#e8ad42] transition-colors"
                  aria-label={`Find Home Tutor in ${location.name}, ${city.name}`}
                >
                  Find Tutor
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Fallback if no matching search result */}
        {filteredLocations.length === 0 && (
          <div className="text-center py-12 border border-[#F7F2E9]/10 rounded-xl p-8 space-y-4">
            <p className="text-base text-[#F7F2E9]/70">
              No specific locality found matching &ldquo;{searchTerm}&rdquo;. However, Yattra Tutors provides home tutors across all neighborhoods of {city.name}.
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="px-4 py-2 text-xs font-semibold text-[#0E211C] bg-[#D79A2C] rounded-md hover:bg-[#c4891f] transition-colors"
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
