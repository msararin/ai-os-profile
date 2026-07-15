import { auth, isAllowedInternalEmail } from "@/auth"
import { get, put } from "@vercel/blob"
import { createHash, randomUUID } from "node:crypto"

export const runtime = "nodejs"
let lastRun = 0

export async function POST(request: Request) {
  if (process.env.VERCEL_ENV !== "preview") return Response.json({ ok: false, reason: "preview_only" }, { status: 404 })
  const origin = request.headers.get("origin")
  if (origin && !origin.includes("vercel.app")) return Response.json({ ok: false, reason: "origin_rejected" }, { status: 403 })
  const session = await auth()
  if (!session?.user?.email || !isAllowedInternalEmail(session.user.email)) return new Response("Unauthorized", { status: 401 })
  if (Date.now() - lastRun < 60_000) return Response.json({ ok: false, reason: "rate_limited" }, { status: 429 })
  lastRun = Date.now()
  const payload = JSON.stringify({ schemaVersion: "aios.telemetry.shadow.v1", classification: "test", source: "operator-oidc-roundtrip", rows: [] })
  const digest = createHash("sha256").update(payload).digest("hex")
  const pathname = `test/${digest}.json`
  try {
    const first = await put(pathname, payload, { access: "private", addRandomSuffix: false, allowOverwrite: false, contentType: "application/json" })
    const read = await get(pathname, { access: "private" })
    const bytes = read && read.statusCode === 200 ? Buffer.from(await new Response(read.stream).arrayBuffer()) : Buffer.alloc(0)
    const parity = bytes.equals(Buffer.from(payload))
    const second = await put(pathname, payload, { access: "private", addRandomSuffix: false, allowOverwrite: false, contentType: "application/json" }).then(() => "OVERWRITE_ALLOWED").catch(() => "IDEMPOTENT_CONFLICT")
    return Response.json({ ok: parity, environment: "preview", classification: "test", pathname, digest, bytes: bytes.length, write: Boolean(first), readBack: Boolean(read), byteParity: parity, digestParity: createHash("sha256").update(bytes).digest("hex") === digest, idempotency: second, nonce: randomUUID() })
  } catch {
    return Response.json({ ok: false, environment: "preview", classification: "test", operation: "FAILED_CLOSED" }, { status: 502 })
  }
}
