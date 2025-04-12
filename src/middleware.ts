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
    '/contact-admin',
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/reset-password',
    '/api/auth/reset-password-request',
    '/api/seed-admin', // Allow seeding the admin user
    '/account-pending',
    '/account-rejected',
  ];
  
  // Paths that are accessible without login for demo purposes
  const demoAccessPaths = [
    '/dashboard',
    '/academics',
    '/student',
    '/teacher',
    '/admin',
    '/ai-tutor',
  ];
  
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
  const isDemoPath = demoAccessPaths.some(path => pathname.startsWith(path));

  // Allow access to demo paths without login
  if (isDemoPath && !token) {
    return NextResponse.next();
  }

  // Redirect authenticated users away from login page
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Protect all routes except public paths and demo paths
  if (!isPublicPath && !isDemoPath && !token) {
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
      const accountStatus = verified.payload.accountStatus as string;

      // Check account status
      if (accountStatus === 'pending') {
        return NextResponse.redirect(new URL('/account-pending', request.url));
      }

      if (accountStatus === 'rejected') {
        return NextResponse.redirect(new URL('/account-rejected', request.url));
      }

      // Admin routes
      if (pathname.startsWith('/admin') && userRole !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      // Teacher routes
      if (pathname.startsWith('/teacher') && !['admin', 'teacher'].includes(userRole)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      // Student routes
      if (pathname.startsWith('/student') && !['admin', 'teacher', 'student'].includes(userRole)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      // Mark attendance route - only teachers and admins can access
      if (pathname.includes('/attendance') && !['admin', 'teacher'].includes(userRole)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      // Redirect users to their appropriate dashboards
      if (pathname === '/dashboard') {
        switch (userRole) {
          case 'admin':
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
          case 'teacher':
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