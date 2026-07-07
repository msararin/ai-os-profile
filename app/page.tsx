import Link from "next/link"
import { HomepageGovernanceHero } from "@/components/homepage-governance-hero"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const novicePositioningRows = [
  {
    is: "AI work people can trust",
    isNot: "Not a chatbot - because chatting is not governance",
    matters: "Can we trust it?",
  },
  {
    is: "AI work you can measure",
    isNot: "Not a prompt library - because prompts alone do not prove what happened",
    matters: "Can we review it?",
  },
  {
    is: "AI work you can audit",
    isNot: "Not an automation script - because automation can run without accountability",
    matters: "Can we prove it?",
  },
  {
    is: "AI work with review gates",
    isNot:
      "Not just a workflow diagram - because diagrams show intended steps, not whether the work was evidenced, reviewed, stopped, or safe to claim",
    matters: "Can we stop it safely?",
  },
  {
    is: "AI work with role separation",
    isNot:
      "Not just an Agent SDK - because SDKs help agents act, but AIOS governs whether the work is trusted, reviewed, and allowed to be claimed",
    matters: "Can we say this is done without overclaiming?",
  },
  {
    is: "AI work safe to operationalize",
    isNot:
      "Not just a tool that lets agents work for humans - because real AI operations need control, evidence, and human authority",
    matters: "Can this survive real governance?",
  },
]

