# AIOS Public Surface Topic Map

Status: owner review required  
Purpose: make future public-page updates easier to validate by defining where each AIOS topic belongs, which pages support it, and which claims must stay blocked.

## How to Use This Map

Before a public page update:

1. Find the topic in this map.
2. Update the canonical public page first, or document why the canonical page is not changing.
3. Add only the listed supporting pages if the update needs cross-links.
4. Avoid pages marked as high clutter risk unless Lyn approves the placement.
5. Preserve the public-safe description and forbidden-claim boundary.
6. Revalidate each affected route and any generated review packet.

## Route Inventory

| Route | Source file | Public purpose | Main topics visible | Missing / inconsistent | Clutter risk |
| --- | --- | --- | --- | --- | --- |
| `/architecture` | `app/architecture/page.tsx` | Executive Architecture Map and operating-model overview | Executive architecture, AIOS model, Robert/GPT, Big Crew, Super Runner, Runner, Checker, source of truth, release safety | Missing Prime Gate, Gate PM, Runner Gang, Public Surface Runner, PageLab lane, Data Team, advisory/blocking, deployment claim safety | Medium |
| `/org-roles` | `app/org-roles/page.tsx` | Org chart and role policy | Lyn, Robert/GPT, Super Runner, Runner, Checker, Big Crew, Researcher, Supernova, optimize-worker, Data Team | Data Team appears in lower grid but not clearly as org-chart lane; Prime Gate, Gate PM, Runner Gang, Public Surface Runner, PageLab lane are not consistently visible | High |
| `/architecture/system-health` | `app/architecture/system-health/page.tsx` | System-health hub for public-safe review surfaces | System Health, public surface governance, monitoring, runtime authority, evidence readiness, access boundary | Public Surface Runner and PageLab lane need cross-link ownership | Medium |
| `/architecture/system-health/observability` | `app/architecture/system-health/observability/page.tsx` | Runtime enforcement value and claim-boundary observability | Cockpit observability, claim boundary, evidence readiness, Checker, PageLab release lane, deployment claim safety | Release lane now appears here but not yet consistently mapped across architecture/org pages | Low |
| `/architecture/system-health/monitoring` | `app/architecture/system-health/monitoring/page.tsx` | Static monitoring review and gate/block status | Monitoring, cockpit observability, advisory/blocking, claim boundary | Can be mistaken for live monitoring if boundary language is copied poorly | High |
| `/architecture/system-health/runtime-authority-evidence` | `app/architecture/system-health/runtime-authority-evidence/page.tsx` | Runtime authority evidence and validation dashboard | Runtime authority, role power separation, owner-delegated decision policy, deterministic validation, Data Team | Data Team appears as evidence lens but not as a clear architecture/org lane | Medium |
| `/architecture/system-health/agent-orchestration` | `app/architecture/system-health/agent-orchestration/page.tsx` | Agent orchestration and workforce lane map | AI workforce, Codex, Big Crew, Supernova, Data Team, role power separation, source of truth | Runner Gang and Prime Gate distinction are not yet cleanly placed | Medium |
| `/architecture/system-health/evidence-readiness` | `app/architecture/system-health/evidence-readiness/page.tsx` | Evidence readiness, missingness, blocked comparison | Evidence readiness, advisory/blocking, OpenRouter, Codex, source of truth | Needs public-surface/deployment safety cross-reference | Low |
| `/ai-operating-system` | `app/ai-operating-system/page.tsx` | AIOS case-study overview | GPT/Robert, Codex, OpenRouter, Ollama, Supernova, Data Team, Big Crew, Prime Gate | Prime Gate appears but is not canonical across org/architecture/status; PageLab lane missing | High |
| `/ai-operating-system/agent-review-dashboard` | `app/ai-operating-system/agent-review-dashboard/page.tsx` | Agent review evidence dashboard | AI workforce, Data Team, Big Crew, Supernova, Super Runner, Runner, Checker, source of truth | Good role evidence not fully reflected in executive architecture | Medium |
| `/how-we-build` | `app/how-we-build/page.tsx` | Methodology and governance patterns | Governance, source of truth, claim boundary, release safety, validation | Natural home for reusable topic-map checklist and public-surface governance cross-link | Medium |
| `/achievements` | `app/achievements/page.tsx` | Achievement evidence and milestones | Achievements, OpenRouter, Codex, Checker, Prime Gate, Data Team, deployment claim safety, source of truth | Many topics appear as proof snippets; should not become canonical explanations | High |

