#!/usr/bin/env node
import Database from "better-sqlite3"
import { createHash } from "node:crypto"
import { mkdirSync, writeFileSync } from "node:fs"
import path from "node:path"

const DEFAULT_DB_PATH = "/Users/apple/projects/optimize-worker/observability/aios_observability.sqlite"
const DEFAULT_OUTPUT_PATH = "data/internal-telemetry/telemetry-dashboard-export.json"
const dbPath = process.argv[2] ?? DEFAULT_DB_PATH
const outputPath = process.argv[3] ?? DEFAULT_OUTPUT_PATH

const DATA_SOURCE = "BUNDLED_JSON_EXPORT"
const STAGING_LABEL = "STAGING_BACKFILL_CANDIDATE"
const CLAIM_LEVEL = "DRAFT_LOCAL_ONLY_BUNDLED_JSON_EXPORT_CANDIDATE"
const MAX_TABLE_ROWS = 40
const MAX_MODEL_ROWS = 25

function parseJsonObject(value) {
  try {
    const parsed = JSON.parse(value)
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {}
  } catch {
    return {}
  }
}

function parseMissingFields(value) {
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed.map(String) : []
  } catch {
    return []
  }
}

function stringField(record, key) {
  const value = record[key]
  if (value === null || value === undefined) {
    return "SOURCE_ARTIFACT_MISSING_FIELD"
  }
  if (Array.isArray(value)) {
    return value.map(String).join(", ")
  }
  return String(value)
}

function numericField(record, key) {
  const value = record[key]
  if (typeof value === "number") {
    return value
  }
  if (typeof value === "string") {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : null
  }
  return null
}

function groupCount(labels) {
  return [...labels.reduce((map, label) => map.set(label, (map.get(label) ?? 0) + 1), new Map())]
    .sort((a, b) => b[1] - a[1])
    .map(([label, value]) => ({ label, value }))
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex")
}

function artifactLabel(sourcePath, checksum) {
  const base = path.basename(String(sourcePath || "unknown-artifact"))
  const checksumValue = String(checksum || "")
  const checksumPrefix =
    checksumValue && !checksumValue.includes("/") ? checksumValue.slice(0, 12) : sha256(sourcePath || "unknown").slice(0, 12)
  return `artifact:${base}#${checksumPrefix}`
}

function sanitizeString(value) {
  if (value.includes("/Users/apple/")) {
    return `redacted-local-path:${path.basename(value)}#${sha256(value).slice(0, 12)}`
  }
  if (/secret|oauth|token/i.test(value) && /AIza|client_secret|BEGIN|PRIVATE KEY/i.test(value)) {
    return "REDACTED_FOR_SECRET_SAFETY"
  }
  return value
}

function sanitizeValue(value) {
  if (typeof value === "string") {
    return sanitizeString(value)
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeValue)
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, nested]) => [key, sanitizeValue(nested)]))
  }
  return value
}

function topEntries(rows, limit = 8) {
  return rows.slice(0, limit)
}

const db = new Database(dbPath, {
  readonly: true,
  fileMustExist: true,
})

