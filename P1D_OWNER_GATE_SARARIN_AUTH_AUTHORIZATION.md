# P1D Owner Gate - sararin.ai Auth Authorization

Date: 2026-06-28

Owner decisions requested:

| Decision | Options | Current Status |
| --- | --- | --- |
| Skip local OAuth callback test | authorize / reject | authorized by owner correction |
| Use `sararin.ai` as auth validation target | authorize / reject | authorized by owner correction |
| Configure production/preview env outside git | authorize / reject | pending owner action |
| Push branch | authorize / reject | not authorized in this task |
| Create PR / preview deployment | authorize / reject | not authorized in this task |
| Run production auth test | authorize / reject | not authorized in this task |
| Roll back if auth breaks internal route | authorize / reject | pending owner authorization |
| Proceed to P2 | reject | not authorized |

## Required Production Env Values

Configure outside git only:

- `AUTH_SECRET`
- `AUTH_URL=https://sararin.ai`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `INTERNAL_ALLOWED_EMAILS=msararin@gmail.com`

## Required Google Console Callback

- `https://sararin.ai/api/auth/callback/google`

## Owner Approval Template

```text
OWNER AUTHORIZATION - P1D SARARIN AUTH TEST

I authorize:
- branch push: yes/no
- PR or preview deployment: yes/no
- production env configuration outside git: yes/no
- Google Console callback configuration: yes/no
- production auth browser validation on sararin.ai: yes/no
- rollback if auth blocks the protected route incorrectly: yes/no
- P2: no

Constraints:
- do not commit secrets
- do not print secrets
- do not claim auth works without browser evidence
- do not build telemetry UI/API
```

