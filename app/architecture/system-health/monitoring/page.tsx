import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  aiosMonitoringRecords,
  aiosMonitoringRuleGroups,
  aiosMonitoringSnapshotMeta,
  aiosMonitoringSummary,
  claimStatusDefinitions,
  conceptLegend,
  deferredForV02,
  governanceEnforcementChecks,
  latestActionDecision,
  phaseAgentActivity,
  publicUnderConstructionGate,
  statusDefinitions,
  statusFlow,
  tokenCostUsageVisibility,
  type AiosMonitorStatus,
} from "@/lib/aios-monitoring-snapshot"

const statusTone: Record<AiosMonitorStatus, string> = {
  NOT_STARTED: "bg-muted text-muted-foreground",
  IN_PROGRESS: "bg-blue-100 text-blue-950 dark:bg-blue-950/40 dark:text-blue-100",
  PASS: "bg-emerald-100 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-100",
  PASS_WITH_CAVEAT: "bg-amber-100 text-amber-950 dark:bg-amber-950/40 dark:text-amber-100",
  FAIL: "bg-red-100 text-red-950 dark:bg-red-950/40 dark:text-red-100",
  DOWNGRADED: "bg-amber-100 text-amber-950 dark:bg-amber-950/40 dark:text-amber-100",
  ESCALATE: "bg-red-100 text-red-950 dark:bg-red-950/40 dark:text-red-100",
  PARKED: "bg-slate-100 text-slate-950 dark:bg-slate-900 dark:text-slate-100",
}

const summaryCards = [
  { label: "Records", value: String(aiosMonitoringSummary.totalRecords) },
  { label: "Pass", value: String(aiosMonitoringSummary.passCount) },
  { label: "Pass with caveat", value: String(aiosMonitoringSummary.passWithCaveatCount) },
  { label: "Fail", value: String(aiosMonitoringSummary.failCount) },
  { label: "Parked", value: String(aiosMonitoringSummary.parkedCount) },
]

const evidenceHeadings = [
  ["routeLedger", "route ledger"],
  ["roleDependencyMatrix", "role matrix"],
  ["telemetryReceipt", "telemetry"],
  ["providerReceipt", "provider"],
  ["sourceRegister", "source"],
  ["costCapReceipt", "cost cap"],
  ["stopConditionCheck", "stop check"],
  ["monitorStatus", "monitor status"],
] as const

const guidanceRecords = aiosMonitoringRecords.filter((record) =>
  ["FAIL", "DOWNGRADED", "ESCALATE", "PARKED", "NOT_STARTED", "PASS_WITH_CAVEAT"].includes(
    record.overallStatus,
  ),
)

