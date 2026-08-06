import type { Metadata } from "next"
import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Educational Data Preparation Appendix — NBO–NRT",
  description:
    "An educational appendix describing rule- and assumption-based completion of synthetic NBO learning data when direct-fit public data is incomplete.",
}

const steps = [
  ["1. Preserve source-derived structure", "Use public or approved source structure only where it is suitable and traceable."],
  ["2. Identify relationship gaps", "Record missing customer–offer, eligibility, exposure, response, reward, and temporal links before generating anything."],
  ["3. Define explicit rules", "Create bounded rules for eligibility, exclusions, event order, probability ranges, and outcome sampling."],
  ["4. Generate only what is required", "Create the minimum synthetic relationships needed to exercise the learning and MLOps lifecycle."],
  ["5. Retain provenance", "Store source origin, derivation type, rule version, generation run, timestamps, and evidence-lane markers."],
  ["6. Validate before use", "Check schema, ranges, referential closure, temporal consistency, class distribution, and train/test leakage."],
]

export default function DataPreparationAppendixPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border bg-background">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Appendix</Badge>
              <Badge variant="outline">Educational use</Badge>
              <Badge variant="outline">Synthetic data</Badge>
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Another data-preparation route for learning
            </h1>
            <p className="mt-4 max-w-4xl text-base leading-7 text-muted-foreground sm:text-lg">
              When direct-fit public data is incomplete, explicit rules and documented assumptions can be used to create a more complete synthetic learning dataset. The purpose is to exercise the data and MLOps lifecycle—not to recreate or claim real operator behaviour.
            </p>
            <Alert className="mt-6 border-amber-500/30 bg-amber-500/5">
              <AlertDescription className="text-sm leading-6">
                <strong>Educational boundary:</strong> generated relationships, labels, rewards, and outcomes are assumptions unless their lineage is independently proven. They must not be presented as observed customer behaviour, causal evidence, or production truth.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Why this method exists</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Card><CardHeader><CardTitle>The practical gap</CardTitle></CardHeader><CardContent className="text-sm leading-7 text-muted-foreground">No single public source may contain a complete customer context, offer catalogue, eligibility decision, exposure, response, reward, and next-state sequence.</CardContent></Card>
              <Card><CardHeader><CardTitle>The bounded response</CardTitle></CardHeader><CardContent className="text-sm leading-7 text-muted-foreground">Use traceable source structure where possible, then generate only the missing relationships needed for a controlled experiment under explicit rule versions and provenance.</CardContent></Card>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-muted/20 py-10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Governed preparation sequence</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {steps.map(([title, description]) => (
                <Card key={title}><CardHeader><CardTitle className="text-lg">{title}</CardTitle></CardHeader><CardContent className="text-sm leading-7 text-muted-foreground">{description}</CardContent></Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Required disclosure</h2>
            <div className="mt-5 overflow-x-auto rounded-lg border border-border">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-muted/50"><tr><th className="p-3">Element</th><th className="p-3">Required label</th></tr></thead>
                <tbody className="divide-y divide-border text-muted-foreground">
                  {[
                    ["Source fields", "Source-derived with publisher, retrieval date, and license boundary"],
                    ["Generated relationships", "Synthetic / assumption-derived with rule and run version"],
                    ["Labels and rewards", "Proxy or generated until label lineage is proven"],
                    ["Model results", "Learning evidence only; not operator or production performance"],
                    ["Eligibility logic", "PoC rule; not an operator production rule"],
                    ["RL readiness", "Unproven until exposure, response, counterfactual, and policy telemetry exist"],
                  ].map(([element, label]) => <tr key={element}><th className="p-3 text-foreground">{element}</th><td className="p-3">{label}</td></tr>)}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-sm leading-7 text-muted-foreground">
              This route is useful for education because it lets the learner test contracts, lineage, feature preparation, model tracking, registration, scoring, and monitoring controls. Its value is process learning and reproducibility—not authenticity of the generated business outcome.
            </p>
            <Link className="mt-6 inline-block font-semibold text-primary underline underline-offset-4" href="/case-studies/nbo-nrt-azure-databricks">
              Return to the NBO–NRT Cockpit
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
