import Input from "../../common/input/input";
import SectionTitle from "./sectionTitle";
import BackButton from "../../backButton/backButton";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { SignupSchema } from "@/app/schemas/signUp/signup.schema";

interface ContactSectionProps {
  register: UseFormRegister<SignupSchema>;
  errors: FieldErrors<SignupSchema>;
  setCurrentStep: (step: number) => void;
  currentStep: number;
}

export default function ContactSection({
  register,
  errors,
  setCurrentStep,
  currentStep,
}: ContactSectionProps) {
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
          <Input
            label="First name"
            type="text"
            placeholder="First name"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
          <Input
            label="Last name"
            type="text"
            placeholder="Last name"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
        </div>
        <Input
          label="Company name"
          type="text"
          placeholder="Company name"
          {...register("companyName")}
          error={errors.companyName?.message}
        />
        <Input
          label="Phone number"
          type="tel"
          placeholder="Phone number"
          {...register("phone")}
          error={errors.phone?.message}
        />
      </div>
    </>
  );
}
