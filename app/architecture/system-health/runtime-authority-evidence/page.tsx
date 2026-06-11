import { PageLayout } from "@/components/page-layout"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const summaryMetrics = [
  { value: "104/104", label: "validation tests", tone: "strong" },
  { value: "74/74", label: "baseline tests", tone: "strong" },
  { value: "30/30", label: "smoke tests", tone: "strong" },
  { value: "8/8", label: "runtime control surfaces", tone: "strong" },
]

const maturityStages = [
  {
    stage: "Before runtime authority validation",
    date: "2026-06-09 to 2026-06-10",
    existed:
      "Governance rules, reviewer-enforcement lessons, and single-worker / false-orchestration risk diagnosis existed as prior AIOS context.",
    changed:
      "Runtime authority had not yet been summarized as a public-safe validation evidence surface.",
    evidence:
      "Earlier AIOS enforcement and orchestration-review records; exact task-level runtime dashboard evidence remains separate.",
    improvement:
      "AIOS had clearer claim-boundary discipline and recognized that role labels are not orchestration proof.",
    notProven:
      "No public-safe runtime authority validation page, no worker-level proof matrix, and no trend dashboard.",
  },
  {
    stage: "After registry / authority contract acceptance",
    date: "2026-06-11",
    existed:
      "Registry / authority contract context was accepted for the static public snapshot, and stale pending-owner wording could be removed.",
    changed:
      "The public page no longer needs to frame Window A owner acceptance as pending for this snapshot context.",
    evidence:
      "Owner instruction plus summarized validation evidence; no raw registry packet or private paths are published.",
    improvement:
      "The public copy can focus on evidence and gaps instead of preserving a stale blocker.",
    notProven:
      "This does not prove production readiness, live monitoring, universal enforcement, or full orchestration proof.",
  },
  {
    stage: "After runtime authority validation",
    date: "2026-06-11",
    existed:
      "Runtime authority validation passed with 104/104 total tests, including 74/74 baseline tests and 30/30 smoke tests.",
    changed:
      "Eight runtime control surfaces became validated in bounded scope and safe to summarize publicly.",
    evidence:
      "Source reports summarized: final handoff, test evidence summary, safe claims, forbidden claims, and remaining limits.",
    improvement:
      "Validation evidence now shows what was checked: registry consumption, dormant blocking, receipt semantics, human gates, local-only downgrade, staging boundary, hook delegation, and sanitizer behavior.",
    notProven:
      "Actual multi-worker orchestration trace, repeated dashboard snapshots, and live runtime state are still not shown.",
  },
  {
    stage: "Next required dashboard state",
    date: "date to be confirmed",
    existed:
      "A static insight page can show what evidence exists and what remains missing.",
    changed:
      "A future dashboard needs structured records for task routing, actual workers, receipts, reviewers, QA, owner gates, and repeat snapshots.",
    evidence:
      "To be created as public-safe structured data; raw receipts, private notes, local paths, and test logs must remain excluded.",
    improvement:
      "The dashboard can begin answering whether runtime authority and orchestration enforcement are improving AIOS behavior.",
    notProven:
      "Dashboard behavior insight remains incomplete until execution provenance and repeated evidence records are populated.",
  },
]

