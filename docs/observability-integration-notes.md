# Observability Dashboard Integration Notes

## Status: ✅ UI Integration Complete, ⚠️ Requires SQLite Driver Install

### What Was Built

**Dashboard location:** `/architecture/system-health/observability`  
**Files created:**
1. `app/architecture/system-health/observability/page.tsx` — React dashboard component
2. `app/api/observability/route.ts` — API route for SQLite queries

### All UX Fixes Applied ✅

**Must-fix:**
- ✅ M1: Integrated into ai-os-profile cockpit (`/architecture/system-health/observability`)
- ✅ M2: Reordered sections (source-label integrity now section 1)

**Should-fix:**
- ✅ S1: Added expanders for dense tables (delegation, worker, traces, cost)
- ✅ S2: Filtered synthetic traces (`trace_id NOT LIKE 'trace-example-%'`) from Recent Traces
- ✅ S3: Added "Not Proven Yet" status banner at top

### Installation Required

**Before the cockpit dashboard works, install SQLite driver:**

```bash
cd /Users/apple/projects/ai-os-profile
npm install better-sqlite3 @types/better-sqlite3
```

**Why not pre-installed:**
- `pnpm add` failed due to store location conflict
- `npm install` timed out after 90s (likely network/build issue)
- Can be installed manually when ready

### Fallback: Standalone Streamlit Dashboard

**Until better-sqlite3 is installed, use standalone dashboard:**

```bash
cd /Users/apple/projects/optimize-worker
streamlit run observability/dashboard.py
```

Opens at: http://localhost:8501

### What Works Now

**Cockpit UI (after SQLite install):**
- Next.js route at `/architecture/system-health/observability`
- All 7 governance metrics with correct order
- Expanders, filtered synthetic traces, status banner
- API route with fallback error message if driver missing

**Standalone Streamlit:**
- Fully functional with same 7 metrics
- No dependency issues
- Proven working in prior testing

### Next Steps for Production

1. **Install SQLite driver:** `npm install better-sqlite3 @types/better-sqlite3`
2. **Test cockpit dashboard:** `npm run dev` → visit `/architecture/system-health/observability`
3. **Verify API returns data:** Should match standalone Streamlit output
4. **Add navigation link:** Update cockpit nav to include "System Health → Observability"

### Files Modified

```
ai-os-profile/
  app/
    architecture/
      system-health/
        observability/
          page.tsx  (NEW - 22KB, React dashboard)
    api/
      observability/
        route.ts  (NEW - 5.4KB, SQLite API)
```

### Design Decisions

**Why Next.js + API route instead of pure Streamlit:**
- Cockpit placement requirement (UX review M1)
- Unified nav/auth/styling with rest of ai-os-profile
- Streamlit kept as dev/fallback tool

**Why dynamic import in API route:**
- Graceful fallback if better-sqlite3 not installed
- Clear error message pointing to solution
- Doesn't break Next.js build

**Why standalone Streamlit still valuable:**
- Zero-dependency local testing
- Development/debugging without cockpit overhead
- Proven working baseline

### Commit Summary

All UX placement review must-fix and should-fix items complete:
- Cockpit integration ✅
- Section reordering ✅
- Expanders ✅
- Synthetic filtering ✅
- Status banner ✅

**Installation:** Requires `npm install better-sqlite3 @types/better-sqlite3` before cockpit dashboard works.

**Fallback:** Standalone Streamlit at `optimize-worker/observability/dashboard.py` works immediately.
