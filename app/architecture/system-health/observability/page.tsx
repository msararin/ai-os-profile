import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const statusLabels = [
  {
    label: "Verified as of",
    detail: "Supported by a named source and date.",
  },
  {
    label: "Historical snapshot",
    detail: "Valid only for the stated past release or review point.",
  },
  {
    label: "Pending verification",
    detail: "Not ready to present as current evidence.",
  },
  {
    label: "Unavailable in deployed runtime",
    detail: "Not exposed or not connected on this public surface.",
  },
  {
    label: "Not live",
    detail: "Presented for review, not streamed from a monitoring system.",
  },
  {
    label: "Not automated",
    detail: "Does not replace human approval or release decisions.",
  },
]

const evidenceInventory = [
  {
    value: "43",
    label: "Reviewed benchmark trace records",
    detail: "Historical JSONL audit inventory across three reviewed trace files.",
    status: "Historical snapshot",
  },
  {
    value: "19",
    label: "Records marked invalid_missing_usage",
    detail: "Honest evidence gaps where required usage receipts were absent or unusable.",
    status: "Pending verification",
  },
  {
    value: "60 + 90",
    label: "Historical session inventory records",
    detail: "Two historical local session inventories. Not normalized task comparisons.",
    status: "Historical snapshot",
  },
  {
    value: "1",
    label: "Controlled proof-of-capture receipt",
    detail: "Single retained receipt proving a capture path, not route-wide cost or performance.",
    status: "Verified as of 2026-06-01",
  },
  {
    value: "3",
    label: "Evidence Readiness Readout",
    detail: "Historical Codex receipts reviewed, classified as semi_structured backfill, and excluded by design. No usage/cost data invented.",
    status: "Verified as of 2026-06-03",
  },
]

const currentVerdict = {
  label: "Enforcement proof exists privately; public trace is incomplete",
  code: "ENFORCEMENT_PROOF_EXISTS_PRIVATE_PUBLIC_TRACE_INCOMPLETE",
  meaning:
    "AIOS materially improved enforcement on June 9-11, 2026. This public page has not yet joined those private proofs into a complete, traceable execution map.",
  next:
    "Integrate the newer enforcement packets into a public-safe role, model, task, receipt, and value view.",
}

const enforcementProgress = [
  {
    layer: "Enforcement rules",
    status: "Improved",
    evidence: "Canonical routing-fit, receipt, Agent-to-Task, QA, and downgrade rules now exist.",
    publicState: "Needs summarized public trace.",
  },
  {
    layer: "Private proof packets",
    status: "Exists",
    evidence: "June 9-11 owner-review packets record checker, remediation, Opus critique, and skill audit evidence.",
    publicState: "Not yet joined into this page.",
  },
  {
    layer: "Public observability integration",
    status: "Incomplete",
    evidence: "This page still centers the June 1-3 evidence-readiness baseline.",
    publicState: "Patch into role/model/task evidence map.",
  },
  {
    layer: "Runtime automated enforcement",
    status: "Partial",
    evidence: "Checker and dispatcher exist for scoped flows; universal runtime enforcement is not claimed.",
    publicState: "Keep visible as a limitation.",
  },
  {
    layer: "Whole AIOS proof surface",
    status: "Not claimed",
    evidence: "Real data, benchmark export, production/live monitoring, and universal enforcement remain blocked.",
    publicState: "Do not present as complete proof.",
  },
]

const historicalMeasurements = [
  {
    name: "Historical session inventory A",
    period: "2026-05-09 to 2026-05-23",
    sessions: "60",
    apiCalls: "1,066",
    inputTokens: "100,703,785",
    outputTokens: "960,832",
    derivedEstimatedCost: "Approximately $34",
  },
  {
    name: "Historical session inventory B",
    period: "2026-05-21 to 2026-05-31",
    sessions: "90",
    apiCalls: "2,688",
    inputTokens: "56,018,396",
    outputTokens: "1,907,692",
    derivedEstimatedCost: "Approximately $381",
  },
]

