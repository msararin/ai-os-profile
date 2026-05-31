import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const operatingFlow = [
  {
    title: "Lyn / CEO",
    label: "Intent and gates",
    detail: "Sets priorities and protects energy, money, reputation, and direction.",
  },
  {
    title: "Robert",
    label: "Executive orchestration",
    detail: "Synthesizes context into clear specs, tradeoffs, gates, and decisions.",
  },
  {
    title: "Risa",
    label: "Stage management",
    detail: "Coordinates execution, handoffs, progress, and scope discipline.",
  },
  {
    title: "Codex + Workers",
    label: "Bounded workforce",
    detail: "Implements scoped changes and uses capability-based workers by risk and cost.",
  },
  {
    title: "Artifacts + Evidence",
    label: "Review packet",
    detail: "Produces diffs, checks, review surfaces, and decision evidence.",
  },
  {
    title: "Lyn Gate",
    label: "Approval boundary",
    detail: "Decides whether work may commit, publish, or support business use.",
  },
]

const systemLayers = [
  {
    title: "Human Decision Layer",
    owner: "Lyn / CEO",
    items: ["Intent", "Priorities", "Approval gates", "Business direction"],
  },
  {
    title: "Executive Orchestration Layer",
    owner: "Robert",
    items: ["Context synthesis", "Tradeoff review", "Source-of-truth boundaries", "Decision specs"],
  },
  {
    title: "Stage Management Layer",
    owner: "Risa",
    items: ["Execution coordination", "Progress tracking", "Handoffs", "Scope control"],
  },
  {
    title: "Execution Workforce Layer",
    owner: "Codex + workers",
    items: ["Bounded repo changes", "OpenRouter analysts", "Ollama utilities", "Capability routing"],
  },
  {
    title: "Knowledge & Evidence Layer",
    owner: "Robert KB + Git",
    items: ["Truth record", "Build and typecheck", "Route checks", "Review evidence"],
  },
  {
    title: "Public / Internal Surface Layer",
    owner: "ai-os-profile",
    items: ["Internal review pages", "Curated public proof", "No approval by dashboard", "No raw secrets"],
  },
  {
    title: "Business Runway / Capability Layer",
    owner: "Nova Orbit runway",
    items: ["Portfolio proof", "AI adoption governance", "POC support", "Risk and cost visibility"],
  },
]

const evidenceChecks = [
  "build",
  "typecheck",
  "route checks",
  "public/private scans",
  "manual visual review",
  "Robert review",
  "Lyn gate",
  "commit / push / merge / deploy evidence",
]

const businessPaths = [
  "Portfolio proof artifacts",
  "AI adoption governance",
  "Token and cost visibility",
  "POC decision support",
  "Knowledge-base governance",
  "Data leakage and privacy risk support",
  "Nova Orbit business runway",
]

const warnings = [
  "Internal map, not public claim.",
  "Review surface, not source of truth.",
  "Observability supports decisions; it does not approve execution.",
  "Architecture should reduce cognitive load, not add process theater.",
]

function Arrow() {
  return (
    <div className="flex items-center justify-center text-lg font-semibold text-primary">
      <span className="hidden lg:inline">→</span>
      <span className="lg:hidden">↓</span>
    </div>
  )
}

