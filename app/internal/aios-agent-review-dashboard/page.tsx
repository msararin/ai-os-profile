import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  dashboardLegend,
  snapshotCards,
  snapshotMeta,
  type SnapshotCard,
} from "@/lib/aios-agent-review-dashboard-snapshot"

const workspaceOrder = [
  "Planning / Contract",
  "Snapshot Cycle",
  "Decision / Gate",
  "Prototype Spec",
  "JSONL Gate",
  "Closeout",
  "Approval Boundaries",
  "Big Crew",
  "Supernova",
  "Evidence Gaps",
]

const nonGoals = [
  "No trends",
  "No aggregation across snapshots",
  "No write actions",
  "No auto-refresh",
  "No export",
  "No public-surface links",
  "No JSONL / SQLite",
  "No telemetry implementation",
  "No provider comparison",
  "No benchmark proof",
  "No cost-saving evidence",
  "No autonomous orchestration claim",
]

function groupCardsByWorkspace(cards: SnapshotCard[]) {
  return workspaceOrder
    .map((workspace) => ({
      workspace,
      cards: cards.filter((card) => card.workspace === workspace),
    }))
    .filter((group) => group.cards.length > 0)
}

function stateClassName(value: SnapshotCard["value"]) {
  if (value === "exists") return "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
  if (value === "not_approved") return "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300"
  if (value === "not_decision_ready") return "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300"
  if (value === "pending_registry_reconciliation") return "border-sky-500/40 bg-sky-500/10 text-sky-700 dark:text-sky-300"
  if (value === "parked") return "border-slate-500/40 bg-slate-500/10 text-slate-700 dark:text-slate-300"
  return "border-muted-foreground/40 bg-muted text-muted-foreground"
}

function confidenceClassName(confidence: SnapshotCard["confidence"]) {
  if (confidence === "high") return "border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
  if (confidence === "medium") return "border-amber-500/40 text-amber-700 dark:text-amber-300"
  return "border-muted-foreground/40 text-muted-foreground"
}

function Field({
  label,
  value,
  className = "",
}: {
  label: string
  value: string
  className?: string
}) {
  return (
    <div className={className}>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 break-words text-sm text-foreground">{value}</p>
    </div>
  )
}

function ProvenanceStrip({ location }: { location: "header" | "footer" }) {
  return (
    <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
      <p className="text-sm font-semibold text-foreground">
        {location === "header" ? "Snapshot provenance" : "Footer provenance"}
      </p>
      <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Snapshot ID" value={snapshotMeta.snapshotId} />
        <Field label="Capture date" value={snapshotMeta.captureDate} />
        <Field label="C trigger" value={snapshotMeta.cTrigger} />
        <Field label="Snapshot count" value={snapshotMeta.snapshotCount} />
      </div>
    </div>
  )
}

function SnapshotCardView({ card }: { card: SnapshotCard }) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">{card.label}</p>
          <p className="mt-1 text-sm text-muted-foreground">{card.remark}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className={stateClassName(card.value)}>
            {card.value}
          </Badge>
          <Badge variant="outline" className={confidenceClassName(card.confidence)}>
            {card.confidence}
          </Badge>
        </div>
      </div>

      <div className="mt-4 grid gap-3 border-t pt-4 md:grid-cols-2 xl:grid-cols-3">
        <Field label="source_type" value={card.sourceType} />
        <Field label="last_updated" value={card.lastUpdated} />
        <Field label="decision_use" value={card.decisionUse} />
        <Field label="missing_fields" value={card.missingFields} />
        <Field label="refresh_cadence" value={card.refreshCadence} />
        <Field label="source_path" value={card.sourcePath} className="xl:col-span-2" />
        {card.snapshotBy && <Field label="snapshot_by" value={card.snapshotBy} />}
        {card.snapshotAt && <Field label="snapshot_at" value={card.snapshotAt} />}
        {card.snapshotTtl && <Field label="snapshot_ttl" value={card.snapshotTtl} />}
      </div>
    </div>
  )
}

export default function AIOSAgentReviewDashboardPage() {
  const workspaceGroups = groupCardsByWorkspace(snapshotCards)

  return (
    <PageLayout>
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/internal/dashboard" className="text-sm font-medium text-primary hover:underline">
            ← Back to Internal Dashboard
          </Link>
          <Badge variant="outline" className="border-amber-500/50 text-amber-700 dark:text-amber-300">
            Prototype — manual evidence, not analytics
          </Badge>
        </div>

        <div className="mt-5 max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Internal read-only prototype
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            AIOS Agent Review Dashboard
          </h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            This is an early read-only dashboard prototype. It is designed to surface how AIOS evidence
            is being captured, where data is still manual, where sources are missing, and which items are
            not decision-ready yet.
          </p>
          <p className="mt-2 text-sm font-medium text-foreground">
            It is not a mature analytics dashboard. It is not live telemetry. It does not prove performance
            improvement, benchmark results, provider comparison, or cost savings.
          </p>
        </div>

        <div className="mt-6">
          <ProvenanceStrip location="header" />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Evidence Workspaces</CardTitle>
              <p className="text-sm text-muted-foreground">
                Static rendering of committed Snapshot 002 evidence. Big Crew and Supernova stay separate
                because registry and workspace state must not be merged.
              </p>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" defaultValue={["Planning / Contract", "Snapshot Cycle", "Approval Boundaries"]}>
                {workspaceGroups.map((group) => (
                  <AccordionItem key={group.workspace} value={group.workspace}>
                    <AccordionTrigger>
                      <span className="flex flex-wrap items-center gap-2">
                        <span>{group.workspace}</span>
                        <Badge variant="secondary">{group.cards.length} cards</Badge>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-3">
                        {group.cards.map((card) => (
                          <SnapshotCardView key={card.id} card={card} />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="grid content-start gap-6">
            <Card className="border-amber-500/40 bg-amber-500/10">
              <CardHeader>
                <CardTitle>Learning Surface Boundary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-foreground">
                <p>
                  The current purpose is to make the data-capture process visible so the system can improve
                  over time.
                </p>
                <p className="text-muted-foreground">
                  Static typed data is a prototype fixture. The committed KB Sample Snapshot 002 remains the
                  source evidence.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Legend</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {dashboardLegend.map((item) => (
                  <div key={item.term} className="rounded-lg border p-3">
                    <p className="font-mono text-sm font-semibold text-foreground">{item.term}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.definition}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Explicit Non-Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {nonGoals.map((goal) => (
                    <div key={goal} className="rounded-md border p-2 text-sm text-muted-foreground">
                      {goal}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6">
          <ProvenanceStrip location="footer" />
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Review window: {snapshotMeta.reviewWindow.start} to {snapshotMeta.reviewWindow.end}. Route must be
          reviewed, removed, or re-authorized when Snapshot 003 lands or the review window expires.
        </p>
      </section>
    </PageLayout>
  )
}
