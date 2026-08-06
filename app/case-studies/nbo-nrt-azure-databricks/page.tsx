import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "NBO–NRT Telco on Azure Databricks",
  description:
    "A bounded Telco proof-of-concept execution path for governed next-best-offer decisioning on Azure Databricks.",
}

const phases = [
  {
    phase: "Phase 1 — Data Foundation and Ingestion",
    status: "Complete",
    description: "Establish traceable non-production source inputs and governed Bronze evidence.",
    currentResult:
      "Research, composite generation, ADLS landing, Unity Catalog access, Bronze ingestion, and the Bronze Quality Gate are complete.",
    remark:
      "Hands-on development evidence only. File Events remains deferred and did not block batch ingestion. No production customer data or production-readiness claim.",
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
    currentResult:
      "Silver preparation, dataset profiling, model-ready data construction, quality checks, and read-back evidence are complete for the synthetic experiment lane.",
    remark:
      "This is assumption-derived synthetic experiment data, not observed operator behavior or production feature truth.",
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
    currentResult:
      "Eligibility/policy contracts, candidate generation, decision-table persistence, and candidate/ranking inputs are implemented in the synthetic experiment lane.",
    remark:
      "Rules and relationships are PoC assumptions. They are not operator production rules or observed customer-behavior truth.",
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
    currentResult:
      "Training, MLflow tracking, Unity Catalog model registration, Candidate alias assignment, and registered-model read-back are complete. Model quality is not approved.",
    remark:
      "Lifecycle execution passed; business readiness did not. Candidate is not Champion. Production promotion is not authorized.",
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
    currentResult:
      "Synthetic ranking and selected-decision evidence exist. TMF680-aligned payload delivery, NRT latency evidence, and downstream integration are not complete.",
    remark:
      "LID680 remains a traceability label only. No internal meaning, real delivery integration, or NRT SLA is asserted.",
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
    currentResult:
      "Synthetic exposure/response evidence and threshold analysis exist. Drift monitoring, production thresholds, and retraining governance are not complete.",
    remark:
      "Reward values, attribution windows, and thresholds remain PoC assumptions. Monitoring is not production-standard evidence.",
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
  ["Training rows", "8,002"],
  ["Test rows", "1,998"],
  ["Positive rate", "31.48%"],
  ["ROC AUC", "0.6294"],
  ["PR AUC", "0.3941"],
  ["Threshold 0.50 F1", "0.0000"],
  ["Analyzed threshold", "0.24 — not approved"],
  ["Threshold 0.24 F1", "0.4955"],
  ["Threshold 0.24 precision", "0.3421"],
  ["Threshold 0.24 recall", "0.8984"],
]

const preparationSections = [
  {
    number: "1",
    title: "Existing AIOS agents accelerated candidate research",
    content: (
      <div className="space-y-4">
        <p>The work began as a practical research problem, not from a fixed framework or a pre-selected dataset. Existing AIOS member agents were routed into the task: the Research Team searched and compared public sources, the Data Team assessed schema, provenance, relationship gaps, and contract implications, and the ML Engineer tested whether the data could support training, ranking, and threshold analysis.</p>
        <p>Because these member agents already existed in AIOS, the screening stage moved faster than expected. Ten candidate sources were assessed, but no single public dataset covered the full path from customer context to eligible offer, exposure, response, outcome, and model training.</p>
      </div>
    ),
  },
  {
    number: "2",
    title: "Flexible composition was a response to limited direct-fit data",
    content: (
      <div className="space-y-4">
        <p>The first assessment was restrictive: very little of the available data could be used directly for the complete NBO–NRT lifecycle. Rather than stop the use case, selected assumptions were introduced to create flexibility while preserving explicit provenance and claim boundaries.</p>
        <div className="grid gap-3 md:grid-cols-2">
          {[["Bank Marketing", "Response and methodology patterns"], ["TMF620", "Product and offer catalogue structure"], ["OTTO documentation", "Recommendation-pattern reference"], ["MIND documentation", "Ranking and exposure-pattern reference"]].map(([source, role]) => <div key={source} className="rounded-md border border-border bg-muted/20 p-4"><p className="font-semibold text-foreground">{source}</p><p className="mt-1">{role}</p></div>)}
        </div>
        <p>Missing customer–offer–exposure–response relationships were generated under explicit synthetic assumptions. Synthetic identifiers, relationship origins, generation-run fields, and evidence-lane markers were retained so generated links remained distinguishable from source-derived information.</p>
        <Alert className="border-amber-500/30 bg-amber-500/5"><AlertDescription>Use real source structure where suitable. Generate only the relationships required for the experiment. Never present generated relationships as observed operator behaviour.</AlertDescription></Alert>
      </div>
    ),
  },
  {
    number: "3",
    title: "AIOS governance remained visible during research and preparation",
    content: (
      <div className="space-y-4">
        <p>AIOS contributed more than role coordination. It inserted role separation, assumption and provenance tracking, evidence-lane separation, provider-cost recording, telemetry, validation receipts, and explicit distinctions between proposed, executed, validated, reviewed, and approved work.</p>
        <p>These controls made it possible to explain which elements came from public evidence, which were documented assumptions, and which were generated for the experiment.</p>
        <p className="rounded-md border border-border bg-muted/25 p-4 font-medium text-foreground">Scope boundary: this governance description applies to the research and pre-Databricks data-preparation stage. Azure Databricks ingestion, Silver transformation, MLflow tracking, model registration, and model read-back were separate platform execution activities.</p>
      </div>
    ),
  },
  {
    number: "4",
    title: "A small governed package proved the data path first",
    content: (
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[["11", "canonical CSV tables"], ["805", "source rows"], ["1", "generation manifest"], ["806", "total Bronze rows"]].map(([value, label]) => <div key={label} className="rounded-md border border-border bg-background p-4 text-center"><p className="text-2xl font-semibold text-primary">{value}</p><p className="mt-1 text-xs text-muted-foreground">{label}</p></div>)}</div>
        <p>The first package was intentionally small. It was sufficient to verify contract compatibility, provenance, referential relationships, event-order rules, ADLS landing, byte-level read-back, Unity Catalog access, Bronze ingestion, Silver transformation, and model-ready construction.</p>
        <p>Generating large volume before Silver was stable would have amplified invalid relationships or transformation defects and shifted time toward pipeline-capacity testing. At this stage the priority was correctness and traceability, not volume.</p>
      </div>
    ),
  },
  {
    number: "5",
    title: "Volume was added after Silver for model learning",
    content: (
      <div className="space-y-4">
        <p>After Silver and the model-ready gate passed, the learning objective changed from “Can the governed data path work?” to “Can the prepared data support a meaningful model experiment?” The dataset was then expanded to 10,000 synthetic observations because model behaviour, threshold sensitivity, MLflow tracking, registration, and registered-model read-back had become more important than another pipeline-scale test.</p>
        <div className="rounded-md border border-violet-500/30 bg-violet-500/5 p-4 font-mono text-xs leading-6 text-foreground sm:text-sm"><p>Synthetic observation = customer context + eligible candidate + selected action</p><p>+ action probability + outcome probability + sampled response</p><p className="mt-2">response = 1 when random_value &lt; outcome_probability</p><p>response ~ Bernoulli(outcome_probability)</p></div>
        <p>This was not row duplication. New observations were generated from bounded components and probability-based response sampling under a fixed generation run, controlled configuration, schema checks, probability-range checks, lineage fields, and deterministic customer-level train/test assignment.</p>
        <div className="overflow-x-auto rounded-md border border-border"><table className="w-full min-w-[560px] text-left text-sm"><tbody className="divide-y divide-border">{[["Total synthetic observations", "10,000"], ["Positive labels", "3,148"], ["Negative labels", "6,852"], ["Positive rate", "31.48%"], ["Train rows", "8,002"], ["Test rows", "1,998"], ["Cross-split customers", "0"]].map(([measure, value]) => <tr key={measure}><th className="p-3 text-foreground">{measure}</th><td className="p-3 font-semibold">{value}</td></tr>)}</tbody></table></div>
        <p>The distribution was not forced to 50/50. That choice exposed the baseline weakness honestly: threshold 0.50 produced no positive predictions, while threshold 0.24 improved recall but retained low precision. The generated volume was designed to reveal model behaviour and trade-offs, not to manufacture a successful metric.</p>
      </div>
    ),
  },
]

