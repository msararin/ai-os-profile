import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const evidenceAreas = [
  "Execution traces",
  "Routing decisions",
  "Cost and usage evidence",
  "Reliability signals",
  "Deployment readiness checks",
]

export default function ObservabilityPage() {
  return (
    <PageLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <Badge variant="outline">Phase 1 / public-safe explanation</Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            AIOS Observability Layer
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Captures execution traces, routing decisions, cost/usage evidence, reliability signals,
            and deployment readiness checks.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:px-6 lg:px-8">
          <Card className="border-yellow-500/40">
            <CardHeader>
              <CardTitle>Runtime Boundary</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              In Phase 1, telemetry production and store behavior remain implemented in optimize-worker
              while AIOS owns the governance meaning of the evidence. This public page is not a live
              metrics dashboard and does not imply a full production observability platform exists.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Evidence Areas</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {evidenceAreas.map((area) => (
                <div key={area} className="rounded-lg border bg-muted/20 p-3 text-sm text-muted-foreground">
                  {area}
                </div>
              ))}
            </CardContent>
          </Card>

          <p className="text-sm text-muted-foreground">
            Operational values remain hidden unless explicitly marked “Verified as of” with a named
            source and timestamp. Release-time snapshots may be shown only as historical evidence.
          </p>
        </div>
      </section>
    </PageLayout>
  )
}
