"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  IndianRupee,
  Wallet,
  Clock,
  CheckCircle,
} from "lucide-react";
import api from "@/lib/api";
import { lora } from "@/lib/fonts";

export default function TutorPayments() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.get("/payments/tutor/dashboard").then((res) => {
      setData(res.data.data);
    });
  }, []);

  if (!data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-sm text-[#58646C]"
        >
          Loading earnings...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6">
      {/* ================= FIND STUDENT HEADER ================= */}
        {/* ================= TUTOR EARNINGS HEADER ================= */}
<div className="mb-6 rounded-md border border-[#1C2B22]/10 bg-[#0E211C] p-5 text-[#F7F2E9]">
  <h1 className={`${lora.className} text-xl font-semibold`}>
    Tutor earnings
  </h1>
  <p className="mt-1 text-sm text-[#AAB6A2]">
    Track your monthly income, completed sessions, and payment
    history in one place.
  </p>
</div>

{/* ================= INFO / PRIVACY NOTE ================= */}
<div className="mb-6 rounded-md border border-[#1C2B22]/10 bg-white p-4 text-sm text-[#1C2B22]">
  <p className="font-semibold text-[#1C2B22] mb-1">
    Important information
  </p>
  <ul className="list-disc pl-5 space-y-1 text-[#58646C]">
    <li>
      Your earnings data is completely private and visible only
      to you.
    </li>
    <li>
      Payments are calculated based on completed and verified
      sessions.
    </li>
    <li>
      Monthly payouts are processed securely to your registered
      bank account.
    </li>
    <li>
      Any pending or delayed payments will be highlighted for
      transparency.
    </li>
  </ul>
</div>

      {/* 🔹 STATS CARDS */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {/* This Month */}
        <StatCard
          title="This month"
          value={`₹${data.thisMonthEarning}`}
          icon={<IndianRupee />}
        />

        {/* Total Earned */}
        <StatCard
          title="Total earned"
          value={`₹${data.totalEarning}`}
          icon={<Wallet />}
        />

        {/* Pending */}
        <StatCard
          title="Pending settlement"
          value={`₹${data.pendingSettlement}`}
          icon={<Clock />}
        />
      </div>

      {/* 🔹 PAYMENT HISTORY */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-md border border-[#1C2B22]/10 bg-white"
      >
        <div className="border-b border-[#1C2B22]/10 px-6 py-4">
          <h3 className={`${lora.className} text-base font-semibold text-[#1C2B22]`}>
            Payment history
          </h3>
        </div>

        {data.paymentHistory.length === 0 ? (
          <p className="p-6 text-sm text-[#58646C]">
            No payment records found.
          </p>
        ) : (
          <div className="divide-y divide-[#1C2B22]/10">
            {data.paymentHistory.map((p: any, idx: number) => (
              <div
                key={p.paymentId}
                className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Left */}
                <div>
                  <p className="font-medium text-[#1C2B22]">
                    {p.studentName}
                  </p>
                  <p className="text-sm text-[#58646C]">
                    Payment ID: {p.paymentId}
                  </p>
                </div>

                {/* Middle */}
                <div className="text-sm text-[#1C2B22]">
                  Amount:{" "}
                  <span className="font-semibold">
                    ₹{p.amount}
                  </span>
                </div>

                {/* Right */}
                <div
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium
                    ${
                      p.settlementStatus === "paid"
                        ? "bg-[#1F6F54]/10 text-[#1F6F54]"
                        : "bg-[#D79A2C]/15 text-[#8a5f18]"
                    }
                  `}
                >
                  <CheckCircle className="h-4 w-4" />
                  {p.settlementStatus}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* ================== STAT CARD COMPONENT ================== */

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-md border border-[#1C2B22]/10 bg-white p-6">
      <div className="absolute right-4 top-4 text-[#D79A2C]/30">
        <div className="h-10 w-10">{icon}</div>
      </div>

      <p className="text-sm text-[#58646C]">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-[#1C2B22]">{value}</p>
    </div>
  );
}
