import { library, readableTitle, type JsonValue } from "@/lib/cockpit/library"
import { Panel, PrivateLink, Table, Empty } from "./cockpit-ui"
export function RecordedValue({value,depth=0}:{value:JsonValue;depth?:number}) {
  if(value===null)return <span className="italic text-slate-500">Not recorded</span>
  if(typeof value!=="object")return <span className="whitespace-pre-wrap break-words">{String(value)}</span>
  if(depth>12)return <pre className="overflow-auto">{JSON.stringify(value,null,2)}</pre>
  if(Array.isArray(value)) {
    if(!value.length)return <span>No entries in this source</span>
    if(value.every(row=>Array.isArray(row)&&row.every(v=>v===null||typeof v!=="object")))return <Table headings={Array.from({length:Math.max(...value.map(r=>(r as JsonValue[]).length))},(_,i)=>i===0?"Item":`Recorded field ${i+1}`)} rows={value.map(r=>(r as JsonValue[]).map((v,i)=><RecordedValue key={i} value={v} depth={depth+1}/>))}/>
    return <div className="space-y-4">{value.map((v,i)=><div key={i} className="rounded-lg border border-slate-200 p-4"><RecordedValue value={v} depth={depth+1}/></div>)}</div>
  }
  return <dl className="space-y-3">{Object.entries(value).map(([key,v])=><div key={key} className="border-b border-slate-100 pb-3"><dt className="mb-1 font-semibold text-slate-800">{key.replace(/([a-z])([A-Z])/g,'$1 $2')}</dt><dd><RecordedValue value={v} depth={depth+1}/></dd></div>)}</dl>
}
export async function LibraryPanel({section,query=""}:{section:string;query?:string}) {
  const data=await library(section,query)
  return <Panel title="Saved reports and implementation detail"><p>Browse the preserved work behind this dashboard. Statuses and dates inside each report belong to its saved source version.</p>
    <form className="my-5 flex flex-wrap gap-3"><label className="grow">Search saved titles<input aria-label="Search saved titles" name="q" defaultValue={query} maxLength={160} placeholder="e.g. experiment3, monitoring, recovery" className="mt-1 block w-full rounded-lg border p-3"/></label><button className="self-end rounded-lg bg-slate-900 px-5 py-3 text-white">Search</button></form>
    <p className="mb-4">{data.entries.length} matching records · {data.total} saved files in the library</p>
    {!data.available?<Empty>Private library could not be read. Retry this page; no records have been deleted.</Empty>:<div className="grid gap-4 lg:grid-cols-2">{data.entries.map(e=><article key={e.id} className="rounded-lg border p-4"><h3 className="break-words font-semibold"><PrivateLink href={"/cockpit/evidence/"+e.id}>{readableTitle(e.title)}</PrivateLink></h3><p className="mt-2 text-xs break-all">{e.title}</p><p className="mt-2 text-xs">Saved {e.kind} · {e.bytes.toLocaleString()} bytes</p></article>)}</div>}
  </Panel>
}
