import { auth, isAllowedInternalEmail } from "@/auth"
import { put } from "@vercel/blob"
import { createHash } from "node:crypto"

export const runtime = "nodejs"

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.email || !isAllowedInternalEmail(session.user.email)) {
    return new Response("Unauthorized", { status: 401 })
  }
  if (request.headers.get("content-length") && request.headers.get("content-length") !== "0") {
    return Response.json({ operation: "REJECTED", reason: "request body is not accepted" }, { status: 400 })
  }
  const payload = JSON.stringify({
    schemaVersion: "aios.telemetry.shadow.v1",
    classification: "test",
    source: "oidc-capability-proof",
    rows: [],
  }, null, 0)
  const digest = createHash("sha256").update(payload).digest("hex")
  const pathname = `shadow/${digest}.json`
  let blob
  try {
    blob = await put(pathname, payload, { access: "private", addRandomSuffix: false, contentType: "application/json", allowOverwrite: false })
  } catch {
    return Response.json({
      oidcAvailable: Boolean(process.env.VERCEL_OIDC_TOKEN),
      storeBindingAvailable: Boolean(process.env.BLOB_STORE_ID),
      storeIdentityMatched: process.env.BLOB_STORE_ID === "store_NfYL3Uteyb0tW1MJ",
      operation: "FAILED_CLOSED",
    }, { status: 502 })
  }
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
