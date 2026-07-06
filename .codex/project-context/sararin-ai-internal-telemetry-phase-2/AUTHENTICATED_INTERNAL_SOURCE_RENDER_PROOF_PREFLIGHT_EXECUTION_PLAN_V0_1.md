# Authenticated Internal Source Render Proof Preflight Execution Plan v0.1

status: LOCAL_ONLY_EXECUTION_PLAN
owner_approval: APPROVE_AUTHENTICATED_RENDER_PREFLIGHT_EXECUTION_PLAN_WITH_REPO_LOCAL_CHROMIUM_AND_OWNER_STORAGE_STATE
current_claim_level: SQLITE_STAGING_READ_PROOF_LOCAL_ONLY

## 1. Source Of Truth

sararin.ai internal telemetry / system health hybrid lane.

AIOS enforcement loaded for this planning task:

- `AIOS_ENFORCEMENT_VERSION=v0.2`
- `AIOS_ENFORCEMENT_STATUS=AVAILABLE`
- `AIOS_ENFORCEMENT_PATH=/Users/apple/robert-knowledge-base/02_execution_control/aios_enforcement/AIOS_ENFORCEMENT_V0_2.md`
- `AIOS_ENFORCEMENT_CLAIM_LEVEL=v0.2_loaded`

Provider review boundary:

Opus guidance is provider-backed repair guidance only. It is not provider-backed telemetry verification, production telemetry verification, live telemetry verification, authenticated rendered proof, or full row-level completeness proof.

## 2. Current Task

Create authenticated internal source render proof preflight execution plan only.

This plan defines the owner-approved path to prepare repo-local Chromium and owner-provided Playwright storageState safely before any future authenticated internal source render proof execution.

This task does not install Chromium, create storageState, run authenticated render proof, patch app/source, deploy, or claim authenticated rendered proof.

## 3. Owner Approval

Owner approval for this planning task:

`APPROVE_AUTHENTICATED_RENDER_PREFLIGHT_EXECUTION_PLAN_WITH_REPO_LOCAL_CHROMIUM_AND_OWNER_STORAGE_STATE`

This approval permits planning only.

It does not permit:

- Chromium/browser binary install;
- storageState creation;
- authenticated browser proof execution;
- source/app patching;
- deploy, commit, or push;
- claim promotion.

## 4. Current Claim Level

Current accepted claim level:

`SQLITE_STAGING_READ_PROOF_LOCAL_ONLY`

This plan does not move the claim level.

## 5. Opus Verdict Summary

Opus guidance artifact:

`OPUS_GUIDANCE_AUTHENTICATED_RENDER_PREFLIGHT_REPAIR_V0_1_20260705.md`

Primary Opus verdict:

`PROCEED_WITH_REPO_LOCAL_PLAYWRIGHT_AND_OWNER_STORAGE_STATE`

Fallback if storageState cannot meet lifecycle policy:

`PROCEED_WITH_MANUAL_OWNER_OBSERVED_DOWNGRADED_PROOF`

Parking condition:

`PARK_RENDER_PROOF_UNTIL_AUTH_RUNNER_EXISTS`

Opus recommended next artifact:

`AUTHENTICATED_INTERNAL_SOURCE_RENDER_PROOF_PREFLIGHT_EXECUTION_PLAN_V0_1.md`

## 6. Current Tooling State

Current tooling state from the repair result:

| Item | State |
|---|---|
| `@playwright/test` | repo-local dev dependency installed |
| Playwright version | `1.61.1` |
| Playwright CLI | available |
| Playwright Chromium binary | not installed |
| Browser launch | blocked by missing executable |
| Screenshot capability | available only after browser launch succeeds |
| Auth/session handling | unresolved |
| Current proof claim | unchanged at `SQLITE_STAGING_READ_PROOF_LOCAL_ONLY` |

Package files already modified by the prior repair task:

- `package.json`
- `pnpm-lock.yaml`

This execution-plan task does not modify package files.

## 7. Browser Binary Execution Plan

Future command candidate:

```sh
pnpm exec playwright install chromium
```

Execution rules:

- run only after separate owner approval;
- install Chromium only;
- do not use global package install;
- do not use `--with-deps` unless separately approved;
- record install location;
- record cache size if practical;
- record whether `PLAYWRIGHT_BROWSERS_PATH` was used;
- do not commit browser binaries;
- do not treat browser binary installation as proof.

Network requirement:

The command requires network access to download Playwright browser binaries. If network access or sandbox escalation is needed, request approval before running.

Cache/location disclosure:

The prior dry-run indicated browser assets would be placed in the Playwright cache, including Chromium, FFmpeg, and Chrome Headless Shell. A future execution must record the actual path after install.

Validation commands after future install:

