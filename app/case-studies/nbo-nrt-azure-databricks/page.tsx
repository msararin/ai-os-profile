import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ExperimentTabs } from "./experiment-tabs"

export const metadata: Metadata = {
  title: "NBO–NRT Telco on Azure Databricks",
  description:
    "A bounded Telco proof-of-concept execution path for governed next-best-offer decisioning on Azure Databricks.",
}

function statusBadgeClass(status: string) {
  const normalized = status.toLowerCase()
  if (["complete", "completed", "verified", "proven", "passed"].includes(normalized)) return "border-emerald-700 bg-emerald-100 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950 dark:text-emerald-100"
  if (normalized.includes("in progress") || normalized.includes("not approved")) return "border-amber-700 bg-amber-100 text-amber-950 dark:border-amber-500 dark:bg-amber-950 dark:text-amber-100"
  return "border-slate-500 bg-slate-200 text-slate-950 dark:border-slate-500 dark:bg-slate-800 dark:text-slate-100"
}

export default function NboNrtAzureDatabricksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="mx-auto w-full max-w-5xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="flex justify-end">
          <div className="text-right text-sm leading-6 text-muted-foreground">
            <p>Evidence on this page reconciled through 5 Aug 2026</p>
            <p>Curated static release — not a continuous live-status feed</p>
          </div>
        </div>
      </div>
      <main className="flex-1">
        <section className="border-b border-border bg-background">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Telco decision intelligence</Badge>
              <Badge variant="outline">Azure Databricks</Badge>
              <Badge className={statusBadgeClass("In Progress")}>In Progress</Badge>
            </div>
            <h1 className="mt-4 max-w-5xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">NBO–NRT Telco on Azure Databricks</h1>
            <p className="mt-4 max-w-4xl text-base leading-7 text-muted-foreground sm:text-lg">From governed synthetic data to a registered Candidate model—with model-quality and production boundaries disclosed.</p>
            <Alert className="mt-6 border-amber-500/30 bg-amber-500/5">
              <AlertDescription className="text-sm leading-6"><strong>Synthetic experiment only.</strong> The data-to-MLflow lifecycle executed, but threshold 0.50 failed for the positive class, threshold 0.24 is not approved, model discrimination is weak-to-moderate, and business/production readiness remain unproven.</AlertDescription>
            </Alert>
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Current evidence snapshot</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[["Data to Bronze", "Complete", "ADLS, Unity Catalog, 12 Bronze tables, and Bronze Quality Gate."], ["Silver / model-ready", "Complete", "Bounded synthetic preparation and model-ready gate passed."], ["MLflow / Registry", "Verified", "Training, tracking, registration, Candidate alias, and read-back."], ["Business readiness", "Not approved", "No approved operating threshold, Champion, or production promotion."]].map(([title, status, detail]) => (
                <Card key={title}>
                  <CardContent className="space-y-3 p-5">
                    <p className="font-semibold text-foreground">{title}</p>
                    <Badge variant="outline" className={statusBadgeClass(status)}>{status}</Badge>
                    <p className="text-sm leading-6 text-muted-foreground">{detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <ExperimentTabs />
      </main>
      <SiteFooter />
    </div>
  )
}
