import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { Response } from "@/app/api/types/types";

const baseResponse: Response = {
  success: false,
  message: "",
  status: 400,
};

export async function POST(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token") as string;

    if (!token) {
      return NextResponse.json({
        ...baseResponse,
        message: "Token is required",
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const verificationToken = await tx.verificationToken.findUnique({
        where: {
          token: token,
        },
      });

      if (!verificationToken) {
        return {
          ...baseResponse,
          message: "Invalid token",
        };
      }

      const account = await tx.account.findUnique({
        where: {
          email: verificationToken.identifier,
        },
      });

      if (!account) {
        return {
          ...baseResponse,
          message: "Account not found",
        };
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
        ...baseResponse,
        message: "Email verified successfully",
        status: 200,
      } as Response;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json({
      ...baseResponse,
      message: "Internal server error",
      status: 500,
    } as Response);
  }
}
