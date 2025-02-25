/* eslint-disable @typescript-eslint/no-explicit-any */

import { jwtDecode } from "jwt-decode";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./stackHandler";

const adminRoutes = ["/app/admin"];

export const withAdmin: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;

    if (adminRoutes.some((path) => pathname.startsWith(path))) {
      const token = request.cookies.get("nextjs-fs-token");

      let url: any = null;
      if (!token) {
        url = new URL(`/login`, request.url);
      } else {
        const user: any = jwtDecode(token.value);
        console.log("User  -> ", user);

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
