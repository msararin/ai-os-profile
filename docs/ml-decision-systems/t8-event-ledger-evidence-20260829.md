# T8 Event Ledger Infrastructure Evidence

Date: 2026-08-29
Base: `4849b2ee3b69267f0b25697f667ac3e2892f0716`
Claim: `VALIDATED_LOCAL_ONLY / BLOCKED_RUNTIME`

## Route Ledger

| Field | Contract |
| --- | --- |
| Outcome | Preserve durable, append-oriented experiment reasoning and expose a ledger-backed current gate without silently rewriting history. |
| Lane | T8 Event Ledger infrastructure only. |
| Sources | Supplied Spec/DoD/Technical Plan PDF, Test Cases XLSX, accepted T7 Engineering custody, repository/runtime inspection. |
| Allowed | Databricks-ready DDL and parameterized logger/updater SQL, local executable behavioral validation, evidence/runbook, isolated commit/PR. |
| Forbidden | Cockpit/UI integration, navigation/IA/content migration, legacy deletion, TEST access, training/scoring, model/registry or experiment-data mutation. |
| Runtime authority | No Databricks connector, SQL warehouse identity, host, token, or Azure credential is exposed in this environment. No remote SQL was executed. |
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
- Databricks Delta does not enforce the logical unique keys. v0.2 therefore requires one serialized writer job/principal for both tables. Concurrent first-writer safety is `BLOCKED_RUNTIME` and multi-writer operation is prohibited.
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

## Acceptance status

| Test | Local evidence | Databricks status |
| --- | --- | --- |
| TC-027 create/read schema | PASS in SQLite mirror + static Databricks DDL | `BLOCKED_RUNTIME` |
| TC-028 append two events | PASS locally | `BLOCKED_RUNTIME` |
| TC-029 supersede, old remains | PASS locally | `BLOCKED_RUNTIME` |
| TC-030 TEST/model/artifact flags | PASS locally; explicit and false for T8 | `BLOCKED_RUNTIME` |
| TC-031 parent linkage | PASS locally | `BLOCKED_RUNTIME` |
| TC-032 current gate projection | PASS locally with CAS | `BLOCKED_RUNTIME` |
| TC-049 no TEST/model/data mutation | PASS for repository/local execution boundary | Databricks not contacted |
| TC-050 one T8 change-set | PASS | Not deployment proof |

T8 is not `RUNTIME_VERIFIED`. Exact table creation/schema reconciliation, permissions, Delta append-only behavior, serialized/concurrent insert-only MERGE behavior, JSON coercion, and query outputs must still be observed in the named Databricks governance schema. Claims of unconditional or multi-writer idempotency are prohibited.
