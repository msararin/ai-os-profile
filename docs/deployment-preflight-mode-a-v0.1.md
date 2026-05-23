# Deployment Preflight Packet: Mode A (Public Web Surface Only) v0.1

**Status:** Draft for Lyn approval  
**Target:** ai-os-profile web accessible online (safest thin-slice)  
**Mode:** Mode A - Public/architecture web surface WITHOUT live observability DB backend  
**Worker:** Qwen (preflight) → Hermes/Sonnet (gatekeeper) → Lyn (final approval)

---

## 1. Current Target Assessment

### Repo Status

**Location:** `/Users/apple/projects/ai-os-profile`

**Branch:** `main`

**Latest commits:**
- `98d13f7` - SQLite runtime contract (docs only, NOT implemented)
- `b87739c` - AIOS Observability ownership decision packet
- `6b31534` - Add AIOS observability layer to architecture cockpit
- `42d439c` - Add Phase 1 deployment: Container + SQLite (Dockerfile exists)
- `5618509` - Add Observability Panel to cockpit (all UX fixes applied)

**Key files:**
- ✅ `Dockerfile` exists (Node.js 20 Alpine + better-sqlite3)
- ✅ `.dockerignore` exists
- ✅ `railway.json` exists (Railway config, can adapt for Lightsail)
- ✅ Next.js app in `app/` directory
- ✅ Observability panel at `app/architecture/system-health/observability/page.tsx`
- ✅ API route at `app/api/observability/route.ts` (currently depends on DB)

**What is NOT ready yet:**
- ❌ `.env.local` or `.env.production` (not created)
- ❌ SQLite runtime contract NOT implemented (API route still uses `OPTIMIZE_WORKER_PATH`)
- ❌ No build tested locally for Mode A (no-DB deployment)
- ❌ No `docker-compose.yml` for Lightsail
- ❌ Caddy config NOT created
- ❌ No smoke test script

### AWS Infrastructure Status

**Lightsail Instance:**
- ✅ Exists (Ubuntu 22.04 LTS, $12/month, 2GB RAM)
- ✅ Docker installed
- ✅ Static IP attached
- ✅ Firewall: HTTP/HTTPS open (80/443), SSH restricted

**S3 Backup:**
- ✅ Bucket exists (for future observability DB backups)
- ✅ IAM backup-only user exists

**What is NOT deployed yet:**
- ❌ No Docker container running on Lightsail
- ❌ No Caddy reverse proxy installed
- ❌ No HTTPS/Let's Encrypt configured
- ❌ No app accessible at public IP yet
- ❌ No observability DB uploaded (Mode A = no DB)

---

## 2. Mode A Minimal Online Path Analysis

### What Must Be Installed on Lightsail?

**Required software:**
1. ✅ Docker (already installed)
2. ✅ Docker Compose (already installed, verify version)
3. ❌ Caddy (HTTPS reverse proxy) - **needs installation**
4. ❌ Certbot/Let's Encrypt (if using Nginx instead of Caddy) - **skip if using Caddy**

**Recommended for Mode A:**
- Use **Caddy** (simpler than Nginx + Certbot)
- Caddy auto-handles HTTPS/Let's Encrypt
- Single Docker Compose file for app + Caddy

### What Build Artifact/Container Is Needed?

**Option 1: Build on Lightsail (Recommended for Mode A)**
```bash
# SSH to Lightsail
# Clone repo or copy source
# Build Docker image locally on Lightsail
docker build -t aios-profile:latest .
```

**Option 2: Build locally, push to registry, pull on Lightsail**
```bash
# Local build
docker build -t aios-profile:latest .
docker tag aios-profile:latest <registry>/aios-profile:latest
docker push <registry>/aios-profile:latest

# On Lightsail
docker pull <registry>/aios-profile:latest
```

**For Mode A thin-slice:** Option 1 (build on Lightsail) is simpler, no registry needed.

### Can the Site Run Without Live Observability DB?

