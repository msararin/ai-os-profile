"use client"

import type { ReactNode } from "react"
import { useSession, signOut } from "next-auth/react"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

const reviewQueue = [
  {
    item: "Signal Studio v0.6 pilot",
    status: "Review pending",
    nextDecision: "Decide whether v0.6 needs structure/spec changes before implementation.",
    blockerRisk: "Pilot should not expand into CMS, browser editor, or save behavior.",
  },
  {
    item: "Knowledge Sharing public archive check",
    status: "Needs browser review",
    nextDecision: "Confirm the public archive is visible and remains separate from internal drafts.",
    blockerRisk: "Public route must not expose Signal Studio draft packages.",
  },
  {
    item: "Budget Burn Daily Report",
    status: "Pending source confirmation",
    nextDecision: "Confirm report source and display expectations before creating any budget page.",
    blockerRisk: "Do not invent spend, burn, or target values.",
  },
  {
    item: "Export behavior verification",
    status: "Not verified",
    nextDecision: "Verify Markdown export before claiming export behavior is complete.",
    blockerRisk: "Visible controls are not the same as verified export behavior.",
  },
  {
    item: "Git dirty-state cleanup",
    status: "Decision needed",
    nextDecision: "Choose the scoped commit set after Lyn review; do not stage broadly.",
    blockerRisk: "Dirty tree includes unrelated historical/untracked files.",
  },
]

const workstreamSnapshot = [
  {
    lane: "Signal Studio",
    currentStatus: "Internal draft review surface exists",
    nextMilestone: "v0.6 pilot structure/spec decision",
    owner: "Lyn + Codex",
  },
  {
    lane: "Knowledge Sharing",
    currentStatus: "Public archive restored",
    nextMilestone: "Browser-visible archive preservation check",
    owner: "Lyn",
  },
  {
    lane: "Observability",
    currentStatus: "Regression evidence is local/manual",
    nextMilestone: "Confirm latest durable report and stale/current labels",
    owner: "Lyn + Codex",
  },
  {
    lane: "Budget / Cost",
    currentStatus: "Pending Budget Burn Daily Report",
    nextMilestone: "Confirm source before surfacing values",
    owner: "Lyn",
  },
  {
    lane: "Dashboard / Internal Cockpit",
    currentStatus: "Phase 1 IA dashboard summary",
    nextMilestone: "Lyn browser review of protected cockpit",
    owner: "Codex",
  },
  {
    lane: "Release / Publish",
    currentStatus: "No production publish in this task",
    nextMilestone: "Scoped review decision before any publish path",
    owner: "Lyn",
  },
  {
    lane: "Backlog",
    currentStatus: "Live read-only KB review surface available",
    nextMilestone: "Review the bounded classification proposal; do not infer execution approval",
    owner: "Lyn",
  },
]

const observabilitySnapshot = [
  {
    metric: "Build status",
    status: "Pending current run",
    evidence: "Historical snapshot, not live. Re-run validation before relying on status.",
    lastUpdated: "Historical snapshot: 2026-05-27",
  },
  {
    metric: "Route regression",
    status: "Pending current run",
    evidence: "Historical snapshot, not live. Re-run route checks before relying on status.",
    lastUpdated: "Historical snapshot: 2026-05-27",
  },
  {
    metric: "Internal auth boundary",
    status: "Auth protected",
    evidence: "Historical snapshot, not live. Middleware boundary requires release-time verification.",
    lastUpdated: "Historical snapshot: 2026-05-27",
  },
  {
    metric: "Public/private boundary",
    status: "Must remain separated",
    evidence: "Historical snapshot, not live. Public/private scan requires release-time verification.",
    lastUpdated: "Historical snapshot: 2026-05-27",
  },
  {
    metric: "Latest regression report",
    status: "Pending source confirmation",
    evidence: "Use durable report file when selected by review owner",
    lastUpdated: "Not verified",
  },
  {
    metric: "Stale/current status",
    status: "Historical snapshot, not live",
    evidence: "Dashboard is a release-time snapshot, not live telemetry.",
    lastUpdated: "Historical snapshot: 2026-05-27",
  },
]

