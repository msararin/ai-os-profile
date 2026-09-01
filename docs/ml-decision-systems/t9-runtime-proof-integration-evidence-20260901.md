# T9 Runtime Proof Integration Evidence

Date: 2026-09-01

Status: `PASS_WITH_OWNER_ACCEPTED_RISK / DESKTOP_FIRST_SOURCE_BUILD_VALIDATED`

## Route Ledger

| Field | Contract |
| --- | --- |
| Outcome | Add a desktop-first, source/build-validated presentation of the tested T8 Databricks proof without requiring privileged Databricks access or conflating it with ML/LLM evidence. |
| Lane | T9 public-safe Cockpit evidence integration only. |
| Source | Accepted T8R runtime receipt and event-ledger contract, reconciled onto the release line at commit `c9a690662fb803e9c5c1b1b2d419eab5b7e1af6b`. |
| Allowed | New Runtime Proof component, Cockpit mount/date reconciliation, deterministic surface validator, this phase receipt. |
| Forbidden | Main navigation promotion, legacy deletion, Databricks writes, TEST access, training/scoring, model/registry/artifact mutation, production/deployment claim. |
| Stop gates | Runtime/static blur; ML/LLM/governance conflation; missing custody boundary; disclosure of credentials/private paths; loss of legacy content; any unsupported rendered/responsive/interactive claim. |
| Rollback | Revert T9 component/mount/test/evidence only. T8/T8R ledger, runtime tables, and T5–T7 content remain unchanged. |

## Implemented meaning

- Adds a visible `Governance Runtime Proof` section after the current evidence snapshot.
- Separates `ML / Decision Evidence`, `LLM / Agent Assurance`, and `Governance Runtime Proof` before presenting the detailed receipt.
- Uses progressive disclosure: the main page shows the bounded outcome; exact controls, retained IDs, failures, and caveats remain inside `View tested proof`.
- Does not require a Databricks login and does not expose workspace credentials or private links.
- States that evidence is owner-operated and reconciled, not a direct connector transcript.

## Claim boundary

T9 may claim that owner-supplied Databricks outputs were reconciled into a desktop-first public-safe component and that the local source contract, typecheck, lint, build, and prerender checks passed. It may not claim rendered desktop quality, tablet/mobile support, responsive behavior, expanded/collapsed interaction, horizontal-table behavior, keyboard/focus behavior, independent Databricks authentication, production verification, model-quality validation, TEST access, multi-writer safety, deployment, or live-route verification.

## Owner-authorized validation boundary

On 2026-09-01, the owner explicitly deferred the following T9 acceptance checks and directed the phase to use desktop as its primary design target:

1. desktop/tablet/mobile viewport comparison;
2. rendered collapsed/expanded evidence behavior;
3. rendered horizontal-table behavior;
4. keyboard/focus interaction;
5. responsive layout.

These five check results are scope deferrals, not individual PASS results. They remain `NOT_VERIFIED / DEFERRED_BEFORE_DEPLOYMENT`. T9 must not be used as deployment or live-route authorization. Any later phase that requests push, preview promotion, merge, or deployment must restore these gates or obtain a new explicit owner decision with the resulting public risk stated.

## Owner risk acceptance and phase closeout

On 2026-09-01, after the narrowed candidate passed source-contract validation, event-ledger regression, typecheck, lint, production build/prerender, QA Sentinel review, and simulated stakeholder review, the owner explicitly accepted the residual risk created by the unavailable rendered preview and directed T9 to close as PASS.

The calibrated closeout label is:

`PASS_WITH_OWNER_ACCEPTED_RISK / DESKTOP_FIRST_SOURCE_BUILD_VALIDATED`

This PASS means:

- T9 source integration, evidence classification, custody wording, claim boundary, local validation, and production build/prerender are accepted;
- T9 is not a blocker to beginning the next authorized phase;
- the owner accepts that the rendered page cannot be inspected in the current environment.

This PASS does not mean:

- rendered desktop appearance passed;
- tablet/mobile or responsive behavior passed;
- details open/close, horizontal-table behavior, or keyboard/focus interaction passed;
- preview, live route, deployment, production, or public-release behavior passed.

Residual-risk owner: project owner. Reopen trigger: any preview, push, merge, deployment, or public-release request. Required mitigation at that trigger: restore the five deferred rendered/interaction checks and record the result before making a visual, responsive, interactive, live-route, or deployment claim.

### Deploy-time owner decision — 2026-09-01

The deployment trigger reopened the five deferred checks. The owner then directed that the new version be deployed today, after previously accepting the inability to inspect the rendered preview, because further delay was not acceptable. This is recorded as a bounded deploy-time risk decision: deploy may proceed after deterministic preflight and independent release review, while the five visual/interaction checks remain `NOT_VERIFIED / OWNER_ACCEPTED_RISK`. No rendered, responsive, interaction, or production-behavior PASS may be inferred from that decision. The live route must be checked after deployment to the extent the available environment permits.

## Validation required before T9 owner review

- `pnpm test:nbo-runtime-proof-surface`
- `pnpm test:nbo-event-ledger`
- `pnpm typecheck`
- `pnpm build`
- legacy-content and route regression
- QA Sentinel review bound to the frozen candidate tree
- fresh `SIMULATED_STAKEHOLDER_LENS_ONLY` review bound to the same tree

Rendered viewport and interaction checks are deferred by the owner decision above and are not part of the T9 commit claim.

## Current validation receipt

| Check | Result | Boundary |
| --- | --- | --- |
| Runtime-proof surface contract | PASS | Local deterministic source contract |
| Event-ledger regression | PASS | Local SQLite behavioral mirror + SQL static checks |
| TypeScript | PASS | `tsc --noEmit` |
| Production build | PASS | Next.js compiled and prerendered 47/47 pages, including the NBO-NRT route |
| Local preview server | PASS on `127.0.0.1:3010` | Server start only; not visual evidence |
| Playwright viewport render | NOT VERIFIED / DEFERRED | Installed Playwright lacked a usable browser binary; retained binaries crashed with `SIGSEGV`; owner deferred this gate from T9 |
| Cloud-browser fallback | NOT VERIFIED / DEFERRED | Cloud browser could not reach the local-only preview and the connection timed out; no rendered claim is made |

The phase does not claim pixel, responsive, or interactive visual PASS from source/build evidence. No deploy or live-route verification is authorized in T9. The deferred checks must remain visible in the owner packet and future deployment gate.
