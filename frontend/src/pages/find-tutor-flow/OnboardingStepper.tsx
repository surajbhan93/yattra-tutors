import { motion } from 'framer-motion';

interface StepperProps {
  currentStep: number; // 1,2,3
}

const steps = ['Create account', 'Preferences', 'Tutor match'];

const OnboardingStepper: React.FC<StepperProps> = ({ currentStep }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={label} className="flex-1 flex flex-col items-center">
              {/* Circle */}
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isCompleted ? '#D79A2C' : isActive ? '#0E211C' : '#E5E1D6',
                  color: isCompleted ? '#17261D' : isActive ? '#F7F2E9' : '#9AA3AB',
                  scale: isActive ? 1.08 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold"
              >
                {isCompleted ? '✓' : stepNumber}
              </motion.div>

              {/* Label */}
              <span
                className={`text-xs mt-2 text-center ${
                  isActive ? 'text-[#1C2B22] font-medium' : 'text-[#9AA3AB]'
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="relative mt-4 h-1 rounded-full bg-[#1C2B22]/[.08]">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / steps.length) * 100}%` }}
          transition={{ duration: 0.5 }}
          className="absolute left-0 top-0 h-1 rounded-full bg-[#D79A2C]"
        />
      </div>

      <p className="text-center text-xs text-[#9AA3AB] mt-2">
        Step {currentStep} of {steps.length}
      </p>
    </div>
  );
};

export default OnboardingStepper;
