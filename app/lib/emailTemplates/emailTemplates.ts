export const verificationEmailTemplate = (confirmLink: string) => ({
  subject: "Verify your email",
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Welcome to Synq!</h1>
      <p>Please verify your email by clicking the button below:</p>
      <a href="${confirmLink}" 
         style="display: inline-block; padding: 10px 20px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
        Verify Email
      </a>
      <p>If the button above doesn't work, you can also copy and paste this link into your browser:</p>
      <p style="color: #666; font-size: 12px; word-break: break-all;">
        ${confirmLink}
      </p>
      <p style="color: #666; font-size: 12px; margin-top: 20px;">
        This link will expire in 24 hours.
      </p>
    </div>
  `,
  text: `Welcome to Synq! Please verify your email by visiting: ${confirmLink}`,
});

export function forgotPasswordEmailTemplate(resetLink: string) {
  return {
    subject: "Reset Your Password",
    html: `
      <div>
        <h1>Reset Your Password</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
    text: `Reset your password by clicking this link: ${resetLink}`,
  };
}
