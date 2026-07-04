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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { getInternalTelemetryDashboardData } from "@/lib/telemetry-ledger/query"

export const dynamic = "force-dynamic"

const labelExplanations: Record<string, { english: string; thai: string }> = {
  BUNDLED_JSON_EXPORT: {
    english: "Data comes from a bundled JSON export, not a live production database.",
    thai: "ข้อมูลมาจากไฟล์ JSON ที่ export/pack ไว้ ไม่ใช่ฐานข้อมูล production สด ใช้เพื่อดูภาพรวมและตรวจช่องข้อมูลที่ยังขาด",
  },
  FALLBACK_MODE_ACTIVE: {
    english: "The page is using fallback snapshot data instead of live telemetry database data.",
    thai: "ตอนนี้ใช้ข้อมูล fallback/snapshot แทน live telemetry database",
  },
  NOT_LIVE_DATABASE: {
    english: "This data is not flowing from a real-time production database.",
    thai: "ข้อมูลนี้ไม่ได้ไหลจากฐานข้อมูล production สดแบบ real-time",
  },
  NOT_PRODUCTION_TELEMETRY_VERIFICATION: {
    english: "The page can display data, but it is not full production telemetry verification.",
    thai: "หน้าแสดงข้อมูลได้ แต่ยังไม่ใช่การ verify production telemetry เต็มรูปแบบ",
  },
  NOT_EXPOSED: {
    english: "The source tool or artifact did not expose this value. Do not infer it.",
    thai: "ระบบหรือเครื่องมือไม่ได้เปิดเผยค่านี้ จึงยังไม่ควรเดาหรือเติมเอง",
  },
  NOT_APPLICABLE_FOR_LOCAL_RUN: {
    english: "This likely came from local execution, so external provider/model/token data may not apply.",
    thai: "งานนี้น่าจะเป็น local execution เช่น Codex/local validation จึงไม่มี provider/model/token จาก external API",
  },
  FIELD_NOT_EXPOSED_NOT_CLAIMED: {
    english: "The field is not exposed, so the dashboard does not fill or claim it.",
    thai: "เครื่องมือหรือ artifact ไม่ได้เปิดเผย field นี้ ระบบจึงไม่เติมเองและไม่ claim",
  },
  SOURCE_ARTIFACT_MISSING_FIELD: {
    english: "The source artifact does not contain this field, or extraction did not find it.",
    thai: "artifact ต้นทางไม่มี field นี้ หรือยัง extract ไม่พบ ต้องแก้ที่ schema/receipt/source artifact",
  },
  LOW_CONFIDENCE_ADVISORY: {
    english: "This row is advisory and should not support final claims.",
    thai: "แถวนี้เป็นข้อมูลช่วยสังเกต ไม่ควรใช้เป็นหลักฐานหลัก",
  },
}

