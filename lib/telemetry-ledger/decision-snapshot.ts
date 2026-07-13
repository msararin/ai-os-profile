import "server-only"

import { createHash } from "node:crypto"

import manifest from "@/data/telemetry/internal-decision-snapshot.manifest.json"

const MAX_PAYLOAD_BYTES = 16_384
const MAX_GROUPS = 24
const MAX_LABEL_LENGTH = 80
const MAX_AGE_MS = 24 * 60 * 60 * 1000
const MAX_FUTURE_SKEW_MS = 5 * 60 * 1000
const APPROVED_ENVIRONMENT_VARIABLE = "INTERNAL_TELEMETRY_SANITIZED_SNAPSHOT_V1"

type DecisionSnapshotGroup = {
  provider: string
  model: string
  costSource: string
  numericRowCount: number
  costUsd: number
}

export type SpendDecisionSnapshot = {
  snapshotVersion: string
  generatedAt: string
  sourceFreshness: string
  payloadSha256: string
  state: "FRESH" | "STALE"
  periodStart: string
  periodEnd: string
  populationCount: number
  numericCostRowCount: number
  nullCostRowCount: number
  numericCostUsdTotal: number
  groups: DecisionSnapshotGroup[]
}

export type DecisionSnapshotLoadResult =
  | { status: "AVAILABLE"; value: SpendDecisionSnapshot }
  | { status: "UNAVAILABLE"; reasonCode: string }

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex")

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
}

function hasExactKeys(value: Record<string, unknown>, keys: string[]) {
  const actual = Object.keys(value).sort()
  const expected = [...keys].sort()
  return actual.length === expected.length && actual.every((key, index) => key === expected[index])
}

function validUtcTimestamp(value: unknown): value is string {
  if (typeof value !== "string" || value.length > 40 || !/^\d{4}-\d{2}-\d{2}T/.test(value)) return false
  const normalized = value.endsWith("+00:00Z") ? value.slice(0, -1) : value
  return Number.isFinite(Date.parse(normalized)) && (value.endsWith("Z") || value.endsWith("+00:00"))
}

function validLabel(value: unknown): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= MAX_LABEL_LENGTH && !/\p{Cc}/u.test(value)
}

