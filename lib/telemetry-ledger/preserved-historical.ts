import "server-only"
import snapshot from "@/data/telemetry/preserved-historical-spend-evidence.json"

export type PreservedHistoricalEvidence = typeof snapshot

export function getPreservedHistoricalEvidence(): PreservedHistoricalEvidence {
  return snapshot
}
