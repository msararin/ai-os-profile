import { notFound } from "next/navigation"
import { requireOwner } from "@/lib/owner-access"
import { privateArtifact } from "@/lib/cockpit/store"
import { Panel, PrivateLink } from "@/components/cockpit-ui"
export default async function Evidence({ params }: { params: Promise<{ id: string }> }) {
  await requireOwner()
  const { id } = await params, result = await privateArtifact(id)
  if (!result) notFound()
  return <><h1 className="mb-6 break-words text-2xl font-semibold">{result.entry.title}</h1><Panel title="Provenance and custody"><p>SHA-256: <code className="break-all">{result.entry.sha256}</code></p><p>{result.entry.bytes} bytes · read-only migration snapshot · integrity verified</p><p className="mt-3">Producer: original source repository. Verifier: deterministic checksum comparison. Limitation: integrity does not verify the truth or freshness of the content.</p><p className="mt-4"><PrivateLink href={"/api/cockpit/artifacts/"+id}>Download preserved artifact</PrivateLink></p></Panel>{result.entry.kind === "source" && <pre className="mt-5 max-h-[65vh] overflow-auto rounded-xl border bg-white p-6 text-xs leading-6">{result.bytes.toString("utf8")}</pre>}</>
}