**Yes, with modifications:**

**Issue:** API route at `app/api/observability/route.ts` currently requires SQLite DB:
```typescript
const DB_PATH = join(
  process.env.OPTIMIZE_WORKER_PATH || "/Users/apple/projects/optimize-worker",
  "observability/aios_observability.sqlite"
)
```

**Mode A solutions:**

**Option A (Safest): Stub the API route**
- API returns mock/empty data instead of querying DB
- Frontend displays "Coming Soon" or placeholder metrics
- No DATABASE_PATH env var needed

**Option B: Skip DB mount entirely**
- Set `DATABASE_PATH=/data/observability.db` but don't mount volume
- API route will fail gracefully (404 or empty data)
- Frontend shows "No data available"

**Option C: Disable observability route entirely**
- Comment out API route import
- Remove observability page from nav (temporary)
- Deploy only public/architecture pages

**Recommendation for Mode A:** Option A (stub API) is safest. Frontend sees the page but understands data is not live yet.

### What Env Vars Are Required for Public Pages Only?

**Minimal env vars for Mode A:**
```bash
NODE_ENV=production
PORT=3000
# DATABASE_PATH not set (Mode A = no live DB)
# OPTIMIZE_WORKER_PATH not set (Mode A = no live DB)
```

**Optional:**
```bash
NEXT_PUBLIC_SITE_URL=https://<static-ip-or-domain>
```

### Which Routes Might Fail If DB Is Absent?

**Routes that depend on DB:**
1. `/api/observability` - **Will fail** if DB not mounted and API not stubbed
2. `/architecture/system-health/observability` - **Frontend will show error** if API returns 500

**Routes that should work without DB:**
1. `/` (homepage)
2. `/architecture/*` (other architecture pages, unless they call observability API)
3. All static pages

**Mode A fix:** Stub `/api/observability` to return mock data or `{ status: "coming_soon", message: "Observability telemetry not yet connected" }`

### How to Avoid Presenting DB-Backed Observability as Live?

**Frontend changes needed:**

**Option 1: "Coming Soon" banner**
```tsx
// app/architecture/system-health/observability/page.tsx
export default function ObservabilityPage() {
  return (
    <div>
      <Banner variant="warning">
        Observability telemetry is not yet connected. Displaying mockup for architecture review.
      </Banner>
      {/* Rest of page with placeholder/mock data */}
    </div>
  )
}
```

**Option 2: Disable page entirely**
- Remove from nav
- Show 404 or redirect to architecture index

**Option 3: Static mockup**
- Display static charts/metrics
- Clear label: "Example data for demonstration purposes"

**Recommendation:** Option 1 (Coming Soon banner) + mock data from API stub.

---

## 3. Preflight Checklist

### Pre-Deployment Validation Steps

**Local validation:**
- [ ] Verify Dockerfile builds successfully
  ```bash
  cd /Users/apple/projects/ai-os-profile
  docker build -t aios-profile:test .
  ```
- [ ] Test container runs locally (without DB)
  ```bash
  docker run -p 3000:3000 -e NODE_ENV=production aios-profile:test
  curl http://localhost:3000
  # Should return Next.js homepage
  ```
- [ ] Verify observability page handling (with API stub or graceful failure)
  ```bash
  curl http://localhost:3000/api/observability
  # Should return mock data or 200 with "coming_soon" status
  ```

**Git safety:**
- [ ] No `.env` committed
- [ ] No secrets in Dockerfile
- [ ] No runtime DB files in repo
- [ ] `.gitignore` excludes `.env`, `*.db`, `*.sqlite`

**AWS infrastructure:**
- [ ] Lightsail instance accessible via SSH
  ```bash
  ssh -i lightsail-key.pem ubuntu@<static-ip>
  ```
- [ ] Docker installed on Lightsail
  ```bash
  ssh ubuntu@<static-ip> "docker --version"
  ```
- [ ] Static IP confirmed and HTTP/HTTPS ports open
  ```bash
  curl http://<static-ip>
  # Should return connection refused (no app yet) or timeout
  ```

