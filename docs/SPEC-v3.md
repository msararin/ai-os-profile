# ai-os-profile — v3.0 Spec Lock

## Status

LOCKED 2026-05-19 by Lyn approval after live visual + functional review.
UPDATED 2026-05-21 by Lyn approval for Patch 2 homepage positioning, Learning evidence dates, public toggle removal, Workstreams IA separation, and Org & Roles policy separation.
PROMOTED 2026-05-21 to v3.0.0 after Workstreams, Org & Roles, and Supernova first-version status were regression-gated and build-verified.

This document is the canonical reference for v3.0.0 of `msararin/ai-os-profile`. Any change to this site MUST either:
1. Pass the v3 regression test (`scripts/regression-v3.sh` in this repo) → minor patch within v3.x
2. OR be tagged as v3.1+, v4.0+ with this document updated FIRST

Source of truth: this file + Git tag `v3.0.0` + release commit.

## Anchor Commit

`886a687` — `fix: update Internal view backlog snapshot to COMPLETE for patches 3-7`
Branch: `main`
Tag: `v3.0.0`
Repo: `https://github.com/msararin/ai-os-profile`
Commit chain extends the v2.0.0 baseline and promotes the public IA split into the active spec.

## Audience

Mixed external-first. Portfolio case study on AI orchestration governance. NOT a production cockpit, NOT autonomous, NOT live-deployed. Operating reality is honestly labeled.

## Site Structure

7 pages + persistent header/footer. The public profile no longer exposes the External/Internal mode toggle.

### Pages

| Path                | Title                  | Component                                  |
|---------------------|------------------------|--------------------------------------------|
| `/`                 | AI Orchestration Governance | `app/page.tsx` (server) |
| `/architecture`     | 4-Layer Architecture   | `app/architecture/page.tsx` (server)       |
| `/lean-value-tree`  | Lean Value Tree        | `app/lean-value-tree/page.tsx` (client)    |
| `/achievement-learning` | Achievement & Learning | `app/achievement-learning/page.tsx` (server) |
| `/principles`       | Governance Principles  | `app/principles/page.tsx` (server)         |
| `/workstreams`      | Workstreams            | `app/workstreams/page.tsx` (server)        |
| `/org-roles`        | Org Chart & Role Policy | `app/org-roles/page.tsx` (server)         |

### Shared Components

- `components/page-layout.tsx` — header + metadata + main + footer shell (client, NO ViewProvider)
- `components/site-header.tsx` — sticky nav, no public mode toggle (client)
- `components/site-footer.tsx` — 3-column metadata + copyright line (server)
- `components/page-metadata.tsx` — top-right block (server)
- `components/view-toggle.tsx` — ViewProvider + ViewToggle button group (client)
- `app/layout.tsx` — RootLayout, **wraps `<ViewProvider>{children}</ViewProvider>`** (server)

### Locked Architectural Rule

`ViewProvider` lives in `app/layout.tsx` (root). Do NOT move it back into `PageLayout`. Earlier attempt caused per-page provider instantiation → state did not propagate across navigation → toggle appeared broken.

If `ViewProvider` location ever needs to change, the regression test MUST verify Internal toggle still re-renders content on the Home page.

## Locked Content (must not change without v3.1+ bump)

### Hero (Home)
- H1: `AI Orchestration Governance`
- Subtitle: `Tools change. Governance discipline doesn't.`
- Hero hook: `AIOS is a working evidence trail for human-led AI work governance.`
- 2 CTAs: `View Architecture` (filled), `View Workstreams` (outline)

### What Makes This Different? (Home)
The old `Executive Summary` card grid is removed in v3.0.

5 differentiation cards, exact titles:
1. `Separate role, model, provider, and cost`
2. `Benchmark trace as Definition of Done gate`
3. `Learning from failure with policy response`
4. `Human review gates where risk matters`
5. `Privacy-first curated context`

Portfolio disclaimer must remain visible:
`This is a portfolio case study, not a production product.`

### Evidence Anchors (Home)
Short proof anchors explain the operating discipline without turning the homepage into a status dashboard.

3 cards, exact titles:
1. `Failure became policy`
2. `Completion requires trace`
3. `Context is intentionally bounded`

### System State (Home)
Compact summary only. Must not duplicate the Workstreams page.

4 cards, exact titles:
1. `Source of truth`
2. `Governance`
3. `Routing`
4. `Proof level`

### Workstreams Page
Actionable operating status lives on `/workstreams`, not on the Home page.

