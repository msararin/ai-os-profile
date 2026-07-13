import crypto from "node:crypto"

export const CONTRACT_ID = "internal.telemetry.spend.recorded-cost-usd.v1"
export const SCHEMA_VERSION = 1
export const GENERATOR_VERSION = "20260713.1"
export const ENVIRONMENT_VARIABLE = "INTERNAL_TELEMETRY_SANITIZED_SNAPSHOT_V1"
export const MAX_PAYLOAD_BYTES = 16_384
export const MAX_GROUPS = 24
export const MAX_LABEL_LENGTH = 80
export const MAX_AGE_MS = 24 * 60 * 60 * 1000
export const MAX_FUTURE_SKEW_MS = 5 * 60 * 1000

export const sha256 = (value) =>
  crypto.createHash("sha256").update(value).digest("hex")

export const canonicalJson = (value) => JSON.stringify(value)

const assertExactKeys = (value, expected, label) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`)
  const actual = Object.keys(value).sort()
  const keys = [...expected].sort()
  if (actual.length !== keys.length || !actual.every((key, index) => key === keys[index])) {
    throw new Error(`${label} contains unsupported fields`)
  }
}

const timestampMs = (value) => Date.parse(value.endsWith("+00:00Z") ? value.slice(0, -1) : value)

export function assertUtcTimestamp(value, label) {
  if (typeof value !== "string" || value.length > 40 || !/^\d{4}-\d{2}-\d{2}T/.test(value)) {
    throw new Error(`${label} must be a bounded ISO timestamp`)
  }
  const normalized = value.endsWith("+00:00Z") ? value.slice(0, -1) : value
  if (!Number.isFinite(Date.parse(normalized))) {
    throw new Error(`${label} is not parseable`)
  }
  if (!(value.endsWith("Z") || value.endsWith("+00:00"))) {
    throw new Error(`${label} must use UTC semantics`)
  }
}

export function assertSafeLabel(value, label) {
  if (typeof value !== "string" || value.length < 1 || value.length > MAX_LABEL_LENGTH) {
    throw new Error(`${label} has invalid length`)
  }
  if (/\p{Cc}/u.test(value)) {
    throw new Error(`${label} contains control characters`)
  }
}

export function snapshotState(generatedAt, now = Date.now()) {
  assertUtcTimestamp(generatedAt, "generatedAt")
  const parsed = Date.parse(generatedAt.endsWith("+00:00Z") ? generatedAt.slice(0, -1) : generatedAt)
  return now - parsed > MAX_AGE_MS ? "STALE" : "FRESH"
}

export function buildEnvelope(snapshot) {
  const payloadSha256 = sha256(canonicalJson(snapshot))
  return {
    envelopeVersion: 1,
    integrity: { payloadSha256 },
    snapshot,
  }
}

export function validateEnvelope(envelope, expectedPayloadSha256) {
  const encoded = canonicalJson(envelope)
  if (Buffer.byteLength(encoded, "utf8") > MAX_PAYLOAD_BYTES) {
    throw new Error("payload exceeds maximum size")
  }
  assertExactKeys(envelope, ["envelopeVersion", "integrity", "snapshot"], "payload envelope")
  const { integrity, snapshot } = envelope
  if (envelope.envelopeVersion !== 1 || !integrity || !snapshot) {
    throw new Error("unsupported payload envelope")
  }
  assertExactKeys(integrity, ["payloadSha256"], "integrity")
  assertExactKeys(snapshot, ["contractId", "schemaVersion", "generatorVersion", "snapshotVersion", "generatorSourceSha256", "generatedAt", "source", "spend", "approvalUsage"], "snapshot")
  const calculated = sha256(canonicalJson(snapshot))
  if (integrity.payloadSha256 !== calculated || calculated !== expectedPayloadSha256) {
    throw new Error("payload digest mismatch")
  }
  if (
    snapshot.contractId !== CONTRACT_ID ||
    snapshot.schemaVersion !== SCHEMA_VERSION ||
    snapshot.generatorVersion !== GENERATOR_VERSION ||
    typeof snapshot.generatorSourceSha256 !== "string" ||
    !/^[a-f0-9]{64}$/.test(snapshot.generatorSourceSha256)
  ) {
    throw new Error("unsupported snapshot contract")
  }
  assertUtcTimestamp(snapshot.generatedAt, "generatedAt")
  assertUtcTimestamp(snapshot.source.sourceFreshness, "sourceFreshness")
  assertUtcTimestamp(snapshot.spend.period.start, "period.start")
  assertUtcTimestamp(snapshot.spend.period.end, "period.end")
  assertExactKeys(snapshot.source, ["kind", "sourceDataSha256", "sourceFileSha256", "sourceFreshness", "currency", "timezone"], "source")
  assertExactKeys(snapshot.spend, ["period", "populationCount", "numericCostRowCount", "nullCostRowCount", "numericCostUsdTotal", "groups"], "spend")
  assertExactKeys(snapshot.spend.period, ["basis", "start", "end"], "period")
  assertExactKeys(snapshot.approvalUsage, ["status"], "approvalUsage")
  if (snapshot.source.kind !== "protected_sqlite_agent_runs_sanitized_aggregate") {
    throw new Error("unsupported source kind")
  }
  if (!/^[a-f0-9]{64}$/.test(snapshot.source.sourceDataSha256)) {
    throw new Error("invalid source data digest")
  }
  if (!/^[a-f0-9]{64}$/.test(snapshot.source.sourceFileSha256)) {
    throw new Error("invalid source file digest")
  }
  if (snapshot.source.currency !== "USD" || snapshot.source.timezone !== "UTC") {
    throw new Error("unsupported unit or timezone")
  }
  const groups = snapshot.spend.groups
  if (!Array.isArray(groups) || groups.length > MAX_GROUPS) {
    throw new Error("invalid group count")
  }
  let numericRows = 0
  let total = 0
  for (const [index, group] of groups.entries()) {
    assertExactKeys(group, ["provider", "model", "costSource", "numericRowCount", "costUsd"], `groups[${index}]`)
    assertSafeLabel(group.provider, `groups[${index}].provider`)
    assertSafeLabel(group.model, `groups[${index}].model`)
    assertSafeLabel(group.costSource, `groups[${index}].costSource`)
    if (!Number.isInteger(group.numericRowCount) || group.numericRowCount < 1) {
      throw new Error("invalid group numeric row count")
    }
    if (!Number.isFinite(group.costUsd) || group.costUsd < 0) {
      throw new Error("invalid group cost")
    }
    numericRows += group.numericRowCount
    total += group.costUsd
  }
  const spend = snapshot.spend
  if (
    !Number.isInteger(spend.populationCount) ||
    !Number.isInteger(spend.numericCostRowCount) ||
    !Number.isInteger(spend.nullCostRowCount) ||
    spend.populationCount !== spend.numericCostRowCount + spend.nullCostRowCount ||
    spend.numericCostRowCount !== numericRows ||
    Math.abs(spend.numericCostUsdTotal - total) > 1e-9
  ) {
    throw new Error("spend count or arithmetic invariant failed")
  }
  if (snapshot.approvalUsage.status !== "AUTHORITATIVE_CONTRACT_NOT_PROVEN") {
    throw new Error("approval usage contract is not authorized")
  }
  const periodStartMs = timestampMs(snapshot.spend.period.start)
  const periodEndMs = timestampMs(snapshot.spend.period.end)
  const sourceFreshnessMs = timestampMs(snapshot.source.sourceFreshness)
  const generatedAtMs = timestampMs(snapshot.generatedAt)
  if (!(periodStartMs <= periodEndMs && periodEndMs <= sourceFreshnessMs && sourceFreshnessMs <= generatedAtMs)) {
    throw new Error("timestamp ordering invariant failed")
  }
  if (generatedAtMs > Date.now() + MAX_FUTURE_SKEW_MS) {
    throw new Error("generatedAt exceeds future skew")
  }
  const state = snapshotState(snapshot.generatedAt) === "STALE" || snapshotState(snapshot.source.sourceFreshness) === "STALE"
    ? "STALE"
    : "FRESH"
  return { calculatedPayloadSha256: calculated, state }
}
