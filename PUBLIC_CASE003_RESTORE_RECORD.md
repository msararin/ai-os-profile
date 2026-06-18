# PUBLIC_CASE003_RESTORE_RECORD

## Restore Status

- Restore performed: yes
- Restore method: scoped restore from parent commit plus manual achievement hunk restoration
- Problematic patch: 7e08a04b0f7455279efcb7f60bfe657d1b292412
- Parent restored from: 16fa9d0eafb93cccb4284387e87d7cd7f98846d9
- Destructive reset used: no
- Force push used: no

## Restored Public Files

- app/achievements/page.tsx
- app/architecture/system-health/page.tsx
- app/knowledge-sharing/page.tsx

## What Was Removed

- CASE-003 pre-execution governance achievement card added by the public patch.
- CASE-003 governance update block on system health.
- CASE-003 governance lesson block on knowledge sharing.
- Footer/latest milestone text pointing to the disliked CASE-003 framing.
- Sanitized replacement text from the patch that changed the prior June 9 evidence reference wording.

## What Was Preserved

- Existing pre-patch public content.
- Existing public claim boundaries.
- Unrelated dirty work in the worktree was not reverted.
- A separate unrelated local achievement entry in `app/achievements/page.tsx` remains unstaged and must not be included in the restore commit unless separately approved.

## Commit Scope Rule

The restore commit must stage the three affected route files in their restored state and the incident/RCA/policy evidence files only. It must not stage unrelated dirty files.
