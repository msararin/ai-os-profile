import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const verdicts = [
  {
    label: "Evidence-backed readiness",
    value: "Capped at documented evidence",
    detail:
      "Public scoring follows the available artifact evidence, not ambition or conceptual maturity.",
  },
  {
    label: "RCA still open",
    value: "Rows 1-3",
    detail:
      "Claim boundary, role authority, and evidence receipts need LLMOps-scoped reusable proof before score upgrade.",
  },
  {
    label: "Operational proof missing",
    value: "Telemetry, evals, monitoring",
    detail:
      "The page shows telemetry design and retrieval-eval evidence, while blocking runtime-monitoring claims.",
  },
]

const capabilities = [
  {
    name: "Claim boundary control",
    score: 2,
    tier: 2,
    status: "RCA open",
    next: "CLAIM_BOUNDARY_SCHEMA.md",
    caveat:
      "Strong governance pattern, but still needs LLMOps-scoped reusable schema and validation.",
  },
  {
    name: "Gate and authority model",
    score: 2,
    tier: 2,
    status: "RCA open",
    next: "LLMOPS_ROLE_AUTHORITY_MAP.md",
    caveat:
      "Role authority is documented generally, but needs LLMOps-specific gate fields and receipts.",
  },
  {
    name: "Evidence receipts",
    score: 2,
    tier: 2,
    status: "RCA open",
    next: "EVIDENCE_RECEIPT_SCHEMA.md",
    caveat:
      "Receipt discipline exists, but needs LLMOps score-to-evidence schema and validation output.",
  },
  {
    name: "Artifact traceability",
    score: 2,
    tier: 2,
    status: "Documented",
    next: "ARTIFACT_TRACEABILITY_SCHEMA.md",
    caveat: "Traceability is documented, but not normalized as a reusable LLMOps schema.",
  },
  {
    name: "Release readiness gates",
    score: 2,
    tier: 2,
    status: "Documented",
    next: "LLMOPS_RELEASE_READINESS_GATE.md",
    caveat: "Release gate evidence exists generally, but needs an LLMOps-specific readiness gate.",
  },
  {
    name: "Runtime telemetry schema",
    score: 2,
    tier: 2,
    status: "Caveated",
    next: "RUNTIME_TELEMETRY_SCHEMA.md",
    caveat:
      "Documented telemetry schemas exist, but this is not provider-backed runtime telemetry or operational monitoring.",
  },
  {
    name: "Defect taxonomy",
    score: 1,
    tier: 1,
    status: "Conceptual",
    next: "AI_DEFECT_TAXONOMY.md",
    caveat: "No reusable LLMOps defect taxonomy is in place yet.",
  },
  {
    name: "Evaluation set",
    score: 2,
    tier: 2,
    status: "Caveated",
    next: "LLM_EVAL_GOLDEN_SET.md",
    caveat:
      "Thin retrieval evaluation evidence exists, but this is not yet a full LLMOps golden/adversarial evaluation suite.",
  },
  {
    name: "RAG/source governance",
    score: 2,
    tier: 2,
    status: "Caveated",
    next: "RAG_SOURCE_REGISTRY.md",
    caveat:
      "RAG/source governance evidence exists, but this is not yet a dedicated LLMOps source registry or stale-source checker.",
  },
  {
    name: "Prompt/model/config registry",
    score: 1,
    tier: 1,
    status: "Conceptual",
    next: "PROMPT_MODEL_CONFIG_REGISTRY.md",
    caveat: "A complete prompt, model, and config registry is not in place yet.",
  },
  {
    name: "LLM security controls",
    score: 1,
    tier: 1,
    status: "Conceptual",
    next: "LLM_SECURITY_CONTROL_MAP.md",
    caveat: "No LLM security control map or test set is claimed here.",
  },
  {
    name: "Monitoring loop",
    score: 1,
    tier: 1,
    status: "Conceptual",
    next: "LLMOPS_MONITORING_SPEC.md",
    caveat: "No operational LLMOps monitoring loop is claimed.",
  },
]

const ladder = [
  { tier: 0, label: "Missing", detail: "No evidence found." },
  { tier: 1, label: "Conceptual", detail: "Discussed or described, but not reusable proof." },
  { tier: 2, label: "Documented", detail: "Spec, checklist, or documented artifact exists." },
  { tier: 3, label: "Validated local", detail: "A local validation or result artifact exists." },
  { tier: 4, label: "Repeatable repo-backed", detail: "A checker, schema, or repeatable repo artifact exists." },
  { tier: 5, label: "Operationalized", detail: "Runtime or monitoring feedback loop exists." },
]

const backlog = [
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
]

const takeaways = [
  "LLMOps is governance, evaluation, telemetry, release readiness, and monitoring - not just prompts.",
  "Conceptual maturity is separated from reproducible evidence.",
  "Public claims are capped until telemetry, evals, and monitoring loops exist.",
  "AI governance can be translated into delivery controls and portfolio artifacts.",
]

const rcaRows = [
  "Claim boundary control",
  "Gate and authority model",
  "Evidence receipts",
]