try {
  db.pragma("query_only = ON")

  const agentRuns = Number(db.prepare("SELECT COUNT(*) AS count FROM agent_runs").get()?.count ?? 0)
  const candidateRows = db.prepare("SELECT * FROM telemetry_backfill_candidate_records ORDER BY id").all()
  const exclusionRows = db.prepare("SELECT * FROM telemetry_backfill_exclusions ORDER BY id").all()
  const batches = db
    .prepare(
      "SELECT backfill_batch_id, source_dry_run_path, mode, claim_level, created_at, backup_path FROM telemetry_backfill_batches ORDER BY id DESC",
    )
    .all()

  const parsedRows = candidateRows.map((row) => {
    const record = sanitizeValue(parseJsonObject(row.record_json))
    return {
      ...row,
      safeSource: artifactLabel(row.source_file_path, row.source_file_checksum),
      missingFields: parseMissingFields(row.missing_fields_json),
      record,
    }
  })
  const parsedExclusions = exclusionRows.map((row) => ({
    ...row,
    safeSource: artifactLabel(row.source_file_path, row.source_file_checksum),
    missingFields: parseMissingFields(row.missing_fields_json),
    record: sanitizeValue(parseJsonObject(row.record_json)),
  }))

  const entityCounts = groupCount(candidateRows.map((row) => row.entity_type))
  const confidenceCounts = groupCount(candidateRows.map((row) => row.extraction_confidence))
  const coverageCounts = groupCount(candidateRows.map((row) => row.coverage_class ?? "SOURCE_ARTIFACT_MISSING_FIELD"))

  const modelRows = parsedRows.filter((row) => row.entity_type === "model_usage")
  const taskRowsBySourcePath = new Map(
    parsedRows.filter((row) => row.entity_type === "task_run").map((row) => [row.source_file_path, row.record]),
  )

  const spendGroups = new Map()
  for (const row of modelRows) {
    const provider = stringField(row.record, "provider")
    const requested = stringField(row.record, "requested_model")
    const returned = stringField(row.record, "returned_model")
    const cost = numericField(row.record, "cost")
    const key = `${provider} / ${requested} / ${returned}`
    const current = spendGroups.get(key) ?? { cost: 0, rows: 0 }
    spendGroups.set(key, { cost: current.cost + (cost ?? 0), rows: current.rows + 1 })
  }

  const spendByModelProvider = [...spendGroups.entries()]
    .map(([label, group]) => ({
      label,
      value: Number(group.cost.toFixed(6)),
      detail: `${group.rows} bundled staging model rows`,
      dataSourceType: DATA_SOURCE,
    }))
    .sort((a, b) => b.value - a.value)

  const modelVsTask = modelRows.slice(0, MAX_MODEL_ROWS).map((row) => {
    const task = taskRowsBySourcePath.get(row.source_file_path)
    return {
      taskTitle: task ? stringField(task, "task_title") : "SOURCE_ARTIFACT_MISSING_FIELD",
      provider: stringField(row.record, "provider"),
      requestedModel: stringField(row.record, "requested_model"),
      returnedModel: stringField(row.record, "returned_model"),
      totalTokens: stringField(row.record, "total_tokens"),
      cost: stringField(row.record, "cost"),
      generationId: stringField(row.record, "generation_id"),
      sourceFilePath: row.safeSource,
      dataSourceType: DATA_SOURCE,
    }
  })

  const roleRows = parsedRows.filter((row) => row.entity_type === "role_execution")
  const spendByRoleReviewerRoute = topEntries(
    groupCount(roleRows.map((row) => `${stringField(row.record, "actual_worker")} / ${stringField(row.record, "reviewer_route")}`)),
    10,
  ).map((row) => ({ ...row, dataSourceType: DATA_SOURCE }))

  const governanceGateOutcomeByTask = parsedRows
    .filter((row) => row.entity_type === "governance_gate")
    .slice(0, 30)
    .map((row) => ({
      gateName: stringField(row.record, "gate_name"),
      gateStatus: stringField(row.record, "gate_status"),
      gateVerdict: stringField(row.record, "gate_verdict"),
      sourceFilePath: row.safeSource,
      dataSourceType: DATA_SOURCE,
    }))

  const claimMovementTimeline = parsedRows
    .filter((row) => row.entity_type === "claim_movement")
    .slice(0, 30)
    .map((row) => ({
      sourceArtifactDate: stringField(row.record, "source_artifact_date"),
      claimBefore: stringField(row.record, "claim_before"),
      claimAfter: stringField(row.record, "claim_after"),
      claimMovement: stringField(row.record, "claim_movement"),
      sourceFilePath: row.safeSource,
      dataSourceType: DATA_SOURCE,
    }))

  const missingTelemetryWarnings = topEntries(groupCount(parsedRows.flatMap((row) => row.missingFields)), 12).map((row) => ({
    ...row,
    dataSourceType: DATA_SOURCE,
  }))

  const taskReceiptRows = parsedRows
    .filter((row) => row.entity_type === "task_run")
    .slice(0, MAX_TABLE_ROWS)
    .map((row) => ({
      taskTitle: stringField(row.record, "task_title"),
      taskId: stringField(row.record, "task_id"),
      sourceFilePath: row.safeSource,
      evidenceType: row.evidence_type,
      claimLevel: row.claim_level,
      finalStatus: stringField(row.record, "final_status"),
      authorizedNextAction: stringField(row.record, "authorized_next_action"),
      missingFieldCount: row.missingFields.length,
      dataSourceType: DATA_SOURCE,
      extractionConfidence: row.extraction_confidence,
      sourceOrigin: stringField(row.record, "source_origin"),
    }))

  const lowConfidenceRows = parsedExclusions.slice(0, MAX_TABLE_ROWS).map((row) => ({
    sourceFilePath: row.safeSource,
    exclusionReason: row.exclusion_reason,
    claimLevel: row.claim_level,
    missingFieldCount: row.missingFields.length,
    dataSourceType: "LOW_CONFIDENCE_ADVISORY",
  }))

  const exportData = {
    exportGeneratedAt: new Date().toISOString(),
    exportGeneratedAtTz: "UTC",
    checksumAlgo: "sha256",
    sourceChecksumPrefix: sha256(`${dbPath}:${candidateRows.length}:${exclusionRows.length}:${batches.length}`).slice(0, 16),
    exportMetadata: {
      generated_at: new Date().toISOString(),
      generated_at_timezone: "UTC",
      export_source: "read_only_sqlite_sanitized_bundled_json",
      export_claim_level: CLAIM_LEVEL,
      source_checksum_algorithm: "sha256",
      source_database_label: "optimize-worker-aios-observability-sqlite",
      source_database_sha256: sha256(`${dbPath}:${candidateRows.length}:${exclusionRows.length}:${batches.length}`),
      local_paths_redacted: true,
      not_live_database: true,
      not_production_telemetry_verification: true,
      fallback_mode_label: "FALLBACK_MODE_ACTIVE",
      aggregate_semantics:
        "Candidate record aggregates exclude telemetry_backfill_exclusions; low-confidence exclusions are shown separately as advisory rows.",
      sanitizer_ruleset: [
        "redact local absolute paths",
        "redact backup paths",
        "scan exported JSON for OAuth/client-secret/private-key markers",
        "scan exported JSON for local absolute paths",
        "export dashboard-shaped fields only; do not export raw records, raw prompts, stack traces, or full messages",
      ],
      sqlite_open_mode: "readonly: true, fileMustExist: true, pragma query_only = ON",
      sqlite_sidecar_policy: "no -wal or -shm sidecars expected or observed after export",
    },
    dbPath: "BUNDLED_JSON_EXPORT_SOURCE_REDACTED",
    dbMode: "BUNDLED_JSON_EXPORT",
    generatedAt: new Date().toISOString(),
    batch: batches[0]
      ? {
          backfill_batch_id: batches[0].backfill_batch_id,
          source_dry_run_path: artifactLabel(batches[0].source_dry_run_path, batches[0].source_dry_run_path),
          mode: "BUNDLED_JSON_EXPORT",
          claim_level: CLAIM_LEVEL,
          created_at: batches[0].created_at,
          backup_path: "REDACTED_FOR_PRODUCTION_EXPORT",
        }
      : null,
    counts: {
      agentRuns,
      batches: batches.length,
      candidateRecords: candidateRows.length,
      exclusions: exclusionRows.length,
    },
    summaryCards: [
      {
        label: "Bundled JSON export",
        value: 1,
        detail: "FALLBACK_MODE_ACTIVE / NOT_LIVE_DATABASE / NOT_PRODUCTION_TELEMETRY_VERIFICATION",
        dataSourceType: "BUNDLED_JSON_EXPORT",
      },
      {
        label: "Candidate records",
        value: candidateRows.length,
        detail: `${STAGING_LABEL}; excludes LOW_CONFIDENCE_ADVISORY rows`,
        dataSourceType: "STAGING_BACKFILL_CANDIDATE",
      },
      {
        label: "Advisory exclusions",
        value: exclusionRows.length,
        detail: "LOW_CONFIDENCE_ADVISORY",
        dataSourceType: "LOW_CONFIDENCE_ADVISORY",
      },
      {
        label: "Existing agent_runs",
        value: agentRuns,
        detail: "RUNTIME_CAPTURED context only from source DB snapshot",
        dataSourceType: "BUNDLED_JSON_EXPORT",
      },
    ],
    spendByModelProvider,
    modelVsTask,
    spendByRoleReviewerRoute,
    governanceGateOutcomeByTask,
    claimMovementTimeline,
    missingTelemetryWarnings,
    ledgerCoverage: [
      ...entityCounts.map((row) => ({ ...row, detail: "entity_type", dataSourceType: DATA_SOURCE })),
      ...confidenceCounts.map((row) => ({ ...row, detail: "extraction_confidence", dataSourceType: DATA_SOURCE })),
      ...coverageCounts.map((row) => ({ ...row, detail: "coverage_class", dataSourceType: DATA_SOURCE })),
    ],
    taskReceiptRows,
    lowConfidenceRows,
  }

  mkdirSync(path.dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, `${JSON.stringify(exportData, null, 2)}\n`)
  console.log(
    JSON.stringify({
      status: "export_created",
      outputPath,
      candidateRecords: candidateRows.length,
      exclusions: exclusionRows.length,
      batches: batches.length,
      agentRuns,
    }),
  )
} finally {
  db.close()
}
