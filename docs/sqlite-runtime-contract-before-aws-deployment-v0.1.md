# SQLite Runtime Contract Before AWS Deployment v0.1

**Status:** Design contract for Lyn approval  
**Target:** AIOS Observability Cockpit Phase 1 AWS deployment  
**Decision context:** Phase 1 uses Container + SQLite (no RDS/Postgres yet)  
**Prerequisite:** ai-os-profile commit `b87739c` (AIOS Observability ownership decision packet)

---

## 1. Purpose and Scope

This document defines the SQLite runtime contract that must be in place before AIOS Observability Cockpit is deployed to AWS Lightsail.

**Current status:**
- AWS foundation is ready (Lightsail instance, Static IP, S3 bucket, IAM user, firewall rules)
- AWS **app deployment remains gated** until this contract is approved and implemented
- No Docker/Caddy/app install/runtime DB upload has occurred yet

**This contract resolves:**
- SQLite path ambiguity (3 different path conventions existed)
- Read/write access boundaries
- Trace sync model for Phase 1
- Backup/restore source-of-truth
- Files that must never be committed to Git

**Out of scope:**
- Code implementation (separate task after contract approval)
- AWS deployment execution (separate task after regression tests pass)
- RDS/Postgres migration (Phase 3, not Phase 1)
- Multi-tenant architecture (deferred until scale requires it)

---

## 2. Approved Phase 1 SQLite Runtime Contract

### Runtime DB Path (Single Source of Truth)

```
/data/observability.db
```

**Rationale:**
- Container-native path (not tied to host filesystem)
- Persistent volume mount preserves data across container restarts
- Eliminates ambiguity (Dockerfile already sets `DATABASE_PATH=/data/observability.db`)
- Backup/restore straightforward (one path for source and target)

### Environment Variable Contract

**Production (AWS Lightsail container):**
```bash
DATABASE_PATH=/data/observability.db
```

**Local development:**
```bash
# .env.local (not committed)
DATABASE_PATH=/Users/apple/projects/optimize-worker/observability/aios_observability.sqlite
```

**Hard rule:**
> `OPTIMIZE_WORKER_PATH` **must NOT** be used in production deployment.

**Why:**
- `OPTIMIZE_WORKER_PATH` is a host filesystem path (development-only)
- Not portable to container/AWS deployment
- Couples cockpit to worker repo structure (violates deployment boundary)
- `DATABASE_PATH` is the correct abstraction for production

### API Route Contract

**Current (WRONG for AWS):**
```typescript
// app/api/observability/route.ts
const DB_PATH = join(
  process.env.OPTIMIZE_WORKER_PATH || "/Users/apple/projects/optimize-worker",
  "observability/aios_observability.sqlite"
)
```

**Required (CORRECT for AWS):**
```typescript
// app/api/observability/route.ts
const DB_PATH = process.env.DATABASE_PATH

if (!DB_PATH) {
  throw new Error("DATABASE_PATH environment variable must be set")
}
```

**Fallback for local dev (optional):**
```typescript
const DB_PATH = process.env.DATABASE_PATH || 
  join(
    process.env.OPTIMIZE_WORKER_PATH || "/Users/apple/projects/optimize-worker",
    "observability/aios_observability.sqlite"
  )

if (!DB_PATH) {
  throw new Error("DATABASE_PATH or OPTIMIZE_WORKER_PATH must be set")
}
```

---

## 3. Read/Write Boundary

### Cockpit UI/API = Read-Only

**Phase 1 constraint:**
- Cockpit displays observability metrics (read-only)
- No write operations from UI (no trace editing, no annotations, no deletions)
- No user-initiated writes to SQLite from browser

**Why:**
- Minimizes SQLite concurrency risk
- Simplifies security model (no write API endpoints exposed)
- Reduces attack surface (read-only = safer for public/client access)

### Admin Import/Sync Job = Controlled Write Path

**Phase 1 write mechanism:**
- Admin can SSH to Lightsail instance
- Admin can run import/sync script (manual or cron)
- Import script merges exported traces → `/data/observability.db`
- Import runs outside container (direct filesystem access) or via Docker exec

**Why:**
- Controlled, auditable write path (not user-initiated)
- No remote write access from optimize-worker laptop (security)
- Explicit sync workflow (Lyn controls when traces upload to AWS)

---

## 4. Trace Sync Model

