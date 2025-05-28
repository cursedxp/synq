"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PasswordStrengthMeter from "@/app/components/auth/common/passwordStrengthMeter/passwordStrengthMeter";
import SplitScreen from "@/app/components/auth/common/splitScreen/splitScreen";
import PhotoBy from "@/app/components/auth/common/photoBy/photoBy";
import Image from "next/image";
import Button from "@/app/components/auth/common/button/button";
import Input from "@/app/components/auth/common/input/input";
import VerificationCard from "@/app/components/verification/verificationCard";

const ResetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
});

type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>;

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch(
          `/api/auth/password/validate?token=${token}`
        );
        const data = await response.json();
        setIsTokenValid(data.success);
        if (!data.success) {
          setError(data.message);
        }
      } catch {
        setError("Failed to validate token");
        setIsTokenValid(false);
      }
    };

    if (token) {
      validateToken();
    } else {
      setError("No reset token provided");
      setIsTokenValid(false);
    }
  }, [token]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/auth/password/reset?token=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: data.password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to reset password");
      }

      if (result.success) {
        setShowSuccess(true);
      } else {
        throw new Error(result.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      setError(
        error instanceof Error ? error.message : "Failed to reset password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SplitScreen
      left={
        <div className="relative w-full h-full">
          <Image
            src="/images/auth/resetPassword.jpg"
            alt="Yellow National Park"
            fill
            priority
            sizes="(max-width: 768px) 0vw, 100vw"
            className="object-cover"
          />
          <PhotoBy
            location="Prague, Czech Republic"
            photographer="Tom Grünbauer"
            photoUrl="https://unsplash.com/@tomgruenbauer"
          />
        </div>
      }
      right={
        <div className="flex flex-col w-full relative items-center justify-center">
          <div className="flex flex-col w-sm gap-2">
            {!isTokenValid ? (
              <VerificationCard
                success={false}
                message="The password reset link is invalid, expired, or missing. Please request a new password reset email."
                title="Invalid Link"
                buttonLabel="Back to Sign In"
                redirectRoute="/auth/signin"
                iconType="error"
              />
            ) : showSuccess ? (
              <VerificationCard
                success={true}
                message="Your password has been reset successfully. You can now sign in with your new password."
                title="Password Reset Successful"
                buttonLabel="Back to Sign In"
                redirectRoute="/auth/signin"
                iconType="success"
              />
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-full"
              >
                <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
                )}
                <div className="flex flex-col">
                  <Input
                    label="New Password"
                    type="password"
                    placeholder="New Password"
                    {...register("password")}
                    disabled={isLoading}
                    error={errors.password?.message}
                    className="mb-2"
                  />
                </div>
                <PasswordStrengthMeter password={watch("password")} />
                <Button
                  label={isLoading ? "Resetting..." : "Reset Password"}
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading}
                />
              </form>
            )}
          </div>
        </div>
      }
    />
  );
}
