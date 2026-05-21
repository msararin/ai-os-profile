import { NextRequest, NextResponse } from "next/server"
import { join } from "path"

// Path to optimize-worker SQLite DB
const DB_PATH = join(
  process.env.OPTIMIZE_WORKER_PATH || "/Users/apple/projects/optimize-worker",
  "observability/aios_observability.sqlite"
)

type TimeWindow = "1h" | "24h" | "7d" | "all"

const TIME_WINDOW_SQL: Record<TimeWindow, string> = {
  "1h": "datetime('now', '-1 hour')",
  "24h": "datetime('now', '-24 hours')",
  "7d": "datetime('now', '-7 days')",
  "all": "datetime('1970-01-01')",
}

export async function GET(request: NextRequest) {
  try {
    // Dynamic import to handle missing better-sqlite3
    let Database
    try {
      const betterSqlite3 = await import("better-sqlite3")
      Database = betterSqlite3.default
    } catch (importError) {
      return NextResponse.json(
        { 
          error: "SQLite driver not installed. Run: npm install better-sqlite3 @types/better-sqlite3",
          fallback: "Use standalone Streamlit dashboard: cd optimize-worker && streamlit run observability/dashboard.py"
        },
        { status: 503 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const timeWindow = (searchParams.get("timeWindow") || "24h") as TimeWindow
    const timeFilter = TIME_WINDOW_SQL[timeWindow] || TIME_WINDOW_SQL["24h"]

    const db = new Database(DB_PATH, { readonly: true })

    // 1. Status counts
    const statusData = db
      .prepare(
        `
      SELECT status, COUNT(*) as count
      FROM agent_runs
      WHERE created_at >= ${timeFilter}
      GROUP BY status
      ORDER BY count DESC
    `
      )
      .all()

    // 2. Failure modes
    const failureModes = db
      .prepare(
        `
      SELECT COALESCE(failure_mode, 'N/A') as failure_mode, COUNT(*) as count
      FROM agent_runs
      WHERE status = 'failed' AND created_at >= ${timeFilter}
      GROUP BY failure_mode
      ORDER BY count DESC
      LIMIT 5
    `
      )
      .all()

    // 3. Next actions
    const nextActions = db
      .prepare(
        `
      SELECT COALESCE(next_action, 'none_specified') as next_action, COUNT(*) as count
      FROM agent_runs
      WHERE status = 'failed' AND created_at >= ${timeFilter}
      GROUP BY next_action
      ORDER BY count DESC
    `
      )
      .all()

    // 4. Recent traces (filtered, no synthetic)
    const recentTraces = db
      .prepare(
        `
      SELECT trace_id, task_id, status, failure_mode, next_action, worker, created_at
      FROM agent_runs
      WHERE (status = 'failed' OR parent_trace_id IS NOT NULL)
        AND trace_id NOT LIKE 'trace-example-%'
      ORDER BY created_at DESC
      LIMIT 20
    `
      )
      .all()

    // 5. Delegation chains
    const delegationChains = db
      .prepare(
        `
      SELECT 
        p.trace_id as parent_trace,
        p.worker as parent_worker,
        c.trace_id as child_trace,
        c.worker as child_worker,
        c.status as child_status
      FROM agent_runs p
      JOIN agent_runs c ON c.parent_trace_id = p.trace_id
      ORDER BY p.created_at DESC
      LIMIT 20
    `
      )
      .all()

    // 6. Source labels
    const tokenSources = db
      .prepare(
        `
      SELECT token_source, COUNT(*) as count
      FROM agent_runs
      GROUP BY token_source
      ORDER BY count DESC
    `
      )
      .all()

    const costSources = db
      .prepare(
        `
      SELECT cost_source, COUNT(*) as count
      FROM agent_runs
      GROUP BY cost_source
      ORDER BY count DESC
    `
      )
      .all()

    const benchmarkValidity = db
      .prepare(
        `
      SELECT benchmark_validity, COUNT(*) as count
      FROM agent_runs
      GROUP BY benchmark_validity
      ORDER BY count DESC
    `
      )
      .all()

    // 7. Cost coverage
    const costCoverage = db
      .prepare(
        `
      SELECT 
        cost_source,
        COUNT(*) as trace_count,
        SUM(CASE WHEN cost_usd IS NOT NULL THEN 1 ELSE 0 END) as with_cost_value,
        SUM(COALESCE(cost_usd, 0)) as sum_cost
      FROM agent_runs
      GROUP BY cost_source
      ORDER BY trace_count DESC
    `
      )
      .all()

    // 8. Worker status
    const workerStatus = db
      .prepare(
        `
      SELECT worker, status, COUNT(*) as count
      FROM agent_runs
      WHERE created_at >= ${timeFilter}
      GROUP BY worker, status
      ORDER BY worker, status
    `
      )
      .all()

    db.close()

    // Transform source data into key-value objects
    const tokenSourcesObj = Object.fromEntries(
      tokenSources.map((row: any) => [row.token_source, row.count])
    )
    const costSourcesObj = Object.fromEntries(
      costSources.map((row: any) => [row.cost_source, row.count])
    )
    const benchmarkValidityObj = Object.fromEntries(
      benchmarkValidity.map((row: any) => [row.benchmark_validity, row.count])
    )

    return NextResponse.json({
      statusData,
      failureModes,
      nextActions,
      recentTraces,
      delegationChains,
      tokenSources: tokenSourcesObj,
      costSources: costSourcesObj,
      benchmarkValidity: benchmarkValidityObj,
      costCoverage,
      workerStatus,
    })
  } catch (error) {
    console.error("Observability API error:", error)
    return NextResponse.json(
      { 
        error: "Failed to fetch observability data",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}
