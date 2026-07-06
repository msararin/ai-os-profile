# Internal Telemetry Live Source Contract v0.1

status: LOCAL_ONLY_CONTRACT_SPEC
previous_status_preserved: LIVE_TELEMETRY_SOURCE_GAP_RCA_AND_REMEDIATION_PLAN_CREATED_LOCAL_ONLY

## 1. Source of Truth

sararin.ai internal telemetry / system health hybrid lane.

Latest planning input:

- `LIVE_TELEMETRY_SOURCE_GAP_RCA_AND_REMEDIATION_PLAN_20260705.md`
- Current public capability surface remains Data Team permanent capability live on `/org-roles` with boundaries.
- Current telemetry evidence remains source-limited to bundled export and local-only validation artifacts.

AIOS enforcement loaded for this contract task:

- `AIOS_ENFORCEMENT_VERSION=v0.2`
- `AIOS_ENFORCEMENT_STATUS=AVAILABLE`
- `AIOS_ENFORCEMENT_PATH=/Users/apple/robert-knowledge-base/02_execution_control/aios_enforcement/AIOS_ENFORCEMENT_V0_2.md`
- `AIOS_ENFORCEMENT_CLAIM_LEVEL=v0.2_loaded`

## 2. Current Task

Create the internal telemetry live source contract v0.1 only.

This contract defines the minimum source, freshness, claim, proof, data quality, security, and stop-condition requirements before any later SQLite staging, production DB access, provider/API sync, authenticated rendered proof, live telemetry claim, or visualization promotion.

This artifact is a specification only. It does not implement a data source, staging table, route, UI, graph, provider sync, or production verification.

## 3. Current Proven State

| Item | Current state | Current support | Current limit |
|---|---|---|---|
| Available Phase 2 source | Dashboard-shaped bundled JSON export | Export-shape inspection and source-limited profiling | Not live database proof |
| `data/internal-telemetry/telemetry-dashboard-export.json` | Existing bundled export evidence | Field inventory and export-scoped field-level counts | Does not prove continuous source updates |
| `FIELD_INVENTORY_V0_2.md` | Local-only field inventory | Field existence and semantic/source-shape notes | Does not validate live source or final categories |
| `FIELD_LEVEL_COUNTS_V0_2.csv` | Local-only field-level counts from available export only | Export-scoped field counts | Does not prove row-level completeness or live source |
| Category recount | Not executed | No supported recount claim | Category totals remain unresolved/source-limited |
| Live telemetry source | Not proven | No live source claim | No source freshness or source/display reconciliation proof |

Known unresolved/source-limited telemetry issues remain unresolved:

- Preserved baseline missing telemetry signals = `26959`.
- Observed bundled-export warning-row sum = `26957`.
- Delta = `2`.
- `gate_claim_mapping_missing = 18019`.
- Share = `66.84%`.

These values are retained as unresolved context only. They are not validated, confirmed, or promoted by this contract.

## 4. Non-Claims

This contract preserves these non-claims:

- No production telemetry verification claim.
- No provider-backed telemetry verification claim.
- No live telemetry claim.
- No live monitoring claim.
- No full row-level completeness claim.
- No production graph readiness claim.
- No category recount claim.
- No Phase 2 insight report v0.2 claim.
- No SQLite staging implementation claim.
- No production DB source claim.
- No authenticated rendered proof claim.
- No claim that current public/system-health evidence proves continuous telemetry updates.

## 5. Definition of "Live/Source-Backed Telemetry"

"Live/source-backed telemetry" means the internal telemetry surface is backed by an identified source whose records, freshness metadata, and display scope can be independently reconciled within the approved proof boundary.

Minimum definition:

1. The source has an explicit `source_mode`.
2. The source exposes or can produce event-level rows or equivalent records.
3. Each displayed row or aggregate has a traceable source scope.
4. `last_refresh_at` is observed from the refresh/read process, not guessed.
5. `last_row_inserted_at` is observed from source rows or source metadata.
6. `source_record_count` and `display_record_count` are measured for the same declared scope.
7. The source/display reconciliation is documented.
8. The maximum claim level is assigned using the claim ladder in this contract.
9. Source limitations are visible to owners before graph, report, or dashboard claims are promoted.

A static bundled export is not live/source-backed telemetry by itself. It can be profiled, but it does not prove continuous write path, refresh path, production source, provider receipt mapping, or authenticated source-backed rendering.

## 6. Source Mode Enum

