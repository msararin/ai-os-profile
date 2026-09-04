# T11 — ML / LLM Navigation Promotion Evidence

Date: 2026-09-04
Phase: T11 — Navigation Promotion and Production Release
Status: `OWNER_AUTHORIZED / PRE_MERGE_VALIDATED`

## Meaning

Make the already-built Machine Learning & Decision Systems work visibly discoverable from every public page. The navigation must distinguish **ML & Decision Systems** from the complementary **LLM & Agent Systems** domain so a visitor does not have to know or guess a hidden route.

Owner authorization: the owner explicitly requested immediate Cockpit deployment on 2026-09-04 after reporting that the visible site still showed no meaningful difference. This activates the T11 navigation boundary reserved by `t1-route-taxonomy-contract-20260828.md`.

## Scope and protected surfaces

Included:

- promote `/machine-learning-decision-systems` into global navigation;
- relabel the existing `/ai-operating-system` navigation entry as `LLM & Agent Systems`;
- retain all previous routes and content.

Protected and unchanged:

- canonical KB repository and its merge history;
- NBO-NRT experiment evidence and Experiment 2A / 2B separation;
- Databricks tables, TEST data, models, MLflow, and runtime objects;
- deployment configuration, authentication, telemetry, and private evidence;
- public claim boundaries.

## Measurement and validation

- Source baseline: `87d2c8ea945ae26191b6e54871d55848b2f93168`.
- TypeScript: PASS.
- ESLint: PASS with zero errors and five pre-existing warnings outside this change.
- Next production build: PASS; 47/47 routes generated.
- Required routes generated: `/machine-learning-decision-systems`, `/ai-operating-system`, and `/case-studies/nbo-nrt-azure-databricks`.
- `git diff --check`: PASS.
- Preliminary stakeholder simulation: PASS; the two problem classes and route to NBO-NRT are understandable.
- Responsive boundary: desktop-first. Narrow-screen horizontal navigation remains an owner-accepted deferred risk.

The legacy `verify-public-surface-regression.mjs` produced 46/54 PASS when run against a local production server. Its eight failures concern pre-existing Internal Telemetry wording and Knowledge Sharing card-count expectations. The T11 candidate changes none of those sources or routes; this is retained as baseline debt rather than misreported as a T11 PASS.

## Trust boundary

This phase changes public navigation only. It does not upgrade ML evidence, governance-runtime evidence, production readiness, causal uplift, online safety, or operator-business-truth claims. The destination page continues to disclose the synthetic learning and MLOps evidence boundary.

## Custody and rollback

Candidate paths:

1. `components/site-header.tsx`
2. `docs/ml-decision-systems/t11-navigation-promotion-evidence-20260904.md`
3. `docs/ml-decision-systems/t11-navigation-promotion-manifest-20260904.json`

Both final independent reviews must bind to the complete frozen three-file staged Git tree. The exact tree and head commit must be recorded in the pull request and checked by QA Sentinel before merge. Production verification must bind the deployed result to the merged commit.

Rollback: revert the bounded T11 merge, restoring the former `AI Operating System` navigation label and removing the ML navigation entry without changing either destination route.

## Required closeout

- QA Sentinel on the frozen candidate: pending rerun.
- Stakeholder simulation: preliminary PASS; rerun if candidate bytes change.
- Merge and deployment: pending.
- Desktop production read-back: pending.
