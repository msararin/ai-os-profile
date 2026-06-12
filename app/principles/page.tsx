import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const principles = [
  {
    number: 1,
    title: "Governed execution over rushed execution",
    description:
      "Speed without governance creates rework and false confidence. Every AI-assisted output passes through a review gate before it counts as truth.",
    highlight: false,
  },
  {
    number: 2,
    title: "Single source of truth",
    description:
      "GPT KB and Git are the only places truth lives. UI surfaces, chat history, and AI memory are temporary — only what is committed counts.",
    highlight: false,
  },
  {
    number: 3,
    title: "Tools change; discipline doesn't",
    description:
      "AI tools change every quarter. The principles for using them — review gates, source of truth, scoped roles — must outlast any specific tool or vendor.",
    highlight: false,
  },
  {
    number: 4,
    title: "Depth control by design",
    description:
      "Private complexity stays unpublished. Public views show only what's audience-appropriate. The line between the two is intentional, not accidental.",
    highlight: false,
  },
  {
    number: 5,
    title: "Demonstrate maturity, not readiness",
    description:
      "This system shows how AI work can be governed. It does not claim to be production-ready, autonomous, or live-deployed. Operating reality is labeled honestly.",
    highlight: true,
  },
  {
    number: 6,
    title: "Sustainable operating model",
    description:
      "Designed for one person to run before scaling. Complexity that cannot be maintained by the operator becomes liability, not leverage.",
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
