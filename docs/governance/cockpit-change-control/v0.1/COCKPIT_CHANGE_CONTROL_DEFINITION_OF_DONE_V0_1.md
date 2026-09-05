# Cockpit Change Control Definition of Done v0.1

## Owner Amendment — Mandatory Per-Phase Pre-Commit Review (2026-08-30)

This amendment applies to every Cockpit, knowledge-base, specification, evidence,
runtime-proof, route, navigation, and public-surface phase. It is a hard gate,
not optional guidance.

Each phase must be implemented and validated as its own bounded change-set. Before
that phase may be committed or presented to the owner for acceptance, two review
passes must be performed by two distinct reviewer agents, both different from
the phase implementer:

1. **QA Sentinel review** — inspect the actual diff, source-of-truth alignment,
   deterministic validation evidence, missing evidence, failure modes, regression
   risk, claim boundary, rollback, and whether the phase-specific Definition of
   Done is satisfied.
2. **Stakeholder Simulation review** — inspect the rendered or owner-readable
   result from a decision-maker/reviewer perspective for meaning, comprehension,
   usefulness, navigation, disclosure, evidence accessibility, and the risk of
   misleading interpretation.

Both reviewers are read-only reviewers for the candidate. Neither may author,
modify, stage, or fix the change-set it reviews. If a reviewer changes the
candidate, that reviewer becomes an implementer for that candidate and two new
distinct reviewers are required.

The Stakeholder Simulation is a role-authentic perspective review. It must be
labelled `SIMULATED_STAKEHOLDER_LENS_ONLY`; it is not evidence that a real
stakeholder, employer, client, approver, or independent external authority
accepted the work.

The Stakeholder Simulation must use a fresh-context packet containing only the
owner-readable/rendered artifact, phase purpose, declared boundaries, selected
stakeholder persona(s), and acceptance questions. It must record the questions,
answers, comprehension result, and any misleading interpretation; implementation
reasoning must not be supplied as a substitute for what the artifact communicates.

The two reviews must not be collapsed into one reviewer and must not be presented
as independent if either was performed by the phase implementer. A reviewer may
use a separate agent/model only when its actual identity and receipt are recorded.
Role names without separate execution are lenses, not independent approvals.

### Required per-phase evidence packet

Before commit, the phase packet must contain:

- phase ID, objective, scope, exclusions, entry condition, and exact exit claim;
- source-of-truth inputs and any contradiction or stale record discovered;
- changed files and protected files/routes confirmed unchanged;
- applicable acceptance criteria and deterministic validation results;
- runtime or rendered evidence when the claim depends on runtime or appearance;
- claim boundary, prohibited claims, residual risks, rollback, and next action;
- QA Sentinel identity, findings, blocker status, and receipt or durable report;
- Stakeholder Simulation identity, lens label, findings, comprehension verdict,
  and receipt or durable report;
- for each reviewer: actual agent/task ID, executed role, actual-versus-simulated
  status, provider/model, tokens, and cost when exposed; otherwise the exact
  telemetry field must say `NOT_EXPOSED` or `UNAVAILABLE` and must not be invented;
- remediation record for every blocking finding and evidence from the re-review;
- Git diff/status, base SHA, complete candidate file inventory, freeze timestamp,
  and deterministic candidate tree digest;
- owner-review status, which must remain `NOT_PRESENTED` until both review gates
  pass.

### Mandatory verdict sequence

The only permitted sequence is:

`IMPLEMENTED` → `VALIDATED` → `QA_SENTINEL_PASS` →
`SIMULATED_STAKEHOLDER_PASS` → `READY_FOR_OWNER_REVIEW` →
`OWNER_ACCEPTED` → `COMMIT_AUTHORIZED`

A review result of `PASS_WITH_BOUNDARIES` is allowed only when every boundary is
visible in the owner packet and none of the residual risks contradicts the phase
exit claim. Any `FAIL`, missing reviewer, missing receipt, unresolved material
finding, source-of-truth conflict, or misleading stakeholder interpretation sets
the phase to `BLOCKED_PRE_COMMIT`.

No later phase may borrow an earlier phase's review receipt. Reviews must bind to
the exact phase change-set being proposed. Any candidate digest change after
either review invalidates both review verdicts and requires both distinct
reviewers to review the new digest. There is no reviewer waiver for a changed
candidate digest.

The candidate must be frozen as a complete staged tree. Its inventory must include
every intended tracked and newly added file. Untracked, ignored, unstaged, or
otherwise omitted phase files block review. Record the base SHA and candidate tree
using reproducible Git object identity (`git rev-parse HEAD` and the staged tree
from `git write-tree` after verifying `git status --short`). A working-tree
`git diff` hash alone is insufficient because it can omit untracked files.

After commit, the committed tree/diff must be checked against the reviewed
candidate digest and the resulting commit SHA must be added to the phase receipt.
A mismatch sets the phase to `BLOCKED_COMMIT_BINDING` and requires both reviews
to run again. The next phase must not start until the current phase evidence and
commit binding are complete.

All applicable Critical and High acceptance tests must pass. Medium or Low tests
may be deferred only when the phase contract permits it and the owner packet names
the limitation and backlog identity. Reviewer unavailability cannot waive a
Critical/High test, either independent review, or a source-of-truth conflict.

## Definition Of Done

### Prime Gate RCA amendment — terminating review binding (2026-09-06)

