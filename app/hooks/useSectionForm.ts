import { UseFormRegister, FieldErrors } from "react-hook-form";
import { SignupSchema } from "@/app/schemas/signup/signup.schema";
import { AccountSchema } from "@/app/schemas/signup/account.schema";
import { ContactSchema } from "@/app/schemas/signup/contact.schema";
import { AddressSchema } from "@/app/schemas/signup/address.schema";

type SectionType = "account" | "contact" | "address";

type SectionForm<T extends SectionType> = T extends "account"
  ? {
      register: UseFormRegister<AccountSchema>;
      errors: FieldErrors<AccountSchema>;
    }
  : T extends "contact"
    ? {
        register: UseFormRegister<ContactSchema>;
        errors: FieldErrors<ContactSchema>;
      }
    : {
        register: UseFormRegister<AddressSchema>;
        errors: FieldErrors<AddressSchema>;
      };

export function useSectionForm<T extends SectionType>(
  register: UseFormRegister<SignupSchema>,
  errors: FieldErrors<SignupSchema>,
  section: T
): SectionForm<T> {
  switch (section) {
    case "account":
      return {
        register: ((field: keyof AccountSchema) =>
          register(
            field as keyof SignupSchema
          )) as UseFormRegister<AccountSchema>,
        errors: {
          email: errors.email,
          password: errors.password,
        } as FieldErrors<AccountSchema>,
      } as SectionForm<T>;
    case "contact":
      return {
        register: ((field: keyof ContactSchema) =>
          register(
            field as keyof SignupSchema
          )) as UseFormRegister<ContactSchema>,
        errors: {
          firstName: errors.firstName,
          lastName: errors.lastName,
          companyName: errors.companyName,
          phone: errors.phone,
        } as FieldErrors<ContactSchema>,
      } as SectionForm<T>;
    case "address":
      return {
        register: ((field: keyof AddressSchema) =>
          register(
            field as keyof SignupSchema
          )) as UseFormRegister<AddressSchema>,
        errors: {
          addressLine1: errors.addressLine1,
          addressLine2: errors.addressLine2,
          city: errors.city,
          state: errors.state,
          country: errors.country,
          zip: errors.zip,
        } as FieldErrors<AddressSchema>,
      } as SectionForm<T>;
    default:
      throw new Error("Invalid section type");
  }
}
