export type AiosMonitorStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "PASS"
  | "PASS_WITH_CAVEAT"
  | "FAIL"
  | "DOWNGRADED"
  | "ESCALATE"
  | "PARKED"

export type SignalStatus =
  | "PASS"
  | "PASS_WITH_CAVEAT"
  | "FAIL"
  | "DOWNGRADED"
  | "ESCALATE"
  | "PARKED"
  | "NOT_REQUIRED"
  | "MISSING"
  | "PARTIAL"
  | "NOT_EXPOSED"
  | "NEEDS_REFRESH"
  | "CLEAR"
  | "TRIGGERED"
  | "PRESENT"

export type ReceiptStatus =
  | "present"
  | "missing"
  | "not_required"
  | "not_exposed"
  | "partial"
  | "blocked_before_call"
  | "needs_refresh"

export type EvidencePresence = {
  routeLedger: ReceiptStatus
  roleDependencyMatrix: ReceiptStatus
  telemetryReceipt: ReceiptStatus
  providerReceipt: ReceiptStatus
  sourceRegister: ReceiptStatus
  costCapReceipt: ReceiptStatus
  stopConditionCheck: ReceiptStatus
  monitorStatus: ReceiptStatus
}

export type AiosMonitoringRecord = {
  id: string
  workstream: string
  phase: string
  phaseName: string
  taskName: string
  phaseStatus: AiosMonitorStatus
  overallStatus: AiosMonitorStatus
  monitoringStatus: AiosMonitorStatus
  claimStatus: string
  roleOwner: string
  expectedRoleChain: string
  actualWorkerOrAgent: string
  selectedRoute: string
  modelProvider: string
  modelRequested: string
  modelReturned: string
  reviewer: string
  providerReceiptStatus: ReceiptStatus
  costCapStatus: SignalStatus
  telemetryStatus: SignalStatus
  tokenStatus: SignalStatus
  costStatus: SignalStatus
  sourceRegisterStatus: SignalStatus
  roleDependencyStatus: SignalStatus
  stopConditionStatus: SignalStatus
  humanGateStatus: SignalStatus
  nextGate: string
  missingFields: string[]
  evidenceSummary: string
  blockReason: string
  missingEvidence: string[]
  unblockOwner: string
  unblockAction: string
  nextAllowedAction: string
  notAllowedYet: string
  publicSafeSummary: string
  updatedAt: string
  snapshotType: string
  evidenceRefs: string[]
  evidencePresence: EvidencePresence
}

export const aiosMonitoringSnapshotMeta = {
  schemaVersion: "aios-monitoring-public-static-snapshot-v0.2",
  snapshotType: "public_safe_static_snapshot",
  generatedAt: "2026-06-07T10:30:00Z",
  freshnessTtlMinutes: 1440,
  source: "lib/aios-monitoring-snapshot.ts",
  sourceDescription:
    "Curated public-safe static snapshot assembled from AIOS enforcement proof drills, routed Opus review receipt, Opus small patch receipt, and routed role-review outputs.",
  coverageScope:
    "Covers selected tasks that passed through AIOS preflight, closeout, and monitor scripts. It does not cover bypassed, pre-enforcement, manually reconstructed, live runtime, or raw receipt records.",
  posture: "UNDER CONSTRUCTION / static review surface",
  boundary:
    "This snapshot is not live runtime telemetry, not a production monitoring system, not realtime agent tracking, and not benchmark proof.",
  dataContractBoundary:
    "This is a v0.2 public-safe static snapshot model. It is not the full monitoring aggregation contract required for CASE-003 fresh rerun.",
  failClosedRule:
    "If a required route, role matrix, telemetry, provider, source, or human-gate receipt is missing, the claim must downgrade or fail closed.",
}

