import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PortfolioItem {
  id: string
  title: string
  subtitle: string
  domain: string
  description: string
  keyPatterns: string[]
  lessons: string
  status: string
  statusNote?: string
}

const portfolioItems: PortfolioItem[] = [
  {
    id: "ai-workflow-governance",
    title: "AI Workflow Governance",
    subtitle: "Personal Applied Learning Artifact",
    domain: "AI Orchestration",
    description: "Lightweight AI workflow and knowledge orchestration experiment testing how AI-assisted work can become traceable, reviewable, governable, and less cognitively expensive.",
    keyPatterns: [
      "Task intake → classification → routing → execution support → visibility → human review → decision log",
      "Privacy enforcement at infrastructure layer, not manual discipline",
      "Cost-aware model routing with budget checkpoints",
      "Source-of-truth principle for governance",
    ],
    lessons: "AI adoption depends on workflow, governance, reviewability, operating structure, and human accountability — not only the model.",
    status: "Current",
  },
  {
    id: "case-r01-evidence-before-claims",
    title: "Evidence Discipline for AI-Assisted Delivery",
    subtitle: "Governance signal for AI-assisted delivery claims",
    domain: "AI Governance",
    description: "A draft portfolio candidate showing how AI-assisted work keeps internal artifacts, evidence, and public claims separate before anything is promoted publicly.",
    keyPatterns: [
      "Evidence before claims in AI-assisted delivery",
      "State discipline across artifacts, receipts, and public-facing claims",
      "Prevention of false completion claims before promotion",
      "External mockup role review with explicit claim boundaries",
    ],
    lessons: "External mockup role review applied (single model call, three analytical lenses). This remains a draft portfolio candidate, not a public case-study page, independent validation, or execution closeout.",
    status: "Draft portfolio candidate",
    statusNote: "Draft portfolio candidate",
  },
  {
    id: "data-reliability",
    title: "Data Reliability Foundation",
    subtitle: "Core Banking System Validation",
    domain: "Banking",
    description: "SQL validation, ETL testing, EDW testing, batch-flow analysis, and migration logic in regulated banking environments. Trained to look beyond screen correctness and validate full data flow reliability.",
    keyPatterns: [
      "Migration reconciliation and validation logic",
      "Batch-flow integrity checks",
      "Data handoff failure detection",
      "Silent system failure identification",
    ],
    lessons: "Transformation risk hides in handoffs: wrong mappings, missed dependencies, unclear ownership, unvalidated output.",
    status: "Foundation",
  },
  {
    id: "banking-modernization",
    title: "Core Banking Modernization",
    subtitle: "Regional Multi-Country Transformation",
    domain: "Banking",
    description: "Coordinated complex delivery across countries, vendors, components, and dependent teams in large-scale banking modernization. Created governance rhythm to reduce ambiguity and late-stage risk.",
    keyPatterns: [
      "Ownership rules across multi-vendor delivery",
      "Integration cadence and dependency visibility",
      "Escalation paths and defect triage",
      "Workstream coordination at scale",
    ],
    lessons: "Complex delivery needs operating rhythm: clear ownership, integration gates, escalation clarity, and dependency tracking.",
    status: "Executed",
  },
  {
    id: "cloud-governance",
    title: "Cloud Governance & CCoE Readiness",
    subtitle: "Enterprise Cloud Migration Governance",
    domain: "Cloud",
    description: "Translated strategic cloud ambition into decision-ready governance inputs: portfolio assumptions, readiness signals, security constraints, compliance considerations, budget trade-offs, and migration roadmap logic.",
    keyPatterns: [
      "Portfolio readiness assessment frameworks",
      "Security and compliance constraint mapping",
      "Budget trade-off analysis and roadmap logic",
      "Governance-before-acceleration principle",
    ],
    lessons: "Scaling technology safely requires governance before acceleration. Speed without readiness creates operational risk.",
    status: "Executed",
  },
  {
    id: "digital-lending",
    title: "Digital Lending Transformation",
    subtitle: "Workflow Redesign Across Business & IT",
    domain: "Product",
    description: "Cross-functional redesign of document-heavy lending journey into practical digital workflow, coordinating product, business, IT, security, and compliance.",
    keyPatterns: [
      "Workflow redesign across compliance boundaries",
      "User experience aligned with control requirements",
      "Operating model transformation, not just technology",
      "Cross-functional alignment at delivery scale",
    ],
    lessons: "Transformation succeeds when workflow, controls, user experience, and operating model move together — not technology alone.",
    status: "Executed",
  },
]

export default function PortfolioPage() {
  return (
    <PageLayout>
      {/* Header */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Portfolio
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Selected governance patterns, anonymized case studies, and applied AI workflow experiments.
          </p>
        </div>
      </section>

      {/* Portfolio Items */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {portfolioItems.map((item) => (
              <Card key={item.id} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <CardTitle className="text-xl mb-1">{item.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                    </div>
                    <Badge variant={item.status === "Current" ? "default" : "outline"}>
                      {item.domain}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-muted-foreground mb-4">
                    {item.description}
                  </p>
                  {"statusNote" in item && item.statusNote ? (
                    <p className="mb-4 text-sm font-medium text-foreground">
                      Status: {item.statusNote}
                    </p>
                  ) : null}

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Key Patterns</h4>
                      <ul className="space-y-1.5">
                        {item.keyPatterns.map((pattern, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground pl-4 border-l-2 border-primary/20">
                            {pattern}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-border">
                      <p className="text-sm font-medium text-foreground mb-1">What I Learned</p>
                      <p className="text-sm text-muted-foreground italic">
                        {item.lessons}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Governance Principles */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-6">Core Governance Principles</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Source-of-Truth Control</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Decision authority must be clear, version-controlled, and traceable. No "lost in chat" decisions.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Human Review Gates</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                AI helps fast, but outputs pass through human gates for money, privacy, reputation, and irreversible decisions.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Privacy by Infrastructure</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Privacy cannot rely on discipline alone. It must be enforced at the infrastructure layer.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Cost-Aware Routing</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Separate role, model, provider, and cost so execution is traceable and cost is not conflated with quality.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Benchmark Evidence</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Tasks produce benchmark evidence before marked done — not just completion signals.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Workflow Over Tooling</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                AI orchestration is program management: intake, classification, routing, execution, review, decision log.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 border-t border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Interested in these patterns?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            I'm exploring senior roles where AI/data governance, transformation delivery, 
            and operating structure expertise can create value.
          </p>
          <Link 
            href="/about" 
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Learn More About My Background
          </Link>
        </div>
      </section>
    </PageLayout>
  )
}