export default function HomePage() {
  return (
    <PageLayout>
      <HomepageGovernanceHero />

      <section className="border-b border-[#e5edf4] bg-[#fffaf0] py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#b45309]">
              Novice guide
            </p>
            <h2 className="break-words bg-gradient-to-r from-[#0f766e] via-[#10233f] to-[#f59e0b] bg-clip-text text-2xl font-semibold leading-tight text-transparent sm:text-3xl">
              AIOS makes agentic AI trustworthy.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#536274] sm:text-lg">
              Agent SDKs help AI do the work. AIOS governs whether the work can be trusted.
            </p>
          </div>

          <div className="mt-8 grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="min-w-0 overflow-hidden rounded-md border border-[#5eead4] bg-white shadow-sm">
              <div className="border-b border-[#c8f7ef] bg-[#f0fffb] px-4 py-3">
                <h3 className="break-words text-sm font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
                  What is AIOS
                </h3>
              </div>
              <div className="divide-y divide-[#e5edf4]">
                {novicePositioningRows.map((row) => (
                  <p key={row.is} className="min-h-20 break-words px-4 py-4 text-sm font-medium leading-6 text-[#10233f]">
                    {row.is}
                  </p>
                ))}
              </div>
            </div>

            <div className="min-w-0 overflow-hidden rounded-md border border-[#f59e0b] bg-white shadow-sm">
              <div className="border-b border-[#fde3b0] bg-[#fffaf0] px-4 py-3">
                <h3 className="break-words text-sm font-semibold uppercase tracking-[0.12em] text-[#b45309]">
                  What AIOS is not
                </h3>
              </div>
              <div className="divide-y divide-[#e5edf4]">
                {novicePositioningRows.map((row) => (
                  <p key={row.isNot} className="min-h-20 break-words px-4 py-4 text-sm leading-6 text-[#46566a]">
                    {row.isNot}
                  </p>
                ))}
              </div>
            </div>

            <div className="min-w-0 overflow-hidden rounded-md border border-[#10233f] bg-[#10233f] text-white shadow-sm">
              <div className="border-b border-white/15 px-4 py-3">
                <h3 className="break-words text-sm font-semibold uppercase tracking-[0.12em] text-[#a8dfe0]">
                  Why AIOS matters
                </h3>
              </div>
              <div className="divide-y divide-white/15">
                {novicePositioningRows.map((row) => (
                  <p key={row.matters} className="min-h-20 break-words px-4 py-4 text-sm font-medium leading-6">
                    {row.matters}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 max-w-3xl border-l-4 border-[#f59e0b] bg-white px-5 py-4 shadow-sm">
            <p className="break-words text-base font-semibold leading-7 text-[#10233f]">
              Agent SDKs help AI act. AIOS governs whether the work can be trusted, reviewed, and safely claimed.
            </p>
            <p className="mt-2 break-words text-sm leading-6 text-[#536274]">
              It turns AI execution into measurable, auditable, governance-ready operations.
            </p>
          </div>
        </div>
      </section>

      {/* AIOS Showcase */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-2">AI Operating System (AIOS)</h2>
          <p className="text-base text-muted-foreground mb-8 max-w-3xl">
            A working system for AI-enabled transformation governance. Not a product—a proof-of-concept 
            demonstrating how AI work can be traceable, governable, and evidence-based.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
              <CardTitle className="text-base">Layered Architecture</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Executive &amp; Intent → Routing &amp; Governance → Execution &amp; Validation →
                Evidence, State &amp; Business Runway. Human approval remains the release boundary.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Governance & Quality Gates</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Human-in-the-loop review, benchmark trace discipline, evidence standards for metrics, 
                and anti-fatigue design. Governance that enables speed by reducing ambiguity.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Cost & Usage Awareness</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Cost and usage evidence is quarantined unless explicitly verified as of a named source and timestamp.
                Budget checkpoints remain pending verified policy and telemetry integration.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Learning & Improvement Loop</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Daily headline feedback (what worked → continue, what failed → stop), knowledge capture 
                with metadata-first search, and harness/memory improvement. System learns from execution.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What This Is / Is Not */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold mb-4">What This Portfolio Is</h2>
            <p className="text-base text-muted-foreground mb-6">
              This is a personal professional evidence trail. It contains anonymized case studies, 
              selected governance patterns, and applied AI workflow experiments. The AIOS is a working 
              proof-of-concept, not a commercial product.
            </p>
            <p className="text-base text-foreground font-medium">
              This is not a consulting storefront, not a startup pitch, and not a public dump of private systems.
            </p>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-8">Core Capabilities</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">AI Orchestration</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Design and govern multi-agent AI systems with role-based routing, 
                decision gates, and cost-aware model selection.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Delivery Governance</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Build governance frameworks for AI-enabled delivery: benchmark traces, 
                source-of-truth principles, and stakeholder-safe controls.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Enterprise Transformation</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Bridge program management expertise with hands-on AI systems understanding 
                to lead transformation at scale.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-6">Explore</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Link 
              href="/architecture" 
              className="block p-6 rounded-lg border border-border hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">System Architecture</h3>
              <p className="text-sm text-muted-foreground">
                Four-group executive map: Executive &amp; Intent, Routing &amp; Governance,
                Execution &amp; Validation, and Evidence, State &amp; Business Runway.
              </p>
            </Link>

            <Link 
              href="/achievements" 
              className="block p-6 rounded-lg border border-border hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">Measured Results</h3>
              <p className="text-sm text-muted-foreground">
                Evidence-backed performance improvements with date context, baselines, and scope.
              </p>
            </Link>

            <Link 
              href="/portfolio" 
              className="block p-6 rounded-lg border border-border hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">Portfolio & Case Studies</h3>
              <p className="text-sm text-muted-foreground">
                Selected AI systems, governance patterns, and anonymized transformation work.
              </p>
            </Link>

            <Link 
              href="/about" 
              className="block p-6 rounded-lg border border-border hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">Professional Background</h3>
              <p className="text-sm text-muted-foreground">
                15+ years: data reliability → banking → cloud governance → AI orchestration. Why I can govern AI transformation.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 border-t border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Interested in working together?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            I'm actively exploring senior roles in AI/data transformation, delivery governance, 
            and enterprise technology modernization.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="https://www.linkedin.com/in/msararin" target="_blank">
                Connect on LinkedIn
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">View Full Profile</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
