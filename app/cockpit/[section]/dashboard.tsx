import { notFound } from "next/navigation"
import { requireOwner } from "@/lib/owner-access"
import { operations } from "@/lib/cockpit/operations"
import { Panel, Table, PrivateLink } from "@/components/cockpit-ui"
import { LibraryPanel } from "@/components/cockpit-library"
const sections:Record<string,string>={workstreams:"Workstreams",evidence:"Evidence receipts",methodology:"Methodology",experiments:"Experiments",deployments:"Deployments",security:"Security / Audit"}
export default async function Dashboard({params,searchParams}:{params:Promise<{section:string}>;searchParams:Promise<{q?:string}>}) {
  await requireOwner()
  const {section}=await params;if(!sections[section])notFound()
  const {q=""}=await searchParams,{data}=await operations()
  return <div className="space-y-6"><h1 className="text-3xl font-semibold">{sections[section]}</h1><p className="text-sm text-slate-600">Recorded operations and saved reports. Each source keeps its own dates and scope; saved statuses are not live monitoring.</p>
    {section==="workstreams"&&data&&<Panel title="Recorded workstreams"><Table headings={["Workstream","Recorded status / gate","Owner","Next action","Evidence"]} rows={data.workstreams.map(w=>[w.title,w.status+' / '+(w.gate??'Not recorded'),w.owner,w.nextAction,<PrivateLink key={w.id} href="/cockpit/telemetry?view=runs&days=30">Inspect recorded runs →</PrivateLink>])}/></Panel>}
    {section==="deployments"&&<><Panel title="Deployment receipts"><p className="mb-4">Verified at the receipt timestamp. Open a receipt for the commit, deployment identifier, aliases and verification source.</p><Table headings={["Deployment","Recorded at","Environment","Recorded status","Detail"]} rows={(data?.deployments??[]).map(d=>[d.id,d.timestamp,d.environment,d.status,d.evidenceId?<PrivateLink key={d.id} href={"/cockpit/evidence/"+d.evidenceId}>Open deployment receipt →</PrivateLink>:"No receipt"])} /></Panel>
      <Panel title="Serving build"><p className="break-all">Commit: {process.env.VERCEL_GIT_COMMIT_SHA??"Local build; no platform commit metadata"}</p><p className="break-all">Deployment: {process.env.VERCEL_DEPLOYMENT_ID??process.env.VERCEL_URL??"Local preview"}</p><p className="mt-2">Platform metadata for this serving process, separate from saved deployment verification receipts.</p></Panel></>}
    {section==="experiments"&&<Panel title="Experiment workspace"><p className="mb-4"><PrivateLink href="/cockpit/learning/nbo-nrt">NBO / NRT — บันทึกการเรียนรู้ · latest published edition →</PrivateLink></p><div className="grid gap-4 md:grid-cols-3"><PrivateLink href="/cockpit/experiments?q=experiment">Experiment phases and results →</PrivateLink><PrivateLink href="/cockpit/experiments?q=engineering">Engineering evidence →</PrivateLink><PrivateLink href="/cockpit/experiments?q=data-preparation">Data preparation →</PrivateLink></div><p className="mt-4">Read saved phases, model metrics, decisions and recovery evidence. Report statuses retain their original experimental scope.</p></Panel>}
    {section==="evidence"&&data&&<Panel title="Recorded verification receipts"><Table headings={["Claim","Producer / verifier","Result","Detail"]} rows={data.receipts.map(e=>[e.claim,e.producer+' / '+(e.verifier??'Not recorded'),e.validationState,e.artifactId?<PrivateLink key={e.id} href={"/cockpit/evidence/"+e.artifactId}>Read receipt →</PrivateLink>:e.limitations])}/></Panel>}
    {section==="security"&&<Panel title="Access and audit"><p>Every page, report and preview checks the configured Google owner identity. Sessions expire after eight hours. Logout removes this browser session; a copied JWT remains valid until expiry. Individual session revocation is not implemented.</p><p className="mt-3">Access-denied and export events go to hosting logs; no durable audit-log query is connected. Saved governance and authorization records are available below, distinct from live access events.</p></Panel>}
    <LibraryPanel section={section} query={q}/>
  </div>
}
