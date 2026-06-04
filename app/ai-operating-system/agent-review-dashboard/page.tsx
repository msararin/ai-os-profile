import Link from "next/link"
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

// Public-safe shell: do not migrate this route to PageLayout without re-review,
// because PageLayout exposes Internal Access. Review/remove on Snapshot 003 or review-window expiry.
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

const gapStates = [
  "missing_source",
  "not_decision_ready",
  "pending_registry_reconciliation",
  "parked",
]

const nonClaims = [
  "Live telemetry",
  "Mature analytics",
  "Production observability",
  "Performance improvement proof",
  "Benchmark proof",
  "Provider comparison proof",
  "Cost-saving evidence",
  "Autonomous orchestration",
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

function ProvenanceStrip() {
  return (
    <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
      <p className="text-sm font-semibold text-foreground">Snapshot provenance</p>
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

export default function PublicAIOSAgentReviewDashboardPage() {
  const workspaceGroups = groupCardsByWorkspace(snapshotCards)
  const gapCards = snapshotCards.filter((card) => gapStates.includes(card.value))

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-4 text-sm sm:px-6 lg:px-8">
          <Link href="/" className="font-medium text-muted-foreground hover:text-primary">
            Home
          </Link>
          <Link href="/ai-operating-system" className="font-medium text-primary hover:underline">
            AI Operating System
          </Link>
          <Link href="/architecture" className="font-medium text-muted-foreground hover:text-primary">
            Architecture
          </Link>
          <Link href="/achievements" className="font-medium text-muted-foreground hover:text-primary">
            Achievements
          </Link>
        </div>
      </header>

      <section className="border-b border-border bg-background">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Link href="/ai-operating-system" className="text-sm font-medium text-primary hover:underline">
            AI Operating System
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="border-amber-500/50 text-amber-700 dark:text-amber-300">
              Public evidence snapshot — manual evidence, not analytics
            </Badge>
            <Badge variant="outline">Snapshot 002</Badge>
          </div>

          <div className="mt-5 max-w-5xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              AIOS case study dashboard
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Agent Review Evidence Dashboard
            </h1>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              This page is a public case-study view of how AIOS evidence is captured and reviewed.
              It is based on a manual Snapshot 002, not live telemetry.
            </p>
            <p className="mt-2 text-sm font-medium text-foreground">
              Its gaps are part of the evidence discipline: missing sources, parked work, and
              not-decision-ready items are shown instead of being hidden.
            </p>
          </div>

          <div className="mt-6">
            <ProvenanceStrip />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Evidence Workspaces</CardTitle>
              <p className="text-sm text-muted-foreground">
                Snapshot 002 is rendered as evidence state, not as live operations data. Big Crew
                and Supernova stay separate because registry and workspace state must not be merged.
              </p>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" defaultValue={["Planning / Contract", "Snapshot Cycle", "Evidence Gaps"]}>
                {workspaceGroups.map((group) => (
                  <AccordionItem key={group.workspace} value={group.workspace}>
                    <AccordionTrigger>
                      <span>{group.workspace}</span>
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
                <CardTitle>Known Gaps</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {gapCards.map((card) => (
                  <div key={card.id} className="rounded-lg border bg-background/70 p-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-foreground">{card.label}</p>
                      <Badge variant="outline" className={stateClassName(card.value)}>
                        {card.value}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{card.remark}</p>
                  </div>
                ))}
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
                <CardTitle>What This Does Not Claim</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {nonClaims.map((claim) => (
                    <div key={claim} className="rounded-md border p-2 text-sm text-muted-foreground">
                      {claim}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>What This Page Proves</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm text-muted-foreground md:grid-cols-2">
            <div>
              <p className="font-medium text-foreground">Allowed public claims</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>AIOS has a manual evidence snapshot process.</li>
                <li>Snapshot 002 can be rendered as a public-safe evidence-state dashboard.</li>
                <li>Missing, parked, and not-decision-ready states are shown explicitly.</li>
                <li>The page demonstrates evidence discipline and governance transparency.</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground">Boundary</p>
              <p className="mt-2">
                The route must be reviewed, removed, or re-authorized when Snapshot 003 lands or
                the review window expires. It is not live telemetry and does not prove analytics
                maturity.
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="mt-4 text-xs text-muted-foreground">
          Review window: {snapshotMeta.reviewWindow.start} to {snapshotMeta.reviewWindow.end}.
        </p>
      </section>
    </main>
  )
}
