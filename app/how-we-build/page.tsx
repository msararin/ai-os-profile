import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function HowWeBuildPage() {
  return (
    <PageLayout>
      {/* Header */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <Link
            href="/ai-operating-system#case-study-map"
            className="mb-5 inline-flex text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            ← Back to AIOS Case Study Map
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            How We Build
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Methodology, operational discipline, and lessons learned from
            building trustworthy AI systems.
          </p>
        </div>
      </section>

      {/* Methodology Overview */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Methodology Overview
          </h2>
          <p className="mt-4 text-muted-foreground">
            The AIOS methodology is built on six core principles that guide
            system design and operation. These aren&apos;t aspirational — they
            reflect actual design decisions embedded in the system.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              {
                number: 1,
                title: "Governed execution over rushed execution",
                description:
                  "Speed without governance creates rework and false confidence. Every AI-assisted output passes through a review gate before it counts as truth.",
              },
              {
                number: 2,
                title: "Single source of truth",
                description:
                  "Knowledge base and Git are the only places truth lives. UI surfaces, chat history, and AI memory are temporary — only what is committed counts.",
              },
              {
                number: 3,
                title: "Tools change; discipline doesn't",
                description:
                  "AI tools change every quarter. The principles for using them — review gates, source of truth, scoped roles — must outlast any specific tool or vendor.",
              },
              {
                number: 4,
                title: "Depth control by design",
                description:
                  "Internal complexity stays internal. External views show only what's audience-appropriate. The line between the two is intentional, not accidental.",
              },
              {
                number: 5,
                title: "Demonstrate maturity, not readiness",
                description:
                  "This system shows how AI work can be governed. It does not claim to be production-ready, autonomous, or live-deployed. Operating reality is labeled honestly.",
                highlight: true,
              },
              {
                number: 6,
                title: "Sustainable operating model",
                description:
                  "Designed for one person to run before scaling. Complexity that cannot be maintained by the operator becomes liability, not leverage.",
              },
            ].map((principle) => (
              <Card
                key={principle.number}
                className={
                  principle.highlight
                    ? "border-primary/50 bg-primary/5 ring-1 ring-primary/20"
                    : "border-border bg-card"
                }
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                        principle.highlight
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {principle.number}
                    </span>
                    <CardTitle className="text-base font-semibold leading-snug text-foreground">
                      {principle.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pl-16">
                  <p className="text-sm text-muted-foreground">
                    {principle.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Proven Patterns */}
      <section className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Proven Patterns
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Operational patterns that make AI work trustworthy, traceable, and
            maintainable.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Thin-Slice Delivery */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Thin-Slice Delivery
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  Work is broken into thin slices with explicit validation gates
                  between each slice. Build → test → commit → stop for review.
                  No multi-stage runs without checkpoints.
                </p>
                <p className="mt-3 font-medium text-foreground">Why:</p>
                <p className="mt-1">
                  Long autonomous runs without checkpoints produced large diffs
                  that were hard to review, debug, or rollback. Thin slices keep
                  errors local and recovery cheap.
                </p>
              </CardContent>
            </Card>

            {/* Privacy Architecture */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Privacy Architecture
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  Private raw context (decisions, finances, health, personal
                  notes) stays in the committed knowledge base. Public-facing
                  content is curated separately and reviewed for safety.
                </p>
                <p className="mt-3 font-medium text-foreground">Why:</p>
                <p className="mt-1">
                  Early attempts at auto-publishing from the knowledge base
                  leaked context that was fine for personal notes but not for
                  external visibility.
                </p>
              </CardContent>
            </Card>

            {/* Metadata-First Search */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Metadata-First Search
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  Search uses metadata (tags, categories, dates, file paths)
                  before full-text search. Metadata is structured, predictable,
                  and fast. Full-text is supplementary.
                </p>
                <p className="mt-3 font-medium text-foreground">Why:</p>
                <p className="mt-1">
                  Full-text-only search required expensive re-indexing and
                  returned noisy results. Metadata-first routing reduced search
                  latency and improved relevance.
                </p>
              </CardContent>
            </Card>

            {/* Observable Validation */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Observable Validation
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  Every stage includes a validation checklist with observable
                  pass/fail criteria: build status, HTTP response codes, file
                  counts, line counts, and regression test results.
                </p>
                <p className="mt-3 font-medium text-foreground">Why:</p>
                <p className="mt-1">
                  Prose validation ("looks good") hid silent errors. Observable
                  validation creates verifiable evidence and enables automated
                  regression gates.
                </p>
              </CardContent>
            </Card>

            {/* Benchmark Traces as Definition of Done */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Benchmark Traces as Definition of Done
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  Tasks are not complete until a benchmark trace is recorded:
                  model used, validation results, files changed, lines added,
                  and next gate. The trace is the evidence, not the chat log.
                </p>
                <p className="mt-3 font-medium text-foreground">Why:</p>
                <p className="mt-1">
                  Without structured traces, finding "what happened in Stage X"
                  required reading multi-page chat logs. Traces make work
                  queryable and auditable.
                </p>
              </CardContent>
            </Card>

            {/* Budgeted Multi-Agent Orchestration */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Budgeted Multi-Agent Orchestration
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  Mechanical work routes to cheap workers. Senior synthesis
                  routes to expensive models. No delegation without a named
                  decision, cost cap, and abort condition.
                </p>
                <p className="mt-3 font-medium text-foreground">Why:</p>
                <p className="mt-1">
                  Undisciplined routing burned budget on tasks that didn&apos;t
                  need senior reasoning. Role-first routing treats AI budget
                  like workforce salary.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Escalation Tiers */}
      <section className="border-t border-border py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Escalation Tiers
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Risk-aware routing that matches task complexity to appropriate
            review level.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                tier: "Tier 1",
                name: "Cheap/local first",
                description:
                  "Use for formatting, task packets, trace updates, markdown cleanup, extraction, checklists, and low-risk structured work.",
              },
              {
                tier: "Tier 2",
                name: "Senior synthesis",
                description:
                  "Use only when a named review, critique, tradeoff, or decision-quality output needs senior judgment.",
              },
              {
                tier: "Tier 3",
                name: "Executive escalation",
                description:
                  "Reserved for rare foundation decisions and protected categories; requires an explicit gate.",
              },
              {
                tier: "Tier 4",
                name: "Implementation lane",
                description:
                  "Bounded implementation executor used for repo and UI work by role fit, with files, validation, commit, and caveats returned.",
              },
            ].map((tier) => (
              <Card key={tier.tier} className="border-border bg-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-base font-medium text-foreground">
                      {tier.name}
                    </CardTitle>
                    <Badge variant="outline">{tier.tier}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {tier.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mt-6 max-w-3xl text-sm font-medium text-foreground">
            No senior delegation without a named decision, expected value, cost
            cap, and abort condition.
          </p>
        </div>
      </section>

      {/* Operational Lessons */}
      <section className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Operational Lessons: What Worked / Failed / Rules Created
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Real operational experience that shaped the current system design.
          </p>

          <div className="mt-8 space-y-6">
            {[
              {
                title: "Phase 1: Tool Chaos",
                challenge:
                  "Scattered AI tools, no governance, output treated as truth",
                failed:
                  "AI output drift, no version control, unreviewable changes",
                worked:
                  "Established knowledge base + Git as canonical source of truth",
                rule: "Only what is committed counts as truth. Chat history and AI memory are temporary.",
              },
              {
                title: "Phase 2: Source of Truth Protocol",
                challenge:
                  "Fast execution without traceability, no Definition of Done",
                failed:
                  "Silent errors in confident outputs, missing logic gaps, context drift",
                worked:
                  "Created commit-before-truth protocol, review gates, Git integration",
                rule: "Every artifact passes through human review before being committed as truth.",
              },
              {
                title: "Phase 3: Execution Governance",
                challenge:
                  "Generic routing led to budget waste and quality gaps",
                failed:
                  "Expensive models doing cheap work, cheap models attempting senior tasks",
                worked:
                  "Introduced benchmark trace, role boundaries, task packet workflow, capability-based routing",
                rule: "Tasks are routed by capability, not convenience. Role first, model second.",
              },
              {
                title: "Phase 4: Fallback & Resilience",
                challenge: "Single point of failure exposed by credit exhaustion",
                failed:
                  "402 incident caused work stoppage with no alternate route",
                worked:
                  "Implemented fallback routing policy, profile-based routing, smoke tests",
                rule: "Every primary route needs a documented fallback. Resilience is not optional.",
              },
              {
                title: "Phase 5: Portfolio Positioning",
                challenge:
                  "Internal complexity and raw metrics not portfolio-ready",
                failed:
                  "Early attempts leaked private context or unsupported metrics to public pages",
                worked:
                  "Public-safe profile with evidence standard, honest operating reality labeling, regression gates",
                rule: "Public-facing metrics require baseline, date, scope, caveat, and evidence source. No quantified claims without the full five-field standard.",
              },
            ].map((lesson, idx) => (
              <Card key={idx} className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-lg font-medium">
                    {lesson.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-foreground">Challenge:</p>
                    <p className="mt-1 text-muted-foreground">
                      {lesson.challenge}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-amber-700">What Failed:</p>
                    <p className="mt-1 text-muted-foreground">{lesson.failed}</p>
                  </div>
                  <div>
                    <p className="font-medium text-emerald-700">What Worked:</p>
                    <p className="mt-1 text-muted-foreground">{lesson.worked}</p>
                  </div>
                  <div className="border-t border-border pt-3">
                    <p className="font-medium text-primary">Rule Created:</p>
                    <p className="mt-1 text-muted-foreground">{lesson.rule}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Maturity Progression */}
      <section className="border-t border-border py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Maturity Progression: Before / After
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            The journey from scattered tools and manual execution to governed
            workflow with review gates, source-of-truth discipline, and
            benchmark-driven validation.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-amber-700">
                  Before
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Manual execution, no governance</li>
                  <li>• AI output treated as truth without review</li>
                  <li>• No source of truth protocol</li>
                  <li>• Scattered tools, no integration</li>
                  <li>• Chat logs as the only record</li>
                  <li>• No fallback when primary route fails</li>
                  <li>• Budget waste on undisciplined routing</li>
                  <li>• Public pages risked leaking private context</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-primary">
                  After
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Governed workflow with human review gates</li>
                  <li>• Knowledge base + Git = source of truth</li>
                  <li>• Benchmark trace as Definition of Done</li>
                  <li>• Capability-based routing (role first, model second)</li>
                  <li>• Structured traces for every stage</li>
                  <li>• Fallback routing policy active</li>
                  <li>• Budget discipline: cheap-first, senior for decisions</li>
                  <li>
                    • Privacy architecture: internal complexity stays internal
                  </li>
                  <li>
                    • Evidence standard: baseline, date, scope, caveat, source
                  </li>
                  <li>• Observable validation: build, tests, HTTP codes</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Closing Quote */}
      <section className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <blockquote className="border-l-4 border-primary pl-6">
            <p className="text-lg font-medium text-foreground">
              &ldquo;AI orchestration is program management. Tools change.
              Governance discipline doesn&apos;t.&rdquo;
            </p>
          </blockquote>
          <p className="mt-6 text-sm text-muted-foreground">
            These principles are not aspirational — they reflect the actual
            design decisions embedded in this system. They will evolve as the
            system matures, but the commitment to governance-first thinking
            remains constant.
          </p>
        </div>
      </section>
    </PageLayout>
  )
}
