-- Fail closed if IF NOT EXISTS encountered an incompatible pre-existing table.
-- Compare every column name, ordinal, type, and nullability in both directions.

WITH expected(column_name, ordinal_position, data_type, is_nullable) AS (
  SELECT * FROM VALUES
    ('log_id', 1, 'STRING', 'NO'),
    ('event_schema_version', 2, 'STRING', 'NO'),
    ('idempotency_key', 3, 'STRING', 'NO'),
    ('event_digest', 4, 'STRING', 'NO'),
    ('writer_scope', 5, 'STRING', 'NO'),
    ('writer_version', 6, 'STRING', 'NO'),
    ('logged_at', 7, 'TIMESTAMP', 'NO'),
    ('experiment_id', 8, 'STRING', 'NO'),
    ('experiment_version', 9, 'STRING', 'NO'),
    ('lane', 10, 'STRING', 'NO'),
    ('step_id', 11, 'STRING', 'NO'),
    ('parent_step_id', 12, 'STRING', 'YES'),
    ('gate_name', 13, 'STRING', 'NO'),
    ('step_name', 14, 'STRING', 'NO'),
    ('supersedes_log_id', 15, 'STRING', 'YES'),
    ('question', 16, 'STRING', 'YES'),
    ('hypothesis', 17, 'STRING', 'YES'),
    ('operation', 18, 'STRING', 'NO'),
    ('observation', 19, 'STRING', 'NO'),
    ('interpretation', 20, 'STRING', 'NO'),
    ('decision', 21, 'STRING', 'NO'),
    ('next_gate', 22, 'STRING', 'YES'),
    ('blocking_reason', 23, 'STRING', 'YES'),
    ('next_required_action', 24, 'STRING', 'YES'),
    ('status', 25, 'STRING', 'NO'),
    ('failure_class', 26, 'STRING', 'YES'),
    ('decision_code', 27, 'STRING', 'YES'),
    ('evidence_type', 28, 'STRING', 'NO'),
    ('metrics_json', 29, 'STRING', 'YES'),
    ('artifact_pointers_json', 30, 'STRING', 'YES'),
    ('source_refs_json', 31, 'STRING', 'YES'),
    ('train_touched', 32, 'BOOLEAN', 'NO'),
    ('test_touched', 33, 'BOOLEAN', 'NO'),
    ('model_training_performed', 34, 'BOOLEAN', 'NO'),
    ('artifact_persisted', 35, 'BOOLEAN', 'NO'),
    ('artifact_loadback_verified', 36, 'BOOLEAN', 'NO'),
    ('notebook_path', 37, 'STRING', 'YES'),
    ('parent_log_id', 38, 'STRING', 'YES'),
    ('cell_label', 39, 'STRING', 'YES'),
    ('code_hash', 40, 'STRING', 'YES'),
    ('git_commit_sha', 41, 'STRING', 'YES'),
    ('mlflow_run_id', 42, 'STRING', 'YES'),
    ('generation_run_id', 43, 'STRING', 'YES'),
    ('claim_boundary', 44, 'STRING', 'NO'),
    ('notes', 45, 'STRING', 'YES')
), actual AS (
  SELECT
    column_name,
    ordinal_position - MIN(ordinal_position) OVER () + 1 AS ordinal_position,
    CASE UPPER(data_type)
      WHEN 'LONG' THEN 'BIGINT'
      ELSE UPPER(data_type)
    END AS data_type,
    UPPER(is_nullable) AS is_nullable
  FROM adb_nbo_nrt_mlops_dev.information_schema.columns
  WHERE table_schema='governance' AND table_name='experiment_execution_event_ledger_v0_2'
)
SELECT assert_true(
  (SELECT COUNT(*) FROM (SELECT * FROM expected EXCEPT SELECT * FROM actual))=0
  AND (SELECT COUNT(*) FROM (SELECT * FROM actual EXCEPT SELECT * FROM expected))=0,
  'experiment_execution_event_ledger_v0_2 schema differs from the exact v0.2 contract'
);

WITH expected(column_name, ordinal_position, data_type, is_nullable) AS (
  SELECT * FROM VALUES
    ('experiment_id', 1, 'STRING', 'NO'),
    ('experiment_version', 2, 'STRING', 'NO'),
    ('lane', 3, 'STRING', 'NO'),
    ('gate_name', 4, 'STRING', 'NO'),
    ('current_status', 5, 'STRING', 'NO'),
    ('blocking_reason', 6, 'STRING', 'YES'),
    ('next_required_action', 7, 'STRING', 'YES'),
    ('latest_log_id', 8, 'STRING', 'NO'),
    ('latest_logged_at', 9, 'TIMESTAMP', 'NO'),
    ('projection_version', 10, 'BIGINT', 'NO'),
    ('event_digest', 11, 'STRING', 'NO'),
    ('updated_at', 12, 'TIMESTAMP', 'NO'),
    ('claim_boundary', 13, 'STRING', 'NO')
), actual AS (
  SELECT
    column_name,
    ordinal_position - MIN(ordinal_position) OVER () + 1 AS ordinal_position,
    CASE UPPER(data_type)
      WHEN 'LONG' THEN 'BIGINT'
      ELSE UPPER(data_type)
    END AS data_type,
    UPPER(is_nullable) AS is_nullable
  FROM adb_nbo_nrt_mlops_dev.information_schema.columns
  WHERE table_schema='governance' AND table_name='experiment_gate_status_v0_2'
)
SELECT assert_true(
  (SELECT COUNT(*) FROM (SELECT * FROM expected EXCEPT SELECT * FROM actual))=0
  AND (SELECT COUNT(*) FROM (SELECT * FROM actual EXCEPT SELECT * FROM expected))=0,
  'experiment_gate_status_v0_2 schema differs from the exact v0.2 contract'
);

-- Capture these outputs. The operator must verify delta.appendOnly=true before any write.
DESCRIBE DETAIL adb_nbo_nrt_mlops_dev.governance.experiment_execution_event_ledger_v0_2;
SHOW TBLPROPERTIES adb_nbo_nrt_mlops_dev.governance.experiment_execution_event_ledger_v0_2 ('delta.appendOnly');
DESCRIBE DETAIL adb_nbo_nrt_mlops_dev.governance.experiment_gate_status_v0_2;
