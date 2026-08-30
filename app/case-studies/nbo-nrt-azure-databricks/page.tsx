import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { BusinessDecisionsLens } from "./business-decisions-lens"
import { ExperimentTabs } from "./experiment-tabs"
import { EngineeringEvidenceLens } from "./engineering-evidence-lens"
import { ModelsExperimentsLens } from "./models-experiments-lens"

export const metadata: Metadata = {
  title: "NBO–NRT Telco on Azure Databricks",
  description:
    "A bounded Telco proof-of-concept execution path for governed next-best-offer decisioning on Azure Databricks.",
}

function statusBadgeClass(status: string) {
  const normalized = status.toLowerCase()
  if (["complete", "completed", "verified", "proven", "passed"].includes(normalized)) return "border-emerald-700 bg-emerald-100 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950 dark:text-emerald-100"
  if (normalized.includes("in progress")) return "border-indigo-500 bg-indigo-100 text-indigo-900 dark:border-indigo-500 dark:bg-indigo-950 dark:text-indigo-100"
  if (normalized.includes("not approved") || normalized.includes("blocked") || normalized.includes("failed")) return "border-red-600 bg-red-100 text-red-900 dark:border-red-500 dark:bg-red-950 dark:text-red-100"
  return "border-slate-500 bg-slate-200 text-slate-950 dark:border-slate-500 dark:bg-slate-800 dark:text-slate-100"
}

export default function NboNrtAzureDatabricksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="mx-auto w-full max-w-5xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="flex justify-end">
          <div className="text-right text-sm leading-6 text-muted-foreground">
            <p>Evidence on this page reconciled through 30 Aug 2026</p>
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
            <div className="mt-3 inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border border-border bg-muted/20 px-3 py-2 text-[11px] font-medium text-muted-foreground" aria-label="Status color legend">
              <span className="font-semibold text-foreground">Status colors:</span>
              <span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-500" />Passed / completed</span>
              <span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-indigo-500" />Active / in progress</span>
              <span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-amber-500" />Caution / issue</span>
              <span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-red-500" />Blocked / failed</span>
              <span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-slate-500" />Parked / future</span>
            </div>
            <h1 className="mt-4 max-w-5xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">NBO–NRT Telco on Azure Databricks</h1>
            <p className="mt-4 max-w-4xl text-base leading-7 text-muted-foreground sm:text-lg">From governed synthetic data to a registered Candidate model—with model-quality and production boundaries disclosed.</p>

            <div className="mt-6 rounded-xl border border-indigo-500/25 bg-indigo-500/5 p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-indigo-800 dark:text-indigo-200">Business objective</p>
              <p className="mt-3 max-w-4xl text-lg font-semibold leading-8 text-foreground">
                Build a governed Next-Best-Offer decisioning approach for Telco that can choose a more relevant offer for each customer context while preserving enough exploration to keep learning over time.
              </p>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
                The goal is not simply to predict response. It is to create a decision system that balances customer relevance, policy learning, evidence quality, and operational governance before any production claim is made.
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <div className="rounded-lg border border-border bg-background p-4">
                  <p className="font-semibold text-foreground">Improve decision relevance</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">Choose offers using customer and decision context instead of relying on one static rule.</p>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <p className="font-semibold text-foreground">Preserve learning</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">Avoid locking permanently into the current winner so alternative actions can continue generating evidence.</p>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <p className="font-semibold text-foreground">Govern the decision path</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">Keep data lineage, model evidence, policy logic, and claim boundaries auditable across the decision lifecycle.</p>
                </div>
              </div>
            </div>

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

        <section className="border-y border-border bg-muted/20 py-10" aria-labelledby="cockpit-lenses-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-indigo-700 dark:text-indigo-300">Cockpit structure</p>
              <h2 id="cockpit-lenses-heading" className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                One decision system, three review lenses
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                Choose the question you need to answer. Each lens has one primary home, while related material will cross-link instead of being duplicated.
              </p>
            </div>

            <nav className="mt-6 grid gap-4 md:grid-cols-3" aria-label="NBO-NRT Cockpit lenses">
              <a href="#business-decisions" className="rounded-xl border border-border bg-background p-5 transition-colors hover:border-indigo-500/50 hover:bg-indigo-500/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-indigo-700 dark:text-indigo-300">Why?</p>
                <p className="mt-2 font-semibold text-foreground">Business &amp; Decisions</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Start with the decision, available actions, constraints, and claim boundaries.</p>
              </a>
              <a href="#models-experiments" className="rounded-xl border border-border bg-background p-5 transition-colors hover:border-indigo-500/50 hover:bg-indigo-500/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-indigo-700 dark:text-indigo-300">Learn?</p>
                <p className="mt-2 font-semibold text-foreground">Models &amp; Experiments</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Follow formulation, experiment questions, evaluation, limitations, and decisions.</p>
              </a>
              <a href="#engineering-evidence" className="rounded-xl border border-border bg-background p-5 transition-colors hover:border-indigo-500/50 hover:bg-indigo-500/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-indigo-700 dark:text-indigo-300">Trust?</p>
                <p className="mt-2 font-semibold text-foreground">Engineering &amp; Evidence</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Trace data, artifacts, lineage, recovery, controls, and reproducibility.</p>
              </a>
            </nav>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              <BusinessDecisionsLens />

              <ModelsExperimentsLens />

              <EngineeringEvidenceLens />
            </div>

            <Alert className="mt-6 border-slate-500/30 bg-background">
              <AlertDescription className="text-sm leading-6">
                <strong>Migration boundary.</strong> Existing Cockpit and experiment content remains intact below. All three narratives now have primary homes; no underlying evidence, gate status, Event Ledger, or experiment state changed in this phase.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        <div id="legacy-experiment-evidence" className="nbo-nrt-cockpit scroll-mt-24">
          <ExperimentTabs />
        </div>

        <style>{`
          .nbo-nrt-cockpit details {
            transition: border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease;
          }
          .nbo-nrt-cockpit details > summary {
            position: relative;
            padding-right: 9.5rem !important;
            background: color-mix(in srgb, hsl(var(--muted)) 42%, transparent);
            border-radius: 0.5rem;
            transition: background-color 160ms ease, color 160ms ease;
          }
          .nbo-nrt-cockpit details > summary:hover {
            background: color-mix(in srgb, hsl(var(--primary)) 10%, hsl(var(--muted)) 38%);
          }
          .nbo-nrt-cockpit details > summary::after {
            content: "Click to expand ↓";
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            border: 1px solid hsl(var(--border));
            border-radius: 9999px;
            padding: 0.25rem 0.6rem;
            background: hsl(var(--background));
            color: hsl(var(--primary));
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.01em;
            white-space: nowrap;
          }
          .nbo-nrt-cockpit details[open] > summary::after {
            content: "Details shown ↑";
          }
          .nbo-nrt-cockpit details[open] {
            border-color: color-mix(in srgb, hsl(var(--primary)) 45%, hsl(var(--border)));
            box-shadow: 0 0 0 1px color-mix(in srgb, hsl(var(--primary)) 14%, transparent);
          }

          /* Experiment 1 only: reserve enough room for the right-side affordance so long titles wrap instead of colliding. */
          @media (min-width: 641px) {
            .nbo-nrt-cockpit > section > div > div.rounded-b-xl > div > section:first-of-type details > summary {
              padding-right: 13.5rem !important;
              overflow-wrap: anywhere;
            }
          }

          /* Experiment 1 only: M5 is an inferred traceability label, not a known internal-system definition. */
          .nbo-nrt-cockpit > section > div > div.rounded-b-xl > div > section:nth-of-type(2) tbody > tr:nth-child(4) > th::after {
            content: "*";
          }
          .nbo-nrt-cockpit > section > div > div.rounded-b-xl > div > section:nth-of-type(2) tbody > tr:nth-child(4) > td::after {
            content: "  M5* is assumed from the provided context; its actual internal meaning is unknown.";
            font-weight: 600;
            color: hsl(var(--foreground));
          }

          @media (max-width: 640px) {
            .nbo-nrt-cockpit details > summary {
              padding-right: 2.75rem !important;
            }
            .nbo-nrt-cockpit details > summary::after {
              content: "+";
              right: 0.8rem;
              width: 1.7rem;
              height: 1.7rem;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              padding: 0;
              font-size: 1rem;
            }
            .nbo-nrt-cockpit details[open] > summary::after {
              content: "−";
            }
          }
        `}</style>
      </main>
      <SiteFooter />
    </div>
  )
}
