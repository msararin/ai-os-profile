# FIELD_INVENTORY_V0_2

status: FIELD_INVENTORY_V0_2_CREATED_LOCAL_ONLY
created_at: 2026-07-06 Asia/Bangkok
project: sararin.ai internal telemetry Phase 2
owner_approval: APPROVE_PHASE_E_GATE_EXECUTION_FOR_FIELD_INVENTORY_ONLY
claim_level: local field inventory only

## Source Of Truth

Source of truth is the Phase E execution gate:

`projects/ai-os-profile-production-auth-telemetry-scoped-20260702/.codex/project-context/sararin-ai-internal-telemetry-phase-2/PHASE_E_SARARIN_AI_TELEMETRY_FIELD_INVENTORY_AND_RECOUNT_EXECUTION_GATE_20260705.md`

Supporting context:

- Phase B/C/D local-only Data Team Skill Architecture work.
- Permanent skills under `/Users/apple/.codex/skills/`, referenced only.
- Scoped telemetry repo: `/Users/apple/projects/ai-os-profile-production-auth-telemetry-scoped-20260702`.

## Current Task

Create `FIELD_INVENTORY_V0_2.md` only.

This task inventories available source fields from the dashboard-shaped bundled export and available Phase 2 artifacts so later phases can perform field-level counts and category recount safely.

This task does not create field-level counts, classification rules, category recounts, sample-row artifacts, a v0.2 insight report, visualization, UI, route, SQLite staging index, deploy, commit, or push.

## Inspected Source Artifacts

| Artifact | Inspected For | Source Role |
|---|---|---|
| `data/internal-telemetry/telemetry-dashboard-export.json` | Top-level keys and nested object/array keys | Primary dashboard-shaped bundled export referenced by Phase 2 artifacts. |
| `PHASE_2_MISSING_TELEMETRY_SIGNALS_CATEGORY_SUMMARY.csv` | Header and visible field names | Derived category summary with tooltip/disclaimer fields. |
| `PHASE_2_MISSING_TELEMETRY_SIGNALS_GRAPH_READY_DATA.json` | Top-level keys and nested object/array keys | Derived graph-ready data artifact; not proof of graph readiness. |
| `PHASE_2_MISSING_TELEMETRY_SIGNALS_CATEGORIZATION_SPEC_DRY_RUN.md` | Headings, input signal, category spec, dry-run limitation | Spec/dry-run artifact defining expected categories and limitations. |
| `PHASE_2_MISSING_TELEMETRY_SIGNALS_ROW_LEVEL_READ_ONLY_DRY_RUN_MANIFEST.md` | Expected source paths and required future categorization fields | Manifest defining desired row-level fields; not evidence that fields exist in current source. |
| `PHASE_2_ROW_LEVEL_READ_ONLY_CATEGORIZATION_DRY_RUN_RESULT.md` | Source summary, dry-run categories, limitations | Prior dry-run result; source-limited and not full row-level proof. |
| `PHASE_2_MISSING_TELEMETRY_SIGNALS_DATA_SCIENCE_INSIGHT_REPORT.md` | Context foundation and report field references | Draft/local report artifact; not accepted as v0.2 insight report. |
| `PHASE_2_MISSING_TELEMETRY_SIGNALS_INSIGHT_AND_DATA_TEAM_DEVELOPMENT_SPEC.md` | Required fields and signal-family mapping | Planning/spec artifact; not source proof for field existence. |
| `PHASE_2_ROW_LEVEL_READ_ONLY_CATEGORIZATION_DRY_RUN_EXECUTION_GATE.md` | Prior gate fields and non-claims | Gate artifact; not source proof for field existence. |

## Source Type / Source Limitation

The available source is dashboard-shaped bundled export evidence plus derived Phase 2 artifacts. It is not raw row-level telemetry.

Observed source mode labels include:

- `dbMode`: `BUNDLED_JSON_EXPORT`
- `source_shape`: `dashboard_shaped_bundled_export`
- `not_live_database`: `true`
- `not_production_telemetry_verification`: `true`
- `full_row_level_completeness_claimed`: `false`

Known unresolved items remain unresolved and are not validated here:

- preserved baseline missing telemetry signals = `26959`;
- observed bundled-export warning rows sum = `26957`;
- delta = `2`;
- `gate_claim_mapping_missing = 18019`;
- share = `66.84%`.

## Field Inventory Table

