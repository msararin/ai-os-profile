import Link from "next/link"
import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const deliveryPath = [
  "Governed source ingestion and data-quality controls",
  "Reproducible model-ready data and leakage controls",
  "MLflow experiment evidence and model-governance gates",
  "Batch scoring, monitoring, and human operational handoff",
]

const claimBoundaries = [
  "No production accuracy or production-readiness claim",
  "No causal-driver or campaign-uplift claim",
  "No realised revenue-impact claim",
  "No validity claim for a real telecommunications operator",
]

const executiveFacts = [
  {
    label: "Business decision",
    value: "Prioritise sample customers for hypothetical retention review",
  },
  {
    label: "Delivery evidence",
    value: "Bronze, Silver, and Features accepted",
  },
  {
    label: "Next gate",
    value: "MLflow experiment evidence",
  },
  {
    label: "Claim ceiling",
    value: "Learning/demo only · Production readiness not proven",
  },
]

const mlopsProgress = [
  { label: "ADLS", status: "Done", tone: "done" },
  { label: "Unity Catalog", status: "Done", tone: "done" },
  { label: "Bronze", status: "Done", tone: "done" },
  { label: "Silver", status: "Done", tone: "done" },
  { label: "Features", status: "Done", tone: "done" },
  { label: "MLflow", status: "Next", tone: "next" },
  { label: "Model Registry", status: "Planned", tone: "planned" },
  { label: "Batch Inference", status: "Planned", tone: "planned" },
  { label: "Monitoring", status: "Planned", tone: "planned" },
]
export const metadata: Metadata = {
  title: "Telco Churn MLOps Learning Use Case | Sararin",
  description:
    "Preparation view for a governed IBM Telco Customer Churn MLOps learning and demonstration use case.",
}

export default function TelcoChurnMLOpsCaseStudyPage() {
  return (
    <PageLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <Link
            href="/case-studies"
            className="mb-5 inline-flex text-sm font-medium text-primary hover:underline"
          >
            Back to Case Studies
          </Link>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">IBM Telco Customer Churn</Badge>
            <Badge variant="outline">Azure Databricks MLOps</Badge>
            <Badge>Prep</Badge>
          </div>
          <h1 className="mt-4 max-w-5xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Telco Churn MLOps
          </h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-muted-foreground sm:text-lg">
            Governed customer-churn retention decision support, prepared as a time-boxed learning
            and demonstration use case.
          </p>
          <Alert className="mt-6 border-primary/25 bg-primary/5">
            <AlertDescription className="text-sm leading-6">
              <strong>Prep:</strong> This case-study presentation is being prepared. The page
              separates the intended demonstration from production or real-world outcome claims.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
              Executive summary
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              A governed MLOps capability demonstration
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <Card>
              <CardHeader>
                <CardTitle>Purpose</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
                <p>
                  This use case is designed to demonstrate a governed Azure Databricks MLOps
                  delivery pattern using the IBM Telco Customer Churn sample dataset.
                </p>
                <p>
                  The intended business output is a reviewable retention decision dataset: identify
                  sample customers with elevated churn propensity and prioritise human review using
                  an estimated monthly revenue-at-risk proxy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current public status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
                <div className="rounded-md border border-primary/25 bg-primary/5 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">Status</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">Prep</p>
                </div>
                <p>
                  The IBM dataset is fictional/sample data for learning and demonstration. It is not
                  real customer or operator data.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {executiveFacts.map((fact) => (
              <Card key={fact.label}>
                <CardContent className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {fact.label}
                  </p>
                  <p className="mt-2 text-sm font-medium leading-6 text-foreground">{fact.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/25 py-5" aria-labelledby="mlops-progress-title">
        <div className="mx-auto max-w-6xl overflow-x-auto px-4 sm:px-6 lg:px-8">
          <h2 id="mlops-progress-title" className="mb-4 text-lg font-semibold tracking-tight text-foreground">
            Azure Databricks MLOps Learning Progress
          </h2>
          <div className="grid min-w-[900px] grid-cols-9 gap-4">
            {mlopsProgress.map((stage) => (
              <div key={stage.label} className="min-w-0">
                <p className="min-h-10 text-sm font-semibold leading-5 text-foreground">
                  {stage.label}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <span
                    aria-hidden="true"
                    className={
                      stage.tone === "done"
                        ? "text-base leading-none"
                        : stage.tone === "next"
                          ? "inline-block size-4 shrink-0 bg-amber-400"
                          : "inline-block size-4 shrink-0 rounded-sm bg-muted-foreground/20"
                    }
                  >
                    {stage.tone === "done" ? "✅" : null}
                  </span>
                  <span>{stage.status}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Progress reflects completed hands-on evidence, not conceptual understanding alone.
          </p>
        </div>
      </section>
      <section className="border-y border-border bg-muted/25 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
              Demonstration scope
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              What the learning path connects
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {deliveryPath.map((item, index) => (
              <Card key={item}>
                <CardContent className="flex gap-4 p-5 text-sm leading-6 text-muted-foreground">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {index + 1}
                  </span>
                  <p>{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Decision focus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
              <p>
                Can sample customers likely to churn be identified, prioritised with a transparent
                revenue-at-risk proxy, and delivered through a traceable workflow for hypothetical
                Retention-team review?
              </p>
              <p>
                Scores and reason indicators support human review. They do not autonomously choose
                customer treatment, retrain a model, or promote a model version.
              </p>
            </CardContent>
          </Card>

          <Card className="border-destructive/20">
            <CardHeader>
              <CardTitle>Claim boundary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 text-sm leading-6 text-muted-foreground">
              {claimBoundaries.map((claim) => (
                <div key={claim} className="rounded-md border border-border bg-muted/25 px-3 py-2">
                  {claim}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  )
}
