import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Blocks,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Database,
  FlaskConical,
  Network,
  ShieldCheck,
} from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Machine Learning & Decision Systems",
  description:
    "Applied machine learning and decision-system work: from business decisions and model experiments to governed engineering evidence.",
}

const lenses = [
  {
    title: "Business & Decisions",
    question: "WHY?",
    icon: BriefcaseBusiness,
    description:
      "Start with the decision to improve, the available actions, success criteria, constraints, and claim boundaries.",
  },
  {
    title: "Models & Experiments",
    question: "LEARN?",
    icon: FlaskConical,
    description:
      "Follow the questions, hypotheses, model evidence, policy experiments, limitations, and decisions.",
  },
  {
    title: "Engineering & Evidence",
    question: "TRUST?",
    icon: ShieldCheck,
    description:
      "Trace how data, artifacts, lineage, recovery, controls, and reproducibility make the evidence auditable.",
  },
]

const capabilities = [
  ["Supervised ML", "Learn patterns from labeled outcomes.", BrainCircuit],
  ["Reward / Response Modeling", "Estimate expected response for a context and action.", Blocks],
  ["Context × Action Modeling", "Represent how different actions behave in different customer contexts.", Network],
  ["Contextual Decisioning", "Choose one action for the current context under explicit constraints.", BriefcaseBusiness],
  ["Policy Learning", "Define how action selection should balance reward, support, and continued learning.", Bot],
  ["Offline Policy Evaluation", "Estimate policy value from governed logged interactions before online use.", FlaskConical],
  ["MLOps / Evidence", "Persist, recover, trace, validate, and govern data and model artifacts.", Database],
]

export default function MachineLearningDecisionSystemsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-b from-indigo-500/[0.08] via-background to-background">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
            <div className="max-w-4xl">
              <Badge variant="outline" className="border-indigo-500/40 bg-indigo-500/10 text-indigo-800 dark:text-indigo-200">
                Applied ML · Decision systems · Governed evidence
              </Badge>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
                Machine Learning &amp; Decision Systems
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
                Turn business decisions into model-informed actions, then make the learning, limitations, and engineering evidence clear enough to review and trust.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/case-studies/nbo-nrt-azure-databricks"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Explore NBO-NRT AIOS Cockpit
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href="#capability-map"
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  View ML capability map
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-indigo-700 dark:text-indigo-300">Problem classes</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">ML systems and LLM systems solve different kinds of problems.</h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                They are complementary. The distinction helps a reader choose the right evidence, evaluation method, and operational controls for the work.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Card className="border-indigo-500/25">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <BrainCircuit className="h-6 w-6 text-indigo-700 dark:text-indigo-300" aria-hidden="true" />
                    <CardTitle>Machine Learning &amp; Decision Systems</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm leading-7 text-muted-foreground">
                  <p>Focuses on prediction, ranking, action selection, policy value, and measurable outcomes from structured evidence.</p>
                  <p><strong className="text-foreground">Typical question:</strong> Which eligible action should be selected for this context, and what evidence supports that decision?</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Bot className="h-6 w-6 text-sky-700 dark:text-sky-300" aria-hidden="true" />
                    <CardTitle>LLM &amp; Agent Systems</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm leading-7 text-muted-foreground">
                  <p>Focuses on language reasoning, content generation, tool use, orchestration, review, and controlled execution.</p>
                  <p><strong className="text-foreground">Typical question:</strong> How should AI-assisted work be routed, checked, evidenced, and kept within human authority?</p>
                  <Link href="/ai-operating-system" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
                    Explore LLM &amp; Agent Systems <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-muted/20">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <Badge variant="outline">Flagship case study</Badge>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">NBO-NRT Decision Intelligence</h2>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  A governed Telco learning case study for choosing a relevant eligible offer for the current customer context while preserving evidence, constraints, and learning boundaries.
                </p>
                <Link
                  href="/case-studies/nbo-nrt-azure-databricks"
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:underline"
                >
                  Enter the NBO-NRT AIOS Cockpit
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Business problem", "Which eligible offer should be selected for a customer at the current decision point?"],
                  ["Action space", "BUNDLE, DATA, LOYALTY, ROAMING, and VOICE in the bounded synthetic experiment."],
                  ["Technical progression", "Reward modeling → contextual ranking → policy learning → offline evaluation."],
                  ["Engineering progression", "Unity Catalog → MLflow persistence → artifact recovery → traceable evidence."],
                ].map(([title, body]) => (
                  <Card key={title}>
                    <CardContent className="p-5">
                      <p className="font-semibold text-foreground">{title}</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <p className="mt-6 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm leading-6 text-muted-foreground">
              <strong className="text-foreground">Evidence boundary:</strong> The NBO-NRT work is a governed synthetic learning and MLOps evidence case study. It does not establish operator business truth, production uplift, online safety, or production readiness.
            </p>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-indigo-700 dark:text-indigo-300">Three lenses</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">One system, three reader questions.</h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Each knowledge item has one primary home. Related lenses link to it instead of duplicating or silently changing the evidence.
              </p>
            </div>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {lenses.map(({ title, question, icon: Icon, description }) => (
                <Card key={title}>
                  <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                      <Icon className="h-6 w-6 text-indigo-700 dark:text-indigo-300" aria-hidden="true" />
                      <Badge variant="outline">{question}</Badge>
                    </div>
                    <CardTitle className="pt-3">{title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-7 text-muted-foreground">{description}</CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="capability-map" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-indigo-700 dark:text-indigo-300">ML capability map</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">From prediction to governed decisions.</h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                The progression shows how the work moves from estimating outcomes toward selecting actions and governing the evidence lifecycle.
              </p>
            </div>
            <ol className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-7">
              {capabilities.map(([title, body, Icon], index) => (
                <li key={title} className="relative rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-700 text-xs font-bold text-white">{index + 1}</span>
                    <Icon className="h-5 w-5 text-indigo-700 dark:text-indigo-300" aria-hidden="true" />
                  </div>
                  <p className="mt-4 text-sm font-semibold leading-5 text-foreground">{title}</p>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-xl border border-indigo-500/25 bg-indigo-500/[0.06] p-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-lg font-semibold text-foreground">See how the evidence evolved in practice.</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">Open the flagship Cockpit for experiment history, current boundaries, and the next gate.</p>
              </div>
              <Link
                href="/case-studies/nbo-nrt-azure-databricks"
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Open Cockpit
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
