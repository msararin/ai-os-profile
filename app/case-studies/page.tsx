import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const caseStudies = [
  {
    title: "Text to Audio — Listen to Your Documents",
    status: "Invited beta",
    statusTone: "active",
    category: "Document listening",
    flagship: false,
    summary:
      "No time to read? Turn documents or pasted Thai–English–Chinese text into an MP3 to listen to whenever it suits you.",
    boundary:
      "Invitation code required. Speech generation is available while the host is online; pronunciation is still being tested.",
    cta: "View use case",
    href: "/case-studies/txttoaudio",
    reportHref: "/case-studies/txttoaudio#report",
  },
  {
    // Claims: CL-001, CL-003, CL-012, CL-016, CL-017
    title: "NBO–NRT Telco on Azure Databricks",
    status: "In Progress",
    statusTone: "active",
    category: "Decision intelligence",
    flagship: true,
    summary:
      "Local composite implementation proven across 11 tables and 805 bounded rows; modeling and Azure Databricks implementation not started.",
    boundary:
      "Local composite evidence only. No real Telco customer data, model, Azure Databricks, production latency, operator validity, or production-readiness claim.",
    cta: "View use-case design",
    href: "/case-studies/nbo-nrt-azure-databricks",
  },
  {
    title: "Telco Churn MLOps Learning Use Case",
    status: "Parked",
    statusTone: "parked",
    category: "MLOps learning",
    flagship: false,
    summary:
      "A time-boxed learning and demonstration use case for a governed customer-churn retention decision-support workflow.",
    boundary:
      "Sample data only. No production accuracy, causal impact, campaign uplift, or real-operator validity claim.",
    cta: "View parked status",
    href: "/case-studies/telco-churn-mlops",
  },
  {
    title: "Evidence Discipline for AI-Assisted Delivery",
    status: "Parked",
    statusTone: "parked",
    category: "AI-assisted delivery",
    flagship: false,
    summary:
      "A developing case study on turning delivery evidence, assumptions, and recovery constraints into a safe public story before an entry is treated as complete.",
    boundary: "Not yet a completed case study or validation claim.",
    cta: "View parked story",
    href: "/case-studies/evidence-discipline-ai-assisted-delivery",
  },
  {
    title: "Company M AI Adoption Measurement Study",
    status: "Bounded evidence",
    statusTone: "complete",
    category: "AI adoption measurement",
    flagship: false,
    summary:
      "A bounded evidence case study on how AI adoption work becomes measurable, traceable, and claim-safe across controlled execution rounds.",
    boundary: "Not a production, ROI, full automation, or real-world business outcome claim.",
    cta: "View case study",
    href: "/case-studies/case-003/round3-evidence-ladder",
  },
]

function statusBadgeClass(statusTone: string) {
  if (statusTone === "active") {
    return "border-indigo-500/40 bg-indigo-500/10 text-indigo-800 dark:text-indigo-200"
  }

  if (statusTone === "complete") {
    return "border-emerald-600/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200"
  }

  return "border-slate-400/40 bg-slate-500/5 text-slate-700 dark:text-slate-300"
}

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
                    <Badge variant="outline" className={statusBadgeClass(study.statusTone)}>
                      {study.status}
                    </Badge>
                    {study.flagship ? (
                      <Badge
                        variant="outline"
                        className="border-foreground/25 bg-foreground/5 text-foreground"
                      >
                        FLAGSHIP CASE STUDY ⭐
                      </Badge>
                    ) : null}
                  </div>
                  <CardTitle>{study.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between gap-5 text-sm leading-6 text-muted-foreground">
                  <div className="space-y-3">
                    <p>{study.summary}</p>
                    <p className="rounded-md border border-border bg-muted/25 px-3 py-2 text-xs leading-5">
                      {study.boundary}
                    </p>
                    {study.reportHref ? (
                      <Link
                        href={study.reportHref}
                        className="block rounded-lg border border-border bg-muted/20 p-4 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <span className="block text-sm font-semibold text-foreground">Local validation report →</span>
                        <span className="mt-1 block text-xs leading-5">Test results, review decisions and what remains before launch.</span>
                      </Link>
                    ) : null}
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
