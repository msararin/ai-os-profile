# Public Surface Unexpected Behavior Log — 2026-06-21

## Status
OPEN_CONTAINMENT_LOGGED

## Owner-visible context
During the Public Surface Governance / Surface Story Guild / deployment-discoverability work, several unexpected behaviors appeared across implementation, status reporting, achievement recording, and QA ownership. This file records the bugs, steps, RCA, fixes, containment items, and QA expectations so the same issues are not hidden inside chat history.

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
This incident log does not claim:

- automated release governance
- production-readiness certification
- autonomous go-live authority
- full production monitoring
- universal enforcement across historical pages
- ROI proof
- independent multi-worker proof

---

## Owner repeated-validation count

### Performance signal
This incident required the owner to repeatedly validate the public surface instead of QA/Runner proving owner-visible expected behavior before closeout. That is a performance failure of the assistant/runner process.

### Minimum explicit owner validation attempts observed in this thread
At least **5 owner-visible validation attempts / corrective checks** were required before the system stopped treating source/link/deploy evidence as sufficient:

1. Owner reported no visible update on `sararin.ai` after source/deploy work.
2. Owner challenged status wording because the assistant spoke as if the work was already done while live visibility was not confirmed.
3. Owner reported the achievement for the Public Surface Governance / Surface Story Guild work was missing.
4. Owner identified that the achievement was created in the wrong format, not the established Achievement Proof Gallery format.
5. Owner reported the Architecture page still did not show the expected Public Surface Governance / Surface Story Guild surface.

Additional corrective prompts in the same incident included requests to re-check root cause, log unexpected behavior, avoid patching over the issue, and keep the failure in policy/performance tracking.

### RCA on repeated owner validation
The system failed because QA did not own owner-visible expected behavior. Validation over-weighted:

- route existence
- source presence
- parent-link existence
- build/typecheck success
- Vercel status
- assistant status narration

Validation under-weighted:

- whether the owner could actually find the update
- whether the update appeared in the expected page format
- whether the page matched the established product pattern
- whether the proposed solution addressed the root cause
- whether repeated owner correction should stop closeout immediately

### Policy implication
If the owner has to validate the same public surface more than once for the same intent, the task is no longer in normal execution. It becomes an incident requiring RCA, QA ownership, and policy containment.

---

## QA rule added from owner instruction

### Rule
QA must ensure the team tests expected behavior, verifies root cause, and confirms that the proposed solution solves the actual problem. QA is not limited to checking build success, typecheck success, or route existence.

### Required QA questions
For public-surface work, QA must ask:

1. What did the owner expect to see?
2. Where should the owner see it?
3. Does the live surface show it in the correct format?
4. Did we fix the root cause or only the symptom?
5. Did we introduce a workaround that creates a new format or narrative drift?
6. Does the solution preserve claim boundaries?
7. Is the validation evidence strong enough to close the issue?
8. How many times did the owner have to re-validate or correct the same page/intent?
9. Has repeated owner validation triggered incident mode?

### QA exit rule
An issue cannot be considered fully contained unless QA confirms:

- expected owner-visible behavior is met
- root cause is identified
- root cause is addressed or explicitly logged as still open
- solution is tested against the original failure mode
- no new public claim overreach was introduced
- owner repeated-validation count is recorded when the owner had to correct the same surface more than once

---

## Incident 1 — Deployed route was not owner-visible from parent pages

### Unexpected behavior
The public-surface governance routes existed, but the owner could not see the update from the normal `sararin.ai` parent pages.

### User-visible symptom
The owner checked the site and saw no visible update, even though route files and deployment checks existed.

### Reproduction / check steps
1. Confirm route files exist:
   - `app/architecture/public-surface-governance/page.tsx`
   - `app/achievements/public-surface-governance/page.tsx`
2. Confirm direct routes return HTTP 200.
3. Open parent pages:
   - `/architecture`
   - `/achievements`
4. Observe whether parent pages visibly link to the new public-surface governance routes.

### Root cause
The implementation treated “route exists” and “deployment succeeds” as equivalent to “the update is visible to the owner.” Parent-page discoverability was not part of the initial done condition.

### Contributing factors
- Validation checked route existence and direct route availability.
- Parent-page discoverability was not enforced strongly enough before merge.
- The update optimized for source correctness but missed user-visible navigation.

