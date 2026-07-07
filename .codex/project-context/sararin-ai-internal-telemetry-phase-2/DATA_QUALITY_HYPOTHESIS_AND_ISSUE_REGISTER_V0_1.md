# DATA_QUALITY_HYPOTHESIS_AND_ISSUE_REGISTER_V0_1

status: HYPOTHESIS_AND_ISSUE_REGISTER_EXPORT_CONTEXT_LIMITED_LOCAL_ONLY

## Purpose

Capture hypotheses, unresolved issues, blocked claims, warning labels, and evidence requirements before visualization readiness.

## Critical Boundary

- This register does not confirm any hypothesis.
- hypothesis-only items must not be GRAPH_READY_WITH_WARNING_LABELS.
- Register presence alone is not evidence confirmation.
- no hypothesis confirmation from register presence alone.
- `18019` remains `NOT_CLAIMABLE_FROM_AVAILABLE_EVIDENCE`.
- Delta `2` remains `UNRESOLVED_SOURCE_LIMITED`.

## Register Table

| register_id | entry_type | statement | current_status | source_evidence_pointer | evidence_classification | testability | required_evidence | blocked_claims | required_warning_labels | priority | confidence | next_action | boundary_note |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| DQHIR-001 | ISSUE | Delta `2` between preserved baseline `26959` and observed bundled-export warning-row sum `26957` remains unresolved. | UNRESOLVED_SOURCE_LIMITED_CONFIRMED | `DELTA_2_DATA_TEAM_QA_REVIEW_RECEIPT_V0_1.md`; `DELTA_RECONCILIATION_26959_VS_26957_V0_2.md`; `OBSERVED_INFERRED_NOT_CLAIMABLE_SPLIT_V0_2.md`; `KNOWN_COUNTS_AND_UNCERTAINTY.md` | UNRESOLVED_SOURCE_LIMITED | testable_with_authoritative_source_and_reproducible_scope | Authoritative baseline source, export warning-row inclusion/exclusion rules, reproducible count query or assertion over approved source artifact. | delta resolved; production DB verification; live telemetry completeness | EXPORT_LIMITED; SOURCE_LIMITED; LOCAL_ONLY; UNRESOLVED_EXPORT_LIMITED; NOT_PRODUCTION_VERIFIED | P0 | high_for_unresolved_boundary_low_for_resolution | Carry to register QA, then visualization readiness only with warning labels. | Records unresolved state only; does not explain the two-record difference. |
| DQHIR-002 | HYPOTHESIS | Baseline and export sum may use different inclusion criteria. | PLAUSIBLE_HYPOTHESIS_NEEDS_TEST | `DELTA_2_DATA_RECONCILIATION_SPECIALIST_REVIEW_PACKET_V0_1.md`; `DELTA_RECONCILIATION_26959_VS_26957_V0_2.md`; `KNOWN_COUNTS_AND_UNCERTAINTY.md` | PLAUSIBLE_HYPOTHESIS_NEEDS_TEST | testable_with_documented_scope_rules | Preserved baseline definition, export warning-row inclusion/exclusion rules, same-scope recount. | delta resolved; hypothesis confirmed from register presence alone | EXPORT_LIMITED; SOURCE_LIMITED; LOCAL_ONLY; UNRESOLVED_EXPORT_LIMITED | P1 | medium | Require source rules before promotion. | Hypothesis only; not eligible for `GRAPH_READY_WITH_WARNING_LABELS`. |
| DQHIR-003 | HYPOTHESIS | Warning-row filtering may exclude two items. | PLAUSIBLE_HYPOTHESIS_NEEDS_TEST | `DELTA_2_DATA_RECONCILIATION_SPECIALIST_REVIEW_PACKET_V0_1.md`; `DELTA_RECONCILIATION_26959_VS_26957_V0_2.md`; `FIELD_LEVEL_COUNTS_V0_2.csv` | PLAUSIBLE_HYPOTHESIS_NEEDS_TEST | testable_with_warning_row_filter_trace | Export warning-row filter logic and source-visible rows or safe redacted samples explaining the two-record difference. | delta resolved; full row-level completeness; hypothesis confirmed from register presence alone | EXPORT_LIMITED; SOURCE_LIMITED; LOCAL_ONLY; NO_SAMPLE_ROW_PROOF; UNRESOLVED_EXPORT_LIMITED | P1 | medium_low | Keep as test candidate pending source proof. | No row-level evidence currently identifies two excluded items. |
| DQHIR-004 | HYPOTHESIS | Stale snapshot or source-scope mismatch may explain the baseline/export difference. | PLAUSIBLE_HYPOTHESIS_NEEDS_TEST | `DELTA_2_DATA_RECONCILIATION_SPECIALIST_REVIEW_PACKET_V0_1.md`; `FIELD_INVENTORY_V0_2.md`; `INTERNAL_TELEMETRY_LIVE_SOURCE_CONTRACT_V0_2.md`; `KNOWN_COUNTS_AND_UNCERTAINTY.md` | PLAUSIBLE_HYPOTHESIS_NEEDS_TEST | testable_with_snapshot_metadata | Documented snapshot/version relationship between preserved baseline and bundled export, source generation timestamps, and same-scope count comparison. | delta resolved; live telemetry completeness; production DB verification; hypothesis confirmed from register presence alone | EXPORT_LIMITED; SOURCE_LIMITED; LOCAL_ONLY; NOT_PRODUCTION_VERIFIED; UNRESOLVED_EXPORT_LIMITED | P1 | medium_low | Require snapshot/version proof before downstream visualization classification. | Static export context does not prove live freshness or snapshot lineage. |
| DQHIR-005 | HYPOTHESIS | Aggregation, deduplication, or overlap behavior may differ between baseline and bundled export. | PLAUSIBLE_HYPOTHESIS_NEEDS_TEST | `DELTA_2_DATA_RECONCILIATION_SPECIALIST_REVIEW_PACKET_V0_1.md`; `DELTA_RECONCILIATION_26959_VS_26957_V0_2.md`; `FIELD_INVENTORY_V0_2.md` | PLAUSIBLE_HYPOTHESIS_NEEDS_TEST | testable_with_transformation_rules | Aggregation semantics, deduplication rules, overlap rules, and reproducible assertion over approved source artifact. | delta resolved; full row-level completeness; graph-ready without warning labels; hypothesis confirmed from register presence alone | EXPORT_LIMITED; SOURCE_LIMITED; LOCAL_ONLY; UNRESOLVED_EXPORT_LIMITED; NOT_PRODUCTION_VERIFIED | P1 | medium_low | Preserve as unresolved transformation-risk hypothesis. | No current artifact proves transformation behavior caused the delta. |
| DQHIR-006 | ISSUE | `18019` is an evidence gap and remains not claimable. | NOT_CLAIMABLE_FROM_AVAILABLE_EVIDENCE | `CATEGORY_RECOUNT_RESULT_V0_2.md`; `OBSERVED_INFERRED_NOT_CLAIMABLE_SPLIT_V0_2.md`; `CATEGORY_SAMPLE_ROWS_REDACTED_V0_2.md`; `KNOWN_COUNTS_AND_UNCERTAINTY.md` | NOT_CLAIMABLE_FROM_AVAILABLE_EVIDENCE | testable_only_with_raw_or_source_visible_category_basis | Exact source evidence, gate/claim mapping fields, inclusion/exclusion rules, and safe sample-row proof for category membership. | `18019` verified; category-ranking claim; Phase 2 insight report readiness | EXPORT_LIMITED; SOURCE_LIMITED; LOCAL_ONLY; NOT_CLAIMABLE_FROM_AVAILABLE_EVIDENCE; NO_SAMPLE_ROW_PROOF | P0 | high_for_boundary_low_for_count | Keep downgraded until source-backed proof exists. | `18019` is an investigation target, not a verified missing-record count. |
| DQHIR-007 | ISSUE | No safe sample-row proof is available from the export/context artifacts. | BLOCKED_PENDING_SOURCE_PROOF | `CATEGORY_SAMPLE_ROWS_REDACTED_V0_2.md`; `FIELD_LEVEL_COUNTS_V0_2.csv`; `FIELD_INVENTORY_V0_2.md` | BLOCKED_PENDING_SOURCE_PROOF | testable_with_safe_source_visible_rows | Source-visible rows or safe redacted samples that explain category membership and the two-record difference. | full row-level completeness; `18019` verified; authenticated rendered proof | EXPORT_LIMITED; SOURCE_LIMITED; LOCAL_ONLY; NO_SAMPLE_ROW_PROOF; NOT_CLAIMABLE_FROM_AVAILABLE_EVIDENCE | P0 | high | Block sample-row-backed claims pending safe source proof. | Field-count rows are boundary/count rows, not fabricated telemetry samples. |
| DQHIR-008 | SOURCE_LIMITATION | Current evidence is export/context-shaped and not raw row-level telemetry. | SOURCE_LIMITED_CONTEXT_ONLY | `FIELD_INVENTORY_V0_2.md`; `FIELD_LEVEL_COUNTS_V0_2.csv`; `INTERNAL_TELEMETRY_LIVE_SOURCE_CONTRACT_V0_2.md`; `NON_CLAIMS.md` | DIRECTLY_OBSERVED_SOURCE_LIMITED | testable_by_source_mode_and_field_inventory | Raw row-level telemetry or equivalent source-backed records with event identity, timestamps, source mode, and source/display reconciliation. | full row-level completeness; live telemetry completeness; production DB verification; provider-backed telemetry verification | EXPORT_LIMITED; SOURCE_LIMITED; LOCAL_ONLY; NOT_PRODUCTION_VERIFIED | P0 | high | Preserve export/context-limited claim level in register QA. | Bundled dashboard-shaped export can be profiled but does not prove live/source-backed telemetry. |
| DQHIR-009 | BLOCKED_CLAIM | Graph-ready without warning labels is blocked. | BLOCKED_PENDING_SOURCE_PROOF | `DELTA_2_DATA_TEAM_QA_REVIEW_RECEIPT_V0_1.md`; `DELTA_2_DATA_TEAM_QA_REVIEW_PACKET_V0_1.md`; `NON_CLAIMS.md` | BLOCKED_PENDING_SOURCE_PROOF | testable_in_visualization_readiness_phase | Register QA plus visualization readiness assessment carrying all required warning labels. | graph-ready without warning labels; production graph readiness; UI/graph implementation | EXPORT_LIMITED; SOURCE_LIMITED; LOCAL_ONLY; NOT_CLAIMABLE_FROM_AVAILABLE_EVIDENCE; UNRESOLVED_EXPORT_LIMITED; NOT_PRODUCTION_VERIFIED; NO_SAMPLE_ROW_PROOF | P0 | high | Carry blocked status into visualization readiness assessment. | Warning-labeled readiness is a later assessment, not this register. |
| DQHIR-010 | BLOCKED_CLAIM | Phase 2 insight report readiness is blocked until register QA and visualization readiness are complete. | BLOCKED_PENDING_SOURCE_PROOF | `DELTA_2_DATA_TEAM_QA_REVIEW_RECEIPT_V0_1.md`; `DELTA_2_DATA_TEAM_QA_REVIEW_PACKET_V0_1.md`; `NON_CLAIMS.md` | BLOCKED_PENDING_SOURCE_PROOF | testable_by_phase_gate_artifacts | `DATA_QUALITY_HYPOTHESIS_AND_ISSUE_REGISTER_QA_RECEIPT_V0_1.md` and `VISUALIZATION_READINESS_ASSESSMENT_V0_2.md` completed with labels and non-claims preserved. | Phase 2 insight report readiness; production graph readiness; delta resolved; `18019` verified | EXPORT_LIMITED; SOURCE_LIMITED; LOCAL_ONLY; UNRESOLVED_EXPORT_LIMITED; NOT_PRODUCTION_VERIFIED; NO_SAMPLE_ROW_PROOF | P0 | high | Create register QA receipt next. | This register does not authorize a Phase 2 insight report. |
| DQHIR-011 | WARNING_LABEL_REQUIREMENT | Hypothesis-only items must not be `GRAPH_READY_WITH_WARNING_LABELS`. | LABEL_REQUIRED | `DELTA_2_DATA_TEAM_QA_REVIEW_RECEIPT_V0_1.md`; Opus-approved hardening recorded in Phase 0 receipt | BLOCKED_PENDING_SOURCE_PROOF | testable_in_visualization_readiness_phase | Register QA must classify each hypothesis-only item as not graph-ready/not claimable or blocked pending source proof. | graph-ready without warning labels; hypothesis confirmed from register presence alone | EXPORT_LIMITED; SOURCE_LIMITED; LOCAL_ONLY; NOT_CLAIMABLE_FROM_AVAILABLE_EVIDENCE; UNRESOLVED_EXPORT_LIMITED; NOT_PRODUCTION_VERIFIED; NO_SAMPLE_ROW_PROOF | P0 | high | Enforce during register QA and visualization readiness. | Hypothesis-only items may be tracked, not visualized as ready. |
| DQHIR-012 | EVIDENCE_REQUIREMENT | Register presence alone must not confirm any hypothesis. | EVIDENCE_REQUIRED | `DELTA_2_DATA_TEAM_QA_REVIEW_RECEIPT_V0_1.md`; `DELTA_2_DATA_TEAM_QA_REVIEW_PACKET_V0_1.md` | EVIDENCE_REQUIRED | testable_by_audit_of_downstream_claims | Source-backed proof for each hypothesis before any confirmation language appears. | hypothesis confirmed from register presence alone; delta resolved; `18019` verified | EXPORT_LIMITED; SOURCE_LIMITED; LOCAL_ONLY; NOT_CLAIMABLE_FROM_AVAILABLE_EVIDENCE; UNRESOLVED_EXPORT_LIMITED | P0 | high | Carry this as a downstream non-claim. | The register is an issue tracker, not validation proof. |
| DQHIR-013 | SOURCE_LIMITATION | Data QA reviewer runtime telemetry remains partial. | SOURCE_LIMITED_CONTEXT_ONLY | `DELTA_2_DATA_TEAM_QA_REVIEW_RECEIPT_V0_1.md`; `DELTA_2_DATA_TEAM_QA_REVIEW_PACKET_V0_1.md` | POST_RUN_TELEMETRY_PARTIAL_LOCAL_ONLY | testable_only_if_runtime_exposes_provider_usage | Runtime provider/model/token/cost/wall-clock telemetry exposed by the execution environment or a provider receipt. | provider-backed telemetry verification; live telemetry completeness | LOCAL_ONLY; SOURCE_LIMITED; NOT_PRODUCTION_VERIFIED | P1 | high | Preserve runtime telemetry disclosure in register QA. | This is not provider-backed telemetry verification for the telemetry data itself. |

