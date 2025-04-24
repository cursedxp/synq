import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { step1Schema } from "@/app/schemas/register/step1.schema";
import { step2Schema } from "@/app/schemas/register/step2.schema";
import { sendVerificationEmail } from "@/app/lib/email";
import bcrypt from "bcrypt";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    email,
    password,
    firstName,
    lastName,
    phone,
    companyName,
    addressLine1,
    addressLine2,
    city,
    state,
    country,
    zip,
    termsAccepted,
    newsletter,
  } = body;

  //Check if user is already exists
  const user = prisma.account.findUnique({
    where: {
      email,
    },
  });

  // If user already exists, return error
  if (!user) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // Validate the first step
  const firstStepValidation = step1Schema.safeParse(body);

  if (!firstStepValidation.success) {
    return NextResponse.json(
      { errors: firstStepValidation.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // Validate the second step
  const secondStepValidation = step2Schema.safeParse(body);

  if (!secondStepValidation.success) {
    return NextResponse.json(
      { errors: secondStepValidation.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  //Password hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user in database
  const newAccount = await prisma.account.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      companyName,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      zip,
      termsAccepted,
      newsletter,
    },
  });

  //Generate verification token
  const verificationToken = crypto.randomBytes(32).toString("hex");

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: verificationToken,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    },
  });

  try {
    //Send verification email
    await sendVerificationEmail(email, verificationToken);
  } catch (error) {
    //Delete verification token and account if email sending fails
    await prisma.verificationToken.delete({
      where: {
        token: verificationToken,
      },
    });
    //Delete account if email sending fails
    await prisma.account.delete({
      where: {
        id: newAccount.id,
      },
    });
    console.error("Error sending verification email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send verification email" },
      { status: 500 }
    );
  }

  //Return success or failure
  return NextResponse.json(
    {
      success: true,
      message: "Verification email sent successfully",
      account: {
        id: newAccount.id,
        email: newAccount.email,
        firstName: newAccount.firstName,
        lastName: newAccount.lastName,
      },
    },
    { status: 200 }
  );
}
