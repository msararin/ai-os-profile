# Prime Gate RCA — COCKPIT_EXP3_PHASE1_ACHIEVEMENT_20260906

**Scope**: Bounded adjudication only. No artifact edits, no command execution, no reviewer impersonation, no deploy authorization. Findings derived solely from the supplied packet.

---

## 1. RCA — Governance/Control Contradiction

**Finding**: Genuine, reproducible **self-referential control defect** in the Cockpit DoD. Not reviewer error, not evidence gap.

**Mechanism**:
- DoD constraint A: "Both reviewer receipts must reside *inside* the exact staged candidate tree prior to commit."
- DoD constraint B: "Any digest change after review invalidates prior reviews."
- Reviewer receipts are producible only *after* inspection of a frozen digest D₀.
- Embedding receipts into the tree yields digest D₁ ≠ D₀ → invalidates receipts per B.
- Re-review at D₁ produces new receipts → D₂, ad infinitum.
- Additionally: embedding digest D_n inside a blob whose bytes contribute to D_n is a fixed-point self-reference (Kleene-style), not solvable by ordering.

**Classification**: Non-terminating control loop **with** embedded self-reference. Both failure modes are present and independent.

---

## 2. Defect Severity

**Severity: HIGH (governance-control), NOT safety-critical.**

Rationale:
- Blocks *all* pre-commit gated candidates under current DoD wording — systemic, not candidate-specific.
- No runtime, deployment, policy, training, or user-facing exposure (B1 remains active; no deploy requested).
- Deterministic and reproducible; not intermittent.
- Discovered pre-commit by paired reviewers as designed — detection layer worked.

Downgrade from CRITICAL because the outer guard (no commit, no deploy) held.

---

## 3. Prescribed Bounded Termination Protocol

**Adjudication**: Receipts **MAY** be treated as an **append-only meta-evidence layer**, hash-bound to an immutable implementation tree, provided the following invariants hold. This resolves both the loop and the self-reference.

### Two-layer separation (mandatory)

- **Layer I — Implementation tree T_impl**: source blobs only (the EXP3 Achievement card, deterministic validator, governance source docs). Frozen once. Digest H_impl computed and never mutated thereafter.
- **Layer II — Meta-evidence tree T_meta**: reviewer receipts, freeze timestamp, candidate binding, rendered/DOM evidence, validation logs, limitation statements. Append-only. References H_impl by hash. Never contributes bytes back into T_impl.

### Termination protocol (five steps, deterministic)

1. **Freeze**: stage T_impl; record H_impl, UTC freeze timestamp, base SHA `974e77f…`, candidate label. Publish freeze manifest M₀ containing (H_impl, timestamp, base SHA, candidate ID).
2. **Independent review**: QA Sentinel and Stakeholder Simulation each inspect H_impl read-only; each emits a receipt whose payload cryptographically references H_impl and M₀. Reviewers do not see each other's receipts (independence preserved).
3. **Append**: receipts are written into T_meta only. T_impl bytes remain bit-identical; H_impl is unchanged by construction.
4. **Deterministic verifier** (final gate): recomputes H_impl from staged source blobs; confirms equality with H_impl in M₀ and with H_impl referenced inside each receipt. Verifier output is itself appended to T_meta with its own hash.
5. **Commit**: single commit encloses T_impl ∪ T_meta. Post-commit binding achieved by commit SHA covering both layers; tamper of either layer changes commit SHA.

### Why this terminates

- Receipts reference H_impl by hash; they are *not* inputs to H_impl. Fixed-point eliminated.
- No re-review is triggered because T_impl is provably unchanged (verifier attests).
- Loop collapses to a finite DAG: T_impl → receipts → verifier → commit.

### Independence preservation

- Reviewers operate in isolated read-only worktrees (`/root/exp3_achievement_qa`, `/root/exp3_achievement_stakeholder` as already used).
- Neither reviewer's receipt is visible to the other pre-emission.
- Stakeholder receipt retains `SIMULATED_STAKEHOLDER_LENS_ONLY` label; not conflated with human stakeholder sign-off.

---

## 4. Required Mitigation Steps (bounded, addressing QA blockers 1–9)

Prime Gate prescribes; execution belongs to the implementer, not this role.

1. Amend Cockpit DoD language: replace "receipts inside the staged candidate" with "receipts in append-only meta-layer hash-bound to frozen implementation digest." (Resolves contradiction at source.)
2. Add freeze manifest M₀ with UTC timestamp + candidate binding (QA #1).
3. Add hash-addressed, public-safe MLOPS source reconciliation record in T_meta (QA #2).
4. Retain validator logs and receipts in T_meta (QA #3, #7).
5. Add rendered-method/timestamp/revision/DOM evidence + safe screenshots in T_meta (QA #4).
6. Explicit limitation note: page-wide mobile overflow unresolved and preserved as known limitation (QA #5).
7. Owner state → `NOT_PRESENTED` until commit + post-commit review complete (QA #6).
8. Severity-mapped acceptance criteria with declared next action in T_meta (QA #8).
9. Explicit note: validator uses substring matching; not semantic equivalence (QA #9).
10. Deterministic verifier must re-derive H_impl and assert equality; verifier output archived.

---

## 5. Residual Limitations (must remain declared)

- Substring-based validator ≠ semantic validation.
- Page-wide mobile overflow persists; not remediated by this candidate.
- Stakeholder Simulation is a lens, not a real stakeholder; label must survive commit.
- Internal task-agent provider/model/tokens/cost are `NOT_EXPOSED`/`UNAVAILABLE`; no external-provider identity may be asserted.
- Meta-layer integrity depends on commit SHA covering both layers; a repository allowing detached meta edits post-commit would break the binding. Ensure single-commit enclosure.
- Deterministic verifier attests byte-identity of T_impl, not correctness of source semantics.

---

## 6. Claim Ceiling

Permitted claims for this candidate, **maximum**:

- "One EXP3 Achievement card, deterministic validator, and governance evidence staged pre-commit."
- "Two independent internal reviewers (QA Sentinel; Stakeholder Simulation, labelled) inspected frozen digest read-only."
- "Governance contradiction identified pre-commit; bounded termination protocol prescribed."
- "No deploy performed; B1 remains active."

**Prohibited claims** (ceiling):

- No TEST, training, policy, production, or uplift claims.
- No human stakeholder approval claim.
- No external-provider attestation.
- No "reviewed and approved" — reviews are on record; approval authority is not Prime Gate's and is not granted here.
- No claim that mobile-overflow or substring-validator limitations are resolved.

---

## 7. Adjudication Summary

| Item | Ruling |
|---|---|
| Genuine self-referential defect? | **Yes** |
| Severity | **HIGH governance-control; non-safety** |
| Append-only meta-evidence layer permitted? | **Yes**, under Section 3 invariants |
| Final deterministic verifier required? | **Yes**, mandatory |
| Commit authorized by this adjudication? | **No** — outside Prime Gate scope |
| Deploy authorized? | **No** — explicitly prohibited |
| Reviewer receipts durable post-commit? | **Yes**, via commit SHA enclosing both layers |

End of bounded adjudication.
