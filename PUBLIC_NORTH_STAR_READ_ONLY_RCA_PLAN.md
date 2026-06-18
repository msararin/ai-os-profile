# PUBLIC_NORTH_STAR_READ_ONLY_RCA_PLAN

## Concern

The North Star issue is high-risk because it may indicate a source-of-truth or public mapping problem. The owner expected the core strategy to reflect measurement discipline, evidence quality, Runner Gang, Prime Gate, and AIOS differentiation.

If the public North Star falls back to older or thinner wording, that must be investigated before any rewrite.

## Read-Only RCA Scope

Allowed:

- Identify all current North Star public surfaces.
- Identify internal source(s) that should govern North Star wording.
- Compare public route wording against the expected source-of-truth.
- Identify whether the issue is stale content, wrong source mapping, wrong semantic layer, or missing deployment.
- Record findings and owner decision points.

Blocked:

- No public wording changes.
- No route patch.
- No portfolio or cockpit rewrite.
- No deployment.

## Initial Local Clues

- `docs/SPEC-v3.md` records North Star as: "Sustainable economic leverage through an AI-assisted personal operating system."
- `scripts/regression-v3.sh` checks for that older/thinner phrase in `app/lean-value-tree/page.tsx`.
- `app/ai-operating-system/page.tsx` and `app/lean-value-tree/page.tsx` contain North Star public-surface references.

These clues require read-only RCA. They are not approval to rewrite public copy.
