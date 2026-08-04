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
    status: "In Progress",
    description: "Establish traceable non-production source inputs for the PoC.",
    currentResult:
      "Research, candidate comparison, working-set selection, source-contract design, and synthetic-data design are complete. Dataset generation and Databricks ingestion have not started.",
    actions: [
      "Define owner-created data contracts",
      "Generate or load synthetic or representative product, customer-event, transaction, and payment samples",
      "Apply source metadata and identifier-protection controls",
      "Ingest into Bronze",
    ],
    expectedResult: "Traceable, protected source inputs and Bronze ingestion read-back evidence.",
    subphases: [
      ["Data-source research", "Evidence Verified", "Public candidate sources and documentation reviewed"],
      ["Candidate comparison", "Evidence Verified", "Candidates compared against PoC needs, constraints, provenance, and reproducibility"],
      ["Working-set selection", "Evidence Verified", "Working set selected with documented rationale"],
      ["Source-contract design", "Design Complete", "Target contract designed across isolated evidence lanes"],
      ["Synthetic-data design", "Design Complete — Not Executed", "Generation method, constraints, and provenance requirements specified"],
      ["Dataset generation", "Not Started", "No NBO–NRT synthetic records generated"],
      ["Databricks Bronze ingestion", "Not Started", "No NBO–NRT ingestion read-back"],
    ],
    remark:
      "Source-specific labels remain traceability labels only. No operator schema or production ingestion is claimed.",
    details: [
      "Source table inventory",
      "Schema summary and row counts",
      "Timestamp fields",
      "Identifier treatment",
      "Ingestion validation",
    ],
  },
  {
    phase: "Phase 2 — Data Preparation and Feature Readiness",
    status: "Design Ready",
    description: "Convert raw inputs into validated, model-ready entities and features.",
    currentResult:
      "Target preparation structure, evidence lanes, provenance expectations, and model-ready design are prepared. No NBO–NRT Silver or feature read-back exists yet.",
    actions: [
      "Validate Bronze",
      "Standardize and clean Silver",
      "Reconcile customer, product, offer, event, transaction, and payment fields",
      "Create event-time and freshness metadata",
      "Apply leakage and quality checks",
    ],
    expectedResult: "Validated Silver tables, model-ready features, and quality and freshness evidence.",
    subphases: [
      ["Target contract structure", "Design Complete", "Required source domains and target fields defined"],
      ["Evidence-lane separation", "Design Complete", "Candidate evidence kept in isolated lanes"],
      ["Provenance requirements", "Design Complete", "Source, derivation, and reproducibility expectations specified"],
      ["Preparation logic", "Design Ready", "Cleaning, validation, temporal, and freshness requirements defined"],
      ["Dataset profiling", "Not Started", "No generated NBO dataset profiled"],
      ["Silver transformation", "Not Started", "No NBO–NRT Silver table"],
      ["Feature preparation", "Not Started", "No NBO–NRT model-ready feature table"],
      ["Quality and freshness read-back", "Not Started", "No executed evidence"],
    ],
    remark:
      "Bronze, Silver, and feature preparation are PoC implementation choices, not source-system facts.",
    details: [
      "Transformation rules",
      "Null and duplicate checks",
      "Feature list and temporal rules",
      "Quality metrics",
    ],
  },
  {
    phase: "Phase 3 — Eligibility and Candidate Generation",
    status: "Design Ready",
    description: "Build valid customer-offer combinations before ranking.",
    currentResult:
      "Eligibility, exclusion, candidate-generation, versioning, and trace requirements are designed. No actual customer-offer candidate table has been generated.",
    actions: [
      "Define generic PoC eligibility rules",
      "Apply exclusions and policy constraints",
      "Generate customer-offer candidates",
      "Remove invalid combinations",
      "Persist the candidate table",
    ],
    expectedResult: "Eligible customer-offer candidates with rule trace and filtering counts.",
    subphases: [
      ["Eligibility concept", "Design Complete", "Eligibility separated from model ranking"],
      ["Rule and exclusion structure", "Design Complete", "Generic PoC rule categories defined"],
      ["Candidate-table contract", "Design Complete", "Candidate fields and trace requirements defined"],
      ["Candidate versioning", "Design Ready", "Rule and candidate version expectations defined"],
      ["Rule implementation", "Not Started", "No executable PoC rule set"],
      ["Candidate generation", "Not Started", "No customer-offer combinations generated"],
      ["Candidate persistence", "Not Started", "No persisted candidate table"],
      ["Before/after candidate counts", "Not Started", "No executed filtering evidence"],
    ],
    remark:
      "Eligibility and exclusion logic are owner-created PoC assumptions, not operator production rules.",
    details: [
      "Rule register and rule version",
      "Candidate-volume summary",
      "Rejected combinations",
    ],
    candidateExample: true,
  },
  {
    phase: "Phase 4 — Baseline Ranking and Model Governance",
    status: "Planned",
    description: "Rank eligible offers and create traceable model evidence.",
    currentResult:
      "The baseline modeling direction and governance evidence requirements are defined. No NBO model has been trained, logged, registered, or scored.",
    actions: [
      "Train a propensity or ranking baseline",
      "Compare candidate approaches",
      "Log parameters, metrics, and artifacts in MLflow",
      "Register the selected model and verify read-back",
      "Score and rank candidates",
    ],
    expectedResult: "A governed baseline model and traceable ranked customer-offer output.",
    subphases: [
      ["Baseline model direction", "Design Complete", "Propensity or ranking baseline selected for the first PoC"],
      ["RL target direction", "Given Recommendation", "Retained as future direction, not implemented"],
      ["MLflow evidence contract", "Design Complete", "Parameters, metrics, artifacts, lineage, and signature requirements defined"],
      ["Registry evidence contract", "Design Complete", "Model registration and read-back requirements defined"],
      ["Model training", "Not Started", "No NBO model run"],
      ["Model comparison", "Not Started", "No NBO model comparison"],
      ["Model registration", "Not Started", "No NBO registered model"],
      ["Candidate scoring and ranking", "Not Started", "No scored candidate table"],
    ],
    remark:
      "Reinforcement Learning remains the target direction from the given recommendation; the first PoC uses a simpler baseline to prove the lifecycle.",
    details: [
      "Feature set and train/test method",
      "Metrics and model comparison",
      "Registry state and model signature",
      "Ranking logic",
    ],
  },
  {
    phase: "Phase 5 — Top-N NBO Output and NRT Delivery Preparation",
    status: "Planned",
    description: "Produce a governed Top-N recommendation output and simulate downstream handoff.",
    currentResult:
      "Top-N output structure, simulated NRT delivery boundary, TMF680-aligned abstraction, and decision-trace requirements are defined. No delivery payload or latency evidence exists yet.",
    actions: [
      "Select Top 1 or Top N offers",
      "Persist a Gold recommendation output as a PoC implementation choice",
      "Create a TMF680-aligned payload",
      "Simulate downstream handoff",
      "Preserve model and decision traceability",
    ],
    expectedResult:
      "Top-N NBO recommendations prepared for simulated NRT delivery, with ranking score, model version, decision timestamp, eligibility trace, model-to-decision lineage, and observed processing latency.",
    subphases: [
      ["Top-N output contract", "Design Complete", "Ranking score, model version, decision timestamp, and trace fields defined"],
      ["NRT delivery abstraction", "Design Complete", "Simulated lower-latency delivery boundary defined"],
      ["TMF680-aligned output", "Design Ready", "Public PoC abstraction defined"],
      ["LID680 boundary", "Evidence Bounded", "Retained only as a traceability label"],
      ["Gold output design", "Design Complete", "Persisted ranked recommendation output specified"],
      ["Top-N generation", "Not Started", "No actual recommendation output"],
      ["Payload generation", "Not Started", "No simulated TMF680-aligned payload"],
      ["Latency measurement", "Not Started", "No observed NRT-oriented latency evidence"],
    ],
    remark:
      "LID680 is retained only as a traceability label; no internal system meaning or production integration is asserted.",
    details: [
      "Top-N output schema and payload example",
      "Model version and score",
      "Eligibility trace and decision timestamp",
      "Observed processing latency",
    ],
  },
  {
    phase: "Phase 6 — Feedback, Monitoring, and Next Cycle",
    status: "Planned",
    description: "Demonstrate how outcome evidence feeds monitoring and the next model cycle.",
    currentResult:
      "Feedback categories, reward assumptions, monitoring dimensions, and next-cycle controls are defined. No feedback, drift, or retraining evidence exists yet.",
    actions: [
      "Generate representative response events",
      "Calculate illustrative immediate or delayed outcomes as a PoC working assumption",
      "Monitor quality, freshness, latency, score distribution, recommendation distribution, and outcome signals",
      "Compare model versions",
      "Define retraining or policy-update triggers",
    ],
    expectedResult: "Traceable feedback, monitoring, drift evidence, and a governed next-cycle decision.",
    subphases: [
      ["Feedback-event concept", "Design Complete", "Representative response-event categories defined"],
      ["Reward design", "Design Complete — Assumption Only", "Immediate and delayed outcome concepts defined"],
      ["Monitoring dimensions", "Design Complete", "Quality, freshness, latency, score, recommendation, and outcome monitoring defined"],
      ["Next-cycle decision structure", "Design Ready", "Retraining or policy-update decision path defined"],
      ["Feedback generation", "Not Started", "No response records"],
      ["Reward calculation", "Not Started", "No executed reward evidence"],
      ["Drift monitoring", "Not Started", "No measured drift"],
      ["Retraining or policy update", "Not Started", "No next-cycle execution"],
    ],
    remark:
      "Reward values, attribution rules, and observation windows are PoC assumptions; monitoring thresholds are not production standards.",
    details: [
      "Response-event schema and outcome taxonomy",
      "Monitoring metrics and threshold assumptions",
      "Model comparison",
      "Retraining decision",
    ],
  },
]

