import Input from "@/app/components/auth/common/input/input";
import Button from "../common/button/button";
import Select from "../common/select/select";
import PasswordStrengthMeter from "../common/passwordStrengthMeter/passwordStrengthMeter";

const testOptions = [
  { label: "United States", value: "US" },
  { label: "Italy", value: "IT" },
  { label: "Great Britain", value: "GB" },
  { label: "Australia", value: "AU" },
];

export const SignUpFormOne = () => {
  return (
    <form className="flex flex-col gap-4 w-full">
      <Input label="Email" type="email" placeholder="Email" name="email" />
      <Input
        label="Password"
        type="password"
        placeholder="Password"
        name="password"
      />
      <PasswordStrengthMeter />
      <Select label="Country of your business" options={testOptions} />
      <Button label="Sign up" />
    </form>
  );
};
