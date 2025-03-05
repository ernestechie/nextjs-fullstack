import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./stackHandler";

import { NEXT_COOKIE_KEY } from "@/contants/enum";
import validateRoute from "./validatePath";

const routes = ["/login", "/signup"];

export const withPublic: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    const correctRoute = validateRoute({ routes, pathname });

    if (correctRoute) {
      const token = request.cookies.get(NEXT_COOKIE_KEY);
      if (token) {
        const url = new URL(`/app`, request.url);
        return NextResponse.redirect(url);
      }
    }
    return next(request, _next);
  };
};
