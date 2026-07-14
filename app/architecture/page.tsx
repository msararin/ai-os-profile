import Link from "next/link"
import { PageLayout } from "@/components/page-layout"

const architectureGroups = [
  {
    index: "01",
    title: "Executive & Intent",
    summary: "Human direction and executive synthesis define what matters before work is routed.",
    layers: [
      {
        title: "Human Decision",
        detail: "Owns intent, priorities, business decisions, and approval gates.",
        labels: ["Intent", "Priorities", "Human gate"],
      },
      {
        title: "Executive Orchestration",
        detail: "Synthesizes context, frames tradeoffs, and protects source-of-truth boundaries.",
        labels: ["Context synthesis", "Tradeoffs", "Decision framing"],
      },
    ],
  },
  {
    index: "02",
    title: "Routing & Governance",
    summary: "Work is coordinated and bounded before implementation begins.",
    layers: [
      {
        title: "Stage Management",
        detail: "Coordinates handoffs, progress, scope discipline, and blockers.",
        labels: ["Handoffs", "Scope", "Blockers"],
      },
      {
        title: "Agentic Release Governance Control",
        detail: "Applies manual release discipline, risk framing, checkpoint cadence, and stop conditions before work proceeds.",
        labels: ["Risk review", "Manual preflight", "Stop conditions"],
      },
      {
        title: "Public Surface Governance",
        detail:
          "Coordinates public-page story coherence, term impact, claim boundaries, implementation support, QA verification, and Lyn approval before public-surface updates are treated as ready.",
        labels: ["Surface Story Guild", "Prime Gate", "Runner support", "Owner approval"],
        href: "/architecture/public-surface-governance",
      },
    ],
  },
  {
    index: "03",
    title: "Execution & Validation",
    summary: "Bounded implementation produces review-ready evidence for a human-controlled release flow.",
    layers: [
      {
        title: "Scoped Implementation + Validation",
        detail: "Codex prepares scoped edits and validation evidence. CI/CD, GitHub, and Vercel provide support surfaces.",
        labels: ["Scoped edits", "Validation outputs", "Review evidence"],
      },
    ],
  },
  {
    index: "04",
    title: "Evidence, State & Business Runway",
    summary: "Evidence, durable state, and capability direction remain distinct parts of the operating model.",
    layers: [
      {
        title: "Evidence, Audit & Observability",
        detail: "Captures validation outputs, review traces, execution signals, cost/usage evidence, reliability signals, and deployment readiness checks.",
        labels: ["Evidence", "Review trace", "Reliability signals"],
        href: "/architecture/system-health",
      },
      {
        title: "Source-of-Truth",
        detail: "GPT KB + Git remain the durable truth record. Public pages are presentation and review surfaces only.",
        labels: ["Reviewed records", "Decision history", "Truth boundary"],
      },
      {
        title: "Repository Integrity & Source Custody",
        detail: "Repo Custodian preserves repository and source evidence before downstream delivery claims are evaluated.",
        labels: ["Repository evidence", "Source custody", "Proof boundary"],
        href: "/org-roles/repo-custodian",
      },
      {
        title: "Durable Workflow Continuity",
        detail:
          "Optimize-Worker evolved from session-bound execution into a recoverable workflow runtime. Mechanical continuity is proven; human operational value remains unresolved.",
        labels: [
          "Canonical implementation",
          "Mechanical stress passed",
          "Human value unresolved",
          "LangGraph parked",
        ],
        href: "/architecture/optimize-worker/durable-continuity",
      },
      {
        title: "Business Runway / Capability",
        detail: "Frames portfolio proof, adoption governance, POC support, and risk learning as capability direction, not proven revenue.",
        labels: ["Portfolio proof", "POC support", "Runway direction"],
      },
    ],
  },
]

const guardrails = [
  "Human approval remains the release boundary.",
  "Release governance is manual discipline and design, not full automation.",
  "Codex, CI/CD, GitHub, and Vercel support decisions; they do not approve releases.",
  "Observability is an evidence-governance layer, not a full production metrics platform.",
]

