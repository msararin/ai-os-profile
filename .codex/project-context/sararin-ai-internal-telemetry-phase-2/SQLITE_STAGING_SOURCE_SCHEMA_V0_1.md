# SQLite Staging Source Schema v0.1

status: LOCAL_ONLY_SCHEMA_SPEC
owner_approval: APPROVE_SQLITE_STAGING_SOURCE_SCHEMA_SPEC_ONLY

## 1. Source of Truth

sararin.ai internal telemetry / system health hybrid lane.

Primary inputs:

- `INTERNAL_TELEMETRY_LIVE_SOURCE_CONTRACT_V0_2.md`
- `SQLITE_STAGING_LOCAL_SOURCE_PROOF_PLAN_V0_1.md`
- `LIVE_TELEMETRY_SOURCE_GAP_RCA_AND_REMEDIATION_PLAN_20260705.md`
- `FIELD_INVENTORY_V0_2.md`
- `FIELD_LEVEL_COUNTS_V0_2.csv`

AIOS enforcement loaded for this schema task:

- `AIOS_ENFORCEMENT_VERSION=v0.2`
- `AIOS_ENFORCEMENT_STATUS=AVAILABLE`
- `AIOS_ENFORCEMENT_PATH=/Users/apple/robert-knowledge-base/02_execution_control/aios_enforcement/AIOS_ENFORCEMENT_V0_2.md`
- `AIOS_ENFORCEMENT_CLAIM_LEVEL=v0.2_loaded`

## 2. Current Task

Create SQLite staging source schema spec only.

This artifact defines a schema for a future local source-backed telemetry proof. It does not create SQLite, a database file, a migration, ingestion code, app/source code, a route, a graph, a deploy, or any telemetry proof result.

## 3. Owner Approval

Approved boundary:

`APPROVE_SQLITE_STAGING_SOURCE_SCHEMA_SPEC_ONLY`

Allowed:

- Define tables, columns, enums, constraints, draft DDL, seed row shape, validation rules, stop conditions, and future artifacts.

Not allowed:

- Create `.db`, `.sqlite`, or `.sqlite3` files.
- Implement ingestion.
- Patch app/source.
- Create routes.
- Execute proof.
- Promote any claim beyond schema/spec readiness.

## 4. Current Proven State

| Artifact / source | Proven state | Limit |
|---|---|---|
| `data/internal-telemetry/telemetry-dashboard-export.json` | Dashboard-shaped bundled export evidence exists | Not raw row-level live telemetry |
| `FIELD_INVENTORY_V0_2.md` | Field inventory exists local-only | Does not execute proof |
| `FIELD_LEVEL_COUNTS_V0_2.csv` | Export-scoped field counts exist local-only | Does not validate category recount or live source |
| `INTERNAL_TELEMETRY_LIVE_SOURCE_CONTRACT_V0_2.md` | Reviewed local-only source contract exists | Does not implement staging |
| `SQLITE_STAGING_LOCAL_SOURCE_PROOF_PLAN_V0_1.md` | Future proof plan exists | Does not create schema/database |

Unresolved/source-limited counts remain unresolved:

- `26959`
- `26957`
- delta `2`
- `18019`
- `66.84%`

These values are context only. This schema does not validate, reconcile, or promote them.

## 5. Non-Claims

This schema preserves:

- No SQLite staging proof claim.
- No database creation.
- No live telemetry claim.
- No production DB verification.
- No provider-backed telemetry verification.
- No authenticated rendered proof.
- No full row-level completeness.
- No production graph readiness.
- No category recount.
- No Phase 2 insight report v0.2 execution.
- No app/source patch.
- No deploy, commit, or push.

## 6. Schema Purpose

The schema purpose is to define the minimum local SQLite structure that a future approved proof could use to test source-backed reads with freshness metadata.

The schema must:

- preserve source mode;
- store required event fields from the v0.2 contract;
- store optional provider/model fields without claiming provider-backed verification;
- store freshness metadata;
- store claim ladder state;
- store redaction and privacy state;
- store evidence references;
- support source/display count reconciliation;
- make overclaiming mechanically visible.