export default function LlmopsReadinessPage() {
  return (
    <PageLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">LLMOps-aligned</Badge>
            <Badge variant="outline">Evidence-capped</Badge>
            <Badge variant="outline">RCA open</Badge>
            <Badge variant="outline">No full-platform claim</Badge>
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            LLMOps Readiness & Evidence Calibration
          </h1>
          <p className="mt-3 max-w-4xl text-lg leading-8 text-foreground">
            How AI-assisted delivery can be made measurable before claiming maturity.
          </p>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground sm:text-base">
            This page shows how AIOS separates governance intent from evidence-backed maturity,
            so AI-assisted delivery claims remain tied to receipts, evaluation readiness,
            telemetry design, and release controls.
          </p>

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
                automated LLMOps enforcement, or full multi-agent/provider execution proof.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30 py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {verdicts.map((item) => (
              <Card key={item.label}>
                <CardHeader>
                  <CardTitle className="text-base">{item.label}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p className="text-xl font-semibold text-foreground">{item.value}</p>
                  <p className="leading-6">{item.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <Badge variant="secondary">Evidence ladder</Badge>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                The public score is capped by evidence tier, not ambition.
              </h2>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {ladder.map((step) => (
              <Card key={step.tier} className={step.tier === 2 ? "border-primary/30 bg-primary/5" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-muted-foreground">Tier {step.tier}</p>
                    <Badge variant={step.tier === 2 ? "default" : "outline"}>{step.label}</Badge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5">
            <Badge variant="secondary">Capability cards</Badge>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              Evidence-backed LLMOps readiness axes
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              These are calibrated public scores only. Robert conceptual maturity is not shown as
              the public score.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability) => (
              <Card key={capability.name} className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-base leading-6">{capability.name}</CardTitle>
                    <Badge variant={capability.status === "RCA open" ? "destructive" : "secondary"}>
                      {capability.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg border bg-muted/30 p-3">
                      <p className="text-xs uppercase text-muted-foreground">Public score</p>
                      <p className="mt-1 text-2xl font-semibold text-foreground">{capability.score}</p>
                    </div>
                    <div className="rounded-lg border bg-muted/30 p-3">
                      <p className="text-xs uppercase text-muted-foreground">Evidence tier</p>
                      <p className="mt-1 text-2xl font-semibold text-foreground">{capability.tier}</p>
                    </div>
                  </div>
                  <p className="leading-6">{capability.caveat}</p>
                  <div className="rounded-md border border-dashed p-3">
                    <p className="text-xs font-medium uppercase text-muted-foreground">
                      Next upgrade artifact
                    </p>
                    <p className="mt-1 font-mono text-xs text-foreground">{capability.next}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-10">
        <div className="mx-auto grid max-w-5xl gap-4 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Robert/Codex calibration concept</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
              <p>
                Robert conceptual maturity can be useful internally because it recognizes repeated
                cross-AIOS governance patterns.
              </p>
              <p>
                Codex artifact-evidence maturity is stricter: it asks whether LLMOps-readiness
                controls are documented, validated, repeatable, and operationalized.
              </p>
              <p className="font-medium text-foreground">
                The final public score stays below the evidence tier cap and claim boundary.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle>Open calibration questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
              <p>
                These governance patterns are strong, but still require LLMOps-scoped reusable
                schemas, receipts, and validation before public score upgrade.
              </p>
              <div className="grid gap-2">
                {rcaRows.map((row) => (
                  <div key={row} className="rounded-md border bg-background p-3">
                    <p className="font-medium text-foreground">{row}</p>
                    <p className="mt-1 text-xs uppercase text-muted-foreground">RCA open</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t border-border bg-background py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5">
            <Badge variant="secondary">Gap-to-backlog runway</Badge>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              What would upgrade this from documented readiness to stronger proof
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {backlog.map((artifact) => (
              <div key={artifact} className="rounded-lg border bg-muted/30 p-3">
                <p className="font-mono text-xs text-foreground">{artifact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-10">
        <div className="mx-auto grid max-w-5xl gap-4 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Interview takeaway</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                The useful signal is not a high score. It is disciplined calibration: claims stay
                below the evidence.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>What this demonstrates</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {takeaways.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t border-border bg-background py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <details className="rounded-lg border bg-muted/30 p-4">
            <summary className="cursor-pointer text-sm font-semibold text-foreground">
              Technical calibration note
            </summary>
            <div className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
              <p>
                Final cockpit scoring should remain the lower of Robert conceptual maturity,
                Codex artifact-evidence cap, and claim-boundary allowed score.
              </p>
              <p>
                Rows 6, 8, and 9 are accepted at score 2 with caveats. Rows 1, 2, and 3 remain
                open for divergence RCA. Rows 7 and 10-12 remain at score 1 until reusable LLMOps
                artifacts exist.
              </p>
              <p>
                This page is a public-safe explanation of calibration discipline. It is not a
                live verification result, deployment claim, or provider-backed telemetry receipt.
              </p>
            </div>
          </details>
        </div>
      </section>
    </PageLayout>
  )
}
