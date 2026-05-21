"use client"

import { useState } from "react"
import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import {
  CockpitSidebar,
  type CockpitSectionId,
} from "@/components/cockpit-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const differentiationClaims = [
  {
    id: 1,
    title: "Separate role, model, provider, and cost",
    description:
      "AIOS separates who does the work (role) from which model executes it from how much it costs. Most tools conflate these, making cost and traceability unclear.",
  },
  {
    id: 2,
    title: "Benchmark trace as Definition of Done gate",
    description:
      "Tasks aren't complete until benchmark trace is recorded. This isn't telemetry after the fact; it's a gate before commit.",
  },
  {
    id: 3,
    title: "Learning from failure with policy response",
    description:
      "When a 402 incident occurred, the response was a documented fallback routing policy and smoke test, not silent fixes.",
  },
  {
    id: 4,
    title: "Human review gates where risk matters",
    description:
      "AI helps fast. But outputs pass through human review gates for money, privacy, reputation, and irreversible decisions.",
  },
  {
    id: 5,
    title: "Privacy-first curated context",
    description:
      "AI workers consume only curated, approved context. Full KB access is not given; context is allowlisted and leak-scanned.",
  },
]

const workstreams = [
  {
    name: "optimize-worker",
    status: "Active",
    owner: "Lyn+Codex",
    nextAction: "Keep benchmark_trace.json automation parked until a thin slice is chosen",
    badgeClass: "bg-emerald-500/10 text-emerald-700",
  },
  {
    name: "Hermes + MCP",
    status: "Policy active",
    owner: "Lyn",
    nextAction: "Route with fallback policy by task type, failure mode, risk, and available worker/model",
    badgeClass: "bg-teal-500/10 text-teal-700",
  },
  {
    name: "Supernova",
    status: "Drafted",
    owner: "Lyn",
    nextAction: "10 trigger-activated modules; activate per money trigger",
    badgeClass: "bg-orange-500/10 text-orange-700",
  },
  {
    name: "Big Crew",
    status: "Planned",
    owner: "Lyn",
    nextAction: "Define scope after Supernova validates revenue path",
    badgeClass: "bg-muted-foreground/20 text-muted-foreground",
  },
  {
    name: "Investment Team",
    status: "Planned",
    owner: "Lyn",
    nextAction: "Defer until Supernova produces first signal",
    badgeClass: "bg-muted-foreground/20 text-muted-foreground",
  },
]

const backlogSnapshot = [
  ["Patch 3 internal mode workstream snapshot", "COMPLETE"],
  ["Patch 4 architecture page", "COMPLETE"],
  ["Patch 5 LVT page", "COMPLETE"],
  ["Patch 6 principles page", "COMPLETE"],
  ["Patch 7 final consistency audit", "COMPLETE"],
]

const systemStatusItems = [
  ["Source of truth", "Robert KB + Git remain canonical"],
  ["Governance", "Review gates and commit-before-truth protocol active"],
  ["Routing", "Fallback routing policy active; Hermes is not a single point of failure"],
  ["Definition of Done", "Benchmark trace records execution evidence when tasks route"],
]

const proofItems = [
  ["Documented", "Architecture, LVT, and principles are published as portfolio-safe pages"],
  ["Tabletop-tested", "Role boundaries and routing decisions are captured before execution"],
  ["Smoke-proven", "Fallback profile routing has passed bounded task smoke checks"],
  ["Regression-gated", "v2.x cockpit changes run the regression script when available"],
]

const decisionItems = [
  "Cockpit evidence is manually curated, not live operational data.",
  "Provider/model expansion waits for benchmark evidence unless Lyn overrides.",
  "MCP remains a controlled read-only context bridge until production approval.",
]

const nextActionItems = [
  "Complete Lyn visual review on the v2.1 navigation cleanup.",
  "Record validation evidence in the benchmark trace after approval.",
  "Keep benchmark_trace.json automation parked until a thin slice is chosen.",
]

