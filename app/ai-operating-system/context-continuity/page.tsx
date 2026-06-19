import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const allowedDescription =
  "Context Continuity Cockpit is a design/spec surface for governed reusable AI context."

export const metadata: Metadata = {
  title: "Context Continuity Cockpit Design Spec | Sararin AIOS",
  description: allowedDescription,
  openGraph: {
    title: "Context Continuity Cockpit Design Spec",
    description: allowedDescription,
  },
}

const boundaryCards = [
  {
    title: "Design surface only",
    body: "The cockpit is specified as a review surface for reusable context. It is not specified as automatic memory or a production memory engine.",
  },
  {
    title: "Owner-reviewed context",
    body: "Memory is defined as reviewed reusable context. Sensitive context would require explicit owner approval before any promoted use.",
  },
  {
    title: "Expiry by default",
    body: "Project-state memory is specified to expire by default unless it is refreshed, re-reviewed, and still aligned with source evidence.",
  },
]

const lifecycle = [
  "A context candidate is proposed with source evidence, sensitivity, expiry, and intended use.",
  "The owner review step decides whether the candidate is rejected, parked, or approved for a bounded use.",
  "Approved context would need a usage receipt that states the purpose, caveat, and evidence boundary.",
  "Stale, disputed, or superseded context moves to a drift register before reuse is considered.",
]

const blockedCapabilities = [
  "automatic memory",
  "database persistence",
  "vector memory",
  "background ingestion",
  "autonomous memory promotion",
  "personal data capture",
  "ChatGPT memory integration",
  "client or user memory processing",
]

const specRules = [
  "Memory is not truth.",
  "Memory is reviewed reusable context.",
  "No silent memory promotion.",
  "No silent overwrite.",
  "Sensitive memory requires explicit owner approval.",
  "Memory cannot be used as public proof without external evidence.",
]

export default function ContextContinuityPage() {
  return (
    <PageLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">Design Specs</Badge>
            <Badge variant="outline">Design surface - not a live memory engine</Badge>
            <Badge variant="outline">Owner review required</Badge>
          </div>
          <p className="mt-5 text-sm font-medium text-muted-foreground">
            AI Operating System / Design Specs / Context Continuity
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Context Continuity Cockpit
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            {allowedDescription} It is defined to help review what context could be
            reused, when owner approval would be required, and where stale or
            sensitive context should be blocked.
          </p>
          <div className="mt-6 rounded-lg border border-amber-300/40 bg-amber-50 p-4 text-sm leading-6 text-amber-950 dark:border-amber-300/20 dark:bg-amber-950/20 dark:text-amber-100">
            This page describes a design/spec capability. It does not store real
            user context, display real user context, or implement active memory.
            Examples are illustrative only.
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20 py-10">
        <div className="mx-auto grid max-w-5xl gap-4 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {boundaryCards.map((card) => (
            <Card key={card.title}>
              <CardHeader>
                <CardTitle className="text-base">{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                {card.body}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-b border-border bg-background py-10">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Owner-reviewed lifecycle
            </h2>
            <div className="mt-5 space-y-3">
              {lifecycle.map((item, index) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-lg border border-border bg-card p-4"
                >
                  <span className="mt-0.5 text-xs font-semibold tabular-nums text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-6 text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-base">Specification boundary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
              <p>
                Expiry, approval, and non-promotion are specification rules, not
                deployed runtime guarantees.
              </p>
              <p>
                Memory-like context cannot be used as public proof unless external
                evidence independently supports the claim.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20 py-10">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Rules that stay visible</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
                {specRules.map((rule) => (
                  <li key={rule} className="flex gap-2">
                    <span aria-hidden="true" className="text-primary">
                      -
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Not implemented by this surface</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
                {blockedCapabilities.map((capability) => (
                  <li key={capability} className="flex gap-2">
                    <span aria-hidden="true" className="text-primary">
                      -
                    </span>
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-background py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-border bg-card p-5">
            <h2 className="text-base font-semibold text-foreground">
              Public claim boundary
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              The production surface shows a governed memory design/spec
              capability. It does not claim active automatic memory
              implementation, production memory storage, user data ingestion, or
              autonomous context promotion.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
