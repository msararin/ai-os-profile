# PUBLIC_SURFACE_AUDIT

Pre-implementation inventory, 2026-09-16. Source locked to remote main `54f5b44733a62b1fe4b74e6dbb7b856f3a1618ec`. LOCAL_READ_ONLY_TRIAGE. No source removed or production changed at audit time.

## Architecture and custody
Next.js 16.2.6 App Router, React 19, Auth.js v5 beta Google provider; Vercel binding exists in original local checkout. Railway/Docker manifests also exist; actual active deployment identity not yet verified. Existing pipeline runs pnpm lint/typecheck/build, public checks, Playwright. Preserve hosting, DNS, and Auth.js callback path. Original working tree clean and left untouched. Candidate is an independent clone from remote main, not an older local feature branch. All preservation copies must be outside `public` and not imported into client modules.

## Findings
- Server login is currently email allowlist based, with a hardcoded owner email and configurable additional users. No immutable Google subject binding. Replace with fail-closed server OWNER_GOOGLE_SUB authorization and independently protected endpoints.
- Proxy checks Boolean(session), covers only /internal and /api/internal. Direct page/API guards also rely on email. New /cockpit and /api/cockpit need default-deny coverage plus independent checks.
- Architecture, org role, workstream and achievement content includes operational implementation, internal evidence IDs, route details and roadmap state. Preserve before abstraction.
- Public HTML reports contain receipt schemas, workflow mechanics and internal file references. Move physical assets to private storage and serve only through authenticated handlers.
- Client-side case-study injection modules can embed private data in downloadable JS even if navigation is hidden. Remove these modules from public import graph after preserving originals; keep bounded outcome/limitation summaries.
- Existing telemetry contains historical candidate records and source-limited spend snapshots. No evidence that these represent complete runs today. Missing values must stay unavailable.
- Public observability endpoint reveals storage configuration presence. Reduce to published application status only, with no internal storage inspection.
- Repository history and historical deployments/caches may retain material. No history rewrite or cache-removal claim. Repository visibility and historical public exposure remain REVIEW_OWNER until verified.
- Existing TTS application routes are separate functionality; retain their behavior and inspect regression independently.

## Route inventory
Classification describes target disposition; KEEP_PUBLIC is a baseline decision subject to detailed content scan, not a security certification.

