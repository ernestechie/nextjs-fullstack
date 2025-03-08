import { NEXT_COOKIE_KEY } from "@/constants/enum";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export interface UserTokenData {
  id: string;
  isAdmin: boolean;
  email: string;
  username: string;
}

export default async function getTokenData(request: NextRequest) {
  try {
    const token = request.cookies.get(NEXT_COOKIE_KEY);
    const tokenValue = token?.value || "";

    const decodedTokenValue = jwt.verify(
      tokenValue,
      process.env.TOKEN_SECRET!
    ) as UserTokenData;

    return decodedTokenValue?.id;
  } catch (err) {
    console.log(err);
    throw new Error(
      err instanceof Error ? err.message : "Unexpected error occured"
    );
  } finally {
  }
}
