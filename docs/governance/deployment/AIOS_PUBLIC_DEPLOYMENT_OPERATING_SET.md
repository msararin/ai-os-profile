# AIOS Public Deployment Operating Set v0.1

## Purpose

Use this operating set every time changes are pushed or deployed to `sararin.ai`.

Goal:

```text
Prevent public-surface drift, unsupported claims, accidental internal exposure, and deployment-status confusion.
```

This is not a heavy release process. It is a lightweight deployment control ritual.

## 0. Classify the change first

Before doing anything, classify the patch:

```text
A. Control artifact only
B. Public page content change
C. Public UI/layout change
D. Internal/auth/boundary change
E. Script/checker/governance change
F. Production behavior change
```

Deployment implication:

```text
Control artifact only
= may push, but do not claim public UX changed.

Public page content change
= requires HTTP/content check after deployment.

Public UI/layout change
= requires visual/manual check before visual claim.

Internal/auth/boundary change
= requires targeted surface scan + leakage check + route-output check.

Script/checker change
= requires script syntax + checker execution.

Production behavior change
= requires stronger validation and explicit go-live decision.
```

## 1. Pre-push gate

Run before pushing.

Git state:

```bash
git branch --show-current
git status --short
git log --oneline -5
```

Required checks:

```text
Correct branch confirmed.
Unrelated dirty files identified.
No accidental git add .
No local-only artifact included unless intended.
No private file/path included.
```

Diff review:

```bash
git diff --stat
git diff --name-only
git diff --check
```

If staged:

```bash
git diff --cached --stat
git diff --cached --name-only
git diff --cached --check
```

Stop if:

```text
Unrelated files are staged.
Private paths appear.
Raw evidence appears.
Internal/auth surface appears unintentionally.
```

## 2. Validation gate by patch type

Always run if app code changed:

```bash
rtk pnpm typecheck
rtk pnpm build
rtk pnpm check:public-dashboard-leakage
rtk git diff --check
```

If script/checker changed:

```bash
node --check <script-path>
pnpm <checker-command>
```

Example:

```bash
node --check scripts/check-public-surface-topic-map.mjs
pnpm public:topic-map
```

If JSON changed:

```bash
node -e "JSON.parse(require('fs').readFileSync('<file>.json','utf8')); console.log('json ok')"
```

If internal/auth/boundary changed, run targeted scan:

```bash
grep -R "Internal Access\|/internal/dashboard\|/auth/signin\|Sign in\|OAuth\|next-auth\|@auth/core\|AUTH_SECRET\|NEXTAUTH\|GOOGLE_CLIENT" \
  app components lib package.json pnpm-lock.yaml 2>/dev/null || true
```

Expected depends on decision:

```text
Hard removal:
No active matches in app/package surfaces.

Auth parked:
Auth terms may exist only in parked auth infrastructure, not public UI/nav/copy.
```

If public route changed:

```text
Build output should include expected public routes.
Build output should not include unexpected internal/auth routes.
```

## 3. Commit gate

Commit message must match evidence level.

Good examples:

```text
Add public surface topic map control artifacts
Remove public internal auth surface pending visual verification
Reframe observability page enforcement value
```

Avoid overclaiming:

```text
Fully verified production UI
Complete public safety validation
Prove runtime enforcement
Verify full automation
```

After commit:

```bash
git log --oneline -1
git status --short
```

Record:

```text
Commit hash
Commit message
Files changed
Remaining unrelated dirty files
Validation completed before commit
Claim level
Not claiming
```

## 4. Push gate

Before push:

```bash
git branch --show-current
git remote -v
git log --oneline -3
git status --short
```

Push:

```bash
git push origin main
```

After push, record:

```text
Remote branch
Pushed commit hash
Whether GitHub workflow started
Whether Vercel deployment started
Whether manual deployment was performed
```

## 5. Deployment status gate

Deployment states:

```text
PUSHED_PENDING_DEPLOYMENT_CONFIRMATION
DEPLOYMENT_PREFLIGHT_IN_PROGRESS
DEPLOYED_PENDING_HTTP_CHECK
DEPLOYED_HTTP_CONTENT_CHECKED_PENDING_VISUAL_VERIFICATION
PASS_WITH_VISUAL_VERIFICATION_GAP
PRODUCTION_VISUAL_VERIFIED
```

Do not collapse these states into one.

If Vercel is ready, record:

```text
Deployment URL
Production alias
Status: Ready
Commit deployed
```

Allowed claim:

```text
The patch has been deployed.
```

Blocked until HTTP/content check:

```text
Production content verified.
```

## 6. Production HTTP/content check

