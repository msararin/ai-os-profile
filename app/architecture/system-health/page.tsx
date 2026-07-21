import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const surfaces = [
  {
    title: "Runtime Authority Evidence",
    status: "Available — static insight dashboard",
    href: "/architecture/system-health/runtime-authority-evidence",
    copy: [
      "Static insight dashboard showing a dated 104/104 bounded validation snapshot, enforcement improvement, and orchestration evidence gaps.",
      "Not live monitoring, production readiness, or universal enforcement.",
    ],
  },
  {
    title: "LLMOps Readiness",
    status: "Available — evidence-calibrated page",
    href: "/architecture/system-health/llmops-readiness",
    copy: [
      "Mostly Tier 1-2: LLMOps-aligned governance and evidence discipline, capped by receipts and release controls.",
      "Not a full LLMOps platform claim, provider-backed runtime telemetry, or operational monitoring loop.",
    ],
  },
  {
    title: "Evidence Discipline",
    status: "Available — bounded evidence governance",
    href: "/architecture/system-health/observability",
    copy: [
      "Evidence discipline is active as a governance method; observability remains bounded and source-limited.",
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
    title: "Internal Telemetry",
    status: "Protected — canonical bounded closeout",
    href: "/internal/telemetry",
    copy: [
      "Protected Internal Telemetry has a canonical bounded closeout with a stable four-visual review view.",
      "Authentication is required; this link exposes no telemetry publicly and does not claim continuous live monitoring.",
    ],
  },
  {
    title: "AIOS Monitoring",
    status: "Static snapshot — reconciled 20 July 2026",
    href: "/architecture/system-health/monitoring",
    copy: [
      "Shows exported pass, fail, downgraded, and not-started states from AIOS enforcement records.",
      "Static review surface only; not a realtime agent tracker or production monitoring dashboard.",
    ],
  },
  {
    title: "Agent Orchestration Map",
    status: "Available — documented static map",
    href: "/architecture/system-health/agent-orchestration",
    copy: [
      "Maps how AIOS work is routed, reviewed, gated, parked, or improved across roles.",
      "It is a documented role-and-boundary map, not runtime execution proof.",
    ],
  },
]

const catches = [
  "Which review surfaces are available, candidate, or under construction.",
  "Which signal boundaries are safe to show publicly.",
  "Which claims are not yet allowed.",
  "Whether exported AIOS task records are pass, fail, downgraded, or not started.",
]

const configurationSummary = [
  {
    label: "Stack info",
    value: "Next.js public cockpit",
    detail: "Static review pages with curated snapshots.",
  },
  {
    label: "Access boundary",
    value: "Public read-only",
    detail: "No public write-back, execution control, or raw task payload.",
  },
  {
    label: "Evidence status",
    value: "Summarized only",
    detail: "Detailed proof remains gated by public-safe review.",
  },
  {
    label: "Next action",
    value: "Keep boundary visible",
    detail: "Use Monitoring for the detailed gate and blocked-action view.",
  },
]

const accessBoundaryLayers = [
  {
    layer: "Public Surface",
    publicLabel: "Public review surface",
    visibility: "Public / read-only",
    status: "Under construction",
    shown: "Curated status, links, and claim boundaries",
    notShown: "Write controls or live execution state",
  },
  {
    layer: "Private Layer",
    publicLabel: "Private proof packets",
    visibility: "Private / summarized only",
    status: "Not exposed publicly",
    shown: "High-level gate and readiness language",
    notShown: "Raw owner-review packets or local paths",
  },
  {
    layer: "Worker Layer",
    publicLabel: "Worker and route evidence",
    visibility: "Public-safe summary",
    status: "Partial",
    shown: "Role boundaries and evidence gaps",
    notShown: "Private task payloads or execution receipts",
  },
  {
    layer: "Memory Layer",
    publicLabel: "Private memory",
    visibility: "Private",
    status: "Disabled on public surface",
    shown: "No raw memory content",
    notShown: "Private notes, task payloads, or personal memory",
  },
  {
    layer: "Evidence Layer",
    publicLabel: "Curated evidence snapshot",
    visibility: "Public / read-only",
    status: "Static snapshot",
    shown: "Evidence status and limitations",
    notShown: "Raw receipts, secrets, or unreviewed telemetry",
  },
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
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-foreground shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Public review surface
            </p>
            <p className="mt-2 max-w-4xl text-sm leading-6">
              System Health is under construction and read-only. It summarizes public-safe
              configuration, access boundaries, evidence status, and the next review action.
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
              inventory, runtime authority evidence, and orchestration visibility.
            </p>
            <p>
              It is not a live monitoring dashboard. It does not show uptime, latency, provider
              performance, cost-saving evidence, benchmark proof, or autonomous orchestration.
            </p>
            <p>
              These surfaces are being built from practical AIOS usage, including lessons from
              routing work, evidence review, fallback labels, and human feedback loops.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Available surfaces</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p>Evidence Discipline</p>
                <p>Runtime Authority Evidence</p>
                <p>LLMOps Readiness</p>
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

          <Card className="mt-6 border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CardTitle>System Configuration / Access Boundary</CardTitle>
                <Badge variant="outline">Public-safe snapshot</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-3 md:grid-cols-4">
                {configurationSummary.map((item) => (
                  <div key={item.label} className="rounded-lg border bg-background p-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{item.value}</p>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">{item.detail}</p>
                  </div>
                ))}
              </div>

              <div className="overflow-x-auto rounded-lg border bg-background">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="border-b bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      {["Layer", "Visibility", "Status", "Shown publicly", "Not shown"].map(
                        (heading) => (
                          <th key={heading} className="px-4 py-3 font-medium">
                            {heading}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {accessBoundaryLayers.map((layer) => (
                      <tr key={layer.layer} className="align-top">
                        <td className="px-4 py-3">
                          <p className="font-medium text-foreground">{layer.layer}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{layer.publicLabel}</p>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{layer.visibility}</td>
                        <td className="px-4 py-3">
                          <Badge variant="secondary">{layer.status}</Badge>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{layer.shown}</td>
                        <td className="px-4 py-3 text-muted-foreground">{layer.notShown}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-sm leading-6 text-muted-foreground">
                Detailed gate, role, receipt, evidence-gap, blocked-action, and next-action
                interpretation lives in{" "}
                <Link
                  href="/architecture/system-health/monitoring"
                  className="font-medium text-primary hover:underline"
                >
                  AIOS Monitoring
                </Link>
                .
              </p>
            </CardContent>
          </Card>
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
