import { auth, isAllowedInternalEmail } from "@/auth"
import { put } from "@vercel/blob"
import { createHash } from "node:crypto"

export const runtime = "nodejs"

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.email || !isAllowedInternalEmail(session.user.email)) {
    return new Response("Unauthorized", { status: 401 })
  }
  const body = await request.json().catch(() => ({}))
  const payload = JSON.stringify({
    schemaVersion: "aios.telemetry.shadow.v1",
    classification: "live",
    generatedAt: body.generatedAt ?? "2026-07-14T00:00:00.000Z",
    rows: [],
  })
  const digest = createHash("sha256").update(payload).digest("hex")
  const pathname = `shadow/${digest}.json`
  const blob = await put(pathname, payload, { access: "private", addRandomSuffix: false, contentType: "application/json" })
  return Response.json({
    oidcAvailable: Boolean(process.env.VERCEL_OIDC_TOKEN),
    storeBindingAvailable: Boolean(process.env.BLOB_STORE_ID),
    storeIdentityMatched: process.env.BLOB_STORE_ID === "store_NfYL3Uteyb0tW1MJ",
    operation: "UPLOADED",
    pathname,
    digest,
    size: Buffer.byteLength(payload),
    url: blob.url,
  })
}