For each changed route:

```bash
curl -I <production-url>
curl -L <production-url> | grep "<expected content marker>"
```

Minimum checks:

```text
HTTP 200
Expected new content appears
Known removed content is absent
No internal/auth affordance markers appear
No private evidence/raw path markers appear
```

For System Health / Observability examples:

```text
Expected present:
Runtime Enforcement Value Surface
Enforcement value chain
Historical archive and measurement limits
Blocked public claims
System Health access-boundary content

Expected absent:
Internal Access
/internal/dashboard
/auth/signin
Sign in
OAuth
next-auth
@auth/core
```

Allowed claim after this:

```text
Production HTTP/content spot-check passed.
```

Still blocked:

```text
Production visual verification complete.
Fully browser-verified public UI.
Playwright visual regression complete.
```

## 7. Visual verification gate

Manual/browser visual check is separate from HTTP/content check.

Check:

```text
Page loads visibly.
Layout is readable.
Cards/tables do not overflow.
Mobile/desktop are acceptable if checked.
No broken nav.
No visual ghost of removed feature.
No repeated defensive text dominating page.
No public/internal confusion.
```

If only manual browser check was done:

```text
Production visual spot-check passed.
```

If screenshot captured:

```text
Production screenshot verification passed.
```

If Playwright ran:

```text
Playwright visual regression passed.
```

Do not claim stronger than evidence.

## 8. Claim boundary ledger

For every deployment, record:

```text
Claim level:
<LEVEL>

Evidence:
- <key evidence only>

Not claiming:
<ONE_OR_TWO_UMBRELLA_LIMITS_ONLY>
```

Allowed claim levels:

```text
MANUAL_WORKING_PROTOCOL
CONTROL_ARTIFACT_COMMITTED
CHECKER_ADDED
PARTIALLY_AUTOMATED_PREFLIGHT_CONTROL
DEPLOYED_HTTP_CONTENT_CHECKED
VISUAL_SPOT_CHECKED
FULL_DEPLOYMENT_ENFORCEMENT
```

`FULL_DEPLOYMENT_ENFORCEMENT` is reserved. Do not use it unless full enforcement is explicitly proven.

Routine closeouts should not list every possible blocked claim. Use one umbrella `Not claiming` item unless a specific risk is active. Use detailed blocked claims only when there is a failure, security risk, public/private boundary risk, or claim dispute.

Example for the current protocol integration state:

```text
Claim level:
PARTIALLY_AUTOMATED_PREFLIGHT_CONTROL

Evidence:
- Deployment protocol checker is committed.
- Checker is scripted and included in GitHub Deployment Preflight.

Not claiming:
FULL_DEPLOYMENT_ENFORCEMENT
```

## 9. Public-surface map update rule

If a patch changes public topic ownership, route meaning, or page responsibility, update or validate:

```text
docs/governance/public-surface-map/AIOS_PUBLIC_SURFACE_TOPIC_MAP.md
docs/governance/public-surface-map/aios-public-surface-topic-map.json
```

Run:

```bash
pnpm public:topic-map
```

If public pages were not changed:

```text
PUBLIC_PAGES_EDITED: false
```

If only control artifacts changed:

```text
CONTROL_ARTIFACT_ONLY: true
PUBLIC_UX_CHANGED: false
```

## 10. Stop conditions

Stop deployment work if:

```text
Typecheck fails
Build fails
Leakage check fails
Unexpected internal/auth route appears
Private path appears in public output
Unrelated files are staged
Deployment preflight fails
Production page returns non-200
Expected content missing after deploy
Removed internal/auth marker still appears
```

Do not continue into new feature work until the stop condition is resolved or explicitly parked.

## 11. Standard deployment closeout format

```text
Final verdict:
<STATUS>

Commit:
<hash> <message>

Patch type:
<control artifact / public content / boundary / UI / script>

Validation:
- typecheck:
- build:
- leakage:
- script:
- JSON:
- targeted scan:
- git diff check:

Push:
- branch:
- remote:
- pushed commit:

Deployment:
- Vercel status:
- production URL:
- aliases:
- manual deploy performed:

Production check:
- HTTP/content:
- visual:
- Playwright:

Claim level:
<LEVEL>

Evidence:
- <key evidence only>

Not claiming:
<ONE_OR_TWO_UMBRELLA_LIMITS_ONLY>

Remaining unrelated files:
-

Recommended next action:
-
```

## 12. Core rule

```text
Push does not equal deploy.
Deploy does not equal content verified.
Content verified does not equal visual verified.
Visual verified does not equal Playwright verified.
```

Always name the exact evidence level.
