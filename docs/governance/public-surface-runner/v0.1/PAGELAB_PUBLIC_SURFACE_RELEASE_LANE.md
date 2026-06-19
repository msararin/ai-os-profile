# PageLab Public Surface Release Lane v0.1

## Purpose

PageLab public page updates are recurring operational work. This lane turns the existing Public Surface Runner profile into a repo-local review step for public page, cockpit, achievement, knowledge-sharing, strategy, and portfolio narrative updates.

## Operating Boundary

This lane is not deployment authority.

It must not deploy, publish, promote preview to production, modify production, create credentials, approve go-live, claim production readiness, or claim full QA, SEO, accessibility, analytics, visual regression, or autonomous orchestration.

## Team Roles

| Role | Responsibility | Output |
| --- | --- | --- |
| Surface Source Mapper | Map route/component/content to source-of-truth and evidence. | Review input fields and source-map note. |
| Content Boundary Steward | Check claim-safe wording, owner meaning, public/internal boundary, and no overclaim. | Claim boundary in review input. |
| Public Surface Runner | Run deterministic PASS/WARN/BLOCK/NOT_APPLICABLE checks. | `PUBLIC_SURFACE_REVIEW_PACKET.html` and `public-surface-review-result.json`. |
| Release Verifier | Capture build/typecheck/lint/route smoke/deployment reference evidence when applicable. | Evidence fields in review input. |
| Leakage Sentinel | Check no private paths, secrets, receipts, telemetry, prompt logs, or private evidence JSON are exposed. | Runner leakage checks and follow-up scan when public artifacts are produced. |
| Owner | Gives semantic acceptance and go-live approval when required. | Explicit owner decision outside this runner. |

## Required Command

```bash
pnpm public:review
```

For a specific update packet:

```bash
pnpm public:review -- --input docs/governance/change-packets/<packet>/public-surface-review-input.json
```

The generated JSON result records `rules_sha256` for the rules file used in that run. Treat a rules hash change as a review-lane change that needs an explicit patch note.

## Required Inputs

Every recurring PageLab update packet should name:

- public route or surface
- expected entry identifier
- changed files
- owner-intended meaning
- public copy summary
- evidence references
- claim boundary
- build/typecheck/lint evidence when code changes
- route smoke evidence when route visibility matters
- deployment or preview reference only if it already occurred separately

## Stop Conditions

Stop before implementation or go-live recommendation if:

- source-of-truth is ambiguous for the visible claim
- owner semantic acceptance is required but absent
- public copy overclaims execution, production readiness, ROI, certification, full orchestration, or autonomous operation
- private paths, secrets, receipts, raw telemetry, prompt logs, or private evidence JSON appear in public-facing fields
- deployment, production modification, credentials, or go-live approval would be required

## Review Independence

Runner Gang-style local review in this lane is self-attestation unless a separate reviewer or external gate is receipted. Self-attestation can support bounded implementation, but it is not independent Prime Gate approval.

## Negative Fixture

The fixture at `fixtures/negative-forbidden-claim.json` intentionally includes forbidden public claims. It must return `BLOCKED_BEFORE_PROFILE` when run through:

```bash
pnpm public:review -- --input docs/governance/public-surface-runner/v0.1/fixtures/negative-forbidden-claim.json --out docs/governance/public-surface-runner/v0.1/fixtures/negative-forbidden-claim-review.html --json docs/governance/public-surface-runner/v0.1/fixtures/negative-forbidden-claim-result.json
```

## Definition Of Done For This Lane

- `pnpm public:review` works from this repo.
- The generated HTML review packet exists before any go-live readiness recommendation.
- The JSON result records deterministic checks.
- The JSON result records the rules hash.
- The negative forbidden-claim fixture returns BLOCK.
- Any WARN is explained before owner review.
- Any BLOCK stops the update.
- Owner semantic acceptance remains separate from technical validation.
