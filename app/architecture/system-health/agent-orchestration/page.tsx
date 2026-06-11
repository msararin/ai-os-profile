import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Archive,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  GitBranch,
  Hand,
  Layers3,
  Route,
  ShieldCheck,
} from "lucide-react"

const countCards = [
  {
    label: "Human lead",
    value: "Sararin",
    status: "Gate owner",
  },
  {
    label: "AI Workforce Source Status",
    value: "Verified by workspace registry",
    status: "No global count shown",
  },
  {
    label: "Big Crew",
    value: "Engineering / QA workspace",
    status: "Roster pending confirmation",
  },
  {
    label: "Supernova",
    value: "Business intelligence workspace",
    status: "First version complete; POC not yet validated.",
  },
  {
    label: "Investment Team",
    value: "parked / TBD / not countable",
    status: "Future lane",
  },
]

const surfaceLanes = [
  {
    lane: "Human Gate",
    owner: "Sararin",
    status: "Final approval",
    purpose: "Sets the release decision and human boundary.",
  },
  {
    lane: "Executive Orchestration",
    owner: "GPT",
    status: "Context and review",
    purpose: "Classifies work, checks claims, and keeps scope bounded.",
  },
  {
    lane: "Operator / Handoff",
    owner: "Hermes",
    status: "Stage management",
    purpose: "Packages handoffs and keeps the worker lane clear.",
  },
  {
    lane: "Implementation Lane",
    owner: "Codex",
    status: "Scoped execution",
    purpose: "Changes files, runs checks, and reports evidence.",
  },
  {
    lane: "Research Support",
    owner: "Researcher",
    status: "Evidence scan",
    purpose: "Finds sources, receipts, and limits for claims.",
  },
  {
    lane: "Low-risk Support",
    owner: "Simple Task Supporter",
    status: "Contract confirmation pending",
    purpose: "Handles simple support work only after boundary confirmation.",
  },
  {
    lane: "Big Crew",
    owner: "Engineering / Quality role group",
    status: "Roster pending confirmation",
    purpose: "Engineering review workspace; member names are withheld until the registry is confirmed.",
  },
  {
    lane: "Supernova",
    owner: "Business / Opportunity Intelligence workspace",
    status: "First version complete; POC not yet validated.",
    purpose: "Frames opportunities, risks, options, and business evidence.",
  },
  {
    lane: "Future / Parked",
    owner: "Investment Team",
    status: "TBD / not countable",
    purpose: "Acknowledged future lane with no countable registry yet.",
  },
]

const flowSteps = [
  {
    icon: Hand,
    label: "Intake",
    owner: "Sararin / GPT",
    sentence: "Example task enters AIOS with purpose, risk, and expected output.",
    artifact: "Intent",
  },
  {
    icon: Route,
    label: "Classify",
    owner: "GPT",
    sentence: "GPT identifies task type, risk level, and safest lane.",
    artifact: "Lane",
  },
  {
    icon: ClipboardCheck,
    label: "Package",
    owner: "Hermes",
    sentence: "Work is prepared as a bounded handoff.",
    artifact: "Packet",
  },
  {
    icon: Layers3,
    label: "Execute",
    owner: "Codex / Big Crew / Supernova / Researcher / Simple Task Supporter",
    sentence: "The selected worker lane creates the artifact or review input.",
    artifact: "Output",
  },
  {
    icon: FileSearch,
    label: "Evidence",
    owner: "Executor / Researcher",
    sentence: "Receipts, sources, validation notes, or limits are captured.",
    artifact: "Trace",
  },
  {
    icon: CheckCircle2,
    label: "Review",
    owner: "GPT / Reviewer",
    sentence: "Output is checked for DoD, claims, and boundary risk.",
    artifact: "DoD",
  },
  {
    icon: ShieldCheck,
    label: "Sararin Gate",
    owner: "Sararin",
    sentence: "Sararin approves, revises, rejects, or parks the work.",
    artifact: "Gate",
    emphasis: "gate",
  },
  {
    icon: Archive,
    label: "Outcome",
    owner: "GPT / Codex",
    sentence: "Work is committed, published, revised, stopped, or archived.",
    artifact: "State",
    emphasis: "outcome",
  },
  {
    icon: GitBranch,
    label: "Learn",
    owner: "GPT / KB",
    sentence: "Lesson becomes checklist, prompt, or role rule update.",
    artifact: "Rule",
  },
]