export default function ArchitecturePage() {
  return (
    <PageLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <Link
            href="/ai-operating-system#case-study-map"
            className="mb-5 inline-flex text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            ← Back to AIOS Case Study Map
          </Link>
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            AIOS architecture
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Executive Architecture Map
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            A compact public view of how intent becomes bounded work, review-ready evidence,
            durable state, and practical business learning under human-controlled gates.
          </p>
          <p className="mt-4 max-w-3xl text-sm text-muted-foreground">
            This is a public-safe architecture explanation for a personal AI Operating System,
            not a claim of enterprise-scale automation.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Four-Group Operating Model
            </h2>
            <p className="mt-2 max-w-3xl text-muted-foreground">
              Eight expanded layers sit inside four executive groups. Evidence returns to a human
              gate before work is treated as release-ready or durable truth.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {architectureGroups.map((group) => (
              <section
                key={group.title}
                className="flex flex-col rounded-xl border border-border bg-card p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {group.index}
                  </span>
                  <h3 className="font-semibold text-foreground">{group.title}</h3>
                </div>
                <p className="mt-3 text-xs leading-5 text-muted-foreground">{group.summary}</p>

                <div className="mt-4 grid gap-3">
                  {group.layers.map((layer) => (
                    <div
                      key={layer.title}
                      className="rounded-lg border border-border bg-background p-3"
                    >
                      <h4 className="text-sm font-semibold text-foreground">{layer.title}</h4>
                      <p className="mt-2 text-xs leading-5 text-muted-foreground">{layer.detail}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {layer.labels.map((label) => (
                          <span
                            key={label}
                            className="rounded-md bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground"
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                      {"href" in layer && layer.href ? (
                        <Link
                          href={layer.href}
                          className="mt-3 inline-flex text-xs font-medium text-primary hover:underline"
                        >
                          {layer.href === "/architecture/system-health"
                            ? "View system health surfaces →"
                            : layer.href === "/architecture/public-surface-governance"
                              ? "View public surface governance →"
                              : "View surface →"}
                        </Link>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-6 rounded-lg border-2 border-dashed border-amber-500/60 bg-amber-500/5 p-4 text-center">
            <p className="text-sm font-semibold text-amber-700">Human Review Gate</p>
            <p className="mt-1 text-xs text-muted-foreground">
              A decision boundary, not another system layer. Evidence supports review; it does not
              approve execution.
            </p>
          </div>

          <div className="mt-4 rounded-lg border border-border bg-card p-4">
            <p className="text-sm font-semibold text-foreground">
              Public Surface Governance Boundary
            </p>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Public Surface Runner Team means implementation and validation support only. Lyn owns
              final positioning and publish approval. This is not a claim of automated release
              governance, and no production-readiness certification claim is made.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="rounded-lg border border-border bg-background p-5">
            <h2 className="text-lg font-semibold text-foreground">Release Boundary</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Agentic Release Governance Control describes current manual discipline and design.
              Scoped implementation and validation surfaces prepare evidence for human decision;
              they do not hold autonomous release authority.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-background p-5">
            <h2 className="text-lg font-semibold text-foreground">Phase 1 Observability Boundary</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Phase 1: telemetry production and store behavior remain implemented in optimize-worker
              while AIOS owns the governance meaning of the evidence.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-background p-5">
            <h2 className="text-lg font-semibold text-foreground">Public Surface Governance</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              A governance/design surface for how public pages handle story, term impact,
              claim safety, implementation support, and owner approval.
            </p>
            <Link
              href="/architecture/public-surface-governance"
              className="mt-3 inline-flex text-sm font-medium text-primary hover:underline"
            >
              How we update public surfaces →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold text-foreground">Guardrails</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {guardrails.map((guardrail) => (
              <p
                key={guardrail}
                className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground"
              >
                {guardrail}
              </p>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
