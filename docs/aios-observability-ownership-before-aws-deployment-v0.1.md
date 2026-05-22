# AIOS Observability Ownership Before AWS Deployment v0.1

Status: Draft for Lyn review
Scope: Design and decision packet only
Target gate: Resolve AIOS Observability ownership and SQLite runtime contract before AWS application deployment

## 1. Current Problem

AIOS Observability logically belongs to the AIOS governance layer because it explains system health, delegation, worker status, trace validity, cost attribution, and operational reliability across the AIOS. It is not only an internal implementation detail of one worker.

The current implementation spans two repositories:

- `optimize-worker` owns the Python observability implementation, schema, trace capture, SQLite writes, tests, fallback dashboard, seed examples, and current runtime database.
- `ai-os-profile` owns the cockpit API route, cockpit UI, Dockerfile, and deployment-facing `DATABASE_PATH` convention.

AWS deployment would lock in unclear runtime ownership if the current state ships unchanged. The highest-risk ambiguity is SQLite path ownership. There are currently three different path conventions in play:

- Dockerfile sets `DATABASE_PATH=/data/observability.db`.
- `app/api/observability/route.ts` reads from `OPTIMIZE_WORKER_PATH + '/observability/aios_observability.sqlite'`.
- Local development defaults to `/Users/apple/projects/optimize-worker/observability/aios_observability.sqlite`.

AWS needs one deployed source of truth before application deployment.

## 2. Current Evidence

### optimize-worker current state

Repository: `/Users/apple/projects/optimize-worker`

```text
observability/
  __init__.py                     218 bytes
  schema.py                     4,350 bytes  SQLite schema definition
  store.py                      6,673 bytes  ObservabilityStore class and trace writes
  trace_capture.py              5,995 bytes  TraceCapture context manager
  dashboard.py                 10,151 bytes  Streamlit fallback dashboard
  seed_examples.py             13,063 bytes  Test data generator
  aios_observability.sqlite    61,440 bytes  Runtime DB; should not be in git

tests/
  test_observability.py
  test_observability_queries.py
```

Default SQLite path: `observability/aios_observability.sqlite`.

### ai-os-profile current state

Repository: `/Users/apple/projects/ai-os-profile`

```text
app/api/observability/route.ts
  212 lines
  Reads SQLite via better-sqlite3.
  Current DB path is:
    process.env.OPTIMIZE_WORKER_PATH || "/Users/apple/projects/optimize-worker"
    + "/observability/aios_observability.sqlite"

app/architecture/system-health/observability/page.tsx
  Cockpit UI for AIOS Observability.

Dockerfile
  ENV DATABASE_PATH=/data/observability.db
  RUN mkdir -p /data
  Includes better-sqlite3 runtime support through Node.js dependencies.
```

### SQLite path discrepancy

| Context | Path |
| --- | --- |
| Dockerfile deployment contract | `/data/observability.db` |
| Current API route | `$OPTIMIZE_WORKER_PATH/observability/aios_observability.sqlite` |
| Current local default | `/Users/apple/projects/optimize-worker/observability/aios_observability.sqlite` |

These are different paths. AWS deployment should not proceed until one runtime DB path is chosen and both reader and writer use the same contract.

### Current working state

- 14/14 pytest tests reported passing for core observability.
- 4 real traces and 10 synthetic traces validated.
- Cockpit displays 7 governance metrics.
- Streamlit dashboard works as fallback.
- SQLite database size is approximately 61 KB, which is small enough for the Phase 1 SQLite model.

## 3. Decision Options

### Option A: Move only observability into ai-os-profile

Move:

- `optimize-worker/observability/` to `ai-os-profile/aios/observability/`
- `optimize-worker/tests/test_observability.py` and `test_observability_queries.py` to `ai-os-profile/tests/`

Update:

- Python import paths in `optimize-worker` so workers import AIOS-owned observability.
- Runtime SQLite path to `/data/observability.db`, matching the existing Dockerfile.

Pros:

- Aligns governance-owned observability with the AIOS cockpit repo.
- Makes the deployment repo own the schema, runtime contract, API, and UI.
- Reduces cross-repo confusion for AWS deployment.
- Improves portfolio story: AIOS governance owns AIOS health.

Cons:

- Forces `optimize-worker` to depend on `ai-os-profile`, which may be architecturally awkward because a worker implementation would import from a profile/cockpit app.
- Higher immediate regression risk because trace writing code and tests move.
- Blurs application UI code and reusable Python package code unless `ai-os-profile` grows a clean Python package boundary.
- Requires careful packaging decisions inside a primarily Next.js repository.

Effort estimate: 6-10 hours.
Regression risk: Medium to high.
AWS impact: Positive if completed cleanly, but too much movement before first deployment.
Portfolio impact: Strong ownership narrative, but the repo boundary may look forced.

### Option B: Extract observability into separate aios-observability package

