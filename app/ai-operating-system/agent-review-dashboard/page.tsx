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

const publicWorkspaceDescriptions: Record<string, string> = {
  "Planning / Contract": "evidence rules and data boundaries",
  "Snapshot Cycle": "manual review captures",
  "Decision / Gate": "human approval checkpoints",
  "Prototype Spec": "read-only behavior rules",
  "JSONL Gate": "structured data trigger; not active",
  Closeout: "handoff and boundary records",
  "Approval Boundaries": "work that is not authorized yet",
  "Big Crew": "engineering team; roster not published",
  Supernova: "separate AIOS workstream; member details not shown here",
  "Evidence Gaps": "known missing or unresolved evidence",
}

const publicWorkspaceTitles: Record<string, string> = {
  "JSONL Gate": "Structured Data Gate",
  "Big Crew": "Big Crew Engineering Team",
}

const publicCardTitles: Record<string, string> = {
  data_team_rule: "Data Team First Rule (evidence review before decision)",
  lyn_b_selection_receipt: "Prototype option selection receipt",
  c_jsonl_trigger_assessment: "Structured data trigger assessment",
  c_trigger_current_status: "Current structured-data trigger status",
  jsonl_schema_boundary: "Structured evidence index",
  big_crew_workspace: "Big Crew Engineering Team (roster not published)",
  supernova_workspace: "Supernova workspace (separate workstream)",
}

const publicCardRemarks: Record<string, string> = {
  data_team_rule:
    "Dashboard and evidence questions are reviewed by the Data Team before they become decision requests.",
  lyn_b_selection_receipt:
    "An internal decision selected the read-only evidence surface before any public route work.",
  c_jsonl_trigger_assessment:
    "A future structured evidence index was assessed and remains parked because the trigger is not met.",
  c_trigger_current_status:
    "Snapshot 002 is within the review window but does not meet the third-snapshot trigger required for automation review.",
  jsonl_schema_boundary:
    "A structured evidence index is not authorized now; any future version needs a separate decision packet.",
  big_crew_workspace:
    "Engineering team workspace. Individual member names are not shown on this public page.",
  supernova_workspace: "Supernova remains separate from Big Crew; this page does not publish member details.",
}

const nameSensitiveWorkspaces = new Set(["Big Crew", "Supernova"])
const nameSensitiveCardIds = new Set([
  "data_team_rule",
  "lyn_b_selection_receipt",
  "big_crew_workspace",
  "supernova_workspace",
])
const inactiveTriggerStates = new Set(["not_met", "not met"])

const publicTermDescriptions = [
  {
    term: "Snapshot 002",
    definition: "A manual evidence capture used for this public view. It is not a live data feed.",
  },
  {
    term: "Automation data trigger",
    definition:
      "A rule for when evidence should move from manual snapshots toward a structured evidence index. It is not met here.",
  },
  {
    term: "Structured evidence index",
    definition:
      "A future machine-readable evidence store, such as JSONL or a database. It is not implemented in this snapshot.",
  },
  {
    term: "Big Crew",
    definition:
      "An engineering team in AIOS. The team exists, but individual member names are not published on this public page.",
  },
  {
    term: "Supernova",
    definition:
      "A separate AIOS workstream. It is intentionally not merged with Big Crew in this evidence view.",
  },
  {
    term: "Data Team",
    definition:
      "The evidence-review function that proposes dashboard data interpretation before a human decision. Member names are not listed here.",
  },
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

function displayWorkspaceTitle(workspace: string) {
  return publicWorkspaceTitles[workspace] ?? workspace
}

function displayCardTitle(card: SnapshotCard) {
  return publicCardTitles[card.id] ?? card.label
}

function displayCardRemark(card: SnapshotCard) {
  return publicCardRemarks[card.id] ?? card.remark
}

function displayEvidenceState(value: string) {
  return value.replaceAll("_", " ")
}

function displayPublicEvidenceState(card: SnapshotCard) {
  if (card.id === "big_crew_workspace" && card.value === "pending_registry_reconciliation") {
    return "roster not published"
  }

  return displayEvidenceState(card.value)
}

function displayConfidence(confidence: SnapshotCard["confidence"]) {
  return `evidence confidence: ${confidence}`
}

function displayLegendTerm(term: string) {
  if (term === "confidence") return "evidence confidence"
  return term
}

function displayTriggerState(value: string) {
  const displayValue = value.replaceAll("_", " ")
  return inactiveTriggerStates.has(value) ? `${displayValue} (not active)` : displayValue
}

function isNameSensitiveCard(card: SnapshotCard) {
  return nameSensitiveWorkspaces.has(card.workspace) || nameSensitiveCardIds.has(card.id)
}

function publicEvidenceFieldValue(card: SnapshotCard, field: string, value: string) {
  if (field === "sourcePath") {
    return "internal evidence record (path not published)"
  }

  if (field === "snapshotBy") {
    return "not published on public page"
  }

  if (!isNameSensitiveCard(card)) return value

  if (["decisionUse", "missingFields", "sourcePath", "snapshotBy", "refreshCadence"].includes(field)) {
    return "not published on public page"
  }

  return value
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
        <Field label="Evidence snapshot" value={`${snapshotMeta.snapshotId} (manual capture)`} />
        <Field label="Capture date" value={snapshotMeta.captureDate} />
        <Field label="Automation data trigger" value={displayTriggerState(snapshotMeta.cTrigger)} />
        <Field label="Manual snapshot count" value={`${snapshotMeta.snapshotCount} required before automation review`} />
      </div>
    </div>
  )
}

