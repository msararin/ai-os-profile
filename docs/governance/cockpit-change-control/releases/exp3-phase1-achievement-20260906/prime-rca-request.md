# Prime Gate RCA request — Cockpit pre-commit review binding

## Role boundary

Prime Gate may adjudicate the governance contradiction, evidence sufficiency, defect classification, bounded mitigation, and claim ceiling only. It must not edit files, run commands, impersonate QA/Stakeholder reviewers, or approve deployment.

## Candidate

- Phase: `COCKPIT_EXP3_PHASE1_ACHIEVEMENT_20260906`.
- Base SHA: `974e77f7d4a3b8e44b06d4b2191676013766d19b`.
- Initial frozen staged tree: `f32510b6ef0934569cc3831e83ae2e6823833385`.
- Change: one EXP3 Achievement card plus deterministic validator and governance evidence.
- No deploy; B1 remains active; no TEST/training/policy/production/uplift claims.

## Separate reviews

- QA Sentinel `/root/exp3_achievement_qa`, read-only: `FAIL / BLOCKED_PRE_COMMIT`.
- Stakeholder Simulation `/root/exp3_achievement_stakeholder`, read-only and labelled `SIMULATED_STAKEHOLDER_LENS_ONLY`: `PASS_WITH_BOUNDARIES`.
- Provider/model/tokens/cost for these internal task agents are `NOT_EXPOSED`/`UNAVAILABLE`; no external-provider identity is claimed.

## QA blockers to remediate

1. Add freeze timestamp and candidate binding.
2. Add hash-addressed, public-safe MLOPS source reconciliation.
3. Retain validation logs/receipts.
4. Add rendered method/timestamp/revision/DOM evidence and screenshots where safe.
5. Preserve page-wide mobile-overflow limitation.
6. Change owner state from premature approval to `NOT_PRESENTED`.
7. Retain both reviewer reports/telemetry.
8. Add severity-mapped acceptance criteria and next action.
9. State substring validator limitation.

## Governance contradiction requiring RCA

The Cockpit DoD requires both independent reviewer receipts to be inside the exact staged candidate before commit and says any candidate digest change after review invalidates both reviews. But reviewer receipts can only be produced after reviewers inspect a frozen digest. Adding those receipts changes the staged tree, causing a new digest; reviewing that digest creates new receipts, which changes the digest again. Embedding a tree digest inside a blob that contributes to that same tree also creates a self-reference problem.

## Requested adjudication

Classify whether this is a genuine non-terminating/self-referential control defect. Prescribe a bounded, auditable termination protocol that preserves: (a) exact implementation candidate binding, (b) reviewer independence, (c) durable review receipts, (d) post-commit binding, and (e) no deployment. State whether receipts may be treated as an append-only meta-evidence layer bound by hashes to an immutable implementation tree, with a final deterministic verifier confirming source blobs unchanged. Return RCA, defect severity, mitigation steps, residual limitations, and claim ceiling only.
