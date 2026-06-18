# Cockpit Change Control Checker Spec v0.1

## Checker Goal

The checker performs deterministic manifest validation. It is not a semantic reviewer and does not approve go-live.

## Required Manifest Fields

- `change_class`
- `summary`
- `owner_intended_meaning`
- `canonical_source`
- `affected_public_routes`
- `affected_files`
- `protected_not_in_scope`
- `owner_semantic_acceptance_required`
- `owner_semantic_acceptance_status`
- `deploy_allowed`
- `deployment_performed`
- `claim_boundary`

## Required Policy Values

- `owner_semantic_acceptance_required` must be `yes`.
- `deploy_allowed` must be `no` before owner go-live approval.
- `deployment_performed` must be `no` during local review preparation.

## Checker Outputs

The checker emits JSON with:

- `verdict`
- `blockers`
- `warnings`
- `checked_at`

Verdicts:

- `PASS`
- `WARN`
- `BLOCK`
