"use client";

import Button from "../common/button/button";
import Link from "next/link";
import { useState } from "react";
import AccountSection from "@/app/components/auth/signUp/sections/accountSection";
import ContactSection from "@/app/components/auth/signUp/sections/contactSection";
import AddressSection from "@/app/components/auth/signUp/sections/addressSection";
import Stepper from "@/app/components/auth/stepper/stepper";
export default function SignUp() {
  const [step, setStep] = useState(1);

  return (
    <div className="flex flex-col w-full relative items-center justify-center">
      <Stepper
        currentStep={step}
        className="absolute top-20 left-1/2 -translate-x-1/2"
      />
      <div className="flex flex-col w-sm gap-8">
        <form className="flex flex-col w-full">
          {step === 1 && <AccountSection />}
          {step === 2 && (
            <ContactSection setCurrentStep={setStep} currentStep={step} />
          )}
          {step === 3 && (
            <AddressSection setCurrentStep={setStep} currentStep={step} />
          )}
          {step === 1 && <Button label="Next" onClick={() => setStep(2)} />}
          {step === 2 && <Button label="Next" onClick={() => setStep(3)} />}
          {step === 3 && <Button label="Sign up" />}
        </form>
        {step === 1 && (
          <div className="text-gray-500 text-sm flex">
            <div>
              Already registered?{" "}
              <Link
                href="/auth/signin"
                className="font-bold text-black underline"
              >
                Sign in
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
