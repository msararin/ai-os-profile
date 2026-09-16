import { ownerApiDenial, sameOrigin, privateHeaders } from "@/lib/owner-access"
import { put } from "@vercel/blob"
import { createHash } from "node:crypto"

export const runtime = "nodejs"

export async function POST(request: Request) {
  const denied = await ownerApiDenial()
  if (denied) return denied
  if (!sameOrigin(request)) return Response.json({ error: "Forbidden" }, { status: 403, headers: privateHeaders })
  if (process.env.VERCEL_ENV !== "preview") return Response.json({ error: "Not found" }, { status: 404, headers: privateHeaders })
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
  try {
    await put(pathname, payload, { access: "private", addRandomSuffix: false, contentType: "application/json", allowOverwrite: false })
  } catch {
    return Response.json({
      oidcAvailable: Boolean(process.env.VERCEL_OIDC_TOKEN),
      storeBindingAvailable: Boolean(process.env.BLOB_STORE_ID),
      storeIdentityMatched: Boolean(process.env.EXPECTED_BLOB_STORE_ID) && process.env.BLOB_STORE_ID === process.env.EXPECTED_BLOB_STORE_ID,
      operation: "FAILED_CLOSED",
    }, { status: 502 })
  }
  return Response.json({
    oidcAvailable: Boolean(process.env.VERCEL_OIDC_TOKEN),
    storeBindingAvailable: Boolean(process.env.BLOB_STORE_ID),
    storeIdentityMatched: Boolean(process.env.EXPECTED_BLOB_STORE_ID) && process.env.BLOB_STORE_ID === process.env.EXPECTED_BLOB_STORE_ID,
    operation: "UPLOADED",
    pathname,
    digest,
    size: Buffer.byteLength(payload),
  })
}
