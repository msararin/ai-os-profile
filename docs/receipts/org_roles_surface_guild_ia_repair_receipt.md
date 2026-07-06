# /org-roles Surface Guild IA Repair Receipt

Status: DRAFT_LOCAL_ONLY
Final status: ORG_ROLES_SURFACE_GUILD_IA_REPAIRED_LOCAL_ONLY
Date: 2026-07-06

## Source of Truth

- Owner visual feedback.
- Rendered `/org-roles` PDF feedback summarized by owner.
- Current same-page Data Team and Runner detail pattern rejected as too dense, text-heavy, and box-heavy.

## Files Changed

- `app/org-roles/page.tsx`
- `app/org-roles/role-detail-content.tsx`
- `app/org-roles/data-team/page.tsx`
- `app/org-roles/runner-execution-layer/page.tsx`
- `docs/receipts/org_roles_surface_guild_route_ledger.md`
- `docs/receipts/org_roles_surface_guild_ia_repair_receipt.md`
- `docs/receipts/org_roles_surface_guild_telemetry_receipt.md`

## Implementation Summary

- Removed the long full Data Team and Runner detail sections from the `/org-roles` hub.
- Created dedicated Data Team detail route at `/org-roles/data-team`.
- Created dedicated Runner / Super Runner detail route at `/org-roles/runner-execution-layer`.
- Added a local reusable role-detail data/template module under `app/org-roles/role-detail-content.tsx`.
- Kept `/org-roles` as a compact hub with capability cards, chips, claim-boundary badges, and detail-page CTAs.
- Moved capability cards directly below the hero so users see the clicked-detail options in the first rendered view.
- Collapsed the operating org chart and supporting policies by default so the hub no longer reads as a long manual.
- Used existing components and classes only.

## Detail Page Template

Both detail pages use the same structure:

1. Hero summary
2. At-a-glance panel
3. Why this role exists
4. What was upskilled
5. Permanent skill pack
6. Operating principles
7. External references and how they are used
8. How this role applies the skill
9. Inputs / Outputs
10. Escalates to
11. Evidence: Available Evidence / Missing Evidence / Claims Not Made
12. Upskill Path / Promotion Evidence

## UX Result

- `/org-roles` is no longer a long sequence of full detail boxes.
- Data Team and Runner detail pages use the same template.
- Detail pages use at-a-glance panels, side section nav, compact cards, and native disclosure blocks.
- Evidence and non-claims remain readable but are not the first visual weight on the page.
- Data Team upskill/reference narrative is preserved.
- Runner operating principles are preserved.

## Rendered Proof

Final screenshot artifacts:

- `/org-roles`: `tmp/org-roles-surface-guild-proof/org-roles-final.png`
- `/org-roles/data-team`: `tmp/org-roles-surface-guild-proof/data-team-final.png`
- `/org-roles/runner-execution-layer`: `tmp/org-roles-surface-guild-proof/runner-execution-layer-final.png`

Rendered proof result:

- `/org-roles`: PASS. Hub shows compact capability cards in the first rendered view and collapses the large org chart.
- `/org-roles/data-team`: PASS. Detail page shows hero, at-a-glance, section nav, and capability explanation.
- `/org-roles/runner-execution-layer`: PASS. Detail page shows hero, at-a-glance, section nav, and preserved Runner boundary.

## Validation

- `git diff --check`: PASS
- `rtk pnpm typecheck`: PASS
- `rtk pnpm lint`: PASS with 6 pre-existing warnings outside this slice
- `rtk pnpm build`: PASS; build emitted existing Next.js multiple-lockfile workspace-root warning
- Local HTTP checks:
  - `/org-roles`: 200 OK
  - `/org-roles/data-team`: 200 OK
  - `/org-roles/runner-execution-layer`: 200 OK

## Claim-Boundary Scan

Command:

`rtk rg -n -i "A\\+|production ready|verified|certified|compliant|approved by Opus|production telemetry verification|provider-backed telemetry verification|full row-level completeness|live monitoring|production graph readiness|Runner authority|Runner is Gate|Runner is final reviewer|Runner is approval authority|Runner is self-verifier" app/org-roles`

Result:

- Matches appear only in explicit boundary, Missing Evidence, or Claims Not Made language.
- No affirmative A+, live verification, production readiness, framework compliance/certification, provider-backed telemetry verification, production telemetry verification, full row-level completeness, live monitoring, production graph readiness, approved-by-Opus, or Runner authority claim was introduced.

## Scope Checks

- No global layout/nav/theme/shared style changes: PASS
- No unrelated page edits: PASS
- No new dependencies: PASS
- No file renames: PASS
- No unrelated role content changed except compact hub presentation and CTAs needed for the IA repair: PASS

## Remaining Missing Evidence

- No live route verification.
- No deploy evidence.
- No provider-backed telemetry verification.
- No production telemetry verification.
- No full row-level completeness.
- No live monitoring.
- No production graph readiness.
- No final A+ grade.

Repair status: COMPLETE_LOCAL_ONLY
