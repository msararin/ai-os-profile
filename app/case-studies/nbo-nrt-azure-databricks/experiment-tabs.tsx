"use client"

import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const phases = [
  {
    phase: "Phase 1 — Data Foundation and Ingestion",
    status: "Complete",
    description: "Establish traceable non-production source inputs and governed Bronze evidence.",
    currentResult: "Research, composite generation, ADLS landing, Unity Catalog access, Bronze ingestion, and the Bronze Quality Gate are complete.",
    remark: "Hands-on development evidence only. File Events remains deferred and did not block batch ingestion. No production customer data or production-readiness claim.",
    subphases: [
      ["Data-source research", "Verified", "10 public candidates assessed and bounded source roles selected."],
      ["Target contract", "Verified", "Contract v0.1.0, 108 fields, and two isolated evidence lanes."],
      ["Synthetic composite", "Verified", "11 canonical CSV tables and 805 source rows generated and validated."],
      ["ADLS landing and read-back", "Proven", "12/12 local-to-ADLS byte hashes matched."],
      ["Unity Catalog access", "Proven", "Governed access to the landed package verified."],
      ["Bronze ingestion", "Complete", "12 governed Bronze tables created with 806 total table rows."],
      ["Bronze Quality Gate", "Complete", "Row counts, source-file counts, metadata, table checks, and cross-table closure passed."],
    ],
  },
  {
    phase: "Phase 2 — Data Preparation and Feature Readiness",
    status: "Complete",
    description: "Prepare bounded Silver and model-ready synthetic experiment data.",
    currentResult: "Silver preparation, dataset profiling, model-ready data construction, quality checks, and read-back evidence are complete for the synthetic experiment lane.",
    remark: "This is assumption-derived synthetic experiment data, not observed operator behavior or production feature truth.",
    subphases: [
      ["Target contract structure", "Verified", "Required source domains and target fields reconciled."],
      ["Evidence-lane separation", "Verified", "Methodology and synthetic decision-loop lanes remain isolated."],
      ["Provenance requirements", "Verified", "Source, derivation, run, and lineage fields retained."],
      ["Preparation logic", "Complete", "Cleaning, temporal, null, and quality rules executed."],
      ["Dataset profiling", "Complete", "Simulation dataset profile and class distribution recorded."],
      ["Silver transformation", "Complete", "Bounded Silver preparation executed and read back."],
      ["Feature preparation", "Complete", "Model-ready simulation dataset created."],
      ["Quality and freshness read-back", "Verified", "Quality gate and model-ready checks passed."],
    ],
  },
  {
    phase: "Phase 3 — Eligibility and Candidate Generation",
    status: "Complete",
    description: "Implement bounded policy, candidate, and decision-loop preparation.",
    currentResult: "Eligibility/policy contracts, candidate generation, decision-table persistence, and candidate/ranking inputs are implemented in the synthetic experiment lane.",
    remark: "Rules and relationships are PoC assumptions. They are not operator production rules or observed customer-behavior truth.",
    subphases: [
      ["Eligibility concept", "Verified", "Eligibility remains separated from model ranking."],
      ["Rule and exclusion structure", "Complete", "Bounded behavior-policy contract created and read back."],
      ["Candidate-table contract", "Complete", "Candidate fields, lineage, and trace requirements implemented."],
      ["Candidate versioning", "Verified", "Rule, run, and candidate-version fields retained."],
      ["Rule implementation", "Complete", "Synthetic policy logic executed."],
      ["Candidate generation", "Complete", "Customer-offer candidates generated for the experiment lane."],
      ["Candidate persistence", "Complete", "Candidate and simulation decision tables persisted and read back."],
      ["Candidate/ranking reconciliation", "Verified", "Decision-loop and ranking records reconciled within the bounded experiment."],
    ],
  },
  {
    phase: "Phase 4 — Baseline Ranking and Model Governance",
    status: "Complete with quality gap",
    description: "Train, track, register, read back, and evaluate the synthetic baseline model.",
    currentResult: "Training, MLflow tracking, Unity Catalog model registration, Candidate alias assignment, and registered-model read-back are complete. Model quality is not approved.",
    remark: "Lifecycle execution passed; business readiness did not. Candidate is not Champion. Production promotion is not authorized.",
    subphases: [
      ["Baseline model training", "Complete", "Synthetic propensity baseline trained on 10,000 rows."],
      ["MLflow tracking", "Complete", "Parameters, metrics, artifacts, and lineage logged."],
      ["Model registration", "Complete", "Model registered in Unity Catalog as version 1 with Candidate alias."],
      ["Registered-model read-back", "Verified", "Prediction and probability read-back matched."],
      ["Default threshold 0.50", "Failed", "No positive predictions; precision, recall, and F1 were 0."],
      ["Threshold analysis", "Complete", "Best-F1 threshold 0.24 analyzed."],
      ["Threshold 0.24", "Not approved", "High recall with low precision; operational selection requires business capacity and cost criteria."],
      ["Model discrimination", "Weak-to-moderate", "ROC AUC 0.6294 and PR AUC 0.3941."],
      ["Production promotion", "Not authorized", "Synthetic experiment only; no Champion promotion."],
    ],
  },
  {
    phase: "Phase 5 — Top-N NBO Output and NRT Delivery Preparation",
    status: "In Progress",
    description: "Carry governed ranking evidence toward a simulated downstream delivery boundary.",
    currentResult: "Synthetic ranking and selected-decision evidence exist. TMF680-aligned payload delivery, NRT latency evidence, and downstream integration are not complete.",
    remark: "LID680 remains a traceability label only. No internal meaning, real delivery integration, or NRT SLA is asserted.",
    subphases: [
      ["Ranking-result evidence", "Verified", "Synthetic ranking-result records and score evidence are available."],
      ["Selected-decision evidence", "Verified", "Synthetic next-best-offer decisions are persisted and traceable."],
      ["Top-N output contract", "Complete", "Score, model version, decision time, and trace fields defined."],
      ["TMF680-aligned payload", "Not started", "No simulated payload read-back yet."],
      ["Simulated NRT delivery", "Not started", "No downstream delivery execution."],
      ["Latency measurement", "Not started", "No NRT-oriented end-to-end latency evidence."],
    ],
  },
  {
    phase: "Phase 6 — Feedback, Monitoring, and Next Cycle",
    status: "In Progress",
    description: "Use synthetic outcomes to define feedback and future monitoring controls.",
    currentResult: "Synthetic exposure/response evidence and threshold analysis exist. Drift monitoring, production thresholds, and retraining governance are not complete.",
    remark: "Reward values, attribution windows, and thresholds remain PoC assumptions. Monitoring is not production-standard evidence.",
    subphases: [
      ["Exposure and response records", "Verified", "Synthetic offer-exposure and response-event evidence exists."],
      ["Outcome analysis", "Complete", "Selected-score and threshold outcome analysis completed."],
      ["Reward design", "Design complete", "Immediate and delayed outcomes remain explicit assumptions."],
      ["Monitoring dimensions", "Design complete", "Quality, freshness, latency, score, recommendation, and outcome dimensions defined."],
      ["Drift monitoring", "Not started", "No measured production or real-world drift."],
      ["Operational threshold", "Not approved", "Business-capacity and cost-based selection is required."],
      ["Retraining or policy update", "Not started", "No governed next-cycle execution."],
    ],
  },
]