const alignment = [
  ["Product catalogue modernization", "Product and offer data ingestion"],
  ["Behavioural, transactional, and event modernization", "Customer-signal and event ingestion"],
  ["ETL migration", "Databricks Bronze–Silver processing as a PoC implementation choice"],
  [
    "Data to M5",
    "Low-latency event and payment data preparation. “M5” is retained only as a traceability label; no internal system meaning is asserted.",
  ],
  [
    "Episodic NBO model interval",
    "Governed recommendation execution interval; no source-specific meaning of “episodic” is inferred.",
  ],
  [
    "NBO model direction",
    "Reinforcement Learning retained as the target direction; baseline propensity or ranking proposed for the first PoC.",
  ],
  [
    "TMF680 to LID680",
    "TMF680-aligned recommendation output with a simulated downstream handoff. “LID680” is retained only as a traceability label; no internal system meaning or responsibility is asserted.",
  ],
  [
    "PII hashing checkpoints",
    "Identifier-protection controls represented in the PoC without asserting production placement or implementation.",
  ],
]

const disclosures = [
  {
    title: "Data-source evidence mapping",
    status: "Research complete",
    body: [
      "Ten public candidates were assessed. Bank Marketing and the pinned TMF620 schema asset were acquired and profiled for bounded methodology and schema roles.",
      "OTTO and MIND are documentation/reference sources only; no OTTO or MIND data bytes are integrated. No public source is treated as a complete Telco NBO–NRT dataset.",
    ],
  },
  {
    title: "Assumptions and Owner-Created Components",
    body: [
      "Owner-created contracts, synthetic inputs, eligibility rules, representative response events, reward definitions, observation windows, and timing targets remain explicit PoC assumptions.",
      "Five-minute execution and ten-minute end-to-end values are illustrative assumptions only—not operator requirements, source cadence, production SLAs, or confirmed latency commitments.",
    ],
  },
  {
    title: "Data Contracts and Schemas",
    body: [
      "Product, event, transaction, payment, offer, candidate, recommendation, and response contracts will be owner-created or representative non-production artifacts until verified source contracts exist.",
    ],
  },
  {
    title: "Telco Business Rules",
    body: [
      "Eligibility, exclusion, channel, candidate-generation, ranking, and selection rules are generic PoC assumptions, not operator production rules.",
    ],
  },
  {
    title: "TMF680 / LID680 Boundary",
    body: [
      "The PoC target is a TMF680-aligned contract and simulated downstream handoff. LID680 is retained only as a traceability label; no internal meaning, responsibility, or production integration is asserted.",
    ],
  },
  {
    title: "Telemetry and Governance",
    body: [
      "Planned evidence includes data and model lineage, run parameters, metrics, artifacts, registry read-back, decision trace, validation results, latency, monitoring, and explicit unresolved gaps.",
    ],
  },
]

