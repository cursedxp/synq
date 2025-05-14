import Input from "@/app/components/auth/common/input/input";
import Button from "../common/button/button";
import { Select } from "../common/select/select";
import PasswordStrengthMeter from "../common/passwordStrengthMeter/PasswordStrengthMeter";
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
      <Select label="Country of your business" />
      <Button label="Sign up" />
    </form>
  );
};
