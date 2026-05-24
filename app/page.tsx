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
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Sararin Muangsiri
            </h1>
            <Badge variant="outline" className="text-sm">
              Personal Portfolio
            </Badge>
          </div>
          <p className="text-xl text-muted-foreground mt-4 max-w-3xl">
            Applied AI Governance & Human-AI Operating Systems
          </p>
          <p className="text-lg text-muted-foreground mt-3 max-w-3xl">
            Senior Transformation Program Manager specializing in AI/data delivery governance, 
            human-AI workflow design, and enterprise technology modernization.
          </p>
          
          {/* Employment Status */}
          <Alert className="mt-6 max-w-3xl border-primary/30 bg-primary/5">
            <AlertDescription className="text-base">
              <strong>Currently exploring senior roles</strong> in AI/data transformation, 
              delivery governance, and enterprise technology programs.
            </AlertDescription>
          </Alert>

          <div className="mt-8 flex gap-4">
            <Button asChild size="lg">
              <Link href="/portfolio">View Portfolio</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">About Me</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What This Is / Is Not */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-6">About This Portfolio</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="text-green-600">✓</span> What This Is
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>• Personal professional portfolio showcasing AI governance capabilities</li>
                  <li>• Selected experiments from my applied AI learning practice</li>
                  <li>• Evidence of how I structure complex AI/data delivery work</li>
                  <li>• Bridge between transformation program management and AI orchestration</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="text-red-600">✗</span> What This Is NOT
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>• Not a consulting storefront or client services business</li>
                  <li>• Not a startup seeking funding or customers</li>
                  <li>• Not a full operational system dump (internal sections are auth-protected)</li>
                  <li>• Not claims that every experiment is production-ready</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="mt-6 text-sm text-muted-foreground italic max-w-3xl">
            I build and study how AI can work as part of a governed delivery system — not just as a chatbot, 
            but as a structured team of roles, workflows, decision gates, and evidence trails. This site 
            documents selected case studies and delivery patterns from my personal AI workflow practice.
          </p>
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
              href="/portfolio" 
              className="block p-6 rounded-lg border border-border hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">Portfolio Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Public view of selected AI systems, governance patterns, and case studies.
              </p>
            </Link>

            <Link 
              href="/architecture" 
              className="block p-6 rounded-lg border border-border hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">System Architecture</h3>
              <p className="text-sm text-muted-foreground">
                4-layer AI orchestration architecture: strategic intent, routing, execution, and truth storage.
              </p>
            </Link>

            <Link 
              href="/knowledge-sharing" 
              className="block p-6 rounded-lg border border-border hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">Writing & Thought Leadership</h3>
              <p className="text-sm text-muted-foreground">
                Public posts and reflections on AI transformation, delivery governance, and systems thinking.
              </p>
            </Link>

            <Link 
              href="/about" 
              className="block p-6 rounded-lg border border-border hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">Professional Background</h3>
              <p className="text-sm text-muted-foreground">
                Experience in transformation program management, financial services, and enterprise delivery.
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