### Phase 1: Manual/Export-Based Sync

**Workflow:**
```
optimize-worker (Lyn's laptop)
├── observability/aios_observability.sqlite (local dev DB)
└── export script: python observability/export_for_aws.py
    └── creates traces-export.db (sanitized, no secrets/PII)

Upload to AWS:
scp traces-export.db lightsail-instance:/tmp/

AWS Lightsail:
ssh lightsail-instance
docker exec aios-cockpit /app/scripts/import_traces.sh /tmp/traces-export.db
└── merges into /data/observability.db
```

**Frequency:** Weekly or on-demand (Lyn decides)

**Why manual sync for Phase 1:**
- ✅ No remote write access required (simpler security)
- ✅ Explicit sanitization step (strip secrets before upload)
- ✅ No real-time dependency (cockpit shows last synced state, not live)
- ✅ Bounded scope (no distributed writes, no concurrency issues)
- ✅ Lyn controls when data goes to AWS (no automatic uploads)

### Rejected Alternative: Real-Time Remote Writes

**Why NOT real-time writes in Phase 1:**
- ❌ SQLite not designed for concurrent remote writes
- ❌ Security risk (expose DB write access over network)
- ❌ Network dependency (slow, unreliable)
- ❌ Premature optimization (Phase 2/3 concern, not Phase 1)

**When to revisit:** Phase 2, after first customer validates cockpit value

---

## 5. Backup/Restore Contract

### S3 Backup Source

**Backup script must back up:**
```bash
/data/observability.db
```

**Critical rule:**
> **Backup source path MUST match the DB the app actually reads.**

**Backup script contract:**
```bash
#!/bin/bash
# /app/scripts/backup_to_s3.sh

SOURCE_DB="/data/observability.db"
BACKUP_NAME="observability-$(date +%Y-%m-%d-%H%M%S).db"
S3_BUCKET="s3://<PLACEHOLDER-BUCKET-NAME>"

# Create SQLite backup (not just cp, use SQLite .backup)
sqlite3 $SOURCE_DB ".backup /tmp/$BACKUP_NAME"

# Upload to S3
aws s3 cp /tmp/$BACKUP_NAME $S3_BUCKET/backups/

# Cleanup local temp
rm /tmp/$BACKUP_NAME

echo "Backup complete: $S3_BUCKET/backups/$BACKUP_NAME"
```

**Frequency:** Daily (cron job on Lightsail instance)

**Retention:** Keep 30 days, then auto-delete old backups

### Restore Target

**Restore must write to:**
```bash
/data/observability.db
```

**Restore workflow:**
```bash
# 1. Download latest backup from S3
aws s3 cp s3://<PLACEHOLDER-BUCKET-NAME>/backups/observability-2026-05-22-120000.db /tmp/restore.db

# 2. Stop container
docker stop aios-cockpit

# 3. Replace DB
docker cp /tmp/restore.db aios-cockpit:/data/observability.db

# 4. Start container
docker start aios-cockpit

# 5. Verify cockpit loads
curl https://<PLACEHOLDER-DOMAIN>/architecture/system-health/observability
```

**Restore test required:** Must test restore before declaring AWS deployment complete

### Placeholder Policy for Public Docs

**Do NOT expose in public docs/screenshots:**
- Real S3 bucket names
- Real AWS account IDs
- Real Lightsail instance IPs
- Real IAM usernames
- Real domain names
- Real access keys

**Use placeholders instead:**
- `s3://<PLACEHOLDER-BUCKET-NAME>`
- `<PLACEHOLDER-LIGHTSAIL-IP>`
- `<PLACEHOLDER-DOMAIN>`
- `<IAM-BACKUP-USER>`
- `AKIA****************` (masked keys)

---

## 6. Files Never to Commit

### `.gitignore` Rules (Both Repos)

```gitignore
# Runtime SQLite databases
*.sqlite
*.sqlite-shm
*.sqlite-wal
*.db
*.db-shm
*.db-wal

# Secrets and credentials
.env
.env.local
.env.production
*.pem
*.key
*.crt
aws-credentials.csv
lightsail-key-*.pem
*.pem

# AWS deployment artifacts
/data/
backups/
exports/
traces-export.db

# Temporary files
observability-*.db
restore-*.db
```

### Files That Must NEVER Be Committed