export const latestActionDecision = {
  currentLayerStatus: "PASS_WITH_CAVEAT" as AiosMonitorStatus,
  statusMeaning:
    "Script/file-level enforcement checks and role-review routing have evidence, but the monitoring surface remains under construction and local-only.",
  why:
    "Preflight, closeout, monitor checks, cost-cap gating, provider receipts, role dependency checks, and role-review receipts are represented at file/script level.",
  ownerToUnblock:
    "Data Team for the full aggregation contract; Visual/UX for presentation clarity; Big Crew QA for final local-candidate gate; GPT/Sararin for commit decision.",
  nextAllowedAction:
    "Apply this consolidation patch, rerun validation, then request GPT/Sararin gate on whether the local candidate can be committed.",
  notAllowedYet:
    "Do not claim monitoring complete, start CASE-003 rerun, commit, push, deploy, create internal monitoring, or claim live telemetry.",
}

export const aiosMonitoringRecords: AiosMonitoringRecord[] = [
  {
    id: "AIOS-ENF-001",
    workstream: "AIOS enforcement",
    phase: "Enforcement Automation v0.1",
    phaseName: "Preflight and clean closeout proof drill",
    taskName: "Preflight and clean closeout proof drill",
    phaseStatus: "PASS",
    overallStatus: "PASS",
    monitoringStatus: "PASS",
    claimStatus: "valid_aios_proof",
    roleOwner: "Codex/local executor",
    expectedRoleChain: "Routing layer -> Codex/local executor -> closeout -> monitor check",
    actualWorkerOrAgent: "Local shell scripts",
    selectedRoute: "automation proof drill",
    modelProvider: "not_required",
    modelRequested: "not_required",
    modelReturned: "not_required",
    reviewer: "not_required",
    providerReceiptStatus: "not_required",
    costCapStatus: "NOT_REQUIRED",
    telemetryStatus: "PASS",
    tokenStatus: "NOT_REQUIRED",
    costStatus: "NOT_REQUIRED",
    sourceRegisterStatus: "NOT_REQUIRED",
    roleDependencyStatus: "PASS",
    stopConditionStatus: "CLEAR",
    humanGateStatus: "NOT_REQUIRED",
    nextGate: "Use as baseline for future AIOS task preflight and closeout.",
    missingFields: [],
    evidenceSummary:
      "Route ledger, role matrix, telemetry receipt, stop check, and monitor status are present.",
    blockReason: "not_blocked",
    missingEvidence: [],
    unblockOwner: "not_required",
    unblockAction: "Continue applying preflight and closeout to AIOS-routed work.",
    nextAllowedAction: "Use automation baseline for future routed local tasks.",
    notAllowedYet: "Do not use this local drill as provider, research, or benchmark proof.",
    publicSafeSummary:
      "Preflight can create task records and clean closeout can produce monitor status.",
    updatedAt: "2026-06-07",
    snapshotType: "public_safe_static_snapshot",
    evidenceRefs: ["aios-preflight.sh", "aios-closeout-check.sh", "aios-monitor-check.sh"],
    evidencePresence: {
      routeLedger: "present",
      roleDependencyMatrix: "present",
      telemetryReceipt: "present",
      providerReceipt: "not_required",
      sourceRegister: "not_required",
      costCapReceipt: "not_required",
      stopConditionCheck: "present",
      monitorStatus: "present",
    },
  },
  {
    id: "AIOS-ENF-002A",
    workstream: "AIOS enforcement",
    phase: "Enforcement Automation v0.1",
    phaseName: "Provider preflight without cost cap",
    taskName: "Provider preflight without cost cap",
    phaseStatus: "FAIL",
    overallStatus: "FAIL",
    monitoringStatus: "FAIL",
    claimStatus: "draft_local_only",
    roleOwner: "Codex/local executor",
    expectedRoleChain: "Routing layer -> cost-cap gate -> provider route or fail closed",
    actualWorkerOrAgent: "Local shell scripts",
    selectedRoute: "provider task preflight",
    modelProvider: "planned_provider_route",
    modelRequested: "not_called",
    modelReturned: "not_called",
    reviewer: "OpenRouter route planned; not called",
    providerReceiptStatus: "blocked_before_call",
    costCapStatus: "MISSING",
    telemetryStatus: "PARTIAL",
    tokenStatus: "NOT_REQUIRED",
    costStatus: "NOT_REQUIRED",
    sourceRegisterStatus: "NOT_REQUIRED",
    roleDependencyStatus: "PASS",
    stopConditionStatus: "TRIGGERED",
    humanGateStatus: "NOT_REQUIRED",
    nextGate: "Create cost-cap-receipt.md before any paid provider call.",
    missingFields: ["cost-cap-receipt.md"],
    evidenceSummary:
      "Preflight blocked the provider route before call because cost cap evidence was missing.",
    blockReason: "Provider-route work must fail before execution when a cost cap is missing.",
    missingEvidence: ["cost-cap-receipt.md"],
    unblockOwner: "Routing layer / GPT-Sararin cost gate",
    unblockAction: "Create and approve a pre-call cost cap receipt before provider execution.",
    nextAllowedAction: "Prepare cost-cap receipt and rerun provider preflight.",
    notAllowedYet: "Do not call OpenRouter, Opus, Sonnet, or any paid provider.",
    publicSafeSummary: "Provider work failed closed when pre-call cost cap evidence was missing.",
    updatedAt: "2026-06-07",
    snapshotType: "public_safe_static_snapshot",
    evidenceRefs: ["aios-preflight.sh", "proof-drill-002-cost-cap-precall-gate.md"],
    evidencePresence: {
      routeLedger: "present",
      roleDependencyMatrix: "present",
      telemetryReceipt: "present",
      providerReceipt: "blocked_before_call",
      sourceRegister: "not_required",
      costCapReceipt: "missing",
      stopConditionCheck: "present",
      monitorStatus: "present",
    },
  },
  {
    id: "AIOS-ENF-002B",
    workstream: "AIOS enforcement",
    phase: "Enforcement Automation v0.1",
    phaseName: "Provider task with completed provider receipt",
    taskName: "Provider task with completed provider receipt",
    phaseStatus: "PASS",
    overallStatus: "PASS",
    monitoringStatus: "PASS",
    claimStatus: "valid_aios_proof",
    roleOwner: "Codex/local executor",
    expectedRoleChain: "Routing layer -> cost-cap gate -> provider receipt -> closeout",
    actualWorkerOrAgent: "Local shell scripts",
    selectedRoute: "provider task closeout",
    modelProvider: "provider_route_when_used",
    modelRequested: "not_rendered_publicly",
    modelReturned: "not_exposed_or_not_rendered",
    reviewer: "OpenRouter reviewer route receipted when used",
    providerReceiptStatus: "present",
    costCapStatus: "PASS",
    telemetryStatus: "PARTIAL",
    tokenStatus: "NOT_EXPOSED",
    costStatus: "NOT_EXPOSED",
    sourceRegisterStatus: "NOT_REQUIRED",
    roleDependencyStatus: "PASS",
    stopConditionStatus: "CLEAR",
    humanGateStatus: "NOT_REQUIRED",
    nextGate: "Apply the same receipt requirements to future reviewer calls.",
    missingFields: ["provider-returned token/cost may be unavailable depending on tooling"],
    evidenceSummary:
      "Provider route had required cost cap and provider receipt; usage details may still be tool-limited.",
    blockReason: "not_blocked",
    missingEvidence: [],
    unblockOwner: "not_required",
    unblockAction: "Keep provider receipt requirements on future reviewer calls.",
    nextAllowedAction: "Use provider route only when cost cap and receipt paths are prepared.",
    notAllowedYet: "Do not use missing provider usage fields as benchmark proof.",
    publicSafeSummary: "Provider-route claims require provider receipts and cost-cap evidence.",
    updatedAt: "2026-06-07",
    snapshotType: "public_safe_static_snapshot",
    evidenceRefs: ["provider-receipt.md", "cost-cap-receipt.md"],
    evidencePresence: {
      routeLedger: "present",
      roleDependencyMatrix: "present",
      telemetryReceipt: "present",
      providerReceipt: "present",
      sourceRegister: "not_required",
      costCapReceipt: "present",
      stopConditionCheck: "present",
      monitorStatus: "present",
    },
  },
  {
    id: "AIOS-OPUS-001",
    workstream: "AIOS reviewer gate",
    phase: "Monitoring + Enforcement Plan Review",
    phaseName: "OpenRouter Opus 4.7 critique gate",
    taskName: "OpenRouter Opus 4.7 critique gate",
    phaseStatus: "PASS_WITH_CAVEAT",
    overallStatus: "PASS_WITH_CAVEAT",
    monitoringStatus: "PASS_WITH_CAVEAT",
    claimStatus: "valid_provider_review_with_corrective_cost_cap_gap",
    roleOwner: "OpenRouter reviewer",
    expectedRoleChain: "Routing layer -> cost-cap gate -> OpenRouter reviewer -> closeout -> human gate",
    actualWorkerOrAgent: "OpenRouter reviewer script",
    selectedRoute: "anthropic/claude-opus-4.7",
    modelProvider: "OpenRouter",
    modelRequested: "anthropic/claude-opus-4.7",
    modelReturned: "not_exposed_by_tool",
    reviewer: "OpenRouter Opus 4.7",
    providerReceiptStatus: "present",
    costCapStatus: "PARTIAL",
    telemetryStatus: "PARTIAL",
    tokenStatus: "NOT_EXPOSED",
    costStatus: "NOT_EXPOSED",
    sourceRegisterStatus: "NOT_REQUIRED",
    roleDependencyStatus: "PASS",
    stopConditionStatus: "CLEAR",
    humanGateStatus: "PASS",
    nextGate: "Do not reuse this as perfect execution proof; keep the cost-cap caveat visible.",
    missingFields: ["returned_model", "token_usage", "cost", "exact_elapsed_time"],
    evidenceSummary:
      "Real OpenRouter Opus review exists, but cost cap was corrected after the call and provider usage details were not exposed.",
    blockReason: "Corrective caveat: future paid calls need pre-call cost-cap receipt.",
    missingEvidence: ["full provider token/cost/model/time details"],
    unblockOwner: "Routing layer",
    unblockAction: "Require cost-cap receipt before any future provider call.",
    nextAllowedAction: "Use the review as a caveated reviewer receipt.",
    notAllowedYet: "Do not call this perfect routing proof or benchmark evidence.",
    publicSafeSummary:
      "A real reviewer gate happened and remains caveated because usage details are partial.",
    updatedAt: "2026-06-07",
    snapshotType: "public_safe_static_snapshot",
    evidenceRefs: ["opus-review-result.md", "provider-receipt.md"],
    evidencePresence: {
      routeLedger: "present",
      roleDependencyMatrix: "present",
      telemetryReceipt: "partial",
      providerReceipt: "present",
      sourceRegister: "not_required",
      costCapReceipt: "partial",
      stopConditionCheck: "present",
      monitorStatus: "present",
    },
  },
  {
    id: "AIOS-MONITORING-ROLE-REVIEWS-001",
    workstream: "AIOS monitoring role review",
    phase: "Monitoring v0.2 role review sequence",
    phaseName: "Data Team, Visual/UX, and Big Crew review",
    taskName: "Three-role monitoring review sequence",
    phaseStatus: "PASS_WITH_CAVEAT",
    overallStatus: "PASS_WITH_CAVEAT",
    monitoringStatus: "PASS_WITH_CAVEAT",
    claimStatus: "valid_aios_proof_for_role_review_tasks_only",
    roleOwner: "Data Team / Visual Designer / Big Crew QA",
    expectedRoleChain:
      "Routing layer -> Data Team review -> Visual/UX review -> Big Crew QA -> consolidation patch",
    actualWorkerOrAgent: "Role review workstream with separate receipts",
    selectedRoute: "local routed role-review tasks",
    modelProvider: "not_required",
    modelRequested: "not_required",
    modelReturned: "not_required",
    reviewer: "role-review sequence",
    providerReceiptStatus: "not_required",
    costCapStatus: "NOT_REQUIRED",
    telemetryStatus: "PASS",
    tokenStatus: "NOT_REQUIRED",
    costStatus: "NOT_REQUIRED",
    sourceRegisterStatus: "NOT_REQUIRED",
    roleDependencyStatus: "PASS",
    stopConditionStatus: "CLEAR",
    humanGateStatus: "PASS",
    nextGate: "Apply the consolidation patch, then rerun validation before any commit gate.",
    missingFields: [],
    evidenceSummary:
      "Each role review has route ledger, role dependency matrix, telemetry receipt, closeout, and monitor status.",
    blockReason:
      "Page is not commit-ready until Data Team, UX, and QA findings are reflected.",
    missingEvidence: ["consolidation patch validation"],
    unblockOwner: "Codex/local executor for patch; GPT/Sararin for final gate",
    unblockAction:
      "Patch schema, first-screen decision guidance, unblock guidance, and overclaim wording.",
    nextAllowedAction: "Apply consolidation patch and validate the public route.",
    notAllowedYet: "Do not commit, push, deploy, start CASE-003, or claim monitoring complete.",
    publicSafeSummary:
      "Role-chain proof exists for the review sequence, but the page still needs a consolidation patch.",
    updatedAt: "2026-06-07",
    snapshotType: "public_safe_static_snapshot",
    evidenceRefs: [
      "data-team-monitoring-contract-review.md",
      "visual-ux-monitoring-page-review.md",
      "big-crew-qa-monitoring-review.md",
    ],
    evidencePresence: {
      routeLedger: "present",
      roleDependencyMatrix: "present",
      telemetryReceipt: "present",
      providerReceipt: "not_required",
      sourceRegister: "not_required",
      costCapReceipt: "not_required",
      stopConditionCheck: "present",
      monitorStatus: "present",
    },
  },
  {
    id: "CASE-003-RERUN-000",
    workstream: "CASE-003",
    phase: "CASE-003 Fresh AIOS-Routed Rerun",
    phaseName: "Phase 0 onward rerun",
    taskName: "Phase 0 onward rerun",
    phaseStatus: "PARKED",
    overallStatus: "PARKED",
    monitoringStatus: "PARKED",
    claimStatus: "no_aios_proof_yet",
    roleOwner: "not_started",
    expectedRoleChain:
      "Routing layer -> role dependency matrix -> phase worker -> reviewer gate -> human gate",
    actualWorkerOrAgent: "not_started",
    selectedRoute: "pending route ledger",
    modelProvider: "pending",
    modelRequested: "pending",
    modelReturned: "pending",
    reviewer: "pending Opus gate when routed and cost-capped",
    providerReceiptStatus: "not_required",
    costCapStatus: "NOT_REQUIRED",
    telemetryStatus: "MISSING",
    tokenStatus: "MISSING",
    costStatus: "MISSING",
    sourceRegisterStatus: "MISSING",
    roleDependencyStatus: "MISSING",
    stopConditionStatus: "TRIGGERED",
    humanGateStatus: "PARKED",
    nextGate: "Create Phase 0 execution packet under the new enforcement rules.",
    missingFields: ["route ledger", "role dependency matrix", "telemetry receipt", "monitor status"],
    evidenceSummary: "No fresh AIOS-routed CASE-003 phase evidence exists yet.",
    blockReason: "CASE-003 remains parked until monitoring baseline and Phase 0 route packet are accepted.",
    missingEvidence: ["Phase 0 route ledger", "role dependency matrix", "source/register plan if needed"],
    unblockOwner: "GPT/Sararin and routing layer",
    unblockAction: "Approve Phase 0 execution packet after monitoring consolidation gate.",
    nextAllowedAction: "Prepare Phase 0 execution packet only after this page candidate is gated.",
    notAllowedYet: "Do not start CASE-003 rerun or claim prior artifacts as fresh AIOS proof.",
    publicSafeSummary:
      "CASE-003 has not yet produced fresh AIOS-routed phase evidence under the new enforcement rules.",
    updatedAt: "2026-06-07",
    snapshotType: "public_safe_static_snapshot",
    evidenceRefs: [],
    evidencePresence: {
      routeLedger: "missing",
      roleDependencyMatrix: "missing",
      telemetryReceipt: "missing",
      providerReceipt: "not_required",
      sourceRegister: "missing",
      costCapReceipt: "not_required",
      stopConditionCheck: "missing",
      monitorStatus: "missing",
    },
  },
]

