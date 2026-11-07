import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { lora } from "@/lib/fonts";

export default function PaymentSuccessPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F2E9] px-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md rounded-md border border-[#1C2B22]/10 bg-white p-8 text-center"
      >
        {/* ICON */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex justify-center"
        >
          <CheckCircle2 size={48} className="text-[#3f8a5f]" />
        </motion.div>

        {/* TITLE */}
        <h2 className={`${lora.className} mt-4 text-xl font-semibold text-[#1C2B22]`}>
          Payment successful
        </h2>

        {/* TEXT */}
        <p className="mt-2 text-sm text-[#58646C]">
          Aapka payment successfully ho gaya hai.
        </p>

        <p className="mt-1 text-sm text-[#9AA3AB]">
          Admin ke yahan settlement <b className="text-[#1C2B22]">pending</b> hai.
        </p>

        {/* BUTTON */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.01 }}
          onClick={() => router.push("/parent/payments")}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-[#D79A2C] py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
        >
          Go to payment summary
          <ArrowRight size={16} />
        </motion.button>
      </motion.div>
    </div>
  );
}
