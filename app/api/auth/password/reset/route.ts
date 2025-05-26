import { NextRequest, NextResponse } from "next/server";
import { signupSchema } from "@/app/schemas/signUp/signup.schema";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";

interface ResetPasswordResponse {
  success: boolean;
  message: string;
  status: number;
}

export async function POST(request: NextRequest) {
  try {
    const { token } = Object.fromEntries(request.nextUrl.searchParams);
    const { password } = await request.json();

    if (!token || !password) {
      return NextResponse.json({
        success: false,
        message: "Token and password are required",
        status: 400,
      } as ResetPasswordResponse);
    }

    // Validate password first
    const passwordValidation = signupSchema.shape.password.safeParse(password);
    if (!passwordValidation.success) {
      const errorMessage =
        passwordValidation.error.errors[0]?.message || "Invalid password";
      return NextResponse.json({
        success: false,
        message: errorMessage,
        status: 400,
      } as ResetPasswordResponse);
    }

    // Perform all database operations in a single transaction
    await prisma.$transaction(async (tx) => {
      // Check if token exists
      const passwordResetToken = await tx.passwordResetToken.findUnique({
        where: {
          token: token,
        },
      });

      if (!passwordResetToken) {
        throw new Error("Invalid or expired token");
      }

      // Check if token is expired
      if (passwordResetToken.expires < new Date()) {
        // Delete expired token
        await tx.passwordResetToken.delete({
          where: {
            token: token,
          },
        });
        throw new Error("Token has expired");
      }

      // Check if account exists
      const account = await tx.account.findUnique({
        where: {
          email: passwordResetToken.identifier,
        },
      });

      if (!account) {
        throw new Error("Account not found");
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update password
      await tx.account.update({
        where: {
          id: account.id,
        },
        data: {
          password: hashedPassword,
        },
      });

      // Delete the used token
      await tx.passwordResetToken.delete({
        where: {
          token: token,
        },
      });
    });

    return NextResponse.json({
      success: true,
      message: "Password reset successful",
      status: 200,
    } as ResetPasswordResponse);
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({
      success: false,
      message:
        error instanceof Error ? error.message : "Error resetting password",
      status: 500,
    } as ResetPasswordResponse);
  }
}
