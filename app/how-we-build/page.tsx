import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function HowWeBuildPage() {
  return (
    <PageLayout>
      {/* Header */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            How We Build
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Methodology, operational discipline, and lessons learned from building trustworthy AI systems.
          </p>
        </div>
      </section>

      {/* Under Construction Notice */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Alert className="border-primary/30 bg-primary/5">
            <AlertDescription className="text-base">
              <strong>Page under construction.</strong> Content is being migrated from Principles 
              and Achievement & Learning pages. During this migration, all existing pages remain accessible.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Placeholder Content */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-6">What This Page Will Show</h2>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Governance Methodology</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Operational principles that make AI work trustworthy: thin-slice delivery, 
                privacy architecture, benchmark traces, and human review gates.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Proven Patterns</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Metadata-first search, observable validation, budgeted multi-agent orchestration, 
                and escalation tiers for risk-aware execution.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Operational Lessons</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                What worked, what failed, and what governance rules came from real operational 
                experience building this system.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Maturity Progression</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                The journey from scattered tools and manual execution to governed workflow 
                with review gates, source-of-truth discipline, and benchmark-driven validation.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Current Pages Reference */}
      <section className="py-12 border-t border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-4">During Migration</h2>
          <p className="text-muted-foreground mb-6">
            While this page is being built, all current pages remain accessible:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Principles</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Governance principles for AI systems
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Achievement & Learning</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Learning journey, phases, and milestones
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
