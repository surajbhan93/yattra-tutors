"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { startParentPayment } from "./RazorpayCheckout";
import { motion } from "framer-motion";
import {
  IndianRupee,
  CheckCircle2,
  AlertCircle,
  Wallet,
  CalendarDays,
} from "lucide-react";
import { Lora } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"] });

export default function PaymentSummaryCard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState<string | null>(null);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const res = await api.get("/payments/parent/summary");
      setData(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (loading)
    return (
      <div className="rounded-md border border-[#1C2B22]/10 bg-white p-6 text-sm text-[#58646C]">
        Loading payment summary...
      </div>
    );

  if (!data)
    return (
      <div className="rounded-md border border-[#1C2B22]/10 bg-white p-6 text-sm text-[#58646C]">
        No payment data
      </div>
    );

  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-md border border-[#1C2B22]/10 bg-white p-6"
    >
      {/* ================= HEADER ================= */}
      <h2 className={`${lora.className} text-xl font-semibold text-[#1C2B22]`}>Payment summary</h2>
      <p className="mt-1 text-sm text-[#58646C]">
        Yahan aap apne students ke monthly payments ka status dekh sakte hain.
      </p>

      {/* ================= SUMMARY ================= */}
      <div className="mt-5 grid grid-cols-2 divide-x divide-y divide-[#1C2B22]/10 overflow-hidden rounded-md border border-[#1C2B22]/10">
        {[
          { label: "This month paid", value: data.thisMonthPaid, icon: CalendarDays },
          { label: "Last month paid", value: data.lastMonthPaid, icon: CalendarDays },
          { label: "Total paid", value: data.totalPaid, icon: Wallet },
          { label: "Total due", value: data.totalDue, icon: AlertCircle },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-[#F7F2E9] p-3 text-sm">
            <div className="flex items-center gap-2 text-[#58646C]">
              <Icon size={15} />
              {label}
            </div>
            <div className="mt-1 text-lg font-semibold text-[#1C2B22]">₹{value}</div>
          </div>
        ))}
      </div>

      {/* ================= STUDENT PAYMENTS ================= */}
      <h3 className={`${lora.className} mb-3 mt-6 text-base font-semibold text-[#1C2B22]`}>
        Student-wise payments
      </h3>

      <div className="divide-y divide-[#1C2B22]/10 rounded-md border border-[#1C2B22]/10">
        {data.studentWise.map((s: any) => {
          const isPaying = payingId === s.requestId;

          return (
            <div key={s.requestId} className="p-4">
              {/* STUDENT INFO */}
              <div className="font-medium text-[#1C2B22]">{s.studentName}</div>
              <div className="text-sm text-[#58646C]">Tutor: {s.tutorName}</div>

              {/* FEE */}
              <div className="mt-2 flex items-center gap-1 text-sm text-[#1C2B22]">
                <IndianRupee size={14} className="text-[#58646C]" />
                Monthly fee: {s.monthlyFee}
              </div>

              {/* STATUS */}
              {s.paidThisMonth ? (
                <div className="mt-3 flex items-center gap-2 text-sm font-medium text-[#3f8a5f]">
                  <CheckCircle2 size={16} />
                  Paid for this month
                </div>
              ) : (
                <>
                  <div className="mt-3 flex items-center gap-2 text-sm text-[#b23b2e]">
                    <AlertCircle size={16} />
                    Due ₹{s.due}
                  </div>

                  <button
                    disabled={isPaying}
                    className={`mt-3 w-full rounded-md py-2 text-sm font-semibold transition-colors ${
                      isPaying
                        ? "cursor-not-allowed bg-[#9AA3AB] text-white"
                        : "bg-[#D79A2C] text-[#17261D] hover:bg-[#c4891f]"
                    }`}
                    onClick={async () => {
                      setPayingId(s.requestId);
                      try {
                        await startParentPayment({
                          parentRequestId: s.requestId,
                          month,
                          year,
                          onSuccess: fetchSummary,
                        });
                      } catch {
                        alert("Payment failed, try again");
                      } finally {
                        setPayingId(null);
                      }
                    }}
                  >
                    {isPaying ? "Processing..." : `Pay now ₹${s.due}`}
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
