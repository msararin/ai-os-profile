# P1D Surface Runner sararin.ai Auth Validation Plan

Status: `SURFACE_RUNNER_PLAN_ONLY_NOT_EXECUTED`

No browser validation was executed in this task. No claim is made that production auth works.

## Target

- Protected route: `https://sararin.ai/internal/dashboard`
- Callback URL: `https://sararin.ai/api/auth/callback/google`
- Auth URL: `https://sararin.ai`

## Required Browser Validation Steps

1. Open an unauthenticated browser session.
2. Navigate to `https://sararin.ai/internal/dashboard`.
3. Confirm the route redirects to Google/Auth.js sign-in.
4. Confirm no internal dashboard content is visible before login.
5. Sign in with owner Google account `msararin@gmail.com`.
6. Confirm owner lands on protected internal dashboard shell.
7. Refresh the page and confirm session persists.
8. Use sign out, if available, and confirm internal route is protected again.
9. If an unauthorized Google test account is available, confirm access is blocked.
10. Confirm no public route exposes raw telemetry.
11. Confirm no public route imports internal telemetry.
12. Confirm no telemetry data is exposed before auth.

## Evidence Required Before Claiming Verified

- Browser screenshots or equivalent browser evidence for redirect, post-login shell, refresh persistence, and sign-out.
- Deployment URL and timestamp.
- Confirmation that owner email used was `msararin@gmail.com`.
- Sanitized logs only; no secrets, tokens, cookies, or OAuth codes.

## Claim Boundary

Until this plan is executed and evidence is captured, final status cannot be `P1D_SARARIN_AUTH_VERIFIED_IF_AND_ONLY_IF_BROWSER_EVIDENCE_EXISTS`.

