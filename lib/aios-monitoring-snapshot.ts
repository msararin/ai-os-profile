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
  schemaVersion: "aios-monitoring-public-static-snapshot-v0.3-under-construction",
  snapshotType: "public_safe_static_snapshot",
  generatedAt: "2026-06-10T14:30:00Z",
  freshnessTtlMinutes: 1440,
  source: "lib/aios-monitoring-snapshot.ts",
  sourceDescription:
    "Curated public-safe static snapshot aligned to the AIOS monitoring dashboard data contract v0.3 under-construction boundary.",
  coverageScope:
    "Covers selected public-safe status rows and the current under-construction dashboard implementation gate. It does not cover bypassed, pre-enforcement, manually reconstructed, live runtime, raw receipt, real-data, derivative, or benchmark records.",
  posture: "UNDER CONSTRUCTION / static review surface",
  boundary:
    "This snapshot is not live runtime telemetry, not a production monitoring system, not realtime agent tracking, not public proof, not CASE-003 execution, not real data ingestion, not derivative authorization, and not benchmark export.",
  dataContractBoundary:
    "Public under-construction surface consuming the committed v0.3 dashboard data contract fields. It is not the full monitoring aggregation contract required for CASE-003 execution or any benchmark export.",
  failClosedRule:
    "If a required route, role matrix, telemetry, provider, source, or human-gate receipt is missing, the claim must downgrade or fail closed.",
}

export const latestActionDecision = {
  currentLayerStatus: "PASS_WITH_CAVEAT" as AiosMonitorStatus,
  statusMeaning:
    "The public surface is approved only as an under-construction review surface. It exposes route, owner gate, claim boundary, evidence gap, and orchestration reality states without claiming production or live monitoring readiness.",
  why:
    "The implementation gate is bounded to the committed dashboard data contract v0.3 and must preserve blocked actions, evidence gaps, and public-safe caveats.",
  ownerToUnblock:
    "Owner approval remains required for push, production/live/public-proof claims, CASE-003 execution, real data ingestion, derivative authorization, benchmark export, and any expanded dashboard scope.",
  nextAllowedAction:
    "Validate this under-construction public surface locally, then decide whether the bounded route/page patch is ready for an internal commit. Do not push.",
  notAllowedYet:
    "Do not claim production readiness, live monitoring readiness, public proof readiness, CASE-003 execution, real data ingestion, derivative authorization, Benchmark Dataset v0.1 export, deploy, or push.",
}