| Field Name | Observed In Source | Apparent Field Role | Apparent Data Type If Knowable | Semantic Interpretation Candidate | Raw / Derived / Warning / Summary / Absent | Can Support Later Field-Level Counts | Can Support Later Category Recount | Limitations |
|---|---|---|---|---|---|---|---|---|
| `exportGeneratedAt` | yes | export metadata | string timestamp | Export generation time | summary-only | no | no | Export time is not event time. |
| `exportGeneratedAtTz` | yes | export metadata | string | Export timezone label | summary-only | no | no | Does not prove event timezone. |
| `checksumAlgo` | yes | evidence/source | string | Checksum algorithm label | summary-only | no | no | Needs paired checksum values for traceability proof. |
| `sourceChecksumPrefix` | yes | evidence/source | string | Partial source checksum | summary-only | no | no | Prefix only; not full reproducibility proof. |
| `exportMetadata.generated_at` | yes | export metadata | string timestamp | Export generated timestamp | summary-only | no | no | Not row event time. |
| `exportMetadata.generated_at_timezone` | yes | export metadata | string | Export timezone | summary-only | no | no | Not row event timezone. |
| `exportMetadata.export_source` | yes | evidence/source | string | Export source label | summary-only | no | limited | Can help source boundary, not row recount alone. |
| `exportMetadata.export_claim_level` | yes | claim boundary | string | Claim level of export | summary-only | no | limited | Supports non-claim boundary, not field counts. |
| `exportMetadata.source_checksum_algorithm` | yes | evidence/source | string | Checksum algorithm | summary-only | no | no | Needs full checksum to prove source identity. |
| `exportMetadata.source_database_label` | yes | source metadata | string | Source database label | summary-only | no | no | Label is not live DB verification. |
| `exportMetadata.source_database_sha256` | yes | evidence/source | string | Source database checksum | summary-only | no | limited | May support source artifact identity, not row completeness. |
| `exportMetadata.local_paths_redacted` | yes | privacy/safety | boolean | Local paths redaction status | summary-only | no | no | Does not prove all sensitive fields redacted. |
| `exportMetadata.not_live_database` | yes | non-claim | boolean | Live DB non-claim | summary-only | no | no | Preserves boundary only. |
| `exportMetadata.not_production_telemetry_verification` | yes | non-claim | boolean | Production verification non-claim | summary-only | no | no | Preserves boundary only. |
| `exportMetadata.fallback_mode_label` | yes | source metadata | string | Fallback mode label | summary-only | no | limited | Helps source limitation language. |
| `exportMetadata.aggregate_semantics` | yes | source metadata | string/object | Aggregate semantics label | summary-only | no | limited | Needs direct structure to interpret safely. |
| `exportMetadata.sanitizer_ruleset` | yes | privacy/safety | string/object | Sanitization rule set | summary-only | no | no | Does not replace sample-row redaction review. |
| `exportMetadata.sqlite_open_mode` | yes | source metadata | string | SQLite access mode label | summary-only | no | no | Does not prove current SQLite read-only execution. |
| `exportMetadata.sqlite_sidecar_policy` | yes | source metadata | string/object | SQLite sidecar policy | summary-only | no | no | Policy label only. |
| `dbPath` | yes | source metadata | string | Redacted or labeled DB path | summary-only | no | no | Not a live DB proof. |
| `dbMode` | yes | source mode | string | Bundled export mode | summary-only | no | limited | Supports source-boundary classification. |
| `generatedAt` | yes | export metadata | string timestamp | Generation timestamp | summary-only | no | no | Not event timestamp proof. |
| `batch.backfill_batch_id` | yes | execution identity | string/id | Backfill batch identifier | derived/summary | limited | limited | Batch-level only, not row-level missing field proof. |
| `batch.source_dry_run_path` | yes | evidence/source | string path | Source dry-run artifact path | derived/summary | no | limited | Path reference needs file existence check in later phase. |
| `batch.mode` | yes | source mode | string | Batch/export mode | summary-only | no | limited | Helps limitation statement. |
| `batch.claim_level` | yes | claim boundary | string | Batch claim level | summary-only | no | limited | Not row proof. |
| `batch.created_at` | yes | time/sequence | string timestamp | Batch creation time | summary-only | no | no | Not event timestamp proof. |
| `batch.backup_path` | yes | evidence/source | string path | Backup path reference | summary-only | no | no | Needs path verification; may be local/private. |
| `counts.agentRuns` | yes | aggregate count | number | Agent run aggregate | summary-only | no | no | Aggregate only; do not use for row-level field counts. |
| `counts.batches` | yes | aggregate count | number | Batch aggregate | summary-only | no | no | Aggregate only. |
| `counts.candidateRecords` | yes | aggregate count | number | Candidate record aggregate | summary-only | no | limited | Not sufficient without row details. |
| `counts.exclusions` | yes | aggregate count | number | Exclusion aggregate | summary-only | no | limited | Not sufficient without row details. |
| `summaryCards.label` | yes | display label | string | Summary card label | derived/display | no | no | Display-only. |
| `summaryCards.value` | yes | displayed value | mixed | Summary card value | derived/display | no | no | Display value may be aggregate or formatted. |
| `summaryCards.detail` | yes | display text | string | Summary detail copy | derived/display | no | no | Not source proof. |
| `summaryCards.dataSourceType` | yes | source mode marker | string | Data source type marker | derived/display | no | limited | Helps boundary language. |
| `spendByModelProvider.label` | yes | display label | string | Provider/model spend bucket label | derived/display | no | no | Not raw provider field. |
| `spendByModelProvider.value` | yes | displayed value | number/string | Spend bucket value | derived/display | no | no | Not row-level cost proof. |
| `spendByModelProvider.detail` | yes | display text | string | Spend bucket detail | derived/display | no | no | Display-only. |
| `spendByModelProvider.dataSourceType` | yes | source mode marker | string | Data source type marker | derived/display | no | limited | Boundary only. |
| `modelVsTask.taskTitle` | yes | task identity/display | string | Task title | derived row-like | limited | limited | Row-like table, but dashboard-shaped. |
| `modelVsTask.provider` | yes | provider/model usage | string/null | Provider label | derived row-like | limited | limited | Can guide later checks but not provider-backed proof. |
| `modelVsTask.requestedModel` | yes | provider/model usage | string/null | Requested model | derived row-like | limited | limited | Needs provider receipt for proof. |
| `modelVsTask.returnedModel` | yes | provider/model usage | string/null | Returned model | derived row-like | limited | limited | Needs provider receipt for proof. |
| `modelVsTask.totalTokens` | yes | token/cost | number/null | Total token display | derived row-like | limited | limited | Needs source receipt to prove token accuracy. |
| `modelVsTask.cost` | yes | token/cost | number/null | Cost display | derived row-like | limited | limited | Not spend proof without receipt/source. |
| `modelVsTask.generationId` | yes | provider/model usage | string/null | Generation/provider receipt id candidate | derived row-like | limited | limited | Missingness is warning-derived elsewhere; not proof alone. |
| `modelVsTask.sourceFilePath` | yes | evidence/source | string path | Source file reference | derived row-like | limited | limited | Path may be local/private and needs existence/source check. |
| `modelVsTask.dataSourceType` | yes | source mode marker | string | Data source type marker | derived row-like | no | limited | Boundary only. |
| `spendByRoleReviewerRoute.label` | yes | display label | string | Role/reviewer/route spend label | derived/display | no | no | Display aggregate only. |
| `spendByRoleReviewerRoute.value` | yes | displayed value | number/string | Role/reviewer/route spend value | derived/display | no | no | Not row-level proof. |
| `spendByRoleReviewerRoute.dataSourceType` | yes | source mode marker | string | Data source type marker | derived/display | no | limited | Boundary only. |
| `governanceGateOutcomeByTask.gateName` | yes | governance | string | Gate name | derived row-like | limited | limited | May support later mapping, not count proof alone. |
| `governanceGateOutcomeByTask.gateStatus` | yes | governance | string/null | Gate status | derived row-like | limited | limited | Needs receipt/source validation. |
| `governanceGateOutcomeByTask.gateVerdict` | yes | governance | string/null | Gate verdict | derived row-like | limited | limited | Needs receipt/source validation. |
| `governanceGateOutcomeByTask.sourceFilePath` | yes | evidence/source | string path | Source file reference | derived row-like | limited | limited | Needs source existence/traceability check. |
| `governanceGateOutcomeByTask.dataSourceType` | yes | source mode marker | string | Data source type marker | derived row-like | no | limited | Boundary only. |
| `claimMovementTimeline.sourceArtifactDate` | yes | time/source | string/date/null | Source artifact date | derived row-like | limited | limited | Not event timestamp proof. |
| `claimMovementTimeline.claimBefore` | yes | claim boundary | string/null | Claim before movement | derived row-like | limited | limited | Needs receipt/source validation. |
| `claimMovementTimeline.claimAfter` | yes | claim boundary | string/null | Claim after movement | derived row-like | limited | limited | Needs receipt/source validation. |
| `claimMovementTimeline.claimMovement` | yes | claim boundary | string/null | Claim movement label | derived row-like | limited | limited | Derived from before/after; not proof alone. |
| `claimMovementTimeline.sourceFilePath` | yes | evidence/source | string path | Source file reference | derived row-like | limited | limited | Needs source existence/traceability check. |
| `claimMovementTimeline.dataSourceType` | yes | source mode marker | string | Data source type marker | derived row-like | no | limited | Boundary only. |
| `missingTelemetryWarnings.label` | yes | warning label | string | Missing field/warning label | warning-derived | limited | limited | Supports warning inventory, not raw row-level count proof. |
| `missingTelemetryWarnings.value` | yes | warning aggregate value | number | Missing warning aggregate | warning-derived | limited | limited | Later counts must preserve source limitation. |
| `missingTelemetryWarnings.dataSourceType` | yes | source mode marker | string | Warning source marker | warning-derived | no | limited | Boundary only. |
| `ledgerCoverage.label` | yes | display label | string | Ledger coverage label | derived/display | no | no | Display aggregate only. |
| `ledgerCoverage.value` | yes | displayed value | number/string | Ledger coverage value | derived/display | no | no | Not field-level proof. |
| `ledgerCoverage.detail` | yes | display text | string | Coverage detail | derived/display | no | no | Display-only. |
| `ledgerCoverage.dataSourceType` | yes | source mode marker | string | Data source type marker | derived/display | no | limited | Boundary only. |
| `taskReceiptRows.taskTitle` | yes | task identity | string | Task title | derived row-like | limited | limited | Row-like but still bundled export. |
| `taskReceiptRows.taskId` | yes | task identity | string/null | Task id | derived row-like | limited | limited | Can support later task identity checks if source traceable. |
| `taskReceiptRows.sourceFilePath` | yes | evidence/source | string path | Source file path | derived row-like | limited | limited | Needs path validation and redaction. |
| `taskReceiptRows.evidenceType` | yes | evidence/source | string | Evidence type | derived row-like | limited | limited | Needs source validation. |
| `taskReceiptRows.claimLevel` | yes | claim boundary | string | Claim level | derived row-like | limited | limited | Needs source validation. |
| `taskReceiptRows.finalStatus` | yes | governance/status | string/null | Final status | derived row-like | limited | limited | Needs source validation. |
| `taskReceiptRows.authorizedNextAction` | yes | governance/action | string/null | Authorized next action | derived row-like | limited | limited | Needs source validation. |
| `taskReceiptRows.missingFieldCount` | yes | data quality | number/null | Missing field count per task receipt row | derived row-like | limited | limited | Not raw missing_fields_json; later counts must verify basis. |
| `taskReceiptRows.dataSourceType` | yes | source mode marker | string | Data source type marker | derived row-like | no | limited | Boundary only. |
| `taskReceiptRows.extractionConfidence` | yes | confidence | string/number | Extraction confidence | derived row-like | limited | limited | Useful for split, not proof alone. |
| `taskReceiptRows.sourceOrigin` | yes | evidence/source | string | Source origin | derived row-like | limited | limited | Needs traceability check. |
| `lowConfidenceRows.sourceFilePath` | yes | evidence/source | string path | Low-confidence row source path | derived row-like | limited | limited | Advisory only. |
| `lowConfidenceRows.exclusionReason` | yes | data quality | string | Exclusion or low-confidence reason | derived row-like | limited | limited | Advisory; cannot support strong claims. |
| `lowConfidenceRows.claimLevel` | yes | claim boundary | string | Claim level | derived row-like | limited | limited | Advisory; needs validation. |
| `lowConfidenceRows.missingFieldCount` | yes | data quality | number/null | Missing field count in advisory row | derived row-like | limited | limited | Advisory only, not authoritative count. |
| `lowConfidenceRows.dataSourceType` | yes | source mode marker | string | Data source type marker | derived row-like | no | limited | Boundary only. |
| `category_id` | yes | category identity | string | Missing category id in CSV/graph derived artifacts | derived/report | no | limited | Derived category label; rule proof still needed. |
| `observed_count` | yes | category aggregate | number/string/null | Observed category count in derived artifacts | derived/report | no | limited | Inventory only; not validated here. |
| `count_status` | yes | category claim boundary | string | Count status label | derived/report | no | limited | Needs rule validation later. |
| `percent_of_observed` | yes | category aggregate | number/string/null | Category share label | derived/report | no | limited | Not validated here. |
| `actionability` | yes | data quality/action | string | Actionability label | derived/report | no | limited | Derived categorization, not proof. |
| `meaning` | yes | owner-facing interpretation | string | Category meaning | derived/report | no | no | Explanation only. |
| `impact` / `claim_impact_area` | yes | claim impact | string | Blocked claim area | derived/report | no | limited | Needs evidence for category basis. |
| `recommended_fix` | yes | recommendation | string | Candidate fix | derived/report | no | no | Recommendation, not source fact. |
| `confidence` | yes | confidence | string | Confidence label | derived/report | no | limited | Useful for later split, not proof alone. |
| `tooltip_en` | yes | UI/help text | string | English tooltip | derived/display | no | no | Owner-readable copy only. |
| `tooltip_th` | yes | UI/help text | string | Thai tooltip | derived/display | no | no | Owner-readable copy only. |
| `disclaimer` | yes | non-claim/display | string | Disclaimer copy | derived/display | no | no | Required for future visuals. |
| `labels` | yes | missing field labels | array of strings | Warning source labels in graph JSON | warning-derived/report | limited | limited | Candidate basis for later rules, not complete row proof. |
| `source_file` | yes | evidence/source | string | Declared source file in graph JSON | derived/report | no | limited | Points to bundled export; does not prove all fields. |
| `source_shape` | yes | source mode | string | Source shape label | derived/report | no | no | Boundary only. |
| `not_live_database` | yes | non-claim | boolean | Live DB non-claim | derived/report | no | no | Boundary only. |
| `not_production_telemetry_verification` | yes | non-claim | boolean | Production verification non-claim | derived/report | no | no | Boundary only. |
| `full_row_level_completeness_claimed` | yes | non-claim | boolean | Full row-level completeness non-claim | derived/report | no | no | Boundary only. |
| `non_claims` | yes | non-claim list | array | Non-claims in graph JSON | derived/report | no | no | Boundary only. |
| `raw missing_fields_json` | no | desired row-level source | absent | Raw missing-fields list per row | absent | no | no | Required for strong field-level counts; absent from available source. |
| `stable row id` | partial | desired row identity | string/null | Stable row identifier | derived row-like / absent for warning rows | limited | limited | `taskId` exists in taskReceiptRows, but warning rows lack row id. |
| `event_timestamp` | no | time/sequence | absent | Event timestamp | absent | no | no | Export/generated timestamps are not event timestamps. |
| `provider receipt id` | partial | provider/model proof | string/null | Provider receipt/generation id candidate | derived row-like | limited | limited | `generationId` exists in modelVsTask but is not provider-backed proof here. |
| `gate_owner` | implied/partial | governance | absent in bundled export keys | Gate owner | absent / report-derived | no | no | Needed for claim mapping; not directly exposed as raw field. |
| `blocked_reason` | implied/partial | claim boundary | absent in bundled export keys | Blocked reason | absent / report-derived | no | no | Needed for claim mapping; not directly exposed as raw field. |
| `forbidden_next_action` | implied/partial | claim boundary | absent in bundled export keys | Forbidden next action | absent / report-derived | no | no | Needed for claim mapping; not directly exposed as raw field. |

