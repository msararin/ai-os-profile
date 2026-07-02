import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const caseStudies = [
  {
    title: "Evidence Discipline for AI-Assisted Delivery",
    status: "In progress",
    category: "AI-assisted delivery",
    summary:
      "A developing case study on turning delivery evidence, assumptions, and recovery constraints into a safe public story before an entry is treated as complete.",
    boundary: "Not yet a completed case study or validation claim.",
    cta: "View in-progress story",
    href: "/case-studies/evidence-discipline-ai-assisted-delivery",
  },
  {
    title: "Company M AI Adoption Measurement Study",
    status: "Bounded evidence",
    category: "AI adoption measurement",
    summary:
      "A bounded evidence case study on how AI adoption work becomes measurable, traceable, and claim-safe across controlled execution rounds.",
    boundary: "Not a production, ROI, full automation, or real-world business outcome claim.",
    cta: "View case study",
    href: "/case-studies/case-003/round3-evidence-ladder",
  },
]

export default function CaseStudiesPage() {
  return (
    <PageLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Case-study index</Badge>
            <Badge variant="outline">Evidence boundaries</Badge>
            <Badge variant="outline">AI delivery</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Case Studies
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            Practical AI delivery stories, shown with clear evidence boundaries.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            These case studies separate what is live, what is in progress, and what remains
            intentionally unclaimed.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Current case studies
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Each card opens a detail page with the story, evidence trail, claim boundary, and
              current status.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {caseStudies.map((study) => (
              <Card key={study.href} className="flex h-full flex-col">
                <CardHeader>
                  <div className="mb-3 flex flex-wrap gap-2">
                    <Badge variant="outline">{study.category}</Badge>
                    <Badge variant="outline">{study.status}</Badge>
                  </div>
                  <CardTitle>{study.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between gap-5 text-sm leading-6 text-muted-foreground">
                  <div className="space-y-3">
                    <p>{study.summary}</p>
                    <p className="rounded-md border border-border bg-muted/25 px-3 py-2 text-xs leading-5">
                      {study.boundary}
                    </p>
                  </div>
                  <Link
                    href={study.href}
                    className="inline-flex w-fit rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {study.cta}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
