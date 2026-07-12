#!/usr/bin/env node

import crypto from "node:crypto"
import fs from "node:fs"
import path from "node:path"
import Database from "better-sqlite3"

const inputPath = process.argv[2] || "/Users/apple/projects/optimize-worker/observability/aios_observability.sqlite"
const outputPath = process.argv[3] || "data/telemetry/internal-candidate-snapshot.json"
const checksumPrefix = crypto.createHash("sha256").update(fs.readFileSync(inputPath)).digest("hex").slice(0, 16)
const db = new Database(inputPath, { readonly: true, fileMustExist: true })
db.pragma("query_only = ON")

const count = (table) => Number(db.prepare(`SELECT COUNT(*) AS count FROM ${table}`).get().count)
const candidates = db.prepare("SELECT entity_type, extraction_confidence, coverage_class, claim_level, evidence_type, missing_fields_json, record_json FROM telemetry_backfill_candidate_records ORDER BY id").all()
const exclusions = db.prepare("SELECT exclusion_reason, claim_level, extraction_confidence, missing_fields_json FROM telemetry_backfill_exclusions ORDER BY id").all()
const batch = db.prepare("SELECT backfill_batch_id, mode, claim_level, created_at FROM telemetry_backfill_batches ORDER BY id DESC LIMIT 1").get() ?? null
const generatedAt = batch?.created_at
  ? `${batch.created_at.replace(" ", "T")}Z`
  : "SOURCE_ARTIFACT_MISSING_FIELD"

const group = (rows, key) => Object.entries(rows.reduce((acc, row) => {
  const label = row[key] || "SOURCE_ARTIFACT_MISSING_FIELD"
  acc[label] = (acc[label] ?? 0) + 1
  return acc
}, {})).sort((a, b) => b[1] - a[1]).map(([label, value]) => ({ label, value }))

const safeRecord = (value) => {
  try {
    const record = JSON.parse(value)
    return {
      entityType: record.record_type || "SOURCE_ARTIFACT_MISSING_FIELD",
      taskTitle: typeof record.task_title === "string" ? record.task_title.slice(0, 160) : null,
      provider: typeof record.provider === "string" ? record.provider : null,
      requestedModel: typeof record.requested_model === "string" ? record.requested_model : null,
      returnedModel: typeof record.returned_model === "string" ? record.returned_model : null,
      totalTokens: typeof record.total_tokens === "number" ? record.total_tokens : null,
      cost: typeof record.cost === "number" ? record.cost : null,
      sourceArtifactDate: typeof record.source_artifact_date === "string" ? record.source_artifact_date : null,
    }
  } catch {
    return { entityType: "SOURCE_ARTIFACT_MISSING_FIELD", taskTitle: null, provider: null, requestedModel: null, returnedModel: null, totalTokens: null, cost: null, sourceArtifactDate: null }
  }
}

const parseObject = (value) => {
  try {
    const parsed = JSON.parse(value)
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {}
  } catch {
    return {}
  }
}

const parseArray = (value) => {
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed.map(String) : []
  } catch {
    return []
  }
}

const safeText = (value, fallback = "SOURCE_ARTIFACT_MISSING_FIELD") => {
  if (typeof value !== "string" || value.trim() === "") return fallback
  const text = value.replace(/\/Users\/[\w.-]+\/[^\s]*/g, "REDACTED_SOURCE_PATH").slice(0, 180)
  return /(?:api[_-]?key|secret|cookie|authorization|bearer)\s*[:=]/i.test(text)
    ? "REDACTED_PRIVATE_VALUE"
    : text
}

const candidateRecords = candidates.map((row) => ({ ...row, record: parseObject(row.record_json) }))

const roleReviewerRoutes = group(
  candidateRecords
    .filter((row) => row.entity_type === "role_execution")
    .map((row) => ({
      label: `${safeText(row.record.intended_role)} / ${safeText(row.record.reviewer_independence)}`,
    })),
  "label",
).slice(0, 10).map((row) => ({ ...row, detail: "intended role / reviewer independence; source-limited candidate aggregate" }))

const governanceGateOutcomes = candidateRecords
  .filter((row) => row.entity_type === "governance_gate")
  .slice(0, 30)
  .map((row) => ({
    gateName: safeText(row.record.gate_name),
    gateStatus: safeText(row.record.gate_status),
    gateVerdict: safeText(row.record.gate_verdict),
    dataSourceType: "STAGING_CANDIDATE",
  }))

const claimMovements = candidateRecords
  .filter((row) => row.entity_type === "claim_movement")
  .slice(0, 30)
  .map((row) => ({
    sourceArtifactDate: safeText(row.record.source_artifact_date),
    claimBefore: safeText(row.record.claim_before),
    claimAfter: safeText(row.record.claim_after),
    claimMovement: safeText(row.record.claim_movement),
    dataSourceType: "STAGING_CANDIDATE",
  }))

const missingTelemetryWarnings = group(
  candidates.flatMap((row) => parseArray(row.missing_fields_json).map((label) => ({ label }))),
  "label",
).slice(0, 12).map((row) => ({ ...row, detail: "export-limited missing-field occurrence count" }))

const lowConfidenceRows = exclusions.slice(0, 40).map((row) => ({
  exclusionReason: safeText(row.exclusion_reason),
  claimLevel: safeText(row.claim_level),
  extractionConfidence: safeText(row.extraction_confidence),
  missingFieldCount: parseArray(row.missing_fields_json).length,
  dataSourceType: "LOW_CONFIDENCE_ADVISORY",
}))

const modelRows = candidates.filter((row) => row.entity_type === "model_usage").map((row) => ({ ...safeRecord(row.record_json), claimLevel: row.claim_level, coverageClass: row.coverage_class }))
const taskRows = candidates.filter((row) => row.entity_type === "task_run").map((row) => ({ ...safeRecord(row.record_json), claimLevel: row.claim_level, coverageClass: row.coverage_class }))
const snapshot = {
  schemaVersion: 2,
  generatorVersion: "20260712.1",
  generatedAt,
  source: {
    kind: "local_sqlite_candidates",
    sourceFreshness: batch?.created_at ?? "SOURCE_ARTIFACT_MISSING_FIELD",
    checksumPrefix,
    databasePathOmitted: true,
  },
  claimBoundary: "Candidate/backfill records; not verified production runtime telemetry.",
  preservedBoundaries: {
    candidateRecords: 2297,
    backfillClassRecords: 2259,
    historicalMissingFieldOccurrences: 69881,
    exportLimitedTop12Occurrences: 26957,
    delta2Status: "UNRESOLVED",
    value18019Status: "NON_CLAIMABLE_NON_ADDITIVE"
  },
  counts: {
    agentRuns: count("agent_runs"),
    candidateRecords: candidates.length,
    exclusions: exclusions.length,
    backfillCandidates: candidates.filter((row) => (row.coverage_class || "").includes("BACKFILL")).length,
  },
  entityTypes: group(candidates, "entity_type"),
  coverageClasses: group(candidates, "coverage_class"),
  extractionConfidence: group(candidates, "extraction_confidence"),
  exclusionReasons: group(exclusions, "exclusion_reason"),
  roleReviewerRoutes,
  governanceGateOutcomes,
  claimMovements,
  missingTelemetryWarnings,
  lowConfidenceRows,
  modelRows: modelRows.slice(0, 12),
  taskRows: taskRows.slice(0, 12),
  batch: batch ? { ...batch, sourcePathOmitted: true } : null,
}

db.close()
fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`)
console.log(`Wrote ${outputPath}: ${candidates.length} candidate records, ${exclusions.length} exclusions, source checksum ${checksumPrefix}`)
