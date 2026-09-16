import { historicalTelemetry } from "@/lib/cockpit/history"
import { Panel, Empty, Table, PrivateLink, Tag } from "@/components/cockpit-ui"

export async function HistoryView() {
  const data = await historicalTelemetry(), spend = data.spend.status === "AVAILABLE" ? data.spend.value : null
  return <div className="space-y-6">
    <Panel title="Historical telemetry · all available evidence">
      <p>The previous telemetry results are available here. These are archived captures and bounded aggregates, separate from current executions.</p>
      <p className="mt-3">Snapshot: {data.generatedAt} · Source: {data.source} · Source freshness: {data.sourceFreshness} · Checksum prefix: <code>{data.sourceChecksumPrefix}</code></p>
      <p className="mt-3">{data.claimBoundary} Dates below are source-artifact dates, not verified execution timestamps. The current Today / 7 / 30 day controls do not filter this archive.</p>
      <div className="mt-4 flex flex-wrap gap-3">{["model","task","gate","claim","advisory"].map(kind=><a key={kind} href={"#history-"+kind} className="font-medium text-teal-700 underline">{kind}: {data.records.filter(r=>r.kind===kind).length} records</a>)}</div>
    </Panel>
    <Panel title="Recorded spend snapshot">
      {spend ? <><Tag>{spend.state} · bounded aggregate</Tag><p className="my-3">Period: {spend.periodStart} through {spend.periodEnd}. {spend.populationCount} source rows; {spend.numericCostRowCount} with numeric cost; {spend.nullCostRowCount} unavailable. Groups are not individual run receipts. Estimated and source-labelled provider-reported amounts remain separate; this is not a complete bill.</p><Table headings={["Provider / model","Cost provenance","Numeric source rows","USD subtotal"]} rows={spend.groups.map(g=>[g.provider+" / "+g.model,g.costSource,g.numericRowCount,g.costUsd.toFixed(4)])}/></> : <Empty>No validated recorded-spend snapshot is configured. The archived records below remain available.</Empty>}
    </Panel>
    {["model","task","gate","claim","advisory"].map(kind=><section key={kind} id={"history-"+kind}><Panel title={{model:"Captured provider / model records",task:"Historical task records",gate:"Governance gate records",claim:"Claim movement records",advisory:"Advisory records"}[kind]!}>
      <Table headings={["Record / drill-down","Artifact date","Captured context","Claim / status"]} rows={data.records.filter(r=>r.kind===kind).map(r=>[<PrivateLink key={r.id} href={"/cockpit/telemetry/history/"+r.id}>{r.title}</PrivateLink>,r.artifactDate ?? "Not exposed",kind==="model"?`${r.fields.provider ?? "Not exposed"} / ${r.fields.returnedModel ?? "Not exposed"}`:r.fields.entityType ?? r.fields.dataSourceType ?? kind,r.fields.claimLevel ?? r.fields.gateStatus ?? r.fields.claimAfter ?? "Not exposed"])}/>
    </Panel></section>)}
    <Panel title="Preserved synthetic / backfill spend · separate population">
      <p>{data.preservedSpend.period.start} through {data.preservedSpend.period.end}. {data.preservedSpend.populationCount} source rows; {data.preservedSpend.nullCostRowCount} missing cost. Classification: {data.preservedSpend.classification}. Operational claim: {data.preservedSpend.operationalClaim}. Not added to the recorded-spend snapshot above.</p>
      <Table headings={["Provider / model","Source","Numeric rows","USD subtotal"]} rows={data.preservedSpend.groups.map(g=>[g.provider+" / "+g.model,g.costSource,g.numericRowCount,g.costUsd.toFixed(4)])}/>
    </Panel>
  </div>
}
