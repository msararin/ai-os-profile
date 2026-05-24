import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Header */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            About
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Business-Technology-AI Bridge: I turn ambiguous transformation goals into executable systems of work.
          </p>
        </div>
      </section>

      {/* Core Story */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6 text-base text-muted-foreground">
            <p>
              My career started close to data and systems: SQL validation, ETL testing, EDW testing, 
              batch-flow analysis, and migration logic. That foundation taught me that transformation 
              risk often hides inside handoffs: wrong mappings, missed dependencies, unclear ownership, 
              unvalidated output, and decisions no one can trace.
            </p>

            <p>
              Over time, I moved into enterprise transformation: digital lending redesign, core banking 
              modernization, cloud migration governance, CCoE readiness, and multi-region delivery across 
              regulated environments.
            </p>

            <p className="font-medium text-foreground">
              What connects these experiences is one pattern: I create structure where complexity becomes 
              too expensive to manage informally.
            </p>

            <p>
              Today, I apply that same discipline to AI and data transformation. I do not position myself 
              as a machine learning engineer. My strength is making AI initiatives executable in real 
              organizations by connecting business goals, workflow reality, data readiness, governance, 
              privacy, risk visibility, and human accountability.
            </p>
          </div>
        </div>
      </section>

      {/* Five Evidence Pillars */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-8">Career Evidence Pillars</h2>
          
          <div className="grid gap-6">
            {/* Pillar 1 */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">Data Reliability Foundation</CardTitle>
                  <Badge variant="outline">Early Career</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3 italic">
                  Before AI governance, I learned governance from data reliability.
                </p>
                <p className="text-sm text-muted-foreground">
                  Early in my career, I worked close to the system layer: SQL validation, ETL testing, 
                  EDW testing, batch-flow analysis, and migration logic in core banking environments. 
                  That trained me to look beyond what appears correct on the screen and ask: did the 
                  data move correctly, transform correctly, reconcile correctly, and remain reliable 
                  through the full flow?
                </p>
              </CardContent>
            </Card>

            {/* Pillar 2 */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">Core Banking Modernization at Scale</CardTitle>
                  <Badge variant="outline">Banking</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3 italic">
                  I create operating rhythm across complex transformation.
                </p>
                <p className="text-sm text-muted-foreground">
                  In large-scale banking modernization work, I coordinated complex delivery across countries, 
                  vendors, components, and dependent teams. My contribution was not only tracking delivery. 
                  I helped create the governance rhythm: ownership rules, integration cadence, escalation paths, 
                  defect triage, and dependency visibility so multiple workstreams could move with less ambiguity 
                  and lower late-stage risk.
                </p>
                <p className="text-xs text-muted-foreground mt-3">
                  Context: Regional banking transformation, regulated banking environment
                </p>
              </CardContent>
            </Card>

            {/* Pillar 3 */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">Cloud Governance & CCoE Readiness</CardTitle>
                  <Badge variant="outline">Cloud</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3 italic">
                  I translate cloud ambition into decision-ready governance.
                </p>
                <p className="text-sm text-muted-foreground">
                  In cloud migration governance work, I helped turn a large strategic ambition into 
                  decision-ready inputs: portfolio assumptions, readiness signals, security constraints, 
                  compliance considerations, budget trade-offs, and migration roadmap logic. That work 
                  reinforced a principle I now apply to AI: scaling technology safely requires governance 
                  before acceleration.
                </p>
                <p className="text-xs text-muted-foreground mt-3">
                  Context: Enterprise CCoE readiness, banking cloud migration governance
                </p>
              </CardContent>
            </Card>

            {/* Pillar 4 */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">Digital Lending Transformation</CardTitle>
                  <Badge variant="outline">Product</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3 italic">
                  Transformation is workflow redesign, not just technology delivery.
                </p>
                <p className="text-sm text-muted-foreground">
                  In digital lending transformation, I worked across product, business, IT, security, and 
                  compliance to redesign a document-heavy lending journey into a more practical digital 
                  workflow. The lesson was clear: transformation succeeds when the workflow, controls, 
                  user experience, and operating model move together.
                </p>
                <p className="text-xs text-muted-foreground mt-3">
                  Context: Major Thai bank, regulated lending environment
                </p>
              </CardContent>
            </Card>

            {/* Pillar 5 */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">Human-Led AI Workflow Governance</CardTitle>
                  <Badge variant="outline">Current</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3 italic">
                  I now test on myself what I design for enterprise work.
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  My current AI portfolio work is a lightweight AI workflow and knowledge orchestration 
                  experiment. It is not a production enterprise platform. It is a practical learning 
                  artifact designed to test how AI-assisted work can become traceable, reviewable, 
                  governable, and less cognitively expensive.
                </p>
                <p className="text-sm text-muted-foreground">
                  The flow is simple: task intake → classification → routing → execution support → 
                  visibility → human review → decision log.
                </p>
                <p className="text-sm text-foreground font-medium mt-3">
                  The learning is bigger than the tools: AI adoption depends on workflow, governance, 
                  reviewability, operating structure, and human accountability — not only the model.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Lessons */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-6">What I've Learned</h2>
          
          <div className="max-w-3xl space-y-6 text-base text-muted-foreground">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <p className="text-sm font-medium text-foreground mb-2">
                  Data reliability taught me how systems fail silently.
                </p>
                <p className="text-sm text-muted-foreground">
                  Wrong mappings, unvalidated migrations, and invisible handoff failures.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <p className="text-sm font-medium text-foreground mb-2">
                  Transformation delivery taught me how organizations fail through unclear ownership.
                </p>
                <p className="text-sm text-muted-foreground">
                  Ambiguous scope, missing escalation paths, and decisions lost in handoffs.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <p className="text-sm font-medium text-foreground mb-2">
                  Cloud governance taught me that scaling needs controls.
                </p>
                <p className="text-sm text-muted-foreground">
                  Ambition without readiness, portfolio assumptions without validation, and speed without safety gates.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <p className="text-sm font-medium text-foreground mb-2">
                  AI taught me the same lesson again:
                </p>
                <p className="text-sm text-muted-foreground">
                  Without workflow, review, traceability, and accountability, intelligence becomes operational risk.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Employment Status */}
      <section className="py-12 bg-muted/30 border-t border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Currently Exploring</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Senior roles in AI/data transformation, delivery governance, and enterprise technology modernization.
          </p>
        </div>
      </section>
    </PageLayout>
  )
}
