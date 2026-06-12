import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AchievementLearningPage() {
  return (
    <PageLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Achievement & Learning
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            How this AI orchestration system was built, from scattered tools to
            governed workflow.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Learning Curve
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            May 18–21, 2026 | 5 phases, 6 milestones, evidence-backed commits
          </p>
          <div className="mt-8 space-y-6">
            {learningPhases.map((phase) => (
              <Card key={phase.id} className="border-border bg-card">
                <CardHeader>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle className="text-lg font-medium">
                      {phase.title}
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className="w-fit bg-muted text-xs text-muted-foreground"
                    >
                      {phase.date}
                    </Badge>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`${phase.badgeClass} w-fit`}
                  >
                      {phase.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium text-foreground">
                    Challenge: {phase.challenge}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Solution: {phase.solution}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Maturity Progression
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            From manual execution to governed orchestration.
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
                  <li>Manual execution, no governance</li>
                  <li>AI output treated as truth</li>
                  <li>No source of truth protocol</li>
                  <li>Scattered tools, no integration</li>
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
                  <li>Governed workflow with review gates</li>
                  <li>GPT KB + Git = source of truth</li>
                  <li>Benchmark trace as Definition of Done</li>
                  <li>Fallback routing policy active</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Key Milestones & Evidence
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {milestones.map((milestone) => (
              <Card key={milestone.id} className="border-border bg-card">
                <CardHeader className="pb-3">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle className="text-base font-medium text-primary">
                      {milestone.title}
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className="w-fit bg-muted text-xs text-muted-foreground"
                    >
                      {milestone.date}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {milestone.description}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Evidence: {milestone.evidence}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            What This Proves
          </h2>
          <div className="mt-6 space-y-4 text-sm text-muted-foreground">
            <p>
              This system demonstrates <strong>design maturity</strong>: not
              just tool usage, but governance discipline through documented
              decisions, version-controlled truth, scoped roles, and review
              gates before anything is treated as committed.
            </p>
            <p>
              It shows <strong>evidence-based iteration</strong>: when a
              failure occurs, the response is a documented fallback routing
              policy, smoke test, and benchmark trace, not silent fixes or
              undocumented workarounds.
            </p>
            <p>
              It practices{" "}
              <strong>honest operating reality labeling</strong>: this is a
              portfolio case study, not a production cockpit. Maturity claims
              are backed by proof level: documented, tabletop-tested,
              smoke-proven, or runtime-proven.
            </p>
            <p>
              This proves <strong>PM and architect thinking</strong>: the
              ability to design AI-assisted systems with governance,
              traceability, review gates, and cost control.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

const learningPhases = [
  {
    id: 1,
    title: "Phase 1: Tool Chaos",
    date: "May 18, 2026",
    challenge: "Scattered AI tools, no governance, output treated as truth",
    solution: "Established GPT KB + Git as canonical source of truth",
    status: "Resolved",
    badgeClass: "bg-emerald-500/10 text-emerald-700",
  },
  {
    id: 2,
    title: "Phase 2: Source of Truth Protocol",
    date: "May 18, 2026",
    challenge: "AI output drift, no version control, unreviewable changes",
    solution: "Created commit-before-truth protocol, review gates, Git integration",
    status: "Active",
    badgeClass: "bg-primary/10 text-primary",
  },
  {
    id: 3,
    title: "Phase 3: Execution Governance",
    date: "May 19-20, 2026",
    challenge: "Fast execution without traceability, no Definition of Done",
    solution: "Introduced benchmark trace, role boundaries, task packet workflow",
    status: "Active",
    badgeClass: "bg-primary/10 text-primary",
  },
  {
    id: 4,
    title: "Phase 4: Fallback & Resilience",
    date: "May 20-21, 2026",
    challenge: "402 incident exposed single point of failure",
    solution: "Implemented fallback routing policy, profile-based routing, smoke tests",
    status: "Smoke-proven",
    badgeClass: "bg-teal-500/10 text-teal-700",
  },
  {
    id: 5,
    title: "Phase 5: Portfolio Positioning",
    date: "May 21, 2026 (ongoing)",
    challenge: "Private complexity not portfolio-ready",
    solution: "v2.0.0 spec lock, regression gate, public-safe profile, honest labeling",
    status: "In Progress",
    badgeClass: "bg-amber-500/10 text-amber-700",
  },
]

const milestones = [
  {
    id: 1,
    title: "402 Incident Recovery",
    date: "May 20-21, 2026",
    description:
      "HTTP 402 credit exhaustion led to fallback routing policy and documented route hygiene.",
    evidence: "commits a2d0522 → 8900af0",
  },
  {
    id: 2,
    title: "Benchmark Trace as DoD Gate",
    date: "May 19-20, 2026",
    description:
      "Centralized Definition of Done: routed tasks record model, validation, and execution evidence where available.",
    evidence: "commit 4433b1d",
  },
  {
    id: 3,
    title: "Profile-Based Routing Smoke Test",
    date: "May 21, 2026",
    description:
      "openrouter-sonnet-kb-stage-manager profile proven for bounded KB stage-manager work.",
    evidence: "commit bcfa934",
  },
  {
    id: 4,
    title: "v2.0.0 Spec Lock + Regression Gate",
    date: "May 19, 2026",
    description:
      "Regression test established as a gate; no v2.x patch bypasses validation.",
    evidence: "commit 886a687",
  },
  {
    id: 5,
    title: "Hermes Session Continuity Contract",
    date: "May 21, 2026",
    description:
      "Codified memory hierarchy: session, KB, Git, and trace each have defined authority.",
    evidence: "commit 1a9ae62",
  },
  {
    id: 6,
    title: "Worker Routing Policy Clarified",
    date: "May 21, 2026",
    description:
      "Hermes acts as stage manager, not UI implementer. Implementation tasks route to Codex by default.",
    evidence: "commit bea29be",
  },
]
