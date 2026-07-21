import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const workstreams = [
  {
    name: "optimize-worker",
    description:
      "Execution support layer with bounded durable checkpoint and recovery evidence for structured workflows.",
    status: "Mechanical continuity evidenced",
    owner: "Sararin + Codex",
    nextAction: "Keep human operational value and continuous production operation unresolved until separately evidenced.",
    gateDecision: "Proceed only when scope is narrow and validation is explicit.",
    blockerRisk: "Automation can create false confidence if trace quality is unclear.",
    proofLevel: "Bounded mechanical proof",
    evidence: "Tested interruption checkpoint and recovery criteria",
    badgeClass: "bg-emerald-500/10 text-emerald-700",
  },
  {
    name: "Fallback routing",
    description:
      "Policy lane for choosing a safe alternate route when the primary worker or model is blocked.",
    status: "AIOS Enforcement v0.2 canonical and AVAILABLE",
    owner: "Sararin",
    nextAction: "Use additive v0.2.1 checker tooling under v0.2; keep v0.3 candidate/inactive.",
    gateDecision: "Use fallback route when primary surface is blocked or uneconomical.",
    blockerRisk: "Cost and token evidence remain incomplete in some surfaces.",
    proofLevel: "Smoke-proven",
    evidence: "Fallback routing policy + smoke test",
    badgeClass: "bg-teal-500/10 text-teal-700",
  },
  {
    name: "Profile positioning",
    description:
      "Public portfolio framing that turns operating evidence into clear, safe claims.",
    status: "Active",
    owner: "Sararin + Codex",
    nextAction: "Keep homepage focused on differentiation; avoid operations-dashboard drift.",
    gateDecision: "Public copy must remain portfolio-safe and evidence-backed.",
    blockerRisk: "Overclaiming maturity or exposing raw private context would weaken trust.",
    proofLevel: "Regression-gated",
    evidence: "v3.0 IA regression checks",
    badgeClass: "bg-primary/10 text-primary",
  },
  {
    name: "Supernova",
    description:
      "Opportunity and monetization intelligence lane with a bounded Stakeholder Core candidate on canonical main.",
    status: "First version complete; Stakeholder Core is a bounded canonical candidate.",
    owner: "Sararin",
    nextAction:
      "Keep POC validation and R01 start unauthorized and unproven until their gates pass.",
    gateDecision:
      "Do not claim POC or operating usefulness until a concrete run is reviewed.",
    blockerRisk:
      "Candidate personas can be mistaken for active operational roles or validated business evidence.",
    proofLevel: "Documented",
    evidence: "First version exists; POC not yet run",
    badgeClass: "bg-orange-500/10 text-orange-700",
  },
  {
    name: "Data Team",
    description:
      "Evidence structure, aggregation logic, interpretation, and dashboard-readiness review lane.",
    status: "Evidence lens active",
    owner: "Sararin + Data Team",
    nextAction:
      "Keep evidence structure, aggregation logic, interpretation, and dashboard-readiness review explicit before stronger dashboard claims.",
    gateDecision:
      "Supports evidence quality and interpretation; does not act as final claim authority.",
    blockerRisk:
      "Dashboard metrics can be mistaken for behavior proof if aggregation gaps and evidence limits are hidden.",
    proofLevel: "Documented",
    evidence: "Runtime authority and monitoring evidence pages",
    badgeClass: "bg-sky-500/10 text-sky-700",
  },
  {
    name: "Big Crew",
    description:
      "Bounded specialist delivery workspace with explicit handoff and separate receipts.",
    status: "Started",
    owner: "Sararin + Codex",
    nextAction: "Keep Big Crew usage bounded to implementation and verification tasks with explicit handoff.",
    gateDecision: "Use for scoped execution only; do not expand into autonomous staffing.",
    blockerRisk: "Parallel work can blur ownership if files, roles, and review gates are not explicit.",
    proofLevel: "Started / bounded",
    evidence: "Patch 1 and Patch 2 implementation handoffs",
    badgeClass: "bg-primary/10 text-primary",
  },
  {
    name: "Researcher",
    description:
      "Bounded evidence scanner for market context, claim safety, and external practice checks.",
    status: "Started",
    owner: "Sararin + Researcher",
    nextAction: "Use for bounded positioning and claim-safety briefs before public copy changes.",
    gateDecision: "Research output informs copy; GPT/Sararin still gate claims before implementation.",
    blockerRisk: "Broad research can drift into market sizing or unsupported uniqueness claims.",
    proofLevel: "Documented",
    evidence: "Homepage differentiation brief",
    badgeClass: "bg-primary/10 text-primary",
  },
  {
    name: "Investment Team",
    description:
      "Planned specialist lane for investment workflows after scope and review criteria are defined.",
    status: "Planned",
    owner: "Sararin",
    nextAction: "Defer until Supernova completes POC validation or another bounded investment trigger is approved.",
    gateDecision: "No active build until there is a bounded investment workflow.",
    blockerRisk: "Domain risk is high without review criteria and evidence capture.",
    proofLevel: "Planned",
    evidence: "Planning notes only",
    badgeClass: "bg-muted-foreground/20 text-muted-foreground",
  },
]

export default function WorkstreamsPage() {
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
            Workstreams
          </h1>
          <p className="mt-4 max-w-3xl text-pretty text-lg text-muted-foreground">
            Actionable operating status for the AIOS work system: owner, next
            action, gate decision, risk, and proof level.
          </p>
          <p className="mt-4 max-w-3xl text-sm italic text-muted-foreground">
            This page is manually curated and public-safe. It is not live
            telemetry or a production control plane.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="min-w-[1080px] divide-y divide-border">
              <thead className="bg-muted/50">
                <tr>
                  {[
                    "Workstream",
                    "Status",
                    "Owner / role",
                    "Next action",
                    "Gate decision",
                    "Blocker / risk",
                    "Proof / evidence",
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
                {workstreams.map((workstream) => (
                  <tr key={workstream.name} className="align-top">
                    <td className="max-w-64 px-4 py-4 text-sm">
                      <p className="font-medium text-foreground">
                        {workstream.name}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {workstream.description}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <Badge
                        variant="secondary"
                        className={workstream.badgeClass}
                      >
                        {workstream.status}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-muted-foreground">
                      {workstream.owner}
                    </td>
                    <td className="max-w-60 px-4 py-4 text-sm text-muted-foreground">
                      {workstream.nextAction}
                    </td>
                    <td className="max-w-56 px-4 py-4 text-sm text-muted-foreground">
                      {workstream.gateDecision}
                    </td>
                    <td className="max-w-56 px-4 py-4 text-sm text-muted-foreground">
                      {workstream.blockerRisk}
                    </td>
                    <td className="max-w-52 px-4 py-4 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {workstream.proofLevel}
                      </span>
                      <span className="block pt-1">{workstream.evidence}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Reading Rules
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {readingRules.map((rule) => (
              <Card key={rule.title} className="border-border bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium text-primary">
                    {rule.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {rule.description}
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

const readingRules = [
  {
    title: "Status is not completion",
    description:
      "A workstream can be active while still requiring a gate decision before its output counts.",
  },
  {
    title: "Proof level matters",
    description:
      "Documented, smoke-proven, and regression-gated mean different things; the page labels them separately.",
  },
  {
    title: "No private raw context",
    description:
      "The table shows public-safe operating status, not raw KB material, keys, logs, or private traces.",
  },
]
