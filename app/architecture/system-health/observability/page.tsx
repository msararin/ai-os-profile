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
      "New-record join keys, routing metadata, usage provenance, and decision metadata are still incomplete.",
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

const futureComparisonGuidance = [
  "ChatX remains rejected as a reliable baseline.",
  "OpenRouter profile vs later Codex receipts remains a future candidate only.",
  "No benchmark claim is made until joinability, routing provenance, usage provenance, and decision metadata are present.",
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
            observability signals support human review. It does not replace Lyn/Robert approval,
            and it does not act as a live production monitoring system.
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
              Historical numbers exist, but they are not yet normalized into apples-to-apples
              performance claims. These inventories make the available evidence visible while
              stating the limits directly. Specific route labels remain in source-of-truth docs.
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
              These are historical session inventories and derived estimates. They are not
              task-normalized cost, billed spend, or proof that one workflow was faster or cheaper
              than another.
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
                Robert KB + Git remain the durable source of truth. ai-os-profile presents a
                curated, public-safe explanation for review and portfolio communication.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Human review gate</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                Lyn/Robert review remains the human decision gate. This page can support a
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