const alignment = [
  ["Product catalogue modernization", "Product and offer data ingestion"],
  ["Behavioural, transactional, and event modernization", "Customer-signal and event ingestion"],
  ["ETL migration", "Databricks Bronze–Silver processing as a PoC implementation choice"],
  ["Data to M5", "Low-latency event and payment data preparation. “M5” is retained only as a traceability label; no internal system meaning is asserted."],
  ["Episodic NBO model interval", "Governed recommendation execution interval; no source-specific meaning of “episodic” is inferred."],
  ["NBO model direction", "Reinforcement Learning remains the target direction; the completed v1 experiment uses a simpler propensity baseline."],
  ["TMF680 to LID680", "TMF680-aligned recommendation output with a simulated downstream handoff. “LID680” is retained only as a traceability label."],
  ["PII hashing checkpoints", "Identifier-protection controls represented in the PoC without asserting production placement or implementation."],
]

const modelMetrics = [
  ["Training rows", "8,002"], ["Test rows", "1,998"], ["Positive rate", "31.48%"], ["ROC AUC", "0.6294"], ["PR AUC", "0.3941"],
  ["Threshold 0.50 F1", "0.0000"], ["Analyzed threshold", "0.24 — not approved"], ["Threshold 0.24 F1", "0.4955"],
  ["Threshold 0.24 precision", "0.3421"], ["Threshold 0.24 recall", "0.8984"],
]

const preparationSections = [
  ["1", "Existing AIOS agents accelerated candidate research", "Existing AIOS Research, Data, and ML roles were used to compare public sources, schema/provenance gaps, and whether the data could support training, ranking, and threshold analysis."],
  ["2", "Flexible composition responded to limited direct-fit data", "Selected source structures were retained where useful; missing customer–offer–exposure–response relationships were generated under explicit synthetic assumptions and provenance markers."],
  ["3", "AIOS governance remained visible", "Role separation, assumption/provenance tracking, evidence lanes, provider-cost recording, telemetry, validation receipts, and explicit claim boundaries remained visible through preparation."],
  ["4", "A small governed package proved the data path first", "11 canonical CSV tables and 805 source rows were enough to verify contracts, relationships, event order, ADLS landing, Unity Catalog access, Bronze ingestion, Silver transformation, and model-ready construction before scaling volume."],
  ["5", "Volume was added only after Silver", "After Silver and the model-ready gate passed, the dataset was expanded to 10,000 synthetic observations for model behaviour, threshold sensitivity, MLflow tracking, registration, and read-back—not to manufacture a successful metric."],
]