export default function AIOSArchitectureMapPage() {
  return (
    <PageLayout>
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/internal/dashboard"
            className="text-sm font-medium text-primary hover:underline"
          >
            ← Back to Internal Dashboard
          </Link>
          <Badge variant="outline" className="border-yellow-500/50 text-yellow-700 dark:text-yellow-400">
            Experimental internal map
          </Badge>
        </div>

        <div className="mt-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Internal review only
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            AIOS Big-Picture Architecture Map
          </h1>
          <p className="mt-3 max-w-4xl text-sm text-muted-foreground sm:text-base">
            A compact view of AIOS as a small AI-native operating company: human direction,
            executive orchestration, bounded execution, evidence, and business use.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {warnings.map((warning) => (
            <div
              key={warning}
              className="rounded-lg border border-yellow-500/40 bg-yellow-500/10 p-3 text-sm font-medium text-foreground"
            >
              {warning}
            </div>
          ))}
        </div>

        <p className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm text-foreground">
          Lyn owns business decisions and approval gates. Robert orchestrates; Risa, Codex, and workers
          support bounded execution.
        </p>

        <Card className="mt-6 gap-4 border-primary/30 py-5">
          <CardHeader className="px-5">
            <CardTitle>Operating Model</CardTitle>
            <p className="text-sm text-muted-foreground">
              Intent moves down through bounded execution. Evidence returns to a human gate.
            </p>
          </CardHeader>
          <CardContent className="px-5">
            <div className="grid gap-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-stretch">
              {operatingFlow.map((step, index) => (
                <div key={step.title} className="contents">
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-semibold text-foreground">{step.title}</p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-primary">
                      {step.label}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">{step.detail}</p>
                  </div>
                  {index < operatingFlow.length - 1 && <Arrow />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_1fr]">
          <Card className="gap-4 py-5">
            <CardHeader className="px-5">
              <CardTitle>System Layers</CardTitle>
              <p className="text-sm text-muted-foreground">
                Seven lanes keep responsibilities visible without pretending every lane is automated.
              </p>
            </CardHeader>
            <CardContent className="grid gap-2 px-5">
              {systemLayers.map((layer) => (
                <div
                  key={layer.title}
                  className="grid gap-2 rounded-lg border bg-background p-3 md:grid-cols-[1.15fr_0.8fr_2fr] md:items-center"
                >
                  <p className="text-sm font-semibold text-foreground">{layer.title}</p>
                  <p className="text-xs font-medium text-primary">{layer.owner}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {layer.items.map((item) => (
                      <Badge key={item} variant="secondary">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card className="gap-4 border-primary/30 py-5">
              <CardHeader className="px-5">
                <CardTitle>Source-of-Truth Boundary</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 px-5 text-sm">
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
                  <p className="font-semibold text-foreground">Robert KB + Git</p>
                  <p className="mt-1 text-muted-foreground">Source of truth and durable record.</p>
                </div>
                <div className="text-center font-semibold text-primary">↓ curated read surfaces</div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-semibold text-foreground">Internal pages</p>
                    <p className="mt-1 text-muted-foreground">Review and read surfaces.</p>
                  </div>
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-semibold text-foreground">Public pages</p>
                    <p className="mt-1 text-muted-foreground">Curated external proof only.</p>
                  </div>
                </div>
                <p className="rounded-lg border border-yellow-500/40 bg-yellow-500/10 p-3 font-medium">
                  Dashboards do not approve work by themselves.
                </p>
              </CardContent>
            </Card>

            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardTitle>Evidence / Governance</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2 px-5">
                {evidenceChecks.map((check) => (
                  <Badge key={check} variant="outline">
                    {check}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card className="gap-4 py-5">
            <CardHeader className="px-5">
              <CardTitle>Business / Money Path</CardTitle>
              <p className="text-sm text-muted-foreground">
                Runway and capability direction for practical business learning and risk control, not
                proven revenue.
              </p>
            </CardHeader>
            <CardContent className="grid gap-2 px-5 sm:grid-cols-2">
              {businessPaths.map((path) => (
                <div key={path} className="rounded-lg border bg-background p-3 text-sm text-foreground">
                  {path}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="gap-4 border-yellow-500/40 py-5">
            <CardHeader className="px-5">
              <CardTitle>Current Slice Highlight</CardTitle>
              <p className="text-sm text-muted-foreground">
                Internal visibility only. This slice does not change execution approval.
              </p>
            </CardHeader>
            <CardContent className="grid gap-2 px-5 text-sm">
              <div className="rounded-lg border bg-background p-3">
                <p className="font-semibold text-foreground">/internal/aios-backlog</p>
                <p className="mt-1 text-muted-foreground">Live read-only KB backlog review.</p>
              </div>
              <div className="rounded-lg border bg-background p-3">
                <p className="font-semibold text-foreground">/internal/dashboard</p>
                <p className="mt-1 text-muted-foreground">Internal navigation and status clarification.</p>
              </div>
              <div className="rounded-lg border bg-background p-3">
                <p className="font-semibold text-foreground">/internal/aios-architecture-map</p>
                <p className="mt-1 text-muted-foreground">Experimental big-picture architecture map.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  )
}
