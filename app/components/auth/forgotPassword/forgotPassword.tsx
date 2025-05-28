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
import Link from "next/link";
import { useForgotPassword } from "@/app/hooks/useForgotPassword";
import { useState } from "react";
import VerificationCard from "@/app/components/verification/verificationCard";

export default function ForgotPassword() {
  const { forgotPassword, loading, error } = useForgotPassword();
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    const response = await forgotPassword(data.email);
    if (response?.success) {
      setShowSuccess(true);
    }
  };

  return (
    <div className="flex flex-col w-full relative items-center justify-center">
      <div className="flex flex-col w-sm gap-2">
        {showSuccess ? (
          <VerificationCard
            success={true}
            message="Please check your inbox. If you don't see it, please check your spam folder."
            title="Check Your Email"
            buttonLabel="Back to Sign In"
            redirectRoute="/auth/signin"
            iconType="email"
          />
        ) : (
          <>
            <SectionTitle
              title="Forgot Password"
              description="Enter your email address and we'll send you a link to reset your password."
              h1ClassName="text-4xl"
            />
            <form className="flex flex-col gap-4 w-full">
              <Input
                label="Email"
                type="email"
                placeholder="Email"
                {...register("email")}
                error={errors.email?.message}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button
                label="Reset Password"
                onClick={handleSubmit(onSubmit)}
                disabled={loading}
              />
            </form>
            <div className="flex flex-col w-sm gap-2">
              <div className="text-gray-500 text-sm flex">
                <div>
                  Back to{" "}
                  <Link
                    href="/auth/signin"
                    className="font-bold text-black underline"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
