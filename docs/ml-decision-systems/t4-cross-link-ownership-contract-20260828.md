# T4 NBO-NRT Cross-Link and Ownership Contract

Date: 2026-08-28  
Phase: T4 - Cross-Link + Ownership Map  
Status: CANDIDATE  
Base main: `a7e9bccf123c7be8587af062e3c980a925bf3eb1`

## Outcome and authority

This contract assigns each current NBO-NRT knowledge candidate to exactly one future primary home under the three-lens Cockpit architecture. Other lenses may link to that home; they must not copy the primary content.

The machine-readable source is [`t4-nbo-nrt-ownership-map-20260828.json`](./t4-nbo-nrt-ownership-map-20260828.json).

T4 authorizes mapping only. It does not authorize content migration, deletion, UI changes, evidence integration, navigation changes, Event Ledger work, TEST access, model training, model-registry changes, Unity Catalog data mutation, or experiment-state changes.

## Candidate-universe boundary

Included:

- The canonical NBO-NRT Cockpit route and the explicitly enumerated rendered experiment modules in the JSON contract.
- The canonical Experiment 3 policy-learning decision record in Git.

Excluded:

- The separate Telco Churn case study. It may be cross-linked later but is not migrated into NBO-NRT.
- The external LinkedIn Knowledge Sharing archive because repository code does not own the embedded post bodies.
- `layout.tsx`, `experiment3-default-view-injector.tsx`, and `experiment3-deployment-marker.txt`, each explicitly excluded because it contains layout, default-tab, or deployment mechanics rather than knowledge content.

This boundary prevents an unbounded whole-site migration while covering the complete repository-owned NBO-NRT knowledge surface accepted for T4.

## Primary-home decision rules

| Primary home | Ownership test | Examples |
| --- | --- | --- |
| Business & Decisions | The item primarily answers why the decision matters, what action is being selected, what constraint applies, or what claim is allowed. | Mission, business meaning, bounded verdicts, claim boundaries |
| Models & Experiments | The item primarily answers what was hypothesized, modeled, compared, diagnosed, or learned. | Reward-model taxonomy, OPE, support diagnostics, policy formulation |
| Engineering & Evidence | The item primarily answers how evidence is persisted, identified, recovered, governed, reproduced, or isolated. | Unity Catalog, MLflow load-back, readiness gates, TEST isolation |

Tie-break rule: choose the lens that owns the authoritative explanation. Record other interested lenses only in `related_lenses`.

## Coverage summary

| Measure | Required | Candidate result |
| --- | ---: | ---: |
| Knowledge candidates | All in bounded universe | 34 |
| Candidates with one primary home | 100% | 34 / 34 |
| Candidates with no primary home | 0 | 0 |
| Candidates with multiple primary homes | 0 | 0 |
| Related-lens entries repeating the primary home | 0 | 0 |
| Planned duplicated primary content | 0 | 0 |
| Items with an occurrence-reconciliation record | 100% | 34 / 34 |
| Machine-readable cross-link contracts | Required samples | 6 |

Repeated renderings are reconciled by `occurrence_reconciliation` in the JSON contract. A repeated statement in an injector and the canonical decision record is one knowledge item with multiple occurrences, not a second primary home.

Planned migration batches remain isolated:

- T5: Business & Decisions items only.
- T6: Models & Experiments items only.
- T7: Engineering & Evidence items only.

## Cross-link examples required by TC-016

The JSON `cross_links` collection is the executable contract. Every record contains a source item and lens, destination item and lens, planned stable anchor, relationship purpose, permitted short summary, and prohibited duplicated content. T5-T7 must implement or reconcile these records rather than inventing new relationships during migration.

### TEST isolation

`NBO-K033` has one primary home: **Engineering & Evidence**. Models & Experiments links to it when explaining why held-out evaluation is deferred. Business & Decisions links to it when communicating the credibility boundary. Neither lens restates the control as its own primary content.

### Artifact identity and recovery

`NBO-K028` and `NBO-K029` have one primary home: **Engineering & Evidence**. Models & Experiments links to the durable model identity and recovery evidence when relying on a recovered reward model, without copying the recovery procedure into the model narrative.

### Action-by-context support

`NBO-K027` has one primary home: **Models & Experiments** because it is a formulation and evidence-strength diagnostic. Business & Decisions links to its policy restriction; Engineering & Evidence links to the supporting counts and trace artifacts. The diagnostic itself is not duplicated.

## Migration invariant

During T5-T7, a source item remains in place until its batch passes equivalence review. A related lens adds only a stable link and a short relationship statement. It must not reproduce the source item's evidence table, reasoning chain, or claim-boundary text.

No deletion is authorized before T12 stability, equivalence, and traceability confirmation.
