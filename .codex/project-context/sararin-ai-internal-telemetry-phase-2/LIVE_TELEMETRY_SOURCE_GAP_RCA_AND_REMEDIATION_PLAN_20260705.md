# Live Telemetry Source Gap RCA And Remediation Plan

status: LOCAL_ONLY_PLANNING_ARTIFACT
close_label_to_preserve: DATA_TEAM_PERMANENT_CAPABILITY_PUBLIC_SURFACE_LIVE_WITH_BOUNDARIES

## 1. Source of Truth

sararin.ai internal telemetry / system health hybrid lane.

Latest completed public capability surface:

- Data Team permanent capability is live on `/org-roles` with boundaries.
- Live page: `https://sararin.ai/org-roles`
- Deployed commit: `472ec8d107dadaed5a22cdf9748ffca152ab4f1f`
- Deployment: `dpl_9wDx6iqG6t77qLjbAkFv7PKwxMyh`

Current telemetry source boundary:

- The available Phase 2 source is dashboard-shaped bundled export evidence.
- `data/internal-telemetry/telemetry-dashboard-export.json` exists as bundled export evidence.
- `FIELD_INVENTORY_V0_2.md` exists local-only.
- `FIELD_LEVEL_COUNTS_V0_2.csv` exists local-only and was created from the available bundled export only.
- No category recount was executed.
- No unresolved counts were validated or confirmed.

## 2. Current Task

Create a live telemetry source gap RCA and remediation plan only.

This artifact defines how to move from `BUNDLED_JSON_EXPORT` / `NOT_LIVE_DATABASE` toward a proven authenticated internal telemetry data source with freshness evidence, without overclaiming.

## 3. Current Proven Data Source State

| Source / artifact | Current source mode | What it can support | What it cannot support |
|---|---|---|---|
| `data/internal-telemetry/telemetry-dashboard-export.json` | bundled JSON export | source-limited profiling, field inventory, export-shape inspection, dashboard warning review | live update proof, production DB proof, provider-backed proof, full row-level completeness |
| `FIELD_INVENTORY_V0_2.md` | local-only inventory from available export | field existence and source-shape notes from the available artifact | final source contract, category validation, live source verification |
| `FIELD_LEVEL_COUNTS_V0_2.csv` | local-only counts from available export | field-level counts inside the export scope | category recount, raw row-level completeness, live production completeness |
| public/system-health evidence | public gateway and status framing | owner-readable boundary messaging and public-safe access framing | proof that internal telemetry rows continuously update from a live source |

Current unresolved/source-limited count facts:

- Preserved baseline missing telemetry signals: `26959`.
- Observed bundled-export warning-row sum: `26957`.
- Delta: `2`.
- `gate_claim_mapping_missing = 18019` remains unresolved.
- `66.84%` remains unresolved.

These values may be discussed only as unresolved/source-limited context. They are not validated counts.

## 4. Current Non-Claims

Preserve these non-claims:

- No production telemetry verification claim.
- No provider-backed telemetry display verification claim.
- No full row-level completeness claim.
- No live monitoring claim.
- No production graph readiness claim.
- No category recount claim.
- No Phase 2 insight report v0.2 claim.
- No SQLite staging index claim.
- No production DB source claim.
- No `/internal/telemetry/data-quality` route claim.
- No owner authenticated rendered proof claim.

## 5. Why Current State Is Not Live Telemetry Proof

The current evidence is not live telemetry proof because the strongest available source is a dashboard-shaped bundled export. A bundled export can be inspected and profiled, but it does not prove that new telemetry rows are continuously written, refreshed, queried, or rendered from a production source.

Specific gaps:

- The export does not prove a live write path.
- The export does not prove a live read path.
- The export does not prove row insertion freshness.
- The export does not expose a source contract with `last_refresh_at`, `last_row_inserted_at`, or source/display record count reconciliation.
- The export does not establish whether displayed rows equal source rows.
- The export does not include provider/API receipt proof for current production telemetry display.
- The export cannot prove that authenticated internal rendering is using a live data source.

Therefore the correct claim remains source-limited profiling from bundled export evidence, not live telemetry verification.

## 6. Data Source Options

| Option | Description | Supported claim level | Key limits |
|---|---|---|---|
| Bundled JSON export | Existing checked/exported JSON source used by the current internal telemetry display or analysis lane. | `EXPORT_PROFILED` | Static. Does not prove refresh, live writes, or production source completeness. |
| Regenerated static export | A rerun export generated from a controlled source at a known time. | `SOURCE_REFRESH_VERIFIED` if generation time and source scope are recorded | Still static after generation. Freshness is point-in-time only. |
| SQLite staging | Local staging table populated from export or controlled ingestion for repeatable checks. | `SQLITE_STAGING_READ_PROOF_LOCAL_ONLY` | Local-only. Not production DB. Must not be presented as live telemetry. |
| Production DB | Authenticated production database or managed storage backing internal telemetry. | `PRODUCTION_DB_SOURCE_VERIFIED` after row-source and freshness proof | Requires safe access, schema contract, record reconciliation, and no secret exposure. |
| Provider/API sync | Provider receipts or APIs used to populate telemetry from upstream systems. | `PROVIDER_BACKED_TELEMETRY_VERIFIED` only with provider/API receipts and source-display reconciliation | Requires provider evidence and exact mapping to displayed telemetry rows. |
| Log-derived telemetry | Application/platform logs transformed into telemetry rows. | source-specific proof depending on log access, schema, and ingestion evidence | Logs can show events but may not prove complete semantic telemetry without ingestion and coverage checks. |

