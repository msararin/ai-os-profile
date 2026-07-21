import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const tierDistribution = [
  {
    tier: 0,
    label: "Missing",
    count: 0,
    meaning: "No usable evidence yet.",
  },
  {
    tier: 1,
    label: "Conceptual",
    count: 4,
    meaning: "Idea exists, but evidence is fragmented.",
  },
  {
    tier: 2,
    label: "Documented",
    count: 8,
    meaning: "Spec, checklist, or design artifact exists.",
  },
  {
    tier: 3,
    label: "Validated local",
    count: 0,
    meaning: "Used in a local run with validation result.",
  },
  {
    tier: 4,
    label: "Repeatable repo-backed",
    count: 0,
    meaning: "Reusable checker, schema, or workflow exists in repo.",
  },
  {
    tier: 5,
    label: "Operationalized",
    count: 0,
    meaning: "Ongoing runtime telemetry, monitoring, or feedback loop exists.",
  },
]

const capabilities = [
  {
    name: "Claim boundary control",
    score: 2,
    tier: 2,
    status: "RCA open",
    tone: "rca",
    evidence: "Public non-claim rules, review rubrics, and claim-boundary wording patterns.",
    missing: "Reusable claim-boundary schema and validation scan.",
    upgrade: "Create CLAIM_BOUNDARY_SCHEMA.md and run a claim-boundary scan on future LLMOps reviews.",
  },
  {
    name: "Gate and authority model",
    score: 2,
    tier: 2,
    status: "RCA open",
    tone: "rca",
    evidence: "Owner gate records, role-routing plan, and authority boundaries in review receipts.",
    missing: "LLMOps role authority map and reusable gate receipt.",
    upgrade: "Create LLMOPS_ROLE_AUTHORITY_MAP.md and require gate receipts before score upgrades.",
  },
  {
    name: "Evidence receipts",
    score: 2,
    tier: 2,
    status: "RCA open",
    tone: "rca",
    evidence: "Route ledgers, QA receipts, deploy receipts, and telemetry closeout files.",
    missing: "Score-to-evidence receipt schema and reusable validation output.",
    upgrade: "Create EVIDENCE_RECEIPT_SCHEMA.md and map each score to named evidence.",
  },
  {
    name: "Artifact traceability",
    score: 2,
    tier: 2,
    status: "Documented",
    tone: "documented",
    evidence: "Audit, patch proposal, owner decision, patch receipt, QA report, and deploy report paths.",
    missing: "Reusable artifact traceability schema and checker.",
    upgrade: "Create ARTIFACT_TRACEABILITY_SCHEMA.md and a repeatable trace check.",
  },
  {
    name: "Release readiness gates",
    score: 2,
    tier: 2,
    status: "Documented",
    tone: "documented",
    evidence: "Owner deploy authorization, QA acceptance, lint/build validation, and Surface Runner checks.",
    missing: "LLMOps-specific release readiness gate with validation command.",
    upgrade: "Create LLMOPS_RELEASE_READINESS_GATE.md and enforce it before public changes.",
  },
  {
    name: "Runtime telemetry schema",
    score: 2,
    tier: 2,
    status: "Caveated",
    tone: "caveated",
    evidence: "Telemetry schema and design artifacts are documented in the evidence packet.",
    missing: "Schema-valid runtime run and provider-backed usage telemetry.",
    upgrade:
      "Create RUNTIME_TELEMETRY_SCHEMA.md, RUN_TELEMETRY_EXAMPLE.json, validation command, and one valid local run record.",
  },
  {
    name: "Defect taxonomy",
    score: 1,
    tier: 1,
    status: "Conceptual",
    tone: "weak",
    evidence: "Defect categories are discussed in readiness planning but not formalized.",
    missing: "Reusable AI defect taxonomy with examples and score impact.",
    upgrade: "Create AI_DEFECT_TAXONOMY.md and map defects to validation reports.",
  },
  {
    name: "Evaluation set",
    score: 2,
    tier: 2,
    status: "Caveated",
    tone: "caveated",
    evidence: "Thin retrieval evaluation evidence exists, including expected and forbidden retrieval cases.",
    missing: "Reusable LLMOps golden, adversarial, refusal, and grounding eval suite.",
    upgrade: "Create LLM_EVAL_GOLDEN_SET.md with rubric, rerun trigger, and result report.",
  },
  {
    name: "RAG/source governance",
    score: 2,
    tier: 2,
    status: "Caveated",
    tone: "caveated",
    evidence: "RAG/source governance evidence exists for index, permissions, freshness, and forbidden retrieval.",
    missing: "Dedicated LLMOps source registry and stale-source rejection checker.",
    upgrade: "Create RAG_SOURCE_REGISTRY.md with canonical source and stale-source rules.",
  },
  {
    name: "Prompt/model/config registry",
    score: 1,
    tier: 1,
    status: "Conceptual",
    tone: "weak",
    evidence: "Registry need is identified in the calibration backlog.",
    missing: "Complete prompt, model, and config registry.",
    upgrade: "Create PROMPT_MODEL_CONFIG_REGISTRY.md with versioning and owner rules.",
  },
  {
    name: "LLM security controls",
    score: 1,
    tier: 1,
    status: "Conceptual",
    tone: "weak",
    evidence: "Security-control need is identified, but no LLM-specific control map is claimed.",
    missing: "LLM security control map and test set.",
    upgrade: "Create LLM_SECURITY_CONTROL_MAP.md and a security validation test set.",
  },
  {
    name: "Monitoring loop",
    score: 1,
    tier: 1,
    status: "Conceptual",
    tone: "weak",
    evidence: "Monitoring-loop need is identified in the readiness backlog.",
    missing: "Operational LLMOps monitoring loop and feedback cadence.",
    upgrade: "Create LLMOPS_MONITORING_SPEC.md with telemetry source, review cadence, and feedback receipt.",
  },
]

