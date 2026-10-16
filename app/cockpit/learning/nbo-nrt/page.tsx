import { requireOwner } from "@/lib/owner-access"
import { privateIndex } from "@/lib/cockpit/store"
import { Empty, Panel, PrivateLink } from "@/components/cockpit-ui"

const editions = [{key:"one",label:"Experiment 1"},{key:"two-a",label:"Experiment 2A"},{key:"two-b",label:"Experiment 2B"},{key:"three",label:"Experiment 3"}]

export default async function LearningJournal({searchParams}:{searchParams:Promise<{experiment?:string}>}) {
  await requireOwner()
  const {experiment}=await searchParams
  const selected=editions.find(item=>item.key===experiment)??editions[3]
  const manifest=await privateIndex()
  const entry=manifest?.entries.find(item=>item.title===`cockpit/learning/nbo-nrt/${selected.key}.html`)
  return <div className="space-y-5">
    <PrivateLink href="/cockpit/experiments">← Experiments</PrivateLink>
    <div><p className="text-xs font-semibold uppercase tracking-widest text-teal-700">Private learning journal</p><h1 className="mt-2 text-3xl font-semibold">NBO / NRT — บันทึกการเรียนรู้</h1><p className="mt-3 text-sm leading-7 text-slate-600">ฉบับล่าสุดที่เคยเผยแพร่ก่อนปรับหน้าสาธารณะ เก็บลำดับเรื่อง มุมมอง Business / Models / Engineering และรายละเอียดการทดลองไว้สำหรับกลับมาอ่านทบทวน สถานะและผลทดลองเป็นข้อมูลตามฉบับเดิม</p></div>
    <div id="exp3-current-direction">
      <Panel title="Current direction before 3B">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">Owner accepted · execution contract pending · 16 October 2026</p>
        <h2 className="mt-3 text-xl font-semibold text-slate-900">Backward design: learn what good looks like before continuing 3B</h2>
        <p className="mt-3 leading-7 text-slate-700">The available data makes it difficult to observe and evaluate the complete learning loop cleanly. Before continuing 3B, the experiment will therefore work backward from an explicit definition of a good end-to-end learning cycle, using a separately versioned synthetic, known-ground-truth extension.</p>
        <dl className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-4"><dt className="font-semibold text-slate-900">What we want to learn</dt><dd className="mt-2 text-sm leading-6 text-slate-600">Data → validation → learning → evaluation → save/reload → fresh-process reproducibility, with preregistered positive and null-control scenarios.</dd></div>
          <div className="rounded-lg border border-slate-200 bg-white p-4"><dt className="font-semibold text-slate-900">What remains unchanged</dt><dd className="mt-2 text-sm leading-6 text-slate-600">Preserve the original dataset, contract, checkpoint and results. Historical TEST remains untouched. B1 is not complete, 3B has not started, and no production uplift is claimed.</dd></div>
        </dl>
        <section id="exp3-business-frame" className="mt-6 border-t border-slate-200 pt-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">Primary business case</p>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">Choose the add-on package that best fits the need at that moment</h3>
          <p className="mt-3 text-sm leading-6 text-slate-700">ML will compete with a reasoned business-rule baseline. High data usage alone is not enough: real add-ons differ by allowance, speed, validity period, post-quota behavior, and voice-call conditions.</p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="min-w-[760px] w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-800"><tr><th className="px-4 py-3 font-semibold">Element</th><th className="px-4 py-3 font-semibold">Agreed design boundary</th></tr></thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr><th className="px-4 py-3 align-top font-semibold text-slate-800">Decision point</th><td className="px-4 py-3">Customer opens the usage view in the app; show one offer or show no offer.</td></tr>
                <tr><th className="px-4 py-3 align-top font-semibold text-slate-800">Context</th><td className="px-4 py-3">Remaining quota, days to package expiry, recent usage, active add-ons, offer history, and relevant product attributes.</td></tr>
                <tr><th className="px-4 py-3 align-top font-semibold text-slate-800">Eligible actions</th><td className="px-4 py-3">Short-duration data, long-duration data, voice minutes, combined data and voice, or no offer.</td></tr>
                <tr><th className="px-4 py-3 align-top font-semibold text-slate-800">Before ML</th><td className="px-4 py-3">Enforce purchase eligibility, package compatibility, contact limits, and product-specific data or voice restrictions.</td></tr>
                <tr><th className="px-4 py-3 align-top font-semibold text-slate-800">Baseline</th><td className="px-4 py-3">Select the lowest-priced eligible package that covers estimated need; choose no offer when no need is estimated.</td></tr>
                <tr><th className="px-4 py-3 align-top font-semibold text-slate-800">Measured outcomes</th><td className="px-4 py-3">Simulated net value, purchase, offer suitability, and offer frequency.</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-500">Design input validated against the current structure of <a className="underline" href="https://www.ais.th/consumers/package/addon/internet" target="_blank" rel="noreferrer">AIS add-on package information ↗</a>. This is market grounding, not implementation or outcome evidence.</p>
        </section>
        <p className="mt-4 text-sm leading-6 text-slate-600"><strong>Evidence boundary:</strong> the direction record is committed on the Experiment 3 evidence branch. The new execution contract, fixed metrics and budget, implementation, training, and fresh-process recovery test remain pending.</p>
      </Panel>
    </div>
    <nav aria-label="Saved experiments" className="flex flex-wrap gap-2">{editions.map(item=><a key={item.key} href={`?experiment=${item.key}`} aria-current={item.key===selected.key?"page":undefined} className={`rounded-lg border px-4 py-2 text-sm ${item.key===selected.key?"border-teal-800 bg-teal-800 text-white":"border-slate-300 bg-white text-slate-700"}`}>{item.label}</a>)}</nav>
    {entry?<><p className="text-sm text-slate-600">กดหัวข้อในหน้าเพื่อขยายอ่านรายละเอียดได้ · <a className="underline" href={`/api/cockpit/preview/${entry.id}`} target="_blank" rel="noreferrer">เปิดฉบับเต็มในแท็บใหม่ ↗</a></p><iframe key={entry.id} title={`NBO NRT learning journal — ${selected.label}`} src={`/api/cockpit/preview/${entry.id}`} sandbox="allow-same-origin" referrerPolicy="no-referrer" className="h-[85vh] min-h-[640px] w-full rounded-xl border border-slate-200 bg-white"/><p className="text-xs leading-6 text-slate-500">Preserved published edition · source 54f5b447 · Rendered reading copy with expandable sections and experiment links. Original source files remain in Evidence.</p></>:<Empty>This saved edition is unavailable. Its content has not been replaced with an inferred reconstruction.</Empty>}
  </div>
}
