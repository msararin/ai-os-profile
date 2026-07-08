# Big Crew Source Pack Private Canonicalization and Public-Safe Recovery Master Plan

Date: 2026-07-07
Created during run: 2026-07-08 Asia/Bangkok
Status: BIG_CREW_SOURCE_PACK_PRIVATE_CANONICALIZATION_AND_PUBLIC_SAFE_RECOVERY_MASTER_PLAN_CREATED_LOCAL_ONLY_PENDING_TARGET_DECISION
Claim level: DRAFT_LOCAL_ONLY

## AIOS Role / Runtime / Model Preflight

Source of truth:

`/Users/apple/projects/ai-os-profile/BIG_CREW_SOURCE_PACK_PUBLIC_REMOTE_PUSH_BLOCKER_AND_PRIVATE_CANONICALIZATION_PLAN_20260707.md`

Current task:

Create one read-only master plan artifact that defines the full private canonicalization and sanitized public recovery plan with explicit gates.

Runner / runtime / model:

Codex local artifact creation. No external model call. Codex runtime token/cost not exposed.

Reviewer boundary:

Codex-local governance artifact only. No provider-backed Opus call and no independent external review receipt.

Hard forbidden in this run:

- no push
- no Robert KB sync
- no file copy
- no reset
- no delete
- no force push
- no source page implementation
- no new Big Crew role specs
- no all-role creation
- no deploy
- no live verification
- no Runner / Super Runner reopening
- no telemetry continuation
- no taxonomy PASS / DONE / VERIFIED claim
- no app/source/package/SQLite/auth file mutation
- no primary Robert KB modification
- no destructive git recovery

## AIOS Enforcement Resolver Result

```text
AIOS_ENFORCEMENT_VERSION=v0.2
AIOS_ENFORCEMENT_STATUS=AVAILABLE
AIOS_ENFORCEMENT_PATH=/Users/apple/robert-knowledge-base/02_execution_control/aios_enforcement/AIOS_ENFORCEMENT_V0_2.md
AIOS_ENFORCEMENT_SOURCE=canonical
AIOS_ENFORCEMENT_CLAIM_LEVEL=v0.2_loaded
AIOS_ENFORCEMENT_RESOLVED_PATH=/Users/apple/robert-knowledge-base/02_execution_control/aios_enforcement/AIOS_ENFORCEMENT_V0_2.md
```

Repo path confirmed:

`/Users/apple/projects/ai-os-profile`

Latest source-pack addendum confirmed:

`/Users/apple/projects/ai-os-profile/.codex/project-context/big-crew/source-pack-20260706-numbered/06_OPUS_TAXONOMY_ALIGNMENT_AND_V0_1_ROLE_SET_LOCK_PENDING_OWNER_REVIEW.md`

Latest addendum line count:

`301`

Remote visibility confirmed from existing evidence artifact:

`PUBLIC`

## 1. Current State Summary

Current status label:

`BIG_CREW_SOURCE_PACK_PUBLIC_REMOTE_PUSH_BLOCKER_TRACKED_LOCAL_COMMIT_ONLY_PENDING_PRIVATE_CANONICALIZATION_OR_SANITIZED_INDEX_DECISION`

Repo path:

`/Users/apple/projects/ai-os-profile`

Public remote URL:

`git@github.com:msararin/ai-os-profile.git`

Public remote web URL:

`https://github.com/msararin/ai-os-profile`

Branch:

`main`

Local custody chain commits:

1. `5da07eb71d03c2cc2610a338374a821327545c1f`
   `Add Big Crew source pack custody records`
2. `69f214d7ee5cc055307dda26b05f35b5e39ab8c1`
   `Record Big Crew source pack remote safety decision`
3. `5628f4e3ae2d1dfa353148d628d10ac759b69b23`
   `Record Big Crew public remote push blocker`

Source-pack custody path:

`/Users/apple/projects/ai-os-profile/.codex/project-context/big-crew/source-pack-20260706-numbered/`

Source-pack file count:

`8`

Latest source-pack addendum:

`06_OPUS_TAXONOMY_ALIGNMENT_AND_V0_1_ROLE_SET_LOCK_PENDING_OWNER_REVIEW.md`

Latest addendum line count:

`301`

Current local `main` must not be pushed as-is.

The full source pack must not be pushed to the public remote.

## 2. Decision Principle

Full internal source pack:

Belongs in private canonical custody.

Public repo:

May contain only a sanitized index/reference.

Role specs:

May resume only after private canonical custody exists or an explicit owner waiver exists.

