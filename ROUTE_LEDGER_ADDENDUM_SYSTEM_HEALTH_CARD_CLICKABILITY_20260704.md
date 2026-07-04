# Route Ledger Addendum - System Health Card Clickability

task_id: 20260704-system-health-card-clickability
parent_task_id: 20260704-system-health-hybrid-telemetry-recovery
task_type: scoped_public_gateway_ui_patch
route_status: LOCAL_ONLY_JUSTIFIED
reason_code: CODEX_BOUNDED_PUBLIC_GATEWAY_CLICKABILITY_PATCH
risk_boundary: Public System Health gateway click target only; no internal telemetry rows/details on public pages.
role: Codex
selected_route: Codex local executor/operator
model_provider: ChatGPT/Codex interface
model_requested: not_exposed
model_returned: not_exposed
provider_path: not_exposed
route_reason: Owner reported visible `/architecture/system-health` internal telemetry access card is not clickable as expected.
cheaper_route_considered: Local source inspection and patch only; no Sonnet/Opus/provider call used.
cost_cap: USD 0 external provider spend
abort_condition: Stop if patch would make `/internal/telemetry` public, expose internal telemetry rows on public pages, remove fallback labels, or claim authenticated render proof.
telemetry_capture_method: Addendum ledger, local validation, live route checks, and HTML grep proof.
human_gate_status: Owner reported UX blocker; no owner login proof requested or claimed.
output_path: ROUTE_LEDGER_ADDENDUM_SYSTEM_HEALTH_CARD_CLICKABILITY_20260704.md

enforcement_version_requested: v0.2
enforcement_version_loaded: v0.2
enforcement_path: /Users/apple/robert-knowledge-base/02_execution_control/aios_enforcement/AIOS_ENFORCEMENT_V0_2.md
enforcement_status: AVAILABLE
resolver_status: AVAILABLE
fallback_used: false
fallback_reason: not_applicable
claim_level_impact: clickability may only be claimed after source and live HTML prove the card wrapper points to `/internal/telemetry`; owner visual acceptance still pending.

state_discipline_answer:
- Prior internal visual-dashboard commit did not fix public gateway card clickability.
- `app/architecture/system-health/page.tsx` must change for this blocker.
- Existing source had a small CTA link to `/internal/telemetry`, but the card container itself was not linked.

strict_boundaries:
- Do not use PR #23.
- Do not make `/internal/telemetry` public.
- Do not expose internal telemetry rows/details on public pages.
- Do not claim owner login proof.
- Do not claim rendered authenticated internal telemetry proof.
- Do not claim provider-backed telemetry display.
- Do not claim full production telemetry verification.
- Preserve `BUNDLED_JSON_EXPORT`, `FALLBACK_MODE_ACTIVE`, `NOT_LIVE_DATABASE`, and `NOT_PRODUCTION_TELEMETRY_VERIFICATION`.
