import { connect } from "@/db/db.config";
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
