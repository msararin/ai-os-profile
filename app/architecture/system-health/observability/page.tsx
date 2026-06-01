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
    label: "Hermes session inventory records",
    detail: "Two historical local session inventories. Not normalized task comparisons.",
    status: "Historical snapshot",
  },
  {
    value: "1",
    label: "Controlled provider probe receipt",
    detail: "Single retained receipt proving a capture path, not route-wide cost or performance.",
    status: "Verified as of 2026-06-01",
  },
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
            Evidence &amp; Observability Review Surface
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
              <CardTitle className="text-base">Parked evidence follow-up</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              A small receipt and reconciliation slice may be reviewed later after metric
              definitions, source-of-truth location, data-capture method, and verification rules are
              approved. No live dashboard, API, telemetry system, or automated decision gate is part
              of this page.
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  )
}
