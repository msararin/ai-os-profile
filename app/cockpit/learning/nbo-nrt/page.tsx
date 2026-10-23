import { requireOwner } from "@/lib/owner-access"
import { privateIndex } from "@/lib/cockpit/store"
import { Empty, Panel, PrivateLink } from "@/components/cockpit-ui"

const editions = [{key:"one",label:"Experiment 1"},{key:"two-a",label:"Experiment 2A"},{key:"two-b",label:"Experiment 2B"},{key:"three",label:"Experiment 3"},{key:"four",label:"Experiment 4"}]

const exp4FeatureGroups = [
  ["1–13", "ประวัติใช้งาน โควตา วันหมดอายุ ประวัติข้อเสนอ และความต้องการที่คาดว่ายังขาด", "Usage history, entitlements, expiry, offer history, and forecast uncovered demand", 13],
  ["14–23", "คุณสมบัติแพ็กเกจ ราคา ต้นทุน ประโยชน์ โควตาที่คาดว่าจะเหลือ และจำนวน action ที่อนุญาต", "Candidate attributes, price, cost, benefit, forecast unused quota, and allowed-action count", 10],
  ["24–28", "ตัวบอก action ที่กำลังประเมิน", "Evaluated-action indicators", 5],
  ["29–33", "สิทธิ์ซื้อแต่ละสินค้า", "Purchase-eligibility indicators", 5],
  ["34–38", "สิทธิ์เสนอแต่ละ action", "Final allowed-action indicators", 5],
] as const

