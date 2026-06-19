# PageLab Public Surface Placement Trial Report

## 1. Decision

Selected strategy: `ADD_SMALL_OBSERVABILITY_SECTION_ONLY`.

This trial adds one compact public-safe section to the observability route because that page already explains evidence readiness, claim-boundary review, blocked claims, and public-safe summaries. The placement shows Public Surface Release Lane as review support for recurring public-page updates before go-live consideration.

Other placements were not selected yet:

- Organization chart: defer. Showing the lane as a full team would clutter the org chart and could imply autonomous release authority.
- Architecture diagram: defer. A diagram change should be a thin assurance lane or release-readiness checkpoint, not a core worker layer.
- Governance or policy page: defer. Existing policy language already carries claim boundary concepts; duplicating it would add noise.
- Role and responsibility card: defer. Prime Gate, Gate PM, and Runner Gang can be explained later as grouped review patterns.
- Dedicated PageLab/Public Surface page: defer until a real recurring PageLab update has gone through the lane.

## 2. Pages/files inspected

| Source file | Inferred route | Relevant existing content | Placement suitability | Reason |
| --- | --- | --- | --- | --- |
| `app/architecture/system-health/observability/page.tsx` | `/architecture/system-health/observability` | Claim-boundary review, blocked claims, public-safe evidence summaries, public cockpit row | Strong | The page already frames evidence readiness and public claim discipline without implying deployment authority. |
| `app/org-roles/page.tsx` | `/org-roles` | Org chart, execution-control roles, task policies, role measurement cards | Strong but deferred | Useful later, but adding a full public-surface team now could make the org chart noisy and overstate autonomy. |
| `app/architecture/page.tsx` | `/architecture` | System architecture groups and operating-model explanation | Medium | Good future diagram surface, but a visual change needs careful treatment to avoid implying release automation. |
| `app/architecture/system-health/page.tsx` | `/architecture/system-health` | Health hub, claim boundaries, public surface candidates, access boundary | Medium | Could link later, but the observability page is more directly tied to evidence readiness. |
| `app/architecture/system-health/runtime-authority-evidence/page.tsx` | `/architecture/system-health/runtime-authority-evidence` | Runtime authority and owner-gate evidence | Medium/weak | Related to approval boundaries, but public-surface review is content-release support, not runtime authority proof. |
| `app/architecture/system-health/monitoring/page.tsx` | `/architecture/system-health/monitoring` | Monitoring and status concepts | Weak/medium | Could confuse the lane with live monitoring or production observability. |
| `app/architecture/system-health/agent-orchestration/page.tsx` | `/architecture/system-health/agent-orchestration` | Agent role and orchestration explanation | Weak/medium | Runner Gang language belongs here only if framed carefully; otherwise it may overstate autonomy. |
| `app/how-we-build/page.tsx` | `/how-we-build` | Build process and governance narrative | Medium | Good future cross-link candidate, but too broad for the first placement trial. |
| `app/achievements/page.tsx` | `/achievements` | Public achievements surface | Weak | Achievements can cite outcomes later, but it should not carry operating-model explanation. |
| `components/aios-interaction-explainer.tsx` | Shared component | Public page and AIOS interaction explanation | Weak/medium | Useful supporting component, but not the clearest place for the release-lane value statement. |

## 3. Proposed/implemented content locations

Implemented location: `/architecture/system-health/observability`

File: `app/architecture/system-health/observability/page.tsx`

What was added: one compact section titled `Public Surface Release Lane`.

Why it belongs there: the page already describes how AIOS keeps public claims bounded by evidence, downgrade rules, and blocked states. The lane is an observability-adjacent assurance step for recurring public-page changes, not a public deployment mechanism.

Why it does not clutter the page: the addition is one section, uses the existing card pattern, and does not add new navigation, a new route, or a new architecture layer.

Claim boundary used: the lane helps package recurring public-page updates for owner review before go-live consideration. It does not deploy, approve go-live, certify production readiness, or replace owner semantic acceptance.

## 4. Architecture/org chart recommendation

Should Public Surface Release Lane appear in the org chart? Defer.

Should it appear in the architecture diagram? Defer.

Recommended visual treatment if added later: a thin cross-cutting assurance lane or release-readiness checkpoint between PageLab/content changes and go-live consideration, under Governance or Release Assurance. Do not present it as a core autonomous AI worker.

Risk of clutter: medium for the org chart and medium/high for the architecture diagram unless the visual treatment is restrained.

Suggested wording: "Public Surface Release Lane helps package recurring public-page updates for owner review before go-live consideration. It does not deploy, approve go-live, or certify production readiness."

## 5. Prime Gate / PM / Runner Gang placement

Prime Gate should be explained primarily in owner-facing governance material as a final decision-quality review for bounded implementation decisions. It evaluates evidence, risk, and scope; it does not replace owner approval.

Gate PM should be framed as a coordination role that keeps the task boundary, Definition of Done, owner gate, and evidence package clear.

Runner Gang should be framed as a role-based review pattern covering source mapping, claim boundary, release verification, leakage, workflow friction, and scope checks. It should not be presented publicly as independent autonomous proof unless separately evidenced.

Public pages should use grouped language such as "role-based review checks" rather than many new named cards.

## 6. Owner review notes

Lyn should inspect:

- Whether the observability placement is clear without making the public site feel overbuilt.
- Whether the boundary wording is strong enough.
- Whether org chart and architecture placement should remain deferred.
- Whether a real PageLab update should be run through the lane before adding broader public references.

Decision options:

- Accept the local trial patch for owner review.
- Revise the placement to org roles or architecture if visibility is more important than restraint.
- Keep the lane internal until one real recurring update has passed through it.
- Ask for a separate architecture diagram patch after the wording is accepted.

Safe to accept: the compact observability section and this owner-facing placement report.

Remain deferred: org-chart placement, architecture diagram changes, dedicated public page, and separate public role cards.

## 7. Safety boundary

- No deploy.
- No go-live approval.
- No production readiness claim.
- No full QA claim.
- No public exposure of private operational artifacts.
- No replacement of owner semantic acceptance.