The phrase “exact staged candidate” is implemented as two cryptographically
bound layers to prevent a self-referential, non-terminating review loop:

1. `T_impl` contains the frozen implementation and governance-source files.
   A freeze manifest records its ordered file inventory, SHA-256 values,
   aggregate digest, base SHA, and UTC freeze timestamp.
2. `T_meta` is append-only evidence containing validation receipts, rendered
   evidence, reviewer work products, and the final deterministic verifier
   receipt. Every reviewer receipt binds to the same `T_impl` digest.

Adding `T_meta` does not invalidate a review when a deterministic verifier
proves every `T_impl` byte remains unchanged. The final commit must enclose both
layers, and post-commit binding must verify that the committed `T_impl` matches
the freeze manifest. Any `T_impl` change still invalidates both reviews. This
amendment does not waive reviewer independence, evidence completeness, owner
acceptance, deployment gates, or claim boundaries.

A covered public/cockpit change is done only when all required gates are satisfied:

1. Change-control manifest exists and parses as JSON.
2. Owner-intended meaning is stated in plain language.
3. Affected routes and files are named.
4. Protected routes not in scope are named.
5. Claim boundary is explicit.
6. Validation plan and rollback plan exist.
7. Owner semantic acceptance status is recorded.
8. Deployment allowed status is recorded.
9. Deterministic validation passes.
10. Deterministic validation was executed by the authorized runner and its evidence is retained.
11. A separate QA Sentinel reviewed the exact candidate change-set and returned PASS or bounded PASS with no unresolved blocker.
12. A separate Stakeholder Simulation reviewed the owner-readable/rendered result and returned PASS or bounded PASS with no misleading interpretation.
13. Both reviewer identities, role boundaries, findings, receipts, and re-review results are retained in the phase packet.
14. Owner local review packet is prepared only after items 1–13 pass.
15. Owner semantic acceptance is obtained before commit unless the owner explicitly grants a bounded standing commit authority for that phase.
16. No push, merge, deploy, live verification, or public release occurs unless separately authorized by the owner and required downstream gates pass.

## Block Conditions

Block the change if:

- The manifest implies go-live without owner approval.
- Protected public routes are modified without explicit authorization.
- The change implies unsupported execution success, readiness, ROI, replacement, production/runtime readiness, or independent multi-worker proof.
- The packet exposes credentials, private receipt material, or internal-only evidence locations.
- The owner-intended meaning is ambiguous or contradicted by the patch.
- QA Sentinel or Stakeholder Simulation was performed only by the implementer and presented as independent review.
- Either mandatory reviewer is missing, unavailable, has no durable receipt, or has an unresolved material finding.
- A material change was made after review without re-running both pre-commit reviews.
- Either reviewer authored, modified, staged, or fixed any part of the candidate it reviewed.
- The QA Sentinel and Stakeholder Simulation are the same agent or share the phase implementer's identity.
- The candidate digest is absent, changes after review, or does not match the committed tree/diff.
- Candidate files are untracked, ignored, unstaged, omitted from the inventory, or absent from the staged-tree digest.
- Reviewer role/agent identity or provider/model/token/cost telemetry is missing without an explicit `NOT_EXPOSED` or `UNAVAILABLE` marker.
- An applicable Critical or High acceptance test is missing, failed, or supported only by assertion.
- A prior phase has not closed with committed evidence and an accepted exit status.
- The Stakeholder Simulation is represented as real stakeholder approval or external acceptance.
- Runtime, deployment, responsive, or production claims rely only on static/local evidence.

## Phase Closeout Checklist

Use this checklist for every phase before presenting it to the owner:

- [ ] Meaning and intended decision are understandable in plain language.
- [ ] ML, LLM/Agent, governance-runtime, and MLOps evidence are classified correctly and not conflated.
- [ ] Measurement includes baseline/denominator/freshness where applicable.
- [ ] Trust boundary identifies environment, authority, sensitivity, provider/model, and public/private status.
- [ ] Custody binds evidence to files, routes, runtime, commit/diff identity, and timestamps.
- [ ] Base SHA and deterministic candidate tree/patch digest are recorded.
- [ ] Candidate is frozen as a complete staged tree; no intended file is untracked, ignored, unstaged, or omitted.
- [ ] Phase-specific acceptance tests pass.
- [ ] Protected state and no-touch surfaces are verified.
- [ ] Runtime behavior is tested when a runtime claim is made.
- [ ] Rendered responsive behavior is tested when a visual claim is made.
- [ ] Public evidence is reviewable without requiring privileged Databricks access, unless explicitly internal-only.
- [ ] QA Sentinel review passes with a durable receipt.
- [ ] Stakeholder Simulation passes with `SIMULATED_STAKEHOLDER_LENS_ONLY` clearly stated.
- [ ] Stakeholder Simulation used a fresh-context persona packet and retained its questions, answers, and comprehension findings.
- [ ] Both reviewers were read-only and their agent/model/provider/token/cost telemetry is recorded or explicitly unavailable.
- [ ] All blocking findings are remediated and re-reviewed.
- [ ] The committed tree/diff matches the reviewed candidate digest and the commit SHA is recorded.
- [ ] Current-phase evidence is committed before the next phase begins.
- [ ] Final claim is calibrated to the weakest material evidence.
- [ ] Owner packet lists changes, evidence, boundaries, residual risks, and the next authorized action.
