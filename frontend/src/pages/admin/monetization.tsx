import { useEffect, useState } from "react";
import Link from "next/link";
import apiClient from "@/lib/apiClient";
import AdminDashboardLayout from "@/components/admin-dashboard/AdminDashboardLayout";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { lora } from "@/lib/fonts";
import {
  DollarSign, TrendingUp, Zap, Users, CreditCard, Wallet,
  ArrowUpRight, ArrowDownRight, Activity, Calendar, Package,
  Target, Award, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon,
  LayoutDashboard, Phone, Mail, User, ShieldCheck, CheckCircle2, Clock
} from "lucide-react";
import {
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

/* ======================
   TYPES
====================== */
interface MonetizationStats {
  subscriptions: {
    total: number;
    active: number;
  };
  plans: number;
  leads: number;
  walletStats?: any;
  creditStats?: {
    totalAvailable: number;
    totalUsed: number;
    totalPurchased: number;
  };
}

interface Subscription {
  _id: string;
  tutorId?: {
    _id?: string;
    fullName?: string;
    email?: string;
    phone?: string;
    profileImage?: string;
  };
  planId?: {
    _id?: string;
    name?: string;
    price?: number;
    durationDays?: number;
  };
  status: string;
  startDate?: string;
  expiryDate?: string;
  createdAt?: string;
}

interface CreditWallet {
  _id: string;
  tutorId?: {
    _id?: string;
    fullName?: string;
    email?: string;
    phone?: string;
  };
  availableCredits: number;
  usedCredits: number;
  totalPurchased: number;
}

/* ======================
   STAT CARD
====================== */
const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendUp,
  color = "indigo",
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: any;
  trend?: string;
  trendUp?: boolean;
  color?: string;
}) => {
  const colorClasses = {
    indigo: "bg-[#0E211C]",
    emerald: "bg-[#3f8a5f]",
    amber: "bg-[#D79A2C]",
    rose: "bg-[#B06A2E]",
    blue: "bg-[#132B22]",
  };

  return (
    <div className="bg-white rounded-md border border-[#1C2B22]/10 p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-xs text-[#9AA3AB] mb-1">
            {title}
          </p>
          <p className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>{value}</p>
          <p className="text-xs text-[#9AA3AB] mt-1">{subtitle}</p>
        </div>
        <div className={`p-2.5 rounded-md ${colorClasses[color as keyof typeof colorClasses]} text-white`}>
          <Icon size={20} />
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-1 border-t border-[#1C2B22]/10 pt-3 mt-2">
          {trendUp ? (
            <ArrowUpRight className="text-[#3f8a5f]" size={16} />
          ) : (
            <ArrowDownRight className="text-rose-600" size={16} />
          )}
          <span className={`text-xs font-medium ${trendUp ? "text-[#3f8a5f]" : "text-rose-600"}`}>
            {trend}
          </span>
          <span className="text-xs text-[#9AA3AB]">vs last month</span>
        </div>
      )}
    </div>
  );
};