| Enum | Meaning | Maximum claim without additional proof |
|---|---|---|
| `BUNDLED_JSON_EXPORT` | Static JSON artifact bundled with or available to the app/repo. | `EXPORT_PROFILED` |
| `REGENERATED_STATIC_EXPORT` | Static export regenerated from a known source at a recorded time. | `SOURCE_REFRESH_VERIFIED` if generation proof exists |
| `SQLITE_STAGING_LOCAL` | Local SQLite staging table populated from a controlled input for repeatable checks. | `SQLITE_STAGING_READ_PROOF_LOCAL_ONLY` |
| `AUTHENTICATED_SERVER_SOURCE` | Authenticated internal/server-side source rendered or queried in a controlled local/preview proof. | `AUTHENTICATED_INTERNAL_SOURCE_RENDERED_LOCAL_PROOF` |
| `PRODUCTION_DB` | Production database or managed storage source verified through approved metadata/query proof. | `PRODUCTION_DB_SOURCE_VERIFIED` |
| `PROVIDER_API_SYNC` | Provider/API receipt or sync source mapped to telemetry records. | `PROVIDER_BACKED_TELEMETRY_VERIFIED` |
| `LOG_DERIVED` | Application/platform logs transformed into telemetry rows or aggregates. | Source-specific; cannot exceed proof actually attached |

## 7. Required Event Fields

Each source-backed telemetry event or equivalent source record should expose these fields before stronger claims are considered:

| Field | Required purpose | Minimum rule |
|---|---|---|
| `telemetry_event_id` | Stable event identity | Unique within source scope; no display claim if absent unless another stable key is documented |
| `created_at` | Event time | Must be source-generated or source-preserved timestamp |
| `source_system` | Origin system | Must identify app, provider, log source, job, or import source |
| `source_mode` | Source mode enum | Must match one enum in this contract |
| `route_or_surface` | Surface or workflow being measured | Must be public-safe when rendered |
| `role_or_actor` | Actor, system role, or workflow role | Must preserve privacy and redaction rules |
| `operation_type` | Work type or event class | Must be enumerable or documented |
| `status` | Event outcome | Must distinguish success, failure, warning, skipped, unresolved, or not applicable where relevant |
| `evidence_ref` | Receipt, artifact, query, or source reference | Must not expose secrets or private paths in public UI |
| `claim_level` | Highest supported claim rung | Must map to the claim ladder |
| `redaction_status` | Privacy handling state | Required before any rendered proof |

## 8. Optional Model/Provider Fields

These fields are optional unless model/provider, token, cost, or provider-backed telemetry claims are made. If a claim uses one of these concepts, the corresponding field becomes required or must be marked not exposed.

| Field | Use | Rule |
|---|---|---|
| `provider` | Provider identity | Required for provider-backed claim |
| `requested_model` | Requested model path | Required for model-routing claim |
| `returned_model` | Actual returned model | Required when provider can return a different model |
| `input_tokens` | Prompt/input usage | Required for token input count claim |
| `output_tokens` | Completion/output usage | Required for token output count claim |
| `total_tokens` | Total usage | Must be observed or reproducibly computed from input/output |
| `cost_estimate` | Cost estimate | Must name formula/source and cannot be called billing proof unless provider-billed evidence exists |
| `currency` | Cost currency | Required when cost is displayed |

If any optional field is not exposed, it must be classified as one of:

- `not_applicable`
- `tool_not_exposed`
- `source_schema_gap`
- `redacted_private`
- `inferred_only`
- `unknown_missing`

## 9. Required Freshness Metadata

| Field | Required meaning | Rule |
|---|---|---|
| `last_refresh_at` | Time the display/query source was last refreshed | Must come from refresh job, query receipt, source metadata, or deterministic run receipt |
| `last_row_inserted_at` | Latest source event insertion time | Must be observed from source rows or reliable source metadata |
| `source_record_count` | Number of source records in declared scope | Must state filters and time window |
| `display_record_count` | Number of records rendered or available in display/query scope | Must use same declared scope or document difference |
| `freshness_status` | Owner-readable freshness classification | Must use approved values below |
| `freshness_window` | Expected acceptable freshness interval | Must be stated before stale/current claim |
| `source_lag_seconds` | Difference between `last_refresh_at` and `last_row_inserted_at`, when computable | Must be computed, not guessed |

Approved `freshness_status` values:

| Value | Meaning |
|---|---|
| `STATIC_EXPORT_ONLY` | Source is static and cannot prove live updates |
| `REFRESHED_STATIC_EXPORT` | Static export was regenerated at a recorded time |
| `LOCAL_STAGING_CURRENT` | Local staging source was populated/read in a controlled local proof |
| `AUTH_RENDERED_SOURCE_VISIBLE` | Authenticated internal render shows source mode and freshness metadata |
| `PRODUCTION_SOURCE_CURRENT` | Production source freshness and count reconciliation are verified |
| `PROVIDER_BACKED_CURRENT` | Provider/API source and display mapping are verified |
| `STALE_OR_UNRESOLVED` | Freshness cannot be proven or failed its threshold |

