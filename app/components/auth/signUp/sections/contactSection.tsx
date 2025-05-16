import Input from "../../common/input/input";
import SectionTitle from "./sectionTitle";
import BackButton from "../../backButton/backButton";

export default function ContactSection({
  setCurrentStep,
  currentStep,
}: {
  setCurrentStep: (step: number) => void;
  currentStep: number;
}) {
  return (
    <>
      <BackButton setCurrentStep={setCurrentStep} currentStep={currentStep} />
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
