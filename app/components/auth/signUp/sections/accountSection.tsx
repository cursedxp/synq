import Input from "@/app/components/auth/common/input/input";
import PasswordStrengthMeter from "../../common/passwordStrengthMeter/passwordStrengthMeter";
import SectionTitle from "./sectionTitle";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { AccountSchema } from "@/app/schemas/signup/account.schema";

interface AccountSectionProps {
  register: UseFormRegister<AccountSchema>;
  password: string;
  errors: FieldErrors<AccountSchema>;
}

export default function AccountSection({
  register,
  password,
  errors,
}: AccountSectionProps) {
  return (
    <>
      <SectionTitle
        title="Sign up"
        description="Create an account to get started"
        h1ClassName="text-4xl"
      />
      <div className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          placeholder="Email"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Password"
          {...register("password")}
          error={errors.password?.message}
        />
        <PasswordStrengthMeter password={password} />
      </div>
    </>
  );
}