## Required Warning Labels

- `EXPORT_LIMITED`
- `SOURCE_LIMITED`
- `LOCAL_ONLY`
- `NOT_CLAIMABLE_FROM_AVAILABLE_EVIDENCE`
- `UNRESOLVED_EXPORT_LIMITED`
- `NOT_PRODUCTION_VERIFIED`
- `NO_SAMPLE_ROW_PROOF`

## Blocked Claims

- delta resolved
- `18019` verified
- full row-level completeness
- production DB verification
- live telemetry completeness
- provider-backed telemetry verification
- authenticated rendered proof
- graph-ready without warning labels
- Phase 2 insight report readiness
- hypothesis confirmed from register presence alone

## What Would Resolve Key Issues

- authoritative source for preserved baseline
- export warning-row inclusion/exclusion rules
- source-visible rows or safe redacted samples explaining the two-record difference
- reproducible count query or assertion over an approved source artifact
- documented snapshot/version relationship between baseline and bundled export

## Final Claim Level

`DATA_QUALITY_HYPOTHESIS_AND_ISSUE_REGISTER_CREATED_EXPORT_CONTEXT_LIMITED_LOCAL_ONLY_NO_HYPOTHESIS_CONFIRMED`

## Runtime Telemetry Completeness

`POST_RUN_TELEMETRY_PARTIAL_LOCAL_ONLY`

- role: Codex execution runner
- provider: `NOT_REPORTED_BY_CODEX_UI` unless visible
- requested_model: `NOT_REPORTED_BY_CODEX_UI` unless visible
- returned_model: `NOT_REPORTED_BY_CODEX_UI` unless visible
- token_input_output: `NOT_EXPOSED` unless visible
- cost: `NOT_EXPOSED` unless visible
- wall_clock_runtime: `NOT_REPORTED` unless visible

## Missing Runtime Telemetry Disclosure

Model/provider/token/cost fields are not proof-backed unless explicitly visible in Codex UI/transcript.
This is not provider-backed telemetry verification.

## Non-Claims

- no live telemetry claim
- no production DB verification
- no provider-backed telemetry verification of telemetry data
- no authenticated rendered proof
- no full row-level completeness
- no production graph readiness
- no Phase 2 insight report
- no UI/graph implementation
- no delta resolution
- no `18019` verification
- no hypothesis confirmation

## Recommended Next Artifact

`DATA_QUALITY_HYPOTHESIS_AND_ISSUE_REGISTER_QA_RECEIPT_V0_1.md`
