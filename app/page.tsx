import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const differentiationClaims = [
  {
    id: 1,
    title: "AI worker routing",
    description:
      "Route tasks to different models based on complexity, cost, and capability—not one model for everything.",
  },
  {
    id: 2,
    title: "Human review gates",
    description:
      "AI helps fast, but outputs pass through human gates for money, privacy, reputation, and irreversible decisions.",
  },
  {
    id: 3,
    title: "Benchmark traces",
    description:
      "Tasks produce benchmark evidence before they're marked done—not just completion signals.",
  },
  {
    id: 4,
    title: "Git/artifact anchors",
    description:
      "Work is linked to commits, files, and artifacts—making claims verifiable, not just verbal.",
  },
  {
    id: 5,
    title: "Private/public curation discipline",
    description:
      "AI workers consume curated, approved context only—no unrestricted access to personal or employer-sensitive data.",
  },
  {
    id: 6,
    title: "Cost-aware model routing",
    description:
      "Separate role, model, provider, and cost so execution is traceable and cost is not conflated with quality.",
  },
]

const proofCase = {
  title: "CI/CD + Benchmark Trace Proof",
  summary:
    "CI/CD deployment preflight task caught scope creep before it reached production.",
  steps: [
    {
      label: "Task started",
      description: "Add CI deployment preflight workflow",
    },
    {
      label: "Initial commit",
      description: "Included 8 out-of-scope files (ESLint setup, API rename, fonts, types)",
    },
    {
      label: "Benchmark trace caught violation",
      description: "Governance review detected scope creep before push",
    },
    {
      label: "Corrective action",
      description: "Commit amended to include only 2 intended files (CI workflow + docs)",
    },
    {
      label: "Result",
      description: "Deployment guardrail shipped with clean release discipline",
    },
  ],
  claimAllowed: "Benchmark traces help catch scope creep and prevent unsafe releases.",
  claimNotAllowed: [
    "This proves model cost optimization.",
    "This proves deployment is fully automated.",
    "This proves end-to-end production safety.",
  ],
}

const benchmarkValue = [
  {
    title: "Catching scope creep",
    description: "Detect when work includes unintended changes before commit/push.",
  },
  {
    title: "Preventing false claims",
    description: "Distinguish process proof from cost proof, execution proof from quality proof.",
  },
  {
    title: "Linking work to artifacts",
    description: "Anchor claims to commit hashes, file paths, validation logs.",
  },
  {
    title: "Comparing quality over time",
    description: "Track whether governance discipline improves or degrades across tasks.",
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
            AI Operating Systems That Turn AI Work Into Governed, Traceable Delivery Evidence
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            Lyn builds AI operating systems—not just prompts and tools. AIOS routes work across models, enforces human review gates, and produces benchmark traces that anchor claims to commits and artifacts.
          </p>
          <p className="mt-2 max-w-2xl text-pretty text-base text-muted-foreground italic">
            This is governed, traceable AI execution—not generic AI prompting.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="#proof-case">View Proof Case</Link>
            </Button>
            <Button variant="outline" asChild>
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
            What Makes This Different From Generic AI Usage?
          </h2>
          <p className="mt-4 max-w-3xl text-sm text-muted-foreground">
            Most AI tools focus on building agents or automating workflows.
            AIOS focuses on a harder problem: How do you govern AI work when
            multiple models, roles, and costs interact—and how do you prove the system works?
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

      <section id="proof-case" className="border-t border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            {proofCase.title}
          </h2>
          <p className="mt-2 max-w-3xl text-base text-muted-foreground">
            {proofCase.summary}
          </p>
          <div className="mt-8 space-y-4">
            {proofCase.steps.map((step, idx) => (
              <Card key={idx} className="border-border bg-card">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <Badge
                      variant="secondary"
                      className="mt-1 shrink-0 bg-primary/10 text-primary"
                    >
                      {idx + 1}
                    </Badge>
                    <div>
                      <CardTitle className="text-base font-medium">
                        {step.label}
                      </CardTitle>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="mt-8 space-y-4">
            <Card className="border-green-500/20 bg-green-500/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium text-green-700 dark:text-green-400">
                  ✓ Claim allowed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {proofCase.claimAllowed}
                </p>
              </CardContent>
            </Card>
            <Card className="border-red-500/20 bg-red-500/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium text-red-700 dark:text-red-400">
                  ✗ Claims NOT allowed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {proofCase.claimNotAllowed.map((claim, idx) => (
                    <li key={idx}>• {claim}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            What Benchmark/Governance Data Is Useful For
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Collected benchmark and governance traces are not just telemetry—they're decision input.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {benchmarkValue.map((item) => (
              <Card key={item.title} className="border-border bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium text-primary">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
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

      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            View How AI Work Becomes Traceable Delivery Evidence
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground">
            Explore the architecture, review benchmark traces, and see how governance gates work.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/architecture">View Architecture</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/workstreams">View Workstreams</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