function SourceBadge({ label }: { label: string }) {
  const variant = label === "LOW_CONFIDENCE_ADVISORY" ? "destructive" : "outline"
  const explanation = labelExplanations[label]
  const badge = (
    <Badge variant={variant} className="whitespace-nowrap">
      {label}
    </Badge>
  )

  if (!explanation) {
    return badge
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          tabIndex={0}
          className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {badge}
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={8} className="max-w-sm text-left leading-5">
        <div className="space-y-1">
          <p className="font-medium">{explanation.english}</p>
          <p>{explanation.thai}</p>
        </div>
      </TooltipContent>
    </Tooltip>
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

function metricRowsFromLabels(
  labels: string[],
  dataSourceType: string,
): Array<{ label: string; value: number; detail?: string; dataSourceType: string }> {
  const counts = new Map<string, number>()

  for (const rawLabel of labels) {
    const label = rawLabel.trim() || "SOURCE_ARTIFACT_MISSING_FIELD"
    counts.set(label, (counts.get(label) ?? 0) + 1)
  }

  return [...counts.entries()]
    .map(([label, value]) => ({
      label,
      value,
      dataSourceType,
    }))
    .sort((a, b) => b.value - a.value)
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
  const roleTaskArtifactRows =
    data.spendByRoleReviewerRoute.length > 0
      ? data.spendByRoleReviewerRoute.slice(0, 6)
      : [
          {
            label: "Role/task/artifact telemetry",
            value: 0,
            detail: "No role/task aggregate rows exposed by the current fallback export.",
            dataSourceType: "FIELD_NOT_EXPOSED_NOT_CLAIMED",
          },
        ]
  const evidenceClaimRows = metricRowsFromLabels(
    data.taskReceiptRows.map((row) => `${row.evidenceType} / ${row.claimLevel}`),
    isBundledExport ? "BUNDLED_JSON_EXPORT" : "STAGING_CANDIDATE",
  ).slice(0, 6)
  const evidenceClaimGraphRows =
    evidenceClaimRows.length > 0
      ? evidenceClaimRows
      : [
          {
            label: "Evidence tier / claim level",
            value: 0,
            detail: "No evidence or claim-level rows exposed by the current fallback export.",
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
                <SourceBadge label={isBundledExport ? "BUNDLED_JSON_EXPORT" : "READ-ONLY SQLITE"} />
                {isBundledExport ? <SourceBadge label="NOT_LIVE_DATABASE" /> : null}
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
              <div className="flex flex-wrap gap-2">
                <SourceBadge label="FALLBACK_MODE_ACTIVE" />
                <SourceBadge label="NOT_PRODUCTION_TELEMETRY_VERIFICATION" />
              </div>
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

          <Card className="rounded-lg border-primary/20">
            <CardHeader>
              <Badge variant="secondary" className="w-fit">
                Owner-readable explanation
              </Badge>
              <CardTitle className="text-xl">What this page means</CardTitle>
              <CardDescription>
                This internal page helps review fallback telemetry inspection data without changing
                the source, hiding missing fields, or increasing the claim level.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 lg:grid-cols-3">
                <div className="rounded-lg border bg-muted/30 p-4">
                  <h2 className="text-sm font-semibold text-foreground">What this page means</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    It shows bundled or read-only staging candidate telemetry behind auth so the
                    owner can inspect execution, evidence, fallback state, and missing-field signals.
                  </p>
                </div>
                <div className="rounded-lg border border-emerald-300/70 bg-emerald-50 p-4 text-emerald-950 dark:bg-emerald-950/20 dark:text-emerald-100">
                  <h2 className="text-sm font-semibold">Can claim</h2>
                  <ul className="mt-2 space-y-2 text-sm leading-6">
                    <li>The internal route exists behind Auth.js.</li>
                    <li>Bundled/staging fallback telemetry inspection data can be reviewed.</li>
                    <li>Missing fields and fallback labels remain visible.</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-amber-300/70 bg-amber-50 p-4 text-amber-950 dark:bg-amber-950/20 dark:text-amber-100">
                  <h2 className="text-sm font-semibold">Cannot claim yet</h2>
                  <ul className="mt-2 space-y-2 text-sm leading-6">
                    <li>No live production telemetry database.</li>
                    <li>No provider-backed telemetry display verification.</li>
                    <li>No full production telemetry verification.</li>
                    <li>No owner authenticated rendered proof unless owner confirms it.</li>
                  </ul>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <h2 className="text-sm font-semibold text-foreground">Label guide</h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Hover or focus each label for Thai/English explanation. These labels explain why
                  this page is useful for review without upgrading the telemetry claim.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {Object.keys(labelExplanations).map((label) => (
                    <SourceBadge key={label} label={label} />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

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

          <div className="rounded-lg border bg-card px-4 py-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Time window
                </p>
                <h2 className="mt-1 text-lg font-semibold text-foreground">All available</h2>
                <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
                  Time filtering limited because per-record telemetry timestamps are unavailable/incomplete.
                  All available only for bundled fallback export. Batch/export timestamps describe
                  snapshot generation, not telemetry event time.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Last 24 hours", "Last 7 days", "Last 30 days", "Custom range"].map((label) => (
                  <button
                    key={label}
                    type="button"
                    disabled
                    className="rounded-md border bg-muted px-3 py-2 text-xs font-medium text-muted-foreground opacity-70"
                  >
                    {label} unavailable
                  </button>
                ))}
                <span className="rounded-md border border-primary/40 bg-primary/10 px-3 py-2 text-xs font-medium text-primary">
                  All available active
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <Card className="rounded-lg border-primary/20 bg-primary/5">
              <CardHeader>
                <Badge variant="secondary" className="w-fit">
                  Executive graph 1
                </Badge>
                <CardTitle className="text-xl">Model Spend &amp; Usage</CardTitle>
                <CardDescription>
                  Existing aggregate fallback rows only. Provider-backed telemetry display, token
                  proof, and production spend verification are not claimed.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MetricList rows={providerVisibilityRows} valuePrefix={data.spendByModelProvider.length > 0 ? "$" : ""} />
              </CardContent>
            </Card>

            <Card className="rounded-lg">
              <CardHeader>
                <Badge variant="secondary" className="w-fit">
                  Executive graph 2
                </Badge>
                <CardTitle className="text-xl">Role vs Task / Artifact</CardTitle>
                <CardDescription>
                  Role, reviewer route, task, and artifact aggregates remain fallback evidence and
                  are not time-filtered from current data.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MetricList rows={roleTaskArtifactRows} />
              </CardContent>
            </Card>

            <Card className="rounded-lg">
              <CardHeader>
                <Badge variant="secondary" className="w-fit">
                  Executive graph 3
                </Badge>
                <CardTitle className="text-xl">Evidence Tier vs Claim Level</CardTitle>
                <CardDescription>
                  Evidence and claim-level rows are displayed as local candidate data with missing
                  fields preserved.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MetricList rows={evidenceClaimGraphRows} />
              </CardContent>
            </Card>

            <Card className="rounded-lg border-amber-300/70 bg-amber-50 dark:bg-amber-950/20">
              <CardHeader>
                <Badge variant="outline" className="w-fit">
                  Executive graph 4
                </Badge>
                <CardTitle className="text-xl">Missing Telemetry Coverage</CardTitle>
                <CardDescription>
                  Missing provider, model, token, cost, timestamp, and receipt fields are counted
                  and disclosed instead of filled.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MetricList rows={missingFieldRows} />
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