export function loadInternalTelemetryDecisionSnapshot(): DecisionSnapshotLoadResult {
  if (
    manifest.environmentVariable !== APPROVED_ENVIRONMENT_VARIABLE ||
    manifest.environmentVariable.startsWith("NEXT_PUBLIC_")
  ) return { status: "UNAVAILABLE", reasonCode: "SNAPSHOT_ENV_NAME_REJECTED" }
  const raw = process.env[manifest.environmentVariable]
  if (!raw) return { status: "UNAVAILABLE", reasonCode: "SNAPSHOT_ENV_ABSENT" }
  if (Buffer.byteLength(raw, "utf8") > MAX_PAYLOAD_BYTES) {
    return { status: "UNAVAILABLE", reasonCode: "SNAPSHOT_SIZE_REJECTED" }
  }

  try {
    const parsed: unknown = JSON.parse(raw)
    if (!isObject(parsed) || !hasExactKeys(parsed, ["envelopeVersion", "integrity", "snapshot"])) throw new Error("envelope")
    const integrity = parsed.integrity
    const snapshot = parsed.snapshot
    if (parsed.envelopeVersion !== 1 || !isObject(integrity) || !isObject(snapshot)) throw new Error("envelope")
    if (!hasExactKeys(integrity, ["payloadSha256"])) throw new Error("integrity")
    const calculatedPayloadSha256 = sha256(JSON.stringify(snapshot))
    if (
      integrity.payloadSha256 !== calculatedPayloadSha256 ||
      calculatedPayloadSha256 !== manifest.expectedPayloadSha256
    ) throw new Error("digest")
    if (!hasExactKeys(snapshot, ["contractId", "schemaVersion", "generatorVersion", "snapshotVersion", "generatorSourceSha256", "generatedAt", "source", "spend", "approvalUsage"])) throw new Error("snapshot")
    if (
      snapshot.contractId !== manifest.contractId ||
      snapshot.schemaVersion !== manifest.schemaVersion ||
      snapshot.generatorVersion !== manifest.generatorVersion ||
      snapshot.snapshotVersion !== manifest.snapshotVersion ||
      snapshot.generatorSourceSha256 !== manifest.generatorSourceSha256 ||
      typeof snapshot.generatorSourceSha256 !== "string" || !/^[a-f0-9]{64}$/.test(snapshot.generatorSourceSha256) ||
      !validUtcTimestamp(snapshot.generatedAt)
    ) throw new Error("contract")

    const source = snapshot.source
    const spend = snapshot.spend
    const approvalUsage = snapshot.approvalUsage
    if (!isObject(source) || !isObject(spend) || !isObject(approvalUsage)) throw new Error("sections")
    if (!hasExactKeys(source, ["kind", "sourceDataSha256", "sourceFileSha256", "sourceFreshness", "currency", "timezone"])) throw new Error("source")
    if (!hasExactKeys(spend, ["period", "populationCount", "numericCostRowCount", "nullCostRowCount", "numericCostUsdTotal", "groups"])) throw new Error("spend")
    if (!hasExactKeys(approvalUsage, ["status"]) || approvalUsage.status !== "AUTHORITATIVE_CONTRACT_NOT_PROVEN") throw new Error("approval")
    if (
      source.kind !== "protected_sqlite_agent_runs_sanitized_aggregate" ||
      typeof source.sourceDataSha256 !== "string" || !/^[a-f0-9]{64}$/.test(source.sourceDataSha256) ||
      typeof source.sourceFileSha256 !== "string" || !/^[a-f0-9]{64}$/.test(source.sourceFileSha256) ||
      !validUtcTimestamp(source.sourceFreshness) || source.currency !== "USD" || source.timezone !== "UTC"
    ) throw new Error("source")

    const period = spend.period
    if (!isObject(period) || !hasExactKeys(period, ["basis", "start", "end"]) || period.basis !== "started_at" || !validUtcTimestamp(period.start) || !validUtcTimestamp(period.end)) throw new Error("period")
    if (!Array.isArray(spend.groups) || spend.groups.length > MAX_GROUPS) throw new Error("groups")
    const groups: DecisionSnapshotGroup[] = []
    let numericRows = 0
    let total = 0
    for (const group of spend.groups) {
      if (!isObject(group) || !hasExactKeys(group, ["provider", "model", "costSource", "numericRowCount", "costUsd"])) throw new Error("group")
      if (!validLabel(group.provider) || !validLabel(group.model) || !validLabel(group.costSource)) throw new Error("label")
      if (!Number.isInteger(group.numericRowCount) || Number(group.numericRowCount) < 1 || typeof group.costUsd !== "number" || !Number.isFinite(group.costUsd) || group.costUsd < 0) throw new Error("group")
      const typed = group as unknown as DecisionSnapshotGroup
      groups.push(typed)
      numericRows += typed.numericRowCount
      total += typed.costUsd
    }

    if (
      !Number.isInteger(spend.populationCount) || !Number.isInteger(spend.numericCostRowCount) || !Number.isInteger(spend.nullCostRowCount) ||
      typeof spend.numericCostUsdTotal !== "number" || !Number.isFinite(spend.numericCostUsdTotal) || spend.numericCostUsdTotal < 0 ||
      Number(spend.populationCount) !== Number(spend.numericCostRowCount) + Number(spend.nullCostRowCount) ||
      Number(spend.numericCostRowCount) !== numericRows || Math.abs(Number(spend.numericCostUsdTotal) - total) > 1e-9
    ) throw new Error("arithmetic")

    const sourceFreshnessValue = source.sourceFreshness as string
    const sourceFreshnessMs = Date.parse(sourceFreshnessValue.endsWith("+00:00Z") ? sourceFreshnessValue.slice(0, -1) : sourceFreshnessValue)
    const generatedAtMs = Date.parse(snapshot.generatedAt.endsWith("+00:00Z") ? snapshot.generatedAt.slice(0, -1) : snapshot.generatedAt)
    const periodStartMs = Date.parse(period.start.endsWith("+00:00Z") ? period.start.slice(0, -1) : period.start)
    const periodEndMs = Date.parse(period.end.endsWith("+00:00Z") ? period.end.slice(0, -1) : period.end)
    if (
      !(periodStartMs <= periodEndMs && periodEndMs <= sourceFreshnessMs && sourceFreshnessMs <= generatedAtMs) ||
      generatedAtMs > Date.now() + MAX_FUTURE_SKEW_MS
    ) throw new Error("timestamp")
    return {
      status: "AVAILABLE",
      value: {
        snapshotVersion: String(snapshot.snapshotVersion),
        generatedAt: snapshot.generatedAt,
        sourceFreshness: sourceFreshnessValue,
        payloadSha256: calculatedPayloadSha256,
        state: Date.now() - generatedAtMs > MAX_AGE_MS || Date.now() - sourceFreshnessMs > MAX_AGE_MS ? "STALE" : "FRESH",
        periodStart: period.start,
        periodEnd: period.end,
        populationCount: Number(spend.populationCount),
        numericCostRowCount: Number(spend.numericCostRowCount),
        nullCostRowCount: Number(spend.nullCostRowCount),
        numericCostUsdTotal: Number(spend.numericCostUsdTotal),
        groups,
      },
    }
  } catch {
    return { status: "UNAVAILABLE", reasonCode: "SNAPSHOT_VALIDATION_REJECTED" }
  }
}