### Environment Variable Checklist

**Mode A minimal env vars:**
- [ ] `NODE_ENV=production` (required)
- [ ] `PORT=3000` (optional, default)
- [ ] `DATABASE_PATH` NOT set (Mode A = no live DB)
- [ ] `OPTIMIZE_WORKER_PATH` NOT set (Mode A = no live DB)

**Do NOT set:**
- ❌ AWS access keys in env vars (use IAM roles instead)
- ❌ Database credentials (Mode A has no DB)
- ❌ API keys for external services (none needed for Mode A)

### Files That Must NOT Be Uploaded

**Secrets:**
- ❌ `.env` or `.env.production` (if it contains secrets)
- ❌ `aws-credentials.csv`
- ❌ `lightsail-key.pem` (SSH private key)
- ❌ IAM access keys

**Runtime data:**
- ❌ `observability/aios_observability.sqlite`
- ❌ `/data/observability.db`
- ❌ Backup files (`observability-*.db`)

**Acceptable to upload:**
- ✅ Source code (already in repo)
- ✅ Dockerfile
- ✅ `docker-compose.yml` (if created)
- ✅ Caddy config (if created)
- ✅ Public env vars (`NODE_ENV=production`)

---

## 4. Deployment Command Draft (READ-ONLY, DO NOT EXECUTE)

⚠️ **ALL COMMANDS BELOW ARE DRAFTS. DO NOT EXECUTE WITHOUT LYN APPROVAL.**

### Step 1: Prepare Lightsail Instance

**[DRAFT - NEEDS LYN APPROVAL]**
```bash
# SSH to Lightsail
ssh -i ~/.ssh/lightsail-key.pem ubuntu@<PLACEHOLDER-STATIC-IP>

# Update system packages
sudo apt-get update
sudo apt-get upgrade -y

# Verify Docker installed
docker --version
docker compose version

# Install Caddy (if not installed)
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy

# Verify Caddy installed
caddy version
```

### Step 2: Upload Source Code to Lightsail

**[DRAFT - NEEDS LYN APPROVAL]**

**Option A: Git clone (if repo is public or SSH key configured)**
```bash
# On Lightsail
cd /home/ubuntu
git clone https://github.com/msararin/ai-os-profile.git
cd ai-os-profile
```

**Option B: rsync from local machine**
```bash
# On local machine
cd /Users/apple/projects/ai-os-profile
rsync -avz --exclude 'node_modules' --exclude '.next' --exclude '.git' \
  -e "ssh -i ~/.ssh/lightsail-key.pem" \
  . ubuntu@<PLACEHOLDER-STATIC-IP>:/home/ubuntu/ai-os-profile/
```

**Option C: scp tarball**
```bash
# Local
cd /Users/apple/projects
tar -czf ai-os-profile.tar.gz --exclude 'node_modules' --exclude '.next' ai-os-profile/
scp -i ~/.ssh/lightsail-key.pem ai-os-profile.tar.gz ubuntu@<PLACEHOLDER-STATIC-IP>:/home/ubuntu/

# On Lightsail
tar -xzf ai-os-profile.tar.gz
cd ai-os-profile
```

### Step 3: Create docker-compose.yml (Mode A)

**[DRAFT - NEEDS LYN APPROVAL]**
```bash
# On Lightsail
cd /home/ubuntu/ai-os-profile

cat > docker-compose.yml <<'EOF'
version: '3.8'

services:
  aios-profile:
    build: .
    container_name: aios-cockpit
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - PORT=3000
    expose:
      - "3000"
    # No DATABASE_PATH for Mode A
    # No volume mount for Mode A

  caddy:
    image: caddy:2-alpine
    container_name: caddy-proxy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
      - caddy_config:/config
    depends_on:
      - aios-profile

volumes:
  caddy_data:
  caddy_config:
EOF
```

### Step 4: Create Caddyfile (HTTPS Reverse Proxy)

