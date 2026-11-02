import React from "react";
import Footer from "@/components/landing/Footer";
import NavBar from "@/components/navbar/NavBar";
import { ShieldCheck, Lock, Eye, Users, Mail, FileLock2 } from "lucide-react";
import { PolicyHero, PolicySection, PolicyBody, PolicyFootnote, PolicyPageWrapper } from "@/components/common/PolicyLayout";

export function PrivacyPolicyContent() {
  return (
    <>
      <PolicyHero
        icon={FileLock2}
        title="Privacy policy"
        subtitle={<>Your trust matters. Learn how <strong className="text-[#F7F2E9]">Yattra Tutors</strong> responsibly collects, uses, and safeguards your personal data.</>}
        lastUpdated
      />

      <PolicyBody>
        <PolicySection icon={Eye} title="1. Information we collect">
          <ul>
            <li>Basic profile details (name, email, phone number)</li>
            <li>Student learning preferences and academic goals</li>
            <li>Tutor qualifications, subjects, and availability</li>
            <li>Platform usage data for analytics and improvements</li>
          </ul>
        </PolicySection>

        <PolicySection icon={Users} title="2. How we use your information">
          <ul>
            <li>AI-based student–tutor matching</li>
            <li>Personalized learning recommendations</li>
            <li>Platform communication and notifications</li>
            <li>Security, fraud prevention, and monitoring</li>
          </ul>
        </PolicySection>

        <PolicySection icon={Lock} title="3. Data protection & security">
          <ul>
            <li>Encrypted storage and secure servers</li>
            <li>Restricted internal access</li>
            <li>Continuous security audits</li>
          </ul>
        </PolicySection>

        <PolicySection icon={ShieldCheck} title="4. Tutors, parents & students">
          <ul>
            <li>Student data is never sold</li>
            <li>Parents have full control</li>
            <li>Tutor data used only for matching</li>
          </ul>
        </PolicySection>

        <PolicySection icon={Eye} title="5. Cookies & analytics">
          <p>Cookies help us improve platform performance and usability.</p>
        </PolicySection>

        <PolicySection icon={ShieldCheck} title="6. Your rights">
          <ul>
            <li>Access your data</li>
            <li>Request correction or deletion</li>
            <li>Withdraw consent</li>
          </ul>
        </PolicySection>

        <PolicySection icon={Mail} title="7. Contact us">
          <p className="font-semibold text-[#8a5f18]">yattratutorial@gmail.com</p>
        </PolicySection>
      </PolicyBody>

      <PolicyFootnote>By using Yattra Tutors, you agree to this Privacy Policy.</PolicyFootnote>
    </>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <NavBar />
      <PolicyPageWrapper>
        <PrivacyPolicyContent />
      </PolicyPageWrapper>
      <Footer />
    </>
  );
}
