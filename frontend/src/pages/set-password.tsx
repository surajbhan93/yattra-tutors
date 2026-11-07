// src/pages/set-password.tsx

import { useRouter } from "next/router";
import React, { useState } from "react";
import { lora, dmSans } from "@/lib/fonts";

import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/landing/Footer";
import PasswordInput from "@/components/ui/PasswordInput";

const SetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password has been reset! (Simulated)");
    router.push("/login");
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#F7F2E9] ${dmSans.className}`}>
      <NavBar />

      <div className="flex-1 flex items-center justify-center px-4 py-14">
        <div className="w-full max-w-md rounded-lg border border-[#1C2B22]/10 bg-white p-8 md:p-10">
          <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-2`}>Account security</p>
          <h1 className="text-2xl font-semibold text-[#1C2B22] mb-3">Set your new password</h1>

          <p className="text-sm text-[#58646C] mb-6 leading-relaxed">
            Welcome to <span className="font-semibold text-[#1C2B22]">Yattra Tutors</span>. Your
            previous password has been reset — please create a strong, secure new password for
            your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <PasswordInput
              label="Create password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <PasswordInput
              label="Re-enter password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full rounded-md bg-[#D79A2C] px-6 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
            >
              Set new password
            </button>
          </form>

          <p className="text-center text-sm text-[#58646C] mt-5">
            Remembered your password?{" "}
            <span
              className="font-medium text-[#8a5f18] cursor-pointer hover:underline"
              onClick={() => router.push("/login")}
            >
              Back to login
            </span>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SetPasswordPage;