const progressGroups = [
  {
    title: "A. Data Discovery and Design",
    summary:
      "Research, bounded source-role selection, target-contract design, and design reproducibility are complete.",
    stages: [
      [
        "Candidate Research",
        "COMPLETED",
        "10 public candidates assessed across licence, provenance, access, temporal structure, customer-offer linkage, exposure semantics, recommendation utility, leakage risk, and demonstration value.",
      ],
      [
        "Composite Source Selection",
        "SELECTED",
        "4 bounded roles: Bank Marketing and TMF620 acquired/profiled; OTTO and MIND retained as documentation/reference sources only.",
      ],
      [
        "Target Data Contract",
        "DESIGNED",
        "Contract v0.1.0 with 108 fields across two isolated evidence lanes.",
      ],
      [
        "Phase 5A Reproducibility",
        "VALIDATED",
        "57/57 deterministic assertions passed; design artifacts and the evidence packet were reconciled.",
      ],
      [
        "Phase 5A Gate",
        "PASSED",
        "PASS_READY_FOR_BOUNDED_IMPLEMENTATION_AUTHORIZATION",
      ],
      [
        "Independent Checker",
        "PASS",
        "Packet-only review; no direct repository, generated-data, cloud, or implementation observation.",
      ],
      [
        "Claim Level",
        "DRAFT_LOCAL_ONLY",
        "Verified Phase 5A research, selection, contract, and reproducibility evidence only.",
      ],
    ],
    boundary:
      "Phase 5A validates design reproducibility and evidence sufficiency only. It does not prove generated composite rows, Phase 5B activity, cloud loading, Databricks tables, model execution, or production readiness.",
  },
  {
    title: "B. Data Implementation",
    summary:
      "Local composite data implementation is proven; cloud loading and platform implementation have not started.",
    stages: [
      [
        "Local Composite Dataset Generation",
        "COMPLETED",
        "11 related local tables and 805 rows were generated deterministically: 50 Bank Marketing methodology rows and 755 explicitly synthetic Telco decision-loop rows.",
      ],
      [
        "Local Composite Validation",
        "VALIDATED",
        "47/47 assertions passed across schema, integrity, temporal order, evidence-lane separation, lineage, and decision trace.",
      ],
      [
        "Clean-room Reproducibility",
        "VALIDATED",
        "All 11 table hashes and the generation-manifest hash matched on a clean-room rerun.",
      ],
      [
        "Phase 5B Gate",
        "PASSED",
        "PASS_READY_FOR_BOUNDED_MODELING_AUTHORIZATION",
      ],
      [
        "Claim Level",
        "LOCAL_COMPOSITE_IMPLEMENTATION_EVIDENCE_ONLY",
        "Local deterministic composite implementation evidence only; not real Telco customer data and not cloud or model evidence.",
      ],
      ["ADLS Landing", "NOT STARTED", "No upload package or Owner upload authorization exists."],
      ["Unity Catalog Onboarding", "NOT STARTED", "Begins only after an authorized ADLS landing."],
      ["Bronze", "NOT STARTED", "No NBO–NRT Bronze table or read-back evidence."],
      ["Silver", "NOT STARTED", "No NBO–NRT Silver transformation or read-back evidence."],
      ["Features", "NOT STARTED", "No NBO–NRT model-ready feature table."],
    ],
    boundary:
      "Phase 5B proves local composite generation and validation only. The 50-row Bank methodology lane is distinct from the 755-row synthetic Telco loop. ADLS → Unity Catalog → Bronze → Silver → Features have not started.",
  },
  {
    title: "C. MLOps Lifecycle",
    summary:
      "NBO model and MLOps execution have not started; prior use-case evidence is not inherited.",
    stages: [
      ["MLflow", "NOT STARTED", "No NBO experiment run or artifact evidence."],
      ["Model Registry", "NOT STARTED", "No NBO registered model or registry read-back."],
      ["Batch/NRT Inference", "NOT STARTED", "No batch or simulated NRT inference evidence."],
      ["Monitoring", "NOT STARTED", "No NBO quality, drift, latency, recommendation, or outcome monitoring."],
    ],
    boundary:
      "Features and model governance must exist before Top-N NBO/NRT output; output evidence must exist before feedback and monitoring are claimed.",
  },
]

