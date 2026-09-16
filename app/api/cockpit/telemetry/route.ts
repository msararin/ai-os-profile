import { ownerApiDenial, privateHeaders } from "@/lib/owner-access"
import { operations } from "@/lib/cockpit/operations"
export const dynamic = "force-dynamic"
export async function GET() {
  const denied = await ownerApiDenial(); if (denied) return denied
  const result = await operations()
  return Response.json(result, { headers: privateHeaders })
}