### Fix applied
- Added parent-page discoverability links/cards on:
  - `app/architecture/page.tsx`
  - `app/achievements/page.tsx`
- PR #18 merged to `main`.
- Vercel statuses for PR #18 merge commit were reported successful.

### QA verification required
- Verify `/architecture` visibly links to `/architecture/public-surface-governance`.
- Verify `/achievements` visibly links to `/achievements/public-surface-governance` or contains the milestone in the correct gallery format after the format fix.
- Verify direct routes still load.

### Containment
Deployment/source checks should include parent-page discoverability when a public route is added for normal public consumption.

### Current status
CONTAINED_FOR_PUBLIC_SURFACE_GOVERNANCE_ROUTES_PENDING_LIVE_VISUAL_CONFIRMATION

---

## Incident 2 — Status wording sounded like live visibility was complete before confirmation

### Unexpected behavior
The assistant response made the work sound more complete than it was while Vercel was still pending or before live visual confirmation.

### User-visible symptom
The owner was confused because the assistant spoke as if the work was already done end-to-end.

### Reproduction / check steps
1. Merge a PR or commit source changes.
2. Check Vercel status.
3. If Vercel is pending or live visual confirmation has not happened, ensure final wording does not say or imply `DEPLOYED_VISIBLE_CLAIM_SAFE`.

### Root cause
Status layers were compressed into one narrative. The response did not separate:

- source committed
- PR merged
- Vercel deploy success
- live visual confirmation

### Contributing factors
- The assistant over-narrated progress.
- GitHub/Vercel status and browser-level visibility were described too closely together.
- The owner expected precise operational state, not motivational language.

### Fix applied
Introduced explicit status separation:

- `SOURCE_COMMITTED`
- `PR_MERGED`
- `VERCEL_DEPLOYED_SUCCESSFULLY`
- `LIVE_VISUAL_CONFIRMED`

### QA verification required
Before final closeout, QA must confirm the final verdict uses the lowest proven state and does not imply live visibility before visual verification.

### Containment
Do not claim live visibility until the actual live surface has been checked after deploy success.

### Current status
CONTAINED_IN_LANGUAGE_POLICY_FOR_THIS_THREAD

---

## Incident 3 — Achievement was implemented in the wrong format

### Unexpected behavior
The Public Surface Governance / Surface Story Guild / deployment-discoverability achievement was represented as a standalone detail route and featured link, not as a normal Achievement Proof Gallery timeline entry.

### User-visible symptom
The owner expected an achievement in the established `/achievements` gallery format, but saw a route/link style that did not match prior achievement entries.

### Intended behavior
New public achievements should appear in the main Achievement Proof Gallery using the established data model in `app/achievements/page.tsx`:

- `date`
- `headline`
- `summary`
- `proofType`
- `evidenceReference`
- `status`
- `publicSafeResult`
- `caveat`
- `details.whyItMatters`
- `details.evidence[]`
- `details.evidenceMaturity[]`
- `details.skillsDemonstrated[]`
- `details.impact`
- `tags[]`

### Actual behavior
The work was added/edited mainly at:

- `app/achievements/public-surface-governance/page.tsx`
- a featured link/card on `/achievements`

It was not added as a first-class object inside the `achievements` array in `app/achievements/page.tsx`.

### Root cause
The implementation optimized for route safety and avoided editing the large `app/achievements/page.tsx` file. The system treated “achievement route exists” as equivalent to “achievement appears in the established Proof Gallery format.”

### Contributing factors
- The main achievements file is large and riskier to patch manually.
- Existing checks covered route/link/boundary safety but not achievement data-model continuity.
- Surface Story Guild / Prime Gate review did not explicitly check display-format consistency.
- The assistant misread the owner’s intent and chose the lower-risk technical patch instead of the correct product-format patch.

### Required fix
Add the 2026-06-21 Public Surface Governance achievement as the first object in the `achievements` array in `app/achievements/page.tsx` using the established object format.

Also update:

- `expandedDays` default to include `2026-06-21`
- header evidence-updated text
- latest validated milestone text
- hardcoded proof count if present
- remove or reduce duplicate featured-link display if it creates confusion

### QA verification required
QA must verify that `/achievements` shows the 2026-06-21 milestone as a normal Achievement Proof Gallery card, not only as a standalone route or featured link.

