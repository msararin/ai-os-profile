# T8 Event Ledger Infrastructure Evidence

Date: 2026-08-29
Original T8 implementation base: `4849b2ee3b69267f0b25697f667ac3e2892f0716`
T8R release-line governance base: `9202d12d4dc828bbf55eb309a071b1af97ce2879`
Claim: `RUNTIME_VERIFIED_WITH_BOUNDARIES`

## Route Ledger

| Field | Contract |
| --- | --- |
| Outcome | Preserve durable, append-oriented experiment reasoning and expose a ledger-backed current gate without silently rewriting history. |
| Lane | T8 Event Ledger infrastructure only. |
| Sources | Supplied Spec/DoD/Technical Plan PDF, Test Cases XLSX, accepted T7 Engineering custody, repository/runtime inspection. |
| Allowed | Databricks-ready DDL and parameterized logger/updater SQL, local executable behavioral validation, evidence/runbook, isolated commit/PR. |
| Forbidden | Cockpit/UI integration, navigation/IA/content migration, legacy deletion, TEST access, training/scoring, model/registry or experiment-data mutation. |
| Runtime authority | Repository automation did not receive Databricks credentials. The owner executed the controlled SQL in the named Databricks environment and supplied the captured outputs. The durable runtime receipt is `t8-databricks-runtime-receipt-20260830.md`. |
| Stop gates | Any ledger UPDATE/DELETE/overwrite path; correction mutates history; implicit execution flags; idempotency collision accepted; unlinked projection; mixed phase scope. |
| Rollback | Revert T8 repository commit. For later runtime failure, revoke writer and quarantine—not drop—the new tables. |

## Implemented contract

- Ledger: `adb_nbo_nrt_mlops_dev.governance.experiment_execution_event_ledger_v0_2`
- Projection: `adb_nbo_nrt_mlops_dev.governance.experiment_gate_status_v0_2`
- Canonical Spec fields retained across identity, dependency, reasoning, evidence, controls, payload, execution boundary, provenance, and governance.
- Safety fields add schema/writer version, scoped idempotency key, event digest, `parent_log_id`, `supersedes_log_id`, blocker/next action, and projection version.
- Ledger workflow uses insert-only `MERGE ... WHEN NOT MATCHED THEN INSERT`; no matched update, delete, overwrite, replace, or truncate operation exists.
- Under the locally tested sequential/single-writer contract, same idempotency key + digest is a no-op replay; a changed digest is rejected. SQL recomputes SHA-256 from canonical semantic content and rejects a stale caller digest.
- Superseding decisions append a new event in the same experiment/version/lane/gate. Direct supersede branching, missing targets, and self/cycle linkage are rejected.
- Gate projection is intentionally mutable but separate, derives facts from one ledger row, requires an expected latest pointer, and enforces projection versions 1, 2, 3... sequentially.
- Databricks Delta does not enforce the logical unique keys. v0.2 therefore requires one serialized writer job/principal for both tables. Concurrent first-writer safety remains unverified and multi-writer operation is prohibited.
- Runtime verification SQL compares the complete 45-column ledger and 13-column projection contracts in both directions, including ordinal/type/nullability, and exposes `delta.appendOnly` for a mandatory stop-gate check. UPDATE and DELETE are separate expected-failure probes so one error cannot suppress the other; an assertion query after each probe must prove the captured row count, digest, and `notes` are unchanged.

## Local execution receipt

Command: `pnpm test:nbo-event-ledger`

Result: PASS with three ledger rows retained and `evt-3` projected as latest. Verified locally:

- schema creation/read;
- append and exact read-back;
- idempotent replay;
- conflicting replay rejection;
- stale caller digest rejection after canonical recomputation;
- parent/child linkage;
- supersede without history mutation;
- ambiguous second superseder rejection;
- explicit flags and T8 scope guard;
- JSON shape/size validation;
- gate projection compare-and-set and stale-writer rejection;
- static prohibition of ledger UPDATE/DELETE/overwrite/replace/matched-update SQL.

Additional checks:

- `git diff --check` — PASS
- `pnpm typecheck` — PASS
- Cockpit source manifest base/work — byte-identical; digest `efe1b1f6f3abf1d187de2134f6aa90bee6f0cfaf88d41e7375e69f1b038362a2`
- No application, UI, route, content, legacy, TEST, model, registry, or experiment-data file changed.

## Databricks runtime receipt — 2026-08-30

The contract was tested on the actual Azure Databricks runtime, not inferred from local or static validation. Retained evidence covers successful execution, deliberately triggered expected failures, and read-back verification that state remained unchanged after each rejection.

Runtime findings:

- exact ledger schema `45/45` and projection schema `13/13` passed after metadata normalization;
- `delta.appendOnly=true` observed before writes;
- parent, child, and superseding correction events appended and read back with valid lineage;
- replay with the same idempotency key/digest remained one row; changed digest raised `USER_RAISED_EXCEPTION / SQLSTATE P0001`;
- projection advanced from version 1 to 2; stale version 1 pointer raised `USER_RAISED_EXCEPTION / SQLSTATE P0001` and version 2 remained unchanged;
- ledger UPDATE and DELETE each raised `DELTA_CANNOT_MODIFY_APPEND_ONLY / SQLSTATE 42809`;
- post-failure read-back retained the original row, digest, timestamp, and notes;
- final closeout returned three ledger rows, one projection row, zero prohibited execution flags, and `PASS_T8_RUNTIME_VERIFIED_WITH_BOUNDARIES`.

Runtime verification also identified three verifier portability defects: this Databricks metadata surface reports zero-based ordinals, reports `BIGINT` as `LONG`, and makes timezone-naive hard-coded timestamp comparisons unsafe. The verifier now normalizes ordinals and the `LONG`/`BIGINT` alias; closeout checks compare retained state without timezone-naive literals.

## Acceptance status

| Test | Local evidence | Databricks status |
| --- | --- | --- |
| TC-027 create/read schema | PASS in SQLite mirror + static Databricks DDL | PASS: ledger 45/45 and projection 13/13 after metadata normalization; append-only true |
| TC-028 append two events | PASS locally | PASS: parent and child retained as separate rows |
| TC-029 supersede, old remains | PASS locally | PASS: additive supersede retained prior digest and row |
| TC-030 TEST/model/artifact flags | PASS locally; explicit and false for T8 | PASS: all five flags false on T8 samples |
| TC-031 parent linkage | PASS locally | PASS: child links to parent step and log IDs |
| TC-032 current gate projection | PASS locally with CAS | PASS: versions 1→2; stale version 1 rejected and version 2 unchanged |
| TC-049 no TEST/model/data mutation | PASS for repository/local execution boundary | PASS for captured T8 rows: prohibited flags 0; UPDATE and DELETE rejected |
| TC-050 one T8 change-set | PASS | Not deployment proof |

T8 is `RUNTIME_VERIFIED_WITH_BOUNDARIES` for the owner-operated serialized single-writer execution recorded in the durable receipt. This establishes exact schema reconciliation, append-only enforcement, parent/child append, idempotent replay, collision rejection with unchanged history, additive supersede, projection compare-and-set, stale-pointer rejection, and UPDATE/DELETE rejection in the named environment. Repository validation separately proves that the supplied ledger workflow contains no truncate, overwrite, replace, delete, or matched-update path; those additional operations were not executed as runtime rejection probes. Active-principal identity and privilege fidelity were not captured. This does not establish concurrent or multi-writer safety, production readiness, model quality, TEST access, training, scoring, or artifact operation. Claims of unconditional or multi-writer idempotency remain prohibited.
