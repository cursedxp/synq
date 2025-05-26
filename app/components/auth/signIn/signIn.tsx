"use client";
import Button from "@/app/components/auth/common/button/button";
import Input from "@/app/components/auth/common/input/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/app/schemas/signIn/signin.schema";
import { useAuth } from "@/app/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SectionTitle from "../signUp/sections/sectionTitle";
interface SignInFromData {
  email: string;
  password: string;
}

export default function SignInForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFromData>({
    resolver: zodResolver(signInSchema),
  });

  const { signIn, error, loading } = useAuth();

  const onSubmit = async (data: SignInFromData) => {
    const result = await signIn(data);

    if (result?.ok && !result?.error) {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col w-sm gap-2">
        <SectionTitle
          title="Sign in"
          description="Welcome back! Let's continue your journey"
          h1ClassName="text-4xl"
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          {/* Email */}
          <Input
            label="Email"
            type="email"
            placeholder="Email"
            error={errors.email?.message}
            {...register("email")}
          />
          {/* Password */}
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            error={errors.password?.message}
            {...register("password")}
          />
          <Button label="Login" loading={loading} />
        </form>
        <div className="text-gray-500 text-sm flex justify-between">
          <div>
            Are you new here?{" "}
            <Link
              href="/auth/signup"
              className="font-bold text-black underline"
            >
              Sign up
            </Link>
          </div>
          <div className="flex text-sm text-black font-semibold underline">
            <Link href="/auth/password/forgot">Forgot password?</Link>
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