export const publicUnderConstructionGate = {
  title: "Public under-construction dashboard implementation gate",
  requiredDisclaimer:
    "This page is an under-construction AIOS operating surface and does not indicate CASE-003 execution, real data ingestion, derivative creation, Benchmark Dataset v0.1 export, production monitoring, live monitoring, or public proof readiness.",
  contractVersion: "aios-monitoring-dashboard-data-contract-v0.3",
  contractStatus: "COMMITTED",
  implementationStatus: "PATCHED_UNDER_CONSTRUCTION",
  publicSurfaceStatus: "PUBLIC_UNDER_CONSTRUCTION",
  routingLevel: "LEVEL_2_HIGH_RISK",
  routeStatus: "LOCAL_ONLY_JUSTIFIED",
  reasonCode: "OWNER_APPROVED_BOUNDED_PUBLIC_UNDER_CONSTRUCTION_PATCH",
  ownerGateRequired: "yes",
  ownerGateStatus: "OWNER_APPROVED",
  claimStatus: "UNDER_CONSTRUCTION_PUBLIC_SURFACE",
  publicClaimAllowed: "no",
  claimBoundary:
    "Public under-construction operating surface only. Not production, not live monitoring, not public proof, not CASE-003 execution, not real data ingestion, not derivative authorization, and not benchmark export.",
  roleWorkerModelEvidence: [
    {
      role: "Implementation worker",
      worker: "Codex local patch",
      modelProvider: "local Codex session",
      receiptStatus: "not_applicable",
      evidenceStatus: "page/source diff and local validation only",
    },
    {
      role: "External reviewer",
      worker: "not run",
      modelProvider: "not_applicable",
      receiptStatus: "missing_with_reason",
      evidenceStatus: "external review not required for bounded local route/page patch before commit readiness",
    },
    {
      role: "Owner gate",
      worker: "Lyn approval",
      modelProvider: "not_applicable",
      receiptStatus: "not_applicable",
      evidenceStatus: "bounded public under-construction implementation scope approved",
    },
  ],
  evidenceGaps: [
    "No live telemetry feed is connected.",
    "No production monitoring proof exists.",
    "No public proof claim is authorized.",
    "No CASE-003 execution evidence is present.",
    "No real data ingestion evidence is present.",
    "No derivative authorization evidence is present.",
    "No Benchmark Dataset v0.1 export evidence is present.",
    "No external reviewer was run for this local implementation patch.",
  ],
  blockedActions: [
    "push",
    "production readiness claim",
    "live monitoring readiness claim",
    "public proof readiness claim",
    "CASE-003 execution",
    "real data ingestion",
    "derivative authorization",
    "Benchmark Dataset v0.1 export",
    "expanded dashboard scope without owner approval",
  ],
  orchestrationReality: {
    required: "REQUIRED_FOR_HIGH_RISK",
    designStatus: "DESIGNED_WITH_CONSTRAINTS",
    suitabilityStatus: "APPROPRIATE_FOR_TASK_RISK",
    reviewStatus: "REVIEWED_WITH_WARNINGS",
    evidenceStatus: "LOCAL_ONLY_JUSTIFIED",
    falseOrchestrationRisk: "LOW",
    downgradeReason:
      "This page may show governance state, but it must not present local implementation work as multi-model orchestration proof.",
    nextAction:
      "Run local validation and create the required Downloads HTML review report before any commit decision.",
  },
  nextAllowedAction:
    "Validate the bounded public under-construction surface and prepare an explicit-path commit if validation passes. Do not push.",
}

