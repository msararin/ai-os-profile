# Machine Learning & Decision Systems — T1 Route and Taxonomy Contract

Date: 2026-08-28  
Phase: T1 — Taxonomy + Route Contract Only  
Status: CANDIDATE  
Baseline main: `0c26e5399eedf093fb8e73c2cdf9f9e08b5926c6`

## Authority and scope

This contract is governed by the approved Machine Learning & Decision Systems Cockpit specification and the canonical NBO-NRT knowledge records in Git.

This phase authorizes naming and route reservation only. It does not authorize navigation promotion, content migration, Cockpit evidence integration, legacy deletion, TEST access, model training, model-registry changes, or experiment-data mutation.

## Locked taxonomy

- Top-level domain: **Machine Learning & Decision Systems**
- Flagship case study: **NBO-NRT AIOS Cockpit**
- Complementary domain: **LLM & Agent Systems**

The two domains describe different problem classes. Neither is presented as superior.

## Route contract

| Surface | Contract route | T1 behavior |
| --- | --- | --- |
| Machine Learning & Decision Systems landing | `/machine-learning-decision-systems` | Reserved for the T2 landing skeleton; not created in T1 |
| NBO-NRT AIOS Cockpit | `/case-studies/nbo-nrt-azure-databricks` | Existing canonical route; remains unchanged |
| LLM & Agent Systems | `/ai-operating-system` | Existing complementary-domain route; remains unchanged |
| Case Studies index | `/case-studies` | Existing route; remains unchanged |
| Legacy Telco Churn case study | `/case-studies/telco-churn-mlops` | Existing route; remains unchanged |

## Route invariants

1. Existing routes remain valid during T1.
2. The NBO-NRT Cockpit route is not renamed.
3. No redirect is introduced in T1.
4. Main navigation remains unchanged until T11.
5. Legacy content remains in place until equivalence and traceability pass.
6. The T2 landing skeleton may add only the reserved landing route.
7. Cross-links must use stable routes and must not duplicate a knowledge item's primary content.

## Evidence and claim boundaries

- Current NBO-NRT evidence remains bounded to the claims already present in the canonical KB and Cockpit.
- Experiment 3 remains TRAIN-only at its current gate.
- TEST remains untouched.
- Reward Model V1 remains CLOSED / REFERENCE.
- V1-D remains a durability evolution, not a separate model.
- Reward Model V2 remains the active reward estimator.
- RL / Policy Learning V1 remains a separate constrained contextual-bandit policy lane unless later evidence establishes sequential state transitions.
- No production readiness, causal uplift, operator business truth, held-out TEST performance, or online policy safety is claimed by this taxonomy change.

## T1 acceptance mapping

- **TC-003:** PASS when the taxonomy above remains distinct and complementary.
- **TC-004:** PASS when NBO-NRT is explicitly the flagship ML case study.
- **TC-005:** PASS when the existing route inventory resolves without route changes.

## Explicit no-touch statement

T1 changes documentation only. It does not change application routes, navigation, page content, KB migration state, deployment configuration, Databricks assets, Unity Catalog data, MLflow artifacts, model registry state, experiment gates, or TEST.
