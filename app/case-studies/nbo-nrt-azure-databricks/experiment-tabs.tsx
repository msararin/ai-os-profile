"use client"

import Link from "next/link"
import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const comparisonRows = [
  ["Primary question", "Can the governed data path work end to end?", "Can the low-volume Silver output support a bounded supervised baseline before RL?"],
  ["Data approach", "Small governed composite package, then model volume generated after Silver", "Use the data as it exits Silver before adding new volume"],
  ["Learning objective", "Prove Bronze, Silver, candidate generation, MLflow, Registry, and read-back", "Measure what the current Silver data can support without volume expansion"],
  ["Model scope", "Synthetic propensity baseline on 10,000 generated observations", "Rule-based control plus an interpretable supervised baseline"],
  ["Current status", "Completed with a model-quality gap", "Planned / not executed"],
  ["Claim boundary", "Synthetic experiment only; not operator truth", "Not RL, not causal, low volume, not production-ready"],
]

export function ExperimentTabs() {
  const [activeTab, setActiveTab] = useState<"summary" | "experiment-1" | "experiment-2">("summary")

  const tabClass = (tab: typeof activeTab) =>
    `rounded-t-lg border px-4 py-3 text-sm font-semibold transition ${
      activeTab === tab
        ? "border-border border-b-background bg-background text-foreground"
        : "border-transparent text-muted-foreground hover:text-foreground"
    }`

  return (
    <section className="border-y border-border bg-muted/20 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 border-b border-border">
          <button className={tabClass("summary")} onClick={() => setActiveTab("summary")}>Executive Summary</button>
          <button className={tabClass("experiment-1")} onClick={() => setActiveTab("experiment-1")}>Experiment 1</button>
          <button className={tabClass("experiment-2")} onClick={() => setActiveTab("experiment-2")}>Experiment 2</button>
        </div>

        <div className="rounded-b-xl border border-t-0 border-border bg-background p-5 sm:p-7">
          {activeTab === "summary" ? (
            <div className="space-y-7">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">Two experiments, one governed learning path</h2>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
                  Experiment 1 proved the governed data and MLOps path using a synthetic experiment lane. Experiment 2 deliberately changes the question: before adding more generated volume, test what the current low-volume Silver output can support as a simpler baseline.
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <Card>
                  <CardHeader><CardTitle>Experiment 1 — Governed synthetic model experiment</CardTitle></CardHeader>
                  <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
                    <Badge variant="outline">Completed with quality gap</Badge>
                    <p>Small governed source package first; synthetic model volume was added only after Silver was stable.</p>
                    <p>Training, MLflow tracking, Registry, Candidate alias, and read-back were completed. Business readiness was not approved.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Experiment 2 — Low-volume Silver baseline</CardTitle></CardHeader>
                  <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
                    <Badge variant="outline">Planned / not executed</Badge>
                    <p>Use the data directly after Silver, before additional volume generation, to establish a transparent baseline.</p>
                    <p>Target scope: rule-based control plus interpretable supervised learning. This is not reinforcement learning or causal evidence.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full min-w-[840px] text-left text-sm">
                  <thead className="bg-muted/50"><tr><th className="p-3">Dimension</th><th className="p-3">Experiment 1</th><th className="p-3">Experiment 2</th></tr></thead>
                  <tbody className="divide-y divide-border text-muted-foreground">
                    {comparisonRows.map(([dimension, first, second]) => (
                      <tr key={dimension}><th className="p-3 align-top text-foreground">{dimension}</th><td className="p-3 align-top">{first}</td><td className="p-3 align-top">{second}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Alert className="border-amber-500/30 bg-amber-500/5">
                <AlertDescription className="text-sm leading-6">
                  No Experiment 2 metrics are shown because training and evaluation have not yet been executed.
                </AlertDescription>
              </Alert>

              <Card>
                <CardHeader><CardTitle>Data-preparation appendix</CardTitle></CardHeader>
                <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
                  <p>An additional educational preparation route documents how explicit rules and assumptions can be used to create a more complete synthetic learning dataset when direct-fit data is incomplete.</p>
                  <p>This appendix is separated from the main Cockpit so the educational method cannot be mistaken for observed operator data.</p>
                  <Link className="font-semibold text-primary underline underline-offset-4" href="/case-studies/nbo-nrt-azure-databricks/data-preparation-appendix">
                    Open the educational data-preparation appendix
                  </Link>
                </CardContent>
              </Card>
            </div>
          ) : null}

          {activeTab === "experiment-1" ? (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3"><h2 className="text-2xl font-semibold tracking-tight text-foreground">Experiment 1</h2><Badge variant="outline">Completed with quality gap</Badge></div>
              <p className="max-w-4xl text-sm leading-7 text-muted-foreground">The first experiment is the existing governed synthetic lane: small package first, Bronze and Silver proof, candidate generation, later volume expansion, model training, MLflow tracking, Unity Catalog registration, Candidate alias assignment, and registered-model read-back.</p>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[["Data path", "Complete"], ["Silver / model-ready", "Complete"], ["MLflow / Registry", "Verified"], ["Business readiness", "Not approved"]].map(([title, status]) => (
                  <Card key={title}><CardContent className="space-y-3 p-5"><p className="font-semibold text-foreground">{title}</p><Badge variant="outline">{status}</Badge></CardContent></Card>
                ))}
              </div>
              <Alert className="border-red-500/30 bg-red-500/5"><AlertDescription className="text-sm leading-6">The first experiment must remain labelled as synthetic experiment evidence, not operator behaviour truth or production performance evidence.</AlertDescription></Alert>
            </div>
          ) : null}

          {activeTab === "experiment-2" ? (
            <div className="flex min-h-[360px] items-center justify-center rounded-lg border border-dashed border-border bg-muted/10 p-8 text-center">
              <div className="max-w-2xl space-y-4">
                <div className="flex justify-center"><Badge variant="outline">Planned / not executed</Badge></div>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">Experiment 2 — Low-volume Silver baseline</h2>
                <p className="text-sm leading-7 text-muted-foreground">This page is intentionally left open until the Silver-data baseline is trained, evaluated, logged, and read back. No invented metrics or model claims are displayed.</p>
                <p className="text-sm font-semibold text-foreground">Claim boundary: NOT RL · NOT CAUSAL · LOW VOLUME · NOT PRODUCTION-READY</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
