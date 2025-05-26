"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          {status === "loading" && (
            <>
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                  <div className="w-16 h-16 border-4 border-blue-500 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
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

          {status === "error" && (
            <>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Verification Failed
              </h2>
              <p className="text-gray-600 mb-4">{errorMessage}</p>
              <p className="text-sm text-gray-500">
                Redirecting to sign up page...
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Verification Successful!
              </h2>
              <p className="text-gray-600 mb-4">
                Your email has been successfully verified.
              </p>
              <p className="text-sm text-gray-500">
                Redirecting to sign in page...
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
