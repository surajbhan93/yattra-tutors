import { motion } from "framer-motion";
import { LogOut, XCircle } from "lucide-react";
import { lora } from "@/lib/fonts";

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

const LogoutConfirm = ({ onConfirm, onCancel }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative w-full max-w-sm overflow-hidden rounded-md border border-[#1C2B22]/10 bg-white"
    >
      {/* Header */}
      <div className="bg-[#0E211C] px-6 py-5 text-[#F7F2E9]">
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D79A2C]/30">
            <LogOut className="h-6 w-6 text-[#D79A2C]" />
          </div>
        </div>

        <h3 className={`${lora.className} mt-3 text-center text-lg font-semibold`}>
          Confirm logout
        </h3>
      </div>

      {/* BODY */}
      <div className="px-6 py-6 text-center">
        <p className="text-sm text-[#1C2B22]">
          Are you sure you want to logout from the admin panel?
        </p>

        <p className="mt-2 text-xs text-[#9AA3AB]">
          You will need to login again to access the dashboard.
        </p>

        {/* ACTIONS */}
        <div className="mt-6 flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onCancel}
            className="flex items-center gap-2 rounded-md border border-[#1C2B22]/15 px-4 py-2 text-sm font-medium text-[#1C2B22] hover:bg-[#F7F2E9]"
          >
            <XCircle className="h-4 w-4" />
            Cancel
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onConfirm}
            className="flex items-center gap-2 rounded-md bg-[#D79A2C] px-4 py-2 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default LogoutConfirm;
