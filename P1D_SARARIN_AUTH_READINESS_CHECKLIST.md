# P1D sararin.ai Auth Readiness Checklist

Date: 2026-06-28
Target: `https://sararin.ai/internal/dashboard`

## Local Implementation Checks

| Check | Status | Evidence |
| --- | --- | --- |
| Auth.js route exists | pass-local | `app/api/auth/[...nextauth]/route.ts` |
| Internal dashboard route exists | pass-local | `app/internal/dashboard/page.tsx` |
| `/internal/*` protection exists | pass-local | `proxy.ts` matcher: `/internal/:path*` |
| Owner allowlist exists | pass-local | `auth.ts` default owner email: `msararin@gmail.com` |
| Server-side session validation exists | pass-local | `/internal/dashboard` calls `auth()` and `isAllowedInternalEmail()` |
| No old auth surface restored | pass-local | Clean rebuild files only |
| No telemetry dashboard UI built | pass-local | No telemetry UI work in P1D |
| No telemetry data exposure added | pass-local | No telemetry API/UI changes in P1D |
| No P2 started | pass-local | P1D limited to auth prep and validation plan |

## Secret and Env Checks

| Check | Status | Evidence / Required Action |
| --- | --- | --- |
| No real secrets committed | pass-local | Strict secret value scans returned no matches; broad scan matched placeholders/code references only |
| `.env.example` placeholders only | pass-local | Placeholder values only |
| `.env.local.example` placeholders only | pass-local | Placeholder values only |
| Production `AUTH_SECRET` listed | pass-local | Owner must configure outside git |
| Production `AUTH_URL` listed | pass-local | Must be `https://sararin.ai` |
| Production `GOOGLE_CLIENT_ID` listed | pass-local | Owner must configure outside git |
| Production `GOOGLE_CLIENT_SECRET` listed | pass-local | Owner must configure outside git |
| `NEXTAUTH_URL` compatibility | informational | Current implementation uses `AUTH_URL`; `NEXTAUTH_URL` is not required unless deployment policy depends on it |

## Production OAuth Targets

| Item | Required Value | Status |
| --- | --- | --- |
| Protected route | `https://sararin.ai/internal/dashboard` | pending deployment/browser validation |
| Google OAuth callback URL | `https://sararin.ai/api/auth/callback/google` | owner/Google Console confirmation required |
| Auth URL | `https://sararin.ai` | owner/Vercel env confirmation required |

## Readiness Boundary

This checklist confirms local readiness only. It does not verify production OAuth success without browser evidence from `sararin.ai` or an authorized deployment URL.