## 7. Source Contract Dependency

This schema depends on `INTERNAL_TELEMETRY_LIVE_SOURCE_CONTRACT_V0_2.md`.

Contract rules carried forward:

- `source_mode` must be explicit.
- Future SQLite proof may claim at most `SQLITE_STAGING_READ_PROOF_LOCAL_ONLY`.
- Claim level must not exceed evidence from the proof protocol.
- Provider-backed contract review is not provider-backed telemetry verification.
- Substitute stable keys must be documented if `telemetry_event_id` is unavailable.
- Unresolved Phase 2 counts must remain unresolved/source-limited until category recount proof exists.

## 8. SQLite Staging Scope

Schema scope:

- local-only SQLite staging;
- deterministic seed input;
- source/display count reconciliation;
- local freshness metadata;
- source badge data;
- redaction and evidence references.

Out of scope:

- production DB schema;
- provider/API sync schema;
- app route schema;
- live monitoring schema;
- dashboard implementation schema;
- graph-ready production schema.

## 9. Tables Overview

| Table | Required | Purpose |
|---|---|---|
| `internal_telemetry_events` | yes | Main staging event/record table aligned to contract-required fields |
| `telemetry_source_refresh_state` | yes | Source freshness, source/display counts, refresh status, and local proof status |
| `telemetry_source_errors` | optional | Redacted source/ingestion/query errors for future local proof receipts |

This spec also defines source badge columns. Future implementation may keep source badge values in `telemetry_source_refresh_state` or create a separate view; this spec does not create either.

## 10. Main Table: `internal_telemetry_events`

| Column | Type | Required | Rule |
|---|---|---|---|
| `telemetry_event_id` | `TEXT` | yes | Primary stable event id, or approved substitute documented in future receipt |
| `created_at` | `TEXT` | yes | Source event/import timestamp in ISO-like string format |
| `source_system` | `TEXT` | yes | Source system or seed artifact label |
| `source_mode` | `TEXT` | yes | Must use required source mode enum |
| `route_or_surface` | `TEXT` | yes | Surface/workflow label, redacted if needed |
| `role_or_actor` | `TEXT` | yes | Role/actor label, privacy-safe |
| `operation_type` | `TEXT` | yes | Event or work type |
| `status` | `TEXT` | yes | Outcome/status label |
| `evidence_ref` | `TEXT` | yes | Secret-safe local receipt/artifact reference |
| `claim_level` | `TEXT` | yes | Must use required claim level enum |
| `redaction_status` | `TEXT` | yes | Must use required redaction enum |
| `provider` | `TEXT` | optional | Provider label if observed; not provider proof by itself |
| `requested_model` | `TEXT` | optional | Requested model if observed |
| `returned_model` | `TEXT` | optional | Returned model if observed |
| `input_tokens` | `INTEGER` | optional | Observed input tokens if available |
| `output_tokens` | `INTEGER` | optional | Observed output tokens if available |
| `total_tokens` | `INTEGER` | optional | Observed or reproducibly computed total |
| `cost_estimate` | `REAL` | optional | Estimate only unless provider-billed proof later exists |
| `currency` | `TEXT` | optional | Required when `cost_estimate` is populated |
| `raw_event_ref` | `TEXT` | recommended | Source row/path/key reference, redacted if needed |
| `source_record_hash` | `TEXT` | recommended | Stable hash of source row or source fragment |
| `inserted_at` | `TEXT` | yes | Local staging insert timestamp |
| `updated_at` | `TEXT` | yes | Local staging update timestamp |

## 11. Freshness Table: `telemetry_source_refresh_state`

