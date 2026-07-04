# TELEMETRY_RECEIPT_MINIMAL_4_GRAPH_TIME_FILTER_ALIGNMENT_20260704

## Source of truth

sararin.ai internal telemetry / system health hybrid lane.

## AIOS enforcement

- Version: v0.2
- Status: AVAILABLE
- Path: `/Users/apple/robert-knowledge-base/02_execution_control/aios_enforcement/AIOS_ENFORCEMENT_V0_2.md`
- Source: canonical
- Claim level: v0.2_loaded

## Safe checkpoint

- Label: `SYSTEM_HEALTH_CLICKABLE_GATEWAY_OWNER_ACCEPTED_SAFE_CHECKPOINT_BEFORE_4_GRAPH_TIME_FILTER_PATCH`
- Commit: `3e0eff3e32055db8752d0c1efec9850e651c92fb`

## Owner decision

`APPROVE_MINIMAL_4_GRAPH_ALIGNMENT_WITH_DISABLED_TIME_FILTER_DISCLOSURE`

## Changes receipted

- `/internal/telemetry` first-screen graph section aligned to four executive labels:
  - `Model Spend & Usage`
  - `Role vs Task / Artifact`
  - `Evidence Tier vs Claim Level`
  - `Missing Telemetry Coverage`
- Added disabled/limited time-window status control above the graph section.
- Preserved details and receipt tables below the graph-first section.
- No public System Health page change included.

## Time-window disclosure behavior

- Default displayed state: `All available`.
- Disabled/unavailable states shown for:
  - `Last 24 hours`
  - `Last 7 days`
  - `Last 30 days`
  - `Custom range`
- Required disclosures preserved:
  - `Time filtering limited because per-record telemetry timestamps are unavailable/incomplete.`
  - `All available only for bundled fallback export.`
  - `Batch/export timestamps describe snapshot generation, not telemetry event time.`

## Data and claim discipline

- Existing aggregate fallback data only.
- No fabricated provider/model/cost/token/timestamp values.
- Missing or insufficient telemetry remains shown as missing/unavailable state.
- Missing role, model, provider, receipt, timestamp, cost, and token evidence downgrades this receipt to DRAFT_LOCAL_ONLY.

## Validation

- `rtk pnpm typecheck`: PASS.
- `rtk pnpm build`: PASS.
- `rtk pnpm lint`: PASS with 5 pre-existing warnings.
- `rtk pnpm check:public-dashboard-leakage`: PASS.
- Local unauthenticated `/internal/telemetry`: `307` redirect to `/api/auth/signin?callbackUrl=/internal/telemetry`.
- Local public `/architecture/system-health`: `200`.
- Local public gateway HTML proof artifact: `LOCAL_PROOF_SYSTEM_HEALTH_GATEWAY_AFTER_4_GRAPH_PATCH_20260704.html`.

## Preserved labels

- `BUNDLED_JSON_EXPORT`
- `FALLBACK_MODE_ACTIVE`
- `NOT_LIVE_DATABASE`
- `NOT_PRODUCTION_TELEMETRY_VERIFICATION`

## Remaining non-claims

- No provider-backed telemetry display claim.
- No full production telemetry verification claim.
- No live database telemetry claim.
- No owner authenticated rendered proof claim.
- No browser backend proof claim.
- No provider-backed or independent external Opus review claim.
- No autonomous or multi-agent proof claim.

## Final claim level

DRAFT_LOCAL_ONLY_INTERNAL_UI_ALIGNMENT_WITH_DISABLED_TIME_FILTER_DISCLOSURE.
