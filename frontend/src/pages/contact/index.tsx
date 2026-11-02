import { useState, useEffect } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { Lora, DM_Sans } from "next/font/google";
import FloatingChatButton from "@/components/common/FloatingChatButton";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  CheckCircle2,
  XCircle,
  User,
  MessageSquare,
  ArrowUpRight,
  Clock,
  Shield,
  HeadphonesIcon,
} from "lucide-react";
import toast from "react-hot-toast";

import apiClient from "@/lib/apiClient";
import Footer from "@/components/landing/Footer";
import NavBar from "@/components/navbar/NavBar";
import ContactSupportBar from "@/components/common/ContactSupportBar";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"], style: ["italic", "normal"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

type ContactForm = { name: string; email: string; phone: string; message: string };

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Yattra Tutors – Premier Home Tutor Provider in India",
  description:
    "Contact Yattra Tutors, India's premier home tutor provider. We connect students and parents with verified home tutors across India for all classes and subjects.",
  url: "https://yattratutors.com/contact",
  publisher: {
    "@type": "Organization",
    name: "Yattra Tutors",
    url: "https://yattratutors.com",
    logo: { "@type": "ImageObject", url: "https://yattratutors.com/logo.png" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-6363453870",
      contactType: "customer support",
      email: "yattratutorial@gmail.com",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    address: { "@type": "PostalAddress", addressCountry: "IN" },
  },
};

/* ====================== INPUT FIELD ====================== */
function FieldInput({
  icon: Icon,
  label,
  fieldId,
  ...props
}: { icon: any; label: string; fieldId: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={fieldId} className="block text-xs font-medium text-[#58646C] mb-1.5">
        {label}
      </label>
      <div className="relative">
        <Icon size={14} aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AA3AB]" />
        <input
          id={fieldId}
          {...props}
          className="w-full pl-10 pr-4 py-3 text-sm rounded-md border border-[#1C2B22]/15 text-[#1C2B22] placeholder:text-[#9AA3AB] outline-none transition-colors focus:border-[#D79A2C]"
        />
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, children }: { icon: any; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3.5">
      <div className="w-9 h-9 rounded-md flex items-center justify-center shrink-0 bg-[#D79A2C]/10 border border-[#D79A2C]/20">
        <Icon size={14} className="text-[#D79A2C]" aria-hidden="true" />
      </div>
      <div>
        <p className="text-xs text-[#7C9484] mb-0.5">{label}</p>
        <p className="text-sm font-medium text-[#F7F2E9]">{children}</p>
      </div>
    </div>
  );
}