export const conceptLegend = [
  {
    term: "Telemetry",
    definition:
      "Raw execution facts such as model, provider, token, cost, time, validation result, file count, and receipt presence.",
  },
  {
    term: "Observability",
    definition:
      "Explainability of the work: task, phase, role owner, route reason, evidence, missing fields, source register, human gate, and claim boundary.",
  },
  {
    term: "Monitoring",
    definition:
      "Rule-based classification that uses telemetry and observability records to decide pass, fail, downgrade, escalate, or park.",
  },
  {
    term: "Review Surface",
    definition:
      "Public-safe visual layer that explains curated monitoring status without exposing raw receipts or internal task paths.",
  },
]

export const aiosMonitoringRuleGroups = [
  {
    title: "Enforcement monitoring",
    rules: [
      "route-ledger.md missing -> FAIL",
      "role-dependency-matrix.md missing or unresolved -> DOWNGRADED",
      "telemetry-receipt.md missing -> FAIL",
      "provider/model claim without provider-receipt.md -> FAIL",
    ],
  },
  {
    title: "Cost / usage monitoring",
    rules: [
      "paid provider call without cost cap -> STOP",
      "token or cost not exposed -> allowed only with explicit telemetry caveat",
      "benchmark or comparison claim without usage proof -> DOWNGRADED",
    ],
  },
  {
    title: "Role-drift monitoring",
    rules: [
      "Codex writes Opus critique without OpenRouter receipt -> FAIL",
      "Codex labels local source work as Researcher output without route/source receipt -> FAIL",
      "human gate recorded as model telemetry -> FAIL",
    ],
  },
  {
    title: "Overclaim monitoring",
    rules: [
      "legal/security/finance prep becomes approval -> ESCALATE",
      "draft/local-only work presented as AIOS proof -> DOWNGRADED",
      "monitoring page presented as live production dashboard -> FAIL",
    ],
  },
]

