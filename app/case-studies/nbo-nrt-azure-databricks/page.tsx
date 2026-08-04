import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  // Claims: CL-001, CL-003, CL-012, CL-016, CL-017
  title: "NBO–NRT Telco on Azure Databricks",
  description:
    "An in-design Telco use-case view for a governed next-best-offer decision flow on Azure Databricks, with planned work and evidence gaps clearly separated.",
}

const steps = [
  {
    title: "Step 1 — Source and ingestion",
    status: "In Design",
    bullets: [
      "Product catalogue data",
      "Telco behavioural, transactional, and event data",
      "Modernized ingestion into Azure Databricks",
      "Source timestamps, schema traceability, and ingestion metadata",
      "Bronze raw and traceable Telco data",
    ],
    evidence: "Canonical design only; no NBO–NRT source contract or ingestion read-back yet.",
    next: "Confirm source contracts, schemas, timestamps, and approved evidence.",
    boundary: "Not proven from documentation or prior Churn work.",
    claims: "CL-004, CL-005, CL-012, CL-013",
  },
  {
    title: "Step 2 — Databricks data preparation",
    status: "Planned",
    bullets: [
      "Bronze data validation",
      "Silver cleaning, validation, and standardization",
      "Customer identifier and timestamp standardization",
      "Product and offer reference reconciliation",
      "Customer, product, behavioural, transactional, and event features",
      "Feature freshness and event-time metadata",
    ],
    evidence: "Prior foundation evidence exists, but it does not prove this NBO–NRT flow.",
    next: "Validate representative contracts and produce NBO-specific read-back.",
    boundary: "Prior foundation evidence only.",
    claims: "CL-004, CL-005, CL-012, CL-013",
  },
  {
    title: "Step 3 — NBO decision preparation",
    status: "Planned",
    bullets: [
      "Commercial eligibility rules",
      "Product and customer exclusions",
      "Channel and policy constraints",
      "Customer-offer candidate generation",
      "Removal of impossible or prohibited combinations",
      "Eligible customer-offer candidate table",
    ],
    evidence: "Conceptual target; no approved operator rules or candidate table.",
    next: "Define and validate generic PoC rules without presenting them as operator truth.",
    boundary: "Generic PoC design only.",
    claims: "CL-004, CL-006, CL-012, CL-016",
  },
  {
    title: "Step 4 — Model decisioning and recommendation",
    status: "Planned",
    bullets: [
      "NBO decisioning",
      "Reinforcement Learning as the target model approach",
      "Propensity or ranking baseline for the initial proof of concept",
      "MLflow experiment tracking",
      "Model registration and approved-model read-back",
      "Candidate scoring and ranking",
      "Top 1 or Top N recommendation selection",
      "Gold ranked recommendation output",
    ],
    evidence: "No NBO model run, registered model, or inference read-back yet.",
    next: "Run a bounded baseline only after data and decision contracts are approved.",
    boundary: "Target architecture and PoC plan, not implemented capability.",
    claims: "CL-004, CL-007, CL-008, CL-012",
  },
  {
    title: "Step 5 — Delivery and customer outcome",
    status: "Not Yet Validated",
    bullets: [
      "TMF680-aligned recommendation contract",
      "Simulated downstream customer-channel flow",
      "Recommendation delivery and display",
      "Customer view, click, acceptance, rejection, or purchase",
      "Response and transaction traceability",
      "Model-version linkage to customer outcomes",
    ],
    evidence: "No validated interface, delivery, or operator-system implementation.",
    next: "Select the standard version and validate the payload and simulated boundary.",
    boundary:
      "TMF680-aligned target only; downstream internal responsibilities remain unknown.",
    claims: "CL-004, CL-009, CL-012, CL-016",
  },
  {
    title: "Step 6 — Feedback and next model cycle",
    status: "Planned",
    bullets: [
      "Positive, negative, and delayed reward calculation",
      "Ingestion and end-to-end latency monitoring",
      "Data-quality and feature-freshness monitoring",
      "Feature, score, and recommendation-distribution drift",
      "Acceptance, conversion, and reward monitoring",
      "Model comparison and approval",
      "Retraining or policy update",
      "Return to Step 4 for the next model cycle",
    ],
    evidence:
      "Reward values, observation windows, monitoring, and feedback remain unvalidated for NBO–NRT.",
    next: "Define the feedback contract, reward assumptions, and validation window.",
    boundary:
      "The 5-minute interval and 10-minute objective are PoC working assumptions pending confirmation.",
    claims: "CL-004, CL-011, CL-012, CL-014",
  },
]

