"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function AdminPayments() {
  const [pending, setPending] = useState<any[]>([]);

  useEffect(() => {
    api.get("/payments/admin/pending").then(res => {
      setPending(res.data.data);
    });
  }, []);

  const settle = async (paymentId: string) => {
    await api.patch(`/payments/admin/settle/${paymentId}`);
    alert("Payment Settled");
    window.location.reload();
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-lg font-semibold text-[#1C2B22]">Pending settlements</h2>

      <div className="divide-y divide-[#1C2B22]/10 rounded-md border border-[#1C2B22]/10 bg-white">
        {pending.map((tutor: any) => (
          <div key={tutor.tutorId} className="p-4">
            <h3 className="font-medium text-[#1C2B22]">{tutor.tutorName}</h3>
            <p className="mt-0.5 text-sm text-[#58646C]">Total pending: ₹{tutor.totalPending}</p>

            <div className="mt-3 space-y-2">
              {tutor.payments.map((p: any) => (
                <div key={p._id} className="flex items-center justify-between rounded-md bg-[#F7F2E9] px-3 py-2">
                  <span className="text-sm font-medium text-[#1C2B22]">₹{p.amount}</span>
                  <button
                    onClick={() => settle(p._id)}
                    className="rounded-md bg-[#D79A2C] px-3 py-1 text-xs font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
                  >
                    Settle
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
