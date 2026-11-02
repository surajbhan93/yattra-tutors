"use client";

import ParentDashboardLayout from "@/layouts/ParentDashboardLayout";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Lora } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"] });

/* ================= DATA ================= */
const materials = [
  { id: 1, name: "Algebra Basics - PDF", type: "PDF", status: "Available" },
  { id: 2, name: "Triangles Lecture", type: "Video", status: "New" },
  {
    id: 3,
    name: "Weekly Practice Sheet",
    type: "Worksheet",
    status: "Available",
  },
];

const chartData = [
  { name: "PDF", value: 1 },
  { name: "Video", value: 1 },
  { name: "Worksheet", value: 1 },
];

const COLORS = ["#D79A2C", "#7C9484", "#3E5C83"];

/* ================= PAGE ================= */
export default function StudentMaterialsPage() {
  return (
    <ParentDashboardLayout>
      <div className="mx-auto max-w-6xl space-y-6 px-3 pb-6 sm:px-4 lg:px-6">
        {/* HEADER */}
        <div className="mb-6 rounded-md border border-[#1C2B22]/10 bg-[#0E211C] p-6 text-[#F7F2E9]">
          <h1 className={`${lora.className} text-xl font-semibold`}>Study materials</h1>
          <p className="mt-1 text-sm text-[#AAB6A2]">
            Access and download study materials shared by tutors. Help your child learn better with organized
            resources.
          </p>
        </div>

        {/* CHART + STATS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* PIE CHART */}
          <div className="rounded-md border border-[#1C2B22]/10 bg-white p-4">
            <h3 className="mb-3 text-sm font-semibold text-[#1C2B22] sm:text-base">
              Materials by type
            </h3>

            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={80}
                >
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-3 flex justify-center gap-4 text-xs sm:text-sm">
              {chartData.map((c, i) => (
                <div key={i} className="flex items-center gap-1 text-[#1C2B22]">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[i] }}
                  />
                  {c.name}
                </div>
              ))}
            </div>
          </div>

          {/* QUICK INFO */}
          <div className="rounded-md border border-[#1C2B22]/10 bg-white p-4 md:col-span-2">
            <h3 className="mb-2 text-sm font-semibold text-[#1C2B22] sm:text-base">
              Materials summary
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <InfoCard label="Total materials" value={materials.length} />
              <InfoCard label="New" value={1} />
              <InfoCard label="Available" value={2} />
            </div>
          </div>
        </div>

        {/* TABLE (Desktop) */}
        <div className="hidden overflow-hidden rounded-md border border-[#1C2B22]/10 bg-white md:block">
          <div className="grid grid-cols-4 border-b border-[#1C2B22]/10 bg-[#F7F2E9] px-4 py-3 text-sm font-medium text-[#58646C]">
            <div>Name</div>
            <div>Type</div>
            <div>Status</div>
            <div className="text-right">Action</div>
          </div>

          <div className="divide-y divide-[#1C2B22]/10">
            {materials.map((m) => (
              <div
                key={m.id}
                className="grid grid-cols-4 items-center px-4 py-3 text-sm text-[#1C2B22]"
              >
                <div className="font-medium">{m.name}</div>
                <div>{m.type}</div>
                <div>
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-medium ${
                      m.status === "New"
                        ? "bg-[#D79A2C]/15 text-[#8a5f18]"
                        : "bg-[#F7F2E9] text-[#58646C]"
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
                <div className="text-right">
                  <button className="rounded-md bg-[#D79A2C] px-3 py-1 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]">
                    Open
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE CARDS */}
        <div className="space-y-3 md:hidden">
          {materials.map((m) => (
            <div
              key={m.id}
              className="rounded-md border border-[#1C2B22]/10 bg-white p-4"
            >
              <h4 className="font-medium text-[#1C2B22]">{m.name}</h4>
              <p className="mt-1 text-sm text-[#58646C]">
                Type: {m.type}
              </p>
              <span
                className={`mt-2 inline-block rounded-md px-2 py-1 text-xs font-medium ${
                  m.status === "New"
                    ? "bg-[#D79A2C]/15 text-[#8a5f18]"
                    : "bg-[#F7F2E9] text-[#58646C]"
                }`}
              >
                {m.status}
              </span>

              <div className="mt-3">
                <button className="w-full rounded-md bg-[#D79A2C] py-2 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]">
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ParentDashboardLayout>
  );
}

/* ================= INFO CARD ================= */
function InfoCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-md bg-[#F7F2E9] p-3 text-center">
      <p className="text-xs text-[#58646C]">{label}</p>
      <p className="mt-1 text-xl font-semibold text-[#1C2B22]">
        {value}
      </p>
    </div>
  );
}
