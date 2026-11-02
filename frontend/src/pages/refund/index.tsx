import React from "react";
import Footer from "@/components/landing/Footer";
import NavBar from "@/components/navbar/NavBar";
import { RefreshCcw, ShieldCheck, AlertCircle, Clock, Mail, RotateCcw } from "lucide-react";
import { PolicyHero, PolicySection, PolicyBody, PolicyFootnote, PolicyPageWrapper } from "@/components/common/PolicyLayout";

export function RefundPolicyContent() {
  return (
    <>
      <PolicyHero
        icon={RotateCcw}
        title="Refund & cancellation policy"
        subtitle={<>At <strong className="text-[#F7F2E9]">Yattra Tutors</strong>, we follow fair, transparent, and student-first refund and cancellation practices.</>}
        lastUpdated
      />

      <PolicyBody>
        <PolicySection icon={Clock} title="1. Trial & initial sessions">
          <ul>
            <li>Trial or demo sessions (if offered) are non-refundable</li>
            <li>Once regular tutoring sessions begin, refunds follow the terms below</li>
          </ul>
        </PolicySection>

        <PolicySection icon={AlertCircle} title="2. Refund eligibility">
          <ul>
            <li>Tutor unavailability without replacement</li>
            <li>Operational or technical issues from our side</li>
            <li>Service not delivered as agreed</li>
          </ul>
          <p className="mt-2 text-[#9AA3AB]">Refunds are not applicable after multiple successful sessions.</p>
        </PolicySection>

        <PolicySection icon={ShieldCheck} title="3. Cancellation policy">
          <ul>
            <li>Advance notice required for cancellations</li>
            <li>Completed sessions are non-refundable</li>
            <li>Late cancellations may not be eligible</li>
          </ul>
        </PolicySection>

        <PolicySection icon={RefreshCcw} title="4. Refund processing">
          <ul>
            <li>7–10 business days for online payments</li>
            <li>Processed via original payment method</li>
          </ul>
          <p className="mt-2 text-[#9AA3AB]">Timelines depend on banks and payment gateways.</p>
        </PolicySection>

        <PolicySection icon={Mail} title="5. Requesting a refund">
          <p>To request a refund or cancellation, contact:</p>
          <p className="mt-2 font-semibold text-[#8a5f18]">yattratutorial@gmail.com</p>
          <p className="mt-1 text-[#9AA3AB]">Include registered email, student name, and reason.</p>
        </PolicySection>
      </PolicyBody>

      <PolicyFootnote>By enrolling with Yattra Tutors, you agree to this Refund & Cancellation Policy.</PolicyFootnote>
    </>
  );
}

export default function RefundPolicyPage() {
  return (
    <>
      <NavBar />
      <PolicyPageWrapper>
        <RefundPolicyContent />
      </PolicyPageWrapper>
      <Footer />
    </>
  );
}
