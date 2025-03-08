import { AuthEmail } from "@/constants/email";
import { connect } from "@/db/db.config";
import { sendResetVerificationEmail } from "@/lib/email";
import UserModel from "@/models/UserModel";

import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    // 1: Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser)
      return NextResponse.json(
        { status: false, message: "Invalid email or password" },
        { status: 401 }
      );

    // 2. Send password reset email
    await sendResetVerificationEmail({
      userId: existingUser.id,
      recipients: [existingUser.email],
      subject: "Reset Password",
      emailType: AuthEmail.ResetPassword,
      bodyText: `Hello, <b>${existingUser.username}</b>. <br/> We received a request to reset your password, click the button below to set a new password.<br/>`,
    });

    return NextResponse.json(
      {
        status: true,
        message:
          "A link to reset your password has been sent to the provided email!",
        data: null,
      },
      { status: 200 }
    );
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unexpected error occured!";
    console.log("AUTH_LOGIN Error ->", err);

    return NextResponse.json(
      { status: false, message: errorMessage },
      { status: 400 }
    );
  }
}
