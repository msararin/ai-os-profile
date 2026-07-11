import { redirect } from "next/navigation"
import { CheckCircle2, Database, LockKeyhole, ShieldCheck } from "lucide-react"

import { auth, isAllowedInternalEmail } from "@/auth"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getInternalTelemetryDashboardData } from "@/lib/telemetry-ledger/query"

export const dynamic = "force-dynamic"

const nextGates = [
  {
    title: "Configure the ledger path",
    description: "Provide a production-readable, owner-approved ledger source before stronger data claims.",
  },
  {
    title: "Telemetry Steward review",
    description: "Review field meaning, missingness, lineage, and source boundaries.",
  },
  {
    title: "Capture rendered evidence",
    description: "Verify the authenticated owner view after the approved ledger source is available.",
  },
  {
    title: "Prime Gate review",
    description: "Approve or keep the claim level capped after source and rendered evidence review.",
  },
]

export default async function InternalTelemetryPage() {
  const session = await auth()
  const email = session?.user?.email

  if (!email || !isAllowedInternalEmail(email)) {
    redirect("/api/auth/signin?callbackUrl=/internal/telemetry")
  }

  const data = getInternalTelemetryDashboardData()
  const diagnosticRows =
    data.summaryCards.length +
    data.spendByModelProvider.length +
    data.ledgerCoverage.length +
    data.modelVsTask.length +
    data.spendByRoleReviewerRoute.length +
    data.taskReceiptRows.length +
    data.missingTelemetryWarnings.length
  const hasDiagnosticRows = diagnosticRows > 0
  const ledgerState = data.ledgerUnavailableReason ? "rows absent" : hasDiagnosticRows ? "rows present" : "rows absent"

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="gap-2">
                  <ShieldCheck className="size-3.5" />
                  Owner internal
                </Badge>
                <Badge variant="outline">Evidence boundary</Badge>
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                  Internal Telemetry
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                  A compact owner view of telemetry access, evidence limits, local query row
                  presence, and the gates required before stronger claims.
                </p>
              </div>
            </div>
            <div className="rounded-lg border bg-card px-4 py-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 font-medium text-foreground">
                <LockKeyhole className="size-4" />
                Protected access
              </div>
              <p className="mt-1">Authentication and an allowed owner account are required.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Access boundary</CardDescription>
              <CardTitle className="text-lg">Protected owner view</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Internal route with server-side session and owner allowlist checks.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Claim level</CardDescription>
              <CardTitle className="text-lg">Surface exists only</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Telemetry verification and operational readiness are not established.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Local query row presence</CardDescription>
              <CardTitle className="text-lg">
                {data.dbMode === "SNAPSHOT_CANDIDATE" ? data.counts.candidateRecords.toLocaleString() : ledgerState}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Candidate/backfill records; not verified production runtime telemetry.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Backfill candidate class</CardDescription>
              <CardTitle className="text-lg">
                {data.dbMode === "SNAPSHOT_CANDIDATE" ? data.counts.backfillCandidates.toLocaleString() : "Review required"}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Backfill class only; not verified production runtime telemetry. Owner review required.
            </CardContent>
          </Card>
        </div>

        <Card className="border-blue-200 bg-blue-50/60 dark:border-blue-900/60 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle className="text-base">Data source and freshness</CardTitle>
            <CardDescription>
              source={data.sourceLabel ?? "local_sqlite_candidates"} · freshness={data.sourceFreshness ?? data.generatedAt}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Candidate/backfill records; not verified production runtime telemetry. Snapshot checksum:
            <span className="ml-1 font-mono text-xs">{data.sourceChecksumPrefix ?? "not available"}</span>
            {data.snapshotStale ? (
              <p className="mt-2 font-medium text-amber-800 dark:text-amber-200">
                Snapshot is older than 24 hours; refresh before relying on row presence.
              </p>
            ) : null}
          </CardContent>
        </Card>

        {data.ledgerUnavailableReason ? (
          <Card className="border-amber-300/70 bg-amber-50 dark:bg-amber-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-amber-950 dark:text-amber-100">
                <Database className="size-4" />
                Ledger source is not available to this deployment
              </CardTitle>
              <CardDescription className="text-amber-900/80 dark:text-amber-100/80">
                The protected surface is working, but source-backed telemetry remains unverified.
                Configure and review an approved ledger path before interpreting dashboard data.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Claim boundary</CardTitle>
              <CardDescription>What the current evidence supports and does not support.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <p className="font-medium text-foreground">Supported</p>
                <ul className="mt-2 space-y-2 text-muted-foreground">
                  <li>Protected telemetry route exists.</li>
                  <li>Owner access boundary is enforced.</li>
                  <li>Local query row presence can be disclosed.</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-foreground">Not established</p>
                <ul className="mt-2 space-y-2 text-muted-foreground">
                  <li>Production telemetry verification.</li>
                  <li>Telemetry readiness or completeness.</li>
                  <li>Provider, model, token, cost, or performance comparison.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next gates</CardTitle>
              <CardDescription>Complete these in order before upgrading the claim level.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {nextGates.map((gate, index) => (
                <div key={gate.title} className="flex gap-3 rounded-lg border p-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {index + 1}. {gate.title}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">{gate.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {hasDiagnosticRows ? (
          <details className="rounded-lg border bg-card p-4">
            <summary className="cursor-pointer text-sm font-medium text-foreground">
              Optional query diagnostics
            </summary>
            <div className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
              <p>Summary rows: {data.summaryCards.length}</p>
              <p>Provider/model groups: {data.spendByModelProvider.length}</p>
              <p>Coverage groups: {data.ledgerCoverage.length}</p>
              <p>Task/model rows: {data.modelVsTask.length}</p>
              <p>Role/reviewer groups: {data.spendByRoleReviewerRoute.length}</p>
              <p>Evidence/receipt rows: {data.taskReceiptRows.length}</p>
            </div>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              Counts are diagnostic inventory only. Interpret fields, missingness, and lineage only
              after Telemetry Steward review.
            </p>
          </details>
        ) : null}
      </section>
    </main>
  )
}