## 7. Recommended Staged Remediation Path

### Phase F: RCA / Remediation Plan Only

Current artifact.

Allowed output:

- source gap RCA;
- remediation plan;
- claim ladder;
- required source contract fields;
- stop conditions.

Forbidden in Phase F:

- app/source patch;
- route creation;
- SQLite staging implementation;
- production DB claim;
- provider-backed claim;
- live telemetry claim.

### Phase G: Internal Telemetry Live Source Contract v0.1

Define the source contract before implementation.

Required output:

- `INTERNAL_TELEMETRY_LIVE_SOURCE_CONTRACT_V0_1.md`
- exact required source fields;
- source modes and allowed claims;
- freshness metadata definitions;
- owner-readable tooltip/disclaimer copy;
- proof protocol checklist.

Exit condition:

- The source contract can be reviewed without implementing code or claiming live telemetry.

### Phase H: SQLite Staging / Local Source Proof Only, If Approved Later

Build or document local staging proof only after explicit approval.

Required proof:

- deterministic staging input;
- schema;
- row count;
- read query;
- source-to-display mapping;
- local-only non-claim.

Allowed claim after proof:

- `SQLITE_STAGING_READ_PROOF_LOCAL_ONLY`

Blocked claim:

- production DB source verified.

### Phase I: Authenticated Internal Rendered Source Proof

Only after browser/render proof capability is safe.

Required proof:

- authenticated internal page render;
- displayed source mode;
- displayed freshness metadata;
- displayed record count;
- no public exposure of internal rows;
- screenshot or saved HTML proof with secret-safe redaction.

Allowed claim after proof:

- `AUTHENTICATED_INTERNAL_SOURCE_RENDERED_LOCAL_PROOF`

Blocked claim:

- provider-backed telemetry verified unless provider receipts are also linked.

### Phase J: Production DB Or Provider-Backed Source Verification

Only after prior proof passes and source access is safe.

Required proof:

- production DB schema/source contract;
- production source query receipt or safe metadata receipt;
- provider/API receipt if claiming provider-backed;
- source record count and display record count reconciliation;
- freshness metadata;
- source limitation visible in UI;
- owner approval for claim promotion.

Allowed claims only when evidenced:

- `PRODUCTION_DB_SOURCE_VERIFIED`
- `PROVIDER_BACKED_TELEMETRY_VERIFIED`

## 8. Required Source Contract Fields

Minimum source contract fields:

| Field | Purpose | Required before stronger claim |
|---|---|---|
| `source_mode` | Names whether source is bundled export, regenerated export, SQLite staging, production DB, provider/API sync, or log-derived. | yes |
| `source_name` | Human-readable source label. | yes |
| `source_environment` | local, preview, production, provider, or unresolved. | yes |
| `source_generated_at` | When the source artifact/query output was generated. | yes for export/staging |
| `last_refresh_at` | When displayed telemetry was last refreshed from its source. | yes for refresh claim |
| `last_row_inserted_at` | Latest observed row insertion timestamp in source. | yes for live/update claim |
| `source_record_count` | Number of records in the source scope. | yes |
| `display_record_count` | Number of records displayed or query-visible in the internal surface. | yes |
| `source_query_scope` | Filters, time window, row type, and inclusion rules. | yes |
| `display_query_scope` | Filters and UI/query scope used for display. | yes |
| `source_checksum_or_receipt` | Stable evidence that source artifact/query was not silently changed. | recommended; required for repeatability |
| `provider_receipt_id` | Link to provider/API receipt when provider-backed claim is made. | required only for provider-backed claim |
| `redaction_policy` | States which fields are hidden and why. | yes for rendered proof |
| `claim_level` | Current maximum claim supported by evidence. | yes |

## 9. Required Freshness Metadata

Required fields:

- `source_mode`
- `last_refresh_at`
- `last_row_inserted_at`
- `source_record_count`
- `display_record_count`
- `freshness_status`

Recommended `freshness_status` values:

