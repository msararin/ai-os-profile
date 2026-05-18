"use client"

import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useView } from "@/components/view-toggle"

const lvtLayers = [
  {
    layer: 1,
    name: "Strategic Control",
    objective: "One source of truth, clear decisions",
    internal: "Metrics and key results — TBD, in development.",
  },
  {
    layer: 2,
    name: "Execution Leverage",
    objective: "Tasks → routed outputs without manual orchestration",
    internal: "Metrics and key results — TBD, in development.",
  },
  {
    layer: 3,
    name: "Workforce Efficiency",
    objective: "Right AI worker, right job, right cost",
    internal: "Metrics and key results — TBD, in development.",
  },
  {
    layer: 4,
    name: "Portfolio Proof",
    objective: "Convert AI OS work into visible evidence",
    internal: "Metrics and key results — TBD, in development.",
  },
  {
    layer: 5,
    name: "Opportunity Intelligence",
    objective: "Identify what is worth building or selling",
    internal: "Metrics and key results — TBD, in development.",
  },
  {
    layer: 6,
    name: "Monetization",
    objective: "Turn clarity + AI capability into income",
    internal: "Metrics and key results — TBD, in development.",
  },
]

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
            {view === "external" ? "Strategic Layers" : "Strategic Layers (Internal View)"}
          </h2>
          {view === "internal" && (
            <p className="mt-2 text-sm text-muted-foreground">
              Detailed metrics and objects per layer — TBD, in development.
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
                      <h3 className="font-semibold text-foreground">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.objective}
                      </p>
                      {view === "internal" && (
                        <p className="mt-3 rounded bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
                          {item.internal}
                        </p>
                      )}
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
                  (top-right) to see additional development notes.
                </>
              ) : (
                <>
                  Internal view shows work-in-progress details. Toggle to{" "}
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
