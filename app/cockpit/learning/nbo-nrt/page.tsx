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
    <div><p className="text-xs font-semibold uppercase tracking-widest text-teal-700">Private learning journal</p><h1 className="mt-2 text-3xl font-semibold">NBO / NRT — บันทึกการเรียนรู้</h1><p className="mt-3 text-sm leading-7 text-slate-600">{selected.key==="four"?"บันทึก Experiment 4 พร้อมสถานะปัจจุบันและประวัติตามวันที่ / Experiment 4 journal with current status and dated historical checkpoints.":"ฉบับล่าสุดที่เคยเผยแพร่ก่อนปรับหน้าสาธารณะ เก็บลำดับเรื่อง มุมมอง Business / Models / Engineering และรายละเอียดการทดลองไว้สำหรับกลับมาอ่านทบทวน สถานะและผลทดลองเป็นข้อมูลตามฉบับเดิม"}</p></div>
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
        <div id="exp4-current-status" className="mb-5 rounded-xl border border-teal-200 bg-teal-50 p-4">
          <p className="text-sm font-semibold text-teal-900">Experiment 4 — IN PROGRESS / อยู่ระหว่างดำเนินการ</p>
          <p className="mt-1 text-xs text-slate-600">สถานะปัจจุบัน ณ 23 ตุลาคม 2026 / Current checkpoint · 23 October 2026</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-900">G1 · Complete</span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-900">G2 · Complete — bounded validation</span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-900">G3 · Complete — data and custody</span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-900">G4 · Complete — business baselines</span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-900">G5 · Complete — six fixed models</span>
            <span className="rounded-full bg-slate-200 px-3 py-1 text-slate-800">G6 · Not started; G7 · Not complete</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-700">G3/G4/G5 สำเร็จพร้อมหลักฐาน ฝึกและบันทึกครบ 6 โมเดลแล้ว ยังไม่ประเมินว่า ML เลือกแพ็กเกจได้ดีกว่า baseline / Data, baselines and six fixed models are complete with reviewed custody; policy merit remains for G6 and recovery/reproduction for G7.</p>
        </div>
        <details id="exp4-overview" className="group/overview rounded-xl border border-slate-200 bg-slate-50/60 p-5">
          <summary className="cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">Backward-design roadmap · G1/G2/G3/G4/G5 complete · Experiment in progress</p>
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
                <tr><th className="px-4 py-3 font-semibold text-slate-800">E4-G3</th><td className="px-4 py-3">สร้างและตรวจข้อมูล / Generate and validate data</td><td className="px-4 py-3">COMPLETE — data generation/validation and reviewed custody · 120,000 customers / สร้าง ตรวจ และทบทวนการเก็บหลักฐานครบ</td></tr>
                <tr><th className="px-4 py-3 font-semibold text-slate-800">E4-G4</th><td className="px-4 py-3">สร้างตัวเปรียบเทียบ / Establish baselines</td><td className="px-4 py-3">COMPLETE — 12 TRAIN/VALIDATION splits; 90,000 customers; reviewed baseline evidence</td></tr>
                <tr><th className="px-4 py-3 font-semibold text-slate-800">E4-G5</th><td className="px-4 py-3">ฝึกโมเดลและสร้างวิธีเลือก offer / Train model and derive policy</td><td className="px-4 py-3">COMPLETE — six fixed models trained and saved; reviewed diagnostics and custody</td></tr>
                <tr><th className="px-4 py-3 font-semibold text-slate-800">E4-G6</th><td className="px-4 py-3">ประเมินผลบนข้อมูลที่กันไว้ / Evaluate frozen policies</td><td className="px-4 py-3">NOT_STARTED</td></tr>
                <tr><th className="px-4 py-3 font-semibold text-slate-800">E4-G7</th><td className="px-4 py-3">โหลดกลับ ทำซ้ำ และปิดการทดลอง / Reload, reproduce and close out</td><td className="px-4 py-3">NOT_COMPLETE — recovery/reproduction pending</td></tr>
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

            <p className="mt-4 text-xs leading-5 text-emerald-900"><strong>Historical checkpoint · 21 October 2026 / สถานะ ณ วันบันทึกเดิม:</strong> G2 COMPLETE หมายถึง bounded component/fixture requirements ผ่านแล้ว—not full generator validation, model learning, empirical calibration, production uplift หรือ fresh-process Spark/model recovery. หลัง G2 มี G3 smoke PASS สำหรับ 200 customers / 410 candidate rows และ six-table same-process Parquet read-back; full G3 data ยัง <code>NOT_COMPLETE</code> และ model training ยัง <code>NOT_STARTED</code>.</p>
          </details>
          <details id="exp4-g3-closeout" className="group/g3 mt-6 rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
            <summary className="cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">G3 COMPLETE · data generation/validation and reviewed custody · 23 October 2026</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">G3 สำเร็จ — สร้างและตรวจข้อมูลจำลองครบ 120,000 ลูกค้า</h2>
              <p className="mt-1 text-sm font-medium text-slate-600">G3 complete — 120,000 synthetic customers generated and validated</p>
              <p className="mt-3 text-sm leading-6 text-slate-700">สร้างข้อมูลตามโจทย์ package-fit และสมมติฐานธุรกิจ ครบ PRIMARY/NULL × 3 seeds แยก TRAIN/VALIDATION/EVALUATION ตรวจและเก็บหลักฐานย้อนกลับได้ / Package-fit data across both scenarios and three seeds, split, validated and traceable.</p>
              <span className="mt-2 block text-xs font-medium text-emerald-800"><span className="group-open/g3:hidden">ขยายรายละเอียด / Expand details</span><span className="hidden group-open/g3:inline">พับรายละเอียด / Collapse details</span></span>
            </summary>
            <div className="mt-4 rounded-lg bg-white p-4 text-sm leading-7 text-slate-700"><h3 className="font-semibold text-slate-900">โจทย์ธุรกิจและโลกจำลอง / Business question and simulated world</h3><p>เมื่อเปิดหน้าดูการใช้งาน ควรเสนอแพ็กเกจใดหรือไม่เสนอ? กฎธุรกิจกรองสิทธิ์ซื้อ ความเข้ากันได้ ข้อจำกัดการติดต่อและความเหมาะสม ก่อนเลือก action / At usage check, choose a package or NO_OFFER after eligibility, compatibility, contact and suitability constraints.</p><p className="mt-2">ลูกค้าอาจไม่ซื้อ ซื้อข้อเสนอ ซื้อสินค้าอื่น หรือซื้อเองแม้ไม่มีข้อเสนอ Reward มาจากสินค้าที่ซื้อจริง หักต้นทุนและค่าแสดงข้อเสนอตาม scenario / Purchase is separate from recommendation; reward follows the actual purchased-product margin minus applicable display cost.</p><p className="mt-2">NULL ปิด recommendation effect และ display cost เพื่อให้ expected reward เท่ากันใน allowed actions ของ context เดียวกัน / NULL removes both recommendation influence and display cost to enforce within-context equality.</p><p className="mt-2">บทเรียน: เริ่มจากการตัดสินใจธุรกิจ แล้วแปลงเป็นข้อมูล กฎ และวิธีวัดที่ตรวจสอบได้ / Start with the business decision and make data, rules and measurement auditable. GitHub custody alone is not a restore test.</p></div>
            <p className="mt-3 text-sm leading-7 text-slate-700">ตอนนี้มีข้อมูลจำลองที่ตรวจสอบและเก็บหลักฐานครบ พร้อมใช้เปรียบเทียบวิธีเลือกข้อเสนอในขั้นต่อไป / Validated, traceable synthetic data is ready for the next step: comparing offer-selection methods.</p>
            <div className="mt-4 overflow-x-auto rounded-lg border border-emerald-200 bg-white">
              <table className="min-w-[620px] w-full text-left text-sm">
                <thead className="bg-emerald-50"><tr><th className="px-4 py-3">ขอบเขต / Coverage</th><th className="px-4 py-3">ผลที่ตรวจ / Reviewed result</th></tr></thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr><td className="px-4 py-3">PRIMARY / NULL × seeds 101, 202, 303</td><td className="px-4 py-3">6 batches · 18 splits · 120,000 customers</td></tr>
                  <tr><td className="px-4 py-3">แต่ละ batch / Per batch</td><td className="px-4 py-3">TRAIN 12,000 + VALIDATION 3,000 + EVALUATION 5,000</td></tr>
                  <tr><td className="px-4 py-3">ทุก split / All 18 splits</td><td className="px-4 py-3">PASS — IDs, features, propensity, reward, namespace/cardinality, schemas, actual null constraints; same-process Spark Parquet write/read-back</td></tr>
                  <tr><td className="px-4 py-3">Equal-expected-reward control</td><td className="px-4 py-3">NULL ทั้ง 9 splits: PASS — expected reward เท่ากันระหว่าง allowed actions ใน context เดียวกัน / equal expected reward within each context</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="rounded-lg bg-white p-4 text-sm leading-6 text-slate-700"><h3 className="font-semibold text-slate-900">หลักการ / Principles</h3><p className="mt-2">ใช้ business rules และ random streams ที่ freeze ไว้; 38 features มีลำดับคงที่ และแยก learner, oracle และ latent variables / Frozen rules and random streams, ordered features, and separate learner, evaluator and latent paths. Observed reward เป็น label เท่านั้น; purchase outcomes, oracle และ latent variables ไม่เป็น features / Reward is the label; purchase outcomes, oracle and latent variables are excluded from features.</p><p className="mt-2">77,711 contexts มีเพียง NO_OFFER; 42,289 มีมากกว่าหนึ่ง allowed action จึงต้องรายงานประชากรที่มีทางเลือกแยกในขั้นต่อไป / Report the population with more than one allowed action separately; do not alter eligibility to improve results.</p></div>
              <div className="rounded-lg bg-white p-4 text-sm leading-6 text-slate-700"><h3 className="font-semibold text-slate-900">การเก็บหลักฐาน / Evidence custody</h3><p className="mt-2">ข้อมูล logs, schemas และ receipts เก็บใน Git พร้อมต้นฉบับบน Mac ผู้ใช้ตรวจ source→copy hashes และ SHA-256/ขนาดของ committed artifacts 137 ไฟล์ต่อ batch รวม <strong>822 ไฟล์</strong> และตรวจ remote ancestry / Owner verified committed bytes and remote reachability for all 822 manifest-linked files; original outputs remain on Mac.</p></div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-700"><strong>ขอบเขตการพิสูจน์ / Verification boundary:</strong> ไม่ใช่ clean remote restore หรือ fresh-process Spark recovery; ณ checkpoint G3 fresh-process resume ยัง <code>NOT_PERFORMED</code>. ณ G3 ยังไม่ได้ฝึกโมเดล และไม่เปิด EVALUATION performance / At G3 no model was trained and no EVALUATION performance was inspected. ข้อมูลผ่าน validation ไม่รับประกันการเรียนรู้; พฤติกรรมซื้อและเศรษฐศาสตร์เป็นสมมติฐานที่ยังไม่สอบเทียบกับลูกค้าจริง / Validated data does not guarantee learnability; purchase behavior and economics are uncalibrated assumptions, not evidence of real business uplift.</p>
            <p className="mt-3 text-sm leading-6 text-slate-700"><strong>ประวัติ / History:</strong> G3 smoke เดิมผ่าน 200 customers / 410 candidate rows ที่ checkpoint <code>47776f3</code>; สถานะ full data ที่ยังไม่ครบในบันทึก 21 October เป็นประวัติเดิม ปัจจุบันเลื่อนเป็น G3 COMPLETE ตาม review วันที่ 23 October / Historical receipts retain their original run-time statuses; this later review advances G3 only.</p>
            <p className="mt-3 text-sm leading-6 text-slate-700"><strong>ประวัติ ณ G4 review / Historical G4 checkpoint:</strong> ณ G3 ยังรอ G4 runtime; review ถัดไปยืนยัน G4 COMPLETE แล้ว ส่วน G5 ยัง IN_PROGRESS_NOT_COMPLETE / The earlier G3 checkpoint awaited G4; the later review closes G4. G5 was incomplete at that checkpoint. ปัจจุบัน G5 COMPLETE ตาม review ถัดไป / The later G5 review now closes training; Experiment 4 remains IN PROGRESS.</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <a className="underline text-teal-800" href="https://github.com/msararin/nbo-nrt-mlops-usecase/blob/27638db0f0e325072cac933230ef89d9992979df/docs/experiments/exp4/G3_FULL_DATA_REVIEW_2026-10-23.md" target="_blank" rel="noreferrer">G3 review · 27638db ↗</a>
              <a className="underline text-teal-800" href="https://github.com/msararin/nbo-nrt-mlops-usecase/tree/fbe5eb31637b3b159dc101063278fff1d8237851/evidence/exp4/full_data" target="_blank" rel="noreferrer">G3 evidence snapshot · fbe5eb3 ↗</a>
              <a className="underline text-teal-800" href="https://github.com/msararin/nbo-nrt-mlops-usecase/blob/8d0fb2fb7938c38741016386bd096ca0557ff6ab/docs/experiments/exp4/G4_IMPLEMENTATION_REVIEW_2026-10-23.md" target="_blank" rel="noreferrer">Historical G4 implementation review · before runtime ↗</a>
            </div>
          </details>
          <details id="exp4-g4-closeout" className="group/g4 mt-6 rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
            <summary className="cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">G4 COMPLETE · business baselines and reviewed custody · 23 October 2026</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">G4 สำเร็จ — กฎธุรกิจเป็น baseline ที่แข็งแรงก่อนฝึก ML</h2>
              <p className="mt-1 text-sm font-medium text-slate-600">G4 complete — A strong business baseline established before ML training</p>
              <p className="mt-3 text-sm leading-6 text-slate-700">เปรียบเทียบ 3 baselines บน TRAIN/VALIDATION เดิมครบ 90,000 customers: CHEAPEST_SUITABLE ให้ expected reward สูงสุดทุก PRIMARY split ส่วน NULL ให้ผลเท่ากันตามเกณฑ์ / Three baselines on 90,000 saved TRAIN/VALIDATION customers; cheapest-suitable leads in every PRIMARY split, while NULL policies agree within tolerance.</p>
              <span className="mt-2 block text-xs font-medium text-emerald-800"><span className="group-open/g4:hidden">ขยายรายละเอียด / Expand details</span><span className="hidden group-open/g4:inline">พับรายละเอียด / Collapse details</span></span>
            </summary>
            <div className="mt-4 rounded-lg bg-white p-4 text-sm leading-7 text-slate-700">
              <h3 className="font-semibold text-slate-900">สิ่งที่เปรียบเทียบ / Baseline definitions</h3>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li><strong>NO_OFFER:</strong> ไม่แสดงข้อเสนอ แต่ลูกค้ายังซื้อเองได้ / No displayed offer; organic purchases remain possible.</li>
                <li><strong>UNIFORM:</strong> น้ำหนักเท่ากันทุก allowed action คำนวณแบบ analytic mixture ไม่สุ่ม action เพิ่ม / Equal weights over allowed actions, evaluated analytically without extra sampling.</li>
                <li><strong>CHEAPEST_SUITABLE:</strong> หากมีแพ็กเกจครอบคลุมทั้งสองด้าน เลือกราคาต่ำสุด; หากไม่มี เลือกที่ลดส่วนขาดได้ดีที่สุดตามนิยามที่ freeze แล้ว ตามด้วยราคาและ lexical tie-break / Select the lowest-priced package covering both needs; otherwise maximize mean fractional deficit reduction across originally needed dimensions, then price and lexical action ID. With no allowed product, choose NO_OFFER.</li>
              </ul>
              <p className="mt-2">ทุกวิธีใช้ allowed-action constraints เดียวกัน เลือกจาก decision-time data และใช้ oracle q แยกเฉพาะการประเมิน / Shared constraints and decision-time selection; oracle q is isolated to reporting.</p>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-700"><strong>ขอบเขต / Coverage:</strong> PRIMARY/NULL × seeds 101, 202, 303 × TRAIN/VALIDATION = <strong>12 splits · 90,000 customers · all PASS · forbidden actions = 0</strong>. รายงานประชากรรวมและกลุ่มที่มีมากกว่า 1 allowed action แยกกัน / Both ALL and MULTIPLE_ACTIONS populations reported. G4 ไม่ train โมเดลและไม่เปิด EVALUATION performance / No model training or EVALUATION performance in G4.</p>
            <div className="mt-4 overflow-x-auto rounded-lg border border-emerald-200 bg-white" tabIndex={0} role="region" aria-label="G4 baseline diagnostics table">
              <table className="min-w-[680px] w-full text-left text-sm tabular-nums">
                <caption className="p-4 text-left text-sm leading-6 text-slate-700">PRIMARY / VALIDATION / ALL — simulated expected net contribution บาท/ลูกค้า (THB/customer). TRAIN/VALIDATION diagnostics; ไม่ใช่ held-out evaluation, actual profit หรือ real-world uplift.</caption>
                <thead className="bg-emerald-50"><tr><th className="px-4 py-3">Seed</th><th className="px-4 py-3">NO_OFFER</th><th className="px-4 py-3">UNIFORM</th><th className="px-4 py-3">CHEAPEST_SUITABLE</th><th className="px-4 py-3">Cheapest: gap from oracle</th></tr></thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr><th className="px-4 py-3">101</th><td className="px-4 py-3">29.5381</td><td className="px-4 py-3">30.3259</td><td className="px-4 py-3">31.8336</td><td className="px-4 py-3">0.2799</td></tr>
                  <tr><th className="px-4 py-3">202</th><td className="px-4 py-3">29.6253</td><td className="px-4 py-3">30.4252</td><td className="px-4 py-3">31.9174</td><td className="px-4 py-3">0.2959</td></tr>
                  <tr><th className="px-4 py-3">303</th><td className="px-4 py-3">29.2185</td><td className="px-4 py-3">30.0103</td><td className="px-4 py-3">31.4489</td><td className="px-4 py-3">0.2973</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-700">กลุ่มมีหลายทางเลือกใน VALIDATION: cheapest gap from oracle ประมาณ 0.80–0.85 บาท/ลูกค้า / MULTIPLE_ACTIONS validation gap is approximately 0.80–0.85 THB/customer. NULL ทั้งสามวิธีมี expected reward เท่ากันภายใน tolerance; <code>-0.00000000</code> เป็น floating-point rounding ไม่ใช่ความได้เปรียบที่มีความหมาย / Rounded negative zero is not meaningful superiority.</p>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="min-w-0 rounded-lg bg-white p-4 text-sm leading-7 text-slate-700"><h3 className="font-semibold text-slate-900">หลักฐาน / Evidence custody</h3><p className="mt-2 break-words">Run: <code>exp4-g4-baselines-b4a3b8b639e74887a948319498875c57</code><br/>Runtime code: <code>8d0fb2f</code> · Evidence: <code>f506586</code> · Checkpoint: <code>78254c3</code></p><p className="mt-2">99 files / 1,093,420 bytes: policy-weight Parquet, schemas, reports, logs, receipt และ manifest ใน <code className="break-all">evidence/exp4/baselines/&lt;run&gt;/</code>. ผู้ใช้ตรวจ committed hashes ทั้ง 99 ไฟล์และ remote reachability ผ่าน ต้นฉบับยังอยู่บน Mac / Owner verified committed bytes and remote reachability; originals retained. Assistant reviewed remote receipt and combined reports.</p><p className="mt-2 break-all">Receipt SHA-256: <code>6c6aa545b598e9582cd43a3f556d0570e07e9e336758534bab8190a3d590e19a</code></p></div>
              <div className="min-w-0 rounded-lg bg-white p-4 text-sm leading-7 text-slate-700"><h3 className="font-semibold text-slate-900">การกู้คืนและขอบเขต / Recovery boundary</h3><p className="mt-2 break-words"><strong>Fresh-process Spark resume: <code>PASS_BOUNDED_G4_INPUTS_ONLY</code></strong></p><p className="mt-2">อ่านและตรวจ saved TRAIN/VALIDATION contexts/candidates/oracle ใน process ใหม่ผ่านเท่านั้น / Passed reading and validation of these selected inputs in a new process.</p><p className="mt-2">ยังไม่ใช่ clean remote restore, all-table recovery หรือ saved-model reload / These broader recovery claims remain unverified.</p><p className="mt-2">Receipt เดิมเก็บสถานะ pending custody; additive review ภายหลังปิด G4 โดยไม่แก้ประวัติ / The immutable runtime receipt retains pending custody; the later review closes G4.</p></div>
            </div>
            <div className="mt-4 rounded-lg bg-white p-4 text-sm leading-7 text-slate-700"><h3 className="font-semibold text-slate-900">บทเรียนและข้อจำกัด / Learning and limits</h3><ul className="mt-2 list-disc space-y-2 pl-5"><li>กฎธุรกิจเป็นคู่เปรียบเทียบที่สำคัญ ML ต้องแสดงคุณค่าเพิ่มเหนือวิธีเดิม / A strong business rule is the comparator for added ML value.</li><li>Baseline ใกล้ oracle ทำให้พื้นที่ปรับปรุงเหลือน้อย การเสมอหรือแพ้เป็นผลที่ยอมรับได้ / Limited oracle headroom makes tied or losing ML outcomes valid.</li><li>ความเหมาะสมไม่รับประกันการซื้อ แยก engineering correctness จาก learning performance และผลธุรกิจจริง / Suitability does not guarantee purchase; engineering, learning and real business outcomes are distinct.</li><li>Simulator และ baseline ใช้สมมติฐานประโยชน์ที่สัมพันธ์กัน จึงยังสรุปไม่ได้ว่า baseline นี้ดีที่สุดกับลูกค้าจริง / Shared benefit assumptions may favor this baseline; real-customer superiority is not established.</li></ul></div>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <a className="underline text-teal-800" href="https://github.com/msararin/nbo-nrt-mlops-usecase/blob/78254c33754872a64deb0bc9f57752f10cadae17/docs/experiments/exp4/G4_BASELINES_REVIEW_2026-10-23.md" target="_blank" rel="noreferrer">G4 review · 78254c3 ↗</a>
              <a className="underline text-teal-800" href="https://github.com/msararin/nbo-nrt-mlops-usecase/tree/f5065861b356efeb59f23378601e63ef396db1f7/evidence/exp4/baselines/exp4-g4-baselines-b4a3b8b639e74887a948319498875c57" target="_blank" rel="noreferrer">G4 evidence snapshot · f506586 ↗</a>
              <a className="underline text-teal-800" href="https://github.com/msararin/nbo-nrt-mlops-usecase/blob/1ce437f59a51ef2981ff1c1b53cd299a6b3f1961/docs/experiments/exp4/G5_IMPLEMENTATION_REVIEW_2026-10-23.md" target="_blank" rel="noreferrer">Historical G5 implementation review · before runtime ↗</a>
            </div>
          </details>
          <details id="exp4-g5-closeout" className="group/g5 mt-6 rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
            <summary className="cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">G5 COMPLETE · six fixed models and reviewed custody · 23 October 2026</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">G5 สำเร็จ — ฝึกและบันทึกโมเดลค่าคงที่ครบ 6 โมเดล</h2>
              <p className="mt-1 text-sm font-medium text-slate-600">G5 complete — Six fixed-configuration models trained and saved</p>
              <p className="mt-3 text-sm leading-6 text-slate-700">ฝึก RandomForest จาก 38 decision-time features ครบ PRIMARY/NULL × 3 seeds ตรวจ prediction error บน TRAIN/VALIDATION บันทึก pipeline และโหลดกลับใน process เดียวกันได้ผลตรงเดิม เก็บหลักฐาน PASS และ FAIL แล้ว โดยยังไม่ประเมินการเลือกแพ็กเกจบน EVALUATION / Six fixed forests trained and saved, with prediction diagnostics and matching same-process reloads. PASS and FAIL evidence retained; held-out policy evaluation remains for G6.</p>
              <span className="mt-2 block text-xs font-medium text-emerald-800"><span className="group-open/g5:hidden">ขยายรายละเอียด / Expand details</span><span className="hidden group-open/g5:inline">พับรายละเอียด / Collapse details</span></span>
            </summary>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <section className="min-w-0 rounded-lg bg-white p-4 text-sm leading-7 text-slate-700"><h3 className="font-semibold text-slate-900">โมเดลเรียนรู้อะไร / What the model learns</h3><p className="mt-2">ทำนาย <code>observed_reward</code> ของ action ที่ถูกเลือก จาก 38 features ที่รู้ก่อนตัดสินใจตาม allowlist โดย reward เป็น label / Predict the observed reward of the logged action using 38 allowlisted decision-time features; reward is the label.</p><p className="mt-2">ไม่ใช้ purchased product, oracle q หรือ latent variables เป็น features โหลดเฉพาะ learner TRAIN/VALIDATION ไม่โหลด oracle/latent/outcomes tables / Outcome and privileged variables stay outside features; only saved learner tables are loaded.</p><p className="mt-2">ฝึกเฉพาะ TRAIN; VALIDATION ใช้ตรวจผล ไม่ใช้ tuning / TRAIN-only fitting; VALIDATION diagnostics without tuning.</p></section>
              <section className="min-w-0 rounded-lg bg-white p-4 text-sm leading-7 text-slate-700"><h3 className="font-semibold text-slate-900">วิธีฝึกที่กำหนดล่วงหน้า / Fixed training design</h3><p className="mt-2">PRIMARY/NULL × seeds 101, 202, 303 = 6 models. ต่อโมเดล / per model: TRAIN 12,000 + VALIDATION 3,000 customers.</p><p className="mt-2">RandomForestRegressor: 100 trees, maxDepth 8, maxBins 64, featureSubsetStrategy <code>all</code>, seed ตาม run / per-run seed. Fixed VectorAssembler; ไม่มี hyperparameter search / no search.</p><p className="mt-2">Owner Mac · Spark <code>local[2]</code> · Python 3.12.15 · PySpark 4.1.0 · Java 17.0.20.1. Environment check แยกบันทึก / separately records NumPy 2.5.4 and arm64; this is a version record, not a complete dependency lock.</p></section>
            </div>
            <div className="mt-4 overflow-x-auto rounded-lg border border-emerald-200 bg-white" tabIndex={0} role="region" aria-label="G5 prediction error diagnostics table">
              <table className="min-w-[730px] w-full text-left text-sm tabular-nums">
                <caption className="p-4 text-left text-sm leading-6 text-slate-700">Prediction diagnostics — หน่วยบาทของ simulated reward error (THB). TRAIN/VALIDATION logged-action labels; ไม่ใช่ policy value หรือ held-out EVALUATION.</caption>
                <thead className="bg-emerald-50"><tr><th className="px-4 py-3">Scenario</th><th className="px-4 py-3">Seed</th><th className="px-4 py-3">TRAIN RMSE</th><th className="px-4 py-3">TRAIN MAE</th><th className="px-4 py-3">VALIDATION RMSE</th><th className="px-4 py-3">VALIDATION MAE</th></tr></thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {[
                    ["PRIMARY", "101", "24.3342", "20.2804", "25.2385", "21.1099"],
                    ["PRIMARY", "202", "24.2481", "20.0182", "25.4714", "21.1357"],
                    ["PRIMARY", "303", "24.3091", "20.2939", "25.3589", "21.1780"],
                    ["NULL", "101", "24.4661", "20.5377", "26.3236", "22.1633"],
                    ["NULL", "202", "24.5417", "20.5812", "26.3608", "22.2453"],
                    ["NULL", "303", "24.4945", "20.5159", "26.1227", "21.8200"],
                  ].map(([scenario, seed, ...metrics])=><tr key={`${scenario}-${seed}`}><th className="px-4 py-3">{scenario}</th><td className="px-4 py-3">{seed}</td>{metrics.map((metric,index)=><td key={index} className="px-4 py-3">{metric}</td>)}</tr>)}
                </tbody>
              </table>
            </div>
            <section className="mt-4 rounded-lg bg-white p-4 text-sm leading-7 text-slate-700"><h3 className="font-semibold text-slate-900">อ่านค่า error อย่างไร / Interpreting the errors</h3><p className="mt-2">MAE คือค่าเฉลี่ยขนาดความคลาดเคลื่อนโดยไม่ให้บวก/ลบหักล้างกัน ส่วน RMSE ให้น้ำหนัก error ขนาดใหญ่มากขึ้น / MAE averages absolute errors; RMSE weights larger errors more heavily.</p><p className="mt-2">PRIMARY VALIDATION MAE เฉลี่ย 3 seeds = <strong>21.1412 บาท</strong>. แต่ละ seed มี 3,000 รายเท่ากัน จึงเท่ากับ pooled MAE ของ 9,000 รายที่ใช้โมเดลของแต่ละ seed / Equal-sized seeds make this the pooled MAE for 9,000 observations scored by their respective models, not one model tested on all 9,000. An arithmetic average of RMSE is not pooled RMSE.</p><p className="mt-2">Error ไม่ใช่ธุรกิจขาดทุน และยังไม่บอกว่า ML เลือกแพ็กเกจดีกว่า baseline ไม่มี prediction-error baseline ให้ตัดสินว่าระดับนี้ดีหรือแย่ / Reward prediction error is not business loss or policy superiority; no prediction-error comparator was evaluated.</p><p className="mt-2">NULL มี expected reward เท่ากันระหว่าง actions ใน context เดียวกัน แต่ต่างกันระหว่างลูกค้าได้ และ observed outcomes มีความสุ่ม จึงไม่จำเป็นต้องมี RMSE/MAE เป็นศูนย์ / Within-context action equality does not imply identical rewards across customers or zero observed-label error.</p></section>
            <section className="mt-4 rounded-lg bg-white p-4 text-sm leading-7 text-slate-700"><h3 className="font-semibold text-slate-900">บันทึกและโหลดกลับ / Persistence and reload</h3><p className="mt-2">เก็บ native pipelines ทั้ง 6 รวม VectorAssembler + RandomForest พร้อม metadata, parameters, feature order, input identities, predictions, schemas, reports, logs และ manifest / Six native pipelines and their model/input/diagnostic evidence are saved.</p><p className="mt-2"><strong>Same-process reload: maximum prediction difference = 0.0</strong> ทั้ง 12 TRAIN/VALIDATION prediction sets; prediction Parquet count และ bidirectional <code>exceptAll</code> read-back ผ่าน / All twelve prediction sets agree exactly after same-process reload and pass Parquet semantic read-back.</p><p className="mt-2">ยังไม่ใช่ fresh-process model reload, clean remote restore หรือการฝึกซ้ำเพื่อพิสูจน์ reproducibility; G7 ยัง NOT_COMPLETE / These broader recovery and reproduction checks remain open in G7.</p></section>
            <section className="mt-4 rounded-lg bg-white p-4 text-sm leading-7 text-slate-700"><h3 className="font-semibold text-slate-900">FAIL ที่เก็บไว้และบทเรียน / Preserved failure and learning</h3><p className="mt-2">ครั้งแรกหยุดก่อนฝึก: <code className="break-words">ModuleNotFoundError: No module named &apos;numpy&apos;</code>. Spark SQL ก่อนหน้านี้ทำงานได้ แต่ PySpark ML ต้องมี NumPy เพิ่ม / The first attempt stopped before training: working Spark SQL did not establish readiness of ML dependencies.</p><p className="mt-2">ติดตั้ง <code>pyspark[ml]==4.1.0</code> ตรวจ ML import ผ่าน แล้วรันใหม่ด้วย source และ model configuration เดิม ไม่เปลี่ยนสูตรหรือ thresholds เก็บ FAIL รอบแรกไว้ครบ / Installed the ML extra, verified imports and reran unchanged code/configuration; the failed attempt remains preserved.</p><p className="mt-2">บทเรียน: environment preflight ต้องครอบคลุม dependency ของขั้นงานจริง การผ่าน data pipeline ยังไม่ยืนยันว่า ML พร้อม / Check the dependencies required by the next stage; successful data processing alone is insufficient.</p></section>
            <section className="mt-4 min-w-0 rounded-lg bg-white p-4 text-sm leading-7 text-slate-700"><h3 className="font-semibold text-slate-900">หลักฐานและ custody / Evidence and custody</h3>
              <div className="mt-3 overflow-x-auto"><table className="min-w-[500px] w-full text-left text-sm tabular-nums"><thead><tr><th className="px-3 py-2">Evidence set</th><th className="px-3 py-2">Files</th><th className="px-3 py-2">Bytes</th></tr></thead><tbody className="divide-y divide-slate-200"><tr><td className="px-3 py-2">PASS · models and diagnostics</td><td className="px-3 py-2">231</td><td className="px-3 py-2">8,999,779</td></tr><tr><td className="px-3 py-2">FAIL · missing NumPy before training</td><td className="px-3 py-2">2</td><td className="px-3 py-2">5,128</td></tr><tr><td className="px-3 py-2">Environment import check</td><td className="px-3 py-2">1</td><td className="px-3 py-2">342</td></tr><tr className="font-semibold"><td className="px-3 py-2">รวม / Total</td><td className="px-3 py-2">234</td><td className="px-3 py-2">9,005,249</td></tr></tbody></table></div>
              <p className="mt-3">Run directories ใต้ / under <code className="break-all">evidence/exp4/training/</code>:</p><ul className="mt-2 space-y-1 break-all font-mono text-xs"><li>PASS: exp4-g5-training-cbe12d85f10b4260a1a478cfc690caf7</li><li>FAIL: exp4-g5-training-6bb129d13a29469d94019b88ec252849</li><li>ENV: exp4-g5-env-check-3b14463ea6884ae5a51d7209d4eb63eb</li></ul>
              <p className="mt-3">Runtime code <code>1ce437f</code> · Evidence <code>20c4994</code> · Review/checkpoint <code>b5774c2</code>.</p><p className="mt-2 break-all">PASS receipt SHA-256: <code>2324d9029980d838e1c19116c6bb5f78891a9bcb080e546e172d848393f92a88</code></p>
              <p className="mt-2">ผู้ใช้ตรวจ output hashes, source→copy, committed hashes ทั้ง 234 ไฟล์ และ remote reachability ผ่าน; ต้นฉบับ outputs บน Mac ยังคงอยู่ / Owner verified output/copy/committed bytes and remote reachability; original outputs retained. Assistant อ่าน remote receipts ทั้งสามชุดและ combined reports / reviewed all three remote receipts and combined reports.</p><p className="mt-2">ตาม owner handoff: sync G5 checkpoint ลง Mac แล้วและ worktree สะอาด / Owner handoff confirms checkpoint sync and a clean Mac worktree. ไม่มี independent reviewer หรือ independent clean restore / No independent reviewer or clean-restore claim.</p>
              <p className="mt-2">Receipt เดิมยังระบุ pending custody ตามเวลารัน; additive review ภายหลังปิด G5 โดยไม่แก้ bytes เดิม / The runtime receipt retains its historical pending status; the later review closes the gate.</p>
            </section>
            <p className="mt-4 text-sm leading-7 text-slate-700"><strong>ขั้นต่อไป / Next:</strong> G6 จะใช้ saved models เปรียบเทียบ NO_OFFER, UNIFORM และ CHEAPEST_SUITABLE บน EVALUATION โดยไม่ retrain/tune; G7 ตรวจ reload/reproduction และ sensitivity ตาม frozen contract / G6 compares frozen policies on held-out data without retraining or tuning; G7 covers fresh-process reload, reproduction and contracted sensitivity checks.</p>
            <p className="mt-3 text-sm leading-7 text-slate-700"><strong>ข้อจำกัด / Claim boundary:</strong> Training PASS ไม่เท่ากับ ML superiority; same-process reload ไม่ปิด G7; synthetic results ไม่พิสูจน์ real-world uplift ไม่มีการเปลี่ยนเกณฑ์ย้อนหลังเพื่อให้ ML ชนะ / Training, recovery and business performance are distinct claims; no retrospective rule changes. ML ชนะ เสมอ หรือแพ้ baseline ก็ปิด learning loop อย่างซื่อสัตย์ได้ / Winning, tied or losing outcomes can all complete an honest learning loop.</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <a className="underline text-teal-800" href="https://github.com/msararin/nbo-nrt-mlops-usecase/blob/b5774c282d42077eb85b99fe608a0fe5ff4efead/docs/experiments/exp4/G5_TRAINING_REVIEW_2026-10-23.md" target="_blank" rel="noreferrer">G5 review · b5774c2 ↗</a>
              <a className="underline text-teal-800" href="https://github.com/msararin/nbo-nrt-mlops-usecase/tree/20c49945cd88fa8eeeb5e7967f7c2a5a1e6798cb/evidence/exp4/training" target="_blank" rel="noreferrer">G5 evidence snapshot · 20c4994 ↗</a>
              <a className="underline text-teal-800" href="https://github.com/msararin/nbo-nrt-mlops-usecase/blob/1ce437f59a51ef2981ff1c1b53cd299a6b3f1961/docs/experiments/exp4/G5_IMPLEMENTATION_REVIEW_2026-10-23.md" target="_blank" rel="noreferrer">G5 implementation review · before runtime ↗</a>
            </div>
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
          <p id="exp4-current-evidence" className="mt-5 text-xs leading-6 text-slate-600"><strong>Current evidence · 23 October 2026 / หลักฐานปัจจุบัน:</strong> G1/G2/G3/G4/G5 COMPLETE under <code>EXP4_FREEZE:v1</code>; G2 is bounded component validation. G3 review <code>27638db</code>; G4 review <code>78254c3</code>; G5 review <code>b5774c2</code> accepts six saved fixed models and custody of 234 files. G6 <code>NOT_STARTED</code>; G7 recovery/reproduction/closeout is <code>NOT_COMPLETE</code>. ณ G3 fresh-process resume ยัง NOT_PERFORMED; G4 ผ่านเฉพาะ PASS_BOUNDED_G4_INPUTS_ONLY; G5 ผ่าน same-process model reload เท่านั้น / Historical recovery boundaries remain distinct; fresh-process model reload and clean remote restore remain unverified. Experiment 4 remains <strong>IN PROGRESS</strong>. Freeze supersedes historical NOT_FROZEN wording; earlier dated receipts retain their original status. Experiment 3 remains <code>PAUSED_SAFE</code>; <code>B1_COMPLETE=NO</code>.</p>
        <p className="mt-4 text-sm leading-6 text-slate-600"><strong>Simulation boundary:</strong> prices, costs and behavior are assumptions—not actual operator outcomes.</p>
      </Panel>
    </div>}
  </div>
}
