"use client";
import Button from "../common/button/button";
import Input from "../common/input/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/app/schemas/signin/signin.schema";

interface SignInFromData {
  email: string;
  password: string;
}

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFromData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInFromData) => {
    console.log(data);
  };

  return (
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
      <Button label="Login" />
    </form>
  );
}
