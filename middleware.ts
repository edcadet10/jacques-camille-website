import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware for Next.js application
 * Adds security headers and protects against common web vulnerabilities
 */
export function middleware(request: NextRequest) {
  // Get the response
  const response = NextResponse.next();
  
  // Add security headers
  const securityHeaders = {
    // Strict-Transport-Security enforces HTTPS
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    
    // X-Content-Type-Options prevents MIME type sniffing
    'X-Content-Type-Options': 'nosniff',
    
    // X-Frame-Options prevents clickjacking
    'X-Frame-Options': 'DENY',
    
    // X-XSS-Protection enables browser XSS filtering
    'X-XSS-Protection': '1; mode=block',
    
    // Referrer-Policy controls how much referrer information should be included with requests
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Permissions-Policy limits which features and APIs can be used
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  };

  // Set headers on the response
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  // Block the x-middleware-subrequest header to protect against the CVE-2025-29927 vulnerability
  // Although we're on a patched version, this provides additional protection
  const blockedHeader = request.headers.get('x-middleware-subrequest');
  if (blockedHeader) {
    return new NextResponse('Unauthorized Request', { status: 403 });
  }
  
  // Return the modified response
  return response;
}

/**
 * Configure which paths the middleware should run on
 */
export const config = {
  matcher: [
    // Apply to all routes except static files, images, and api routes
    '/((?!_next/static|_next/image|favicon.ico|public/|api/).*)'
  ],
};
