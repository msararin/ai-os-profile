import DatabaseConstructor from "better-sqlite3"
import candidateSnapshot from "@/data/telemetry/internal-candidate-snapshot.json"
import { loadInternalTelemetryDecisionSnapshot } from "@/lib/telemetry-ledger/decision-snapshot"
import { getPreservedHistoricalEvidence } from "@/lib/telemetry-ledger/preserved-historical"

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

type AgentRunSpendRow = {
  provider: string | null
  model: string | null
  cost_usd: number | null
  cost_source: string
  started_at: string
  ended_at: string | null
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

export type TelemetryRange = {
  key: "7D" | "30D" | "ALL" | "CUSTOM"
  start: string | null
  end: string | null
  label: string
  supported: boolean
}

export function normalizeTelemetryRange(input?: { range?: string; start?: string; end?: string }): TelemetryRange {
  const range = input?.range?.toUpperCase()
  const now = new Date()
  if (range === "7D" || range === "30D") {
    const days = range === "7D" ? 7 : 30
    return { key: range, start: new Date(now.getTime() - days * 86400000).toISOString(), end: now.toISOString(), label: `Last ${days} days (UTC)`, supported: false }
  }
  if (range === "CUSTOM" && input?.start && input?.end) {
    const start = new Date(input.start).toISOString()
    const end = new Date(input.end).toISOString()
    if (start < end) return { key: "CUSTOM", start, end, label: `${start} → ${end} (UTC)`, supported: true }
  }
  return { key: "ALL", start: null, end: null, label: "All available source evidence (UTC)", supported: true }
}

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
  dbMode: "READ_ONLY_QUERY" | "SNAPSHOT_CANDIDATE"
  ledgerUnavailableReason?: string
  generatedAt: string
  batch: BackfillBatchRow | null
  counts: {
    agentRuns: number
    batches: number
    candidateRecords: number
    exclusions: number
    backfillCandidates: number
  }
  spendCoverageSummary: string
  spendSnapshotState: "FRESH" | "STALE" | "UNAVAILABLE" | "LOCAL_READ_ONLY"
  spendSnapshotVersion?: string
  spendSnapshotGeneratedAt?: string
  spendSnapshotSourceFreshness?: string
  spendSnapshotChecksumPrefix?: string
  summaryCards: DashboardMetricRow[]
  spendByModelProvider: DashboardMetricRow[]
  historicalSpendByModelProvider: DashboardMetricRow[]
  historicalSpendSummary: string
  modelCandidateDistribution: DashboardMetricRow[]
  modelCandidatePopulationCount: number
  modelCandidateExportCount: number
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
  sourceLabel?: string
  sourceFreshness?: string
  sourceChecksumPrefix?: string
  snapshotStale?: boolean
  approvalUsage: {
    approved: number
    nonStandard: number
    unknownUnclassified: number
    denominator: number
    coveragePercent: number
    policyVersion: string
    periodStart: string
    periodEnd: string
    classification: string
  }
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

function emptyDashboardData(reason: string, telemetryRange = normalizeTelemetryRange()): InternalTelemetryDashboardData {
  const historical = getPreservedHistoricalEvidence()
  const historicalInRange = telemetryRange.key === "ALL" || (telemetryRange.start === null || telemetryRange.end === null) ||
    (historical.period.start < telemetryRange.end && historical.period.end > telemetryRange.start)
  const historicalRows = historicalInRange ? historical.groups.map((group) => ({
    label: `${group.provider} / ${group.model} / ${group.costSource === "estimated_from_delegate_report" ? "estimated" : "provider-reported"}`,
    value: group.costUsd,
    detail: `${group.numericRowCount} numeric rows · SYNTHETIC/BACKFILL · operational claim excluded`,
    dataSourceType: "BACKFILLED_FROM_KB" as const,
  })) : []
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
      backfillCandidates: 0,
    },
    spendCoverageSummary: reason,
    spendSnapshotState: "UNAVAILABLE",
    summaryCards: [
      {
        label: "Ledger unavailable",
        value: 0,
        detail: reason,
        dataSourceType: "FIELD_NOT_EXPOSED_NOT_CLAIMED",
      },
    ],
    spendByModelProvider: [],
    historicalSpendByModelProvider: historicalRows,
    historicalSpendSummary: `${telemetryRange.label}. Preserved historical evidence: ${historical.numericCostRowCount} numeric / ${historical.populationCount} total rows; ${historical.nullCostRowCount} unavailable (null cost is unavailable, not zero). USD-designated numeric subtotal 0.527; 0.461 estimated and 0.066 source-labeled provider-reported. Classification SYNTHETIC/BACKFILL; OPERATIONAL CLAIM: EXCLUDED. Captured UTC period ${historical.period.start} through ${historical.period.end}. Live operational Spend remains unavailable because protected continuous delivery is not connected. ${historicalInRange ? "" : "No qualifying live records for this range."}`,
    modelCandidateDistribution: [],
    modelCandidatePopulationCount: 0,
    modelCandidateExportCount: 0,
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
    approvalUsage: {
      ...historical.approvalUsage,
      periodStart: historical.period.start,
      periodEnd: historical.period.end,
    },
  }
}

