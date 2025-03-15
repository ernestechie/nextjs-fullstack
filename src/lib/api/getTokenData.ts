import { NEXT_COOKIE_KEY } from "@/constants/auth";
import { UserTokenData } from "@/types/auth";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export default async function getTokenData(request: NextRequest) {
  try {
    const token =
      request.cookies.get(NEXT_COOKIE_KEY)?.value ||
      request.headers.get("Authorization") ||
      "";

    const decodedTokenValue = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    ) as UserTokenData;

    return decodedTokenValue?.id;
  } catch (err) {
    console.log(err);
    return null;
  }
}