const cockpitEvidenceSummary = [
  [
    "Data Research: Completed.",
    "Ten public candidates were assessed for licence, provenance, access, temporal structure, customer-offer linkage, exposure semantics, recommendation utility, leakage risk, and demonstration value.",
  ],
  [
    "Composite Working Set: Selected.",
    "Bank Marketing and TMF620 were acquired and profiled for bounded methodology and schema roles. OTTO and MIND were retained as documentation/reference sources only.",
  ],
  [
    "Dataset Contract: Designed and Validated.",
    "The target contract v0.1.0 contains 108 fields across two isolated evidence lanes. Phase 5A reproducibility passed 57/57 assertions.",
  ],
  [
    "Local Composite Data Implementation — Proven.",
    "A deterministic NBO-NRT demonstration dataset was implemented locally across 11 related tables and 805 rows: 50 Bank Marketing methodology rows and 755 explicitly synthetic Telco decision-loop rows. All 47 validation assertions passed, and clean-room table and manifest hashes matched. Model development and Azure Databricks execution have not started.",
  ],
]

function statusBadgeClass(status: string) {
  const normalized = status.toLowerCase()

  if (
    new Set([
      "completed",
      "selected",
      "designed",
      "validated",
      "passed",
      "evidence verified",
      "research complete",
    ]).has(normalized)
  ) {
    return "border-emerald-700 bg-emerald-100 text-emerald-900 dark:border-emerald-500 dark:bg-emerald-950 dark:text-emerald-200"
  }

  if (normalized === "in progress") {
    return "border-amber-700 bg-amber-100 text-amber-950 dark:border-amber-500 dark:bg-amber-950 dark:text-amber-200"
  }

  if (normalized === "not started" || normalized === "not built") {
    return "border-slate-500 bg-slate-200 text-slate-950 dark:border-slate-500 dark:bg-slate-800 dark:text-slate-100"
  }

  if (normalized.includes("blocked") || normalized.includes("failed")) {
    return "border-red-700 bg-red-100 text-red-950 dark:border-red-500 dark:bg-red-950 dark:text-red-200"
  }

  return "border-border bg-muted/40 text-muted-foreground"
}

