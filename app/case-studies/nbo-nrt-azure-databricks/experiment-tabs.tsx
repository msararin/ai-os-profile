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

function ExperimentTwo() {
  const sharedFoundation = [
    ["Governed dataset handoff", "Passed", "RC1 model-visible data preparation and release controls passed before downstream modeling."],
    ["Temporal and leakage controls", "Passed", "TRAIN / TEST separation, temporal checks, leakage preflight and exposure controls were validated before modeling."],
    ["Synthetic decision environment", "Passed", "Both lanes use the same bounded synthetic NBO/NRT world and the same synthetic-learning claim ceiling."],
    ["Persisted lineage", "Verified", "Unity Catalog artifacts preserve the restart point and allow recovery without silently regenerating the experiment data."],
  ]

  const supervisedSteps = [
    ["1", "Train supervised response baseline", "Train a Spark ML Logistic Regression baseline on the governed TRAIN partition.", "A simple classifier establishes whether observable features can generalize to held-out response labels.", "TRAIN ROC-AUC ≈ 0.625.", "Training performance alone is not enough to approve the model."],
    ["2", "Evaluate held-out TEST", "Score the locked TEST partition and compare discrimination against the random baseline.", "Held-out evaluation tests whether the response model generalizes beyond the training period.", "TEST ROC-AUC ≈ 0.449; TEST PR-AUC ≈ 0.071, near the random baseline for the imbalanced label.", "This does not support model promotion or production response prediction."],
    ["3", "Record the generalization issue", "Keep the failed held-out evidence visible rather than tuning it away or replacing it with policy results.", "A model-quality failure is different from an infrastructure failure or a policy-evaluation result.", "Status: GENERALIZATION ISSUE / INVESTIGATION.", "Experiment 2B does not remediate or validate Experiment 2A."],
  ]

  const opeSteps = [
    ["1", "Use persisted logged interactions", "Resume from simulation.bandit_logged_interactions_v0_2 after the Databricks session reset.", "Persisted logged actions, greedy actions, behavior propensities and observed rewards make the OPE calculation reproducible without regenerating the world.", "10,000 rows recovered; zero null or non-positive chosen-action probabilities.", "Evidence remains bounded to the synthetic logged interaction distribution."],
    ["2", "Define deterministic greedy target policy", "Compare the logged chosen action with greedy_action and construct the IPS importance weight from chosen_action_probability.", "This asks what expected reward would look like if the action-selection rule changed while staying inside logged support.", "Target/logged action match rate 84.54%; mean importance weight 0.9986; max weight 1.3889.", "High overlap helps support, but it also means the target policy is not radically different from the behavior policy."],
    ["3", "Check TRAIN / TEST OPE consistency", "Calculate behavior reward, IPS and SNIPS separately on TRAIN and held-out TEST.", "The split checks whether estimated policy lift keeps the same direction outside the training partition.", "TRAIN: IPS +1.24 pp, SNIPS +1.53 pp. TEST: IPS +2.02 pp, SNIPS +1.25 pp.", "Directional consistency is evidence for offline policy value, not production conversion uplift."],
    ["4", "Quantify TEST uncertainty", "Bootstrap the TEST partition for 500 replicates using deterministic seed 20260813.", "Confidence intervals show whether the positive point estimate survives sampling variation within the held-out synthetic data.", "IPS lift 95% CI: +0.60 to +3.22 pp. SNIPS lift 95% CI: +0.31 to +2.15 pp; both intervals remain above zero.", "Bootstrap support does not remove the synthetic-to-production validity gap."],
    ["5", "Next gate — action-level support", "Inspect support / positivity by target action before increasing policy complexity.", "Overall averages can hide an action with weak logged support.", "Next diagnostic queued: action-level target share, match rate, propensity and max importance weight.", "No stronger policy-improvement claim until action-level support is checked."],
  ]

  const laneComparison = [
    ["Business question", "Who is likely to respond?", "Which action-selection policy has higher expected logged reward?"],
    ["Method", "Supervised Logistic Regression", "Contextual-bandit offline policy evaluation"],
    ["Primary metrics", "ROC-AUC / PR-AUC", "IPS / SNIPS + bootstrap CI"],
    ["Held-out result", "Generalization issue", "Positive TEST policy-value estimate with statistical support"],
    ["Promotion meaning", "Not promotable", "Passed only inside the synthetic logged environment"],
  ]

  return <div className="space-y-10">
    <section>
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Experiment 2 — Shared Foundation, Two Evidence Lanes</h2>
        <Badge variant="outline">2A + 2B</Badge>
      </div>
      <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Experiment 2 now separates two sibling evaluations that share the same governed synthetic foundation but answer different questions. <strong className="text-foreground">Experiment 2A</strong> evaluates supervised response prediction. <strong className="text-foreground">Experiment 2B</strong> evaluates an action-selection policy from logged bandit interactions. A positive result in 2B does not repair the model-quality issue in 2A.</p>
      <Alert className="mt-5 border-sky-500/30 bg-sky-500/5"><AlertDescription className="text-sm leading-6"><strong>Structure rule:</strong> shared data lineage and claim ceiling; separate methods, metrics, failure modes and promotion gates.</AlertDescription></Alert>
    </section>

    <details className="group rounded-lg border border-border bg-background" open>
      <summary className="cursor-pointer list-none p-5 font-semibold text-foreground">Shared Foundation — what stays the same across 2A and 2B</summary>
      <div className="space-y-4 border-t border-border p-5 text-sm leading-7 text-muted-foreground">
        <p>Both lanes use the same NBO/NRT business context, governed synthetic experiment world, model-visible release controls, TRAIN / TEST discipline, persisted Unity Catalog lineage and <strong className="text-foreground">SYNTHETIC_LEARNING_AND_MLOPS_EVIDENCE_ONLY</strong> claim ceiling.</p>
        <div className="grid gap-4 md:grid-cols-2">
          {sharedFoundation.map(([title,status,evidence]) => <Card key={title}><CardHeader className="pb-3"><div className="flex flex-wrap items-start justify-between gap-3"><CardTitle className="text-base">{title}</CardTitle><Badge variant="outline" className={statusBadgeClass(status)}>{status}</Badge></div></CardHeader><CardContent className="text-sm leading-6 text-muted-foreground">{evidence}</CardContent></Card>)}
        </div>
      </div>
    </details>

    <details className="group rounded-lg border border-border bg-background">
      <summary className="cursor-pointer list-none p-5 font-semibold text-foreground">What is different — 2A vs 2B</summary>
      <div className="overflow-x-auto border-t border-border p-5">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-muted/50"><tr><th className="p-3">Dimension</th><th className="p-3">Experiment 2A — Supervised Response Modeling</th><th className="p-3">Experiment 2B — Offline Policy Evaluation</th></tr></thead>
          <tbody className="divide-y divide-border text-muted-foreground">{laneComparison.map(([dimension,a,b]) => <tr key={dimension}><th className="p-3 align-top text-foreground">{dimension}</th><td className="p-3 align-top">{a}</td><td className="p-3 align-top">{b}</td></tr>)}</tbody>
        </table>
      </div>
    </details>

    <section>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Experiment 2A</p><h3 className="mt-1 text-xl font-semibold text-foreground">Supervised Response Modeling</h3></div>
        <Badge variant="outline" className={statusBadgeClass("Quality gap")}>GENERALIZATION ISSUE / INVESTIGATION</Badge>
      </div>
      <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Purpose: test whether the available model-visible features can predict the response label on held-out data.</p>
      <div className="mt-5 space-y-4">
        {supervisedSteps.map(([step,title,what,why,evidence,limitation]) => <details key={step} className="group rounded-lg border border-border bg-background"><summary className="cursor-pointer list-none p-5 font-semibold text-foreground"><span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white">{step}</span>{title}</summary><div className="grid gap-4 border-t border-border p-5 text-sm leading-7 text-muted-foreground md:grid-cols-2"><div><p className="font-semibold text-foreground">What we did</p><p className="mt-1">{what}</p></div><div><p className="font-semibold text-foreground">Why it matters</p><p className="mt-1">{why}</p></div><div><p className="font-semibold text-foreground">Evidence</p><p className="mt-1">{evidence}</p></div><div><p className="font-semibold text-foreground">Limitation</p><p className="mt-1">{limitation}</p></div></div></details>)}
      </div>
    </section>

    <section>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Experiment 2B</p><h3 className="mt-1 text-xl font-semibold text-foreground">Offline Policy Evaluation</h3></div>
        <div className="flex flex-wrap gap-2"><Badge variant="outline" className={statusBadgeClass("Passed")}>PASS WITH STATISTICAL SUPPORT</Badge><Badge variant="outline">SYNTHETIC BOUNDARY</Badge></div>
      </div>
      <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Purpose: estimate whether an always-greedy target policy has higher expected reward than the logged behavior policy, without deploying the policy.</p>
      <div className="mt-5 space-y-4">
        {opeSteps.map(([step,title,what,why,evidence,limitation]) => <details key={step} className="group rounded-lg border border-border bg-background"><summary className="cursor-pointer list-none p-5 font-semibold text-foreground"><span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold text-white">{step}</span>{title}</summary><div className="grid gap-4 border-t border-border p-5 text-sm leading-7 text-muted-foreground md:grid-cols-2"><div><p className="font-semibold text-foreground">What we did</p><p className="mt-1">{what}</p></div><div><p className="font-semibold text-foreground">Why it matters</p><p className="mt-1">{why}</p></div><div><p className="font-semibold text-foreground">Evidence</p><p className="mt-1">{evidence}</p></div><div><p className="font-semibold text-foreground">Limitation</p><p className="mt-1">{limitation}</p></div></div></details>)}
      </div>
    </section>

    <Alert className="border-amber-500/30 bg-amber-500/5"><AlertDescription className="text-sm leading-6"><strong>Claim boundary:</strong> Experiment 2B provides statistically supported positive offline-policy-value evidence only within the synthetic logged interaction distribution. It does not establish production conversion uplift, causal commercial impact, or operator validity, and it does not resolve Experiment 2A’s supervised-model generalization issue.</AlertDescription></Alert>
  </div>
}

export function ExperimentTabs() {
  const [active, setActive] = useState<"one" | "two">("one")
  const tabClass = (key: "one" | "two") => `border-b-2 px-5 py-4 text-sm font-semibold transition ${active === key ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`
  return <section className="border-y border-border bg-muted/20 py-10"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><div className="mb-7"><h2 className="text-2xl font-semibold tracking-tight text-foreground">Experiment evidence</h2><p className="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">The top-level Cockpit remains shared. Experiment 2 is now shown as two sibling evidence lanes—2A supervised response modeling and 2B offline policy evaluation—because they use the same governed foundation but answer different questions and have independent gates.</p></div><div className="flex flex-wrap border-b border-border"><button className={tabClass("one")} onClick={() => setActive("one")}>Experiment 1 — Volume-expanded synthetic baseline</button><button className={tabClass("two")} onClick={() => setActive("two")}>Experiment 2 — 2A / 2B evidence lanes</button></div><div className="rounded-b-xl border border-t-0 border-border bg-background p-5 sm:p-7">{active === "one" ? <ExperimentOne /> : <ExperimentTwo />}</div></div></section>
}
