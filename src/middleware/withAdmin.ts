/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./stackHandler";

import { NEXT_COOKIE_KEY } from "@/constants/auth";
import validateRoute from "./validatePath";

const routes = ["/app/admin"];

export const withAdmin: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    const correctRoute = validateRoute({ routes, pathname });

    if (correctRoute) {
      const token = request.cookies.get(NEXT_COOKIE_KEY);

      let url: any = null;
      if (!token) {
        url = new URL(`/login`, request.url);
      } else {
        const user: any = jwtDecode(token.value);

        if (!user) url = new URL(`/login`, request.url);
        else if (user && !user.isAdmin) {
          url = new URL(`/app`, request.url);
        } else return;
        console.log("url : ", url);
      }
      return NextResponse.redirect(url);
    }
    return next(request, _next);
  };
};
