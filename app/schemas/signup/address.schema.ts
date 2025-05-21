import { z } from "zod";

const requiredField = (message: string) =>
  z.string().refine((val) => val.trim() !== "", {
    message,
  });

export const addressSchema = z.object({
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

export type AddressSchema = z.infer<typeof addressSchema>;
