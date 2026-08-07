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
  const nextPath = [
    ["1", "Inventory Silver and candidate grain", "Confirm the smaller post-Silver dataset, keys, timestamps, feature grain, and one-row-per-decision × customer × offer contract."],
    ["2", "Audit label provenance", "Determine how label/reward was generated, whether exposure actually occurred, the response window, and whether label-generating inputs overlap model features."],
    ["3", "Register assumptions and rule classes", "Separate verified hard eligibility, assumed hard rules, and soft ranking assumptions; keep reason codes and support NO_OFFER."],
    ["4", "Run Champion v0", "Use RULE_BASED_ELIGIBILITY_AND_RANKING so the first baseline does not depend on an unverified response label."],
    ["5", "Evaluate low-volume stability", "Treat metrics as unstable and learning-only. Use the small dataset to expose data/decision weaknesses before adding synthetic volume."],
    ["6", "Authorize Challenger only after audit", "A supervised challenger is allowed only as SYNTHETIC_PROXY_MODEL_FOR_LEARNING after generator leakage and target lineage are mapped."],
    ["7", "Compare before scaling volume", "If a challenger is run, compare full proxy features, generator-dependent features removed, and a segment/rule holdout before deciding whether volume generation is useful."],
    ["8", "Continue MLOps evidence", "Log rule/model version, MLflow evidence where applicable, Gold decision output, reason codes, telemetry, monitoring design, and the next gate decision."],
  ]

  const auditQuestions = [
    "Which process created the candidate table?",
    "Which process created the label or reward?",
    "Which source columns were used?",
    "Was random noise or a probability distribution used?",
    "Were the rules deterministic or probabilistic?",
    "Was the customer actually exposed to the offer?",
    "What event defines a positive response?",
    "What event defines a negative response?",
    "What is the response window?",
    "Can a customer respond through another channel?",
    "Are label-generating variables also included as model features?",
    "Does the generator encode the same relationship the model is expected to discover?",
  ]

  const assumptionFields = ["assumption_id", "assumption", "reason", "evidence", "evidence_status", "affected_tables", "risk_if_wrong", "mitigation", "validation_needed", "owner", "status"]
  const requiredEvidence = ["DATA_ASSUMPTION_REGISTER.md", "LABEL_PROVENANCE_AUDIT.md", "CANDIDATE_GRAIN_AND_JOIN_CONTRACT.md", "GENERATOR_INPUT_TO_FEATURE_MAP.csv", "NBO_BASELINE_RISK_REGISTER.md", "CLAIM_BOUNDARY.md", "DECISION_TELEMETRY_SCHEMA.md", "BASELINE_GATE_DECISION.md"]
  const riskRows = [
    ["Unknown label-generation process", "Critical", "Supervised model claims deferred"],
    ["No observed exposure", "High", "Do not interpret non-selection as rejection"],
    ["No genuine non-response", "High", "No negative ground-truth claim"],
    ["No counterfactual", "Critical for uplift", "No causal or incremental-value claim"],
    ["Generator leakage", "High", "Generator-input mapping and ablation tests"],
    ["Low volume", "Medium", "Treat metrics as unstable and learning-only"],
    ["Synthetic reward", "High", "Document formula, version, inputs, and seed"],
    ["Assumed eligibility", "Medium–High", "Separate verified rules from assumptions"],
    ["Forced recommendation", "Medium", "Include NO_OFFER action"],
    ["Misleading metrics", "High", "Report engineering and scientific evidence separately"],
  ]

  return <div className="space-y-10">
    <section><div className="flex flex-wrap items-center gap-3"><h2 className="text-2xl font-semibold tracking-tight text-foreground">Experiment 2 — Baseline before volume expansion</h2><Badge variant="outline" className={statusBadgeClass("pending")}>GATE_A_PENDING_DATA_AUDIT</Badge></div><p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">This experiment deliberately stops at the smaller dataset produced after Silver, before the 10,000-row volume-generation step used in Experiment 1. The question is whether the governed Silver output can already support a transparent learning baseline and reveal what must be fixed before generating more data.</p><Alert className="mt-5 border-amber-500/30 bg-amber-500/5"><AlertDescription className="text-sm leading-6"><strong>Current label status: LABEL_PROVENANCE_UNKNOWN.</strong> Existing labels are not treated as ground truth until the label-generation process, exposure definition, response window, generator inputs, and leakage risks are audited.</AlertDescription></Alert></section>

    <section className="grid gap-5 lg:grid-cols-2"><Card><CardHeader><CardTitle>Champion v0</CardTitle></CardHeader><CardContent className="space-y-3 text-sm leading-7 text-muted-foreground"><Badge variant="outline">RULE_BASED_ELIGIBILITY_AND_RANKING</Badge><p>Customer Context → Eligibility Filtering → Candidate Generation → Deterministic Ranking → Top-N or NO_OFFER → Gold Decision Output.</p><p>Use hard eligibility, soft ranking, suppression/contact-frequency controls, traceable reason codes, versioned policy configuration, and decision telemetry.</p></CardContent></Card><Card><CardHeader><CardTitle>Challenger v0</CardTitle></CardHeader><CardContent className="space-y-3 text-sm leading-7 text-muted-foreground"><Badge variant="outline">SYNTHETIC_PROXY_MODEL_FOR_LEARNING</Badge><p>Not the Champion. It may be evaluated only after label provenance and generator dependencies are documented.</p><p>Any metrics describe consistency with the synthetic data-generating process, not expected real-world performance.</p></CardContent></Card></section>

    <section><h3 className="text-xl font-semibold text-foreground">Why run this before pumping volume?</h3><div className="mt-4 grid gap-4 md:grid-cols-3"><Card><CardContent className="p-5 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Scientific check</strong><p className="mt-2">Find whether apparent signal is real within the current synthetic design or mostly encoded by the generator.</p></CardContent></Card><Card><CardContent className="p-5 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Data check</strong><p className="mt-2">Expose grain, leakage, label, feature, and eligibility problems while the dataset is still easy to inspect.</p></CardContent></Card><Card><CardContent className="p-5 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">MLOps check</strong><p className="mt-2">Prove repeatable transformation, scoring, Gold output, reason-code lineage, and telemetry without confusing scale with correctness.</p></CardContent></Card></div></section>

    <section><h3 className="text-xl font-semibold text-foreground">Execution path</h3><div className="mt-5 grid gap-4 md:grid-cols-2">{nextPath.map(([step,title,detail]) => <Card key={step}><CardHeader><CardTitle className="text-lg"><span className="mr-2 text-primary">{step}.</span>{title}</CardTitle></CardHeader><CardContent className="text-sm leading-7 text-muted-foreground">{detail}</CardContent></Card>)}</div></section>

    <section><h3 className="text-xl font-semibold text-foreground">Candidate grain and decision contract</h3><Card className="mt-5"><CardContent className="space-y-4 p-5 text-sm leading-7 text-muted-foreground"><p><strong className="text-foreground">Canonical grain:</strong> ONE_ROW_PER_DECISION_ID × CUSTOMER_ID × OFFER_ID.</p><p><strong className="text-foreground">Required fields:</strong> decision_id, customer_id/customer_token, decision_time, offer_id, is_eligible, eligibility_reason_codes, policy_version, feature_snapshot_time, data_provenance, candidate_generation_version.</p><p><strong className="text-foreground">Outcome fields when available:</strong> was_exposed, exposure_time, response, response_time, reward, reward_definition, label, label_source, label_version.</p><Alert className="border-amber-500/30 bg-amber-500/5"><AlertDescription>No candidate may be interpreted as a genuine negative unless was_exposed = true and the response window has completed without a qualifying response.</AlertDescription></Alert></CardContent></Card></section>

    <section><h3 className="text-xl font-semibold text-foreground">Assumption register</h3><p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Every unverified rule or design decision must be recorded rather than silently embedded in the experiment.</p><div className="mt-5 flex flex-wrap gap-2">{assumptionFields.map((field) => <Badge key={field} variant="outline">{field}</Badge>)}</div><p className="mt-4 text-sm leading-7 text-muted-foreground">Evidence status must distinguish Observed, Inferred, Synthetic, or Unknown; each assumption also records the risk if wrong, mitigation, validation needed, owner, and lifecycle status.</p></section>

    <section><h3 className="text-xl font-semibold text-foreground">Label Provenance Audit</h3><div className="mt-5 grid gap-3 md:grid-cols-2">{auditQuestions.map((question, index) => <Card key={question}><CardContent className="p-4 text-sm leading-6 text-muted-foreground"><strong className="mr-2 text-foreground">{index + 1}.</strong>{question}</CardContent></Card>)}</div><div className="mt-5 flex flex-wrap gap-2">{["OBSERVED_LABEL_VERIFIED", "PROXY_LABEL_VERIFIED", "SYNTHETIC_LABEL_VERIFIED", "LABEL_PROVENANCE_PARTIALLY_KNOWN", "LABEL_PROVENANCE_UNKNOWN"].map((status) => <Badge key={status} variant="outline">{status}</Badge>)}</div></section>

    <section><h3 className="text-xl font-semibold text-foreground">Generator leakage control</h3><p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">If the label is synthetic, map every label-generation input against model features and classify direct generator dependency, structural dependency, rule replication, conditional dependency, and stochastic components.</p><div className="mt-5 grid gap-4 md:grid-cols-3"><Card><CardHeader><CardTitle className="text-lg">Experiment A</CardTitle></CardHeader><CardContent className="text-sm leading-7 text-muted-foreground"><p>Full proxy feature set.</p><p className="mt-2"><strong className="text-foreground">Claim:</strong> TECHNICAL_REPRODUCIBILITY_ONLY</p></CardContent></Card><Card><CardHeader><CardTitle className="text-lg">Experiment B</CardTitle></CardHeader><CardContent className="text-sm leading-7 text-muted-foreground"><p>Remove generator-dependent features.</p><p className="mt-2"><strong className="text-foreground">Claim:</strong> GENERATOR_DEPENDENCY_SENSITIVITY</p></CardContent></Card><Card><CardHeader><CardTitle className="text-lg">Experiment C</CardTitle></CardHeader><CardContent className="text-sm leading-7 text-muted-foreground"><p>Hold out a segment, offer category, time period, or unseen interaction.</p><p className="mt-2"><strong className="text-foreground">Claim:</strong> LIMITED_SYNTHETIC_GENERALIZATION_TEST</p></CardContent></Card></div></section>

    <section><h3 className="text-xl font-semibold text-foreground">Hard rules versus soft assumptions</h3><div className="mt-5 grid gap-4 md:grid-cols-3"><Card><CardHeader><CardTitle className="text-lg">Verified hard eligibility</CardTitle></CardHeader><CardContent className="text-sm leading-7 text-muted-foreground">Supported by product, legal, operational, or catalogue evidence: prepaid/postpaid compatibility, active-offer validity, device compatibility, geographic eligibility, plan eligibility, or regulatory restriction.</CardContent></Card><Card><CardHeader><CardTitle className="text-lg">Assumed hard eligibility</CardTitle></CardHeader><CardContent className="text-sm leading-7 text-muted-foreground">Temporarily required for the demo but unsupported by evidence. Mark ASSUMED_HARD_RULE_FOR_DEMO and minimize because a wrong hard rule removes candidates completely.</CardContent></Card><Card><CardHeader><CardTitle className="text-lg">Soft ranking assumptions</CardTitle></CardHeader><CardContent className="text-sm leading-7 text-muted-foreground">Affordability fit, usage fit, segment affinity, channel preference, or price sensitivity should adjust score rather than eliminate an offer unless evidence supports exclusion.</CardContent></Card></div></section>

    <section><h3 className="text-xl font-semibold text-foreground">Risk register</h3><div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-muted/50"><tr><th className="p-3">Risk</th><th className="p-3">Severity</th><th className="p-3">Current mitigation</th></tr></thead><tbody className="divide-y divide-border text-muted-foreground">{riskRows.map(([risk,severity,mitigation]) => <tr key={risk}><th className="p-3 text-foreground">{risk}</th><td className="p-3">{severity}</td><td className="p-3">{mitigation}</td></tr>)}</tbody></table></div></section>

    <section><h3 className="text-xl font-semibold text-foreground">Gate logic and claim boundary</h3><div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-muted/50"><tr><th className="p-3">Gate</th><th className="p-3">Meaning</th><th className="p-3">Current state</th></tr></thead><tbody className="divide-y divide-border text-muted-foreground"><tr><th className="p-3 text-foreground">Gate A</th><td className="p-3">Rule-based baseline authorization after Silver/grain/rule/assumption audit.</td><td className="p-3">Pending data audit</td></tr><tr><th className="p-3 text-foreground">Gate B</th><td className="p-3">Proxy supervised challenger only after label-generation and leakage audit.</td><td className="p-3">Not authorized</td></tr><tr><th className="p-3 text-foreground">Gate C</th><td className="p-3">Real model-performance claim requires observed exposure/response and representative evaluation data.</td><td className="p-3">Not authorized</td></tr><tr><th className="p-3 text-foreground">Gate D</th><td className="p-3">Causal, contextual-bandit, or RL claim requires exploration/control, logged action probabilities, policy history, reward delay, and offline policy evaluation.</td><td className="p-3">Not authorized</td></tr></tbody></table></div><Alert className="mt-5 border-slate-500/30 bg-slate-500/5"><AlertDescription className="text-sm leading-6"><strong>Approved public claim:</strong> this phase demonstrates a governed and reproducible NBO decision pipeline using synthetic or composite data on Azure Databricks. It covers candidate generation, policy-based ranking, experiment tracking, scoring, output governance, and monitoring design. Model effectiveness and commercial uplift have not been validated against observed customer exposure and response data.</AlertDescription></Alert></section>

    <section><h3 className="text-xl font-semibold text-foreground">Required evidence files</h3><div className="mt-5 grid gap-3 md:grid-cols-2">{requiredEvidence.map((file) => <Card key={file}><CardContent className="p-4"><code className="text-sm text-foreground">{file}</code></CardContent></Card>)}</div><div className="mt-5 flex flex-wrap gap-2"><Badge variant="outline">PROCEED_WITH_RULE_BASED_LEARNING_BASELINE</Badge><Badge variant="outline">SUPERVISED_LABEL_TRUST_NOT_ESTABLISHED</Badge><Badge variant="outline">REAL_WORLD_MODEL_EFFECTIVENESS_NOT_CLAIMED</Badge><Badge variant="outline">RL_AND_BANDIT_NOT_AUTHORIZED</Badge></div></section>
  </div>
}

export function ExperimentTabs() {
  const [active, setActive] = useState<"one" | "two">("one")
  const tabClass = (key: "one" | "two") => `border-b-2 px-5 py-4 text-sm font-semibold transition ${active === key ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`
  return <section className="border-y border-border bg-muted/20 py-10"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><div className="mb-7"><h2 className="text-2xl font-semibold tracking-tight text-foreground">Experiment evidence</h2><p className="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">The top-level Cockpit remains shared. Detailed execution evidence is separated below so the completed volume-expanded experiment and the smaller post-Silver baseline can be evaluated independently.</p></div><div className="flex border-b border-border"><button className={tabClass("one")} onClick={() => setActive("one")}>Experiment 1 — Volume-expanded synthetic baseline</button><button className={tabClass("two")} onClick={() => setActive("two")}>Experiment 2 — Post-Silver low-volume baseline</button></div><div className="rounded-b-xl border border-t-0 border-border bg-background p-5 sm:p-7">{active === "one" ? <ExperimentOne /> : <ExperimentTwo />}</div></div></section>
}
