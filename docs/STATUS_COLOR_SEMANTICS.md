# sararin.ai Status Color Semantics

**Status:** Canonical public-surface UI rule  
**Scope:** Status badges, status cards, progress steps, current-focus indicators, and bounded evidence states.  
**Non-scope:** Brand palette, charts, illustrations, decorative accents, and ordinary navigation styling unless they explicitly communicate status.

## Canonical semantic mapping

| Meaning | Color | Use for | Do not use for |
|---|---|---|---|
| Passed / completed / validated | Green | PASS, completed steps, validated evidence, successful read-back | Current work that is still in progress |
| Currently active / current focus | Indigo / Blue | Active experiment, in-progress step, current focus, pending current work | Warnings, risk, unresolved investigation |
| Investigation / caution / unresolved | Amber | Generalization issue, RCA open, caveat, under construction, partial / downgraded state | Normal active/current state |
| Failed / blocked / invalid | Red | FAIL, blocked gate, escalation, not approved / invalid state | Under construction, RCA open, ordinary uncertainty |
| Historical / neutral / foundation / parked | Gray / Slate | Historical foundation, parked, not started, disabled, neutral context | Completed validated success when success is important to communicate |

## Interaction rule

Selection and focus must not change the semantic meaning of a status. A selected item should keep its semantic color and become more prominent through border, ring, or emphasis.

Example:
- Experiment 2B stays green when selected because it is a completed bounded pass.
- Experiment 3 stays indigo when selected because it is currently active.
- Experiment 2A stays amber because its generalization issue remains under investigation.

## Progress-step rule

For a sequential investigation or execution journey:

- completed / passed step → green
- current active step → indigo / blue
- caution / unresolved step → amber
- failed / blocked step → red
- future / not-started step → gray

Do not use amber merely to mean “current.” Amber is reserved for caution or unresolved evidence.

## Claim discipline

Color is a semantic claim. A green treatment must not imply more evidence than the text supports. A red treatment must not imply invalidity when evidence is merely incomplete or under investigation.

When status wording and color disagree, the evidence-backed wording is authoritative and the color should be corrected.

## Current NBO/NRT mapping

- Experiment 1 → gray: historical foundation / completed with quality gap
- Experiment 2A → amber: generalization issue / investigation
- Experiment 2B → green: complete / pass with bounded statistical support
- Experiment 3 → indigo: currently active adaptive contextual-bandit lane
- Experiment 3 completed investigation steps → green
- Experiment 3 current / next active step → indigo

## Implementation guidance

Public status surfaces should prefer the shared semantic-status mechanism rather than page-specific color meanings. Page-specific colors remain appropriate for brand, charts, diagrams, and other non-status visuals.
