import Input from "@/app/components/auth/common/input/input";
import Button from "../common/button/button";
import CountrySelect from "../common/select/countrySelect";
import PasswordStrengthMeter from "../common/passwordStrengthMeter/passwordStrengthMeter";
import Link from "next/link";
const testOptions = [
  { label: "United States", value: "US" },
  { label: "Italy", value: "IT" },
  { label: "Great Britain", value: "GB" },
  { label: "Australia", value: "AU" },
];

export const SignUpFormOne = () => {
  return (
    <>
      <form className="flex flex-col gap-4 w-full">
        <Input label="Email" type="email" placeholder="Email" name="email" />
        <Input
          label="Password"
          type="password"
          placeholder="Password"
          name="password"
        />
        <PasswordStrengthMeter />
        <CountrySelect
          label="Country of your business"
          options={testOptions}
          className="pl-10"
        />
        <Button label="Next" />
      </form>
      <div className="text-gray-500 text-sm flex">
        <div>
          Already registered?{" "}
          <Link href="/auth/signin" className="font-bold text-black underline">
            Sign in
          </Link>
        </div>
      </div>
    </>
  );
};
