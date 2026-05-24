"use client"

import { useSession, signOut } from "next-auth/react"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export default function InternalDashboardPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      {/* Header */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Internal Dashboard
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                Operational cockpit for AI workflow governance
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-xs">
                Auth Protected
              </Badge>
              <Button 
                variant="outline" 
                onClick={() => {
                  console.log('[Dashboard] Sign-out initiated by user')
                  signOut({ 
                    callbackUrl: '/',
                    redirect: true 
                  })
                }}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* System Status */}
      <section className="py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Alert className="mb-6 bg-primary/5 border-primary/20">
            <AlertDescription>
              🔒 Authenticated as: <span className="font-medium">{session?.user?.email}</span>
            </AlertDescription>
          </Alert>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Portfolio Version
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">v1.0.0</div>
                <p className="text-xs text-muted-foreground mt-1">
                  sararin.ai public shell
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Deployment Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Live</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Vercel production
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Auth Layer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600">Active</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Middleware protecting /internal/*
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>Internal Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <a 
                  href="/internal/usage" 
                  className="block p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <h3 className="font-medium mb-1">Usage & Budget Tracking</h3>
                  <p className="text-sm text-muted-foreground">
                    Token usage, cost tracking, budget checkpoints
                  </p>
                </a>

                <a 
                  href="/internal/showcase" 
                  className="block p-4 rounded-lg border-2 border-[#00B494] hover:bg-[#00B494]/10 transition-colors"
                >
                  <h3 className="font-medium mb-1 text-[#00B494]">⭐ Performance Showcase</h3>
                  <p className="text-sm text-muted-foreground">
                    Executive-grade proof: 1,750x speedup, 100% accuracy, 0 violations
                  </p>
                </a>

                <a 
                  href="/internal/performance" 
                  className="block p-4 rounded-lg border border-border hover:border-accent-foreground/50 transition-colors"
                >\n                  <h3 className="font-medium mb-1">Multi-Agent Performance</h3>
                  <p className="text-sm text-muted-foreground">
                    Real production data: 2.3x speed, 653% ROI, $1.36/deliverable
                  </p>
                </a>

                <div className="block p-4 rounded-lg border border-border opacity-50">
                  <h3 className="font-medium mb-1">Model Routing</h3>
                  <p className="text-sm text-muted-foreground">
                    Role-based model selection (Coming soon)
                  </p>
                </div>

                <div className="block p-4 rounded-lg border border-border opacity-50">
                  <h3 className="font-medium mb-1">Benchmark Traces</h3>
                  <p className="text-sm text-muted-foreground">
                    Task completion evidence (Coming soon)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Privacy Boundary Notice */}
      <section className="py-8 bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-base">Privacy Architecture</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div>
                <span className="font-medium text-foreground">Public:</span> Homepage, About, Portfolio, Writing
                (anonymized case studies, no client names)
              </div>
              <div>
                <span className="font-medium text-foreground">Internal:</span> This dashboard, usage tracking, 
                model routing, benchmarks (auth-protected, not advertised publicly)
              </div>
              <div>
                <span className="font-medium text-foreground">Never Rendered:</span> API keys, OAuth secrets, 
                private notes, client-specific details, raw logs
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* System Info */}
      <section className="py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold mb-4">System Configuration</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Tech Stack</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <div>Next.js 15 (App Router)</div>
                <div>Radix UI + Tailwind CSS 4</div>
                <div>NextAuth.js 5 (Google OAuth)</div>
                <div>Better SQLite3</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Design System</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <div>สีมงคลวันศุกร์ palette</div>
                <div>Classic Blue #1F3A60 (primary)</div>
                <div>Mint Teal #00B494 (accent)</div>
                <div>Pastel Blue #E6EEF8 (secondary)</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Deployment</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <div>Platform: Vercel</div>
                <div>Domain: sararin.ai</div>
                <div>HTTPS: Automatic</div>
                <div>Auto-deploy: main branch</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Repository</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <div>GitHub: msararin/ai-os-profile</div>
                <div>Branch: main</div>
                <div>CI/CD: Deployment Preflight</div>
                <div>Version: v1.0.0</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
