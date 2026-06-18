# PUBLIC_CASE003_RESTORE_PLAN

## Source of Truth

- Problematic public patch commit: 7e08a04b0f7455279efcb7f60bfe657d1b292412
- Parent commit before patch: 16fa9d0eafb93cccb4284387e87d7cd7f98846d9
- Affected files:
  - app/achievements/page.tsx
  - app/architecture/system-health/page.tsx
  - app/knowledge-sharing/page.tsx

## Restore Method

Use a scoped reverse application of the public CASE-003 patch against only the affected files.

Reason: the worktree contains unrelated dirty changes, including a later local addition in `app/achievements/page.tsx`. A full file checkout from the parent commit would overwrite unrelated local work. A scoped reverse patch removes only the diff introduced by `7e08a04b0f7455279efcb7f60bfe657d1b292412`.

## Steps

1. Record freeze and incident files.
2. Capture exact commit parent and diff summary.
3. Reverse-apply only the public CASE-003 changes from the patch commit for the three affected files.
4. Confirm no unrelated dirty files are staged or included.
5. Validate typecheck, lint, build, local smoke, claim scan, and leakage scan.
6. Commit only restore and incident/RCA/policy artifacts needed for this task.
7. Deploy through the existing safe deployment path only after validation passes.
8. Smoke live routes and confirm disliked CASE-003 framing is gone.

## Stop Condition

If scoped restore cannot be performed safely, stop with:

RESTORE_BLOCKED_NEEDS_OWNER_DECISION
