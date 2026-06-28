# P1D Route Ledger - sararin.ai Google OAuth Production Auth Prep

Date: 2026-06-28
Task: P1D - sararin.ai Google OAuth Production Auth Prep and Validation Plan
Source worktree: `/Users/apple/projects/ai-os-profile-p1c-auth-foundation`
Branch: `codex/p1c-auth-foundation`

## Owner Decision

Owner corrected the P1C closeout boundary:

- Do not attempt full Google OAuth callback testing on localhost.
- Local validation is sufficient only for build/typecheck/lint, route existence, unauthenticated redirect behavior, and no-secrets checks.
- Real Google OAuth validation must happen on `sararin.ai`.

## Production Auth Target

- Protected route: `https://sararin.ai/internal/dashboard`
- Google OAuth callback: `https://sararin.ai/api/auth/callback/google`
- Auth URL: `https://sararin.ai`

## Route Fields

| Field | Value |
| --- | --- |
| Acting role | Codex local executor/operator |
| Task type | AIOS-routed production-auth readiness planning and local validation |
| Selected route | Local repo artifact creation plus non-secret validation only |
| Model/provider | Codex session; exact runtime model/provider not exposed in local tool telemetry |
| Usage telemetry | Token/cost/provider usage not exposed by tool; cannot be used as AIOS optimization proof |
| Route reason | Owner requested P1D planning and validation boundary without deployment or local callback testing |
| Cheaper route considered | Local-only documentation and shell validation; USD 0 external provider spend |
| Cost cap | USD 0 external provider spend |
| Abort condition | Stop before deployment, browser OAuth validation, secret configuration, or P2 without explicit owner authorization |
| Telemetry capture method | Files created, git status, typecheck/build/lint/diff-check, secret scan, route/file existence checks |
| Human gate status | Owner correction received; deployment/auth validation still requires owner authorization |
| Output path | Source worktree root P1D files; Downloads owner packet if created |

## Evidence Boundary

Local evidence may support:

- Auth route exists.
- Internal dashboard route exists.
- `/internal/*` protection exists.
- Unauthenticated internal route redirects before login.
- Build/typecheck/lint/diff-check results.
- No secrets appear in tracked files based on local scan.

Local evidence may not support:

- Production Google OAuth owner login works.
- `sararin.ai` auth is verified.
- Surface Runner completed browser validation.
- Browser user is Lyn.
- Enterprise Zero Trust exists.
- Public live telemetry exists.
- Full LLMOps enforcement exists.

## Surface Runner Boundary

No claim of Surface Runner verification may be made unless browser validation is actually performed and browser evidence is captured. If not executed, status must be:

`SURFACE_RUNNER_PLAN_ONLY_NOT_EXECUTED`

## Downgrade Rule

If production browser evidence, deployment evidence, auth evidence, provider receipt, usage telemetry, or required role evidence is missing, final status must remain validation-pending and/or downgraded:

- `P1D_READY_FOR_SARARIN_AUTH_DEPLOYMENT_TEST`
- `P1D_BLOCKED_BY_MISSING_PRODUCTION_ENV`
- `P1D_BLOCKED_BY_DEPLOYMENT_AUTHORIZATION`
- `DRAFT_LOCAL_ONLY / DOWNGRADED_UNVERIFIED`

