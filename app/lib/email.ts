import { Resend } from "resend";
import { verificationEmailTemplate } from "./emailTemplates/emailTemplates";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
  from: string;
}

export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `${process.env.NEXTAUTH_URL}/verify?token=${token}`;
  const template = verificationEmailTemplate(confirmLink);

  const emailOptions: EmailOptions = {
    to: email,
    ...template,
    from: process.env.EMAIL_FROM || "onboarding@resend.dev",
  };

  try {
    await resend.emails.send(emailOptions);
  } catch (error) {
    console.error("Error sending verification email:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to send verification email: ${error.message}`);
    }
    throw new Error("Failed to send verification email");
  }
}
