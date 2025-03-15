import { connect } from "@/db/db.config";
import UserModel2 from "@/models/UserModel2";
import { NextRequest, NextResponse } from "next/server";

import { NEXT_COOKIE_KEY } from "@/constants/auth";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, otp } = body;

    // 1: Check if user already exists
    const existingUser = await UserModel2.findOne({ email }).select("-__v");
    if (!existingUser) throw new Error("User does not exist");

    // 2. Check if otp is correct
    const otpIsValid = await bcryptjs.compare(otp, existingUser.otpCode);
    const otpExpired = existingUser.otpCodeExpiry < Date.now();

    if (!otpIsValid || otpExpired) throw new Error("Invalid OTP");

    // 3. Create a token data
    const tokenData = {
      id: existingUser._id,
      email: existingUser.email,
      username: existingUser.username,
      isAdmin: existingUser.isAdmin,
    };

    // 4. Create jwt token
    const jwt_secret = process.env.TOKEN_SECRET!;

    const token = await jwt.sign(tokenData, jwt_secret, {
      expiresIn: "1d",
    });

    existingUser.otpCode = undefined;
    existingUser.otpCodeExpiry = undefined;

    await existingUser.save();

    const response = NextResponse.json(
      {
        status: true,
        message: "OTP Verified successfully!",
        data: { existingUser },
      },
      { status: 201 }
    );

    response.cookies.set(NEXT_COOKIE_KEY, token, {
      httpOnly: true,
      path: "/",
    });

    return response;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unexpected error occured!";
    console.log("AUTH_VERIFY_OTP Error ->", err);

    return NextResponse.json(
      { status: false, message: errorMessage },
      { status: 500 }
    );
  }
}
