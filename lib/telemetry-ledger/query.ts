import DatabaseConstructor from "better-sqlite3"

const DEFAULT_LEDGER_DB_PATH =
  "/Users/apple/projects/optimize-worker/observability/aios_observability.sqlite"

type RawCandidateRow = {
  id: number
  entity_type: string
  source_file_path: string
  source_file_checksum: string
  extraction_confidence: string
  missing_fields_json: string
  proposed_duplicate_key: string
  claim_level: string
  evidence_type: string
  no_secret_exposure: number
  coverage_class: string | null
  manual_review_required: number
  record_json: string
}

type RawExclusionRow = {
  id: number
  source_file_path: string
  source_file_checksum: string
  extraction_confidence: string
  missing_fields_json: string
  proposed_duplicate_key: string
  claim_level: string
  evidence_type: string
  no_secret_exposure: number
  exclusion_reason: string
  record_json: string
}

type BackfillBatchRow = {
  backfill_batch_id: string
  source_dry_run_path: string
  mode: string
  claim_level: string
  created_at: string
  backup_path: string
}

type SqliteStatement<T> = {
  all(): T[]
  get(): T | undefined
}

type SqliteDatabase = {
  close(): void
  pragma(source: string): unknown
  prepare<T = unknown>(source: string): SqliteStatement<T>
}

const Database = DatabaseConstructor as unknown as {
  new (
    filename: string,
    options: {
      readonly: boolean
      fileMustExist: boolean
    },
  ): SqliteDatabase
}

export type DashboardMetricRow = {
  label: string
  value: number
  detail?: string
  dataSourceType?: DashboardDataSourceType
}

export type DashboardDataSourceType =
  | "BACKFILLED_FROM_KB"
  | "RUNTIME_CAPTURED"
  | "STAGING_CANDIDATE"
  | "LOW_CONFIDENCE_ADVISORY"
  | "FIELD_NOT_EXPOSED_NOT_CLAIMED"

export type DashboardTableRow = {
  taskTitle: string
  taskId: string
  sourceFilePath: string
  evidenceType: string
  claimLevel: string
  finalStatus: string
  authorizedNextAction: string
  missingFieldCount: number
  dataSourceType: DashboardDataSourceType
  extractionConfidence: string
  sourceOrigin: string
}

export type InternalTelemetryDashboardData = {
  dbPath: string
  dbMode: "READ_ONLY_QUERY"
  ledgerUnavailableReason?: string
  generatedAt: string
  batch: BackfillBatchRow | null
  counts: {
    agentRuns: number
    batches: number
    candidateRecords: number
    exclusions: number
  }
  summaryCards: DashboardMetricRow[]
  spendByModelProvider: DashboardMetricRow[]
  modelVsTask: Array<{
    taskTitle: string
    provider: string
    requestedModel: string
    returnedModel: string
    totalTokens: string
    cost: string
    generationId: string
    sourceFilePath: string
    dataSourceType: DashboardDataSourceType
  }>
  spendByRoleReviewerRoute: DashboardMetricRow[]
  governanceGateOutcomeByTask: Array<{
    gateName: string
    gateStatus: string
    gateVerdict: string
    sourceFilePath: string
    dataSourceType: DashboardDataSourceType
  }>
  claimMovementTimeline: Array<{
    sourceArtifactDate: string
    claimBefore: string
    claimAfter: string
    claimMovement: string
    sourceFilePath: string
    dataSourceType: DashboardDataSourceType
  }>
  missingTelemetryWarnings: DashboardMetricRow[]
  ledgerCoverage: DashboardMetricRow[]
  taskReceiptRows: DashboardTableRow[]
  lowConfidenceRows: Array<{
    sourceFilePath: string
    exclusionReason: string
    claimLevel: string
    missingFieldCount: number
    dataSourceType: DashboardDataSourceType
  }>
}

function getDbPath() {
  const configuredPath = process.env.TELEMETRY_LEDGER_DB_PATH ?? process.env.DATABASE_PATH

  if (configuredPath) {
    return configuredPath
  }

  if (process.env.NODE_ENV === "production") {
    return null
  }

  return DEFAULT_LEDGER_DB_PATH
}

function emptyDashboardData(reason: string): InternalTelemetryDashboardData {
  return {
    dbPath: "FIELD_NOT_EXPOSED_NOT_CLAIMED",
    dbMode: "READ_ONLY_QUERY",
    ledgerUnavailableReason: reason,
    generatedAt: new Date().toISOString(),
    batch: null,
    counts: {
      agentRuns: 0,
      batches: 0,
      candidateRecords: 0,
      exclusions: 0,
    },
    summaryCards: [
      {
        label: "Ledger unavailable",
        value: 0,
        detail: reason,
        dataSourceType: "FIELD_NOT_EXPOSED_NOT_CLAIMED",
      },
    ],
    spendByModelProvider: [],
    modelVsTask: [],
    spendByRoleReviewerRoute: [],
    governanceGateOutcomeByTask: [],
    claimMovementTimeline: [],
    missingTelemetryWarnings: [
      {
        label: "TELEMETRY_LEDGER_DB_PATH_OR_DATABASE_PATH",
        value: 1,
        detail: reason,
        dataSourceType: "FIELD_NOT_EXPOSED_NOT_CLAIMED",
      },
    ],
    ledgerCoverage: [],
    taskReceiptRows: [],
    lowConfidenceRows: [],
  }
}

