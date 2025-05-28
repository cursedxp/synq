"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import VerificationCard from "@/app/components/verification/verificationCard";
import { useEmailTokenVerify } from "@/app/hooks/useEmailTokenVerify";
import SplitScreen from "@/app/components/auth/common/splitScreen/splitScreen";
import PhotoBy from "@/app/components/auth/common/photoBy/photoBy";

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
    <SplitScreen
      left={
        <div className="relative w-full h-full">
          <Image
            src="/images/auth/verify.jpg"
            alt="Verification"
            fill
            priority
            sizes="(max-width: 768px) 0vw, 100vw"
            className="object-cover"
          />
          <PhotoBy
            shortText="Postbox"
            photographer="Kevindous"
            photoUrl="https://unsplash.com/@kevindous"
          />
        </div>
      }
      right={
        <div className="flex flex-col items-center justify-center w-full">
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
                <VerificationCard
                  success={success}
                  message={
                    success
                      ? "Your email has been verified successfully!"
                      : error || "Verification failed"
                  }
                />
              )}
            </div>
          </div>
        </div>
      }
    />
  );
}
