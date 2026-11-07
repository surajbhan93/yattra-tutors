import { useEffect, useState } from "react";
import NavBar from "@/components/navbar/NavBar";
import { getAllAdminPayments } from "@/lib/adminPayments.api";
import AdminDashboardLayout from "@/components/admin-dashboard/AdminDashboardLayout";
import { lora } from "@/lib/fonts";

const StatusPill = ({ status }: { status: string }) => {
  const map: any = {
    pending: "border-[#D79A2C]/40 text-[#8a5f18]",
    success: "border-[#3f8a5f]/40 text-[#3f8a5f]",
    failed: "border-red-400/40 text-red-700",
  };

  return (
    <span
      className={`inline-block rounded-sm border px-2.5 py-0.5 text-xs font-semibold capitalize ${
        map[status] || "border-[#1C2B22]/20 text-[#58646C]"
      }`}
    >
      {status}
    </span>
  );
};

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllAdminPayments()
      .then(res => setPayments(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F2E9]">
        <p className="text-sm text-[#58646C]">Loading payments...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F7F2E9]">
      <NavBar />

      <AdminDashboardLayout>
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="mb-6 flex items-baseline justify-between border-b border-[#1C2B22]/10 pb-4">
            <h1 className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>
              Payment logs
            </h1>
            <span className="text-xs text-[#9AA3AB]">{payments.length} records</span>
          </div>

          <div className="overflow-x-auto rounded-md border border-[#1C2B22]/10 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1C2B22]/10 text-left text-xs font-semibold uppercase tracking-wide text-[#58646C]">
                  <th className="p-3">Parent</th>
                  <th className="p-3">Student</th>
                  <th className="p-3">Tutor</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Month</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Settlement</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#1C2B22]/8">
                {payments.map(p => (
                  <tr key={p._id} className="hover:bg-[#F7F2E9]/60">
                    <td className="p-3 text-[#1C2B22]">{p.parent?.fullName || "-"}</td>
                    <td className="p-3 text-[#1C2B22]">{p.student?.full_name || "-"}</td>
                    <td className="p-3 text-[#1C2B22]">{p.tutor?.fullName || "-"}</td>
                    <td className="p-3 font-semibold text-[#1C2B22]">₹{p.amount}</td>
                    <td className="p-3 text-[#58646C]">
                      {p.month}/{p.year}
                    </td>
                    <td className="p-3">
                      <StatusPill status={p.status} />
                    </td>
                    <td className="p-3">
                      {p.settlementStatus === "pending" ? (
                        <span className="text-xs font-medium text-[#8a5f18]">Pending</span>
                      ) : (
                        <span className="text-xs font-medium text-[#3f8a5f]">Settled</span>
                      )}
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() =>
                          alert(`Payment ID: ${p._id}\nAmount: ₹${p.amount}`)
                        }
                        className="rounded-sm border border-[#1C2B22]/15 px-3 py-1 text-xs font-semibold text-[#1C2B22] transition-colors hover:border-[#D79A2C] hover:text-[#8a5f18]"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </AdminDashboardLayout>
    </div>
  );
}
