import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This is a simplified middleware that doesn't use auth() to avoid edge runtime issues
// Auth checking is done in individual page components instead
export function middleware(request: NextRequest) {
  // Allow all requests to pass through
  // Auth will be checked in the page components using getServerSession
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/employee/:path*',
    '/admin/:path*',
    '/my-documents/:path*',
    '/my-tickets/:path*',
  ],
};
