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

const principles = [
  "Evidence-first",
  "Fail-safe default: unclear/incomplete -> STOP",
  "Human approval required for HIGH-risk",
  "Rollback requires approval before Codex executes",
  "15-minute checkpoint discipline",
]

const riskTiers = [
  {
    tier: "LOW",
    meaning:
      "Narrow, reversible, non-sensitive edits with clear validation and limited user-facing impact.",
  },
  {
    tier: "MEDIUM",
    meaning:
      "Public-facing or strategic content changes that may need a human gate before release.",
  },
  {
    tier: "HIGH",
    meaning:
      "Changes involving release controls, sensitive surfaces, broad scope, or meaningful rollback exposure.",
  },
  {
    tier: "MUST STOP",
    meaning:
      "Ambiguous authority, incomplete evidence, sensitive material risk, or unclear production impact.",
  },
]

const governancePatches = [
  "Private/raw requires explicit approval and is not automation-safe",
  "Codex prepares rollback; human approves before execution",
  "MEDIUM public-facing strategic content may require human gate",
  "Implementation phases are candidate proposals, not approved plans",
]

const boundaries = [
  "Deployments require human direction and are never agent-only",
  "No use of git add .",
  "No use of git add -A",
  "Codex does not hold final authority",
  "No silent long-running sessions",
  "No claim that a pre-push hook is present",
  "Rollback is not self-executing",
  "This is not presented as a live production governance system",
]