export const governanceEnforcementChecks = [
  {
    control: "Route ledger required",
    status: "PASS",
    evidence: "route-ledger.md",
    meaning: "Each AIOS task needs an explicit route, role owner, route reason, and output path before work is promoted.",
    failureMeaning: "Missing route ledger means draft/local only.",
  },
  {
    control: "Role dependency matrix required",
    status: "PASS",
    evidence: "role-dependency-matrix.md",
    meaning: "Every AIOS task must classify required, optional, parked, waived, and not-applicable roles before execution.",
    failureMeaning: "No role matrix, no AIOS proof.",
  },
  {
    control: "Telemetry receipt required",
    status: "PASS",
    evidence: "telemetry-receipt.md",
    meaning: "Missing model, token, cost, or time fields must be recorded instead of invented.",
    failureMeaning: "Missing telemetry downgrades claims and blocks benchmark proof.",
  },
  {
    control: "Cost-cap pre-call gate",
    status: "PASS",
    evidence: "cost-cap-receipt.md / preflight rule",
    meaning: "Paid provider calls must fail before execution when cost cap evidence is missing.",
    failureMeaning: "Provider route must stop before call.",
  },
  {
    control: "Provider receipt for OpenRouter / Opus / Sonnet",
    status: "PASS",
    evidence: "provider-receipt.md",
    meaning: "No reviewer/model claim is valid unless a provider receipt exists.",
    failureMeaning: "Provider/model claim fails closed.",
  },
  {
    control: "Source register for Researcher route",
    status: "NOT_REQUIRED",
    evidence: "source-register.md required only when research route starts",
    meaning: "Research work must show source, date checked, owner, and freshness before it can support decisions.",
    failureMeaning: "Researcher output without source register downgrades or fails.",
  },
  {
    control: "Human gate separated from model telemetry",
    status: "PASS",
    evidence: "stop-condition-checklist.md",
    meaning: "GPT/Sararin approval cannot be logged as model output or provider telemetry.",
    failureMeaning: "Gate record must be corrected before proof claim.",
  },
  {
    control: "Claim downgrade rule",
    status: "PASS",
    evidence: "closeout-validation.md and monitor-status.json",
    meaning: "Useful work becomes downgraded or draft-only when proof is incomplete.",
    failureMeaning: "Incomplete proof cannot be promoted.",
  },
  {
    control: "No role matrix, no AIOS proof",
    status: "PASS",
    evidence: "role dependency enforcement",
    meaning: "Right worker is not enough; right role chain must be proven before execution.",
    failureMeaning: "Task is downgraded to draft/local only.",
  },
]

