import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            AI Orchestration Governance
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            A portfolio case study on designing governance, visibility, and
            decision flow for AI-assisted work systems.
          </p>
          <p className="mt-2 text-sm font-medium text-primary">
            Tools change. Governance discipline doesn&apos;t.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/architecture">View Architecture</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/principles">View Principles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Executive Summary
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium text-primary">
                  What this IS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  A curated portfolio surface demonstrating governance maturity
                  and system design.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium text-primary">
                  What this is NOT
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  A dispatcher or AI cockpit with live backend integration.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium text-primary">
                  Why it matters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  AI work without governance creates drift, false confidence,
                  and unreviewable output.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* System State */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            System State
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Current State
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5 shrink-0 bg-primary/10 text-primary">
                      Existing
                    </Badge>
                    <span className="text-muted-foreground">
                      Robert KB + Git = source of truth
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5 shrink-0 bg-primary/10 text-primary">
                      Existing
                    </Badge>
                    <span className="text-muted-foreground">
                      Cockpit governance principles v0.3 + R1 committed
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5 shrink-0 bg-primary/10 text-primary">
                      Drafted
                    </Badge>
                    <span className="text-muted-foreground">
                      Lean Value Tree v0.1 drafted
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5 shrink-0 bg-primary/10 text-primary">
                      Existing
                    </Badge>
                    <span className="text-muted-foreground">
                      AI OS architecture direction locked
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5 shrink-0 bg-primary/10 text-primary">
                      Existing
                    </Badge>
                    <span className="text-muted-foreground">
                      Execution surfaces exist (optimize-worker, Hermes, Codex)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5 shrink-0 bg-amber-500/10 text-amber-700">
                      Drafted
                    </Badge>
                    <span className="text-muted-foreground">
                      Profile site in progress
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  To-Be State
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5 shrink-0 bg-amber-500/10 text-amber-700">
                      Planned
                    </Badge>
                    <span className="text-muted-foreground">
                      Public-facing AI Orchestration Governance profile
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5 shrink-0 bg-amber-500/10 text-amber-700">
                      Planned
                    </Badge>
                    <span className="text-muted-foreground">
                      Architecture, principles, LVT shown clearly
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5 shrink-0 bg-amber-500/10 text-amber-700">
                      Planned
                    </Badge>
                    <span className="text-muted-foreground">
                      Internal/external depth control
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5 shrink-0 bg-muted-foreground/20 text-muted-foreground">
                      TBD
                    </Badge>
                    <span className="text-muted-foreground">
                      Active cockpit
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5 shrink-0 bg-muted-foreground/20 text-muted-foreground">
                      TBD
                    </Badge>
                    <span className="text-muted-foreground">
                      Backend proxy, Opus integration
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5 shrink-0 bg-muted-foreground/20 text-muted-foreground">
                      TBD
                    </Badge>
                    <span className="text-muted-foreground">
                      Supernova demo, monetization tracking
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Governance Thesis */}
      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Governance Thesis
          </h2>
          <div className="mt-8 space-y-6">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                1
              </div>
              <div>
                <h3 className="font-medium text-foreground">
                  Source of truth matters
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Only committed knowledge becomes truth.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                2
              </div>
              <div>
                <h3 className="font-medium text-foreground">
                  Status must be actionable
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Every flag has owner, action, review, state — otherwise it is
                  documentation trail, not feedback loop.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                3
              </div>
              <div>
                <h3 className="font-medium text-foreground">
                  AI output is not truth until reviewed and committed
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Generated content requires human review before becoming
                  canonical.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
