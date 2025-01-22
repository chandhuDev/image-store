import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export function middleware(request) {
  const token = request.cookies.get('token');

  if (!token && 
      (request.nextUrl.pathname.startsWith('/api') || 
       request.nextUrl.pathname.startsWith('/'))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    if (token) {
      verify(token, process.env.JWT_SECRET);
    }
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/api/protected/:path*', '/dashboard/:path*', '/profile']
};