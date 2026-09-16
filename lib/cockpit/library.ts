import "server-only"
import { createHash } from "node:crypto"
import { z } from "zod"
import { privateArtifact, privateIndex } from "./store"
import { requireOwner } from "@/lib/owner-access"
export type JsonValue = string | number | boolean | null | JsonValue[] | { [key:string]: JsonValue }
const jsonValue: z.ZodType<JsonValue> = z.lazy(()=>z.union([z.string().max(100000),z.number(),z.boolean(),z.null(),z.array(jsonValue).max(10000),z.record(jsonValue)]))
const reportSchema=z.object({version:z.literal(1),sourceId:z.string(),sourceSha256:z.string(),sections:z.array(z.object({title:z.string(),value:jsonValue})),text:z.array(z.string())}).strict()
export const reportId=(id:string)=>createHash("sha256").update("readable:"+id).digest("hex").slice(0,24)
export const operationsArtifactId=createHash("sha256").update("cockpit/recorded-operations.json").digest("hex").slice(0,24)
export function belongs(title:string,section:string) {
  if(section==="evidence")return true
  const patterns:Record<string,RegExp>={deployments:/deploy|runtime|monitoring|engineering-evidence|recovery|achievements/i,experiments:/experiment|nbo|churn|case-003|data-preparation|model/i,workstreams:/workstream|monitoring|agent-review|case-studies|execution|org-roles/i,methodology:/architecture|org-roles|ai-operating|how-we|principle|lib\//i,security:/auth|access|governance|custodian|control|security/i,telemetry:/telemetry|monitoring|observability|measurement|receipt|review/i}
  return Boolean(patterns[section]?.test(title))
}
export function readableTitle(title:string) {
  const names:Record<string,string>={
    'app/case-studies/nbo-nrt-azure-databricks/experiment-tabs.tsx':'NBO / NRT — Experiment phases, metrics and preparation',
    'app/case-studies/nbo-nrt-azure-databricks/engineering-evidence-lens.tsx':'NBO / NRT — Engineering and deployment evidence',
    'app/case-studies/nbo-nrt-azure-databricks/models-experiments-lens.tsx':'NBO / NRT — Models and experiment decisions',
    'app/case-studies/nbo-nrt-azure-databricks/business-decisions-lens.tsx':'NBO / NRT — Business decisions',
    'lib/aios-monitoring-snapshot.ts':'AIOS monitoring — Saved workstreams, routes and gates',
    'lib/aios-agent-review-dashboard-snapshot.ts':'Agent review — Saved decisions and evidence',
    'app/achievements/page.tsx':'Achievements — Detailed results and supporting evidence',
  }
  return names[title]??title.replace(/^app\//,'').replace(/\/page\.tsx$/,'').replace(/\.(tsx?|json|html|svg|pdf)$/,'').replace(/[-_]/g,' ').replace(/\//g,' › ')
}
export async function library(section="evidence",query="") {
  await requireOwner()
  const index=await privateIndex(),q=query.trim().slice(0,160).toLowerCase()
  const originals=index?.entries.filter(e=>!e.title.startsWith("cockpit/readable/")&&e.id!==operationsArtifactId)??[]
  return {sourceCommit:index?.sourceCommit??null,total:originals.length,available:Boolean(index),entries:originals.filter(e=>belongs(e.title,section)&&(!q||e.title.toLowerCase().includes(q)))}
}
export async function readableReport(id:string) {
  await requireOwner()
  const original=await privateArtifact(id)
  if(!original)return null
  const derived=await privateArtifact(reportId(id))
  if(!derived)return {original,report:null}
  try {
    const parsed=reportSchema.safeParse(JSON.parse(derived.bytes.toString("utf8")))
    if(!parsed.success||parsed.data.sourceId!==id||parsed.data.sourceSha256!==original.entry.sha256)return {original,report:null}
    return {original,report:parsed.data}
  } catch {return {original,report:null}}
}
