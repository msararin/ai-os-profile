import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExperimentTabs } from "./experiment-tabs"

export const metadata: Metadata = {
  title: "NBO–NRT Telco on Azure Databricks",
  description:
    "A governed NBO–NRT learning Cockpit separating the completed synthetic model experiment from the planned low-volume Silver baseline.",
}

const experimentOneMetrics = [
  ["Training rows", "8,002"],
  ["Test rows", "1,998"],
  ["Positive rate", "31.48%"],
  ["ROC AUC", "0.6294"],
  ["PR AUC", "0.3941"],
  ["Threshold 0.50 F1", "0.0000"],
  ["Analyzed threshold", "0.24 — not approved"],
  ["Threshold 0.24 F1", "0.4955"],
]

export default function NboNrtAzureDatabricksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="flex justify-end">
          <div className="text-right text-sm leading-6 text-muted-foreground">
            <p>Experiment structure updated 6 Aug 2026</p>
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
              <Badge variant="outline">Two experiments</Badge>
            </div>
            <h1 className="mt-4 max-w-5xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              NBO–NRT Telco on Azure Databricks
            </h1>
            <p className="mt-4 max-w-4xl text-base leading-7 text-muted-foreground sm:text-lg">
              A governed learning path that now separates the completed synthetic model experiment from a planned low-volume Silver baseline before reinforcement learning.
            </p>
            <Alert className="mt-6 border-amber-500/30 bg-amber-500/5">
              <AlertDescription className="text-sm leading-6">
                <strong>Experiment 1</strong> is completed synthetic learning evidence with a model-quality gap. <strong>Experiment 2</strong> is planned and intentionally shows no results until execution and read-back are complete.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        <ExperimentTabs />

        <section className="py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Experiment 1 evidence retained</h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
              The existing evidence remains visible below so the experiment split does not erase prior work. The first experiment proved a bounded data-to-MLflow lifecycle, but it did not prove operator behaviour, production performance, or business readiness.
            </p>
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <Card>
                <CardHeader><CardTitle>Lifecycle evidence</CardTitle></CardHeader>
                <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
                  <p>Small governed package: <strong className="text-foreground">11 canonical CSV tables, 805 source rows</strong></p>
                  <p>Bronze: <strong className="text-foreground">12 governed tables, 806 total rows</strong></p>
                  <p>Silver and model-ready preparation: <strong className="text-foreground">completed and read back</strong></p>
                  <p>Model experiment volume: <strong className="text-foreground">10,000 synthetic observations</strong></p>
                  <p>MLflow and Unity Catalog Registry: <strong className="text-foreground">completed</strong></p>
                  <p>Registered model alias: <strong className="text-foreground">Candidate, not Champion</strong></p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Quality evidence</CardTitle></CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[420px] text-left text-sm">
                      <tbody className="divide-y divide-border text-muted-foreground">
                        {experimentOneMetrics.map(([metric, value]) => (
                          <tr key={metric}><th className="p-2 text-foreground">{metric}</th><td className="p-2">{value}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Alert className="mt-5 border-red-500/40 bg-red-500/5">
              <AlertDescription className="text-sm leading-6">
                Default threshold 0.50 failed for the positive class. Threshold 0.24 was analyzed, not approved. Production promotion remains unauthorized.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        <section className="border-t border-border bg-muted/20 py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Current claim boundary</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                ["Experiment 1", "Completed synthetic learning evidence"],
                ["Experiment 2", "Planned / not executed"],
                ["RL readiness", "Not proven"],
                ["Production readiness", "Not authorized"],
              ].map(([title, value]) => (
                <Card key={title}><CardContent className="space-y-2 p-5"><p className="font-semibold text-foreground">{title}</p><p className="text-sm leading-6 text-muted-foreground">{value}</p></CardContent></Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