export default function ArchitecturePage() {
  return (
    <PageLayout>
      {/* Header */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            AIOS architecture
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Architecture
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            A layered AI Operating System architecture that separates strategic
            intent, routing, execution, human review, source-of-truth discipline,
            and manual release governance.
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
              A personal AI Operating System case study applying
              enterprise-grade control-plane concepts at single-operator scale.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-foreground">
                Maturity Framing
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                This is not an enterprise platform at scale. It is a public-safe
                architecture story for governed AI-enabled work: human authority,
                routing, execution guardrails, review checkpoints, and evidence
                discipline. Release governance is described as design and manual
                operating hygiene, not implemented full automation.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-foreground">
                Cross-Cutting Capabilities
              </h3>
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
                    {[
                      ["Observability", "In Progress"],
                      ["Cost / Budget Control", "Current"],
                      ["Traceability", "In Progress"],
                      ["Privacy / Security", "Current"],
                      ["Fallback / Resilience", "Planned"],
                      ["Anti-Fatigue Design", "Current"],
                      ["Source-of-Truth Discipline", "Current"],
                    ].map(([capability, status]) => (
                      <tr key={capability} className="border-b border-border">
                        <td className="px-4 py-3 text-muted-foreground">
                          {capability}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-foreground">
                            {status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs italic text-muted-foreground">
                Status badges reflect current maturity, not aspirational claims.
                Planned means designed but not built.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Layered Operating Flow
            </h2>
            <p className="mt-2 max-w-3xl text-muted-foreground">
              The original AIOS flow remains the base. Release governance extends
              the flow after source-of-truth review so implementation, validation,
              and evidence stay under human-controlled release discipline.
            </p>
          </div>

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
                    Human decision owner
                  </span>
                  <span className="rounded-md bg-background px-2 py-1 text-xs font-medium text-foreground shadow-sm">
                    Strategy review
                  </span>
                </div>
              </div>
            </div>

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
                    Capability-based routing, worker allocation, cost-aware task
                    matching
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-foreground">
                    Routing rules
                  </span>
                  <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-foreground">
                    Budget visibility
                  </span>
                </div>
              </div>
            </div>

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
                    AI workers, policy guardrails, testing, critique loops, and
                    scoped implementation work
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-foreground">
                    Bounded executors
                  </span>
                  <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-foreground">
                    Guardrails
                  </span>
                </div>
              </div>
            </div>

            <FlowArrow label="Reviewed artifact candidate" />

            {/* Human Review Gate */}
            <div className="rounded-lg border-2 border-dashed border-amber-500/60 bg-amber-500/5 p-4 text-center">
              <p className="text-sm font-semibold text-amber-700">
                Human Review Gate
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Checkpoint, not a layer. Every artifact is reviewed before it is
                treated as committed truth or release-ready work.
              </p>
            </div>

            <FlowArrow label="Reviewed truth" />

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
                    Committed knowledge, decision logs, reviewed evidence, and
                    source-of-truth discipline
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md bg-background px-2 py-1 text-xs font-medium text-foreground shadow-sm">
                    Privacy-first
                  </span>
                  <span className="rounded-md bg-background px-2 py-1 text-xs font-medium text-foreground shadow-sm">
                    Reviewed records
                  </span>
                </div>
              </div>
            </div>

            <FlowArrow label="Governed release candidate" />

            {/* Layer 5 */}
            <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/5 p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-emerald-600 text-xs font-semibold text-white">
                      5
                    </span>
                    <h3 className="font-semibold text-foreground">
                      Agentic Release Governance Control
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Applies manual release discipline, risk framing, checkpoint
                    cadence, and stop conditions before work proceeds.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md bg-background px-2 py-1 text-xs font-medium text-foreground shadow-sm">
                    Risk review
                  </span>
                  <span className="rounded-md bg-background px-2 py-1 text-xs font-medium text-foreground shadow-sm">
                    Manual preflight
                  </span>
                </div>
              </div>
              <p className="mt-4 border-t border-emerald-500/20 pt-3 text-xs italic text-muted-foreground">
                This is release governance design and current manual discipline,
                not a claim that release governance has been implemented as full
                automation.
              </p>
            </div>

            <FlowArrow label="Scoped implementation + validation" />

            {/* Supporting operational flow */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-muted text-xs font-semibold text-muted-foreground">
                    S1
                  </span>
                  <h3 className="font-semibold text-foreground">
                    Codex Release Engineering
                  </h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Prepares scoped repo edits, validation outputs, rollback
                  materials, and review-ready evidence for human decision.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-muted text-xs font-semibold text-muted-foreground">
                    S2
                  </span>
                  <h3 className="font-semibold text-foreground">
                    CI/CD + GitHub + Vercel
                  </h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Provides repository, build, check, and preview surfaces under
                  explicit human-controlled release flow.
                </p>
              </div>
            </div>

            <FlowArrow label="Evidence capture + review trace" />

            {/* Layer 6 */}
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-primary text-xs font-semibold text-primary-foreground">
                      6
                    </span>
                    <h3 className="font-semibold text-foreground">
                      Evidence / Audit Layer
                    </h3>
                  </div>
                  <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
                    Captures validation outputs, diffs, status snapshots, review
                    notes, routing decisions, and decision records for
                    traceability.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md bg-background px-2 py-1 text-xs font-medium text-foreground shadow-sm">
                    Audit evidence
                  </span>
                  <span className="rounded-md bg-background px-2 py-1 text-xs font-medium text-foreground shadow-sm">
                    Review trace
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-dashed border-border bg-muted/30 p-4">
              <p className="text-center text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  Cross-cutting:
                </span>{" "}
                budget visibility, privacy boundaries, regression awareness,
                and source-of-truth discipline across every layer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Governance Detail */}
      <section className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Governance Principles
            </h2>
            <div className="mt-4 space-y-3">
              {principles.map((principle) => (
                <div
                  key={principle}
                  className="rounded-lg border border-border bg-background p-4 text-sm text-foreground"
                >
                  {principle}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Risk Tiers
            </h2>
            <div className="mt-4 space-y-3">
              {riskTiers.map((risk) => (
                <Card key={risk.tier}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{risk.tier}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {risk.meaning}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-12">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Governance Patches
            </h2>
            <ul className="mt-4 space-y-3">
              {governancePatches.map((patch) => (
                <li
                  key={patch}
                  className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground"
                >
                  {patch}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Boundaries
            </h2>
            <ul className="mt-4 space-y-3">
              {boundaries.map((boundary) => (
                <li
                  key={boundary}
                  className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground"
                >
                  {boundary}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Governance Discipline</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-medium text-foreground">Design phase</dt>
                  <dd className="mt-1 text-muted-foreground">Complete</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">
                    Operational status
                  </dt>
                  <dd className="mt-1 text-muted-foreground">
                    NOT yet implemented as automation
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">
                    Current practice
                  </dt>
                  <dd className="mt-1 text-muted-foreground">
                    Manual governance hygiene
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">
                    Resume criteria
                  </dt>
                  <dd className="mt-1 text-muted-foreground">
                    Implementation proceeds only if operational trigger occurs
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  )
}
