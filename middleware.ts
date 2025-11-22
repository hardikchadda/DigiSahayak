import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

<<<<<<< HEAD
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;

  // Allow login and API routes without authentication
  if (pathname === '/login' || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // If no token, redirect to login for protected routes
  if (!token) {
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

=======
// This is a simplified middleware that doesn't use auth() to avoid edge runtime issues
// Auth checking is done in individual page components instead
export function middleware(request: NextRequest) {
  // Allow all requests to pass through
  // Auth will be checked in the page components using getServerSession
>>>>>>> 0c3ca3a312480db61ae58ed577a338f170a2ce8f
  return NextResponse.next();
}

export const config = {
<<<<<<< HEAD
  matcher: ['/', '/profile', '/employee/:path*', '/admin/:path*', '/search', '/updates', '/categories/:path*', '/schemes/:path*'],
=======
  matcher: [
    '/dashboard/:path*',
    '/employee/:path*',
    '/admin/:path*',
    '/my-documents/:path*',
    '/my-tickets/:path*',
  ],
>>>>>>> 0c3ca3a312480db61ae58ed577a338f170a2ce8f
};
