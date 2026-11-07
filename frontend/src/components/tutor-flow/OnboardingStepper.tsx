import { motion } from "framer-motion";
import { Check, UserCheck, PhoneCall, ShieldCheck } from "lucide-react";
import { lora } from "@/lib/fonts";

type Props = {
  currentStep: number; // 1, 2, 3
};

const steps = [
  { id: 1, title: "Fill Registration Form", icon: UserCheck, desc: "Profile & documents" },
  { id: 2, title: "Verify Phone (OTP)", icon: PhoneCall, desc: "Instant SMS code" },
  { id: 3, title: "Approval & Live Profile", icon: ShieldCheck, desc: "Get parent leads" },
];

const OnboardingStepper = ({ currentStep }: Props) => {
  return (
    <div className="w-full rounded-lg bg-[#0E211C] p-4 md:p-5 text-white border border-[#D79A2C]/15">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const Icon = step.icon;

          return (
            <div key={step.id} className="flex flex-1 items-center gap-3">
              {/* CIRCLE ICON */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`${lora.className} flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-semibold transition-all
                  ${
                    isCompleted
                      ? "bg-emerald-600 text-white"
                      : isActive
                      ? "bg-[#D79A2C] text-[#17261D]"
                      : "bg-white/10 text-[#7C9484] border border-white/10"
                  }
                `}
              >
                {isCompleted ? <Check size={20} strokeWidth={3} /> : <Icon size={20} />}
              </motion.div>

              {/* TEXT */}
              <div className="flex flex-col">
                <span className="text-[11px] font-medium text-[#D79A2C]">
                  Step {step.id}
                </span>
                <span
                  className={`text-xs md:text-sm font-semibold leading-tight
                    ${
                      isActive
                        ? "text-white"
                        : isCompleted
                        ? "text-emerald-300"
                        : "text-[#7C9484]"
                    }
                  `}
                >
                  {step.title}
                </span>
                <span className="text-[11px] text-[#7C9484] hidden sm:inline-block mt-0.5">
                  {step.desc}
                </span>
              </div>

              {/* CONNECTING LINE (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block flex-1 h-px mx-4 bg-[#D79A2C]/15" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OnboardingStepper;