const telemetryCoverage = [
  {
    signal: "Route ledger",
    status: "Present",
    evidence: "Route and deploy receipts exist.",
    meaning: "Process route can be inspected.",
  },
  {
    signal: "Role receipts",
    status: "Present / partial",
    evidence: "Audience, Surface Guild, QA, and Surface Runner receipts are required.",
    meaning: "Review process is visible, but future gates still need receipts.",
  },
  {
    signal: "Surface Guild review",
    status: "Present",
    evidence: "Public-surface review receipt.",
    meaning: "Reader story and claim boundary are reviewed.",
  },
  {
    signal: "QA validation",
    status: "Present",
    evidence: "Lint, build, DoD, and forbidden-claim checks after implementation.",
    meaning: "Local quality gate exists before deploy.",
  },
  {
    signal: "Surface Runner live verification",
    status: "Present after deploy",
    evidence: "Live route and visible-surface verification receipt.",
    meaning: "Live page can be checked after deploy.",
  },
  {
    signal: "Provider name returned",
    status: "Missing / not exposed",
    evidence: "Tool interface does not expose authoritative provider telemetry.",
    meaning: "No provider-backed telemetry claim.",
  },
  {
    signal: "Model returned",
    status: "Missing / not exposed",
    evidence: "Tool interface does not expose returned model telemetry.",
    meaning: "No returned-model usage proof.",
  },
  {
    signal: "Token input/output",
    status: "Missing / not exposed",
    evidence: "Token counts are unavailable.",
    meaning: "No usage-cost proof.",
  },
  {
    signal: "Cost",
    status: "Missing / not exposed",
    evidence: "Cost telemetry is unavailable.",
    meaning: "No cost monitoring claim.",
  },
  {
    signal: "Elapsed time",
    status: "Missing / manual only",
    evidence: "No authoritative runtime timing source.",
    meaning: "No benchmark-valid latency claim.",
  },
  {
    signal: "Live model-spend graph",
    status: "Target only",
    evidence: "Target telemetry pattern, not live provider telemetry.",
    meaning: "Future observability target.",
  },
  {
    signal: "Operational monitoring loop",
    status: "Not present",
    evidence: "No runtime feedback loop is claimed.",
    meaning: "No operational monitoring claim.",
  },
]

