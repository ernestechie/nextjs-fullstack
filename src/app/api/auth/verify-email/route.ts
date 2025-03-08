import { NEXT_COOKIE_KEY } from "@/constants/auth";
import { connect } from "@/db/db.config";
import UserModel from "@/models/UserModel";

import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const { token } = requestBody;

    // Get a user with the token, where the token expiry date is greater than today.
    // That means a user that has an account pending verification
    const user = await UserModel.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user)
      return NextResponse.json(
        {
          status: false,
          message: "Invalid or expired token",
          data: null,
        },
        { status: 400 }
      );

    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    const response = NextResponse.json(
      {
        status: true,
        message: "Email Verification Successful!",
        data: null,
      },
      { status: 200 }
    );

    // TODO: Abstract cookie setting logic to lib function.

    //  3. Create a token data
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
    };

    const jwt_secret = process.env.TOKEN_SECRET!;

    // 4. Create jwt token
    const jwtToken = await jwt.sign(tokenData, jwt_secret, {
      expiresIn: "1d",
    });

    response.cookies.set(NEXT_COOKIE_KEY, jwtToken, {
      httpOnly: true,
      path: "/",
    });

    // TODO: Abstract cookie setting logic to lib function.

    return response;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unexpected error occured!";
    console.log("AUTH_LOGIN Error ->", err);

    return NextResponse.json(
      { status: false, message: errorMessage },
      { status: 500 }
    );
  }
}