function snapshotDashboardData(): InternalTelemetryDashboardData {
  const snapshot = candidateSnapshot
  const historical = getPreservedHistoricalEvidence()
  const decisionSnapshot = loadInternalTelemetryDecisionSnapshot()
  const generatedAge = Date.now() - new Date(snapshot.generatedAt).getTime()
  const sourceFreshnessAge = Date.now() - new Date(snapshot.source.sourceFreshness.replace(" ", "T") + "Z").getTime()
  const metric = (label: string, value: number, detail: string): DashboardMetricRow => ({
    label,
    value,
    detail,
    dataSourceType: "STAGING_CANDIDATE",
  })
  const taskReceiptRows = snapshot.taskRows.map((row) => ({
    taskTitle: row.taskTitle ?? "SOURCE_ARTIFACT_MISSING_FIELD",
    taskId: "SOURCE_ARTIFACT_MISSING_FIELD",
    sourceFilePath: "REDACTED_SOURCE_PATH",
    evidenceType: row.entityType,
    claimLevel: row.claimLevel,
    finalStatus: "CANDIDATE_RECORD_ONLY",
    authorizedNextAction: "Telemetry Steward review",
    missingFieldCount: 0,
    dataSourceType: "STAGING_CANDIDATE" as const,
    extractionConfidence: "medium",
    sourceOrigin: "LOCAL_SQLITE_CANDIDATES",
  }))
  const modelVsTask = snapshot.modelRows.map((row) => ({
    taskTitle: row.taskTitle ?? "SOURCE_ARTIFACT_MISSING_FIELD",
    provider: row.provider ?? "SOURCE_ARTIFACT_MISSING_FIELD",
    requestedModel: row.requestedModel ?? "SOURCE_ARTIFACT_MISSING_FIELD",
    returnedModel: row.returnedModel ?? "SOURCE_ARTIFACT_MISSING_FIELD",
    totalTokens: row.totalTokens === null ? "SOURCE_ARTIFACT_MISSING_FIELD" : String(row.totalTokens),
    cost: row.cost === null ? "SOURCE_ARTIFACT_MISSING_FIELD" : String(row.cost),
    generationId: "SOURCE_ARTIFACT_MISSING_FIELD",
    sourceFilePath: "REDACTED_SOURCE_PATH",
    dataSourceType: "STAGING_CANDIDATE" as const,
  }))
  const spend = decisionSnapshot.status === "AVAILABLE" ? decisionSnapshot.value : null
  const spendByModelProvider: DashboardMetricRow[] = spend
    ? spend.groups.map((group) => ({
        label: `${group.provider} / ${group.model} / ${
          group.costSource === "estimated_from_delegate_report"
            ? "estimated from delegate reports"
            : group.costSource === "provider_reported"
              ? "provider-reported (source-labeled; not independently receipted)"
              : `other source provenance: ${group.costSource}`
        }`,
        value: group.costUsd,
        detail: `${group.numericRowCount} numeric agent_runs cost_usd rows`,
        dataSourceType: "RUNTIME_CAPTURED",
      }))
    : []
  const spendEstimatedTotal = spend?.groups
    .filter((group) => group.costSource === "estimated_from_delegate_report")
    .reduce((total, group) => total + group.costUsd, 0) ?? 0
  const spendProviderReportedTotal = spend?.groups
    .filter((group) => group.costSource === "provider_reported")
    .reduce((total, group) => total + group.costUsd, 0) ?? 0
  return {
    dbPath: "SANITIZED_BUNDLED_CANDIDATE_SNAPSHOT",
    dbMode: "SNAPSHOT_CANDIDATE",
    generatedAt: snapshot.generatedAt,
    batch: null,
    counts: { ...snapshot.counts, batches: snapshot.batch ? 1 : 0 },
    spendCoverageSummary: spend
      ? `Bounded sanitized agent_runs aggregate: ${spend.populationCount} rows by started_at, ${spend.periodStart} through ${spend.periodEnd} UTC. ${spend.numericCostRowCount} numeric cost_usd rows total ${spend.numericCostUsdTotal.toFixed(3)} USD-designated; ${spend.nullCostRowCount} rows remain unavailable and are not zero. Of the numeric subtotal, ${spendEstimatedTotal.toFixed(3)} is estimated from delegate reports and ${spendProviderReportedTotal.toFixed(3)} is source-labeled provider-reported, not independently receipted. This ${spend.populationCount}-row Spend population is separate from the ${snapshot.modelRows.length}-row Calls/Dominance candidate snapshot.`
      : "Validated production Spend snapshot is absent or rejected; no cost values are rendered.",
    spendSnapshotState: spend?.state ?? "UNAVAILABLE",
    spendSnapshotVersion: spend?.snapshotVersion,
    spendSnapshotGeneratedAt: spend?.generatedAt,
    spendSnapshotSourceFreshness: spend?.sourceFreshness,
    spendSnapshotChecksumPrefix: spend?.payloadSha256.slice(0, 16),
    summaryCards: [
      metric("Candidate records", snapshot.counts.candidateRecords, "Candidate/backfill records only"),
      metric("Advisory exclusions", snapshot.counts.exclusions, "Excluded or low-confidence advisory rows"),
      metric("Agent runs", snapshot.counts.agentRuns, "Context count; not merged with candidate records"),
      metric("Backfill candidates", snapshot.counts.backfillCandidates, "Backfill class only"),
    ],
    spendByModelProvider,
    historicalSpendByModelProvider: historical.groups.map((group) => ({
      label: `${group.provider} / ${group.model} / ${group.costSource === "estimated_from_delegate_report" ? "estimated" : "provider-reported"}`,
      value: group.costUsd,
      detail: `${group.numericRowCount} numeric rows · SYNTHETIC/BACKFILL · operational claim excluded`,
      dataSourceType: "BACKFILLED_FROM_KB" as const,
    })),
    historicalSpendSummary: `Preserved historical evidence: ${historical.numericCostRowCount} numeric / ${historical.populationCount} total rows; ${historical.nullCostRowCount} unavailable (null cost is unavailable, not zero). USD-designated subtotal 0.527; 0.461 estimated and 0.066 source-labeled provider-reported. Captured UTC period ${historical.period.start} through ${historical.period.end}. Classification SYNTHETIC/BACKFILL; OPERATIONAL CLAIM: EXCLUDED.`,
    modelCandidateDistribution: groupCount(
      snapshot.modelRows.map((row) => row.returnedModel ?? "FIELD_NOT_EXPOSED_NOT_CLAIMED"),
    ).map((row) => metric(row.label, row.value, "exported candidate rows; not calls")),
    modelCandidatePopulationCount:
      snapshot.entityTypes.find((row) => row.label === "model_usage")?.value ?? 0,
    modelCandidateExportCount: snapshot.modelRows.length,
    modelVsTask,
    spendByRoleReviewerRoute: snapshot.roleReviewerRoutes.map((row) =>
      metric(row.label, row.value, row.detail),
    ),
    governanceGateOutcomeByTask: snapshot.governanceGateOutcomes.map((row) => ({
      gateName: row.gateName,
      gateStatus: row.gateStatus,
      gateVerdict: row.gateVerdict,
      sourceFilePath: "REDACTED_SOURCE_PATH",
      dataSourceType: row.dataSourceType as DashboardDataSourceType,
    })),
    claimMovementTimeline: snapshot.claimMovements.map((row) => ({
      sourceArtifactDate: row.sourceArtifactDate,
      claimBefore: row.claimBefore,
      claimAfter: row.claimAfter,
      claimMovement: row.claimMovement,
      sourceFilePath: "REDACTED_SOURCE_PATH",
      dataSourceType: row.dataSourceType as DashboardDataSourceType,
    })),
    missingTelemetryWarnings: snapshot.missingTelemetryWarnings.map((row) =>
      metric(row.label, row.value, row.detail),
    ),
    ledgerCoverage: snapshot.entityTypes.map((row) => metric(row.label, row.value, "entity_type candidate rows")),
    taskReceiptRows,
    lowConfidenceRows: snapshot.lowConfidenceRows.map((row) => ({
      sourceFilePath: "REDACTED_SOURCE_PATH",
      exclusionReason: row.exclusionReason,
      claimLevel: row.claimLevel,
      missingFieldCount: row.missingFieldCount,
      dataSourceType: row.dataSourceType as DashboardDataSourceType,
    })),
    sourceLabel: snapshot.source.kind,
    sourceFreshness: snapshot.source.sourceFreshness,
    sourceChecksumPrefix: snapshot.source.checksumPrefix,
    snapshotStale: Math.max(generatedAge, sourceFreshnessAge) > 24 * 60 * 60 * 1000,
    approvalUsage: {
      approved: 0,
      nonStandard: 0,
      unknownUnclassified: snapshot.modelRows.length,
      denominator: snapshot.modelRows.length,
      coveragePercent: 0,
      policyVersion: "UNAVAILABLE",
      periodStart: snapshot.source.sourceFreshness,
      periodEnd: snapshot.source.sourceFreshness,
      classification: "CANDIDATE_EVIDENCE_ONLY",
    },
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

function groupCount(rows: string[]) {
  return [...rows.reduce((map, label) => map.set(label, (map.get(label) ?? 0) + 1), new Map<string, number>())]
    .sort((a, b) => b[1] - a[1])
    .map(([label, value]) => ({ label, value }))
}

function earlierTimestamp(current: string | null, candidate: string): string {
  return current === null || candidate < current ? candidate : current
}

function displayUtcTimestamp(value: string): string {
  return value.endsWith("+00:00Z") ? `${value.slice(0, -6)}Z` : value
}

function laterTimestamp(current: string | null, candidate: string): string {
  return current === null || candidate > current ? candidate : current
}

function topEntries(rows: DashboardMetricRow[], limit = 8) {
  return rows.slice(0, limit)
}

export function getInternalTelemetryDashboardData(telemetryRange = normalizeTelemetryRange()): InternalTelemetryDashboardData {
  const dbPath = getDbPath()
  if (!dbPath) {
    return snapshotDashboardData()
  }

  let db: SqliteDatabase
  try {
    db = new Database(dbPath, {
      readonly: true,
      fileMustExist: true,
    })
  } catch {
    return emptyDashboardData("Configured telemetry ledger path is not readable.", telemetryRange)
  }

  try {
    db.pragma("query_only = ON")

    const agentRunColumns = new Set(
      (db.prepare("PRAGMA table_info(agent_runs)").all() as Array<{ name: string }>).map((row) => row.name),
    )
    const hasOperationalOrigin = agentRunColumns.has("record_classification") && agentRunColumns.has("trace_id")
    const agentRunsResult = hasOperationalOrigin
      ? db
          .prepare<{ count: number }>(
            "SELECT COUNT(*) AS count FROM agent_runs WHERE record_classification = 'live' AND trace_id NOT LIKE 'trace-example-%'",
          )
          .get()
      : undefined
    const agentRuns = Number(agentRunsResult?.count ?? 0)
    const spendRows = hasOperationalOrigin
      ? db
          .prepare(
            "SELECT provider, model, cost_usd, cost_source, started_at, ended_at FROM agent_runs WHERE record_classification = 'live' AND trace_id NOT LIKE 'trace-example-%' ORDER BY id",
          )
          .all() as AgentRunSpendRow[]
      : []
    const historicalRows = db
      .prepare(
        "SELECT provider, model, cost_usd, cost_source, started_at, ended_at FROM agent_runs ORDER BY id",
      )
      .all() as AgentRunSpendRow[]
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
    let spendNumericRowCount = 0
    let spendNumericTotal = 0
    let spendEstimatedTotal = 0
    let spendProviderReportedTotal = 0
    let spendStartedAtMin: string | null = null
    let spendStartedAtMax: string | null = null
    for (const row of spendRows) {
      spendStartedAtMin = earlierTimestamp(spendStartedAtMin, row.started_at)
      spendStartedAtMax = laterTimestamp(spendStartedAtMax, row.started_at)
      if (row.cost_usd === null) {
        continue
      }
      spendNumericRowCount += 1
      spendNumericTotal += row.cost_usd
      if (row.cost_source === "estimated_from_delegate_report") {
        spendEstimatedTotal += row.cost_usd
      }
      if (row.cost_source === "provider_reported") {
        spendProviderReportedTotal += row.cost_usd
      }
      const provider = row.provider ?? "SOURCE_ARTIFACT_MISSING_FIELD"
      const model = row.model ?? "SOURCE_ARTIFACT_MISSING_FIELD"
      const provenance =
        row.cost_source === "estimated_from_delegate_report"
          ? "estimated from delegate reports"
          : row.cost_source === "provider_reported"
            ? "provider-reported (source-labeled; not independently receipted)"
            : `other source provenance: ${row.cost_source}`
      const key = `${provider} / ${model} / ${provenance}`
      const current = spendGroups.get(key) ?? { cost: 0, rows: 0 }
      spendGroups.set(key, { cost: current.cost + row.cost_usd, rows: current.rows + 1 })
    }

    const spendByModelProvider = [...spendGroups.entries()]
      .map(([label, group]) => ({
        label,
        value: Number(group.cost.toFixed(6)),
        detail: `${group.rows} numeric agent_runs cost_usd rows`,
        dataSourceType: "RUNTIME_CAPTURED" as const,
      }))
      .sort((a, b) => b.value - a.value)

    const historicalGroups = new Map<string, { cost: number; rows: number }>()
    let historicalNumeric = 0
    let historicalTotal = 0
    let historicalEstimated = 0
    let historicalProviderReported = 0
    let historicalStart: string | null = null
    let historicalEnd: string | null = null
    for (const row of historicalRows) {
      historicalStart = earlierTimestamp(historicalStart, row.started_at)
      historicalEnd = laterTimestamp(historicalEnd, row.started_at)
      if (row.cost_usd === null) continue
      historicalNumeric += 1
      historicalTotal += row.cost_usd
      if (row.cost_source === "estimated_from_delegate_report") historicalEstimated += row.cost_usd
      if (row.cost_source === "provider_reported") historicalProviderReported += row.cost_usd
      const key = `${row.provider ?? "SOURCE_ARTIFACT_MISSING_FIELD"} / ${row.model ?? "SOURCE_ARTIFACT_MISSING_FIELD"}`
      const current = historicalGroups.get(key) ?? { cost: 0, rows: 0 }
      historicalGroups.set(key, { cost: current.cost + row.cost_usd, rows: current.rows + 1 })
    }
    const historicalSpendByModelProvider = [...historicalGroups.entries()]
      .map(([label, group]) => ({
        label,
        value: Number(group.cost.toFixed(6)),
        detail: `${group.rows} numeric rows · SYNTHETIC/BACKFILL · operational claim excluded`,
        dataSourceType: "BACKFILLED_FROM_KB" as const,
      }))
      .sort((a, b) => b.value - a.value)
    const historicalSpendSummary = historicalStart && historicalEnd
      ? `Preserved historical evidence: ${historicalNumeric} numeric / ${historicalRows.length} total rows; ${historicalRows.length - historicalNumeric} unavailable (null cost is unavailable, not zero). USD-designated numeric subtotal ${historicalTotal.toFixed(3)}; ${historicalEstimated.toFixed(3)} estimated and ${historicalProviderReported.toFixed(3)} source-labeled provider-reported. Classification SYNTHETIC/BACKFILL; OPERATIONAL CLAIM: EXCLUDED. Captured UTC period ${displayUtcTimestamp(historicalStart)} through ${displayUtcTimestamp(historicalEnd)}.`
      : "Preserved historical Spend period unavailable; no historical numeric claim is supported."

    const modelCandidateDistribution = groupCount(
      modelRows.map((row) => stringField(row.record, "returned_model")),
    ).map((row) => ({
      ...row,
      detail: "candidate rows; not calls",
      dataSourceType: "STAGING_CANDIDATE" as const,
    }))

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
        backfillCandidates: candidateRows.filter((row) => (row.coverage_class ?? "").includes("BACKFILL")).length,
      },
      spendCoverageSummary:
        !hasOperationalOrigin
          ? "Spend unavailable: agent_runs does not expose the required record_classification origin field; legacy rows are not accepted as live operational telemetry."
          : spendStartedAtMin && spendStartedAtMax
          ? `Bounded agent_runs view: ${agentRuns} rows by started_at, ${spendStartedAtMin} through ${spendStartedAtMax} UTC. ${spendNumericRowCount} numeric cost_usd rows total ${spendNumericTotal.toFixed(3)} USD-designated; ${agentRuns - spendNumericRowCount} rows remain unavailable and are not zero. Of the numeric subtotal, ${spendEstimatedTotal.toFixed(3)} is estimated from delegate reports and ${spendProviderReportedTotal.toFixed(3)} is source-labeled provider-reported, not independently receipted. This ${agentRuns}-row Spend population is separate from the ${modelRows.length}-row Calls/Dominance candidate snapshot.`
          : "Spend started_at range is unavailable; no bounded Spend claim is supported.",
      spendSnapshotState: hasOperationalOrigin ? "LOCAL_READ_ONLY" : "UNAVAILABLE",
      spendSnapshotVersion: hasOperationalOrigin ? "local-read-only-ledger" : "origin-contract-unavailable",
      spendSnapshotGeneratedAt: new Date().toISOString(),
      spendSnapshotSourceFreshness: spendStartedAtMax ?? undefined,
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
      historicalSpendByModelProvider,
      historicalSpendSummary,
      modelCandidateDistribution,
      modelCandidatePopulationCount: modelRows.length,
      modelCandidateExportCount: modelRows.length,
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
      approvalUsage: {
        approved: 0,
        nonStandard: 0,
        unknownUnclassified: historicalRows.length,
        denominator: historicalRows.length,
        coveragePercent: 0,
        policyVersion: "UNAVAILABLE",
        periodStart: historicalStart ?? "UNAVAILABLE",
        periodEnd: historicalEnd ?? "UNAVAILABLE",
        classification: "HISTORICAL_EVIDENCE_ONLY",
      },
    }
  } finally {
    db.close()
  }
}
