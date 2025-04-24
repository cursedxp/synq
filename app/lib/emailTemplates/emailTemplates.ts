export const verificationEmailTemplate = (confirmLink: string) => ({
  subject: "Verify your email",
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Welcome to Synq!</h1>
      <p>Please verify your email by clicking the button below:</p>
      <a href="${confirmLink}" 
         style="display: inline-block; padding: 10px 20px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 5px;">
        Verify Email
      </a>
      <p style="color: #666; font-size: 12px; margin-top: 20px;">
        This link will expire in 24 hours.
      </p>
    </div>
  `,
  text: `Welcome to Synq! Please verify your email by visiting: ${confirmLink}`,
});