export const tokenCostUsageVisibility = [
  {
    signal: "Token usage",
    status: "PARTIAL / NOT_EXPOSED depending on route",
    behavior: "Missing token usage cannot support benchmark or cost-efficiency claims.",
  },
  {
    signal: "Cost",
    status: "NOT_REQUIRED for local implementation; NOT_EXPOSED may apply to provider route",
    behavior: "Cost claims require provider receipt, quote, or source evidence.",
  },
  {
    signal: "Cost cap",
    status: "PASS for provider pre-call enforcement rule",
    behavior: "Provider calls without a pre-call cost cap fail preflight.",
  },
  {
    signal: "Provider receipt",
    status: "Required for Opus/OpenRouter/Sonnet claims",
    behavior: "Provider/model critique claims fail when receipt is absent or incomplete.",
  },
  {
    signal: "Missing fields",
    status: "Allowed only when explicit",
    behavior: "Missing values downgrade claims; they never become proof.",
  },
  {
    signal: "Provider/tool limitation",
    status: "Possible",
    behavior:
      "Missing token/cost/model/time may be a provider or tool limitation. It does not automatically fail every task, but it cannot support benchmark, cost-saving, or routing optimization proof.",
  },
]

export const phaseAgentActivity = [
  {
    phase: "Enforcement automation",
    roleTeam: "Codex/local",
    worker: "local scripts",
    status: "PASS",
    output: "preflight, closeout, monitor check",
    nextGate: "Use on every AIOS-routed task.",
  },
  {
    phase: "Opus critique gate",
    roleTeam: "OpenRouter Opus 4.7",
    worker: "provider reviewer",
    status: "PASS_WITH_CAVEAT",
    output: "reviewer output with corrective cost-cap caveat",
    nextGate: "Future paid calls require pre-call cost-cap receipt.",
  },
  {
    phase: "Monitoring data contract review",
    roleTeam: "Data Team",
    worker: "routed role review",
    status: "PASS_WITH_CAVEAT",
    output: "APPROVE WITH REQUIRED DATA CONTRACT PATCH",
    nextGate: "Reflect schema/unblock fields; full aggregation contract remains deferred.",
  },
  {
    phase: "Monitoring visual / UX clarity review",
    roleTeam: "Visual Designer / UX",
    worker: "routed role review",
    status: "PASS_WITH_CAVEAT",
    output: "PATCH_REQUIRED",
    nextGate: "Move decision guidance and status definitions above dense tables.",
  },
  {
    phase: "Big Crew QA / Reality Checker",
    roleTeam: "Big Crew QA",
    worker: "routed role review",
    status: "PASS_WITH_CAVEAT",
    output: "APPROVE WITH SMALL PATCH; local candidate only",
    nextGate: "Narrow wording to script/file-level enforcement proof.",
  },
  {
    phase: "CASE-003 rerun",
    roleTeam: "AIOS routed crew",
    worker: "not started",
    status: "PARKED",
    output: "fresh Phase 0 route packet pending",
    nextGate: "Start only after monitoring consolidation and GPT/Sararin gate.",
  },
]

