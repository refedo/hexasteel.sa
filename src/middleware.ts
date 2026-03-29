import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// TEMPORARY: Disable authentication middleware to allow admin access
// We'll implement a simpler authentication system
export default function middleware(request: NextRequest) {
  // Allow all routes for now - we'll handle auth at the page level
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
