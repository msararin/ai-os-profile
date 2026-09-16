import { ownerApiDenial, privateHeaders } from "@/lib/owner-access"
export const dynamic = "force-dynamic"
async function denyUnknown() {
  const denied = await ownerApiDenial(); if (denied) return denied
  return Response.json({ error: "Not found" }, { status: 404, headers: privateHeaders })
}
export { denyUnknown as GET, denyUnknown as POST, denyUnknown as PUT, denyUnknown as PATCH, denyUnknown as DELETE }
