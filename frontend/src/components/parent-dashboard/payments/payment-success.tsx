"use client";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Lora } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"] });

export default function PaymentSuccessPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md rounded-md border border-[#1C2B22]/10 bg-white p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-[#3f8a5f]" />

        <h2 className={`${lora.className} mt-4 text-xl font-semibold text-[#1C2B22]`}>Payment successful</h2>

        <p className="mt-3 text-sm text-[#58646C]">Aapka payment successfully ho gaya hai.</p>

        <p className="mt-2 text-sm text-[#9AA3AB]">
          Admin ke yahan settlement <b className="text-[#1C2B22]">pending</b> hai.
        </p>

        <button
          onClick={() => router.push("/parent/payments")}
          className="mt-6 w-full rounded-md bg-[#D79A2C] py-2.5 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
        >
          Go to payment summary
        </button>
      </div>
    </div>
  );
}
