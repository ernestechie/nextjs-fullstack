/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export default async function getTokenData(request: NextRequest) {
  try {
    const token = request.cookies.get("tooken");
    const tokenValue = token?.value || "";

    console.log("TokenValue ->", tokenValue);

    const decodedToken: any = jwt.verify(tokenValue, process.env.TOKEN_SECRET!);

    return decodedToken.id;
  } catch (err) {
    console.log(err);
    throw new Error(
      err instanceof Error ? err.message : "Unexpected error occured"
    );
  } finally {
  }
}
