import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || '';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/reset-password',
    '/api/auth/reset-password-request',
  ];
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  // Redirect authenticated users away from login page
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Protect all routes except public paths
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Role-based access control
  if (token && !isPublicPath) {
    try {
      const verified = await jwtVerify(
        token,
        new TextEncoder().encode(JWT_SECRET)
      );
      const userRole = verified.payload.role as string;

      // Admin routes
      if (pathname.startsWith('/admin') && userRole !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      // Teacher routes
      if (pathname.startsWith('/teacher') && !['admin', 'faculty'].includes(userRole)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      // Student routes
      if (pathname.startsWith('/student') && !['admin', 'faculty', 'student'].includes(userRole)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      // Redirect users to their appropriate dashboards
      if (pathname === '/dashboard') {
        switch (userRole) {
          case 'admin':
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
          case 'faculty':
            return NextResponse.redirect(new URL('/teacher/dashboard', request.url));
          case 'student':
            return NextResponse.redirect(new URL('/student/dashboard', request.url));
        }
      }
    } catch (error) {
      // Invalid token
      request.cookies.delete('token');
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};