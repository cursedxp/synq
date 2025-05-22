"use client";

import Button from "../common/button/button";
import Link from "next/link";
import { useState } from "react";
import AccountSection from "./sections/accountSection";
import ContactSection from "./sections/contactSection";
import AddressSection from "./sections/addressSection";
import Stepper from "../stepper/stepper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupSchema } from "@/app/schemas/signup/signup.schema";
import { useSectionForm } from "@/app/hooks/useSectionForm";

// Form steps enum
const FORM_STEPS = {
  ACCOUNT: 1,
  CONTACT: 2,
  ADDRESS: 3,
} as const;

// Type for form steps

type FormStep = (typeof FORM_STEPS)[keyof typeof FORM_STEPS];

// Validation fields with type safety
const VALIDATION_FIELDS: Record<FormStep, (keyof SignupSchema)[]> = {
  [FORM_STEPS.ACCOUNT]: ["email", "password"],
  [FORM_STEPS.CONTACT]: ["firstName", "lastName", "companyName", "phone"],
  [FORM_STEPS.ADDRESS]: ["addressLine1", "city", "country", "zip"],
} as const;

export default function SignUp() {
  // State management
  const [currentStep, setCurrentStep] = useState<FormStep>(FORM_STEPS.ACCOUNT);

  // Form management
  const {
    register,
    watch,
    trigger,
    getValues,
    formState: { errors },
    clearErrors,
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const password = watch("password", "");

  // Form sections
  const accountForm = useSectionForm(register, errors, "account");
  const contactForm = useSectionForm(register, errors, "contact");
  const addressForm = useSectionForm(register, errors, "address");

  // Step transitions
  const handleNextStep = async (nextStep: FormStep) => {
    const fieldsToValidate = VALIDATION_FIELDS[nextStep];
    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      clearErrors();
      setCurrentStep(nextStep);
    }
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step as FormStep);
  };

  // Sign up process
  const handleSignUp = async () => {
    const isValid = await trigger(VALIDATION_FIELDS[FORM_STEPS.ADDRESS]);

    if (isValid) {
      const formData = getValues();
      // API call can be made
      console.log("Form data:", formData);
    }
  };

  // Render active form section
  const renderActiveSection = () => {
    switch (currentStep) {
      case FORM_STEPS.ACCOUNT:
        return (
          <AccountSection
            register={accountForm.register}
            password={password}
            errors={accountForm.errors}
          />
        );
      case FORM_STEPS.CONTACT:
        return (
          <ContactSection
            register={contactForm.register}
            errors={contactForm.errors}
            setCurrentStep={handleStepChange}
            currentStep={currentStep}
          />
        );
      case FORM_STEPS.ADDRESS:
        return (
          <AddressSection
            register={addressForm.register}
            errors={addressForm.errors}
            setCurrentStep={handleStepChange}
            currentStep={currentStep}
          />
        );
    }
  };

  // Render active button
  const renderActiveButton = () => {
    switch (currentStep) {
      case FORM_STEPS.ACCOUNT:
        return (
          <Button
            label="Next"
            onClick={() => handleNextStep(FORM_STEPS.CONTACT)}
          />
        );
      case FORM_STEPS.CONTACT:
        return (
          <Button
            label="Next"
            onClick={() => handleNextStep(FORM_STEPS.ADDRESS)}
          />
        );
      case FORM_STEPS.ADDRESS:
        return <Button label="Sign up" onClick={handleSignUp} />;
    }
  };

  return (
    <div className="flex flex-col w-full relative items-center justify-center">
      <Stepper
        currentStep={currentStep}
        className="absolute top-20 left-1/2 -translate-x-1/2"
      />

      <div className="flex flex-col w-sm gap-8">
        <form className="flex flex-col w-full">
          {renderActiveSection()}
          {renderActiveButton()}
        </form>

        {currentStep === FORM_STEPS.ACCOUNT && (
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