| Column | Type | Required | Rule |
|---|---|---|---|
| `refresh_id` | `TEXT` | yes | Primary refresh/proof run identity |
| `source_mode` | `TEXT` | yes | Must use required source mode enum |
| `source_name` | `TEXT` | yes | Human-readable source or seed label |
| `last_refresh_at` | `TEXT` | yes | Future local refresh/read timestamp |
| `last_row_inserted_at` | `TEXT` | yes | Latest source/staging row timestamp by declared rule |
| `source_record_count` | `INTEGER` | yes | Count of records in declared source scope |
| `display_record_count` | `INTEGER` | yes | Count returned by declared read/display query |
| `freshness_status` | `TEXT` | yes | Must use required freshness enum |
| `freshness_window` | `TEXT` | yes | Declared acceptable local proof window |
| `source_lag_seconds` | `INTEGER` | conditional | Required when timestamps allow computation |
| `refresh_status` | `TEXT` | yes | `PLANNED`, `SUCCESS`, `FAILED`, `PARTIAL`, or `BLOCKED` in future proof |
| `refresh_error_count` | `INTEGER` | yes | Number of redacted errors captured for refresh/proof run |
| `created_at` | `TEXT` | yes | Row creation timestamp |
| `updated_at` | `TEXT` | yes | Row update timestamp |

## 12. Optional Table: `telemetry_source_errors`

| Column | Type | Required | Rule |
|---|---|---|---|
| `error_id` | `TEXT` | yes | Stable error id |
| `source_mode` | `TEXT` | yes | Required source mode enum |
| `source_name` | `TEXT` | yes | Source or seed label |
| `error_type` | `TEXT` | yes | Redacted error class |
| `error_message_redacted` | `TEXT` | yes | Secret-safe message only |
| `occurred_at` | `TEXT` | yes | Error timestamp |
| `evidence_ref` | `TEXT` | yes | Secret-safe evidence reference |
| `resolution_status` | `TEXT` | yes | `OPEN`, `RESOLVED`, `WONT_FIX`, `BLOCKED`, or `UNKNOWN` |

## 13. Required Event Columns

Required event columns from the source contract:

- `telemetry_event_id`
- `created_at`
- `source_system`
- `source_mode`
- `route_or_surface`
- `role_or_actor`
- `operation_type`
- `status`
- `evidence_ref`
- `claim_level`
- `redaction_status`

Rule:

If `telemetry_event_id` cannot be sourced, the future execution gate must define an approved substitute stable key and record the substitution in the proof receipt and source badge.

## 14. Optional Provider/Model Columns

Optional columns:

- `provider`
- `requested_model`
- `returned_model`
- `input_tokens`
- `output_tokens`
- `total_tokens`
- `cost_estimate`
- `currency`

Rules:

- These columns may be populated only when observed in seed input or reproducibly computed from observed values.
- These columns do not create provider-backed telemetry verification.
- `cost_estimate` must name a formula/source in future proof.
- Billing-verified cost remains forbidden unless future provider-billed evidence exists.

## 15. Freshness Metadata Columns

Freshness metadata columns:

- `source_mode`
- `last_refresh_at`
- `last_row_inserted_at`
- `source_record_count`
- `display_record_count`
- `freshness_status`
- `freshness_window`
- `source_lag_seconds`

Rules:

- `source_record_count` and `display_record_count` must share a declared scope or the proof must stop.
- `source_lag_seconds` must be computed, not guessed.
- Missing freshness data downgrades the future proof to source-limited or blocked.

## 16. Source Badge Columns

Source badge values required for future proof:

- `source_mode`
- `claim_level`
- `freshness_status`
- `last_refresh_at`
- `source_record_count`
- `display_record_count`
- `limitation_text`
- `substitute_key_note`

Future source badge text for SQLite staging must say:

`Local staging proof only. Not live telemetry. Not production DB. Not provider-backed telemetry verification.`

## 17. Claim Ladder Columns

Claim ladder storage:

- `claim_level` in `internal_telemetry_events`
- `source_mode` in both required tables
- `freshness_status` in `telemetry_source_refresh_state`
- `refresh_status` in `telemetry_source_refresh_state`

Required `claim_level` enum:

