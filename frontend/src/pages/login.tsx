// src/pages/login.tsx

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import AboutUsCTA from "@/components/common/AboutUsCTA";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/landing/Footer";
import PasswordInput from "@/components/ui/PasswordInput";
import apiClient from "@/lib/apiClient";
import { useAuthStore } from "@/stores/useAuthStore";
import { lora, dmSans } from "@/lib/fonts";
import { ShieldCheck, Users, GraduationCap } from "lucide-react";

const roles = ["Parent", "Tutor", "Admin"] as const;
type Role = (typeof roles)[number];

const LoginPage = () => {
  const [activeRole, setActiveRole] = useState<Role>("Parent");
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuthStore();
  const router = useRouter();

  const mainInputLabel = activeRole === "Admin" ? "Username" : "Email or Phone Number";

  const ROLE_CONFIG: Record<
    Role,
    { endpoint: string; payloadKey: "email" | "username"; dashboard: string }
  > = {
    Parent: { endpoint: "/auth/parent/login", payloadKey: "email", dashboard: "/parent/dashboard" },
    Tutor: { endpoint: "/auth/tutor/login", payloadKey: "email", dashboard: "/tutor/dashboard" },
    Admin: { endpoint: "/auth/admin/login", payloadKey: "username", dashboard: "/admin/dashboard" },
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const config = ROLE_CONFIG[activeRole];
    const cleanInput = emailOrUsername.trim();

    try {
      const response = await apiClient.post(config.endpoint, {
        [config.payloadKey]: cleanInput,
        password,
      });

      const { user, token } = response.data;
      login(user, token);

      const redirect = router.query.redirect as string;
      const action = router.query.action as string;
      let finalUrl = redirect || config.dashboard;
      if (redirect && action) {
        finalUrl = `${redirect}?action=${encodeURIComponent(action)}`;
      }
      router.push(finalUrl);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err?.response?.data?.error || "Invalid credentials"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getSignupUrl = () => {
    const redirect = router.query.redirect as string;
    const action = router.query.action as string;
    if (!redirect) return "/find-tutor-flow/create-account";
    let url = `/find-tutor-flow/create-account?redirect=${encodeURIComponent(redirect)}`;
    if (action) url += `&action=${encodeURIComponent(action)}`;
    return url;
  };

  const roleIcon: Record<Role, React.ElementType> = { Parent: Users, Tutor: GraduationCap, Admin: ShieldCheck };

  return (
    <div className={`min-h-screen flex flex-col bg-[#F7F2E9] ${dmSans.className}`}>
      <NavBar />

      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-5xl rounded-lg border border-[#1C2B22]/10 bg-white overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* LEFT : INFO PANEL */}
          <section className="relative overflow-hidden bg-[#0E211C] p-8 md:p-10 flex flex-col justify-between">
            <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-[.04]">
              <filter id="loginGrain">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#loginGrain)" />
            </svg>

            <div className="relative z-10">
              <p className={`${lora.className} italic text-sm text-[#D79A2C] mb-4`}>Welcome back</p>
              <h3 className={`${lora.className} text-2xl md:text-3xl font-semibold text-[#F7F2E9] mb-3 leading-tight`}>
                Learn, teach, and grow with Yattra Tutors
              </h3>
              <p className="text-sm text-[#AAB6A2] max-w-md leading-relaxed">
                India&apos;s trusted platform for parents and tutors —
                personalized, verified, and result-oriented learning.
              </p>
            </div>

            <div className="relative z-10 mt-8 flex flex-wrap gap-2.5">
              {["Trusted tutors", "Secure payments", "Pan-India coverage"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#F7F2E9]/15 px-3.5 py-1.5 text-xs font-medium text-[#AAB6A2]"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="relative z-10 mt-8 pt-5 border-t border-[#F7F2E9]/10 text-xs text-[#7C9484] space-y-1">
              <p>yattratutorial@gmail.com</p>
              <p>+91-6363453870</p>
            </div>
          </section>

          {/* RIGHT : LOGIN FORM */}
          <div className="p-8 md:p-12">
            <h2 className={`${lora.className} text-2xl font-semibold text-[#1C2B22] mb-1`}>Welcome back</h2>
            <p className="text-sm text-[#58646C] mb-6">Login to access your dashboard</p>

            {/* ROLE TABS */}
            <div className="flex mb-6 rounded-md border border-[#1C2B22]/10 bg-[#F7F2E9] p-1">
              {roles.map((role) => {
                const Icon = roleIcon[role];
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => {
                      setActiveRole(role);
                      setError(null);
                    }}
                    className={`w-full flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold rounded-sm transition ${
                      activeRole === role ? "bg-[#1C2B22] text-[#F7F2E9]" : "text-[#58646C]"
                    }`}
                  >
                    <Icon size={14} />
                    {role}
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-[#1C2B22]">{mainInputLabel}</label>
                <input
                  type="text"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  placeholder={activeRole === "Admin" ? "admin_username" : "Email address or 10-digit mobile number"}
                  className="mt-1.5 w-full rounded-md border border-[#1C2B22]/15 py-3 px-4 text-sm text-[#1C2B22] outline-none transition-colors focus:border-[#D79A2C]"
                  required
                />
              </div>

              <PasswordInput
                label="Password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 p-3.5 text-center text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              <div className="flex justify-between text-sm">
                <label className="flex items-center gap-2 text-[#58646C] cursor-pointer">
                  <input type="checkbox" className="rounded border-[#1C2B22]/20 text-[#D79A2C] focus:ring-[#D79A2C]" />
                  Remember me
                </label>
                <Link href="/forgot-password" className="font-medium text-[#8a5f18] hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-[#D79A2C] px-6 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>

              <div className="text-center text-sm text-[#58646C] space-y-2 pt-2">
                <p>
                  Student / Parent?
                  <Link href={getSignupUrl()} className="ml-1 font-semibold text-[#8a5f18] hover:underline">
                    Sign up here
                  </Link>
                </p>
                <p>
                  Want to teach on Yattra Tutors?
                  <Link
                    href="/tutor-flow/tutor-registration?role=tutor&source=LOGIN_PAGE&campaign=BECOME_TUTOR"
                    className="ml-1 font-semibold text-[#8a5f18] hover:underline"
                  >
                    Become a tutor
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

      <AboutUsCTA />
      <Footer />
    </div>
  );
};

export default LoginPage;