const runtimeValueMap = [
  {
    area: "Canonical registry consumption",
    why: "Runtime decisions need a source of truth for skill status.",
    before: "Registry state could be referenced manually or inconsistently.",
    after: "Registry Reader validation confirms registry parsing and status detection in bounded scope.",
    limitation: "Dashboard still needs structured registry status fields and repeated snapshots.",
  },
  {
    area: "Dormant skill blocking",
    why: "Parked or killed skills should not be treated as active.",
    before: "Dormant status could be missed or treated as documentation only.",
    after: "Smoke tests validate dormant skill blocking behavior.",
    limitation: "Does not prove production blocking or CASE-003 execution.",
  },
  {
    area: "Receipt semantics",
    why: "Missing receipts should not become proof.",
    before: "Receipt requirements could be described but not displayed as a dashboard evidence field.",
    after: "Receipt creation and blocking semantics are validated for bounded use.",
    limitation: "Future dashboard needs receipt status per task and public-safe receipt references.",
  },
  {
    area: "Human gate semantics",
    why: "High-risk actions need owner escalation instead of autonomous approval.",
    before: "Human gate rules existed as policy expectations.",
    after: "Validation confirms owner-gate escalation and autonomous authority blocking behavior.",
    limitation: "Does not prove future owner decisions or production gate operation.",
  },
  {
    area: "Local-only downgrade semantics",
    why: "Simulation or local-only work should not be mistaken for independent proof.",
    before: "Local execution could be overread as orchestration.",
    after: "Validation confirms local-only downgrade behavior.",
    limitation: "Dashboard still needs explicit single-worker and local-only classification per task.",
  },
  {
    area: "Staging-only worker boundary",
    why: "Worker evidence should not self-promote into canonical or production paths.",
    before: "Worker output could be confused with authority evidence if not bounded.",
    after: "optimize-worker integration validates staging-only writes.",
    limitation: "Does not prove production deployment or universal worker compliance.",
  },
  {
    area: "Thin hook consumer behavior",
    why: "Hooks should consume authority decisions rather than become hidden policy engines.",
    before: "Hook logic could drift from registry authority.",
    after: "Pre-commit and pre-push hooks validate delegation to Registry Reader.",
    limitation: "Dashboard needs hook mode and actual enforcement status per snapshot.",
  },
  {
    area: "Sanitizer behavior",
    why: "Public surfaces need redaction before publication.",
    before: "Raw paths, receipts, identifiers, or private details could leak if copied directly.",
    after: "Sanitizer behavior is validated for paths, identifiers, and sensitive detail removal.",
    limitation: "Public output still needs rendered-output scans and reviewer gate before publication.",
  },
]

const orchestrationRows = [
  {
    area: "Runtime validation evidence",
    expectedRole: "Runtime Authority lens",
    workerShown: "Validation results shown",
    reviewerShown: "Not task-level",
    receiptShown: "Summarized only",
    ownerGateShown: "Owner-cleared snapshot context",
    verdict: "validation evidence shown; orchestration not proven",
  },
  {
    area: "Public safety evidence",
    expectedRole: "QA / public-safety lens",
    workerShown: "Sanitized output shown",
    reviewerShown: "Summarized gate evidence only",
    receiptShown: "Raw receipts excluded",
    ownerGateShown: "Owner review target",
    verdict: "public safety evidence shown",
  },
  {
    area: "Actual multi-worker orchestration trace",
    expectedRole: "Orchestration Evidence lens",
    workerShown: "Not yet shown",
    reviewerShown: "Not task-level",
    receiptShown: "Not yet shown",
    ownerGateShown: "Not per task",
    verdict: "orchestration planned but not proven",
  },
  {
    area: "Single-worker detection",
    expectedRole: "Data Team / QA lens",
    workerShown: "Not yet instrumented",
    reviewerShown: "Not yet instrumented",
    receiptShown: "Not yet instrumented",
    ownerGateShown: "Not yet instrumented",
    verdict: "evidence gap",
  },
  {
    area: "Future dashboard provenance",
    expectedRole: "Data Team",
    workerShown: "Required field",
    reviewerShown: "Required field",
    receiptShown: "Required field",
    ownerGateShown: "Required field",
    verdict: "next instrumentation required",
  },
]

const detectionRules = [
  {
    label: "orchestrated_confirmed",
    detail:
      "Requires actual worker, routing decision, reviewer receipt when required, QA status, and owner gate status where applicable.",
  },
  {
    label: "single_worker_confirmed",
    detail:
      "Use when one worker handled implementation, review, QA, and closeout, or role labels exist without independent role evidence.",
  },
  {
    label: "orchestration_planned_but_not_proven",
    detail:
      "Use when expected roles or proposed workers exist but actual worker, reviewer, receipt, or QA evidence is incomplete.",
  },
  {
    label: "evidence_missing",
    detail:
      "Use when core proof fields are absent, evidence links are missing, or source reports cannot be tied to a task.",
  },
  {
    label: "local_only_downgraded",
    detail:
      "Use when local simulation or Codex-only validation is useful but cannot count as independent orchestration proof.",
  },
]

