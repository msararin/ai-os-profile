import { PageLayout } from "@/components/page-layout"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type MetricRow = {
  metric: string
  numerator: string
  denominator: string
  percentage: string
  source: string
  confidence: string
  decisionValue: string
}

const metrics: MetricRow[] = [
  {
    metric: "Join completeness",
    numerator: "0 new records with required join keys",
    denominator: "3 new records in the P1 scope",
    percentage: "0%",
    source: "P1.1 metrics + blocker matrix",
    confidence: "High",
    decisionValue: "Comparison stays blocked until joinability exists.",
  },
  {
    metric: "Routing metadata coverage",
    numerator: "0 new records with routing_decision + routing_reason",
    denominator: "3 new records in the P1 scope",
    percentage: "0%",
    source: "P1.1 blocker refresh",
    confidence: "High",
    decisionValue: "Routing evidence remains incomplete and comparison stays blocked.",
  },
  {
    metric: "Usage / cost provenance coverage",
    numerator: "0 records with explicit usage and cost provenance",
    denominator: "3 records where model usage is applicable",
    percentage: "0%",
    source: "Receipt schema + runner telemetry",
    confidence: "High",
    decisionValue: "Cost/value comparison stays blocked until provenance is explicit.",
  },
  {
    metric: "Validation artifact coverage",
    numerator: "1 clearly applicable record with validation artifact ref",
    denominator: "2 records requiring validation",
    percentage: "50%",
    source: "Validation summaries + receipt refs",
    confidence: "Medium",
    decisionValue: "Blocked states can be shown, but comparison is not ready.",
  },
  {
    metric: "Decision metadata coverage",
    numerator: "0 new records with business_question + owner_role + exactly one decision field",
    denominator: "3 new records in the P1 scope",
    percentage: "0%",
    source: "Task spec + receipt context",
    confidence: "High",
    decisionValue: "Decision mapping remains blocked until each record carries one clear outcome.",
  },
]

const blockedDecisions = [
  {
    title: "Operational comparison",
    detail: "Blocked. The new-record cohort is still missing join keys, routing metadata, and decision metadata.",
    owner: "Data Evidence / Routing",
    next: "Keep future records on the minimal task spec and enforce joinable receipts.",
  },
  {
    title: "Benchmark claim",
    detail: "Blocked. This surface is evidence readiness only and does not prove model superiority or ROI.",
    owner: "Lyn / Robert(GPT) review gate",
    next: "Keep the claim boundary fixed to readiness and missingness.",
  },
  {
    title: "Provider comparison",
    detail: "Blocked. OpenRouter profile vs later Codex receipts remains a future candidate only.",
    owner: "Routing policy",
    next: "Collect future records with explicit routing and provenance fields first.",
  },
  {
    title: "Live observability",
    detail: "Blocked. This page is a static snapshot, not a runtime telemetry surface.",
    owner: "AIOS public surface",
    next: "Keep the refresh cadence manual and snapshot-based.",
  },
]

const evidencePoints = [
  "The page shows what exists, what is missing, and what decision is blocked.",
  "The page is static and public-safe; it does not fetch live data.",
  "The page uses a narrow new-record cohort and excludes legacy / non-joinable rows by construction.",
  "The page keeps comparison readiness separate from publish readiness.",
]

const nonClaims = [
  "No benchmark proof.",
  "No provider superiority claim.",
  "No cost-saving claim.",
  "No routing correctness claim.",
  "No decision-quality claim.",
  "No live observability claim.",
]