### Containment
Future achievement work must check both:

1. Is there a route/detail artifact if needed?
2. Is the milestone represented in the main Achievement Proof Gallery format?

### Current status
ROOT_CAUSE_IDENTIFIED_FIX_REQUIRED

---

## Incident 4 — Checker did not enforce achievement format continuity

### Unexpected behavior
Existing validation could pass while an achievement still failed the owner’s expected display format.

### User-visible symptom
Validation passed, but the achievement did not appear in the established Proof Gallery timeline/card format.

### Reproduction / check steps
1. Add an achievement detail route.
2. Add a parent link to the route.
3. Run public-surface deployment checks.
4. Observe that checks can pass even if no object is added to `achievements` array in `app/achievements/page.tsx`.

### Root cause
The deployment protocol checker was designed to catch route/source/discoverability/boundary failures. It did not validate achievement-gallery data-model membership.

### Contributing factors
- Checker hardening was scoped to public-surface governance discoverability.
- Achievement gallery format was assumed but not encoded.
- The route/detail surface and gallery entry surface were treated as interchangeable.

### Required solution
Add a lightweight source check for public achievement work, for example:

- when an achievement route exists and is linked from `/achievements`, require a corresponding `headline` or `date` entry in `app/achievements/page.tsx`
- require known gallery fields for new achievement entries
- fail or warn if a standalone achievement route has no gallery-format entry

### QA verification required
QA must verify that validation covers the original failure mode, not only that the new checker runs.

### Current status
CHECKER_GAP_LOGGED_NOT_FULLY_FIXED

---

## Incident 5 — Surface Story Guild role was defined but not used as a format QA gate

### Unexpected behavior
Surface Story Guild existed as a role concept, but the actual output still drifted from the owner’s expected public format.

### User-visible symptom
The story intent was right, but the public surface shape did not match the established Achievement Proof Gallery pattern.

### Root cause
The Surface Story Guild scope focused on narrative coherence and claim boundaries, but not enough on UI/display-format continuity.

### Required solution
Add Surface Story Guild QA questions:

- Is this the surface the owner expects?
- Is the format consistent with previous public artifacts?
- Does the change preserve the established story pattern?
- Would the owner recognize this as the intended artifact?

### QA verification required
Surface Story Guild output must include a format-continuity check before the Runner Team implements public artifacts.

### Current status
ROLE_SCOPE_GAP_LOGGED

---

## Incident 6 — Architecture surface was linked but not owner-visible in the expected architecture pattern

### Unexpected behavior
The Architecture source included a public-surface governance link/card, but the owner still reported that the Architecture page did not visibly show the expected public-surface governance / Surface Story Guild concept.

### User-visible symptom
The owner could not recognize the Public Surface Governance work as part of the Architecture surface.

### Root cause
The implementation treated “a link exists somewhere on the page” as sufficient. It did not verify visual hierarchy, architecture-model placement, or whether the concept appeared in the expected architecture component pattern.

### Required solution
Represent Public Surface Governance as an explicit architecture component/layer in the main architecture model, with Surface Story Guild / Prime Gate / Runner support / owner approval visible in the same pattern as other architecture layers.

### QA verification required
QA must verify that the owner can find the concept on `/architecture` without hunting for a low-emphasis link and that the page format matches the owner’s expected architecture pattern.

### Current status
ROOT_CAUSE_IDENTIFIED_FIX_REQUIRED

---

## Consolidated required next steps

1. Fix `app/achievements/page.tsx` so the 2026-06-21 milestone appears as a normal Achievement Proof Gallery entry.
2. Fix `app/architecture/page.tsx` so Public Surface Governance appears as an explicit architecture model component, not just a low-emphasis link/card.
3. Update header/latest milestone/count copy if hardcoded.
4. Remove or reduce duplicate featured-link behavior if it creates confusing display.
5. Add or update a checker so achievement route/link work cannot pass while missing the gallery-format entry.
6. Run QA against owner-visible expected behavior, not only build status.
7. Close this incident only after root cause is verified and the solution is tested against the original failure modes.
8. Treat repeated owner validation as a performance-score failure and incident trigger.

## Expected closure verdict
ACHIEVEMENT_FORMAT_DRIFT_AND_PUBLIC_SURFACE_UNEXPECTED_BEHAVIOR_CONTAINED
