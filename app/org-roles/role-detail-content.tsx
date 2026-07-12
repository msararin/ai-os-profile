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
export const bigCrewArchitectureGateDetail: RoleDetail = {
  title: "Big Crew Architecture Gate",
  type: "Production readiness control layer",
  purpose:
    "Keeps prototype-to-production decisions bounded, evidence-led, and public-safe before source work expands.",
  chips: ["Architecture gate", "Claim boundary", "Production slice"],
  boundary: "Draft public-safe slice; taxonomy not PASS/DONE/VERIFIED",
  href: "/org-roles/big-crew-architecture-gate",
  hero:
    "Big Crew Architecture Gate is a controlled review layer for deciding whether a prototype, internal tool, or AI workflow is ready to become a maintainable production-facing application. This page is a public-safe draft slice, not a maturity claim.",
  atAGlance: [
    ["Role type", "Architecture and production-readiness gate"],
    ["Primary shift", "Demo debt to bounded production-entry decisions"],
    ["Core output", "Gate packet, boundary review, and implementation handoff"],
    ["Boundary", "No taxonomy PASS, implementation readiness, deployment readiness, or live verification claim"],
  ],
  why:
    "Prototype work can become public or production-facing before ownership, maintainability, evidence, and claim boundaries are clear. Big Crew Architecture Gate exists to slow that transition just enough to make scope, risk, and missing evidence visible before implementation expands.",
  upskilled: {
    before: [
      "demo-first implementation momentum",
      "unclear production-entry criteria",
      "role and ownership assumptions mixed into source work",
      "private evidence at risk of leaking into public artifacts",
    ],
    after: [
      "source-of-truth lock before implementation",
      "public/private boundary review",
      "bounded first-slice implementation planning",
      "missing-evidence and non-claim disclosure",
      "Runner Gang diff/build/no-leak validation",
      "Prime Gate risk review before continuation",
    ],
  },
  skillPack: [
    {
      title: "architecture-gate-scope-framing",
      body: "Defines the smallest production-facing slice and separates implementation candidates from future-role expansion.",
    },
    {
      title: "public-private-boundary-review",
      body: "Keeps full internal source packs and private receipts out of public repo content while allowing sanitized references.",
    },
    {
      title: "production-entry-handoff",
      body: "Turns gate decisions into scoped worktree instructions, validation targets, stop conditions, and claim boundaries.",
    },
  ],
  principles: [
    "Source of truth before source change",
    "Smallest public-safe slice first",
    "Private custody is not public content",
    "Missing evidence must stay visible",
    "Runner is not Gate",
    "Prime Gate leads mitigation",
    "No PASS/DONE/VERIFIED claim without evidence",
    "No deploy or live verification claim by default",
  ],
  references: [
    {
      title: "Private custody reference",
      body: "The full Big Crew source pack is privately custodied outside the public repo. This public page references that custody only at a high level.",
    },
    {
      title: "Public-safe recovery boundary",
      body: "Public repo content may contain sanitized index/reference material only, not the full source pack or private receipts.",
    },
    {
      title: "Safe-worktree execution boundary",
      body: "Source work must happen in a clean or scoped worktree with exact diff, build, and no-leak validation before any continuation claim.",
    },
    {
      title: "Lane collision guard",
      body: "If a blocker belongs to cleanup, custody, telemetry, or governance, Prime Gate classifies it as a dependency instead of letting this lane silently switch.",
    },
  ],
  workflow:
    "Source-of-truth lock - public/private boundary review - first-slice scope - safe-worktree plan - bounded source diff - Runner Gang validation - Prime Gate review - owner-readable summary.",
  inputs: [
    "private custody status",
    "public-safe index/reference boundary",
    "implementation packet",
    "active lane header",
    "forbidden lane switches",
    "validation and stop conditions",
  ],
  outputs: [
    "bounded architecture gate slice",
    "public-safe detail page",
    "diff and build validation receipt",
    "missing-evidence disclosure",
    "Prime Gate review outcome",
    "next executable phase boundary",
  ],
  escalations: [
    {
      title: "Prime Gate",
      body: "scope, risk, public/private boundary, and claim-language mitigation",
    },
    {
      title: "Runner Gang",
      body: "diff scope, build result, no-leak checks, and forbidden-claim validation",
    },
    {
      title: "Evidence Steward",
      body: "custody reference, receipts, source-of-truth status, and non-action record",
    },
    {
      title: "Lyn",
      body: "owner-level risk, scope change, custody waiver, implementation authorization beyond packet, deploy/live verification, or business priority",
    },
  ],
  evidence: [
    {
      title: "Available Evidence",
      items: [
        "Private custody of the Big Crew source pack is recorded outside the public repo.",
        "Public-safe recovery selected a KB-local draft and future-write packet before source implementation.",
        "Provider-backed routing patch confirmed Opus Prime Gate and Sonnet Runner Gang boundaries.",
        "Lane collision guard requires blockers from other lanes to be classified before action.",
      ],
    },
    {
      title: "Missing Evidence",
      items: [
        "No taxonomy PASS, DONE, or VERIFIED state is claimed.",
        "No production deploy or live verification is claimed.",
        "No role specs are claimed for this slice.",
        "No full source-pack content is exposed in public repo content.",
        "No production-fixed claim is made.",
      ],
    },
    {
      title: "Claims Not Made",
      items: [
        "Not a final architecture approval.",
        "Not implementation readiness for all Big Crew roles.",
        "Not a deployment readiness claim.",
        "Not live verification.",
        "Not proof that every source-pack question is resolved.",
        "Not authorization to push or commit.",
      ],
    },
  ],
  upskillPath: [
    ["1", "Gate Reader", "can identify active lane, source of truth, and non-claims"],
    ["2", "Boundary Reviewer", "can separate public-safe content from private custody evidence"],
    ["3", "Scoped Slice Planner", "can define a safe first production-facing implementation slice"],
    ["4", "Architecture Gate Lead", "can coordinate Runner Gang validation and Prime Gate review before continuation"],
  ],
}

