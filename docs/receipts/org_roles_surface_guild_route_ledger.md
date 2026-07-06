# /org-roles Surface Guild Route Ledger

Status: DRAFT_LOCAL_ONLY
Final status: ORG_ROLES_SURFACE_GUILD_IA_REPAIRED_LOCAL_ONLY
Date: 2026-07-06

## AIOS Enforcement

- Resolver command: `cd /Users/apple/robert-knowledge-base && scripts/resolve-aios-enforcement.sh`
- Version: v0.2
- Status: AVAILABLE
- Path: `/Users/apple/robert-knowledge-base/02_execution_control/aios_enforcement/AIOS_ENFORCEMENT_V0_2.md`
- Claim level: v0.2_loaded

## Route Detection

- Repo: `/Users/apple/projects/ai-os-profile`
- Existing source path: `app/org-roles/page.tsx`
- Existing nested role-detail route convention: none found under `app/org-roles`
- Selected IA:
  - `/org-roles` compact hub/index
  - `/org-roles/data-team` Data Team detail page
  - `/org-roles/runner-execution-layer` Runner / Super Runner detail page
- New route files:
  - `app/org-roles/data-team/page.tsx`
  - `app/org-roles/runner-execution-layer/page.tsx`
- Local route checks:
  - `/org-roles`: 200 OK
  - `/org-roles/data-team`: 200 OK
  - `/org-roles/runner-execution-layer`: 200 OK

## Route Scope

Authorized Surface Guild / Surface Runner / UI / IA repair:

- Reject same-page full-detail pattern.
- Move long role details out of `/org-roles`.
- Keep `/org-roles` as compact role hub/index.
- Preserve Data Team and Runner narratives on dedicated role detail pages.
- Preserve claim boundaries and non-claims.

## Boundaries

- No commit.
- No push.
- No deploy.
- No live verification claim.
- No A+ claim.
- No production readiness claim.
- No framework compliance/certification claim.
- No provider-backed telemetry verification claim.
- No Runner authority claim.
- No global layout, nav, theme, or shared style edits.
- No new dependencies.
- No file renames.

## Dirty State

The repo had pre-existing local modifications before this Surface Guild pass, including prior `/org-roles` work. This ledger covers only the bounded IA repair files and required receipts.

Ledger status: COMPLETE_LOCAL_ONLY