const budgetSnapshot = [
  {
    metric: "Daily budget burn",
    value: "Pending Budget Burn Daily Report",
    target: "Not verified",
    status: "Pending source confirmation",
    action: "Confirm report source before showing values.",
  },
  {
    metric: "Current spend",
    value: "Not verified",
    target: "Not verified",
    status: "Do not claim",
    action: "Do not invent spend numbers.",
  },
  {
    metric: "Budget target",
    value: "Not verified",
    target: "Pending review owner input",
    status: "Pending",
    action: "Wait for verified budget baseline.",
  },
  {
    metric: "Cost evidence",
    value: "Pending source confirmation",
    target: "Evidence-backed only",
    status: "Pending",
    action: "Link or summarize only after source is confirmed.",
  },
]

const guardrails = [
  "No production publish",
  "No safe-publish live run",
  "No real Visual Gemini image generation",
  "No DOCX/Google Docs/CMS implementation",
  "No git add . or git add -A",
  "No external /knowledge-sharing promotion",
  "No canonical role map update",
  "No browser editor/save button",
]

function SectionIntro({
  title,
  description,
  badge,
}: {
  title: string
  description: string
  badge: string
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <CardTitle>{title}</CardTitle>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>
      <Badge variant="outline" className="w-fit">
        {badge}
      </Badge>
    </div>
  )
}

function TableHeader({ headings }: { headings: string[] }) {
  return (
    <thead className="bg-muted/50">
      <tr>
        {headings.map((heading) => (
          <th
            key={heading}
            scope="col"
            className="px-4 py-3 text-left text-sm font-medium text-foreground"
          >
            {heading}
          </th>
        ))}
      </tr>
    </thead>
  )
}

function TableShell({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="min-w-[960px] divide-y divide-border">{children}</table>
    </div>
  )
}

function TableCell({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <td className={`max-w-72 px-4 py-4 text-sm text-muted-foreground ${className}`}>
      {children}
    </td>
  )
}

function StatusBadge({ children }: { children: ReactNode }) {
  return (
    <Badge variant="secondary" className="whitespace-nowrap">
      {children}
    </Badge>
  )
}