**[DRAFT - NEEDS LYN APPROVAL]**
```bash
# On Lightsail
cd /home/ubuntu/ai-os-profile

cat > Caddyfile <<'EOF'
# Replace <PLACEHOLDER-DOMAIN> with actual domain or use IP
<PLACEHOLDER-DOMAIN> {
    reverse_proxy aios-profile:3000
    
    # HTTPS auto-enabled by Caddy if domain is used
    # For IP-only access, use:
    # tls internal
}

# Fallback for HTTP-only (development)
http://<PLACEHOLDER-STATIC-IP> {
    reverse_proxy aios-profile:3000
}
EOF
```

**Note:** If using domain (recommended for HTTPS), update DNS A record to point to Static IP first.

### Step 5: Build and Start Containers

**[DRAFT - NEEDS LYN APPROVAL]**
```bash
# On Lightsail
cd /home/ubuntu/ai-os-profile

# Build Docker image
docker compose build

# Start containers in background
docker compose up -d

# Verify containers running
docker compose ps

# Check logs
docker compose logs -f aios-profile
# Press Ctrl+C to exit logs
```

### Step 6: Verify Deployment

**[DRAFT - NEEDS LYN APPROVAL]**
```bash
# On Lightsail
curl http://localhost:3000
# Should return Next.js HTML

# From local machine
curl http://<PLACEHOLDER-STATIC-IP>
# Should return Next.js homepage

# HTTPS (if domain configured)
curl https://<PLACEHOLDER-DOMAIN>
# Should return Next.js homepage with valid cert
```

---

## 5. Risk List

### Deployment Risks

**Risk 1: Observability page breaks without DB**
- **Impact:** Users see 500 error on `/architecture/system-health/observability`
- **Likelihood:** High (API route requires DB currently)
- **Mitigation:** Stub API route to return mock data OR disable page in Mode A
- **Accepted:** Mode A = observability is mockup/coming-soon only

**Risk 2: Docker build fails on Lightsail**
- **Impact:** Deployment blocked
- **Likelihood:** Medium (Lightsail has 2GB RAM, may run out during build)
- **Mitigation:** Build locally first, test on Lightsail with `docker build`
- **Rollback:** Use local build + Docker registry if Lightsail build fails

**Risk 3: Caddy fails to obtain HTTPS cert**
- **Impact:** Site accessible via HTTP only (not HTTPS)
- **Likelihood:** Medium (requires domain pointing to Static IP)
- **Mitigation:** Test with HTTP first, then add domain + HTTPS
- **Accepted:** Mode A can start with HTTP if domain not ready

**Risk 4: Firewall blocks traffic**
- **Impact:** Site not accessible from internet
- **Likelihood:** Low (Lightsail firewall already open for 80/443)
- **Mitigation:** Verify firewall rules before deployment
- **Rollback:** No rollback needed (just fix firewall)

**Risk 5: Next.js build fails**
- **Impact:** Container doesn't start
- **Likelihood:** Low (build tested locally)
- **Mitigation:** Run `npm run build` locally first to verify
- **Rollback:** Fix build errors, rebuild container

### Security Risks

**Risk 6: Secrets leaked in Docker image**
- **Impact:** AWS credentials, API keys exposed
- **Likelihood:** Low (no secrets in Mode A)
- **Mitigation:** Audit Dockerfile, no `.env` in image, no secrets in env vars
- **Prevention:** Use `.dockerignore`, exclude `.env`

**Risk 7: Observability API exposes data**
- **Impact:** Mockup data might be misinterpreted as real telemetry
- **Likelihood:** Medium (if API not stubbed clearly)
- **Mitigation:** API returns `{ status: "coming_soon" }` with clear message
- **Prevention:** Add banner on frontend: "Observability not yet connected"

**Risk 8: SSH key leaked**
- **Impact:** Attacker gains access to Lightsail instance
- **Likelihood:** Low (key stored locally, not committed)
- **Mitigation:** Verify `lightsail-key.pem` not in repo, not in Docker image
- **Prevention:** Use `.gitignore`, audit git history

