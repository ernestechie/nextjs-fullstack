import { connect } from "@/db/db.config";
// import { getUserFriendlyError } from "@/lib/api/error";
import getTokenData from "@/lib/api/user/getTokenData";
import UserModel from "@/models/UserModel";
import UserModel2 from "@/models/UserModel2";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function GET(request: NextRequest) {
  try {
    const userId = await getTokenData(request);
    const user =
      (await UserModel.findById(userId).select("-password -__v")) ??
      (await UserModel2.findById(userId).select("-password -__v"));

    if (!user)
      return NextResponse.json(
        {
          message: "Unauthorized",
          user: null,
        },
        { status: 401 }
      );

    return NextResponse.json(
      {
        message: "User retrieved succesfully!",
        user,
      },
      { status: 200 }
    );
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unexpected error occured!";
    console.log("AUTH_ME Error ->", err);

    return NextResponse.json(
      { status: false, message: errorMessage },
      { status: 400 }
    );
  }
}