- `EXPORT_PROFILED`
- `SOURCE_REFRESH_VERIFIED`
- `SQLITE_STAGING_READ_PROOF_LOCAL_ONLY`
- `AUTHENTICATED_INTERNAL_SOURCE_RENDERED_LOCAL_PROOF`
- `PRODUCTION_DB_SOURCE_VERIFIED`
- `PROVIDER_BACKED_TELEMETRY_VERIFIED`

For future SQLite staging proof, maximum allowed value is:

`SQLITE_STAGING_READ_PROOF_LOCAL_ONLY`

## 18. Redaction/Privacy Columns

Required redaction columns:

- `redaction_status`
- `raw_event_ref`
- `evidence_ref`
- `error_message_redacted`

Required `redaction_status` enum:

- `PUBLIC_SAFE`
- `INTERNAL_ONLY`
- `REDACTED`
- `UNKNOWN`

Mapping note:

Contract v0.2 has more granular redaction values. This schema spec uses the owner-required simplified enum for table constraints. Future execution receipts must map any richer source redaction labels into this enum without weakening privacy.

## 19. Evidence/Reference Columns

Evidence/reference columns:

- `evidence_ref`
- `raw_event_ref`
- `source_record_hash`
- `refresh_id`
- `source_name`
- `error_id`

Rules:

- Evidence references must be secret-safe.
- Raw private local paths must not be rendered publicly.
- Hashes can support repeatability but do not prove production/live/provider-backed telemetry by themselves.

## 20. Suggested Indexes

Suggested indexes for a future implementation:

- `idx_internal_telemetry_events_created_at`
- `idx_internal_telemetry_events_source_mode`
- `idx_internal_telemetry_events_claim_level`
- `idx_internal_telemetry_events_redaction_status`
- `idx_internal_telemetry_events_source_system`
- `idx_internal_telemetry_events_raw_event_ref`
- `idx_telemetry_source_refresh_state_source_mode`
- `idx_telemetry_source_refresh_state_freshness_status`
- `idx_telemetry_source_errors_source_mode`
- `idx_telemetry_source_errors_resolution_status`

Indexes are suggestions only. This spec does not create them.

## 21. Constraints And Validation Rules

Required `source_mode` enum:

- `BUNDLED_JSON_EXPORT`
- `REGENERATED_STATIC_EXPORT`
- `SQLITE_STAGING_LOCAL`
- `AUTHENTICATED_SERVER_SOURCE`
- `PRODUCTION_DB`
- `PROVIDER_API_SYNC`
- `LOG_DERIVED`

Required `freshness_status` enum:

- `FRESH`
- `STALE`
- `UNKNOWN`
- `SOURCE_LIMITED`
- `ERROR`

Required `claim_level` enum:

- `EXPORT_PROFILED`
- `SOURCE_REFRESH_VERIFIED`
- `SQLITE_STAGING_READ_PROOF_LOCAL_ONLY`
- `AUTHENTICATED_INTERNAL_SOURCE_RENDERED_LOCAL_PROOF`
- `PRODUCTION_DB_SOURCE_VERIFIED`
- `PROVIDER_BACKED_TELEMETRY_VERIFIED`

Required `redaction_status` enum:

- `PUBLIC_SAFE`
- `INTERNAL_ONLY`
- `REDACTED`
- `UNKNOWN`

Validation rules:

- `telemetry_event_id` must be unique when used.
- `source_mode` must be one of the required enum values.
- Future SQLite proof rows must use `SQLITE_STAGING_LOCAL`.
- Future SQLite proof rows must not use a claim level higher than `SQLITE_STAGING_READ_PROOF_LOCAL_ONLY`.
- `currency` is required when `cost_estimate` is populated.
- `source_record_count` and `display_record_count` must be non-negative integers.
- `refresh_error_count` must be a non-negative integer.
- `redaction_status` must not be missing.
- `UNKNOWN` redaction blocks public rendering.

## 22. Example DDL Draft

Draft only. Do not execute in this task.

