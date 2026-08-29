-- Databricks SQL named-parameter template.
-- event_digest is SHA-256 over canonical semantic content excluding logged_at.
-- Replaying the same scoped idempotency key + digest is a no-op; a collision is fatal.

SELECT assert_true(length(trim(:claim_boundary)) > 0, 'claim_boundary is required');
SELECT assert_true(:metrics_json IS NOT NULL AND from_json(:metrics_json, 'MAP<STRING,STRING>') IS NOT NULL, 'metrics_json must be an object with string values');
SELECT assert_true(:artifact_pointers_json IS NOT NULL AND from_json(:artifact_pointers_json, 'ARRAY<STRING>') IS NOT NULL, 'artifact_pointers_json must be a string array');
SELECT assert_true(:source_refs_json IS NOT NULL AND from_json(:source_refs_json, 'ARRAY<STRING>') IS NOT NULL, 'source_refs_json must be a string array');
SELECT assert_true(length(:metrics_json) <= 65536 AND length(:artifact_pointers_json) <= 65536 AND length(:source_refs_json) <= 65536, 'JSON payload exceeds 64 KiB field limit');

SELECT assert_true(
  :event_digest = sha2(to_json(named_struct(
    'event_schema_version', :event_schema_version, 'idempotency_key', :idempotency_key,
    'writer_scope', :writer_scope, 'writer_version', :writer_version,
    'experiment_id', :experiment_id, 'experiment_version', :experiment_version,
    'lane', :lane, 'step_id', :step_id, 'parent_step_id', :parent_step_id,
    'parent_log_id', :parent_log_id, 'gate_name', :gate_name, 'step_name', :step_name,
    'supersedes_log_id', :supersedes_log_id, 'question', :question, 'hypothesis', :hypothesis,
    'operation', :operation, 'observation', :observation, 'interpretation', :interpretation,
    'decision', :decision, 'next_gate', :next_gate, 'blocking_reason', :blocking_reason,
    'next_required_action', :next_required_action, 'status', :status,
    'failure_class', :failure_class, 'decision_code', :decision_code,
    'evidence_type', :evidence_type, 'metrics_json', :metrics_json,
    'artifact_pointers_json', :artifact_pointers_json, 'source_refs_json', :source_refs_json,
    'train_touched', CAST(:train_touched AS BOOLEAN), 'test_touched', CAST(:test_touched AS BOOLEAN),
    'model_training_performed', CAST(:model_training_performed AS BOOLEAN),
    'artifact_persisted', CAST(:artifact_persisted AS BOOLEAN),
    'artifact_loadback_verified', CAST(:artifact_loadback_verified AS BOOLEAN),
    'notebook_path', :notebook_path, 'cell_label', :cell_label, 'code_hash', :code_hash,
    'git_commit_sha', :git_commit_sha, 'mlflow_run_id', :mlflow_run_id,
    'generation_run_id', :generation_run_id, 'claim_boundary', :claim_boundary, 'notes', :notes
  ), map('ignoreNullFields', 'false')), 256),
  'event_digest does not match canonical semantic content'
);

SELECT assert_true(
  :writer_scope <> 'T8_INFRASTRUCTURE' OR (
    CAST(:train_touched AS BOOLEAN) = false AND CAST(:test_touched AS BOOLEAN) = false
    AND CAST(:model_training_performed AS BOOLEAN) = false
    AND CAST(:artifact_persisted AS BOOLEAN) = false
    AND CAST(:artifact_loadback_verified AS BOOLEAN) = false
  ), 'T8 infrastructure writer cannot report experiment/model/data actions'
);

SELECT assert_true(
  (SELECT COUNT(*) FROM adb_nbo_nrt_mlops_dev.governance.experiment_execution_event_ledger_v0_2
   WHERE experiment_id=:experiment_id AND experiment_version=:experiment_version
     AND idempotency_key=:idempotency_key AND event_digest<>:event_digest) = 0,
  concat('Idempotency collision: ', :idempotency_key)
);
SELECT assert_true(
  (SELECT COUNT(*) FROM adb_nbo_nrt_mlops_dev.governance.experiment_execution_event_ledger_v0_2
   WHERE log_id=:log_id AND (idempotency_key<>:idempotency_key OR event_digest<>:event_digest)) = 0,
  concat('Conflicting log_id: ', :log_id)
);