function InternalIaSections() {
  return (
    <div className="mb-8 grid gap-6">
      <Card>
        <CardHeader>
          <SectionIntro
            title="Review Queue"
            description="Current staging review queue. This is review visibility, not a new source-of-truth workflow system."
            badge="Internal only"
          />
        </CardHeader>
        <CardContent>
          <TableShell>
            <TableHeader
              headings={["Item", "Status", "Next Decision", "Blocker / Risk"]}
            />
            <tbody className="divide-y divide-border">
              {reviewQueue.map((item) => (
                <tr key={item.item} className="align-top">
                  <TableCell className="font-medium text-foreground">
                    {item.item}
                  </TableCell>
                  <TableCell>
                    <StatusBadge>{item.status}</StatusBadge>
                  </TableCell>
                  <TableCell>{item.nextDecision}</TableCell>
                  <TableCell>{item.blockerRisk}</TableCell>
                </tr>
              ))}
            </tbody>
          </TableShell>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <SectionIntro
            title="Workstream Snapshot"
            description="Phase 1 internal IA lane summary. The backlog review surface reads the verified KB file live; counts remain intentionally out of scope."
            badge="Manual snapshot"
          />
        </CardHeader>
        <CardContent>
          <TableShell>
            <TableHeader
              headings={["Lane", "Current status", "Next milestone", "Owner"]}
            />
            <tbody className="divide-y divide-border">
              {workstreamSnapshot.map((lane) => (
                <tr key={lane.lane} className="align-top">
                  <TableCell className="font-medium text-foreground">
                    {lane.lane}
                  </TableCell>
                  <TableCell>{lane.currentStatus}</TableCell>
                  <TableCell>{lane.nextMilestone}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {lane.owner}
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </TableShell>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <SectionIntro
            title="Observability Snapshot"
            description="Historical snapshot, not live. Re-run release-time checks before relying on any operational status."
            badge="Pending verification"
          />
        </CardHeader>
        <CardContent>
          <TableShell>
            <TableHeader
              headings={["Metric", "Status", "Evidence", "Last Updated"]}
            />
            <tbody className="divide-y divide-border">
              {observabilitySnapshot.map((metric) => (
                <tr key={metric.metric} className="align-top">
                  <TableCell className="font-medium text-foreground">
                    {metric.metric}
                  </TableCell>
                  <TableCell>{metric.status}</TableCell>
                  <TableCell>{metric.evidence}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {metric.lastUpdated}
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </TableShell>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <SectionIntro
            title="Budget Snapshot"
            description="Budget numbers pending verified Budget Burn Daily Report. No screenshot observation or manual note is presented as live source-backed telemetry."
            badge="No invented numbers"
          />
        </CardHeader>
        <CardContent>
          <TableShell>
            <TableHeader
              headings={["Metric", "Value", "Target / Expected", "Status", "Action"]}
            />
            <tbody className="divide-y divide-border">
              {budgetSnapshot.map((metric) => (
                <tr key={metric.metric} className="align-top">
                  <TableCell className="font-medium text-foreground">
                    {metric.metric}
                  </TableCell>
                  <TableCell>{metric.value}</TableCell>
                  <TableCell>{metric.target}</TableCell>
                  <TableCell>{metric.status}</TableCell>
                  <TableCell>{metric.action}</TableCell>
                </tr>
              ))}
            </tbody>
          </TableShell>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <SectionIntro
            title="Guardrails / Do Not Do Now"
            description="Explicit non-goals for this staging review lane."
            badge="Guardrails"
          />
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {guardrails.map((guardrail) => (
              <div
                key={guardrail}
                className="rounded-lg border border-border p-4 text-sm text-muted-foreground"
              >
                {guardrail}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function InternalDashboardPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      {/* Header */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Internal Dashboard
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                Operational cockpit for AI workflow governance
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-xs">
                Auth Protected
              </Badge>
              <Button 
                variant="outline" 
                onClick={() => {
                  console.log('[Dashboard] Sign-out initiated by user')
                  signOut({ 
                    callbackUrl: '/',
                    redirect: true 
                  })
                }}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* System Status */}
      <section className="py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Alert className="mb-6 bg-primary/5 border-primary/20">
            <AlertDescription>
              🔒 Authenticated as: <span className="font-medium">{session?.user?.email}</span>
            </AlertDescription>
          </Alert>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Portfolio Version
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">v1.0.0</div>
                <p className="text-xs text-muted-foreground mt-1">
                  sararin.ai public shell
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Deployment Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600">Pending verification</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Release-time status only; verify deployment before relying on it
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Auth Layer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600">Active</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Middleware protecting /internal/*
                </p>
              </CardContent>
            </Card>
          </div>

          <InternalIaSections />

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>Internal Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <a 
                  href="/internal/usage" 
                  className="block p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <h3 className="font-medium mb-1">Usage & Budget Tracking</h3>
                  <p className="text-sm text-muted-foreground">
                    Trust-quarantined usage, cost, and checkpoint review
                  </p>
                </a>

                <a 
                  href="/internal/showcase" 
                  className="block p-4 rounded-lg border-2 border-[#00B494] hover:bg-[#00B494]/10 transition-colors"
                >
                  <h3 className="font-medium mb-1 text-[#00B494]">⭐ Performance Showcase</h3>
                  <p className="text-sm text-muted-foreground">
                    Historical benchmark candidates with evidence and verification gaps
                  </p>
                </a>

                <a 
                  href="/internal/performance" 
                  className="block p-4 rounded-lg border border-border hover:border-accent-foreground/50 transition-colors"
                >
                  <h3 className="font-medium mb-1">Multi-Agent Performance</h3>
                  <p className="text-sm text-muted-foreground">
                    Pending verification; no current production metric claim
                  </p>
                </a>

                <a 
                  href="/internal/architecture" 
                  className="block p-4 rounded-lg border border-border hover:border-[#1F3A60]/50 transition-colors"
                >
                  <h3 className="font-medium mb-1">🎯 Architecture Principles</h3>
                  <p className="text-sm text-muted-foreground">
                    Thin-slice, privacy, multi-agent, metadata-first, observable validation
                  </p>
                </a>

                <a
                  href="/internal/knowledge-sharing-drafts"
                  className="block p-4 rounded-lg border border-yellow-500/40 bg-yellow-500/10 hover:bg-yellow-500/15 transition-colors"
                >
                  <h3 className="font-medium mb-1 text-yellow-700 dark:text-yellow-400">
                    Internal: Signal Studio Drafts
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Internal review surface for draft knowledge-sharing packages
                  </p>
                </a>

                <a
                  href="/internal/aios-backlog"
                  className="block p-4 rounded-lg border border-yellow-500/40 bg-yellow-500/10 hover:bg-yellow-500/15 transition-colors"
                >
                  <h3 className="font-medium mb-1 text-yellow-700 dark:text-yellow-400">
                    Internal: AIOS Backlog Review
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Local-only live KB review where the allowlisted filesystem source is available
                  </p>
                </a>

                <a
                  href="/internal/aios-architecture-map"
                  className="block p-4 rounded-lg border border-yellow-500/40 bg-yellow-500/10 hover:bg-yellow-500/15 transition-colors"
                >
                  <h3 className="font-medium mb-1 text-yellow-700 dark:text-yellow-400">
                    Internal: AIOS Architecture Map
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Experimental big-picture map of decision, execution, evidence, and business layers
                  </p>
                </a>

                <div className="block p-4 rounded-lg border border-border opacity-50">
                  <h3 className="font-medium mb-1">Model Routing</h3>
                  <p className="text-sm text-muted-foreground">
                    Role-based model selection (Coming soon)
                  </p>
                </div>

                <div className="block p-4 rounded-lg border border-border opacity-50">
                  <h3 className="font-medium mb-1">Benchmark Traces</h3>
                  <p className="text-sm text-muted-foreground">
                    Task completion evidence (Coming soon)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Privacy Boundary Notice */}
      <section className="py-8 bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-base">Privacy Architecture</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div>
                <span className="font-medium text-foreground">Public:</span> Homepage, About, Portfolio, Writing
                (anonymized case studies, no client names)
              </div>
              <div>
                <span className="font-medium text-foreground">Internal:</span> This dashboard, usage tracking, 
                model routing, benchmarks (auth-protected, not advertised publicly)
              </div>
              <div>
                <span className="font-medium text-foreground">Never Rendered:</span> API keys, OAuth secrets, 
                private notes, client-specific details, raw logs
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* System Info */}
      <section className="py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold mb-4">System Configuration</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Tech Stack</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <div>Next.js 15 (App Router)</div>
                <div>Radix UI + Tailwind CSS 4</div>
                <div>NextAuth.js 5 (Google OAuth)</div>
                <div>Better SQLite3</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Design System</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <div>Classic Blue + Mint Teal palette</div>
                <div>Classic Blue #1F3A60 (primary)</div>
                <div>Mint Teal #00B494 (accent)</div>
                <div>Pastel Blue #E6EEF8 (secondary)</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Deployment</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <div>Platform: Vercel</div>
                <div>Domain: sararin.ai</div>
                <div>HTTPS: Automatic</div>
                <div>Auto-deploy: main branch</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Repository</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <div>GitHub: msararin/ai-os-profile</div>
                <div>Branch: main</div>
                <div>CI/CD: Deployment Preflight</div>
                <div>Version: v1.0.0</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
