import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const differentiationClaims = [
  {
    id: 1,
    title: "Separate role, model, provider, and cost",
    description:
      "AIOS separates who does the work (role) from which model executes it from how much it costs. Most tools conflate these, making cost and traceability unclear.",
  },
  {
    id: 2,
    title: "Benchmark trace as Definition of Done gate",
    description:
      "Tasks aren't complete until benchmark trace is recorded. This isn't telemetry after the fact; it's a gate before commit.",
  },
  {
    id: 3,
    title: "Learning from failure with policy response",
    description:
      "When a 402 incident occurred, the response was a documented fallback routing policy and smoke test, not silent fixes.",
  },
  {
    id: 4,
    title: "Human review gates where risk matters",
    description:
      "AI helps fast. But outputs pass through human review gates for money, privacy, reputation, and irreversible decisions.",
  },
  {
    id: 5,
    title: "Privacy-first curated context",
    description:
      "AI workers consume only curated, approved context. Full KB access is not given; context is allowlisted and leak-scanned.",
  },
]

const evidenceAnchors = [
  {
    title: "Failure became policy",
    description:
      "A credit exhaustion event produced a documented fallback routing policy and smoke test instead of an undocumented workaround.",
    proof: "Smoke-proven",
  },
  {
    title: "Completion requires trace",
    description:
      "Routed tasks are expected to carry validation evidence before they are treated as done.",
    proof: "Regression-gated",
  },
  {
    title: "Context is intentionally bounded",
    description:
      "AI workers use curated context and review gates rather than unrestricted private knowledge access.",
    proof: "Documented",
  },
]

const systemState = [
  ["Source of truth", "Robert KB + Git remain canonical."],
  ["Governance", "Human review gates protect money, privacy, reputation, and irreversible decisions."],
  ["Routing", "Fallback routing policy exists so one worker or model is not a single point of failure."],
  ["Proof level", "Current profile is documented, smoke-proven in selected flows, and regression-gated."],
]

export default function HomePage() {
  return (
    <PageLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            AI Orchestration Governance
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            Tools change. Governance discipline doesn&apos;t.
          </p>
          <p className="mt-2 max-w-2xl text-pretty text-lg font-medium text-primary">
            AIOS is a working evidence trail for human-led AI work governance.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/architecture">View Architecture</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/workstreams">View Workstreams</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            What Makes This Different?
          </h2>
          <p className="mt-4 max-w-3xl text-sm text-muted-foreground">
            Most AI tools focus on building agents or automating workflows.
            AIOS focuses on a harder problem: How do you govern AI work when
            multiple models, roles, and costs interact?
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {differentiationClaims.map((claim) => (
              <Card key={claim.id} className="border-border bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium text-primary">
                    {claim.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {claim.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-8 text-sm italic text-muted-foreground">
            This is a portfolio case study, not a production product.
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Evidence Anchors
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Short proof points that explain the operating discipline without
            turning the homepage into a status dashboard.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {evidenceAnchors.map((anchor) => (
              <Card key={anchor.title} className="border-border bg-card">
                <CardHeader className="pb-3">
                  <div className="flex flex-col gap-3">
                    <Badge
                      variant="secondary"
                      className="w-fit bg-primary/10 text-primary"
                    >
                      {anchor.proof}
                    </Badge>
                    <CardTitle className="text-base font-medium">
                      {anchor.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {anchor.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            System State
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Compact summary only. Actionable workstream status lives on the
            Workstreams page.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {systemState.map(([label, value]) => (
              <Card key={label} className="border-border bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium text-primary">
                    {label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
