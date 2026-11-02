import { Banknote, Hourglass, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';

import Button from '../ui/Button';
import { Lora } from 'next/font/google';

const lora = Lora({ subsets: ['latin'], weight: ['500', '600'] });

// --- Mock Data ---
const statsCards = [
  { title: 'Earnings (This Month)', value: '₹12,500', icon: TrendingUp },
  { title: 'Pending Payout', value: '₹3,200', icon: Hourglass },
  { title: 'Lifetime Earnings', value: '₹1,45,700', icon: Banknote },
];

const mockPayouts = [
  { id: 1, date: 'Sep 5, 2025', amount: '₹10,000', status: 'Paid' },
  { id: 2, date: 'Aug 5, 2025', amount: '₹8,500', status: 'Paid' },
  { id: 3, date: 'Jul 5, 2025', amount: '₹11,200', status: 'Paid' },
];

const mockEarningDetails = [
  {
    id: 1,
    date: 'Sep 27, 2025',
    student: 'Ethan Carter',
    class: 'Calculus I (1hr)',
    amount: '₹500',
  },
  {
    id: 2,
    date: 'Sep 26, 2025',
    student: 'Olivia Bennett',
    class: 'Chemistry (1hr)',
    amount: '₹450',
  },
  {
    id: 3,
    date: 'Sep 26, 2025',
    student: 'Noah Thompson',
    class: 'Physics II (1hr)',
    amount: '₹500',
  },
];

const StatusPill = ({ status }: { status: string }) => (
  <span
    className={`rounded-full px-3 py-1 text-xs font-medium ${
      status === 'Paid'
        ? 'bg-[#1F6F54]/10 text-[#1F6F54]'
        : 'bg-[#D79A2C]/15 text-[#8a5f18]'
    }`}
  >
    {status}
  </span>
);

const EarningsPage = () => {
  const [activeTab, setActiveTab] = useState('Payout History');
  const tabs = ['Payout History', 'Earning Breakdown'];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>Earnings</h1>
          <p className="mt-1 text-sm text-[#58646C]">
            View your earnings, payout history, and manage payments.
          </p>
        </div>
        <Button>Request payout</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {statsCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="rounded-md border border-[#1C2B22]/10 bg-white p-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-[#58646C]">{card.title}</h3>
                <Icon className="size-5 text-[#D79A2C]" />
              </div>
              <p className="mt-4 text-2xl font-semibold text-[#1C2B22]">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-[#1C2B22]/10">
        <nav className="-mb-px flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'border-[#D79A2C] text-[#1C2B22]'
                  : 'border-transparent text-[#58646C] hover:text-[#1C2B22]'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="overflow-hidden rounded-md border border-[#1C2B22]/10 bg-white">
        {activeTab === 'Payout History' && (
          <table className="w-full text-sm">
            <thead className="bg-[#F7F2E9] text-left">
              <tr>
                <th className="p-4 font-medium text-[#58646C]">Date</th>
                <th className="p-4 font-medium text-[#58646C]">Amount</th>
                <th className="p-4 font-medium text-[#58646C]">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockPayouts.map((payout) => (
                <tr key={payout.id} className="border-t border-[#1C2B22]/10">
                  <td className="p-4 text-[#58646C]">{payout.date}</td>
                  <td className="p-4 font-medium text-[#1C2B22]">
                    {payout.amount}
                  </td>
                  <td className="p-4">
                    <StatusPill status={payout.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {activeTab === 'Earning Breakdown' && (
          <table className="w-full text-sm">
            <thead className="bg-[#F7F2E9] text-left">
              <tr>
                <th className="p-4 font-medium text-[#58646C]">Date</th>
                <th className="p-4 font-medium text-[#58646C]">Student</th>
                <th className="p-4 font-medium text-[#58646C]">Class details</th>
                <th className="p-4 font-medium text-[#58646C]">Amount earned</th>
              </tr>
            </thead>
            <tbody>
              {mockEarningDetails.map((earning) => (
                <tr key={earning.id} className="border-t border-[#1C2B22]/10">
                  <td className="p-4 text-[#58646C]">{earning.date}</td>
                  <td className="p-4 font-medium text-[#1C2B22]">
                    {earning.student}
                  </td>
                  <td className="p-4 text-[#58646C]">{earning.class}</td>
                  <td className="p-4 font-medium text-[#1F6F54]">
                    {earning.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EarningsPage;
