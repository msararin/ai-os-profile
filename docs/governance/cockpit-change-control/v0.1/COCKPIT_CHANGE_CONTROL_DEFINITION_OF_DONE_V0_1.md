# Cockpit Change Control Definition of Done v0.1

## Definition Of Done

A covered public/cockpit change is done only when all required gates are satisfied:

1. Change-control manifest exists and parses as JSON.
2. Owner-intended meaning is stated in plain language.
3. Affected routes and files are named.
4. Protected routes not in scope are named.
5. Claim boundary is explicit.
6. Validation plan and rollback plan exist.
7. Owner semantic acceptance status is recorded.
8. Deployment allowed status is recorded.
9. Deterministic validation passes.
10. External semantic/governance review is captured or an unavailability caveat is recorded.
11. Owner local review packet is prepared.
12. No deploy occurs unless owner explicitly approves go-live after local review.

## Block Conditions

Block the change if:

- The manifest implies go-live without owner approval.
- Protected public routes are modified without explicit authorization.
- The change implies unsupported execution success, readiness, ROI, replacement, production/runtime readiness, or independent multi-worker proof.
- The packet exposes credentials, private receipt material, or internal-only evidence locations.
- The owner-intended meaning is ambiguous or contradicted by the patch.