| Value | Meaning |
|---|---|
| `STATIC_EXPORT_ONLY` | Source is static and cannot prove live updates. |
| `REFRESHED_STATIC_EXPORT` | Static export was regenerated at a recorded time. |
| `LOCAL_STAGING_CURRENT` | Local staging source was populated/read in a controlled local run. |
| `AUTH_RENDERED_SOURCE_VISIBLE` | Authenticated internal render shows source metadata. |
| `PRODUCTION_SOURCE_CURRENT` | Production source freshness and row count are verified. |
| `PROVIDER_BACKED_CURRENT` | Provider/API source and display mapping are verified. |
| `STALE_OR_UNRESOLVED` | Freshness cannot be proven or has failed threshold. |

Owner-readable tooltip pattern:

```text
This telemetry view is currently source-limited. Source mode, refresh time, row freshness, and source/display counts must be visible before live telemetry claims are made.
```

## 10. Proof Protocol For Live / Update Claim

A live/update claim may be considered only when all steps pass:

1. Source contract exists and names `source_mode`.
2. Source read path is identified.
3. Source write or refresh path is identified.
4. `last_refresh_at` is observed from the actual source process, not manually guessed.
5. `last_row_inserted_at` is observed from source rows or reliable source metadata.
6. `source_record_count` is recorded from source scope.
7. `display_record_count` is recorded from internal display/query scope.
8. Source/display count reconciliation is documented.
9. Authenticated internal rendered proof shows source mode and freshness metadata.
10. Public route verification confirms internal rows are not exposed publicly.
11. If provider-backed claim is requested, provider/API receipt and row mapping are attached.
12. Claim level is updated only to the highest supported rung in the claim ladder.

If any step fails, the claim remains downgraded.

## 11. Claim Ladder

| Claim rung | Meaning | Minimum evidence | Must not imply |
|---|---|---|---|
| `EXPORT_PROFILED` | Static export was inspected/profiled. | bundled export artifact and source-limited notes | live updates, DB proof, provider-backed proof |
| `SOURCE_REFRESH_VERIFIED` | Static source was regenerated or refreshed at a recorded time. | regenerated artifact, timestamp, source scope, record count | continuous live source |
| `SQLITE_STAGING_READ_PROOF_LOCAL_ONLY` | Local staging can be read and counted reproducibly. | staging schema, local input, query, record count | production DB or live telemetry |
| `AUTHENTICATED_INTERNAL_SOURCE_RENDERED_LOCAL_PROOF` | Authenticated internal render shows source metadata locally or in safe proof. | authenticated render proof, metadata, redaction | provider-backed verification or full completeness |
| `PRODUCTION_DB_SOURCE_VERIFIED` | Production data source, freshness, and count reconciliation are verified. | production source metadata/query receipt, source/display counts, freshness | provider-backed unless provider receipts exist |
| `PROVIDER_BACKED_TELEMETRY_VERIFIED` | Provider/API source and displayed telemetry mapping are verified. | provider/API receipts, source mapping, display proof, freshness | full row-level completeness unless complete row scope is proven |

## 12. Stop Conditions

Stop and do not promote claims when:

- Source mode is unknown.
- Source path cannot be inspected safely.
- Freshness metadata is absent.
- `source_record_count` and `display_record_count` cannot be reconciled.
- Authenticated internal render proof is unavailable when display claims are requested.
- Provider/API receipts are unavailable when provider-backed claims are requested.
- Public routes expose internal rows or private telemetry.
- A task would require app/source changes without owner approval.
- A task would create SQLite staging, new route, graph implementation, or production DB access without explicit approval.
- Counts are unresolved or cannot be reproduced.

## 13. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Static export is mistaken for live telemetry | Overclaiming production state | Keep `source_mode` visible and claim ladder enforced. |
| Regenerated export is mistaken for continuous monitoring | False live-monitoring claim | Label as point-in-time refresh only. |
| SQLite staging is mistaken for production DB | Misleading production claim | Keep `LOCAL_ONLY` label and separate staging from production. |
| Authenticated proof exposes private data | Privacy/access failure | Use redaction policy and public/private route checks. |
| Provider-backed language appears without receipts | Unsupported provider claim | Require provider/API receipt and mapping proof. |
| Display count differs from source count | Bad owner decision support | Require reconciliation before stronger claim. |
| Old unresolved Phase 2 numbers are repeated as facts | Invalid count claim | Preserve them as unresolved/source-limited until reproduced. |

## 14. Non-Claims Preserved

This artifact does not claim:

- live telemetry verification;
- production DB source verification;
- provider-backed telemetry verification;
- full row-level completeness;
- live monitoring;
- production graph readiness;
- category recount;
- Phase 2 insight report v0.2 execution;
- SQLite staging implementation;
- new data-quality route implementation;
- owner authenticated rendered proof;
- public exposure of internal telemetry rows.

## 15. Recommended Next Artifact Only

`INTERNAL_TELEMETRY_LIVE_SOURCE_CONTRACT_V0_1.md`

Purpose:

Define the source contract, source modes, freshness metadata, source/display reconciliation requirements, claim ladder mapping, and owner-readable disclaimer copy before any implementation or stronger telemetry claim.