export default function EvidenceReadinessPage() {
  return (
    <PageLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">Static snapshot</Badge>
            <Badge variant="outline">Public-safe</Badge>
            <Badge variant="outline">Comparison blocked</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Evidence Readiness Dashboard
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            A snapshot-based evidence surface that shows readiness, missingness,
            blocked decisions, and the next unblock action without implying
            benchmark results or live monitoring.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Evidence status
                </p>
                <p className="mt-1 text-lg font-semibold text-foreground">
                  Evidence Readiness layer operational / comparison blocked
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Source of truth: Robert(GPT) KB + Git. Refresh cadence: manual
                  snapshot only.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="pt-6">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Cohort boundary
                </p>
                <p className="mt-1 text-lg font-semibold text-foreground">
                  Narrow new-record cohort
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Legacy rows and non-joinable historical exceptions are
                  excluded by construction.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
          <Alert>
            <AlertDescription className="text-sm">
              <strong>Claim boundary:</strong> this page shows evidence readiness
              and missingness only. It does not claim benchmark readiness, live
              observability, provider comparison, cost savings, routing
              correctness, or decision quality.
            </AlertDescription>
          </Alert>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>What this proves</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {evidencePoints.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What this does not prove</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {nonClaims.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-muted-foreground" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Snapshot Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                As-of timestamp: <span className="font-medium text-foreground">2026-06-03</span>
              </p>
              <p>
                Refresh cadence: <span className="font-medium text-foreground">manual release snapshot only</span>
              </p>
              <p>
                Exclusions: legacy rows, non-joinable records, raw receipts,
                and any data outside the narrow evidence cohort.
              </p>
              <p>
                Future comparison candidate: OpenRouter profile vs later Codex
                receipts, but only after the evidence cohort becomes joinable.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Latest Evidence Readiness Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                The readout now separates historical telemetry from comparison-ready evidence.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Completed:</p>
                <ul className="space-y-1.5 pl-4">
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span>Schema v0.7 implemented and frozen</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span>JSONL readout tool created and working</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span>Historical Codex receipts reclassified as semi_structured backfill records</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span>3 historical receipts excluded from comparison by design</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span>No usage or cost data was invented</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span>Comparison remains blocked until future records meet evidence contract</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Current value:</p>
                <ul className="space-y-1.5 pl-4">
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-muted-foreground" />
                    <span>Telemetry is no longer treated as automatically usable</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-muted-foreground" />
                    <span>Historical records clearly separated from future evidence cohorts</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-muted-foreground" />
                    <span>Missingness is visible instead of hidden</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-muted-foreground" />
                    <span>Fake completeness is prevented</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Metric Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Total receipts</p>
                    <p className="mt-1 text-2xl font-semibold text-foreground">3</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Dashboard-grade</p>
                    <p className="mt-1 text-2xl font-semibold text-foreground">0</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Blocked state</p>
                    <p className="mt-1 text-2xl font-semibold text-foreground">0</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Excluded</p>
                    <p className="mt-1 text-2xl font-semibold text-foreground">3</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Comparison-ready</p>
                    <p className="mt-1 text-2xl font-semibold text-foreground">0</p>
                  </div>
                </div>
                <div className="rounded-lg border border-border bg-muted/20 p-4">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Top blocker</p>
                  <p className="mt-1 text-sm text-foreground">
                    Historical/semi_structured backfill records are not comparison candidates
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[960px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                      <th className="py-3 pr-4">Metric</th>
                      <th className="py-3 pr-4">Numerator</th>
                      <th className="py-3 pr-4">Denominator</th>
                      <th className="py-3 pr-4">%</th>
                      <th className="py-3 pr-4">Source</th>
                      <th className="py-3 pr-4">Confidence</th>
                      <th className="py-3 pr-4">Decision value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.map((row) => (
                      <tr key={row.metric} className="border-b border-border/60 align-top last:border-b-0">
                        <td className="py-4 pr-4 font-medium text-foreground">{row.metric}</td>
                        <td className="py-4 pr-4 text-muted-foreground">{row.numerator}</td>
                        <td className="py-4 pr-4 text-muted-foreground">{row.denominator}</td>
                        <td className="py-4 pr-4 text-foreground">{row.percentage}</td>
                        <td className="py-4 pr-4 text-muted-foreground">{row.source}</td>
                        <td className="py-4 pr-4 text-muted-foreground">{row.confidence}</td>
                        <td className="py-4 pr-4 text-muted-foreground">{row.decisionValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Evidence Missing</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>Join keys are still missing on the new-record cohort.</li>
                  <li>Routing metadata is still incomplete on the new-record cohort.</li>
                  <li>Usage / cost provenance is still incomplete on applicable records.</li>
                  <li>Decision metadata still needs one clear outcome per record.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Evidence Present</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>Blocked states are visible instead of being hidden.</li>
                  <li>Validation artifacts are explicitly referenced where applicable.</li>
                  <li>Future records can be classified as dashboard-grade, blocked, or excluded.</li>
                  <li>The page keeps publish readiness separate from comparison readiness.</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Blocked Decisions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {blockedDecisions.map((item) => (
                <div key={item.title} className="rounded-lg border border-border bg-muted/20 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                    </div>
                    <Badge variant="outline">{item.owner}</Badge>
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">
                    Next unblock action
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.next}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Owner / Next Unblock</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Owner: Data Evidence / Routing. The next unblock is to keep
                  future tasks on the minimal task spec and carry the join
                  keys, routing metadata, provenance, validation, and decision
                  metadata through to the receipt.
                </p>
                <p>
                  Review gate: Robert(GPT) / Opus boundary review for any public
                  claim, then Lyn for final strategic approval.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Claim Boundary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  This surface is intentionally narrow. It is a public-safe
                  evidence discipline snapshot, not a live monitoring system.
                </p>
                <p>
                  Keep the dashboard static, keep the cohort narrow, and keep
                  the comparison path blocked until evidence quality is strong
                  enough to justify it.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
