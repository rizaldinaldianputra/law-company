import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    // Check for a dummy cookie/token. In a real application, you would use NextAuth or JWT validation here.
    const isAuthenticated = request.cookies.has('admin_session')
    
    // If not authenticated, redirect to the home page or a login page
    if (!isAuthenticated && pathname !== '/admin/login') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin/:path*',
}
