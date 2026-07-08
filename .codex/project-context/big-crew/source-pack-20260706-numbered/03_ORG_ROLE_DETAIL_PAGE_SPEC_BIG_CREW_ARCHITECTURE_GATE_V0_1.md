# ORG_ROLE_DETAIL_PAGE_SPEC_BIG_CREW_ARCHITECTURE_GATE_V0_1

Status: DRAFT_LOCAL_ONLY  
Date: 2026-07-06  
Target surface: `/org-roles`  
First detail route: `/org-roles/big-crew-architecture-gate`

---

## 1. Purpose

Create a clickable org-role capability detail page that shows:

- what the role/capability does
- what it is not
- where it came from
- what external references it adapts
- what skills it requires
- how it can be upskilled
- what evidence exists
- what evidence is missing
- what maturity level it currently has

This page is for permanent AIOS capability documentation, not a completed achievement page.

---

## 2. Role Card on `/org-roles`

### Card Fields

- Name: Big Crew Architecture Gate
- Type: Permanent Architecture Gate / Capability
- Origin: R01 first calibration case
- Reuse: client apps, internal tools, AI workflows, portfolio systems, telemetry dashboards
- Maturity: Draft / Pending Opus Review
- Status Badge: Research-backed / Not Certification / Not Production Approval
- CTA: View Capability

### Card Copy

Big Crew Architecture Gate is a permanent architecture capability for evaluating whether demos, prototypes, internal tools, and AI workflows can evolve into maintainable, handover-ready, scalable, observable, traceable, and extendable applications.

---

## 3. Detail Page Sections

### A. Overview

Fields:

- Purpose
- Role type
- Originating case
- Reuse scope
- Current maturity
- Latest evidence
- Missing evidence

### B. Capability Map

Capabilities:

1. Requirement-to-architecture traceability
2. Cross-functional requirement handling
3. Demo-to-production transition review
4. Maintainability review
5. Handover readiness review
6. Scalability and capacity thinking
7. Logging, observability, tracing readiness
8. Security/governance boundary review
9. IA/UX/UI clarity review
10. QA/checker validation planning
11. Release/rollback/stop-state planning

### C. Gate & Definition of Done

Show core DoD from `BIG_CREW_ARCHITECTURE_GATE_CORE_SPEC_V0_1.md`.

### D. External References

Display as:

> Adapted from, not certified by.

Reference groups:

- Architecture: C4 Model, arc42, ISO 42010
- Requirements: BABOK-style requirement categories, ISO 29148
- Quality/tradeoff: ISO 25010, ATAM
- Production readiness: Well-Architected, Twelve-Factor App
- Observability/traceability: OpenTelemetry, W3C Trace Context, OpenLineage
- Delivery/reliability: DORA, Google SRE
- Security/governance: OWASP ASVS/SAMM, NIST SSDF, NIST AI RMF
- Handover docs: Diátaxis

### E. Upskill Path

| Level | Name | Capability |
|---|---|---|
| L0 | Concept Awareness | Understands demo debt and architecture gate purpose |
| L1 | Checklist Operator | Can apply the gate checklist to a small prototype |
| L2 | Architecture Reviewer | Can map requirements to architecture, risk, validation, and handover impact |
| L3 | Delivery Architecture Lead | Can design maintainable, scalable, handover-ready application architecture |
| L4 | Client-facing Productionization Strategist | Can explain tradeoffs, risks, maintainability, scalability, and handover plan to client/team |

### F. Evidence / Receipts

Fields:

- Core spec path
- Phase plan path
- Opus critique status
- Opus grade
- R01 calibration status
- implementation status
- public surface status
- missing evidence
- non-claims

### G. Non-Claims

Show:

- Not production approved
- Not security certified
- Not QA passed
- Not client-handover completed
- Not live verified
- Not framework compliant/certified
- Opus review pending unless receipt exists

---

## 4. UI Requirements

The page should be compact and scannable.

Recommended structure:

- Top summary card
- Capability badges
- Tabs or anchors:
  - Overview
  - Capabilities
  - Gate & DoD
  - References
  - Upskill Path
  - Evidence
- Evidence panel should visually distinguish:
  - Draft
  - Pending review
  - Reviewed
  - Implemented
  - Deployed
  - Verified

---

## 5. Implementation Boundaries

Phase 1 implementation should be static content only.

Do not add:

- database
- CMS
- dynamic role editor
- authentication
- automated evidence ingestion
- all roles at once
- achievement page
- production claims

---

## 6. Page Definition of Done

The page is acceptable only if:

1. `/org-roles` card exists.
2. Detail page is clickable.
3. Capability summary is clear.
4. Role type is clear.
5. Capability is not framed as an employee.
6. References are shown as adapted sources, not certification.
7. Upskill path is visible.
8. Evidence and missing evidence are visible.
9. Non-claims are visible.
10. Opus Grade remains pending until actual review receipt exists.
