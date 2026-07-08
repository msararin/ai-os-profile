# BIG_CREW_ARCHITECTURE_GATE_CORE_SPEC_V0_1

Status: DRAFT_LOCAL_ONLY  
Date: 2026-07-06  
Capability type: Permanent Big Crew Architecture Capability  
Originating case: R01  
Reuse target: All AIOS work that may evolve from demo/prototype/internal tool into maintainable application

---

## 1. Source of Truth

The owner clarified that the architecture gate should not be R01-only. R01 is the first calibration case, but the skill is permanent because it directly affects future work where demos must become maintainable, handover-ready, scalable, traceable, observable, and extendable applications.

---

## 2. Purpose

Big Crew Architecture Gate evaluates whether a demo, prototype, AI workflow, internal tool, or portfolio artifact is architecturally bounded enough to proceed toward an application that can be:

- maintainable
- handover-ready
- scalable
- extendable
- observable
- traceable
- secure enough for its risk class
- understandable by a client or future team
- ready for iterative development without creating unmanaged demo debt

This gate exists to prevent demo debt.

It asks:

> Can this become an application that another team can maintain, operate, extend, debug, and scale after handover?

---

## 3. Permanent Core vs Case Profile

### Permanent Core

`BIG_CREW_ARCHITECTURE_GATE_CORE_SPEC_V0_1.md`

Owns the reusable gate logic, role set, DoD, artifact expectations, references, and quality bar.

### Case Profile

Examples:

- `R01_ARCHITECTURE_GATE_PROFILE_V0_1.md`
- `CLIENT_X_ARCHITECTURE_GATE_PROFILE_V0_1.md`
- `OPTIMIZE_WORKER_ARCHITECTURE_GATE_PROFILE_V0_1.md`
- `SUPERNOVA_ARCHITECTURE_GATE_PROFILE_V0_1.md`

A profile applies the permanent core to a specific system, client, repo, or delivery situation.

---

## 4. Non-Scope

This gate is not:

- a final production approval
- a security certification
- a QA pass
- a deployment approval
- a compliance claim
- a replacement for Prime Gate / Owner Gate
- a Super Runner sub-skill
- a requirement to over-engineer early prototypes

The gate can say:

> Architecture is sufficiently bounded for the next implementation or review step.

It cannot say:

> Production is verified.

---

## 5. Related Roles and Boundaries

| Role / Lens | Type | Responsibility | Boundary |
|---|---|---|---|
| Robert / GPT | Executive orchestrator | Locks source of truth, synthesizes tradeoffs, prevents drift | Not workforce, not final proof |
| Super Runner | Execution accelerator | Decomposes, routes, packages handoffs, collects evidence | Not architecture owner, not gate |
| Solution Architect | Core Big Crew role | Owns product/system boundary, component map, architecture decision logic | Does not approve release |
| Backend / Integration Architect | Core Big Crew role | Owns data, API, auth, service, storage, integration boundary | Does not own UI/user journey |
| Frontend / Surface Architect | Core Big Crew role | Owns route, component structure, page state, surface boundary | Does not own backend/data authority |
| Infra / Runtime Architect | Core Big Crew role | Owns env, deployment, runtime assumptions, secrets, rollback, observability path | Does not approve production |
| QA / Checker Designer | Core Big Crew role | Owns acceptance criteria, deterministic validation, evidence checklist, claim downgrade rules | Not runner, not approver |
| IA Designer | Core lens/role | Owns route structure, taxonomy, information hierarchy, evidence retrievability | Not visual-only UI |
| UX/UI Lens | Conditional lens | Owns usability, visual hierarchy, decision clarity, readable status/evidence surfaces | Used when user-facing or decision-facing surface exists |
| Security / Governance Lens | Conditional lens | Owns auth boundary, permission, data exposure, public/internal claim risk, LLM/agent risk | Not certification |
| Release Captain | Conditional coordination role | Owns release packet completeness, release note, rollback note, post-release evidence checklist | Not final gate |
| Prime Gate / Owner Gate | Authority | Final decision, approve/revise/stop | Does not execute implementation |

---

## 6. External Reference Backbone

The gate adapts published practices. These references are used as design input, not certification claims.