function TrustBadge({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={14} className="text-[#D79A2C]" aria-hidden="true" />
      <span className="text-xs text-[#9AA3AB]">{text}</span>
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (!formSubmitted) return;
    const timer = setTimeout(() => setFormSubmitted(false), 15000);
    return () => clearTimeout(timer);
  }, [formSubmitted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await apiClient.post("/contact", form);
      setFormSubmitted(true);
      toast.custom(
        (t) => (
          <div
            className={`${t.visible ? "animate-enter" : "animate-leave"} max-w-md w-full rounded-lg pointer-events-auto overflow-hidden border border-emerald-200 bg-white shadow-lg`}
          >
            <div className="flex items-start gap-3 p-4">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-[#1C2B22]">Message delivered</p>
                <p className="mt-0.5 text-xs text-[#58646C]">Our team will contact you shortly.</p>
              </div>
            </div>
          </div>
        ),
        { duration: 4000 }
      );
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.custom(
        (t) => (
          <div
            className={`${t.visible ? "animate-enter" : "animate-leave"} max-w-md w-full rounded-lg pointer-events-auto overflow-hidden border border-red-200 bg-white shadow-lg`}
          >
            <div className="flex items-start gap-3 p-4">
              <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-[#1C2B22]">Message not sent</p>
                <p className="mt-0.5 text-xs text-[#58646C]">Please try again in a moment.</p>
              </div>
            </div>
          </div>
        ),
        { duration: 4000 }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Yattra Tutors | Premier Home Tutor Provider in India</title>
        <meta
          name="description"
          content="Get in touch with Yattra Tutors — India's premier home tutor provider. Contact us for verified home tutor enquiries, 1-on-1 private tuition, student support, or partnerships. We reply within 2 hours."
        />
        <meta
          name="keywords"
          content="contact yattra tutors, tutor near me, hire tutor India, online tutor support, tuition enquiry, best tutor platform India, home tutor contact"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Yattra Tutors" />
        <link rel="canonical" href="https://yattratutors.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Yattra Tutors" />
        <meta property="og:title" content="Contact Yattra Tutors | Premier Home Tutor Provider in India" />
        <meta
          property="og:description"
          content="Reach out to Yattra Tutors — India's premier home tutor provider connecting students with verified educators for personalized 1-on-1 home tuition."
        />
        <meta property="og:url" content="https://yattratutors.com/contact" />
        <meta property="og:image" content="https://yattratutors.com/og-contact.png" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Yattra Tutors | Find Verified Tutors in India" />
        <meta
          name="twitter:description"
          content="Get in touch with Yattra Tutors for tutor enquiries, student support, or partnerships. We reply within 2 hours."
        />
        <meta name="twitter:image" content="https://yattratutors.com/og-contact.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <NavBar />
      <ContactSupportBar hidden={formSubmitted} />

      <main className={`relative w-full overflow-x-hidden bg-[#0E211C] ${dmSans.className}`} aria-label="Contact Yattra Tutors">
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-[.04]">
          <filter id="contactGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#contactGrain)" />
        </svg>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          {/* HERO */}
          <header className="text-center mb-14">
            <p className={`${lora.className} italic text-sm text-[#D79A2C] mb-4`}>Support & enquiries</p>

            <h1 className={`${lora.className} text-3xl sm:text-4xl md:text-5xl font-semibold text-[#F7F2E9] leading-[1.15] mb-4`}>
              Contact Yattra Tutors
            </h1>

            <p className="mt-3 text-sm sm:text-base text-[#AAB6A2] max-w-lg mx-auto leading-relaxed">
              Looking for a <strong className="text-[#F7F2E9]">verified tutor in India</strong>? Have a
              question about our platform? We&apos;d love to hear from you.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-5 mt-7">
              <TrustBadge icon={Clock} text="Replies within 2 hours" />
              <span className="w-px h-4 bg-[#F7F2E9]/10" aria-hidden="true" />
              <TrustBadge icon={Shield} text="100% verified tutors" />
              <span className="w-px h-4 bg-[#F7F2E9]/10" aria-hidden="true" />
              <TrustBadge icon={HeadphonesIcon} text="Dedicated support" />
            </div>
          </header>

          {/* TWO-COLUMN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
            {/* LEFT: FORM */}
            <div className="md:col-span-3 rounded-lg border border-[#F7F2E9]/10 bg-[#132B22] p-7 sm:p-9">
              <div className="flex items-center gap-3 mb-7">
                <div>
                  <h2 className={`${lora.className} text-xl font-semibold text-[#F7F2E9] leading-tight`}>Send a message</h2>
                  <p className="text-xs text-[#7C9484] mt-0.5">Fill the form — we&apos;ll reply within 2 hours</p>
                </div>
              </div>

              <AnimatePresence>
                {formSubmitted && (
                  <motion.div
                    role="alert"
                    aria-live="polite"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 rounded-md p-4 flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/20"
                  >
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-emerald-400">Submitted successfully!</p>
                      <p className="text-xs text-[#AAB6A2] mt-0.5">Our support team will reach you as soon as possible.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={submitForm} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FieldInput icon={User} label="Full name" fieldId="contact-name" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required autoComplete="name" />
                  <FieldInput icon={Mail} label="Email address" fieldId="contact-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required autoComplete="email" />
                </div>

                <FieldInput icon={Phone} label="Phone number (optional)" fieldId="contact-phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" autoComplete="tel" />

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-[#58646C] mb-1.5">Your message</label>
                  <div className="relative">
                    <MessageSquare size={14} aria-hidden="true" className="absolute left-3.5 top-4 text-[#9AA3AB]" />
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us how we can help you — tutor enquiry, support, partnership..."
                      required
                      className="w-full pl-10 pr-4 py-3.5 text-sm rounded-md border border-[#1C2B22]/15 resize-none outline-none text-[#1C2B22] placeholder:text-[#9AA3AB] transition-colors focus:border-[#D79A2C]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-md text-sm font-semibold transition-colors disabled:cursor-not-allowed bg-[#D79A2C] text-[#17261D] hover:bg-[#c4891f] disabled:opacity-60"
                >
                  {loading ? "Sending..." : (
                    <>
                      <Send size={15} aria-hidden="true" />
                      Send message
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-[#7C9484]">Your information is safe. We never share your data.</p>
              </form>
            </div>

            {/* RIGHT: INFO */}
            <aside className="md:col-span-2 flex flex-col gap-5" aria-label="Contact information">
              <div className="rounded-lg border border-[#F7F2E9]/10 bg-[#132B22] p-7">
                <p className={`${lora.className} italic text-sm text-[#D79A2C] mb-1`}>Yattra Tutors</p>
                <p className="text-xs text-[#7C9484] mb-6">India&apos;s trusted tutor marketplace</p>

                <address className="not-italic space-y-5">
                  <InfoRow icon={Mail} label="Email">
                    <a href="mailto:yattratutorial@gmail.com" className="hover:text-[#D79A2C] transition-colors">yattratutorial@gmail.com</a>
                  </InfoRow>
                  <InfoRow icon={Phone} label="Phone">
                    <a href="tel:+916363453870" className="hover:text-[#D79A2C] transition-colors">+91-6363453870</a>
                  </InfoRow>
                  <InfoRow icon={MapPin} label="Location">India</InfoRow>
                </address>

                <div className="my-6 h-px bg-[#F7F2E9]/10" />

                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <p className="text-xs text-[#AAB6A2]">
                    Avg. response time: <span className="text-emerald-400 font-semibold">under 2 hours</span>
                  </p>
                </div>
              </div>

              <a
                href="https://wa.me/916363453870"
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center justify-center gap-2.5 py-3.5 rounded-md text-sm font-semibold bg-emerald-600 text-white transition-colors hover:bg-emerald-700"
                aria-label="Chat with Yattra Tutors on WhatsApp"
              >
                <MessageCircle size={16} aria-hidden="true" />
                Chat on WhatsApp
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>

              <div className="rounded-lg overflow-hidden border border-[#F7F2E9]/10" style={{ minHeight: 200 }}>
                <iframe
                  title="Yattra Tutors — India Location Map"
                  src="https://www.google.com/maps?q=India&output=embed"
                  width="100%"
                  height="210"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ display: "block", filter: "invert(0.9) hue-rotate(160deg) contrast(0.85) brightness(0.85) saturate(0.4)" }}
                />
              </div>

              <div className="rounded-md px-5 py-4 bg-white/[.02] border border-white/[.05]">
                <p className="text-xs leading-relaxed text-[#7C9484]">
                  <strong className="text-[#AAB6A2]">Yattra Tutors</strong> connects students across India
                  with <strong className="text-[#AAB6A2]">verified home tutors and online tutors</strong>{" "}
                  for all subjects — Maths, Science, English, Hindi, and more. Available for CBSE, ICSE,
                  and State Board students from Class 1 to 12.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <FloatingChatButton />
      <Footer />
    </>
  );
}
