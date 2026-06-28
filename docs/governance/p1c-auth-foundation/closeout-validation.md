# P1C Auth Foundation Closeout Validation

## QA Gate

Verdict: `PASS_WITH_LOCAL_OAUTH_LIMITATION`

- Google OAuth/Auth.js foundation added with `next-auth@5.0.0-beta.31`.
- Owner allowlist includes `msararin@gmail.com` by code default and `.env.local.example`.
- `/internal/*` is protected by `proxy.ts`.
- `/internal/dashboard` performs server-side session and allowlist validation.
- Unauthenticated access to `/internal/dashboard` redirects to sign-in.
- No telemetry dashboard UI was built.
- No P2 work was started.

## Prime Gate

Verdict: `READY_FOR_OWNER_SECRET_CONFIGURATION_AND_OAUTH_CALLBACK_TEST`

Required before merge/deploy:

1. Configure real `AUTH_SECRET`, `AUTH_URL`, `AUTH_GOOGLE_ID`, and `AUTH_GOOGLE_SECRET` outside git.
2. Confirm Google OAuth callback URL for the deployment host.
3. Sign in with `msararin@gmail.com`.
4. Confirm a non-allowlisted Google account is denied.
5. Confirm `/internal/dashboard` remains absent from public navigation.

## Surface Runner Validation Plan

1. Run `rtk pnpm typecheck`.
2. Run `rtk pnpm lint`.
3. Run `rtk pnpm build`.
4. Start local or staging server with real OAuth env.
5. Verify `/` returns `200`.
6. Verify `/internal/dashboard` redirects when unauthenticated.
7. Verify owner Google account reaches protected cockpit shell.
8. Verify non-owner Google account cannot reach protected cockpit shell.
9. Run public surface leakage scan before deploy if public routes changed.

## Owner Gate Template

Owner decision requested:

- `APPROVE_P1C_AUTH_FOUNDATION_FOR_MERGE`
- `REVISE_P1C_AUTH_FOUNDATION`
- `REJECT_P1C_AUTH_FOUNDATION`

Owner checks:

- Confirm the only allowed owner email is `msararin@gmail.com`.
- Confirm Phase 1 scope only.
- Confirm no real secrets are committed.
- Confirm no telemetry dashboard UI or P2 work is included.

## Blocked Actions

- P2.
- Telemetry dashboard UI.
- Production deployment claim before real OAuth callback test.
- Public proof claim before owner acceptance.