const performanceClaimLimits = [
  "There is no clean structured pre-Hermes baseline.",
  "The Hermes main store and stage-manager profile periods overlap.",
  "The tasks in each period were not the same type of work.",
  "Some routes have token records but not actual billed cost.",
  "Historical records are not joined by normalized task ID across Hermes, OpenRouter, Codex, validation, and commits.",
  "The current records cannot isolate model choice, stage-manager workflow, provider route, parallel execution, task complexity, validation discipline, or human review wait time.",
]

const evidenceValueSections = [
  {
    title: "What P1.1 proves",
    source: "P1.1 evidence packet approved by Opus 4.7",
    confidence: "High",
    caveat: "This shows evidence discipline and blocker visibility, not benchmark superiority.",
    decision: "Supports a proposal story that values honest evidence over decorative metrics.",
    next: "Use the blockers to decide what data must be captured before any comparison.",
  },
  {
    title: "What remains blocked",
    source: "P1.1 new-record coverage and blocker matrix",
    confidence: "High",
    caveat:
      "New-record join keys, routing metadata, usage provenance, and decision metadata are still incomplete. Current historical records are not fixable into comparison evidence. They are ledger entries, not comparison candidates.",
    decision: "Blocks operational comparison, cost claims, and live performance interpretation.",
    next: "Capture joinable IDs, routing provenance, and decision metadata on new records only.",
  },
  {
    title: "Why this matters",
    source: "Public-safe review surface for AIOS evidence discipline",
    confidence: "Medium",
    caveat: "This is a prototype surface under construction, not a customer proof or production dashboard.",
    decision: "Helps a sponsor see how trace data turns into decision value.",
    next: "Show what exists, what is missing, and which decision each gap still blocks.",
  },
]

const enforcementMilestones = [
  {
    date: "June 9, 2026",
    title: "Routing-fit and false-orchestration enforcement",
    proof:
      "CASE-003 gates gained model/role routing-fit preflight, why-not-routed analysis, Agent-to-Task requirements, and QA stop conditions.",
    value:
      "Prevents Codex-local work or role labels from being mistaken for orchestrated proof.",
    boundary:
      "Scoped to enforced gates and packets; not universal runtime automation.",
  },
  {
    date: "June 9, 2026",
    title: "Routing evidence checker and canonical enforcement",
    proof:
      "A routing evidence checker, negative fixtures, run-id binding, provider receipt rules, and canonical enforcement reference were recorded.",
    value:
      "Makes missing receipts, missing role execution evidence, obsolete policy use, and cross-artifact inconsistency easier to catch.",
    boundary:
      "Checker proof is checker-scope proof; it does not approve CASE execution or real-data workflows.",
  },
  {
    date: "June 10, 2026",
    title: "Cross-team remediation ownership",
    proof:
      "Data Visualizer, UX Readability, QA Visual Reviewer, Data Team, Researcher, Codex, Opus, Robert, and Lyn responsibilities were mapped.",
    value:
      "Turns dashboard quality into owner comprehension, claim separation, source readiness, and reviewer coverage instead of cosmetic polish.",
    boundary:
      "Remediation rules do not themselves patch this public page or prove live monitoring.",
  },
  {
    date: "June 11, 2026",
    title: "Receipted Opus critique for skill education audit",
    proof:
      "A local Codex audit received OpenRouter Opus 4.7 critique with returned model, token count, and actual provider cost recorded privately.",
    value:
      "Shows the receipt discipline expected when a page claims Opus review.",
    boundary:
      "Does not claim independent runtime execution by every AIOS role.",
  },
]