const evidenceQuality = [
  {
    dimension: "Validation test evidence",
    status: "Strong",
    detail: "104/104 validation tests, including 74/74 baseline and 30/30 smoke tests.",
  },
  {
    dimension: "Public-safety sanitization",
    status: "Strong",
    detail: "Local paths, raw receipts, private notes, session identifiers, secrets, and test logs are excluded.",
  },
  {
    dimension: "Runtime execution trace",
    status: "Weak / missing",
    detail: "The page does not yet show per-task actual worker trace or routing decision history.",
  },
  {
    dimension: "Model/provider receipt visibility",
    status: "Partial",
    detail: "Reviewer-gate receipt metadata exists for the redesign analysis, but raw receipts are not rendered publicly.",
  },
  {
    dimension: "Reviewer gate visibility",
    status: "Partial",
    detail: "Reviewer result is summarized at gate level; task-level reviewer proof is not displayed.",
  },
  {
    dimension: "Live monitoring",
    status: "Not present",
    detail: "This is a static insight dashboard with no live data feed.",
  },
]

const safeClaims = [
  "Runtime Authority validation passed in bounded scope with 104/104 validation tests.",
  "The static page summarizes validation evidence and evidence gaps.",
  "Public-safe output excludes raw receipts, private notes, local paths, session identifiers, secrets, and test logs.",
  "Runtime Authority validation improved evidence around registry consumption, dormant blocking, receipt semantics, human gates, local-only downgrade, staging boundaries, hook delegation, and sanitizer behavior.",
  "Full orchestration proof remains incomplete until execution provenance is displayed.",
]

const forbiddenClaims = [
  "No live monitoring claim.",
  "No production readiness claim.",
  "No universal enforcement claim.",
  "No CASE-003 execution claim.",
  "No Benchmark Dataset v0.1 export claim.",
  "No full orchestration proof claim without actual worker, routing decision, reviewer receipt, and owner gate evidence.",
]

