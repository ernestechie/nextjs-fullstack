import { NEXT_COOKIE_KEY } from "@/contants/enum";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      status: true,
      message: "Logout Successful",
    });

    response.cookies.set(NEXT_COOKIE_KEY, "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unexpected error occured!";
    console.log("AUTH_LOGOUT Error ->", err);

    return NextResponse.json(
      { status: false, message: errorMessage },
      { status: 400 }
    );
  }
}