SELECT assert_true(
  :parent_step_id IS NULL OR EXISTS (
    SELECT 1 FROM adb_nbo_nrt_mlops_dev.governance.experiment_execution_event_ledger_v0_2
    WHERE experiment_id=:experiment_id AND experiment_version=:experiment_version
      AND lane=:lane AND step_id=:parent_step_id
      AND (:parent_log_id IS NULL OR log_id=:parent_log_id)
  ), 'Unknown parent linkage in event scope'
);
SELECT assert_true(:parent_log_id IS NULL OR :parent_step_id IS NOT NULL, 'parent_log_id requires parent_step_id');

SELECT assert_true(
  (:decision_code='SUPERSEDES_PRIOR_DECISION' AND :supersedes_log_id IS NOT NULL)
  OR (coalesce(:decision_code,'')<>'SUPERSEDES_PRIOR_DECISION' AND :supersedes_log_id IS NULL),
  'supersedes_log_id is required only for SUPERSEDES_PRIOR_DECISION'
);
SELECT assert_true(:supersedes_log_id IS NULL OR :supersedes_log_id<>:log_id, 'event cannot supersede itself');
SELECT assert_true(
  :supersedes_log_id IS NULL OR EXISTS (
    SELECT 1 FROM adb_nbo_nrt_mlops_dev.governance.experiment_execution_event_ledger_v0_2
    WHERE log_id=:supersedes_log_id AND experiment_id=:experiment_id
      AND experiment_version=:experiment_version AND lane=:lane AND gate_name=:gate_name
  ), 'Unknown supersedes_log_id in event/gate scope'
);
SELECT assert_true(
  :supersedes_log_id IS NULL OR NOT EXISTS (
    SELECT 1 FROM adb_nbo_nrt_mlops_dev.governance.experiment_execution_event_ledger_v0_2
    WHERE supersedes_log_id=:supersedes_log_id
  ), 'Prior event already has a direct superseder'
);

MERGE INTO adb_nbo_nrt_mlops_dev.governance.experiment_execution_event_ledger_v0_2 AS target
USING (
  SELECT :log_id AS log_id, :event_schema_version AS event_schema_version,
    :idempotency_key AS idempotency_key, :event_digest AS event_digest,
    :writer_scope AS writer_scope, :writer_version AS writer_version,
    CAST(:logged_at AS TIMESTAMP) AS logged_at, :experiment_id AS experiment_id,
    :experiment_version AS experiment_version, :lane AS lane,
    :step_id AS step_id, :parent_step_id AS parent_step_id, :gate_name AS gate_name,
    :step_name AS step_name, :supersedes_log_id AS supersedes_log_id,
    :question AS question, :hypothesis AS hypothesis, :operation AS operation,
    :observation AS observation, :interpretation AS interpretation, :decision AS decision,
    :next_gate AS next_gate, :blocking_reason AS blocking_reason,
    :next_required_action AS next_required_action, :status AS status,
    :failure_class AS failure_class, :decision_code AS decision_code,
    :evidence_type AS evidence_type, :metrics_json AS metrics_json,
    :artifact_pointers_json AS artifact_pointers_json, :source_refs_json AS source_refs_json,
    CAST(:train_touched AS BOOLEAN) AS train_touched, CAST(:test_touched AS BOOLEAN) AS test_touched,
    CAST(:model_training_performed AS BOOLEAN) AS model_training_performed,
    CAST(:artifact_persisted AS BOOLEAN) AS artifact_persisted,
    CAST(:artifact_loadback_verified AS BOOLEAN) AS artifact_loadback_verified,
    :notebook_path AS notebook_path, :parent_log_id AS parent_log_id,
    :cell_label AS cell_label, :code_hash AS code_hash,
    :git_commit_sha AS git_commit_sha, :mlflow_run_id AS mlflow_run_id,
    :generation_run_id AS generation_run_id, :claim_boundary AS claim_boundary,
    :notes AS notes
) AS source
ON target.experiment_id=source.experiment_id
  AND target.experiment_version=source.experiment_version
  AND target.idempotency_key=source.idempotency_key
WHEN NOT MATCHED THEN INSERT *;

SELECT assert_true(
  (SELECT COUNT(*) FROM adb_nbo_nrt_mlops_dev.governance.experiment_execution_event_ledger_v0_2
   WHERE experiment_id=:experiment_id AND experiment_version=:experiment_version
     AND idempotency_key=:idempotency_key AND event_digest=:event_digest) = 1,
  'Append/read-back did not resolve to one exact event'
);

SELECT * FROM adb_nbo_nrt_mlops_dev.governance.experiment_execution_event_ledger_v0_2
WHERE experiment_id=:experiment_id AND experiment_version=:experiment_version
  AND idempotency_key=:idempotency_key;
