import { z } from "zod";

const requiredField = (message: string) =>
  z.string().refine((val) => val.trim() !== "", {
    message,
  });

export const step2Schema = z.object({
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
  phone: requiredField("Phone is required"),
});

export type Step2Schema = z.infer<typeof step2Schema>;
