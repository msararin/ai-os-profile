import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const statusCards = [
  {
    label: "Current public surface",
    value: "Public-safe governance page",
    detail: "This page explains how Lyn controls AI delivery work before making production claims.",
    tone: "bg-emerald-500/10 text-emerald-700",
  },
  {
    label: "Auth status",
    value: "Production auth not claimed",
    detail: "This page does not prove production auth is live and does not verify login.",
    tone: "bg-amber-500/10 text-amber-700",
  },
  {
    label: "Evidence status",
    value: "Local packets and gate receipts exist",
    detail: "The evidence is planning and review evidence, not production validation.",
    tone: "bg-primary/10 text-primary",
  },
  {
    label: "Next technical step",
    value: "Local-only implementation requires approval",
    detail: "Codex may implement locally only if Owner Gate separately approves that scope.",
    tone: "bg-sky-500/10 text-sky-700",
  },
]

const telemetryCards = [
  {
    label: "Governance Status",
    value: "Preparation completed",
    explanation:
      "Phase 0 and pre-work preparation packets were created and reviewed before code or production claims were made.",
  },
  {
    label: "Review Status",
    value: "Two review lenses completed",
    explanation:
      "The claim and boundary reviewer checked evidence discipline. The attention-load reviewer checked whether the process stayed useful instead of bureaucratic.",
  },
  {
    label: "Auth Claim Status",
    value: "Not claimed / not verified",
    explanation:
      "The page is intentionally honest: production auth is not claimed until production validation evidence exists.",
  },
  {
    label: "Owner Attention Model",
    value: "4-batch gate model adopted",
    explanation:
      "Owner decisions are batched at meaningful risk points instead of asking for approval after every small artifact.",
  },
  {
    label: "Next Technical Step",
    value: "Codex local-only implementation, if approved",
    explanation:
      "The next step is local code implementation only. It is not deployment, production validation, or a login verification claim.",
  },
  {
    label: "Still Blocked",
    value: "Deploy, production validation, login claim",
    explanation:
      "Deploy, production validation, sararin.ai login verification, and production Surface Runner claims remain blocked.",
  },
]

const governanceRoles = [
  {
    name: "Claim and boundary reviewer",
    internalName: "Prime Gate",
    description:
      "Checks whether the page and packet stay inside the evidence boundary and avoid unsupported claims.",
  },
  {
    name: "Owner-attention reviewer",
    internalName: "Opus Gate",
    description:
      "Checks whether the process is becoming too heavy and whether the next step is worth doing.",
  },
  {
    name: "Readability reviewer",
    internalName: "Surface Guild",
    description:
      "Turns internal governance language into a readable story for interviewers and portfolio readers.",
  },
  {
    name: "Evidence translator",
    internalName: "Data Team",
    description:
      "Turns local packet evidence into reader-friendly telemetry cards instead of raw logs.",
  },
  {
    name: "Page visibility checker",
    internalName: "Surface Runner",
    description:
      "Checks local page and menu visibility. It does not claim production validation.",
  },
  {
    name: "Implementation executor",
    internalName: "Codex",
    description:
      "Implements only approved local code changes and does not approve its own release.",
  },
]

const nonClaims = [
  "This page does not prove production auth is live.",
  "This page does not verify sararin.ai login.",
  "This page is not a protected internal dashboard.",
  "Production auth remains unverified until validation evidence exists.",
  "Surface Runner production validation has not been executed for this page.",
]

export default function InternalCockpitGovernancePage() {
  return (
    <PageLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <Link
            href="/architecture"
            className="mb-5 inline-flex text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            ← Back to Architecture
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">Public-safe portfolio surface</Badge>
            <Badge className="bg-amber-500/10 text-amber-700" variant="secondary">
              Production auth not claimed
            </Badge>
          </div>
          <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            AIOS Internal Cockpit Governance
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
            A public-safe view of how protected AI operations are planned, gated, and validated
            before production claims.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            This page shows Lyn&apos;s delivery judgment: implementation is scoped, reviewed, and
            evidence-bound before code changes, auth validation, deployment, or public claims.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statusCards.map((card) => (
              <Card key={card.label} className="rounded-lg">
                <CardHeader className="pb-3">
                  <Badge className={card.tone} variant="secondary">
                    {card.label}
                  </Badge>
                  <CardTitle className="text-base leading-6">{card.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{card.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 py-12">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              What this page shows
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              Governance before implementation claims
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              The internal cockpit and auth work is treated as a controlled delivery flow. The
              preparation packet defines boundaries, security/auth risks, future implementation
              scope, abort conditions, and evidence rules before any production claim is made.
            </p>
          </div>
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>What it demonstrates</CardTitle>
              <CardDescription>Interview-friendly delivery signals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                {[
                  "gated implementation discipline",
                  "claim boundary discipline",
                  "owner-attention batch model",
                  "compliance and anti-overprocess review",
                  "readability and telemetry translation",
                  "security/auth risk preparation",
                  "implementation packet design",
                  "evidence-first delivery thinking",
                ].map((item) => (
                  <div key={item} className="rounded-md bg-muted px-3 py-2">
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Why this matters for AI delivery
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">
            AI implementation is not only coding. Real AI delivery needs scope control, boundary
            discipline, security thinking, validation planning, role ownership, evidence quality,
            and honest claims. This surface shows how Lyn keeps those controls visible before
            implementation moves toward production.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Governance model
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              Clear roles, clear boundaries
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {governanceRoles.map((role) => (
              <Card key={role.name} className="rounded-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{role.name}</CardTitle>
                  <CardDescription>{role.internalName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{role.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Telemetry Snapshot
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              Reader-friendly evidence status
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
              These cards translate local planning and review evidence into plain language. They
              are not raw internal logs and they are not production validation claims.
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
              System Health is the public-safe entry point for telemetry navigation. The underlying
              internal surface remains protected and requires authentication.
            </p>
            <Link
              href="/architecture/system-health"
              className="mt-3 inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              View System Health and protected telemetry access boundary
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {telemetryCards.map((card) => (
              <Card key={card.label} className="rounded-lg">
                <CardHeader className="pb-3">
                  <Badge variant="outline">{card.label}</Badge>
                  <CardTitle className="text-base leading-6">{card.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{card.explanation}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Alert className="border-amber-500/40 bg-amber-500/5">
            <AlertTitle>Auth boundary and non-claims</AlertTitle>
            <AlertDescription>
              <ul className="mt-2 grid gap-2">
                {nonClaims.map((claim) => (
                  <li key={claim}>{claim}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Current status and next step</CardTitle>
              <CardDescription>Local evidence, not a production claim</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                The current evidence shows that governance preparation and gate reviews exist. The
                next possible technical step is local-only Codex implementation, if separately
                approved by the owner. That still would not mean deploy, production validation, or
                login verification.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Evidence source note</CardTitle>
              <CardDescription>Public-safe summary of local packets</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                Evidence summarized here comes from local Phase 0 and pre-work preparation packets,
                plus claim/boundary and attention-load review receipts. Internal filenames are
                intentionally not required to understand the page.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  )
}