function parseJsonObject(value: string): Record<string, unknown> {
  try {
    const parsed = JSON.parse(value)
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {}
  } catch {
    return {}
  }
}

function parseMissingFields(value: string): string[] {
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed.map(String) : []
  } catch {
    return []
  }
}

function stringField(record: Record<string, unknown>, key: string) {
  const value = record[key]
  if (value === null || value === undefined) {
    return "SOURCE_ARTIFACT_MISSING_FIELD"
  }
  if (Array.isArray(value)) {
    return value.join(", ")
  }
  return String(value)
}

function sourceLabel(record: Record<string, unknown>, fallback: DashboardDataSourceType): DashboardDataSourceType {
  const origin = stringField(record, "source_origin")
  const coverage = stringField(record, "coverage_class")

  if (origin === "ROBERT_KB" || coverage.includes("BACKFILLED_FROM_KB")) {
    return "BACKFILLED_FROM_KB"
  }
  if (origin === "SQLITE_EXISTING" || coverage.includes("RUNTIME_CAPTURED")) {
    return "RUNTIME_CAPTURED"
  }

  return fallback
}

function numericField(record: Record<string, unknown>, key: string) {
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

function groupCount(rows: string[]) {
  return [...rows.reduce((map, label) => map.set(label, (map.get(label) ?? 0) + 1), new Map<string, number>())]
    .sort((a, b) => b[1] - a[1])
    .map(([label, value]) => ({ label, value }))
}

function topEntries(rows: DashboardMetricRow[], limit = 8) {
  return rows.slice(0, limit)
}

export function getInternalTelemetryDashboardData(): InternalTelemetryDashboardData {
  const dbPath = getDbPath()
  if (!dbPath) {
    return emptyDashboardData("Production telemetry ledger path is not configured.")
  }

  let db: SqliteDatabase
  try {
    db = new Database(dbPath, {
      readonly: true,
      fileMustExist: true,
    })
  } catch {
    return emptyDashboardData("Configured telemetry ledger path is not readable.")
  }

  try {
    db.pragma("query_only = ON")

    const agentRunsResult = db.prepare<{ count: number }>("SELECT COUNT(*) AS count FROM agent_runs").get()
    const agentRuns = Number(agentRunsResult?.count ?? 0)
    const candidateRows = db
      .prepare("SELECT * FROM telemetry_backfill_candidate_records ORDER BY id")
      .all() as RawCandidateRow[]
    const exclusionRows = db
      .prepare("SELECT * FROM telemetry_backfill_exclusions ORDER BY id")
      .all() as RawExclusionRow[]
    const batches = db
      .prepare(
        "SELECT backfill_batch_id, source_dry_run_path, mode, claim_level, created_at, backup_path FROM telemetry_backfill_batches ORDER BY id DESC",
      )
      .all() as BackfillBatchRow[]

    const parsedRows = candidateRows.map((row) => ({
      ...row,
      missingFields: parseMissingFields(row.missing_fields_json),
      record: parseJsonObject(row.record_json),
    }))
    const parsedExclusions = exclusionRows.map((row) => ({
      ...row,
      missingFields: parseMissingFields(row.missing_fields_json),
      record: parseJsonObject(row.record_json),
    }))

    const entityCounts = groupCount(candidateRows.map((row) => row.entity_type))
    const confidenceCounts = groupCount(candidateRows.map((row) => row.extraction_confidence))
    const coverageCounts = groupCount(
      candidateRows.map((row) => row.coverage_class ?? "SOURCE_ARTIFACT_MISSING_FIELD"),
    )

    const modelRows = parsedRows.filter((row) => row.entity_type === "model_usage")
    const taskRowsBySourcePath = new Map(
      parsedRows
        .filter((row) => row.entity_type === "task_run")
        .map((row) => [row.source_file_path, row.record]),
    )

    const spendGroups = new Map<string, { cost: number; rows: number }>()
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
        detail: `${group.rows} staging model rows`,
      }))
      .sort((a, b) => b.value - a.value)

    const modelVsTask = modelRows.slice(0, 25).map((row) => {
      const task = taskRowsBySourcePath.get(row.source_file_path)
      return {
        taskTitle: task ? stringField(task, "task_title") : "SOURCE_ARTIFACT_MISSING_FIELD",
        provider: stringField(row.record, "provider"),
        requestedModel: stringField(row.record, "requested_model"),
        returnedModel: stringField(row.record, "returned_model"),
        totalTokens: stringField(row.record, "total_tokens"),
        cost: stringField(row.record, "cost"),
        generationId: stringField(row.record, "generation_id"),
        sourceFilePath: row.source_file_path,
        dataSourceType: sourceLabel(row.record, "STAGING_CANDIDATE"),
      }
    })

    const roleRows = parsedRows.filter((row) => row.entity_type === "role_execution")
    const spendByRoleReviewerRoute = groupCount(
      roleRows.map((row) => `${stringField(row.record, "actual_worker")} / ${stringField(row.record, "reviewer_route")}`),
    )

    const governanceGateOutcomeByTask = parsedRows
      .filter((row) => row.entity_type === "governance_gate")
      .slice(0, 30)
      .map((row) => ({
        gateName: stringField(row.record, "gate_name"),
        gateStatus: stringField(row.record, "gate_status"),
        gateVerdict: stringField(row.record, "gate_verdict"),
        sourceFilePath: row.source_file_path,
        dataSourceType: sourceLabel(row.record, "STAGING_CANDIDATE"),
      }))

    const claimMovementTimeline = parsedRows
      .filter((row) => row.entity_type === "claim_movement")
      .slice(0, 30)
      .map((row) => ({
        sourceArtifactDate: stringField(row.record, "source_artifact_date"),
        claimBefore: stringField(row.record, "claim_before"),
        claimAfter: stringField(row.record, "claim_after"),
        claimMovement: stringField(row.record, "claim_movement"),
        sourceFilePath: row.source_file_path,
        dataSourceType: sourceLabel(row.record, "STAGING_CANDIDATE"),
      }))

    const missingTelemetryWarnings = topEntries(
      groupCount(parsedRows.flatMap((row) => row.missingFields)),
      12,
    )

    const taskReceiptRows = parsedRows
      .filter((row) => row.entity_type === "task_run")
      .slice(0, 40)
      .map((row) => ({
        taskTitle: stringField(row.record, "task_title"),
        taskId: stringField(row.record, "task_id"),
        sourceFilePath: row.source_file_path,
        evidenceType: row.evidence_type,
        claimLevel: row.claim_level,
        finalStatus: stringField(row.record, "final_status"),
        authorizedNextAction: stringField(row.record, "authorized_next_action"),
        missingFieldCount: row.missingFields.length,
        dataSourceType: sourceLabel(row.record, "STAGING_CANDIDATE"),
        extractionConfidence: row.extraction_confidence,
        sourceOrigin: stringField(row.record, "source_origin"),
      }))

    const lowConfidenceRows = parsedExclusions.slice(0, 40).map((row) => ({
      sourceFilePath: row.source_file_path,
      exclusionReason: row.exclusion_reason,
      claimLevel: row.claim_level,
      missingFieldCount: row.missingFields.length,
      dataSourceType: "LOW_CONFIDENCE_ADVISORY" as const,
    }))

    return {
      dbPath,
      dbMode: "READ_ONLY_QUERY",
      generatedAt: new Date().toISOString(),
      batch: batches[0] ?? null,
      counts: {
        agentRuns,
        batches: batches.length,
        candidateRecords: candidateRows.length,
        exclusions: exclusionRows.length,
      },
      summaryCards: [
        {
          label: "Candidate records",
          value: candidateRows.length,
          detail: "STAGING_CANDIDATE",
          dataSourceType: "STAGING_CANDIDATE",
        },
        {
          label: "Advisory exclusions",
          value: exclusionRows.length,
          detail: "LOW_CONFIDENCE_ADVISORY",
          dataSourceType: "LOW_CONFIDENCE_ADVISORY",
        },
        {
          label: "Model usage rows",
          value: modelRows.length,
          detail: "STAGING_CANDIDATE",
          dataSourceType: "STAGING_CANDIDATE",
        },
        {
          label: "Existing agent_runs",
          value: agentRuns,
          detail: "RUNTIME_CAPTURED context only",
          dataSourceType: "RUNTIME_CAPTURED",
        },
      ],
      spendByModelProvider,
      modelVsTask,
      spendByRoleReviewerRoute: topEntries(spendByRoleReviewerRoute, 10),
      governanceGateOutcomeByTask,
      claimMovementTimeline,
      missingTelemetryWarnings,
      ledgerCoverage: [
        ...entityCounts.map((row) => ({ ...row, detail: "entity_type", dataSourceType: "STAGING_CANDIDATE" as const })),
        ...confidenceCounts.map((row) => ({
          ...row,
          detail: "extraction_confidence",
          dataSourceType: "STAGING_CANDIDATE" as const,
        })),
        ...coverageCounts.map((row) => ({ ...row, detail: "coverage_class", dataSourceType: "STAGING_CANDIDATE" as const })),
      ],
      taskReceiptRows,
      lowConfidenceRows,
    }
  } finally {
    db.close()
  }
}
