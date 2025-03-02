import { connect } from "@/db/db.config";
import UserModel from "@/models/UserModel";

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // 1: Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser)
      return NextResponse.json(
        { status: false, message: "Invalid email or password" },
        { status: 401 }
      );

    // 2. Check if password is correct
    const passwordIsValid = await bcryptjs.compare(
      password,
      existingUser.password
    );

    // 3. Create a token data
    const tokenData = {
      id: existingUser._id,
      email: existingUser.email,
      username: existingUser.username,
      isAdmin: existingUser.isAdmin,
    };

    const jwt_secret = process.env.TOKEN_SECRET!;

    // 4. Create jwt token
    const token = await jwt.sign(tokenData, jwt_secret, {
      expiresIn: "1d",
    });

    if (!passwordIsValid)
      return NextResponse.json(
        { status: false, message: "Invalid email or password" },
        { status: 401 }
      );

    const response = NextResponse.json(
      {
        status: true,
        message: "Login Successful",
        data: { user: tokenData, token },
      },
      { status: 200 }
    );

    response.cookies.set("nextjs-fs-token", token, {
      httpOnly: true,
      path: "/",
    });

    return response;
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
