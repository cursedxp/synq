import Input from "../../common/input/input";
import SectionTitle from "./sectionTitle";
import CountrySelect from "../../common/select/countrySelect";
import BackButton from "../../backButton/backButton";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { SignupSchema } from "@/app/schemas/signUp/signup.schema";

const testOptions = [
  { label: "United States", value: "US" },
  { label: "Italy", value: "IT" },
  { label: "Great Britain", value: "GB" },
  { label: "Australia", value: "AU" },
];

interface AddressSectionProps {
  register: UseFormRegister<SignupSchema>;
  errors: FieldErrors<SignupSchema>;
  setCurrentStep: (step: number) => void;
  currentStep: number;
}

export default function AddressSection({
  register,
  errors,
  setCurrentStep,
  currentStep,
}: AddressSectionProps) {
  return (
    <>
      <BackButton setCurrentStep={setCurrentStep} currentStep={currentStep} />
      <SectionTitle
        title="Address details"
        description="Please provide your address to create your account."
      />
      <div className="flex flex-col gap-2">
        <Input
          label="Address line 1"
          type="text"
          placeholder="Address line 1"
          {...register("addressLine1")}
          error={errors.addressLine1?.message}
        />
        <Input
          label="Address line 2"
          type="text"
          placeholder="Address line 2"
          {...register("addressLine2")}
          error={errors.addressLine2?.message}
        />
        <div className="flex items-center gap-2">
          <CountrySelect
            label="Country"
            options={testOptions}
            className="pl-10"
            {...register("country")}
          />
          <Input
            label="City"
            type="text"
            placeholder="City"
            className="mt-1"
            {...register("city")}
          />
        </div>
        {(errors.city || errors.country) && (
          <div className="min-h-[20px] flex gap-4 text-red-500 text-sm ">
            <div className="flex items-center flex-1">
              {errors.country?.message}
            </div>
            <div className="flex items-center flex-1">
              {errors.city?.message}
            </div>
          </div>
        )}
        <Input
          label="State"
          type="text"
          placeholder="State"
          {...register("state")}
          error={errors.state?.message}
        />
        <Input
          label="Zip"
          type="text"
          placeholder="Zip"
          {...register("zip")}
          error={errors.zip?.message}
        />
      </div>
    </>
  );
}
