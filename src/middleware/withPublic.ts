/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./stackHandler";

import { NEXT_COOKIE_KEY } from "@/constants/auth";
import { tokenHasExpired } from "@/lib/token";
import { jwtDecode } from "jwt-decode";
import validateRoute from "./validatePath";

const routes = ["/auth/login", "/auth/signup", "/auth/verify"];

export const withPublic: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    const correctRoute = validateRoute({ routes, pathname });

    if (correctRoute) {
      const token = request.cookies.get(NEXT_COOKIE_KEY);
      if (token) {
        const user: any = jwtDecode(token?.value || "");
        const tokenExpired = tokenHasExpired(user.exp);

        if (!tokenExpired) {
          const url = new URL(`/app`, request.url);
          return NextResponse.redirect(url);
        }
      }
    }
    return next(request, _next);
  };
};