const roleFlow = [
  {
    role: "Lyn / Owner",
    action: "Authorized direction and scoped deploy decisions",
    telemetry: "Owner gate receipt",
  },
  {
    role: "Robert",
    action: "Planning, claim boundary, and synthesis",
    telemetry: "Conceptual planning artifacts",
  },
  {
    role: "Codex",
    action: "Local implementation and validation",
    telemetry: "Provider/model/token/cost not exposed",
  },
  {
    role: "Surface Guild",
    action: "Public story and navigation boundary review",
    telemetry: "Surface review receipt",
  },
  {
    role: "QA Sentinel",
    action: "Lint, build, DoD, and claim-boundary validation",
    telemetry: "QA acceptance report",
  },
  {
    role: "Surface Runner",
    action: "Live route and visible-surface verification",
    telemetry: "Live verification receipt",
  },
]

const targetTelemetry = [
  "spend by model",
  "model by role",
  "task by model",
  "provider by model",
  "cost over time",
  "spike detection",
  "missing telemetry warning",
]

const rcaRows = [
  {
    row: "Row 1",
    capability: "Claim boundary control",
    need: "A reusable claim-boundary schema and scan.",
  },
  {
    row: "Row 2",
    capability: "Gate and authority model",
    need: "An LLMOps role authority map and gate receipt.",
  },
  {
    row: "Row 3",
    capability: "Evidence receipts",
    need: "A score-to-evidence receipt schema.",
  },
]

const scoreScale = [
  "0 = Missing: no usable evidence yet",
  "1 = Conceptual: idea exists, but evidence is fragmented",
  "2 = Documented: spec/checklist/design artifact exists",
  "3 = Validated local: used in a local run with validation result",
  "4 = Repeatable repo-backed: reusable checker/schema/workflow exists in repo",
  "5 = Operationalized: ongoing runtime telemetry, monitoring, or feedback loop exists",
]

function badgeVariant(status: string) {
  if (status.includes("RCA")) return "destructive"
  if (status.includes("Caveated")) return "secondary"
  if (status.includes("Documented")) return "default"
  return "outline"
}

function statusClass(tone: string) {
  if (tone === "rca") return "border-destructive/40 bg-destructive/5"
  if (tone === "caveated") return "border-amber-300 bg-amber-50 text-amber-950"
  if (tone === "weak") return "border-muted bg-muted/40"
  return "border-primary/25 bg-primary/5"
}

