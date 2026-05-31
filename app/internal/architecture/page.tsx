import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const reviewAreas = [
  {
    title: "Historical benchmark notes",
    detail: "Not live. Reconcile private evidence before reusing any speed, accuracy, privacy, or cost claim.",
  },
  {
    title: "Budget discipline",
    detail: "Policy and telemetry integration pending verification. No automatic threshold behavior is proven.",
  },
  {
    title: "Privacy architecture",
    detail: "Review boundary only. Do not infer secure, compliant, or zero-leakage maturity.",
  },
  {
    title: "Validation evidence",
    detail: "Use release-time build, typecheck, route, public/private scan, and human review evidence.",
  },
]

export default function InternalArchitecturePage() {
  return (
    <PageLayout>
      <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/internal/dashboard" className="text-sm font-medium text-primary hover:underline">
          ← Back to Internal Dashboard
        </Link>
        <Badge variant="outline" className="ml-3">Trust quarantine</Badge>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Internal Architecture Evidence Review
        </h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          Historical snapshot, not live. This page no longer presents unsupported benchmark or maturity
          values as current operational truth.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {reviewAreas.map((area) => (
            <Card key={area.title}>
              <CardHeader>
                <CardTitle className="text-base">{area.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{area.detail}</CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6 border-primary/30">
          <CardHeader>
            <CardTitle>Current Internal Architecture Map</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Use <Link href="/internal/aios-architecture-map" className="font-medium text-primary hover:underline">
              /internal/aios-architecture-map
            </Link> for the curated big-picture explanation. It is a review surface, not source of truth
            or execution approval.
          </CardContent>
        </Card>
      </section>
    </PageLayout>
  )
}
