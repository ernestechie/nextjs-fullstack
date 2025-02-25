import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./stackHandler";

// function getSearchParam(param: string, url: any) {
//   return url.searchParams.get(param);
// }

const userRoutes = ["/app"];

export const withUser: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;

    if (userRoutes.some((path) => pathname.startsWith(path))) {
      const userId = request.cookies.get("nextjs-fs-token");
      if (!userId) {
        const url = new URL(`/login`, request.url);
        return NextResponse.redirect(url);
      }
    }
    return next(request, _next);
  };
};