export const compactEvidenceRows = [
  {
    taskId: "dashboard-ux-implementation",
    taskName: "Dashboard UX implementation",
    taskRisk: "LEVEL_2_HIGH_RISK public under-construction dashboard UX",
    expectedRole: "Codex implementation executor",
    actualWorker: "Codex local",
    modelCandidateSelected: "Codex local",
    fallbackCandidatesConsidered: "Data Visualizer, QA Visual Reviewer, Opus critic if available",
    routingReason:
      "Owner authorized bounded dashboard UX gap-closure scope. Codex is the correct worker for repo/page implementation.",
    evidenceFile: "app/architecture/system-health/monitoring/page.tsx; lib/aios-monitoring-snapshot.ts",
    reviewerStatus: "LOCAL_ONLY_VALIDATION",
    qaStatus: "PENDING_LOCAL_VALIDATION",
    claimStatus: "UNDER_CONSTRUCTION_PUBLIC_SURFACE",
    proofClaim: "LOCAL_VALIDATION_ONLY",
    downgradeApplied: "INDEPENDENT_UX_PROOF_NOT_CLAIMED",
    ownerGateStatus: "OWNER_APPROVED_BOUNDED_SCOPE",
    nextAction: "Run typecheck, build, route, disclaimer, claim, secret, and layout validation.",
  },
  {
    taskId: "data-visualizer-ux-readability-review",
    taskName: "Data Visualizer / UX readability review",
    taskRisk: "LEVEL_2_HIGH_RISK owner-facing public surface readability",
    expectedRole: "Data Visualizer / UX Readability Reviewer",
    actualWorker: "Codex local applying committed Data Visualizer rules",
    modelCandidateSelected: "Codex local checklist",
    fallbackCandidatesConsidered: "Data Visualizer reviewer, UX Readability Reviewer, Opus critic",
    routingReason:
      "Independent Data Visualizer reviewer is not run in this local gate, so the page discloses local-only validation.",
    evidenceFile: "Downloads HTML report; rendered route validation after local server check",
    reviewerStatus: "REVIEW_NOT_RUN",
    qaStatus: "LOCAL_ONLY_VALIDATION",
    claimStatus: "LOCAL_VALIDATION_ONLY",
    proofClaim: "INDEPENDENT_UX_PROOF_NOT_CLAIMED",
    downgradeApplied: "INDEPENDENT_UX_PROOF_NOT_CLAIMED",
    ownerGateStatus: "OWNER_MONITOR_NOT_ORCHESTRATION_ENGINE",
    nextAction: "Keep Data Visualizer proof gap visible until an independent reviewer runs.",
  },
  {
    taskId: "qa-visual-review",
    taskName: "QA Visual review",
    taskRisk: "LEVEL_2_HIGH_RISK visual readability and overflow check",
    expectedRole: "QA Visual Reviewer",
    actualWorker: "Codex local visual/layout validation",
    modelCandidateSelected: "Codex local validation",
    fallbackCandidatesConsidered: "QA Visual Reviewer, browser screenshot check, Opus if wording ambiguity remains",
    routingReason:
      "Independent QA Visual Reviewer is not run in this local gate; overflow and collision safeguards are checked locally.",
    evidenceFile: "Downloads HTML report; local route visual/readability checks",
    reviewerStatus: "REVIEW_NOT_RUN",
    qaStatus: "LOCAL_ONLY_VALIDATION",
    claimStatus: "LOCAL_VALIDATION_ONLY",
    proofClaim: "INDEPENDENT_QA_PROOF_NOT_CLAIMED",
    downgradeApplied: "INDEPENDENT_QA_PROOF_NOT_CLAIMED",
    ownerGateStatus: "OWNER_MONITOR_NOT_ORCHESTRATION_ENGINE",
    nextAction: "Use viewport/layout validation and keep independent QA proof unclaimed.",
  },
  {
    taskId: "claim-boundary-opus-critic-review",
    taskName: "Claim-boundary / Opus critic review if available",
    taskRisk: "LEVEL_2_HIGH_RISK public claim wording and proof boundary",
    expectedRole: "Opus critic / claim-boundary reviewer",
    actualWorker: "OpenRouter Opus 4.7 critic pass",
    modelCandidateSelected: "Opus critic pass (single strong model, bounded scope)",
    fallbackCandidatesConsidered: "QA reviewer, Sonnet synthesis, Codex local claim scan",
    routingReason:
      "Opus was used as one bounded critic gate for wording and claim-boundary critique, not as multi-model orchestration proof.",
    evidenceFile: "OPUS_CRITIC_REVIEW_RESULT.md and provider_receipt.json in the Downloads review packet",
    reviewerStatus: "CRITIC_PASS_COMPLETE",
    qaStatus: "LOCAL_CLAIM_SCAN_REQUIRED",
    claimStatus: "CRITIC_EVIDENCE_ONLY",
    proofClaim: "MULTI_MODEL_PROOF_NOT_CLAIMED",
    downgradeApplied: "MULTI_MODEL_PROOF_NOT_CLAIMED",
    ownerGateStatus: "OWNER_MONITOR_NOT_ORCHESTRATION_ENGINE",
    nextAction: "Run Opus critic only if proportionate; otherwise keep local-only downgrade visible.",
  },
  {
    taskId: "owner-monitoring",
    taskName: "Owner monitoring",
    taskRisk: "OWNER_DECISION_BOUNDARY",
    expectedRole: "Lyn / Owner monitor",
    actualWorker: "Lyn owner approval for bounded scope",
    modelCandidateSelected: "Human owner gate",
    fallbackCandidatesConsidered: "No model fallback for protected owner decisions",
    routingReason:
      "Owner approval covers bounded dashboard UX implementation only and does not authorize push or stronger claims.",
    evidenceFile: "Owner instruction for this gate; Downloads HTML report",
    reviewerStatus: "OWNER_MONITOR",
    qaStatus: "NOT_APPLICABLE",
    claimStatus: "OWNER_APPROVED_BOUNDED_SCOPE_ONLY",
    proofClaim: "OWNER_APPROVAL_IS_NOT_PROOF",
    downgradeApplied: "PUBLIC_PROOF_NOT_CLAIMED",
    ownerGateStatus: "OWNER_APPROVED_BOUNDED_SCOPE",
    nextAction: "Report validation and commit readiness; do not push.",
  },
] as const

