"use client";

import Button from "../common/button/button";
import Input from "../common/input/input";
import SectionTitle from "../signUp/sections/sectionTitle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from "@/app/schemas/forgotPassword/forgotPassword.schema";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordSchema) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col w-full relative items-center justify-center">
      <div className="flex flex-col w-sm gap-2">
        <SectionTitle
          title="Forgot Password"
          description="Enter your email address and we'll send you a link to reset your password."
        />
        <form className="flex flex-col gap-4 w-full">
          <Input
            label="Email"
            type="email"
            placeholder="Email"
            {...register("email")}
            error={errors.email?.message}
          />
          <Button label="Reset Password" onClick={handleSubmit(onSubmit)} />
        </form>
      </div>
    </div>
  );
}
