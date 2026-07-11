import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

type DetailSection = {
  title: string
  body?: string
  items?: string[]
}

type EvidenceGroup = {
  title: string
  items: string[]
}

type RoleDetail = {
  title: string
  type: string
  purpose: string
  chips: string[]
  boundary: string
  href: string
  hero: string
  atAGlance: Array<[string, string]>
  why: string
  upskilled: {
    before: string[]
    after: string[]
  }
  skillPack: DetailSection[]
  principles: string[]
  references: DetailSection[]
  workflow: string
  inputs: string[]
  outputs: string[]
  escalations: DetailSection[]
  evidence: EvidenceGroup[]
  upskillPath: Array<[string, string, string]>
}

type CapabilityCardDetail = Pick<
  RoleDetail,
  "title" | "type" | "purpose" | "chips" | "boundary" | "href"
>

export const repoCustodianCardDetail: CapabilityCardDetail = {
  title: "Repo Custodian",
  type: "Repository integrity capability",
  purpose:
    "Protects source custody, exact-SHA work, recoverability, and repository evidence without turning local proof into production claims.",
  chips: ["Source custody", "Worktree isolation", "Recovery readiness"],
  boundary: "Production evidence: NOT_PROVEN",
  href: "/org-roles/repo-custodian",
}

export const dataTeamDetail: RoleDetail = {
  title: "Data Team",
  type: "Telemetry capability layer",
  purpose: "Turns dashboard-shaped telemetry into evidence-first validation and claim-safe insight.",
  chips: ["Telemetry semantics", "Data quality", "Insight readiness"],
  boundary: "No production telemetry proof by default",
  href: "/org-roles/data-team",
  hero:
    "From dashboard-first reporting to evidence-first telemetry validation. Data Team explains whether telemetry, field counts, classification rules, and claim boundaries are strong enough for public-safe insight.",
  atAGlance: [
    ["Role type", "Capability and validation-readiness layer"],
    ["Primary shift", "Dashboard-first reporting to evidence-first telemetry validation"],
    ["Core output", "Validation-readiness notes and claim-safe insight inputs"],
    ["Boundary", "No production telemetry verification by default"],
  ],
  why:
    "Dashboards and reports can look convincing before the underlying data source, field counts, classification rules, and claim boundaries are strong enough. Data Team exists to move from dashboard-first reporting to evidence-first telemetry validation.",
  upskilled: {
    before: [
      "first-pass profiling",
      "dashboard-shaped export review",
      "category counts without enough field-level proof",
    ],
    after: [
      "telemetry semantics discipline",
      "field-level data quality validation",
      "reproducible classification rules",
      "sample-row proof planning",
      "observed / inferred / not-claimable separation",
      "visualization readiness gates before graph implementation",
    ],
  },
  skillPack: [
    {
      title: "data-team-core-telemetry-semantics",
      body: "Telemetry meaning, naming discipline, signal and field semantics, and claim-safe interpretation.",
    },
    {
      title: "data-team-quality-validation",
      body: "Field-level checks, count reconciliation, reproducible classification rules, and validation-readiness evidence.",
    },
    {
      title: "data-team-profiling-monitoring",
      body: "Profiling, drift and quality awareness, monitoring-readiness, and owner-readable insight preparation.",
    },
  ],
  principles: [
    "Data source before dashboard",
    "Field counts before category claims",
    "Classification rules before visualization",
    "Observed / inferred / not-claimable separation before insight",
    "Sample-row proof before strong conclusion",
    "Visualization readiness before graph implementation",
    "Claim boundary before public-facing interpretation",
  ],
  references: [
    {
      title: "OpenTelemetry Semantic Conventions",
      body: "Used as an adapted reference foundation for telemetry signal meaning, naming discipline, attributes, resources, logs, metrics, traces, and events.",
    },
    {
      title: "Great Expectations / GX-style validation",
      body: "Used as an adapted reference model for expectation-style checks, validation results, and documenting data quality.",
    },
    {
      title: "Soda-style checks",
      body: "Used as an adapted reference model for pipeline-friendly checks, data contracts, source validation discipline, and scan-style quality gates.",
    },
    {
      title: "Evidently-style profiling and monitoring",
      body: "Used as an adapted learning foundation for profiling reports, feature and statistic tracking, monitoring-readiness, and owner-readable visualization insight.",
    },
  ],
  workflow:
    "Field inventory - field-level counts - classification rules - category recount - observed / inferred / not-claimable split - sample-row proof - visualization readiness - insight report.",
  inputs: [
    "telemetry exports",
    "field inventory",
    "field-level counts",
    "classification rules",
    "sample-row proof plan",
    "visualization readiness criteria",
  ],
  outputs: [
    "validation-readiness notes",
    "quality findings",
    "classification boundary notes",
    "insight report inputs",
    "visualization readiness decision",
  ],
  escalations: [
    {
      title: "Gate / Owner",
      body: "claim boundary or public interpretation requires approval",
    },
    {
      title: "Checker",
      body: "validation evidence needs deterministic review",
    },
    {
      title: "Surface / UI role",
      body: "visualization readability or page treatment needs review",
    },
    {
      title: "Engineering / Data implementation role",
      body: "source validation or pipeline work is needed",
    },
  ],
  evidence: [
    {
      title: "Available Evidence",
      items: [
        "Data Team role/capability detail exists on /org-roles/data-team.",
        "Capability learning narrative is documented.",
        "External references are mapped to how they are applied.",
      ],
    },
    {
      title: "Missing Evidence",
      items: [
        "Production telemetry verification is not claimed.",
        "Provider-backed telemetry verification is not claimed.",
        "Full row-level completeness is not claimed.",
        "Live monitoring is not claimed.",
        "Production graph readiness is not claimed.",
      ],
    },
    {
      title: "Claims Not Made",
      items: [
        "No production telemetry verification.",
        "No provider-backed telemetry verification.",
        "No full row-level completeness.",
        "No live monitoring.",
        "No production graph readiness.",
        "No framework certification claim.",
      ],
    },
  ],
  upskillPath: [
    ["1", "Field Inventory Operator", "can identify fields and meaning boundaries"],
    ["2", "Data Quality Validator", "can define field-level checks and reconcile counts"],
    ["3", "Telemetry Semantics Reviewer", "can separate observed / inferred / not-claimable and protect claim boundaries"],
    ["4", "Visualization Readiness Lead", "can decide when data is ready for graph or insight presentation"],
  ],
}