export const monitoringUxVerdict = {
  title: "Owner verdict",
  dashboardKind: "Public under-construction AIOS operating surface",
  proofLevelLabel: "Local validation only",
  proofLevelRaw: "LOCAL_VALIDATION_ONLY",
  enforced:
    "Claim boundary, owner gate, route status, blocked actions, evidence gaps, exact disclaimer, and local validation visibility.",
  notClaimed:
    "Production readiness, live monitoring readiness, public proof readiness, CASE-003 execution, real data ingestion, derivative authorization, benchmark export, and multi-model orchestration proof.",
  nextImprovement:
    "Add reviewer-gate evidence or external review coverage before claiming stronger proof.",
  summary:
    "Public under-construction AIOS operating surface. Current proof level: local Codex implementation validation only. Guardrails are active for claim boundary, owner gate, route status, blocked actions, and evidence gaps. External review was not run, so this page must not be treated as multi-model orchestration proof.",
}

export const proofLevelCards = [
  {
    title: "Local validation",
    status: "Local validation only",
    rawValue: "LOCAL_VALIDATION_ONLY",
    meaning: "Codex local checks passed. This is useful implementation evidence, not independent proof.",
  },
  {
    title: "Multi-model proof",
    status: "Not claimed",
    rawValue: "MULTI_MODEL_PROOF_NOT_CLAIMED",
    meaning: "No external model/provider review is being presented as orchestration proof.",
  },
  {
    title: "External review",
    status: "Not run",
    rawValue: "EXTERNAL_REVIEW_NOT_RUN",
    meaning: "External reviewer coverage is currently 0%, so stronger proof remains blocked.",
  },
  {
    title: "Public surface",
    status: "Under construction only",
    rawValue: "PUBLIC_UNDER_CONSTRUCTION_ONLY",
    meaning: "The page can be reviewed publicly, but it is not production, live, or proof-ready.",
  },
]

export const routingLayerChecks = [
  {
    taskGate: "Public dashboard UI patch",
    taskRisk: "Public under-construction route/page patch",
    expectedRole: "Implementation worker",
    recommendedWorker: "Codex local",
    actualWorker: "Codex local",
    routingLabel: "Correct worker selected",
    routingRaw: "ROUTE_MATCH",
    evidenceStatus: "Local diff, typecheck, build, route HTTP check",
    conclusion: "Correct worker for bounded repo/page implementation.",
  },
  {
    taskGate: "Public claim boundary review",
    taskRisk: "Public wording and claim safety",
    expectedRole: "QA / reviewer",
    recommendedWorker: "QA reviewer or Opus gate if stronger confidence is required",
    actualWorker: "Codex local validation only",
    routingLabel: "Local-only with downgrade",
    routingRaw: "LOCAL_ONLY_JUSTIFIED_WITH_DOWNGRADE",
    evidenceStatus: "Local scan and rendered disclaimer check; no external receipt",
    conclusion: "Acceptable for under-construction local validation, but not independent proof.",
  },
  {
    taskGate: "Multi-model orchestration proof",
    taskRisk: "High-risk proof claim",
    expectedRole: "External reviewer / provider receipt evidence",
    recommendedWorker: "Opus gate / QA reviewer / Data Team if needed",
    actualWorker: "Not run",
    routingLabel: "Not claimed",
    routingRaw: "DOWNGRADED_UNVERIFIED",
    evidenceStatus: "No provider/model receipt",
    conclusion:
      "Multi-model proof claim is not allowed because external review was not run. The dashboard remains valid as an under-construction local-validation surface.",
  },
  {
    taskGate: "Owner decision",
    taskRisk: "Scope and push/deployment boundary",
    expectedRole: "Lyn / Owner",
    recommendedWorker: "Human owner gate",
    actualWorker: "Owner approval recorded only for bounded public under-construction scope",
    routingLabel: "Scope boundary approved",
    routingRaw: "OWNER_APPROVED_SCOPE_BOUNDARY",
    evidenceStatus: "Owner approval in task instruction; no production/live/public-proof approval",
    conclusion: "Owner approves scope, not production/live/public-proof readiness.",
  },
]

