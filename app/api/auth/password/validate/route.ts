import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import {
  createSuccessResponse,
  createErrorResponse,
} from "@/app/api/utils/helpers";

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.json(createErrorResponse("Token is required"));
    }

    // Use transaction to validate token
    const result = await prisma.$transaction(async (tx) => {
      const passwordResetToken = await tx.passwordResetToken.findUnique({
        where: {
          token: token,
        },
      });

      if (!passwordResetToken) {
        return createErrorResponse("Invalid or expired token");
      }

      // Check if token is expired
      if (passwordResetToken.expires < new Date()) {
        // Delete expired token
        await tx.passwordResetToken.delete({
          where: {
            token: token,
          },
        });
        return createErrorResponse("Token has expired");
      }

      return createSuccessResponse("Token is valid");
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      createErrorResponse("Error validating token", 500)
    );
  }
}
