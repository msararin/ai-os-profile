# T5 Business Content Migration Evidence

Date: 2026-08-28  
Base: `2817a30b561f2aa2ac13d2678d9a9fc76434e75f`  
Scope: Business & Decisions content migration only

## TC-017 source-to-target checklist

| Knowledge ID | Target | Equivalence evidence |
| --- | --- | --- |
| NBO-K001 | `#knowledge-nbo-k001` | Decision mission retains relevant eligible-offer choice, current context, learning evidence, and governance. |
| NBO-K002 | `#knowledge-nbo-k002` | Relevance, learning, and governance outcomes are retained as three explicit cards. |
| NBO-K005 | `#knowledge-nbo-k005` | All eight recommendation mappings are retained, with the global no-undocumented-semantics/ownership/interface/performance boundary. |
| NBO-K009 | `#knowledge-nbo-k009` | PASS/FAIL/readiness/authorization states, threshold metrics, discrimination metrics, and synthetic-only boundary are retained behind progressive disclosure. |
| NBO-K019 | `#knowledge-nbo-k019` | Bounded verdict retains coverage, weight, ESS, IPS/SNIPS lift and confidence intervals, bootstrap identity, action support, separate 2A issue, and prohibited production uplift. |
| NBO-K020 | `#knowledge-nbo-k020` | Five-action decision space and one-step contextual-bandit boundary are retained. |
| NBO-K021 | `#knowledge-nbo-k021` | Provisional contract, four gap/epsilon bands, rank-2/rank-3 shares, and no-production-traffic boundary are retained. |
| NBO-K023 | `#knowledge-nbo-k023` | Policy direction/objective, PROVISIONAL status, 16/16 read-back, zero generated decisions, and bounded claim state are retained. The permitted summary links to the stable K027 Models anchor without duplicating support diagnostics. |
| NBO-K034 | `#knowledge-nbo-k034` | Production, causal, operator-truth, online-safety, policy-value, and unrestricted-readiness prohibitions are retained. TEST custody is not duplicated; the Business lens uses the permitted cross-link summary to Engineering. |

The legacy `ExperimentTabs` remains mounted at `#legacy-experiment-evidence` and its source file is byte-identical to the base revision.

## TC-018 bounded-claim review

The migrated copy explicitly prohibits production readiness/uplift/value, causal impact, operator business truth, online exploration safety, and unrestricted policy readiness. Experiment evidence remains identified as synthetic. The Experiment 2B PASS is limited to its synthetic logged environment and does not overwrite Experiment 2A. Experiment 3 is a provisional one-step contextual-bandit direction, not sequential-RL or deployment evidence.

## TC-049 protected-state before/after evidence

This phase is a static presentation change. It executed no notebook, training, scoring, MLflow/registry, Unity Catalog, or data-platform operation and has no code path or credential use that can mutate those systems.

Before/after repository custody check against the base found no byte change in:

- `experiment-tabs.tsx`
- `experiment-card-selector-injector.tsx`
- all tracked `experiment3-*` source/injector files
- the Experiment 3 policy-learning decision record
- model, TEST-control, data, registry, and Unity Catalog evidence content

The candidate diff is limited to the new Business lens, its mount/legacy anchor in `page.tsx`, and this T5 evidence record. Therefore the TEST/model/data state is unchanged within the authorized and observable surface of this repository phase.

## TC-050 change-set scope

T5 contains one change-set: migrate the nine Business-owned knowledge items into their primary home while retaining legacy evidence. Models & Experiments and Engineering & Evidence remain placeholders. The established three-lens grid contract remains `lg:grid-cols-3`; no navigation, ledger, model/engineering content migration, experiment execution, data mutation, or deployment-work artifact is included.
