import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Handle admin routes authentication
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const sessionCookie = request.cookies.get('admin-session')
    
    // Allow access to login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }
    
    // Redirect to login if no session
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Add security headers
  const response = NextResponse.next()
  
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  return response
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
}
