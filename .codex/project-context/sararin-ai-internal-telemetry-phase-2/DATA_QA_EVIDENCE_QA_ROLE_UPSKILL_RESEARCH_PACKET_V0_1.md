# DATA_QA_EVIDENCE_QA_ROLE_UPSKILL_RESEARCH_PACKET_V0_1

status: ROLE_UPSKILL_RESEARCH_LOCAL_ONLY

## Why This Role Is Needed

The current telemetry lane has several unresolved evidence boundaries that must be reviewed before any delta QA gate or visualization readiness work proceeds:

- Delta `2` remains `UNRESOLVED_EXPORT_LIMITED` between preserved baseline `26959` and observed bundled-export warning-row sum `26957`.
- `18019` remains `NOT_CLAIMABLE_FROM_AVAILABLE_EVIDENCE`; it is an investigation target / evidence gap, not a verified missing-record count.
- Sample rows are `NO_SAFE_SAMPLE_ROWS_AVAILABLE_FROM_EXPORT_CONTEXT`.
- Visualization readiness should not proceed without a Data QA / Evidence QA gate that can classify claim strength, warning labels, and blocked claims.

## External Practice Synthesis

### Data Quality Dimensions

Data QA should check the standard quality dimensions before accepting a telemetry claim:

- Accuracy: whether the value reflects the intended source fact.
- Completeness: whether required fields and records are present for the claim.
- Uniqueness: whether records or categories are duplicated or double-counted.
- Consistency: whether definitions, filters, and scopes match across artifacts.
- Timeliness: whether the source snapshot is current enough for the claim.
- Validity: whether values conform to expected schema, type, enum, and rule constraints.

### Data Reconciliation

Reconciliation compares and verifies values across declared sources or artifacts. A reviewer should identify discrepancies, classify their likely cause only when artifact-supported, preserve unresolved cases, and maintain an audit trail that records source artifact, rule, count, confidence, and non-claims.

### Data Testing / Assertions

Assertion-based data testing provides a useful operating model:

- dbt-style tests identify failing rows or failing aggregate assertions.
- Great Expectations-style suites define explicit expectations for fields, ranges, uniqueness, freshness, and completeness.
- Deequ-style checks treat data quality as unit tests over datasets, metrics, and constraints.

For this lane, assertions must remain export/context-limited unless a stronger source proof exists.

### LLM Reviewer Limitation

An LLM reviewer can review rules, hypotheses, labels, and claim boundaries. It cannot directly validate data without source proof. Reviewer outputs must not promote unresolved counts, `18019`, sample-row availability, live telemetry, or production completeness unless the allowed artifacts directly support the claim.

## Role Definition

Role name: Data QA / Evidence QA Reviewer

## Responsibilities

- classify data claim strength
- validate source sufficiency
- check observed vs inferred vs not claimable
- review reconciliation gaps
- enforce warning labels
- block unsafe visualization
- preserve non-claims
- ensure runtime telemetry disclosure

## Skill Checklist

- data quality dimension mapping
- source-to-target reconciliation logic
- control totals / count reconciliation
- assertion-based data testing
- evidence classification
- visualization readiness labeling
- claim boundary enforcement
- audit trail / receipt quality

## Review Inputs Allowed

Use only these safe artifacts already created or used in this lane:

- `CATEGORY_CLASSIFICATION_RULES_V0_2.csv`
- `CATEGORY_RECOUNT_RESULT_V0_2.md`
- `OBSERVED_INFERRED_NOT_CLAIMABLE_SPLIT_V0_2.md`
- `CATEGORY_SAMPLE_ROWS_REDACTED_V0_2.md`
- `DELTA_RECONCILIATION_26959_VS_26957_V0_2.md`
- `DELTA_2_DATA_RECONCILIATION_SPECIALIST_REVIEW_PACKET_V0_1.md`
- `FIELD_LEVEL_COUNTS_V0_2.csv`
- `FIELD_INVENTORY_V0_2.md`
- `KNOWN_COUNTS_AND_UNCERTAINTY.md`
- `NON_CLAIMS.md`
- `INTERNAL_TELEMETRY_LIVE_SOURCE_CONTRACT_V0_2.md`

## Forbidden Reviewer Behavior

- do not invent row-level explanations
- do not treat `18019` as verified
- do not resolve delta `2` without source support
- do not infer production completeness
- do not use SQLite, production DB, authenticated render, live UI, cookies, storageState, or secrets
- do not approve graph-ready status without labels and evidence

## QA Verdict System

Allowed verdicts:

- `QA_ACCEPT_UNRESOLVED_WITH_LABELS`
- `QA_ACCEPT_WITH_REQUIRED_WARNING_LABELS`
- `QA_BLOCK_VISUALIZATION_PENDING_SOURCE_PROOF`
- `QA_REQUIRE_REWORK_BEFORE_VISUALIZATION_READINESS`

## Required Labels

- `EXPORT_LIMITED`
- `SOURCE_LIMITED`
- `LOCAL_ONLY`
- `NOT_CLAIMABLE_FROM_AVAILABLE_EVIDENCE`
- `UNRESOLVED_EXPORT_LIMITED`
- `NOT_PRODUCTION_VERIFIED`
- `NO_SAMPLE_ROW_PROOF`

## Reviewer Response Schema

```yaml
qa_gate_verdict:
confidence:
evidence_dimensions_checked:
artifact_support:
claim_boundary_assessment:
required_warning_labels:
blocked_claims:
what_would_resolve_it:
recommended_next_step:
non_claims_preserved:
```

## Final Claim Level

`DATA_QA_EVIDENCE_QA_ROLE_UPSKILL_PACKET_CREATED_LOCAL_ONLY_NO_QA_DECISION_YET`

## Runtime Telemetry Completeness

`POST_RUN_TELEMETRY_PARTIAL_LOCAL_ONLY`

- role: Codex execution runner
- provider: `NOT_REPORTED_BY_CODEX_UI` unless visible
- requested model: `NOT_REPORTED_BY_CODEX_UI` unless visible
- returned model: `NOT_REPORTED_BY_CODEX_UI` unless visible
- token input/output: `NOT_EXPOSED` unless visible
- cost: `NOT_EXPOSED` unless visible
- wall-clock runtime: `NOT_REPORTED`

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

## Recommended Next Artifact

`DELTA_2_DATA_TEAM_QA_REVIEW_PACKET_V0_1.md`
