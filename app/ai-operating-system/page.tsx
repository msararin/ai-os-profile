import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AIOSInteractionExplainer } from "@/components/aios-interaction-explainer"
import Link from "next/link"

const aiosSections = [
  {
    order: "01",
    title: "Executive Summary",
    href: "/ai-operating-system",
    description: "What this case study is, why it exists, and how the AIOS is framed.",
    isRecommendedStart: true,
  },
  {
    order: "02",
    title: "Lean Value Tree",
    href: "/lean-value-tree",
    description: "Strategy-to-execution logic connecting value, work, and proof.",
  },
  {
    order: "03",
    title: "How We Build",
    href: "/how-we-build",
    description: "Delivery method, gates, review loops, and evidence discipline.",
  },
  {
    order: "04",
    title: "Org Roles",
    href: "/org-roles",
    description: "Role boundaries for humans, AI workers, review, and escalation.",
  },
  {
    order: "05",
    title: "Workstreams",
    href: "/workstreams",
    description: "Current operating lanes, status, owners, and next actions.",
  },
  {
    order: "06",
    title: "Agent Review Evidence Dashboard",
    href: "/ai-operating-system/agent-review-dashboard",
    description: "Public evidence snapshot showing manual evidence, confidence, missing states, and explicit gaps.",
  },
  {
    order: "07",
    title: "AI Agent Launch Checklist",
    href: "/ai-agent-launch-checklist",
    description: "Portfolio framework for AI launch-readiness, human gates, evidence, and rollback criteria.",
  },
  {
    order: "08",
    title: "Architecture",
    href: "/architecture",
    description: "System structure, boundaries, and public-safe technical view.",
  },
]

const existingTools = [
  {
    name: "ChatGPT / GPT",
    purpose: "Reasoning, synthesis, planning, and executive review support.",
    contribution: "Configured with role boundaries, review gates, and source-of-truth rules.",
  },
  {
    name: "Codex",
    purpose: "Existing coding agent for bounded repository implementation.",
    contribution: "Used with scoped tasks, stop conditions, validation steps, and Git discipline.",
  },
  {
    name: "Claude Opus",
    purpose: "External high-judgment reviewer for selected claims and architecture decisions.",
    contribution: "Used as an independent skeptical critique step before relying on evidence.",
  },
  {
    name: "Hermes Agent",
    purpose: "Existing orchestration and stage-management tool.",
    contribution: "Tested for profiles, routing continuity, handoffs, and context-access patterns.",
  },
  {
    name: "OpenRouter / ChatX",
    purpose: "Existing model-access routes.",
    contribution: "Evaluated for provider routing, quota limits, cost visibility, and telemetry gaps.",
  },
  {
    name: "Ollama",
    purpose: "Existing local-model runtime.",
    contribution: "Tested for bounded local execution and runtime evidence capture.",
  },
]

const customizedSystems = [
  {
    name: "GPT KB + Git",
    status: "Active",
    description:
      "Git-backed knowledge base and change history for reviewed decisions, evidence, and working context.",
  },
  {
    name: "AIOS workflow",
    status: "Working prototype",
    description:
      "Human-gated operating model coordinating planning, implementation, critique, validation, and release decisions.",
  },
  {
    name: "Evidence classification",
    status: "Used in audit",
    description:
      "Rules separating measured, derived, inferred, missing, invalid, and not-applicable evidence.",
  },
  {
    name: "Validation gates",
    status: "Active",
    description:
      "Bounded checks covering typecheck, lint, build, route smoke tests, boundary scans, and explicit-path Git staging.",
  },
  {
    name: "Tool-routing rules",
    status: "Partially proven",
    description:
      "Evolving guidance for matching tools and review depth to the task, risk, and evidence required.",
  },
]

