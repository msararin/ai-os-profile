"use client"

import { useEffect, useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ShowcasePage() {
  // Count-up animation for ROI stat only (Opus recommendation: single dramatic moment)
  const [roiCount, setRoiCount] = useState(0)
  const targetROI = 653

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Ease-out animation
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.floor(easeOut * targetROI)
      
      setRoiCount(currentValue)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [])

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative min-h-[600px] bg-gradient-to-b from-[#1F3A60] to-[#162A48]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Data Validation Badge */}
          <div className="flex justify-end mb-6">
            <Badge 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white text-xs"
            >
              Data validated: 2026-05-24 | 15 production queries
            </Badge>
          </div>

          {/* Hero Content */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4 sm:text-6xl">
              Performance Excellence Showcase
            </h1>
            <p className="text-xl text-white/85 max-w-3xl mx-auto">
              Real-World Production Results
            </p>
          </div>

          {/* Stat Cards - 3 columns */}
          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {/* Card 1: Speed Improvement - Static */}
            <Card className="bg-white border-none shadow-lg hover:shadow-xl hover:border-[#00B494] hover:border-2 transition-all duration-300">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="text-[#00B494] text-5xl font-bold mb-3">
                  2.3x
                </div>
                <div className="text-[#1F3A60] text-lg font-medium mb-2">
                  Speed Improvement
                </div>
                <div className="text-sm text-muted-foreground">
                  Multi-agent parallel execution
                </div>
              </CardContent>
            </Card>

            {/* Card 2: ROI - Animated Count-up (ONLY animated stat per Opus) */}
            <Card className="bg-white border-2 border-[#00B494] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="text-[#00B494] text-5xl font-bold mb-3">
                  {roiCount}%
                </div>
                <div className="text-[#1F3A60] text-lg font-medium mb-2">
                  Return on Investment
                </div>
                <div className="text-sm text-muted-foreground">
                  Cost efficiency + speed gains
                </div>
              </CardContent>
            </Card>

            {/* Card 3: KB Speedup - Static */}
            <Card className="bg-white border-none shadow-lg hover:shadow-xl hover:border-[#00B494] hover:border-2 transition-all duration-300">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="text-[#00B494] text-5xl font-bold mb-3">
                  1,750x
                </div>
                <div className="text-[#1F3A60] text-lg font-medium mb-2">
                  Faster Search
                </div>
                <div className="text-sm text-muted-foreground">
                  KB Memory benchmark (MCP)
                </div>
              </CardContent>
            </Card>
          </div>

          {/* At a Glance Summary (Opus recommendation) */}
          <div className="mt-12 max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <p className="text-white/90 text-lg leading-relaxed text-center">
              We tested parallel vs sequential execution across real production workloads. 
              Parallel multi-agent architecture delivered <span className="font-semibold text-[#00B494]">2.3x speed improvement</span> and{" "}
              <span className="font-semibold text-[#00B494]">50% cost reduction</span> per deliverable. 
              ROI: <span className="font-semibold text-[#00B494]">653%</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Grid Section */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1F3A60] mb-3">
              Key Performance Metrics
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Measured results from production workloads (Session 2026-05-24)
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Efficiency */}
            <Card className="border-[#00B494]/20 hover:border-[#00B494] transition-colors">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">⚡</div>
                  <div className="flex-1">
                    <div className="text-2xl font-bold text-[#00B494] mb-1">2.3x</div>
                    <div className="text-sm font-medium text-[#1F3A60] mb-1">Efficiency Gain</div>
                    <div className="text-xs text-muted-foreground">
                      90 min sequential → 18.5 min parallel
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cost Savings */}
            <Card className="border-[#00B494]/20 hover:border-[#00B494] transition-colors">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">💰</div>
                  <div className="flex-1">
                    <div className="text-2xl font-bold text-[#00B494] mb-1">50%</div>
                    <div className="text-sm font-medium text-[#1F3A60] mb-1">Cost Reduction</div>
                    <div className="text-xs text-muted-foreground">
                      $2.71 → $1.36 per deliverable
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Time Saved */}
            <Card className="border-[#00B494]/20 hover:border-[#00B494] transition-colors">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">⏱️</div>
                  <div className="flex-1">
                    <div className="text-2xl font-bold text-[#00B494] mb-1">71.5 min</div>
                    <div className="text-sm font-medium text-[#1F3A60] mb-1">Time Saved</div>
                    <div className="text-xs text-muted-foreground">
                      Per session vs sequential
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Accuracy */}
            <Card className="border-[#00B494]/20 hover:border-[#00B494] transition-colors">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">✅</div>
                  <div className="flex-1">
                    <div className="text-2xl font-bold text-[#00B494] mb-1">100%</div>
                    <div className="text-sm font-medium text-[#1F3A60] mb-1">Test Accuracy</div>
                    <div className="text-xs text-muted-foreground">
                      15/15 KB search queries passed
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy */}
            <Card className="border-[#00B494]/20 hover:border-[#00B494] transition-colors">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🔒</div>
                  <div className="flex-1">
                    <div className="text-2xl font-bold text-[#00B494] mb-1">0</div>
                    <div className="text-sm font-medium text-[#1F3A60] mb-1">Privacy Violations</div>
                    <div className="text-xs text-muted-foreground">
                      3-layer architecture (85% protected)
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Latency */}
            <Card className="border-[#00B494]/20 hover:border-[#00B494] transition-colors">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🚀</div>
                  <div className="flex-1">
                    <div className="text-2xl font-bold text-[#00B494] mb-1">0.027s</div>
                    <div className="text-sm font-medium text-[#1F3A60] mb-1">Search Latency</div>
                    <div className="text-xs text-muted-foreground">
                      35-40s manual → instant automated
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Evidence Section */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1F3A60] mb-3">
              How We Achieved These Results
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Multi-Agent Orchestration */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold text-[#1F3A60] mb-4">
                  Multi-Agent Parallel Execution
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex gap-3">
                    <span className="text-[#00B494] font-medium">Before:</span>
                    <span>Sequential task execution (90 minutes)</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#00B494] font-medium">After:</span>
                    <span>3-agent parallel batches (18.5 minutes)</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#00B494] font-medium">Method:</span>
                    <span>Dependency analysis → independent parallel execution</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#00B494] font-medium">Result:</span>
                    <span>2.3x speed, 50% cost reduction, 653% ROI</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Badge variant="outline" className="text-xs">
                    See: Multi-Agent Performance Analysis Report
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* KB Memory System */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold text-[#1F3A60] mb-4">
                  Thin-Slice Harness Engineering
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex gap-3">
                    <span className="text-[#00B494] font-medium">Phase 1:</span>
                    <span>4 files (2 hours) → Proved approach works</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#00B494] font-medium">Phase 4:</span>
                    <span>54 files validated → 100% accuracy baseline</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#00B494] font-medium">Phase 5:</span>
                    <span>365 files, MCP server, production-ready</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#00B494] font-medium">Result:</span>
                    <span>1,750x speedup, 0 rework, 12 hours total</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Badge variant="outline" className="text-xs">
                    See: KB Memory Benchmark Showcase
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Methodology Note */}
          <div className="mt-12 text-center">
            <Card className="bg-[#1F3A60]/5 border-[#1F3A60]/20">
              <CardContent className="pt-6 pb-6">
                <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
                  <span className="font-medium text-[#1F3A60]">Methodology:</span> All metrics measured from real production workloads 
                  (Session 2026-05-24). Multi-agent performance: 3 batches × 3 agents each. KB Memory: 15 production test queries 
                  validated against Phase 4A baseline. See <a href="/internal/architecture" className="text-[#00B494] hover:underline">
                  /internal/architecture</a> for detailed thin-slice approach.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
