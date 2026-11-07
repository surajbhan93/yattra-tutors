import Head from "next/head";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/landing/Footer";
import { Cookie, Shield, BarChart3, Settings, Target, Calendar } from "lucide-react";
import { lora, dmSans } from "@/lib/fonts";
import { PolicyHero, PolicyPageWrapper } from "@/components/common/PolicyLayout";

const COOKIE_TYPES = [
  { icon: Shield, title: "Necessary cookies", status: "Always active", desc: "These cookies are essential for the website to function properly. They enable basic features like page navigation, access to secure areas, and authentication.", examples: ["Session authentication cookies", "Security and fraud prevention", "Load balancing and performance"] },
  { icon: BarChart3, title: "Analytics cookies", status: "Optional — requires consent", desc: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.", examples: ["Google Analytics — page views, session duration", "Heatmap tracking — user behavior analysis", "Performance monitoring"] },
  { icon: Settings, title: "Functional cookies", status: "Optional — requires consent", desc: "These cookies enable enhanced functionality and personalization, such as remembering your preferences, language settings, and providing personalized content.", examples: ["Language and region preferences", "User interface customization", "Video player settings"] },
  { icon: Target, title: "Advertising cookies", status: "Optional — requires consent", desc: "These cookies are used to deliver advertisements that are relevant to you and your interests, and to measure campaign effectiveness.", examples: ["Targeted advertising and remarketing", "Ad performance measurement", "Third-party advertising platforms"] },
];

export default function CookiePolicyPage() {
  return (
    <>
      <Head>
        <title>Cookie Policy | Yattra Tutors - How We Use Cookies</title>
        <meta name="description" content="Learn about how Yattra Tutors uses cookies to improve your experience and protect your privacy." />
      </Head>

      <NavBar />

      <PolicyPageWrapper>
        <PolicyHero
          icon={Cookie}
          title="Cookie policy"
          subtitle="How Yattra Tutors uses cookies to enhance your experience."
          lastUpdated
        />

        <div className={`max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20 space-y-10 ${dmSans.className}`}>
          {/* INTRO */}
          <section className="rounded-lg border border-[#1C2B22]/10 bg-white p-7">
            <h2 className={`${lora.className} text-xl font-semibold text-[#1C2B22] mb-3`}>What are cookies?</h2>
            <p className="text-sm text-[#58646C] leading-relaxed mb-3">
              Cookies are small text files that are placed on your device when you visit our website.
              They help us provide you with a better experience by remembering your preferences,
              understanding how you use our site, and enabling certain features.
            </p>
            <p className="text-sm text-[#58646C] leading-relaxed">
              We use cookies and similar technologies (like web beacons, pixels, and local storage) to
              enhance your browsing experience, analyze site traffic, personalize content, and deliver
              relevant advertising.
            </p>
          </section>

          {/* TYPES */}
          <section>
            <h2 className={`${lora.className} text-xl font-semibold text-[#1C2B22] mb-5`}>Types of cookies we use</h2>
            <div className="rounded-lg border border-[#1C2B22]/10 bg-white divide-y divide-[#1C2B22]/10">
              {COOKIE_TYPES.map((c) => (
                <div key={c.title} className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <c.icon size={18} className="text-[#D79A2C]" />
                    <div>
                      <h3 className="text-sm font-semibold text-[#1C2B22]">{c.title}</h3>
                      <span className="text-xs text-[#9AA3AB]">{c.status}</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#58646C] leading-relaxed mb-3">{c.desc}</p>
                  <div className="rounded-md bg-[#F7F2E9] p-3">
                    <p className="text-xs font-medium text-[#1C2B22] mb-1">Examples:</p>
                    <ul className="list-disc list-inside text-xs text-[#58646C] space-y-1">
                      {c.examples.map((e) => <li key={e}>{e}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* DURATION */}
          <section className="rounded-lg border border-[#1C2B22]/10 bg-white p-7">
            <div className="flex items-center gap-3 mb-3">
              <Calendar size={18} className="text-[#D79A2C]" />
              <h2 className={`${lora.className} text-xl font-semibold text-[#1C2B22]`}>How long do cookies last?</h2>
            </div>
            <p className="text-sm text-[#58646C] leading-relaxed mb-2">
              <strong className="text-[#1C2B22]">Session cookies:</strong> these are temporary cookies that expire when you close your browser.
            </p>
            <p className="text-sm text-[#58646C] leading-relaxed">
              <strong className="text-[#1C2B22]">Persistent cookies:</strong> these cookies remain on your device for a set period or until you delete them.
            </p>
          </section>

          {/* MANAGING */}
          <section className="rounded-lg border border-[#D79A2C]/20 bg-[#D79A2C]/[.05] p-7">
            <h2 className={`${lora.className} text-xl font-semibold text-[#1C2B22] mb-3`}>Managing your cookie preferences</h2>
            <p className="text-sm text-[#58646C] mb-3">You have full control over your cookie preferences. You can:</p>
            <ul className="list-disc list-inside text-sm text-[#58646C] space-y-1.5 ml-2">
              <li>Accept or reject cookies through our cookie consent banner</li>
              <li>Customize your preferences for different cookie categories</li>
              <li>Change your settings at any time through your browser</li>
              <li>Delete cookies that have already been set</li>
            </ul>
            <p className="mt-3 text-sm text-[#58646C]">Blocking certain cookies may impact your experience and some features may not function properly.</p>
          </section>

          {/* THIRD PARTY */}
          <section className="rounded-lg border border-[#1C2B22]/10 bg-white p-7">
            <h2 className={`${lora.className} text-xl font-semibold text-[#1C2B22] mb-3`}>Third-party cookies</h2>
            <p className="text-sm text-[#58646C] leading-relaxed mb-3">
              We work with trusted third-party service providers who may also set cookies on your
              device when you visit our website. These may include:
            </p>
            <ul className="list-disc list-inside text-sm text-[#58646C] space-y-1.5 ml-2">
              <li>Google Analytics (website analytics)</li>
              <li>Google Tag Manager (tag management)</li>
              <li>Meta Pixel (advertising and analytics)</li>
              <li>Microsoft Clarity (user behavior analytics)</li>
            </ul>
          </section>

          {/* UPDATES */}
          <section className="rounded-lg border border-[#1C2B22]/10 bg-white p-7">
            <h2 className={`${lora.className} text-xl font-semibold text-[#1C2B22] mb-3`}>Updates to this policy</h2>
            <p className="text-sm text-[#58646C] leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in our practices
              or for legal, regulatory, or operational reasons.
            </p>
          </section>

          {/* CONTACT */}
          <section className="rounded-lg bg-[#0E211C] p-8 text-center">
            <h2 className={`${lora.className} text-xl font-semibold text-[#F7F2E9] mb-3`}>Questions about our cookie policy?</h2>
            <p className="text-sm text-[#AAB6A2] mb-6">If you have any questions about how we use cookies, please contact us.</p>
            <a
              href="/contact"
              className="inline-block rounded-md bg-[#D79A2C] px-6 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
            >
              Contact us
            </a>
          </section>
        </div>
      </PolicyPageWrapper>

      <Footer />
    </>
  );
}
