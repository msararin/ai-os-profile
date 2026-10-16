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
        <section id="exp3-data-preparation-changes" className="mt-6 border-t border-slate-200 pt-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">Data preparation changes · Design agreed — implementation pending</p>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">ปรับการเตรียมข้อมูลให้ฝึกการตัดสินใจทางธุรกิจได้</h3>
          <p className="mt-1 text-sm font-medium text-slate-600">Business-grounded synthetic data preparation</p>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-700">
              <p>ปรับทิศทางการเตรียมข้อมูลจากโลกจำลองที่จับคู่กลุ่มลูกค้ากับ offer แบบง่าย เป็นการเลือกแพ็กเกจเสริม ณ เวลาที่ลูกค้าเปิดหน้าตรวจการใช้งาน โดยเลือกไม่เสนอได้ ข้อมูลชุดใหม่จะสะท้อนโควตาคงเหลือ อายุแพ็กเกจ การใช้งานย้อนหลัง สิทธิ์ที่มีอยู่ และประวัติการเสนอ พร้อมตรวจสิทธิ์และความเข้ากันได้ก่อนให้ ML เลือก</p>
              <p className="mt-3">แยกข้อเสนอที่แสดงออกจากแพ็กเกจที่ซื้อจริง และจำลองการซื้อเองแม้ไม่ได้รับข้อเสนอ รุ่นแรกใช้หนึ่งการตัดสินใจต่อลูกค้า ติดตาม 7 วัน และซื้อได้ไม่เกินหนึ่งแพ็กเกจ เป้าหมายคือมูลค่าสุทธิจำลองภายใต้เกณฑ์ความเหมาะสมกับลูกค้า ไม่ใช่จำนวนการซื้ออย่างเดียว</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-700">
              <p>The new data-preparation design models a usage-check add-on recommendation, including NO_OFFER, rather than a simple segment-to-offer mapping. It separates displayed actions from actual purchases and allows organic purchases.</p>
              <p className="mt-3">The first cycle uses one decision, a seven-day purchase window and at most one purchase. The objective is simulated net contribution subject to suitability constraints. Catalogue prices and costs are versioned assumptions; oracle outputs stay outside training. ML will be compared with a reasoned business-rule baseline.</p>
            </div>
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-500"><strong>Boundary:</strong> Design agreed; implementation pending. Prices, costs and behavior are experimental assumptions, not operator economics. No data has been generated and no model has been trained. Historical B1 remains open; B1_COMPLETE = NO. This change does not conclude that the historical data cannot support learning.</p>
        </section>
        <p className="mt-4 text-sm leading-6 text-slate-600"><strong>Evidence boundary:</strong> the direction record is committed on the Experiment 3 evidence branch. The new execution contract, fixed metrics and budget, implementation, training, and fresh-process recovery test remain pending.</p>
      </Panel>
    </div>
    <nav aria-label="Saved experiments" className="flex flex-wrap gap-2">{editions.map(item=><a key={item.key} href={`?experiment=${item.key}`} aria-current={item.key===selected.key?"page":undefined} className={`rounded-lg border px-4 py-2 text-sm ${item.key===selected.key?"border-teal-800 bg-teal-800 text-white":"border-slate-300 bg-white text-slate-700"}`}>{item.label}</a>)}</nav>
    {entry?<><p className="text-sm text-slate-600">กดหัวข้อในหน้าเพื่อขยายอ่านรายละเอียดได้ · <a className="underline" href={`/api/cockpit/preview/${entry.id}`} target="_blank" rel="noreferrer">เปิดฉบับเต็มในแท็บใหม่ ↗</a></p><iframe key={entry.id} title={`NBO NRT learning journal — ${selected.label}`} src={`/api/cockpit/preview/${entry.id}`} sandbox="allow-same-origin" referrerPolicy="no-referrer" className="h-[85vh] min-h-[640px] w-full rounded-xl border border-slate-200 bg-white"/><p className="text-xs leading-6 text-slate-500">Preserved published edition · source 54f5b447 · Rendered reading copy with expandable sections and experiment links. Original source files remain in Evidence.</p></>:<Empty>This saved edition is unavailable. Its content has not been replaced with an inferred reconstruction.</Empty>}
  </div>
}