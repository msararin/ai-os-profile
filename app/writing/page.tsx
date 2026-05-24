import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const articles = [
  {
    id: "ai-governance-in-practice",
    title: "AI Governance in Practice",
    subtitle: "Moving from AI strategy to operational execution",
    category: "AI Governance",
    description: "How organizations move from strategic AI ambition to execution-ready governance structures. Explores decision frameworks, risk ownership, privacy enforcement, and human review gates that make AI adoption sustainable in regulated environments.",
    readTime: "12 min read",
    status: "Coming Soon",
  },
  {
    id: "building-transformation-frameworks",
    title: "Building Transformation Frameworks",
    subtitle: "Structure patterns for managing complex change",
    category: "Transformation",
    description: "Practical frameworks for coordinating multi-workstream transformation programs. Covers ownership clarity, dependency mapping, escalation paths, integration cadence, and governance rhythms that reduce late-stage risk in enterprise delivery.",
    readTime: "10 min read",
    status: "Coming Soon",
  },
  {
    id: "from-banking-to-ai",
    title: "From Banking to AI",
    subtitle: "What data reliability taught me about AI governance",
    category: "Career Journey",
    description: "Lessons from core banking systems, ETL validation, and migration testing that now shape how I approach AI workflow governance. The connection between data reliability discipline and AI operational accountability.",
    readTime: "8 min read",
    status: "Coming Soon",
  },
]

export default function WritingPage() {
  return (
    <PageLayout>
      {/* Header */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Technical Writing & Lessons
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Practical insights from transformation delivery, governance patterns, and applied AI learning.
          </p>
        </div>
      </section>

      {/* Article Cards */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {articles.map((article) => (
              <Card key={article.id} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {article.category}
                        </Badge>
                        <Badge 
                          variant="secondary" 
                          className="text-xs bg-accent text-accent-foreground"
                        >
                          {article.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl mb-1">{article.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{article.subtitle}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-muted-foreground mb-4">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-sm text-muted-foreground">
                      {article.readTime}
                    </span>
                    <span className="text-sm text-primary font-medium">
                      Article in development
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Writing Philosophy */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-6">Writing Philosophy</h2>
          
          <div className="max-w-3xl space-y-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <p className="text-sm font-medium text-foreground mb-2">
                  Theory follows practice
                </p>
                <p className="text-sm text-muted-foreground">
                  I write about patterns I've executed, not theoretical frameworks. Every article grounds in real delivery context.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <p className="text-sm font-medium text-foreground mb-2">
                  Governance is executable, not aspirational
                </p>
                <p className="text-sm text-muted-foreground">
                  Frameworks should produce decisions, not discussion. I focus on what makes transformation work in regulated environments.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <p className="text-sm font-medium text-foreground mb-2">
                  Lessons transfer across domains
                </p>
                <p className="text-sm text-muted-foreground">
                  Data reliability principles apply to AI governance. Banking transformation patterns apply to cloud migration. Structure matters more than technology.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 border-t border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">More content coming soon</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These articles are currently in development. Check back soon for insights on AI governance, transformation frameworks, and delivery patterns from regulated environments.
          </p>
        </div>
      </section>
    </PageLayout>
  )
}