### Cost Risks

**Risk 9: Unexpected AWS charges**
- **Impact:** Higher than expected bill
- **Likelihood:** Low (Lightsail $12/month fixed, no RDS/ECS)
- **Mitigation:** Monitor AWS billing, set billing alerts
- **Accepted:** Mode A costs = Lightsail $12/month + S3 storage (minimal)

### Performance Risks

**Risk 10: Lightsail 2GB RAM insufficient**
- **Impact:** Container crashes, site unavailable
- **Likelihood:** Low (Next.js typically <1GB RAM)
- **Mitigation:** Monitor container memory usage with `docker stats`
- **Rollback:** Upgrade Lightsail to 4GB plan ($24/month) if needed

---

## 6. Go/No-Go Checklist

### Pre-Deployment Validation (Must Pass Before Deployment)

- [ ] **Local Docker build succeeds**
  ```bash
  docker build -t aios-profile:test .
  # No errors
  ```

- [ ] **Local container runs without DB**
  ```bash
  docker run -p 3000:3000 -e NODE_ENV=production aios-profile:test
  curl http://localhost:3000
  # Returns Next.js homepage
  ```

- [ ] **Observability API stubbed or gracefully fails**
  ```bash
  curl http://localhost:3000/api/observability
  # Returns mock data or 200 with "coming_soon" message
  # NOT 500 error
  ```

- [ ] **Git safety verified**
  ```bash
  git status --short | grep -E "\.(env|pem|csv|key)$"
  # Should return nothing
  ```

- [ ] **Lightsail instance accessible**
  ```bash
  ssh -i ~/.ssh/lightsail-key.pem ubuntu@<static-ip> "echo OK"
  # Returns "OK"
  ```

- [ ] **Docker installed on Lightsail**
  ```bash
  ssh ubuntu@<static-ip> "docker --version"
  # Returns Docker version
  ```

### Lyn Approval Gates (Must Be Approved Before Execution)

- [ ] **Lyn approves Mode A scope** (public web surface only, no live DB)
- [ ] **Lyn approves observability page handling** (stub API or disable page)
- [ ] **Lyn approves Lightsail commands** (Docker build, Caddy install, container start)
- [ ] **Lyn approves domain/IP configuration** (HTTP vs HTTPS, domain vs IP)
- [ ] **Lyn approves cost** (Lightsail $12/month + minimal S3)
- [ ] **Lyn reviews Caddyfile** (reverse proxy config)
- [ ] **Lyn reviews docker-compose.yml** (no secrets, no DB mount)

### Post-Deployment Validation (Must Pass After Deployment)

- [ ] **Containers running**
  ```bash
  ssh ubuntu@<static-ip> "docker compose ps"
  # Both aios-profile and caddy should be "Up"
  ```

- [ ] **Site accessible from internet**
  ```bash
  curl http://<static-ip>
  # Returns Next.js homepage HTML
  ```

- [ ] **No 500 errors on homepage**
  ```bash
  curl -I http://<static-ip>
  # Returns 200 OK
  ```

- [ ] **Observability page handling verified**
  ```bash
  curl http://<static-ip>/architecture/system-health/observability
  # Returns 200 with "Coming Soon" banner OR 404 (if disabled)
  # NOT 500 error
  ```

- [ ] **HTTPS works (if domain configured)**
  ```bash
  curl https://<domain>
  # Returns 200 OK with valid cert
  ```

- [ ] **Container logs show no errors**
  ```bash
  ssh ubuntu@<static-ip> "docker compose logs aios-profile | tail -50"
  # No DATABASE_PATH errors, no 500 errors
  ```

---

## 7. Rollback Plan

### If Deployment Fails

**Step 1: Stop containers**
```bash
# On Lightsail
cd /home/ubuntu/ai-os-profile
docker compose down
```

