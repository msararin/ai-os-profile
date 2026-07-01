import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const caseStudies = [
  {
    id: "case-003-round3",
    badges: ["CASE-003", "Company M", "Controlled evidence"],
    title: "CASE-003: Company M AI Adoption Measurement Study",
    description:
      "A mock retail-like company context used to explore how AI adoption work becomes measurable, traceable, and claim-safe across controlled execution rounds.",
    status: "Available evidence ladder",
    href: "/case-studies/case-003/round3-evidence-ladder",
    cta: "View evidence ladder",
  },
  {
    id: "case-r01-evidence-discipline",
    badges: ["CASE-R01", "AI governance", "In progress"],
    title: "Evidence Discipline for AI-Assisted Delivery (in progress)",
    description:
      "An in-progress case study exploring evidence discipline: preventing false completion signals before internal AI-assisted work becomes a public claim.",
    status: "Case study in progress - no detail page yet",
    boundary:
      "Not a completed case study, execution closeout, production validation, enterprise validation, readiness claim, Level 4 claim, v5.1 claim, or independent validation.",
    href: null,
    cta: "Case study in progress",
  },
]

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
            {caseStudies.map((study) => (
              <Card key={study.id}>
                <CardHeader>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {study.badges.map((badge) => (
                      <Badge key={badge} variant="outline">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle>{study.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
                  <p>{study.description}</p>
                  <p className="font-medium text-foreground">Status: {study.status}</p>
                  {"boundary" in study && study.boundary ? (
                    <p className="text-muted-foreground">{study.boundary}</p>
                  ) : null}
                  {study.href ? (
                    <Link
                      href={study.href}
                      className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      {study.cta}
                    </Link>
                  ) : (
                    <span
                      aria-disabled="true"
                      className="inline-flex cursor-not-allowed rounded-md border border-border px-4 py-2 text-sm font-medium text-muted-foreground opacity-70"
                    >
                      {study.cta}
                    </span>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
