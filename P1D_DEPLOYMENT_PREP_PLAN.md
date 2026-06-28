# P1D Deployment Prep Plan

Date: 2026-06-28
Branch: `codex/p1c-auth-foundation`

## Current Readiness

The branch is suitable for PR or deploy-preview preparation after local validation remains green. It is not suitable for a production-auth-success claim until browser evidence exists on `sararin.ai` or an authorized deployment URL.

## Preferred Deployment Path

1. Push `codex/p1c-auth-foundation` only after owner authorizes branch push.
2. Create PR or deploy preview if project policy allows preview deployments.
3. Configure owner-managed environment variables outside git:
   - `AUTH_SECRET`
   - `AUTH_URL=https://sararin.ai` for production, or preview URL for preview validation
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `INTERNAL_ALLOWED_EMAILS=msararin@gmail.com`
4. Configure Google Console callback URL:
   - Production: `https://sararin.ai/api/auth/callback/google`
   - Preview, if used: the preview deployment equivalent callback URL.
5. Validate browser auth using `P1D_SURFACE_RUNNER_SARARIN_AUTH_VALIDATION_PLAN.md`.
6. Only after production/authorized deployment evidence exists, consider merge/promote.

## Branch Push / PR / Preview Decision

| Question | Current Answer |
| --- | --- |
| Is branch ready for PR or deploy preview? | Ready after validation remains green; no secrets required in git |
| Should clean worktree branch be pushed now? | Not without explicit owner authorization in this task |
| Should owner configure Vercel env vars first? | Yes, before production or preview OAuth testing |
| Is Google Console callback configured? | Unknown; owner confirmation required |
| Is direct production only preferred by policy? | Not confirmed; direct production carries higher rollback pressure and requires owner confirmation |
| Is P2 dependency present? | No; P1D has no P2 dependency |

## Rollback Plan

If auth blocks the route incorrectly after deployment:

1. Do not expose internal data to bypass auth.
2. Revert or disable the auth branch deployment/promotion through the deployment platform.
3. Confirm public routes remain available.
4. Preserve error/browser evidence without secrets.
5. Re-open P1D with a bounded patch; do not proceed to P2.

## Risk Statement

Direct production validation on `sararin.ai` is the correct evidence target for owner-login claims, but it should be owner-authorized because auth misconfiguration can block the protected route. PR/preview validation lowers risk if the deployment platform and Google callback configuration support it.

