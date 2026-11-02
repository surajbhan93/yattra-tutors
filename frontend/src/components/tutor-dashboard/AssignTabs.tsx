"use client";

import { useRouter } from "next/navigation";

/* ======================
   TYPES
====================== */
interface TabItem {
  key: "assign" | "assigned" | "submitted";
  label: string;
  path: string;
}

interface Props {
  active: "assign" | "assigned" | "submitted";
}

/* ======================
   COMPONENT
====================== */
export default function AssignTabs({ active }: Props) {
  const router = useRouter();

  const tabs: TabItem[] = [
    {
      key: "assign",
      label: "Assign assignment",
      path: "/tutor/assignments/assign",
    },
    {
      key: "assigned",
      label: "Assigned",
      path: "/tutor/assign-assignments/assigned",
    },
    {
      key: "submitted",
      label: "Submitted",
      path: "/tutor/assign-assignments/submitted",
    },
  ];

  return (
    <div className="mb-6 flex gap-6 border-b border-[#1C2B22]/10">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => router.push(tab.path)}
          className={`pb-2 text-sm font-medium transition-colors ${
            active === tab.key
              ? "border-b-2 border-[#D79A2C] text-[#1C2B22]"
              : "text-[#58646C] hover:text-[#1C2B22]"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
