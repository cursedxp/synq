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
  const { email } = await request.json();
  try {
    //Check if email exists
    const account = await prisma.account.findUnique({
      where: { email },
    });
    //If not, return error
    if (!account) {
      return NextResponse.json({
        success: false,
        message: "Email not found",
        status: 404,
      } as ForgotPasswordResponse);
    }

    //Generate a token
    const token = crypto.randomBytes(32).toString("hex");

    //Save token to database
    await prisma.passwordResetToken.create({
      data: {
        identifier: account.id,
        token,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });

    //Send email with token
    await sendVerificationEmail(email, token);

    return NextResponse.json({
      success: true,
      message: "Password reset email sent",
      status: 200,
    } as ForgotPasswordResponse);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Error sending password reset email",
      status: 500,
    } as ForgotPasswordResponse);
  }
}