export const statusFlow = [
  "NOT_STARTED",
  "IN_PROGRESS",
  "closeout + monitor check",
  "PASS / PASS_WITH_CAVEAT / FAIL / DOWNGRADED / ESCALATE / PARKED",
]

export const statusDefinitions = [
  { status: "NOT_STARTED", definition: "Task, role, or phase has not started yet." },
  { status: "IN_PROGRESS", definition: "Work has started but no closeout proof exists yet." },
  { status: "PASS", definition: "Required evidence exists and checks passed." },
  {
    status: "PASS_WITH_CAVEAT",
    definition:
      "Checks passed, but visible limits remain, such as static snapshot scope, partial telemetry, or local-candidate-only status.",
  },
  { status: "FAIL", definition: "Required evidence is missing or a stop condition triggered." },
  { status: "DOWNGRADED", definition: "Work is useful but not valid AIOS proof." },
  { status: "ESCALATE", definition: "GPT/Sararin or reviewer gate is required before proceeding." },
  { status: "PARKED", definition: "Intentionally not started, paused, or blocked pending gate." },
]

export const claimStatusDefinitions = [
  {
    status: "valid_aios_proof",
    definition:
      "Required routing, role dependency, telemetry, and closeout checks are present for the task boundary.",
  },
  {
    status: "valid_aios_proof_for_role_review_tasks_only",
    definition:
      "Role-review routing was proven for those review tasks only; it does not make the monitoring page complete.",
  },
  {
    status: "draft_local_only",
    definition:
      "Useful work may exist, but required proof is incomplete or a stop condition downgraded the claim.",
  },
  {
    status: "valid_provider_review_with_corrective_cost_cap_gap",
    definition:
      "Provider review is real and receipted, but the run keeps a corrective caveat about cost-cap timing.",
  },
  {
    status: "no_aios_proof_yet",
    definition: "No fresh routed evidence exists for this phase/task yet.",
  },
]

