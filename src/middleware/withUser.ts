import { NEXT_COOKIE_KEY } from "@/contants/enum";
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

    if (correctRoute) {
      const token = request.cookies.get(NEXT_COOKIE_KEY);

      if (!token) {
        const url = new URL(`/login`, request.url);
        return NextResponse.redirect(url);
      }
    }
    return next(request, _next);
  };
};
