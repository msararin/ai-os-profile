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
          <p className="text-xl text-muted-foreground mb-6">
            AI/Data Transformation Governance Portfolio
          </p>
          
          <p className="text-2xl font-semibold text-primary mt-6 mb-4">
            I create structure where transformation is messy.
          </p>
          
          <div className="space-y-4 text-base text-muted-foreground max-w-3xl">
            <p>
              My work sits at the intersection of business, technology, data, governance, and execution. 
              I help turn ambiguous transformation goals into executable systems of work: clear ownership, 
              decision rhythm, delivery visibility, risk controls, and measurable readiness.
            </p>
            
            <p>
              My career started in data reliability and system validation, then evolved into digital lending, 
              core banking modernization, cloud governance, and multi-region transformation delivery.
            </p>
            
            <p>
              Today, I apply the same governance discipline to AI/data transformation: workflow design, 
              human review, decision traceability, source-of-truth control, privacy boundaries, and 
              operational adoption.
            </p>
          </div>
          
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
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold mb-4">About This Portfolio</h2>
            <p className="text-base text-muted-foreground mb-6">
              This portfolio is a personal professional evidence trail. It contains anonymized case studies, 
              selected governance patterns, and applied AI workflow experiments.
            </p>
            <p className="text-base text-foreground font-medium">
              This is not a consulting storefront, not a startup pitch, and not a public dump of internal systems.
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
