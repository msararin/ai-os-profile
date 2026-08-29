-- Run after EACH independent expected-failure probe (005a and 005b).
-- Bind values captured before the probe; this assertion must return one row.
SELECT
  assert_true(COUNT(*) = CAST(:expected_row_count AS BIGINT), 'ledger row count changed') AS row_count_unchanged,
  assert_true(MAX(event_digest) = :expected_event_digest, 'ledger event digest changed') AS digest_unchanged,
  assert_true(MAX(notes) IS NOT DISTINCT FROM :expected_notes, 'ledger notes changed') AS notes_unchanged
FROM adb_nbo_nrt_mlops_dev.governance.experiment_execution_event_ledger_v0_2
WHERE log_id=:log_id;

SELECT log_id, event_digest, logged_at, decision_code, notes
FROM adb_nbo_nrt_mlops_dev.governance.experiment_execution_event_ledger_v0_2
WHERE log_id=:log_id;
