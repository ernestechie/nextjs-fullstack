import { AuthEmail } from "@/constants/email";
import { connect } from "@/db/db.config";
import { sendResetVerificationEmail } from "@/lib/email";
import UserModel from "@/models/UserModel";

import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    // 1: Check if user already exists
    const userExists = await UserModel.findOne({ email });
    if (userExists)
      return NextResponse.json(
        {
          status: false,
          message: "An account with this email already exists!",
        },
        { status: 400 }
      );

    // 2. Hash Password with random generated salt
    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // 3. Send email verification link
    await sendResetVerificationEmail({
      userId: newUser.id,
      recipients: [newUser.email],
      subject: "Welcome to ChatFusion",
      emailType: AuthEmail.VerifyEmail,
      bodyText: `Hi, <b>${newUser.username}.</b><br/>ChatFusion is an advanced AI powered chat support and customer engagement startup.<br/><br/> Click the button below to verify your account.<br/>`,
    });

    return NextResponse.json(
      {
        status: true,
        message: "Account created successfully!",
        data: { user },
      },
      { status: 201 }
    );
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unexpected error occured!";
    console.log("AUTH_SIGNUP Error ->", err);

    return NextResponse.json(
      { status: false, message: errorMessage },
      { status: 400 }
    );
  }
}
