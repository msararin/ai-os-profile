import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const demonstrated = [
  "A bounded internal review surface exists for benchmark candidates.",
  "Historical KB search and orchestration experiments can be summarized for review.",
  "Claims are separated from proof status before public or business use.",
]

const evidence = [
  "Historical benchmark notes and local validation artifacts may exist in the private working context.",
  "Release-time build, typecheck, route, and boundary scans provide app-level validation evidence.",
  "Robert(GPT)/Lyn review remains required before benchmark claims are treated as decision-ready proof.",
]

const unverified = [
  "Current speed improvement",
  "Current ROI or cost reduction",
  "Current per-deliverable cost",
  "Current search latency",
  "Zero-violation or enterprise-maturity claims",
  "Production workload generalization",
]

export default function ShowcasePage() {
  return (
    <PageLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <Badge variant="outline">Internal proof review</Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Performance Evidence Showcase
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Historical benchmark candidates, not live production metrics. This page is a review surface
            for trust, benchmark, and proof backing.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>What Is Demonstrated</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              {demonstrated.map((item) => (
                <p key={item} className="rounded-lg border bg-muted/20 p-3 text-sm text-muted-foreground">
                  {item}
                </p>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Evidence Backing</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              {evidence.map((item) => (
                <p key={item} className="rounded-lg border bg-muted/20 p-3 text-sm text-muted-foreground">
                  {item}
                </p>
              ))}
            </CardContent>
          </Card>

          <Card className="border-yellow-500/40">
            <CardHeader>
              <CardTitle>Pending Verification</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 sm:grid-cols-2">
              {unverified.map((item) => (
                <div key={item} className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3 text-sm">
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>

          <p className="text-sm text-muted-foreground">
            Maturity note: historical experiments may inform future proof packets, but this page does not
            claim a full production benchmark program or enterprise-ready platform.
          </p>
        </div>
      </section>
    </PageLayout>
  )
}
