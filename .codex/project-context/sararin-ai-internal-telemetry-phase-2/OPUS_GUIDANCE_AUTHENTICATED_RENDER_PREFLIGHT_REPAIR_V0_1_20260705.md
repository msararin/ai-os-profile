# Opus Guidance: Authenticated Render Preflight Repair v0.1

status: LOCAL_ONLY_PROVIDER_BACKED_REPAIR_GUIDANCE
provider_review_boundary: PROVIDER_BACKED_REPAIR_GUIDANCE_ONLY_NOT_TELEMETRY_VERIFICATION
opus_verdict: PROCEED_WITH_REPO_LOCAL_PLAYWRIGHT_AND_OWNER_STORAGE_STATE

## 1. Reviewer Metadata

Provider:

- `openrouter`

Model:

- requested: `anthropic/claude-opus-4.7`
- returned: `anthropic/claude-4.7-opus-20260416`

Run:

- run id: `opus-guidance-authenticated-render-preflight-repair-v0-1-rerun-20260705`
- request id: `gen-1783344956-fjwTAJzIl2izopFsLldQ`
- response timestamp: `2026-07-06T13:36:20.380342Z`
- HTTP status: `200`
- latency seconds: `24.387154`
- prompt tokens: `2516`
- completion tokens: `2068`
- total tokens: `4584`
- cost telemetry status: `ACTUAL_PROVIDER_COST_CAPTURED`
- actual provider cost: `0.06428`

Boundary:

This is provider-backed repair guidance only. It is not provider-backed telemetry verification, production telemetry verification, live telemetry verification, authenticated rendered proof, or full row-level completeness proof.

## 2. Input Artifacts Reviewed

Opus reviewed summarized inputs from:

- `AUTHENTICATED_INTERNAL_SOURCE_RENDER_PREFLIGHT_REPAIR_RESULT_V0_1.md`
- `AUTHENTICATED_INTERNAL_SOURCE_RENDER_PREFLIGHT_REPAIR_VALIDATION_V0_1.md`
- `AUTHENTICATED_INTERNAL_SOURCE_RENDER_PREFLIGHT_REPAIR_EXECUTION_GATE_V0_1.md`
- `AUTHENTICATED_INTERNAL_SOURCE_RENDER_PREFLIGHT_REPAIR_PLAN_V0_1.md`
- `AUTHENTICATED_INTERNAL_SOURCE_RENDER_PREFLIGHT_CHECK_V0_1.md`
- `AUTHENTICATED_INTERNAL_SOURCE_RENDER_PROOF_EXECUTION_GATE_V0_1.md`
- `AUTHENTICATED_INTERNAL_SOURCE_RENDER_PROOF_PLAN_V0_1.md`
- `INTERNAL_TELEMETRY_LIVE_SOURCE_CONTRACT_V0_2.md`
- `SQLITE_STAGING_LOCAL_SOURCE_PROOF_REVIEW_RECEIPT_V0_1.md`

An initial Opus call returned `APPROVE WITH SMALL PATCH` for the review packet, requiring clearer storageState lifecycle, browser-binary policy, artifact redaction, and missing source/freshness stop conditions. The corrected packet included those repairs and produced the final guidance recorded here.

## 3. Summary Of Current Blocker

Opus summarized the blocker as:

- repo-local `@playwright/test@1.61.1` is present;
- Playwright CLI is available;
- Chromium browser binary is absent;
- Auth.js session handling for the protected route remains unresolved;
- current claim remains `SQLITE_STAGING_READ_PROOF_LOCAL_ONLY`.

## 4. Security/Auth Risk Assessment

Opus assessed the surface as high-sensitivity because it combines an Auth.js-protected route with internal telemetry.

Primary risks:

- storageState, cookies, tokens, or session material leaking through git, artifacts, screenshots, DOM dumps, traces, or logs;
- accidental auth bypass or Auth.js weakening;
- global browser install or host pollution;
- authenticated artifacts retaining PII or private rows;
- overclaiming authenticated proof from a render that lacks source/freshness fields.

## 5. Recommended Repair Path

Opus recommended a two-step, owner-gated path:

1. Owner-approved repo-local Chromium install for Playwright, version-matched to `@playwright/test@1.61.1`, optionally scoped with `PLAYWRIGHT_BROWSERS_PATH` inside a repo-ignored path.
2. Owner-provided Playwright `storageState.json` from a genuine interactive login, stored outside git with strict lifecycle controls, then loaded read-only by the proof runner.

The Playwright run must not mutate auth flow, bypass Auth.js, or weaken route protection.

## 6. Acceptable Auth-Safe Session Options

Preferred:

