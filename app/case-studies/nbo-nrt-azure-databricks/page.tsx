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
    status: "In Design",
    description: "Establish traceable non-production source inputs for the PoC.",
    actions: [
      "Define owner-created data contracts",
      "Generate or load synthetic or representative product, customer-event, transaction, and payment samples",
      "Apply source metadata and identifier-protection controls",
      "Ingest into Bronze",
    ],
    results: [
      "Traceable Bronze tables",
      "Source metadata",
      "Protected customer identifiers",
      "Ingestion read-back evidence",
    ],
    remark:
      "Source-specific names such as M5 remain traceability labels only; real operator schemas are not claimed.",
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
    status: "Planned",
    description: "Convert raw inputs into validated, model-ready entities and features.",
    actions: [
      "Validate Bronze",
      "Standardize and clean Silver",
      "Reconcile customer, product, offer, event, transaction, and payment fields",
      "Create event-time and freshness metadata",
      "Apply leakage and quality checks",
    ],
    results: [
      "Validated Silver tables",
      "Model-ready feature dataset",
      "Data-quality evidence",
      "Feature-freshness evidence",
    ],
    remark:
      "Bronze and Silver are PoC implementation choices; transformations may be revised when profiling reveals quality issues.",
    details: [
      "Transformation rules",
      "Null and duplicate checks",
      "Feature list and temporal rules",
      "Quality metrics",
    ],
  },
  {
    phase: "Phase 3 — Eligibility and Candidate Generation",
    status: "Planned",
    description: "Build valid customer-offer combinations before ranking.",
    actions: [
      "Define generic PoC eligibility rules",
      "Apply exclusions and policy constraints",
      "Generate customer-offer candidates",
      "Remove invalid combinations",
      "Persist the candidate table",
    ],
    results: [
      "Eligible customer-offer candidate table",
      "Rule trace",
      "Candidate counts before and after filtering",
    ],
    remark:
      "Rules are owner-created PoC assumptions and must not be represented as operator production rules.",
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
    actions: [
      "Train a propensity or ranking baseline",
      "Compare candidate approaches",
      "Log parameters, metrics, and artifacts in MLflow",
      "Register the selected model and verify read-back",
      "Score and rank candidates",
    ],
    results: [
      "MLflow run",
      "Registered baseline model",
      "Ranked customer-offer output",
      "Model version and metric evidence",
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
    phase: "Phase 5 — Recommendation Output and Simulated Delivery",
    status: "Planned",
    description: "Produce a governed Top-N recommendation output and simulate downstream handoff.",
    actions: [
      "Select Top 1 or Top N offers",
      "Persist a Gold recommendation output as a PoC implementation choice",
      "Create a TMF680-aligned payload",
      "Simulate downstream handoff",
      "Preserve model and decision traceability",
    ],
    results: [
      "Gold recommendation table as a PoC output-layer choice",
      "Simulated delivery payload",
      "Model-to-decision lineage",
      "Latency measurement",
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
    actions: [
      "Generate representative response events",
      "Calculate illustrative immediate or delayed outcomes as a PoC working assumption",
      "Monitor quality, freshness, latency, score distribution, recommendation distribution, and outcome signals",
      "Compare model versions",
      "Define retraining or policy-update triggers",
    ],
    results: [
      "Feedback dataset",
      "Monitoring summary",
      "Drift or change indicators",
      "Next-cycle decision record",
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
    title: "Data Sources",
    status: "0 datasets",
    body: [
      "No approved, profiled, or upload-ready dataset evidence is included.",
      "Source-specific labels are retained for traceability only and are drawn from the canonical knowledge-base transcription of the supplied recommendation; no undocumented source-system semantics are asserted.",
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
              <Badge>Bounded PoC — In Design</Badge>
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
                  <tr><th className="p-3 text-foreground">Output</th><td className="p-3">Top-N recommendation table with model version and decision trace</td></tr>
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
                      <Badge variant="outline">{item.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
                    <p><strong className="text-foreground">Description:</strong> {item.description}</p>
                    <div><strong className="text-foreground">Action:</strong><ul className="mt-1 list-disc space-y-1 pl-5">{item.actions.map((value) => <li key={value}>{value}</li>)}</ul></div>
                    <div><strong className="text-foreground">Expected Result:</strong><ul className="mt-1 list-disc space-y-1 pl-5">{item.results.map((value) => <li key={value}>{value}</li>)}</ul></div>
                    <p><strong className="text-foreground">Remark:</strong> {item.remark}</p>
                    <details className="group rounded-md border border-border bg-background">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 font-semibold text-foreground">
                        <span>Details</span><span aria-hidden="true" className="text-primary group-open:rotate-45">+</span>
                      </summary>
                      <div className="space-y-3 border-t border-border p-4">
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

        <section className="py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Expandable sections</h2>
            <div className="mt-6 space-y-3">
              {disclosures.map((item) => (
                <details key={item.title} className="group rounded-lg border border-border bg-card">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-foreground">
                    <span>{item.title}</span><span className="flex items-center gap-3">{item.status ? <Badge variant="outline">{item.status}</Badge> : null}<span aria-hidden="true" className="text-primary group-open:rotate-45">+</span></span>
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
