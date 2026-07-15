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
import { getInternalTelemetryDashboardData, normalizeTelemetryRange } from "@/lib/telemetry-ledger/query"

export const dynamic = "force-dynamic"

function SourceBadge({ label }: { label: string }) {
  const variant = label === "LOW_CONFIDENCE_ADVISORY" ? "destructive" : "outline"

  return (
    <Badge variant={variant} className="whitespace-nowrap">
      {label}
    </Badge>
  )
}

function SectionMeaning({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-1 border-l-2 border-teal-500 pl-3 text-sm leading-6 text-teal-700 dark:text-teal-300">
      {children}
    </p>
  )
}

function MetricList({
  rows,
  valuePrefix = "",
  showRowMetadata = true,
}: {
  rows: Array<{ label: string; value: number; detail?: string; dataSourceType?: string }>
  valuePrefix?: string
  showRowMetadata?: boolean
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
          {showRowMetadata ? (
            <SourceBadge label={row.dataSourceType ?? "FIELD_NOT_EXPOSED_NOT_CLAIMED"} />
          ) : null}
          <div className="h-2 rounded bg-muted">
            <div
              className="h-2 rounded bg-primary"
              style={{ width: `${Math.max((row.value / maxValue) * 100, 4)}%` }}
            />
          </div>
          {showRowMetadata && row.detail ? (
            <p className="text-xs text-muted-foreground">{row.detail}</p>
          ) : null}
        </div>
      ))}
    </div>
  )
}

function UnavailableVisual({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-lg border border-dashed bg-muted/20 p-4">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <AlertTriangle className="size-4 text-amber-600" />
        {title}
      </div>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">{detail}</p>
    </div>
  )
}

