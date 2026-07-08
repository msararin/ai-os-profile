# Big Crew Source Pack Custody Decision and Sync Plan

Date: 2026-07-07
Status: DRAFT_LOCAL_ONLY_CUSTODY_DECISION_PENDING_OWNER_ACCEPTANCE
Current state: BIG_CREW_SOURCE_PACK_OPUS_TAXONOMY_ALIGNMENT_ADDENDUM_CREATED_OUTSIDE_REPO_LOCAL_ONLY_PENDING_CUSTODY_DECISION
Claim level: DRAFT_LOCAL_ONLY

## 1. Source of Truth

The real Big Crew source spec pack is the numbered source pack in Downloads, not derived top-level summaries:

`/Users/apple/Downloads/*big_crew_architecture_gate_spec_pack_20260706_numbered (ให้แก้ปัญหา Production)/`

Latest source-pack addendum:

`06_OPUS_TAXONOMY_ALIGNMENT_AND_V0_1_ROLE_SET_LOCK_PENDING_OWNER_REVIEW.md`

Observed source-pack files:

- `00_FILE_ORDER_MANIFEST.md`
- `00_README.md`
- `01_BIG_CREW_ARCHITECTURE_GATE_CORE_SPEC_V0_1.md`
- `02_BIG_CREW_ARCHITECTURE_GATE_PHASE_PLAN_V0_1.md`
- `03_ORG_ROLE_DETAIL_PAGE_SPEC_BIG_CREW_ARCHITECTURE_GATE_V0_1.md`
- `04_R01_ARCHITECTURE_GATE_PROFILE_DRAFT_V0_1.md`
- `05_OPUS_CRITIQUE_PACKET_BIG_CREW_ARCHITECTURE_GATE_V0_1.md`
- `06_OPUS_TAXONOMY_ALIGNMENT_AND_V0_1_ROLE_SET_LOCK_PENDING_OWNER_REVIEW.md`

Observed latest addendum line count: `301`.

Derived spec path:

`/Users/apple/projects/ai-os-profile/BIG_CREW_ORG_ROLE_DETAIL_SPEC_OR_ARCHITECTURE_GATE_DETAIL_V0_1.md`

Derived spec status:

- patched local-only
- includes Shared RoleDetail Mapping
- route locked as `/org-roles/big-crew-architecture-gate`
- visible title locked as `Big Crew Architecture Gate`
- implementation blocked

## 2. Custody Decision

Recommended custody decision:

Copy the full numbered Big Crew source pack into the repo-local controlled project context path first:

`/Users/apple/projects/ai-os-profile/.codex/project-context/big-crew/source-pack-20260706-numbered/`

This should become the working source-of-truth location for downstream Big Crew role-spec work once the copy is made and version-controlled or otherwise explicitly accepted by the owner.

Do not use the Downloads folder as long-term canonical custody. Downloads remains the staging/origin location only until custody is accepted.

## 3. Rejected Custody Option for This Step

Rejected as first move:

Robert KB canonical evidence/spec path.

Reason:

- The immediate downstream work is repo-local org-role specification and implementation readiness in `projects/ai-os-profile`.
- Repo-local `.codex/project-context/big-crew/` keeps the source pack adjacent to the derived spec, route decisions, and future page/spec work.
- The pack is still pending owner review. Promoting directly into Robert KB canonical evidence/spec custody would overstate maturity unless the owner explicitly decides that KB is the canonical home now.
- KB sync can be a later controlled mirror after repo-local custody is accepted and the v0.1 taxonomy decision is resolved.

## 4. Sync Plan

Allowed next sync action after owner accepts this custody decision:

1. Create the custody folder:

   `projects/ai-os-profile/.codex/project-context/big-crew/source-pack-20260706-numbered/`

2. Copy the full source pack contents from Downloads into that folder without editing source content.

3. Add a short custody README in:

   `projects/ai-os-profile/.codex/project-context/big-crew/README.md`

   Required README fields:

   - original Downloads path
   - custody path
   - copied-at timestamp
   - source-pack file list
   - latest addendum
   - downstream usage rule
   - non-claims

4. Run a file-count and checksum or byte-size comparison between Downloads and repo-local custody.

5. Record the sync in a route ledger / telemetry receipt or in the next bounded artifact if the owner continues to restrict artifact count.

6. Only after repo-local custody is complete, continue role specs one role at a time.

Suggested copy command for the later sync step, not executed in this artifact:

```bash
mkdir -p /Users/apple/projects/ai-os-profile/.codex/project-context/big-crew/source-pack-20260706-numbered
cp -p "/Users/apple/Downloads/*big_crew_architecture_gate_spec_pack_20260706_numbered (ให้แก้ปัญหา Production)"/*.md /Users/apple/projects/ai-os-profile/.codex/project-context/big-crew/source-pack-20260706-numbered/
```

## 5. Downstream Usage Rules

After custody is accepted and synced:

- Treat the repo-local custody path as the controlled working source pack for Big Crew Architecture Gate and v0.1 role-set work.
- Preserve the numbered source-pack files as source artifacts; do not silently rewrite them during implementation.
- Keep derived specs explicitly downstream from the source pack.
- Continue role specs one role at a time.
- Keep Architecture Gate as the first role and anchor role.
- Keep route locked as `/org-roles/big-crew-architecture-gate`.
- Keep visible title locked as `Big Crew Architecture Gate`.
- Keep Runner / Super Runner closed.
- Keep telemetry side-thread closed unless reopened by explicit owner instruction.

