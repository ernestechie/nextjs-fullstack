import axios from "axios";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./stackHandler";
import validatePath from "./validatePath";

// function getSearchParam(param: string, url: any) {
//   return url.searchParams.get(param);
// }

const routes = ["/app"];

export const withUser: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;

    if (validatePath({ routes, pathname })) {
      const token = request.cookies.get("nextjs-fs-token");
      const res = await fetch(`${process.env.DOMAIN}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      });

      const resData = await res.json();

      console.log("Response -> ", resData);

      if (!token) {
        const url = new URL(`/login`, request.url);
        return NextResponse.redirect(url);
      }
    }
    return next(request, _next);
  };
};
