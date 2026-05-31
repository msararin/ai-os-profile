import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AIOSInteractionExplainer } from "@/components/aios-interaction-explainer"
import Link from "next/link"

const aiosSections = [
  {
    title: "Executive Summary",
    href: "/ai-operating-system",
    description: "What this case study is, why it exists, and how the AIOS is framed.",
  },
  {
    title: "Lean Value Tree",
    href: "/lean-value-tree",
    description: "Strategy-to-execution logic connecting value, work, and proof.",
  },
  {
    title: "Org Roles",
    href: "/org-roles",
    description: "Role boundaries for humans, AI workers, review, and escalation.",
  },
  {
    title: "Workstreams",
    href: "/workstreams",
    description: "Current operating lanes, status, owners, and next actions.",
  },
  {
    title: "How We Build",
    href: "/how-we-build",
    description: "Delivery method, gates, review loops, and evidence discipline.",
  },
  {
    title: "Architecture",
    href: "/architecture",
    description: "System structure, boundaries, and public-safe technical view.",
  },
]

export default function AIOperatingSystemPage() {
  return (
    <PageLayout>
      {/* Header */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            AI Operating System
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            A public-facing case study of Sararin's AI-enabled working method:
            governance, evidence, decision flow, routing discipline, and
            practical execution.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30 py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            AIOS Case Study Map
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            These public pages group the current AIOS artifacts without crowding
            the top navigation.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aiosSections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary"
              >
                <h3 className="text-sm font-semibold text-foreground">
                  {section.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {section.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What It Is */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            What It Is
          </h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            A layered system for managing AI-assisted work: task routing, AI
            workforce allocation, governance gates, evidence capture, and
            execution traceability. It answers three questions: What work needs
            doing? Who should do it? How do we know it was done correctly?
          </p>
          <p className="mt-4 max-w-3xl text-sm text-muted-foreground">
            Public pages show proof and method. Protected internal pages hold
            operating surfaces such as review queues, budget/backlog context,
            and draft work that is not public-ready.
          </p>
        </div>
      </section>

      {/* Layered Architecture */}
      <section className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Architecture Summary
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
            The AIOS public architecture is organized into four executive groups. The detailed map
            keeps governance, evidence, durable state, and business runway visible without turning
            this overview into a dashboard or operations manual.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "Executive & Intent",
              "Routing & Governance",
              "Execution & Validation",
              "Evidence, State & Business Runway",
            ].map((group) => (
              <div
                key={group}
                className="rounded-lg border border-border bg-background p-4 text-sm font-medium text-foreground"
              >
                {group}
              </div>
            ))}
          </div>

          <p className="mt-5 max-w-3xl text-xs leading-5 text-muted-foreground">
            Evidence, Audit &amp; Observability is one review layer. Phase 1 telemetry production and
            store behavior remain implemented in optimize-worker while AIOS owns the governance meaning
            of the evidence. This is not a full production observability platform.
          </p>

          <Link
            href="/architecture"
            className="mt-6 inline-flex text-sm font-semibold text-primary hover:underline"
          >
            View the full executive architecture map →
          </Link>
        </div>
      </section>

      <AIOSInteractionExplainer />

      {/* AI Workforce Organization */}
      <section className="border-t border-border py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            AI Workforce Organization
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Delegation boundaries, role policies, and routing rules that define
            who owns what in the AIOS work system.
          </p>

          {/* Simplified Org Chart */}
          <div className="mt-8 rounded-lg border border-border bg-card p-6">
            <div className="mx-auto max-w-4xl">
              <div className="flex justify-center">
                <div className="w-full max-w-sm rounded border border-primary/30 bg-primary/10 p-4 text-center">
                  <p className="text-sm font-semibold text-primary">
                    Lyn / Robert
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Executive review and protected decisions
                  </p>
                </div>
              </div>

              <div className="mx-auto h-8 w-px bg-border" />

              <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
                <div className="rounded border border-border bg-background p-4 text-center">
                  <p className="text-sm font-semibold text-foreground">
                    Robert
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Personal AI context layer and KB continuity
                  </p>
                </div>
                <div className="hidden px-2 text-sm font-medium text-muted-foreground md:block">
                  peers via KB
                </div>
                <div className="rounded border border-border bg-background p-4 text-center">
                  <p className="text-sm font-semibold text-foreground">
                    Hermes
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Stage manager, router, trace, and handoff owner
                  </p>
                </div>
              </div>

              <div className="mx-auto h-8 w-px bg-border" />

              <div className="rounded border border-dashed border-border bg-muted/30 p-4 text-center">
                <p className="text-sm font-semibold text-foreground">
                  Robert KB + Git
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Shared source of truth for decisions, evidence, and handoffs
                </p>
              </div>

              <div className="mx-auto h-8 w-px bg-border" />

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  ["Codex", "Repo and UI implementation"],
                  ["Big Crew", "Product, architecture, QA, review"],
                  ["Researcher", "Evidence scans and claim safety"],
                  ["Supernova", "Opportunity and monetization analysis"],
                  ["optimize-worker", "Routing and trace automation"],
                  ["Investment Team", "Planned specialist lane"],
                ].map(([name, description]) => (
                  <div
                    key={name}
                    className="rounded border border-border bg-background p-3"
                  >
                    <p className="text-sm font-medium text-foreground">
                      {name}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Policies */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Budget Discipline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Role first, model second. Use cheapest reliable route for
                  routine work; reserve senior review for named decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Escalation Rule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Money, legal, privacy, reputation, health, career, or major
                  architecture → stop for executive review.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Task Routing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Match capability to task. Repo patch → Codex. Evidence scan →
                  Researcher. Review → Big Crew.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Strategic Framework */}
      <section className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Strategic Framework
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            The Lean Value Tree connects strategic goals with operational
            outcomes, from control to leverage to monetization.
          </p>

          <div className="mt-8">
            <Card className="border-primary/30 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-center text-sm font-medium uppercase tracking-wide text-primary">
                  North Star
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-lg font-medium text-foreground">
                  Sustainable economic leverage through an AI-assisted personal
                  operating system.
                </p>
              </CardContent>
            </Card>

            <div className="mt-6 space-y-3">
              {[
                {
                  layer: 1,
                  name: "Strategic Control",
                  objective:
                    "Maintain decision authority and scope discipline across AI-assisted work",
                  status: "Active",
                },
                {
                  layer: 2,
                  name: "Execution Leverage",
                  objective:
                    "Increase output per hour without losing review discipline",
                  status: "Active",
                },
                {
                  layer: 3,
                  name: "Workforce Efficiency",
                  objective:
                    "Operate as a one-person system with AI leverage, before scaling",
                  status: "Drafted",
                },
                {
                  layer: 4,
                  name: "Portfolio Proof",
                  objective:
                    "Demonstrate governance maturity through visible artifacts",
                  status: "Drafted",
                },
                {
                  layer: 5,
                  name: "Opportunity Intelligence",
                  objective:
                    "Detect money-creation triggers and route to right module",
                  status: "Planned",
                },
                {
                  layer: 6,
                  name: "Monetization",
                  objective:
                    "Explore whether governance maturity can support sustainable revenue",
                  status: "Planned",
                },
              ].map((item) => (
                <Card key={item.layer} className="border-border bg-card">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="flex items-center justify-center border-b border-border bg-muted/50 px-6 py-4 sm:border-b-0 sm:border-r">
                        <span className="text-2xl font-semibold text-primary">
                          {item.layer}
                        </span>
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <h3 className="font-semibold text-foreground">
                            {item.name}
                          </h3>
                          <Badge
                            variant="secondary"
                            className={
                              item.status === "Active"
                                ? "bg-emerald-500/10 text-emerald-700"
                                : item.status === "Drafted"
                                  ? "bg-orange-500/10 text-orange-700"
                                  : "bg-muted-foreground/20 text-muted-foreground"
                            }
                          >
                            {item.status}
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {item.objective}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Current Workstreams */}
      <section className="border-t border-border py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Current Workstreams
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Operating status for active work: owner, next action, gate
            decision, and proof level.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                name: "optimize-worker",
                status: "Active",
                owner: "Lyn + Codex",
                next: "Keep benchmark trace automation parked until a thin slice is chosen.",
                proof: "Documented",
              },
              {
                name: "Fallback routing",
                status: "Policy active",
                owner: "Lyn",
                next: "Route work by task type, failure mode, risk, and available worker/model.",
                proof: "Smoke-proven",
              },
              {
                name: "Profile positioning",
                status: "Active",
                owner: "Lyn + Codex",
                next: "Keep homepage focused on differentiation; avoid internal dashboard drift.",
                proof: "Regression-gated",
              },
              {
                name: "Supernova",
                status: "First version done",
                owner: "Lyn",
                next: "Define the first POC trigger and evidence requirement before treating it as operational.",
                proof: "Documented",
              },
              {
                name: "Big Crew",
                status: "Started",
                owner: "Lyn + Codex",
                next: "Keep Big Crew usage bounded to implementation and verification tasks with explicit handoff.",
                proof: "Documented",
              },
              {
                name: "Researcher",
                status: "Started",
                owner: "Lyn + Researcher",
                next: "Use for bounded positioning and claim-safety briefs before public copy changes.",
                proof: "Documented",
              },
            ].map((workstream) => (
              <Card key={workstream.name} className="border-border bg-card">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-base font-medium">
                      {workstream.name}
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className={
                        workstream.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-700"
                          : workstream.status === "Policy active"
                            ? "bg-teal-500/10 text-teal-700"
                            : workstream.status === "Started"
                              ? "bg-primary/10 text-primary"
                              : "bg-orange-500/10 text-orange-700"
                      }
                    >
                      {workstream.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Owner: {workstream.owner}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {workstream.next}
                  </p>
                  <p className="mt-2 text-xs font-medium text-foreground">
                    Proof: {workstream.proof}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why These Boundaries Exist */}
      <section className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Why These Boundaries Exist
          </h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            The AIOS design is shaped by operational lessons and governance
            rules learned through practice. These boundaries aren&apos;t
            theoretical — they exist because something broke, drifted, or became
            unmaintainable without them.
          </p>

          <div className="mt-8 space-y-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  Human Review Gates
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  Every artifact passes through human review before being
                  committed as truth. AI workers can draft, implement, and
                  validate, but the human still owns the final gate.
                </p>
                <p className="mt-2 italic">
                  Why: Early runs without this gate produced confident outputs
                  with silent errors. The review gate catches logic gaps,
                  context drift, and misaligned assumptions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  Capability Routing
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  Tasks are routed by capability, not by convenience. Repo edits
                  go to Codex. Evidence scans go to Researcher. Architecture
                  critique goes to Big Crew.
                </p>
                <p className="mt-2 italic">
                  Why: Generic routing led to budget waste (expensive models
                  doing cheap work) and quality gaps (cheap models attempting
                  senior tasks).
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  Privacy Boundaries
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  Private raw context (decisions, finances, health, personal
                  notes) stays in the committed knowledge base. Public-facing
                  content is curated separately and reviewed for safety.
                </p>
                <p className="mt-2 italic">
                  Why: Early attempts at auto-publishing from the KB leaked
                  context that was fine for personal notes but not for external
                  visibility.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  Thin-Slice Delivery
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  Work is broken into thin slices with explicit validation gates
                  between each slice. Build → test → commit → stop for review.
                  No multi-stage runs without checkpoints.
                </p>
                <p className="mt-2 italic">
                  Why: Long autonomous runs without checkpoints produced large
                  diffs that were hard to review, debug, or rollback. Thin
                  slices keep errors local and recovery cheap.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  Budget Discipline
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  Mechanical work routes to cheap workers. Senior synthesis
                  routes to expensive models. No delegation without a named
                  decision, cost cap, and abort condition.
                </p>
                <p className="mt-2 italic">
                  Why: Undisciplined routing burned budget on tasks that
                  didn&apos;t need senior reasoning. Role-first routing treats
                  AI budget like workforce salary.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  Evidence Before Claims
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  Public-facing metrics require baseline, date, scope, caveat,
                  and evidence source. No quantified claims without the full
                  five-field standard.
                </p>
                <p className="mt-2 italic">
                  Why: Early portfolio attempts included impressive-sounding
                  numbers that lacked context. Reviewers flagged them as
                  unsubstantiated. The evidence standard restores credibility.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <blockquote className="border-l-4 border-primary pl-6">
              <p className="text-lg font-medium text-foreground">
                &ldquo;AI orchestration is program management. Tools change.
                Governance discipline doesn&apos;t.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Component Glossary */}
      <section className="border-t border-border py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Component Glossary
          </h2>
          <div className="mt-8 overflow-hidden rounded-lg border border-border bg-card">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted/50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-foreground"
                  >
                    Component
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-foreground"
                  >
                    Definition
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-foreground">
                    Robert KB + Git
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    Source of truth. Master archive of decisions.
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-foreground">
                    Robert / GPT
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    Executive orchestrator and reviewer.
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-foreground">
                    Hermes + Opus + custom MCP*
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    Context-aware operator surface — Active trial — structured
                    context pull, task continuity, governance-aware operation.
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-foreground">
                    optimize-worker
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    Execution routing and task packaging layer. In Phase 1, it
                    also implements telemetry production and store behavior for
                    observability evidence.
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-foreground">
                    Codex
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    Bounded implementation executor for repo edits.
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-foreground">
                    ai-os-profile
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    Curated external visibility layer and deployable cockpit/app
                    surface (this site).
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-foreground">
                    Evidence, Audit &amp; Observability
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    Governance evidence layer for traces, routing decisions,
                    cost/usage evidence, reliability signals, and deployment
                    readiness checks. Not a claim that AWS app deployment is
                    complete.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs italic text-muted-foreground">
            *Current operational trial surface. MCP is used as a read-only
            context bridge for controlled context retrieval. It is not yet
            approved as an autonomous production workflow.
          </p>
        </div>
      </section>
    </PageLayout>
  )
}
