import { redirect } from "next/navigation"
import {
  AlertTriangle,
  BarChart3,
  Database,
  FileText,
  GitBranch,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react"

import { auth, isAllowedInternalEmail } from "@/auth"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getInternalTelemetryDashboardData } from "@/lib/telemetry-ledger/query"

export const dynamic = "force-dynamic"

function SourceBadge({ label }: { label: string }) {
  const variant = label === "LOW_CONFIDENCE_ADVISORY" ? "destructive" : "outline"

  return (
    <Badge variant={variant} className="whitespace-nowrap">
      {label}
    </Badge>
  )
}

function MetricList({
  rows,
  valuePrefix = "",
}: {
  rows: Array<{ label: string; value: number; detail?: string; dataSourceType?: string }>
  valuePrefix?: string
}) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted-foreground">No rows found in the staging query.</p>
  }

  const maxValue = Math.max(...rows.map((row) => row.value), 1)

  return (
    <div className="space-y-3">
      {rows.map((row) => (
        <div key={`${row.label}-${row.detail ?? ""}`} className="space-y-1.5">
          <div className="flex items-start justify-between gap-4 text-sm">
            <span className="min-w-0 break-words text-muted-foreground">{row.label}</span>
            <span className="shrink-0 font-mono text-foreground">
              {valuePrefix}
              {row.value.toLocaleString("en-US")}
            </span>
          </div>
          <SourceBadge label={row.dataSourceType ?? "FIELD_NOT_EXPOSED_NOT_CLAIMED"} />
          <div className="h-2 rounded bg-muted">
            <div
              className="h-2 rounded bg-primary"
              style={{ width: `${Math.max((row.value / maxValue) * 100, 4)}%` }}
            />
          </div>
          {row.detail ? <p className="text-xs text-muted-foreground">{row.detail}</p> : null}
        </div>
      ))}
    </div>
  )
}

const ownerInsightMetrics = [
  {
    value: "69,881",
    label: "Historical local-candidate occurrence aggregate",
    meaning: "Sum of all missing-field occurrences across 2,297 local candidate rows inserted on 2026-07-01.",
    decision: "Use only to understand the historical breadth of candidate-field incompleteness.",
    boundary: "Local candidate evidence, not a record count, live value, or production completeness measure.",
  },
  {
    value: "26,957",
    label: "Historical export-limited top-12 subtotal",
    meaning: "Reproduced sum of the top 12 warning-label occurrences in the local candidate source.",
    decision: "Use only as source-limited historical context for this exact selected warning set.",
    boundary: "Not a production total, live value, or verified missing-record count.",
  },
  {
    value: "18,019",
    label: "Not-claimable preserved investigation target",
    meaning: "A preserved governance/claim value that the recovered source packet could not reproduce from approved evidence.",
    decision: "Use only to track the unresolved evidence gap and required source-proof work.",
    boundary: "NOT_CLAIMABLE_FROM_AVAILABLE_EVIDENCE; not a verified subtotal, partition, residual bucket, or value to add to/subtract from the other figures.",
  },
  {
    value: "delta 2",
    label: "Unresolved historical lineage mismatch",
    meaning: "Difference between preserved 26,959 and reproduced export-limited 26,957.",
    decision: "Blocks final verification until lineage is reconciled.",
    boundary: "Not resolved and not safe to ignore just because numerically small.",
  },
]

