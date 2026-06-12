import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const summaryCards = [
  {
    title: "Built foundations",
    detail:
      "Routing-fit, receipt, Agent-to-Task, QA, downgrade, Codex authority, and human-gate controls define how public AIOS claims should be checked.",
    status: "Foundation ready",
  },
  {
    title: "Checker layer",
    detail:
      "Scoped checker work can catch missing receipts, missing role evidence, and unsupported role or model claims before they become public proof.",
    status: "Scoped enforcement",
  },
  {
    title: "Blocked claims",
    detail:
      "Live telemetry, production monitoring, provider comparison, cost improvement, and full automation claims remain blocked on this page.",
    status: "Boundary visible",
  },
]

const enforcementMatrix = [
  {
    layer: "Policy foundation",
    exists: "Routing-fit, receipt, QA, downgrade, Codex authority, and human-gate controls.",
    proves: "AIOS has explicit rules for separating claimable evidence from draft or local work.",
    blocks: "Unsupported orchestration, reviewer, approval, model, cost, or production-readiness claims.",
    gap: "Public-safe rule-to-artifact links are still incomplete.",
  },
  {
    layer: "Registry foundation",
    exists: "Role, model, task, worker, receipt, and gate fields are identified as required public map dimensions.",
    proves: "Expected role and observed worker can be separated instead of collapsed into one AIOS label.",
    blocks: "Vague ownership claims where the actual worker, route, or evidence status is unclear.",
    gap: "Needs a completed public-safe registry view with no private paths or raw packets.",
  },
  {
    layer: "Runtime ledger",
    exists: "Historical records and newer enforcement records are classified by source, date, and evidence strength.",
    proves: "Evidence discipline exists around what was captured, excluded, downgraded, or left pending.",
    blocks: "Benchmark, provider, speed, cost, and live-monitoring claims from incomplete records.",
    gap: "Records are not yet joined across task, route, model, validation, receipt, and outcome.",
  },
  {
    layer: "Checker layer",
    exists: "Routing evidence checker, negative fixtures, receipt rules, and canonical enforcement references.",
    proves: "Scoped flows can detect missing receipts, missing role evidence, and cross-artifact inconsistency.",
    blocks: "Treating checker evidence as universal runtime automation or owner approval.",
    gap: "Checker coverage is scoped; whole-system automated enforcement is not claimed.",
  },
  {
    layer: "Public cockpit",
    exists: "A curated public-safe cockpit page with claim boundaries, blocked states, and next actions.",
    proves: "Readers can inspect decision value without raw records, credentials, private paths, or task payloads.",
    blocks: "Raw evidence exposure and public wording that overstates what the system proves.",
    gap: "Needs more detail links to public-safe source pages where they already exist.",
  },
  {
    layer: "Cross-tool enforcement",
    exists: "Partial mapping across local work, checker records, reviewer receipts, and human gates.",
    proves: "Cross-tool claims can be downgraded unless route, worker, receipt, and owner-gate evidence are joined.",
    blocks: "Unreceipted reviewer claims and model output being treated as human release authority.",
    gap: "Shared IDs, receipt provenance, and decision metadata are not yet complete across tools.",
  },
]

const evidenceMap = [
  {
    task: "Claim-boundary controls",
    route: "Routing-fit, receipt, QA, downgrade, and human-gate controls",
    evidence: "Public-safe rule summary",
    value: "Shows which claims are allowed, receipt-required, downgraded, or blocked.",
    status: "Decision-ready",
    detail: "/architecture/system-health",
  },
  {
    task: "Unsupported role/model claim detection",
    route: "Scoped checker layer",
    evidence: "Checker rules and negative fixtures summarized without raw receipts",
    value: "Prevents role labels or model names from being treated as proof without route evidence.",
    status: "Scoped",
    detail: "/architecture/system-health/agent-orchestration",
  },
  {
    task: "Evidence readiness baseline",
    route: "Manual release snapshot",
    evidence: "June 1-3 readiness baseline and historical backfill limits",
    value: "Explains why comparison and performance claims remain blocked.",
    status: "Archived",
    detail: "/architecture/system-health/evidence-readiness",
  },
  {
    task: "Human decision gate",
    route: "Owner review boundary",
    evidence: "Approval, waiver, reject, or park status only when explicitly recorded",
    value: "Keeps release, money, privacy, and public claims outside model authority.",
    status: "Boundary",
    detail: "/architecture/system-health/runtime-authority-evidence",
  },
]

const actionChecklist = [
  {
    group: "Trust",
    action: "Add public rows that connect each claim to available evidence, missing receipt state, downgrade rule, and blocked wording.",
  },
  {
    group: "Readability",
    action: "Keep role, model, task, worker, receipt, and owner-gate status visible as separate columns.",
  },
  {
    group: "Claim safety",
    action: "Keep live telemetry, production monitoring, provider comparison, and full automation claims blocked until separate gates pass.",
  },
  {
    group: "Evidence linkage",
    action: "Add detail links only to existing public-safe pages; do not expose raw packets, private paths, credentials, or task payloads.",
  },
]

const boundaries = [
  {
    name: "Observability",
    detail:
      "Supports claim-boundary review and evidence readiness; it is not a live telemetry or production monitoring system.",
  },
  {
    name: "Checker evidence",
    detail:
      "Can block or downgrade unsupported claims inside scoped flows; it does not approve execution or release work.",
  },
  {
    name: "Source of truth",
    detail:
      "Git and durable knowledge records remain the source of truth; this route is a curated public explanation.",
  },
  {
    name: "Public surface",
    detail:
      "Shows summaries and safe links only. Raw receipts, private records, credentials, and task payloads stay excluded.",
  },
]

