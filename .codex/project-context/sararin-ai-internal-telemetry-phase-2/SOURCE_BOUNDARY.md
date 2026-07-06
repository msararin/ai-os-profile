# Source Boundary

status: PROJECT_CONTEXT_LOCAL_ONLY

## Source Mode

The currently available Phase 2 source is dashboard-shaped bundled export evidence and local receipt/proof artifacts. It is not raw row-level telemetry and does not establish live database completeness.

## Supported Use

This project context can support:

- source-limited semantic mapping;
- validation-plan design;
- category recount planning;
- explicit non-claim preservation;
- owner-readable explanation of uncertainty;
- preparation for later use of the Data Team permanent skills.

## Unsupported Use

This project context cannot support:

- production telemetry verification;
- live DB verification;
- full row-level completeness;
- provider-backed telemetry display verification;
- public telemetry inventory claims;
- graph/page production readiness;
- implementation of a new data-quality route;
- acceptance of v0.1 Phase 2 counts as final.

## Public/Private Boundary

- `/internal/telemetry` is private and Auth.js-gated when unauthenticated.
- `/architecture/system-health` is public gateway-only.
- Public pages must not expose internal telemetry rows.
- Private Internal Telemetry Access remains the intended access-boundary framing.

## Permanent Skill Boundary

The permanent Data Team skills teach reusable methodology. This adapter is where sararin.ai route names, counts, commit ids, artifact names, and owner concerns may live.
