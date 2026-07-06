# Opus Review: Internal Telemetry Live Source Contract v0.1

status: PROVIDER_BACKED_CONTRACT_REVIEW_ONLY

## Reviewer / Provider / Model Metadata

| Field | Value |
|---|---|
| provider | `openrouter` |
| requested_model | `anthropic/claude-opus-4.7` |
| returned_model | `anthropic/claude-4.7-opus-20260416` |
| request_or_generation_id | `gen-1783336871-YDzHXV7TWai7bh6dTIyK` |
| run_id | `opus-review-internal-telemetry-live-source-contract-v0-1-20260705` |
| provider_receipt | `OPENROUTER_RECEIPT_OPUS_REVIEW_INTERNAL_TELEMETRY_LIVE_SOURCE_CONTRACT_V0_1_20260705.json` |
| provider_metadata | `OPENROUTER_METADATA_OPUS_REVIEW_INTERNAL_TELEMETRY_LIVE_SOURCE_CONTRACT_V0_1_20260705.json` |
| review_boundary | Provider-backed contract review only; not provider-backed telemetry verification. |

## Input Artifact Reviewed

`INTERNAL_TELEMETRY_LIVE_SOURCE_CONTRACT_V0_1.md`

## Verdict

`ACCEPT_WITH_REVISIONS`

Mapped from Opus raw verdict: `APPROVE WITH SMALL PATCH`.

## Major Findings

- The contract is internally consistent and adequately gated for SQLite staging proof planning and later production/provider verification planning.
- Remaining issues are wording and traceability tightenings, not structural contract gaps.
- Claim-boundary discipline is mostly strong, but provider-backed, cost, continuous-liveness, unresolved-count, substitute-key, and proof-protocol wording needed explicit tightening.

## Required Revisions

1. Require claim level assignment to depend on both the claim ladder and the proof protocol.
2. Require substitute stable keys to be recorded in the source badge or review receipt.
3. Block continuous liveness, monitoring, alerting, and billing-verified cost under provider-backed telemetry unless separate proof exists.
4. Require cost display formula/source and block billing-verified cost unless provider-billed evidence is attached.
5. Keep preserved unresolved counts marked unresolved/source-limited in downstream views until category recount proof exists.
6. Stop if declared claim level exceeds proof protocol evidence.

## Optional Improvements

- Keep source badge and review receipt language synchronized as later proof artifacts are created.
- Keep billing/cost claims separate from provider-backed telemetry source claims unless a later contract adds a dedicated billing proof rung.

## Claim-Boundary Risks

- Provider-backed contract review is not provider-backed telemetry verification.
- Provider review does not verify the telemetry source, source counts, live update path, production DB, provider/API sync, or rendered authenticated telemetry display.
- Any later visualization must keep unresolved counts source-limited until category recount proof exists.

## Implementation-Readiness Assessment

After the small revisions, the contract is ready to gate a later SQLite staging proof plan. It does not authorize SQLite implementation, route creation, production DB access, provider/API sync, authenticated rendered proof, graph implementation, or live telemetry claims.

## Non-Claims Preserved

- No live telemetry claim.
- No provider-backed telemetry verification claim.
- No production DB verification claim.
- No full row-level completeness claim.
- No live monitoring claim.
- No production graph readiness claim.
- No category recount claim.
- No Phase 2 insight report v0.2 claim.

## Opus Raw Review Text

Verdict: APPROVE WITH SMALL PATCH

Critical risks:
- Section 5 item 8 says claim level is "assigned using the claim ladder," but the ladder in §11 gates by source_mode + proof. A source could technically satisfy a rung's source_mode without satisfying its proof protocol in §12. Minor wording risk that could let implementers skip §12.
- §8 "cost_estimate" rule bars "billing proof unless provider-billed evidence exists," but there is no enum value in the claim ladder for billing/cost claims. A cost display could ride on `PROVIDER_BACKED_TELEMETRY_VERIFIED` without a distinct proof rung. Small overclaim surface.
- §11 `PROVIDER_BACKED_TELEMETRY_VERIFIED` explicitly blocks "full completeness beyond documented provider/source scope," but does not explicitly block a monitoring/alerting or continuous-liveness claim. Given §10 badge language warns against "monitoring," the ladder should mirror that block.
- §13 does not require the preserved unresolved deltas (26959 vs 26957, delta=2, gate_claim_mapping_missing=18019, 66.84%) to remain flagged as unresolved in any downstream visualization. Small risk these numbers get re-surfaced as validated once staging exists.
- §15 stop conditions cover missing fields but not the case where source_mode is declared higher than proof protocol §12 supports. Add an explicit "claim level exceeds proof protocol evidence" stop.
- §7 allows "another stable key is documented" as substitute for `telemetry_event_id` but does not require that substitution to be recorded in the source badge or review receipt. Minor traceability gap.

Small patch only:
1. §5(8): change to "assigned using the claim ladder in §11 and only after the proof protocol in §12 has passed."
2. §11: add explicit blocked-claim text to `PROVIDER_BACKED_TELEMETRY_VERIFIED`: "continuous liveness, monitoring, alerting, or billing-verified cost unless separate proof exists."
3. §12 `PROVIDER_BACKED_TELEMETRY_VERIFIED`: add "If `cost_estimate` is displayed, formula/source is named and no billing-verified claim is made unless provider-billed evidence is attached."
4. §13: add row "Preserved unresolved counts (baseline 26959, export 26957, delta 2, gate_claim_mapping_missing 18019, 66.84%) remain marked unresolved/source-limited in any downstream view until category recount proof exists."
5. §15: add stop condition "Declared claim level exceeds the proof protocol evidence in §12."
6. §7: add "If a substitute stable key replaces `telemetry_event_id`, the substitution must be recorded in the source badge or review receipt."

Confidence: Medium-High. Contract is internally consistent, non-claims are well preserved, source_mode/claim ladder/proof protocol/stop conditions/redaction are all present and mutually reinforcing. Remaining risks are wording tightenings, not structural gaps. Readiness for SQLite staging proof plan and later production/provider verification is adequately gated.

Commit/promote recommendation: Apply the small patch above, then promote to v0.1 and proceed to `INTERNAL_TELEMETRY_SOURCE_CONTRACT_REVIEW_RECEIPT_V0_1.md`. Do not unlock any implementation candidate in §16 on the basis of this review.
