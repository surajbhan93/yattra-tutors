"use client";

import Link from "next/link";
import { useState } from "react";
import ParentDashboardLayout from "@/layouts/ParentDashboardLayout";
import { CreditCard, Smartphone } from "lucide-react";
import { Lora } from "next/font/google";

// Recharts
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"] });

export default function PaymentMethodsPage() {
  const cards: Array<{ brand: string; last4: string; exp: string }> = [];

  const [showUPIModal, setShowUPIModal] = useState(false);
  const [upiId, setUpiId] = useState("");

  const handlePayWithUPI = () => {
    if (!upiId.trim()) return;

    // simulate success
    setShowUPIModal(false);
    setUpiId("");
    alert("✅ Payment initiated via UPI");
  };

  // 🔹 dummy payment stats
  const paymentStats = [
    { name: "UPI", value: 65 },
    { name: "Card", value: 35 },
  ];

  const COLORS = ["#D79A2C", "#1C3A2E"];

  return (
    <ParentDashboardLayout>
      <div className="space-y-6">

        {/* ===== HEADER ===== */}
        <div className="rounded-md border border-[#1C2B22]/10 bg-[#0E211C] p-6 text-[#F7F2E9]">
          <h1 className={`${lora.className} text-2xl font-semibold`}>Payment methods</h1>
          <p className="mt-1 text-sm text-[#AAB6A2]">
            Manage your saved cards and make secure payments using UPI or Card.
          </p>
        </div>

        {/* ===== ACTION BAR ===== */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-base font-semibold text-[#1C2B22]">
            Your payment options
          </h2>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/parent/payment-methods/add-card"
              className="flex items-center gap-2 rounded-md bg-[#D79A2C] px-4 py-2 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
            >
              <CreditCard size={16} /> Add card
            </Link>

            <button
              onClick={() => setShowUPIModal(true)}
              className="flex items-center gap-2 rounded-md border border-[#1C2B22]/15 px-4 py-2 text-sm font-semibold text-[#1C2B22] transition-colors hover:border-[#D79A2C]"
            >
              <Smartphone size={16} /> Pay with UPI
            </button>
          </div>
        </div>

        {/* ===== GRID ===== */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* ---- CARDS LIST ---- */}
          <div className="rounded-md border border-[#1C2B22]/10 bg-white lg:col-span-2">
            <div className="border-b border-[#1C2B22]/10 px-5 py-4">
              <h3 className="font-semibold text-[#1C2B22]">
                Saved cards
              </h3>
              <p className="text-sm text-[#58646C]">
                Your cards are securely stored.
              </p>
            </div>

            {cards.length === 0 ? (
              <div className="p-6 text-sm text-[#58646C]">
                No saved cards yet. Add a card to make faster payments.
              </div>
            ) : (
              <div className="divide-y divide-[#1C2B22]/10">
                <div className="grid grid-cols-3 bg-[#F7F2E9] px-5 py-3 text-sm font-medium text-[#58646C]">
                  <div>Brand</div>
                  <div>Last 4</div>
                  <div className="text-right">Expiry</div>
                </div>

                {cards.map((c, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-3 items-center px-5 py-3 text-sm text-[#1C2B22]"
                  >
                    <div className="font-medium">{c.brand}</div>
                    <div>•••• {c.last4}</div>
                    <div className="text-right">{c.exp}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ---- PAYMENT STATS ---- */}
          <div className="rounded-md border border-[#1C2B22]/10 bg-white p-5">
            <h3 className="mb-1 font-semibold text-[#1C2B22]">
              Payment usage
            </h3>
            <p className="mb-4 text-sm text-[#58646C]">
              Preferred payment methods overview.
            </p>

            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentStats}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={80}
                  >
                    {paymentStats.map((_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* ===== UPI MODAL ===== */}
      {showUPIModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-md bg-white p-6">
            <h2 className="text-lg font-semibold text-[#1C2B22]">
              Pay via UPI
            </h2>
            <p className="mt-1 text-sm text-[#58646C]">
              Enter your UPI ID to proceed with payment.
            </p>

            <input
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="example@upi"
              className="mt-4 w-full rounded-md border border-[#1C2B22]/15 px-3 py-2 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
            />

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setShowUPIModal(false)}
                className="rounded-md border border-[#1C2B22]/15 px-4 py-2 text-sm text-[#1C2B22]"
              >
                Cancel
              </button>
              <button
                onClick={handlePayWithUPI}
                className="rounded-md bg-[#D79A2C] px-4 py-2 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
              >
                Pay now
              </button>
            </div>
          </div>
        </div>
      )}
    </ParentDashboardLayout>
  );
}
