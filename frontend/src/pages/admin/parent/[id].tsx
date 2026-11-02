import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Lora, DM_Sans } from "next/font/google";
import adminApi from "@/lib/adminApi";
import AdminDashboardLayout from "@/components/admin-dashboard/AdminDashboardLayout";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function ParentProfilePage() {
  const router = useRouter();
  const { id } = router.query;
  const [parent, setParent] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    adminApi.get(`/users/${id}`).then((res) => {
      setParent(res.data);
    });
  }, [id]);

  if (!parent) {
    return (
      <AdminDashboardLayout>
        <p className={`${dmSans.className} text-sm text-[#58646C]`}>Loading...</p>
      </AdminDashboardLayout>
    );
  }

  const rows: { label: string; value: string }[] = [
    { label: "Name", value: parent.fullName },
    { label: "Email", value: parent.email },
    { label: "Phone", value: parent.phone },
    { label: "Role", value: parent.role },
    { label: "Joined", value: new Date(parent.createdAt).toLocaleDateString() },
  ];

  return (
    <AdminDashboardLayout>
      <div className={`${dmSans.className} max-w-2xl`}>
        <h1 className={`${lora.className} text-2xl font-semibold text-[#0E211C]`}>
          Parent Profile
        </h1>
        <p className="mt-1 text-xs text-[#58646C]">Record #{id}</p>

        <div className="mt-6 overflow-hidden rounded-md border border-[#0E211C]/10 bg-white">
          <div className="divide-y divide-[#0E211C]/10">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-4 px-5 py-3.5"
              >
                <span className="text-xs font-medium text-[#58646C]">{row.label}</span>
                <span className="text-sm font-medium text-[#0E211C]">
                  {row.value || "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
