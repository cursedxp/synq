import Input from "@/app/components/auth/common/input/input";
import PasswordStrengthMeter from "../../common/passwordStrengthMeter/passwordStrengthMeter";
import SectionTitle from "./sectionTitle";

export default function AccountSection() {
  return (
    <>
      <SectionTitle
        title="Sign up"
        description="Create an account to get started"
        h1ClassName="text-4xl"
      />
      <div className="flex flex-col gap-4">
        <Input label="Email" type="email" placeholder="Email" name="email" />
        <Input
          label="Password"
          type="password"
          placeholder="Password"
          name="password"
        />
        <PasswordStrengthMeter />
      </div>
    </>
  );
}
