import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./stackHandler";
import validatePath from "./validatePath";

const routes = ["/login", "/signup"];

export const withPublicPath: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;

    if (validatePath({ routes, pathname })) {
      const userId = request.cookies.get("nextjs-fs-token");
      if (userId) {
        const url = new URL(`/app`, request.url);
        return NextResponse.redirect(url);
      }
    }
    return next(request, _next);
  };
};
