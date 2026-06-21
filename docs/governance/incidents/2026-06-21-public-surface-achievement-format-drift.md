# Public Surface Achievement Format Drift Incident — 2026-06-21

## Status
CONTAINMENT_REQUIRED

## Summary
A public-surface governance milestone was implemented as a standalone achievement route and featured link instead of as a normal Achievement Proof Gallery entry.

## User-visible symptom
The owner could not see the milestone in the expected achievement format. The update felt inconsistent with prior achievement records.

## Intended behavior
New public achievements should appear in the main Achievement Proof Gallery using the established achievements array format.

## Actual behavior
The milestone appeared as a separate route / featured link, not as a standard gallery timeline entry.

## Root cause
The implementation optimized for route safety and discoverability while avoiding the large achievements page data model. The system did not enforce that new achievements must be represented in the gallery entry format.

The root cause was not only an achievement-page bug. It also included role/R&R confusion: Surface Story Guild story coherence, Prime Gate claim safety, Public Surface Runner implementation support, and Lyn final positioning approval were not translated into concrete display-format acceptance criteria before implementation.

The repair must be made through the governed local/Codex workflow. ChatGPT/GitHub connector write actions are not governed execution for this surface unless Lyn explicitly authorizes them.

## Contributing factors
- app/achievements/page.tsx is large and risky to patch manually.
- The team treated "achievement route exists" as equivalent to "achievement gallery entry exists."
- The existing checker protected route/link/boundary safety but did not protect format consistency.
- Surface Story Guild / Prime Gate did not explicitly check display-format continuity.

## Fix
- Add the 2026-06-21 milestone as a normal achievements array entry.
- Update the header and latest milestone copy.
- Remove or reduce duplicate featured-link behavior if it conflicts with gallery format.
- Confirm closure through owner-visible QA, not source or route checks alone.

## Containment
Future public achievement work must check:
- Is this a route-only artifact?
- Is this also represented in the Achievement Proof Gallery format?
- Does the parent page display it in the same pattern as prior achievements?
- Does the copy preserve claim boundaries?
- Did Surface Story Guild, Prime Gate, Public Surface Runner Team, and Lyn approval boundaries produce concrete page-format acceptance criteria?
- Has owner-visible QA confirmed the expected format rather than only route/link existence?

## What must not change
- Do not add heavy deployment process.
- Do not claim automated release governance.
- Do not claim production-readiness certification.
- Do not claim Public Surface Runner Team owns go-live approval.

## Validation
Run:
- pnpm public:deployment-protocol
- pnpm lint
- pnpm typecheck
- pnpm build
- pnpm check:public-dashboard-leakage
- git diff --check
- pnpm public:review

## Final expected verdict
ACHIEVEMENT_FORMAT_DRIFT_CONTAINED
