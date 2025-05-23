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
import { FaCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();
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
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center rounded-full bg-green-100 p-4 w-32 h-32">
                <FaCheck className="text-green-500 w-20 h-20" />
              </div>
              <h2 className="text-4xl font-bold">Success!</h2>
              <p className="text-zinc-500  text-center">
                Please check your inbox. If you don&apos;t see it, please check
                your spam folder.
              </p>
            </div>
            <Button
              label="Back to Sign In"
              onClick={() => router.push("/auth/signin")}
            />
          </div>
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
