# PHASE_D_SARARIN_AI_TELEMETRY_PHASE_2_VALIDATION_AND_VISUALIZATION_READINESS_PLAN_20260705

status: PHASE_D_VALIDATION_AND_VISUALIZATION_READINESS_PLAN_CREATED_LOCAL_ONLY
created_at: 2026-07-06 Asia/Bangkok
project: sararin.ai internal telemetry Phase 2
source_context: `.codex/project-context/sararin-ai-internal-telemetry-phase-2/`
claim_level: local planning only

## Enforcement Context

AIOS Enforcement v0.2 resolver returned `AVAILABLE` at:

`/Users/apple/robert-knowledge-base/02_execution_control/aios_enforcement/AIOS_ENFORCEMENT_V0_2.md`

This plan is local-only. It does not start Phase 2 insight report execution, app work, graph work, route work, deploy work, or provider-backed review.

## Context Foundation

- System / workflow being measured: sararin.ai internal telemetry and System Health hybrid gateway evidence.
- Data source: dashboard-shaped bundled export plus local Phase 2 proof/receipt artifacts.
- Data source mode: bundled export; not raw row-level telemetry.
- Signal family: data quality and uncertainty, governance and claim boundary, evidence/source.
- Key fields required: source artifact, source mode, field inventory, category, count, classification rule, sample row, confidence, claim impact, tooltip/disclaimer.
- Missingness categories expected: observed, inferred, not claimable, true missing, source schema gap, tool not exposed, unknown missing.
- Confidence rule: category counts are not strong until field-level counts, exact rules, and sample-row evidence exist.
- Claim supported: readiness planning for validation and visualization.
- Claim not supported: Phase 2 implementation, production telemetry verification, graph production readiness, live DB proof, provider-backed display proof, full row-level completeness.
- Decision this plan should support: whether to run a validation/recount artifact before any Phase 2 report v0.2 or UI implementation.

## Phase D Scope

Phase D defines two readiness tracks only:

- Track D1: Data Validation / Recount Readiness.
- Track D2: Data Visualization + UI Readiness.

It may define visualization questions, candidate charts, UI placement hypotheses, graph-readiness criteria, required fields per visualization, tooltip/disclaimer rules, not-ready visualizations, and owner decision views.

It may not implement graphs, UI, routes, data stores, deploys, or Phase 2 insight report execution.

## Track D1 - Data Validation / Recount Readiness

Purpose: define how to prove or downgrade Phase 2 category counts before any insight report or UI implementation.

### D1 Required Inputs

| Input | Required Status Before Strong Claim | Current Phase D Status |
|---|---|---|
| Source artifact inventory | Exists and identifies authoritative source per count | Partially observed; needs formal inventory |
| Field inventory | Exists with field names, meanings, and source mode | Missing |
| Field-level counts | Exists for required fields and missingness labels | Missing |
| Classification rules | Exact inclusion/exclusion rules exist per category | Missing or not trusted enough |
| Category recount | Reproducible or explicitly downgraded | Not yet reproducible |
| Sample rows | Exists for major categories | Missing |
| Baseline reconciliation | Explains preserved baseline vs observed bundled-export sum | Missing |
| Claim downgrade map | Identifies unsupported claims and downgrade language | Required |

### D1 Known Counts To Validate Or Downgrade

| Count | Current Meaning | Phase D Handling |
|---:|---|---|
| 26959 | Preserved baseline missing telemetry signals | Preserve as baseline until source and rule are identified. |
| 26957 | Directly observed bundled-export warning rows sum | Treat as observed in bundled export, not raw row-level proof. |
| 2 | Unreproduced delta | Reconcile before insight report v0.2. |
| 18019 | `gate_claim_mapping_missing` in v0.1 report | Reproduce from exact rules or downgrade. |
| 66.84% | Share of observed missing signals attributed to `gate_claim_mapping_missing` | Treat as source-limited until denominator and numerator are reproduced. |

### D1 Validation Gates

1. Build source artifact inventory.
2. Build field inventory.
3. Define missingness taxonomy and category rules.
4. Recount baseline and bundled-export warning sums.
5. Reproduce or downgrade `gate_claim_mapping_missing`.
6. Attach sample rows for major categories.
7. Produce a claim downgrade map.
8. Only then authorize Phase 2 insight report v0.2 drafting.

## Track D2 - Data Visualization + UI Readiness

Purpose: define what charts, tables, tooltips, disclaimers, and UI decision surfaces would be appropriate only after field-level evidence exists.

### 1. Owner Decision Questions

- Which missing telemetry categories are most action-worthy after validation?
- Is `gate_claim_mapping_missing` proven, revised, or downgraded?
- What does the delta between preserved baseline and observed bundled-export sum mean?
- Which fields must be instrumented before UI or graph work is useful?
- Which claims should be shown publicly, privately, or not at all?
- What is the next safe action: schema repair, source instrumentation, recount, or report drafting?

