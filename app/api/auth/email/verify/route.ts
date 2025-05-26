import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

interface VerifyResponse {
  success: boolean;
  message: string;
  status: number;
}

export async function POST(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token") as string;

    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Token is required",
        status: 400,
      } as VerifyResponse);
    }

    const result = await prisma.$transaction(async (tx) => {
      const verificationToken = await tx.verificationToken.findUnique({
        where: {
          token: token,
        },
      });

      if (!verificationToken) {
        return {
          success: false,
          message: "Invalid token",
          status: 400,
        } as VerifyResponse;
      }

      const account = await tx.account.findUnique({
        where: {
          email: verificationToken.identifier,
        },
      });

      if (!account) {
        return {
          success: false,
          message: "Account not found",
          status: 400,
        } as VerifyResponse;
      }

      // Update account status to verified
      await tx.account.update({
        where: {
          email: verificationToken.identifier,
        },
        data: {
          emailVerified: true,
        },
      });

      // Delete the used verification token
      await tx.verificationToken.delete({
        where: {
          token: token,
        },
      });

      return {
        success: true,
        message: "Email verified successfully",
        status: 200,
      } as VerifyResponse;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      status: 500,
    } as VerifyResponse);
  }
}
