# Sararin.ai Internal Telemetry Phase 2 Project Context

status: PHASE_C_PROJECT_CONTEXT_ADAPTER_LOCAL_ONLY
project: sararin.ai internal telemetry Phase 2
lane: internal telemetry / system health hybrid lane
created_at: 2026-07-06 Asia/Bangkok

## Purpose

This adapter isolates sararin.ai Phase 2 facts from the permanent reusable Data Team skills. Use it as project-specific context before applying the permanent skills to future validation or insight work.

## Current Safe Deployed State

- Phase 1 owner-readable internal telemetry explanation deployed.
  - Commit: `d60bcc8f3e150d461612fecf9f9a5e4f1dc5c08d`
- Phase 1.1 public System Health telemetry placement cleanup deployed.
  - Commit: `7988cda8864d55b4987792a04cad6879463df2b8`
  - Production deployment: `dpl_4WBzTwPaU39zLrzyhsqgZWkZc3YQ`
  - Alias: `https://sararin.ai`
- `/internal/telemetry` remains Auth.js-gated when unauthenticated.
- `/architecture/system-health` remains public gateway-only.
- Separate public Telemetry Inventory card/title removed.
- Private Internal Telemetry Access remains.
- No internal telemetry rows are exposed publicly.

## Data Team Skill State

Phase B status to preserve: `PHASE_B_DATA_TEAM_PERMANENT_SKILL_PACK_CREATED_LOCAL_ONLY`.

Permanent skills available and referenced, not modified:

- `/Users/apple/.codex/skills/data-team-core-telemetry-semantics/`
- `/Users/apple/.codex/skills/data-team-quality-validation/`
- `/Users/apple/.codex/skills/data-team-profiling-monitoring/`

Existing draft/context skill also referenced:

- `/Users/apple/.codex/skills/data-team-telemetry-context/`

## Context Foundation

- System / workflow being measured: sararin.ai internal telemetry and system-health gateway evidence.
- Data source: dashboard-shaped bundled export and local proof/receipt artifacts in the scoped telemetry repo.
- Data source mode: bundled export plus local artifacts; not raw row-level telemetry.
- Signal family: governance and claim boundary, evidence/source, data quality and uncertainty, provider/model usage where exposed.
- Key fields required: category, count, source artifact, source mode, confidence, claim impact, route or receipt linkage.
- Missingness categories expected: true missing, source schema gap, tool not exposed, not claimed, inferred only, unknown missing.
- Confidence rule: directly observed source evidence is higher confidence than warning-text inference or dashboard aggregate carry-forward.
- Claim supported: source-limited Phase 2 project context for later skill use.
- Claim not supported: Phase 2 implementation, live DB proof, production telemetry verification, provider-backed display verification, full row-level completeness.
- Decision this insight should support: whether to run a later validation/recount artifact before any Phase 2 insight report v0.2.

## Owner Concern

`gate_claim_mapping_missing = 18019` appears in the v0.1 report and currently represents `66.84%` of the observed missing-signal sum. It is not trusted enough for stronger claims until the source, rules, and recount are reproduced.

## Required v0.2 Report Improvements

- Separate preserved baseline, observed bundled-export warning sums, and unreproduced deltas.
- Reproduce or downgrade `gate_claim_mapping_missing = 18019`.
- Mark dashboard-shaped bundled export as source-limited.
- Keep raw row-level completeness unclaimed.
- Include owner-readable tooltip/disclaimer language for source limitation.
- Define next instrumentation or validation action before graph/page implementation.

## Forbidden Actions

No Robert KB writes, cockpit update, CASE-004 touch, app/source changes, deploy, commit, push, production UI, SQLite staging index, `/internal/telemetry/data-quality` route, Phase 2 insight report v0.2, graph/page implementation, provider-backed review claim, independent review claim, visual DOCX QA pass claim, count fabrication, or permanent skill modification.

## Next Recommended Artifact Only

Create `PHASE_D_SARARIN_AI_TELEMETRY_PHASE_2_VALIDATION_PLAN_20260705.md` before any v0.2 insight report or implementation work.
