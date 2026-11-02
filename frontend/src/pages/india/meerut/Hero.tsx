import React, { useState } from "react";
import { useRouter } from "next/router";
import { city } from "@/components/seoIndia/locations/up/meerut";
import apiClient from "@/lib/apiClient";

const grainStyle: React.CSSProperties = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
};

export const Hero: React.FC = () => {
  const router = useRouter();

  // Extract top 4 localities dynamically to feature in hero text snippet
  const topLocalities = city.locations.slice(0, 5).map((l) => l.name).join(", ");

  // Full signup form state — matches /auth/parent/signup schema exactly
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [locality, setLocality] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password || !locality || !phone) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const localityName =
        city.locations.find((l) => l.slug === locality)?.name || locality;

      // Payload shape matches the "form" object used in CreateAccount.tsx
      const form = {
        fullName,
        email,
        password,
        phone,
        location: {
          city: city.name,
          area: localityName,
          coordinates: {
            type: "Point",
            coordinates: [78.9629, 20.5937],
          },
        },
      };

      const res = await apiClient.post("/auth/parent/signup", form);

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }

      setStatus("success");

      // Redirect to the next onboarding step after successful signup
      router.push("/find-tutor-flow/preferences");
    } catch (err: any) {
      const backendMessage =
        err.response?.data?.error || err.response?.data?.message;
      setErrorMessage(
        backendMessage ||
          "This email is already registered. Please login instead."
      );
      setStatus("error");
    }
  };

  return (
    <header className="relative overflow-hidden bg-[#0E211C] text-[#F7F2E9] pt-12 pb-16 lg:pt-20 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" style={grainStyle} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-xs sm:text-sm text-[#F7F2E9]/50">
            <li>
              <a href="/" className="hover:text-[#D79A2C] transition-colors">
                Home
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <span>/</span>
              <a href="/india" className="hover:text-[#D79A2C] transition-colors">
                India
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <span>/</span>
              <span className="text-[#D79A2C] font-medium" aria-current="page">
                {city.name}
              </span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Eyebrow */}
            <div className="inline-flex items-center gap-2 text-sm font-medium text-[#D79A2C]">
              #1 Home Tutor Network in {city.name}, {city.state}
            </div>

            {/* Main H1 Title */}
            <h1
              className="hero-title text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F7F2E9] leading-tight"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Home Tutor in {city.name}
            </h1>

            {/* H2 Subtitle */}
            <h2 className="text-xl sm:text-2xl font-medium text-[#F7F2E9]/85">
              Looking for the Best Home Tutor in {city.name}?
            </h2>

            {/* AEO / GEO Paragraph introducing dynamic localities */}
            <p className="speakable-intro text-base sm:text-lg text-[#F7F2E9]/70 leading-relaxed">
              Yattra Tutors helps students connect with verified and experienced home tutors across every major locality of {city.name} including <strong className="text-[#F7F2E9] font-medium">{topLocalities}</strong>, and over {city.locations.length}+ neighborhood zones. Whether you need a private tutor for CBSE Class 10 Board exams, ICSE, UP Board, Class 11-12 PCM/PCB, or NEET/JEE preparation, our 100% background-verified teachers provide customized 1-on-1 home tuition at your residence.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#book-tutor-form"
                className="inline-flex justify-center items-center px-7 py-4 rounded-md text-base font-semibold text-[#0E211C] bg-[#D79A2C] hover:bg-[#c4891f] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D79A2C] focus:ring-offset-2 focus:ring-offset-[#0E211C]"
                aria-label={`Find Tutor in ${city.name}`}
              >
                Find Tutor Now
              </a>

              <a
                href={`tel:${city.contact.phone}`}
                className="inline-flex justify-center items-center gap-2.5 px-7 py-4 rounded-md text-base font-semibold text-[#F7F2E9] border border-[#F7F2E9]/20 hover:bg-[#132B22] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D79A2C]"
                aria-label={`Call Yattra Tutors support at ${city.contact.phone}`}
              >
                <svg className="w-5 h-5 text-[#D79A2C] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.12.45 2.33.69 3.58.69.55 0 1 .45 1 1V20a1 1 0 01-1 1C10.5 21 3 13.5 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.24 2.46.69 3.57.11.35.03.74-.27 1.02l-2.3 2.2z" />
                </svg>
                Call Now: {city.contact.phone}
              </a>
            </div>

            {/* Key Trust Markers — ledger row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#F7F2E9]/10">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#D79A2C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs sm:text-sm font-medium text-[#F7F2E9]/80">100% Verified Tutors</span>
              </div>

              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#D79A2C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs sm:text-sm font-medium text-[#F7F2E9]/80">Free 1-on-1 Demo</span>
              </div>

              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#D79A2C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-xs sm:text-sm font-medium text-[#F7F2E9]/80">Background Verified</span>
              </div>

              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#D79A2C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="text-xs sm:text-sm font-medium text-[#F7F2E9]/80">12,000+ Active Tutors</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Card & Fast Inquiry Form */}
          <div className="lg:col-span-5">
            <div id="book-tutor-form" className="bg-[#132B22] border border-[#F7F2E9]/10 rounded-xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between border-b border-[#F7F2E9]/10 pb-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#F7F2E9]">Create Your Account</h3>
                  <p className="text-xs text-[#F7F2E9]/55">Sign up to get matched with top home tutors</p>
                </div>
                <span className="text-xs font-medium text-[#D79A2C]">
                  Instant Response
                </span>
              </div>

              {/* Functional Signup Form — /auth/parent/signup submission */}
              {status === "success" ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#0E211C] text-[#D79A2C] flex items-center justify-center border border-[#D79A2C]/30">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-[#F7F2E9]">Account Created!</h4>
                  <p className="text-xs sm:text-sm text-[#F7F2E9]/70 leading-relaxed">
                    Thank you! Our academic counselor in <strong>{city.name}</strong> will contact you at <span className="text-[#D79A2C] font-semibold">{phone}</span> shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setFullName("");
                      setEmail("");
                      setPassword("");
                      setLocality("");
                      setPhone("");
                    }}
                    className="mt-2 text-xs font-semibold text-[#D79A2C] hover:text-[#e8ad42] underline"
                  >
                    Create another account
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 rounded-md bg-[#0E211C] border border-[#D79A2C]/30 text-[#D79A2C] text-xs font-medium">
                      {errorMessage}
                    </div>
                  )}

                  <div>
                    <label htmlFor="full-name" className="block text-xs font-medium text-[#F7F2E9]/70 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="full-name"
                      name="full-name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      required
                      className="w-full bg-[#0E211C] border border-[#F7F2E9]/15 rounded-md px-3.5 py-2.5 text-sm text-[#F7F2E9] focus:outline-none focus:border-[#D79A2C] focus:ring-1 focus:ring-[#D79A2C]"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-[#F7F2E9]/70 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full bg-[#0E211C] border border-[#F7F2E9]/15 rounded-md px-3.5 py-2.5 text-sm text-[#F7F2E9] focus:outline-none focus:border-[#D79A2C] focus:ring-1 focus:ring-[#D79A2C]"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-xs font-medium text-[#F7F2E9]/70 mb-1.5">
                      Password *
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a strong password"
                      required
                      className="w-full bg-[#0E211C] border border-[#F7F2E9]/15 rounded-md px-3.5 py-2.5 text-sm text-[#F7F2E9] focus:outline-none focus:border-[#D79A2C] focus:ring-1 focus:ring-[#D79A2C]"
                    />
                  </div>

                  <div>
                    <label htmlFor="student-locality" className="block text-xs font-medium text-[#F7F2E9]/70 mb-1.5">
                      Locality in {city.name} *
                    </label>
                    <select
                      id="student-locality"
                      name="student-locality"
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      required
                      className="w-full bg-[#0E211C] border border-[#F7F2E9]/15 rounded-md px-3.5 py-2.5 text-sm text-[#F7F2E9] focus:outline-none focus:border-[#D79A2C] focus:ring-1 focus:ring-[#D79A2C]"
                    >
                      <option value="">Select your area in {city.name}</option>
                      {city.locations.map((loc) => (
                        <option key={`hero-select-${loc.slug}`} value={loc.slug}>
                          {loc.name} {loc.pincode ? `(${loc.pincode})` : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="parent-phone" className="block text-xs font-medium text-[#F7F2E9]/70 mb-1.5">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      id="parent-phone"
                      name="parent-phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter 10-digit mobile number"
                      required
                      className="w-full bg-[#0E211C] border border-[#F7F2E9]/15 rounded-md px-3.5 py-2.5 text-sm text-[#F7F2E9] focus:outline-none focus:border-[#D79A2C] focus:ring-1 focus:ring-[#D79A2C]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-3.5 px-4 rounded-md font-semibold text-[#0E211C] bg-[#D79A2C] hover:bg-[#c4891f] transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === "submitting" ? (
                      <>
                        <svg className="animate-spin w-4 h-4 text-[#0E211C]" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      "Create Account →"
                    )}
                  </button>
                </form>
              )}

              {/* Trust Strip */}
              <div className="mt-4 pt-4 border-t border-[#F7F2E9]/10 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=150&q=80"
                  alt={`Verified Home Tutor teaching student in ${city.name}`}
                  title={`Yattra Tutors Certified Home Tutor in ${city.name}`}
                  loading="lazy"
                  width="48"
                  height="48"
                  className="w-12 h-12 rounded-full object-cover border border-[#D79A2C]/40"
                />
                <div className="text-xs text-[#F7F2E9]/75">
                  <p className="font-medium text-[#F7F2E9]">Trusted by over 48,500+ parents</p>
                  <p className="text-[#F7F2E9]/50">4.9 ★★★★★ rating across {city.name} school boards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
