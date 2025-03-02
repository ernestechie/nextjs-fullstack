import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./stackHandler";
import validatePath from "./validatePath";

const routes = ["/login", "/signup"];

export const withPublic: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;

    if (validatePath({ routes, pathname })) {
      const token = request.cookies.get("nextjs-fs-token");
      if (token) {
        const url = new URL(`/app`, request.url);
        return NextResponse.redirect(url);
      }
    }
    return next(request, _next);
  };
};
