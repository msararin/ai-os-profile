import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const evidencePractices = [
  "Separate observed evidence from assumptions before presenting progress.",
  "Name constraints early so readers can see what is still unresolved.",
  "Keep public wording aligned with what has actually been checked.",
  "Use review points to slow down claims that sound complete too early.",
]

const openQuestions = [
  "Which evidence belongs in the public story, and which should stay internal?",
  "How much detail helps a reader without exposing private operating context?",
  "What would be needed before this becomes a completed case study?",
]

const nonClaims = [
  "Not a completed case study.",
  "No execution closeout claim.",
  "No production validation claim.",
  "No enterprise validation claim.",
  "No independent validation claim.",
  "No provider-backed validation claim.",
  "No readiness, Level 4, or v5.1 claim.",
]

export default function EvidenceDisciplineCaseStudyPage() {
  return (
    <PageLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <Link href="/case-studies" className="mb-5 inline-flex text-sm font-medium text-primary hover:underline">
            Back to Case Studies
          </Link>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">AI-assisted delivery</Badge>
            <Badge variant="outline">In progress</Badge>
          </div>
          <h1 className="mt-4 max-w-5xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Evidence Discipline for AI-Assisted Delivery
          </h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-muted-foreground sm:text-lg">
            An in-progress case study on how delivery evidence, assumptions, and constraints are
            handled in AI-assisted work before the story is treated as complete.
          </p>
          <Alert className="mt-6 border-primary/25 bg-primary/5">
            <AlertDescription className="text-sm leading-6">
              This page is a public-safe work-in-progress narrative. It does not claim a completed
              case study, completed delivery outcome, production validation, or enterprise validation.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
              <p>
                The case explores a delivery context where AI assistance helped move work forward,
                but the public story still needed evidence discipline before any stronger claim could
                be made.
              </p>
              <p>
                The useful lesson is not that the work is finished. The useful lesson is how teams
                can keep evidence, assumptions, and constraints visible while a story is still forming.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Why This Exists</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
              <p>
                AI-assisted work can create confident-looking progress before the evidence is ready.
                That makes public communication risky: a surface may look close to complete while
                important assumptions, constraints, or review gaps still need to be named.
              </p>
              <p>
                This write-up turns that risk into the case-study subject: how to make progress
                visible without presenting unfinished work as a finished result.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-y border-border bg-muted/25 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-wide text-primary">Evidence / What Changed</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              How the public story was narrowed
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              These cards separate the blockage, available evidence, and narrowed recovery path before
              any stronger case-study claim is made.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>What Was Blocked</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                The public case-study path could not be treated as complete while the surface,
                evidence, and claim boundary were still out of sync.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>What Evidence Existed</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                There were working artifacts, review notes, route checks, and public-surface
                observations, but they needed to be organized into a reader-safe narrative.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>What Was Recovered Using Available Resources</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                The public story was narrowed into an in-progress case-study path using existing
                surfaces and evidence, without claiming that the full case is finished.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Scope of This Write-Up</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
              <p>
                This page covers the evidence-discipline pattern: how the story is shaped, what is
                visible to readers, and what remains unresolved.
              </p>
              <p>
                It does not evaluate long-term outcomes, production operation, enterprise use, or
                whether the broader delivery work should be considered complete.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What Remains In Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
              {openQuestions.map((question) => (
                <p key={question}>{question}</p>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-y border-primary/20 bg-primary/5 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>What This Demonstrates So Far</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm leading-6 text-muted-foreground md:grid-cols-2">
              {evidencePractices.map((practice) => (
                <div key={practice} className="rounded-md border border-primary/20 bg-background px-4 py-3">
                  {practice}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <Card className="border-destructive/20">
            <CardHeader>
              <CardTitle>What This Does Not Claim</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 text-sm leading-6 text-muted-foreground">
              {nonClaims.map((claim) => (
                <div key={claim} className="rounded-md border border-border bg-muted/25 px-3 py-2">
                  {claim}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Status / Next Step</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              Keep this case marked as in progress until the public narrative, evidence boundary,
              and review path are stable enough for a stronger case-study claim.
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  )
}
