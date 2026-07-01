import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CaseStudiesPage() {
  return (
    <PageLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Evidence-oriented</Badge>
            <Badge variant="outline">AI adoption</Badge>
            <Badge variant="outline">Measurement studies</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Case Studies
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            Evidence-oriented AI adoption, execution governance, and measurement case studies.
            These pages explain what was tested, what changed, what evidence was produced, and
            which claims remain outside scope.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="mb-3 flex flex-wrap gap-2">
                  <Badge variant="outline">CASE-003</Badge>
                  <Badge variant="outline">Company M</Badge>
                  <Badge variant="outline">Controlled evidence</Badge>
                </div>
                <CardTitle>CASE-003: Company M AI Adoption Measurement Study</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
                <p>
                  A mock retail-like company context used to explore how AI adoption work becomes
                  measurable, traceable, and claim-safe across controlled execution rounds.
                </p>
                <Link
                  href="/case-studies/case-003/round3-evidence-ladder"
                  className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  View evidence ladder
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-3 flex flex-wrap gap-2">
                  <Badge variant="outline">AI-assisted delivery</Badge>
                  <Badge variant="outline">In progress</Badge>
                </div>
                <CardTitle>Evidence Discipline for AI-Assisted Delivery</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
                <p>
                  An in-progress case study exploring how delivery teams track evidence, surface
                  assumptions, and document constraints when working with AI assistance.
                </p>
                <Link
                  href="/case-studies/evidence-discipline-ai-assisted-delivery"
                  className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  View in-progress story
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