const locallyBuiltComponents = [
  {
    name: "Supernova",
    status: "First version complete; POC not yet validated.",
    description:
      "Custom strategy and critique role with a first working version / operating concept, but it has not yet completed POC validation or revenue-loop proof.",
  },
  {
    name: "Data Team",
    status: "Evidence lens active",
    description:
      "Supports evidence structure, aggregation logic, interpretation, and dashboard-readiness review. It does not act as final claim authority.",
  },
  {
    name: "Curated AI-readable context layer",
    status: "Implemented",
    description:
      "Reviewed context subset that separates approved AI-readable material from broader working knowledge.",
  },
  {
    name: "Custom read-only MCP server",
    status: "Local smoke-tested prototype",
    description:
      "Allowlisted context retrieval with file listing, approved-file reads, keyword search, and protections against broad or unsafe access.",
  },
  {
    name: "Evidence Inventory Snapshot",
    status: "Implemented",
    description:
      "Public-safe historical measurement view with explicit caveats. It is not live telemetry.",
  },
  {
    name: "Normalized receipt and reconciler",
    status: "Future slice",
    description:
      "Proposed evidence-capture layer for timing, route, cost, validation, and human-gate reconciliation.",
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

      <section id="case-study-map" className="border-y border-primary/20 bg-primary/5 py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            AIOS Case Study Map
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            These public pages group the current AIOS artifacts without crowding
            the top navigation.
          </p>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
            Choose a path below to explore the AIOS case study.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aiosSections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="group flex min-h-[96px] flex-col rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/70 hover:bg-background/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 gap-3">
                    <span className="pt-0.5 text-xs font-semibold tabular-nums text-muted-foreground/60">
                      {section.order}
                    </span>
                    <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-foreground">
                      {section.title}
                    </h3>
                    {section.isRecommendedStart ? (
                      <Badge
                        variant="outline"
                        className="mt-2 border-border bg-transparent px-2 py-0 text-[10px] font-medium text-muted-foreground"
                      >
                        Start here
                      </Badge>
                    ) : null}
                    </div>
                  </div>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-sm text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                  >
                    →
                  </span>
                </div>
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

      <section className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Badge variant="outline">Recruiter-facing case study</Badge>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
            AI Delivery Measurement &amp; Governance
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">
            This project combines existing AI tools with customized governance, retrieval, review,
            and validation components. The value is not the number of tools used. It is the
            operating model that defines what each tool may do, what evidence should be retained,
            and where human judgment remains required.
          </p>

          <Card className="mt-6 border-primary/30 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">What this demonstrates</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              <p>
                Sararin can structure ambiguous AI-adoption problems, assign bounded
                responsibilities across tools, protect sensitive context, challenge weak evidence,
                and ship validated improvements without overstating system maturity.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-xs leading-5">
                <li>
                  Coordinated existing AI tools without confusing configuration with custom
                  development.
                </li>
                <li>
                  Designed governance boundaries across source-of-truth, retrieval, validation, and
                  human approval.
                </li>
                <li>
                  Built public-safe evidence surfaces while clearly labeling what is measured,
                  missing, or not proven.
                </li>
                <li>Preserved human approval where automation was not yet proven.</li>
              </ul>
            </CardContent>
          </Card>

          <div className="mt-8">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              Existing tools selected and configured
            </h3>
            <p className="mt-2 max-w-3xl text-xs leading-5 text-muted-foreground">
              These are third-party tools and access routes. They were selected, configured, tested,
              and assigned bounded responsibilities; they were not built as part of this project.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {existingTools.map((tool) => (
                <Card key={tool.name}>
                  <CardHeader className="pb-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <CardTitle className="text-sm">{tool.name}</CardTitle>
                      <Badge variant="outline">Existing tool</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-xs leading-5 text-muted-foreground">
                    <p>{tool.purpose}</p>
                    <p>
                      <span className="font-medium text-foreground">Project use:</span>{" "}
                      {tool.contribution}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              Systems designed and customized
            </h3>
            <p className="mt-2 max-w-3xl text-xs leading-5 text-muted-foreground">
              These working methods adapt existing tools into a controlled delivery process.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {customizedSystems.map((system) => (
                <Card key={system.name}>
                  <CardHeader className="pb-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <CardTitle className="text-sm">{system.name}</CardTitle>
                      <Badge variant="outline">{system.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs leading-5 text-muted-foreground">
                    {system.description}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              Components built locally
            </h3>
            <p className="mt-2 max-w-3xl text-xs leading-5 text-muted-foreground">
              These components were designed or implemented as part of the AIOS prototype.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {locallyBuiltComponents.map((component) => (
                <Card key={component.name}>
                  <CardHeader className="pb-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <CardTitle className="text-sm">{component.name}</CardTitle>
                      <Badge variant="outline">{component.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs leading-5 text-muted-foreground">
                    {component.description}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="mt-8 border-yellow-600/30 bg-yellow-50/60 dark:bg-yellow-950/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Current maturity boundary</CardTitle>
            </CardHeader>
            <CardContent className="text-xs leading-5 text-muted-foreground">
              The custom MCP layer is a local smoke-tested read-only prototype, not a production RAG
              system. Vector search, embeddings, semantic retrieval, live telemetry, automated
              approval, and enterprise-scale outcome claims remain outside the proven scope.
            </CardContent>
          </Card>

          <Link
            href="/architecture/system-health/observability"
            className="mt-6 inline-flex text-sm font-semibold text-primary hover:underline"
          >
            View the evidence and observability appendix →
          </Link>
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
                    Sararin / GPT
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
                    GPT
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
                  GPT KB + Git
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
                  ["Data Team", "Evidence structure and dashboard readiness"],
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
                owner: "Sararin + Codex",
                next: "Keep benchmark trace automation parked until a thin slice is chosen.",
                proof: "Documented",
              },
              {
                name: "Fallback routing",
                status: "Policy active",
                owner: "Sararin",
                next: "Route work by task type, failure mode, risk, and available worker/model.",
                proof: "Smoke-proven",
              },
              {
                name: "Profile positioning",
                status: "Active",
                owner: "Sararin + Codex",
                next: "Keep homepage focused on differentiation; avoid internal dashboard drift.",
                proof: "Regression-gated",
              },
              {
                name: "Supernova",
                status: "First version complete; POC not yet validated.",
                owner: "Sararin",
                next: "Define the first POC trigger and evidence requirement before treating it as operational.",
                proof: "Documented",
              },
              {
                name: "Data Team",
                status: "Evidence lens active",
                owner: "Sararin + Data Team",
                next: "Support evidence structure, aggregation logic, interpretation, and dashboard-readiness review without acting as final claim authority.",
                proof: "Documented",
              },
              {
                name: "Big Crew",
                status: "Started",
                owner: "Sararin + Codex",
                next: "Keep Big Crew usage bounded to implementation and verification tasks with explicit handoff.",
                proof: "Documented",
              },
              {
                name: "Researcher",
                status: "Started",
                owner: "Sararin + Researcher",
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
                    GPT KB + Git
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    Source of truth. Master archive of decisions.
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-foreground">
                    GPT
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