export const qaSentinelDetail: RoleDetail = {
  title: "QA Sentinel",
  type: "Big Crew v0.1 quality role",
  purpose:
    "Protects evidence sufficiency, validation readiness, claim discipline, and release or handoff quality boundaries.",
  chips: ["Evidence sufficiency", "Validation readiness", "Checker Designer capability"],
  boundary: "Checker Designer is a capability, not a separate role",
  href: "/org-roles/qa-sentinel",
  hero:
    "QA Sentinel is Big Crew's callable v0.1 quality role. It identifies failure modes, weak assumptions, missing evidence, and release blockers, and uses the Checker Designer capability when the work is specifically about designing acceptance criteria or deterministic validation plans.",
  atAGlance: [
    ["Role type", "Callable Big Crew v0.1 quality role"],
    ["Core output", "Quality findings, evidence checks, validation criteria, and blocker recommendations"],
    ["Capability", "Checker Designer for acceptance criteria and validation-plan design"],
    ["Boundary", "Does not execute checks or own final go/no-go authority"],
  ],
  why:
    "Visible results can look ready before their assumptions, evidence, validation criteria, and claim boundaries are strong enough. QA Sentinel makes those gaps explicit before handoff, release, production-facing use, or public narrative expands.",
  upskilled: {
    before: [
      "quality review after implementation",
      "acceptance criteria mixed with test execution",
      "missing evidence hidden inside broad readiness language",
      "Checker Designer treated as an ambiguous alias or separate role",
    ],
    after: [
      "failure-mode and weak-assumption review before release",
      "evidence sufficiency and owner-usability checks",
      "explicit validation-readiness and claim-downgrade criteria",
      "Checker Designer used as a bounded capability under QA Sentinel",
      "Runner Gang, Evidence Steward, Prime Gate, and owner boundaries preserved",
    ],
  },
  skillPack: [
    {
      title: "qa-sentinel-quality-risk-review",
      body: "Identifies failure modes, weak assumptions, missing evidence, and release or handoff blockers.",
    },
    {
      title: "checker-designer-capability",
      body: "Designs acceptance criteria, deterministic validation plans, evidence checklists, and claim-downgrade rules without executing the checks.",
    },
    {
      title: "evidence-and-claim-discipline",
      body: "Reviews whether evidence supports the stated local claim and recommends downgrade or blocking language when it does not.",
    },
  ],
  principles: [
    "Failure modes before readiness language",
    "Evidence sufficiency before claim strength",
    "Design checks separately from executing checks",
    "Checker Designer stays under QA Sentinel",
    "Runner Gang executes deterministic validation",
    "Evidence Steward owns receipts and custody records",
    "Prime Gate owns final claim-boundary go/no-go",
    "No production, deploy, live-verification, or taxonomy completion claim by default",
  ],
  references: [
    {
      title: "Canonical v0.1 role boundary",
      body: "QA Sentinel is the callable quality role. Checker Designer is its check-design capability, not a flat alias and not a separate v0.1 role.",
    },
    {
      title: "Surface acceptance pairing",
      body: "For page or surface acceptance criteria, QA Sentinel uses Checker Designer capability alongside Surface Guild. Surface Guild leads reader journey and visible meaning; this pairing does not move Checker Designer into Surface Guild.",
    },
    {
      title: "Deterministic validation boundary",
      body: "Runner Gang executes deterministic checks. QA Sentinel defines or reviews checks, blockers, and evidence expectations; it is not the runner.",
    },
    {
      title: "Gate and evidence boundary",
      body: "Evidence Steward records source authority and receipts. QA Sentinel reviews sufficiency. Prime Gate makes the final claim-boundary decision.",
    },
  ],
  workflow:
    "Source and claim boundary - failure-mode review - weak-assumption review - acceptance and evidence criteria - Runner Gang validation handoff - evidence sufficiency review - blocker or downgrade recommendation - Prime Gate decision.",
  inputs: [
    "stated local claim",
    "source artifacts and implementation diff",
    "acceptance criteria or validation target",
    "evidence and receipt inventory",
    "handoff or release boundary",
    "known non-claims and stop conditions",
  ],
  outputs: [
    "failure modes and weak assumptions",
    "acceptance criteria and validation-plan design",
    "evidence sufficiency findings",
    "release or handoff blockers",
    "claim-downgrade recommendation",
    "Runner Gang validation expectations",
  ],
  escalations: [
    {
      title: "Runner Gang",
      body: "execute deterministic checks and return pass/fail evidence",
    },
    {
      title: "Evidence Steward",
      body: "record source authority, custody, receipts, and provider/model telemetry",
    },
    {
      title: "Prime Gate",
      body: "decide final claim boundary and go/no-go after QA findings",
    },
    {
      title: "Lyn",
      body: "owner decision for taxonomy split, scope expansion, implementation authority, push, deploy, live verification, or public release",
    },
  ],
  evidence: [
    {
      title: "Available Evidence",
      items: [
        "The canonical v0.1 role set names QA Sentinel as the quality role.",
        "The accepted calling boundary places Checker Designer under QA Sentinel as a check-design capability.",
        "A provider-validated local role-page mapping defines purpose, responsibilities, relationships, and non-claims.",
      ],
    },
    {
      title: "Missing Evidence",
      items: [
        "No production, deployment, or live-verification evidence is claimed.",
        "No taxonomy PASS, DONE, or VERIFIED state is claimed.",
        "No separate Checker Designer role contract or role-page authority exists.",
        "This local page slice does not prove independent validation of future work.",
      ],
    },
    {
      title: "Claims Not Made",
      items: [
        "QA Sentinel does not execute deterministic validation.",
        "QA Sentinel does not own evidence custody or provider receipts.",
        "QA Sentinel does not approve final claim boundaries.",
        "QA Sentinel does not approve release, production, deploy, or live verification.",
        "Checker Designer is not a separate role and is not owned by Surface Guild.",
      ],
    },
  ],
  upskillPath: [
    ["1", "Quality Risk Reader", "can identify failure modes, weak assumptions, and missing evidence"],
    ["2", "Checker Designer", "can design acceptance criteria, evidence checklists, and deterministic validation plans"],
    ["3", "QA Sentinel", "can review evidence sufficiency, blockers, owner usability, and claim-downgrade needs"],
    ["4", "Quality Gate Partner", "can hand off checks to Runner Gang and findings to Prime Gate without absorbing their authority"],
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
