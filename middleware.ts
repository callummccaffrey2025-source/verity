import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const GATED = [/^\/ask($|\/)/, /^\/search($|\/)/, /^\/dashboard($|\/)/];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isGated = GATED.some((re) => re.test(pathname));
  if (!isGated) return NextResponse.next();

  const sub = req.cookies.get("verity_sub")?.value === "true";
  if (sub) return NextResponse.next();

  // redirect to /me (account/subscribe)
  const url = req.nextUrl.clone();
  url.pathname = "/me";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/ask/:path*", "/search/:path*", "/dashboard/:path*"],
};
