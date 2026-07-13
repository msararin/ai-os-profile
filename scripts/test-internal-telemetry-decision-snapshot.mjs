#!/usr/bin/env node

import assert from "node:assert/strict"
import fs from "node:fs"
import {
  CONTRACT_ID,
  GENERATOR_VERSION,
  SCHEMA_VERSION,
  buildEnvelope,
  snapshotState,
  validateEnvelope,
} from "./internal-telemetry-decision-snapshot-core.mjs"

const generatedAt = "2026-07-13T07:00:00.000Z"
const snapshot = {
  contractId: CONTRACT_ID,
  schemaVersion: SCHEMA_VERSION,
  generatorVersion: GENERATOR_VERSION,
  snapshotVersion: "synthetic-v1",
  generatorSourceSha256: "c".repeat(64),
  generatedAt,
  source: {
    kind: "protected_sqlite_agent_runs_sanitized_aggregate",
    sourceDataSha256: "a".repeat(64),
    sourceFileSha256: "b".repeat(64),
    sourceFreshness: "2026-07-13T06:59:00.000Z",
    currency: "USD",
    timezone: "UTC",
  },
  spend: {
    period: { basis: "started_at", start: "2026-07-13T06:00:00.000Z", end: "2026-07-13T06:59:00.000Z" },
    populationCount: 2,
    numericCostRowCount: 1,
    nullCostRowCount: 1,
    numericCostUsdTotal: 0.125,
    groups: [{ provider: "synthetic", model: "model-a", costSource: "estimated", numericRowCount: 1, costUsd: 0.125 }],
  },
  approvalUsage: { status: "AUTHORITATIVE_CONTRACT_NOT_PROVEN" },
}

const envelope = buildEnvelope(snapshot)
assert.equal(validateEnvelope(envelope, envelope.integrity.payloadSha256).calculatedPayloadSha256, envelope.integrity.payloadSha256)
assert.equal(snapshotState(generatedAt, Date.parse("2026-07-13T07:30:00.000Z")), "FRESH")
assert.equal(snapshotState(generatedAt, Date.parse("2026-07-15T07:30:00.000Z")), "STALE")
assert.throws(() => validateEnvelope(envelope, "0".repeat(64)), /digest mismatch/)
assert.throws(() => validateEnvelope(buildEnvelope({ ...snapshot, approvalUsage: { status: "APPROVED" } }), buildEnvelope({ ...snapshot, approvalUsage: { status: "APPROVED" } }).integrity.payloadSha256), /not authorized/)
assert.throws(() => validateEnvelope(buildEnvelope({ ...snapshot, spend: { ...snapshot.spend, numericCostUsdTotal: 0.5 } }), buildEnvelope({ ...snapshot, spend: { ...snapshot.spend, numericCostUsdTotal: 0.5 } }).integrity.payloadSha256), /arithmetic invariant/)
const wrongSource = { ...snapshot, source: { ...snapshot.source, kind: "raw_sqlite" } }
assert.throws(() => validateEnvelope(buildEnvelope(wrongSource), buildEnvelope(wrongSource).integrity.payloadSha256), /source kind/)
const extraField = { ...snapshot, rawRows: [] }
assert.throws(() => validateEnvelope(buildEnvelope(extraField), buildEnvelope(extraField).integrity.payloadSha256), /unsupported fields/)
const wrongOrder = { ...snapshot, source: { ...snapshot.source, sourceFreshness: "2026-07-13T05:00:00.000Z" } }
assert.throws(() => validateEnvelope(buildEnvelope(wrongOrder), buildEnvelope(wrongOrder).integrity.payloadSha256), /timestamp ordering/)

assert.equal(snapshot.approvalUsage.status, "AUTHORITATIVE_CONTRACT_NOT_PROVEN")

const generatorSource = fs.readFileSync(
  new URL("./generate-internal-telemetry-decision-snapshot.mjs", import.meta.url),
  "utf8",
)
assert.match(generatorSource, /"record_classification"/)
assert.match(generatorSource, /record_classification = 'live'/)
assert.match(generatorSource, /synthetic trace-example fixtures are not an operational Spend source/)

const revokedManifest = JSON.parse(
  fs.readFileSync(new URL("../data/telemetry/internal-decision-snapshot.manifest.json", import.meta.url), "utf8"),
)
assert.equal(revokedManifest.status, "REVOKED_SYNTHETIC_FIXTURE")
assert.equal(revokedManifest.expectedPayloadSha256, "0".repeat(64))
const pageSource = fs.readFileSync(new URL("../app/internal/telemetry/page.tsx", import.meta.url), "utf8")
const approvalStart = pageSource.indexOf("Approved vs Non-standard Usage")
const approvalEnd = pageSource.indexOf("Model Dominance", approvalStart)
const approvalCard = pageSource.slice(approvalStart, approvalEnd)
assert.ok(approvalStart >= 0 && approvalEnd > approvalStart)
assert.match(approvalCard, /Route classification unavailable/)
assert.match(approvalCard, /no accepted versioned approval registry/)
assert.doesNotMatch(approvalCard, /<MetricList/)

console.log("PASS decision snapshot synthetic contract tests")
