"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import VerificationCard from "@/app/components/verification/verificationCard";
import { useEmailTokenVerify } from "@/app/hooks/useEmailTokenVerify";

export default function Verify() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { verifyToken, success, error, loading } = useEmailTokenVerify();

  useEffect(() => {
    if (token) {
      verifyToken(token);
    }
  }, [token, verifyToken]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8">
        <div className="text-center">
          {loading && (
            <div className="mb-8">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                  <div className="w-16 h-16 border-4 border-black-500 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
                </div>
              </div>
              <p className="mt-4 text-gray-600">Verifying your email...</p>
            </div>
          )}
          {!loading && (
            <VerificationCard success={success} message={error || ""} />
          )}
        </div>
      </div>
    </div>
  );
}
