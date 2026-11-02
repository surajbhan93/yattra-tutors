import React from "react";
import Footer from "@/components/landing/Footer";
import NavBar from "@/components/navbar/NavBar";
import { FileText, ShieldCheck, AlertTriangle, Users, Clock, Mail, Scale } from "lucide-react";
import { PolicyHero, PolicySection, PolicyBody, PolicyFootnote, PolicyPageWrapper } from "@/components/common/PolicyLayout";

export function TermsConditionsContent() {
  return (
    <>
      <PolicyHero
        icon={FileText}
        title="Terms & conditions"
        subtitle={<>These Terms govern your access to and use of <strong className="text-[#F7F2E9]">Yattra Tutors</strong>. Please read them carefully before using our services.</>}
        lastUpdated
      />

      <PolicyBody>
        <PolicySection icon={Users} title="1. Acceptance of terms">
          <p>By accessing or using Yattra Tutors, you agree to be bound by these Terms and all applicable laws and regulations. If you do not agree, you must discontinue use of the platform.</p>
        </PolicySection>

        <PolicySection icon={ShieldCheck} title="2. Services offered">
          <ul>
            <li>One-to-one and group tutoring services</li>
            <li>AI-assisted tutor matching</li>
            <li>Academic progress tracking tools</li>
            <li>Educational content and materials</li>
          </ul>
        </PolicySection>

        <PolicySection icon={AlertTriangle} title="3. User responsibilities">
          <ul>
            <li>Provide accurate and up-to-date information</li>
            <li>Use the platform lawfully and respectfully</li>
            <li>Do not misuse content, systems, or tutor services</li>
          </ul>
        </PolicySection>

        <PolicySection icon={Scale} title="4. Payments, fees & refunds">
          <p>All payments are subject to our pricing structure and <strong>Refund & Cancellation Policy</strong>.</p>
          <p className="mt-2 text-[#9AA3AB]">Fees for completed sessions are non-refundable unless stated otherwise.</p>
        </PolicySection>

        <PolicySection icon={Clock} title="5. Scheduling & cancellations">
          <ul>
            <li>Sessions must be scheduled in advance</li>
            <li>Late cancellations may not be eligible</li>
            <li>Yattra Tutors may reschedule sessions when necessary</li>
          </ul>
        </PolicySection>

        <PolicySection icon={ShieldCheck} title="6. Intellectual property">
          <p>All platform content, branding, and materials are the intellectual property of Yattra Tutors and may not be copied, reproduced, or distributed without permission.</p>
        </PolicySection>

        <PolicySection icon={AlertTriangle} title="7. Limitation of liability">
          <p>Yattra Tutors is not liable for indirect, incidental, or consequential damages arising from use of the platform or tutoring services.</p>
        </PolicySection>

        <PolicySection icon={Mail} title="8. Contact information">
          <p>For questions regarding these Terms, please contact:</p>
          <p className="mt-2 font-semibold text-[#8a5f18]">yattratutorial@gmail.com</p>
        </PolicySection>
      </PolicyBody>

      <PolicyFootnote>By using Yattra Tutors, you acknowledge that you have read, understood, and agree to these Terms & Conditions.</PolicyFootnote>
    </>
  );
}

export default function TermsConditionsPage() {
  return (
    <>
      <NavBar />
      <PolicyPageWrapper>
        <TermsConditionsContent />
      </PolicyPageWrapper>
      <Footer />
    </>
  );
}