### 2. Candidate Visualization Inventory

| Visualization | Purpose | Initial Readiness |
|---|---|---|
| Category ranking bar chart | Show largest validated missingness categories | VISUALIZATION_NOT_READY_SOURCE_LIMITED |
| Field-level missingness table or heatmap | Show missingness by field and row group | VISUALIZATION_NOT_READY_SOURCE_LIMITED |
| Observed vs inferred vs not-claimable stacked bar | Separate evidence quality instead of blending categories | VISUALIZATION_NOT_READY_SOURCE_LIMITED |
| Delta reconciliation card | Explain baseline, observed sum, and delta | VISUALIZATION_NOT_READY_SOURCE_LIMITED |
| Sample-row evidence table | Show representative evidence behind categories | VISUALIZATION_NOT_READY_SOURCE_LIMITED |
| Fix recommendation matrix | Map category gaps to next instrumentation or schema action | VISUALIZATION_NOT_READY_SOURCE_LIMITED |

### 3. Required Fields Per Chart/Table

| Candidate | Required Fields |
|---|---|
| Category ranking bar chart | category, count, source artifact, source mode, classification rule id, confidence, claim status |
| Field-level missingness table or heatmap | field name, row group, total rows, missing rows, missingness label, source mode, confidence |
| Observed vs inferred vs not-claimable stacked bar | category, observed count, inferred count, not-claimable count, rule id, confidence, source limitation |
| Delta reconciliation card | preserved baseline, observed bundled-export sum, delta, source artifact, reconciliation status, claim impact |
| Sample-row evidence table | sample id, category, relevant fields, observed value, missingness label, source artifact, redaction status |
| Fix recommendation matrix | category, blocked claim, likely cause, required evidence, recommended fix, owner decision needed |

### 4. Chart Readiness Gate

A visualization may be marked `GRAPH_READY` only if all requirements are met:

- field inventory exists;
- field-level counts exist;
- exact classification rules exist;
- category recount is reproducible or explicitly downgraded;
- sample rows exist for major categories;
- observed/inferred/not-claimable split exists;
- source limitation is visible;
- tooltip/disclaimer copy is owner-readable.

If any requirement is missing, mark:

`VISUALIZATION_NOT_READY_SOURCE_LIMITED`

Current Phase D verdict for all candidate visualizations:

`VISUALIZATION_NOT_READY_SOURCE_LIMITED`

### 5. Tooltip And Disclaimer Requirements

Every chart/table must show:

- source mode;
- whether counts are observed, inferred, downgraded, or not claimable;
- whether raw row-level evidence exists;
- what claim is blocked;
- whether the owner should treat the visualization as decision support or proof.

Reusable owner-readable disclaimer:

```text
This view is based on source-limited telemetry evidence. It separates observed, inferred, and not-claimable signals and should not be read as live production telemetry verification.
```

For `gate_claim_mapping_missing`:

```text
This category is not trusted as final until the field inventory, classification rule, recount, and sample-row evidence are reproduced.
```

### 6. UI Placement Hypothesis

If later validated, the safest UI placement is private/authenticated telemetry context, not a public telemetry inventory:

- primary placement: authenticated internal telemetry evidence or owner-review surface;
- secondary placement: private/system-health-adjacent gateway detail only if authenticated;
- public placement: gateway-only status and access-boundary copy, not internal telemetry rows or category details.

No UI placement is approved in Phase D. This is a hypothesis for later owner and validation review.

### 7. Not-Ready Visualization List

Do not visualize yet:

- any chart that ranks `gate_claim_mapping_missing` as final;
- any graph implying raw row-level completeness;
- any production telemetry verification chart;
- any public telemetry inventory view;
- any provider-backed display verification chart;
- any automated monitoring or alerting view;
- any chart using `26959`, `26957`, `18019`, or `66.84%` without visible source limitation and confidence labeling;
- any chart without owner-readable disclaimer copy.

### 8. Non-Claims

- No app/source changes.
- No graph implementation.
- No production UI.
- No route creation.
- No SQLite staging index.
- No deploy.
- No Phase 2 insight report execution.
- No provider-backed review claim.
- No independent review claim.
- No production telemetry verification claim.
- No live DB claim.
- No provider-backed telemetry display verification claim.
- No owner authenticated rendered proof claim.
- No full row-level completeness claim.
- No public telemetry inventory claim.

### 9. Next Artifact Only

`PHASE_E_SARARIN_AI_TELEMETRY_PHASE_2_FIELD_INVENTORY_AND_RECOUNT_SPEC_20260705.md`

## Final Status

PHASE_D_VALIDATION_AND_VISUALIZATION_READINESS_PLAN_CREATED_LOCAL_ONLY