## 10. Required Source Badge Rules

Every internal telemetry surface, report, or visualization candidate must show a source badge before stronger claims are promoted.

Minimum source badge fields:

- `source_mode`
- `claim_level`
- `freshness_status`
- `last_refresh_at` when known
- `source_record_count` when known
- `display_record_count` when known
- source limitation text

Badge text examples:

| Condition | Required badge language |
|---|---|
| Bundled export only | `Source-limited: bundled export` |
| Regenerated static export | `Point-in-time export: refreshed static source` |
| Local SQLite staging | `Local staging proof only` |
| Authenticated rendered source proof | `Authenticated internal source proof` |
| Production DB verified | `Production source verified` |
| Provider/API verified | `Provider-backed telemetry verified` |
| Insufficient evidence | `Source unresolved: do not treat as live telemetry` |

Badge language must not imply live telemetry, provider verification, production source, or monitoring unless the proof protocol for that claim level has passed.

## 11. Required Claim Ladder Mapping

| Claim level | Minimum source mode | Required proof | Explicitly blocked claim |
|---|---|---|---|
| `EXPORT_PROFILED` | `BUNDLED_JSON_EXPORT` | Static artifact exists and can be inspected | Live telemetry, DB source, provider-backed proof |
| `SOURCE_REFRESH_VERIFIED` | `REGENERATED_STATIC_EXPORT` | Regeneration source, timestamp, scope, and artifact receipt | Continuous update, production DB proof |
| `SQLITE_STAGING_READ_PROOF_LOCAL_ONLY` | `SQLITE_STAGING_LOCAL` | Local schema, deterministic input, row count, read query receipt | Production source, live telemetry |
| `AUTHENTICATED_INTERNAL_SOURCE_RENDERED_LOCAL_PROOF` | `AUTHENTICATED_SERVER_SOURCE` | Authenticated internal render with source badge, freshness metadata, and safe redaction | Provider-backed proof unless provider receipts exist |
| `PRODUCTION_DB_SOURCE_VERIFIED` | `PRODUCTION_DB` | Approved production source metadata/query proof, freshness metadata, source/display count reconciliation | Provider-backed proof unless provider/API mapping exists |
| `PROVIDER_BACKED_TELEMETRY_VERIFIED` | `PROVIDER_API_SYNC` | Provider/API receipt, ingestion mapping, source/display reconciliation, freshness metadata | Full completeness beyond documented provider/source scope |

Claim level must be downgraded to the highest rung supported by actual evidence. A stronger UI, chart, report, or title does not raise claim level.

## 12. Required Proof Protocol Before Each Claim Level

### `EXPORT_PROFILED`

- Static export path or artifact is identified.
- Artifact can be parsed or inspected.
- Source mode is visible as `BUNDLED_JSON_EXPORT`.
- Report says profiled/export-scoped, not live.

### `SOURCE_REFRESH_VERIFIED`

- Regeneration command, job, or process is documented.
- Source scope and filters are documented.
- `last_refresh_at` is recorded from the generation process.
- New artifact checksum or receipt exists.
- No continuous-update claim is made.

### `SQLITE_STAGING_READ_PROOF_LOCAL_ONLY`

- SQLite schema is documented before implementation.
- Controlled input source is named.
- Staging row count is measured.
- Read query receipt is captured.
- Source/display mapping is local-only.
- UI/public copy says local staging proof only.

### `AUTHENTICATED_INTERNAL_SOURCE_RENDERED_LOCAL_PROOF`

- Authenticated internal route or surface is rendered in a safe local/preview proof.
- Source badge is visible.
- Freshness metadata is visible.
- Redaction rules are applied.
- Saved proof does not leak secrets, private paths, or internal-only rows publicly.

### `PRODUCTION_DB_SOURCE_VERIFIED`

- Production source is approved for metadata/query proof.
- Schema or source contract is observed.
- `source_record_count` and `last_row_inserted_at` are measured.
- Display scope is reconciled against source scope.
- No provider-backed claim is made unless provider mapping exists.

### `PROVIDER_BACKED_TELEMETRY_VERIFIED`

- Provider/API receipt exists.
- Provider receipt maps to telemetry records.
- Provider source count and display count are reconciled for the declared scope.
- Model/token/cost fields are observed or explicitly not exposed.
- Public or owner-facing text states exact provider-backed scope.

