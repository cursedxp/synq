import Input from "../../common/input/input";
import SectionTitle from "./sectionTitle";
import CountrySelect from "../../common/select/countrySelect";
import BackButton from "../../backButton/backButton";
const testOptions = [
  { label: "United States", value: "US" },
  { label: "Italy", value: "IT" },
  { label: "Great Britain", value: "GB" },
  { label: "Australia", value: "AU" },
];

export default function AddressSection({
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
        title="Address details"
        description="Please provide your address to create your account."
      />
      <div className="flex flex-col gap-2">
        <Input
          label="Address line 1"
          type="text"
          placeholder="Address line 1"
        />
        <Input
          label="Address line 2"
          type="text"
          placeholder="Address line 2"
        />
        <div className="flex items-center gap-2">
          <CountrySelect
            label="Country"
            options={testOptions}
            className="pl-10"
          />
          <Input label="City" type="text" placeholder="City" className="mt-1" />
        </div>
        <Input label="State" type="text" placeholder="State" />

        <Input label="Zip" type="text" placeholder="Zip" />
      </div>
    </>
  );
}
