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

## Non-Negotiable Rule

Technical validation is necessary but not sufficient. Build, lint, route smoke, claim scan, leak scan, and deterministic runner checks do not approve public meaning or go-live.

Owner semantic acceptance is required before go-live for any public change that reframes strategy, North Star, achievements, cockpit meaning, portfolio narrative, or CASE-003 meaning.

## Deployment Boundary

`READY_FOR_GO_LIVE_CONSIDERATION` does not mean go-live approved, deployed, production ready, or public-proof ready.
