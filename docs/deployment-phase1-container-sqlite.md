# Phase 1 Deployment Guide: Container + SQLite

**Status:** Approved by Lyn (2026-05-22)  
**Target:** Railway / Render / Fly.io  
**Architecture:** ai-os-profile cockpit + SQLite observability store

---

## Prerequisites

1. ✅ Dockerfile created (`ai-os-profile/Dockerfile`)
2. ✅ `.dockerignore` created
3. ✅ `railway.json` created (optional, for Railway)
4. ✅ better-sqlite3 dependency in `package.json`

---

## Deployment Steps

### Option A: Railway

**Step 1: Install Railway CLI**
```bash
npm install -g @railway/cli
railway login
```

**Step 2: Create Railway project**
```bash
cd /Users/apple/projects/ai-os-profile
railway init
```

**Step 3: Add persistent volume**
```bash
railway volume create --mount /data --name observability-data
```

**Step 4: Set environment variables**
```bash
railway variables set DATABASE_PATH=/data/observability.db
railway variables set NODE_ENV=production
```

**Step 5: Deploy**
```bash
railway up
```

**Step 6: Get deployment URL**
```bash
railway domain
```

**Step 7: Seed initial data (optional)**
```bash
# Copy local SQLite to volume
railway run sqlite3 /data/observability.db < seed.sql
```

---

### Option B: Render

**Step 1: Create Render account**
- Visit https://render.com
- Sign up / log in

**Step 2: Create new Web Service**
- Connect GitHub repo: `msararin/ai-os-profile`
- Branch: `main`
- Build command: Docker
- Dockerfile path: `Dockerfile`

**Step 3: Add persistent disk**
- Add disk: `/data` mount path
- Size: 1GB (free tier) or larger

**Step 4: Set environment variables**
```
DATABASE_PATH=/data/observability.db
NODE_ENV=production
```

**Step 5: Deploy**
- Click "Create Web Service"
- Wait for build + deploy

**Step 6: Visit deployment URL**
```
https://aios-observability.onrender.com
```

---

### Option C: Fly.io

**Step 1: Install Fly CLI**
```bash
brew install flyctl
fly auth login
```

**Step 2: Launch app**
```bash
cd /Users/apple/projects/ai-os-profile
fly launch
```

**Step 3: Create volume**
```bash
fly volumes create observability_data --size 1
```

**Step 4: Update fly.toml**
```toml
[mounts]
  source = "observability_data"
  destination = "/data"

[env]
  DATABASE_PATH = "/data/observability.db"
  NODE_ENV = "production"
```

**Step 5: Deploy**
```bash
fly deploy
```

**Step 6: Visit deployment URL**
```bash
fly open
```

---

## Post-Deployment Checklist

### ✅ Verify Dashboard Access

Visit: `https://<deployment-url>/architecture/system-health/observability`

**Expected:**
- Dashboard loads successfully
- All 7 metrics display
- Source labels visible on cost/token numbers
- No blended "Total Cost" tile

### ✅ Verify SQLite Connection

```bash
# Railway
railway run sqlite3 /data/observability.db "SELECT COUNT(*) FROM agent_runs;"

# Render (via shell)
# Open shell from Render dashboard
sqlite3 /data/observability.db "SELECT COUNT(*) FROM agent_runs;"

# Fly.io
fly ssh console
sqlite3 /data/observability.db "SELECT COUNT(*) FROM agent_runs;"
```

### ✅ Verify Volume Persistence

```bash
# Restart container
railway restart  # or Render dashboard restart, or fly restart

# Check data still exists
railway run sqlite3 /data/observability.db "SELECT COUNT(*) FROM agent_runs;"
```

### ✅ Set Up Backup Script

**Daily backup script:**
```bash
#!/bin/bash
# backup-observability.sh

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_PATH="./backups/observability-$TIMESTAMP.db"

# Railway
railway run "sqlite3 /data/observability.db .dump" > $BACKUP_PATH

# Or: Render shell
# sqlite3 /data/observability.db ".backup /tmp/backup.db"
# download via SFTP

# Or: Fly.io
# fly ssh console -C "sqlite3 /data/observability.db .dump" > $BACKUP_PATH

echo "Backup saved to $BACKUP_PATH"
```

