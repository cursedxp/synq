import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { prisma } from "@/app/lib/prisma";
import crypto from "crypto";
import { sendVerificationEmail } from "@/app/lib/email";
import { AuthOptions } from "next-auth";
import { Response } from "@/app/api/types/types";

export async function POST() {
  try {
    const session = await getServerSession(authOptions as AuthOptions);

    if (!session?.user?.email) {
      return NextResponse.json({
        success: false,
        message: "You are not logged in",
        status: 401,
      } as Response);
    }

    const email = session.user.email;

    const account = await prisma.account.findUnique({
      where: { email: email },
    });

    if (!account) {
      return NextResponse.json({
        success: false,
        message: "Account not found",
        status: 404,
      } as Response);
    }

    if (account.emailVerified) {
      return NextResponse.json({
        success: true,
        message: "Account already verified",
        status: 200,
      } as Response);
    }

    await prisma.$transaction(async (tx) => {
      const verificationToken = crypto.randomBytes(32).toString("hex");

      await tx.verificationToken.create({
        data: {
          identifier: email,
          token: verificationToken,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        },
      });

      try {
        await sendVerificationEmail(email, verificationToken);
      } catch (error) {
        await tx.verificationToken.delete({
          where: { token: verificationToken },
        });
        throw error;
      }
    });

    return NextResponse.json({
      success: true,
      message: "Verification email sent",
      status: 200,
    } as Response);
  } catch (error) {
    console.error("Error in resend verification:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to send verification email",
      status: 500,
    } as Response);
  }
}
