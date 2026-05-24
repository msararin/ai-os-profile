import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

// Paths that require authentication
const protectedPaths = ['/internal']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if path requires authentication
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))

  if (isProtectedPath) {
    // Get session using NextAuth
    const session = await auth()

    if (!session) {
      // No session - redirect to sign-in
      const signInUrl = new URL('/auth/signin', request.url)
      signInUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(signInUrl)
    }

    // Session exists and email was already validated in auth.ts signIn callback
    // If user got a session, they passed the email allowlist check
    console.log(`[Auth] Authorized access: ${session.user?.email} → ${pathname}`)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/internal/:path*',
    '/api/internal/:path*'
  ]
}