const controlGates = [
  {
    label: "Evidence gate",
    owner: "Executor / Researcher",
    sentence: "Receipts, artifacts, validation, and source notes are captured.",
  },
  {
    label: "Review gate",
    owner: "GPT / Reviewer",
    sentence: "Scope, claims, Definition of Done, and risk are checked.",
  },
  {
    label: "Sararin Gate",
    owner: "Sararin",
    sentence: "Sararin approves, revises, rejects, or parks the work.",
  },
  {
    label: "Rework loop",
    owner: "GPT / Worker lane",
    sentence: "Feedback is classified, revised, checked, and captured.",
  },
  {
    label: "Improvement output",
    owner: "GPT / KB",
    sentence: "The lesson becomes a checklist, prompt, role contract, or routing rule.",
  },
]

const supernovaRoles = [
  ["Opportunity Framer", "Decision frame"],
  ["Market & Pain Reality Analyst", "Pain evidence"],
  ["Brand & Positioning Strategist", "Claim boundaries"],
  ["Business Model & ROI Strategist", "Economics view"],
  ["Budget & Resource Optimizer", "Resource guardrail"],
  ["Marketing & Sales Channel Strategist", "Channel test"],
  ["Finance / Tax / Legal Gatekeeper", "Risk flags"],
  ["KPI & Metrics Analyst", "Metrics threshold"],
  ["Strategy Options Advisor", "Option tradeoffs"],
  ["Risk & Execution PM", "Execution plan"],
]

const fallbackNotes = [
  "AIOS does not publish a global agent count until each workspace is backed by a committed registry or contract.",
  "Big Crew: engineering / QA workspace; roster pending confirmation.",
  "Supernova: first version complete; POC not yet validated.",
  "Simple Task Supporter: low-risk support lane, contract confirmation pending",
  "Investment Team: parked / TBD / not countable",
  "UX/UI: engineering capability tag, not separate role",
  "Big Crew role names remain hidden until source-of-truth confirmation is complete.",
  "Simple Task Supporter contract confirmation is pending.",
  "Investment Team is parked / TBD / not countable.",
  "UX/UI is a capability tag, not a separate role.",
]

const sourceBoundaries = [
  {
    title: "Big Crew source boundary",
    summary: "Workspace is publishable; roster is not.",
    detail:
      "Big Crew is treated as an engineering / QA workspace because committed contracts define output behavior, but public roster names are withheld until the registry is confirmed.",
    source: "team-of-team-orchestration/role-output-contracts.md",
  },
  {
    title: "Supernova source boundary",
    summary: "First version complete; POC not yet validated.",
    detail:
      "Supernova roles are shown because the committed registry defines the business / opportunity intelligence skeleton and its 10 role contracts. The first working version / operating concept exists, but POC validation and revenue-loop proof are not complete.",
    source: "supernova/supernova-v1-role-registry.md",
  },
  {
    title: "Global count boundary",
    summary: "No global AI workforce count is shown.",
    detail:
      "The page avoids a single global agent count because some lanes are active, some are parked, and some are capability tags rather than standalone roles.",
    source: "team-of-team-orchestration/specs/aios-agent-review-dashboard-data-contract-v0.1.md",
  },
]

const catches = [
  "unsupported counts",
  "role registry conflicts",
  "wrong worker/lane assignment",
  "missing evidence",
  "wrong Definition of Done delivery",
  "overclaim risk",
  "repeated rework patterns",
]

const nonProofs = [
  "live telemetry",
  "autonomous orchestration",
  "real-time telemetry",
  "provider comparison",
  "benchmark performance",
  "cost-saving evidence",
  "production-grade observability",
  "final role-registry truth",
]