function StatusBadge({ status }: { status: AiosMonitorStatus }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusTone[status]}`}>
      {status}
    </span>
  )
}

export default function AiosMonitoringPage() {
  return (
    <PageLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-xl border-2 border-red-600 bg-red-50 p-4 text-red-950 shadow-sm dark:bg-red-950/40 dark:text-red-100">
            <p className="text-lg font-bold tracking-wide sm:text-xl">UNDER CONSTRUCTION</p>
            <p className="mt-2 max-w-4xl text-sm leading-6">
              This is a public-safe static AIOS monitoring review surface. It displays
              curated/exported enforcement status only. It is not live telemetry, not a production
              monitoring dashboard, and not realtime agent tracking.
            </p>
          </div>

          <Badge variant="outline" className="mt-6">
            Public-safe monitoring surface
          </Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            AIOS Monitoring Review Surface
          </h1>
          <div className="mt-3 max-w-4xl space-y-3 text-sm leading-6 text-muted-foreground sm:text-base">
            <p>
              Monitoring makes AIOS governance visible: whether routing and enforcement policies
              were followed, whether provider/model/token/cost receipts are present or missing,
              whether role boundaries were respected, which claims are valid or downgraded, and
              which role owns the next action.
            </p>
            <p>
              The page is intentionally public-safe. It does not show local file paths, raw
              receipts, secrets, provider keys, private cost detail, internal task logs, or
              confidential workflow details.
            </p>
          </div>

          <Card className="mt-6 border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-base">Latest action decision</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-medium text-foreground">Current layer status</span>
                <StatusBadge status={latestActionDecision.currentLayerStatus} />
              </div>
              <p>
                <span className="font-medium text-foreground">Meaning:</span>{" "}
                {latestActionDecision.statusMeaning}
              </p>
              <p>
                <span className="font-medium text-foreground">Why:</span>{" "}
                {latestActionDecision.why}
              </p>
              <p>
                <span className="font-medium text-foreground">Owner to unblock:</span>{" "}
                {latestActionDecision.ownerToUnblock}
              </p>
              <p>
                <span className="font-medium text-foreground">Next allowed action:</span>{" "}
                {latestActionDecision.nextAllowedAction}
              </p>
              <p>
                <span className="font-medium text-foreground">Not allowed yet:</span>{" "}
                {latestActionDecision.notAllowedYet}
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6 border-amber-600/50 bg-amber-50/70 dark:bg-amber-950/10">
            <CardHeader>
              <CardTitle className="text-base">{publicUnderConstructionGate.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 text-sm leading-6 text-muted-foreground">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["Contract", publicUnderConstructionGate.contractStatus],
                  ["Implementation", publicUnderConstructionGate.implementationStatus],
                  ["Public surface", publicUnderConstructionGate.publicSurfaceStatus],
                  ["Claim", publicUnderConstructionGate.claimStatus],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg border border-border bg-background p-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-lg border border-border bg-background p-4">
                  <h2 className="text-sm font-semibold text-foreground">Route and owner gate</h2>
                  <dl className="mt-3 grid gap-2">
                    <div className="flex flex-wrap justify-between gap-2">
                      <dt>routing_level</dt>
                      <dd className="font-medium text-foreground">
                        {publicUnderConstructionGate.routingLevel}
                      </dd>
                    </div>
                    <div className="flex flex-wrap justify-between gap-2">
                      <dt>route_status</dt>
                      <dd className="font-medium text-foreground">
                        {publicUnderConstructionGate.routeStatus}
                      </dd>
                    </div>
                    <div className="flex flex-wrap justify-between gap-2">
                      <dt>reason_code</dt>
                      <dd className="font-medium text-foreground">
                        {publicUnderConstructionGate.reasonCode}
                      </dd>
                    </div>
                    <div className="flex flex-wrap justify-between gap-2">
                      <dt>owner_gate_required</dt>
                      <dd className="font-medium text-foreground">
                        {publicUnderConstructionGate.ownerGateRequired}
                      </dd>
                    </div>
                    <div className="flex flex-wrap justify-between gap-2">
                      <dt>owner_gate_status</dt>
                      <dd className="font-medium text-foreground">
                        {publicUnderConstructionGate.ownerGateStatus}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-lg border border-border bg-background p-4">
                  <h2 className="text-sm font-semibold text-foreground">Claim boundary</h2>
                  <p className="mt-3 font-medium text-foreground">
                    {publicUnderConstructionGate.requiredDisclaimer}
                  </p>
                  <p className="mt-3">{publicUnderConstructionGate.claimBoundary}</p>
                  <p className="mt-3">
                    <span className="font-medium text-foreground">public_claim_allowed:</span>{" "}
                    {publicUnderConstructionGate.publicClaimAllowed}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-lg border border-border bg-background">
                <table className="min-w-[880px] divide-y divide-border">
                  <thead className="bg-muted/50">
                    <tr>
                      {["Role", "Worker", "Model/provider", "Receipt status", "Evidence status"].map(
                        (heading) => (
                          <th
                            key={heading}
                            scope="col"
                            className="px-4 py-3 text-left text-sm font-medium text-foreground"
                          >
                            {heading}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {publicUnderConstructionGate.roleWorkerModelEvidence.map((item) => (
                      <tr key={item.role}>
                        <td className="px-4 py-4 align-top font-medium text-foreground">
                          {item.role}
                        </td>
                        <td className="px-4 py-4 align-top">{item.worker}</td>
                        <td className="px-4 py-4 align-top">{item.modelProvider}</td>
                        <td className="px-4 py-4 align-top">{item.receiptStatus}</td>
                        <td className="px-4 py-4 align-top">{item.evidenceStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-lg border border-border bg-background p-4">
                  <h2 className="text-sm font-semibold text-foreground">
                    Orchestration reality check
                  </h2>
                  <dl className="mt-3 grid gap-2">
                    <div className="flex flex-wrap justify-between gap-2">
                      <dt>required</dt>
                      <dd className="font-medium text-foreground">
                        {publicUnderConstructionGate.orchestrationReality.required}
                      </dd>
                    </div>
                    <div className="flex flex-wrap justify-between gap-2">
                      <dt>design</dt>
                      <dd className="font-medium text-foreground">
                        {publicUnderConstructionGate.orchestrationReality.designStatus}
                      </dd>
                    </div>
                    <div className="flex flex-wrap justify-between gap-2">
                      <dt>suitability</dt>
                      <dd className="font-medium text-foreground">
                        {publicUnderConstructionGate.orchestrationReality.suitabilityStatus}
                      </dd>
                    </div>
                    <div className="flex flex-wrap justify-between gap-2">
                      <dt>review</dt>
                      <dd className="font-medium text-foreground">
                        {publicUnderConstructionGate.orchestrationReality.reviewStatus}
                      </dd>
                    </div>
                    <div className="flex flex-wrap justify-between gap-2">
                      <dt>evidence</dt>
                      <dd className="font-medium text-foreground">
                        {publicUnderConstructionGate.orchestrationReality.evidenceStatus}
                      </dd>
                    </div>
                    <div className="flex flex-wrap justify-between gap-2">
                      <dt>false orchestration risk</dt>
                      <dd className="font-medium text-foreground">
                        {publicUnderConstructionGate.orchestrationReality.falseOrchestrationRisk}
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-3">
                    {publicUnderConstructionGate.orchestrationReality.downgradeReason}
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-background p-4">
                  <h2 className="text-sm font-semibold text-foreground">Evidence gaps</h2>
                  <ul className="mt-3 space-y-2">
                    {publicUnderConstructionGate.evidenceGaps.map((gap) => (
                      <li key={gap} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                        <span>{gap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-lg border border-border bg-background p-4">
                  <h2 className="text-sm font-semibold text-foreground">Blocked actions</h2>
                  <ul className="mt-3 space-y-2">
                    {publicUnderConstructionGate.blockedActions.map((action) => (
                      <li key={action} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <h2 className="text-sm font-semibold text-foreground">Next allowed action</h2>
                  <p className="mt-3">{publicUnderConstructionGate.nextAllowedAction}</p>
                  <p className="mt-3">
                    {publicUnderConstructionGate.orchestrationReality.nextAction}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {summaryCards.map((card) => (
              <Card key={card.label}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">{card.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold text-foreground">{card.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-6 border-amber-600/40 bg-amber-50/50 dark:bg-amber-950/10">
            <CardHeader>
              <CardTitle className="text-base">Snapshot metadata and coverage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-6 text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Schema:</span>{" "}
                {aiosMonitoringSnapshotMeta.schemaVersion}
              </p>
              <p>
                <span className="font-medium text-foreground">As of:</span>{" "}
                {aiosMonitoringSnapshotMeta.generatedAt}
              </p>
              <p>
                <span className="font-medium text-foreground">Snapshot source:</span>{" "}
                {aiosMonitoringSnapshotMeta.source}
              </p>
              <p>
                <span className="font-medium text-foreground">Coverage:</span>{" "}
                {aiosMonitoringSnapshotMeta.coverageScope}
              </p>
              <p>
                <span className="font-medium text-foreground">Data contract boundary:</span>{" "}
                {aiosMonitoringSnapshotMeta.dataContractBoundary}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30 py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">What this page answers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
                  {[
                    "Are AIOS routing and enforcement policies being followed?",
                    "Are provider, model, token, cost, and receipt signals present or missing?",
                    "Are role boundaries and role-chain dependencies respected?",
                    "Which claims are valid, downgraded, failed, escalated, or parked?",
                    "Which role owns the next unblock action?",
                    "What is missing before the next phase can safely proceed?",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">AIOS monitoring model</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    "Telemetry",
                    "Observability record",
                    "Monitoring rules",
                    "Monitoring status",
                    "Public review surface",
                  ].map((step, index, steps) => (
                    <span key={step} className="inline-flex items-center gap-2">
                      <span className="rounded-full border border-border bg-background px-3 py-1">
                        {step}
                      </span>
                      {index < steps.length - 1 ? <span>→</span> : null}
                    </span>
                  ))}
                </div>
                <p className="mt-4">
                  Monitoring is not just telemetry and not just observability. It uses both, then
                  applies rules to decide pass, fail, downgrade, escalate, or park.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {conceptLegend.map((item) => (
              <Card key={item.term}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{item.term}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-muted-foreground">
                  {item.definition}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">AIOS status flow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  {statusFlow.map((step, index) => (
                    <span key={step} className="inline-flex items-center gap-2">
                      <span className="rounded-full border border-border bg-background px-3 py-1">
                        {step}
                      </span>
                      {index < statusFlow.length - 1 ? <span>→</span> : null}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Status explanation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 text-sm leading-6 text-muted-foreground sm:grid-cols-2">
                  {statusDefinitions.map((item) => (
                    <p key={item.status}>
                      <span className="font-medium text-foreground">{item.status}:</span>{" "}
                      {item.definition}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">Claim status boundary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm leading-6 text-muted-foreground md:grid-cols-2">
              {claimStatusDefinitions.map((item) => (
                <p key={item.status}>
                  <span className="font-medium text-foreground">{item.status}:</span>{" "}
                  {item.definition}
                </p>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Card className="mb-6 border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-base">AIOS governance status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Current layer status:</span>{" "}
                PASS_WITH_CAVEAT for script/file-level enforcement checks only.
              </p>
              <p>
                Route ledger, telemetry receipt, role dependency matrix, cost-cap pre-call gate,
                provider receipt rule, and failed-claim checks are represented in the monitoring
                model. The caveat is that this page is still a static public-safe snapshot, not live
                runtime telemetry, and token/cost visibility depends on what provider receipts
                expose.
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {guidanceRecords.map((record) => (
              <Card key={record.id}>
                <CardHeader className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <CardTitle className="text-base">{record.phaseName}</CardTitle>
                    <StatusBadge status={record.overallStatus} />
                  </div>
                  <p className="text-sm text-muted-foreground">{record.publicSafeSummary}</p>
                </CardHeader>
                <CardContent className="grid gap-4 text-sm leading-6 text-muted-foreground md:grid-cols-2">
                  <p>
                    <span className="font-medium text-foreground">Why blocked or caveated:</span>{" "}
                    {record.blockReason}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Missing evidence:</span>{" "}
                    {record.missingEvidence.length > 0 ? record.missingEvidence.join(", ") : "none"}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Unblock owner:</span>{" "}
                    {record.unblockOwner}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Unblock action:</span>{" "}
                    {record.unblockAction}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Next allowed:</span>{" "}
                    {record.nextAllowedAction}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Not allowed yet:</span>{" "}
                    {record.notAllowedYet}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 overflow-x-auto rounded-lg border border-border">
            <table className="min-w-[1320px] divide-y divide-border">
              <thead className="bg-muted/50">
                <tr>
                  {[
                    "Phase / task",
                    "Status block",
                    "Role chain",
                    "Evidence presence",
                    "Provider / model",
                    "Telemetry",
                    "Unblock",
                    "Next gate",
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
              <tbody className="divide-y divide-border bg-background">
                {aiosMonitoringRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="px-4 py-4 align-top">
                      <p className="text-sm font-medium text-foreground">{record.phase}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{record.taskName}</p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {record.publicSafeSummary}
                      </p>
                    </td>
                    <td className="px-4 py-4 align-top text-xs text-muted-foreground">
                      <StatusBadge status={record.overallStatus} />
                      <div className="mt-3 grid gap-1">
                        <span>routing: {record.selectedRoute}</span>
                        <span>role dependency: {record.roleDependencyStatus}</span>
                        <span>telemetry: {record.telemetryStatus}</span>
                        <span>token: {record.tokenStatus}</span>
                        <span>cost: {record.costStatus}</span>
                        <span>cost cap: {record.costCapStatus}</span>
                        <span>source register: {record.sourceRegisterStatus}</span>
                        <span>stop condition: {record.stopConditionStatus}</span>
                        <span>claim: {record.claimStatus}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top text-sm text-muted-foreground">
                      <p className="font-medium text-foreground">{record.roleOwner}</p>
                      <p className="mt-2 text-xs">{record.expectedRoleChain}</p>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="grid min-w-[220px] gap-1 text-xs text-muted-foreground">
                        {evidenceHeadings.map(([key, label]) => (
                          <div key={key} className="flex items-center justify-between gap-3">
                            <span>{label}</span>
                            <span className="font-medium text-foreground">
                              {record.evidencePresence[key]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top text-sm text-muted-foreground">
                      <p>{record.modelProvider}</p>
                      <p className="mt-1 text-xs">requested: {record.modelRequested}</p>
                      <p className="mt-1 text-xs">returned: {record.modelReturned}</p>
                      <p className="mt-1 text-xs">receipt: {record.providerReceiptStatus}</p>
                    </td>
                    <td className="px-4 py-4 align-top text-sm text-muted-foreground">
                      <p>{record.evidenceSummary}</p>
                      {record.missingFields.length > 0 ? (
                        <p className="mt-2 text-xs">missing: {record.missingFields.join(", ")}</p>
                      ) : null}
                    </td>
                    <td className="px-4 py-4 align-top text-sm text-muted-foreground">
                      <p>{record.unblockOwner}</p>
                      <p className="mt-2 text-xs">{record.unblockAction}</p>
                    </td>
                    <td className="px-4 py-4 align-top text-sm text-muted-foreground">
                      {record.nextGate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Governance enforcement checks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="min-w-[1040px] divide-y divide-border">
                  <thead className="bg-muted/50">
                    <tr>
                      {["Control", "Status", "Evidence", "Why it matters", "Failure meaning"].map(
                        (heading) => (
                          <th
                            key={heading}
                            scope="col"
                            className="px-4 py-3 text-left text-sm font-medium text-foreground"
                          >
                            {heading}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-background">
                    {governanceEnforcementChecks.map((check) => (
                      <tr key={check.control}>
                        <td className="px-4 py-4 align-top text-sm font-medium text-foreground">
                          {check.control}
                        </td>
                        <td className="px-4 py-4 align-top text-sm text-muted-foreground">
                          {check.status}
                        </td>
                        <td className="px-4 py-4 align-top text-sm text-muted-foreground">
                          {check.evidence}
                        </td>
                        <td className="px-4 py-4 align-top text-sm text-muted-foreground">
                          {check.meaning}
                        </td>
                        <td className="px-4 py-4 align-top text-sm text-muted-foreground">
                          {check.failureMeaning}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t border-border py-10">
        <div className="mx-auto grid max-w-5xl gap-4 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Token / cost / usage visibility</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-sm leading-6 text-muted-foreground">
                {tokenCostUsageVisibility.map((item) => (
                  <li key={item.signal} className="rounded-lg border border-border p-3">
                    <p className="font-medium text-foreground">{item.signal}</p>
                    <p className="mt-1">{item.status}</p>
                    <p className="mt-1 text-xs">{item.behavior}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role dependency principle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">
                  Right worker is not enough.
                </span>{" "}
                Right role chain must be proven before execution.
              </p>
              <p>
                <span className="font-medium text-foreground">
                  No role matrix, no AIOS proof.
                </span>{" "}
                Missing or unresolved role dependencies downgrade useful work to local draft status
                until the gate is corrected.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Phase / agent activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="min-w-[1040px] divide-y divide-border">
                  <thead className="bg-muted/50">
                    <tr>
                      {["Phase", "Role / team", "Worker", "Status", "Output", "Next gate"].map(
                        (heading) => (
                          <th
                            key={heading}
                            scope="col"
                            className="px-4 py-3 text-left text-sm font-medium text-foreground"
                          >
                            {heading}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-background">
                    {phaseAgentActivity.map((item) => (
                      <tr key={item.phase}>
                        <td className="px-4 py-4 align-top text-sm font-medium text-foreground">
                          {item.phase}
                        </td>
                        <td className="px-4 py-4 align-top text-sm text-muted-foreground">
                          {item.roleTeam}
                        </td>
                        <td className="px-4 py-4 align-top text-sm text-muted-foreground">
                          {item.worker}
                        </td>
                        <td className="px-4 py-4 align-top text-sm text-muted-foreground">
                          {item.status}
                        </td>
                        <td className="px-4 py-4 align-top text-sm text-muted-foreground">
                          {item.output}
                        </td>
                        <td className="px-4 py-4 align-top text-sm text-muted-foreground">
                          {item.nextGate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-10">
        <div className="mx-auto grid max-w-5xl gap-4 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {aiosMonitoringRuleGroups.map((group) => (
            <Card key={group.title}>
              <CardHeader>
                <CardTitle className="text-base">{group.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {group.rules.map((rule) => (
                    <li key={rule} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-border py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Deferred / not complete yet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="min-w-[880px] divide-y divide-border">
                  <thead className="bg-muted/50">
                    <tr>
                      {["Item", "Status", "Meaning"].map((heading) => (
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
                  <tbody className="divide-y divide-border bg-background">
                    {deferredForV02.map((item) => (
                      <tr key={item.item}>
                        <td className="px-4 py-4 align-top text-sm font-medium text-foreground">
                          {item.item}
                        </td>
                        <td className="px-4 py-4 align-top text-sm text-muted-foreground">
                          {item.status}
                        </td>
                        <td className="px-4 py-4 align-top text-sm text-muted-foreground">
                          {item.meaning}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t border-border py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Card className="border-amber-600/40 bg-amber-50/50 dark:bg-amber-950/10">
            <CardHeader>
              <CardTitle className="text-base">Fail-closed render rule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-6 text-muted-foreground">
              <p>{aiosMonitoringSnapshotMeta.failClosedRule}</p>
              <p>
                If this snapshot is missing, stale, malformed, or disconnected from enforcement
                outputs, the surface must not claim AIOS proof. It should show under construction,
                stale, failed, downgraded, or needs-review status instead.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  )
}
