import { requireOwner } from "@/lib/owner-access"
import { privateIndex } from "@/lib/cockpit/store"
import { Empty, Panel, PrivateLink } from "@/components/cockpit-ui"

const editions = [{key:"one",label:"Experiment 1"},{key:"two-a",label:"Experiment 2A"},{key:"two-b",label:"Experiment 2B"},{key:"three",label:"Experiment 3"},{key:"four",label:"Experiment 4"}]

export default async function LearningJournal({searchParams}:{searchParams:Promise<{experiment?:string}>}) {
  await requireOwner()
  const {experiment}=await searchParams
  const selected=editions.find(item=>item.key===experiment)??editions[3]
  const manifest=await privateIndex()
  const entry=manifest?.entries.find(item=>item.title===`cockpit/learning/nbo-nrt/${selected.key}.html`)
  return <div className="space-y-5">
    <PrivateLink href="/cockpit/experiments">← Experiments</PrivateLink>
    <div><p className="text-xs font-semibold uppercase tracking-widest text-teal-700">Private learning journal</p><h1 className="mt-2 text-3xl font-semibold">NBO / NRT — บันทึกการเรียนรู้</h1><p className="mt-3 text-sm leading-7 text-slate-600">ฉบับล่าสุดที่เคยเผยแพร่ก่อนปรับหน้าสาธารณะ เก็บลำดับเรื่อง มุมมอง Business / Models / Engineering และรายละเอียดการทดลองไว้สำหรับกลับมาอ่านทบทวน สถานะและผลทดลองเป็นข้อมูลตามฉบับเดิม</p></div>
    <nav aria-label="Saved experiments" className="flex flex-wrap gap-2">{editions.map(item=><a key={item.key} href={`?experiment=${item.key}`} aria-current={item.key===selected.key?"page":undefined} className={`rounded-lg border px-4 py-2 text-sm ${item.key===selected.key?"border-teal-800 bg-teal-800 text-white":"border-slate-300 bg-white text-slate-700"}`}>{item.label}</a>)}</nav>
    {selected.key!=="four"&&(entry?<><p className="text-sm text-slate-600">กดหัวข้อในหน้าเพื่อขยายอ่านรายละเอียดได้ · <a className="underline" href={`/api/cockpit/preview/${entry.id}`} target="_blank" rel="noreferrer">เปิดฉบับเต็มในแท็บใหม่ ↗</a></p><iframe key={entry.id} title={`NBO NRT learning journal — ${selected.label}`} src={`/api/cockpit/preview/${entry.id}`} sandbox="allow-same-origin" referrerPolicy="no-referrer" className="h-[85vh] min-h-[640px] w-full rounded-xl border border-slate-200 bg-white"/><p className="text-xs leading-6 text-slate-500">Preserved published edition · source 54f5b447 · Rendered reading copy with expandable sections and experiment links. Original source files remain in Evidence.</p></>:<Empty>This saved edition is unavailable. Its content has not been replaced with an inferred reconstruction.</Empty>)}
    {selected.key==="three"&&<div id="exp3-current-direction">
      <Panel title="Experiment 3 — Paused; B1 incomplete">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">Data preparation change · historical edition preserved · 16 October 2026</p>
        <section id="exp3-data-preparation-changes">
          <h2 className="mt-3 text-xl font-semibold text-slate-900">พักเส้นทางเดิมและแยกโจทย์ใหม่เป็น Experiment 4</h2>
          <p className="mt-3 leading-7 text-slate-700">Exact context–action pairs in TRAIN are sparse and the B1 support-classification criteria remain incomplete. The 8,002 rows imply 38,300 pairs: 30,604 have no observed example and 7,653 appear once. Therefore B1_COMPLETE = NO.</p>
          <p className="mt-3 leading-7 text-slate-700">This does not prove that the original data cannot learn by every method, and zero observed count is not zero logging propensity. The pause is a scope decision, not a formal support-test failure.</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">The original dataset, contract, checkpoint and results remain preserved. Historical TEST remains untouched; 3B has not started and no production uplift is claimed. The new business framing continues in the next tab as Experiment 4.</p>
        </section>
      </Panel>
    </div>}
    {selected.key==="four"&&<div id="exp4-roadmap">
      <Panel title="Experiment 4 — Business-grounded Package-fit Learning">
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">Backward-design roadmap · G2 current · execution contract pending</p>
        <h2 className="mt-3 text-xl font-semibold text-slate-900">เรียนรู้ว่าแพ็กเกจเสริมใดเหมาะกับ context นี้—or NO_OFFER</h2>
        <p className="mt-3 leading-7 text-slate-700">Backward design starts with what must be proved at the end, then works backward through constraints, data separation, baselines, null control, evaluation and reproducibility before generating data or training a model. ML is not required to beat the business-rule baseline.</p>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-700"><p className="font-semibold text-slate-900">Business decision</p><p className="mt-2">At usage check, select an eligible add-on or NO_OFFER using quota, expiry, usage history, purchase eligibility and contact constraints.</p></div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-700"><p className="font-semibold text-slate-900">Evidence discipline</p><p className="mt-2">Recommendation and actual purchase remain separate, including organic or different-product purchases. Oracle outputs stay outside training; a reasoned baseline and equal-expected-reward control are retained.</p></div>
        </div>
        <section id="exp4-gates" className="mt-6">
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="min-w-[760px] w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-800"><tr><th className="px-4 py-3 font-semibold">Gate</th><th className="px-4 py-3 font-semibold">ขั้น / Stage</th><th className="px-4 py-3 font-semibold">สถานะ / Status</th></tr></thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr><th className="px-4 py-3 font-semibold text-slate-800">E4-G1</th><td className="px-4 py-3">กำหนดโจทย์และเกณฑ์จบ / Define question and completion criteria</td><td className="px-4 py-3">IN_PROGRESS — design drafted; contract not frozen</td></tr>
                <tr><th className="px-4 py-3 font-semibold text-slate-800">E4-G2</th><td className="px-4 py-3">ตรวจโลกจำลองและกฎธุรกิจ / Validate simulator and business rules</td><td className="px-4 py-3">CURRENT — ledger/contact 17 checks pass only</td></tr>
                <tr><th className="px-4 py-3 font-semibold text-slate-800">E4-G3</th><td className="px-4 py-3">สร้างและตรวจข้อมูล / Generate and validate data</td><td className="px-4 py-3">NOT_STARTED</td></tr>
                <tr><th className="px-4 py-3 font-semibold text-slate-800">E4-G4</th><td className="px-4 py-3">สร้างตัวเปรียบเทียบ / Establish baselines</td><td className="px-4 py-3">NOT_STARTED</td></tr>
                <tr><th className="px-4 py-3 font-semibold text-slate-800">E4-G5</th><td className="px-4 py-3">ฝึกโมเดลและสร้างวิธีเลือก offer / Train model and derive policy</td><td className="px-4 py-3">NOT_STARTED</td></tr>
                <tr><th className="px-4 py-3 font-semibold text-slate-800">E4-G6</th><td className="px-4 py-3">ประเมินผลบนข้อมูลที่กันไว้ / Evaluate frozen policies</td><td className="px-4 py-3">NOT_STARTED</td></tr>
                <tr><th className="px-4 py-3 font-semibold text-slate-800">E4-G7</th><td className="px-4 py-3">โหลดกลับ ทำซ้ำ และปิดการทดลอง / Reload, reproduce and close out</td><td className="px-4 py-3">NOT_STARTED</td></tr>
              </tbody>
            </table>
          </div>
        </section>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700"><strong className="text-slate-900">Engineering completion</strong><p className="mt-2">พิสูจน์ว่ากฎ ข้อมูล การประเมิน หลักฐาน และ fresh-process reproduction ถูกต้องตาม contract ที่ freeze แล้ว</p></div>
            <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700"><strong className="text-slate-900">Learning performance</strong><p className="mt-2">ML อาจชนะ เสมอ หรือแย่กว่ากฎธุรกิจได้ การชนะ baseline ไม่ใช่เงื่อนไขบังคับของการปิดการทดลองอย่างซื่อสัตย์</p></div>
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-500"><strong>Current evidence:</strong> the design and business rules are recorded. Quota and contact-control fixtures passed 17 checks on the owner’s Mac. This is fixture evidence only: the full simulator has not passed, the new dataset has not been generated, no model has been trained, the execution contract is not frozen, and Spark/model recovery is not established. Next: complete action filters and purchase/null fixtures, then freeze the contract.</p>
        <p className="mt-4 text-sm leading-6 text-slate-600"><strong>Simulation boundary:</strong> prices, costs and behavior are assumptions—not actual operator outcomes.</p>
      </Panel>
    </div>}
  </div>
}