export default function LlmopsReadinessPage() {
  const tierMax = Math.max(...tierDistribution.map((tier) => tier.count))

  return (
    <PageLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">LLMOps-aligned</Badge>
            <Badge variant="outline">Evidence-capped</Badge>
            <Badge variant="destructive">RCA open</Badge>
            <Badge variant="outline">No full-platform claim</Badge>
          </div>

          <div className="mt-4 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                LLMOps Readiness & Evidence Calibration
              </h1>
              <p className="mt-3 max-w-4xl text-lg leading-8 text-foreground">
                How AI-assisted delivery can be made measurable before claiming maturity.
              </p>
              <p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground sm:text-base">
                This page shows how AIOS separates governance intent from evidence-backed maturity,
                so AI-assisted delivery claims stay tied to receipts, evaluation readiness,
                telemetry design, and release controls.
              </p>
            </div>

            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-base">Current expectation</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                AIOS LLMOps readiness is mostly Tier 1-2: LLMOps-aligned governance and
                evidence discipline with documented controls, but not operational LLMOps
                telemetry, monitoring, security testing, prompt/model registry, or repeatable
                eval loops yet.
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle>What this page claims, and what it does not</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
              <p>
                AIOS is LLMOps-aligned in governance intent and evidence discipline. It is not
                claimed as a full LLMOps platform.
              </p>
              <p>
                It does not yet claim provider-backed runtime telemetry, an operational
                monitoring loop, a complete prompt/model/config registry, production-grade
                automated LLMOps enforcement, full multi-agent/provider execution proof, or RCA
                closure for rows 1, 2, and 3.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-4">Visual Readiness Summary Dashboard</Badge>
          <div className="grid gap-4 md:grid-cols-5">
            {[
              ["Score range", "1-2 / 5", "Mostly conceptual or documented"],
              ["Evidence state", "Documented", "Not locally validated or operationalized"],
              ["RCA open", "3 / 12", "Rows 1-3 stay capped"],
              ["Telemetry", "Partial", "Process receipts present; provider usage missing"],
              ["Public claim", "Capped", "Evidence-backed score only"],
            ].map(([label, value, detail]) => (
              <Card key={label} className="h-full">
                <CardContent className="p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-8">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <Card>
            <CardHeader>
              <Badge variant="secondary" className="w-fit">Evidence tier distribution graph</Badge>
              <CardTitle className="text-xl">Most capabilities stop at Tier 1-2.</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tierDistribution.map((tier) => (
                <div key={tier.tier} className="space-y-1">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium">
                      Tier {tier.tier}: {tier.label}
                    </span>
                    <span className="text-muted-foreground">{tier.count} capabilities</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-muted">
                    <div
                      className={tier.tier === 2 ? "h-full rounded-full bg-primary" : "h-full rounded-full bg-muted-foreground/40"}
                      style={{ width: `${tierMax === 0 ? 0 : (tier.count / tierMax) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs leading-5 text-muted-foreground">{tier.meaning}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Badge variant="secondary" className="w-fit">How to read this score</Badge>
              <CardTitle className="text-xl">The scale measures evidence, not ambition.</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-2">
                {scoreScale.map((item) => (
                  <div key={item} className="rounded-lg border bg-muted/20 p-3 text-sm leading-6">
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm leading-6 text-muted-foreground">
                Tier 2 means documented evidence exists, but the capability is not yet locally
                validated, repeatable, or operationalized.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <Badge variant="secondary">Capability score bar chart</Badge>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                No readiness axis is above 2 / 5 yet.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              Rows 1-3 are strong governance patterns, but stay capped because reusable LLMOps
              schemas, receipts, and validators are still missing.
            </p>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            {capabilities.map((capability) => (
              <Card key={capability.name} className={statusClass(capability.tone)}>
                <CardContent className="p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-foreground">{capability.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Current score: {capability.score} / documented tier {capability.tier}
                      </p>
                    </div>
                    <Badge variant={badgeVariant(capability.status)}>{capability.status}</Badge>
                  </div>

                  <div className="mt-3 grid grid-cols-[1fr_auto] items-center gap-3">
                    <div className="h-3 overflow-hidden rounded-full bg-background/80">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${(capability.score / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold">{capability.score}/5</span>
                  </div>

                  <div className="mt-4 grid gap-2 text-xs leading-5 text-muted-foreground sm:grid-cols-3">
                    <div>
                      <p className="font-semibold text-foreground">Evidence we have</p>
                      <p>{capability.evidence}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Missing for upgrade</p>
                      <p>{capability.missing}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Required to upgrade</p>
                      <p>{capability.upgrade}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-8">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <Card className="border-destructive/30 bg-destructive/5">
            <CardHeader>
              <Badge variant="destructive" className="w-fit">RCA open visual</Badge>
              <CardTitle>Rows 1-3 are capped, not closed.</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
              <p>
                These controls are already part of how AIOS thinks, but they are not yet packaged
                as reusable LLMOps proof. To raise the public score, each one needs a named schema,
                checklist, receipt, or validator that can be used again on future LLMOps reviews.
              </p>
              <div className="space-y-3">
                {rcaRows.map((row) => (
                  <div key={row.capability} className="rounded-lg border bg-background p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium text-foreground">{row.row}: {row.capability}</p>
                      <Badge variant="destructive">RCA open</Badge>
                    </div>
                    <p className="mt-2 text-muted-foreground">{row.need}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Badge variant="secondary" className="w-fit">Telemetry coverage matrix</Badge>
              <CardTitle>Process transparency exists; provider-backed telemetry does not.</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="border-b bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="px-3 py-2 font-medium">Signal</th>
                      <th className="px-3 py-2 font-medium">Status</th>
                      <th className="px-3 py-2 font-medium">Evidence</th>
                      <th className="px-3 py-2 font-medium">Public meaning</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {telemetryCoverage.map((item) => (
                      <tr key={item.signal} className="align-top">
                        <td className="px-3 py-2 font-medium text-foreground">{item.signal}</td>
                        <td className="px-3 py-2">
                          <Badge
                            variant={
                              item.status.includes("Missing") || item.status.includes("Not present")
                                ? "destructive"
                                : item.status.includes("Target") || item.status.includes("partial")
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {item.status}
                          </Badge>
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">{item.evidence}</td>
                        <td className="px-3 py-2 text-muted-foreground">{item.meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30 py-8">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Card>
            <CardHeader>
              <Badge variant="secondary" className="w-fit">Model / role execution flow</Badge>
              <CardTitle>Role execution is visible; model usage is still a telemetry gap.</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {roleFlow.map((step, index) => (
                <div key={step.role} className="grid grid-cols-[auto_1fr] gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {index + 1}
                    </div>
                    {index < roleFlow.length - 1 ? <div className="h-full min-h-6 w-px bg-border" /> : null}
                  </div>
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-medium text-foreground">{step.role}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{step.action}</p>
                    <p className="mt-2 text-xs font-medium text-muted-foreground">{step.telemetry}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Badge variant="secondary" className="w-fit">Target spend-by-model telemetry pattern</Badge>
              <CardTitle>This is a target telemetry pattern, not live provider-backed telemetry.</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {targetTelemetry.map((signal, index) => (
                  <div key={signal} className="rounded-lg border bg-background p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-foreground">{signal}</p>
                      <Badge variant={index === targetTelemetry.length - 1 ? "destructive" : "secondary"}>
                        target
                      </Badge>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-muted-foreground/50"
                        style={{ width: `${35 + index * 8}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm leading-6 text-amber-950">
                Current AIOS does not yet ingest provider-backed spend telemetry into this page.
                This target view shows what future model-cost observability should include.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-b border-border bg-background py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5">
            <Badge variant="secondary">Gap-to-backlog runway</Badge>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              What would move the score above 2?
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              "CLAIM_BOUNDARY_SCHEMA.md",
              "LLMOPS_ROLE_AUTHORITY_MAP.md",
              "EVIDENCE_RECEIPT_SCHEMA.md",
              "ARTIFACT_TRACEABILITY_SCHEMA.md",
              "LLMOPS_RELEASE_READINESS_GATE.md",
              "RUNTIME_TELEMETRY_SCHEMA.md",
              "AI_DEFECT_TAXONOMY.md",
              "LLM_EVAL_GOLDEN_SET.md",
              "RAG_SOURCE_REGISTRY.md",
              "PROMPT_MODEL_CONFIG_REGISTRY.md",
              "LLM_SECURITY_CONTROL_MAP.md",
              "LLMOPS_MONITORING_SPEC.md",
            ].map((item) => (
              <div key={item} className="rounded-lg border bg-muted/20 p-3 font-mono text-xs text-foreground">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-8">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Interview takeaway</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm leading-6 text-muted-foreground sm:grid-cols-2">
              {[
                "LLMOps is governance, evaluation, telemetry, release readiness, and monitoring - not just prompts.",
                "Conceptual maturity is separated from reproducible evidence.",
                "Public claims are capped until telemetry, evals, and monitoring loops exist.",
                "AI governance can be translated into delivery controls and portfolio artifacts.",
              ].map((item) => (
                <div key={item} className="rounded-lg border bg-background p-3">{item}</div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technical calibration note</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
              <p>
                Robert conceptual maturity may be useful internally, but public scoring uses the
                calibrated evidence-backed score and claim boundary cap.
              </p>
              <p>
                The current visual cockpit is public-safe, evidence-capped, and intentionally
                shows missing provider telemetry instead of hiding it.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  )
}