const disclosures = [
  {
    title: "Data Sources",
    status: null,
    body: [
      "No approved, profiled, or upload-ready dataset evidence is included in this packet.",
      "Before any dataset supports page evidence, disclose provider or publisher, source URL, license and use restrictions, retrieval date, original file hash, verified profiling including row and column counts, observed source fields, and any derived, normalized, imputed, or synthetic additions. No approved, profiled, or upload-ready dataset evidence is included in this packet.",
    ],
    claims: "CL-012, CL-015, CL-018",
  },
  {
    title: "Assumptions and Owner-Created Components",
    status: null,
    body: [
      "The NBO–NRT expansion, processing interval, latency objective, reward values, downstream interface treatment, and generic PoC contracts require explicit assumption or origin labels until stakeholder evidence replaces them.",
      "PoC working assumption: a 5-minute execution interval and an end-to-end objective of 10 minutes or less, pending stakeholder confirmation.",
    ],
    claims: "CL-002, CL-014, CL-015, CL-016",
  },
  {
    title: "Data Contracts and Schemas",
    status: "Not Yet Validated",
    body: [
      "Source events, tables, APIs, join keys, temporal rules, field origins, and schema versions are not yet confirmed for NBO–NRT.",
    ],
    claims: "CL-012",
  },
  {
    title: "Telco Business Rules",
    status: "Planned",
    body: [
      "Eligibility, exclusion, channel, candidate-generation, ranking, and selection rules may be designed for a generic PoC. They must not be represented as operator production rules.",
    ],
    claims: "CL-006, CL-012, CL-016",
  },
  {
    title: "TMF680 / downstream boundary",
    status: "Not Yet Validated",
    body: [
      "The initial target is a TMF680-aligned contract. The selected version, schema, operations, semantics, and conformance evidence remain unvalidated. The downstream customer-channel interface is simulated; internal responsibilities remain unknown.",
    ],
    claims: "CL-009, CL-012, CL-016",
  },
  {
    title: "Telemetry and Governance",
    status: "Planned",
    body: [
      "Planned evidence includes role identity, provider/model where exposed, route, token/cost telemetry where available, files changed, validation commands, Git status, and unresolved telemetry gaps. Missing telemetry must be labelled rather than inferred.",
    ],
    claims: "CL-015, CL-018",
  },
]

const nextSteps = [
  "Confirm the official meaning and scope of NBO–NRT",
  "Confirm source, event, table, and interface contracts",
  "Confirm the processing and recommendation latency objective",
  "Confirm whether an existing model or representative baseline should be used",
  "Confirm whether synthetic data is acceptable for the first demonstration",
]

export default function NboNrtAzureDatabricksPage() {
  return (
    <PageLayout>
      {/* Claims: CL-001, CL-002, CL-003, CL-012, CL-016, CL-017 */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Telco decision intelligence</Badge>
            <Badge variant="outline">Azure Databricks</Badge>
            <Badge>In Design</Badge>
          </div>
          <h1 className="mt-4 max-w-5xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            NBO–NRT Telco on Azure Databricks
          </h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-muted-foreground sm:text-lg">
            From fragmented customer signals to governed next-best decisions in near real time.
          </p>
          <Alert className="mt-6 border-amber-500/30 bg-amber-500/5">
            <AlertDescription className="text-sm leading-6">
              Active discovery and hands-on PoC planning. “Near real time” is a target framing, not
              a proven production SLA. No NBO–NRT implementation, real-operator validity, or
              production readiness is proven.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Claims: CL-003, CL-006, CL-007, CL-011 */}
      <section className="py-10">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Card>
            <CardHeader><CardTitle>The decision to improve</CardTitle></CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              Which eligible offer should be ranked for a customer at the current decision interval,
              with traceable data, decision output, and later feedback?
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Business challenge</CardTitle></CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              Batch-oriented customer and offer signals may be stale when an offer is delivered. The
              target is a governed lower-latency recommendation flow aligned with a defined business
              and model interval.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-y border-border bg-muted/25 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Six canonical steps
          </h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {steps.map((step) => (
              <Card key={step.title}>
                <CardHeader>
                  {/* Claims: stored in step.claims and mirrored in the evidence packet */}
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <CardTitle>{step.title}</CardTitle>
                    <Badge variant="outline">{step.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
                  <ul className="list-disc space-y-1 pl-5">
                    {step.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                  <div className="space-y-2 rounded-md border border-border bg-background p-4">
                    <p><strong className="text-foreground">Evidence:</strong> {step.evidence}</p>
                    <p><strong className="text-foreground">Next:</strong> {step.next}</p>
                    <p><strong className="text-foreground">Boundary:</strong> {step.boundary}</p>
                  </div>
                  <span className="sr-only">Claim mapping: {step.claims}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Expandable sections
          </h2>
          <div className="mt-6 space-y-3">
            {disclosures.map((item) => (
              <details key={item.title} className="group rounded-lg border border-border bg-card">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-foreground">
                  <span>{item.title}</span>
                  <span className="flex items-center gap-3">
                    {item.status ? <Badge variant="outline">{item.status}</Badge> : null}
                    <span aria-hidden="true" className="text-primary group-open:rotate-45">+</span>
                  </span>
                </summary>
                <div className="space-y-3 border-t border-border px-5 py-4 text-sm leading-6 text-muted-foreground">
                  {item.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  <span className="sr-only">Claim mapping: {item.claims}</span>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Claims: CL-012, CL-013, CL-017 */}
      <section className="border-y border-border bg-muted/25 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Current evidence and readiness
          </h2>
          <div className="mt-4 max-w-4xl space-y-3 text-sm leading-6 text-muted-foreground">
            <p>Prior foundation evidence exists, but it does not prove the NBO–NRT-specific flow.</p>
            <p>
              NBO–NRT-specific source contracts, latency, candidate generation, ranking, registry
              governance, delivery, identifier-protection checkpoints, reward feedback, drift
              monitoring, and production readiness are not yet proven.
            </p>
          </div>
        </div>
      </section>

      {/* Claims: CL-002, CL-012, CL-014 */}
      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Planned next steps
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
            {nextSteps.map((step) => <li key={step}>{step}</li>)}
          </ul>
        </div>
      </section>

      {/* Claims: CL-001, CL-012, CL-013, CL-016, CL-019. CL-019 is Owner-authored. */}
      <section className="border-t border-border py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Evidence and source boundary
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-6 text-muted-foreground">
            The canonical NBO–NRT Knowledge Base governs this page. The previous Churn use case
            informs layout only. No proprietary data, production credentials, real-operator
            implementation detail, or production result is presented.
          </p>
        </div>
      </section>
    </PageLayout>
  )
}
