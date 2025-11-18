export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/employee/:path*',
    '/admin/:path*',
    '/my-documents/:path*',
    '/my-tickets/:path*',
  ],
};