const exp4Features = [
  "history_data_total_gb", "history_voice_total_minutes", "base_remaining_data_gb", "base_remaining_voice_minutes", "base_expiry_days",
  "active_addon_remaining_data_gb", "active_addon_remaining_voice_minutes", "active_addon_expiry_days", "prior_offer_count_7d", "hours_since_last_offer",
  "no_prior_offer", "forecast_uncovered_data_gb", "forecast_uncovered_voice_minutes", "candidate_data_gb", "candidate_voice_minutes",
  "candidate_validity_days", "candidate_price_thb", "candidate_variable_cost_thb", "candidate_delta_data_gb", "candidate_delta_voice_minutes",
  "candidate_unused_data_gb", "candidate_unused_voice_minutes", "allowed_action_count",
  "action indicator — COMBO", "action indicator — DATA_LONG", "action indicator — DATA_SHORT", "action indicator — NO_OFFER", "action indicator — VOICE",
  "purchase eligibility — COMBO", "purchase eligibility — DATA_LONG", "purchase eligibility — DATA_SHORT", "purchase eligibility — NO_OFFER", "purchase eligibility — VOICE",
  "final allowed action — COMBO", "final allowed action — DATA_LONG", "final allowed action — DATA_SHORT", "final allowed action — NO_OFFER", "final allowed action — VOICE",
] as const

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
        <details id="exp4-overview" className="group/overview rounded-xl border border-slate-200 bg-slate-50/60 p-5">
          <summary className="cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">Backward-design roadmap · G1/G2 complete · frozen scope · G3 smoke passed</p>
        <h2 className="mt-3 text-xl font-semibold text-slate-900">เรียนรู้ว่าแพ็กเกจเสริมใดเหมาะกับ context นี้—or NO_OFFER</h2>
            <span className="mt-2 block text-xs font-medium text-teal-800"><span className="group-open/overview:hidden">ขยายรายละเอียด / Expand details</span><span className="hidden group-open/overview:inline">พับรายละเอียด / Collapse details</span></span>
          </summary>
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
                <tr><th className="px-4 py-3 font-semibold text-slate-800">E4-G1</th><td className="px-4 py-3">กำหนดโจทย์และเกณฑ์จบ / Define question and completion criteria</td><td className="px-4 py-3">COMPLETE — scope frozen in EXP4_FREEZE:v1</td></tr>
                <tr><th className="px-4 py-3 font-semibold text-slate-800">E4-G2</th><td className="px-4 py-3">ตรวจโลกจำลองและกฎธุรกิจ / Validate simulator and business rules</td><td className="px-4 py-3">COMPLETE — bounded simulator/component fixtures passed</td></tr>
                <tr><th className="px-4 py-3 font-semibold text-slate-800">E4-G3</th><td className="px-4 py-3">สร้างและตรวจข้อมูล / Generate and validate data</td><td className="px-4 py-3">SMOKE_PASS — 200 customers / 410 candidate rows; full data NOT_COMPLETE</td></tr>
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
        </details>
          <details id="exp4-g2-closeout" className="group/g2 mt-6 rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
            <summary className="cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">G2 closeout · bounded validation complete · 21 October 2026</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">กฎธุรกิจและส่วนประกอบของ simulator เชื่อมกันตาม frozen design แล้ว</h2>
            <p className="mt-1 text-sm font-medium text-slate-600">Business rules and simulator components are wired and verified within the frozen fixture boundary.</p>
              <span className="mt-2 block text-xs font-medium text-emerald-800"><span className="group-open/g2:hidden">ขยายรายละเอียด / Expand details</span><span className="hidden group-open/g2:inline">พับรายละเอียด / Collapse details</span></span>
            </summary>
            <p className="mt-3 leading-7 text-slate-700">G2 ปิดเมื่อ owner-run fixtures พิสูจน์การเชื่อมต่อของ ledger/contact rules, action filters, purchase/null outcomes, baselines, deterministic random streams และ 38-feature/reward integration บน hand-constructed contexts โดยใช้ข้อจำกัดเดียวกันสำหรับ learner, baselines และ oracle.</p>

            <div className="mt-4 overflow-x-auto rounded-lg border border-emerald-200 bg-white">
              <table className="min-w-[700px] w-full text-left text-sm">
                <thead className="bg-emerald-50 text-slate-800"><tr><th className="px-4 py-3 font-semibold">Evidence set</th><th className="px-4 py-3 font-semibold">Result</th><th className="px-4 py-3 font-semibold">Evidence commit</th></tr></thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr><td className="px-4 py-3">Ledger / contact rules</td><td className="px-4 py-3">17 PASS</td><td className="px-4 py-3 font-mono text-xs">business-ledger-65498…</td></tr>
                  <tr><td className="px-4 py-3">Action filters</td><td className="px-4 py-3">11 PASS</td><td className="px-4 py-3 font-mono text-xs">e045dbe</td></tr>
                  <tr><td className="px-4 py-3">Purchase / null control</td><td className="px-4 py-3">19 checks/groups + 1 descriptive q record</td><td className="px-4 py-3 font-mono text-xs">fa5cb69</td></tr>
                  <tr><td className="px-4 py-3">Business baselines</td><td className="px-4 py-3">16 PASS</td><td className="px-4 py-3 font-mono text-xs">abde993</td></tr>
                  <tr><td className="px-4 py-3">Deterministic random stream</td><td className="px-4 py-3">16 PASS</td><td className="px-4 py-3 font-mono text-xs">12a77b5</td></tr>
                  <tr><td className="px-4 py-3">38-feature / component integration</td><td className="px-4 py-3">20 PASS</td><td className="px-4 py-3 font-mono text-xs">df0e8d6</td></tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="rounded-lg bg-white p-4 text-sm leading-6 text-slate-700"><p className="font-semibold text-slate-900">หลักการที่ใช้ / Principles</p><ul className="mt-2 list-disc space-y-1 pl-5"><li>Backward design: freeze สิ่งที่ต้องพิสูจน์ก่อนขยายข้อมูล.</li><li>Business constraints first และใช้ shared filters ทุก policy.</li><li>แยก learner, outcome, latent และ evaluator-only oracle.</li><li>Deterministic draws และ fixed feature order เพื่อทำซ้ำได้.</li><li>ML ชนะ เสมอ หรือแพ้ baseline ได้โดยไม่เปลี่ยนกติกาเพื่อให้ชนะ.</li></ul></div>
              <div className="rounded-lg bg-white p-4 text-sm leading-6 text-slate-700"><p className="font-semibold text-slate-900">การเก็บหลักฐาน / Evidence custody</p><p className="mt-2">Freeze record: <code>93a9ee3</code>. หลักฐานแต่ละชุดเก็บใต้ <code>evidence/exp4/</code> พร้อม script, <code>receipt.json</code> และ <code>run.log</code>; remote receipt/log SHA-256 ถูกตรวจอ่านกลับ. Final integration run คือ <code>exp4-features-integration-f7827…</code> โดย receipt SHA-256 <code>d87b425…979e47</code> และ log SHA-256 <code>2144987…4800c</code>.</p></div>
            </div>

            <p className="mt-4 text-xs leading-5 text-emerald-900"><strong>Completion boundary:</strong> G2 COMPLETE หมายถึง bounded component/fixture requirements ผ่านแล้ว—not full generator validation, model learning, empirical calibration, production uplift หรือ fresh-process Spark/model recovery. หลัง G2 มี G3 smoke PASS สำหรับ 200 customers / 410 candidate rows และ six-table same-process Parquet read-back; full G3 data ยัง <code>NOT_COMPLETE</code> และ model training ยัง <code>NOT_STARTED</code>.</p>
          </details>
          <details id="exp4-business-to-features" className="group/features mt-6 rounded-xl border border-teal-200 bg-teal-50/60 p-5">
            <summary className="cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">Feature design journal · 21 October 2026</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">จากโจทย์ธุรกิจสู่ 38 Features</h2>
            <p className="mt-1 text-sm font-medium text-slate-600">From Business Decisions to 38 Model Features</p>
              <span className="mt-2 block text-xs font-medium text-teal-800"><span className="group-open/features:hidden">ขยายรายละเอียด / Expand details</span><span className="hidden group-open/features:inline">พับรายละเอียด / Collapse details</span></span>
            </summary>
            <p className="mt-3 leading-7 text-slate-700">หนึ่งแถวแทน <strong>ลูกค้าหนึ่งคน × action หนึ่งรายการ</strong> ตอนฝึก แถวนั้นใช้ action ที่เสนอจริงและ <code>observed_reward</code> ของเหตุการณ์นั้นเป็น label; ตอนเลือกข้อเสนอ ระบบสร้าง representation เดียวกันเพื่อประเมินแต่ละ action ที่ผ่านข้อจำกัดแล้ว โดยไม่ส่ง oracle หรือผลลัพธ์ในอนาคตให้ learner.</p>

            <div className="mt-5 overflow-x-auto rounded-lg border border-slate-200 bg-white">
              <table className="min-w-[760px] w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-800"><tr><th className="px-4 py-3 font-semibold">ช่อง / Fields</th><th className="px-4 py-3 font-semibold">กลุ่ม / Group</th><th className="px-4 py-3 text-right font-semibold">จำนวน / Count</th></tr></thead>
                <tbody className="divide-y divide-slate-200 text-slate-600">{exp4FeatureGroups.map(([range,th,en,count])=><tr key={range}><th className="whitespace-nowrap px-4 py-3 font-semibold text-slate-800">{range}</th><td className="px-4 py-3"><span className="block">{th}</span><span className="mt-1 block text-xs text-slate-500">{en}</span></td><td className="px-4 py-3 text-right tabular-nums">{count}</td></tr>)}</tbody>
              </table>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <h3 className="font-semibold text-slate-900">เกณฑ์การเลือก / Selection criteria</h3>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-700">
                  <li>รู้ได้ ณ เวลาตัดสินใจ / available at decision time.</li>
                  <li>เกี่ยวข้องกับ customer need, offer attributes หรือ business constraints.</li>
                  <li>ใช้นิยามเดียวกันตอนฝึกและตอนประเมิน action.</li>
                  <li>ลำดับคงที่ เป็น finite numeric และ non-null ตาม contract.</li>
                  <li>ไม่ใช้ผลหลังการเสนอหรือ simulator truth เป็นตัวทำนาย.</li>
                </ol>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <h3 className="font-semibold text-slate-900">สิ่งที่แยกออก / Kept outside features</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
                  <li><code>observed_reward</code> คือ label ไม่ใช่ feature.</li>
                  <li>สินค้าที่ซื้อจริงและเวลาซื้อเป็น outcomes.</li>
                  <li>Hidden price sensitivity และ oracle expected reward เป็นเฉลยที่แยกจาก learner.</li>
                  <li>Customer ID และ split ใช้จัดการ/เชื่อมแถว ไม่เข้า feature vector.</li>
                </ul>
              </div>
            </div>

            <details className="mt-5 rounded-lg border border-slate-200 bg-white p-4">
              <summary className="cursor-pointer font-semibold text-slate-900">ดูรายชื่อ 38 features ตามลำดับ contract / View the ordered 38-feature schema</summary>
              <p className="mt-2 text-xs leading-5 text-slate-500">Fields 24–38 use the contract’s fixed indicator order: COMBO, DATA_LONG, DATA_SHORT, NO_OFFER, VOICE.</p>
              <div className="mt-3 overflow-x-auto">
                <table className="min-w-[620px] w-full text-left text-sm"><thead className="border-b border-slate-200 text-slate-700"><tr><th className="px-3 py-2 font-semibold">#</th><th className="px-3 py-2 font-semibold">Contract field</th></tr></thead><tbody className="divide-y divide-slate-100">{exp4Features.map((feature,index)=><tr key={feature}><td className="w-16 px-3 py-2 tabular-nums text-slate-500">{index+1}</td><td className="px-3 py-2 font-mono text-xs text-slate-700">{feature}</td></tr>)}</tbody></table>
              </div>
            </details>

            <div className="mt-5 rounded-lg border border-teal-200 bg-teal-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-800">ตัวอย่างคำนวณเท่านั้น · Worked example, not a dataset result</p>
              <p className="mt-3 text-sm leading-6 text-slate-700">ลูกค้าใช้ย้อนหลัง 7 วัน: เน็ต 7 GB / โทร 70 นาที; แพ็กเกจหลักเหลือ 3 GB / 20 นาทีและหมดอายุใน 7 วัน; ไม่มีแพ็กเกจเสริม; เคยได้รับข้อเสนอหนึ่งครั้งเมื่อ 72 ชั่วโมงก่อน; สมมติว่าผ่านสิทธิ์ซื้อและเงื่อนไขเสนอทุกสินค้า.</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-lg bg-white p-3 text-sm leading-6 text-slate-700"><strong className="text-slate-900">Forecast gap</strong><br/>4 GB / 50 minutes</div>
                <div className="rounded-lg bg-white p-3 text-sm leading-6 text-slate-700"><strong className="text-slate-900">DATA_LONG candidate</strong><br/>8 GB · 14 days · THB 119 · cost THB 35</div>
                <div className="rounded-lg bg-white p-3 text-sm leading-6 text-slate-700"><strong className="text-slate-900">Immediate-activation benefit</strong><br/>ลด data gap 4 GB; ไม่ลด voice gap</div>
                <div className="rounded-lg bg-white p-3 text-sm leading-6 text-slate-700"><strong className="text-slate-900">Bounded-horizon remainder</strong><br/>คาดว่าเหลือ 4 GB ณ สิ้นวันที่ 7—ยังไม่เรียกว่าโควตาสูญเปล่า เพราะแพ็กเกจยังไม่หมดอายุ</div>
              </div>
              <p className="mt-3 text-sm text-slate-700"><code>allowed_action_count = 5</code> รวม <code>NO_OFFER</code>.</p>
              <div className="mt-3 overflow-x-auto rounded-lg bg-white">
                <table className="min-w-[700px] w-full text-center text-xs"><thead className="border-b border-slate-200 text-slate-700"><tr><th className="px-3 py-2 text-left">Indicator order</th><th className="px-3 py-2">COMBO</th><th className="px-3 py-2">DATA_LONG</th><th className="px-3 py-2">DATA_SHORT</th><th className="px-3 py-2">NO_OFFER</th><th className="px-3 py-2">VOICE</th></tr></thead><tbody className="divide-y divide-slate-100 text-slate-700"><tr><th className="px-3 py-2 text-left font-medium">Action</th><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td></tr><tr><th className="px-3 py-2 text-left font-medium">Purchase eligibility</th><td>1</td><td>1</td><td>1</td><td>0</td><td>1</td></tr><tr><th className="px-3 py-2 text-left font-medium">Allowed actions</th><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr></tbody></table>
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-600"><code>NO_OFFER</code> ไม่ใช่สินค้า จึงมี purchase eligibility = 0 แต่เป็น action ที่เลือกได้เสมอ.</p>
            </div>

            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-slate-700">
              <p className="font-semibold text-amber-900">ขอบเขตหลักฐาน / Evidence boundary</p>
              <ul className="mt-2 list-disc space-y-1 pl-5"><li>ลำดับและ wiring ของ 38 features ผ่าน bounded integration fixtures และ G3 smoke read-back แล้ว แต่ยังไม่รับประกันว่า representation นี้เพียงพอให้โมเดลเรียนรู้ได้ดี.</li><li>Candidate benefit และ unused quota มาจาก forecast ภายใต้สมมติฐานเปิดใช้ทันที ไม่ใช่การใช้จริงในอนาคต.</li><li>ราคา ต้นทุน และพฤติกรรมซื้อเป็นสมมติฐานจำลอง ไม่ใช่ข้อมูลจริงของผู้ให้บริการ.</li><li>Synthetic evaluation ไม่พิสูจน์ production uplift.</li></ul>
            </div>
          </details>
          <p className="mt-5 text-xs leading-5 text-slate-500"><strong>Current evidence:</strong> experiment branch checkpoint <code>47776f3</code>. G1/G2 are complete under <code>EXP4_FREEZE:v1</code>; G3 smoke passed and its failed-before-fix plus passing artifacts are retained remotely. G3 full data is <code>NOT_COMPLETE</code>; model training, evaluation, save and reload are <code>NOT_STARTED</code>. Fresh-process Spark resume is <code>NOT_PERFORMED</code>. Experiment 3 remains <code>PAUSED_SAFE</code>; <code>B1_COMPLETE=NO</code>.</p>
        <p className="mt-4 text-sm leading-6 text-slate-600"><strong>Simulation boundary:</strong> prices, costs and behavior are assumptions—not actual operator outcomes.</p>
      </Panel>
    </div>}
  </div>
}
