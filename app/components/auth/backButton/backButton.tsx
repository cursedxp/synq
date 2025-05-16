import { HiArrowLeft } from "react-icons/hi";

export default function BackButton({
  setCurrentStep,
  currentStep,
}: {
  setCurrentStep: (step: number) => void;
  currentStep: number;
}) {
  return (
    <button
      className="mb-4 cursor-pointer border border-zinc-200 p-2 rounded-full w-fit hover:bg-zinc-200"
      onClick={() => {
        setCurrentStep(currentStep - 1);
      }}
    >
      <HiArrowLeft className="w-4 h-4" />
    </button>
  );
}
