/* eslint-disable @typescript-eslint/no-explicit-any */
import { NEXT_COOKIE_KEY } from "@/constants/auth";

import { tokenHasExpired } from "@/lib/token";
import { jwtDecode } from "jwt-decode";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./stackHandler";
import { default as validateRoute } from "./validatePath";

// function getSearchParam(param: string, url: any) {
//   return url.searchParams.get(param);
// }

const routes = ["/app"];

export const withUser: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    const correctRoute = validateRoute({ routes, pathname });

    const url = new URL("/auth/login", request.url);
    if (correctRoute) {
      const token = request.cookies.get(NEXT_COOKIE_KEY);
      if (!token) return NextResponse.redirect(url);

      const user: any = jwtDecode(token?.value || "");
      const tokenExpired = tokenHasExpired(user.exp);

      if (!user || tokenExpired) return NextResponse.redirect(url);
    }

    return next(request, _next);
  };
};