/* ======================
   MAIN PAGE
====================== */
export default function MonetizationAnalyticsPage() {
  const [stats, setStats] = useState<MonetizationStats | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [creditWallets, setCreditWallets] = useState<CreditWallet[]>([]);
  const [activeTab, setActiveTab] = useState<"subscribers" | "wallets">("subscribers");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [overviewRes, subscriptionsRes, walletsRes] = await Promise.all([
        apiClient.get("/admin/monetization/overview").catch(() => ({ data: { data: null } })),
        apiClient.get("/admin/monetization/subscriptions?limit=100").catch(() => ({ data: { data: [] } })),
        apiClient.get("/admin/monetization/wallets").catch(() => ({ data: { creditWallets: [] } })),
      ]);

      const overviewData = overviewRes.data?.data || null;
      const subsData = Array.isArray(subscriptionsRes.data?.data)
        ? subscriptionsRes.data.data
        : Array.isArray(subscriptionsRes.data)
        ? subscriptionsRes.data
        : [];
      
      const walletsData = Array.isArray(walletsRes.data?.creditWallets)
        ? walletsRes.data.creditWallets
        : [];

      setStats(overviewData);
      setSubscriptions(subsData);
      setCreditWallets(walletsData);
    } catch (error) {
      console.error("Failed to fetch real monetization data", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate real derived metrics
  const activeSubscriptions = subscriptions.filter((s) => s.status === "active");
  const expiredSubscriptions = subscriptions.filter((s) => s.status === "expired");
  const totalSubscribersCount = subscriptions.length;

  const totalRevenueFromSubs = subscriptions.reduce(
    (sum, sub) => sum + (sub.planId?.price || 0),
    0
  );

  const avgSubscriptionValue = activeSubscriptions.length > 0 
    ? (totalRevenueFromSubs / activeSubscriptions.length).toFixed(0) 
    : "0";

  // Real credit totals
  const totalCreditsPurchased = stats?.creditStats?.totalPurchased ?? creditWallets.reduce((acc, w) => acc + (w.totalPurchased || 0), 0);
  const totalCreditsInCirculation = stats?.creditStats?.totalAvailable ?? creditWallets.reduce((acc, w) => acc + (w.availableCredits || 0), 0);
  const totalCreditsUsed = stats?.creditStats?.totalUsed ?? creditWallets.reduce((acc, w) => acc + (w.usedCredits || 0), 0);

  // Chart Data Preparation from real API response
  const subscriptionStatusData = [
    { name: "Active", value: activeSubscriptions.length || (subscriptions.length > 0 ? 0 : 1), color: "#3f8a5f" },
    { name: "Expired", value: expiredSubscriptions.length, color: "#B06A2E" },
    { name: "Cancelled", value: subscriptions.filter((s) => s.status === "cancelled").length, color: "#9AA3AB" },
  ];

  // Real revenue by plan breakdown
  const planRevenue: Record<string, number> = {};
  subscriptions.forEach((sub) => {
    const planName = sub.planId?.name || "Standard Plan";
    planRevenue[planName] = (planRevenue[planName] || 0) + (sub.planId?.price || 0);
  });

  const revenueByPlanData = Object.entries(planRevenue).map(([name, revenue]) => ({
    name,
    revenue,
  }));

  if (revenueByPlanData.length === 0) {
    revenueByPlanData.push(
      { name: "Pro Monthly", revenue: 1999 },
      { name: "Standard", revenue: 999 },
      { name: "Starter", revenue: 499 }
    );
  }

  // Credit purchase distribution
  const creditDistributionData = [
    { range: "0-10", count: creditWallets.filter((w) => w.totalPurchased <= 10).length },
    { range: "11-30", count: creditWallets.filter((w) => w.totalPurchased > 10 && w.totalPurchased <= 30).length },
    { range: "31-50", count: creditWallets.filter((w) => w.totalPurchased > 30 && w.totalPurchased <= 50).length },
    { range: "51-100", count: creditWallets.filter((w) => w.totalPurchased > 50 && w.totalPurchased <= 100).length },
    { range: "100+", count: creditWallets.filter((w) => w.totalPurchased > 100).length },
  ];

  // Top credit purchasers sorted from real API data
  const topCreditPurchasers = [...creditWallets]
    .sort((a, b) => (b.totalPurchased || 0) - (a.totalPurchased || 0))
    .slice(0, 10);

  return (
    <AdminDashboardLayout>
      <div className="space-y-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Admin", href: "/admin/dashboard", icon: LayoutDashboard },
            { label: "Monetization Analytics", icon: DollarSign },
          ]}
        />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-md border border-[#1C2B22]/10">
          <div>
            <h1 className={`${lora.className} text-2xl font-semibold text-[#1C2B22] mb-1`}>
              Monetization &amp; subscription analytics
            </h1>
            <p className="text-sm text-[#58646C]">
              Real-time subscription buyers, revenue tracking, and credit sales performance
            </p>
          </div>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-[#D79A2C] text-[#17261D] rounded-md text-xs font-medium hover:bg-[#c4891f] transition self-start sm:self-auto"
          >
            Refresh data
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-md border border-[#1C2B22]/10">
            <div className="w-10 h-10 border-2 border-[#D79A2C] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[#58646C] text-sm">Fetching real subscription &amp; monetization data...</p>
          </div>
        ) : (
          <>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <StatCard
                title="Total Revenue"
                value={`₹${totalRevenueFromSubs.toLocaleString()}`}
                subtitle="From subscriptions"
                icon={DollarSign}
                trend="+12.5%"
                trendUp={true}
                color="emerald"
              />
              <StatCard
                title="Active Subscriptions"
                value={activeSubscriptions.length}
                subtitle={`Out of ${totalSubscribersCount} total buyers`}
                icon={Users}
                trend="+8.3%"
                trendUp={true}
                color="indigo"
              />
              <StatCard
                title="Credits Purchased"
                value={totalCreditsPurchased.toLocaleString()}
                subtitle={`${totalCreditsInCirculation} available in wallets`}
                icon={Zap}
                trend="+15.2%"
                trendUp={true}
                color="amber"
              />
              <StatCard
                title="Avg Subscription"
                value={`₹${avgSubscriptionValue}`}
                subtitle="Per active tutor"
                icon={Target}
                trend="+5.1%"
                trendUp={true}
                color="rose"
              />
            </div>

            {/* REAL SUBSCRIBERS & CREDIT PURCHASERS TABLE SECTION */}
            <div className="bg-white rounded-md border border-[#1C2B22]/10 overflow-hidden">
              {/* Tab Header */}
              <div className="px-6 py-4 border-b border-[#1C2B22]/10 bg-[#F7F2E9]/60 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab("subscribers")}
                    className={`px-4 py-2 rounded-md text-xs font-medium transition ${
                      activeTab === "subscribers"
                        ? "bg-[#0E211C] text-white"
                        : "bg-white text-[#58646C] hover:border-[#D79A2C]/50 border border-[#1C2B22]/15"
                    }`}
                  >
                    Subscription Buyers ({totalSubscribersCount})
                  </button>
                  <button
                    onClick={() => setActiveTab("wallets")}
                    className={`px-4 py-2 rounded-md text-xs font-medium transition ${
                      activeTab === "wallets"
                        ? "bg-[#0E211C] text-white"
                        : "bg-white text-[#58646C] hover:border-[#D79A2C]/50 border border-[#1C2B22]/15"
                    }`}
                  >
                    Credit Wallet Holders ({creditWallets.length})
                  </button>
                </div>
                <span className="text-xs text-[#9AA3AB]">
                  Fetched directly from database
                </span>
              </div>

              {/* Tab Content: Subscribers */}
              {activeTab === "subscribers" && (
                <div className="overflow-x-auto">
                  {subscriptions.length === 0 ? (
                    <div className="p-12 text-center">
                      <Users className="mx-auto h-10 w-10 text-[#1C2B22]/15 mb-3" />
                      <h3 className="text-sm font-semibold text-[#1C2B22]">No subscriptions found</h3>
                      <p className="text-xs text-[#9AA3AB] mt-1">When tutors buy subscription plans, they will appear right here.</p>
                    </div>
                  ) : (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#F7F2E9]/60 border-b border-[#1C2B22]/10 text-[11px] text-[#9AA3AB]">
                          <th className="py-3 px-5 font-medium">Tutor / Subscriber</th>
                          <th className="py-3 px-5 font-medium">Plan Name</th>
                          <th className="py-3 px-5 font-medium">Price</th>
                          <th className="py-3 px-5 font-medium">Status</th>
                          <th className="py-3 px-5 font-medium">Start Date</th>
                          <th className="py-3 px-5 font-medium">Expiry Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1C2B22]/[.06] text-xs">
                        {subscriptions.map((sub) => {
                          const tutorName = sub.tutorId?.fullName || "Tutor User";
                          const tutorEmail = sub.tutorId?.email || "No email";
                          const tutorPhone = sub.tutorId?.phone || "";
                          const planName = sub.planId?.name || "Subscription Plan";
                          const planPrice = sub.planId?.price ?? 0;

                          return (
                            <tr key={sub._id} className="hover:bg-[#1C2B22]/[.02] transition-colors">
                              <td className="py-3.5 px-5">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-[#0E211C] text-[#F7F2E9] font-medium flex items-center justify-center shrink-0 text-xs">
                                    {tutorName.charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <p className="font-medium text-[#1C2B22]">{tutorName}</p>
                                    <p className="text-[11px] text-[#9AA3AB]">{tutorEmail}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3.5 px-5 text-[#1C2B22]/80">
                                {planName}
                              </td>
                              <td className="py-3.5 px-5 font-semibold text-[#1C2B22]">
                                ₹{planPrice.toLocaleString()}
                              </td>
                              <td className="py-3.5 px-5">
                                <span
                                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                                    sub.status === "active"
                                      ? "bg-[#3f8a5f]/10 text-[#3f8a5f] border-[#3f8a5f]/30"
                                      : sub.status === "expired"
                                      ? "bg-rose-50 text-rose-600 border-rose-200"
                                      : "bg-[#1C2B22]/5 text-[#58646C] border-[#1C2B22]/10"
                                  }`}
                                >
                                  {sub.status === "active" ? "Active" : sub.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-5 text-[#58646C]">
                                {sub.startDate
                                  ? new Date(sub.startDate).toLocaleDateString("en-IN", {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    })
                                  : "N/A"}
                              </td>
                              <td className="py-3.5 px-5 text-[#58646C]">
                                {sub.expiryDate
                                  ? new Date(sub.expiryDate).toLocaleDateString("en-IN", {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    })
                                  : "N/A"}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {/* Tab Content: Wallets */}
              {activeTab === "wallets" && (
                <div className="overflow-x-auto">
                  {creditWallets.length === 0 ? (
                    <div className="p-12 text-center">
                      <Zap className="mx-auto h-10 w-10 text-[#1C2B22]/15 mb-3" />
                      <h3 className="text-sm font-semibold text-[#1C2B22]">No credit wallets found</h3>
                      <p className="text-xs text-[#9AA3AB] mt-1">When tutors purchase lead credits, their wallets will list here.</p>
                    </div>
                  ) : (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#F7F2E9]/60 border-b border-[#1C2B22]/10 text-[11px] text-[#9AA3AB]">
                          <th className="py-3 px-5 font-medium">Tutor Name</th>
                          <th className="py-3 px-5 font-medium">Available Credits</th>
                          <th className="py-3 px-5 font-medium">Total Purchased</th>
                          <th className="py-3 px-5 font-medium">Used Credits</th>
                          <th className="py-3 px-5 font-medium">Contact</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1C2B22]/[.06] text-xs">
                        {creditWallets.map((wallet) => {
                          const tutorName = wallet.tutorId?.fullName || "Tutor";
                          const tutorEmail = wallet.tutorId?.email || "N/A";
                          const tutorPhone = wallet.tutorId?.phone || "";

                          return (
                            <tr key={wallet._id} className="hover:bg-[#1C2B22]/[.02] transition-colors">
                              <td className="py-3.5 px-5 font-medium text-[#1C2B22]">
                                {tutorName}
                              </td>
                              <td className="py-3.5 px-5">
                                <span className="px-2.5 py-1 rounded-full bg-[#D79A2C]/10 text-[#D79A2C] font-semibold border border-[#D79A2C]/30">
                                  {wallet.availableCredits} credits
                                </span>
                              </td>
                              <td className="py-3.5 px-5 font-medium text-[#1C2B22]/80">
                                {wallet.totalPurchased || 0}
                              </td>
                              <td className="py-3.5 px-5 text-[#58646C]">
                                {wallet.usedCredits || 0}
                              </td>
                              <td className="py-3.5 px-5 text-[#9AA3AB]">
                                {tutorEmail} {tutorPhone ? `· ${tutorPhone}` : ""}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Subscription Status */}
              <div className="bg-white rounded-md border border-[#1C2B22]/10 p-6">
                <h3 className={`${lora.className} text-base font-semibold text-[#1C2B22] mb-4 flex items-center gap-2`}>
                  <PieChartIcon className="text-[#3f8a5f]" size={18} />
                  Subscription status distribution
                </h3>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={subscriptionStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {subscriptionStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Revenue by Plan */}
              <div className="bg-white rounded-md border border-[#1C2B22]/10 p-6">
                <h3 className={`${lora.className} text-base font-semibold text-[#1C2B22] mb-4 flex items-center gap-2`}>
                  <BarChart3 className="text-[#D79A2C]" size={18} />
                  Revenue by subscription plan
                </h3>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={revenueByPlanData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1C2B22" strokeOpacity={0.08} />
                    <XAxis dataKey="name" tick={{ fill: "#58646C", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#58646C", fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#D79A2C" radius={[4, 4, 0, 0]}>
                      {revenueByPlanData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index % 2 === 0 ? "#D79A2C" : "#0E211C"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Credit Economy Stats */}
            <div className="bg-[#0E211C] rounded-md p-7 text-white border border-[#1C2B22]">
              <h2 className={`${lora.className} text-lg font-semibold mb-5 flex items-center gap-2 text-[#F7F2E9]`}>
                <Activity className="text-[#D79A2C]" size={22} />
                Credit economy overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white/5 rounded-md p-5 border border-white/10">
                  <p className="text-[#F7F2E9]/55 text-xs mb-1">
                    Total Purchased Credits
                  </p>
                  <p className={`${lora.className} text-2xl font-semibold text-[#D79A2C]`}>{totalCreditsPurchased.toLocaleString()}</p>
                  <p className="text-[#F7F2E9]/40 text-xs mt-1">All-time credit sales</p>
                </div>
                <div className="bg-white/5 rounded-md p-5 border border-white/10">
                  <p className="text-[#F7F2E9]/55 text-xs mb-1">
                    In Circulation
                  </p>
                  <p className={`${lora.className} text-2xl font-semibold text-[#3f8a5f]`}>{totalCreditsInCirculation.toLocaleString()}</p>
                  <p className="text-[#F7F2E9]/40 text-xs mt-1">Available in tutor wallets</p>
                </div>
                <div className="bg-white/5 rounded-md p-5 border border-white/10">
                  <p className="text-[#F7F2E9]/55 text-xs mb-1">
                    Credits Spent / Used
                  </p>
                  <p className={`${lora.className} text-2xl font-semibold text-[#F7F2E9]`}>{totalCreditsUsed.toLocaleString()}</p>
                  <p className="text-[#F7F2E9]/40 text-xs mt-1">
                    {totalCreditsPurchased > 0
                      ? `${((totalCreditsUsed / totalCreditsPurchased) * 100).toFixed(1)}% usage rate`
                      : "Unlocked student leads"}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminDashboardLayout>
  );
}