- owner-provided Playwright `storageState` captured from a genuine Auth.js login;
- stored outside git and outside public artifact folders;
- file mode `0600`;
- path referenced only as a redacted/local-only reference;
- expiry or deletion decision recorded;
- destroyed after proof unless owner explicitly parks it local-only;
- never committed, copied into markdown, or included in screenshots/logs/traces.

Acceptable fallback:

- manual owner-observed render session where the owner drives the browser and observes source/freshness fields.

Not acceptable:

- test-only auth backdoor;
- mocked session cookie;
- forged JWT;
- disabling middleware;
- environment flag that weakens route protection;
- shared or committed session file.

## 7. Browser Binary Policy Recommendation

Opus recommends:

- repo-local browser install only;
- Chromium-only;
- version matched to `@playwright/test@1.61.1`;
- no global npm/system install;
- no `--with-deps` system package changes without explicit owner approval;
- install path recorded;
- cache size noted;
- browser binary install treated as tooling readiness only.

Browser binary installation alone does not upgrade the claim level.

## 8. Forbidden Shortcuts

Never do:

- auth bypass;
- hardcoded secrets;
- committed storageState;
- mock sessions;
- public exposure of internal telemetry;
- screenshotting or logging cookies/tokens;
- embedding storageState path or contents in markdown;
- weakening Auth.js callbacks or middleware;
- running against production DB as part of this lane;
- claiming live, production, or provider-backed telemetry from browser tooling.

## 9. Required Preflight Checks

Before proof execution:

- confirm repo-local Playwright version pin;
- confirm Chromium installed at recorded repo-local path;
- confirm storageState exists, is `0600`, outside git, gitignored, and referenced only in redacted form;
- confirm target route is the real Auth.js-protected internal route and unchanged;
- confirm SQLite staging source backing path is unchanged;
- confirm artifact scrubbing process for screenshots, DOM, HTML, traces, and logs;
- confirm stop-condition logic for missing, empty, stale, or non-source-backed source/freshness fields;
- confirm storageState destruction or expiry decision.

## 10. Required Proof Evidence

Later proof may claim authenticated rendered local proof only with:

- authenticated render of the protected internal route;
- visible source attribution and freshness metadata tied to the internal SQLite staging source;
- scrubbed screenshot;
- scrubbed DOM or HTML excerpt;
- redacted run log showing storageState loaded from a local-only path without contents;
- explicit statement: local-only, not production, not live telemetry, not provider-backed telemetry verification.

## 11. Claim Ladder Recommendation

Current claim:

`SQLITE_STAGING_READ_PROOF_LOCAL_ONLY`

If a later authenticated render proof succeeds with source/freshness fields:

`AUTHENTICATED_INTERNAL_SOURCE_RENDERED_LOCAL_PROOF`

If manual owner-observed evidence is used only:

`AUTHENTICATED_INTERNAL_SOURCE_RENDERED_MANUAL_OWNER_OBSERVED_DOWNGRADED_PROOF`

If auth/session cannot be established:

remain at `SQLITE_STAGING_READ_PROOF_LOCAL_ONLY` and park render proof.

Never advance to live, production DB, provider-backed telemetry, full row-level completeness, or production graph readiness from this path.

## 12. Package/Dependency Handling Recommendation

Opus recommends:

- keep `@playwright/test@1.61.1` repo-local;
- do not commit storageState;
- do not commit browser binaries;
- commit dependency change only after successful proof run or explicit owner decision;
- otherwise keep dependency change parked on the branch.

## 13. Stop Conditions

Stop if:

- Chromium install fails or requires global/system changes without approval;
- storageState is unavailable, expired, or cannot meet lifecycle policy;
- route renders but source/freshness fields are missing, empty, stale beyond threshold, or not visibly source-backed;
- any artifact contains unredacted secrets, cookies, tokens, PII, or private rows;
- any change would weaken Auth.js or route protection.

## 14. Verdict

Primary Opus verdict:

`PROCEED_WITH_REPO_LOCAL_PLAYWRIGHT_AND_OWNER_STORAGE_STATE`

Fallback if storageState cannot meet lifecycle policy:

`PROCEED_WITH_MANUAL_OWNER_OBSERVED_DOWNGRADED_PROOF`

If neither is safe:

`PARK_RENDER_PROOF_UNTIL_AUTH_RUNNER_EXISTS`

## 15. Recommended Next Artifact Only

Opus recommended next artifact:

`AUTHENTICATED_INTERNAL_SOURCE_RENDER_PROOF_PREFLIGHT_EXECUTION_PLAN_V0_1.md`

Required content:

- storageState lifecycle;
- repo-local Chromium install policy;
- preflight checks;
- stop conditions;
- artifact redaction;
- claim ladder;
- explicit owner approval boundary before execution.