Required table columns:
- Workstream
- Status
- Owner / role
- Next action
- Gate decision
- Blocker / risk
- Proof / evidence

Required workstreams:
- optimize-worker
- Fallback routing
- Profile positioning
- Supernova
- Big Crew
- Researcher
- Investment Team

Each workstream must include a short public-safe description. Big Crew and Researcher are `Started`, not merely planned, because Patch 1/Patch 2 execution handoffs and the homepage differentiation brief already exist. Supernova must state that its first version exists while POC validation has not yet run.

The page must stay public-safe and state that it is not live telemetry or a production control plane.

### Org & Roles Page
Org chart, role responsibility, task routing, and budget policy live on `/org-roles`, not on the Home page and not mixed into Workstreams.

Required sections:
- `Operating Org Chart`
- `Role & Responsibility Policy`
- `Budget Policy`
- `Task Routing Policy`

Org chart must show:
- Lyn / Robert as executive review and protected decision gate
- Robert and Hermes as peers via KB
- Robert KB + Git as shared source of truth
- Codex, Big Crew, Researcher, Supernova, Investment Team, optimize-worker, and Fallback routing as routed operating lanes

Role policy must include public-safe rows for:
- Robert / Lyn
- Hermes
- Codex
- Big Crew
- Researcher
- Supernova
- Investment Team
- optimize-worker

Budget policy must include:
- `Role first, model second`
- `Cheap/local first`
- `Senior synthesis`
- `Executive escalation`
- `Implementation lane`
- `No senior delegation without a named decision`

The page must avoid production-readiness claims and must not expose raw private KB content.

### Achievement & Learning Page
Learning Curve subheading:
`May 18–21, 2026 | 5 phases, 6 milestones, evidence-backed commits`

5 phase cards show date badges. 6 milestone cards show date badges and evidence references.

### Architecture Page
4 layers in order with exact tag wording:
1. Executive Layer — `Robert / GPT`, `Hermes + Opus + custom MCP*`
2. Routing Layer — `optimize-worker`
3. Execution Layer — `Codex`, `Hermes`, `local agents`
4. Source-of-Truth Layer — `Privacy-first`, `Committed KB protocol`

3 flow arrows with labels:
- Executive → Routing: `Strategic intent + scope`
- Routing → Execution: `Routed task + capability match`
- Execution → Source-of-Truth: `Reviewed artifact (commit gate)`

Plus 4th arrow `Committed truth` between Human Review Gate and Layer 4.

Human Review Gate: amber dashed border, `Checkpoint, not a layer` description, positioned BETWEEN Layer 3 and Layer 4.

Hermes annotation under Executive Layer: `Hermes operates as a context-aware operator surface. MCP is the read-only bridge for context retrieval — not an autonomous execution path.`

Six Design Choices section (6 cards, locked titles).

Component Glossary table (6 rows, locked content).

MCP footnote on architecture page AND glossary section, exact wording:
`*Current operational trial surface. MCP is used as a read-only context bridge for controlled context retrieval. It is not yet approved as an autonomous production workflow.`

### LVT Page
North Star (locked): `Sustainable economic leverage through an AI-assisted personal operating system.`

6 layers in order, each with 5 fields (Objective / Metric / Status badge / Evidence / Next move):
1. Strategic Control (Active, green)
2. Execution Leverage (Active, green)
3. Workforce Efficiency (Drafted, orange)
4. Portfolio Proof (Drafted, orange)
5. Opportunity Intelligence (Planned, gray)
6. Monetization (Planned, gray)

External and Internal modes show same 5 fields per layer; Internal adds heading suffix `(Internal View)` + extra description line.

### Principles Page
Page heading: `Governance Principles`
Subtitle: `Six principles that guide the design and operation of this AI orchestration system.`

6 principles, locked titles:
1. Governed execution over rushed execution
2. Single source of truth
3. Tools change; discipline doesn't
4. Depth control by design (highlighted card)
5. Demonstrate maturity, not readiness
6. Sustainable operating model

Closing quote: `"AI orchestration is program management. Tools change. Governance discipline doesn't."`

### Top-Right Metadata Block (every page)
```
Last updated: 2026-05-20 08:15 ICT
Source: Robert KB + Git
Version: v1.1 rescue draft
```

NOTE: `Version: v1.1 rescue draft` is locked content from the original brief. The repo Git tag `v3.0.0` is the release version. These are intentionally separate. Do NOT change the in-page version string without updating this spec.

### Footer (every page)
3 columns same as metadata block PLUS bottom line:
`© 2026 AI Orchestration Governance — A portfolio case study by Lyn (msararin). Source of truth: Robert KB + Git.`

