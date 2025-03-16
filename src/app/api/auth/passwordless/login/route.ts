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
    const { email } = body;

    const existingUser = await UserModel2.findOne({ email });

    if (!existingUser)
      return NextResponse.json(
        {
          status: false,
          message: "Invalid email or password!",
        },
        { status: 401 }
      );

    const otpCode = generateSecureOTP();

    // 2. Hash otpcode with random generated salt
    const salt = await bcryptjs.genSalt(12);
    const hashedOtpCode = await bcryptjs.hash(otpCode, salt);
    const otpCodeExpiry = addLuxonHours(2);

    existingUser.otpCode = hashedOtpCode;
    existingUser.otpCodeExpiry = otpCodeExpiry;

    await existingUser.save();

    const bodyText = `
      Hi, <b>${existingUser.username}.</b><br/>
      Kindly use this code to sign in on ChatFusion.<br/>
      </span>
    `;

    // 3. Send otp to email
    await sendOtpEmail({
      userId: existingUser.id,
      recipients: [existingUser.email],
      subject: "Login OTP",
      emailType: AuthEmail.OtpCode,
      bodyText,
      value: otpCode,
    });

    return NextResponse.json(
      {
        status: true,
        message: "Account successfully!",
        user: existingUser,
      },
      { status: 200 }
    );
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unexpected error occured!";
    console.log("AUTH_PASSWORDLESS_LOGIN Error ->", err);

    return NextResponse.json(
      { status: false, message: errorMessage },
      { status: 400 }
    );
  }
}