function SnapshotCardView({ card }: { card: SnapshotCard }) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">{displayCardTitle(card)}</p>
          <p className="mt-1 text-sm text-muted-foreground">{displayCardRemark(card)}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className={stateClassName(card.value)}>
            {displayPublicEvidenceState(card)}
          </Badge>
          <Badge variant="outline" className={confidenceClassName(card.confidence)}>
            {displayConfidence(card.confidence)}
          </Badge>
        </div>
      </div>

      <div className="mt-4 grid gap-3 border-t pt-4 md:grid-cols-2 xl:grid-cols-3">
        <Field label="Source type" value={card.sourceType} />
        <Field label="Last updated" value={card.lastUpdated} />
        <Field label="Decision use" value={publicEvidenceFieldValue(card, "decisionUse", card.decisionUse)} />
        <Field label="Missing fields" value={publicEvidenceFieldValue(card, "missingFields", card.missingFields)} />
        <Field label="Refresh cadence" value={publicEvidenceFieldValue(card, "refreshCadence", card.refreshCadence)} />
        <Field
          label="Source reference"
          value={publicEvidenceFieldValue(card, "sourcePath", card.sourcePath)}
          className="xl:col-span-2"
        />
        {card.snapshotBy && (
          <Field label="Snapshot by" value={publicEvidenceFieldValue(card, "snapshotBy", card.snapshotBy)} />
        )}
        {card.snapshotAt && <Field label="Snapshot at" value={card.snapshotAt} />}
        {card.snapshotTtl && <Field label="Snapshot TTL" value={card.snapshotTtl} />}
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
                is shown as an engineering team, Supernova remains separate, and team member names
                are not published from this view.
              </p>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" defaultValue={["Planning / Contract", "Snapshot Cycle", "Evidence Gaps"]}>
                {workspaceGroups.map((group) => (
                  <AccordionItem key={group.workspace} value={group.workspace}>
                    <AccordionTrigger>
                      <span className="text-left">
                        {displayWorkspaceTitle(group.workspace)}
                        <span className="ml-1 font-normal text-muted-foreground">
                          ({publicWorkspaceDescriptions[group.workspace]})
                        </span>
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
                <CardTitle>Known Gaps</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {gapCards.map((card) => (
                  <div key={card.id} className="rounded-lg border bg-background/70 p-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-foreground">{displayCardTitle(card)}</p>
                      <Badge variant="outline" className={stateClassName(card.value)}>
                        {displayPublicEvidenceState(card)}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{displayCardRemark(card)}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Public Term Guide</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {publicTermDescriptions.map((item) => (
                  <div key={item.term} className="rounded-lg border p-3">
                    <p className="text-sm font-semibold text-foreground">{item.term}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.definition}</p>
                  </div>
                ))}
                {dashboardLegend.map((item) => (
                  <div key={item.term} className="rounded-lg border p-3">
                    <p className="font-mono text-sm font-semibold text-foreground">{displayLegendTerm(item.term)}</p>
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
