import "server-only"
import { auth } from "@/auth"
import { forbidden, redirect } from "next/navigation"
import { ownerStatus } from "@/lib/owner-policy"
import { audit } from "@/lib/owner-audit"
export const privateHeaders = { "Cache-Control": "private, no-store, max-age=0", "X-Robots-Tag": "noindex, nofollow, noarchive", "X-Content-Type-Options": "nosniff" }
export async function requireOwner() {
  const session = await auth()
  const status = ownerStatus(session)
  if (status !== 200) {
    audit("authorization_denied")
    if (status === 401) redirect("/login")
    forbidden()
  }
  return session!
}
export async function ownerApiDenial() {
  const status = ownerStatus(await auth())
  if (status === 200) return null
  audit("authorization_denied")
  return Response.json({ error: status === 401 ? "Unauthorized" : "Forbidden" }, { status, headers: privateHeaders })
}
export function sameOrigin(request: Request) { return request.headers.get("origin") === new URL(request.url).origin }