function statusBadgeClass(status: string) {
  const normalized = status.toLowerCase()
  if (["complete", "completed", "verified", "proven", "passed", "selected", "designed"].includes(normalized)) return "border-emerald-700 bg-emerald-100 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950 dark:text-emerald-100"
  if (normalized.includes("in progress") || normalized.includes("quality gap") || normalized.includes("weak-to-moderate") || normalized.includes("not approved")) return "border-amber-700 bg-amber-100 text-amber-950 dark:border-amber-500 dark:bg-amber-950 dark:text-amber-100"
  if (normalized.includes("failed")) return "border-red-700 bg-red-100 text-red-950 dark:border-red-500 dark:bg-red-950 dark:text-red-100"
  if (normalized.includes("not started") || normalized.includes("not authorized")) return "border-slate-500 bg-slate-200 text-slate-950 dark:border-slate-500 dark:bg-slate-800 dark:text-slate-100"
  return "border-sky-600 bg-sky-100 text-sky-950 dark:border-sky-500 dark:bg-sky-950 dark:text-sky-100"
}

export default function NboNrtAzureDatabricksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="mx-auto w-full max-w-5xl px-4 pt-4 sm:px-6 lg:px-8"><div className="flex justify-end"><div className="text-right text-sm leading-6 text-muted-foreground"><p>Evidence on this page reconciled through 5 Aug 2026</p><p>Curated static release — not a continuous live-status feed</p></div></div></div>
      <main className="flex-1">
        <section className="border-b border-border bg-background"><div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8"><div className="flex flex-wrap gap-2"><Badge variant="outline">Telco decision intelligence</Badge><Badge variant="outline">Azure Databricks</Badge><Badge className={statusBadgeClass("In Progress")}>In Progress</Badge></div><h1 className="mt-4 max-w-5xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">NBO–NRT Telco on Azure Databricks</h1><p className="mt-4 max-w-4xl text-base leading-7 text-muted-foreground sm:text-lg">From governed synthetic data to a registered Candidate model—with model-quality and production boundaries disclosed.</p><Alert className="mt-6 border-amber-500/30 bg-amber-500/5"><AlertDescription className="text-sm leading-6"><strong>Synthetic experiment only.</strong> The data-to-MLflow lifecycle executed, but threshold 0.50 failed for the positive class, threshold 0.24 is not approved, model discrimination is weak-to-moderate, and business/production readiness remain unproven.</AlertDescription></Alert></div></section>
        <section className="py-10"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-semibold tracking-tight text-foreground">Current evidence snapshot</h2><div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{[["Data to Bronze", "Complete", "ADLS, Unity Catalog, 12 Bronze tables, and Bronze Quality Gate."], ["Silver / model-ready", "Complete", "Bounded synthetic preparation and model-ready gate passed."], ["MLflow / Registry", "Verified", "Training, tracking, registration, Candidate alias, and read-back."], ["Business readiness", "Not approved", "No approved operating threshold, Champion, or production promotion."]].map(([title, status, detail]) => <Card key={title}><CardContent className="space-y-3 p-5"><p className="font-semibold text-foreground">{title}</p><Badge variant="outline" className={statusBadgeClass(status)}>{status}</Badge><p className="text-sm leading-6 text-muted-foreground">{detail}</p></CardContent></Card>)}</div></div></section>
        <section className="border-y border-border bg-muted/25 py-10"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-semibold tracking-tight text-foreground">Data Preparation — From Multi-Agent Research to Model-Ready Volume</h2><p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">The preparation journey began with limited direct-fit public Telco data and ended with a governed 10,000-row model experiment. The section below records what actually happened, why assumptions were introduced, and why volume was added only after Silver was stable.</p><div className="mt-6 rounded-lg border border-border bg-background p-5"><h3 className="text-lg font-semibold text-foreground">What this stage demonstrated</h3><div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-5">{["Existing AIOS agents accelerated research and screening.", "Flexible source roles kept the use case moving despite limited direct-fit Telco data.", "AIOS governance, cost tracking, telemetry, and custody remained visible.", "A small package first proved the governed data path.", "Additional volume was generated specifically for model learning."].map((item) => <div key={item} className="rounded-md border border-border bg-muted/20 p-4 text-sm leading-6 text-muted-foreground">{item}</div>)}</div></div><details className="group mt-6 rounded-lg border border-border bg-background"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-foreground"><span>Expand the full data-preparation journey</span><span aria-hidden="true" className="text-primary group-open:rotate-45">+</span></summary><div className="space-y-4 border-t border-border p-5">{preparationSections.map((section) => <details key={section.number} className="group rounded-md border border-border bg-muted/10"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 font-semibold text-foreground"><span><span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{section.number}</span>{section.title}</span><span aria-hidden="true" className="text-primary group-open:rotate-45">+</span></summary><div className="border-t border-border p-4 text-sm leading-7 text-muted-foreground">{section.content}</div></details>)}</div></details></div></section>
        <section className="py-10"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-semibold tracking-tight text-foreground">Alignment to the Given Recommendation</h2><p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">Source-specific labels are retained for traceability only. The public mapping does not assert undocumented system semantics, ownership, production interfaces, or production performance.</p><div className="mt-5 overflow-x-auto rounded-lg border border-border bg-background"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-muted/50"><tr><th className="p-3">Recommendation area</th><th className="p-3">Public PoC abstraction</th></tr></thead><tbody className="divide-y divide-border text-muted-foreground">{alignment.map(([area, abstraction]) => <tr key={area}><th className="p-3 align-top text-foreground">{area}</th><td className="p-3">{abstraction}</td></tr>)}</tbody></table></div></div></section>
        <section className="border-y border-border bg-muted/25 py-10"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-semibold tracking-tight text-foreground">PoC execution phases</h2><p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">Green means the activity executed or was verified. Amber means an active quality, approval, or readiness gap. Red marks a failed gate. Gray marks work that has not started or is not authorized.</p><div className="mt-6 grid gap-5 lg:grid-cols-2">{phases.map((item) => <Card key={item.phase}><CardHeader><div className="flex flex-wrap items-start justify-between gap-3"><CardTitle>{item.phase}</CardTitle><Badge variant="outline" className={statusBadgeClass(item.status)}>{item.status}</Badge></div></CardHeader><CardContent className="space-y-4 text-sm leading-6 text-muted-foreground"><p><strong className="text-foreground">Description:</strong> {item.description}</p><p><strong className="text-foreground">Current result:</strong> {item.currentResult}</p><p><strong className="text-foreground">Boundary:</strong> {item.remark}</p><details className="group rounded-md border border-border bg-background"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 font-semibold text-foreground"><span>Sub-phase evidence</span><span aria-hidden="true" className="text-primary group-open:rotate-45">+</span></summary><div className="overflow-x-auto border-t border-border p-4"><table className="w-full min-w-[760px] text-left text-xs"><thead className="bg-muted/50"><tr><th className="p-2">Sub-phase</th><th className="p-2">Status</th><th className="p-2">Evidence / result</th></tr></thead><tbody className="divide-y divide-border">{item.subphases.map(([subphase, status, result]) => <tr key={subphase}><th className="p-2 align-top text-foreground">{subphase}</th><td className="p-2 align-top"><Badge variant="outline" className={statusBadgeClass(status)}>{status}</Badge></td><td className="p-2">{result}</td></tr>)}</tbody></table></div></details></CardContent></Card>)}</div></div></section>
        <section className="py-10"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-semibold tracking-tight text-foreground">Model Run V1 — bounded appendix</h2><div className="mt-5 grid gap-5 lg:grid-cols-2"><Card><CardHeader><CardTitle>Lifecycle evidence</CardTitle></CardHeader><CardContent className="space-y-3 text-sm leading-6 text-muted-foreground"><p>Simulation training dataset: <strong className="text-foreground">10,000 rows</strong></p><p>MLflow run: <code>b12f16ab527c419b8a394f6f3d3d9f5a</code></p><p>Registered model: <code>adb_nbo_nrt_mlops_dev.models.nbo_response_propensity_baseline</code></p><p>Version 1 · Alias <strong className="text-foreground">Candidate</strong></p><p>Prediction and probability read-back: <strong className="text-foreground">verified</strong></p></CardContent></Card><Card><CardHeader><CardTitle>Quality and threshold evidence</CardTitle></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full min-w-[420px] text-left text-sm"><tbody className="divide-y divide-border text-muted-foreground">{modelMetrics.map(([metric, value]) => <tr key={metric}><th className="p-2 text-foreground">{metric}</th><td className="p-2">{value}</td></tr>)}</tbody></table></div></CardContent></Card></div><Alert className="mt-5 border-red-500/40 bg-red-500/5"><AlertDescription className="text-sm leading-6"><strong>Default threshold 0.50 failed for the positive class.</strong> Threshold 0.24 was analyzed, not approved. The Candidate alias must not be promoted to Champion without real-world validation, approved business thresholds, and production governance.</AlertDescription></Alert></div></section>
        <section className="border-t border-border bg-muted/25 py-10"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-semibold tracking-tight text-foreground">Current claim boundary</h2><div className="mt-4 max-w-4xl space-y-3 text-sm leading-6 text-muted-foreground"><p><strong className="text-foreground">Pipeline and MLOps execution:</strong> PASS</p><p><strong className="text-foreground">Model registration and read-back:</strong> PASS</p><p><strong className="text-foreground">Default threshold classification:</strong> FAIL</p><p><strong className="text-foreground">Model discrimination:</strong> WEAK-TO-MODERATE</p><p><strong className="text-foreground">Business readiness:</strong> NOT READY</p><p><strong className="text-foreground">Production promotion:</strong> NOT AUTHORIZED</p><p className="rounded-md border border-border bg-background px-4 py-3 font-semibold text-foreground">SYNTHETIC_EXPERIMENT_ONLY — not operator behavior truth and not production performance evidence.</p></div></div></section>
      </main>
      <SiteFooter />
    </div>
  )
}
