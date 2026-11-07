import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { lora } from "@/lib/fonts";

export default function BookingSuccess() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F2E9] px-4">
      <div className="w-full max-w-md rounded-md border border-[#1C2B22]/10 bg-white p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-[#3f8a5f]" />
        <h1 className={`${lora.className} mt-4 text-xl font-semibold text-[#1C2B22]`}>Payment successful</h1>
        <p className="mt-2 text-sm text-[#58646C]">Your monthly fee has been received.</p>

        <button
          onClick={() => router.push("/parent/payments")}
          className="mt-6 w-full rounded-md bg-[#D79A2C] py-2.5 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
        >
          Go to dashboard
        </button>
      </div>
    </div>
  );
}
