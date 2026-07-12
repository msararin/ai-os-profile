import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import {
  bigCrewArchitectureGateDetail,
  CapabilityRoleCard,
  dataTeamDetail,
  repoCustodianCardDetail,
  qaSentinelDetail,
  runnerDetail,
} from "./role-detail-content"

const executionControlRoles = [
  {
    name: "Super Runner",
    label: "Execution Control Layer",
    primaryResponsibility:
      "Controls task boundary, dependency, authority, caveats, and stop conditions before work proceeds.",
    evidenceContribution:
      "Shows whether dependency, authority, stop condition, unsafe scope, and caveat fields were declared.",
    notAllowed:
      "Does not act as an autonomous platform, approve execution, claim production readiness, or make cost/replacement decisions.",
    bigCrewRelationship:
      "Governs the task boundary around Big Crew work; it is not a delivery specialist role.",
  },
  {
    name: "Runner",
    label: "Bounded Task Executor",
    primaryResponsibility:
      "Executes approved bounded tasks without inventing new scope.",
    evidenceContribution:
      "Shows files touched, scope adherence, validation-ready output, and handoff artifact status.",
    notAllowed:
      "Does not add unapproved scope, self-approve output, or convert task completion into performance proof.",
    bigCrewRelationship:
      "Executes bounded work after scope is controlled; it is not the same as Big Crew implementation perspective.",
  },
  {
    name: "Checker",
    label: "Evidence & Claim Boundary Checker",
    primaryResponsibility:
      "Validates evidence completeness, source-of-truth alignment, and claim boundaries.",
    evidenceContribution:
      "Shows evidence gaps, claim drift, source-of-truth mismatches, validation status, and first-pass acceptance.",
    notAllowed:
      "Does not replace Big Crew QA, approve production readiness, or claim benchmark, cost, speed, or public-proof outcomes.",
    bigCrewRelationship:
      "Checks whether claims are evidence-safe; Big Crew QA checks delivery quality and failure modes.",
  },
] as const

