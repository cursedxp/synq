import { Resend } from "resend";
import {
  verificationEmailTemplate,
  forgotPasswordEmailTemplate,
} from "./emailTemplates/emailTemplates";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
  from: string;
}

export async function sendEmail(
  to: string,
  template: EmailTemplate,
  from: string = process.env.EMAIL_FROM || "onboarding@resend.dev"
) {
  const emailOptions: EmailOptions = {
    to,
    ...template,
    from,
  };

  try {
    await resend.emails.send(emailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
    throw new Error("Failed to send email");
  }
}

// Example usage functions for specific email types
export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `${process.env.NEXTAUTH_URL}/auth/verify?token=${token}`;
  const template = verificationEmailTemplate(confirmLink);
  await sendEmail(email, template);
}

export async function sendForgotPasswordEmail(email: string, token: string) {
  const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;
  const template = forgotPasswordEmailTemplate(resetLink);
  await sendEmail(email, template);
}
