import { z } from "zod";

const requiredField = (message: string) =>
  z.string().refine((val) => val.trim() !== "", {
    message,
  });

export const contactSchema = z.object({
  firstName: requiredField("First name is required"),
  lastName: requiredField("Last name is required"),
  companyName: requiredField("Company name is required"),
  phone: requiredField("Phone is required"),
});

export type ContactSchema = z.infer<typeof contactSchema>;
