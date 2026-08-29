-- T8 only: durable Event Ledger and current gate projection.
-- No Cockpit UI wiring, experiment execution, TEST access, training, scoring, or model/data mutation.

CREATE SCHEMA IF NOT EXISTS adb_nbo_nrt_mlops_dev.governance;

CREATE TABLE IF NOT EXISTS adb_nbo_nrt_mlops_dev.governance.experiment_execution_event_ledger_v0_2 (
  log_id STRING NOT NULL,
  event_schema_version STRING NOT NULL,
  idempotency_key STRING NOT NULL,
  event_digest STRING NOT NULL,
  writer_scope STRING NOT NULL,
  writer_version STRING NOT NULL,
  logged_at TIMESTAMP NOT NULL,
  experiment_id STRING NOT NULL,
  experiment_version STRING NOT NULL,
  lane STRING NOT NULL,
  step_id STRING NOT NULL,
  parent_step_id STRING,
  gate_name STRING NOT NULL,
  step_name STRING NOT NULL,
  supersedes_log_id STRING,
  question STRING,
  hypothesis STRING,
  operation STRING NOT NULL,
  observation STRING NOT NULL,
  interpretation STRING NOT NULL,
  decision STRING NOT NULL,
  next_gate STRING,
  blocking_reason STRING,
  next_required_action STRING,
  status STRING NOT NULL,
  failure_class STRING,
  decision_code STRING,
  evidence_type STRING NOT NULL,
  metrics_json STRING,
  artifact_pointers_json STRING,
  source_refs_json STRING,
  train_touched BOOLEAN NOT NULL,
  test_touched BOOLEAN NOT NULL,
  model_training_performed BOOLEAN NOT NULL,
  artifact_persisted BOOLEAN NOT NULL,
  artifact_loadback_verified BOOLEAN NOT NULL,
  notebook_path STRING,
  parent_log_id STRING,
  cell_label STRING,
  code_hash STRING,
  git_commit_sha STRING,
  mlflow_run_id STRING,
  generation_run_id STRING,
  claim_boundary STRING NOT NULL,
  notes STRING
)
USING DELTA
TBLPROPERTIES (
  'delta.appendOnly' = 'true',
  'comment' = 'Append-only NBO-NRT experiment execution history. Corrections are new events linked by supersedes_log_id.'
);

CREATE TABLE IF NOT EXISTS adb_nbo_nrt_mlops_dev.governance.experiment_gate_status_v0_2 (
  experiment_id STRING NOT NULL,
  experiment_version STRING NOT NULL,
  lane STRING NOT NULL,
  gate_name STRING NOT NULL,
  current_status STRING NOT NULL,
  blocking_reason STRING,
  next_required_action STRING,
  latest_log_id STRING NOT NULL,
  latest_logged_at TIMESTAMP NOT NULL,
  projection_version BIGINT NOT NULL,
  event_digest STRING NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  claim_boundary STRING NOT NULL
)
USING DELTA
TBLPROPERTIES (
  'comment' = 'Mutable current-gate projection. Durable history remains in experiment_execution_event_ledger_v0_2.'
);
