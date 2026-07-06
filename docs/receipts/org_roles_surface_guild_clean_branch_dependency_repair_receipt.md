# /org-roles Surface Guild Clean Branch Dependency Repair Receipt

Status: ORG_ROLES_SURFACE_GUILD_CLEAN_BRANCH_DEPENDENCY_REPAIRED_LOCAL_ONLY
Date: 2026-07-06

## AIOS Enforcement

- Version: v0.2
- Status: AVAILABLE
- Path: `/Users/apple/robert-knowledge-base/02_execution_control/aios_enforcement/AIOS_ENFORCEMENT_V0_2.md`
- Claim level: v0.2_loaded

## Clean Branch Context

- Branch: `org-roles-surface-guild-ia-repair-20260706`
- Base commit from `origin/main`: `fb967c44ab3c3819d6e534e78d4894496d558d52`
- Cherry-picked Surface Guild IA repair commit: `5bb3718`

## Root Cause

The clean-branch cherry-pick imported `executionControlRoles` from `@/lib/aios-execution-control-measurement`, but that file is not present on clean `origin/main`.

The file exists only as an untracked local file in the dirty original worktree:

- `/Users/apple/projects/ai-os-profile/lib/aios-execution-control-measurement.ts`

That untracked file contains more exports than the `/org-roles` page needs, including measurement trace summaries, metric names, and blocked performance-claim lists.

## Imported Symbols Found

The only imported symbol was:

- `executionControlRoles`

Usage in `app/org-roles/page.tsx`:

- Operating org chart role labels
- Execution Control Role Cards

The page uses only role display fields:

- `name`
- `label`
- `primaryResponsibility`
- `evidenceContribution`
- `notAllowed`
- `bigCrewRelationship`

## Dependency Classification

- Required for `/org-roles` content: YES, but only as display data.
- Public-safe: YES, the three role records are public-facing boundary text.
- Scoped to org-roles / AIOS evidence display: YES.
- Related to broader measurement helper: the missing file contains additional exports beyond this slice.

## Chosen Repair

Option B: localize the minimal public-safe data inside `app/org-roles/page.tsx`.

Reason:

- It is the smallest scoped fix.
- It removes the missing dependency without adding a broader untracked library.
- It avoids dragging unrelated measurement arrays into the clean publish branch.
- It preserves the org-roles IA repair and existing public-facing copy.

## Files Changed

- `app/org-roles/page.tsx`
- `docs/receipts/org_roles_surface_guild_clean_branch_dependency_repair_receipt.md`

## Validation Results

- `git diff --check`: PASS
- `rtk pnpm typecheck`: PASS
- `rtk pnpm lint`: PASS with 5 pre-existing warnings outside this slice
- `rtk pnpm build`: PASS; build emitted existing Next.js multiple-lockfile workspace-root warning
- Claim-boundary scan on org-roles files: PASS, with matches only in explicit boundary/non-claim language
- Global layout/nav/theme/shared style files changed: NO
- Unrelated files included: NO

## Non-Claims

This repair does not claim:

- push completed
- deploy completed
- live verification
- production readiness
- A+ grade
- framework compliance/certification
- provider-backed telemetry verification
- production telemetry verification
- Runner authority

Receipt status: COMPLETE_LOCAL_ONLY
