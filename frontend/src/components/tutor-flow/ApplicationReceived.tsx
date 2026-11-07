// src/components/tutor-flow/ApplicationReceived.tsx
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/landing/Footer";
import { CheckCircle, Clock, Bell, UserCheck, MessageCircle } from "lucide-react";
import OnboardingStepper from "@/components/tutor-flow/OnboardingStepper";
import { lora } from "@/lib/fonts";

export default function ApplicationReceived() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F2E9]">
      <NavBar />

      {/* Stepper */}
      <div className="mx-auto w-full max-w-3xl px-4 pt-6">
        <OnboardingStepper currentStep={4} />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-1 items-center justify-center px-4 py-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg rounded-lg border border-[#1C2B22]/10 bg-white px-8 py-10 text-center"
        >
          {/* ICON */}
          <div className="mb-5 flex justify-center">
            <CheckCircle className="h-14 w-14 text-[#3f8a5f]" />
          </div>

          {/* TITLE */}
          <h1 className={`${lora.className} mb-2 text-2xl font-semibold text-[#1C2B22]`}>
            Application received
          </h1>

          <p className="mb-8 text-sm text-[#58646C]">
            Thank you for applying at <span className="font-semibold text-[#1C2B22]">Yattra Tutors</span>.
          </p>

          {/* INFO BOX */}
          <div className="mb-6 rounded-md border border-[#1C2B22]/10 bg-[#F7F2E9] px-6 py-5 text-left">
            <ul className="space-y-4 text-sm text-[#58646C]">
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#D79A2C]" />
                <span>
                  Your profile is currently <span className="font-semibold text-[#1C2B22]">pending</span> and not
                  public yet.
                </span>
              </li>

              <li className="flex gap-3">
                <Bell className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#D79A2C]" />
                <span>You will receive a notification once your profile is approved.</span>
              </li>

              <li className="flex gap-3">
                <UserCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#D79A2C]" />
                <span>
                  Login to the website and complete{" "}
                  <span className="font-semibold text-[#1C2B22]">100% of all required fields</span>. Your profile
                  will automatically become public after approval.
                </span>
              </li>
            </ul>
          </div>

          {/* WAIT NOTE */}
          <p className="mb-6 text-sm text-[#9AA3AB]">
            Please wait for up to <span className="font-semibold text-[#58646C]">2 days</span>. Our team may contact
            you via call or message for a demo or interview.
          </p>

          {/* WHATSAPP COMMUNITY BOX */}
          <div className="mb-8 rounded-md border border-[#1C2B22]/10 bg-[#F7F2E9] px-6 py-5">
            <div className="mb-3 flex items-center justify-center gap-2">
              <MessageCircle className="h-5 w-5 text-[#3f8a5f]" />
              <h2 className={`${lora.className} text-base font-semibold text-[#1C2B22]`}>
                Join our WhatsApp community
              </h2>
            </div>

            <p className="mb-4 text-sm text-[#58646C]">
              Stay updated about your <span className="font-semibold text-[#1C2B22]">interview schedule</span>,
              approval status, and important announcements — all in one place.
            </p>

            <button
              onClick={() => window.open("https://chat.whatsapp.com/KlMNGSmRaYi1u7uvXq4zGq", "_blank")}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-[#3f8a5f] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#357a52]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Join community for updates
            </button>
          </div>

          {/* BUTTON */}
          <button
            onClick={() => router.push("/")}
            className="w-full rounded-md bg-[#D79A2C] px-6 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
          >
            Back to home page
          </button>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
