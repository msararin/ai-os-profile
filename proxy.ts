import { auth } from "@/auth"

export default auth((request) => {
  const { nextUrl } = request
  const isAuthenticated = Boolean(request.auth)

  if (!isAuthenticated) {
    const signInUrl = new URL("/api/auth/signin", nextUrl.origin)
    signInUrl.searchParams.set("callbackUrl", nextUrl.href)

    return Response.redirect(signInUrl)
  }

  return undefined
})

export const config = {
  matcher: ["/internal/:path*", "/api/internal/:path*"],
}
