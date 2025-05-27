"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import VerificationCard from "@/app/components/verification/verificationCard";
export default function Verify() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setStatus("error");
        setErrorMessage("Verification token is missing");
        return;
      }

      try {
        const response = await fetch(`/api/auth/email/verify?token=${token}`, {
          method: "POST",
        });
        const data = await response.json();

        if (data.success) {
          setStatus("success");
          setTimeout(() => {
            router.push("/auth/signin");
          }, 2000);
        } else {
          setStatus("error");
          setErrorMessage(data.message || "Verification failed");
          setTimeout(() => {
            router.push("/auth/signup");
          }, 3000);
        }
      } catch (error) {
        setStatus("error");
        setErrorMessage("An error occurred during verification");
        console.error("Error verifying token:", error);
      }
    };

    verifyToken();
  }, [router, token]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8">
        <div className="text-center">
          {status === "loading" && (
            <>
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                  <div className="w-16 h-16 border-4 black-blue-500 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Verifying Your Account
              </h2>
              <p className="text-gray-600">
                Please wait while we verify your email address...
              </p>
            </>
          )}

          <VerificationCard
            message={status === "error" ? errorMessage : ""}
            status={status}
          />
        </div>
      </div>
    </div>
  );
}
