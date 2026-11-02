"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { startParentPayment } from "./RazorpayCheckout";
import { motion } from "framer-motion";
import { IndianRupee, CheckCircle2, AlertCircle } from "lucide-react";
import { Lora } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"] });

export default function ParentPayments() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState<string | null>(null);
  const router = useRouter();

  const fetchDashboard = () => {
    setLoading(true);
    api
      .get("/payments/parent/dashboard")
      .then(res => setData(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading)
    return <p className="p-6 text-sm text-[#58646C]">Loading payments...</p>;
  if (!data)
    return <p className="p-6 text-sm text-[#58646C]">No payment data</p>;

  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  return (
    <div className="p-4">
      {/* HEADER */}
      <div className="mb-6 rounded-md border border-[#1C2B22]/10 bg-[#0E211C] p-6 text-[#F7F2E9]">
        <h1 className={`${lora.className} text-xl font-semibold`}>Parent payments</h1>
        <p className="mt-1 text-sm text-[#AAB6A2]">
          View payment history, manage pending dues, and make secure payments for your child&rsquo;s learning.
        </p>
      </div>

      {/* SUMMARY */}
      <div className="mb-6 grid grid-cols-2 divide-x divide-y divide-[#1C2B22]/10 overflow-hidden rounded-md border border-[#1C2B22]/10 bg-white sm:grid-cols-4 sm:divide-y-0">
        {[
          ["This Month", data.thisMonthPaid],
          ["Last Month", data.lastMonthPaid],
          ["Total Paid", data.totalPaid],
          ["Total Due", data.totalDue],
        ].map(([label, value]) => (
          <div key={label as string} className="p-4">
            <div className="text-xs text-[#58646C]">{label}</div>
            <div className="mt-1 text-lg font-semibold text-[#1C2B22]">₹{value}</div>
          </div>
        ))}
      </div>

      <h3 className={`${lora.className} mb-3 text-base font-semibold text-[#1C2B22]`}>Students</h3>

      {/* STUDENT LIST */}
      <div className="divide-y divide-[#1C2B22]/10 rounded-md border border-[#1C2B22]/10 bg-white">
        {data.studentWise.map((s: any) => (
          <motion.div
            key={s.requestId}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-5"
          >
            <div className="font-medium text-[#1C2B22]">{s.studentName || "Student"}</div>
            <div className="text-sm text-[#58646C]">Tutor: {s.tutorName}</div>

            <div className="mt-2 flex items-center gap-1 text-sm text-[#1C2B22]">
              <IndianRupee size={14} className="text-[#58646C]" />
              <span>Monthly fee: {s.monthlyFee}</span>
            </div>

            {s.paidThisMonth ? (
              <div className="mt-3 flex items-center gap-2 text-sm font-medium text-[#3f8a5f]">
                <CheckCircle2 size={16} />
                Paid for this month
              </div>
            ) : (
              <>
                <div className="mt-2 flex items-center gap-2 text-sm text-[#b23b2e]">
                  <AlertCircle size={16} />
                  Due ₹{s.due}
                </div>

                <button
                  disabled={payingId === s.requestId}
                  onClick={() => {
                    if (payingId === s.requestId) return; // 🔒 extra safety

                    if (!s.requestId) {
                      console.error("INVALID REQUEST ID", s);
                      alert("Invalid payment request. Please refresh.");
                      return;
                    }

                    setPayingId(s.requestId);

                    startParentPayment({
                      parentRequestId: s.requestId,
                      month,
                      year,
                      onSuccess: () => {
                        router.push("/parent/payments/payment-success");
                      },
                    }).finally(() => setPayingId(null));
                  }}
                  className="mt-4 w-full rounded-md bg-[#D79A2C] py-2.5 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {payingId === s.requestId ? "Processing..." : `Pay now ₹${s.due}`}
                </button>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
