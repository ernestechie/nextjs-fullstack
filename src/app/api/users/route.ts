import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/db/db.config";
import getTokenData from "@/lib/api/user/getTokenData";
import UserModel from "@/models/UserModel";
import UserModel2 from "@/models/UserModel2";

import catchErrorsAsync from "@/lib/api/error/error-wrapper";
import AppError from "@/modules/AppError";

connect();
export const GET = catchErrorsAsync(async (req: NextRequest) => {
  const userId = await getTokenData(req);

  const user =
    (await UserModel.findById(userId).select("-password -__v")) ??
    (await UserModel2.findById(userId).select("-password -__v"));

  if (!user || user?.isAdmin === false)
    throw new AppError("Unauthorized User", 401);

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
});
