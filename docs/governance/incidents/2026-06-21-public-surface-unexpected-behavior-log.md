# Public Surface Unexpected Behavior Log — 2026-06-21

## Status
GOVERNED_REPAIR_REQUIRED

## Owner-visible context
During the Public Surface Governance / Surface Story Guild / deployment-discoverability work, several unexpected behaviors appeared across implementation, status reporting, achievement recording, and QA ownership. This file records the bugs, RCA, fixes, containment items, and QA expectations so the same issues are not hidden inside chat history.

## Scope
This log covers public-surface work around:

- `/architecture`
- `/achievements`
- `/architecture/public-surface-governance`
- `/achievements/public-surface-governance`
- Public Surface Governance
- Surface Story Guild
- Prime Gate
- Public Surface Runner Team
- Deployment discoverability checks
- Achievement Proof Gallery format
- QA responsibility for expected behavior, root cause, and solution verification
- owner repeated-validation count as a quality/performance signal

## Non-claims
This incident log does not claim automated release governance, production-readiness certification, autonomous go-live authority, full production monitoring, universal enforcement across historical pages, ROI proof, independent multi-worker proof, or Public Surface Runner Team go-live approval.

## Owner Repeated-Validation Count
owner repeated-validation count: at least 5 correction attempts.

At least 5 owner-visible validation attempts / corrective checks were required before the system stopped treating source/link/deploy evidence as sufficient:

1. Owner reported no visible update on `sararin.ai` after source/deploy work.
2. Owner challenged status wording because the assistant spoke as if the work was already done while live visibility was not confirmed.
3. Owner reported the achievement for the Public Surface Governance / Surface Story Guild work was missing.
4. Owner identified that the achievement was created in the wrong format, not the established Achievement Proof Gallery format.
5. Owner reported the Architecture page still did not show the expected Public Surface Governance / Surface Story Guild surface.

Additional corrective prompts in the same incident included requests to re-check root cause, log unexpected behavior, avoid patching over the issue, and keep the failure in policy/performance tracking.

## User-Visible Symptoms
- The owner could not find or validate the update through the expected parent-page behavior.
- The achievement appeared as route/link behavior instead of the established proof-gallery timeline pattern.
- Architecture discoverability existed, but Public Surface Governance was not represented as an architecture component/layer.
- Status language risked implying closure from build/test/deploy evidence even though owner-visible behavior was still wrong.

## RCA On Repeated Owner Validation
The system failed because QA did not own owner-visible expected behavior. Validation over-weighted route existence, source presence, parent-link existence, build/typecheck success, Vercel status, and assistant status narration.

Validation under-weighted whether the owner could actually find the update, whether the update appeared in the expected page format, whether the page matched the established product pattern, whether the proposed solution addressed the root cause, and whether repeated owner correction should stop closeout immediately.

## Architecture Visibility Gap
The architecture page treated a standalone link/card as sufficient discoverability. The expected behavior was explicit representation inside the main architecture model, including Surface Story Guild, Prime Gate, Runner support, and owner approval boundaries.

## Achievement Format Drift
The achievement was initially represented as a standalone route / featured link instead of a normal dated Achievement Proof Gallery entry. That broke continuity with prior proof records and made the update feel inconsistent.

## Status Overclaim Issue
Technical evidence such as route existence, build success, source checks, and deployment success cannot by itself close a public-surface task when the owner-visible surface does not match the expected behavior.

## Root Cause
The workflow optimized for low-risk route preservation, link safety, and claim-boundary checks, but did not explicitly test expected owner-visible behavior. It treated technical discoverability as equivalent to narrative and format correctness.

## Contributing Factors
- Source checks focused on route existence and boundary snippets.
- The architecture parent card was treated as enough, even though the model itself remained incomplete.
- The achievement route was treated as enough, even though the gallery data model remained the expected owner-visible format.
- Surface Story Guild, Prime Gate, Public Surface Runner Team, and Lyn approval boundaries were not translated into concrete page-format acceptance criteria early enough.

## QA Rule
If the owner has to validate the same public surface more than once for the same intent, the task enters incident mode. It cannot be closed by build/test/deploy evidence alone.

## Expected Behavior + Root Cause + Solution Effectiveness Rule
Every public-surface repair must record:

- expected owner-visible behavior;
- actual behavior observed;
- root cause of the mismatch;
- why the patch should solve the mismatch;
- how source-level QA confirms the expected behavior is now represented.

## Required QA Questions
For public-surface work, QA must ask:

1. What did the owner expect to see?
2. Where should the owner see it?
3. Does the surface show it in the correct format?
4. Did we fix the root cause or only the symptom?
5. Did we introduce a workaround that creates a new format or narrative drift?
6. Does the solution preserve claim boundaries?
7. Is the validation evidence strong enough to close the issue?
8. How many times did the owner have to re-validate or correct the same page/intent?
9. Has repeated owner validation triggered incident mode?

## Performance-Score Implication
Repeated owner correction on the same surface is a QA/performance failure, even when code validation passes. It lowers confidence in the Public Surface Runner Team until expected behavior, story format, and owner-visible page patterns are validated directly.

## Containment
- Public Surface Governance must appear as an explicit architecture model component, not only as a link/card.
- Public Surface Governance achievement work must appear in the normal Achievement Proof Gallery format.
- Existing deployment protocol checks may enforce source-level format contracts when lightweight and already in the preflight path.
- Do not add a new manual deployment step or heavier process as the default response.

## Current Repair Applied
- `app/architecture/page.tsx` represents Public Surface Governance inside the architecture model with Surface Story Guild / Prime Gate / Runner support / owner approval labels.
- `app/achievements/page.tsx` represents the 2026-06-21 milestone as a normal Achievement Proof Gallery entry.
- `scripts/check-deployment-operating-set.mjs` checks for the repaired architecture model and achievement gallery markers inside the existing `public:deployment-protocol` path.

## Final Expected Verdict
PUBLIC_SURFACE_VISIBILITY_AND_ACHIEVEMENT_FORMAT_REPAIRED_WITH_QA_EVIDENCE