## Limitations

- This inventory is structural. It does not compute field-level counts.
- `data/internal-telemetry/telemetry-dashboard-export.json` is dashboard-shaped and bundled, not raw row-level telemetry.
- `missingTelemetryWarnings` exposes aggregate warning labels and values, not raw per-row missing fields.
- Prior Phase 2 report, CSV, and graph JSON artifacts are derived/report artifacts and cannot prove field-level counts by themselves.
- `outputs/telemetry-inventory` remains absent in the scoped repo context.
- Event timestamps, raw missing-fields JSON, and several gate/claim source fields required for strong recount are absent or only implied by derived labels.
- Thai/English tooltip and disclaimer fields exist in derived artifacts, but they do not validate category counts.

## Unresolved Questions

- Which source artifact is authoritative for the preserved baseline `26959`?
- Why does the bundled-export warning sum differ from the preserved baseline by `2`?
- Can `gate_claim_mapping_missing = 18019` be reproduced from raw fields, or is it only a derived aggregate?
- Are `detected_*` warning labels generated from raw row fields or from dashboard transformation logic?
- Are source file paths in row-like arrays available and safe to inspect in a later phase?
- Can a complete raw row-level export with `missing_fields_json` be produced without app/source changes?
- Which fields should be redacted before sample-row proof can be created?

## Next Recommended Artifact Only

`FIELD_LEVEL_COUNTS_V0_2.csv`

This next artifact should be created only after explicit owner approval to proceed beyond field inventory. It must not validate or confirm unresolved counts unless the field-level count method can support them from the available source.

## Final Status

FIELD_INVENTORY_V0_2_CREATED_LOCAL_ONLY
