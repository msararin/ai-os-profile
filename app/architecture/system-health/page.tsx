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
      "Reviews what captured telemetry can and cannot support as evidence.",
      "Does not make benchmark, provider comparison, or cost-saving claims.",
    ],
  },
  {
    title: "Telemetry Inventory",
    status: "Under construction",
    copy: [
      "Will summarize which records exist, which fields are missing, and which signals are excluded from comparison.",
      "Not a live telemetry dashboard.",
    ],
  },
  {
    title: "AIOS Monitoring",
    status: "Under construction — static snapshot",
    href: "/architecture/system-health/monitoring",
    copy: [
      "Shows exported pass, fail, downgraded, and not-started states from AIOS enforcement records.",
      "Static review surface only; not a realtime agent tracker or production monitoring dashboard.",
    ],
  },
  {
    title: "Agent Orchestration Map",
    status: "Candidate — not yet released",
    href: "/architecture/system-health/agent-orchestration",
    copy: [
      "Maps how AIOS work is routed, reviewed, gated, parked, or improved across roles.",
      "It is a map, not a live dashboard.",
    ],
  },
]

const catches = [
  "Which review surfaces are available, candidate, or under construction.",
  "Which signal boundaries are safe to show publicly.",
  "Which claims are not yet allowed.",
  "Whether exported AIOS task records are pass, fail, downgraded, or not started.",
]

const nonClaims = [
  "No uptime or latency monitoring.",
  "No provider performance comparison.",
  "No cost-saving evidence.",
  "No benchmark proof.",
  "No autonomous orchestration.",
  "No realtime agent tracking.",
]

export default function SystemHealthPage() {
  return (
    <PageLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-xl border-2 border-red-600 bg-red-50 p-4 text-red-950 shadow-sm dark:bg-red-950/40 dark:text-red-100">
            <p className="text-lg font-bold tracking-wide sm:text-xl">UNDER CONSTRUCTION</p>
            <p className="mt-2 max-w-4xl text-sm leading-6">
              This section groups AIOS review surfaces for evidence discipline, telemetry
              inventory, and orchestration visibility.
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
              This section groups AIOS review surfaces for evidence discipline, telemetry
              inventory, and orchestration visibility.
            </p>
            <p>
              It is not a live monitoring dashboard. It does not show uptime, latency, provider
              performance, cost-saving evidence, benchmark proof, or autonomous orchestration.
            </p>
            <p>
              These surfaces are being built from practical AIOS usage, including lessons from
              routing work, evidence review, fallback labels, and human feedback loops.
            </p>
            <p>Under construction, based on real AIOS usage learning.</p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Available surfaces</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p>Evidence Discipline</p>
                <p>AIOS Monitoring static snapshot</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Candidate surfaces</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p>Agent Orchestration Map</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Planned / under construction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p>Telemetry Inventory</p>
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
                        Open {surface.title}
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
