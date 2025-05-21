import { z } from "zod";

const requiredField = (message: string) =>
  z.string().refine((val) => val.trim() !== "", {
    message,
  });

export const signupSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .trim()
    .toLowerCase()
    .max(255, "Email must be less than 255 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
  termsAccepted: z.literal(true).refine((val) => val === true, {
    message: "You must accept the terms",
  }),
  newsletter: z.boolean().optional(),
  companyName: requiredField("Company name is required"),
  phone: requiredField("Phone is required"),
  firstName: requiredField("First name is required"),
  lastName: requiredField("Last name is required"),
  addressLine1: requiredField("Address line 1 is required"),
  addressLine2: z
    .string()
    .transform((val) => val.trim())
    .optional(),
  city: requiredField("City is required"),
  state: z
    .string()
    .transform((val) => val.trim())
    .optional(),
  country: requiredField("Country is required"),
  zip: requiredField("Zip is required"),
});

export type SignupSchema = z.infer<typeof signupSchema>;
