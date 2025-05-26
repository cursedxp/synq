import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import {
  createErrorResponse,
  createSuccessResponse,
} from "@/app/api/utils/helpers";

export async function POST(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.json(createErrorResponse("Token is required"));
    }

    const result = await prisma.$transaction(async (tx) => {
      const verificationToken = await tx.verificationToken.findUnique({
        where: { token },
      });

      if (!verificationToken) {
        return createErrorResponse("Invalid token");
      }

      const account = await tx.account.findUnique({
        where: { email: verificationToken.identifier },
      });

      if (!account) {
        return createErrorResponse("Account not found");
      }

      await tx.account.update({
        where: { email: verificationToken.identifier },
        data: { emailVerified: true },
      });

      await tx.verificationToken.delete({
        where: { token },
      });

      return createSuccessResponse("Email verified successfully");
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json(createErrorResponse("Internal server error", 500));
  }
}
