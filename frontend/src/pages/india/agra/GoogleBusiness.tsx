import React from "react";
import { lora, dmSans } from "@/lib/fonts";
import { city } from "@/components/seoIndia/locations/up/agra";

export const GoogleBusiness: React.FC = () => {
  const cidLinkPlaceholder = "https://maps.google.com/?cid=6363453870_yattratutors_agra";
  const googleReviewLinkPlaceholder = "https://g.page/r/yattratutors-agra/review";
  const mapEmbedPlaceholderUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113524.321876!2d78.00807!3d27.17667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397477614497e69b%3A0x125d81b43d5e27a6!2sAgra%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin`;

  return (
    <section className={`py-16 sm:py-24 bg-[#0E211C] text-[#F7F2E9] border-b border-[#2B4038] ${dmSans.className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs sm:text-sm font-bold italic text-[#D79A2C]">
            Verified Local Presence
          </span>
          <h2 className={`text-3xl sm:text-4xl font-semibold text-[#F7F2E9] ${lora.className}`}>
            Yattra Tutors Google Business Profile - {city.name} Center
          </h2>
          <p className="text-base sm:text-lg text-[#AAB6A2]">
            Visit our local educational counseling hub or contact us directly on Google Maps for verified home tutor allotments in {city.name}.
          </p>
        </div>

        {/* GBP Card Container */}
        <div className="bg-[#132B22] border border-[#2B4038] rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: GBP Card Details */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
            {/* GBP Header */}
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span className="text-xs font-bold text-[#AAB6A2] uppercase tracking-widest">
                    Google Business Profile
                  </span>
                </div>
                <h3 className={`text-2xl sm:text-3xl font-semibold text-[#F7F2E9] ${lora.className}`}>
                  Yattra Tutors Home Tutors {city.name}
                </h3>
                <p className="text-xs text-[#D79A2C] font-medium">Educational Institution & Home Tuition Bureau</p>
              </div>

              {/* Rating Pill */}
              <div className="bg-[#0E211C] border border-[#D79A2C]/30 px-4 py-2 rounded-2xl flex items-center gap-2">
                <span className="text-2xl font-black text-[#D79A2C]">{city.averageRating}</span>
                <div>
                  <div className="flex text-[#D79A2C] text-sm">★★★★★</div>
                  <span className="text-[11px] text-[#9AA3AB] font-semibold">{city.totalReviews.toLocaleString()} Google Reviews</span>
                </div>
              </div>
            </div>

            {/* Address & Hours Information */}
            <div className="space-y-3 pt-2 text-sm text-[#AAB6A2]">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#D79A2C] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span><strong>Address:</strong> {city.contact.address}</span>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#D79A2C] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>Working Hours:</strong> {city.contact.workingHours}</span>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#D79A2C] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span><strong>Support Phone:</strong> {city.contact.phone}</span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              <a
                href={cidLinkPlaceholder}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#0E211C] border border-[#2B4038] hover:border-[#D79A2C]/40 transition-colors text-center"
              >
                <svg className="w-5 h-5 text-[#D79A2C] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span className="text-xs font-bold text-[#F7F2E9]">Directions</span>
              </a>

              <a
                href={`tel:${city.contact.phone}`}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#0E211C] border border-[#2B4038] hover:border-[#D79A2C]/40 transition-colors text-center"
              >
                <svg className="w-5 h-5 text-[#D79A2C] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-xs font-bold text-[#F7F2E9]">Call Now</span>
              </a>

              <a
                href="https://yattratutors.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#0E211C] border border-[#2B4038] hover:border-[#D79A2C]/40 transition-colors text-center"
              >
                <svg className="w-5 h-5 text-[#D79A2C] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span className="text-xs font-bold text-[#F7F2E9]">Website</span>
              </a>

              <a
                href={googleReviewLinkPlaceholder}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#0E211C] border border-[#2B4038] hover:border-[#D79A2C]/40 transition-colors text-center"
              >
                <svg className="w-5 h-5 text-[#D79A2C] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span className="text-xs font-bold text-[#F7F2E9]">Write Review</span>
              </a>
            </div>

            {/* CID & Map Placeholder Notes */}
            <div className="pt-2 text-[11px] text-[#9AA3AB] flex items-center justify-between border-t border-[#2B4038]">
              <span>Google CID: 9876543210_yattratutors_agra</span>
              <a href={cidLinkPlaceholder} target="_blank" rel="noopener noreferrer" className="text-[#D79A2C] hover:underline">
                View on Google Maps →
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Embed Placeholder */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-[#0E211C] border-t lg:border-t-0 lg:border-l border-[#2B4038]">
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
            <div className="absolute bottom-4 left-4 right-4 bg-[#132B22] border border-[#2B4038] p-3 rounded-xl flex items-center justify-between text-xs">
              <span className="text-[#AAB6A2] font-medium">📍 Serving all {city.name} PIN codes</span>
              <a href={cidLinkPlaceholder} target="_blank" rel="noopener noreferrer" className="text-[#D79A2C] font-bold hover:underline">
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
