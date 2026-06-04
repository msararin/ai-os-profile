export type EvidenceState =
  | "exists"
  | "not_approved"
  | "missing_source"
  | "not_decision_ready"
  | "pending_registry_reconciliation"
  | "parked"

export type SourceType =
  | "commit"
  | "receipt"
  | "review_note"
  | "kb_closeout"
  | "manual_snapshot"

export type Confidence = "high" | "medium" | "low"

export type SnapshotCard = {
  id: string
  workspace: string
  cardType: "evidence_state"
  label: string
  value: EvidenceState
  sourcePath: string
  sourceType: SourceType
  confidence: Confidence
  remark: string
  lastUpdated: string
  decisionUse: string
  missingFields: string
  refreshCadence: string
  snapshotBy?: string
  snapshotAt?: string
  snapshotTtl?: string
}

export const SNAPSHOT_ID = "Snapshot 002" as const
export const AUTHORIZED_SNAPSHOT_ID = "Snapshot 002" as const

if (SNAPSHOT_ID !== AUTHORIZED_SNAPSHOT_ID) {
  throw new Error("AIOS dashboard snapshot ID does not match the KB authorization note.")
}

export const snapshotMeta = {
  snapshotId: SNAPSHOT_ID,
  captureDate: "2026-06-04T14:22:59Z",
  snapshotTtl: "P7D",
  cTrigger: "not_met",
  snapshotCount: "2 of 3",
  sourceKbPath:
    "03_ai_skill_lab/team-of-team-orchestration/specs/aios-agent-review-dashboard-sample-snapshot-002-v0.1.md",
  authorizationKbPath:
    "03_ai_skill_lab/team-of-team-orchestration/session-updates/2026-06-04-aios-agent-review-dashboard-ui-prototype-authorization.md",
  reviewWindow: {
    start: "2026-06-04T14:22:59Z",
    end: "2026-06-18T14:22:59Z",
  },
} as const

export const dashboardLegend = [
  {
    term: "source_type",
    definition:
      "Where the evidence came from, such as a commit, receipt, review note, closeout, manual snapshot, or missing source marker.",
  },
  {
    term: "confidence",
    definition:
      "How reliable the current evidence is: high, medium, or low. It is not a performance score.",
  },
  {
    term: "missing_source",
    definition:
      "Expected evidence is absent, unreconciled, or not yet available. Missing evidence must not be shown as zero, false, or complete.",
  },
  {
    term: "not_decision_ready",
    definition:
      "The item lacks the decision packet, options, tradeoffs, recommendation, or authorization required for a decision.",
  },
  {
    term: "pending_registry_reconciliation",
    definition:
      "Registry evidence is unresolved, so names, counts, or membership claims must not be treated as final.",
  },
  {
    term: "parked",
    definition: "The item is explicitly inactive until a later gate or decision reopens it.",
  },
] as const

