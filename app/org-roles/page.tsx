import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const rolePolicies = [
  {
    role: "GPT / Sararin",
    responsibility:
      "Executive review, taste, risk appetite, and final approval for public, money, legal, privacy, reputation, health, career, and major architecture decisions.",
    owns: "Final gate and protected decisions",
    doesNotOwn: "Routine execution or broad staffing before evidence exists",
    budget: "Sararin-gated",
    escalation: "Stop and ask when the decision is high-risk or hard to reverse.",
  },
  {
    role: "Hermes",
    responsibility:
      "Stage manager, dispatcher, trace recorder, KB maintainer, and task packet owner.",
    owns: "Routing discipline, validation summaries, and KB sync",
    doesNotOwn: "UI/code implementation or autonomous final approval",
    budget: "Cheap/local first",
    escalation: "Route to Codex, Big Crew, Researcher, Supernova, or Sararin when scope requires it.",
  },
  {
    role: "Codex",
    responsibility:
      "Repo, UI, and code implementation executor for bounded task packets.",
    owns: "Files changed, build/regression evidence, commit-ready patches, and caveats",
    doesNotOwn: "Product strategy, private raw KB exposure, or production-readiness claims",
    budget: "Implementation lane",
    escalation: "Return evidence and stop when the task exceeds the packet or exposes risk.",
  },
  {
    role: "Big Crew",
    responsibility:
      "Scoped product, architecture, engineering, QA, review, and release-readiness work.",
    owns: "Role-specific critique, implementation support, QA findings, and release recommendations",
    doesNotOwn: "Autonomous staffing, final release approval, or Sararin-protected decisions",
    budget: "Senior synthesis only",
    escalation: "Use senior model review only for named decisions with clear expected value.",
  },
  {
    role: "Researcher",
    responsibility:
      "Bounded external evidence scans for market context, public claims, and practice checks.",
    owns: "Cited evidence, safe-claim boundaries, and research briefs",
    doesNotOwn: "Final decisions, market certainty, or unsupported uniqueness claims",
    budget: "Cheap/web first",
    escalation: "Escalate only when synthesis changes a public claim or decision gate.",
  },
  {
    role: "Supernova",
    responsibility:
      "Opportunity and monetization intelligence through advisor-style memos and trigger-based analysis.",
    owns: "Business option framing, kill arguments, and monetization questions",
    doesNotOwn: "Active execution before a concrete trigger exists",
    budget: "Trigger-based",
    escalation: "Activate only when the business question is bounded and reviewable.",
  },
  {
    role: "Investment Team",
    responsibility:
      "Planned investment advisory lane after Sararin defines scope, criteria, and evidence requirements.",
    owns: "TBD investment workflow once scoped",
    doesNotOwn: "Live investment action, recommendations, or decisions today",
    budget: "Not active",
    escalation: "Remain parked until scope and review policy exist.",
  },
  {
    role: "optimize-worker",
    responsibility:
      "Routing and workflow execution support for benchmark traces, fallback paths, and thin-slice automation.",
    owns: "Structured runs, trace shape, and repeatable validation support",
    doesNotOwn: "Final interpretation, provider expansion, or autonomous production routing",
    budget: "Cheap/local first",
    escalation: "Escalate when automation would create false confidence without trace quality.",
  },
]

const taskPolicies = [
  {
    task: "Repo or UI patch",
    route: "Codex",
    rule: "Use a bounded task packet, then return files changed, validation, commit hash, and caveats.",
  },
  {
    task: "Architecture or release critique",
    route: "Big Crew",
    rule: "Use role-specific review for a named decision, then Sararin gates the final call.",
  },
  {
    task: "External evidence scan",
    route: "Researcher",
    rule: "Gather cited evidence and safe-claim boundaries; do not make the final claim.",
  },
  {
    task: "Opportunity analysis",
    route: "Supernova",
    rule: "Activate only when there is a concrete business trigger and a reviewable output.",
  },
  {
    task: "Trace, handoff, or validation summary",
    route: "Hermes",
    rule: "Keep the work structured, public-safe where needed, and synced back to the KB.",
  },
  {
    task: "Money, legal, privacy, reputation, health, career, or major architecture",
    route: "GPT / Sararin",
    rule: "Stop for executive review; no delegated role owns the final decision.",
  },
]

const budgetTiers = [
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
      "Reserved for rare foundation decisions and Sararin-protected categories; requires an explicit gate.",
  },
  {
    tier: "Tier 4",
    name: "Implementation lane",
    description:
      "Codex is used for repo and UI implementation by role fit, with files, validation, commit, and caveats returned.",
  },
]

export default function OrgRolesPage() {
  return (
    <PageLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Link
            href="/ai-operating-system#case-study-map"
            className="mb-5 inline-flex text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            ← Back to AIOS Case Study Map
          </Link>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Org Chart & Role Policy
          </h1>
          <p className="mt-4 max-w-3xl text-pretty text-lg text-muted-foreground">
            Public-safe operating map for who owns coordination, execution,
            evidence, review, and budget discipline inside the AIOS work system.
          </p>
          <p className="mt-4 max-w-3xl text-sm italic text-muted-foreground">
            This is an operating model summary, not runtime access control,
            autonomous staffing, or production-readiness evidence.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Operating Org Chart
            </h2>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              KB-sourced summary
            </Badge>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 sm:p-6">
            <div className="mx-auto max-w-5xl">
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

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["Codex", "Repo and UI implementation"],
                  ["Big Crew", "Product, architecture, QA, review"],
                  ["Researcher", "Evidence scans and claim safety"],
                  ["Supernova", "Opportunity and monetization analysis"],
                  ["Investment Team", "Planned specialist lane"],
                  ["optimize-worker", "Routing and trace automation"],
                  ["Fallback routing", "Alternate path policy"],
                  ["Future crews", "Only after scope is proven"],
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
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Role & Responsibility Policy
          </h2>
          <div className="mt-8 overflow-x-auto rounded-lg border border-border bg-card">
            <table className="min-w-[1180px] divide-y divide-border">
              <thead className="bg-background">
                <tr>
                  {[
                    "Role / team",
                    "Responsibility",
                    "Owns",
                    "Does not own",
                    "Budget policy",
                    "Escalation rule",
                  ].map((heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="px-4 py-3 text-left text-sm font-medium text-foreground"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rolePolicies.map((policy) => (
                  <tr key={policy.role} className="align-top">
                    <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-foreground">
                      {policy.role}
                    </td>
                    <td className="max-w-72 px-4 py-4 text-sm text-muted-foreground">
                      {policy.responsibility}
                    </td>
                    <td className="max-w-56 px-4 py-4 text-sm text-muted-foreground">
                      {policy.owns}
                    </td>
                    <td className="max-w-56 px-4 py-4 text-sm text-muted-foreground">
                      {policy.doesNotOwn}
                    </td>
                    <td className="max-w-44 px-4 py-4 text-sm text-muted-foreground">
                      {policy.budget}
                    </td>
                    <td className="max-w-64 px-4 py-4 text-sm text-muted-foreground">
                      {policy.escalation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Budget Policy
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
            Role first, model second. Budget is allocated like workforce salary:
            use the cheapest reliable route for routine work and reserve senior
            review for named decisions with a clear expected value.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {budgetTiers.map((tier) => (
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

      <section className="border-t border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Task Routing Policy
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {taskPolicies.map((policy) => (
              <Card key={policy.task} className="border-border bg-card">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-base font-medium text-foreground">
                      {policy.task}
                    </CardTitle>
                    <Badge variant="secondary" className="shrink-0">
                      {policy.route}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {policy.rule}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
