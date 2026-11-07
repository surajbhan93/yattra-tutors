import { useEffect, useState } from "react";
import NavBar from "@/components/navbar/NavBar";
import {
  getPendingSettlements,
  settlePayment,
} from "@/lib/adminPayments.api";
import { lora } from "@/lib/fonts";

export default function PendingSettlementsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [settlingId, setSettlingId] = useState<string | null>(null);

  const fetchData = () => {
    setLoading(true);
    getPendingSettlements()
      .then(res => setData(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F2E9]">
        <p className="text-sm text-[#58646C]">Loading pending settlements...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F7F2E9]">
      <NavBar />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className={`${lora.className} mb-6 border-b border-[#1C2B22]/10 pb-4 text-2xl font-semibold text-[#1C2B22]`}>
          Pending tutor settlements
        </h1>

        {data.length === 0 && (
          <p className="rounded-md border border-[#3f8a5f]/30 bg-white px-4 py-3 text-sm font-medium text-[#3f8a5f]">
            No pending settlements
          </p>
        )}

        <div className="space-y-5">
          {data.map(tutor => (
            <div
              key={tutor.tutorId}
              className="rounded-md border border-[#1C2B22]/10 bg-white p-5"
            >
              <h2 className="text-sm font-semibold text-[#1C2B22]">
                {tutor.tutorName}{" "}
                <span className="font-normal text-[#58646C]">— ₹{tutor.totalPending} pending</span>
              </h2>

              <table className="mt-4 w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1C2B22]/10 text-left text-xs font-semibold uppercase tracking-wide text-[#58646C]">
                    <th className="pb-2">Student</th>
                    <th className="pb-2">Amount</th>
                    <th className="pb-2">Month</th>
                    <th className="pb-2">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#1C2B22]/8">
                  {tutor.payments.map((p: any) => (
                    <tr key={p._id}>
                      <td className="py-2 text-[#1C2B22]">{p.student?.full_name}</td>
                      <td className="py-2 text-[#1C2B22]">₹{p.amount}</td>
                      <td className="py-2 text-[#58646C]">
                        {p.month}/{p.year}
                      </td>
                      <td className="py-2">
                        <button
                          disabled={settlingId === p._id}
                          className={`rounded-sm px-3 py-1 text-xs font-semibold transition-colors ${
                            settlingId === p._id
                              ? "cursor-not-allowed border border-[#1C2B22]/10 text-[#9AA3AB]"
                              : "bg-[#D79A2C] text-[#17261D] hover:bg-[#c4891f]"
                          }`}
                          onClick={async () => {
                            setSettlingId(p._id);
                            try {
                              await settlePayment(p._id);
                              fetchData(); // refresh pending list
                            } finally {
                              setSettlingId(null);
                            }
                          }}
                        >
                          {settlingId === p._id ? "Settling..." : "Settle"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
