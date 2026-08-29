# T7 Engineering & Evidence Migration Receipt

Date: 2026-08-29
Base: `c8c5425d0c57341ef45e8f16c0160be432694391`
Lane: Engineering & Evidence content migration only

## Route Ledger

| Field | Contract |
| --- | --- |
| Outcome | Let a reviewer trace observations, interpretations, decisions, durable artifacts, recovery, gates, lineage, and Experiment 3 TEST custody without inferring business or model claims. |
| Sources | Supplied Spec/DoD PDF and Test Cases XLSX; T4 ownership/cross-link contracts; retained legacy components; Experiment 3 decision record. |
| Allowed | Add one Engineering lens, mount it at the existing lens location, preserve stable anchors, validate, commit/PR/deploy after gates pass. |
| Forbidden | Event Ledger infrastructure/UI integration, navigation, IA change, legacy deletion, TEST access, training/scoring, registry/model/UC data mutation. |
| Stop gates | Inference promoted to fact; V1/V2 identity conflation; Experiment 2B TEST conflated with Experiment 3 TEST; missing legacy evidence; mixed phase scope. |
| Rollback | Revert T7 only; T5/T6 lenses and legacy evidence remain intact. |

## Ownership and equivalence

The candidate contains exactly these 11 primary-home IDs: `NBO-K003`, `NBO-K004`, `NBO-K006`, `NBO-K007`, `NBO-K011`, `NBO-K013`, `NBO-K014`, `NBO-K028`, `NBO-K029`, `NBO-K033`, `NBO-K035`.

- K003 retains the four-state static snapshot and explicitly denies business-readiness inference.
- K004 retains the five-stage preparation journey and labels the distinct 805-source-row / 806-Bronze-row custody stages.
- K006 retains all six phase states, results, boundaries, and all 45 detailed sub-phase evidence rows.
- K007 retains the 10,000 total / 8,002 TRAIN / 1,998 TEST distinction, V1 run/model/version/Candidate/read-back identity, and lifecycle-only boundary.
- K011 retains the eight ordered Experiment 2A preparation steps, each step's purpose/status/gate, the Data Team ownership, reference principle, and gate-contained evidence structure.
- K013 retains G0-G7 names, objectives, and evidence-contract grammar.
- K014 retains the supporting controls and their non-outcome boundary.
- K028 retains the exact clean-notebook recovery run, 8,002 TRAIN rows, five-row scoring proof, Serverless/MLflow version, temp path, recovery chain, and no-authorization-change boundary.
- K029 separates the exact V1 run identity from the later V2 durability statement and retains `train → persist → load back → verify → continue`.
- K033 preserves the Experiment 3 TEST-isolation reasoning, design-contamination risk, pre-TEST questions, and historical Experiment 2B separation.
- K035 surfaces reasoning rather than status alone, provides the bounded static Event Ledger custody relationship, and treats the old `NO COCKPIT DEPLOYMENT` label as historical save authority. It does not create ledger infrastructure.

Stable cross-link destinations `#knowledge-nbo-k028`, `#knowledge-nbo-k029`, and `#knowledge-nbo-k033` occur once. XL001/002/003/004/006 summaries remain in their origin lenses; Engineering owns the full custody records. Engineering links to K027/K030 only for related impact and does not copy their model diagnostics.

## Test gates

- **TC-024:** UC, MLflow, recovery, artifact identity, lineage/gates, Event Ledger boundary, and TEST-control homes exist.
- **TC-025:** sample articles explicitly label Observation/Evidence, Interpretation, and Decision; execution facts are not promoted to model/business facts.
- **TC-026:** recovery and identity records link related model impact rather than duplicating the diagnostic.
- **TC-049:** no TEST, training, scoring, registry/model, or Unity Catalog data operation was executed. Twelve protected legacy/source files are byte-identical to base.
- **TC-050:** change-set is limited to the Engineering lens, its existing mount/boundary copy, and this receipt.

## Deterministic validation

- `pnpm typecheck` — PASS
- scoped ESLint — PASS
- `pnpm build` — PASS; 47/47 pages
- `git diff --check` — PASS
- rendered static route — exact 11 IDs, stable anchors once, no unresolved local fragments, legacy surface retained
- protected manifest comparison — no diff; base/work digest: `add5d510e78bccb355b6a1aeeab1b37459555069a599322817b36fe9f8263077`

The T7 protected manifest uses these 12 explicit paths:

1. `app/case-studies/nbo-nrt-azure-databricks/experiment-tabs.tsx`
2. `app/case-studies/nbo-nrt-azure-databricks/data-preparation-infographic-injector.tsx`
3. `app/case-studies/nbo-nrt-azure-databricks/experiment2b-structure-injector.tsx`
4. `app/case-studies/nbo-nrt-azure-databricks/experiment3-recovery-evidence-injector.tsx`
5. `app/case-studies/nbo-nrt-azure-databricks/experiment3-model-taxonomy-injector.tsx`
6. `app/case-studies/nbo-nrt-azure-databricks/experiment3-execution-hierarchy-clarity-injector.tsx`
7. `docs/nbo-nrt/experiment3-policy-learning-decision-record-20260828.md`
8. `public/case-studies/nbo-nrt/data-preparation/section-1.svg`
9. `public/case-studies/nbo-nrt/data-preparation/section-2.svg`
10. `public/case-studies/nbo-nrt/data-preparation/section-3.svg`
11. `public/case-studies/nbo-nrt/data-preparation/section-4.svg`
12. `public/case-studies/nbo-nrt/data-preparation/section-5.svg`

For each path, base content used `git show c8c5425:<path> | sha256sum`; work content used `sha256sum <path>`. The resulting full `hash  path` lines were sorted, compared with `diff -u` (no output), then each sorted manifest was hashed. This T7 list is intentionally source-specific and is not the different 12-file T6 manifest whose digest was `a307...`.

Responsive source contract uses a single-column internal layout because the lens itself occupies one column of the three-lens shell; local navigation wraps; long links and code/path identities explicitly break within the card; nested cards set `min-w-0`. Actual pixel viewport proof remains governed by the same browser-environment boundary recorded for T6 and must not be inferred from source inspection.
