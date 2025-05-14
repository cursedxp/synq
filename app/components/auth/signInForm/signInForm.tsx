"use client";
import Button from "../common/button/button";
import Input from "../common/input/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/app/schemas/signin/signin.schema";
import { useAuth } from "@/app/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
    console.log(result);
    if (result?.ok && !result?.error) {
      router.push("/");
    }
  };

  return (
    <>
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
          <Link href="/auth/signup" className="font-bold text-black underline">
            Sign up
          </Link>
        </div>
        <div className="flex text-sm text-black font-semibold underline">
          <Link href="/auth/forgot-password">Forgot password?</Link>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
