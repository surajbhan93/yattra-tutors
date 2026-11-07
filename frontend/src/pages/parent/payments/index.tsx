import { useState } from "react";
import ParentPayments from "@/components/parent-dashboard/payments/ParentPayments";
import PaymentSummaryCard from "@/components/parent-dashboard/payments/PaymentSummaryCard";
import ParentDashboardLayout from "@/layouts/ParentDashboardLayout";
import { X } from "lucide-react";
import { lora } from "@/lib/fonts";

export default function ParentPaymentsPage() {
  const [showSummary, setShowSummary] = useState(false);

  return (
    <ParentDashboardLayout>
      <ParentPayments />

      {/* BUTTON */}
      <div className="mt-6 px-4">
        <button
          onClick={() => setShowSummary(true)}
          className="rounded-md bg-[#D79A2C] px-4 py-2 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
        >
          View payment summary
        </button>
      </div>

      {/* ================= MODAL ================= */}
      {showSummary && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShowSummary(false)}
        >
          <div
            className="w-full max-w-lg rounded-md bg-white p-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="mb-3 flex items-center justify-between">
              <h3 className={`${lora.className} text-lg font-semibold text-[#1C2B22]`}>
                Payment summary
              </h3>

              <button
                onClick={() => setShowSummary(false)}
                className="text-[#58646C] hover:text-[#1C2B22]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Summary Content */}
            <PaymentSummaryCard />
          </div>
        </div>
      )}
    </ParentDashboardLayout>
  );
}
