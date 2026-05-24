import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const roleFit = [
  {
    title: "AI Transformation Lead",
    governance: 5,
    technical: 4,
    learning: 5,
    uniqueValue: "Bridges AI hype ↔ implementation reality",
    positioning: "I help organizations move AI from experiment to execution by connecting business goals, data readiness, technical constraints, and governance frameworks—drawing from my data systems foundation and active AI engineering upskilling.",
    why: [
      "15+ years structuring complex transformation work",
      "Technical foundation: SQL, ETL, data validation (millions of records)",
      "Active AI upskilling: RAG architecture, agentic workflows, Python automation",
      "Proven learning pattern: Data/QA → Banking → Cloud → AI Engineering"
    ]
  },
  {
    title: "AI Deployment Strategist",
    governance: 5,
    technical: 4,
    learning: 5,
    uniqueValue: "Designs deployment for organizational readiness",
    positioning: "I design deployment strategies that bridge technical capability and organizational readiness, with hands-on learning in RAG architecture, prompt orchestration, and multi-region delivery experience.",
    why: [
      "Multi-region delivery coordination experience",
      "System thinking: from SQL/COBOL batch flows to AI workflows",
      "Learning RAG prototyping, context governance, retrieval permissions",
      "Understands both technical constraints AND organizational change"
    ]
  },
  {
    title: "Manager, Strategy & Transformation Office",
    governance: 5,
    technical: 4,
    learning: 4,
    uniqueValue: "Transforms strategy into executable systems",
    positioning: "I structure transformation as executable systems, not PowerPoint strategy—combining technical foundation in data systems with 15+ years of program governance and current AI engineering growth.",
    why: [
      "Core banking modernization, digital lending transformation delivered",
      "Built reusable frameworks (test-data pipelines, governance templates)",
      "Technical credibility: not just coordinating, but understanding constraints",
      "CCoE governance: turned cloud ambition into decision-ready roadmaps"
    ]
  },
  {
    title: "Business Transformation Consultant",
    governance: 5,
    technical: 4,
    learning: 4,
    uniqueValue: "Consulting with technical credibility",
    positioning: "I advise on business-technology transformation with a technical foundation, not just frameworks—I grew FROM SQL/ETL/system analysis INTO consulting, giving me implementation credibility.",
    why: [
      "Grew from hands-on SQL/data validation into program leadership",
      "Credibility with both business AND engineering stakeholders",
      "Proven across banking, cloud, digital transformation domains",
      "Can design AND validate technical feasibility of transformation strategies"
    ]
  },
  {
    title: "Technology Enablement Lead",
    governance: 4,
    technical: 5,
    learning: 5,
    uniqueValue: "Creates reusable frameworks, not just training",
    positioning: "I enable technology adoption by creating reusable systems and frameworks teams can independently operate—from test-data pipelines to cloud governance templates to AI architecture patterns.",
    why: [
      "Built ETL test frameworks for core accounting migration",
      "Created governance templates (cloud, data, AI workflow patterns)",
      "Current: RAG architecture prototyping, automation design",
      "Pattern: learn fundamentals → create reusable systems → enable teams"
    ]
  }
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? "text-accent-foreground" : "text-muted-foreground"}>
          ⭐
        </span>
      ))}
    </div>
  )
}

export default function RoleFitPage() {
  return (
    <PageLayout>
      {/* Header */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            How I Fit Your Role
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Governance + Technical depth. Not just coordination—I build understanding.
          </p>
        </div>
      </section>

      {/* Core Positioning */}
      <section className="py-8 bg-primary/5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Card className="border-primary/30">
            <CardContent className="pt-6">
              <p className="text-base text-foreground font-medium mb-3">
                I'm a technology program leader with a technical foundation in data systems, 
                proven governance expertise, and active AI engineering upskilling.
              </p>
              <p className="text-sm text-muted-foreground">
                I grew from SQL/ETL/data validation into program leadership, and I'm now expanding 
                into AI transformation—learning RAG architecture, agentic workflows, and automation 
                design hands-on. My value is bridging business goals, technical constraints, and 
                governance frameworks to make transformation actually executable.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Technical Evidence */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-6">Technical Foundation (Not Governance-Only!)</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Early Career Technical</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <div>• SQL, Java-based ETL, data warehouse testing</div>
                <div>• COBOL/JCL batch flow analysis, transaction mapping</div>
                <div>• Data validation pipelines (millions of records)</div>
                <div>• Built reusable test-data frameworks</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Current AI/Technical Upskilling</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <div>• RAG architecture prototyping, context governance</div>
                <div>• Agentic AI workflows, prompt engineering</div>
                <div>• Python automation, API integration</div>
                <div>• GitHub, Cloudflare Workers, webhooks</div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-accent/10 border-accent-foreground/20">
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-foreground mb-2">
                Learning Pattern: Can learn fundamentals to harness new domains
              </p>
              <p className="text-sm text-muted-foreground">
                Data/QA → Banking Systems → Cloud Governance → AI Engineering
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Role Mappings */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-6">Target Role Fit Analysis</h2>
          
          <div className="grid gap-6">
            {roleFit.map((role, index) => (
              <Card key={index} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <CardTitle className="text-xl mb-2">{role.title}</CardTitle>
                      <p className="text-sm text-muted-foreground italic">
                        {role.uniqueValue}
                      </p>
                    </div>
                  </div>

                  {/* Fit Scores */}
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Governance</div>
                      <StarRating count={role.governance} />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Technical</div>
                      <StarRating count={role.technical} />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Learning</div>
                      <StarRating count={role.learning} />
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Positioning */}
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">One-Liner Positioning</h4>
                      <p className="text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-3">
                        "{role.positioning}"
                      </p>
                    </div>

                    {/* Why I Fit */}
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Why I Fit</h4>
                      <ul className="space-y-1.5">
                        {role.why.map((point, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground pl-4 border-l-2 border-accent-foreground/20">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-6 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Want a customized resume for your specific role?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                I'm happy to tailor my CV to highlight the most relevant experience for your requirements.
              </p>
              <a 
                href="mailto:msararin@gmail.com?subject=Customized Resume Request"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Request Customized CV
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  )
}
