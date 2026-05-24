import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Paths that require authentication
const protectedPaths = ['/internal']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if path requires authentication
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))

  if (isProtectedPath) {
    // Check for session cookie
    const sessionCookie = request.cookies.get('next-auth.session-token') || 
                          request.cookies.get('__Secure-next-auth.session-token')

    if (!sessionCookie) {
      // No session - redirect to sign-in
      const signInUrl = new URL('/auth/signin', request.url)
      signInUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(signInUrl)
    }

    // Log unauthorized access attempts (for security monitoring)
    console.log(`[Auth] Protected path accessed: ${pathname}`)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/internal/:path*',
    '/api/internal/:path*'
  ]
}
