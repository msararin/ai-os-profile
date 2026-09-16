import { ownerApiDenial, privateHeaders } from "@/lib/owner-access"
import { privateArtifact } from "@/lib/cockpit/store"
import { audit } from "@/lib/owner-audit"
export const dynamic = "force-dynamic"
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await ownerApiDenial(); if (denied) return denied
  const { id } = await params, result = await privateArtifact(id)
  if (!result) return Response.json({ error: "Not found" }, { status: 404, headers: privateHeaders })
  audit("export")
  const title = result.entry.title.split("/").at(-1) ?? `${id}.bin`
  const filename = encodeURIComponent(title).replace(/['()*]/g, c => "%" + c.charCodeAt(0).toString(16).toUpperCase())
  return new Response(new Uint8Array(result.bytes), { headers: { ...privateHeaders, "Content-Type": "application/octet-stream", "Content-Disposition": `attachment; filename="${id}.bin"; filename*=UTF-8''${filename}`, "Content-Security-Policy": "sandbox; default-src 'none'" } })
}
