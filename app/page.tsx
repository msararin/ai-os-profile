import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function HomePage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-2">
            Sararin Malaithong
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-4xl">
            A live AI Operating System showcase — showing how I structure AI work with governance, role routing, evidence discipline, and measurable delivery practices, not just AI outputs.
          </p>
          
          <p className="text-2xl font-semibold text-primary mt-6 mb-4">
            I create structure where transformation is messy.
          </p>
          
          <div className="space-y-4 text-base text-muted-foreground max-w-3xl">
            <p>
              This portfolio demonstrates a working AI Operating System (AIOS) for governed transformation work. 
              It shows architecture, governance, cost awareness, learning loops, and evidence discipline—not just theory.
            </p>
            
            <p>
              I'm a transformation and program governance leader with 15+ years turning ambiguous goals into 
              executable systems. My background: data reliability → banking modernization → cloud governance → 
              AI orchestration. Today I build and govern AI systems that prove governance can enable speed, 
              not only control it.
            </p>
          </div>
          
          {/* Employment Status */}
          <Alert className="mt-6 max-w-3xl border-primary/30 bg-primary/5">
            <AlertDescription className="text-base">
              <strong>Currently exploring senior roles</strong> in AI/data transformation, 
              delivery governance, and enterprise technology programs.
            </AlertDescription>
          </Alert>

          <div className="mt-8 flex gap-4 flex-wrap">
            <Button asChild size="lg">
              <Link href="/architecture">View AIOS Architecture</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/achievements">See Measured Results</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">About Me</Link>
            </Button>
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
