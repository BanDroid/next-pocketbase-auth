import { NextRequest, NextResponse } from "next/server";
import { isTokenExpired } from "pocketbase";
import { middlewareAuth } from "./util/auth";

export async function middleware(req: NextRequest) {
  const { isAuthenticated } = await middlewareAuth(req);
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      const url = req.nextUrl.clone();
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }
}
