import TutorDashboardLayout from "@/components/tutor-dashboard/TutorDashboardLayout";
import Link from "next/link";
import { CheckCircle2, Search, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";

/**
 * NOTE: The paid subscription / credits-and-plans system has been removed.
 * Leads are now fully free to unlock for every tutor — no credits,
 * payments, or plan gating of any kind.
 *
 * The original subscription page (plans, Razorpay checkout, revenue-share
 * info, feature comparison table) has been preserved as a backup at:
 *   frontend/src/_backup/tutor-subscription.original.tsx
 * (that file is outside the pages/ folder, so it is not a live route)
 */
const SubscriptionPage = () => {
  return (
    <TutorDashboardLayout>
      <div className="min-h-screen bg-[#F7F2E9] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-xl rounded-2xl border border-[#1C2B22]/10 bg-white p-8 sm:p-10 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#D79A2C]/10 border border-[#D79A2C]/25">
            <Sparkles className="h-8 w-8 text-[#D79A2C]" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold text-[#1C2B22] mb-3">
            Leads are now 100% free
          </h1>

          <p className="text-sm sm:text-base text-[#58646C] leading-relaxed mb-8">
            We've removed credits, plans and payments entirely. Every tutor can
            browse the leads marketplace and unlock any student requirement at
            no cost — simply request parent contact access and our team
            reviews it from the admin panel.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-left">
            <div className="rounded-xl border border-[#1C2B22]/10 p-4">
              <CheckCircle2 className="h-5 w-5 text-[#3f8a5f] mb-2" />
              <p className="text-xs font-semibold text-[#1C2B22]">No credits needed</p>
            </div>
            <div className="rounded-xl border border-[#1C2B22]/10 p-4">
              <ShieldCheck className="h-5 w-5 text-[#3f8a5f] mb-2" />
              <p className="text-xs font-semibold text-[#1C2B22]">Admin-reviewed access</p>
            </div>
            <div className="rounded-xl border border-[#1C2B22]/10 p-4">
              <MessageCircle className="h-5 w-5 text-[#3f8a5f] mb-2" />
              <p className="text-xs font-semibold text-[#1C2B22]">Direct parent contact</p>
            </div>
          </div>

          <Link href="/tutor/leads">
            <button className="inline-flex items-center justify-center gap-2 rounded-md bg-[#D79A2C] px-7 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]">
              <Search className="h-4 w-4" />
              Browse the leads marketplace
            </button>
          </Link>
        </div>
      </div>
    </TutorDashboardLayout>
  );
};

export default SubscriptionPage;
