// This script tests the middleware configuration
const fs = require('fs');
const path = require('path');

// Path to middleware.ts file
const middlewarePath = path.join(__dirname, '..', 'src', 'middleware.ts');

// Check if middleware.ts exists
if (!fs.existsSync(middlewarePath)) {
  console.error('ERROR: middleware.ts file not found!');
  process.exit(1);
}

// Read middleware.ts content
const middlewareContent = fs.readFileSync(middlewarePath, 'utf8');

console.log('Analyzing middleware configuration...');

// Check for common issues
const issues = [];

// Check if NextAuth is imported correctly
if (!middlewareContent.includes('import { withAuth }')) {
  issues.push('NextAuth withAuth import is missing or incorrect');
}

// Check if admin routes are protected
if (!middlewareContent.includes('request.nextUrl.pathname.startsWith(\'/admin\')')) {
  issues.push('Admin route protection is missing or incorrect');
}

// Check if admin-bypass routes are handled
if (!middlewareContent.includes('/admin-bypass')) {
  issues.push('Admin-bypass route handling is missing');
}

// Check if token role check is present
if (!middlewareContent.includes('token?.role === \'admin\'')) {
  issues.push('Admin role check is missing or incorrect');
}

// Display results
if (issues.length === 0) {
  console.log('✓ Middleware configuration looks correct');
} else {
  console.log('Issues found in middleware configuration:');
  issues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue}`);
  });
}

// Suggest fix for middleware
console.log('\nRecommended middleware.ts configuration:');
console.log(`
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  // Allow public access to all pages except admin routes
  // Also allow admin-bypass routes without authentication for testing
  if (!request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/admin-bypass')) {
    return NextResponse.next();
  }

  // For admin routes, use NextAuth middleware
  return (withAuth as any)(request, {
    callbacks: {
      authorized: ({ token }) => token?.role === 'admin',
    },
  });
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
`);

console.log('\nIMPORTANT: After updating the middleware, restart your Next.js server.');
console.log('Run: npm run dev');
