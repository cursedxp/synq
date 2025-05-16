import { motion } from "framer-motion";
type StepperProps = {
  currentStep: number;
  className?: string;
};

export default function Stepper({ currentStep, className }: StepperProps) {
  return (
    <div className={`w-sm flex gap-4 ${className}`}>
      <div className="flex-1">
        <div className="flex items-center gap-1 bg-zinc-100 rounded-sm h-1 w-full mb-1 relative">
          <div className="absolute top-0 left-0 w-full">
            {currentStep === 1 && (
              <motion.div
                className={`h-1 bg-zinc-900 rounded-sm`}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            )}
          </div>
        </div>
        <p
          className={`text-xs font-semibold ${currentStep === 1 ? "text-zinc-900 " : "text-zinc-400"}`}
        >
          Account
        </p>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-1 bg-zinc-100 rounded-sm h-1 w-full mb-1 relative">
          <div className="absolute top-0 left-0 w-full">
            {currentStep === 2 && (
              <motion.div
                className={`h-1 bg-zinc-900 rounded-sm`}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            )}
          </div>
        </div>
        <p
          className={`text-xs font-semibold ${
            currentStep === 2 ? "text-zinc-900 " : "text-zinc-400"
          }`}
        >
          Contact
        </p>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-1 bg-zinc-100 rounded-sm h-1 w-full mb-1 relative">
          <div className="absolute top-0 left-0 w-full">
            {currentStep === 3 && (
              <motion.div
                className={`h-1 bg-zinc-900 rounded-sm`}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            )}
          </div>
        </div>
        <p
          className={`text-xs font-semibold ${
            currentStep === 3 ? "text-zinc-900" : "text-zinc-400"
          }`}
        >
          Address
        </p>
      </div>
    </div>
  );
}