export const runnerDetail: RoleDetail = {
  title: "Runner / Super Runner",
  type: "Execution acceleration layer",
  purpose: "Executes scoped work inside approved boundaries while preserving handoff, evidence, and escalation discipline.",
  chips: ["Scoped execution", "Evidence capture", "Escalation routing"],
  boundary: "Not Gate or approval authority",
  href: "/org-roles/runner-execution-layer",
  hero:
    "Runner / Super Runner executes scoped work inside approved boundaries. It coordinates handoff, evidence capture, and escalation. It does not approve, verify itself, or expand scope.",
  atAGlance: [
    ["Role type", "Execution and coordination skill"],
    ["Primary shift", "Ad hoc task execution to bounded evidence-aware execution"],
    ["Core output", "Changed artifact or handoff packet with receipts"],
    ["Boundary", "Not Gate, final reviewer, approval authority, or self-verifier"],
  ],
  why:
    "AI-assisted execution can become fast but unsafe if scope, handoff, evidence, and claim boundaries are not explicit. Runner exists to make execution faster while preserving accountability, traceability, and escalation discipline.",
  upskilled: {
    before: [
      "ad hoc task execution",
      "unclear handoff boundaries",
      "speed without consistent receipt structure",
      "worker routing handled manually case-by-case",
    ],
    after: [
      "scoped execution discipline",
      "evidence-before-claim behavior",
      "reproducible handoff packet creation",
      "stop-state detection",
      "escalation routing",
      "same-page role-detail explanation pattern",
      "readable evidence and non-claim presentation",
    ],
  },
  skillPack: [
    {
      title: "runner-scoped-execution",
      body: "Executes only the approved slice and avoids scope expansion.",
    },
    {
      title: "runner-handoff-and-evidence-capture",
      body: "Creates artifacts, receipts, validation notes, and missing-evidence disclosure.",
    },
    {
      title: "super-runner-coordination-skill",
      body: "Coordinates multi-step execution inside boundaries without becoming authority.",
    },
  ],
  principles: [
    "Scope before speed",
    "Evidence before claim",
    "Runner is not Gate",
    "Small bounded slice first",
    "Reproducible handoff",
    "Stop when state is unclear",
    "Use the right worker for the work",
    "Speed must not erase accountability",
  ],
  references: [
    {
      title: "DORA / delivery performance",
      body: "Used as a learning foundation for speed with stability, recovery, and delivery discipline.",
    },
    {
      title: "Google SRE",
      body: "Used as a learning foundation for stop-state, reliability, incident/recovery thinking, and operational discipline.",
    },
    {
      title: "OpenTelemetry-style thinking",
      body: "Used as an adapted reference model for trace, log, evidence, correlation, and receipt mindset.",
    },
    {
      title: "Diataxis",
      body: "Used as a learning foundation for handoff-readable documentation: how-to, reference, explanation, and tutorial-style guidance.",
    },
    {
      title: "OWASP / NIST-style risk awareness",
      body: "Used as an adapted learning foundation for boundary, security, data exposure, and claim-risk awareness.",
    },
  ],
  workflow:
    "Source-of-truth lock - scope boundary - task packet - worker routing - execution - validation evidence - missing-evidence disclosure - escalation or gate handoff - receipt.",
  inputs: [
    "owner intent",
    "source of truth",
    "allowed scope",
    "forbidden additions",
    "worker/task packet",
    "expected artifact",
    "validation requirement",
  ],
  outputs: [
    "changed artifact or handoff packet",
    "receipt",
    "route ledger",
    "telemetry/validation note",
    "missing evidence list",
    "non-claims preserved",
    "next safe action",
  ],
  escalations: [
    {
      title: "Gate / Owner",
      body: "approval, claim, release, or risk decisions are required",
    },
    {
      title: "Checker / QA",
      body: "deterministic validation and evidence review are required",
    },
    {
      title: "Big Crew",
      body: "architecture, implementation split, maintainability, handover, scalability, or cross-functional requirements appear",
    },
    {
      title: "Surface Runner / Surface Guild",
      body: "rendered proof, public-surface readability, or UI evidence is required",
    },
  ],
  evidence: [
    {
      title: "Available Evidence",
      items: [
        "Runner / Super Runner local dedicated detail route exists.",
        "Provider-backed review exists only for the review/spec layer if applicable.",
        "Local validation receipts exist for the bounded implementation layer.",
      ],
    },
    {
      title: "Missing Evidence",
      items: [
        "No final A+ grade unless separately evidenced.",
        "No rendered proof unless accepted visual proof exists.",
        "No live verification unless deployed and verified.",
        "No production readiness claim.",
      ],
    },
    {
      title: "Claims Not Made",
      items: [
        "Runner is not Gate.",
        "Runner is not final reviewer.",
        "Runner is not approval authority.",
        "Runner does not verify itself.",
        "No A+ claim by default.",
        "No live verification claim.",
        "No production readiness or framework certification claim.",
      ],
    },
  ],
  upskillPath: [
    ["1", "Scoped Runner", "can execute one bounded task without scope expansion"],
    ["2", "Evidence Runner", "can produce receipt, validation summary, and missing-evidence list"],
    ["3", "Super Runner Coordination Skill", "can coordinate multi-step execution while preserving authority boundary"],
    ["4", "Execution System Designer", "can turn Runner pattern into reusable role-detail template and handoff discipline"],
  ],
}

