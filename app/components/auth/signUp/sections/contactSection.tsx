import { HiArrowLeft } from "react-icons/hi";
import Input from "../../common/input/input";
import SectionTitle from "./sectionTitle";

export default function ContactSection({
  setCurrentStep,
}: {
  setCurrentStep: (step: number) => void;
}) {
  return (
    <>
      <button
        className="mb-4 cursor-pointer border border-zinc-200 p-2 rounded-full w-fit hover:bg-zinc-300"
        onClick={() => {
          setCurrentStep(1);
        }}
      >
        <HiArrowLeft className="w-4 h-4" />
      </button>
      <SectionTitle
        title="Contact details"
        description="Please provide your contact details to create your account."
        h1ClassName="text-2xl"
      />
      <div className="flex flex-col gap-4">
        <div className="flex  gap-2">
          <Input label="First name" type="text" placeholder="First name" />
          <Input label="Last name" type="text" placeholder="Last name" />
        </div>
        <Input label="Company name" type="text" placeholder="Company name" />
        <Input label="Phone number" type="tel" placeholder="Phone number" />
      </div>
    </>
  );
}