## Topic Map

| Topic | Canonical public page | Supporting pages | Org chart | Executive map | Cockpit/status | Governance/policy | Role/responsibility | Status | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Executive Architecture Map | `/architecture` | `/ai-operating-system`, `/org-roles`, `/architecture/system-health` | No | Yes | Defer | Defer | No | PARTIAL | ADD_TO_EXECUTIVE_ARCHITECTURE_MAP |
| AIOS Operating Model | `/ai-operating-system` | `/architecture`, `/org-roles`, `/how-we-build` | Yes | Yes | Defer | Yes | Yes | PARTIAL | ADD_CROSS_LINK |
| Robert / GPT Executive Brain | `/org-roles` | `/architecture`, `/ai-operating-system`, `/how-we-build` | Yes | Yes | Defer | Yes | Yes | CONSISTENT | NO_ACTION |
| Big Crew | `/org-roles` | `/architecture`, `/ai-operating-system/agent-review-dashboard`, `/ai-operating-system` | Yes | Yes | Defer | No | Yes | PARTIAL | ADD_TO_EXECUTIVE_ARCHITECTURE_MAP |
| Supernova | `/org-roles` | `/ai-operating-system`, `/ai-operating-system/agent-review-dashboard`, `/achievements` | Yes | Yes | Defer | No | Yes | PARTIAL | ADD_TO_EXECUTIVE_ARCHITECTURE_MAP |
| optimize-worker | `/org-roles` | `/architecture/system-health/evidence-readiness`, `/achievements` | Yes | Yes | Defer | No | Yes | PARTIAL | ADD_TO_EXECUTIVE_ARCHITECTURE_MAP |
| Codex | `/ai-operating-system` | `/architecture`, `/how-we-build`, `/achievements` | Defer | Yes | Defer | Defer | Yes | PARTIAL | ADD_TO_EXECUTIVE_ARCHITECTURE_MAP |
| OpenRouter | `/ai-operating-system` | `/architecture/system-health/evidence-readiness`, `/achievements` | No | Yes | Defer | Defer | Defer | PARTIAL | ADD_TO_EXECUTIVE_ARCHITECTURE_MAP |
| Ollama | `/ai-operating-system` | `/architecture` | No | Yes | No | No | Defer | MISSING | ADD_TO_EXECUTIVE_ARCHITECTURE_MAP |
| Prime Gate | `/how-we-build` | `/architecture`, `/org-roles`, `/ai-operating-system`, `/achievements` | Defer | Yes | Defer | Yes | Yes | AMBIGUOUS | ADD_COMPACT_SECTION |
| Gate PM / PM | `/org-roles` | `/architecture`, `/how-we-build` | Yes | Yes | No | Yes | Yes | MISSING | ADD_ROLE_CARD |
| Runner Gang | `/how-we-build` | `/org-roles`, `/architecture/system-health/agent-orchestration` | No | Defer | Defer | Yes | Yes | AMBIGUOUS | ADD_COMPACT_SECTION |
| Checker | `/org-roles` | `/architecture/system-health/observability`, `/architecture/system-health/runtime-authority-evidence`, `/achievements` | Yes | Yes | Yes | Yes | Yes | CONSISTENT | NO_ACTION |
| Runner | `/org-roles` | `/architecture`, `/ai-operating-system/agent-review-dashboard` | Yes | Yes | Defer | Yes | Yes | CONSISTENT | NO_ACTION |
| Super Runner | `/org-roles` | `/architecture`, `/ai-operating-system/agent-review-dashboard` | Yes | Yes | Defer | Yes | Yes | CONSISTENT | NO_ACTION |
| Public Surface Runner | `/architecture/system-health/observability` | `/how-we-build`, `/architecture/system-health`, `/org-roles` | No | Defer | Yes | Yes | Defer | PARTIAL | ADD_CROSS_LINK |
| PageLab Public Surface Release Lane | `/architecture/system-health/observability` | `/architecture/system-health`, `/how-we-build` | Defer | Yes | Yes | Yes | Defer | PARTIAL | ADD_TO_EXECUTIVE_ARCHITECTURE_MAP |
| Data Team | `/ai-operating-system/agent-review-dashboard` | `/org-roles`, `/architecture/system-health/runtime-authority-evidence`, `/ai-operating-system` | Yes | Yes | Yes | Defer | Yes | AMBIGUOUS | ADD_TO_ORG_CHART |
| Evidence Readiness | `/architecture/system-health/evidence-readiness` | `/architecture/system-health`, `/architecture/system-health/observability`, `/architecture` | No | Yes | Yes | Yes | No | CONSISTENT | ADD_TO_EXECUTIVE_ARCHITECTURE_MAP |
| Public Claim Boundary | `/architecture/system-health/observability` | `/how-we-build`, `/architecture/system-health`, `/achievements` | No | Yes | Yes | Yes | Yes | CONSISTENT | ADD_CROSS_LINK |
| Source-State Drift | `/how-we-build` | `/architecture/system-health/observability`, `/achievements` | No | Defer | Yes | Yes | No | MISSING | ADD_COMPACT_SECTION |
| Cockpit Observability | `/architecture/system-health/monitoring` | `/architecture/system-health/observability`, `/architecture/system-health` | No | Yes | Yes | Yes | No | PARTIAL | ADD_TO_EXECUTIVE_ARCHITECTURE_MAP |
| Advisory vs Blocking Metric | `/architecture/system-health/monitoring` | `/architecture/system-health/evidence-readiness`, `/how-we-build` | No | Yes | Yes | Yes | Defer | MISSING | ADD_TO_EXECUTIVE_ARCHITECTURE_MAP |
| Role Power Separation | `/org-roles` | `/architecture`, `/architecture/system-health/runtime-authority-evidence`, `/ai-operating-system/agent-review-dashboard` | Yes | Yes | Defer | Yes | Yes | PARTIAL | ADD_CROSS_LINK |
| Deterministic Validation Harness | `/how-we-build` | `/architecture/system-health/runtime-authority-evidence`, `/architecture/system-health/observability` | No | Yes | Yes | Yes | Defer | PARTIAL | ADD_CROSS_LINK |
| RCA Before Execution | `/how-we-build` | `/achievements`, `/architecture/system-health/observability` | No | Defer | Yes | Yes | Defer | MISSING | ADD_COMPACT_SECTION |
| Deployment Claim Safety | `/how-we-build` | `/architecture/system-health/observability`, `/achievements` | No | Yes | Yes | Yes | No | PARTIAL | ADD_TO_EXECUTIVE_ARCHITECTURE_MAP |
| Owner-Delegated Decision Policy | `/org-roles` | `/how-we-build`, `/architecture/system-health/runtime-authority-evidence`, `/architecture` | Yes | Yes | Defer | Yes | Yes | PARTIAL | ADD_CROSS_LINK |
| Source of Truth | `/how-we-build` | `/architecture`, `/architecture/system-health`, `/ai-operating-system/agent-review-dashboard` | Yes | Yes | Yes | Yes | Defer | CONSISTENT | ADD_CROSS_LINK |
| Public Surface Governance | `/how-we-build` | `/architecture/system-health`, `/architecture/system-health/observability` | No | Yes | Yes | Yes | Defer | PARTIAL | ADD_CROSS_LINK |
| Monitoring / Observability | `/architecture/system-health/monitoring` | `/architecture/system-health`, `/architecture/system-health/observability` | No | Yes | Yes | Yes | No | PARTIAL | ADD_TO_EXECUTIVE_ARCHITECTURE_MAP |
| Runtime Authority | `/architecture/system-health/runtime-authority-evidence` | `/architecture/system-health`, `/org-roles`, `/architecture` | Defer | Yes | Yes | Yes | Yes | CONSISTENT | ADD_TO_EXECUTIVE_ARCHITECTURE_MAP |
| Release Safety | `/how-we-build` | `/architecture`, `/architecture/system-health/observability`, `/achievements` | No | Yes | Yes | Yes | Defer | PARTIAL | ADD_TO_EXECUTIVE_ARCHITECTURE_MAP |
| Achievements/Public Surface Updates | `/achievements` | `/architecture/system-health/observability`, `/how-we-build` | No | Defer | Yes | Yes | No | OVEREXPOSED | ADD_CROSS_LINK |

## Placement Notes

- Architecture should become the one-glance executive map, not a full role registry.
- Org Roles should own role authority and responsibility boundaries.
- How We Build should own reusable governance patterns: Prime Gate, Gate PM, Runner Gang, topic-map checklist, and deployment claim safety.
- System Health should own public-safe status, monitoring, evidence readiness, runtime authority, and claim-boundary review surfaces.
- Achievements should cite outcomes only; it should not become the canonical explanation for roles or governance.

