import { audit } from "@/lib/owner-audit"
import { accessDenied } from "@/lib/access-denied"
import { auth } from "@/auth"
import { ownerStatus } from "@/lib/owner-policy"
import { NextResponse } from "next/server"
export default auth((request) => {
  const status = ownerStatus(request.auth)
  const headers = { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow, noarchive" }
  if (status !== 200) {
    audit("authorization_denied")
    if (request.nextUrl.pathname.startsWith("/api/")) return NextResponse.json({ error: status === 401 ? "Unauthorized" : "Forbidden" }, { status, headers })
    if (status === 401) {
      const response = NextResponse.redirect(new URL("/login", request.url))
      Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value))
      return response
    }
    return accessDenied(headers)
  }
  const response = NextResponse.next()
  Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value))
  return response
})
export const config = { matcher: ["/cockpit/:path*", "/api/cockpit/:path*", "/internal/:path*", "/api/internal/:path*"] }
