import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface ResetPasswordResponse {
  success: boolean;
  message: string;
  status: number;
}

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Token is required",
        status: 400,
      } as ResetPasswordResponse);
    }

    // Use transaction to validate token
    const result = await prisma.$transaction(async (tx) => {
      const passwordResetToken = await tx.passwordResetToken.findUnique({
        where: {
          token: token,
        },
      });

      if (!passwordResetToken) {
        return {
          success: false,
          message: "Invalid or expired token",
          status: 400,
        } as ResetPasswordResponse;
      }

      // Check if token is expired
      if (passwordResetToken.expires < new Date()) {
        // Delete expired token
        await tx.passwordResetToken.delete({
          where: {
            token: token,
          },
        });
        return {
          success: false,
          message: "Token has expired",
          status: 400,
        } as ResetPasswordResponse;
      }

      return {
        success: true,
        message: "Token is valid",
        status: 200,
      } as ResetPasswordResponse;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({
      success: false,
      message: "Error validating token",
      status: 500,
    } as ResetPasswordResponse);
  }
}