```sh
pnpm exec playwright --version
node -e "const { chromium } = require('@playwright/test'); (async () => { const browser = await chromium.launch({ headless: true }); const page = await browser.newPage(); await page.goto('about:blank'); await browser.close(); console.log('safe_browser_launch=pass'); })();"
```

Safe browser launch check:

- use `about:blank`;
- do not access internal routes;
- do not use storageState;
- do not capture internal data;
- do not claim authenticated proof.

## 8. Owner StorageState Execution Plan

Future storageState must be created only by the owner through a genuine authenticated browser session.

Allowed future flow:

1. Owner authenticates through the real Auth.js flow.
2. A Playwright storageState file is produced from that authenticated session only after owner approval.
3. The proof runner loads the storageState read-only.
4. The proof runner does not bypass Auth.js, forge cookies, mock JWTs, or weaken middleware.

StorageState must not be created in this plan task.

StorageState must not be used for a full render proof until a later execution gate and owner approval exist.

## 9. StorageState Location Rule

StorageState must be stored outside git and outside public artifact folders.

Allowed location class:

- local-only owner-controlled path;
- ignored/non-repo path;
- path recorded only as a redacted handle, such as `<LOCAL_ONLY_OWNER_STORAGE_STATE>`.

Forbidden location class:

- repo tracked path;
- public folder;
- `.codex/project-context` artifact path if it risks accidental commit;
- markdown content;
- screenshot, trace, DOM, HTML, or log output.

## 10. StorageState Permission Rule

Required file permission:

```sh
chmod 0600 <storageState>
```

Future validation command:

```sh
stat -f "%OLp %N" <storageState>
```

Validation must confirm permission mode `600`.

If permission cannot be confirmed, stop.

## 11. StorageState Expiry/Destruction Policy

Future storageState execution must define one owner-approved policy before use:

Option A:

- destroy storageState immediately after proof execution;
- record destruction timestamp;
- do not retain browser storage state.

Option B:

- park storageState local-only for a bounded period;
- record expiry timestamp;
- keep mode `0600`;
- keep outside git;
- record owner decision.

If neither policy is accepted, stop and do not execute authenticated proof.

## 12. Redaction And Artifact Leakage Rules

Artifacts must not contain:

- cookies;
- tokens;
- session identifiers;
- auth headers;
- storageState content;
- storageState full path in shareable artifacts;
- user PII;
- private telemetry rows;
- secrets;
- raw provider receipts not approved for the proof.

Artifact types requiring redaction review:

- screenshot;
- DOM excerpt;
- saved HTML;
- Playwright traces;
- Playwright videos;
- console logs;
- network logs;
- run logs;
- markdown receipts.

If redaction cannot be guaranteed, do not retain the artifact and do not claim proof.

## 13. Auth/Session Safety Rules

Required:

- Auth.js gate remains intact.
- StorageState must originate from a genuine owner-authenticated login.
- StorageState is loaded read-only.
- No credentials are typed by automation unless owner explicitly approves a safe local-only flow.
- No cookie/token/session values are printed.
- Unauthenticated access must remain protected.
- Any unexpected redirect, auth error, or session mismatch stops the proof.

Forbidden:

- auth bypass;
- disabled Auth.js gate;
- mocked session cookie;
- forged JWT;
- hardcoded production secrets;
- test-only public bypass route;
- public exposure of internal telemetry;
- committed storageState.

## 14. Forbidden Shortcuts

Forbidden shortcuts:

- no Chromium/browser binary install in this plan task;
- no storageState creation in this plan task;
- no authenticated render proof execution in this plan task;
- no global package install;
- no auth bypass;
- no route creation;
- no app/source patch;
- no deploy;
- no commit;
- no push;
- no production DB claim;
- no provider-backed telemetry verification claim;
- no live telemetry claim;
- no authenticated rendered proof claim;
- no full row-level completeness claim;
- no production graph readiness claim.

## 15. Future Preflight Execution Steps, Not Executed Now

Future execution steps:

1. Confirm owner approval for Chromium and storageState execution gate.
2. Confirm current git status and package diff.
3. Confirm `@playwright/test@1.61.1` remains available.
4. Install Chromium with `pnpm exec playwright install chromium`.
5. Record browser install path and cache size.
6. Run safe `about:blank` browser launch check.
7. Owner creates storageState through real Auth.js login.
8. Confirm storageState is outside git.
9. Apply and verify `chmod 0600`.
10. Record redacted storageState handle.
11. Record expiry or destruction policy.
12. Confirm protected route source remains unchanged.
13. Confirm artifact redaction rules.
14. Stop before full authenticated render proof unless a separate proof execution approval exists.

## 16. Future Validation Commands, Not Executed Now

Future validation commands:

