import "server-only"
import { readFile, stat } from "node:fs/promises"
import path from "node:path"
import { createHash } from "node:crypto"
import { z } from "zod"
import { get } from "@vercel/blob"
import { cache } from "react"
import { requireOwner } from "@/lib/owner-access"
const entrySchema = z.object({ id: z.string().regex(/^[a-f0-9]{24}$/), title: z.string().max(250), sha256: z.string().regex(/^[a-f0-9]{64}$/), bytes: z.number().int().nonnegative().max(5_000_000), kind: z.enum(["source", "artifact"]), mediaType: z.string().max(100) }).strict()
const manifestSchema = z.object({ version: z.literal(1), sourceCommit: z.string().regex(/^[a-f0-9]{40}$/), entries: z.array(entrySchema).max(1000) }).strict()
const storeRoot = () => process.env.COCKPIT_PRIVATE_STORE_PATH || path.join(process.cwd(), "private-content")
// A digest-pinned, private Blob snapshot survives ordinary Git deployments.
const remoteArchive = cache(async () => {
  await requireOwner()
  const pathname = process.env.COCKPIT_PRIVATE_ARCHIVE
  const expected = process.env.COCKPIT_PRIVATE_ARCHIVE_SHA256
  if (!pathname || !/^owner-cockpit\/[a-f0-9]{64}\.json$/.test(pathname) || !expected || !/^[a-f0-9]{64}$/.test(expected)) return null
  try {
    const result = await get(pathname, { access: "private", useCache: false })
    if (!result || result.statusCode !== 200) return null
    const reader = result.stream.getReader(), chunks: Uint8Array[] = []
    let size = 0
    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        size += value.byteLength
        if (size > 10_000_000) { await reader.cancel(); return null }
        chunks.push(value)
      }
    } finally { reader.releaseLock() }
    const bytes = Buffer.concat(chunks)
    if (createHash("sha256").update(bytes).digest("hex") !== expected) return null
    const parsed = z.object({ version: z.literal(1), manifest: manifestSchema, contents: z.record(z.string().regex(/^[a-f0-9]{24}$/), z.string().max(7_000_000)) }).strict().parse(JSON.parse(bytes.toString("utf8")))
    return parsed
  } catch { return null }
})
export async function privateIndex() {
  await requireOwner()
  if (process.env.COCKPIT_PRIVATE_ARCHIVE) return (await remoteArchive())?.manifest ?? null
  try {
    const file = path.join(storeRoot(), "manifest.json")
    if ((await stat(file)).size > 1_000_000) throw new Error("size")
    return manifestSchema.parse(JSON.parse(await readFile(file, "utf8")))
  } catch { return null }
}
export async function privateArtifact(id: string) {
  await requireOwner()
  if (!/^[a-f0-9]{24}$/.test(id)) return null
  const index = await privateIndex()
  const entry = index?.entries.find(item => item.id === id)
  if (!entry) return null
  try {
    let bytes: Buffer
    if (process.env.COCKPIT_PRIVATE_ARCHIVE) {
      const archive = await remoteArchive(), encoded = archive?.contents[id]
      if (!encoded) return null
      bytes = Buffer.from(encoded, "base64")
    } else {
      const file = path.join(storeRoot(), entry.id)
      if ((await stat(file)).size !== entry.bytes) return null
      bytes = await readFile(file)
    }
    if (bytes.length !== entry.bytes) return null
    if (createHash("sha256").update(bytes).digest("hex") !== entry.sha256) return null
    return { entry, bytes }
  } catch { return null }
}