export function CapabilityRoleCard({ detail }: { detail: CapabilityCardDetail }) {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-background">
            {detail.type}
          </Badge>
          <Badge variant="outline">{detail.boundary}</Badge>
        </div>
        <CardTitle className="text-base">{detail.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
        <p>{detail.purpose}</p>
        <div className="flex flex-wrap gap-2">
          {detail.chips.map((chip) => (
            <Badge key={chip} variant="secondary" className="bg-background">
              {chip}
            </Badge>
          ))}
        </div>
        <Link
          href={detail.href}
          className="inline-flex text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          View capability detail
        </Link>
      </CardContent>
    </Card>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function DisclosureCard({ section }: { section: DetailSection }) {
  return (
    <details className="rounded-lg border border-border bg-card p-4">
      <summary className="cursor-pointer text-sm font-semibold text-foreground">
        {section.title}
      </summary>
      {section.body ? (
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{section.body}</p>
      ) : null}
      {section.items ? (
        <div className="mt-3">
          <BulletList items={section.items} />
        </div>
      ) : null}
    </details>
  )
}

export function RoleDetailPage({ detail }: { detail: RoleDetail }) {
  return (
    <PageLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <Link
            href="/org-roles"
            className="mb-5 inline-flex text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Back to org roles
          </Link>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Capability detail
            </Badge>
            <Badge variant="outline">{detail.type}</Badge>
          </div>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {detail.title}
          </h1>
          <p className="mt-4 max-w-3xl text-pretty text-lg leading-8 text-muted-foreground">
            {detail.hero}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-8">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-sm">Page sections</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2 text-sm">
                {[
                  ["At a glance", "#at-a-glance"],
                  ["Role logic", "#role-logic"],
                  ["References", "#references"],
                  ["Evidence", "#evidence"],
                  ["Upskill path", "#upskill-path"],
                ].map(([label, href]) => (
                  <a key={href} href={href} className="text-muted-foreground hover:text-primary">
                    {label}
                  </a>
                ))}
              </CardContent>
            </Card>
          </aside>

          <div className="space-y-8">
            <section id="at-a-glance" className="scroll-mt-24">
              <div className="grid gap-3 sm:grid-cols-2">
                {detail.atAGlance.map(([label, value]) => (
                  <div key={label} className="rounded-lg border border-border bg-card p-4">
                    <p className="text-xs font-medium uppercase text-muted-foreground">{label}</p>
                    <p className="mt-2 text-sm font-medium leading-6 text-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="role-logic" className="scroll-mt-24 space-y-6">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-xl">Why this role exists</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{detail.why}</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xl">What was upskilled</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="mb-3 text-sm font-semibold text-foreground">Before</p>
                    <BulletList items={detail.upskilled.before} />
                  </div>
                  <div>
                    <p className="mb-3 text-sm font-semibold text-foreground">After</p>
                    <BulletList items={detail.upskilled.after} />
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-xl">Permanent skill pack</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {detail.skillPack.map((section) => (
                      <DisclosureCard key={section.title} section={section} />
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-xl">Operating principles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {detail.principles.map((principle) => (
                        <Badge key={principle} variant="secondary" className="bg-background">
                          {principle}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="references" className="scroll-mt-24 space-y-6">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-xl">External references and how they are used</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 md:grid-cols-2">
                  {detail.references.map((section) => (
                    <DisclosureCard key={section.title} section={section} />
                  ))}
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-xl">How this role applies the skill</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-muted-foreground">{detail.workflow}</p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-xl">Inputs / Outputs</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <p className="mb-3 text-sm font-semibold text-foreground">Inputs</p>
                      <BulletList items={detail.inputs} />
                    </div>
                    <div>
                      <p className="mb-3 text-sm font-semibold text-foreground">Outputs</p>
                      <BulletList items={detail.outputs} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-xl">Escalates to</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 md:grid-cols-2">
                  {detail.escalations.map((section) => (
                    <div key={section.title} className="rounded-lg border border-border bg-background p-4">
                      <p className="text-sm font-semibold text-foreground">{section.title}</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{section.body}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            <section id="evidence" className="scroll-mt-24">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-xl">Evidence</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 lg:grid-cols-3">
                  {detail.evidence.map((group) => (
                    <div key={group.title} className="rounded-lg border border-border bg-background p-4">
                      <p className="text-sm font-semibold text-foreground">{group.title}</p>
                      <div className="mt-3">
                        <BulletList items={group.items} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            <section id="upskill-path" className="scroll-mt-24">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-xl">Upskill Path / Promotion Evidence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-[720px] divide-y divide-border text-sm">
                      <thead>
                        <tr>
                          <th className="px-3 py-2 text-left font-medium text-foreground">Level</th>
                          <th className="px-3 py-2 text-left font-medium text-foreground">Label</th>
                          <th className="px-3 py-2 text-left font-medium text-foreground">Evidence to promote</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {detail.upskillPath.map(([level, label, evidence]) => (
                          <tr key={level}>
                            <td className="px-3 py-3 font-medium text-foreground">{level}</td>
                            <td className="px-3 py-3 text-foreground">{label}</td>
                            <td className="px-3 py-3 text-muted-foreground">{evidence}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