| Reference | Adapted Use |
|---|---|
| ISO/IEC/IEEE 42010 | Stakeholder / concern / viewpoint discipline |
| C4 Model | Context / Container / Component architecture communication |
| arc42 | Lean architecture documentation structure |
| ISO/IEC 25010 | Quality attributes vocabulary |
| SEI ATAM | Lightweight tradeoff analysis between quality attributes |
| BABOK / IIBA requirement categories | Business, stakeholder, solution, functional, non-functional, transition requirements |
| ISO/IEC/IEEE 29148 | Requirement engineering and traceability backbone |
| AWS / Azure / Google Well-Architected | Production-readiness pillars and architecture review lens |
| Twelve-Factor App | Deployable app discipline: codebase, dependencies, config, build-release-run |
| DORA | Delivery performance and stability lens |
| Google SRE | SLO, monitoring, reliability, incident, release, operational readiness |
| OpenTelemetry | Logs, metrics, traces, observability signal model |
| W3C Trace Context | Distributed tracing context propagation |
| OpenLineage | Data lineage for datasets/jobs/runs when data pipelines exist |
| OWASP ASVS / SAMM | Application security verification and software security practice lens |
| NIST SSDF | Secure software development practice lens |
| NIST AI RMF | AI risk framing when LLM/agent paths exist |
| Diátaxis | Client handover documentation structure |

---

## 7. Core Gate Questions

The gate must answer:

1. What problem is this system solving?
2. Who are the stakeholders?
3. What cross-functional requirements matter?
4. What is the architecture boundary?
5. What is demo-only vs production-capable?
6. What must be maintainable after handover?
7. What must be scalable or extendable later?
8. How will the client/future team understand and continue the system?
9. What logs, metrics, traces, and evidence will exist?
10. How can requirements be traced to architecture, implementation, validation, and release?
11. What security/governance boundaries exist?
12. What is the next implementation packet?
13. What must not be claimed yet?

---

## 8. Required Gate Outputs

A case profile must produce or explicitly mark as not applicable:

1. `ARCHITECTURE_GATE_SUMMARY.md`
2. `STAKEHOLDER_CONCERN_VIEWPOINT_TABLE.md`
3. `CROSS_FUNCTIONAL_REQUIREMENT_MATRIX.md`
4. `C4_CONTEXT_AND_CONTAINER_NOTE.md`
5. `ARCHITECTURE_DECISION_RECORDS_SUMMARY.md`
6. `QUALITY_ATTRIBUTE_AND_TRADEOFF_MATRIX.md`
7. `LOGGING_OBSERVABILITY_TRACEABILITY_PLAN.md`
8. `SCALABILITY_AND_CAPACITY_ASSUMPTIONS.md`
9. `SECURITY_GOVERNANCE_BOUNDARY_NOTE.md`
10. `QA_CHECKER_VALIDATION_PLAN.md`
11. `IA_UX_UI_REVIEW_NOTE.md`
12. `CLIENT_HANDOVER_READINESS_NOTE.md`
13. `RELEASE_ROLLBACK_STOP_STATE_NOTE.md`
14. `NON_CLAIMS_AND_MISSING_EVIDENCE.md`
15. `NEXT_IMPLEMENTATION_PACKET.md`

---

## 9. Definition of Done

Big Crew Architecture Gate Core can pass for a case only when:

1. Product/system boundary is defined.
2. Stakeholders and cross-functional requirements are captured.
3. Requirement-to-architecture traceability exists.
4. C4-style context/container/component view exists, or the absence is justified.
5. Frontend/backend/infra/data/integration responsibilities are separated.
6. Maintainability risks are assessed.
7. Client or future-team handover readiness is assessed.
8. Scalability and capacity assumptions are documented.
9. Extendability points are identified.
10. Logging, metrics, tracing, and evidence strategy is documented.
11. Runtime traceability strategy exists for critical flows.
12. Data lineage strategy exists when data pipelines or exports exist.
13. Security/privacy/governance boundaries are documented.
14. QA/checker validation plan exists.
15. IA/UX/UI review exists when user-facing or decision-facing surfaces exist.
16. Release/rollback/stop-state path exists.
17. Known gaps and non-claims are listed.
18. Next implementation packet can be produced for Codex or another worker.
19. The gate clearly states that it does not approve production release by itself.

---

## 10. Mandatory Non-Claims

Passing this gate does not mean:

- production is approved
- security is certified
- QA has passed
- scalability is proven
- client handover is complete
- live deployment is verified
- framework compliance is certified
- R01 or any case is complete
- Opus has approved unless a receipt exists

---

## 11. Opus Review Status

Opus Grade: PENDING_OPUS_REVIEW  
Opus Verdict: PENDING_OPUS_REVIEW  
Required next artifact after Opus response: `OPUS_REVIEW_BIG_CREW_ARCHITECTURE_GATE_V0_1_RECEIPT.md`
