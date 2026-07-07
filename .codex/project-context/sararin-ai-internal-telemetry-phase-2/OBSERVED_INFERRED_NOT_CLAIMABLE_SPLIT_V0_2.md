# OBSERVED_INFERRED_NOT_CLAIMABLE_SPLIT_V0_2

status: EXPORT_LIMITED_EVIDENCE_SPLIT_LOCAL_ONLY
claim_level: SQLITE_STAGING_READ_PROOF_LOCAL_ONLY

## Source Boundary

This split uses only available bundled/export-shaped artifacts, field inventory/counts, category classification rules, and the export-limited recount result in the scoped project-context directory. It does not use SQLite binaries, production databases, app/source code, authenticated browser state, rendered proof, live telemetry, UI routes, sample rows, or delta reconciliation.

The classifications below separate what can be directly observed inside available export/context artifacts from what is inferred, not claimable, or unresolved under the current evidence boundary.

AIOS enforcement resolver check for this run: `AIOS_ENFORCEMENT_VERSION=v0.2`, `AIOS_ENFORCEMENT_STATUS=AVAILABLE`, `AIOS_ENFORCEMENT_PATH=/Users/apple/robert-knowledge-base/02_execution_control/aios_enforcement/AIOS_ENFORCEMENT_V0_2.md`.

## Evidence Split Table