```sql
-- DRAFT ONLY. DO NOT EXECUTE AS PART OF THIS SCHEMA SPEC TASK.

CREATE TABLE internal_telemetry_events (
  telemetry_event_id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  source_system TEXT NOT NULL,
  source_mode TEXT NOT NULL CHECK (source_mode IN (
    'BUNDLED_JSON_EXPORT',
    'REGENERATED_STATIC_EXPORT',
    'SQLITE_STAGING_LOCAL',
    'AUTHENTICATED_SERVER_SOURCE',
    'PRODUCTION_DB',
    'PROVIDER_API_SYNC',
    'LOG_DERIVED'
  )),
  route_or_surface TEXT NOT NULL,
  role_or_actor TEXT NOT NULL,
  operation_type TEXT NOT NULL,
  status TEXT NOT NULL,
  evidence_ref TEXT NOT NULL,
  claim_level TEXT NOT NULL CHECK (claim_level IN (
    'EXPORT_PROFILED',
    'SOURCE_REFRESH_VERIFIED',
    'SQLITE_STAGING_READ_PROOF_LOCAL_ONLY',
    'AUTHENTICATED_INTERNAL_SOURCE_RENDERED_LOCAL_PROOF',
    'PRODUCTION_DB_SOURCE_VERIFIED',
    'PROVIDER_BACKED_TELEMETRY_VERIFIED'
  )),
  redaction_status TEXT NOT NULL CHECK (redaction_status IN (
    'PUBLIC_SAFE',
    'INTERNAL_ONLY',
    'REDACTED',
    'UNKNOWN'
  )),
  provider TEXT,
  requested_model TEXT,
  returned_model TEXT,
  input_tokens INTEGER,
  output_tokens INTEGER,
  total_tokens INTEGER,
  cost_estimate REAL,
  currency TEXT,
  raw_event_ref TEXT,
  source_record_hash TEXT,
  inserted_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  CHECK (claim_level != 'PRODUCTION_DB_SOURCE_VERIFIED' OR source_mode = 'PRODUCTION_DB'),
  CHECK (claim_level != 'PROVIDER_BACKED_TELEMETRY_VERIFIED' OR source_mode = 'PROVIDER_API_SYNC'),
  CHECK (cost_estimate IS NULL OR currency IS NOT NULL)
);

CREATE TABLE telemetry_source_refresh_state (
  refresh_id TEXT PRIMARY KEY,
  source_mode TEXT NOT NULL CHECK (source_mode IN (
    'BUNDLED_JSON_EXPORT',
    'REGENERATED_STATIC_EXPORT',
    'SQLITE_STAGING_LOCAL',
    'AUTHENTICATED_SERVER_SOURCE',
    'PRODUCTION_DB',
    'PROVIDER_API_SYNC',
    'LOG_DERIVED'
  )),
  source_name TEXT NOT NULL,
  last_refresh_at TEXT NOT NULL,
  last_row_inserted_at TEXT NOT NULL,
  source_record_count INTEGER NOT NULL CHECK (source_record_count >= 0),
  display_record_count INTEGER NOT NULL CHECK (display_record_count >= 0),
  freshness_status TEXT NOT NULL CHECK (freshness_status IN (
    'FRESH',
    'STALE',
    'UNKNOWN',
    'SOURCE_LIMITED',
    'ERROR'
  )),
  freshness_window TEXT NOT NULL,
  source_lag_seconds INTEGER,
  refresh_status TEXT NOT NULL CHECK (refresh_status IN (
    'PLANNED',
    'SUCCESS',
    'FAILED',
    'PARTIAL',
    'BLOCKED'
  )),
  refresh_error_count INTEGER NOT NULL DEFAULT 0 CHECK (refresh_error_count >= 0),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE telemetry_source_errors (
  error_id TEXT PRIMARY KEY,
  source_mode TEXT NOT NULL,
  source_name TEXT NOT NULL,
  error_type TEXT NOT NULL,
  error_message_redacted TEXT NOT NULL,
  occurred_at TEXT NOT NULL,
  evidence_ref TEXT NOT NULL,
  resolution_status TEXT NOT NULL CHECK (resolution_status IN (
    'OPEN',
    'RESOLVED',
    'WONT_FIX',
    'BLOCKED',
    'UNKNOWN'
  ))
);
```

