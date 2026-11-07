import {
  ChartBarIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import { lora } from "@/lib/fonts";

import StatsCard from '@/components/admin-dashboard/StatsCard';

const stats = [
  {
    title: 'Total Users',
    value: '1,234',
    icon: UsersIcon,
    color: 'bg-[#0E211C]',
    change: '+12%',
  },
  {
    title: 'Total Content',
    value: '567',
    icon: DocumentTextIcon,
    color: 'bg-[#3f8a5f]',
    change: '+8%',
  },
  {
    title: 'Revenue',
    value: '$12,345',
    icon: CurrencyDollarIcon,
    color: 'bg-[#D79A2C]',
    change: '+15%',
  },
  {
    title: 'Active Sessions',
    value: '89',
    icon: ChartBarIcon,
    color: 'bg-[#B06A2E]',
    change: '+3%',
  },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>Dashboard overview</h1>
        <div className="text-sm text-[#9AA3AB]">Last updated: {new Date().toLocaleDateString()}</div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-[#1C2B22]/10 bg-white p-6">
          <h2 className={`${lora.className} mb-4 text-base font-semibold text-[#1C2B22]`}>Recent activity</h2>
          <div className="divide-y divide-[#1C2B22]/[.06]">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center gap-3 py-2.5 text-sm text-[#1C2B22]">
                <div className="h-1.5 w-1.5 rounded-full bg-[#D79A2C]" />
                <span>New user registered</span>
                <span className="ml-auto text-[#9AA3AB]">2 hours ago</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-[#1C2B22]/10 bg-white p-6">
          <h2 className={`${lora.className} mb-4 text-base font-semibold text-[#1C2B22]`}>Quick actions</h2>
          <div className="space-y-2">
            <button className="w-full rounded-md border border-[#1C2B22]/15 px-4 py-2.5 text-left text-sm font-medium text-[#1C2B22] transition-colors hover:border-[#D79A2C]/50">
              Add new user
            </button>
            <button className="w-full rounded-md border border-[#1C2B22]/15 px-4 py-2.5 text-left text-sm font-medium text-[#1C2B22] transition-colors hover:border-[#D79A2C]/50">
              Create content
            </button>
            <button className="w-full rounded-md border border-[#1C2B22]/15 px-4 py-2.5 text-left text-sm font-medium text-[#1C2B22] transition-colors hover:border-[#D79A2C]/50">
              Generate report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