```sh
pnpm exec playwright --version
pnpm exec playwright install --dry-run chromium
pnpm exec playwright install chromium
node -e "const { chromium } = require('@playwright/test'); (async () => { const browser = await chromium.launch({ headless: true }); const page = await browser.newPage(); await page.goto('about:blank'); await browser.close(); console.log('safe_browser_launch=pass'); })();"
stat -f "%OLp %N" <storageState>
git diff --check
git status --short
git status --short -- app components pages src lib data
git status --short -- package.json pnpm-lock.yaml package-lock.json yarn.lock
git status --short -- app/org-roles/page.tsx app/achievements/page.tsx
```

These commands are listed for future execution only.

## 17. Future Acceptance Criteria

Future preflight execution can pass only if:

- owner approved execution explicitly;
- Chromium install succeeds without global/system changes;
- install path is recorded;
- Playwright version remains `1.61.1`;
- safe `about:blank` browser launch succeeds;
- storageState exists outside git;
- storageState permission is `0600`;
- storageState is referenced only by redacted handle;
- expiry/destruction policy is recorded;
- protected route source remains unchanged;
- no app/source files are modified;
- no route is created;
- no auth bypass exists;
- no secret is written to artifacts;
- no authenticated render proof is executed in the preflight unless separately approved.

## 18. Future Failure Modes And Downgrade Labels

| Failure mode | Downgrade label | Required action |
|---|---|---|
| Chromium install fails | `PREFLIGHT_CHROMIUM_INSTALL_FAILED` | Stop; do not run proof |
| Chromium install requires global/system changes | `PREFLIGHT_CHROMIUM_INSTALL_REQUIRES_UNAPPROVED_SYSTEM_CHANGE` | Stop; owner decision required |
| Browser launch fails | `PREFLIGHT_BROWSER_LAUNCH_FAILED` | Stop; repair browser tooling |
| storageState unavailable | `PREFLIGHT_STORAGE_STATE_UNAVAILABLE` | Stop or use manual downgraded fallback |
| storageState permission not `0600` | `PREFLIGHT_STORAGE_STATE_PERMISSION_UNSAFE` | Stop; fix permissions before use |
| storageState appears in git status | `PREFLIGHT_STORAGE_STATE_GIT_EXPOSURE_RISK` | Stop; remove from repo with owner-approved safe cleanup |
| Auth route changed | `PREFLIGHT_AUTH_ROUTE_CHANGED_REVIEW_REQUIRED` | Stop; review route diff |
| Redaction policy incomplete | `PREFLIGHT_REDACTION_POLICY_INCOMPLETE` | Stop; create redaction plan |

Manual fallback label:

`AUTHENTICATED_INTERNAL_SOURCE_RENDERED_MANUAL_OWNER_OBSERVED_DOWNGRADED_PROOF`

Parking label:

`PARK_RENDER_PROOF_UNTIL_AUTH_RUNNER_EXISTS`

## 19. Package/Dependency Handling Recommendation

Package/dependency guidance from Opus:

- keep `@playwright/test@1.61.1` repo-local;
- do not commit storageState;
- do not commit browser binaries;
- commit dependency change only after successful proof run or explicit owner decision;
- otherwise keep dependency change parked on the branch.

This plan does not change package files.

## 20. Conditions To Proceed To Actual Authenticated Render Proof

Proceed to actual authenticated render proof only after:

- Chromium install preflight passes;
- storageState lifecycle preflight passes;
- protected route source remains unchanged;
- source/freshness fields required by contract are known;
- screenshot/DOM/HTML redaction pipeline is defined;
- stop conditions are accepted;
- owner explicitly approves authenticated render proof execution.

Required proof evidence for later claim:

- authenticated render of protected route;
- source/freshness metadata visible;
- source attribution tied to internal SQLite staging source or declared internal source;
- scrubbed screenshot;
- scrubbed DOM or HTML excerpt;
- redacted run log showing storageState loaded by redacted handle only;
- explicit local-only non-claim language.

## 21. Non-Claims Preserved

Preserved non-claims:

- No Chromium/browser binary install.
- No storageState creation.
- No authenticated render proof execution.
- No app/source change.
- No route creation.
- No auth bypass.
- No deploy.
- No commit.
- No push.
- No production DB verification.
- No provider-backed telemetry verification.
- No live telemetry verification.
- No authenticated rendered proof.
- No full row-level completeness.
- No production graph readiness.
- No category recount.
- No Phase 2 insight report execution.
- No public page edit.
- No permanent skill modification.
- No Robert KB write.
- No CASE-004 touch.

## 22. Recommended Next Artifact Only

Recommended next artifact only:

`AUTHENTICATED_INTERNAL_SOURCE_RENDER_PREFLIGHT_CHROMIUM_AND_STORAGESTATE_EXECUTION_GATE_V0_1.md`

Purpose:

Define the exact owner-approved execution gate for Chromium install, storageState lifecycle validation, safe browser launch, and rerun readiness without executing the authenticated render proof.
