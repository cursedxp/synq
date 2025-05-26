import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import crypto from "crypto";
import { sendForgotPasswordEmail } from "@/app/lib/email";
import {
  createErrorResponse,
  createSuccessResponse,
} from "@/app/api/utils/helpers";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(createErrorResponse("Email is required"));
    }

    // Check if email exists
    const account = await prisma.account.findUnique({
      where: { email },
    });

    // If not, return error
    if (!account) {
      return NextResponse.json(createErrorResponse("Email not found"));
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
    await sendForgotPasswordEmail(email, token);

    return NextResponse.json(
      createSuccessResponse("Password reset email sent")
    );
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      createErrorResponse("Password reset email sent", 500)
    );
  }
}