**Step 2: Verify containers stopped**
```bash
docker compose ps
# Should show no running containers
```

**Step 3: Check logs for errors**
```bash
docker compose logs aios-profile > logs.txt
cat logs.txt
# Review errors, send to Lyn/Hermes for debugging
```

**Step 4: Revert to previous state**
- If no previous deployment exists, rollback = stop containers (done in Step 1)
- If previous working deployment exists, restore previous image:
  ```bash
  docker tag aios-profile:previous aios-profile:latest
  docker compose up -d
  ```

### If Site Is Accessible But Broken

**Scenario: Observability page shows 500 error**

**Fix 1: Disable observability page**
```bash
# On Lightsail
cd /home/ubuntu/ai-os-profile
# Edit docker-compose.yml to add env var
# environment:
#   - DISABLE_OBSERVABILITY=true
docker compose down
docker compose up -d
```

**Fix 2: Stub API route (requires code change + rebuild)**
```bash
# Stop containers
docker compose down

# Edit app/api/observability/route.ts locally
# Add stub that returns mock data
# Rebuild and redeploy

# Or: Pull updated code from repo if fix is committed
git pull origin main
docker compose build
docker compose up -d
```

### If Lightsail Instance Becomes Unresponsive

**Step 1: Reboot via AWS Console**
- Log in to AWS Lightsail console
- Select instance
- Click "Reboot"
- Wait 2-3 minutes

**Step 2: SSH in and check Docker**
```bash
ssh ubuntu@<static-ip>
docker ps
# If containers not running, restart:
cd /home/ubuntu/ai-os-profile
docker compose up -d
```

### Emergency Stop

**Stop all containers immediately:**
```bash
ssh ubuntu@<static-ip> "cd /home/ubuntu/ai-os-profile && docker compose down"
```

**Verify site is down:**
```bash
curl http://<static-ip>
# Should return connection refused or timeout
```

---

## 8. Validation Commands (Draft)

⚠️ **DO NOT EXECUTE WITHOUT LYN APPROVAL**

### Health Check Commands

**[DRAFT] Container health check:**
```bash
ssh ubuntu@<PLACEHOLDER-STATIC-IP> "docker compose ps"
# Expected: aios-profile and caddy both "Up"
```

**[DRAFT] Memory usage check:**
```bash
ssh ubuntu@<PLACEHOLDER-STATIC-IP> "docker stats --no-stream"
# Expected: aios-profile <1GB RAM
```

**[DRAFT] Disk usage check:**
```bash
ssh ubuntu@<PLACEHOLDER-STATIC-IP> "df -h"
# Expected: / volume <50% used
```

### Smoke Test Commands

**[DRAFT] Homepage accessible:**
```bash
curl -I http://<PLACEHOLDER-STATIC-IP>
# Expected: HTTP/1.1 200 OK
```

**[DRAFT] Architecture page accessible:**
```bash
curl -I http://<PLACEHOLDER-STATIC-IP>/architecture
# Expected: HTTP/1.1 200 OK
```

**[DRAFT] Observability page handling:**
```bash
curl http://<PLACEHOLDER-STATIC-IP>/architecture/system-health/observability
# Expected: 200 with "Coming Soon" banner OR 404 (if disabled)
# NOT 500 error
```

**[DRAFT] API observability route:**
```bash
curl http://<PLACEHOLDER-STATIC-IP>/api/observability
# Expected: 200 with { status: "coming_soon" } OR 404
# NOT 500 error
```

**[DRAFT] HTTPS check (if domain configured):**
```bash
curl -I https://<PLACEHOLDER-DOMAIN>
# Expected: HTTP/2 200 OK
# Cert valid
```

### Log Inspection Commands

**[DRAFT] View recent logs:**
```bash
ssh ubuntu@<PLACEHOLDER-STATIC-IP> \
  "cd /home/ubuntu/ai-os-profile && docker compose logs --tail=50 aios-profile"
```

