-- Compare-and-set gate projection. All projected facts are derived from :latest_log_id.
-- :expected_latest_log_id is NULL for first insert; otherwise it must match the current pointer.

SELECT assert_true(
  (SELECT COUNT(*) FROM adb_nbo_nrt_mlops_dev.governance.experiment_execution_event_ledger_v0_2 WHERE log_id=:latest_log_id) = 1,
  concat('Expected exactly one ledger event: ', :latest_log_id)
);
SELECT assert_true(
  (SELECT COUNT(*) FROM adb_nbo_nrt_mlops_dev.governance.experiment_gate_status_v0_2
   WHERE experiment_id=:experiment_id AND experiment_version=:experiment_version
     AND lane=:lane AND gate_name=:gate_name AND latest_log_id<=>:expected_latest_log_id)
  + (CASE WHEN :expected_latest_log_id IS NULL AND NOT EXISTS (
      SELECT 1 FROM adb_nbo_nrt_mlops_dev.governance.experiment_gate_status_v0_2
      WHERE experiment_id=:experiment_id AND experiment_version=:experiment_version
        AND lane=:lane AND gate_name=:gate_name
    ) THEN 1 ELSE 0 END) = 1,
  'Stale gate projection writer or invalid first-insert expectation'
);
SELECT assert_true(
  (:expected_latest_log_id IS NULL AND CAST(:next_projection_version AS BIGINT)=1)
  OR EXISTS (
    SELECT 1 FROM adb_nbo_nrt_mlops_dev.governance.experiment_gate_status_v0_2
    WHERE experiment_id=:experiment_id AND experiment_version=:experiment_version
      AND lane=:lane AND gate_name=:gate_name AND latest_log_id=:expected_latest_log_id
      AND CAST(:next_projection_version AS BIGINT)=projection_version+1
  ), 'projection_version must start at 1 and increment by exactly one'
);

MERGE INTO adb_nbo_nrt_mlops_dev.governance.experiment_gate_status_v0_2 AS target
USING (
  SELECT experiment_id,experiment_version,lane,gate_name,status AS current_status,
    blocking_reason,next_required_action,log_id AS latest_log_id,logged_at AS latest_logged_at,
    CAST(:next_projection_version AS BIGINT) AS projection_version,event_digest,current_timestamp() AS updated_at,
    claim_boundary
  FROM adb_nbo_nrt_mlops_dev.governance.experiment_execution_event_ledger_v0_2
  WHERE log_id=:latest_log_id AND experiment_id=:experiment_id
    AND experiment_version=:experiment_version AND lane=:lane AND gate_name=:gate_name
) AS source
ON target.experiment_id=source.experiment_id AND target.experiment_version=source.experiment_version
  AND target.lane=source.lane AND target.gate_name=source.gate_name
WHEN MATCHED AND target.latest_log_id<=>:expected_latest_log_id THEN UPDATE SET
  current_status=source.current_status, blocking_reason=source.blocking_reason,
  next_required_action=source.next_required_action, latest_log_id=source.latest_log_id,
  latest_logged_at=source.latest_logged_at, projection_version=source.projection_version,
  event_digest=source.event_digest, updated_at=source.updated_at,
  claim_boundary=source.claim_boundary
WHEN NOT MATCHED AND :expected_latest_log_id IS NULL THEN INSERT *;

SELECT assert_true(
  (SELECT COUNT(*) FROM adb_nbo_nrt_mlops_dev.governance.experiment_gate_status_v0_2
   WHERE experiment_id=:experiment_id AND experiment_version=:experiment_version
     AND lane=:lane AND gate_name=:gate_name AND latest_log_id=:latest_log_id
     AND projection_version=:next_projection_version) = 1,
  'Gate projection read-back mismatch'
);

SELECT current_status,blocking_reason,next_required_action,latest_log_id,latest_logged_at,
  projection_version,event_digest,claim_boundary
FROM adb_nbo_nrt_mlops_dev.governance.experiment_gate_status_v0_2
WHERE experiment_id=:experiment_id AND experiment_version=:experiment_version
  AND lane=:lane AND gate_name=:gate_name;