function statusBadgeClass(status: string) {
  const normalized = status.toLowerCase()
  if (["complete", "completed", "verified", "proven", "passed", "selected", "designed"].includes(normalized)) return "border-emerald-700 bg-emerald-100 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950 dark:text-emerald-100"
  if (normalized.includes("in progress") || normalized.includes("quality gap") || normalized.includes("weak-to-moderate") || normalized.includes("not approved") || normalized.includes("pending")) return "border-amber-700 bg-amber-100 text-amber-950 dark:border-amber-500 dark:bg-amber-950 dark:text-amber-100"
  if (normalized.includes("failed")) return "border-red-700 bg-red-100 text-red-950 dark:border-red-500 dark:bg-red-950 dark:text-red-100"
  if (normalized.includes("not started") || normalized.includes("not authorized") || normalized.includes("unknown")) return "border-slate-500 bg-slate-200 text-slate-950 dark:border-slate-500 dark:bg-slate-800 dark:text-slate-100"
  return "border-sky-600 bg-sky-100 text-sky-950 dark:border-sky-500 dark:bg-sky-950 dark:text-sky-100"
}

function ExperimentOne() {
  return <div className="space-y-10">
    <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Data Preparation — From Multi-Agent Research to Model-Ready Volume</h2><p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">The preparation journey began with limited direct-fit public Telco data and ended with a governed 10,000-row model experiment. Volume was added only after Silver was stable.</p><div className="mt-6 space-y-3">{preparationSections.map(([number,title,body]) => <details key={number} className="group rounded-lg border border-border bg-background"><summary className="cursor-pointer list-none p-5 font-semibold text-foreground"><span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{number}</span>{title}</summary><div className="border-t border-border p-5 text-sm leading-7 text-muted-foreground">{body}</div></details>)}</div></section>

    <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Alignment to the Given Recommendation</h2><p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">Source-specific labels are retained for traceability only. The mapping does not assert undocumented system semantics, ownership, production interfaces, or production performance.</p><div className="mt-5 overflow-x-auto rounded-lg border border-border bg-background"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-muted/50"><tr><th className="p-3">Recommendation area</th><th className="p-3">Public PoC abstraction</th></tr></thead><tbody className="divide-y divide-border text-muted-foreground">{alignment.map(([area, abstraction]) => <tr key={area}><th className="p-3 align-top text-foreground">{area}</th><td className="p-3">{abstraction}</td></tr>)}</tbody></table></div></section>

    <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">PoC execution phases</h2><p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">Green means executed or verified. Amber marks an active quality or approval gap. Red marks a failed gate. Gray marks work not started or not authorized.</p><div className="mt-6 grid gap-5 lg:grid-cols-2">{phases.map((item) => <Card key={item.phase}><CardHeader><div className="flex flex-wrap items-start justify-between gap-3"><CardTitle>{item.phase}</CardTitle><Badge variant="outline" className={statusBadgeClass(item.status)}>{item.status}</Badge></div></CardHeader><CardContent className="space-y-4 text-sm leading-6 text-muted-foreground"><p><strong className="text-foreground">Description:</strong> {item.description}</p><p><strong className="text-foreground">Current result:</strong> {item.currentResult}</p><p><strong className="text-foreground">Boundary:</strong> {item.remark}</p><details className="rounded-md border border-border bg-background"><summary className="cursor-pointer list-none p-4 font-semibold text-foreground">Sub-phase evidence</summary><div className="overflow-x-auto border-t border-border p-4"><table className="w-full min-w-[760px] text-left text-xs"><thead className="bg-muted/50"><tr><th className="p-2">Sub-phase</th><th className="p-2">Status</th><th className="p-2">Evidence / result</th></tr></thead><tbody className="divide-y divide-border">{item.subphases.map(([subphase,status,result]) => <tr key={subphase}><th className="p-2 align-top text-foreground">{subphase}</th><td className="p-2"><Badge variant="outline" className={statusBadgeClass(status)}>{status}</Badge></td><td className="p-2">{result}</td></tr>)}</tbody></table></div></details></CardContent></Card>)}</div></section>

    <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Model Run V1 — bounded appendix</h2><div className="mt-5 grid gap-5 lg:grid-cols-2"><Card><CardHeader><CardTitle>Lifecycle evidence</CardTitle></CardHeader><CardContent className="space-y-3 text-sm leading-6 text-muted-foreground"><p>Simulation training dataset: <strong className="text-foreground">10,000 rows</strong></p><p>MLflow run: <code>b12f16ab527c419b8a394f6f3d3d9f5a</code></p><p>Registered model: <code>adb_nbo_nrt_mlops_dev.models.nbo_response_propensity_baseline</code></p><p>Version 1 · Alias <strong className="text-foreground">Candidate</strong></p><p>Prediction and probability read-back: <strong className="text-foreground">verified</strong></p></CardContent></Card><Card><CardHeader><CardTitle>Quality and threshold evidence</CardTitle></CardHeader><CardContent><table className="w-full text-left text-sm"><tbody className="divide-y divide-border text-muted-foreground">{modelMetrics.map(([metric,value]) => <tr key={metric}><th className="p-2 text-foreground">{metric}</th><td className="p-2">{value}</td></tr>)}</tbody></table></CardContent></Card></div><Alert className="mt-5 border-red-500/40 bg-red-500/5"><AlertDescription><strong>Default threshold 0.50 failed for the positive class.</strong> Threshold 0.24 was analyzed, not approved. Candidate must not be promoted to Champion without real-world validation and production governance.</AlertDescription></Alert></section>

    <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Current claim boundary</h2><div className="mt-4 max-w-4xl space-y-3 text-sm leading-6 text-muted-foreground"><p><strong className="text-foreground">Pipeline and MLOps execution:</strong> PASS</p><p><strong className="text-foreground">Model registration and read-back:</strong> PASS</p><p><strong className="text-foreground">Default threshold classification:</strong> FAIL</p><p><strong className="text-foreground">Model discrimination:</strong> WEAK-TO-MODERATE</p><p><strong className="text-foreground">Business readiness:</strong> NOT READY</p><p><strong className="text-foreground">Production promotion:</strong> NOT AUTHORIZED</p><p className="rounded-md border border-border bg-background px-4 py-3 font-semibold text-foreground">SYNTHETIC_EXPERIMENT_ONLY — not operator behavior truth and not production performance evidence.</p></div></section>
  </div>
}