**Secrets:**
1. `.env` (contains `DATABASE_PATH`, AWS credentials)
2. `aws-credentials.csv` (downloaded from AWS console)
3. `lightsail-key-*.pem` (SSH private key)
4. IAM access keys (in any format)

**Runtime data:**
1. `optimize-worker/observability/aios_observability.sqlite` (local dev DB with real traces)
2. `ai-os-profile/data/observability.db` (container runtime DB)
3. Backup artifacts (`observability-2026-05-22.db`)
4. Export artifacts (`traces-export.db`)

### Pre-Commit Verification

**Before every commit:**
```bash
# Check for secrets/runtime DBs
git status --short | grep -E "\.(sqlite|db|pem|csv|key|env)$"
# Should return nothing

# Check git history for leaked secrets
git log --all --full-history --oneline -- "*.pem" "*.env" "*.sqlite" "*.csv"
# Should return nothing
```

---

## 7. Required Code/Config/Doc Changes Before AWS App Deployment

### A. Code Changes

**1. Update API route to use `DATABASE_PATH`**

File: `app/api/observability/route.ts`

Change:
```typescript
// OLD (depends on OPTIMIZE_WORKER_PATH)
const DB_PATH = join(
  process.env.OPTIMIZE_WORKER_PATH || "/Users/apple/projects/optimize-worker",
  "observability/aios_observability.sqlite"
)

// NEW (uses DATABASE_PATH)
const DB_PATH = process.env.DATABASE_PATH

if (!DB_PATH) {
  throw new Error("DATABASE_PATH environment variable must be set")
}
```

**2. Create `.env.local` for local development**

File: `ai-os-profile/.env.local` (not committed)

Content:
```bash
DATABASE_PATH=/Users/apple/projects/optimize-worker/observability/aios_observability.sqlite
```

**3. Create export script**

File: `optimize-worker/observability/export_for_aws.py`

Purpose:
- Read local `aios_observability.sqlite`
- Sanitize traces (strip secrets, PII, raw prompts/responses if needed)
- Write to `traces-export.db`

**4. Create import script**

File: `ai-os-profile/scripts/import_traces.sh`

Purpose:
- Merge `traces-export.db` → `/data/observability.db`
- Use SQLite `.import` or `ATTACH` + `INSERT` to merge traces

### B. Config Changes

**1. Update `.gitignore` (both repos)**

Add rules from Section 6 above

**2. Verify Dockerfile (already correct)**

File: `ai-os-profile/Dockerfile`

Existing (no change needed):
```dockerfile
ENV DATABASE_PATH=/data/observability.db
RUN mkdir -p /data
```

**3. Create `docker-compose.yml` (optional)**

File: `ai-os-profile/docker-compose.yml`

Content:
```yaml
services:
  aios-cockpit:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_PATH=/data/observability.db
      - NODE_ENV=production
    volumes:
      - observability-data:/data

volumes:
  observability-data:
```

### C. Documentation Changes

**1. Update AWS Lightsail deployment runbook**

File: `optimize-worker/docs/aws-lightsail-deployment-runbook-v0.1.md`

Update to reflect:
- SQLite runtime path: `/data/observability.db`
- Backup source: `/data/observability.db`
- No `OPTIMIZE_WORKER_PATH` in production
- Manual trace sync workflow

**2. Create trace sync runbook**

File: `ai-os-profile/docs/trace-sync-runbook-v0.1.md` (future)

Content:
- How to export traces from optimize-worker
- How to upload to AWS
- How to import into `/data/observability.db`
- Frequency: weekly or on-demand

---

## 8. Regression/Smoke Tests Required

### Pre-Deployment Tests (Local)

**Test 1: Verify API route reads from `DATABASE_PATH`**
```bash
cd ~/projects/ai-os-profile
export DATABASE_PATH=/Users/apple/projects/optimize-worker/observability/aios_observability.sqlite
npm run dev
open http://localhost:3000/architecture/system-health/observability
# Verify 7 metrics display correctly
```

**Test 2: Verify optimize-worker tests still pass**
```bash
cd ~/projects/optimize-worker
pytest tests/test_observability.py -v
# Must pass 14/14 tests
```

**Test 3: Verify export/import script**
```bash
# Export
cd ~/projects/optimize-worker
python observability/export_for_aws.py
ls -lh traces-export.db
# Should exist, size >0

# Import (test locally before AWS)
cd ~/projects/ai-os-profile
./scripts/import_traces.sh /tmp/traces-export.db
# Should merge without errors
```

