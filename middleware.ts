import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const adminSession = request.cookies.get('admin_session')?.value

  // Check if accessing admin routes
  if (pathname.startsWith('/admin')) {
    // Allow access to login page even if not logged in
    if (pathname === '/admin/login') {
      // If already logged in, redirect to dashboard
      if (adminSession === 'true') {
        return NextResponse.redirect(new URL('/admin', request.url))
      }
      return NextResponse.next()
    }

    // Require session for all other admin routes
    if (adminSession !== 'true') {
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
  ],
}