export const orchestrationRealityChecks = [
  {
    question: "Was orchestration required?",
    answer: "Yes, for public-surface claim safety, but proportionate to the bounded patch.",
    rawValue: "REQUIRED_FOR_HIGH_RISK",
  },
  {
    question: "Was orchestration designed?",
    answer: "Designed with constraints: local implementation plus visible downgrade for missing external review.",
    rawValue: "DESIGNED_WITH_CONSTRAINTS",
  },
  {
    question: "Who executed?",
    answer: "Implementation worker: Codex local.",
    rawValue: "CODEX_LOCAL",
  },
  {
    question: "Was external review run?",
    answer: "No. External reviewer was not run.",
    rawValue: "EXTERNAL_REVIEW_NOT_RUN",
  },
  {
    question: "Was QA independent or local-only?",
    answer: "Local-only. QA was Codex validation, not independent reviewer proof.",
    rawValue: "LOCAL_QA_ONLY",
  },
  {
    question: "Was local-only execution justified?",
    answer: "Yes for bounded under-construction UI work, with stronger proof blocked.",
    rawValue: "LOCAL_ONLY_JUSTIFIED",
  },
  {
    question: "Was the claim downgraded correctly?",
    answer: "Yes. Multi-model proof is not claimed.",
    rawValue: "MULTI_MODEL_PROOF_NOT_CLAIMED",
  },
  {
    question: "What is Lyn's role?",
    answer: "Owner monitor and challenge gate, not orchestration engine.",
    rawValue: "OWNER_MONITOR_NOT_ORCHESTRATION_ENGINE",
  },
]

export const enforcementScorecard = [
  {
    control: "Claim boundary enforced",
    status: "PASS",
    meaning: "The page says what it does not prove.",
  },
  {
    control: "Exact disclaimer visible",
    status: "PASS",
    meaning: "The required sentence remains visible verbatim.",
  },
  {
    control: "Route status captured",
    status: "PASS",
    meaning: "Local-only execution is disclosed and bounded.",
  },
  {
    control: "Routing level captured",
    status: "PASS",
    meaning: "Public surface work is treated as high-risk.",
  },
  {
    control: "Owner gate captured",
    status: "PASS",
    meaning: "Owner approval covers bounded under-construction scope only.",
  },
  {
    control: "Blocked actions visible",
    status: "PASS",
    meaning: "Push, production, live, proof, CASE, real-data, derivative, and benchmark claims remain blocked unless separately approved.",
  },
  {
    control: "Evidence gaps visible",
    status: "PASS",
    meaning: "Missing external review and missing stronger proof are visible.",
  },
  {
    control: "Orchestration reality check visible",
    status: "PASS",
    meaning: "The page explains what happened and what did not happen.",
  },
  {
    control: "External review coverage",
    status: "NOT_RUN",
    meaning: "No external reviewer was used for this implementation patch.",
  },
  {
    control: "Independent QA coverage",
    status: "NOT_RUN",
    meaning: "QA is local Codex validation only.",
  },
  {
    control: "Multi-model proof claim prevented",
    status: "PASS",
    meaning: "The page does not claim multi-model orchestration proof.",
  },
  {
    control: "Production/live/public-proof claim blocked",
    status: "PASS",
    meaning: "The page remains under-construction only.",
  },
]

