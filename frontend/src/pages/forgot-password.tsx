import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { lora, dmSans } from "@/lib/fonts";

import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/landing/Footer";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("http://localhost:3010/api/v1/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setMessage("Password reset link sent to your email");
      setEmail("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex min-h-screen flex-col bg-[#F7F2E9] ${dmSans.className}`}>
      <NavBar />

      <div className="flex flex-1 items-center justify-center px-4 py-14">
        <div className="w-full max-w-md rounded-lg border border-[#1C2B22]/10 bg-white p-8">
          <p className={`${lora.className} italic text-sm text-[#8a5f18] text-center mb-2`}>Yattra Tutors</p>

          <h2 className="mb-2 text-xl font-semibold text-[#1C2B22] text-center">Forgot your password?</h2>
          <p className="mb-6 text-center text-sm text-[#58646C]">
            Don&apos;t worry, enter your email to recover your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#1C2B22]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-md border border-[#1C2B22]/15 py-3 px-4 text-sm outline-none transition-colors focus:border-[#D79A2C]"
                placeholder="you@example.com"
                required
              />
            </div>

            {message && <p className="text-sm text-emerald-700 text-center">{message}</p>}
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#D79A2C] px-6 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f] disabled:opacity-60"
            >
              {loading ? "Sending..." : "Submit"}
            </button>

            <div className="text-center pt-2">
              <Link href="/login" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#58646C] hover:text-[#1C2B22]">
                <ArrowLeft size={14} />
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
