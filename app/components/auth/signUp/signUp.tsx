"use client";

import Button from "../common/button/button";
import Link from "next/link";
import { useState } from "react";
import AccountSection from "./sections/accountSection";
import ContactSection from "./sections/contactSection";
import AddressSection from "./sections/addressSection";
export default function SignUp() {
  const [step, setStep] = useState(1);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col w-sm gap-2">
        <form className="flex flex-col w-full">
          {step === 1 && <AccountSection />}
          {step === 2 && <ContactSection />}
          {step === 3 && <AddressSection />}
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
