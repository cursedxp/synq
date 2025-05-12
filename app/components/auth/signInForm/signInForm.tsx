"use client";
import Button from "../common/button/button";
import Input from "../common/input/input";
import { signInSchema } from "@/app/schemas/signin/signin.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      // TODO: Implement sign in logic
      console.log(data);
    } catch (error) {
      console.error(error);
    }
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
        {...register("email")}
        placeholder="Email"
        error={errors.email?.message}
      />
      {/* Password */}
      <Input
        label="Password"
        type="password"
        {...register("password")}
        placeholder="Password"
        error={errors.password?.message}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
