"use client"

import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useView } from "@/components/view-toggle"

type LvtLayer = {
  layer: number
  name: string
  objective: string
  metric: string
  status: "Active" | "Drafted" | "Planned"
  evidence: string
  nextMove: string
}

const lvtLayers: LvtLayer[] = [
  {
    layer: 1,
    name: "Strategic Control",
    objective:
      "Maintain decision authority and scope discipline across AI-assisted work",
    metric: "Decisions logged in KB / total decisions made",
    status: "Active",
    evidence: "Robert KB decision logs, cockpit governance v0.3 + R1",
    nextMove: "Continue weekly KB decision audit",
  },
  {
    layer: 2,
    name: "Execution Leverage",
    objective: "Increase output per hour without losing review discipline",
    metric: "Reviewed artifacts shipped per week",
    status: "Active",
    evidence: "optimize-worker routing, Codex execution, Hermes review gate",
    nextMove: "Validate Streamlit harness stays as test surface, not cockpit",
  },
  {
    layer: 3,
    name: "Workforce Efficiency",
    objective:
      "Operate as a one-person system with AI leverage, before scaling",
    metric: "Tasks routed without human re-routing",
    status: "Drafted",
    evidence: "optimize-worker capability registry, role definitions in KB",
    nextMove: "Define worker capability boundaries more strictly",
  },
  {
    layer: 4,
    name: "Portfolio Proof",
    objective: "Demonstrate governance maturity through visible artifacts",
    metric: "Public-facing artifacts that pass external review",
    status: "Drafted",
    evidence: "This profile site (ai-os-profile), KB structure",
    nextMove: "Complete cockpit patch sequence 1-7, then external review",
  },
  {
    layer: 5,
    name: "Opportunity Intelligence",
    objective: "Detect money-creation triggers and route to right module",
    metric: "Triggers detected → modules activated → outcomes",
    status: "Planned",
    evidence: "Supernova 10-module design, trigger criteria drafted",
    nextMove: "Activate first Supernova module on next real trigger",
  },
  {
    layer: 6,
    name: "Monetization",
    objective: "Convert governance maturity into sustainable revenue",
    metric: "Revenue events tied to AI OS leverage",
    status: "Planned",
    evidence: "TBD — pending Supernova first signal",
    nextMove:
      "Design first revenue experiment after Portfolio Proof completes",
  },
]

const statusBadgeClass: Record<LvtLayer["status"], string> = {
  Active: "bg-emerald-500/10 text-emerald-700",
  Drafted: "bg-orange-500/10 text-orange-700",
  Planned: "bg-muted-foreground/20 text-muted-foreground",
}

export default function LeanValueTreePage() {
  const { view } = useView()

  return (
    <PageLayout>
      {/* Header */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Lean Value Tree
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            A structured approach to connecting strategic goals with operational
            outcomes.
          </p>
        </div>
      </section>

      {/* North Star */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-center text-sm font-medium uppercase tracking-wide text-primary">
                North Star
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-lg font-medium text-foreground">
                Sustainable economic leverage through an AI-assisted personal
                operating system.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Value Tree Layers */}
      <section className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            {view === "external"
              ? "Strategic Layers"
              : "Strategic Layers (Internal View)"}
          </h2>
          {view === "internal" && (
            <p className="mt-2 text-sm text-muted-foreground">
              Each layer shows objective, metric, status, evidence, and next
              move — manually curated snapshot.
            </p>
          )}
          <div className="mt-8 space-y-4">
            {lvtLayers.map((item) => (
              <Card key={item.layer} className="border-border bg-card">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    {/* Layer Number */}
                    <div className="flex items-center justify-center border-b border-border bg-muted/50 px-6 py-4 sm:border-b-0 sm:border-r">
                      <span className="text-2xl font-semibold text-primary">
                        {item.layer}
                      </span>
                    </div>
                    {/* Content */}
                    <div className="flex-1 p-4 sm:p-6">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h3 className="font-semibold text-foreground">
                          {item.name}
                        </h3>
                        <Badge
                          variant="secondary"
                          className={statusBadgeClass[item.status]}
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-[8rem_1fr]">
                        <dt className="font-medium text-foreground">
                          Objective
                        </dt>
                        <dd className="text-muted-foreground">
                          {item.objective}
                        </dd>

                        <dt className="font-medium text-foreground">Metric</dt>
                        <dd className="text-muted-foreground">{item.metric}</dd>

                        <dt className="font-medium text-foreground">
                          Evidence
                        </dt>
                        <dd className="text-muted-foreground">
                          {item.evidence}
                        </dd>

                        <dt className="font-medium text-foreground">
                          Next move
                        </dt>
                        <dd className="text-muted-foreground">
                          {item.nextMove}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* View Note */}
      <section className="border-t border-border py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-dashed border-border bg-muted/30 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              {view === "external" ? (
                <>
                  Toggle to <span className="font-medium">Internal</span> view
                  (top-right) for additional operating notes.
                </>
              ) : (
                <>
                  Internal view shows the same five fields per layer with the
                  internal-mode heading. Toggle to{" "}
                  <span className="font-medium">External</span> for the public
                  summary.
                </>
              )}
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
