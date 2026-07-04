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
              {row.value}
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

function clampPercent(value: number, maxValue: number) {
  if (maxValue <= 0 || value <= 0) {
    return 0
  }

  return Math.max((value / maxValue) * 100, 6)
}

export default async function InternalTelemetryPage() {
  const session = await auth()
  const email = session?.user?.email

  if (!email || !isAllowedInternalEmail(email)) {
    redirect("/api/auth/signin?callbackUrl=/internal/telemetry")
  }

  const data = getInternalTelemetryDashboardData()
  const isBundledExport = data.dbMode === "BUNDLED_JSON_EXPORT"
  const totalTelemetryRecords = data.counts.candidateRecords + data.counts.exclusions
  const missingTelemetryCount = data.missingTelemetryWarnings.reduce((sum, row) => sum + row.value, 0)
  const providerVisibleRows = data.modelVsTask.filter(
    (row) =>
      row.provider !== "SOURCE_ARTIFACT_MISSING_FIELD" ||
      row.requestedModel !== "SOURCE_ARTIFACT_MISSING_FIELD" ||
      row.returnedModel !== "SOURCE_ARTIFACT_MISSING_FIELD",
  )
  const providerCoverageState =
    providerVisibleRows.length > 0 ? `${providerVisibleRows.length} partial rows` : "Not exposed"
  const eventSourceRows = [
    {
      label: "Candidate records",
      value: data.counts.candidateRecords,
      detail: "Sanitized staging/backfill candidate rows.",
      dataSourceType: isBundledExport ? "BUNDLED_JSON_EXPORT" : "STAGING_CANDIDATE",
    },
    {
      label: "Low-confidence advisory exclusions",
      value: data.counts.exclusions,
      detail: "Visible as advisory rows; excluded from authoritative aggregates.",
      dataSourceType: "LOW_CONFIDENCE_ADVISORY",
    },
    {
      label: "Backfill batches",
      value: data.counts.batches,
      detail: "Batch metadata, not live production telemetry.",
      dataSourceType: isBundledExport ? "BUNDLED_JSON_EXPORT" : "STAGING_CANDIDATE",
    },
    {
      label: "Runtime agent runs",
      value: data.counts.agentRuns,
      detail: "Only counted if a readable ledger exposes them.",
      dataSourceType: data.counts.agentRuns > 0 ? "RUNTIME_CAPTURED" : "FIELD_NOT_EXPOSED_NOT_CLAIMED",
    },
  ]
  const missingFieldRows =
    data.missingTelemetryWarnings.length > 0
      ? data.missingTelemetryWarnings.slice(0, 8)
      : [
          {
            label: "No missing-field rows exposed",
            value: 0,
            detail: "Missing-field coverage cannot be upgraded without source review.",
            dataSourceType: "FIELD_NOT_EXPOSED_NOT_CLAIMED",
          },
        ]
  const providerVisibilityRows =
    data.spendByModelProvider.length > 0
      ? data.spendByModelProvider.slice(0, 6)
      : [
          {
            label: "Provider/model/token/cost telemetry",
            value: 1,
            detail:
              "Not exposed as provider-backed telemetry. This block is a disclosure state, not a usage graph.",
            dataSourceType: "FIELD_NOT_EXPOSED_NOT_CLAIMED",
          },
        ]
  const targetTelemetryRows = [
    {
      label: "Spend by model",
      value: 1,
      detail: "Target-only until provider-backed cost telemetry exists.",
      dataSourceType: "FIELD_NOT_EXPOSED_NOT_CLAIMED",
    },
    {
      label: "Input/output tokens",
      value: 1,
      detail: "Missing or source-dependent; no token proof claim.",
      dataSourceType: "FIELD_NOT_EXPOSED_NOT_CLAIMED",
    },
    {
      label: "Returned model",
      value: 1,
      detail: "Missing unless source artifacts expose it.",
      dataSourceType: "FIELD_NOT_EXPOSED_NOT_CLAIMED",
    },
  ]

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
                <Badge variant="outline">{isBundledExport ? "BUNDLED_JSON_EXPORT" : "READ-ONLY SQLITE"}</Badge>
                {isBundledExport ? <Badge variant="outline">NOT_LIVE_DATABASE</Badge> : null}
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
            <div className="font-semibold">
              {isBundledExport
                ? "BUNDLED_JSON_EXPORT - staging/backfill snapshot candidate"
                : "STAGING_CANDIDATE - local internal dashboard query candidate"}
            </div>
            <p className="mt-1">
              This view reads staging/backfill candidate data only. It is not telemetry
              verification, not production proof, not a live database, and not a public dashboard.
            </p>
          </div>

          {isBundledExport ? (
            <div className="rounded-lg border border-blue-300/70 bg-blue-50 px-4 py-3 text-sm text-blue-950 dark:bg-blue-950/20 dark:text-blue-100">
              <div className="font-semibold">FALLBACK_MODE_ACTIVE - NOT_PRODUCTION_TELEMETRY_VERIFICATION</div>
              <p className="mt-1">
                Rows on this page come from a sanitized bundled JSON export. Missing fields remain
                visible, local paths are redacted, and provider-backed telemetry display is not
                claimed without later review.
              </p>
              <p className="mt-2 font-mono text-xs">
                exportGeneratedAt: {data.exportGeneratedAt ?? data.exportMetadata?.generated_at ?? "SOURCE_ARTIFACT_MISSING_FIELD"}
                {" · "}
                timezone: {data.exportGeneratedAtTz ?? data.exportMetadata?.generated_at_timezone ?? "UTC"}
                {" · "}
                sourceChecksumPrefix: {data.checksumAlgo ?? data.exportMetadata?.source_checksum_algorithm ?? "sha256"}:
                {data.sourceChecksumPrefix ?? "SOURCE_ARTIFACT_MISSING_FIELD"}
              </p>
              <p className="mt-1 text-xs">
                Aggregate note: candidate record counts exclude LOW_CONFIDENCE_ADVISORY rows, which
                are shown separately.
              </p>
            </div>
          ) : null}

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

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Telemetry records",
                value: totalTelemetryRecords,
                detail: `${data.counts.candidateRecords} candidate / ${data.counts.exclusions} advisory`,
              },
              {
                label: "Provider/model coverage",
                value: providerCoverageState,
                detail: "Missing or partial fields remain disclosed.",
              },
              {
                label: "Missing telemetry signals",
                value: missingTelemetryCount,
                detail: "Provider/model/token/cost gaps are not hidden.",
              },
              {
                label: "Fallback mode",
                value: isBundledExport ? "Active" : "DB read",
                detail: isBundledExport
                  ? "Bundled JSON export, not live database."
                  : "Read-only query candidate.",
              },
            ].map((card) => (
              <Card key={card.label} className="rounded-lg">
                <CardContent className="p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {card.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">{card.value}</p>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{card.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
            <Card className="rounded-lg border-primary/20 bg-primary/5">
              <CardHeader>
                <Badge variant="secondary" className="w-fit">
                  Visual telemetry summary
                </Badge>
                <CardTitle className="text-xl">Graph-first internal telemetry dashboard</CardTitle>
                <CardDescription>
                  Counts are shown as staging/backfill or fallback evidence. This screen does not
                  claim provider-backed telemetry display or full production telemetry verification.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {eventSourceRows.map((row) => {
                  const maxValue = Math.max(...eventSourceRows.map((item) => item.value), 1)

                  return (
                    <div key={row.label} className="space-y-1.5">
                      <div className="flex items-start justify-between gap-3 text-sm">
                        <span className="font-medium text-foreground">{row.label}</span>
                        <span className="font-mono text-muted-foreground">{row.value}</span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-background">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${clampPercent(row.value, maxValue)}%` }}
                        />
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <SourceBadge label={row.dataSourceType} />
                        <p className="text-xs leading-5 text-muted-foreground">{row.detail}</p>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card className="rounded-lg">
              <CardHeader>
                <Badge variant="secondary" className="w-fit">
                  Missing-field coverage chart
                </Badge>
                <CardTitle className="text-xl">Missing telemetry remains visible.</CardTitle>
                <CardDescription>
                  Provider, model, token, and cost fields are disclosed as missing or not exposed
                  when source artifacts do not support stronger claims.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MetricList rows={missingFieldRows} />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <Card className="rounded-lg">
              <CardHeader>
                <Badge variant="secondary" className="w-fit">
                  Model/provider visibility chart
                </Badge>
                <CardTitle className="text-xl">
                  {providerVisibleRows.length > 0
                    ? "Provider/model rows are partial, not proof."
                    : "Provider/model telemetry is not exposed."}
                </CardTitle>
                <CardDescription>
                  Rendered values come from the bundled or read-only candidate source only.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MetricList rows={providerVisibilityRows} valuePrefix={data.spendByModelProvider.length > 0 ? "$" : ""} />
              </CardContent>
            </Card>

            <Card className="rounded-lg border-amber-300/70 bg-amber-50 dark:bg-amber-950/20">
              <CardHeader>
                <Badge variant="outline" className="w-fit">
                  Target cost/token telemetry pattern
                </Badge>
                <CardTitle className="text-xl">Cost and token charts are target/missing state.</CardTitle>
                <CardDescription>
                  No provider-backed spend or token dashboard is claimed from this fallback view.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MetricList rows={targetTelemetryRows} />
              </CardContent>
            </Card>
          </div>
        </div>
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