export default function HomePage() {
  const [activeSection, setActiveSection] =
    useState<CockpitSectionId>("system-status")

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            AI Orchestration Governance
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            Tools change. Governance discipline doesn&apos;t.
          </p>
          <p className="mt-2 max-w-2xl text-pretty text-lg font-medium text-primary">
            AIOS is a working evidence trail for human-led AI work governance.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/architecture">View Architecture</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/principles">View Principles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Differentiation */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            What Makes This Different?
          </h2>
          <p className="mt-4 max-w-3xl text-sm text-muted-foreground">
            Most AI tools focus on building agents or automating workflows.
            AIOS focuses on a harder problem: How do you govern AI work when
            multiple models, roles, and costs interact?
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {differentiationClaims.map((claim) => (
              <Card key={claim.id} className="border-border bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium text-primary">
                    {claim.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {claim.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-8 text-sm italic text-muted-foreground">
            This is a portfolio case study, not a production product.
          </p>
        </div>
      </section>

      {/* System State */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            System State
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Current State
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5 shrink-0 bg-primary/10 text-primary">
                      Existing
                    </Badge>
                    <span className="text-muted-foreground">
                      Robert KB + Git = source of truth
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5 shrink-0 bg-primary/10 text-primary">
                      Existing
                    </Badge>
                    <span className="text-muted-foreground">
                      Cockpit governance principles v0.3 + R1 committed
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5 shrink-0 bg-primary/10 text-primary">
                      Drafted
                    </Badge>
                    <span className="text-muted-foreground">
                      AI OS architecture direction locked
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5 shrink-0 bg-primary/10 text-primary">
                      Existing
                    </Badge>
                    <span className="text-muted-foreground">
                      Execution surfaces exist (optimize-worker, Hermes, Codex)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5 shrink-0 bg-primary/10 text-primary">
                      Existing
                    </Badge>
                    <span className="text-muted-foreground">
                      Fallback routing policy active; Hermes is not a single point of failure
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5 shrink-0 bg-primary/10 text-primary">
                      Existing
                    </Badge>
                    <span className="text-muted-foreground">
                      Benchmark trace is a centralized Definition of Done gate
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  To-Be State
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5 shrink-0 bg-amber-500/10 text-amber-700">
                      Planned
                    </Badge>
                    <span className="text-muted-foreground">
                      Public-facing AI Orchestration Governance profile
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5 shrink-0 bg-amber-500/10 text-amber-700">
                      Planned
                    </Badge>
                    <span className="text-muted-foreground">
                      Architecture, principles, LVT shown clearly
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5 shrink-0 bg-amber-500/10 text-amber-700">
                      Planned
                    </Badge>
                    <span className="text-muted-foreground">
                      Provider/model expansion waits for benchmark evidence unless Lyn overrides
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5 shrink-0 bg-muted-foreground/20 text-muted-foreground">
                      Parked
                    </Badge>
                    <span className="text-muted-foreground">
                      No new provider API key needed now
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5 shrink-0 bg-muted-foreground/20 text-muted-foreground">
                      Parked
                    </Badge>
                    <span className="text-muted-foreground">
                      Automate benchmark_trace.json and collect at least 5 routed traces
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5 shrink-0 bg-muted-foreground/20 text-muted-foreground">
                      Parked
                    </Badge>
                    <span className="text-muted-foreground">
                      Read-only telemetry dashboard only after benchmark trace evidence exists
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Operating Beliefs */}
      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Core Operating Beliefs
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The principles this system is governed by, in plain language.
          </p>
          <div className="mt-8 space-y-6">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                1
              </div>
              <div>
                <h3 className="font-medium text-foreground">
                  Source of truth must be committed
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Only what is committed to KB and Git counts as truth. Anything in chat, in a UI, or in someone&apos;s memory is not truth yet.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                2
              </div>
              <div>
                <h3 className="font-medium text-foreground">
                  Status must be actionable
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  A status flag is only useful if it tells you the owner, the next action, the review trigger, and whether it is open or resolved. Anything less is just a label.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                3
              </div>
              <div>
                <h3 className="font-medium text-foreground">
                  AI output is not truth until reviewed and committed
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  AI helps fast. But its output is a draft until a human reviews it and a commit makes it durable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* MCP Footnote */}
      <section className="pb-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs italic text-muted-foreground">
            *Current operational trial surface. MCP is used as a read-only context bridge for controlled context retrieval. It is not yet approved as an autonomous production workflow.
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 pt-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Cockpit Evidence
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Public-safe operating evidence from the AIOS cockpit.
          </p>
        </div>
        <div className="mt-8 border-t border-border lg:flex">
          <CockpitSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
          <section className="flex-1 py-12 lg:py-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              {activeSection === "system-status" ? (
                <InternalSystemStatus />
              ) : null}
              {activeSection === "workstreams" ? <InternalWorkstreams /> : null}
              {activeSection === "patch-history" ? (
                <InternalPatchHistory />
              ) : null}
              {activeSection === "evidence" ? <InternalEvidence /> : null}
              {activeSection === "decisions" ? <InternalDecisions /> : null}
              {activeSection === "next-actions" ? <InternalNextActions /> : null}
            </div>
          </section>
        </div>
      </section>
    </PageLayout>
  )
}

function SectionHeading({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

function InternalSystemStatus() {
  return (
    <div>
      <SectionHeading
        title="System Status"
        description="Current operating state for the public cockpit evidence view."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {systemStatusItems.map(([label, value]) => (
          <Card key={label} className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium text-primary">
                {label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function InternalWorkstreams() {
  return (
    <div>
      <SectionHeading
        title="Workstream Status"
        description="Manually-curated ownership, status, and next-action snapshot."
      />
      <div className="mt-8 overflow-x-auto rounded-lg border border-border bg-card">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-sm font-medium text-foreground"
              >
                Workstream
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-sm font-medium text-foreground"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-sm font-medium text-foreground"
              >
                Owner
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-sm font-medium text-foreground"
              >
                Next action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {workstreams.map((workstream) => (
              <tr key={workstream.name}>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-foreground">
                  {workstream.name}
                </td>
                <td className="px-4 py-3 text-sm">
                  <Badge
                    variant="secondary"
                    className={workstream.badgeClass}
                  >
                    {workstream.status}
                  </Badge>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-muted-foreground">
                  {workstream.owner}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {workstream.nextAction}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function InternalPatchHistory() {
  return (
    <div>
      <SectionHeading
        title="Cockpit patch sequence — completed validation snapshot, not live."
        description="Completed validation snapshot, not live backlog data."
      />
      <div className="mt-8 space-y-3">
        {backlogSnapshot.map(([label, status]) => (
          <div
            key={label}
            className="flex flex-col gap-2 rounded-lg border border-border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-sm font-medium text-foreground">{label}</p>
            <Badge
              variant="secondary"
              className={
                status === "COMPLETE"
                  ? "bg-emerald-500/10 text-emerald-700"
                  : status === "IN PROGRESS"
                  ? "bg-amber-500/10 text-amber-700"
                  : "bg-muted-foreground/20 text-muted-foreground"
              }
            >
              {status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

function InternalEvidence() {
  return (
    <div>
      <SectionHeading
        title="Evidence / Proof"
        description="Proof levels used to avoid overclaiming maturity."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {proofItems.map(([label, value]) => (
          <Card key={label} className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium text-primary">
                {label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function InternalDecisions() {
  return (
    <div>
      <SectionHeading
        title="Run Log / Decisions"
        description="Operating notes that frame how the cockpit should be read."
      />
      <Card className="mt-8 border-border bg-card">
        <CardContent>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {decisionItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <p className="mt-6 text-sm italic text-muted-foreground">
        Source of truth remains Robert KB + Git. This view is a read surface, not a control plane.
      </p>
    </div>
  )
}

function InternalNextActions() {
  return (
    <div>
      <SectionHeading
        title="Next Actions"
        description="Review-ready actions after the v2.1 navigation cleanup."
      />
      <Card className="mt-8 border-border bg-card">
        <CardContent>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {nextActionItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
