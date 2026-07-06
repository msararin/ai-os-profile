# SQLite Staging Local Source Proof Telemetry Receipt v0.1

source_of_truth: sararin.ai internal telemetry / system health hybrid lane
status: LOCAL_ONLY_SQLITE_STAGING_READ_PROOF
created_at: 2026-07-06T12:15:10Z
claim_level: SQLITE_STAGING_READ_PROOF_LOCAL_ONLY
sqlite_proof_file: .codex/project-context/sararin-ai-internal-telemetry-phase-2/local-proof/sqlite-staging-local-source-proof-v0-1/telemetry_staging_LOCAL_ONLY.sqlite


## Execution Boundary

Owner approval: `APPROVE_SQLITE_STAGING_LOCAL_SOURCE_PROOF_EXECUTION`.

Executed local-only SQLite staging proof. No app/source files, routes, deploys, commits, pushes, public pages, permanent skills, Robert KB files, or CASE-004 files were modified by the proof execution.

## Evidence Captured

- Schema/table list captured.
- Row count query captured.
- Freshness metadata query captured.
- Source mode/source badge query captured.
- Synthetic proof row query captured.

## Query Evidence

### Tables

| name |
| --- |
| internal_telemetry_events |
| telemetry_source_errors |
| telemetry_source_refresh_state |

### Row Count

| event_rows |
| --- |
| 3 |

### Freshness

| source_mode | last_refresh_at | last_row_inserted_at | source_record_count | display_record_count | freshness_status | freshness_window | source_lag_seconds | refresh_status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SQLITE_STAGING_LOCAL | 2026-07-06T12:15:10Z | 2026-07-06T12:15:10Z | 3 | 3 | FRESH | local proof execution instant | 0 | SUCCESS |

### Badge

| source_mode | claim_level | redaction_status | rows |
| --- | --- | --- | --- |
| SQLITE_STAGING_LOCAL | SQLITE_STAGING_READ_PROOF_LOCAL_ONLY | PUBLIC_SAFE | 3 |

### Sample Row

| telemetry_event_id | source_mode | operation_type | status | claim_level | redaction_status | raw_event_ref |
| --- | --- | --- | --- | --- | --- | --- |
| local-proof-field-count-001-3a859ceffdae | SQLITE_STAGING_LOCAL | field-count-row-staging-proof | FIELD_OBSERVED_IN_AVAILABLE_EXPORT | SQLITE_STAGING_READ_PROOF_LOCAL_ONLY | PUBLIC_SAFE | FIELD_LEVEL_COUNTS_V0_2.csv::exportGeneratedAt |

## Non-Claims

This receipt does not claim live telemetry, production DB verification, provider-backed telemetry verification, authenticated rendered proof, full row-level completeness, production graph readiness, category recount, or Phase 2 insight report v0.2.
