# R01_ARCHITECTURE_GATE_PROFILE_DRAFT_V0_1

Status: DRAFT_LOCAL_ONLY  
Date: 2026-07-06  
Profile type: First calibration case for Big Crew Architecture Gate Core  
Core dependency: `BIG_CREW_ARCHITECTURE_GATE_CORE_SPEC_V0_1.md`

---

## 1. Profile Purpose

Apply the permanent Big Crew Architecture Gate to R01 as the first calibration case.

R01 is not the boundary of reuse. R01 is used to test whether the gate is practical for converting a demo/prototype direction into a maintainable, handover-ready, scalable, observable, traceable, and extendable application.

---

## 2. Source of Truth

State unclear until the latest R01 source-of-truth artifact is provided or selected.

Expected source-of-truth candidates:

- latest R01 plan
- latest R01 enforcement/governance artifact
- latest repo state
- latest owner instruction
- latest review receipt

No implementation can be scoped until source of truth is locked.

---

## 3. R01 Profile Questions

1. What is R01 now?
2. What is being rebuilt?
3. What is demo-only?
4. What is intended to become maintainable app behavior?
5. Who is the intended user/client/future maintainer?
6. What requirements are P0/P1?
7. What architecture constraints already exist?
8. What must be observable/loggable/traceable?
9. What must be scalable or extendable later?
10. What handover documentation is required?
11. What are the non-claims?

---

## 4. R01 Required Artifacts

For R01 calibration, create:

1. `R01_ARCHITECTURE_GATE_SUMMARY.md`
2. `R01_CROSS_FUNCTIONAL_REQUIREMENT_MATRIX.md`
3. `R01_TRACEABILITY_MATRIX.md`
4. `R01_C4_CONTEXT_CONTAINER_NOTE.md`
5. `R01_QUALITY_ATTRIBUTE_TRADEOFF_MATRIX.md`
6. `R01_LOGGING_OBSERVABILITY_TRACEABILITY_PLAN.md`
7. `R01_SCALABILITY_CAPACITY_ASSUMPTIONS.md`
8. `R01_CLIENT_HANDOVER_READINESS_NOTE.md`
9. `R01_QA_CHECKER_VALIDATION_PLAN.md`
10. `R01_RELEASE_ROLLBACK_STOP_STATE_NOTE.md`
11. `R01_NON_CLAIMS_AND_MISSING_EVIDENCE.md`
12. `R01_NEXT_IMPLEMENTATION_PACKET.md`

---

## 5. R01 Calibration Gate

Pass only if:

- R01 source of truth is locked.
- R01 current task is scoped.
- forbidden additions are listed.
- core architecture gate has been applied.
- missing evidence is visible.
- Opus critique of core spec has been received or explicitly marked pending.
- no R01 production/rebuild completion claim is made.

---

## 6. R01 Non-Claims

This draft does not claim:

- R01 source of truth selected
- R01 rebuild started
- R01 architecture approved
- R01 implementation ready
- R01 production ready
- R01 client handover ready
- R01 live verified
- Opus reviewed