const executionMap = [
  {
    task: "Historical evidence baseline",
    expectedRole: "Data / Evidence Steward",
    actualWorker: "Local evidence readout and KB checkpoint",
    modelRoute: "Local / optimize-worker evidence tooling",
    evidence: "Schema v0.7 and Evidence Readiness readout",
    value: "Separates usable receipts from historical backfill.",
    publicStatus: "Shown",
  },
  {
    task: "False-orchestration detection",
    expectedRole: "QA Sentinel + Stage Manager",
    actualWorker: "Private enforcement packets and checker",
    modelRoute: "Codex-local implementation with Opus-reviewed gates where recorded",
    evidence: "Routing evidence checker, negative fixtures, canonical rules",
    value: "Downgrades unsupported role/model claims instead of decorating them.",
    publicStatus: "Needs integration",
  },
  {
    task: "Role/model/task visibility",
    expectedRole: "PM Brain + Data Visualizer",
    actualWorker: "Private remediation rules",
    modelRoute: "Local policy addendum; reviewer route required when public-sensitive",
    evidence: "Model-role fit matrix and Data Visualizer/QA review rules",
    value: "Shows who did what, which evidence exists, and what remains blocked.",
    publicStatus: "Needs integration",
  },
  {
    task: "Opus gate evidence",
    expectedRole: "OpenRouter Opus 4.7 Reviewer",
    actualWorker: "Only when provider receipt exists or boundary is disclosed",
    modelRoute: "OpenRouter Opus for named critique/judge tasks",
    evidence: "Provider receipt or explicit missing-field boundary",
    value: "Prevents unreceipted senior-review claims.",
    publicStatus: "Partially disclosed",
  },
  {
    task: "Human decision gate",
    expectedRole: "Robert / Lyn",
    actualWorker: "Owner gate only when explicitly recorded",
    modelRoute: "Human decision, separate from model telemetry",
    evidence: "Approval, waiver, reject, or park record",
    value: "Keeps money, privacy, public, architecture, and release decisions out of model authority.",
    publicStatus: "Needs clearer board",
  },
]

const valueSignals = [
  {
    signal: "Lower false-proof risk",
    insight:
      "The system now distinguishes policy existence, checker evidence, reviewer receipts, and runtime enforcement instead of collapsing all of them into a pass badge.",
  },
  {
    signal: "Better owner comprehension",
    insight:
      "Data Visualizer and UX Readability rules require a five-second verdict, visible blocked actions, and task/claim/evidence separation.",
  },
  {
    signal: "Cleaner model spend discipline",
    insight:
      "Opus is treated as a judge/escalation route with receipt expectations, not as a default worker for vague review.",
  },
  {
    signal: "More useful public story",
    insight:
      "The page can now explain what AIOS improved, what value that creates, and exactly why whole-system proof is still blocked.",
  },
]

const integrationBacklog = [
  "Add a public-safe Agent-to-Task Execution Map for the June 9-11 enforcement packets.",
  "Show Role View, Model View, and Task View without exposing private local paths.",
  "Add receipt boundary labels for Opus, Sonnet, Codex-local, and human gates.",
  "Separate task status, claim status, and evidence status in every row.",
  "Link each value claim to the blocked action or decision it unlocks.",
  "Keep runtime automation, live monitoring, real-data, benchmark export, and public-proof claims blocked until separate gates pass.",
]

const futureComparisonGuidance = [
  "ChatX remains rejected as a reliable baseline.",
  "OpenRouter profile vs later Codex receipts remains a future candidate only.",
  "No benchmark claim is made until joinability, routing provenance, usage provenance, and decision metadata are present.",
  "Future comparison must use new v0.7 receipts only. Historical backfill records remain excluded.",
]

