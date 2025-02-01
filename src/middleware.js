import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("imageToken")?.value;

  const publicPaths = ["/login", "/signup"];

  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  if (!token && !isPublicPath) {
    if (request.nextUrl.pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/create", "/post/:path*", "/login", "/signup"],
};