Create:

- New repo: `aios-observability/`
- Python package: `aios_observability/`
- `pyproject.toml`
- Tests for schema, store, trace capture, and query helpers.

Update:

- `optimize-worker` installs and writes through `aios-observability`.
- `ai-os-profile` either reads SQLite directly using the agreed DB path or imports query helpers where Python execution is available.
- Package defines the default deployed SQLite path as `/data/observability.db`, overridable by `DATABASE_PATH`.

Pros:

- Cleanest long-term ownership model.
- Avoids worker-to-cockpit dependency inversion.
- Makes observability a reusable AIOS subsystem.
- Supports future workers and future governance surfaces without duplicating trace contracts.
- Strong portfolio story: dedicated AIOS observability package with tests and contract.

Cons:

- Creates another repo and release boundary before first AWS deployment.
- Requires package versioning, dependency management, and installation updates in both repos.
- More process overhead than the immediate deployment gate needs.
- Could delay first customer validation.

Effort estimate: 1-2 days for minimal package extraction; longer if release automation is required.
Regression risk: Medium.
AWS impact: Strong long term, but likely too heavy for the pre-deployment gate.
Portfolio impact: Strongest architecture story if there is time to do it properly.

### Option C: Keep optimize-worker separate but reposition as AIOS subsystem

Rename and reposition:

- `optimize-worker` to `aios-worker-implementation`
- Namespace observability as `aios.observability` instead of `optimize_worker.observability`
- Treat the worker repo as an AIOS subsystem implementation rather than a standalone optimization utility.

Remaining contract:

- SQLite path still needs a clear AWS agreement.
- The API route still needs to read the same DB the worker writes.

Pros:

- Preserves current working code and tests while improving the conceptual model.
- Lower code movement than Options A or B.
- Makes the worker repo feel less like the owner of governance and more like a subsystem provider.
- Can be staged gradually after deployment.

Cons:

- Rename and namespace work is still disruptive.
- Does not by itself solve the deployed runtime DB path.
- Might create portfolio noise if done before the product is externally validated.
- AWS would still need explicit volume, backup, and env var rules.

Effort estimate: 4-8 hours for naming/import changes; more if repository rename and references are broad.
Regression risk: Medium.
AWS impact: Neutral unless paired with the SQLite runtime contract fix.
Portfolio impact: Moderate improvement, but less clean than a separate package.

### Option D: Keep current structure, define strict runtime DB/export contract

Do not move code before AWS deployment.

Fix the contract:

- API route reads from `DATABASE_PATH`.
- Dockerfile keeps `ENV DATABASE_PATH=/data/observability.db`.
- `optimize-worker` writes to the same `DATABASE_PATH`.
- Runtime DB is mounted at `/data/observability.db` in AWS.
- Both repos treat `DATABASE_PATH` as the single source of truth.

Pros:

- Minimum safe change before AWS.
- Solves the actual deployment blocker: one DB path for reader and writer.
- Preserves 14/14 passing observability tests and current trace capture behavior.
- Keeps first deployment focused on customer validation rather than architecture churn.
- Still leaves room to extract `aios-observability` later.

Cons:

- Ownership remains conceptually split after deployment.
- Requires discipline in documentation and runbooks.
- Shared SQLite access needs careful process/container design.
- Does not create a clean package boundary yet.

Effort estimate: 2-4 hours for route/env contract updates and validation; 4-6 hours including backup/runbook checks.
Regression risk: Low.
AWS impact: Strong immediate impact because it resolves the path ambiguity.
Portfolio impact: Good enough for Phase 1 if documented as an intentional pre-validation contract.

## 4. Recommended Decision

Recommended pre-AWS decision: Option D.

Minimum safe change before AWS deployment:

- Keep the current repository structure.
- Make `DATABASE_PATH` the single runtime contract.
- Use `/data/observability.db` as the AWS deployed source of truth.
- Update the API route to read from `DATABASE_PATH`, with an explicit local-development fallback only if needed.
- Update or configure `optimize-worker` so trace writes use the same `DATABASE_PATH`.
- Confirm `.gitignore` excludes SQLite runtime files and local `/data/` directories.
- Add backup/restore steps to the AWS runbook.

What can wait until after first customer validation:

- Moving observability code into `ai-os-profile`.
- Extracting a dedicated `aios-observability` package.
- Renaming `optimize-worker`.
- Namespace cleanup from `optimize_worker` to `aios`.
- Postgres/RDS migration.
- Multi-tenant observability model.

Rationale:

The current blocker is not the physical location of every source file. The blocker is the deployed runtime contract. Option D resolves the AWS gate with the least movement, lowest regression risk, and fastest path to a working customer-facing deployment. The ownership question should be recorded now, but the larger code ownership cleanup should wait until real usage validates the shape of the observability subsystem.

Timeline estimate:

