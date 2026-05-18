import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
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
            </div>

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

            {/* Arrow */}
            <div className="flex justify-center">
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
            </div>

            {/* Human Review Gate */}
            <div className="rounded-lg border-2 border-dashed border-amber-500/50 bg-amber-500/5 p-4 text-center">
              <p className="text-sm font-medium text-amber-700">
                Human Review Gate
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Strategic intervention point for high-risk decisions
              </p>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
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
            </div>

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

            {/* Arrow */}
            <div className="flex justify-center">
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
            </div>

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
                    Long reasoning, decision packs, prompt generation.
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-foreground">
                    optimize-worker
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    Execution routing and task packaging layer.
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-foreground">
                    Hermes
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    Lightweight planning / handoff runner (parked-but-usable).
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
                    Curated external visibility layer (this site).
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
