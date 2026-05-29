import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const layers = [
  {
    name: "Human Decision Layer",
    description:
      "Sets intent, approves high-impact changes, and remains the final authority for release decisions.",
  },
  {
    name: "Agentic Release Governance Control",
    description:
      "Applies manual release discipline, risk framing, checkpoint cadence, and stop conditions before work proceeds.",
  },
  {
    name: "Stage Manager / Multi-Agent Review",
    description:
      "Coordinates review passes, identifies uncertainty, and keeps candidate plans separate from approved action.",
  },
  {
    name: "Codex Release Engineering",
    description:
      "Prepares scoped implementation changes, validation commands, rollback materials, and review-ready evidence.",
  },
  {
    name: "CI/CD + GitHub + Vercel",
    description:
      "Provides repository, build, and hosting surfaces used only under explicit human-controlled release flow.",
  },
  {
    name: "Evidence / Audit Layer",
    description:
      "Captures validation outputs, diffs, status snapshots, review notes, and decision records for traceability.",
  },
]

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
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Governance design
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Architecture
          </h1>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            A public-safe release governance architecture for manual release
            discipline, review evidence, and human-controlled decision points.
            This describes the design and current operating hygiene; it does not
            claim that release governance has been implemented as automation.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Release Governance Architecture
            </h2>
            <p className="mt-2 max-w-3xl text-muted-foreground">
              The model separates human authority, agent coordination, release
              engineering, infrastructure surfaces, and audit evidence. Each layer
              exists to keep judgment, execution, and proof distinct.
            </p>
          </div>

          <div className="grid gap-4">
            {layers.map((layer, index) => (
              <Card key={layer.name}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
                      {index + 1}
                    </span>
                    <CardTitle className="text-lg">{layer.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {layer.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Principles
            </h2>
            <div className="mt-4 space-y-3">
              {principles.map((principle) => (
                <div
                  key={principle}
                  className="rounded-lg border border-border bg-card p-4 text-sm text-foreground"
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

      <section className="border-y border-border bg-muted/30 py-12">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Governance Patches
            </h2>
            <ul className="mt-4 space-y-3">
              {governancePatches.map((patch) => (
                <li
                  key={patch}
                  className="rounded-lg border border-border bg-background p-4 text-sm text-muted-foreground"
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
                  className="rounded-lg border border-border bg-background p-4 text-sm text-muted-foreground"
                >
                  {boundary}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12">
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