const nextSteps = [
  "Define owner-created PoC contracts for product, event, transaction, payment, and offer data.",
  "Generate synthetic or representative non-production inputs with explicit provenance.",
  "Implement Bronze ingestion and Silver validation.",
  "Create eligibility rules and a customer-offer candidate dataset.",
  "Train and compare a propensity or ranking baseline.",
  "Log parameters, metrics, artifacts, and lineage in MLflow.",
  "Register the selected baseline model and verify read-back.",
  "Generate a Top-N recommendation table with model and decision trace.",
  "Apply identifier-protection controls at defined PoC checkpoints.",
  "Measure observed batch or micro-batch latency.",
  "Generate a simulated TMF680-aligned output.",
  "Demonstrate representative response events and the next model-cycle path.",
  "Add data-quality, freshness, recommendation-distribution, and outcome monitoring.",
  "Publish evidence separating implemented, measured, assumed, and unproven elements.",
]

export default function NboNrtAzureDatabricksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="mx-auto w-full max-w-5xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="flex justify-end">
          <div className="text-right text-sm leading-6 text-muted-foreground">
            <p>Evidence on this page reconciled through 4 Aug 2026</p>
            <p>Curated static release — not a continuous live-status feed</p>
          </div>
        </div>
      </div>
      <main className="flex-1">
        <section className="border-b border-border bg-background">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Telco decision intelligence</Badge>
              <Badge variant="outline">Azure Databricks</Badge>
              <Badge className={statusBadgeClass("In Progress")}>
                In Progress
              </Badge>
            </div>
            <h1 className="mt-4 max-w-5xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              NBO–NRT Telco on Azure Databricks
            </h1>
            <p className="mt-4 max-w-4xl text-base leading-7 text-muted-foreground sm:text-lg">
              From fragmented customer signals to governed next-best decisions in near real time.
            </p>
            <Alert className="mt-6 border-amber-500/30 bg-amber-500/5">
              <AlertDescription className="text-sm leading-6">
                This page presents a bounded PoC architecture and execution plan derived from the
                given recommendation. Source-specific labels are abstracted, and no
                operator-specific implementation or production SLA is claimed.
              </AlertDescription>
            </Alert>
            <p className="mt-4 max-w-4xl text-sm leading-6 text-muted-foreground">
              <strong className="text-foreground">Execution position:</strong> Ready to execute a
              bounded PoC under transparent assumptions.
            </p>
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Proposed First Executable Slice
            </h2>
            <p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">
              A bounded implementation slice designed to prove the core NBO decision flow before
              any operator-specific integration.
            </p>
            <div className="mt-5 overflow-x-auto rounded-lg border border-border">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-muted/50 text-foreground">
                  <tr><th className="p-3">Area</th><th className="p-3">Initial PoC scope</th></tr>
                </thead>
                <tbody className="divide-y divide-border text-muted-foreground">
                  <tr><th className="p-3 text-foreground">Input</th><td className="p-3">Synthetic or representative non-production product, customer-event, transaction, and payment samples</td></tr>
                  <tr><th className="p-3 text-foreground">Process</th><td className="p-3">Bronze → Silver → eligibility → candidate generation → baseline ranking</td></tr>
                  <tr><th className="p-3 text-foreground">Output</th><td className="p-3">Top-N NBO recommendations prepared for simulated NRT delivery, with ranking score, model version, decision timestamp, eligibility trace, and decision trace.</td></tr>
                  <tr><th className="p-3 text-foreground">Control</th><td className="p-3">Identifier protection, MLflow experiment tracking, registered-model read-back, access boundaries, and latency measurement</td></tr>
                  <tr><th className="p-3 text-foreground">Proof</th><td className="p-3">Repeatable batch or micro-batch execution with persisted read-back evidence</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 max-w-4xl text-sm leading-6 text-muted-foreground">
              <strong className="text-foreground">PoC boundary:</strong> This slice uses owner-created
              or representative non-production contracts. It does not assert operator-specific
              schemas, interfaces, business rules, or production service levels.
            </p>
          </div>
        </section>

        <section className="border-y border-border bg-muted/25 py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Alignment to the Given Recommendation
            </h2>
            <p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">
              The table translates the given recommendation into a public, non-proprietary PoC
              abstraction. Source-specific labels are retained for traceability only. The mapping
              does not assert undocumented system semantics, ownership, interface behavior, or
              production implementation.
            </p>
            <div className="mt-5 overflow-x-auto rounded-lg border border-border bg-background">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-muted/50"><tr><th className="p-3">Recommendation area</th><th className="p-3">Public PoC abstraction</th></tr></thead>
                <tbody className="divide-y divide-border text-muted-foreground">
                  {alignment.map(([area, abstraction]) => (
                    <tr key={area}><th className="p-3 align-top text-foreground">{area}</th><td className="p-3">{abstraction}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <Card><CardHeader><CardTitle>The decision to improve</CardTitle></CardHeader><CardContent className="text-sm leading-6 text-muted-foreground">Which eligible offer should be ranked for a customer at the current decision interval, with traceable data, decision output, and later feedback?</CardContent></Card>
            <Card><CardHeader><CardTitle>Business challenge</CardTitle></CardHeader><CardContent className="text-sm leading-6 text-muted-foreground">Batch-oriented customer and offer signals may be stale when an offer is delivered. The target is a governed lower-latency recommendation flow aligned with defined business, data, and model intervals.</CardContent></Card>
          </div>
        </section>

        <section className="border-y border-border bg-muted/25 py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">PoC execution phases</h2>
            <p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">
              <strong className="text-foreground">Execution flexibility:</strong> Phases represent
              the current PoC delivery path. Activities may be refined, repeated, or reordered when
              evidence, data quality, or model results require adjustment. Any change must remain
              traceable through evidence and decision records.
            </p>
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {phases.map((item) => (
                <Card key={item.phase}>
                  <CardHeader>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <CardTitle>{item.phase}</CardTitle>
                      <Badge variant="outline" className={statusBadgeClass(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
                    <p><strong className="text-foreground">Description:</strong> {item.description}</p>
                    <p><strong className="text-foreground">Current Result:</strong> {item.currentResult}</p>
                    <p><strong className="text-foreground">Remark:</strong> {item.remark}</p>
                    <details className="group rounded-md border border-border bg-background">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 font-semibold text-foreground">
                        <span>Details</span><span aria-hidden="true" className="text-primary group-open:rotate-45">+</span>
                      </summary>
                      <div className="space-y-3 border-t border-border p-4">
                        <div><strong className="text-foreground">Action:</strong><ul className="mt-1 list-disc space-y-1 pl-5">{item.actions.map((value) => <li key={value}>{value}</li>)}</ul></div>
                        <p><strong className="text-foreground">Expected Result:</strong> {item.expectedResult}</p>
                        <div className="overflow-x-auto">
                          <table className="w-full min-w-[760px] text-left text-xs">
                            <thead className="bg-muted/50"><tr><th className="p-2">Sub-phase</th><th className="p-2">Status</th><th className="p-2">Result</th></tr></thead>
                            <tbody className="divide-y divide-border">
                              {item.subphases.map(([subphase, status, result]) => (
                                <tr key={subphase}><th className="p-2 align-top text-foreground">{subphase}</th><td className="p-2 align-top"><Badge variant="outline" className={statusBadgeClass(status)}>{status}</Badge></td><td className="p-2">{result}</td></tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <p className="font-semibold text-foreground">Validation and technical notes</p>
                        <ul className="list-disc space-y-1 pl-5">{item.details.map((value) => <li key={value}>{value}</li>)}</ul>
                        {item.candidateExample ? (
                          <div className="overflow-x-auto">
                            <table className="w-full min-w-[820px] text-left text-xs">
                              <thead className="bg-muted/50"><tr>{["customer_id_hash","offer_id","eligibility_status","exclusion_reason","event_timestamp","candidate_version"].map((column) => <th className="p-2" key={column}>{column}</th>)}</tr></thead>
                              <tbody><tr className="border-t border-border"><td className="p-2 text-muted-foreground" colSpan={6}>Example schema only — no candidate rows exist yet.</td></tr></tbody>
                            </table>
                          </div>
                        ) : null}
                      </div>
                    </details>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10" aria-labelledby="nbo-progress-title">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 id="nbo-progress-title" className="text-2xl font-semibold tracking-tight text-foreground">
              NBO–NRT progress and next executable boundary
            </h2>
            <p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">
              Research and design progress are reported separately from dataset, cloud, and MLOps
              implementation so completed evidence is visible without implying that the solution is built.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {cockpitEvidenceSummary.map(([title, description]) => (
                <Card key={title}>
                  <CardContent className="space-y-2 p-5 text-sm leading-6 text-muted-foreground">
                    <p className="font-semibold text-foreground">{title}</p>
                    <p>{description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 space-y-6">
              {progressGroups.map((group) => (
                <Card key={group.title}>
                  <CardHeader>
                    <CardTitle>{group.title}</CardTitle>
                    <p className="text-sm leading-6 text-muted-foreground">{group.summary}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[760px] text-left text-sm">
                        <thead className="bg-muted/50">
                          <tr><th className="p-3">Stage</th><th className="p-3">Status</th><th className="p-3">Current evidence</th></tr>
                        </thead>
                        <tbody className="divide-y divide-border text-muted-foreground">
                          {group.stages.map(([stage, status, evidence]) => (
                            <tr key={stage}>
                              <th className="p-3 align-top text-foreground">{stage}</th>
                              <td className="p-3 align-top"><Badge variant="outline" className={statusBadgeClass(status)}>{status}</Badge></td>
                              <td className="p-3">{evidence}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="rounded-md border border-border bg-muted/25 px-4 py-3 text-sm leading-6 text-muted-foreground">
                      <strong className="text-foreground">Boundary:</strong> {group.boundary}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Expandable sections</h2>
            <div className="mt-6 space-y-3">
              {disclosures.map((item) => (
                <details key={item.title} className="group rounded-lg border border-border bg-card">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-foreground">
                    <span>{item.title}</span><span className="flex items-center gap-3">{item.status ? <Badge variant="outline" className={statusBadgeClass(item.status)}>{item.status}</Badge> : null}<span aria-hidden="true" className="text-primary group-open:rotate-45">+</span></span>
                  </summary>
                  <div className="space-y-3 border-t border-border px-5 py-4 text-sm leading-6 text-muted-foreground">{item.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-muted/25 py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Current evidence and readiness</h2>
            <div className="mt-4 max-w-4xl space-y-3 text-sm leading-6 text-muted-foreground">
              <p>Prior foundation evidence exists, but it does not prove the NBO–NRT-specific flow.</p>
              <p>NBO-specific contracts, latency, candidate generation, ranking, registry governance, delivery, identifier-protection checkpoints, reward feedback, drift monitoring, and production readiness are not yet proven.</p>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Executable next steps</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground">{nextSteps.map((step) => <li key={step}>{step}</li>)}</ol>
          </div>
        </section>

        <section className="border-t border-border py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Evidence and source boundary</h2>
            <p className="mt-4 max-w-4xl text-sm leading-6 text-muted-foreground">The canonical NBO–NRT Knowledge Base governs this page. The recommendation mapping is a public abstraction, and source-specific labels retain no undocumented semantics. The previous Churn use case informs layout only. No proprietary data, production credentials, operator-specific implementation, or production result is presented.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
