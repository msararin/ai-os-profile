import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const surfaces = [
  {
    title: "Evidence Discipline",
    status: "Available",
    href: "/architecture/system-health/observability",
    copy: [
      "Reviews what telemetry can and cannot prove.",
      "Shows how historical or semi-structured records are labeled before they are used as evidence.",
      "Does not make benchmark, provider comparison, or cost-saving claims.",
    ],
  },
  {
    title: "Telemetry Inventory",
    status: "Planned / not live",
    copy: [
      "Will summarize which records exist, which fields are missing, and which records are excluded from comparison.",
      "Not yet a live telemetry dashboard.",
    ],
  },
  {
    title: "Agent Orchestration Map",
    status: "Planned / map only / not live",
    copy: [
      "Will map how AIOS work is routed, blocked, parked, or escalated across roles.",
      "Not yet an operational agent dashboard.",
    ],
  },
]

const catches = [
  "Which review surface is available now.",
  "Which surfaces are still planned.",
  "Which signal boundaries are safe to show publicly.",
  "Which claims are not yet allowed.",
]

const nonClaims = [
  "No real-time uptime or latency monitoring.",
  "No provider performance comparison.",
  "No cost-saving claim.",
  "No benchmark result.",
  "No operational agent telemetry.",
]

export default function SystemHealthPage() {
  return (
    <PageLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-xl border-2 border-red-600 bg-red-50 p-4 text-red-950 shadow-sm dark:bg-red-950/40 dark:text-red-100">
            <p className="text-lg font-bold tracking-wide sm:text-xl">UNDER CONSTRUCTION</p>
            <p className="mt-2 max-w-4xl text-sm leading-6">
              This section groups AIOS review surfaces for evidence, telemetry, and orchestration
              state.
            </p>
          </div>

          <Badge variant="outline" className="mt-6">
            Hub / map
          </Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            System Health
          </h1>
          <div className="mt-3 max-w-4xl space-y-3 text-sm leading-6 text-muted-foreground sm:text-base">
            <p>
              This section groups AIOS review surfaces for evidence, telemetry, and orchestration
              state.
            </p>
            <p>
              It is not a live monitoring dashboard. It does not show real-time uptime, latency,
              provider performance, cost savings, or benchmark results.
            </p>
            <p>
              These surfaces are designed to clarify what signals exist, what they can support,
              what remains missing, and which claims are not yet allowed.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Current available surface</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Evidence Discipline Review Surface
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Planned surfaces</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p>Telemetry Inventory</p>
                <p>Agent Orchestration Map</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-3">
            {surfaces.map((surface) => {
              const card = (
                <Card
                  className={
                    surface.href
                      ? "h-full border-primary/30 bg-primary/5"
                      : "h-full border-dashed bg-muted/30"
                  }
                >
                  <CardHeader>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <CardTitle className="text-lg">{surface.title}</CardTitle>
                      <Badge variant={surface.href ? "default" : "secondary"}>
                        {surface.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
                    {surface.copy.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                    {surface.href ? (
                      <p className="pt-2 text-sm font-medium text-primary">
                        Open Evidence Discipline Review Surface
                      </p>
                    ) : (
                      <p className="pt-2 text-sm font-medium text-muted-foreground">
                        Planned surface - not clickable
                      </p>
                    )}
                  </CardContent>
                </Card>
              )

              return surface.href ? (
                <Link key={surface.title} href={surface.href} className="block h-full">
                  {card}
                </Link>
              ) : (
                <div key={surface.title} className="h-full" aria-disabled="true">
                  {card}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-10">
        <div className="mx-auto grid max-w-5xl gap-4 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>What this catches</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {catches.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What this does not prove yet</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {nonClaims.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  )
}
