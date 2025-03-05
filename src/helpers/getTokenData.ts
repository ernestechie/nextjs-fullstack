/* eslint-disable @typescript-eslint/no-explicit-any */
import { NEXT_COOKIE_KEY } from "@/contants/enum";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export default async function getTokenData(request: NextRequest) {
  try {
    const token = request.cookies.get(NEXT_COOKIE_KEY);
    const tokenValue = token?.value || "";

    const decodedTokenValue: any = jwt.verify(
      tokenValue,
      process.env.TOKEN_SECRET!
    );

    console.log("DecodedTokenValue ->", decodedTokenValue);

    return decodedTokenValue?.id;
  } catch (err) {
    console.log(err);
    throw new Error(
      err instanceof Error ? err.message : "Unexpected error occured"
    );
  } finally {
  }
}