const historicalArchive = [
  "June 1-3 baseline: Evidence Readiness became a manual JSONL readout and historical backfill was excluded from comparison.",
  "Inventory counts: historical trace records and retained proof-of-capture receipts remain archive evidence, not live metrics.",
  "Historical measurement limits: May 2026 inventories overlap, use non-normalized tasks, lack actual billed cost, and do not reliably join task, route, model, validation, and outcome.",
  "Future comparison: provider or workflow comparison requires new v0.7 receipts with join keys, routing metadata, usage provenance, pricing source, validation evidence, and decision metadata.",
]

const blockedClaims = [
  "Live telemetry dashboard",
  "Automated release approval",
  "Production monitoring",
  "Provider superiority",
  "Cost or performance improvement",
  "Complete cross-tool enforcement",
]

export default function ObservabilityPage() {
  return (
    <PageLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">Public-safe</Badge>
            <Badge variant="outline">Read-only</Badge>
            <Badge variant="outline">Claim-boundary review</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Runtime Enforcement Value Surface
          </h1>
          <p className="mt-3 max-w-4xl text-muted-foreground">
            This page shows how AIOS prevents unsupported automation, model, role, evidence,
            cost, and performance claims from reaching public proof. Its current value is
            claim-boundary review: what can be said publicly, what needs a receipt, and what
            remains blocked.
          </p>
          <Card className="mt-6 border-primary/20 bg-primary/5">
            <CardContent className="grid gap-4 p-5 text-sm leading-6 text-muted-foreground lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="font-semibold text-foreground">
                  Enforcement evidence is ready to guide public claim boundaries.
                </p>
                <p className="mt-2">
                  June 9-11 enforcement work gives reviewers a concrete decision input:
                  which claims can be shown publicly, which require receipts, and which
                  stay blocked until route, worker, receipt, and owner-gate evidence are joined.
                </p>
              </div>
              <div className="rounded-md border border-primary/15 bg-background/70 p-3">
                <p className="text-xs font-medium uppercase text-muted-foreground">
                  Boundary
                </p>
                <p className="mt-1">
                  This is not live telemetry, an automated release gate, a provider comparison,
                  or production monitoring.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-5xl space-y-8 px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {summaryCards.map((card) => (
              <Card key={card.title}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-base">{card.title}</CardTitle>
                    <Badge variant="outline" className="shrink-0 text-[10px]">
                      {card.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-muted-foreground">
                  {card.detail}
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Enforcement value chain
              </h2>
              <Badge variant="outline">Primary matrix</Badge>
            </div>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">
              The useful distinction is not whether a rule exists. The useful distinction is
              what the layer proves, what it can block, and where public evidence remains partial.
            </p>
            <div className="mt-4 overflow-x-auto rounded-lg border">
              <table className="min-w-[1020px] text-left text-xs">
                <thead className="bg-muted/60 text-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium">Layer</th>
                    <th className="px-4 py-3 font-medium">What exists</th>
                    <th className="px-4 py-3 font-medium">What it proves</th>
                    <th className="px-4 py-3 font-medium">What it blocks</th>
                    <th className="px-4 py-3 font-medium">Remaining gap</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {enforcementMatrix.map((row) => (
                    <tr key={row.layer} className="align-top">
                      <td className="px-4 py-3 font-medium text-foreground">{row.layer}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.exists}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.proves}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.blocks}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.gap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Public-safe evidence map</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {evidenceMap.map((item) => (
                  <div
                    key={item.task}
                    className="grid gap-2 border-b border-border pb-4 text-sm last:border-0 last:pb-0 md:grid-cols-[0.8fr_1.2fr]"
                  >
                    <div>
                      <p className="font-medium text-foreground">{item.task}</p>
                      <Badge variant="outline" className="mt-2 text-[10px]">
                        {item.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 leading-6 text-muted-foreground">
                      <p>{item.route}</p>
                      <p>
                        <span className="font-medium text-foreground">Evidence:</span>{" "}
                        {item.evidence}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">Value:</span>{" "}
                        {item.value}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">Detail:</span>{" "}
                        <a className="text-primary underline-offset-4 hover:underline" href={item.detail}>
                          {item.detail}
                        </a>
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-teal-600/30 bg-teal-50/50 dark:bg-teal-950/10">
              <CardHeader>
                <CardTitle className="text-base">Next capture checklist</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
                {actionChecklist.map((item) => (
                  <div key={item.group} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal-600" />
                    <p>
                      <span className="font-medium text-foreground">{item.group}:</span>{" "}
                      {item.action}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Public boundary summary</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm leading-6 text-muted-foreground sm:grid-cols-2">
                {boundaries.map((boundary) => (
                  <div key={boundary.name}>
                    <p className="font-medium text-foreground">{boundary.name}</p>
                    <p>{boundary.detail}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Blocked public claims</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                {blockedClaims.map((claim) => (
                  <div key={claim} className="rounded-md border border-border bg-muted/30 px-3 py-2">
                    {claim}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <details className="rounded-lg border border-border bg-muted/20 p-4">
            <summary className="cursor-pointer text-base font-semibold text-foreground">
              Historical archive and measurement limits
            </summary>
            <div className="mt-4 grid gap-3 text-sm leading-6 text-muted-foreground">
              {historicalArchive.map((item) => (
                <p key={item}>{item}</p>
              ))}
              <p className="text-xs leading-5">
                Historical material is retained for provenance and blocker explanation only.
                It is not current system health, live telemetry, benchmark proof, provider
                comparison, or evidence of cost or performance improvement.
              </p>
            </div>
          </details>
        </div>
      </section>
    </PageLayout>
  )
}
