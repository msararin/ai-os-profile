# Known Counts And Uncertainty

status: PROJECT_CONTEXT_LOCAL_ONLY

## Known Phase 2 Counts

| Item | Value | Status | Notes |
|---|---:|---|---|
| Preserved baseline missing telemetry signals | 26959 | preserved_baseline | Baseline to keep visible; not independently revalidated in Phase C. |
| Directly observed bundled-export warning rows sum | 26957 | observed_bundled_export_sum | Source-limited dashboard-shaped bundled export value. |
| Unreproduced delta | 2 | unresolved | Difference between preserved baseline and observed bundled-export warning-row sum. |
| `gate_claim_mapping_missing` | 18019 | untrusted_pending_reproduction | Present in v0.1 report but not trusted enough for stronger claims. |
| `gate_claim_mapping_missing` share of observed missing signals | 66.84% | source_limited | Calculated from the currently observed missing-signal denominator; must be reproduced before strong claims. |

## Current Interpretation

The counts indicate a source-limited data-quality backlog and validation problem, not a production telemetry completeness proof. `gate_claim_mapping_missing` may be analytically important, but it must be reproduced from clear rules and source evidence or downgraded.

## Required Reconciliation Questions

- Which artifact is the authoritative source for the preserved baseline?
- Which bundled-export warning rows are included in the observed sum?
- What explains the delta of 2?
- What exact inclusion/exclusion rules produced `gate_claim_mapping_missing = 18019`?
- Does the source expose enough row-level evidence to validate the category, or must it remain downgraded?

## Confidence

- Safe deployed route boundary: medium to high, based on commit and proof artifacts.
- Phase 2 aggregate counts: medium, because they are dashboard-shaped and source-limited.
- `gate_claim_mapping_missing = 18019`: low to medium until reproduced.
- Full row-level completeness: not supported.