### Post-Deployment Smoke Tests (AWS)

**Test 1: Container health check**
```bash
ssh lightsail-instance
docker ps | grep aios-cockpit
# Container should be running

docker logs aios-cockpit | tail -20
# No DATABASE_PATH errors
```

**Test 2: Cockpit accessible**
```bash
curl https://<PLACEHOLDER-DOMAIN>/architecture/system-health/observability
# Should return 200, not 500
```

**Test 3: Metrics display**
```
Open: https://<PLACEHOLDER-DOMAIN>/architecture/system-health/observability
Verify:
- Total traces count > 0
- Token usage chart displays
- Cost breakdown chart displays
- 7 metrics visible
- No DATABASE_PATH errors in browser console
```

**Test 4: Backup script works**
```bash
ssh lightsail-instance
docker exec aios-cockpit /app/scripts/backup_to_s3.sh

# Verify backup exists in S3
aws s3 ls s3://<PLACEHOLDER-BUCKET-NAME>/backups/
# Latest backup should appear
```

**Test 5: Restore test**
```bash
# Download latest backup
aws s3 cp s3://<PLACEHOLDER-BUCKET-NAME>/backups/observability-2026-05-22-120000.db /tmp/restore-test.db

# Stop container, replace DB, restart
docker stop aios-cockpit
docker cp /tmp/restore-test.db aios-cockpit:/data/observability.db
docker start aios-cockpit

# Verify cockpit still works
curl https://<PLACEHOLDER-DOMAIN>/architecture/system-health/observability
# Should return 200
```

---

## 9. Go/No-Go Checklist Before Docker/Caddy/AWS App Deployment

### Code/Config Changes Complete

- [ ] **API route updated** to read from `DATABASE_PATH` (not `OPTIMIZE_WORKER_PATH`)
- [ ] **`.env.local` created** for local development
- [ ] **Local dev tested** with `DATABASE_PATH` set (npm run dev works)
- [ ] **`.gitignore` updated** to exclude `*.sqlite`, `*.db`, `.env`, `/data/`
- [ ] **Export script created** (`optimize-worker/observability/export_for_aws.py`)
- [ ] **Import script created** (`ai-os-profile/scripts/import_traces.sh`)
- [ ] **Export/import tested** locally (no errors)

### Regression Tests Passed

- [ ] **optimize-worker pytest** passes 14/14 tests
- [ ] **Cockpit displays metrics** locally (7 metrics visible)
- [ ] **API route returns 200** (not 500)
- [ ] **No console errors** related to DATABASE_PATH

### Git Safety Verified

- [ ] **No secrets committed** (`.env`, AWS credentials, SSH keys)
- [ ] **No runtime DBs committed** (`*.sqlite`, `*.db`)
- [ ] **git log history clean** (no leaked secrets in past commits)
- [ ] **`.gitignore` excludes** all sensitive files

### Documentation Updated

- [ ] **SQLite runtime contract approved** by Lyn (this doc)
- [ ] **AWS deployment runbook updated** with correct DB path
- [ ] **Architecture docs reflect** `/data/observability.db` as source-of-truth
- [ ] **Placeholders used** in public docs (no real bucket/IP/IAM names)

### AWS Foundation Ready

- [ ] **Lightsail instance created** (Ubuntu 22.04 LTS, $12/month)
- [ ] **Static IP attached** to instance
- [ ] **Firewall rules configured** (allow 80/443, restrict 22 to Lyn IP)
- [ ] **S3 bucket created** for backups
- [ ] **IAM backup-only user created** (read/write S3 only)
- [ ] **SSH key downloaded** and secured (`.pem` file not committed)
- [ ] **Docker installed** on Lightsail instance
- [ ] **Persistent volume created** (mount `/data` for SQLite)

### Deployment Artifacts Ready

- [ ] **Dockerfile verified** (`DATABASE_PATH=/data/observability.db` set)
- [ ] **Docker image built** locally and tested
- [ ] **Backup script created** (`/app/scripts/backup_to_s3.sh`)
- [ ] **Caddy config ready** (HTTPS + reverse proxy)
- [ ] **Access control configured** (Cloudflare Access or Basic Auth)

### Post-Deployment Validation Plan

