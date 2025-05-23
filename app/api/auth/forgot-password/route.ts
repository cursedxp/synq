import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import crypto from "crypto";
import { sendVerificationEmail } from "@/app/lib/email";

interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  status: number;
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({
        success: false,
        message: "Email is required",
        status: 400,
      } as ForgotPasswordResponse);
    }

    // Check if email exists
    const account = await prisma.account.findUnique({
      where: { email },
    });

    // If not, return error
    if (!account) {
      return NextResponse.json({
        success: false,
        message: "Email not found",
        status: 404,
      } as ForgotPasswordResponse);
    }

    // Generate a token
    const token = crypto.randomBytes(32).toString("hex");

    // Use transaction to handle token creation and invalidation
    await prisma.$transaction(async (tx) => {
      // Invalidate any existing tokens for this user
      await tx.passwordResetToken.updateMany({
        where: {
          identifier: account.email,
          used: false,
        },
        data: {
          used: true,
        },
      });

      // Create new token
      await tx.passwordResetToken.create({
        data: {
          identifier: account.email,
          token,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
          used: false,
        },
      });
    });

    // Send email with token
    await sendVerificationEmail(email, token);

    return NextResponse.json({
      success: true,
      message: "Password reset email sent",
      status: 200,
    } as ForgotPasswordResponse);
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error sending password reset email",
      status: 500,
    } as ForgotPasswordResponse);
  }
}
