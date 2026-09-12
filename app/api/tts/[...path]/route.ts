import { createHmac } from "node:crypto"
import { ttsIdentity, ttsOriginAllowed } from "@/lib/tts-access"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 300
const MAX_BODY = 4 * 1048576 + 65536
const privateHeaders = { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" }
const error = (status: number, detail: string) => Response.json({ detail }, { status, headers: privateHeaders })

async function boundedBody(body: ReadableStream<Uint8Array> | null, limit: number): Promise<Uint8Array> {
  if (!body) return new Uint8Array()
  const reader = body.getReader()
  const chunks: Uint8Array[] = []
  let length = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      length += value.byteLength
      if (length > limit) { await reader.cancel(); throw new RangeError("Request too large") }
      chunks.push(value)
    }
  } finally { reader.releaseLock() }
  const result = new Uint8Array(length)
  let offset = 0
  for (const chunk of chunks) { result.set(chunk, offset); offset += chunk.length }
  return result
}

async function gateway(request: Request, context: { params: Promise<{ path: string[] }> }) {
  const identity = await ttsIdentity()
  if (!identity) return error(401, "Enter your tester invitation code.")
  if (["POST", "DELETE"].includes(request.method) && !ttsOriginAllowed(request)) return error(403, "This request must come from this website.")
  const { path } = await context.params
  const route = path.join("/")
  const id = "[a-f0-9]{32}"
  const permitted = (request.method === "POST" && (route === "imports" || route === "jobs" || new RegExp(`^jobs/${id}/(cancel|retry|parts/[1-9][0-9]{0,3}/retry)$`).test(route))) ||
    (request.method === "GET" && new RegExp(`^jobs/${id}(/audio|/download|/zip|/parts/[1-9][0-9]{0,3}/(audio|download))?$`).test(route)) ||
    (request.method === "DELETE" && new RegExp(`^jobs/${id}$`).test(route))
  if (!permitted) return error(404, "Not found.")
  const secret = process.env.TTS_SERVER_SECRET
  const worker = process.env.TTS_WORKER_URL
  if (!secret || secret.length < 32 || !worker) return error(503, "Audio service is not configured yet.")
  try {
    const base = new URL(worker)
    const local = ["localhost", "127.0.0.1", "[::1]"].includes(base.hostname)
    if ((!local && base.protocol !== "https:") || !["http:", "https:"].includes(base.protocol) || base.username || base.password || base.search || base.hash || base.pathname !== "/") {
      return error(503, "Audio service configuration needs attention.")
    }
    const headers = new Headers({
      Authorization: `Bearer ${secret}`,
      "X-TTS-Owner": createHmac("sha256", secret).update(identity).digest("hex"),
    })
    const audio = /\/(audio|download|zip)$/.test(route)
    const range = request.headers.get("range")
    if (audio && range) {
      if (!/^bytes=(\d+-\d*|-\d+)$/.test(range)) return error(416, "Invalid audio range.")
      headers.set("Range", range)
    }
    let body: Uint8Array | undefined
    if (request.method === "POST") {
      if (Number(request.headers.get("content-length")) > MAX_BODY) return error(413, "File exceeds the 4 MiB limit.")
      body = await boundedBody(request.body, MAX_BODY)
      headers.set("Content-Type", request.headers.get("content-type") ?? "application/json")
    }
    const upstream = await fetch(new URL(route, base), {
      method: request.method, headers, body: body as BodyInit | undefined, redirect: "error", cache: "no-store",
      signal: AbortSignal.any([request.signal, AbortSignal.timeout(audio ? 300000 : 15000)]),
    })
    const resultHeaders = new Headers(privateHeaders)
    if (audio && upstream.ok) {
      for (const name of ["content-type", "content-length", "content-range", "accept-ranges", "content-disposition"]) {
        const value = upstream.headers.get(name)
        if (value) resultHeaders.set(name, value)
      }
      return new Response(upstream.body, { status: upstream.status, headers: resultHeaders })
    }
    if (upstream.status === 204) return new Response(null, { status: 204, headers: resultHeaders })
    const data = JSON.parse(new TextDecoder().decode(await boundedBody(upstream.body, MAX_BODY)))
    if (!upstream.ok) {
      const allowedErrors: Record<number, string> = {
        401: "Audio service authentication needs attention.", 404: "Audio job was not found or has expired.",
        410: "This audio has expired. Generate it again.", 413: "File exceeds the size limit.",
        422: "Please check the text or file. Only simple TXT/DOCX with Thai, English and Mandarin Chinese are supported.",
        429: "Another audio job is running. Please wait and try again.",
        503: "Audio service is unavailable. Please try again later.",
      }
      const detail = typeof data.detail === "string" && data.detail.length < 300 && !/Traceback|\/Users\/|Bearer|https?:\/\//i.test(data.detail) && [413, 422].includes(upstream.status)
        ? data.detail : (allowedErrors[upstream.status] ?? "Audio request failed. Please try again.")
      return error(upstream.status < 500 ? upstream.status : 503, detail)
    }
    return Response.json(data, { status: upstream.status, headers: resultHeaders })
  } catch (cause) {
    if (cause instanceof RangeError) return error(413, "Request is too large.")
    return error(503, "Audio service is unavailable. Please try again later.")
  }
}
export { gateway as GET, gateway as POST, gateway as DELETE }