| signal_or_number | value | classification | source_artifact | confidence | reason | allowed_next_use |
|---|---:|---|---|---|---|---|
| preserved baseline missing telemetry signals | 26959 | UNRESOLVED_EXPORT_LIMITED | `KNOWN_COUNTS_AND_UNCERTAINTY.md`; `FIELD_INVENTORY_V0_2.md`; `PHASE_E_SARARIN_AI_TELEMETRY_FIELD_INVENTORY_AND_RECOUNT_EXECUTION_GATE_20260705.md` | medium_for_preservation_low_for_validation | Preserved as a known baseline, but not independently revalidated in the current export-limited artifacts. | Keep visible as preserved baseline with source-limited warning; do not use as validated count or production completeness evidence. |
| observed bundled-export warning-row sum | 26957 | DIRECTLY_OBSERVED_EXPORT_LIMITED | `KNOWN_COUNTS_AND_UNCERTAINTY.md`; `LIVE_TELEMETRY_SOURCE_GAP_RCA_AND_REMEDIATION_PLAN_20260705.md`; `PHASE_D_SARARIN_AI_TELEMETRY_PHASE_2_VALIDATION_AND_VISUALIZATION_READINESS_PLAN_20260705.md` | medium | The value is explicitly recorded as the directly observed bundled-export warning-row sum. It remains export-limited and not raw row-level proof. | May be used as export-limited observed warning sum with visible source limitation. |
| delta between preserved baseline and observed export sum | 2 | UNRESOLVED_EXPORT_LIMITED | `KNOWN_COUNTS_AND_UNCERTAINTY.md`; `PHASE_E_SARARIN_AI_TELEMETRY_FIELD_INVENTORY_AND_RECOUNT_EXECUTION_GATE_20260705.md` | low | Existing artifacts mark the delta as unreproduced/unresolved and require a separate delta reconciliation artifact. | Park for `DELTA_RECONCILIATION_26959_VS_26957_V0_2.md`; do not explain or use as proof here. |
| gate_claim_mapping_missing | 18019 | NOT_CLAIMABLE_FROM_AVAILABLE_EVIDENCE | `KNOWN_COUNTS_AND_UNCERTAINTY.md`; `CATEGORY_CLASSIFICATION_RULES_V0_2.csv`; `CATEGORY_RECOUNT_RESULT_V0_2.md`; `FIELD_LEVEL_COUNTS_V0_2.csv` | low_source_limited | The value is preserved from a v0.1 report but was downgraded by export-limited recount because raw/supporting gate and missing-field evidence is absent. | Use only as downgraded/not-claimable context until exact source evidence and sample proof exist. |
| gate_claim_mapping_missing share of observed missing signals | 66.84% | UNRESOLVED_EXPORT_LIMITED | `KNOWN_COUNTS_AND_UNCERTAINTY.md`; `CATEGORY_RECOUNT_RESULT_V0_2.md` | low | The share depends on the unreproduced `18019` numerator and is explicitly source-limited pending reproduction. | Keep visible only as unresolved/source-limited context; do not rank or chart as final. |
| 18019 recount result | DOWNGRADED_NOT_RECOUNTABLE | NOT_CLAIMABLE_FROM_AVAILABLE_EVIDENCE | `CATEGORY_RECOUNT_RESULT_V0_2.md` | high_for_boundary | The recount result explicitly states that `gate_claim_mapping_missing = 18019` is not confirmed and not revised within available export-limited evidence. | Use as the controlling boundary for downstream category narrative. |
| source_schema_gap export-limited field rows | 11 | DIRECTLY_OBSERVED_EXPORT_LIMITED | `CATEGORY_RECOUNT_RESULT_V0_2.md`; `FIELD_LEVEL_COUNTS_V0_2.csv` | high_for_available_text_artifacts | The recount counted `absent_required_field` rows marked `FIELD_ABSENT_FROM_AVAILABLE_EXPORT_SOURCE_LIMITED` in the field-level counts CSV. | May be used as field-level export count only, not missing-signal or production count. |
| not_claimable export-limited field rows | 11 | DIRECTLY_OBSERVED_EXPORT_LIMITED | `CATEGORY_RECOUNT_RESULT_V0_2.md`; `FIELD_LEVEL_COUNTS_V0_2.csv`; `NON_CLAIMS.md` | high_for_boundary | The recount counted rows with `not_claimable_count > 0` in the field-level counts CSV. | May be used to explain source-limited boundary and blocked stronger claims. |
| inferred_only export-limited field rows | 0 | DIRECTLY_OBSERVED_EXPORT_LIMITED | `CATEGORY_RECOUNT_RESULT_V0_2.md`; `FIELD_LEVEL_COUNTS_V0_2.csv`; `FIELD_INVENTORY_V0_2.md` | medium | The recount counted rows with `inferred_only_count > 0` in the field-level counts CSV and found none. | May be used only as an export-limited field-level split value. |
| unknown_missing export-limited field rows | 0 | DIRECTLY_OBSERVED_EXPORT_LIMITED | `CATEGORY_RECOUNT_RESULT_V0_2.md`; `FIELD_LEVEL_COUNTS_V0_2.csv`; `FIELD_INVENTORY_V0_2.md` | medium | The recount counted rows with `unknown_missing_count > 0` in the field-level counts CSV and found none. | May be used only as an export-limited field-level split value. |
| missing telemetry warning fields inventoried | 3 | DIRECTLY_OBSERVED_EXPORT_LIMITED | `FIELD_LEVEL_COUNTS_V0_2.csv`; `FIELD_INVENTORY_V0_2.md` | medium | `missingTelemetryWarnings.label`, `missingTelemetryWarnings.value`, and `missingTelemetryWarnings.dataSourceType` are counted as visible bundled-export fields. | May support warning inventory context, not raw row-level missing-field proof. |

## Interpretation

The only values safe for later analysis as observed evidence are export-limited values explicitly present in the available artifacts: the bundled-export warning-row sum, field-level absent/not-claimable counts, zero inferred/unknown field rows, and inventoried warning fields. These must remain labeled as export-limited and must not be promoted to live telemetry or production completeness.

The preserved baseline `26959`, delta `2`, `gate_claim_mapping_missing = 18019`, and `66.84%` share must remain downgraded or parked. The `18019` value is specifically controlled by `CATEGORY_RECOUNT_RESULT_V0_2.md`, which marks it `DOWNGRADED_NOT_RECOUNTABLE`; downstream analysis may mention it only as unresolved/not-claimable context until a separate sample-row proof and stronger source evidence exist.

## Non-Claims

- No live telemetry claim.
- No production DB verification.
- No provider-backed telemetry verification.
- No authenticated rendered proof.
- No full row-level completeness.
- No production graph readiness.
- No sample-row proof.
- No delta reconciliation.
- No Phase 2 insight report.

## Recommended Next Artifact

`CATEGORY_SAMPLE_ROWS_REDACTED_V0_2.md`