export const snapshotCards: SnapshotCard[] = [
  {
    id: "contract_status",
    workspace: "Planning / Contract",
    cardType: "evidence_state",
    label: "Dashboard data contract",
    value: "exists",
    sourcePath:
      "03_ai_skill_lab/team-of-team-orchestration/specs/aios-agent-review-dashboard-data-contract-v0.1.md",
    sourceType: "commit",
    confidence: "high",
    remark: "Data contract v0.1.1 remains the governing source for manual snapshots.",
    lastUpdated: "2026-06-04",
    decisionUse: "Confirms Snapshot 002 can reuse the approved contract.",
    missingFields: "none",
    refreshCadence: "On contract revision",
  },
  {
    id: "data_team_rule",
    workspace: "Planning / Contract",
    cardType: "evidence_state",
    label: "Data Team First Rule",
    value: "exists",
    sourcePath:
      "03_ai_skill_lab/team-of-team-orchestration/specs/aios-agent-review-dashboard-data-contract-v0.1.md",
    sourceType: "commit",
    confidence: "high",
    remark: "Dashboard/data ambiguity routes through Data Team before Lyn.",
    lastUpdated: "2026-06-04",
    decisionUse: "Prevents raw dashboard questions from going to Lyn.",
    missingFields: "none",
    refreshCadence: "On routing-rule revision",
  },
  {
    id: "snapshot_001",
    workspace: "Snapshot Cycle",
    cardType: "evidence_state",
    label: "Sample Snapshot 001",
    value: "exists",
    sourcePath:
      "03_ai_skill_lab/team-of-team-orchestration/specs/aios-agent-review-dashboard-sample-snapshot-v0.1.md",
    sourceType: "manual_snapshot",
    confidence: "high",
    remark: "First manual snapshot exists and is the baseline for process learning only.",
    lastUpdated: "2026-06-04",
    decisionUse: "Confirms the contract worked once before this cycle.",
    missingFields: "none",
    refreshCadence: "On snapshot cycle review",
    snapshotBy: "Codex",
    snapshotAt: "2026-06-04T13:41:14Z",
    snapshotTtl: "P7D",
  },
  {
    id: "snapshot_002",
    workspace: "Snapshot Cycle",
    cardType: "evidence_state",
    label: "Sample Snapshot 002",
    value: "exists",
    sourcePath: snapshotMeta.sourceKbPath,
    sourceType: "manual_snapshot",
    confidence: "high",
    remark: "Second manual snapshot exists as repeatability proof and passed OpenRouter / Opus 4.7 review.",
    lastUpdated: "2026-06-04",
    decisionUse: "Tests whether the snapshot process can be repeated from committed KB evidence.",
    missingFields: "none",
    refreshCadence: "On snapshot cycle review",
    snapshotBy: "Codex",
    snapshotAt: snapshotMeta.captureDate,
    snapshotTtl: snapshotMeta.snapshotTtl,
  },
  {
    id: "lyn_b_selection_receipt",
    workspace: "Decision / Gate",
    cardType: "evidence_state",
    label: "Lyn B selection receipt",
    value: "exists",
    sourcePath:
      "03_ai_skill_lab/team-of-team-orchestration/specs/aios-agent-review-dashboard-lyn-option-selection-receipt-2026-06-04.md",
    sourceType: "receipt",
    confidence: "high",
    remark: "Lyn selected B and recorded C as a later gated path.",
    lastUpdated: "2026-06-04",
    decisionUse: "Explains why the read-only prototype spec was created before any UI work.",
    missingFields: "none",
    refreshCadence: "On Lyn decision change",
  },
  {
    id: "readonly_prototype_spec",
    workspace: "Prototype Spec",
    cardType: "evidence_state",
    label: "Read-only prototype specification",
    value: "exists",
    sourcePath:
      "03_ai_skill_lab/team-of-team-orchestration/specs/aios-agent-review-dashboard-read-only-prototype-spec-v0.1.md",
    sourceType: "commit",
    confidence: "high",
    remark: "Behavior spec exists; it is not UI implementation.",
    lastUpdated: "2026-06-04",
    decisionUse: "Defines how a future read-only prototype may interpret snapshots.",
    missingFields: "none",
    refreshCadence: "On prototype spec revision",
  },
  {
    id: "readonly_invalid_data_rule",
    workspace: "Prototype Spec",
    cardType: "evidence_state",
    label: "Invalid source data rule",
    value: "exists",
    sourcePath:
      "03_ai_skill_lab/team-of-team-orchestration/specs/aios-agent-review-dashboard-read-only-prototype-spec-v0.1.md",
    sourceType: "review_note",
    confidence: "high",
    remark: "Unknown values or confidence levels must render as invalid source data.",
    lastUpdated: "2026-06-04",
    decisionUse: "Prevents silent display of malformed snapshot rows.",
    missingFields: "none",
    refreshCadence: "On prototype spec revision",
  },
  {
    id: "c_jsonl_trigger_assessment",
    workspace: "JSONL Gate",
    cardType: "evidence_state",
    label: "C JSONL trigger assessment",
    value: "exists",
    sourcePath:
      "03_ai_skill_lab/team-of-team-orchestration/specs/aios-agent-review-dashboard-c-jsonl-trigger-assessment-v0.1.md",
    sourceType: "review_note",
    confidence: "high",
    remark: "C was assessed and remains parked because the trigger is not met.",
    lastUpdated: "2026-06-04",
    decisionUse: "Blocks premature JSONL/schema/tooling work.",
    missingFields: "none",
    refreshCadence: "On C trigger evidence",
  },
  {
    id: "c_trigger_current_status",
    workspace: "JSONL Gate",
    cardType: "evidence_state",
    label: "Current C trigger status",
    value: "parked",
    sourcePath:
      "03_ai_skill_lab/team-of-team-orchestration/specs/aios-agent-review-dashboard-c-jsonl-trigger-assessment-v0.1.md",
    sourceType: "review_note",
    confidence: "high",
    remark: "Snapshot 002 is within the 14-day window but does not meet the third-snapshot trigger.",
    lastUpdated: "2026-06-04",
    decisionUse: "Confirms JSONL remains parked after this snapshot.",
    missingFields: "third manual snapshot evidence or decision-speed blockage confirmation",
    refreshCadence: "On snapshot cycle review",
  },
  {
    id: "bc_closeout",
    workspace: "Closeout",
    cardType: "evidence_state",
    label: "B/C specification closeout",
    value: "exists",
    sourcePath:
      "03_ai_skill_lab/team-of-team-orchestration/session-updates/2026-06-04-aios-dashboard-b-c-spec-closeout.md",
    sourceType: "kb_closeout",
    confidence: "high",
    remark: "B/C phase closeout exists and preserves parked implementation boundaries.",
    lastUpdated: "2026-06-04",
    decisionUse: "Separates phase completion from product/dashboard completion.",
    missingFields: "none",
    refreshCadence: "On closeout revision",
  },
  {
    id: "dashboard_ui_boundary",
    workspace: "Approval Boundaries",
    cardType: "evidence_state",
    label: "Dashboard UI implementation",
    value: "not_approved",
    sourcePath:
      "03_ai_skill_lab/team-of-team-orchestration/session-updates/2026-06-04-aios-dashboard-b-c-spec-closeout.md",
    sourceType: "kb_closeout",
    confidence: "high",
    remark: "UI implementation remains explicitly not approved in Snapshot 002 evidence.",
    lastUpdated: "2026-06-04",
    decisionUse: "Blocks route/page/component work outside the later prototype gate.",
    missingFields: "implementation decision packet",
    refreshCadence: "On approval-boundary change",
  },
  {
    id: "telemetry_inventory_boundary",
    workspace: "Approval Boundaries",
    cardType: "evidence_state",
    label: "Telemetry Inventory implementation",
    value: "not_approved",
    sourcePath:
      "03_ai_skill_lab/team-of-team-orchestration/session-updates/2026-06-04-aios-dashboard-b-c-spec-closeout.md",
    sourceType: "kb_closeout",
    confidence: "high",
    remark: "Telemetry Inventory implementation remains explicitly not approved.",
    lastUpdated: "2026-06-04",
    decisionUse: "Blocks scope expansion into telemetry.",
    missingFields: "implementation decision packet",
    refreshCadence: "On approval-boundary change",
  },
  {
    id: "jsonl_schema_boundary",
    workspace: "Approval Boundaries",
    cardType: "evidence_state",
    label: "JSONL schema creation",
    value: "parked",
    sourcePath:
      "03_ai_skill_lab/team-of-team-orchestration/specs/aios-agent-review-dashboard-c-jsonl-trigger-assessment-v0.1.md",
    sourceType: "review_note",
    confidence: "high",
    remark: "JSONL schema is not authorized now; future decision packet is conditional.",
    lastUpdated: "2026-06-04",
    decisionUse: "Prevents schema work before trigger evidence.",
    missingFields: "trigger evidence and decision packet",
    refreshCadence: "On C trigger evidence",
  },
  {
    id: "observability_stack_boundary",
    workspace: "Approval Boundaries",
    cardType: "evidence_state",
    label: "Full observability stack",
    value: "parked",
    sourcePath:
      "03_ai_skill_lab/team-of-team-orchestration/specs/aios-agent-review-dashboard-track-c-privacy-gate-v0.1.md",
    sourceType: "review_note",
    confidence: "high",
    remark: "External observability tooling remains parked behind privacy and implementation gates.",
    lastUpdated: "2026-06-04",
    decisionUse: "Prevents Phoenix/Langfuse/OTel/Grafana/Tempo overreach.",
    missingFields: "tool experiment packet",
    refreshCadence: "On privacy gate revision",
  },
  {
    id: "big_crew_workspace",
    workspace: "Big Crew",
    cardType: "evidence_state",
    label: "Big Crew workspace",
    value: "pending_registry_reconciliation",
    sourcePath:
      "03_ai_skill_lab/team-of-team-orchestration/specs/aios-agent-review-dashboard-data-contract-v0.1.md",
    sourceType: "review_note",
    confidence: "high",
    remark: "Show workspace only; do not render final, partial, preview, or candidate member names.",
    lastUpdated: "2026-06-04",
    decisionUse: "Prevents false registry certainty.",
    missingFields: "confirmed registry source",
    refreshCadence: "On registry reconciliation",
  },
  {
    id: "supernova_workspace",
    workspace: "Supernova",
    cardType: "evidence_state",
    label: "Supernova workspace",
    value: "exists",
    sourcePath:
      "03_ai_skill_lab/team-of-team-orchestration/specs/aios-agent-review-dashboard-data-contract-v0.1.md",
    sourceType: "review_note",
    confidence: "medium",
    remark: "Supernova remains separate from Big Crew.",
    lastUpdated: "2026-06-04",
    decisionUse: "Preserves workspace separation.",
    missingFields: "current registry refresh",
    refreshCadence: "On Supernova registry revision",
  },
  {
    id: "source_index_refresh",
    workspace: "Evidence Gaps",
    cardType: "evidence_state",
    label: "Source-of-truth index refresh",
    value: "not_decision_ready",
    sourcePath:
      "03_ai_skill_lab/team-of-team-orchestration/specs/aios-agent-review-dashboard-source-of-truth-index-v0.1.md",
    sourceType: "commit",
    confidence: "medium",
    remark: "Snapshot 002 recorded that index refresh needed separate authorization.",
    lastUpdated: "2026-06-04",
    decisionUse: "Shows navigation maintenance must stay separate from snapshot evidence.",
    missingFields: "none after later index refresh",
    refreshCadence: "On index refresh decision",
  },
]