**[DRAFT] Follow logs in real-time:**
```bash
ssh ubuntu@<PLACEHOLDER-STATIC-IP> \
  "cd /home/ubuntu/ai-os-profile && docker compose logs -f aios-profile"
# Press Ctrl+C to exit
```

**[DRAFT] Search logs for errors:**
```bash
ssh ubuntu@<PLACEHOLDER-STATIC-IP> \
  "cd /home/ubuntu/ai-os-profile && docker compose logs aios-profile | grep -i error"
```

---

## 9. What Requires Lyn Approval Before Execution

### High-Risk Commands (MUST BE APPROVED BY LYN)

1. **SSH to Lightsail instance**
   ```bash
   ssh -i ~/.ssh/lightsail-key.pem ubuntu@<static-ip>
   ```
   **Risk:** Access to production server
   **Approval gate:** Lyn must approve SSH access

2. **Install software on Lightsail (Caddy)**
   ```bash
   sudo apt install caddy
   ```
   **Risk:** System configuration change
   **Approval gate:** Lyn must approve software installation

3. **Create docker-compose.yml**
   ```bash
   cat > docker-compose.yml <<EOF ...
   ```
   **Risk:** Defines production deployment config
   **Approval gate:** Lyn must review and approve compose file

4. **Build Docker image on Lightsail**
   ```bash
   docker compose build
   ```
   **Risk:** Consumes CPU/RAM, may fail on 2GB instance
   **Approval gate:** Lyn must approve build command

5. **Start containers**
   ```bash
   docker compose up -d
   ```
   **Risk:** Makes site publicly accessible
   **Approval gate:** Lyn must approve deployment start

6. **Create Caddyfile (HTTPS config)**
   ```bash
   cat > Caddyfile <<EOF ...
   ```
   **Risk:** Defines reverse proxy and HTTPS config
   **Approval gate:** Lyn must review and approve Caddyfile

7. **Upload source code to Lightsail**
   ```bash
   rsync -avz ... ubuntu@<static-ip>:/home/ubuntu/ai-os-profile/
   ```
   **Risk:** Production code deployment
   **Approval gate:** Lyn must approve code upload method

### Medium-Risk Commands (RECOMMEND LYN REVIEW)

1. **Stop containers**
   ```bash
   docker compose down
   ```
   **Risk:** Site becomes unavailable
   **Approval gate:** Lyn should approve before stopping live site

2. **View logs**
   ```bash
   docker compose logs aios-profile
   ```
   **Risk:** Low (read-only)
   **Approval gate:** Can proceed without approval, but report findings

3. **Check container status**
   ```bash
   docker compose ps
   ```
   **Risk:** Low (read-only)
   **Approval gate:** Can proceed without approval

### Low-Risk Commands (INFORMATIONAL ONLY)

1. **Local Docker build test**
   ```bash
   docker build -t aios-profile:test .
   ```
   **Risk:** None (local only)
   **Approval gate:** No approval needed

2. **Local container test**
   ```bash
   docker run -p 3000:3000 aios-profile:test
   ```
   **Risk:** None (local only)
   **Approval gate:** No approval needed

3. **Git status check**
   ```bash
   git status --short
   ```
   **Risk:** None (read-only)
   **Approval gate:** No approval needed

---

## Summary: Mode A Deployment Preflight

### Scope

**Deploy:** ai-os-profile web surface (public/architecture pages)  
**Do NOT deploy:** Live observability DB backend  
**Observability:** Mockup/coming-soon only (stub API or disable page)

### Minimal Path

1. ✅ Lightsail instance already exists (Ubuntu, Docker, Static IP)
2. ❌ Install Caddy on Lightsail (HTTPS reverse proxy)
3. ❌ Upload ai-os-profile source code to Lightsail
4. ❌ Create docker-compose.yml (app + Caddy)
5. ❌ Create Caddyfile (reverse proxy config)
6. ❌ Build Docker image on Lightsail
7. ❌ Start containers (docker compose up -d)
8. ❌ Verify site accessible (smoke tests)

