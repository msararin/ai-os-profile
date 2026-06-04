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
    value: "Lyn / Rin 2.0",
    status: "Gate owner",
  },
  {
    label: "Known/planned AI work agents",
    value: "21 working estimate, pending KB reconciliation",
    status: "Fallback label",
  },
  {
    label: "Big Crew",
    value: "6 roles, registry confirmation required",
    status: "Do not render role names",
  },
  {
    label: "Supernova",
    value: "10 verified roles",
    status: "Registry verified",
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
    owner: "Lyn / Rin 2.0",
    status: "Final approval",
  },
  {
    lane: "Executive Orchestration",
    owner: "Robert",
    status: "Context and review",
  },
  {
    lane: "Operator / Handoff",
    owner: "Risa / Hermes",
    status: "Stage management",
  },
  {
    lane: "Implementation Lane",
    owner: "Codex",
    status: "Scoped execution",
  },
  {
    lane: "Research Support",
    owner: "Researcher",
    status: "Evidence scan",
  },
  {
    lane: "Low-risk Support",
    owner: "Simple Task Supporter",
    status: "Contract confirmation pending",
  },
  {
    lane: "Engineering / Quality Role Group",
    owner: "Big Crew",
    status: "Registry confirmation required",
  },
  {
    lane: "Business / Opportunity Intelligence",
    owner: "Supernova",
    status: "10 verified roles",
  },
  {
    lane: "Future / Parked",
    owner: "Investment Team",
    status: "TBD / not countable",
  },
]

const flowSteps = [
  {
    icon: Hand,
    label: "Intake",
    owner: "Lyn / Robert",
    sentence: "Example task enters AIOS with purpose, risk, and expected output.",
    artifact: "Intent",
  },
  {
    icon: Route,
    label: "Classify",
    owner: "Robert",
    sentence: "Robert identifies task type, risk level, and safest lane.",
    artifact: "Lane",
  },
  {
    icon: ClipboardCheck,
    label: "Package",
    owner: "Risa / Hermes",
    sentence: "Work is prepared as a bounded handoff.",
    artifact: "Packet",
  },
  {
    icon: Layers3,
    label: "Execute",
    owner: "Codex / Researcher / Big Crew / Supernova",
    sentence: "The selected lane creates the artifact or review input.",
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
    owner: "Robert / Reviewer",
    sentence: "Output is checked for DoD, claims, and boundary risk.",
    artifact: "DoD",
  },
  {
    icon: ShieldCheck,
    label: "Lyn Gate",
    owner: "Lyn",
    sentence: "Lyn approves, revises, rejects, or parks the work.",
    artifact: "Gate",
    emphasis: "gate",
  },
  {
    icon: Archive,
    label: "Outcome",
    owner: "Robert / Codex",
    sentence: "Work is committed, published, revised, stopped, or archived.",
    artifact: "State",
    emphasis: "outcome",
  },
  {
    icon: GitBranch,
    label: "Learn",
    owner: "Robert / KB",
    sentence: "Feedback becomes a prompt, role rule, KB note, or follow-up.",
    artifact: "Rule",
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
  "Known/planned AI work agents: 21 working estimate, pending KB reconciliation",
  "Big Crew: 6 roles, registry confirmation required",
  "Supernova: 10 verified roles",
  "Simple Task Supporter: low-risk support lane, contract confirmation pending",
  "Investment Team: parked / TBD / not countable",
  "UX/UI: engineering capability tag, not separate role",
  "Big Crew role names require confirmation.",
  "21 is a working estimate pending KB reconciliation.",
  "Simple Task Supporter contract confirmation is pending.",
  "Investment Team is parked / TBD / not countable.",
  "UX/UI is a capability tag, not a separate role.",
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
  "live autonomous orchestration",
  "real-time telemetry",
  "provider comparison",
  "benchmark performance",
  "cost savings",
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
            This map is a visibility surface only. It does not represent live autonomous execution,
            real-time telemetry, provider comparison, benchmark proof, cost-saving evidence, or
            final role-registry truth. Source of truth remains the committed KB docs, git history,
            receipts, validation artifacts, and Lyn / Robert decisions.
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
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Agent surface map</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {surfaceLanes.map((lane) => (
              <Card key={lane.lane} className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{lane.lane}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">{lane.owner}</p>
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
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Visual orchestration flow
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                Intake -&gt; Classify -&gt; Package -&gt; Execute -&gt; Evidence -&gt; Review -&gt; Lyn Gate -&gt; Outcome -&gt; Learn
              </p>
            </div>
            <Badge variant="outline">Infographic map</Badge>
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
            Supernova verified role registry
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">Supernova: 10 verified roles</p>
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
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Fallback / unresolved registry notes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {fallbackNotes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle>Human-feedback-driven improvement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
              <div className="grid gap-2 sm:grid-cols-5">
                {[
                  "Lyn feedback",
                  "Rework reason classified",
                  "Agent revises",
                  "Robert checks repeated issue",
                  "Lesson captured",
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
                prompt update, role rule, KB note, or follow-up task. This does not mean agents
                learn automatically.
              </p>
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