## 13. Data Quality Checks Required Before Visualization

Before any telemetry visualization, graph, report table, or owner decision view is promoted, the following checks must exist or be explicitly downgraded:

| Check | Requirement | Failure handling |
|---|---|---|
| Field inventory | Required fields and optional fields are classified | Mark visualization not ready |
| Field-level counts | Missing/not-exposed/redacted/inferred states are counted separately | Do not aggregate into defect totals |
| Source/display reconciliation | `source_record_count` and `display_record_count` are compared | Block live/display completeness claim |
| Classification rules | Category rules are exact, rerunnable, and scoped | Block category ranking and insight report claims |
| Sample-row proof | Major categories have redacted examples | Downgrade category narrative |
| Observed/inferred/not-claimable split | Required for claim-safe reporting | Mark unsupported claims not claimable |
| Freshness check | `last_refresh_at`, `last_row_inserted_at`, and lag are measured or marked unresolved | Block live/update claim |
| Redaction check | Private fields are hidden or safely summarized | Block rendered proof publication |
| Tooltip/disclaimer copy | Owner-readable source limitation is attached | Block graph readiness |

Default visualization status when evidence is incomplete:

`VISUALIZATION_NOT_READY_SOURCE_LIMITED`

## 14. Security/Privacy/Redaction Rules

Security and privacy rules:

- Do not expose secrets, tokens, session identifiers, raw provider credentials, private user identifiers, private filesystem paths, or internal-only route details in public surfaces.
- Do not expose raw telemetry rows publicly unless owner-approved and privacy-safe.
- Use `redaction_status` on every event or rendered proof.
- Preserve evidence references without leaking private paths in public copy.
- Store local-only proof artifacts in project context or approved local receipt locations until owner approves publication.
- Use aggregate or redacted examples for sample-row proof.
- Treat provider/API receipts as sensitive unless explicitly approved for public-safe mention.

Allowed `redaction_status` values:

- `PUBLIC_SAFE`
- `INTERNAL_ONLY`
- `REDACTED_PRIVATE`
- `SECRET_EXCLUDED`
- `UNREVIEWED_DO_NOT_RENDER`

Any `UNREVIEWED_DO_NOT_RENDER` source blocks public visualization and public detail text.

## 15. Stop Conditions

Stop and do not promote claims if any of these occur:

- Source mode is unknown.
- Required event identity or timestamp fields are absent and no approved substitute exists.
- `last_refresh_at` is missing for a refresh or live claim.
- `last_row_inserted_at` is missing for a live/update claim.
- `source_record_count` and `display_record_count` cannot be reconciled.
- Provider-backed claim is requested without provider/API receipt mapping.
- Production DB claim is requested without approved source metadata/query proof.
- Redaction status is missing for rendered proof.
- Visualization would imply completeness that source evidence does not support.
- Category recount depends on fields absent from the source.
- The task would require app/source changes, route creation, deploy, commit, push, SQLite implementation, production DB access, provider sync, or Phase 2 insight report execution without explicit owner approval.

## 16. Allowed Next Implementation Candidates

Only after owner approval, the following candidates may be considered:

1. `INTERNAL_TELEMETRY_SOURCE_CONTRACT_REVIEW_RECEIPT_V0_1.md`
   - Review this contract against current artifacts and owner claim boundary.

2. `SQLITE_STAGING_LOCAL_SOURCE_PROOF_PLAN_V0_1.md`
   - Plan only. Define local SQLite schema and read proof without implementation.

3. `AUTHENTICATED_INTERNAL_SOURCE_RENDER_PROOF_PLAN_V0_1.md`
   - Plan only. Define safe browser/render proof requirements and redaction rules.

4. `PRODUCTION_DB_OR_PROVIDER_SOURCE_VERIFICATION_READINESS_CHECKLIST_V0_1.md`
   - Plan only. Define approval, access, receipt, and reconciliation requirements.

Implementation candidates remain blocked until explicitly approved:

- SQLite staging implementation.
- App/source patch.
- Route creation.
- Production DB query.
- Provider/API sync.
- Authenticated rendered proof execution.
- Graph or UI implementation.
- Phase 2 insight report v0.2 execution.

## 17. Recommended Next Artifact Only

Recommended next artifact:

`INTERNAL_TELEMETRY_SOURCE_CONTRACT_REVIEW_RECEIPT_V0_1.md`

Purpose:

Review this contract against the current bundled export, local-only field inventory, local-only field-level counts, and unresolved telemetry count issues. The review should confirm whether the contract is complete enough to gate a later SQLite staging proof plan without implementing SQLite or promoting any live telemetry claim.