export default function RuntimeAuthorityEvidenceDashboardPage() {
  return (
    <PageLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">Static insight dashboard</Badge>
            <Badge variant="outline">Bounded validation</Badge>
            <Badge variant="outline">Evidence gaps visible</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Runtime Authority & Orchestration Evidence Dashboard
          </h1>
          <p className="mt-3 max-w-4xl text-muted-foreground">
            Static insight surface for runtime authority validation, enforcement improvement, and
            orchestration evidence gaps.
          </p>
          <Alert className="mt-6 border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
            <AlertDescription className="text-sm leading-6">
              This page is a static insight dashboard, not live monitoring, production readiness,
              or universal enforcement. It summarizes validation evidence and evidence gaps; it
              does not claim full orchestration proof unless execution provenance is shown.
            </AlertDescription>
          </Alert>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {summaryMetrics.map((metric) => (
              <Card key={metric.label} className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <p className="text-2xl font-semibold text-foreground">{metric.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{metric.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-6xl space-y-6 px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle>What This Page Answers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
                <p>
                  It shows what was validated, what improved in runtime authority behavior, and
                  which evidence fields are still missing before orchestration can be treated as
                  proven.
                </p>
                <p>
                  The core validation metric is strong, but it is still a validation metric, not a
                  behavior metric. Behavior insight requires before/after deltas and execution
                  provenance.
                </p>
              </CardContent>
            </Card>

            <Card className="border-amber-300 bg-amber-50/60 dark:border-amber-900 dark:bg-amber-950/20">
              <CardHeader>
                <CardTitle>Not Proven Yet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm leading-6 text-muted-foreground">
                <p>Actual multi-worker orchestration trace is not yet shown.</p>
                <p>Single-worker detection is not yet instrumented per task.</p>
                <p>Reviewer, receipt, QA, and owner-gate evidence is not yet displayed per task.</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Maturity Progression: Before / After Runtime Authority Validation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {maturityStages.map((stage) => (
                <div key={stage.stage} className="rounded-lg border border-border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-semibold text-foreground">{stage.stage}</h3>
                    <Badge variant="secondary">{stage.date}</Badge>
                  </div>
                  <div className="mt-3 grid gap-3 text-sm leading-6 text-muted-foreground md:grid-cols-2">
                    <Fact label="What existed" value={stage.existed} />
                    <Fact label="What changed" value={stage.changed} />
                    <Fact label="Evidence available" value={stage.evidence} />
                    <Fact label="Improvement" value={stage.improvement} />
                    <Fact label="Still not proven" value={stage.notProven} wide />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Runtime Authority Value Map</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full min-w-[960px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 pr-4 font-medium text-foreground">Improvement area</th>
                    <th className="py-2 pr-4 font-medium text-foreground">Why it matters</th>
                    <th className="py-2 pr-4 font-medium text-foreground">Before state</th>
                    <th className="py-2 pr-4 font-medium text-foreground">After state</th>
                    <th className="py-2 font-medium text-foreground">Remaining limitation</th>
                  </tr>
                </thead>
                <tbody>
                  {runtimeValueMap.map((row) => (
                    <tr key={row.area} className="border-b align-top last:border-0">
                      <td className="py-3 pr-4 font-medium text-foreground">{row.area}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{row.why}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{row.before}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{row.after}</td>
                      <td className="py-3 text-muted-foreground">{row.limitation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Each item is an evidence dimension, not an asserted universal current behavior.
                The value map says what bounded validation demonstrated and what a dashboard
                should track next.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Orchestration Evidence Matrix</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-muted-foreground">
                Orchestration proof is not complete unless actual worker, routing decision,
                reviewer receipt, and owner gate are shown. This matrix keeps validation evidence
                separate from orchestration proof.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[940px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 pr-4 font-medium text-foreground">
                        Task / evidence area
                      </th>
                      <th className="py-2 pr-4 font-medium text-foreground">Expected role</th>
                      <th className="py-2 pr-4 font-medium text-foreground">
                        Actual worker shown?
                      </th>
                      <th className="py-2 pr-4 font-medium text-foreground">Reviewer shown?</th>
                      <th className="py-2 pr-4 font-medium text-foreground">Receipt shown?</th>
                      <th className="py-2 pr-4 font-medium text-foreground">Owner gate shown?</th>
                      <th className="py-2 font-medium text-foreground">
                        Orchestration verdict
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orchestrationRows.map((row) => (
                      <tr key={row.area} className="border-b align-top last:border-0">
                        <td className="py-3 pr-4 font-medium text-foreground">{row.area}</td>
                        <td className="py-3 pr-4 text-muted-foreground">{row.expectedRole}</td>
                        <td className="py-3 pr-4 text-muted-foreground">{row.workerShown}</td>
                        <td className="py-3 pr-4 text-muted-foreground">{row.reviewerShown}</td>
                        <td className="py-3 pr-4 text-muted-foreground">{row.receiptShown}</td>
                        <td className="py-3 pr-4 text-muted-foreground">{row.ownerGateShown}</td>
                        <td className="py-3 text-muted-foreground">{row.verdict}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Single-worker Detection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
                <p>
                  Classification precedence: evidence missing, local-only downgraded,
                  orchestration planned but not proven, single-worker confirmed, orchestrated
                  confirmed. Stronger claims require stronger evidence.
                </p>
                <ul className="space-y-3">
                  {detectionRules.map((rule) => (
                    <li key={rule.label} className="rounded-md border border-border p-3">
                      <p className="font-medium text-foreground">{rule.label}</p>
                      <p className="mt-1">{rule.detail}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Evidence Quality Scorecard</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {evidenceQuality.map((item) => (
                  <div key={item.dimension} className="rounded-md border border-border p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-medium text-foreground">{item.dimension}</p>
                      <Badge variant={item.status === "Strong" ? "default" : "secondary"}>
                        {item.status}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.detail}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Data Team Interpretation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
                <p>104/104 is a validation metric, not a behavior metric.</p>
                <p>
                  Useful dashboard insight requires before/after deltas, repeated snapshots,
                  task-level routing records, and execution provenance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>UX/UI Interpretation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
                <p>
                  Separate validation, behavior, orchestration, and claim-boundary layers so the
                  page can be scanned without overreading validation as proof of orchestration.
                </p>
                <p>Make “not proven yet” visible rather than hidden in footnotes or caveats.</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <ListCard title="Safe Claims" items={safeClaims} />
            <ListCard title="Forbidden Claims" items={forbiddenClaims} mutedDot />
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

function Fact({
  label,
  value,
  wide = false,
}: {
  label: string
  value: string
  wide?: boolean
}) {
  return (
    <div className={wide ? "md:col-span-2" : undefined}>
      <p className="font-medium text-foreground">{label}</p>
      <p className="mt-1">{value}</p>
    </div>
  )
}

function ListCard({
  title,
  items,
  mutedDot = false,
}: {
  title: string
  items: string[]
  mutedDot?: boolean
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
          {items.map((item) => (
            <li key={item} className="flex gap-2">
              <span
                className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                  mutedDot ? "bg-muted-foreground" : "bg-primary"
                }`}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
