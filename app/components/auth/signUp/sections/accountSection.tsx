import Input from "@/app/components/auth/common/input/input";
import PasswordStrengthMeter from "../../common/passwordStrengthMeter/passwordStrengthMeter";
import SectionTitle from "./sectionTitle";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { SignupSchema } from "@/app/schemas/signup/signup.schema";
import Link from "next/link";

interface AccountSectionProps {
  register: UseFormRegister<SignupSchema>;
  password: string;
  errors: FieldErrors<SignupSchema>;
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
        <div className="flex flex-col gap-1">
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              {...register("termsAccepted")}
              className="mt-1"
              id="termsAccepted"
            />
            <label className="text-sm text-gray-600" htmlFor="termsAccepted">
              By signing up, you agree to our{" "}
              <Link
                href="/terms-and-conditions"
                className="text-black font-semibold underline"
              >
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="text-black font-semibold underline"
              >
                Privacy Policy
              </Link>
            </label>
          </div>
          <div className="ml-5">
            {errors.termsAccepted && (
              <p className="text-red-500 text-sm mt-1">
                {errors.termsAccepted.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
