"use client"

import { useState, useEffect } from "react"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown, RefreshCw, Info } from "lucide-react"

// Types
type AgentRun = {
  trace_id: string
  task_id: string
  status: string
  failure_mode: string | null
  next_action: string | null
  worker: string
  created_at: string
}

type StatusCount = {
  status: string
  count: number
}

type FailureMode = {
  failure_mode: string
  count: number
}

type NextAction = {
  next_action: string
  count: number
}

type SourceCount = {
  [key: string]: number
}

type DelegationChain = {
  parent_trace: string
  parent_worker: string
  child_trace: string
  child_worker: string
  child_status: string
}

type CostCoverage = {
  cost_source: string
  trace_count: number
  with_cost_value: number
  sum_cost: number
}

type WorkerStatus = {
  worker: string
  status: string
  count: number
}

// API endpoint base (adjust for your setup)
const API_BASE = "/api/observability"

export default function ObservabilityPage() {
  const [timeWindow, setTimeWindow] = useState("24h")
  const [loading, setLoading] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)

  // Data states
  const [statusData, setStatusData] = useState<StatusCount[]>([])
  const [failureModes, setFailureModes] = useState<FailureMode[]>([])
  const [nextActions, setNextActions] = useState<NextAction[]>([])
  const [recentTraces, setRecentTraces] = useState<AgentRun[]>([])
  const [delegationChains, setDelegationChains] = useState<DelegationChain[]>([])
  const [tokenSources, setTokenSources] = useState<SourceCount>({})
  const [costSources, setCostSources] = useState<SourceCount>({})
  const [benchmarkValidity, setBenchmarkValidity] = useState<SourceCount>({})
  const [costCoverage, setCostCoverage] = useState<CostCoverage[]>([])
  const [workerStatus, setWorkerStatus] = useState<WorkerStatus[]>([])

  // Collapsible states
  const [delegationOpen, setDelegationOpen] = useState(false)
  const [workerOpen, setWorkerOpen] = useState(false)
  const [tracesOpen, setTracesOpen] = useState(false)
  const [costOpen, setCostOpen] = useState(false)

  const refreshData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/observability?timeWindow=${timeWindow}`)
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}`)
      }
      
      const data = await response.json()
      
      // Update all data states
      setStatusData(data.statusData || [])
      setFailureModes(data.failureModes || [])
      setNextActions(data.nextActions || [])
      setRecentTraces(data.recentTraces || [])
      setDelegationChains(data.delegationChains || [])
      setTokenSources(data.tokenSources || {})
      setCostSources(data.costSources || {})
      setBenchmarkValidity(data.benchmarkValidity || {})
      setCostCoverage(data.costCoverage || [])
      setWorkerStatus(data.workerStatus || [])
      
      setLastRefresh(new Date())
    } catch (error) {
      console.error("Failed to refresh data:", error)
      // Keep existing data on error, show last refresh time
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshData()
  }, [timeWindow])

  const timeWindowMap: Record<string, string> = {
    "1h": "Last Hour",
    "24h": "Last 24 Hours",
    "7d": "Last 7 Days",
    "all": "All Time",
  }

  return (
    <PageLayout>
      {/* Header */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                📊 Observability Panel v0.1
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Governance-First Metrics | Source-Label Discipline | Read-Only
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={timeWindow} onValueChange={setTimeWindow}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(timeWindowMap).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={refreshData}
                disabled={loading}
                size="sm"
                variant="outline"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>
          {lastRefresh && (
            <p className="mt-2 text-xs text-muted-foreground">
              Last refresh: {lastRefresh.toLocaleTimeString()}
            </p>
          )}
        </div>
      </section>

      {/* Status Banner */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>Observability v0.1 Status:</strong>
              <ul className="mt-1 ml-4 list-disc space-y-1">
                <li>✅ Local model traces proven (Ollama)</li>
                <li>⚠️ Remote paid provider cost capture not proven yet</li>
                <li>⚠️ Currently includes synthetic test traces (trace-example-*)</li>
                <li>📍 Data source: optimize-worker SQLite observability store</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* METRIC 1: Source-Label Integrity (MOVED TO TOP) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>1️⃣ Source-Label Integrity Summary</span>
                <Badge variant="outline">Data Quality Trust Signal</Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Shows provenance of all metrics — verify data quality before interpreting numbers
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <h4 className="font-medium mb-3">Token Source</h4>
                  <div className="space-y-2">
                    {Object.entries(tokenSources).length > 0 ? (
                      Object.entries(tokenSources).map(([source, count]) => (
                        <div key={source} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{source}</span>
                          <span className="font-medium">{count}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No data available</p>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Cost Source</h4>
                  <div className="space-y-2">
                    {Object.entries(costSources).length > 0 ? (
                      Object.entries(costSources).map(([source, count]) => (
                        <div key={source} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{source}</span>
                          <span className="font-medium">{count}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No data available</p>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Benchmark Validity</h4>
                  <div className="space-y-2">
                    {Object.entries(benchmarkValidity).length > 0 ? (
                      Object.entries(benchmarkValidity).map(([validity, count]) => (
                        <div key={validity} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{validity}</span>
                          <span className="font-medium">{count}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No data available</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* METRIC 2: Failure Rate */}
          <Card>
            <CardHeader>
              <CardTitle>2️⃣ Failure Rate + Failure Mode Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-3">Success vs Failed</h4>
                  <div className="space-y-2">
                    {statusData.length > 0 ? (
                      statusData.map((item) => (
                        <div key={item.status} className="flex items-center justify-between">
                          <Badge variant={item.status === "failed" ? "destructive" : "default"}>
                            {item.status.toUpperCase()}
                          </Badge>
                          <span className="text-2xl font-semibold">{item.count}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No traces in selected time window</p>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Top 5 Failure Modes</h4>
                  <div className="space-y-2">
                    {failureModes.length > 0 ? (
                      failureModes.map((item) => (
                        <div key={item.failure_mode} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{item.failure_mode || "N/A"}</span>
                          <span className="font-medium">{item.count}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No failures in selected time window</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* METRIC 3: Recovery Actions */}
          <Card>
            <CardHeader>
              <CardTitle>3️⃣ Failed → next_action Distribution</CardTitle>
              <p className="text-sm text-muted-foreground">Recovery discipline visibility</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {nextActions.length > 0 ? (
                  nextActions.map((item) => (
                    <div key={item.next_action} className="flex justify-between items-center p-2 rounded bg-muted/50">
                      <span className="text-sm">{item.next_action || "none_specified"}</span>
                      <Badge>{item.count} traces</Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No failed traces with next_action in selected time window</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* METRIC 4: Delegation Chains (Collapsible) */}
          <Collapsible open={delegationOpen} onOpenChange={setDelegationOpen}>
            <Card>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardTitle className="flex items-center justify-between">
                    <span>4️⃣ Delegation Chain View</span>
                    <ChevronDown className={`h-5 w-5 transition-transform ${delegationOpen ? "rotate-180" : ""}`} />
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  {delegationChains.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="border-b">
                          <tr className="text-left">
                            <th className="pb-2 font-medium">Parent Trace</th>
                            <th className="pb-2 font-medium">Parent Worker</th>
                            <th className="pb-2 font-medium">Child Trace</th>
                            <th className="pb-2 font-medium">Child Worker</th>
                            <th className="pb-2 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {delegationChains.map((chain, idx) => (
                            <tr key={idx} className="border-b last:border-0">
                              <td className="py-2 font-mono text-xs">{chain.parent_trace}</td>
                              <td className="py-2">{chain.parent_worker}</td>
                              <td className="py-2 font-mono text-xs">{chain.child_trace}</td>
                              <td className="py-2">{chain.child_worker}</td>
                              <td className="py-2">
                                <Badge variant={chain.child_status === "failed" ? "destructive" : "default"}>
                                  {chain.child_status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No delegation chains found</p>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* METRIC 5: Worker Status (Collapsible) */}
          <Collapsible open={workerOpen} onOpenChange={setWorkerOpen}>
            <Card>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardTitle className="flex items-center justify-between">
                    <span>5️⃣ Traces by Worker + Status</span>
                    <ChevronDown className={`h-5 w-5 transition-transform ${workerOpen ? "rotate-180" : ""}`} />
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  {workerStatus.length > 0 ? (
                    <div className="space-y-3">
                      {Array.from(new Set(workerStatus.map(w => w.worker))).map(worker => {
                        const workerData = workerStatus.filter(w => w.worker === worker)
                        return (
                          <div key={worker} className="p-3 rounded bg-muted/50">
                            <div className="font-medium mb-2">{worker}</div>
                            <div className="flex gap-3 text-sm">
                              {workerData.map(data => (
                                <span key={data.status}>
                                  {data.status}: <strong>{data.count}</strong>
                                </span>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No worker data in selected time window</p>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* METRIC 6: Recent Traces (Collapsible, Synthetic Filtered) */}
          <Collapsible open={tracesOpen} onOpenChange={setTracesOpen}>
            <Card>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardTitle className="flex items-center justify-between">
                    <span>6️⃣ Recent Failed/Delegated Traces</span>
                    <ChevronDown className={`h-5 w-5 transition-transform ${tracesOpen ? "rotate-180" : ""}`} />
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Synthetic test traces (trace-example-*) filtered out
                  </p>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  {recentTraces.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="border-b">
                          <tr className="text-left">
                            <th className="pb-2 font-medium">Trace ID</th>
                            <th className="pb-2 font-medium">Task ID</th>
                            <th className="pb-2 font-medium">Status</th>
                            <th className="pb-2 font-medium">Failure Mode</th>
                            <th className="pb-2 font-medium">Next Action</th>
                            <th className="pb-2 font-medium">Worker</th>
                            <th className="pb-2 font-medium">Created</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentTraces.map((trace) => (
                            <tr key={trace.trace_id} className="border-b last:border-0">
                              <td className="py-2 font-mono text-xs">{trace.trace_id}</td>
                              <td className="py-2">{trace.task_id}</td>
                              <td className="py-2">
                                <Badge variant={trace.status === "failed" ? "destructive" : "default"}>
                                  {trace.status}
                                </Badge>
                              </td>
                              <td className="py-2 text-muted-foreground">{trace.failure_mode || "-"}</td>
                              <td className="py-2 text-muted-foreground">{trace.next_action || "-"}</td>
                              <td className="py-2">{trace.worker}</td>
                              <td className="py-2 text-muted-foreground">{trace.created_at}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No failed or delegated traces found</p>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* METRIC 7: Cost Coverage (Collapsible) */}
          <Collapsible open={costOpen} onOpenChange={setCostOpen}>
            <Card>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardTitle className="flex items-center justify-between">
                    <span>7️⃣ Cost Coverage Breakdown</span>
                    <ChevronDown className={`h-5 w-5 transition-transform ${costOpen ? "rotate-180" : ""}`} />
                  </CardTitle>
                  <p className="text-sm text-destructive mt-1">
                    ⚠️ Shows COVERAGE (trace counts by source), NOT blended total cost
                  </p>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="space-y-2">
                    {costCoverage.length > 0 ? (
                      costCoverage.map((item) => (
                        <div key={item.cost_source} className="p-3 rounded bg-muted/50">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-medium">{item.cost_source}</span>
                              <p className="text-sm text-muted-foreground mt-1">
                                {item.trace_count} traces
                                {item.with_cost_value > 0 && (
                                  <> ({item.with_cost_value} with cost data: <strong>${item.sum_cost.toFixed(4)}</strong> from {item.cost_source})</>
                                )}
                                {item.with_cost_value === 0 && <> (no cost data)</>}
                              </p>
                            </div>
                            <Badge>{item.trace_count}</Badge>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No cost data available</p>
                    )}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

        </div>
      </section>

      {/* Footer */}
      <section className="border-t border-border bg-muted/30 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-muted-foreground">
            AIOS Observability Panel v0.1 | Governance-First | Source-Label Discipline Enforced
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Database: optimize-worker/observability/aios_observability.sqlite
          </p>
        </div>
      </section>
    </PageLayout>
  )
}
