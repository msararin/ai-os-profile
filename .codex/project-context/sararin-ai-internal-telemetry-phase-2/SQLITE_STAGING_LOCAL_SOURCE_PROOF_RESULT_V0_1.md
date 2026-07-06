# SQLite Staging Local Source Proof Result v0.1

source_of_truth: sararin.ai internal telemetry / system health hybrid lane
status: LOCAL_ONLY_SQLITE_STAGING_READ_PROOF
created_at: 2026-07-06T12:15:10Z
claim_level: SQLITE_STAGING_READ_PROOF_LOCAL_ONLY
sqlite_proof_file: .codex/project-context/sararin-ai-internal-telemetry-phase-2/local-proof/sqlite-staging-local-source-proof-v0-1/telemetry_staging_LOCAL_ONLY.sqlite


## Summary

Local SQLite staging source proof was executed inside the scoped telemetry repo project-context area. The proof created a local-only SQLite database, created the schema from the schema spec, inserted synthetic/local proof rows derived from the first three rows of `FIELD_LEVEL_COUNTS_V0_2.csv`, inserted freshness/source badge metadata, and verified read/query access.

This proves only `SQLITE_STAGING_READ_PROOF_LOCAL_ONLY` for the declared local seed scope.

## Inputs Used

- `INTERNAL_TELEMETRY_LIVE_SOURCE_CONTRACT_V0_2.md`
- `SQLITE_STAGING_LOCAL_SOURCE_PROOF_PLAN_V0_1.md`
- `SQLITE_STAGING_SOURCE_SCHEMA_V0_1.md`
- `SQLITE_STAGING_LOCAL_SOURCE_PROOF_EXECUTION_GATE_V0_1.md`
- `FIELD_INVENTORY_V0_2.md`
- `FIELD_LEVEL_COUNTS_V0_2.csv`

## SQLite Proof File

`.codex/project-context/sararin-ai-internal-telemetry-phase-2/local-proof/sqlite-staging-local-source-proof-v0-1/telemetry_staging_LOCAL_ONLY.sqlite`

Parking decision: keep as local-only untracked proof artifact unless owner explicitly approves cleanup or commit later.

## Schema/Table List Output

| name |
| --- |
| internal_telemetry_events |
| telemetry_source_errors |
| telemetry_source_refresh_state |

## DDL Evidence

```sql
CREATE TABLE internal_telemetry_events (
  telemetry_event_id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  source_system TEXT NOT NULL,
  source_mode TEXT NOT NULL CHECK (source_mode IN ('BUNDLED_JSON_EXPORT','REGENERATED_STATIC_EXPORT','SQLITE_STAGING_LOCAL','AUTHENTICATED_SERVER_SOURCE','PRODUCTION_DB','PROVIDER_API_SYNC','LOG_DERIVED')),
  route_or_surface TEXT NOT NULL,
  role_or_actor TEXT NOT NULL,
  operation_type TEXT NOT NULL,
  status TEXT NOT NULL,
  evidence_ref TEXT NOT NULL,
  claim_level TEXT NOT NULL CHECK (claim_level IN ('EXPORT_PROFILED','SOURCE_REFRESH_VERIFIED','SQLITE_STAGING_READ_PROOF_LOCAL_ONLY','AUTHENTICATED_INTERNAL_SOURCE_RENDERED_LOCAL_PROOF','PRODUCTION_DB_SOURCE_VERIFIED','PROVIDER_BACKED_TELEMETRY_VERIFIED')),
  redaction_status TEXT NOT NULL CHECK (redaction_status IN ('PUBLIC_SAFE','INTERNAL_ONLY','REDACTED','UNKNOWN')),
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
)
```

```sql
CREATE TABLE telemetry_source_errors (
  error_id TEXT PRIMARY KEY,
  source_mode TEXT NOT NULL,
  source_name TEXT NOT NULL,
  error_type TEXT NOT NULL,
  error_message_redacted TEXT NOT NULL,
  occurred_at TEXT NOT NULL,
  evidence_ref TEXT NOT NULL,
  resolution_status TEXT NOT NULL CHECK (resolution_status IN ('OPEN','RESOLVED','WONT_FIX','BLOCKED','UNKNOWN'))
)
```

```sql
CREATE TABLE telemetry_source_refresh_state (
  refresh_id TEXT PRIMARY KEY,
  source_mode TEXT NOT NULL CHECK (source_mode IN ('BUNDLED_JSON_EXPORT','REGENERATED_STATIC_EXPORT','SQLITE_STAGING_LOCAL','AUTHENTICATED_SERVER_SOURCE','PRODUCTION_DB','PROVIDER_API_SYNC','LOG_DERIVED')),
  source_name TEXT NOT NULL,
  last_refresh_at TEXT NOT NULL,
  last_row_inserted_at TEXT NOT NULL,
  source_record_count INTEGER NOT NULL CHECK (source_record_count >= 0),
  display_record_count INTEGER NOT NULL CHECK (display_record_count >= 0),
  freshness_status TEXT NOT NULL CHECK (freshness_status IN ('FRESH','STALE','UNKNOWN','SOURCE_LIMITED','ERROR')),
  freshness_window TEXT NOT NULL,
  source_lag_seconds INTEGER,
  refresh_status TEXT NOT NULL CHECK (refresh_status IN ('PLANNED','SUCCESS','FAILED','PARTIAL','BLOCKED')),
  refresh_error_count INTEGER NOT NULL DEFAULT 0 CHECK (refresh_error_count >= 0),
  limitation_text TEXT NOT NULL,
  substitute_key_note TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
)
```

## Row Count Query Output

| event_rows |
| --- |
| 3 |

## Freshness Metadata Query Output

| source_mode | last_refresh_at | last_row_inserted_at | source_record_count | display_record_count | freshness_status | freshness_window | source_lag_seconds | refresh_status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SQLITE_STAGING_LOCAL | 2026-07-06T12:15:10Z | 2026-07-06T12:15:10Z | 3 | 3 | FRESH | local proof execution instant | 0 | SUCCESS |

## Source Mode / Source Badge Query Output

| source_mode | claim_level | redaction_status | rows |
| --- | --- | --- | --- |
| SQLITE_STAGING_LOCAL | SQLITE_STAGING_READ_PROOF_LOCAL_ONLY | PUBLIC_SAFE | 3 |

## Synthetic Proof Row Query Output

| telemetry_event_id | source_mode | operation_type | status | claim_level | redaction_status | raw_event_ref |
| --- | --- | --- | --- | --- | --- | --- |
| local-proof-field-count-001-3a859ceffdae | SQLITE_STAGING_LOCAL | field-count-row-staging-proof | FIELD_OBSERVED_IN_AVAILABLE_EXPORT | SQLITE_STAGING_READ_PROOF_LOCAL_ONLY | PUBLIC_SAFE | FIELD_LEVEL_COUNTS_V0_2.csv::exportGeneratedAt |

## Claim Boundary

Allowed claim reached: `SQLITE_STAGING_READ_PROOF_LOCAL_ONLY`.

Not claimed: live telemetry, production DB verification, provider-backed telemetry verification, authenticated internal rendered proof, full row-level completeness, production graph readiness, category recount, or Phase 2 insight report v0.2.

## Cleanup / Parking Decision

The SQLite file is parked as a local-only proof artifact under `.codex/project-context/.../local-proof/`. It is not connected to app/source, not exposed publicly, and not committed.
