import { notFound } from "next/navigation"
import { requireOwner } from "@/lib/owner-access"
import { readableReport, readableTitle } from "@/lib/cockpit/library"
import { Panel, PrivateLink } from "@/components/cockpit-ui"
import { RecordedValue } from "@/components/cockpit-library"
export default async function Evidence({ params }: { params: Promise<{ id: string }> }) {
  await requireOwner()
  const { id } = await params, result = await readableReport(id)
  if (!result) notFound()
  const {original:{entry,bytes},report}=result
  const visual=/\.(html|svg|pdf)$/i.test(entry.title)
  return <div className="space-y-6"><PrivateLink href="/cockpit/evidence">← All saved evidence</PrivateLink><h1 className="break-words text-3xl font-semibold">{readableTitle(entry.title)}</h1>
    <p className="text-sm text-slate-600">Saved report · source status and dates are historical. Original content remains available below.</p>
    {visual&&<Panel title="Preserved report"><iframe title="Preserved report" sandbox="" referrerPolicy="no-referrer" src={"/api/cockpit/preview/"+id} className="h-[75vh] w-full rounded-lg border"/><p className="mt-3"><PrivateLink href={"/api/cockpit/artifacts/"+id}>Download original</PrivateLink></p></Panel>}
    {report&&<><Panel title="Report contents"><nav className="flex flex-wrap gap-3">{report.sections.map((s,i)=><a key={i} href={"#section-"+i} className="text-teal-700 underline">{s.title.replace(/([a-z])([A-Z])/g,'$1 $2')}</a>)}{report.text.length>0&&<a href="#narrative" className="text-teal-700 underline">Narrative</a>}</nav><p className="mt-3">Tables and text were extracted without running archived code. Unresolved source expressions are shown explicitly; source view retains the exact original.</p></Panel>
      {report.sections.map((s,i)=><section id={"section-"+i} key={i}><Panel title={s.title.replace(/([a-z])([A-Z])/g,'$1 $2')}><RecordedValue value={s.value}/></Panel></section>)}
      {report.text.length>0&&<section id="narrative"><Panel title="Saved narrative"><div className="space-y-4">{report.text.map((t,i)=><p key={i} className="whitespace-pre-wrap break-words">{t}</p>)}</div></Panel></section>}
    </>}
    <Panel title="Original source and provenance"><p className="break-all">{entry.title}</p><p className="mt-2 break-all">SHA-256: {entry.sha256}</p><p>{entry.bytes.toLocaleString()} bytes · original content verified before read · historical source, not an independent verification of its claims</p><p className="mt-3"><PrivateLink href={"/api/cockpit/artifacts/"+id}>Download preserved artifact</PrivateLink></p>
    {!visual&&<details className="mt-5" open={!report||(!report.sections.length&&!report.text.length)}><summary className="cursor-pointer font-semibold">Exact source</summary><pre className="mt-3 max-h-[65vh] overflow-auto rounded-lg bg-slate-50 p-4 text-xs leading-6">{bytes.toString("utf8")}</pre></details>}</Panel>
  </div>
}