- Decision approval: same day.
- Runtime contract implementation and validation: 2-6 hours.
- AWS runbook and backup documentation update: 1-2 hours.
- Larger package extraction, if later selected: 1-2 days.

## 5. SQLite Runtime Contract for AWS

Recommended AWS runtime DB path: `/data/observability.db`.

Is `/data/observability.db` the deployed source of truth? Yes.

Should API route read from `DATABASE_PATH` env var? Yes.

Required API route change:

- Replace the current `OPTIMIZE_WORKER_PATH`-based `DB_PATH` with `process.env.DATABASE_PATH`.
- Fail clearly if `DATABASE_PATH` is missing in production.
- Optional local fallback can remain for development only, but deployment should be explicit.

Should optimize-worker write to `DATABASE_PATH`? Yes.

Recommended write contract:

- `optimize-worker` resolves SQLite path from `DATABASE_PATH`.
- In local development, `DATABASE_PATH` can point to `/Users/apple/projects/optimize-worker/observability/aios_observability.sqlite` until local migration is done.
- In AWS, `DATABASE_PATH=/data/observability.db`.

How does optimize-worker connect to deployed DB?

Phase 1 recommendation: same deployed host/container boundary or shared persistent volume, with both reader and writer using `DATABASE_PATH=/data/observability.db`.

If `optimize-worker` runs as a separate process in the same container, both processes read/write the same mounted SQLite file. If it runs as a separate container, it must mount the same persistent volume at `/data` or write through an HTTP ingestion API instead. For Phase 1, avoid introducing a separate ingestion API unless process separation forces it.

What backs up to S3?

- Source path: `/data/observability.db`
- Recommended S3 target: `s3://<aios-backup-bucket>/observability/observability-YYYYMMDD-HHMMSS.db`
- Frequency: daily at minimum for Phase 1; before and after manual deployment changes; optionally hourly once real customer traces become important.

What excludes from git?

- `optimize-worker/observability/*.sqlite`
- `optimize-worker/observability/*.sqlite-*`
- `ai-os-profile/data/`
- `ai-os-profile/**/*.sqlite`
- `ai-os-profile/**/*.sqlite-*`
- Any local backup directory containing SQLite dumps or database copies.

## 6. Regression Test Strategy

### Pre-refactor test snapshot

Run before any implementation change:

```bash
cd /Users/apple/projects/optimize-worker
pytest tests/test_observability.py
pytest tests/test_observability_queries.py
python observability/seed_examples.py
```

Required checks:

- `tests/test_observability.py` passes with 14/14 tests.
- Query smoke tests pass.
- Seed examples generate test traces.
- 4 real and 10 synthetic traces exist.
- Cockpit page loads at `http://localhost:3000/architecture/system-health/observability`.
- Cockpit displays all 7 governance metrics.

### During-refactor validation gates

- After each import change: run pytest.
- After code move: verify imports from both repos.
- After SQLite path change: verify writes and reads hit the same file.
- After env var change: test with `DATABASE_PATH=/data/observability.db` and a local temp DB path.
- Use checkpoint git commits only after review-approved implementation changes.

### Post-refactor validation

- All pytest tests pass with the same 14/14 baseline.
- Trace capture still writes valid rows.
- Cockpit metrics still display from the configured DB.
- Streamlit fallback still works or is explicitly deprecated.
- Backup and restore are tested against `/data/observability.db`.
- `.gitignore` excludes runtime DB files.
- `git status --short` shows no runtime DB files staged or committed.

## 7. Go/No-Go Gate Before AWS Deployment

- [ ] Ownership decision recorded and approved by Lyn.
- [ ] SQLite runtime DB path confirmed as one AWS path.
- [ ] `DATABASE_PATH` env var used consistently.
- [ ] API route updated to read from `DATABASE_PATH`, not `OPTIMIZE_WORKER_PATH`.
- [ ] `optimize-worker` writes to `DATABASE_PATH` or the write contract is otherwise explicitly defined.
- [ ] Backup target S3 path confirmed.
- [ ] `.gitignore` excludes `*.sqlite`, `*.sqlite-*`, and local `/data/` runtime directories.
- [ ] All regression tests passed, including 14/14 pytest baseline.
- [ ] Cockpit displays metrics from the correct DB.
- [ ] AWS deployment runbook updated with the correct DB path.
- [ ] No secrets in git.
- [ ] No runtime DB files committed.

## 8. What NOT to Do Yet

- No RDS/Postgres before Phase 3.
- No ECS/Fargate for Phase 1; Phase 1 target remains Lightsail plus container unless a later decision changes it.
- No App Runner for SQLite persistence, because App Runner does not provide the required durable SQLite volume contract.
- No multi-tenant observability before the first customer validation.
- No large refactor without tests.
- No AWS application deployment before the runtime DB contract is resolved.

## Proposed Commit

Proposed commit message after Lyn review:

```text
Add AIOS Observability ownership decision packet
```
