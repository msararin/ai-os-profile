import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import { isLocalInternalReviewAccessEnabled } from '@/lib/local-internal-review'

const protectedPaths = ['/internal']
const localReviewCookie = 'local-internal-review'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const timestamp = new Date().toISOString()

  // Check if path requires authentication
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))

  if (isProtectedPath) {
    console.log(`[Middleware] ${timestamp} - Protected path accessed: ${pathname}`)

    if (isLocalInternalReviewAccessEnabled()) {
      console.log(`[Middleware] Local internal review access enabled for development: ${pathname}`)
      const response = NextResponse.next()
      response.cookies.set(localReviewCookie, '1', {
        httpOnly: false,
        sameSite: 'lax',
        secure: false,
        path: '/internal',
      })
      return response
    }
    
    // Log all cookies for debugging
    const cookies = request.cookies.getAll()
    const authCookies = cookies.filter(c => c.name.includes('auth'))
    console.log(`[Middleware] Auth cookies present: ${authCookies.map(c => c.name).join(', ') || 'NONE'}`)
    
    // Get session using NextAuth
    const session = await auth()

    if (!session) {
      // No session - redirect to sign-in
      console.log(`[Middleware] ❌ No session found - redirecting to sign-in`)
      const signInUrl = new URL('/auth/signin', request.url)
      signInUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(signInUrl)
    }

    // Session exists and email was already validated in auth.ts signIn callback
    // If user got a session, they passed the email allowlist check
    console.log(`[Middleware] ✅ Authorized access: ${session.user?.email} → ${pathname}`)
    const response = NextResponse.next()
    response.cookies.set(localReviewCookie, '', {
      maxAge: 0,
      path: '/internal',
    })
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/internal/:path*',
    '/api/internal/:path*'
  ]
}
