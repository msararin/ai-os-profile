# Cockpit Change Control Spec v0.1

## Purpose

Cockpit Change Control prevents public/cockpit wording drift when AIOS evolves with new metrics, theories, runner teams, governance policies, achievements, and public surfaces.

## Applies To

- North Star or strategy copy
- Achievements
- Knowledge Sharing lesson copy
- System-health/cockpit public copy
- CASE-003 public wording
- Portfolio narrative
- Shared public metadata or registries
- Knowledge-base, specification, and evidence-status reconciliation
- ML & Decision Systems, LLM & Agent Systems, governance-runtime, and MLOps classification
- Per-phase implementation and pre-commit closeout

## Required Controls

Every covered change must have:

1. A named change class.
2. A plain-language owner-intended meaning.
3. A source-map delta.
4. A claim boundary.
5. A validation plan.
6. A rollback plan.
7. Owner semantic acceptance status.
8. Deployment allowance status.
9. A phase-specific Definition of Done and exact exit claim.
10. A QA Sentinel review bound to the exact candidate digest and performed by an agent other than the implementer.
11. A Stakeholder Simulation review performed by a second distinct agent and labelled `SIMULATED_STAKEHOLDER_LENS_ONLY`.
12. Durable receipts and remediation/re-review results for both reviews.

The mandatory review sequence and block conditions are defined in
`COCKPIT_CHANGE_CONTROL_DEFINITION_OF_DONE_V0_1.md`. Those conditions apply
before every phase commit and before an owner-review packet is presented.

## Non-Negotiable Rule

Technical validation is necessary but not sufficient. Build, lint, route smoke, claim scan, leak scan, and deterministic runner checks do not approve public meaning or go-live.

QA Sentinel and Stakeholder Simulation are also necessary but do not replace
owner authority. The QA Sentinel reviews quality and evidence sufficiency; the
Stakeholder Simulation reviews decision-maker comprehension and usefulness. A
simulated stakeholder verdict is not real stakeholder approval.

Owner semantic acceptance is required before go-live for any public change that reframes strategy, North Star, achievements, cockpit meaning, portfolio narrative, or CASE-003 meaning.

## Deployment Boundary

`READY_FOR_GO_LIVE_CONSIDERATION` does not mean go-live approved, deployed, production ready, or public-proof ready.
