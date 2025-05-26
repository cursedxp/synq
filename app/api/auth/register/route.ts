import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { signupSchema } from "@/app/schemas/signUp/signup.schema";
import { sendVerificationEmail } from "@/app/lib/email";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { RegisterUserRequest } from "@/app/api/types/types";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../../utils/helpers";

// interface RegisterResponse {
//   success: boolean;
//   message: string;
//   account?: {
//     id: string;
//     email: string;
//     firstName: string;
//     lastName: string;
//   };
//   status: number;
// }

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterUserRequest;

    // Validate the signup
    const signupValidation = signupSchema.safeParse(body);

    if (!signupValidation.success) {
      return NextResponse.json(
        { errors: signupValidation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    //Check if account is already exists
    const existingAccount = await prisma.account.findUnique({
      where: {
        email: body.email,
      },
    });

    if (existingAccount) {
      return NextResponse.json(
        { error: "Account already exists" },
        { status: 400 }
      );
    }

    //Password hashing
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Create account in database
    const newAccount = await prisma.$transaction(async (tx) => {
      const account = await tx.account.create({
        data: {
          email: body.email,
          password: hashedPassword,
          firstName: body.firstName,
          lastName: body.lastName,
          phone: body.phone,
          companyName: body.companyName,
          addressLine1: body.addressLine1,
          addressLine2: body.addressLine2,
          city: body.city,
          state: body.state,
          country: body.country,
          zip: body.zip,
          termsAccepted: body.termsAccepted,
          newsletter: body.newsletter,
        },
      });

      const verificationToken = crypto.randomBytes(32).toString("hex");

      await tx.verificationToken.create({
        data: {
          identifier: body.email,
          token: verificationToken,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        },
      });

      return { account, verificationToken };
    });

    try {
      //Send verification email
      await sendVerificationEmail(body.email, newAccount.verificationToken);
    } catch (error) {
      //Delete verification token and account if email sending fails
      await prisma.$transaction(async (tx) => {
        await tx.verificationToken.delete({
          where: { token: newAccount.verificationToken },
        });
        await tx.account.delete({
          where: { id: newAccount.account.id },
        });
      });

      console.error("Error sending verification email:", error);
      return NextResponse.json(
        { success: false, message: "Failed to send verification email" },
        { status: 500 }
      );
    }

    //Return success or failure
    return NextResponse.json(
      createSuccessResponse("Verification email sent successfully", {
        id: newAccount.account.id,
        email: newAccount.account.email,
        firstName: newAccount.account.firstName,
        lastName: newAccount.account.lastName,
      })
    );
  } catch {
    return NextResponse.json(createErrorResponse("Internal server error", 500));
  }
}
