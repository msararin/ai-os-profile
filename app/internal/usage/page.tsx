import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function InternalUsagePage() {
  // Mock data - in production this would come from actual tracking
  const sessionStats = {
    date: "2026-05-24",
    tokensUsed: 122800,
    tokensBudget: 1000000,
    estimatedCost: 4.00,
    checkpointCost: 30.00,
    stopCost: 50.00,
  }

  const costPercentage = (sessionStats.estimatedCost / sessionStats.checkpointCost) * 100
  const tokenPercentage = (sessionStats.tokensUsed / sessionStats.tokensBudget) * 100

  const getAlertLevel = () => {
    if (sessionStats.estimatedCost >= sessionStats.checkpointCost) return "error"
    if (sessionStats.estimatedCost >= 25) return "warning"
    if (sessionStats.estimatedCost >= 15) return "info"
    return "success"
  }

  const alertLevel = getAlertLevel()

  return (
    <PageLayout>
      {/* Header */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Usage & Budget Tracking
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                Token usage, cost tracking, and budget checkpoints
              </p>
            </div>
            <Badge variant="outline" className="text-xs">
              Session {sessionStats.date}
            </Badge>
          </div>
        </div>
      </section>

      {/* Budget Alert */}
      <section className="py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {alertLevel === "success" && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">
                ✅ Well under budget checkpoint (${sessionStats.estimatedCost.toFixed(2)} / $
                {sessionStats.checkpointCost})
              </AlertDescription>
            </Alert>
          )}

          {alertLevel === "info" && (
            <Alert className="mb-6 bg-blue-50 border-blue-200">
              <AlertDescription className="text-blue-800">
                ℹ️ Approaching $15 info threshold (${sessionStats.estimatedCost.toFixed(2)} / $
                {sessionStats.checkpointCost})
              </AlertDescription>
            </Alert>
          )}

          {alertLevel === "warning" && (
            <Alert className="mb-6 bg-amber-50 border-amber-200">
              <AlertDescription className="text-amber-800">
                ⚠️ Warning: Approaching checkpoint (${sessionStats.estimatedCost.toFixed(2)} / $
                {sessionStats.checkpointCost})
              </AlertDescription>
            </Alert>
          )}

          {alertLevel === "error" && (
            <Alert className="mb-6 bg-red-50 border-red-200">
              <AlertDescription className="text-red-800">
                🚨 CHECKPOINT REACHED: ${sessionStats.estimatedCost.toFixed(2)} / $
                {sessionStats.checkpointCost} - Review before continuing
              </AlertDescription>
            </Alert>
          )}

          {/* Cost Overview */}
          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Session Cost
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${sessionStats.estimatedCost.toFixed(2)}
                </div>
                <div className="mt-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all" 
                    style={{ width: `${Math.min(costPercentage, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {costPercentage.toFixed(1)}% of checkpoint
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Checkpoint
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600">
                  ${sessionStats.checkpointCost}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Review threshold
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  STOP Limit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  ${sessionStats.stopCost}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Hard budget limit
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Remaining
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  ${(sessionStats.checkpointCost - sessionStats.estimatedCost).toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  To checkpoint
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Token Usage */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Token Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Session Tokens</span>
                    <span className="font-medium">
                      {sessionStats.tokensUsed.toLocaleString()} / 
                      {sessionStats.tokensBudget.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent-foreground transition-all" 
                      style={{ width: `${tokenPercentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {tokenPercentage.toFixed(2)}% of 1M token budget
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget Discipline */}
          <Card>
            <CardHeader>
              <CardTitle>Budget Discipline (FPV1 §10)</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div>
                <span className="font-medium text-foreground">$15 Info:</span> Informational notice, 
                continue normally
              </div>
              <div>
                <span className="font-medium text-foreground">$25 Warning:</span> Approaching checkpoint, 
                monitor closely
              </div>
              <div>
                <span className="font-medium text-foreground">$30 Checkpoint:</span> Pause and review 
                progress vs. remaining work
              </div>
              <div>
                <span className="font-medium text-foreground">$50 STOP:</span> Hard limit, do not exceed 
                without explicit approval
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Cost Breakdown (Coming Soon) */}
      <section className="py-8 bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold mb-4">Model Distribution</h2>
          <Card className="opacity-50">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                Per-model cost breakdown and usage statistics coming in Phase 2B.
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Claude Sonnet 4.5</span>
                  <span className="text-muted-foreground">Primary</span>
                </div>
                <div className="flex justify-between">
                  <span>Claude Opus</span>
                  <span className="text-muted-foreground">Strategic decisions</span>
                </div>
                <div className="flex justify-between">
                  <span>Delegation cost</span>
                  <span className="text-muted-foreground">Subagent tokens</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Session Summary */}
      <section className="py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold mb-4">Session Summary</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4 sm:grid-cols-3 text-sm">
                <div>
                  <div className="text-muted-foreground mb-1">Date</div>
                  <div className="font-medium">{sessionStats.date}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Duration</div>
                  <div className="font-medium">~2 hours</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Tasks Completed</div>
                  <div className="font-medium">15+ commits</div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="font-medium mb-3">Major Milestones</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✅ CI/CD fixed (Node 22 + better-sqlite3)</li>
                  <li>✅ KB Phase 2 complete (54 files)</li>
                  <li>✅ Design system applied (สีมงคลวันศุกร์)</li>
                  <li>✅ Homepage + About + Portfolio pages</li>
                  <li>✅ Robert's positioning critique integrated</li>
                  <li>✅ Critical name fix (Sararin Malaithong)</li>
                  <li>✅ sararin.ai deployed & live with HTTPS</li>
                  <li>✅ Internal dashboard + usage tracking</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  )
}
