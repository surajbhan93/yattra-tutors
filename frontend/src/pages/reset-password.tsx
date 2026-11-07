import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { lora, dmSans } from "@/lib/fonts";

import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/landing/Footer";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) setError("Invalid or expired reset link");
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Reset failed");

      router.push("/login?reset=success");
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
          <h2 className={`${lora.className} text-xl font-semibold text-[#1C2B22] text-center`}>Reset password</h2>
          <p className="text-center text-sm text-[#58646C] mt-2 mb-6">Create a new password for your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="New password"
              className="w-full rounded-md border border-[#1C2B22]/15 py-3 px-4 text-sm outline-none transition-colors focus:border-[#D79A2C]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Confirm password"
              className="w-full rounded-md border border-[#1C2B22]/15 py-3 px-4 text-sm outline-none transition-colors focus:border-[#D79A2C]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#D79A2C] px-6 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f] disabled:opacity-60"
            >
              {loading ? "Resetting..." : "Reset password"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ResetPasswordPage;
