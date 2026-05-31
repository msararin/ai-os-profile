import { PageLayout } from "@/components/page-layout"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const claimClasses = [
  {
    label: "Verified API/source-backed value",
    status: "Pending verification",
    detail: "No current OpenRouter API or billing source is connected to this deployed review surface.",
  },
  {
    label: "Manually observed screenshot",
    status: "Evidence only",
    detail: "Screenshots may inform review, but values are not hardcoded or treated as current telemetry.",
  },
  {
    label: "Historical snapshot",
    status: "Not live",
    detail: "Historical snapshot period: May 20–24, 2026; not live.",
  },
  {
    label: "Deprecated threshold",
    status: "Not active",
    detail: "Prior $15 / $25 / $30 / $50 labels are not implemented warning behavior.",
  },
]

const pendingItems = [
  "Current spend",
  "Current usage",
  "Budget limit",
  "Model-level cost allocation",
  "Billing period",
  "Warning and stop policy",
]

export default function InternalUsagePage() {
  return (
    <PageLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <Badge variant="outline">Trust quarantine</Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Usage & Budget Review
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            This is a read-only review surface. It does not display current usage, spend, model, budget,
            period, or threshold values without a verified source and timestamp.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:px-6 lg:px-8">
          <Alert className="border-yellow-500/40 bg-yellow-500/10">
            <AlertDescription className="font-medium text-foreground">
              Budget numbers pending verified Budget Burn Daily Report.
            </AlertDescription>
          </Alert>

          <Alert className="border-primary/30 bg-primary/5">
            <AlertDescription>
              Budget checkpoints are pending verified policy and telemetry integration. No automatic
              warning behavior is currently proven.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Operational Claim Classification</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {claimClasses.map((item) => (
                <div key={item.label} className="rounded-lg border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium text-foreground">{item.label}</p>
                    <Badge variant="secondary">{item.status}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Verification</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {pendingItems.map((item) => (
                <div key={item} className="rounded-lg border bg-muted/20 p-3 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Screenshot Evidence Boundary</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Manually observed provider screenshots may show different key, spend, and limit contexts.
              They remain review evidence only until a verified source, timestamp, key scope, and policy
              interpretation are recorded. This page does not invent budget policy from screenshots.
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  )
}
