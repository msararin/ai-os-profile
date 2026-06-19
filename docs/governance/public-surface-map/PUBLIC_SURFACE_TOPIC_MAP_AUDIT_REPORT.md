# Public Surface Topic Map Audit Report

Status: owner review required  
Scope: proposal and mapping only. No deployment, public-page rewrite, org-chart patch, or architecture patch was performed.

## 1. Summary

The audit found that AIOS public topics are mostly present but inconsistently placed. The strongest current pages are:

- `/org-roles` for role authority and execution-control boundaries;
- `/architecture/system-health/observability` for claim boundary and PageLab public-surface review support;
- `/architecture/system-health/monitoring` for cockpit/status-style static review;
- `/architecture/system-health/runtime-authority-evidence` for runtime authority and validation semantics;
- `/ai-operating-system/agent-review-dashboard` for workforce evidence and Data Team rule visibility.

The weakest current surface is `/architecture` because it is the page users expect to explain the whole operating model at a glance, but it currently shows only a compact four-group map.

## 2. Search Roots Checked

| Root | Exists | Notes |
| --- | --- | --- |
| `ai-os-profile` | true | Primary public site and route source. |
| `robert-knowledge-base` | true | Related governance, evidence, and source-of-truth context exists. |
| `ai-os-profile-governance-repair` | true | Related go-live, achievements, cockpit, and governance repair artifacts exist. |
| `robert-ai-os-context` | true | Public export rules and context artifacts exist. |
| `kb-case003-owner-auth-after-t4-20260616` | true | Related Runner Gang, Prime Gate, cockpit, source-state, and public value patch artifacts exist. |

## 3. Key Inconsistencies

### Org Chart Gaps

- Data Team appears in lower public sections and dashboard evidence but is not clearly elevated as an org-chart lane.
- Prime Gate is important but not presented as a consistent role/gate across org chart, architecture, and governance pages.
- Gate PM / PM appears conceptually through PM/Delivery and coordination language, but not as a clear public role boundary.
- Public Surface Runner and PageLab Public Surface Release Lane should not become full teams in the org chart yet; they are better treated as support lanes.

### Architecture Map Gaps

- `/architecture` does not yet show the full flow from intake to routing to execution workforce to evidence/gates to public/business outcome.
- GPT/Robert, Codex, OpenRouter, Ollama, Big Crew, Supernova, optimize-worker, and Data Team are not all placed in one executive-readable map.
- Prime Gate, Gate PM, Runner Gang, Public Surface Runner, and owner decision are missing or underrepresented.
- Advisory vs blocking metrics and deployment claim safety are not visible enough.

### Governance/Policy Gaps

- How We Build has strong methodology language but does not yet own the reusable topic-map control.
- Prime Gate, Gate PM, Runner Gang, source-state drift, and deployment claim safety need compact governance explanations.
- Public claim boundary exists across pages, but future updates need a single reusable checklist to prevent drift.

### Role/Responsibility Gaps

- Super Runner, Runner, and Checker are strong and relatively consistent.
- Prime Gate and Gate PM need clearer public-safe role framing.
- Runner Gang should be grouped as a review pattern rather than shown as many public roles.
- Public Surface Runner should be framed as deterministic validation, not authority.

### Cockpit/Status Gaps

- Monitoring, observability, evidence readiness, and runtime authority are all useful but split across several pages.
- Cockpit/status pages need a topic map so status visuals do not become the source of truth by appearance alone.
- Advisory vs blocking status needs to become a repeated public convention.

### Public Surface / PageLab Gaps

- PageLab Public Surface Release Lane is now visible in observability, but broader placement is not yet canonicalized.
- Public Surface Runner has a local command and evidence packet, but public pages do not yet consistently explain where it sits in the operating model.
- The safest next public treatment is a small architecture-map lane, not a new dedicated PageLab page.

### Overexposed or Clutter Risks

- `/achievements` contains many governance topics as evidence snippets. It should not become the canonical explanation for these topics.
- `/org-roles` risks becoming cluttered if every gate/lane becomes a full card.
- `/architecture/system-health/monitoring` is dense and should not absorb more architecture or org-chart meaning.

## 4. Executive Architecture Map v2 Recommendation

Recommended structure:

1. North Star Header.
2. Five-lane main operating flow:
   - Intake & Strategy
   - Orchestration & Routing
   - Execution Workforce
   - Evidence / Gates / Validation
   - Public Surface / Portfolio / Business Outcome
3. Cross-cutting controls:
   - Source of Truth
   - Evidence Readiness
   - Public Claim Boundary
   - Cockpit Observability
   - Owner-Delegated Decision Policy
   - Role Power Separation
   - Advisory vs Blocking Metrics
   - Deployment Claim Safety
4. Workforce chips for GPT/Robert, Codex, OpenRouter, Ollama, optimize-worker, Big Crew, Supernova, and Data Team.
5. Gate/review chips for Gate PM, Super Runner, Runner, Checker, Runner Gang, Prime Gate, Public Surface Runner, and Owner.
6. Outcome row for safer public updates, lower manual validation burden, traceable portfolio evidence, reusable release lane, clearer governance story, and less content breakage risk.

What should remain internal:

- raw evidence packets;
- private KB/source checkout paths;
- provider receipt bodies;
- prompt logs;
- unreviewed telemetry;
- private decision records;
- worker roster details that are not confirmed.

## 5. Recommended Topic Actions

Highest priority:

- Add Executive Architecture Map v2 to `/architecture`.
- Add Data Team into org chart as a support lane or evidence-structure lane, not final authority.
- Add Prime Gate and Gate PM compact public-safe explanations under `/how-we-build` and/or `/org-roles`.
- Add Public Surface Runner / PageLab lane into architecture as a right-side public-surface review lane.
- Keep Achievements as outcome evidence, not the canonical policy or role page.

Deferred:

- Dedicated PageLab/Public Surface page.
- Full Runner Gang public role cards.
- Large monitoring/cockpit rewrite.
- Broad governance copy rewrite.

## 6. Owner Decisions Needed

Decision options:

- `APPROVE_TOPIC_MAP_AS_WORKING_CONTROL`
- `REVISE_TOPIC_PLACEMENT`
- `PROCEED_TO_EXECUTIVE_ARCHITECTURE_MAP_V2_PATCH`
- `PROCEED_TO_ORG_CHART_CONSISTENCY_PATCH`
- `RUN_TOPIC_MAP_CHECK_ON_CURRENT_COCKPIT`
- `KEEP_AS_INTERNAL_GOVERNANCE_ONLY`

Recommended next decision: approve the topic map as a working control, then proceed to a bounded `/architecture` v2 patch before touching org roles.

## 7. Safety Boundary

- No deploy.
- No public go-live approval.
- No production-readiness claim.
- No full QA claim.
- No autonomous orchestration claim.
- No SEO/accessibility/analytics validation claim.
- No public exposure of private operational artifacts.