## 23. Example Seed Row Shape

Synthetic/example only. Do not treat as real telemetry, proof, or count validation.

```json
{
  "telemetry_event_id": "synthetic-local-staging-event-001",
  "created_at": "2026-07-05T00:00:00Z",
  "source_system": "dashboard-shaped bundled export seed example",
  "source_mode": "SQLITE_STAGING_LOCAL",
  "route_or_surface": "redacted internal telemetry surface",
  "role_or_actor": "data-team",
  "operation_type": "schema-proof-example",
  "status": "SOURCE_LIMITED",
  "evidence_ref": "synthetic example only",
  "claim_level": "SQLITE_STAGING_READ_PROOF_LOCAL_ONLY",
  "redaction_status": "PUBLIC_SAFE",
  "provider": null,
  "requested_model": null,
  "returned_model": null,
  "input_tokens": null,
  "output_tokens": null,
  "total_tokens": null,
  "cost_estimate": null,
  "currency": null,
  "raw_event_ref": "synthetic/example-only",
  "source_record_hash": "synthetic-example-not-a-source-hash",
  "inserted_at": "2026-07-05T00:00:00Z",
  "updated_at": "2026-07-05T00:00:00Z"
}
```

## 24. Data Quality Checks Required Before Proof Execution

Before future execution:

- Confirm seed artifact and seed scope.
- Confirm field inventory mapping to schema.
- Confirm required columns can be populated or have approved substitutes.
- Confirm source/display count method.
- Confirm freshness timestamp method.
- Confirm redaction mapping.
- Confirm evidence references are secret-safe.
- Confirm unresolved counts remain unresolved/source-limited.
- Confirm no category recount is implied.
- Confirm no provider-backed telemetry verification is implied by optional provider/model columns.

## 25. Stop Conditions

Stop if:

- owner has not approved execution beyond schema/spec;
- any `.db`, `.sqlite`, or `.sqlite3` file would be created;
- app/source changes are required;
- route creation is required;
- seed source contains secrets or unsafe private data;
- source mode cannot be constrained;
- claim level can exceed proof evidence;
- redaction status cannot be assigned;
- source/display counts cannot share a declared scope;
- unresolved counts would be promoted;
- provider-backed, production DB, live telemetry, or authenticated rendered proof claims would be implied.

## 26. Forbidden Claims After Schema Spec

Forbidden after this schema spec:

- SQLite staging proof completed.
- Live telemetry verified.
- Production DB source verified.
- Provider-backed telemetry verified.
- Authenticated internal source rendered proof completed.
- Full row-level completeness.
- Production graph ready.
- Category recount completed.
- Phase 2 insight report v0.2 completed.

## 27. Required Future Artifacts

Required future artifacts if owner later approves implementation:

- `SQLITE_STAGING_LOCAL_SOURCE_PROOF_EXECUTION_GATE_V0_1.md`
- `SQLITE_STAGING_LOCAL_SOURCE_PROOF_RESULT_V0_1.md`
- `SQLITE_STAGING_LOCAL_SOURCE_PROOF_TELEMETRY_RECEIPT_V0_1.md`

Future implementation must also record whether the schema was used as-is or revised before execution.

## 28. Recommended Next Artifact Only

Recommended next artifact:

`SQLITE_STAGING_LOCAL_SOURCE_PROOF_EXECUTION_GATE_V0_1.md`

Purpose:

Define the exact approval gate, commands, allowed outputs, stop conditions, and validation rules for a future local SQLite staging proof execution. Do not execute the proof until separately approved.

## Final Status

`SQLITE_STAGING_SOURCE_SCHEMA_V0_1_CREATED_LOCAL_ONLY`
