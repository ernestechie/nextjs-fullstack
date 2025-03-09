import { AuthEmail } from "@/constants/email";
import { connect } from "@/db/db.config";
import { sendOtpEmail } from "@/lib/email";
import { generateSecureOTP } from "@/lib/otp";
import { addLuxonHours } from "@/lib/utils";
import UserModel2 from "@/models/UserModel2";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, username } = body;

    // 1: Check if user already exists
    const emailExists = await UserModel2.findOne({ email });
    const usernameExists = await UserModel2.findOne({ username });

    if (emailExists || usernameExists)
      return NextResponse.json(
        {
          status: false,
          message: "An account with this email/username already exists!",
        },
        { status: 400 }
      );

    const otpCode = generateSecureOTP();

    // 2. Hash Password with random generated salt
    const salt = await bcryptjs.genSalt(12);
    const hashedOtpCode = await bcryptjs.hash(otpCode, salt);
    const otpCodeExpiry = addLuxonHours(2);

    const newUser = new UserModel2({
      email,
      username,
      otpCode: hashedOtpCode,
      otpCodeExpiry,
    });

    const user = await newUser.save();

    const bodyText = `
      Hi, <b>${newUser.username}.</b><br/>
      Kindly use this code to complete your registration on ChatFusion.<br/><br/>
      <span style="padding:16px;color: #111; font-size: 24px; background: #ddd; border-radius: 20px; display:block;">
      ${otpCode}
      </span>
    `;

    // 3. Send otp to email
    await sendOtpEmail({
      userId: newUser.id,
      recipients: [newUser.email],
      subject: "Welcome to ChatFusion",
      emailType: AuthEmail.OtpCode,
      bodyText,
    });

    return NextResponse.json(
      {
        status: true,
        message: "Account successfully!",
        data: { user },
      },
      { status: 201 }
    );
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unexpected error occured!";
    console.log("AUTH_PASSWORDLESS_SIGNUP Error ->", err);

    return NextResponse.json(
      { status: false, message: errorMessage },
      { status: 400 }
    );
  }
}