const rolePolicies = [
  {
    role: "Lyn — Owner / Decision Authority",
    responsibility:
      "Owner review, risk appetite, and final approval for public, money, legal, privacy, reputation, health, career, and major architecture decisions.",
    owns: "Final gate and protected decisions",
    doesNotOwn: "Routine execution or broad staffing before evidence exists",
    budget: "Sararin-gated",
    escalation: "Stop and ask when the decision is high-risk or hard to reverse.",
  },
  {
    role: "Robert / GPT — Executive Orchestration Layer",
    responsibility:
      "Executive orchestration, synthesis, sequencing, decision framing, and source-of-truth alignment.",
    owns: "Tradeoff framing, narrative coherence, and claim-boundary review",
    doesNotOwn: "Owner authorization, autonomous execution approval, or production-readiness claims",
    budget: "Executive review lane",
    escalation: "Escalate to Lyn when the decision touches protected categories or publication authority.",
  },
  {
    role: "Super Runner (Execution Control Layer)",
    responsibility:
      "Controls task boundary, dependency, authority, caveats, and stop conditions before work proceeds.",
    owns: "Scope, authorization check, dependency visibility, and stop-condition preservation",
    doesNotOwn: "Autonomous platform authority, production readiness, cost decisions, or replacement decisions",
    budget: "Control lane",
    escalation: "Stop when owner authorization, unsafe scope, missing dependency, or claim boundary is unresolved.",
  },
  {
    role: "Runner (Bounded Task Executor)",
    responsibility:
      "Executes approved bounded tasks without inventing new scope.",
    owns: "Scoped output, files changed, validation-ready handoff, and implementation caveats",
    doesNotOwn: "Scope creation, self-approval, benchmark proof, or performance claims",
    budget: "Bounded execution lane",
    escalation: "Return to Super Runner when scope changes or required authorization is missing.",
  },
  {
    role: "Checker (Evidence & Claim Boundary Checker)",
    responsibility:
      "Validates evidence completeness, source-of-truth alignment, and claim boundaries.",
    owns: "Evidence gaps, source-of-truth mismatches, claim drift, and validation status",
    doesNotOwn: "Big Crew QA replacement, public proof approval, production readiness, or cost superiority claims",
    budget: "Evidence safety lane",
    escalation: "Block or downgrade when evidence is missing, claims drift, or source-of-truth alignment fails.",
  },
  {
    role: "Big Crew (Specialist Delivery Team)",
    responsibility:
      "Specialist delivery work across PM / Delivery, Architecture, QA, Release, Workflow, and Implementation.",
    owns: "Role-specific critique, implementation support, QA findings, and release recommendations",
    doesNotOwn: "Execution-control authority, final release approval, or Lyn-protected decisions",
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
            Public-safe operating map for who owns executive orchestration,
            execution control, specialist delivery, evidence review, and budget
            discipline inside the AIOS work system.
          </p>
          <p className="mt-4 max-w-3xl text-sm italic text-muted-foreground">
            This is an operating model summary, not runtime access control,
            autonomous staffing, or production-readiness evidence.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Capability Detail Pages
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
            These compact cards open deeper role capability pages. Long learning,
            evidence, and upskill narratives stay off the hub so the role map
            remains scannable.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <CapabilityRoleCard detail={bigCrewArchitectureGateDetail} />
            <CapabilityRoleCard detail={qaSentinelDetail} />
            <CapabilityRoleCard detail={dataTeamDetail} />
            <CapabilityRoleCard detail={runnerDetail} />
            <CapabilityRoleCard detail={repoCustodianCardDetail} />
          </div>
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
            <div className="mx-auto max-w-5xl space-y-4">
              <div className="flex justify-center">
                <div className="w-full max-w-sm rounded border border-primary/30 bg-primary/10 p-4 text-center">
                  <p className="text-sm font-semibold text-primary">
                    Lyn
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Owner / Decision Authority
                  </p>
                </div>
              </div>

              <div className="rounded border border-border bg-background p-4 text-center">
                  <p className="text-sm font-semibold text-foreground">
                    Robert / GPT
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Executive Orchestration Layer
                  </p>
              </div>

              <div className="rounded border border-primary/30 bg-primary/5 p-4">
                <p className="text-center text-sm font-semibold text-primary">
                  Execution Control & Evidence Governance
                </p>
                <p className="mt-1 text-center text-xs text-muted-foreground">
                  Scope, authorization, validation, stop conditions, and claim boundaries
                </p>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {executionControlRoles.map((role) => (
                    <div key={role.name} className="rounded border border-border bg-background p-3 text-center">
                      <p className="text-sm font-semibold text-foreground">{role.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{role.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded border border-border bg-background p-4 text-center">
                  <p className="text-sm font-semibold text-foreground">
                    Big Crew
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Specialist Delivery Team
                  </p>
                </div>

                <div className="rounded border border-dashed border-border bg-muted/30 p-4 text-center">
                  <p className="text-sm font-semibold text-foreground">
                    GPT KB + Git
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Shared source of truth for decisions, evidence, and handoffs
                  </p>
                </div>
              </div>

              <aside
                aria-labelledby="repo-custodian-cross-cutting-heading"
                className="rounded-lg border border-dashed border-primary/40 bg-primary/5 p-4 sm:p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-primary">
                      Cross-cutting capability · On demand / event-triggered
                    </p>
                    <h3
                      id="repo-custodian-cross-cutting-heading"
                      className="mt-1 text-base font-semibold text-foreground"
                    >
                      Shared Operational Integrity &amp; Custody
                    </h3>
                    <p className="mt-1 max-w-3xl text-xs leading-relaxed text-muted-foreground">
                      A comprehension grouping, not an org unit. Repo Custodian
                      protects repository integrity, provenance, clean worktrees,
                      exact-SHA handoffs, and recovery readiness across delivery lanes.
                    </p>
                  </div>
                  <Link
                    href="/org-roles/repo-custodian"
                    className="inline-flex shrink-0 text-xs font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    View Repo Custodian detail
                  </Link>
                </div>

                <div className="mt-4 rounded border border-dashed border-border bg-background/70 p-3">
                  <p className="text-xs font-semibold text-foreground">
                    Non-hierarchical service handoffs
                  </p>
                  <p className="mt-2 text-xs italic text-muted-foreground">
                    Coordination patterns (not reporting lines):
                  </p>
                  <ul className="mt-2 space-y-2 border-l-2 border-dashed border-border pl-4 text-xs leading-relaxed text-muted-foreground">
                    <li>
                      <span className="font-medium text-foreground">Big Crew:</span>{" "}
                      clean source, worktree, and exact-SHA readiness.
                    </li>
                    <li>
                      <span className="font-medium text-foreground">Execution Control:</span>{" "}
                      repository risk, exclusions, and rollback readiness.
                    </li>
                    <li>
                      <span className="font-medium text-foreground">GPT KB + Git:</span>{" "}
                      repository integrity and provenance, not content authority.
                    </li>
                    <li>
                      <span className="font-medium text-foreground">Path to Production:</span>{" "}
                      clean-source and provenance handoff, not build, deployment, or production proof.
                    </li>
                  </ul>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  This grouping is not a department, staffed team, reporting line,
                  governance tier, or permanent delivery lane. Repo Custodian has a
                  repository-custody boundary only; it is not delivery or deployment authority.
                </p>
                <p className="mt-2 break-words font-mono text-[11px] leading-relaxed text-muted-foreground">
                  REPO_CUSTODIAN_EVIDENCE_IS_NOT_PRODUCTION_PROOF ·{" "}
                  SOURCE_CUSTODY_IS_NOT_DEPLOYMENT_VERIFICATION ·{" "}
                  REFERENCE_ONLY_NOT_CROSS_LANE_PROOF
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                  Placement follows the owner-confirmed operating decision for this chart;
                  the historical KB placement label is retained as a disclosed reconciliation
                  residual and is not used as the chart hierarchy.
                </p>
              </aside>

              <details className="rounded border border-border bg-background p-4">
                <summary className="cursor-pointer text-sm font-semibold text-foreground">
                  Show specialist lanes
                </summary>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["PM / Delivery", "Specialist delivery planning"],
                    ["Architecture", "System boundaries and dependencies"],
                    ["QA", "Delivery failure modes and test readiness"],
                    ["Release", "Release-readiness critique"],
                    ["Workflow / Implementation", "Scoped delivery support"],
                    ["Data Team", "Specialist Review Perspective"],
                    ["UX / UI / IA", "Specialist Review Perspective"],
                    ["Sonnet-style / Opus-style", "Local review unless receipted"],
                    ["Supernova", "Business / Opportunity Intelligence"],
                  ].map(([name, description]) => (
                    <div
                      key={name}
                      className="rounded border border-border bg-card p-3"
                    >
                      <p className="text-sm font-medium text-foreground">
                        {name}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {description}
                      </p>
                      {name === "Data Team" ? (
                        <Link
                          href="/org-roles/data-team"
                          className="mt-3 inline-flex text-xs font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                          View capability detail
                        </Link>
                      ) : null}
                    </div>
                  ))}
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Execution Control Role Cards
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
            These roles govern scope, authorization, validation, and claim safety.
            They are separate from Big Crew specialist delivery work.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {executionControlRoles.map((role) => (
              <Card key={role.name} className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-base">
                    {role.name} ({role.label})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Primary responsibility:</span>{" "}
                    {role.primaryResponsibility}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Evidence contribution:</span>{" "}
                    {role.evidenceContribution}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Not allowed:</span>{" "}
                    {role.notAllowed}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Relationship to Big Crew:</span>{" "}
                    {role.bigCrewRelationship}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Supporting Policies
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
            Detailed routing and budget policies are collapsed by default so the
            org-role hub stays focused on scan and navigation.
          </p>
          <div className="mt-6 space-y-3">
            <details className="rounded-lg border border-border bg-card p-4">
              <summary className="cursor-pointer text-sm font-semibold text-foreground">
                Role & Responsibility Policy
              </summary>
              <div className="mt-5 overflow-x-auto rounded-lg border border-border bg-background">
                <table className="min-w-[1180px] divide-y divide-border">
                  <thead className="bg-card">
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
            </details>

            <details className="rounded-lg border border-border bg-card p-4">
              <summary className="cursor-pointer text-sm font-semibold text-foreground">
                Budget Policy
              </summary>
              <p className="mt-4 max-w-3xl text-sm text-muted-foreground">
                Role first, model second. Budget is allocated like workforce
                salary: use the cheapest reliable route for routine work and
                reserve senior review for named decisions with a clear expected
                value.
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {budgetTiers.map((tier) => (
                  <Card key={tier.tier} className="border-border bg-background">
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
              <p className="mt-5 max-w-3xl text-sm font-medium text-foreground">
                No senior delegation without a named decision, expected value,
                cost cap, and abort condition.
              </p>
            </details>

            <details className="rounded-lg border border-border bg-card p-4">
              <summary className="cursor-pointer text-sm font-semibold text-foreground">
                Task Routing Policy
              </summary>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {taskPolicies.map((policy) => (
                  <Card key={policy.task} className="border-border bg-background">
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
            </details>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