export default function ObservabilityPage() {
  return (
    <PageLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-xl border-2 border-red-600 bg-red-50 p-4 text-red-950 shadow-sm dark:bg-red-950/40 dark:text-red-100">
            <p className="text-lg font-bold tracking-wide sm:text-xl">UNDER CONSTRUCTION</p>
            <p className="mt-2 max-w-4xl text-sm leading-6">
              This page is a trust-safe Evidence &amp; Observability Review Surface. It is not a live
              dashboard. Evidence is shown only when verified, and pending or historical signals are
              labeled clearly.
            </p>
          </div>

          <Badge variant="outline" className="mt-6">
            Public-safe review surface
          </Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Evidence Discipline Review Surface
          </h1>
          <p className="mt-3 max-w-4xl text-muted-foreground">
            This page explains how AIOS evidence, validation outputs, review traces, and
            observability signals support human review. It now needs to absorb the June 9-11
            enforcement improvements: private proof exists, but this public trace is not complete.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">What this page is</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                This is a review surface for understanding evidence readiness, validation status,
                and observability boundaries across AIOS work.
              </CardContent>
            </Card>
            <Card className="border-red-600/40">
              <CardHeader>
                <CardTitle className="text-base">What this page is not</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                This is not a live telemetry dashboard, automated release gate, budget monitor,
                provider usage system, or source of truth.
              </CardContent>
            </Card>
          </div>

          <Card className="border-sky-600/30 bg-sky-50/50 dark:bg-sky-950/10">
            <CardHeader>
              <CardTitle className="text-base">Evidence discipline surface (prototype)</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              <p>
                This under-construction surface shows value from the evidence work without
                pretending to be a benchmark dashboard. It makes the current proof boundaries
                visible so a sponsor can see what is real, what is missing, and what must be
                collected next.
              </p>
              <p className="mt-3">
                Proves process discipline and blocker visibility only - not model, cost, or
                performance claims. Sample size n=3.
              </p>
              <p className="mt-3">
                No comparison between providers is made or implied on this page.
              </p>
              <p className="mt-3">
                <span className="font-medium text-foreground">Latest update (2026-06-03):</span>{" "}
                Evidence Readiness layer is now operational as a JSONL readout. Schema v0.7 is implemented and frozen. 
                Historical Codex receipts are classified as semi_structured backfill records and excluded from comparison by design.
              </p>
              <p className="mt-3">
                <span className="font-medium text-foreground">Enforcement update (June 9-11, 2026):</span>{" "}
                AIOS enforcement advanced materially through routing-fit checks, false-orchestration detection,
                receipt boundary rules, QA/Data Visualizer requirements, Codex authority limits, and human-gate
                separation. Those proofs exist privately, but they are not yet fully integrated into this public
                surface.
              </p>
              <div className="mt-4 grid gap-4 lg:grid-cols-3">
                {evidenceValueSections.map((section) => (
                  <Card key={section.title} className="border-border/60 bg-background/80">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-xs leading-5 text-muted-foreground">
                      <p>
                        <span className="font-medium text-foreground">Evidence source:</span>{" "}
                        {section.source}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">Confidence:</span>{" "}
                        {section.confidence}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">Caveat:</span>{" "}
                        {section.caveat}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">Decision:</span>{" "}
                        {section.decision}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">Next unblock action:</span>{" "}
                        {section.next}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 lg:px-8">
          <Card className="border-emerald-600/30 bg-emerald-50/60 dark:bg-emerald-950/10">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-3">
                <CardTitle className="text-lg">Current owner verdict</CardTitle>
                <Badge variant="outline">Private proof exists</Badge>
                <Badge variant="outline">Public trace incomplete</Badge>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm leading-6 text-muted-foreground lg:grid-cols-[1.1fr_1fr]">
              <div>
                <p className="text-base font-medium text-foreground">{currentVerdict.label}</p>
                <p className="mt-2 font-mono text-xs text-foreground">{currentVerdict.code}</p>
                <p className="mt-3">{currentVerdict.meaning}</p>
              </div>
              <div className="border-l border-emerald-700/20 pl-4">
                <p className="font-medium text-foreground">Next useful page improvement</p>
                <p className="mt-2">{currentVerdict.next}</p>
              </div>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Enforcement integration status
            </h2>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">
              The public surface should show the maturity jump without implying the whole system is
              fully runtime-enforced. The useful view is layered: rules, private proof, public
              integration, runtime automation, and whole-system proof are different states.
            </p>
            <div className="mt-4 grid gap-3">
              {enforcementProgress.map((item) => (
                <Card key={item.layer}>
                  <CardContent className="grid gap-3 p-4 text-sm md:grid-cols-[0.8fr_0.6fr_1.5fr_1fr]">
                    <div>
                      <p className="font-medium text-foreground">{item.layer}</p>
                    </div>
                    <div>
                      <Badge variant="outline">{item.status}</Badge>
                    </div>
                    <p className="leading-6 text-muted-foreground">{item.evidence}</p>
                    <p className="leading-6 text-muted-foreground">{item.publicState}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              June 9-11 enforcement proof
            </h2>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">
              These are the newer private proof signals this page needs to integrate. They are
              framed as enforcement improvement, not as live monitoring or universal runtime proof.
            </p>
            <div className="mt-4 grid gap-3 lg:grid-cols-2">
              {enforcementMilestones.map((milestone) => (
                <Card key={`${milestone.date}-${milestone.title}`}>
                  <CardHeader className="pb-2">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <CardTitle className="text-sm">{milestone.title}</CardTitle>
                      <Badge variant="outline" className="text-[10px]">
                        {milestone.date}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-xs leading-5 text-muted-foreground">
                    <p>
                      <span className="font-medium text-foreground">Proof:</span> {milestone.proof}
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Value:</span> {milestone.value}
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Boundary:</span>{" "}
                      {milestone.boundary}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Public-safe Agent-to-Task map
              </h2>
              <Badge variant="outline">Integration backlog</Badge>
            </div>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">
              This map is the IA this page should move toward: what task happened, which role was
              expected, what worker or route is actually evidenced, what value it creates, and what
              is still missing from the public trace.
            </p>
            <div className="mt-4 overflow-x-auto rounded-lg border">
              <table className="min-w-[980px] text-left text-xs">
                <thead className="bg-muted/60 text-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium">Task</th>
                    <th className="px-4 py-3 font-medium">Expected role</th>
                    <th className="px-4 py-3 font-medium">Observed worker / route</th>
                    <th className="px-4 py-3 font-medium">Evidence</th>
                    <th className="px-4 py-3 font-medium">Value</th>
                    <th className="px-4 py-3 font-medium">Public status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {executionMap.map((row) => (
                    <tr key={row.task} className="align-top">
                      <td className="px-4 py-3 font-medium text-foreground">{row.task}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.expectedRole}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        <p>{row.actualWorker}</p>
                        <p className="mt-1 text-[11px] text-muted-foreground">{row.modelRoute}</p>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{row.evidence}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.value}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="text-[10px]">
                          {row.publicStatus}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Meaningful value created</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
                {valueSignals.map((item) => (
                  <div key={item.signal}>
                    <p className="font-medium text-foreground">{item.signal}</p>
                    <p>{item.insight}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Public integration backlog</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                <ul className="list-disc space-y-1 pl-5">
                  {integrationBacklog.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Evidence status</h2>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">
              Signals appear only when their source, date, and review status are clear. Pending,
              historical, unavailable, and not-yet-verified information must remain labeled explicitly.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {statusLabels.map((status) => (
                <Card key={status.label}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">{status.label}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs leading-5 text-muted-foreground">
                    {status.detail}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Evidence Inventory Snapshot
              </h2>
              <Badge variant="outline">Historical audit only</Badge>
              <Badge variant="outline">Not live</Badge>
            </div>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">
              This public-safe snapshot summarizes a bounded historical evidence audit completed on
              2026-06-01. These are inventory counts, not live metrics, current system-health
              readings, cost claims, or normalized Hermes-vs-Codex performance comparisons.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {evidenceInventory.map((item) => (
                <Card key={item.label}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="text-sm">{item.label}</CardTitle>
                      <Badge variant="outline" className="shrink-0 text-[10px]">
                        {item.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-semibold tracking-tight text-foreground">{item.value}</p>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">{item.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="mt-4 max-w-4xl text-xs leading-5 text-muted-foreground">
              Inventory counts are curated for public review. Raw records, private notes, secret or
              environment values, provider credentials, and unreconciled token or cost aggregates
              are intentionally excluded.
            </p>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Historical Session Snapshot
              </h2>
              <Badge variant="outline">Historical session inventory</Badge>
              <Badge variant="outline">Derived estimates</Badge>
            </div>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">
              Inventory A and Inventory B are historical usage inventories, not benchmark cohorts.
              They show usage scale and telemetry gaps from overlapping local usage windows, but
              they do not explain why the observed differences occurred.
            </p>
            <div className="mt-4 grid gap-3 lg:grid-cols-2">
              {historicalMeasurements.map((measurement) => (
                <Card key={measurement.name}>
                  <CardHeader className="pb-2">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <CardTitle className="text-sm">{measurement.name}</CardTitle>
                      <Badge variant="outline" className="text-[10px]">
                        Historical snapshot
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{measurement.period}</p>
                  </CardHeader>
                  <CardContent>
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs leading-5">
                      <div>
                        <dt className="text-muted-foreground">Sessions</dt>
                        <dd className="font-medium text-foreground">{measurement.sessions}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">API calls</dt>
                        <dd className="font-medium text-foreground">{measurement.apiCalls}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Input tokens</dt>
                        <dd className="font-medium text-foreground">{measurement.inputTokens}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Output tokens</dt>
                        <dd className="font-medium text-foreground">{measurement.outputTokens}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Derived estimated cost</dt>
                        <dd className="font-medium text-foreground">
                          {measurement.derivedEstimatedCost}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Actual billed cost</dt>
                        <dd className="font-medium text-foreground">Unavailable</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="mt-4 max-w-4xl text-xs leading-5 text-muted-foreground">
              These snapshots should not be read as before/after evidence, Hermes-vs-Codex
              comparison, provider efficiency proof, cost-saving evidence, or performance proof.
              The date ranges overlap, tasks were not normalized, actual billed cost is
              unavailable, and records do not reliably join session, task, route, model,
              validation, and outcome. Observed differences are diagnostic signals only: Inventory
              A has higher input-token volume, while Inventory B has more sessions, API calls,
              output tokens, and a higher derived cost estimate. Their value is diagnostic: future
              comparison requires v0.7 receipts, join keys, routing metadata, usage provenance,
              pricing source, validation evidence, and decision metadata.
            </p>
          </div>

          <Card className="border-yellow-600/30 bg-yellow-50/60 dark:bg-yellow-950/10">
            <CardHeader>
              <CardTitle className="text-base">Why this is not yet a performance claim</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              <ul className="list-disc space-y-1 pl-5">
                {performanceClaimLimits.map((limit) => (
                  <li key={limit}>{limit}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-5">
                The current evidence supports historical measurement review and telemetry gap
                analysis. It does not yet support claims such as “Codex is faster than Hermes,”
                “multi-agent work reduced elapsed time,” or “this route reduced cost by X%.”
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-4 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Observability boundary</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                Observability is a supporting evidence capability within Evidence &amp; Audit. It
                provides context for human review; it does not approve execution or prove
                production-grade monitoring by itself.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Source-of-truth boundary</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                GPT KB + Git remain the durable source of truth. ai-os-profile presents a
                curated, public-safe explanation for review and portfolio communication.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Human review gate</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                Sararin/GPT review remains the human decision gate. This page can support a
                decision, but it cannot approve or release work.
              </CardContent>
            </Card>
          </div>

          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="text-base">Future comparison guidance</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              <ul className="list-disc space-y-1 pl-5">
                {futureComparisonGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">
                A small receipt and reconciliation slice may be reviewed later after metric
                definitions, source-of-truth location, data-capture method, and verification rules
                are approved. No live dashboard, API, telemetry system, or automated decision gate
                is part of this page.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  )
}
