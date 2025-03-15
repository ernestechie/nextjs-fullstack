import { connect } from "@/db/db.config";
import { getUserFriendlyError } from "@/lib/api/error";

import getTokenData from "@/lib/api/user/getTokenData";
import UserModel from "@/models/UserModel";
import UserModel2 from "@/models/UserModel2";

import { NextRequest, NextResponse } from "next/server";

connect();
export async function GET(req: NextRequest) {
  try {
    const userId = await getTokenData(req);

    const user =
      (await UserModel.findById(userId).select("-password -__v")) ??
      (await UserModel2.findById(userId).select("-password -__v"));

    if (!user || user?.isAdmin === false)
      return NextResponse.json(
        {
          message: "Unauthorized",
          users: null,
        },
        { status: 401 }
      );

    const users = await UserModel.find().select("-password -__v");

    const response = NextResponse.json(
      {
        status: true,
        message: "Users Retrieved Successfully",
        users,
      },
      { status: 200 }
    );

    return response;
  } catch (err) {
    const errorMessage = getUserFriendlyError(err);

    console.log("API_USERS Error ->", errorMessage);

    return NextResponse.json(
      { status: false, message: errorMessage },
      { status: 400 }
    );
  }
}
