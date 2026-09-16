import "server-only"
import { createHash } from "node:crypto"
import snapshot from "@/data/telemetry/internal-candidate-snapshot.json"
import { loadInternalTelemetryDecisionSnapshot } from "@/lib/telemetry-ledger/decision-snapshot"
import { getPreservedHistoricalEvidence } from "@/lib/telemetry-ledger/preserved-historical"
import { requireOwner } from "@/lib/owner-access"

export type HistoricalRecord = { id: string; kind: string; title: string; artifactDate: string | null; fields: Record<string, string | number | null> }
const digest = (value: unknown) => createHash("sha256").update(JSON.stringify(value)).digest("hex")
function records(): HistoricalRecord[] {
  const groups: Array<[string, Array<Record<string, string | number | null>>]> = [
    ["model", snapshot.modelRows], ["task", snapshot.taskRows],
    ["gate", snapshot.governanceGateOutcomes], ["claim", snapshot.claimMovements], ["advisory", snapshot.lowConfidenceRows],
  ]
  return groups.flatMap(([kind, rows]) => rows.map((fields, index) => ({
    id: digest({ source: snapshot.source.checksumPrefix, kind, index, fields }).slice(0, 24), kind,
    title: String(fields.taskTitle ?? fields.gateName ?? fields.claimAfter ?? fields.exclusionReason ?? `${kind} record ${index + 1}`),
    artifactDate: typeof fields.sourceArtifactDate === "string" ? fields.sourceArtifactDate : null,
    fields,
  })))
}
export async function historicalTelemetry() {
  await requireOwner()
  return { generatedAt: snapshot.generatedAt, source: snapshot.source.kind, sourceFreshness: snapshot.source.sourceFreshness, sourceChecksumPrefix: snapshot.source.checksumPrefix, exportDigest: digest(snapshot), claimBoundary: snapshot.claimBoundary, records: records(), spend: loadInternalTelemetryDecisionSnapshot(), preservedSpend: getPreservedHistoricalEvidence() }
}
export async function historicalRecord(id: string) {
  await requireOwner()
  if (!/^[a-f0-9]{24}$/.test(id)) return null
  const record = records().find(row => row.id === id)
  return record ? { record, recordDigest: digest(record.fields), exportDigest: digest(snapshot), generatedAt: snapshot.generatedAt, source: snapshot.source.kind, sourceChecksumPrefix: snapshot.source.checksumPrefix, claimBoundary: snapshot.claimBoundary } : null
}
