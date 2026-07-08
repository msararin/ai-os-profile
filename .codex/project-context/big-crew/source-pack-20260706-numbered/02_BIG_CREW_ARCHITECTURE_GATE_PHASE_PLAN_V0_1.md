# BIG_CREW_ARCHITECTURE_GATE_PHASE_PLAN_V0_1

Status: DRAFT_LOCAL_ONLY  
Date: 2026-07-06  
Decision: Build core capability first, then calibrate with R01, then roll out role detail pages.

---

## 1. Build Strategy Decision

Do not build every role deeply at once.

Recommended approach:

1. Create permanent core spec.
2. Create one canonical org-role detail page for Big Crew Architecture Gate.
3. Send to Opus critique.
4. Patch into v0.2.
5. Apply to R01 as first calibration case.
6. Roll out reusable detail template to other roles only after the first one is validated.

Reason:

Doing all roles at once creates high risk of:
- role bloat
- inconsistent maturity labels
- unclear evidence standards
- Opus critique becoming too broad
- UI implementation expanding before the capability model stabilizes

---

## 2. Phase Overview

| Phase | Goal | Gate | Output |
|---|---|---|---|
| Phase 0 | Spec and Opus critique prep | Spec Completeness Gate | Spec pack + Opus packet |
| Phase 1 | `/org-roles` detail template first slice | Org Role Detail Gate | One clickable role detail page |
| Phase 2 | R01 calibration profile | R01 Calibration Gate | R01 architecture gate profile + matrices |
| Phase 3 | Role rollout | Role Template Reuse Gate | Additional role detail pages |
| Phase 4 | Evidence integration | Evidence Surface Gate | Receipts, maturity, missing evidence |
| Phase 5 | Codex implementation handoff | Implementation Readiness Gate | Codex packet and validation plan |

---

## 3. Phase 0 — Spec and Opus Critique Prep

### Goal

Create research-backed spec and critique packet before implementation.

### Scope

- Big Crew Architecture Gate Core Spec
- Phase Plan
- Org Role Detail Page Spec
- R01 Profile Draft
- Opus Critique Packet

### Forbidden

- No source-code implementation
- No live route change
- No public claim
- No production readiness claim
- No framework certification claim
- No all-role rollout yet

### Gate: Spec Completeness Gate

Pass only if:

- core capability purpose is clear
- R01 is framed as first calibration case, not reuse boundary
- role boundaries are explicit
- gate and DoD are measurable
- external resource backbone is listed
- Opus grading rubric exists
- non-claims are listed

### Definition of Done

- all spec files exist
- Opus packet exists
- Opus Grade is marked `PENDING_OPUS_REVIEW`
- no implementation claim is made
- next action is to send to Opus

---

## 4. Phase 1 — Org Role Detail Template First Slice

### Goal

Create one clickable org-role detail page for Big Crew Architecture Gate.

### Scope

- `/org-roles` index card
- `/org-roles/big-crew-architecture-gate` detail page
- static content only
- no dynamic CMS
- no database
- no role automation

### Recommended Page Sections

- Overview
- Capabilities
- Gate & DoD
- External References
- Upskill Path
- Evidence / Receipts
- Non-claims

### Gate: Org Role Detail Gate

Pass only if:

- role card is visible
- detail page is reachable by click
- capability is described without implying a person/employee
- external references are shown as “Adapted from,” not “Certified by”
- upskill path is visible
- evidence/missing evidence is visible
- no unsupported status claim appears

### Definition of Done

- clickable org-role detail route exists locally
- content is static and bounded
- page shows capability, references, upskill path, evidence, non-claims
- no achievement page is created unless owner asks
- implementation packet can be produced for Codex

---

## 5. Phase 2 — R01 Calibration Profile

### Goal

Use R01 as first calibration case for the permanent gate.

### Scope

- R01 context and current source of truth
- R01 cross-functional requirements
- R01 architecture boundary
- R01 logging/traceability/scalability readiness
- R01 handover and maintainability readiness

### Gate: R01 Calibration Gate

Pass only if:

- R01 source of truth is stated
- demo-to-app transition risk is assessed
- required matrices are drafted
- known missing evidence is listed
- next Codex/worker implementation packet can be created

### Definition of Done

- `R01_ARCHITECTURE_GATE_PROFILE_V0_1.md` exists
- `CROSS_FUNCTIONAL_REQUIREMENT_MATRIX.md` exists or is planned with placeholders
- `TRACEABILITY_MATRIX.md` exists or is planned with placeholders
- `LOGGING_OBSERVABILITY_TRACEABILITY_PLAN.md` exists or is planned with placeholders
- `CLIENT_HANDOVER_READINESS_NOTE.md` exists or is planned with placeholders
- no R01 production/rebuild completion is claimed

---

## 6. Phase 3 — Role Template Rollout

### Goal

Reuse the org-role detail template for related permanent capabilities.

### Candidate Roles

- Super Runner
- QA / Checker Designer
- IA Designer
- UX/UI Lens
- Surface Guild
- Surface Runner
- Release Captain
- Data Team
- Backend / Integration Architect
- Frontend / Surface Architect
- Infra / Runtime Architect
- Solution Architect

### Gate: Role Template Reuse Gate

Pass only if:

- each role has type: Gate / Skill / Runner / Guild / Lens / Architect
- each role has capability map
- each role has upskill path
- each role has evidence status
- each role has non-claims
- role does not become artificial employee unless needed

### Definition of Done

- no more than 2–3 new role pages per iteration
- each role page reuses the same content model
- maturity levels are consistent
- missing evidence is disclosed

---

## 7. Phase 4 — Evidence Integration

### Goal

Connect role pages with receipts and proof artifacts.

### Scope

- latest spec links
- Opus review receipt
- Codex implementation receipt
- validation results
- public/local status
- missing evidence

### Gate: Evidence Surface Gate

Pass only if:

- role page distinguishes draft, reviewed, implemented, deployed, verified
- missing provider/model/token/cost telemetry is disclosed when relevant
- claim level is displayed
- no unsupported PASS/DONE/VERIFIED appears

### Definition of Done

- evidence panel exists
- latest receipt path displayed
- missing evidence displayed
- claim level displayed

---

## 8. Phase 5 — Implementation Readiness

### Goal

Prepare Codex implementation packet for the next approved phase.

### Scope

- allowed files
- forbidden files
- source-of-truth lock
- validation commands
- report format
- no deploy unless explicitly authorized

### Gate: Implementation Readiness Gate

Pass only if:

- implementation packet is scoped
- repo path is known
- dirty-state risk is addressed
- validation commands are listed
- rollback/stop-state rules are listed

### Definition of Done

- Codex packet exists
- no code is changed before approval
- next safe action is explicit