- [ ] **Container health check** script ready
- [ ] **Smoke test checklist** prepared (5 tests from Section 8)
- [ ] **Rollback plan documented** (how to revert if deployment fails)
- [ ] **Backup restore test** will be run within 24 hours of deployment

---

## 10. Open Risks and Deferred Decisions

### Known Risks (Accepted for Phase 1)

**Risk 1: Manual sync workflow fragile**
- **Risk:** Lyn forgets to sync traces → AWS cockpit shows stale data
- **Mitigation:** Set calendar reminder or cron reminder to sync weekly
- **Accepted:** Phase 1 = manual, automate in Phase 2 if painful

**Risk 2: SQLite concurrency limits**
- **Risk:** If multiple workers write to same DB, SQLite may lock
- **Mitigation:** Phase 1 = single writer (manual sync), read-only cockpit
- **Accepted:** SQLite bounded to Phase 1, explicit migration triggers exist

**Risk 3: Backup/restore not tested until post-deployment**
- **Risk:** Restore fails when actually needed
- **Mitigation:** Test restore within 24 hours of deployment (mandatory)
- **Accepted:** Cannot test restore before deployment (no AWS DB yet)

**Risk 4: Runtime DB accidentally committed**
- **Risk:** `git add .` commits `*.sqlite` by accident
- **Mitigation:** `.gitignore` rules + manual verification before commit
- **Accepted:** Lyn must verify `git status` before every commit

**Risk 5: Trace export script not yet implemented**
- **Risk:** Export script fails during first sync attempt
- **Mitigation:** Implement export script as separate task before first sync
- **Accepted:** Contract defines interface, implementation follows approval

### Deferred Decisions (Park for Phase 2)

**Q1: How to automate trace sync?**
- Options: cron job on laptop, GitHub Actions, webhook on trace write
- **Decision:** Defer to Phase 2 (after first customer validates value)

**Q2: Should optimize-worker write directly to AWS DB?**
- Options: remote SQLite write (risky), HTTP API (requires build), Postgres (Phase 3)
- **Decision:** Defer to Phase 2/3 (manual sync sufficient for Phase 1)

**Q3: Should cockpit support write operations (annotations)?**
- Options: read-only (Phase 1), read-write (Phase 2+)
- **Decision:** Phase 1 = read-only only, defer write features to Phase 2

**Q4: How to handle multiple workers (laptop, Codex, cloud)?**
- Options: merge DBs, separate DBs per worker, Postgres
- **Decision:** Defer to Phase 2 (only 1 worker in Phase 1)

**Q5: When to migrate to Postgres?**
- Triggers: 5+ customers, >1GB DB, concurrent writes, query latency
- **Decision:** Phase 3 concern, not Phase 1 (SQLite sufficient now)

---

## Summary: Phase 1 SQLite Runtime Contract

### Contract Rules

1. ✅ **Runtime DB path:** `/data/observability.db` (single source-of-truth)
2. ✅ **Environment variable:** `DATABASE_PATH=/data/observability.db`
3. ✅ **API route:** reads from `DATABASE_PATH` (not `OPTIMIZE_WORKER_PATH`)
4. ✅ **No `OPTIMIZE_WORKER_PATH` in production** (development-only)
5. ✅ **Cockpit = read-only** (no user-initiated writes)
6. ✅ **Trace sync = manual/export-based** (no real-time remote writes)
7. ✅ **S3 backup source:** `/data/observability.db` (matches app DB)
8. ✅ **Restore target:** `/data/observability.db` (same path)
9. ✅ **`.gitignore` excludes:** `*.sqlite`, `*.db`, `.env`, secrets, backups
10. ✅ **Placeholders in public docs** (no real bucket/IP/IAM names)

### Go/No-Go Gate

**Before AWS app deployment:**
- ✅ Code changes implemented and tested locally
- ✅ Regression tests passed (14/14 pytest, metrics display)
- ✅ Git safety verified (no secrets/runtime DBs committed)
- ✅ Documentation updated (runbooks reflect `/data/observability.db`)
- ✅ AWS foundation ready (Lightsail, S3, IAM, Docker, volume)
- ✅ Backup/restore scripts ready (tested post-deployment)

**After AWS app deployment:**
- ⏸️ Smoke tests passed (container health, metrics display, backup works)
- ⏸️ Restore test passed (within 24 hours of deployment)

---

**Status: DESIGN CONTRACT COMPLETE. Awaiting Lyn approval before implementation.** 🎯
