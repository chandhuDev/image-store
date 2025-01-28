import { NextResponse } from 'next/server'
 
export function middleware(request) {
  // Get the token from cookies
  const token = request.cookies.get('token')?.value
  
  // Public paths that don't require authentication
  const publicPaths = ['/login', '/signup']
  
  // Check if the current path is public
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname)

  // Redirect logic
  if (!token && !isPublicPath) {
    if (request.nextUrl.pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  

  if (token && isPublicPath) {
    // If has token and trying to access login/signup, redirect to dashboard
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/create',        
    '/post/:path*',
    '/login',
    '/signup',     
  ]
}