# Rollback Plan

If owner rejects the local patch or validation fails:

1. Remove the adjacent `AIOS Capability Layer` block from `app/ai-operating-system/page.tsx`.
2. Remove the adjacent `AIOS Capability Layer` block from `app/lean-value-tree/page.tsx`.
3. Keep the North Star sentence unchanged.
4. Re-run typecheck, lint, build, and local route smoke.
5. Do not deploy.

Because this recovery sequence uses a clean worktree and scoped commits, rollback can also be performed by reverting the scoped patch commit after owner decision.
