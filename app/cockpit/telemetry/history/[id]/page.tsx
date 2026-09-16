import { notFound } from "next/navigation"
import { requireOwner } from "@/lib/owner-access"
import { historicalRecord } from "@/lib/cockpit/history"
import { Panel, Table, PrivateLink, Tag } from "@/components/cockpit-ui"

export default async function HistoryRecord({ params }: { params: Promise<{ id: string }> }) {
  await requireOwner()
  const result = await historicalRecord((await params).id)
  if (!result) notFound()
  const { record } = result
  return <div className="space-y-6"><PrivateLink href="/cockpit/telemetry?view=history">← Historical telemetry</PrivateLink><div><Tag>{record.kind} · archived evidence</Tag><h1 className="mt-3 break-words text-3xl font-semibold">{record.title}</h1></div>
    <Panel title="Captured record"><Table headings={["Field","Captured value"]} rows={Object.entries(record.fields).map(([key,value])=>[key,value===null?"Not exposed in source":String(value)])}/></Panel>
    <Panel title="Meaning, measurement and missingness"><p>{result.claimBoundary} A candidate record is not automatically an executed run, API call or verified model result. Numeric values retain their original scope; no cost or token value is inferred.</p><p className="mt-3">Source-artifact date: {record.artifactDate ?? "Not exposed"}. Execution timestamp and per-record provider receipt are not supplied by this export. Explicit local/not-applicable labels remain distinct from missing fields; advisory records do not support authoritative conclusions.</p></Panel>
    <Panel title="Provenance and custody"><p>Source: {result.source}. Snapshot generated: {result.generatedAt}. Source checksum prefix: {result.sourceChecksumPrefix}. Paths omitted from the sanitized export remain omitted.</p><p className="mt-3 break-all">Export content SHA-256: {result.exportDigest}</p><p className="mt-3 break-all">Captured fields SHA-256: {result.recordDigest}</p><p className="mt-3">Hashes identify this exported content; they do not independently verify the underlying historical claim. Read-only, server-authorized owner view.</p></Panel>
  </div>
}
