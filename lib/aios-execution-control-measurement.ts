export const executionControlRoles = [
  {
    name: "Super Runner",
    label: "Execution Control Layer",
    primaryResponsibility:
      "Controls task boundary, dependency, authority, caveats, and stop conditions before work proceeds.",
    evidenceContribution:
      "Shows whether dependency, authority, stop condition, unsafe scope, and caveat fields were declared.",
    notAllowed:
      "Does not act as an autonomous platform, approve execution, claim production readiness, or make cost/replacement decisions.",
    bigCrewRelationship:
      "Governs the task boundary around Big Crew work; it is not a delivery specialist role.",
  },
  {
    name: "Runner",
    label: "Bounded Task Executor",
    primaryResponsibility:
      "Executes approved bounded tasks without inventing new scope.",
    evidenceContribution:
      "Shows files touched, scope adherence, validation-ready output, and handoff artifact status.",
    notAllowed:
      "Does not add unapproved scope, self-approve output, or convert task completion into performance proof.",
    bigCrewRelationship:
      "Executes bounded work after scope is controlled; it is not the same as Big Crew implementation perspective.",
  },
  {
    name: "Checker",
    label: "Evidence & Claim Boundary Checker",
    primaryResponsibility:
      "Validates evidence completeness, source-of-truth alignment, and claim boundaries.",
    evidenceContribution:
      "Shows evidence gaps, claim drift, source-of-truth mismatches, validation status, and first-pass acceptance.",
    notAllowed:
      "Does not replace Big Crew QA, approve production readiness, or claim benchmark, cost, speed, or public-proof outcomes.",
    bigCrewRelationship:
      "Checks whether claims are evidence-safe; Big Crew QA checks delivery quality and failure modes.",
  },
] as const

export const executionControlTraceSummary = [
  {
    field: "super_runner_involved",
    status: "visible",
    note: "Execution Control Layer role is now traceable.",
  },
  {
    field: "runner_involved",
    status: "visible",
    note: "Bounded Task Executor role is now traceable.",
  },
  {
    field: "checker_involved",
    status: "visible",
    note: "Evidence & Claim Boundary Checker role is now traceable.",
  },
  {
    field: "owner_gate_required",
    status: "yes",
    note: "Required before execution, public proof, cost, replacement, or production claims.",
  },
  {
    field: "opus_gate_status",
    status: "receipted for 2026-06-16 measurement contract gate",
    note: "OpenRouter Opus 4.7 approved this visibility + measurement-contract patch; other Opus-style wording still requires its own receipt.",
  },
  {
    field: "claim_boundary_status",
    status: "active",
    note: "No performance, benchmark, cost, replacement, or production-readiness claim.",
  },
  {
    field: "evidence_status",
    status: "draft evidence-control visibility",
    note: "Traceability improved qualitatively; efficiency is not yet measured.",
  },
] as const

export const commonExecutionControlMetrics = [
  "task_duration_minutes",
  "rework_count",
  "checker_findings_count",
  "claim_drift_prevented_count",
  "owner_escalation_count",
  "blocked_unsafe_action_count",
  "missing_evidence_count",
  "validation_pass_first_time",
  "scope_change_count",
  "handoff_completeness_score",
] as const

export const roleSpecificExecutionControlMetrics = [
  {
    role: "Super Runner",
    metrics: [
      "dependency_declared",
      "authority_checked",
      "stop_condition_triggered_count",
      "unsafe_scope_blocked_count",
      "caveats_preserved",
    ],
  },
  {
    role: "Runner",
    metrics: [
      "task_completed_within_scope",
      "files_created_or_updated_count",
      "unapproved_scope_added_count",
      "validation_ready_output",
      "handoff_artifact_created",
    ],
  },
  {
    role: "Checker",
    metrics: [
      "evidence_gap_found_count",
      "claim_drift_found_count",
      "source_of_truth_mismatch_count",
      "validation_status",
      "first_pass_acceptance",
    ],
  },
] as const

export const blockedExecutionControlPerformanceClaims = [
  "improves performance",
  "reduces execution time",
  "increases efficiency",
  "faster delivery",
  "lower review effort",
] as const