### Key Decisions Needed Before Deployment

- [ ] **How to handle observability page?** (stub API, disable page, or mock data)
- [ ] **Domain or IP?** (HTTPS requires domain, HTTP works with IP)
- [ ] **Build on Lightsail or push from registry?** (Lightsail simpler for Mode A)
- [ ] **Lyn approves all commands?** (See Section 9 approval gates)

### Estimated Time

- Lightsail prep (Caddy install): 10 minutes
- Code upload: 5 minutes
- Docker build on Lightsail: 10-15 minutes
- Caddy config + start containers: 5 minutes
- Smoke tests: 5 minutes
- **Total:** ~40 minutes (assuming no errors)

### Cost

- Lightsail: $12/month (already provisioned)
- S3 storage: <$1/month (minimal, no backups yet in Mode A)
- **Total Mode A cost:** ~$12-13/month

---

**Status: PREFLIGHT PACKET COMPLETE. Awaiting Hermes/Sonnet review and Lyn approval.** 🎯

---

## 10. CI/CD v0.1 Reconciliation Proof Update

**Date:** 2026-05-23  
**Status:** Added minimal CI preflight guardrail for local and GitHub validation.  
**Scope:** CI only. No auto-deploy, no secrets, no production server access, no SQLite migration.

### Added Guardrail

New workflow:
- `.github/workflows/deployment-preflight.yml`

Trigger:
- `pull_request`
- `push` to `main`

Checks:
1. Checkout repository
2. Setup pnpm from `packageManager` (`pnpm@11.1.3`)
3. Setup Node 20 with pnpm cache
4. Install dependencies with `pnpm install --frozen-lockfile`
5. Run `pnpm lint`
6. Run `pnpm exec tsc --noEmit`
7. Run `pnpm build`

This is intentionally a deployment pain reducer, not an auto-deployment system. It catches package, lint, type, and build failures before release while preserving Lyn/Robert approval gates for real deployment.

### Local Validation Evidence

Local equivalent commands for this CI guardrail:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

Expected result:
- All commands must exit `0`
- No provider calls are required
- No SQLite observability DB is required
- No production server commands are executed

Observed result on 2026-05-23:
- `pnpm install --frozen-lockfile` exited `0`
- `pnpm lint` exited `0` with 3 existing unused-variable warnings
- `pnpm exec tsc --noEmit` exited `0`
- `pnpm build` exited `0` when run outside the Codex sandbox; sandboxed build failed because Turbopack was not permitted to bind an internal port
- Build produced a non-fatal Next.js warning about workspace-root inference and a non-fatal NFT trace warning for the optional observability SQLite import

### Reconciliation Contract Proof

This task is the first practical proof after the observability benchmark evidence decision (`obs-benchmark-arch-001`):

```text
SQLite = raw runtime evidence
KB JSONL / run-log = reviewed benchmark interpretation
Git / artifact path = committed proof anchor
```

For this CI/CD v0.1 task:
- SQLite raw runtime evidence: not used, because no existing optimize-worker observability flow naturally captured this task.
- Runtime evidence: local command output from install/lint/typecheck/build.
- KB reviewed interpretation: benchmark JSONL trace under Robert KB benchmark traces.
- Git/artifact proof anchor: this document and workflow file in the ai-os-profile commit.

### Claim Boundary

Allowed claim:
- "CI/preflight guardrail reduces deployment failure risk by catching build/package/config issues before release."

Not allowed:
- "This proves model cost optimization."
- "This proves deployment is fully automated."
- "This proves production safety."

### Reconciliation Friction

Observed friction:
- SQLite was not a natural capture point for this repo-local CI task, so runtime evidence remains command output plus Git diff.
- GitHub Actions cannot be observed as passing until the commit exists and remote CI runs; local validation is the pre-commit equivalent.
- The KB JSONL trace needs a post-commit commit hash anchor, so the trace must be written after the ai-os-profile commit is created.