function ExperimentTwoA() {
  const flow = [
    ["1", "Synthetic World Specification", "AIOS Data Team owns the experiment-world contract before any new data is released.", "G0 / G1", "Define"],
    ["2", "Customer population + latent state", "Define bounded customer population structure and hidden state that can drive behavior without leaking oracle truth into features.", "G2 / G4", "Design"],
    ["3", "Observable Telco behavior", "Generate observable customer behavior from the latent world while preserving realistic variability and provenance.", "G2 / G3", "Design"],
    ["4", "Context / event generation", "Generate decision context, event timing, channel and related observable signals that connect customer state to a decision opportunity.", "G2 / G3", "Design"],
    ["5", "Offer interaction", "Create offer-fit and candidate interaction logic using observed seed structure where available and explicit assumptions where the seed is sparse.", "G3 / G5", "Design"],
    ["6", "Exposure", "Represent what was actually shown, preserve action/candidate membership and avoid treating non-selection as rejection.", "G3 / G5", "Design"],
    ["7", "Probabilistic response", "Generate stochastic customer outcomes rather than deterministic labels; keep response timing, uncertainty and assumption lineage explicit.", "G5", "Design"],
    ["8", "Hidden evaluation truth", "Keep latent/oracle information sealed from training features so generalization, leakage and holdout checks remain meaningful.", "G4 / G6 / G7", "Gate-controlled"],
  ]

  const gates = [
    ["G0", "Purpose & Claim", "Lock what the synthetic experiment is allowed to demonstrate and what it must not claim."],
    ["G1", "Provenance / Reproducibility", "Require versioned rules, source/assumption labels, deterministic controls and reproducible generation evidence."],
    ["G2", "Statistical Realism", "Check that generated distributions are plausible extensions of the governed seed rather than literal row replication."],
    ["G3", "Behavioral Coherence", "Check that customer, context, eligibility, offer, exposure and response relationships remain internally coherent."],
    ["G4", "Leakage / Oracle Separation", "Prevent hidden state, generator shortcuts or identifiers from becoming an easy proxy for evaluation truth."],
    ["G5", "Outcome Independence", "Require stochastic outcome generation and prevent one feature, offer or rule from deterministically controlling the label."],
    ["G6", "Hidden Challenge / Holdout", "Reserve a hidden challenge or holdout mechanism so the generated world can test generalization rather than memorization."],
    ["G7", "Data Release Authorization", "Only after prior gates pass may the prepared Experiment 2 dataset be released to downstream modeling or MLOps execution."],
  ]

  const provenanceLabels = ["OBSERVED_DISTRIBUTION", "OBSERVED_CONDITIONAL", "ASSUMPTION_DERIVED", "EXPLORATION_POLICY", "CONTROLLED_NOISE", "CONTROLLED_MISSINGNESS", "DRIFT_SCENARIO"]
  const glossary: Record<string, string> = {
    "stochastic": "มีความสุ่มหรือความไม่แน่นอนแบบควบคุมได้ เช่น ลูกค้าที่มีบริบทคล้ายกันไม่จำเป็นต้องตอบสนองต่อ offer เหมือนกันทุกครั้ง",
    "preserve lineage": "เก็บสายทางของข้อมูลไว้ครบว่า record นี้มาจาก source, rule, run หรือ transformation ใด เพื่อย้อนตรวจสอบและทำซ้ำได้",
    "provenance": "ข้อมูลที่บอกที่มาและสถานะของข้อมูลหรือกฎ เช่น มาจากสิ่งที่สังเกตจริง ความสัมพันธ์ที่คำนวณได้ หรือสมมติฐานที่สร้างขึ้น",
    "deterministic controls": "กลไกควบคุมที่ทำให้ใช้ input, configuration และ seed เดิมแล้วสามารถสร้างผลลัพธ์เดิมเพื่อทดสอบซ้ำได้",
    "candidate grain": "ระดับความละเอียดของ candidate record เช่น หนึ่งแถวต่อ decision × customer × offer เพื่อป้องกันการ join หรือ label ผิดระดับ",
    "real customer propensity": "แนวโน้มจริงของลูกค้าในการตอบสนองต่อ offer ซึ่งต้องพิสูจน์จากพฤติกรรมลูกค้าที่สังเกตได้จริง ไม่ใช่จาก synthetic data",
  }
  const glossaryPattern = /(Real customer propensity|preserve lineage|deterministic controls|candidate grain|provenance|stochastic)/gi
  const withGlossary = (text: string) => text.split(glossaryPattern).map((part, index) => {
    const key = part.toLowerCase()
    const definition = glossary[key]
    if (!definition) return part
    return <span key={`${part}-${index}`} className="group/term relative inline-block cursor-help border-b border-dotted border-current" tabIndex={0}>{part}<span role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 hidden w-72 -translate-x-1/2 rounded-md border border-border bg-popover px-3 py-2 font-sans text-xs font-normal leading-5 text-popover-foreground shadow-lg group-hover/term:block group-focus/term:block">{definition}</span></span>
  })

  const principleExplanations = [
    ["Observed seed distributions", "การกระจายที่เห็นจริงจาก seed", "ใช้ข้อมูลตั้งต้นเป็นฐานก่อนสร้างสิ่งใหม่ เช่น สัดส่วน segment หรือ response state ที่พบจริงใน governed seed"],
    ["Observed conditional relationships", "ความสัมพันธ์ที่สังเกตได้", "ดูความสัมพันธ์ระหว่างตัวแปร ไม่ใช่แค่สัดส่วนเดี่ยว เช่น segment × event × channel มี pattern แตกต่างกัน"],
    ["Controlled assumptions", "สมมติฐานที่สร้างเพิ่มอย่างควบคุม", "ใช้เมื่อ seed ไม่มีความหลากหลายพอ เช่น เพิ่มกรณี 0, 1, 2 หรือ 4 eligible offers และติดป้าย ASSUMPTION_DERIVED"],
    ["Exploration policy", "นโยบายการสำรวจทางเลือก", "ไม่เลือก rank 1 ทุกครั้ง เพื่อให้ action space มีความหลากหลายและบันทึก probability ของ action ที่เลือกไว้"],
    ["Stochastic noise", "ความไม่แน่นอนแบบสุ่มที่ควบคุมได้", "ลูกค้าที่คล้ายกันไม่ต้องตอบเหมือนกัน 100% เช่น คนหนึ่ง click แต่อีกคน ignore จาก probability draw"],
    ["Delayed outcomes", "ผลลัพธ์ที่เกิดคนละเวลา", "จำลอง view → click → accept ที่เกิดห่างกัน ไม่บังคับให้ทุก outcome เกิดทันทีในแถวเดียว"],
    ["Controlled missingness", "ข้อมูลขาดแบบตั้งใจและ trace ได้", "ใช้ทดสอบ robustness เช่น optional context มาช้าหรือหายบางส่วน แต่ key fields ต้องไม่ถูกทำลาย"],
    ["Drift scenarios", "สถานการณ์ที่ distribution เปลี่ยน", "ใช้ทดสอบ monitoring เช่น channel migration, response-rate decay หรือ offer category ใหม่ โดยไม่ปนกับ baseline เงียบ ๆ"],
  ]

  return <div className="space-y-10">
    <section>
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Experiment 2 — Data Preparation Status</h2>
        <Badge variant="outline">AIOS DATA TEAM OWNS</Badge>
      </div>
      <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Experiment 2 starts from a detailed Silver-layer audit, not from a request to create more rows. The audit found governance metadata but sparse customer behavior, sparse offer semantics, deterministic heuristic ranking, synthetic sampled response and no business reward. The bounded response is to prepare a richer synthetic world through <strong className="text-foreground">Behavior Simulation v2 + Offer Enrichment v2</strong> under explicit data-readiness gates before downstream modeling.</p>
      <Alert className="mt-5 border-amber-500/30 bg-amber-500/5"><AlertDescription className="text-sm leading-6"><strong>Key decision:</strong> {withGlossary("do not confuse scale with readiness. First build and validate the world, provenance, behavioral coherence, oracle separation and outcome independence; modeling waits for G7 Data Release Authorization.")}</AlertDescription></Alert>
    </section>

    <details className="group rounded-lg border border-border bg-background">
      <summary className="cursor-pointer list-none p-5 font-semibold text-foreground">Key Decision — why Behavior Simulation v2 + Offer Enrichment v2</summary>
      <div className="space-y-4 border-t border-border p-5 text-sm leading-7 text-muted-foreground">
        <p><strong className="text-foreground">Observed from the Silver audit:</strong> governance structure existed, but the learning world remained too thin in customer behavior and offer semantics; ranking was heuristic/deterministic, response was synthetically sampled, and no business reward had been established.</p>
        <p><strong className="text-foreground">Decision:</strong> authorize a data-preparation experiment that strengthens the synthetic world before relying on larger volume or model metrics.</p>
        <p><strong className="text-foreground">Ownership:</strong> AIOS Data Team owns synthetic-world specification and readiness evidence. ML work remains downstream of the data-release gate.</p>
      </div>
    </details>

    <section>
      <h3 className="text-xl font-semibold text-foreground">Data Preparation flow</h3>
      <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Summary stays visible; assumptions, rules, evidence and blockers stay expandable.</p>
      <div className="mt-5 space-y-4">
        {flow.map(([step,title,prepares,gate,status]) => <details key={step} className="group rounded-lg border border-border bg-background">
          <summary className="cursor-pointer list-none p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><p className="font-semibold text-foreground"><span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{step}</span>{title}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{withGlossary(prepares)}</p></div>
              <div className="flex flex-wrap gap-2"><Badge variant="outline">{status}</Badge><Badge variant="outline">{gate}</Badge></div>
            </div>
          </summary>
          <div className="grid gap-4 border-t border-border p-5 text-sm leading-7 text-muted-foreground md:grid-cols-2">
            <div><p className="font-semibold text-foreground">Reference principle</p><p className="mt-2">{withGlossary("Use governed seed evidence where available, distinguish observed relationships from assumptions, and preserve lineage through every generated relationship.")}</p></div>
            <div><p className="font-semibold text-foreground">What remains inside the gate</p><p className="mt-2">Objective, required evidence, assumptions, technical rules, validation evidence, blocker/open question and pass/fail decision.</p></div>
          </div>
        </details>)}
      </div>
    </section>

    <details className="group rounded-lg border border-border bg-background">
      <summary className="cursor-pointer list-none p-5 font-semibold text-foreground">Reference Principles — how synthetic preparation is grounded</summary>
      <div className="space-y-5 border-t border-border p-5 text-sm leading-7 text-muted-foreground">
        <details className="group/principle rounded-md border border-border bg-muted/20">
          <summary className="cursor-pointer list-none p-4 font-mono text-xs leading-6 text-foreground sm:text-sm">Observed seed distributions<br/>+ observed conditional relationships<br/>+ controlled assumptions<br/>+ exploration policy<br/>+ {withGlossary("stochastic")} noise<br/>+ delayed outcomes<br/>+ controlled missingness<br/>+ drift scenarios<br/>= governed synthetic experiment world</summary>
          <div className="space-y-3 border-t border-border p-4 font-sans text-sm leading-7 text-muted-foreground">
            {principleExplanations.map(([term,thai,example]) => <div key={term}><p className="font-semibold text-foreground">{term} — {thai}</p><p className="mt-1">ตัวอย่าง: {example}</p></div>)}
            <p className="rounded-md border border-border bg-background p-3 font-semibold text-foreground">แนวคิดสำคัญ: เราไม่ได้ “ปั๊มจำนวนแถว” แต่สร้างโลกจำลองที่แยกชัดว่าอะไร observed, อะไรเป็นความสัมพันธ์ที่พบ, อะไรเป็น assumption และอะไรคือความไม่แน่นอนที่ตั้งใจใส่เข้ามา</p>
          </div>
        </details>
        <ul className="list-disc space-y-2 pl-5"><li>Do not duplicate rows to manufacture scale.</li><li>Do not overwrite canonical Bronze or Silver data.</li><li>Use a separate versioned simulation lane.</li><li>{withGlossary("Generate outcomes stochastically; no offer or feature may be hard-coded to always win.")}</li><li>Sparse seed cells require smoothing/backoff rather than direct probability copying.</li><li>{withGlossary("Preserve deterministic reproducibility, customer-level split integrity and complete provenance labels.")}</li></ul>
        <div className="flex flex-wrap gap-2">{provenanceLabels.map((label) => <Badge key={label} variant="outline">{label}</Badge>)}</div>
      </div>
    </details>

    <section>
      <h3 className="text-xl font-semibold text-foreground">G0–G7 readiness gates</h3>
      <div className="mt-5 grid gap-4 md:grid-cols-2">{gates.map(([gate,title,objective]) => <details key={gate} className="group rounded-lg border border-border bg-background"><summary className="cursor-pointer list-none p-5"><div className="flex items-start justify-between gap-4"><div><p className="font-semibold text-foreground">{gate} — {title}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{withGlossary(objective)}</p></div><Badge variant="outline">Gate</Badge></div></summary><div className="border-t border-border p-5 text-sm leading-7 text-muted-foreground"><p><strong className="text-foreground">Expandable evidence contract:</strong> objective → required evidence → current status → blocker/open question → pass/fail decision.</p></div></details>)}</div>
    </section>

    <details className="group rounded-lg border border-border bg-background">
      <summary className="cursor-pointer list-none p-5 font-semibold text-foreground">Supporting governance controls</summary>
      <div className="space-y-4 border-t border-border p-5 text-sm leading-7 text-muted-foreground">
        <p>{withGlossary("Label provenance, assumption register, candidate grain, generator-to-feature leakage mapping, risk register and decision telemetry remain required supporting controls, but they sit under the relevant data-preparation gates rather than defining the Experiment 2 story by themselves.")}</p>
        <p><strong className="text-foreground">Claim boundary:</strong> {withGlossary("synthetic/composite learning evidence only. Real customer propensity, commercial uplift, causal effectiveness, production readiness, contextual-bandit readiness and RL readiness are not established by this preparation work.")}</p>
      </div>
    </details>
  </div>
}

