import Link from 'next/link';

import ParentDashboardLayout from '@/layouts/ParentDashboardLayout';
import { Lora } from 'next/font/google';

const lora = Lora({ subsets: ['latin'], weight: ['500', '600'] });

const inputClass = "w-full rounded-md border border-[#1C2B22]/15 px-3 py-2 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]";

export default function AddCardPage() {
  return (
    <ParentDashboardLayout>
      <div className="mb-4">
        <h1 className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>Add new card</h1>
        <p className="text-sm text-[#58646C]">Enter your card details to save a payment method.</p>
      </div>

      <form className="space-y-4 rounded-md border border-[#1C2B22]/10 bg-white p-6">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#1C2B22]">Cardholder name</label>
          <input className={inputClass} placeholder="Name on card" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#1C2B22]">Card number</label>
          <input className={inputClass} placeholder="4242 4242 4242 4242" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#1C2B22]">Expiry</label>
            <input className={inputClass} placeholder="MM/YY" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#1C2B22]">CVC</label>
            <input className={inputClass} placeholder="CVC" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#1C2B22]">ZIP</label>
            <input className={inputClass} placeholder="ZIP" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="rounded-md bg-[#D79A2C] px-4 py-2 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]">
            Save card
          </button>
          <Link href="/parent/payment-methods" className="text-sm font-medium text-[#58646C] hover:text-[#1C2B22]">
            Cancel
          </Link>
        </div>
      </form>
    </ParentDashboardLayout>
  );
}