export default async function InternalTelemetryPage() {
  const session = await auth()
  const email = session?.user?.email

  if (!email || !isAllowedInternalEmail(email)) {
    redirect("/api/auth/signin?callbackUrl=/internal/telemetry")
  }

  const data = getInternalTelemetryDashboardData()

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="gap-2">
                  <ShieldCheck className="size-3.5" />
                  Owner internal
                </Badge>
                <Badge variant="outline">LOCAL QUERY CANDIDATE</Badge>
                <Badge variant="outline">READ-ONLY SQLITE</Badge>
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                  Internal Telemetry
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                  Task-role-evidence-governance view over local staging records. This page is not
                  production proof and does not claim telemetry verification.
                </p>
              </div>
            </div>
            <div className="rounded-lg border bg-card px-4 py-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 font-medium text-foreground">
                <LockKeyhole className="size-4" />
                Access boundary
              </div>
              <p className="mt-1">Protected by the existing /internal/* auth route.</p>
            </div>
          </div>

          <div className="rounded-lg border border-amber-300/70 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:bg-amber-950/20 dark:text-amber-100">
            <div className="font-semibold">STAGING_CANDIDATE - local internal dashboard query candidate</div>
            <p className="mt-1">
              SNAPSHOT REVIEW ONLY — all figures are historical occurrence counts from the
              2026-07-01 candidate analysis, not live production metrics. This view is not
              telemetry verification, production proof, or a public dashboard.
            </p>
          </div>

          {data.ledgerUnavailableReason ? (
            <div className="rounded-lg border border-red-300/70 bg-red-50 px-4 py-3 text-sm text-red-950 dark:bg-red-950/20 dark:text-red-100">
              <div className="font-semibold">FIELD_NOT_EXPOSED_NOT_CLAIMED - ledger unavailable</div>
              <p className="mt-1">
                {data.ledgerUnavailableReason} Pre-auth redirect (302) is observable; full Google
                round-trip remains unverified pending owner callback confirmation. Production
                telemetry remains unclaimed until a production-readable ledger path is configured
                and reviewed.
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Card className="rounded-lg border-blue-200 bg-blue-50/60 dark:border-blue-900/60 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle className="text-base">What this page tells us</CardTitle>
            <CardDescription>
              This internal telemetry surface separates raw telemetry counts into measurement
              layers. The numbers are useful for understanding warning scope, governance hygiene,
              and unresolved lineage gaps, but they use different units/scopes and are not
              additive or final verified missing-record counts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {ownerInsightMetrics.map((metric) => (
                <div key={metric.value} className="rounded-lg border bg-background p-4">
                  <div className="text-2xl font-semibold tracking-tight text-foreground">
                    {metric.value}
                  </div>
                  <div className="mt-1 text-sm font-medium text-foreground">{metric.label}</div>
                  <div className="mt-3 space-y-2 text-xs leading-5 text-muted-foreground">
                    <p>
                      <span className="font-medium text-foreground">Meaning: </span>
                      {metric.meaning}
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Decision enabled: </span>
                      {metric.decision}
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Do not claim: </span>
                      {metric.boundary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid gap-3 lg:grid-cols-3">
              <div className="rounded-lg border bg-background p-4 text-sm leading-6 text-muted-foreground lg:col-span-2">
                <p className="font-medium text-foreground">Measurement layer finding</p>
                <p className="mt-1">
                  The meaningful finding is not an absolute current count. The meaningful finding is that
                  these numbers belong to different measurement layers and must not be promoted
                  interchangeably.
                </p>
              </div>
              <div className="rounded-lg border border-amber-300/70 bg-amber-50 p-4 text-sm leading-6 text-amber-950 dark:bg-amber-950/20 dark:text-amber-100">
                <p className="font-semibold">Trust boundary</p>
                <p className="mt-1">
                  Local/read-only/staging candidate. Not production proof. Not telemetry
                  verification. Not route safe-to-ship.
                </p>
              </div>
            </div>
            <p className="text-xs leading-5 text-muted-foreground">
              Displayed provider/model/cost values are captured from local staging telemetry and may
              be provider-reported, tool-normalized, or not exposed. Do not treat them alone as
              provider-backed model verification.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Card className="border-blue-200 bg-blue-50/60 dark:border-blue-900/60 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle className="text-base">Data source and freshness</CardTitle>
            <CardDescription>
              source={data.sourceLabel ?? "local_sqlite_candidates"} · freshness=
              {data.sourceFreshness ?? data.generatedAt}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Candidate/backfill evidence only; not verified production runtime telemetry. Source
            checksum prefix: <span className="font-mono text-xs">{data.sourceChecksumPrefix ?? "not available"}</span>
            {data.snapshotStale ? (
              <p className="mt-2 font-medium text-amber-800 dark:text-amber-200">
                Snapshot is older than 24 hours; do not treat it as a current state.
              </p>
            ) : null}
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 pt-6 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="text-base">Claim-Level Legend</CardTitle>
            <CardDescription>Current and future claim states are separated explicitly.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <Badge variant="outline">DRAFT_LOCAL_ONLY</Badge>
              <p className="mt-1 text-muted-foreground">Local draft or support artifact; not final AIOS proof.</p>
            </div>
            <div>
              <Badge variant="outline">OPUS_GATED_LOCAL_BACKFILL_CANDIDATE</Badge>
              <p className="mt-1 text-muted-foreground">Achieved for the staging backfill candidate only.</p>
            </div>
            <div>
              <Badge variant="outline">OPUS_GATED_LOCAL_INTERNAL_DASHBOARD_QUERY_CANDIDATE</Badge>
              <p className="mt-1 text-muted-foreground">Achieved for this local internal query candidate only.</p>
            </div>
            <div>
              <Badge variant="outline">TELEMETRY_SURFACE_EXISTS_ONLY</Badge>
              <p className="mt-1 text-muted-foreground">Possible low-level surface claim; not the current verification target.</p>
            </div>
            <div>
              <Badge variant="outline">INTERNAL_TELEMETRY_VERIFIED_WITH_MISSING_FIELD_DISCLOSURE</Badge>
              <p className="mt-1 text-muted-foreground">Not achieved. Requires Telemetry Steward, rendered evidence, and Prime Gate.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="text-base">Next Gate</CardTitle>
            <CardDescription>Current patch and later gates before any stronger claim.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-start justify-between gap-3">
              <span className="text-muted-foreground">Current gate</span>
              <Badge variant="outline">Surface Guild + QA patch</Badge>
            </div>
            <div className="flex items-start justify-between gap-3">
              <span className="text-muted-foreground">Next gate</span>
              <Badge variant="outline">Patched dashboard review</Badge>
            </div>
            <div className="flex items-start justify-between gap-3">
              <span className="text-muted-foreground">Later gate</span>
              <Badge variant="outline">Telemetry Steward field/source review</Badge>
            </div>
            <div className="flex items-start justify-between gap-3">
              <span className="text-muted-foreground">Later gate</span>
              <Badge variant="outline">Opus Prime Gate before preview</Badge>
            </div>
            <div className="flex items-start justify-between gap-3">
              <span className="text-muted-foreground">Production</span>
              <Badge variant="outline">Owner decision required</Badge>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:px-6 md:grid-cols-2 xl:grid-cols-4 lg:px-8">
        {data.summaryCards.map((card) => (
          <Card key={card.label} className="rounded-lg">
            <CardHeader className="gap-1">
              <CardDescription>{card.label}</CardDescription>
              <CardTitle className="text-3xl">{card.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <SourceBadge label={card.dataSourceType ?? "FIELD_NOT_EXPOSED_NOT_CLAIMED"} />
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-6 sm:px-6 xl:grid-cols-3 lg:px-8">
        <Card className="rounded-lg xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="size-4" />
              Spend by Model / Provider
            </CardTitle>
            <CardDescription>
              Data source: STAGING_CANDIDATE. Missing cost rows stay visible elsewhere and are not
              estimated.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MetricList rows={data.spendByModelProvider} valuePrefix="$" />
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Database className="size-4" />
              Ledger Coverage
            </CardTitle>
            <CardDescription>Entity, confidence, and coverage counts from staging rows.</CardDescription>
          </CardHeader>
          <CardContent>
            <MetricList rows={data.ledgerCoverage.slice(0, 12)} />
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-6 sm:px-6 xl:grid-cols-2 lg:px-8">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="text-base">Model vs Task</CardTitle>
            <CardDescription>Provider/model/token/cost values rendered as captured.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Tokens</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Receipt</TableHead>
                  <TableHead>Artifact</TableHead>
                  <TableHead>Source</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.modelVsTask.map((row, index) => (
                  <TableRow key={`${row.taskTitle}-${index}`}>
                    <TableCell className="max-w-[240px] whitespace-normal">{row.taskTitle}</TableCell>
                    <TableCell>{row.provider}</TableCell>
                    <TableCell className="max-w-[220px] whitespace-normal">{row.returnedModel}</TableCell>
                    <TableCell>{row.totalTokens}</TableCell>
                    <TableCell>{row.cost}</TableCell>
                    <TableCell className="max-w-[220px] whitespace-normal">{row.generationId}</TableCell>
                    <TableCell className="max-w-[260px] whitespace-normal">{row.sourceFilePath}</TableCell>
                    <TableCell>
                      <SourceBadge label={row.dataSourceType} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="text-base">Spend by Role / Reviewer Route</CardTitle>
            <CardDescription>Grouped role and reviewer route rows; not a verified spend claim.</CardDescription>
          </CardHeader>
          <CardContent>
            <MetricList rows={data.spendByRoleReviewerRoute} />
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-6 sm:px-6 xl:grid-cols-2 lg:px-8">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <GitBranch className="size-4" />
              Governance Gate Outcome by Task
            </CardTitle>
            <CardDescription>Gate status and verdict rows from staging records.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Gate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Verdict</TableHead>
                  <TableHead>Source</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.governanceGateOutcomeByTask.map((row, index) => (
                  <TableRow key={`${row.sourceFilePath}-${index}`}>
                    <TableCell>{row.gateName}</TableCell>
                    <TableCell>{row.gateStatus}</TableCell>
                    <TableCell className="max-w-[260px] whitespace-normal">{row.gateVerdict}</TableCell>
                    <TableCell>
                      <SourceBadge label={row.dataSourceType} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="text-base">Claim Movement Timeline</CardTitle>
            <CardDescription>Claim movement rows remain local-only and source-mapped.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Before</TableHead>
                  <TableHead>After</TableHead>
                  <TableHead>Source</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.claimMovementTimeline.map((row, index) => (
                  <TableRow key={`${row.sourceFilePath}-${index}`}>
                    <TableCell>{row.sourceArtifactDate}</TableCell>
                    <TableCell className="max-w-[180px] whitespace-normal">{row.claimBefore}</TableCell>
                    <TableCell className="max-w-[220px] whitespace-normal">{row.claimAfter}</TableCell>
                    <TableCell>
                      <SourceBadge label={row.dataSourceType} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-6 sm:px-6 xl:grid-cols-2 lg:px-8">
        <Card className="rounded-lg border-amber-300/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="size-4" />
              Missing Telemetry Warning Panel
            </CardTitle>
            <CardDescription>Missing fields are counted and displayed, not hidden.</CardDescription>
          </CardHeader>
          <CardContent>
            <MetricList rows={data.missingTelemetryWarnings} />
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="text-base">Low-Confidence Advisory Rows</CardTitle>
            <CardDescription>Excluded rows are visible as advisory, not authoritative.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reason</TableHead>
                  <TableHead>Missing</TableHead>
                  <TableHead>Claim</TableHead>
                  <TableHead>Source</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.lowConfidenceRows.map((row, index) => (
                  <TableRow key={`${row.sourceFilePath}-${index}`}>
                    <TableCell>{row.exclusionReason}</TableCell>
                    <TableCell>{row.missingFieldCount}</TableCell>
                    <TableCell className="max-w-[220px] whitespace-normal">{row.claimLevel}</TableCell>
                    <TableCell>
                      <SourceBadge label={row.dataSourceType} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="size-4" />
              Task Receipt Table
            </CardTitle>
            <CardDescription>
              Local artifact-backed task rows. Source paths are internal-only and remain behind auth.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Evidence</TableHead>
                  <TableHead>Claim</TableHead>
                  <TableHead>Missing</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Origin</TableHead>
                  <TableHead>Source</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.taskReceiptRows.map((row, index) => (
                  <TableRow key={`${row.sourceFilePath}-${index}`}>
                    <TableCell className="max-w-[260px] whitespace-normal">{row.taskTitle}</TableCell>
                    <TableCell>{row.evidenceType}</TableCell>
                    <TableCell className="max-w-[260px] whitespace-normal">{row.claimLevel}</TableCell>
                    <TableCell>{row.missingFieldCount}</TableCell>
                    <TableCell>{row.extractionConfidence}</TableCell>
                    <TableCell>{row.sourceOrigin}</TableCell>
                    <TableCell>
                      <SourceBadge label={row.dataSourceType} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