function ExperimentTwoB() {
  const sharedFoundation = [
    ["Governed synthetic world", "Same", "Experiment 2B starts from the same bounded synthetic NBO/NRT decision environment prepared for Experiment 2A."],
    ["RC1 / data-preparation foundation", "Same", "The repaired candidate-set and model-visible handoff remain the shared upstream foundation; no separate data world was regenerated for 2B."],
    ["Temporal and leakage controls", "Same", "TRAIN / TEST discipline, leakage checks, exposure semantics, and persisted lineage remain shared controls."],
    ["Claim ceiling", "Same", "Both lanes remain bounded to SYNTHETIC_LEARNING_AND_MLOPS_EVIDENCE_ONLY."],
  ]

  const differences = [
    ["Scientific question", "Can observable features generalize to held-out response labels?", "Does a deterministic greedy target policy have higher offline estimated reward than the logged behavior policy?"],
    ["Method", "Supervised response modeling", "Logged contextual-bandit offline policy evaluation"],
    ["Core inputs", "Features + response label", "Context + chosen action + logged propensity + observed reward"],
    ["Primary metrics", "ROC-AUC / PR-AUC", "IPS / SNIPS, bootstrap uncertainty, action support, importance-weight stability, ESS"],
    ["Current verdict", "Generalization issue remains separate", "Positive held-out offline policy-value evidence with statistical and support diagnostics"],
  ]

  const steps = [
    ["1", "Recover persisted logged interactions", "Resumed from adb_nbo_nrt_mlops_dev.simulation.bandit_logged_interactions_v0_2 after notebook in-memory state reset.", "10,000 rows; null chosen-action probabilities 0; non-positive probabilities 0."],
    ["2", "Reconstruct deterministic greedy target policy", "Used greedy_action, chosen_action, chosen_action_probability and observed_reward to reconstruct target-match and importance-weight state.", "Overall target/logged match rate 84.54%; mean importance weight 0.9986; max 1.3889."],
    ["3", "Evaluate TRAIN and held-out TEST", "Calculated behavior reward, IPS and SNIPS separately by split.", "TEST IPS lift +2.018 pp; TEST SNIPS lift +1.250 pp. TRAIN direction is also positive."],
    ["4", "Bootstrap held-out uncertainty", "Ran 500 TEST bootstrap replicates with deterministic seed 20260813.", "IPS lift 95% CI [+0.598, +3.220] pp; SNIPS lift 95% CI [+0.313, +2.148] pp — both above zero."],
    ["5", "Check empirical action-level support", "Verified overlap separately for LOYALTY, DATA, ROAMING, VOICE and BUNDLE.", "Action match rates range 80.23%–91.92%; matched propensity floor 0.72; max importance weight 1.3889; no action-level blind spot observed."],
    ["6", "Check effective sample size", "Measured ESS per greedy action to detect hidden weight concentration.", "ESS retention ranges 98.78%–99.78% of matched logged rows across all five actions."],
  ]

  return <div className="space-y-10">
    <section>
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Experiment 2B — Offline Policy Evaluation</h2>
        <Badge variant="outline" className={statusBadgeClass("Passed")}>PASS WITH STATISTICAL SUPPORT</Badge>
      </div>
      <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Experiment 2B is a new evidence lane, not a replacement for Experiment 2A. It reuses the same governed synthetic foundation but asks a different scientific question: whether an alternative action-selection policy has higher estimated value under logged behavior-policy data.</p>
    </section>

    <details className="group rounded-lg border border-border bg-background" open>
      <summary className="cursor-pointer list-none p-5 font-semibold text-foreground">Shared foundation — what is common with Experiment 2A</summary>
      <div className="grid gap-4 border-t border-border p-5 md:grid-cols-2">
        {sharedFoundation.map(([title,status,body]) => <Card key={title}><CardHeader className="pb-3"><div className="flex flex-wrap items-start justify-between gap-3"><CardTitle className="text-base">{title}</CardTitle><Badge variant="outline">{status}</Badge></div></CardHeader><CardContent className="text-sm leading-6 text-muted-foreground">{body}</CardContent></Card>)}
      </div>
    </details>

    <details className="group rounded-lg border border-border bg-background" open>
      <summary className="cursor-pointer list-none p-5 font-semibold text-foreground">What is different — Experiment 2A vs Experiment 2B</summary>
      <div className="overflow-x-auto border-t border-border p-5">
        <table className="w-full min-w-[820px] text-left text-sm"><thead className="bg-muted/50"><tr><th className="p-3">Dimension</th><th className="p-3">Experiment 2A</th><th className="p-3">Experiment 2B</th></tr></thead><tbody className="divide-y divide-border text-muted-foreground">{differences.map(([dimension,a,b]) => <tr key={dimension}><th className="p-3 align-top text-foreground">{dimension}</th><td className="p-3 align-top">{a}</td><td className="p-3 align-top">{b}</td></tr>)}</tbody></table>
      </div>
    </details>

    <Alert className="border-sky-500/30 bg-sky-500/5"><AlertDescription className="text-sm leading-7"><strong>Why we branched:</strong> Experiment 2A exposed a supervised-model generalization problem. Rather than tune away that evidence or use a different metric to make the same model look successful, Experiment 2B opens a separate policy-evaluation lane that the persisted logged-interaction data can legitimately support. A PASS in 2B does not repair, validate, or overwrite the 2A generalization issue.</AlertDescription></Alert>

    <section>
      <h3 className="text-xl font-semibold text-foreground">Experiment 2B evidence path</h3>
      <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Logged interaction → target policy → IPS / SNIPS → held-out TEST → bootstrap uncertainty → action-level support → weight stability → ESS.</p>
      <div className="mt-5 space-y-4">{steps.map(([step,title,what,evidence]) => <details key={step} className="group rounded-lg border border-border bg-background"><summary className="cursor-pointer list-none p-5 font-semibold text-foreground"><span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold text-white">{step}</span>{title}</summary><div className="grid gap-4 border-t border-border p-5 text-sm leading-7 text-muted-foreground md:grid-cols-2"><div><p className="font-semibold text-foreground">What we did</p><p className="mt-1">{what}</p></div><div><p className="font-semibold text-foreground">Evidence</p><p className="mt-1">{evidence}</p></div></div></details>)}</div>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-foreground">Current bounded verdict</h3>
      <div className="mt-4 grid gap-3 text-sm leading-6 text-muted-foreground md:grid-cols-2">
        <p><strong className="text-foreground">Experiment 2B — OPE:</strong> PASS_WITH_STATISTICAL_SUPPORT</p>
        <p><strong className="text-foreground">Held-out action coverage:</strong> PASS</p>
        <p><strong className="text-foreground">Weight stability:</strong> PASS at observed max-weight level</p>
        <p><strong className="text-foreground">ESS:</strong> PASS — 98.78%–99.78% retention by action</p>
        <p><strong className="text-foreground">Production uplift claim:</strong> PROHIBITED / NOT ESTABLISHED</p>
        <p><strong className="text-foreground">Experiment 2A supervised issue:</strong> UNCHANGED / SEPARATE</p>
      </div>
      <Alert className="mt-5 border-amber-500/30 bg-amber-500/5"><AlertDescription className="text-sm leading-7"><strong>Claim boundary:</strong> Within the synthetic logged interaction environment, the deterministic greedy target policy demonstrates statistically supported positive offline-policy-value lift on held-out TEST under IPS and SNIPS, with strong empirical action support and stable effective sample size. This does not establish production conversion uplift, causal commercial impact, online safety, or operator validity.</AlertDescription></Alert>
    </section>
  </div>
}

export function ExperimentTabs() {
  const [active, setActive] = useState<"one" | "twoA" | "twoB">("one")
  const tabClass = (key: "one" | "twoA" | "twoB") => `border-b-2 px-5 py-4 text-sm font-semibold transition ${active === key ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`
  return <section className="border-y border-border bg-muted/20 py-10"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><div className="mb-7"><h2 className="text-2xl font-semibold tracking-tight text-foreground">Experiment evidence</h2><p className="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">The top-level Cockpit remains shared. Experiment 2A preserves the existing Experiment 2 evidence unchanged; Experiment 2B is an additive offline-policy-evaluation lane that shares the same governed foundation but answers a different question.</p></div><div className="flex flex-wrap border-b border-border"><button className={tabClass("one")} onClick={() => setActive("one")}>Experiment 1 — Volume-expanded synthetic baseline</button><button className={tabClass("twoA")} onClick={() => setActive("twoA")}>Experiment 2A — Post-Silver low-volume baseline</button><button className={tabClass("twoB")} onClick={() => setActive("twoB")}>Experiment 2B — Offline Policy Evaluation</button></div><div className="rounded-b-xl border border-t-0 border-border bg-background p-5 sm:p-7">{active === "one" ? <ExperimentOne /> : active === "twoA" ? <ExperimentTwoA /> : <ExperimentTwoB />}</div></div></section>
}
