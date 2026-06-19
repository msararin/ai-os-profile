# Public Surface Topic Map Checklist

Status: reusable working control  
Use before and after public page updates.

## Before Editing

- Identify the topic being changed.
- Confirm the canonical public page from `AIOS_PUBLIC_SURFACE_TOPIC_MAP.md`.
- Confirm supporting pages that should be cross-linked or revalidated.
- Confirm pages that should not mention the topic to avoid clutter.
- Record whether the topic is currently `CONSISTENT`, `PARTIAL`, `MISSING`, `DUPLICATED`, `AMBIGUOUS`, or `OVEREXPOSED`.
- Confirm the public-safe description and forbidden claims.

## Placement Rules

- Any new role, team, lane, gate, or capability must map to exactly one canonical public page.
- Any public claim must map to evidence and a claim boundary.
- Any role with authority must say what it can recommend, block, approve, or escalate.
- Any runner, checker, or gate must not imply deployment, go-live, or production-readiness authority unless explicitly authorized.
- Any deployment wording must distinguish local validation, preview/deploy action, live verification, and production readiness.
- Any cockpit/status wording must not become source of truth by visual appearance alone.
- Any architecture/org-chart update should prefer grouped lanes before adding many individual cards.
- Any topic added to one public page must be checked against the map before the update is considered complete.

## Public-Surface Claim Rules

- Say "supports owner review" when a tool packages evidence.
- Say "blocks or downgrades unsupported claims" only when a deterministic or documented check exists.
- Say "before go-live consideration" for release-lane wording.
- Do not say a runner deploys, approves go-live, certifies production readiness, guarantees correctness, or replaces owner semantic acceptance.
- Do not treat achievements as canonical role/policy definitions.
- Do not treat architecture diagrams as proof of runtime execution.
- Do not treat cockpit/status pages as the source of truth.

## Architecture / Org Chart Rules

- Architecture route owns the one-glance operating model.
- Org Roles owns role authority and responsibility boundaries.
- System Health owns public-safe review/status surfaces.
- How We Build owns reusable governance patterns.
- Achievements owns evidence-backed outcome summaries only.
- Data Team should appear as an evidence-structure/dashboard-readiness support lane, not as a final decision authority.
- Prime Gate should appear as a decision-quality review gate, not owner approval.
- Gate PM / PM should appear as coordination and Definition-of-Done control, not release authority.
- Runner Gang should appear as a review pattern, not independent autonomous proof.

## Validation Commands

Run when applicable:

```bash
pnpm public:topic-map
pnpm public:review -- --input <change-specific-input.json>
pnpm lint
pnpm typecheck
pnpm build
git diff --check
```

Run leakage scan on public-facing changed files and generated owner-review artifacts for:

- private checkout paths;
- private KB references intended only for local work;
- secrets or API keys;
- provider receipt bodies;
- raw telemetry;
- prompt logs;
- private evidence JSON;
- local worktree paths.

## After Editing

- Update `AIOS_PUBLIC_SURFACE_TOPIC_MAP.md` if topic ownership changed.
- Update `aios-public-surface-topic-map.json` if machine-readable validation should reflect the change.
- Run `pnpm public:topic-map`.
- Revalidate the canonical page and all supporting pages affected by the update.
- Document any deferred placement as `defer`, `AMBIGUOUS`, or `OWNER_DECISION_REQUIRED` instead of guessing.