Operational rule:

Public remote durability and private canonical custody are different goals. Do not use a public repository as the storage layer for internal source-pack custody unless the full pack has passed a public-safety review and the owner explicitly approves the exposure.

## 3. Recommended Target Architecture

### A. Private Canonical Custody Layer

Recommended target:

`/Users/apple/robert-knowledge-base/05_evidence/big_crew_source_pack_custody_20260707/`

This layer should hold:

- full source pack
- custody receipts
- remote safety evidence
- push blocker plan
- master plan
- source-of-truth rule
- future-role reusable custody rule

Purpose:

Private canonical custody preserves the full evidence chain without exposing internal role/spec architecture to the public `ai-os-profile` remote.

### B. Public Repo Layer

Recommended target:

`/Users/apple/projects/ai-os-profile/`

This layer should hold only:

- sanitized index/reference
- public-safe role summary if needed
- no full source pack
- no private operational details
- no provider key or sensitive receipt details
- no internal-only paths if public-safe wording requires removal

Purpose:

The public repo should only carry enough context to explain that source-pack custody exists privately and that public-facing role/spec work derives from a controlled source, without publishing the full internal pack.

### C. Local No-Push Custody Branch/State

Current local `main` contains local custody commits and must be treated as no-push until a recovery plan is approved.

The no-push state exists because:

- the remote is public
- the full source pack is tracked locally
- `main` is ahead of `origin/main` by multiple commits
- the worktree has large pre-existing unrelated changes
- there is no sanitized public branch/worktree yet

## 4. Gate Model

### Gate 0 - Current Blocker Acknowledged

Required evidence:

- remote visibility PUBLIC
- public remote URL
- local full source pack tracked
- blocker commit exists

Allowed actions:

- create master plan
- prepare private canonicalization decision

Forbidden actions:

- push current branch
- role specs
- implementation

Failure mode:

`PUBLIC_REMOTE_PUSH_BLOCKER_NOT_ACKNOWLEDGED`

Exit condition:

This master plan exists.

### Gate 1 - Private Canonicalization Target Decision

Required evidence:

- selected private canonical path
- reason why Robert KB/private custody is appropriate
- statement that public repo will receive sanitized reference only

Allowed actions:

- create target decision artifact

Forbidden actions:

- copy full pack before target decision
- push
- role specs

Failure mode:

`PRIVATE_CANONICAL_TARGET_UNDECIDED`

Exit condition:

`BIG_CREW_SOURCE_PACK_PRIVATE_CANONICALIZATION_TARGET_DECISION_20260707.md` exists and is committed local-only or otherwise tracked according to owner instruction.

### Gate 2 - Private Canonicalization Copy Receipt

Required evidence:

- full source pack copied to private target
- exact file list
- file count
- line count for latest addendum
- custody chain included or referenced
- receipt created

Allowed actions:

- copy full pack into selected private custody path
- create copy receipt

Forbidden actions:

- public push
- role specs
- implementation

Failure mode:

`PRIVATE_CANONICAL_COPY_UNRECEIPTED`

Exit condition:

`BIG_CREW_SOURCE_PACK_PRIVATE_CANONICALIZATION_COPY_RECEIPT_20260707.md` exists.

### Gate 3 - Private Custody Tracking / KB Commit Decision

Required evidence:

- KB path exists
- copied files verified
- dirty-worktree risk assessed
- private-vault push gate acknowledged if applicable

Allowed actions:

- local KB commit only if scoped and owner-approved
- KB push only if private-vault safety gate is satisfied and owner-approved

Forbidden actions:

- public repo push
- mixed dirty-worktree commit
- role specs before private canonical source is accepted

Failure mode:

`PRIVATE_CUSTODY_NOT_DURABLE`

Exit condition:

Private canonical custody is either committed locally or explicitly accepted by owner as canonical local-only.

### Gate 4 - Sanitized Public Index/Reference Plan

Required evidence:

- private canonical source exists or owner waiver exists
- sanitized public content rules defined
- list of banned content defined

Allowed actions:

- create sanitized index/reference plan

Forbidden actions:

- include full source pack
- include sensitive owner/internal/provider/private operational details
- include raw private paths if not public-safe
- push without clean public-safe branch

Failure mode:

`PUBLIC_INDEX_NOT_SANITIZED`

Exit condition:

`BIG_CREW_SOURCE_PACK_SANITIZED_PUBLIC_INDEX_PLAN_20260707.md` exists.

### Gate 5 - Public-Safe Clean Worktree / Branch Recovery