### Navigation (every page)
7 tabs in order: `Home | Architecture | LVT | Learning | Principles | Workstreams | Org & Roles`

### Toggle (every page)
No External/Internal button group appears in the public header as of v3.0. `ViewProvider` remains mounted at root for legacy page compatibility, but the public profile should not expose mode-switching controls in `components/site-header.tsx`.

## Tech Stack (locked)

- Next.js 16.2.6 + React 19.2.4
- Tailwind 4
- shadcn/ui + Radix primitives
- Static export friendly (no server data)
- `typescript.ignoreBuildErrors: true` in `next.config.mjs` — KNOWN DEBT, allowed in v3.0.0, MUST be removed before v4.0.0

## Known Tech Debt (allowed in v3.x)

1. `typescript.ignoreBuildErrors: true` in `next.config.mjs`
2. `Last updated` and `Version` strings hardcoded in 2 components (`page-metadata.tsx`, `site-footer.tsx`) — not centralized
3. `PATCHES_3_TO_7_BRIEF.md` at repo root (untracked, may leak in public review — should be moved to `docs/` or removed before external review)
4. `pnpm-workspace.yaml` untracked (auto-generated, harmless)
5. `next-env.d.ts` modified locally (auto-managed by Next, ignore)

These are NOT v3.0.0 blockers. They are v4.0.0 cleanup targets.

## v3.0 Status Patch: Public IA + Fallback + Benchmark

Public-safe status added 2026-05-20:

- AIOS fallback routing policy exists.
- Hermes is not treated as a single point of failure.
- Fallback routing is based on task type, failure mode, risk level, and available worker/model.
- No new provider API key is needed now.
- Provider/model expansion is blocked until benchmark evidence exists unless Lyn overrides.
- Benchmark trace is now a centralized Definition of Done gate.
- Future parked item: automate `benchmark_trace.json`, collect at least 5 routed traces, then consider a read-only telemetry dashboard.

This is a content/status patch only. It does not add a provider integration, API key, runtime config, database, auth, or telemetry dashboard.

## Regression Test Gate

`scripts/regression-v3.sh` — must pass for any v3.x patch. Bumping to v4.0.0 requires either:
- All checks updated to new spec, OR
- Explicit decision logged in `KB:03_ai_skill_lab/supernova/supernova_decision_log_*.md`

## Approval Trail

| Date       | Reviewer | Decision                                           | Evidence                  |
|------------|----------|----------------------------------------------------|---------------------------|
| 2026-05-18 | Lyn      | Patches 1, 1.1, 2 approved (B1–B12 audit pass)    | iter-2/3/4 screenshots    |
| 2026-05-19 | Lyn      | Patches 3-7 approved + Internal toggle fix accepted | Live review + browser test|
| 2026-05-19 | Lyn      | v2.0.0 LOCK                                        | This document             |
| 2026-05-21 | Lyn      | v3.0.0 IA promotion requested                      | Workstreams + Org & Roles + KB update |

## Change Procedure

To modify v3.0.0:

1. **Spec change first.** Edit this document on a feature branch. Bump version (v3.1.0 / v4.0.0).
2. **Update regression test.** Modify `scripts/regression-v3.sh` to match new spec.
3. **Implement code change.**
4. **Run regression test:** `bash scripts/regression-v3.sh` → must PASS.
5. **Build verify:** `npx --no-install next build` → must PASS.
6. **Commit + tag.** Push to main + tag new version.
7. **Update KB decision log** at `~/robert-knowledge-base/03_ai_skill_lab/supernova/supernova_decision_log_<date>.md`.

NO v3.x patch may bypass step 4. Regression test failure = revert.

## Files at Tag v3.0.0

```
ai-os-profile/
├── app/
│   ├── architecture/page.tsx
│   ├── lean-value-tree/page.tsx
│   ├── principles/page.tsx
│   ├── layout.tsx          ← ViewProvider mounted HERE
│   ├── page.tsx            ← Home, External + Internal branches
│   └── globals.css
├── components/
│   ├── page-layout.tsx     ← header + footer + main shell only
│   ├── page-metadata.tsx
│   ├── site-footer.tsx
│   ├── site-header.tsx
│   ├── view-toggle.tsx     ← ViewProvider + ViewToggle exports
│   └── ui/...
├── docs/
│   └── SPEC-v3.md          ← THIS DOCUMENT
├── scripts/
│   └── regression-v3.sh    ← REGRESSION TEST GATE
├── package.json
├── next.config.mjs
└── README.md
```
