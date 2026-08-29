-- EXPECTED FAILURE. Run independently as the normal serialized writer principal.
-- Capture the authorization/append-only error, then run 005c to prove no change.
UPDATE adb_nbo_nrt_mlops_dev.governance.experiment_execution_event_ledger_v0_2
SET notes='FORBIDDEN_MUTATION_PROBE'
WHERE log_id=:log_id;
