# ROUTE_LEDGER_SCOPED_GIT_DEPLOY_BRANCH_FOR_VERCEL_PRODUCTION_20260702

## Classification
- Route ledger type: AIOS-routed scoped git deployment branch preparation
- Task: Prepare scoped git deployment branch or PR for Vercel production deployment of sararin.ai Google-auth internal telemetry
- Date: 2026-07-02
- Claim level before push: DRAFT_LOCAL_ONLY_GIT_DEPLOY_PREP

## Source Of Truth
- /Users/apple/projects/ai-os-profile/ROUTE_LEDGER_VERCEL_DEPLOY_PATH_DECISION_20260702.md
- /Users/apple/projects/ai-os-profile/VERCEL_DEPLOY_PATH_DECISION_DASHBOARD_OR_GIT_BASED_20260702.md
- /Users/apple/projects/ai-os-profile/VERCEL_DEPLOY_PATH_DECISION_RECEIPT_20260702.md
- /Users/apple/projects/ai-os-profile-production-auth-telemetry-20260702
- Isolated branch: production-google-auth-telemetry-20260702
- Expected isolated branch clean commit: ec64503
- Remote: git@github.com:msararin/ai-os-profile.git

## Current Status
- Current status: VERCEL_DEPLOY_PATH_DECISION_CREATED_LOCAL_ONLY
- Recommended path: USE_GIT_BASED_DEPLOYMENT_PATH
- Approved next action: PREPARE_SCOPED_GIT_DEPLOY_BRANCH_OR_PR_FOR_VERCEL_PRODUCTION

## Intended Role
- Prime Gate leads production claim movement after a future deployment event.
- Codex may prepare the scoped git branch / PR / deploy handoff only.
- Vercel/GitHub deployment event remains a separate gate.

## Actual Worker
- Actual worker: Codex
- Worktree: /Users/apple/projects/ai-os-profile-production-auth-telemetry-20260702
- Scope: local validation, scope inspection, optional branch push if clean

## Forbidden Actions
- Do not use Vercel CLI deploy.
- Do not run `vercel pull`.
- Do not deploy in this run unless explicitly gated and intentional.
- Do not expose secrets.
- Do not mutate SQLite.
- Do not claim production auth.
- Do not claim production telemetry.
- Do not claim sararin.ai live proof.
- Do not claim go-live.
- Do not make `/internal/telemetry` public.
- Do not include unrelated dirty main-worktree changes.
- Do not push if scoped branch content is not clean and validated.

## Required Checks
- Confirm branch name.
- Confirm HEAD commit.
- Confirm git status.
- Confirm remote.
- Confirm diff scope includes only Google-auth internal telemetry/dashboard/supporting artifacts and route/receipt evidence.
- Confirm no unrelated public-surface changes are included beyond the isolated branch baseline.
- Confirm no secrets or env files are committed.
- Confirm no SQLite DB files are committed.
- Run:
  - `pnpm typecheck`
  - `pnpm lint`
  - `pnpm build`
  - `git diff --check`
  - restricted overclaim scan

## Decision Options
- PUSH_SCOPED_BRANCH_FOR_VERCEL_GIT_DEPLOY
- CREATE_PR_HANDOFF_ONLY_NO_PUSH
- BLOCK_GIT_DEPLOY_PREP_WITH_REASON

## Claim Boundary
- If local only: DRAFT_LOCAL_ONLY_GIT_DEPLOY_PREP.
- If branch is pushed after clean validation: SCOPED_GIT_DEPLOY_BRANCH_READY_FOR_VERCEL_EVENT.
- No production auth, production telemetry, sararin.ai live, go-live, or deploy proof claim is allowed in this run.
