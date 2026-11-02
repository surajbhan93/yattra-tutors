import React from "react";
import { city } from "@/components/seoIndia/locations/up/meerut";

export const GoogleBusiness: React.FC = () => {
  const cidLinkPlaceholder = "https://www.google.com/maps?cid=11751135537078639160";
  const googleReviewLinkPlaceholder = "https://maps.app.goo.gl/UhN5ktigY6QWpPRC8";
  const mapEmbedPlaceholderUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d223368.81254040217!2d77.7938784!3d28.983290450000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60bc23a70671653d%3A0xa3146b82c30a9a38!2sYattra%20Tutors%20%E2%80%93%20Home%20Tuition%20Provider%2C%20Meerut!5e0!3m2!1sen!2sin!4v1785498283769!5m2!1sen!2sin`;

  return (
    <section className="py-16 sm:py-24 bg-[#0E211C] text-[#F7F2E9] border-b border-[#F7F2E9]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-medium text-[#D79A2C]">Verified Local Presence</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#F7F2E9]" style={{ fontFamily: "'Lora', serif" }}>
            Yattra Tutors Google Business Profile - {city.name} Center
          </h2>
          <p className="text-base sm:text-lg text-[#F7F2E9]/70">
            Visit our local educational counseling hub or contact us directly on Google Maps for verified home tutor allotments in {city.name}.
          </p>
        </div>

        {/* GBP Card Container */}
        <div className="border border-[#F7F2E9]/10 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: GBP Card Details */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 bg-[#132B22]">
            {/* GBP Header */}
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span className="text-xs font-medium text-[#F7F2E9]/55">
                    Google Business Profile
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-[#F7F2E9]" style={{ fontFamily: "'Lora', serif" }}>
                  Yattra Tutors Home Tutors {city.name}
                </h3>
                <p className="text-xs text-[#D79A2C]">Educational Institution & Home Tuition Bureau</p>
              </div>

              {/* Rating */}
              <div className="border border-[#D79A2C]/25 px-4 py-2 rounded-lg flex items-center gap-2">
                <span className="text-2xl font-semibold text-[#D79A2C]">{city.averageRating}</span>
              </div>
            </div>

            {/* Address & Hours — ledger */}
            <div className="divide-y divide-[#F7F2E9]/10 border-y border-[#F7F2E9]/10 text-sm text-[#F7F2E9]/75">
              <div className="flex items-start gap-3 py-3">
                <svg className="w-5 h-5 text-[#D79A2C] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span><strong className="text-[#F7F2E9]">Address:</strong> {city.contact.address}</span>
              </div>

              <div className="flex items-start gap-3 py-3">
                <svg className="w-5 h-5 text-[#D79A2C] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong className="text-[#F7F2E9]">Working Hours:</strong> {city.contact.workingHours}</span>
              </div>

              <div className="flex items-start gap-3 py-3">
                <svg className="w-5 h-5 text-[#D79A2C] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span><strong className="text-[#F7F2E9]">Support Phone:</strong> {city.contact.phone}</span>
              </div>
            </div>

            {/* Quick Action Links — ledger row */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold pt-2">
              <a href={cidLinkPlaceholder} target="_blank" rel="noopener noreferrer" className="text-[#F7F2E9]/80 hover:text-[#D79A2C] transition-colors">
                Directions
              </a>
              <a href={`tel:${city.contact.phone}`} className="text-[#F7F2E9]/80 hover:text-[#D79A2C] transition-colors">
                Call Now
              </a>
              <a href="https://yattratutors.com" target="_blank" rel="noopener noreferrer" className="text-[#F7F2E9]/80 hover:text-[#D79A2C] transition-colors">
                Website
              </a>
              <a href={googleReviewLinkPlaceholder} target="_blank" rel="noopener noreferrer" className="text-[#F7F2E9]/80 hover:text-[#D79A2C] transition-colors">
                Write Review
              </a>
            </div>

            {/* CID & Map Notes */}
            <div className="pt-2 text-[11px] text-[#F7F2E9]/40 flex items-center justify-between border-t border-[#F7F2E9]/10">
              <span>Google CID: 11751135537078639160</span>
              <a href={cidLinkPlaceholder} target="_blank" rel="noopener noreferrer" className="text-[#D79A2C] hover:underline">
                View on Google Maps →
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Embed */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-[#0E211C] border-t lg:border-t-0 lg:border-l border-[#F7F2E9]/10">
            <iframe
              src={mapEmbedPlaceholderUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "350px" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Yattra Tutors Google Map Embed ${city.name}`}
              className="w-full h-full object-cover filter grayscale contrast-125 opacity-85 hover:opacity-100 transition-opacity"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-[#132B22]/95 border border-[#F7F2E9]/10 p-3 rounded-lg flex items-center justify-between text-xs">
              <span className="text-[#F7F2E9]/75 font-medium">Serving all {city.name} PIN codes</span>
              <a href={cidLinkPlaceholder} target="_blank" rel="noopener noreferrer" className="text-[#D79A2C] font-semibold hover:underline">
                Open Full Map
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleBusiness;
