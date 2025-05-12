import { z } from "zod";

export const step1Schema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
    termsAccepted: z.literal(true).refine((val) => val === true, {
      message: "You must accept the terms",
    }),
    newsletter: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type Step1Schema = z.infer<typeof step1Schema>;
