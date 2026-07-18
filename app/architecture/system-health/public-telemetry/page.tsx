import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const boundaries = [
  {
    title: "Public and sanitized",
    detail:
      "This page uses aggregate historical indicators and plain-language methodology. It excludes raw prompts, task identifiers, receipts, spend, tokens, and private operating evidence.",
  },
  {
    title: "Historical, not live",
    detail:
      "The indicators come from dated evidence snapshots. They do not describe current traffic, current system performance, or production-wide telemetry coverage.",
  },
  {
    title: "Readiness, not outcomes",
    detail:
      "These measurements describe evidence available for evaluating routing readiness. They do not prove savings, quality improvement, causal contribution, or autonomous operation.",
  },
]

const nonClaims = [
  "35 is not a count of current calls or tasks.",
  "35 is not a current or production-wide coverage measure.",
  "0/8 is not a failure rate and does not mean the current system has zero qualifying paths.",
  "Neither indicator establishes cost savings, performance improvement, or causal impact.",
]

export default function PublicTelemetryPage() {
  return (
    <PageLayout>
      <div className="min-w-0">
        <section className="border-b border-border bg-background">
          <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
            <Badge variant="outline">BOUNDED READINESS · HISTORICAL EVIDENCE</Badge>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Public Telemetry
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
              A public-safe view of limited historical evidence used to assess AIOS routing
              readiness and trust boundaries. Raw operational telemetry remains private.
            </p>
            <div className="mt-6 rounded-lg border border-primary/25 bg-primary/5 p-4 text-sm leading-6 text-foreground">
              This is not a live dashboard. It does not report current calls, tasks, system
              performance, current coverage, production-wide coverage, or failure rates.
            </div>
          </div>
        </section>

        <section aria-labelledby="bounded-indicators" className="py-10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 id="bounded-indicators" className="text-2xl font-semibold tracking-tight">
              Bounded historical indicators
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
              Each indicator keeps its source date, population meaning, and limitation visible.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <CardTitle>Artifact-derived model-use candidates</CardTitle>
                    <Badge variant="secondary">1 Jul 2026 snapshot</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-4xl font-semibold tabular-nums text-foreground">35</p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Candidate model-use records identified in one historical artifact snapshot.
                    This is an evidence-inventory count, not call volume, task volume, current
                    coverage, or production-wide telemetry.
                  </p>
                  <p className="border-t border-border pt-4 text-xs leading-5 text-muted-foreground">
                    Status: observed within the bounded snapshot. No trend, rate, or efficiency
                    conclusion is supported.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <CardTitle>Qualifying lower-bound path classes</CardTitle>
                    <Badge variant="secondary">13 Jul 2026 inventory</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-4xl font-semibold tabular-nums text-foreground">0/8</p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Zero of eight inventoried path classes met the qualifying lower-bound evidence
                    rule in that dated inventory. This is a historical readiness classification,
                    not a current failure rate or claim about current routing availability.
                  </p>
                  <p className="border-t border-border pt-4 text-xs leading-5 text-muted-foreground">
                    Status: observed within the dated inventory and its stated qualification rule.
                    It must not be generalized beyond that inventory.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section aria-labelledby="trust-boundaries" className="border-y border-border bg-muted/30 py-10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 id="trust-boundaries" className="text-2xl font-semibold tracking-tight">
              Method and trust boundary
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {boundaries.map((boundary) => (
                <Card key={boundary.title}>
                  <CardHeader>
                    <CardTitle className="text-base">{boundary.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-6 text-muted-foreground">
                    {boundary.detail}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="non-claims" className="py-10">
          <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
            <div>
              <h2 id="non-claims" className="text-2xl font-semibold tracking-tight">
                What this page does not claim
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                {nonClaims.map((claim) => (
                  <li key={claim} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{claim}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="h-fit border-primary/25 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-base">Next evidence step</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
                <p>
                  A future measurement may be added only when its numerator, denominator, scope,
                  period, baseline, status, freshness, gaps, and public aggregation rule are
                  reproducible.
                </p>
                <Link
                  href="/architecture/system-health"
                  className="inline-flex font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Return to System Health →
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