**Schedule via cron:**
```bash
crontab -e
# Add:
0 2 * * * /path/to/backup-observability.sh
```

---

## Security Setup

### Option 1: HTTP Basic Auth (Simple)

**Add middleware to ai-os-profile:**

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  
  if (request.nextUrl.pathname.startsWith('/architecture/system-health/observability')) {
    if (!authHeader) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Observability"' }
      })
    }

    const [user, password] = Buffer.from(authHeader.split(' ')[1], 'base64')
      .toString()
      .split(':')

    if (user !== process.env.DASHBOARD_USER || password !== process.env.DASHBOARD_PASSWORD) {
      return new NextResponse('Invalid credentials', { status: 401 })
    }
  }

  return NextResponse.next()
}
```

**Set environment variables:**
```bash
railway variables set DASHBOARD_USER=lyn
railway variables set DASHBOARD_PASSWORD=<secure-password>
```

### Option 2: IP Allowlist (Network-Level)

**Railway:**
- Use Cloudflare Access or similar
- Or: deploy on private network

**Render:**
- Use IP allowlist feature (paid tier)

**Fly.io:**
- Use `fly.toml` to restrict access

---

## Monitoring

### Railway
```bash
railway logs
railway status
```

### Render
- View logs in dashboard
- Set up health check alerts

### Fly.io
```bash
fly logs
fly status
fly dashboard
```

---

## Troubleshooting

### Issue: better-sqlite3 build fails

**Symptom:** Docker build fails at `npm ci`

**Solution:**
```dockerfile
# Ensure build tools installed
RUN apk add --no-cache python3 make g++
```

### Issue: SQLite file not persisting

**Symptom:** Data lost after container restart

**Solution:**
- Verify volume mounted at `/data`
- Check `DATABASE_PATH=/data/observability.db` env var
- Ensure write permissions: `chmod 777 /data` (or better: proper user ownership)

### Issue: Dashboard shows 0 traces

**Symptom:** All metrics show "No data"

**Solution:**
- Check optimize-worker is writing to same DB path
- OR: Seed synthetic data for testing
- OR: Copy local SQLite to volume

---

## Migration Path: Local → Container

**Current:** optimize-worker writes to local SQLite  
**Target:** optimize-worker writes to remote container SQLite

**Option A: Direct write (if network accessible)**
```bash
# Update optimize-worker DATABASE_URL
export DATABASE_URL=https://<deployment-url>/data/observability.db
```

**Option B: Periodic sync**
```bash
# Sync local SQLite → remote
rsync -avz ./observability.db railway:/data/observability.db
```

**Option C: API endpoint**
```bash
# optimize-worker POSTs traces to API endpoint
# API endpoint writes to local SQLite in container
```

---

## Cost Estimate

### Railway
- Free tier: $5 credit/month
- Pro: $5 base + usage ($0.000463/GB-hour for disk)
- Estimate: ~$10-15/month for 1GB disk + 1 instance

### Render
- Free tier: limited (sleeps after 15min inactivity)
- Starter: $7/month + $1/GB disk
- Estimate: ~$8-10/month

### Fly.io
- Free tier: 3 VMs + 3GB disk
- Paid: $1.94/month per VM + $0.15/GB disk
- Estimate: ~$5-10/month

---

## Next Steps

1. ✅ Choose deployment platform (Railway / Render / Fly.io)
2. ⏳ Deploy container + volume
3. ⏳ Verify dashboard access
4. ⏳ Set up backup script
5. ⏳ Configure auth (HTTP Basic or IP allowlist)
6. ⏳ Update optimize-worker to write to remote DB
7. ⏳ Document access URL and credentials for Lyn

---

## Support

**Railway:** https://railway.app/discord  
**Render:** https://render.com/docs  
**Fly.io:** https://fly.io/docs