| Route | Classification | Source |
|---|---|---|
| /about | KEEP_PUBLIC | `app/about/page.tsx` |
| /achievement-learning | MOVE_PRIVATE | `app/achievement-learning/page.tsx` |
| /achievements | ABSTRACT_PUBLIC | `app/achievements/page.tsx` |
| /achievements/public-surface-governance | ABSTRACT_PUBLIC | `app/achievements/public-surface-governance/page.tsx` |
| /ai-agent-launch-checklist | ABSTRACT_PUBLIC | `app/ai-agent-launch-checklist/page.tsx` |
| /ai-operating-system/agent-review-dashboard | MOVE_PRIVATE | `app/ai-operating-system/agent-review-dashboard/page.tsx` |
| /ai-operating-system/context-continuity | MOVE_PRIVATE | `app/ai-operating-system/context-continuity/page.tsx` |
| /ai-operating-system | ABSTRACT_PUBLIC | `app/ai-operating-system/page.tsx` |
| /architecture/internal-cockpit-governance | MOVE_PRIVATE | `app/architecture/internal-cockpit-governance/page.tsx` |
| /architecture/optimize-worker/durable-continuity | MOVE_PRIVATE | `app/architecture/optimize-worker/durable-continuity/page.tsx` |
| /architecture | ABSTRACT_PUBLIC | `app/architecture/page.tsx` |
| /architecture/public-surface-governance | ABSTRACT_PUBLIC | `app/architecture/public-surface-governance/page.tsx` |
| /architecture/system-health/agent-orchestration | MOVE_PRIVATE | `app/architecture/system-health/agent-orchestration/page.tsx` |
| /architecture/system-health/evidence-readiness | MOVE_PRIVATE | `app/architecture/system-health/evidence-readiness/page.tsx` |
| /architecture/system-health/llmops-readiness | MOVE_PRIVATE | `app/architecture/system-health/llmops-readiness/page.tsx` |
| /architecture/system-health/monitoring | MOVE_PRIVATE | `app/architecture/system-health/monitoring/page.tsx` |
| /architecture/system-health/observability | MOVE_PRIVATE | `app/architecture/system-health/observability/page.tsx` |
| /architecture/system-health | MOVE_PRIVATE | `app/architecture/system-health/page.tsx` |
| /architecture/system-health/runtime-authority-evidence | MOVE_PRIVATE | `app/architecture/system-health/runtime-authority-evidence/page.tsx` |
| /architecture/system-health/window-b-runtime-authority-snapshot | MOVE_PRIVATE | `app/architecture/system-health/window-b-runtime-authority-snapshot/page.tsx` |
| /case-studies/case-003/round3-evidence-ladder | ABSTRACT_PUBLIC | `app/case-studies/case-003/round3-evidence-ladder/page.tsx` |
| /case-studies/evidence-discipline-ai-assisted-delivery | KEEP_PUBLIC | `app/case-studies/evidence-discipline-ai-assisted-delivery/page.tsx` |
| /case-studies/nbo-nrt-azure-databricks | ABSTRACT_PUBLIC | `app/case-studies/nbo-nrt-azure-databricks/page.tsx` |
| /case-studies | KEEP_PUBLIC | `app/case-studies/page.tsx` |
| /case-studies/telco-churn-mlops | KEEP_PUBLIC | `app/case-studies/telco-churn-mlops/page.tsx` |
| /case-studies/txttoaudio | KEEP_PUBLIC | `app/case-studies/txttoaudio/page.tsx` |
| /contact | KEEP_PUBLIC | `app/contact/page.tsx` |
| /how-we-build | ABSTRACT_PUBLIC | `app/how-we-build/page.tsx` |
| /internal/telemetry/operator | MOVE_PRIVATE | `app/internal/telemetry/operator/page.tsx` |
| /internal/telemetry | MOVE_PRIVATE | `app/internal/telemetry/page.tsx` |
| /knowledge-sharing | KEEP_PUBLIC | `app/knowledge-sharing/page.tsx` |
| /lean-value-tree | ABSTRACT_PUBLIC | `app/lean-value-tree/page.tsx` |
| /machine-learning-decision-systems | KEEP_PUBLIC | `app/machine-learning-decision-systems/page.tsx` |
| /org-roles/big-crew-architecture-gate | MOVE_PRIVATE | `app/org-roles/big-crew-architecture-gate/page.tsx` |
| /org-roles/data-team | MOVE_PRIVATE | `app/org-roles/data-team/page.tsx` |
| /org-roles | MOVE_PRIVATE | `app/org-roles/page.tsx` |
| /org-roles/qa-sentinel | MOVE_PRIVATE | `app/org-roles/qa-sentinel/page.tsx` |
| /org-roles/repo-custodian | MOVE_PRIVATE | `app/org-roles/repo-custodian/page.tsx` |
| /org-roles/runner-execution-layer | MOVE_PRIVATE | `app/org-roles/runner-execution-layer/page.tsx` |
| / | KEEP_PUBLIC | `app/page.tsx` |
| /portfolio | KEEP_PUBLIC | `app/portfolio/page.tsx` |
| /principles | KEEP_PUBLIC | `app/principles/page.tsx` |
| /role-fit | KEEP_PUBLIC | `app/role-fit/page.tsx` |
| /workstreams | ABSTRACT_PUBLIC | `app/workstreams/page.tsx` |
| /writing | KEEP_PUBLIC | `app/writing/page.tsx` |
| /api/auth/[...nextauth] | KEEP_PUBLIC | `app/api/auth/[...nextauth]/route.ts` |
| /api/internal/telemetry/oidc-proof | MOVE_PRIVATE | `app/api/internal/telemetry/oidc-proof/route.ts` |
| /api/internal/telemetry/operator | MOVE_PRIVATE | `app/api/internal/telemetry/operator/route.ts` |
| /api/observability | KEEP_PUBLIC | `app/api/observability/route.ts` |
| /api/tts/[...path] | KEEP_PUBLIC | `app/api/tts/[...path]/route.ts` |
| /api/tts/access | KEEP_PUBLIC | `app/api/tts/access/route.ts` |

## Static and non-route surfaces
| Surface | Classification | Treatment |
|---|---|---|
| public/*telemetry*.html, public/aios-phoenix*.html | MOVE_PRIVATE | Preserve bytes/hash before removing public copy; owner-auth download endpoint |
| public/evidence/*.json | MOVE_PRIVATE | Exact receipts only behind owner boundary |
| public/case-studies/nbo-nrt/data-preparation/*.svg | REVIEW_OWNER | Preserve and move private when containing execution mechanics; public summary retains measured outcomes |
| public/case-002-dry-run-profile.pdf | REVIEW_OWNER | Preserve privately pending content review |
| Resume, icons, placeholders | KEEP_PUBLIC | Intended public portfolio assets |
| Detailed app/content source originals | MOVE_PRIVATE | Non-client private source archive with indexed owner-only readback |
| Public references enumerating sensitive categories | ABSTRACT_PUBLIC | Generic privacy/authorization sentence |
| No redundant source material identified | REMOVE_COMPLETELY | None; do not delete evidence |
| Git history, old deployments, caches, sourcemaps | REVIEW_OWNER | Residual exposure inventory; no automatic history rewrite |

## Search evidence
Sibling owner-review folder contains route-inventory.json and exposure-search.json, recording path/line matches for routing, contracts, prompts, provider/cost/fallback rules, validations, evidence, roadmap, telemetry and private data references. Keyword matches require contextual interpretation; they do not establish a secret by themselves.

## Implementation acceptance
Preserve originals before public changes. Google subject binding, explicit session expiry, HttpOnly/Secure/SameSite cookies; no localStorage tokens. Every private request independently authorizes. Private data never statically rendered or put in client bundles. Owner UI identifies unavailable telemetry. Tests include missing/expired/non-owner session, endpoints, static artifact/sitemap/JS leakage, and public regression. Production Google round-trip requires owner-approved configuration and interactive account authentication; local fixtures are never claimed as that proof.

## Confirmed historical exposure
GitHub API on 2026-09-16 reports repository visibility PUBLIC. Source/history remain public until owner remediation. Private archive is gitignored and must use a private deployment store; never commit it to this repository.
