# NBO-NRT Experiment 3 — Policy Learning Decision Record

Date: 2026-08-28
Status: KB SAVED / NO COCKPIT DEPLOYMENT
Scope: decision rationale only; TEST remains untouched

## Decision-making method

For Experiment 3, use the following reasoning flow before execution:

Question → Why this step exists → What we expect to learn → What would change the decision → Execute → Interpret → Gate before TEST.

Before touching TEST, explicitly state:
- what is being tested,
- why TRAIN is still sufficient for the current question,
- what TEST would answer that TRAIN cannot,
- how opening TEST too early could contaminate model/policy design decisions.

## Why TEST is still untouched

Reward Model V2 has passed the TRAIN formulation and personalization-capacity checks, but policy design is not yet locked.

TEST should answer a generalization question after the formulation is fixed. It should not be used to choose support thresholds, policy parameterization, exploration settings, or other design choices. Otherwise TEST would gradually become a development/validation set.

Current rule: finish TRAIN-only policy/support diagnostics and lock the policy formulation before held-out TEST/OPE.

## Why this is currently a one-step contextual decision

The current Experiment 3 evidence supports a decision of the form:

context/state s → choose one action a → observe reward r → decision ends.

The action space is:
- BUNDLE
- DATA
- LOYALTY
- ROAMING
- VOICE

This is a contextual-bandit / one-step decision formulation.

A sequential RL formulation would require evidence of repeated trajectories:

s_t → a_t → r_t → s_(t+1) → a_(t+1) → ...

and evidence that the action at time t changes or influences the next state. In mathematical form, this requires support for a transition structure such as P(s_(t+1) | s_t, a_t).

Current Experiment 3 data has not yet established a durable state-transition model or sufficiently evidenced multi-step trajectories. Therefore DQN/PPO/deep sequential RL would exceed the current evidence boundary.

Decision: treat RL / Policy Learning V1 as constrained contextual-bandit policy learning unless future evidence establishes meaningful sequential state transitions.

## Reward Model taxonomy remains unchanged

Do not reopen Reward Model V1 as the main comparator.

- Baseline V1 = CLOSED / REFERENCE
- V1-D = durability evolution only; not a new model
- Reward Model V2 = active reward estimator for the next policy-learning lane
- RL / Policy Learning V1 = separate policy lane

The next comparison is not Reward Model V1 vs Reward Model V2.

## What V2 has already proved

Do not repeat the already-closed proof that V2 can change action ranking by context.

TRAIN evidence already shows:
- distinct winning actions = 4
- no single action wins globally
- structured segment/event/full-context winner patterns
- Top-1 vs Top-2 separation is materially stronger than V1

Therefore this claim is already supported:

> Reward Model V2 has context-sensitive ranking capacity on TRAIN.

## What remains unproved

Ranking capacity is not the same as policy support/safety.

A V2 winner can still come from a context-action combination with little or no logged support. Example logic:

- V2 may rank ROAMING slightly above DATA for a context,
- but logged TRAIN may contain only a few ROAMING observations and many DATA observations for the same/similar context,
- therefore the ranking can exist while policy confidence/support remains weak.

The next question is therefore not “can V2 produce multiple winners?” It is:

> When V2 selects a winner, how much logged TRAIN support exists for that context-action decision, and how strong is the winner margin?

## Winner interpretation must use three dimensions

For policy design, do not inspect winner count alone. Evaluate together:

1. Who wins?
2. How strongly do they win? — Top-1 vs Top-2 margin
3. How much logged support exists for that action in that context?

The existing V2 margin evidence remains relevant:
- average ≈ 3.949 pp
- median ≈ 2.747 pp
- minimum ≈ 0.371 pp
- maximum ≈ 12.230 pp

Near-tie winners should not automatically be treated as equally strong decisions as large-margin winners.

## Current Policy V1 design direction

Do not over-engineer the first policy formulation.

Current preferred path:

Reward Model V2
→ score all 5 candidate actions per TRAIN context
→ observe winner + Top-1/Top-2 margin
→ run action×context support diagnostics
→ mask unsupported / insufficiently supported decisions
→ form Constrained Greedy Policy V1

A stochastic or more complex learned policy is deferred until there is evidence that it adds policy-level value beyond constrained greedy selection from Reward Model V2.

## Why no learned-policy comparator yet

A learned/stochastic comparator is not required merely to make the V2 comparison “fair.” Reward Model V1 is already closed.

The meaningful future comparator, if needed, would use Reward Model V2 as the same reward surface and compare policy formulations such as:
- constrained greedy V2 policy
- stochastic / explicitly learned constrained policy

But this is deferred. First establish whether constrained greedy is sufficiently supported and auditable.

## Immediate next gate

Next executable step remains TRAIN-only B1 support diagnostic / support contract.

Do not choose an arbitrary support threshold in advance. Derive the threshold from the TRAIN support distribution.

B1 must answer:
- which context-action combinations are well supported,
- which are thin-support,
- which are unsupported,
- how often V2 winners fall into each support class,
- how support interacts with winner margins.

Only after this should B2 candidate-policy training/formulation be reconsidered.

## Execution discipline

Every trained artifact must follow:

train → persist immediately → load back → verify → continue

Durable source of truth remains Unity Catalog + MLflow. Do not rely on notebook variables as durable state.

## Claim boundary

This decision record does not authorize claims of:
- production readiness
- causal uplift
- operator business truth
- held-out TEST performance
- online policy safety

TEST remains untouched.

## Cockpit note

This file is a KB decision record only. No Cockpit UI change or deployment is authorized by this save. When the Cockpit is updated later, surface the reasoning behind the decision, not only the resulting status.