export const deferredForV02 = [
  {
    item: "Live aggregate export",
    status: "deferred",
    meaning: "The public page still reads a curated static snapshot, not a live stream from every task folder.",
  },
  {
    item: "Full Data Team aggregation contract",
    status: "required before CASE-003 rerun",
    meaning:
      "Data Team review completed, but the full multi-phase aggregation/freshness contract remains deferred.",
  },
  {
    item: "Visual Designer / UX approval",
    status: "patch required",
    meaning:
      "UX review completed and requested clearer first-screen decision guidance and unblock visibility.",
  },
  {
    item: "Big Crew QA final local-candidate gate",
    status: "small patch required",
    meaning:
      "QA review completed and requested narrower wording plus removal of internal-only public snapshot fields.",
  },
  {
    item: "Internal detail surface",
    status: "deferred",
    meaning: "No internal monitoring console is promoted until auth/access boundary is reliable.",
  },
  {
    item: "CASE-003 fresh rerun",
    status: "parked",
    meaning: "CASE-003 should not restart until the monitoring consolidation and role-chain gates are accepted.",
  },
]

export const aiosMonitoringSummary = {
  totalRecords: aiosMonitoringRecords.length,
  passCount: aiosMonitoringRecords.filter((record) => record.overallStatus === "PASS").length,
  passWithCaveatCount: aiosMonitoringRecords.filter(
    (record) => record.overallStatus === "PASS_WITH_CAVEAT",
  ).length,
  failCount: aiosMonitoringRecords.filter((record) => record.overallStatus === "FAIL").length,
  downgradedCount: aiosMonitoringRecords.filter((record) => record.overallStatus === "DOWNGRADED")
    .length,
  parkedCount: aiosMonitoringRecords.filter((record) => record.overallStatus === "PARKED").length,
}
