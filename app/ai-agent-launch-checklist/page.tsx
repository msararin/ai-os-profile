import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const checklistAreas = [
  {
    title: "Use Case & Business Process Fit",
    description:
      "Define the business process, decision owner, user group, and failure cost before selecting an AI pattern.",
  },
  {
    title: "Data / Knowledge Readiness",
    description:
      "Check whether source knowledge is current, approved, searchable, and traceable enough for AI-assisted use.",
  },
  {
    title: "Human-in-the-Loop & Decision Gates",
    description:
      "Separate work AI may draft from decisions that require human approval, escalation, or sign-off.",
  },
  {
    title: "Legal / Finance / Policy Boundaries",
    description:
      "Identify sensitive topics, approval owners, forbidden claims, and policy limits before pilot use.",
  },
  {
    title: "PoC / Pilot Readiness",
    description:
      "Define the smallest testable workflow, expected users, evidence needed, and pass/fail criteria.",
  },
  {
    title: "Adoption & Change Readiness",
    description:
      "Plan user enablement, operating rhythm, support ownership, and behavior change beyond tool launch.",
  },
  {
    title: "Failure Modes & Escalation",
    description:
      "Name likely failure modes such as outdated knowledge, hallucinated confidence, unclear ownership, or unsupported automation.",
  },
  {
    title: "Monitoring / Evidence / Impact Metrics",
    description:
      "Choose evidence that can be reviewed: answer quality, review load, cycle time, escalation rate, adoption, and unresolved gaps.",
  },
  {
    title: "Rollback / Stop Criteria",
    description:
      "Set explicit conditions for pausing, narrowing, or reversing launch before users depend on weak behavior.",
  },
]

const demonstratedCapabilities = [
  "Business-process translation",
  "AI adoption governance",
  "Human-in-the-loop design",
  "Evidence and impact thinking",
  "Cross-functional delivery readiness",
]

const dryRunSteps = [
  "A synthetic enterprise retail scenario starts with repeated business questions across policy, finance, and operating teams.",
  "The checklist tests whether AI-assisted answers can cite approved knowledge, ask for missing facts, and route sensitive topics to review.",
  "Launch readiness is judged by evidence quality, decision ownership, user workflow fit, escalation clarity, and stop criteria.",
]

export default function AIAgentLaunchChecklistPage() {
  return (
    <PageLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <Badge variant="outline">Portfolio framework</Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            AI Agent Launch Checklist
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
            A recruiter-readable artifact showing how Lyn structures AI
            launch-readiness thinking before a team moves from idea to PoC,
            pilot, or workflow adoption.
          </p>
          <p className="mt-4 max-w-3xl rounded-lg border border-yellow-600/30 bg-yellow-50/70 p-4 text-sm leading-6 text-muted-foreground dark:bg-yellow-950/10">
            This is a portfolio framework and simulated launch-readiness
            checklist, not a client deliverable, production compliance
            framework, benchmark proof, product claim, or universal AI launch
            methodology. It shows how I structure AI launch-readiness thinking.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                What This Demonstrates
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                The checklist turns an AI adoption idea into a reviewable
                launch conversation: what business process is changing, what
                evidence is ready, which decisions need humans, and when the
                team should stop instead of pushing automation forward.
              </p>
            </div>
            <Card className="border-primary/30 bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Capability signal</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {demonstratedCapabilities.map((capability) => (
                    <li key={capability} className="border-l-2 border-primary/30 pl-3">
                      {capability}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Launch-Readiness Checklist
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            Each area is a gate for reducing launch risk. A weak answer does
            not automatically block exploration, but it changes the next step:
            narrow the PoC, add review, improve evidence, or stop.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {checklistAreas.map((area, index) => (
              <Card key={area.title} className="border-border bg-card">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {index + 1}
                    </span>
                    <CardTitle className="text-sm leading-snug">
                      {area.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {area.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <Badge variant="outline">Synthetic dry run</Badge>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                Simulated Enterprise Scenario
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                The dry run uses a synthetic enterprise retail scenario. It is
                not a client engagement, not real company data, and not evidence
                of production deployment.
              </p>
            </div>
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-base">How the dry run is used</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 text-sm leading-6 text-muted-foreground">
                  {dryRunSteps.map((step) => (
                    <li key={step} className="border-l-2 border-primary/20 pl-3">
                      {step}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Card className="border-border bg-background">
            <CardHeader>
              <CardTitle className="text-lg">Recruiter Reading Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
              <p>
                This artifact is meant to show business-to-engineering
                translation: how an ambiguous AI request becomes a controlled
                workflow launch discussion with owners, gates, evidence, and
                rollback criteria.
              </p>
              <p>
                It complements the AI Operating System case study by showing a
                concrete artifact that could guide AI adoption planning without
                claiming production compliance or universal methodology status.
              </p>
              <Link
                href="/ai-operating-system"
                className="inline-flex text-sm font-semibold text-primary hover:underline"
              >
                Return to the AI Operating System case study
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  )
}
