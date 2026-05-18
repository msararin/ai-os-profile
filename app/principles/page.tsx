import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const principles = [
  {
    number: 1,
    title: "Governed execution over rushed execution",
    description:
      "System thinking and design discipline take precedence over operational speed. Rushed execution without governance creates technical debt and architectural drift.",
    highlight: false,
  },
  {
    number: 2,
    title: "Single source of truth",
    description:
      "Robert KB + Git serves as the canonical reference for all decisions, documentation, and version control. No shadow systems, no undocumented changes.",
    highlight: false,
  },
  {
    number: 3,
    title: "Tools change; discipline doesn't",
    description:
      "AI tools, frameworks, and platforms will evolve. The governance principles that guide their use must remain stable and adaptable.",
    highlight: false,
  },
  {
    number: 4,
    title: "Depth control by design",
    description:
      "Internal and external visibility layers are intentional. Not everything needs to be public, but the boundary must be explicit.",
    highlight: false,
  },
  {
    number: 5,
    title: "Demonstrate maturity, not readiness",
    description:
      "This system demonstrates governance maturity and system thinking. It does not claim operational or production readiness where none exists.",
    highlight: true,
  },
  {
    number: 6,
    title: "Sustainable operating model",
    description:
      "The system is designed to be operable by one person first, then scalable later. Complexity that cannot be maintained becomes risk.",
    highlight: false,
  },
]

export default function PrinciplesPage() {
  return (
    <PageLayout>
      {/* Header */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Governance Principles
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Six principles that guide the design and operation of this AI
            orchestration system.
          </p>
        </div>
      </section>

      {/* Principles Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {principles.map((principle) => (
              <Card
                key={principle.number}
                className={
                  principle.highlight
                    ? "border-primary/50 bg-primary/5 ring-1 ring-primary/20"
                    : "border-border bg-card"
                }
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                        principle.highlight
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {principle.number}
                    </span>
                    <CardTitle className="text-base font-semibold leading-snug text-foreground">
                      {principle.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pl-16">
                  <p className="text-sm text-muted-foreground">
                    {principle.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Note */}
      <section className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <blockquote className="border-l-4 border-primary pl-6">
            <p className="text-lg font-medium text-foreground">
              &ldquo;AI orchestration is program management. Tools change.
              Governance discipline doesn&apos;t.&rdquo;
            </p>
          </blockquote>
          <p className="mt-6 text-sm text-muted-foreground">
            These principles are not aspirational — they reflect the actual
            design decisions embedded in this system. They will evolve as the
            system matures, but the commitment to governance-first thinking
            remains constant.
          </p>
        </div>
      </section>
    </PageLayout>
  )
}