Required evidence:

- clean worktree or clean branch from `origin/main`
- staged files contain only sanitized public-safe files
- local no-push custody commits are excluded from public push path

Allowed actions:

- create sanitized index/reference in clean public-safe branch
- commit sanitized public-safe artifact
- push only if staged diff is public-safe and owner-approved

Forbidden actions:

- push local `main` as-is
- push `.codex/project-context/big-crew/source-pack-20260706-numbered/`
- reset/delete dirty worktree without explicit owner-approved recovery plan

Failure mode:

`PUBLIC_PUSH_SCOPE_UNSAFE`

Exit condition:

Public repo contains only sanitized reference, or owner decides public index is unnecessary.

### Gate 6 - Downstream Big Crew Role Spec Resumption

Required evidence:

- private canonical source is accepted
- public exposure risk is handled
- source-of-truth rule is clear
- v0.1 role sequence is locked
- forbidden roles/slices remain blocked

Allowed actions:

- create one role spec at a time
- start with owner-approved next role only

Forbidden actions:

- all-role generation
- separate Frontend/Backend/System Architect specs for v0.1
- Runner / Super Runner reopening
- taxonomy PASS / DONE / VERIFIED claim
- implementation before role spec gate

Failure mode:

`ROLE_SPEC_PREMATURE`

Exit condition:

Owner explicitly authorizes one next role spec.

## 5. Recommended Execution Sequence

1. Create private canonicalization target decision.
2. Commit target decision local-only if in repo.
3. Copy full source pack into Robert KB/private canonical path.
4. Create private canonicalization copy receipt.
5. Decide KB local commit / private push separately.
6. Create sanitized public index/reference plan.
7. Use clean branch/worktree from public `origin/main` for sanitized artifact only.
8. Resume Big Crew role specs one role at a time only after Gate 6.

This sequence intentionally separates private custody, public-safe recovery, and downstream role-spec work.

## 6. Reusable Policy for Future Role Source Packs

Repeatable rule:

- Downloads is temporary intake only.
- Repo-local `.codex/project-context/<role>/` is working custody only.
- Full source pack may be committed locally for custody if needed.
- Public remote push requires remote-safety approval.
- If remote is public, full pack must not be pushed.
- Full source pack goes to private canonical custody.
- Public repo gets sanitized index/reference only.
- Downstream role specs begin only after private canonical source is accepted or owner explicitly waives the gate.

Future role applicability:

This rule applies to Big Crew future roles such as PM Brain, Application Engineer, Infra / Platform Engineer, QA Sentinel, and v0.2+ roles unless owner creates a narrower role-specific exception.

Public-safe index minimum:

- role/source-pack name
- private custody pointer in public-safe terms
- source-pack version/date
- current claim boundary
- blocked actions
- owner decision status
- no private source content
- no non-public operational detail

## 7. Risk Table

| Risk | Impact | Mitigation | Gate that controls it |
| --- | --- | --- | --- |
| Accidental public push | Internal source pack becomes public | Block current `main`; require sanitized clean branch/worktree | Gate 0, Gate 5 |
| Dirty worktree scope bleed | Unrelated files or commits enter custody/public path | Use scoped staging, clean worktree, owner-approved recovery plan | Gate 3, Gate 5 |
| Loss of local-only custody records | Source chain becomes fragile or machine-local only | Move full pack to private canonical custody | Gate 1, Gate 2, Gate 3 |
| Over-governance/process bloat | Work slows and decisions become unreadable | Use gate artifacts only when they unlock the next action | Gate model overall |
| Role-spec drift | Specs start from derived summaries or stale custody state | Block specs until private canonical source accepted | Gate 6 |
| KB clutter | Robert KB becomes a dumping ground for draft packs | Require target decision and path rationale | Gate 1 |
| Sanitized index leaking internal details | Public reference reveals private details | Define banned content before writing index | Gate 4 |
| Destructive git recovery risk | Reset/delete removes unrelated user work or trace | No destructive action without explicit owner-approved recovery plan | Gate 5 |

## 8. Explicit Non-Actions

This master plan creation does not perform:

- push
- Robert KB sync
- file copy
- reset
- delete
- force push
- implementation
- role specs
- deploy
- live verification
- Runner/Super Runner reopening
- telemetry continuation

It also does not claim:

- taxonomy PASS
- taxonomy DONE
- taxonomy VERIFIED
- source page readiness
- public-safe proof
- KB canonicalization complete

## 9. Next Recommended Artifact