export default function AgentOrchestrationMapPage() {
  return (
    <PageLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">Map / not live</Badge>
            <Badge variant="secondary">Phase 4 result: proceed with fallback</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Agent Orchestration Map
          </h1>
          <p className="mt-3 max-w-4xl text-muted-foreground">
            A visual map of how AIOS work is routed, reviewed, gated, and improved using
            fallback-safe role labels.
          </p>
          <div className="mt-5 rounded-lg border border-amber-500/50 bg-amber-500/10 p-4 text-sm leading-6 text-muted-foreground">
            This is a map, not a dashboard. It does not represent live telemetry, autonomous
            orchestration, provider comparison, benchmark proof, cost-saving evidence, or final
            role-registry truth. Source of truth remains committed KB docs, git history,
            receipts, validation artifacts, and Sararin / GPT decisions.
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Count summary</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {countCards.map((card) => (
              <Card key={card.label} className="h-full">
                <CardContent className="pt-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {card.label}
                  </p>
                  <p className="mt-2 text-base font-semibold leading-6 text-foreground">
                    {card.value}
                  </p>
                  <Badge variant="outline" className="mt-3">
                    {card.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <Badge variant="outline">WHO</Badge>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                1. Who does what
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                Agent and role lanes show who owns routing, execution, evidence, and gates.
              </p>
            </div>
            <Badge variant="secondary">Agent / role surface</Badge>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {surfaceLanes.map((lane) => (
              <Card key={lane.lane} className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{lane.lane}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">{lane.owner}</p>
                  <p>{lane.purpose}</p>
                  <Badge variant="secondary">{lane.status}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-sm text-muted-foreground">
            <Badge variant="outline">UX/UI: engineering capability tag, not separate role</Badge>
            <Badge variant="outline">Investment Team: parked / TBD / not countable</Badge>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <Badge variant="outline">HOW</Badge>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                2. How work moves
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                Example task enters AIOS, gets classified, packaged, executed, reviewed, gated,
                and converted into a learning artifact.
              </p>
            </div>
            <Badge variant="secondary">Orchestration flow</Badge>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3 xl:grid-cols-9">
            {flowSteps.map((step, index) => {
              const Icon = step.icon
              const emphasisClass =
                step.emphasis === "gate"
                  ? "border-amber-500 bg-amber-500/10"
                  : step.emphasis === "outcome"
                    ? "border-primary/50 bg-primary/10"
                    : "border-border bg-card"

              return (
                <div key={step.label} className="relative">
                  <Card className={`h-full ${emphasisClass}`}>
                    <CardHeader className="space-y-3 pb-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background">
                          {index + 1}
                        </span>
                        <Icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                      </div>
                      <CardTitle className="text-base">{step.label}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-xs leading-5 text-muted-foreground">
                      <p className="font-medium text-foreground">{step.owner}</p>
                      <p>{step.sentence}</p>
                      <Badge variant="outline">{step.artifact}</Badge>
                    </CardContent>
                  </Card>
                  {index < flowSteps.length - 1 ? (
                    <div className="mx-auto h-4 w-px bg-border md:hidden" aria-hidden="true" />
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Supernova role registry and POC boundary
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Supernova: first version complete; POC not yet validated.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {supernovaRoles.map(([role, purpose]) => (
              <Card key={role} className="h-full">
                <CardContent className="pt-5">
                  <p className="text-sm font-semibold leading-5 text-foreground">{role}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{purpose}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <Badge variant="outline">CONTROL</Badge>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                3. How control and learning work
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                Evidence, review, Sararin Gate, rework, enforcement rules, and improvement
                outputs keep the map bounded.
              </p>
            </div>
            <Badge variant="secondary">Human feedback + rule enforcement</Badge>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-5">
            {controlGates.map((gate) => (
              <Card
                key={gate.label}
                className={
                  gate.label === "Sararin Gate"
                    ? "h-full border-amber-500 bg-amber-500/10"
                    : "h-full"
                }
              >
                <CardContent className="space-y-2 pt-5 text-sm text-muted-foreground">
                  <p className="text-sm font-semibold text-foreground">{gate.label}</p>
                  <p className="text-xs font-medium text-foreground">{gate.owner}</p>
                  <p className="text-xs leading-5">{gate.sentence}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-4 border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle>Human feedback + rule enforcement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
              <div className="grid gap-2 sm:grid-cols-5">
                {[
                  "Feedback classified",
                  "Rule impact checked",
                  "Agent revises",
                  "Guardrail updated",
                  "Enforcement verified",
                ].map((step) => (
                  <div
                    key={step}
                    className="rounded border border-border bg-background p-2 text-center text-xs font-medium text-foreground"
                  >
                    {step}
                  </div>
                ))}
              </div>
              <p>
                Rework is treated as an evidence signal. Repeated feedback should become a
                checklist, prompt update, role contract, routing rule, stop condition, downgrade
                rule, KB note, or follow-up task. A rule only counts as improved when it becomes
                visible in a future check, route matrix, monitor status, or validation gate. This
                does not mean agents learn automatically.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t border-border py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Source-truth and registry notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <ul className="space-y-2 text-sm text-muted-foreground">
                {fallbackNotes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="grid gap-3 md:grid-cols-3">
                {sourceBoundaries.map((boundary) => (
                  <details
                    key={boundary.title}
                    className="rounded-lg border border-border bg-muted/30 p-4 text-sm"
                  >
                    <summary className="cursor-pointer font-semibold text-foreground">
                      {boundary.title}
                    </summary>
                    <p className="mt-2 text-muted-foreground">{boundary.summary}</p>
                    <p className="mt-3 leading-6 text-muted-foreground">{boundary.detail}</p>
                    <p className="mt-3 text-xs font-medium text-muted-foreground">
                      Source: {boundary.source}
                    </p>
                  </details>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>What this map helps catch</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {catches.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What this map does not prove</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {nonProofs.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  )
}
