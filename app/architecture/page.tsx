import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function FlowArrow({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <svg
        className="h-6 w-6 text-muted-foreground"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
      <span className="text-xs italic text-muted-foreground">{label}</span>
    </div>
  )
}

export default function ArchitecturePage() {
  return (
    <PageLayout>
      {/* Header */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            4-Layer Architecture
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            A layered approach to AI orchestration that separates strategic
            intent, routing, execution, and truth storage.
          </p>
        </div>
      </section>

      {/* Control Plane Thinking */}
      <section className="border-b border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Control Plane Thinking
            </h2>
            <p className="mt-2 text-muted-foreground">
              A personal AI Operating System case study applying enterprise-grade
              control-plane concepts.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-foreground">
                Maturity Framing
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                This is not an enterprise platform at scale. It's a demonstration of
                enterprise-grade <span className="italic">thinking</span> applied to a
                personal AI Operating System. The concepts (control plane, trust layer,
                evidence discipline) are borrowed from production systems, but adapted
                to single-operator scale with explicit maturity status tracking.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-foreground">
                Cross-Cutting Capabilities
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Beyond the 4-layer architecture, these capabilities span multiple
                layers:
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-2 text-left font-medium text-foreground">
                        Capability
                      </th>
                      <th className="px-4 py-2 text-left font-medium text-foreground">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="px-4 py-3 text-muted-foreground">
                        Observability
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-md bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-700 dark:text-yellow-400">
                          In Progress
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="px-4 py-3 text-muted-foreground">
                        Cost / Budget Control
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400">
                          Current
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="px-4 py-3 text-muted-foreground">
                        Traceability
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-md bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-700 dark:text-yellow-400">
                          In Progress
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="px-4 py-3 text-muted-foreground">
                        Privacy / Security
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400">
                          Current
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="px-4 py-3 text-muted-foreground">
                        Fallback / Resilience
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-400">
                          Planned
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="px-4 py-3 text-muted-foreground">
                        Anti-Fatigue Design
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400">
                          Current
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-muted-foreground">
                        Source-of-Truth Discipline
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400">
                          Current
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs italic text-muted-foreground">
                Status badges reflect implementation maturity, not aspirational goals.
                "Current" means working and in use. "In Progress" means partially
                implemented. "Planned" means designed but not built.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {/* Layer 1 */}
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-primary text-xs font-semibold text-primary-foreground">
                      1
                    </span>
                    <h3 className="font-semibold text-foreground">
                      Executive Layer
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Strategic intent, decision authority, scope control
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md bg-background px-2 py-1 text-xs font-medium text-foreground shadow-sm">
                    Robert / GPT
                  </span>
                  <span className="rounded-md bg-background px-2 py-1 text-xs font-medium text-foreground shadow-sm">
                    Hermes + Opus + custom MCP*
                  </span>
                </div>
              </div>
              <p className="mt-4 border-t border-primary/20 pt-3 text-xs italic text-muted-foreground">
                Hermes operates as a context-aware operator surface. MCP is the
                read-only bridge for context retrieval — not an autonomous
                execution path.
              </p>
            </div>

            {/* Arrow: Executive → Routing */}
            <FlowArrow label="Strategic intent + scope" />

            {/* Layer 2 */}
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-muted text-xs font-semibold text-muted-foreground">
                      2
                    </span>
                    <h3 className="font-semibold text-foreground">
                      Routing Layer
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Capability-based routing, worker allocation
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-foreground">
                    optimize-worker
                  </span>
                </div>
              </div>
            </div>

            {/* Arrow: Routing → Execution */}
            <FlowArrow label="Routed task + capability match" />

            {/* Layer 3 */}
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-muted text-xs font-semibold text-muted-foreground">
                      3
                    </span>
                    <h3 className="font-semibold text-foreground">
                      Execution Layer
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    AI workers, policy guardrails, testing & critique loops
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-foreground">
                    Codex
                  </span>
                  <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-foreground">
                    Hermes
                  </span>
                  <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                    local agents
                  </span>
                </div>
              </div>
            </div>

            {/* Arrow: Execution → Source-of-Truth */}
            <FlowArrow label="Reviewed artifact (commit gate)" />

            {/* Human Review Gate (between Execution and Source-of-Truth) */}
            <div className="rounded-lg border-2 border-dashed border-amber-500/60 bg-amber-500/5 p-4 text-center">
              <p className="text-sm font-semibold text-amber-700">
                Human Review Gate
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Checkpoint, not a layer — every artifact passes here before it
                is treated as committed truth.
              </p>
            </div>

            {/* Arrow into Layer 4 */}
            <FlowArrow label="Committed truth" />

            {/* Layer 4 */}
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-primary text-xs font-semibold text-primary-foreground">
                      4
                    </span>
                    <h3 className="font-semibold text-foreground">
                      Source-of-Truth Layer
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Committed KB (glossary + index), decision logs
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md bg-background px-2 py-1 text-xs font-medium text-foreground shadow-sm">
                    Privacy-first
                  </span>
                  <span className="rounded-md bg-background px-2 py-1 text-xs font-medium text-foreground shadow-sm">
                    Committed KB protocol
                  </span>
                </div>
              </div>
            </div>

            {/* MCP Footnote */}
            <p className="mt-4 text-xs italic text-muted-foreground">
              *Current operational trial surface. MCP is used as a read-only context bridge for controlled context retrieval. It is not yet approved as an autonomous production workflow.
            </p>

            {/* Cross-cutting */}
            <div className="mt-6 rounded-lg border border-dashed border-border bg-muted/30 p-4">
              <p className="text-center text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  Cross-cutting:
                </span>{" "}
                Backlog & Visibility surface — control surface across every
                layer
              </p>
            </div>

            {/* Observability Layer */}
            <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-primary text-xs font-semibold text-primary-foreground">
                      E
                    </span>
                    <h3 className="font-semibold text-foreground">
                      AIOS Observability Layer
                    </h3>
                  </div>
                  <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
                    Captures execution traces, routing decisions, cost/usage
                    evidence, reliability signals, and deployment readiness
                    checks. In Phase 1, telemetry production and store behavior
                    remain implemented in optimize-worker while AIOS owns the
                    governance meaning of the evidence.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md bg-background px-2 py-1 text-xs font-medium text-foreground shadow-sm">
                    Governance evidence
                  </span>
                  <span className="rounded-md bg-background px-2 py-1 text-xs font-medium text-foreground shadow-sm">
                    Phase 1 implementation
                  </span>
                </div>
              </div>
              <div className="mt-4 grid gap-3 border-t border-primary/20 pt-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold uppercase text-foreground">
                    Surface
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    ai-os-profile remains the deployable cockpit and app
                    surface.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-foreground">
                    Foundation
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    AWS foundation is ready, but the app is not deployed there.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-foreground">
                    Gate
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Deployment waits for the SQLite runtime contract; refactor
                    work is paused pending regression strategy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Six Design Choices */}
      <section className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Six Design Choices
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-xs font-semibold text-primary">
                    1
                  </span>
                  <CardTitle className="text-sm font-medium">
                    Optimization & Routing
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Match capability to task
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-xs font-semibold text-primary">
                    2
                  </span>
                  <CardTitle className="text-sm font-medium">
                    Policy & Guardrails
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Boundaries before behavior
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-xs font-semibold text-primary">
                    3
                  </span>
                  <CardTitle className="text-sm font-medium">
                    Backlog & Visibility
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Control surface, not admin
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-xs font-semibold text-primary">
                    4
                  </span>
                  <CardTitle className="text-sm font-medium">
                    Knowledge Base Governance
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Truth lives in committed knowledge
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-xs font-semibold text-primary">
                    5
                  </span>
                  <CardTitle className="text-sm font-medium">
                    Testing Discipline
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Critique, regression, gates at every layer
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-xs font-semibold text-primary">
                    6
                  </span>
                  <CardTitle className="text-sm font-medium">
                    Human Review Gate
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Last line before truth commits
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why This Way */}
      <section className="border-t border-border py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <blockquote className="border-l-4 border-primary pl-6">
            <p className="text-lg font-medium text-foreground">
              &ldquo;AI orchestration is program management. Tools change.
              Governance discipline doesn&apos;t.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      {/* Component Glossary */}
      <section className="border-t border-border bg-muted/30 py-12">
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
                    Context-aware operator surface — Active trial — structured context pull, task continuity, governance-aware operation.
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
                    AIOS Observability Layer
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
          {/* MCP Footnote for Glossary */}
          <p className="mt-4 text-xs italic text-muted-foreground">
            *Current operational trial surface. MCP is used as a read-only context bridge for controlled context retrieval. It is not yet approved as an autonomous production workflow.
          </p>
        </div>
      </section>
    </PageLayout>
  )
}
