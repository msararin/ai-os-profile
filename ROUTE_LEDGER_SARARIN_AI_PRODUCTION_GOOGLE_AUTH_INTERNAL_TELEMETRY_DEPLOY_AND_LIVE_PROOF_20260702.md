# ROUTE_LEDGER_SARARIN_AI_PRODUCTION_GOOGLE_AUTH_INTERNAL_TELEMETRY_DEPLOY_AND_LIVE_PROOF_20260702

## Classification
- Route ledger type: AIOS-routed production deploy and live proof ledger
- Task: Deploy sararin.ai production Google-auth internal telemetry and collect live proof with rollback support
- Date: 2026-07-02
- Initial claim level: PRODUCTION_LIVE_PROOF_PENDING_OPUS

## Source Of Truth
- /Users/apple/projects/ai-os-profile/ROUTE_LEDGER_PRODUCTION_OWNER_CONFIRMATION_FOR_DEPLOY_20260702.md
- /Users/apple/projects/ai-os-profile/PRODUCTION_ENV_CALLBACK_OWNER_CONFIRMATION_RECEIPT_20260702.md
- /Users/apple/projects/ai-os-profile/PRODUCTION_ENV_CALLBACK_BLOCKER_REPAIR_RECEIPT_20260702.md
- /Users/apple/projects/ai-os-profile/OPUS_PRODUCTION_ENV_CALLBACK_BLOCKER_REPAIR_RECEIPT_20260702.md
- /Users/apple/projects/ai-os-profile/SARARIN_AI_PRODUCTION_GOOGLE_AUTH_INTERNAL_TELEMETRY_DEPLOY_AUTHORIZATION_20260702.md
- /Users/apple/projects/ai-os-profile/app/internal/telemetry/page.tsx
- /Users/apple/projects/ai-os-profile/lib/telemetry-ledger/query.ts
- /Users/apple/projects/ai-os-profile/auth.ts
- /Users/apple/projects/ai-os-profile/proxy.ts

## Current Authorization
- Current status: PRODUCTION_OWNER_CONFIRMATION_ACCEPTED_READY_FOR_DEPLOY
- Owner decision: AUTHORIZE_PRODUCTION_DEPLOY_WITH_GOOGLE_AUTH_INTERNAL_TELEMETRY_AND_ROLLBACK_SUPPORT
- Confirmed by owner:
  - Production `AUTH_URL` or `NEXTAUTH_URL` is `https://sararin.ai`.
  - Google Console callback is `https://sararin.ai/api/auth/callback/google`.
  - Safe telemetry fallback is accepted if production telemetry data path is not configured yet.

## Intended Role
- Prime Gate leads production closeout and claim movement.
- Codex may perform scoped production deploy and validation only after pre-deploy validation and scope checks are clean.
- QA/manual visible rendered evidence replaces automated Surface Runner browser backend proof.
- Runner Gang/Sonnet is reserved for deterministic repair/validation issues if Opus requests it.

## Actual Worker
- Actual worker: Codex
- Worker scope: route ledger, validation, scoped deploy attempt only if safe, live proof receipt, and artifacts
- External reviewer required after live proof: OpenRouter Opus 4.7 Prime Gate

## Deployment Scope
- Deploy sararin.ai with `/internal/telemetry` protected by Google auth.
- Keep `/architecture/system-health/*` public-safe.
- Keep `/api/observability` public-safe.
- Keep `/internal/telemetry` private/internal only.
- Preserve safe telemetry fallback if production ledger path is unavailable.

## Pre-Deploy Stop Conditions
- Do not deploy if validation fails.
- Do not deploy if the working tree would include unrelated public-surface changes outside this authorized scope.
- Do not deploy if scoped auth/internal telemetry files are missing from the deploy input.
- Do not deploy if a rollback reference cannot be recorded or a rollback plan cannot be followed.
- If a stop condition appears, trigger Opus Prime Gate Repair Loop unless a real owner action is required.

## Forbidden Actions
- Do not expose secrets or OAuth values.
- Do not make `/internal/telemetry` public.
- Do not mutate SQLite.
- Do not claim production auth until live login/access proof exists.
- Do not claim production telemetry until live rendered evidence exists.
- Do not claim go-live until production proof and Prime Gate closeout exist.
- Do not claim provider-backed telemetry display unless Prime Gate approves after production rendered evidence.
- Do not claim automated Surface Runner proof.
- Do not claim browser-backend proof.
- Do not hide safe telemetry fallback if production data path is unavailable.

## Required Validation
- `git status --short`
- current commit/ref
- scoped files included
- rollback reference if available
- `pnpm typecheck`
- `pnpm lint`
- `pnpm build`
- `git diff --check`
- restricted overclaim scan

## Live Proof Requirements
- Production URL: `https://sararin.ai`
- Unauthenticated `/internal/telemetry` must redirect/sign-in gate and not render public dashboard.
- Allowed owner Google login must reach `/internal/telemetry` before production auth can be claimed.
- QA/manual visible rendered evidence must be recorded if browser backend remains parked.
- Public route regression:
  - `https://sararin.ai/architecture/system-health/monitoring`
  - `https://sararin.ai/architecture/system-health/observability`
  - `https://sararin.ai/api/observability`

## Rollback Triggers
- `/internal/telemetry` becomes publicly accessible.
- Production auth callback fails in a way that risks public site stability.
- Public routes regress.
- Secrets/env values are exposed.
- Production deploy/build fails.
- Auth redirects loop in a way that affects public routes.
- Unsafe private telemetry is exposed.
- Forbidden readiness/go-live wording appears.

## Required Artifacts
- /Users/apple/projects/ai-os-profile/SARARIN_AI_PRODUCTION_GOOGLE_AUTH_INTERNAL_TELEMETRY_DEPLOY_AND_LIVE_PROOF_20260702.md
- /Users/apple/projects/ai-os-profile/SARARIN_AI_PRODUCTION_GOOGLE_AUTH_INTERNAL_TELEMETRY_DEPLOY_AND_LIVE_PROOF_RECEIPT_20260702.md
- /Users/apple/projects/ai-os-profile/PRIME_GATE_SARARIN_AI_PRODUCTION_INTERNAL_TELEMETRY_CLOSEOUT_OPENROUTER_OPUS_20260702.md if deployment and proof advance to Prime Gate
- /Users/apple/projects/ai-os-profile/SARARIN_AI_INTERNAL_TELEMETRY_PRODUCTION_ROLLBACK_RECEIPT_20260702.md if rollback is triggered

## Claim Boundary
- Before Opus closeout: PRODUCTION_LIVE_PROOF_PENDING_OPUS
- If Opus accepts auth live with fallback only: OPUS_GATED_PRODUCTION_AUTH_LIVE_TELEMETRY_FALLBACK_ONLY
- If Opus accepts full scoped live telemetry: OPUS_GATED_PRODUCTION_INTERNAL_TELEMETRY_LIVE_WITH_SCOPE
- If blocked before deploy: no production auth, no production telemetry, no go-live claim
