# DELTA_2_DATA_TEAM_QA_REVIEW_PACKET_V0_1

status: DATA_TEAM_QA_REVIEW_PACKET_LOCAL_ONLY

## Governing Skill

This packet uses the permanent skill as its governing standard:

- Data QA / Evidence QA Reviewer
- `/Users/apple/.codex/skills/data-qa-evidence-qa-reviewer/SKILL.md`

The skill governs evidence classification, reconciliation verdicts, QA gate verdicts, visualization readiness blocking, runtime telemetry disclosure, and final claim discipline.

## Relationship To Specialist Packet

`DELTA_2_DATA_RECONCILIATION_SPECIALIST_REVIEW_PACKET_V0_1.md` is a specialist precursor for data reconciliation review. It is useful input, but it is not a Data Team QA gate and must not be treated as visualization approval.

## Reviewer Roles

- Data Reconciliation Specialist Reviewer
- Data QA / Evidence QA Reviewer

## Review Question

Can the delta between preserved baseline `26959` and observed bundled-export warning-row sum `26957` be explained from available export/context artifacts only, and is the current `UNRESOLVED_EXPORT_LIMITED` conclusion QA-acceptable before visualization readiness?

## Inputs Allowed

Use only these safe text/csv/json artifacts:

- `DELTA_2_DATA_RECONCILIATION_SPECIALIST_REVIEW_PACKET_V0_1.md`
- `DELTA_RECONCILIATION_26959_VS_26957_V0_2.md`
- `OBSERVED_INFERRED_NOT_CLAIMABLE_SPLIT_V0_2.md`
- `CATEGORY_RECOUNT_RESULT_V0_2.md`
- `CATEGORY_CLASSIFICATION_RULES_V0_2.csv`
- `CATEGORY_SAMPLE_ROWS_REDACTED_V0_2.md`
- `FIELD_LEVEL_COUNTS_V0_2.csv`
- `FIELD_INVENTORY_V0_2.md`
- `KNOWN_COUNTS_AND_UNCERTAINTY.md`
- `NON_CLAIMS.md`
- `INTERNAL_TELEMETRY_LIVE_SOURCE_CONTRACT_V0_2.md`

## Forbidden Reviewer Behavior

- Do not invent row-level explanations.
- Do not treat `18019` as verified.
- Do not infer production completeness.
- Do not use live DB, SQLite, app UI, authenticated render, cookies, storageState, or secrets.
- Do not claim delta resolved without direct artifact support.
- Do not approve visualization without required warning labels.

## Allowed Reconciliation Verdicts

- `RESOLVED_FROM_AVAILABLE_EVIDENCE`
- `PLAUSIBLE_HYPOTHESIS_NEEDS_TEST`
- `UNRESOLVED_SOURCE_LIMITED_CONFIRMED`
- `NOT_RECONCILABLE_FROM_AVAILABLE_EVIDENCE`

## Allowed QA Gate Verdicts

- `QA_ACCEPT_WITH_LABELS`
- `QA_ACCEPT_UNRESOLVED_WITH_LABELS`
- `QA_BLOCK_VISUALIZATION_PENDING_SOURCE_PROOF`
- `QA_REQUIRE_REWORK_BEFORE_PROMOTION`

## QA Checklist

- Are `26959`, `26957`, and delta `2` source-supported?
- Is the source raw, export-shaped, aggregated, sampled, or inferred?
- Are inclusion/exclusion criteria clear?
- Is delta `2` resolved, unresolved, or not reconcilable?
- Is `18019` correctly treated as evidence gap / not claimable?
- Are sample rows correctly marked unavailable?
- Are runtime telemetry gaps disclosed?
- Are non-claims preserved?
- Can visualization readiness proceed safely with warning labels?
- What exact labels must be required if visualization is later allowed?

## Required Reviewer Response Schema

```yaml
review_title:
review_status:
input_artifacts:
data_quality_dimensions_checked:
reconciliation_verdict:
qa_gate_verdict:
claim_boundary_assessment:
evidence_classification:
artifact_support:
hypotheses:
required_warning_labels:
blocked_claims:
what_would_resolve_it:
recommended_next_step:
non_claims_preserved:
runtime_telemetry_completeness:
final_claim_level:
```

## Required Warning Labels

- `EXPORT_LIMITED`
- `SOURCE_LIMITED`
- `LOCAL_ONLY`
- `NOT_CLAIMABLE_FROM_AVAILABLE_EVIDENCE`
- `UNRESOLVED_EXPORT_LIMITED`
- `NOT_PRODUCTION_VERIFIED`
- `NO_SAMPLE_ROW_PROOF`

## Final Claim Level

`DELTA_2_DATA_TEAM_QA_REVIEW_PACKET_CREATED_LOCAL_ONLY_USING_PERMANENT_DATA_QA_SKILL_NO_QA_DECISION_YET`

## Runtime Telemetry Completeness

`POST_RUN_TELEMETRY_PARTIAL_LOCAL_ONLY`

- role: Codex execution runner
- provider: `NOT_REPORTED_BY_CODEX_UI` unless visible
- requested model: `NOT_REPORTED_BY_CODEX_UI` unless visible
- returned model: `NOT_REPORTED_BY_CODEX_UI` unless visible
- token input/output: `NOT_EXPOSED` unless visible
- cost: `NOT_EXPOSED` unless visible
- wall-clock runtime: `NOT_REPORTED`

## Missing Runtime Telemetry Disclosure

Model/provider/token/cost fields are not proof-backed unless explicitly visible in Codex UI/transcript.
This is not provider-backed telemetry verification.

## Non-Claims

- No live telemetry claim.
- No production DB verification.
- No provider-backed telemetry verification.
- No authenticated rendered proof.
- No full row-level completeness.
- No production graph readiness.
- No Phase 2 insight report.
- No UI/graph implementation.
- No QA decision yet.

## Recommended Next Step

Run this packet through a data-strong reviewer/model, then create:

`DELTA_2_DATA_TEAM_QA_REVIEW_RECEIPT_V0_1.md`