## 6. Role-Set Boundary Carried Forward

Opus-informed Big Crew v0.1 recommendation, pending owner review:

1. Big Crew Architecture Gate
2. PM Brain
3. Application Engineer
4. Infra / Platform Engineer
5. QA Sentinel

Merge / defer boundary:

- Merge `System Architect` into `Big Crew Architecture Gate` for v0.1.
- Merge `Frontend Engineer` and `Backend Engineer` into `Application Engineer` for v0.1.
- Keep `Infra / Platform Engineer` separate.
- Defer `Automation / Integration Engineer` to v0.2+.
- Defer `Workflow Builder` to v0.2+ or merge into Automation later.
- Defer `Release Captain` to v0.2+.
- Do not create separate Frontend / Backend / System Architect specs yet.

This section records the current source-pack addendum boundary. It is not final taxonomy approval.

## 7. Blocked Actions

Blocked until source-pack custody is accepted and synced:

- source page implementation
- app/org-roles edits
- new Big Crew role spec creation
- all-role creation
- deployment
- live verification
- taxonomy final approval
- PASS / DONE / VERIFIED claim
- Runner / Super Runner reopening
- telemetry side-thread continuation
- treating Downloads as long-term canonical

## 8. Next Allowed Action

Next allowed action:

Owner accepts, rejects, or amends this custody decision.

If accepted, the next bounded execution task is:

Copy the full source pack into:

`projects/ai-os-profile/.codex/project-context/big-crew/source-pack-20260706-numbered/`

Then record the sync evidence and continue with Big Crew role specs one role at a time.

## 9. Route Ledger

```yaml
task_id: big_crew_source_pack_custody_decision_and_sync_plan_20260707
phase: custody_resolution
role: Codex local executor/operator
task_type: read_only_custody_decision_plan
worker_or_agent: Codex
route_type: local_repo_file_artifact
selected_route: Codex local draft, no external model call
model_provider: OpenAI / Codex runtime, token and cost not exposed
model_requested: not_exposed
model_returned: not_exposed
provider_returned: not_exposed
provider_path: not_exposed
token_input: not_exposed
token_output: not_exposed
token_total: not_exposed
token_source: not_exposed_by_codex_runtime
cost_total: not_exposed
cost_source: not_exposed_by_codex_runtime
usage_capture_status: unavailable_for_codex_runtime
benchmark_validity: draft_local_only
time_spent_minutes: not_recorded
time_spent_source: not_recorded
started_at: 2026-07-08 Asia/Bangkok
ended_at: 2026-07-08 Asia/Bangkok
context_boundary: source-pack custody planning only; no implementation
artifact_input_path: /Users/apple/Downloads/*big_crew_architecture_gate_spec_pack_20260706_numbered (ให้แก้ปัญหา Production)/
artifact_output_path: /Users/apple/projects/ai-os-profile/BIG_CREW_SOURCE_PACK_CUSTODY_DECISION_AND_SYNC_PLAN_20260707.md
validation_result: local file/read inspection only
human_review_result: pending_owner_acceptance
quality_note: source pack remains outside repo until owner accepts sync
next_routing_recommendation: owner custody decision, then bounded copy/sync task
not_available_reason: Codex runtime does not expose token/cost telemetry
enforcement_version_requested: v0.2
enforcement_version_loaded: v0.2
enforcement_path: /Users/apple/robert-knowledge-base/02_execution_control/aios_enforcement/AIOS_ENFORCEMENT_V0_2.md
enforcement_status: AVAILABLE
resolver_status: AVAILABLE
fallback_used: false
fallback_reason: not_applicable
claim_level_impact: DRAFT_LOCAL_ONLY until custody is accepted and synced
```

## 10. Telemetry Receipt

```yaml
enforcement_version_requested: v0.2
enforcement_version_loaded: v0.2
enforcement_path: /Users/apple/robert-knowledge-base/02_execution_control/aios_enforcement/AIOS_ENFORCEMENT_V0_2.md
enforcement_status: AVAILABLE
resolver_status: AVAILABLE
loaded_at: 2026-07-08 Asia/Bangkok
fallback_reason: not_applicable
claim_level: DRAFT_LOCAL_ONLY
provider: none_for_external_model_calls
requested_model: not_applicable
returned_model: not_applicable
prompt_tokens: not_applicable
completion_tokens: not_applicable
total_tokens: not_applicable
cost: USD 0 external provider spend
key_source: not_applicable
openrouter_key_rule: CODEX_OPENROUTER_API_KEY is canonical for Codex/OpenRouter work; no OpenRouter call was made for this artifact
```

## 11. Non-Claims

- This artifact does not implement source pages.
- This artifact does not deploy.
- This artifact does not live verify.
- This artifact does not create new Big Crew role specs.
- This artifact does not create all roles at once.
- This artifact does not finalize taxonomy as PASS, DONE, or VERIFIED.
- This artifact does not reopen Runner / Super Runner.
- This artifact does not continue telemetry work.
- This artifact does not make Downloads long-term canonical.
- This artifact does not claim provider-backed review.
- This artifact does not claim AIOS closeout completeness beyond local draft custody planning.
