# NBO-NRT Event Ledger v0.2

T8 creates an isolated Databricks contract for durable execution history and a current-gate projection. It does not wire the Cockpit UI.

## Execution order

1. Confirm the active principal and `USE CATALOG`, `USE SCHEMA`, `CREATE TABLE`, `SELECT`, and controlled write privileges in `adb_nbo_nrt_mlops_dev.governance`.
2. Run `001_create_event_ledger.sql`.
3. Run `004_verify_runtime_contract.sql`. It compares every column name, ordinal, type, and nullability and emits the exact `delta.appendOnly` property for capture. Stop if the property is not `true`.
4. Bind parameters and run `002_append_event.sql`; never interpolate JSON or narrative text into SQL.
5. After exact read-back, bind the ledger `log_id` and run `003_update_gate_projection.sql` with the expected current pointer.
6. Capture the sample `log_id`, `event_digest`, `notes`, and row count. Run `005a_expected_failure_update.sql` independently as the normal writer and capture the expected error; then run `005c_verify_immutability.sql` with the captured values.
7. Run `005b_expected_failure_delete.sql` independently and capture its expected error; run `005c_verify_immutability.sql` again. Both post-checks must prove the row count, digest, and notes unchanged.

## Writer contract

- **Concurrency boundary:** v0.2 requires one serialized writer job/principal per table. Delta does not enforce the logical unique keys, so parallel first-writers are prohibited until a runtime-tested serialization service or enforced key mechanism exists. Local SQLite uniqueness is reference behavior, not Delta proof.
- Canonicalize `metrics_json` as an object and artifact/source references as arrays of strings.
- Compute `event_digest` as SHA-256 over canonical semantic fields, excluding `logged_at`.
- Scope `idempotency_key` to experiment/version. Same key + same digest is a replay; same key + different digest is an error.
- Corrections append a new event with `decision_code=SUPERSEDES_PRIOR_DECISION`; the prior row is never changed.
- `parent_step_id` is workflow dependency; `parent_log_id` disambiguates a specific parent event; `supersedes_log_id` is decision-history linkage.
- All five execution flags are explicit. Under `writer_scope=T8_INFRASTRUCTURE`, all must be false.
- Gate projection facts come from the referenced ledger row and use compare-and-set through `expected_latest_log_id`.
- Projection version starts at 1 and increments exactly by one. Projection writes use the same serialized writer boundary.

## Runtime acceptance sequence

The following evidence is required before claiming Databricks runtime PASS:

1. Create/read both tables and capture `DESCRIBE DETAIL`.
2. Append parent and child events; query two separate rows.
3. Replay the same idempotency key/digest; row count must not increase.
4. Reuse the key with a different digest; operation must fail.
5. Append a superseding event; prove the old event count/digest is unchanged and the new pointer resolves.
6. Query all explicit boundary flags; T8 samples must be false.
7. Insert and compare-and-set update the gate projection; stale expected pointers must fail.
8. Under the normal writer principal, prove history cannot be updated, deleted, truncated, overwritten, or replaced.
9. Run two concurrent same-key attempts and two concurrent first-projection attempts. Until the named runtime proves serialization/uniqueness, do not enable multiple writers.

## Rollback

No runtime table was created by this repository change. If a later Databricks execution fails, revoke the writer, stop projection updates, and rename the two new tables into a timestamped quarantine namespace. Do not drop history automatically. Reverting T8 code must not revert T5-T7 Cockpit content.