function CandidateDominanceStrip({
  rows,
  exportedCount,
  populationCount,
}: {
  rows: Array<{ label: string; value: number }>
  exportedCount: number
  populationCount: number
}) {
  if (rows.length === 0 || exportedCount === 0) {
    return (
      <UnavailableVisual
        title="Model dominance unavailable"
        detail="No exported model-usage candidate rows are available for a source-limited concentration view."
      />
    )
  }

  const colors = ["bg-teal-600", "bg-sky-600", "bg-indigo-500", "bg-amber-500", "bg-slate-400"]

  return (
    <div className="space-y-4">
      <div className="flex h-4 overflow-hidden rounded-full bg-muted" aria-label="Candidate-row concentration strip">
        {rows.map((row, index) => (
          <div
            key={row.label}
            className={colors[index % colors.length]}
            style={{ width: `${(row.value / exportedCount) * 100}%` }}
            title={`${row.label}: ${row.value} of ${exportedCount} model-usage candidate rows`}
          />
        ))}
      </div>
      <div className="space-y-2">
        {rows.map((row, index) => (
          <div key={row.label} className="flex items-start justify-between gap-3 text-xs">
            <span className="flex min-w-0 items-start gap-2 text-muted-foreground">
              <span className={`mt-1 size-2 shrink-0 rounded-full ${colors[index % colors.length]}`} />
              <span className="break-words">{row.label}</span>
            </span>
            <span className="shrink-0 font-mono text-foreground">
              {row.value}/{exportedCount} ({Math.round((row.value / exportedCount) * 100)}%)
            </span>
          </div>
        ))}
      </div>
      <p className="text-xs leading-5 text-muted-foreground">
        Exact coverage: {exportedCount} of {populationCount} available model-usage candidate rows. Placeholder
        labels remain visible. This is not spend, calls, or actual model dominance.
      </p>
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
    label: "Non-additive, non-claimable investigation target",
    meaning: "Source calculation unverified; excluded from all totals; no valid join to the Codex CLI gpt-5.5 label.",
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

export default async function InternalTelemetryPage({ searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const session = await auth()
  const email = session?.user?.email

  if (!email || !isAllowedInternalEmail(email)) {
    redirect("/api/auth/signin?callbackUrl=/internal/telemetry")
  }

  const params = (await searchParams) ?? {}
  const value = (key: string) => typeof params[key] === "string" ? params[key] : undefined
  const telemetryRange = normalizeTelemetryRange({ range: value("range"), start: value("start"), end: value("end") })
  const data = getInternalTelemetryDashboardData(telemetryRange)

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
                <Badge variant="outline">
                  {data.spendSnapshotState === "LOCAL_READ_ONLY" ? "LOCAL QUERY CANDIDATE" : "MIXED SANITIZED SNAPSHOTS"}
                </Badge>
                <Badge variant="outline">
                  {data.spendSnapshotState === "LOCAL_READ_ONLY" ? "READ-ONLY SQLITE" : "SERVER-ONLY SPEND AGGREGATE"}
                </Badge>
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                  Internal Telemetry
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                  Mixed-source internal view: a protected sanitized Spend aggregate alongside
                  source-limited candidate evidence. Source periods and claim boundaries remain separate.
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
            <div className="font-semibold">MIXED HISTORICAL SOURCE LAYERS — protected internal review</div>
            <p className="mt-1">
              Spend uses a separately versioned server-only aggregate for its displayed May 30
              period. Other visuals retain the separate July 1 candidate snapshot. Neither is live
              billing, complete telemetry, route-approval evidence, or a public dashboard.
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
            <SectionMeaning>Explains this historical snapshot for internal review, including separate totals, non-claims, and unresolved evidence gaps.</SectionMeaning>
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
                  Protected server-side Spend aggregate plus source-limited candidate context. Not
                  live billing proof, complete telemetry, or route-approval evidence.
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
            <SectionMeaning>Shows the source batch timestamp and database checksum prefix; this is not a live feed or snapshot-completeness proof.</SectionMeaning>
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

      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-foreground">Telemetry Overview Visuals</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            One bounded recorded-cost view, two separate candidate-row views, and one proven
            classification gap. Units and populations are never mixed or inferred.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground" aria-label="Telemetry time range">
            <span className="font-semibold text-foreground">Shared range: {telemetryRange.label}</span>
            {["7D", "30D", "ALL"].map((range) => (
              <a key={range} className={`rounded border px-2 py-1 ${telemetryRange.key === range ? "bg-muted font-semibold" : ""}`} href={`/internal/telemetry?range=${range}`}>
                {range === "ALL" ? "All" : range}
              </a>
            ))}
            <span>Server-filtered UTC [start,end); 7D/30D are unavailable until live timestamped source exists.</span>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="size-4" />
              Spend by Model / Provider — recorded cost_usd
            </CardTitle>
            <SectionMeaning>Uses numeric agent_runs cost_usd rows only; unavailable costs stay unknown and are never counted as zero.</SectionMeaning>
            <CardDescription>
              Live operational Spend remains unavailable; preserved historical evidence is shown
              separately with explicit SYNTHETIC/BACKFILL and operational-exclusion labels.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 dark:bg-amber-950/20">
                <h3 className="font-semibold text-foreground">Live operational Spend — UNAVAILABLE</h3>
                <p className="mt-2 text-sm leading-5 text-muted-foreground">Protected continuous delivery is not yet connected. No synthetic or backfill values are included in live operational Spend.</p>
              </div>
              <div className="rounded-lg border border-sky-300 bg-sky-50/50 p-4 dark:bg-sky-950/20">
                <h3 className="font-semibold text-foreground">Preserved historical evidence — SYNTHETIC/BACKFILL</h3>
                {data.historicalSpendByModelProvider.length > 0 ? (
                  <div className="mt-4 space-y-4">
                    <MetricList rows={data.historicalSpendByModelProvider} valuePrefix="USD-designated " />
                    <p className="text-xs leading-5 text-muted-foreground">{data.historicalSpendSummary}</p>
                    <p className="text-xs font-semibold text-amber-800 dark:text-amber-200">OPERATIONAL CLAIM: EXCLUDED</p>
                  </div>
                ) : <UnavailableVisual title="Historical evidence unavailable" detail={data.historicalSpendSummary} />}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Database className="size-4" />
              Calls by Model
            </CardTitle>
            <SectionMeaning>Shows captured model-label distribution in the exported candidate subset; actual call count is not exposed.</SectionMeaning>
            <CardDescription>
              All available snapshot rows grouped by captured returned-model label; not calls. Snapshot:
              {" "}{data.generatedAt}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.modelCandidateDistribution.length > 0 ? (
              <div className="space-y-4">
                <MetricList rows={data.modelCandidateDistribution} showRowMetadata={false} />
                <p className="text-xs leading-5 text-muted-foreground">
                  STAGING_CANDIDATE · {data.modelCandidateExportCount} of{" "}
                  {data.modelCandidatePopulationCount} available model-usage candidate rows · snapshot{" "}
                  {data.generatedAt} · actual call count unavailable.
                </p>
              </div>
            ) : (
              <UnavailableVisual
                title="Call count unavailable"
                detail="No exported model-usage candidate rows are available for a source-limited label distribution."
              />
            )}
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="text-base">Approved vs Non-standard Usage</CardTitle>
            <SectionMeaning>Requires an approved-route or provider-type classification that the sanitized snapshot does not expose.</SectionMeaning>
            <CardDescription>No share denominator is available, so no route split is inferred.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:bg-amber-950/20">
              <h3 className="font-semibold text-foreground">Governed classification coverage</h3>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div><div className="text-xs text-muted-foreground">APPROVED</div><div className="font-mono text-lg">{data.approvalUsage.approved}</div></div>
                <div><div className="text-xs text-muted-foreground">NON_STANDARD</div><div className="font-mono text-lg">{data.approvalUsage.nonStandard}</div></div>
                <div><div className="text-xs text-muted-foreground">UNKNOWN</div><div className="font-mono text-lg">{data.approvalUsage.unknownUnclassified}</div></div>
                <div><div className="text-xs text-muted-foreground">DENOMINATOR</div><div className="font-mono text-lg">{data.approvalUsage.denominator}</div></div>
              </div>
              <p className="mt-3 rounded border border-amber-300 bg-amber-50 p-3 text-xs leading-5 text-amber-900 dark:bg-amber-950/20 dark:text-amber-100">
                {data.approvalUsage.unknownUnclassified}/{data.approvalUsage.denominator} UNKNOWN_UNCLASSIFIED — preserved historical evidence; no governed approval evidence is recorded for this population. Coverage is policy-match coverage, not usage volume.
              </p>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                Coverage: {data.approvalUsage.coveragePercent}% · policy version: {data.approvalUsage.policyVersion} · {data.approvalUsage.periodStart === data.approvalUsage.periodEnd ? `Snapshot captured at: ${data.approvalUsage.periodStart}` : `period: ${data.approvalUsage.periodStart} → ${data.approvalUsage.periodEnd} UTC`} · {data.approvalUsage.classification}. UNKNOWN_UNCLASSIFIED is not counted as NON_STANDARD; reviewer/routing proxies are excluded.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="text-base">Model Dominance</CardTitle>
            <SectionMeaning>Shows captured-label concentration only in the exported candidate subset; it does not establish actual model dominance.</SectionMeaning>
            <CardDescription>
              Captured-label concentration across all available snapshot model-usage candidate rows;
              placeholder labels retained. Snapshot: {data.generatedAt}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CandidateDominanceStrip
              rows={data.modelCandidateDistribution}
              exportedCount={data.modelCandidateExportCount}
              populationCount={data.modelCandidatePopulationCount}
            />
          </CardContent>
        </Card>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 pt-6 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="text-base">Claim-Level Legend</CardTitle>
            <SectionMeaning>Defines the claim states used on this page so local evidence is not mistaken for stronger proof.</SectionMeaning>
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
            <SectionMeaning>Shows the review sequence required before this source-limited evidence can support any stronger claim.</SectionMeaning>
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

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-foreground">Record Population Summary</h2>
          <SectionMeaning>Shows candidate record counts from the sanitized snapshot, with advisory exclusions separated from the backfill population.</SectionMeaning>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Database className="size-4" />
              Ledger Coverage
            </CardTitle>
            <SectionMeaning>Shows candidate counts by entity type, not a ledger join or a financial-verification measure.</SectionMeaning>
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
            <SectionMeaning>Shows captured model candidates beside task context, including missing token or cost fields without estimation.</SectionMeaning>
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
            <SectionMeaning>Counts role-execution candidates by intended role and reviewer independence; despite the legacy title, these rows are not spend.</SectionMeaning>
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
            <SectionMeaning>Lists sanitized gate name, status, and verdict candidates; it does not calculate approval rates or task-group performance.</SectionMeaning>
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
            <SectionMeaning>Shows source-artifact dates with claim-before and claim-after candidates; it does not prove operational velocity or trends.</SectionMeaning>
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
            <SectionMeaning>Ranks the top 12 missing-field categories totaling 26,957 occurrences; this panel is not the 69,881 all-field total.</SectionMeaning>
            <CardDescription>Missing fields are counted and displayed, not hidden.</CardDescription>
          </CardHeader>
          <CardContent>
            <MetricList rows={data.missingTelemetryWarnings} />
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="text-base">Low-Confidence Advisory Rows</CardTitle>
            <SectionMeaning>Lists sanitized exclusion reasons, claim levels, and missing-field counts for advisory review, not authoritative conclusions.</SectionMeaning>
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
            <SectionMeaning>Shows sanitized task-run candidate metadata and missingness; these are not live agent runs or timestamp-verified receipts.</SectionMeaning>
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