The next artifact after this master plan should be:

`BIG_CREW_SOURCE_PACK_PRIVATE_CANONICALIZATION_TARGET_DECISION_20260707.md`

Purpose:

Select and justify the private canonical custody target before any file copy into Robert KB or another private custody path.

Recommended next status after creating this master plan:

`BIG_CREW_SOURCE_PACK_PRIVATE_CANONICALIZATION_AND_PUBLIC_SAFE_RECOVERY_MASTER_PLAN_CREATED_LOCAL_ONLY_PENDING_TARGET_DECISION`

## 10. Git Status Record

Git status before creating this artifact:

The repo had a large pre-existing dirty worktree outside this task scope. The dirty worktree includes modified app/source/package files and many untracked governance artifacts.

This run must not stage or commit this master plan unless explicitly authorized later.

Git status after creating this artifact:

This artifact is expected to appear as untracked local-only:

`BIG_CREW_SOURCE_PACK_PRIVATE_CANONICALIZATION_AND_PUBLIC_SAFE_RECOVERY_MASTER_PLAN_20260707.md`

## 11. Route Ledger

```yaml
task_id: big_crew_source_pack_private_canonicalization_public_safe_recovery_master_plan_20260707
phase: private_canonicalization_public_safe_recovery_master_plan
role: Codex local executor/operator
task_type: read_only_master_plan_artifact
worker_or_agent: Codex
route_type: local_repo_artifact_from_existing_evidence
selected_route: Codex local artifact creation, no external model call
model_provider: OpenAI / Codex runtime, token and cost not exposed
model_requested: not_exposed
model_returned: not_exposed
provider_returned: not_exposed
provider_path: not_exposed
token_input: not_exposed
token_output: not_exposed
token_total: not_exposed
token_source: not_exposed_by_codex_runtime
cost_total: USD 0 external provider spend
cost_source: no external model provider call
usage_capture_status: unavailable_for_codex_runtime
benchmark_validity: draft_local_only
context_boundary: master plan only; no push, KB sync, copy, reset, delete, force push, implementation, role specs, deploy, live verify, Runner/Super Runner, or telemetry continuation
artifact_input_path: /Users/apple/projects/ai-os-profile/BIG_CREW_SOURCE_PACK_PUBLIC_REMOTE_PUSH_BLOCKER_AND_PRIVATE_CANONICALIZATION_PLAN_20260707.md
artifact_output_path: /Users/apple/projects/ai-os-profile/BIG_CREW_SOURCE_PACK_PRIVATE_CANONICALIZATION_AND_PUBLIC_SAFE_RECOVERY_MASTER_PLAN_20260707.md
validation_result: resolver v0.2 available; repo path confirmed; latest addendum exists at 301 lines; public remote finding confirmed from existing evidence artifact
human_review_result: pending_private_canonicalization_target_decision
quality_note: full source pack remains blocked from public remote
next_routing_recommendation: create private canonicalization target decision artifact only
not_available_reason: Codex runtime does not expose token/cost telemetry
enforcement_version_requested: v0.2
enforcement_version_loaded: v0.2
enforcement_path: /Users/apple/robert-knowledge-base/02_execution_control/aios_enforcement/AIOS_ENFORCEMENT_V0_2.md
enforcement_status: AVAILABLE
resolver_status: AVAILABLE
fallback_used: false
fallback_reason: not_applicable
claim_level_impact: DRAFT_LOCAL_ONLY
```

## 12. Post-Run Telemetry Summary

```yaml
provider: none_for_external_model_calls
requested_model: not_applicable
returned_model: not_applicable
prompt_tokens: not_applicable
completion_tokens: not_applicable
total_tokens: not_applicable
cost: USD 0 external provider spend
key_source: not_applicable
openrouter_key_rule: CODEX_OPENROUTER_API_KEY is canonical for Codex/OpenRouter work; no OpenRouter call was made for this artifact
enforcement_version_requested: v0.2
enforcement_version_loaded: v0.2
enforcement_path: /Users/apple/robert-knowledge-base/02_execution_control/aios_enforcement/AIOS_ENFORCEMENT_V0_2.md
enforcement_status: AVAILABLE
resolver_status: AVAILABLE
claim_level: DRAFT_LOCAL_ONLY
```

## 13. Final Status

`BIG_CREW_SOURCE_PACK_PRIVATE_CANONICALIZATION_AND_PUBLIC_SAFE_RECOVERY_MASTER_PLAN_CREATED_LOCAL_ONLY_PENDING_TARGET_DECISION`