export const baselineMetrics = [
  ["compact_evidence_rows_created", "5"],
  ["route_model_fit_visible", "yes"],
  ["data_visualizer_review_status", "REVIEW_NOT_RUN"],
  ["qa_visual_review_status", "REVIEW_NOT_RUN"],
  ["opus_critic_review_status", "CRITIC_PASS_COMPLETE"],
  ["reviewer_not_run_count", "2"],
  ["local_only_validation_disclosed", "yes"],
  ["claim_downgrade_applied", "yes"],
  ["owner_gate_overuse_detected", "no"],
  ["owner_5_second_verdict_clarity", "present"],
  ["visual_overflow_defect_count", "0 observed after local layout safeguards"],
  ["evidence_gap_visibility", "visible"],
  ["forbidden_claim_scan_result", "pending local validation"],
  ["proof_level", "LOCAL_VALIDATION_ONLY"],
  ["external_review_coverage", "0%"],
  ["independent_qa_coverage", "0%"],
  ["local_validation_present", "yes"],
  ["claim_boundary_enforced", "yes"],
  ["evidence_gap_visible", "yes"],
  ["route_status_visible", "yes"],
  ["owner_gate_visible", "yes"],
  ["public_surface_status", "PUBLIC_UNDER_CONSTRUCTION"],
  [
    "next_target",
    "add reviewer-gate evidence or external review coverage before claiming stronger proof",
  ],
  ["benchmark_caption", "collection only; no scoring, no export, no readiness signal"],
] as const

export const enumTranslations = [
  {
    label: "Local-only justified",
    rawValue: "LOCAL_ONLY_JUSTIFIED",
    meaning:
      "This task was handled locally because it was bounded and did not claim production, live, CASE, real-data, derivative, or benchmark readiness.",
  },
  {
    label: "High-risk public surface",
    rawValue: "LEVEL_2_HIGH_RISK",
    meaning:
      "Public surface work needs explicit boundaries, blocked actions, owner gate state, and claim-safety checks.",
  },
  {
    label: "Public under construction",
    rawValue: "PUBLIC_UNDER_CONSTRUCTION",
    meaning: "The page can be public, but it must remain caveated and must not claim proof or readiness.",
  },
  {
    label: "Local validation only",
    rawValue: "LOCAL_VALIDATION_ONLY",
    meaning:
      "Build, typecheck, route check, and scans passed locally; no independent external proof is implied.",
  },
  {
    label: "Downgraded unverified",
    rawValue: "DOWNGRADED_UNVERIFIED",
    meaning:
      "Without role outputs or provider receipts, stronger orchestration claims must be blocked.",
  },
]

export const dashboardProofBoundary = {
  proves: [
    "AIOS guardrail state can be displayed.",
    "Claim boundary is visible.",
    "Route status is visible.",
    "Owner gate state is visible.",
    "Evidence gaps are visible.",
    "Local validation is separated from stronger proof.",
  ],
  doesNotProve: [
    "Multi-model orchestration.",
    "External QA.",
    "Opus gate review.",
    "Production monitoring.",
    "Live monitoring.",
    "Public proof readiness.",
    "CASE-003 completion.",
    "Benchmark readiness, benchmark completion, or benchmark export.",
  ],
}

export const dataVisualizerQualityRules = [
  "No overflowing status text.",
  "No clipped enum labels.",
  "No unreadable raw-value-first cards.",
  "Owner-readable interpretation required.",
  "Important status must be understandable within 5 seconds.",
  "Tables must remain legible.",
  "Dashboard should communicate meaning, not just surface raw fields.",
  "A blocked claim must not look like a blocked task; separate task status, claim status, and evidence status in owner-facing UI.",
]

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
