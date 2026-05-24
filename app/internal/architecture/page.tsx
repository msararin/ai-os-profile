"use client"

import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const architecturePrinciples = [
  {
    icon: "🎯",
    title: "Thin-Slice Harness Engineering",
    description: "Start with smallest testable increment, prove value, expand systematically",
    example: "KB Memory: 4 files → 54 files → 365 files",
    value: "Zero rework, 12 hours total, 1,750x improvement",
    phases: [
      { phase: "Phase 1", scope: "4 files", time: "2 hours", outcome: "Proved approach works" },
      { phase: "Phase 4", scope: "54 files", time: "5 hours", outcome: "100% accuracy baseline" },
      { phase: "Phase 5", scope: "365 files", time: "3 hours", outcome: "Production-ready MCP server" }
    ]
  },
  {
    icon: "🔒",
    title: "3-Layer Privacy Architecture",
    description: "Defense in depth: Allowlist → Path blocking → Metadata search",
    example: "KB Memory privacy protection",
    value: "0 privacy violations, 85% of KB auto-protected (311/365 files)",
    layers: [
      { layer: "Layer 1", method: "Explicit allowlist", coverage: "54 HOT files curated" },
      { layer: "Layer 2", method: "Path-based blocking", coverage: "06_private_raw/ auto-blocked" },
      { layer: "Layer 3", method: "kb_layer metadata", coverage: "HOT/WARM/COLD classification" }
    ]
  },
  {
    icon: "⚡",
    title: "Multi-Agent Orchestration with Budget Discipline",
    description: "Parallel task execution with decision gates at $15/$25/$30/$50 checkpoints",
    example: "Session 2026-05-24: 3 batches × 3 agents",
    value: "2.3x speed, 50% cost reduction, 653% ROI",
    pattern: [
      { step: "Dependency analysis", action: "Identify independent tasks" },
      { step: "Parallel delegation", action: "3 agents run simultaneously" },
      { step: "Budget checkpoints", action: "$30 pause for CEO approval" },
      { step: "Incremental delivery", action: "Each agent delivers standalone value" }
    ]
  },
  {
    icon: "🔍",
    title: "Metadata-First Search (No Vector Embeddings)",
    description: "YAML frontmatter + ripgrep = 100% accuracy without ML costs",
    example: "KB search with kb_layer + kb_type filters",
    value: "0.027s latency, deterministic results, zero ML inference cost",
    approach: [
      { component: "Metadata", detail: "YAML frontmatter in every file" },
      { component: "Search engine", detail: "Ripgrep (Rust-based, fast)" },
      { component: "Filters", detail: "kb_layer (HOT/WARM/COLD) + kb_type (profile/project/skill)" },
      { component: "Result", detail: "Exact matches, no hallucinations, 100% reproducible" }
    ]
  },
  {
    icon: "📊",
    title: "Observable Validation System",
    description: "Every test produces JSON trace artifact for audit trail",
    example: "Phase 4A: 15 test queries → 15 JSON files with metrics",
    value: "Reproducible benchmarks, confidence scoring, regression detection",
    artifacts: [
      { artifact: "Test traces", content: "Query, results, latency, timestamp" },
      { artifact: "Benchmark metrics", content: "Accuracy %, false positive rate, coverage" },
      { artifact: "Confidence scores", content: "Per-query reliability assessment" },
      { artifact: "Git history", content: "Every phase committed with evidence" }
    ]
  },
  {
    icon: "👥",
    title: "CEO Escalation Tiers (Delegation Framework)",
    description: "Tier 1 (Agents) → Tier 2 (Opus) → Tier 3 (CEO) for decision routing",
    example: "Only strategic decisions + budget approvals reach CEO",
    value: "CEO time protected, agents autonomous for 80% of work",
    tiers: [
      { tier: "Tier 1", handler: "Specialist Agents", scope: "Docs, bugs, content, UI implementation" },
      { tier: "Tier 2", handler: "Opus (Architecture)", scope: "Design reviews, planning, medium risk (<$5)" },
      { tier: "Tier 3", handler: "CEO (Lyn)", scope: "Strategy, budget over $25, high risk, final approval" }
    ]
  }
]

export default function ArchitecturePage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-[#1F3A60] to-[#162A48]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-4">
              How We Build
            </h1>
            <p className="text-xl text-white/85 max-w-3xl mx-auto mb-8">
              Proven patterns, systematic execution, measurable results
            </p>
            <div className="flex justify-center gap-4">
              <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                Zero Rework
              </Badge>
              <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                Incremental Value
              </Badge>
              <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                Production-Ready
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Subtitle */}
      <section className="py-8 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-muted-foreground leading-relaxed">
            These aren't theoretical frameworks—they're battle-tested patterns from real production work. 
            Every principle below has delivered measurable results: <span className="font-semibold text-[#00B494]">1,750x performance improvements</span>, 
            <span className="font-semibold text-[#00B494]"> 100% accuracy</span>, 
            <span className="font-semibold text-[#00B494]"> 0 privacy violations</span>.
          </p>
        </div>
      </section>

      {/* Architecture Principles Grid */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {architecturePrinciples.map((principle, index) => (
              <Card key={index} className="border-[#1F3A60]/20 hover:border-[#00B494] transition-colors">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{principle.icon}</div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl text-[#1F3A60] mb-2">
                        {principle.title}
                      </CardTitle>
                      <p className="text-muted-foreground mb-4">
                        {principle.description}
                      </p>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-medium text-[#00B494]">Example:</span>{" "}
                          <span className="text-muted-foreground">{principle.example}</span>
                        </div>
                        <div>
                          <span className="font-medium text-[#00B494]">Value:</span>{" "}
                          <span className="text-muted-foreground">{principle.value}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Thin-Slice Phases */}
                  {principle.phases && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-[#1F3A60] mb-3">Implementation Timeline:</div>
                      {principle.phases.map((phase, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                          <Badge variant="outline" className="mt-0.5">{phase.phase}</Badge>
                          <div className="flex-1 text-sm">
                            <div className="font-medium text-foreground mb-1">
                              {phase.scope} <span className="text-muted-foreground">({phase.time})</span>
                            </div>
                            <div className="text-xs text-muted-foreground">→ {phase.outcome}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Privacy Layers */}
                  {principle.layers && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-[#1F3A60] mb-3">Defense in Depth:</div>
                      {principle.layers.map((layer, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                          <Badge variant="outline" className="mt-0.5">{layer.layer}</Badge>
                          <div className="flex-1 text-sm">
                            <div className="font-medium text-foreground mb-1">{layer.method}</div>
                            <div className="text-xs text-muted-foreground">Coverage: {layer.coverage}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Multi-Agent Pattern */}
                  {principle.pattern && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-[#1F3A60] mb-3">Execution Pattern:</div>
                      <div className="flex flex-col gap-2">
                        {principle.pattern.map((step, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-[#00B494] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                              {idx + 1}
                            </div>
                            <div className="flex-1 p-3 bg-muted/30 rounded-lg text-sm">
                              <span className="font-medium text-foreground">{step.step}:</span>{" "}
                              <span className="text-muted-foreground">{step.action}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Metadata-First Approach */}
                  {principle.approach && (
                    <div className="grid md:grid-cols-2 gap-3">
                      {principle.approach.map((item, idx) => (
                        <div key={idx} className="p-3 bg-muted/30 rounded-lg">
                          <div className="text-sm font-medium text-[#1F3A60] mb-1">{item.component}</div>
                          <div className="text-xs text-muted-foreground">{item.detail}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Observable Artifacts */}
                  {principle.artifacts && (
                    <div className="grid md:grid-cols-2 gap-3">
                      {principle.artifacts.map((artifact, idx) => (
                        <div key={idx} className="p-3 bg-muted/30 rounded-lg">
                          <div className="text-sm font-medium text-[#1F3A60] mb-1">{artifact.artifact}</div>
                          <div className="text-xs text-muted-foreground">{artifact.content}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CEO Escalation Tiers */}
                  {principle.tiers && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-[#1F3A60] mb-3">Decision Routing:</div>
                      {principle.tiers.map((tier, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                          <Badge 
                            variant={tier.tier === "Tier 3" ? "default" : "outline"} 
                            className={tier.tier === "Tier 3" ? "bg-[#00B494] mt-0.5" : "mt-0.5"}
                          >
                            {tier.tier}
                          </Badge>
                          <div className="flex-1 text-sm">
                            <div className="font-medium text-foreground mb-1">{tier.handler}</div>
                            <div className="text-xs text-muted-foreground">{tier.scope}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study: KB Memory */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1F3A60] mb-3">
              Case Study: KB Memory System
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              End-to-end journey from 4 files to 365 files, proving all 6 principles in action
            </p>
          </div>

          <Card className="border-[#1F3A60]/30">
            <CardContent className="pt-6 space-y-8">
              {/* Timeline */}
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#00B494]/30"></div>
                
                {[
                  { 
                    phase: "Phase 1", 
                    date: "Week 1", 
                    scope: "4 files (2 hours)",
                    principle: "Thin-Slice",
                    outcome: "Proved YAML frontmatter + ripgrep approach works",
                    metrics: "Manual validation only"
                  },
                  { 
                    phase: "Phase 2-3", 
                    date: "Week 2", 
                    scope: "54 files (5 hours)",
                    principle: "Privacy Architecture",
                    outcome: "3-layer privacy validated, HOT files curated",
                    metrics: "Allowlist + path blocking operational"
                  },
                  { 
                    phase: "Phase 4A", 
                    date: "Week 3", 
                    scope: "54 files (2 hours)",
                    principle: "Observable Validation",
                    outcome: "100% accuracy baseline with 15 test queries",
                    metrics: "15 JSON trace files, 0.027s avg latency"
                  },
                  { 
                    phase: "Phase 5A+5B", 
                    date: "Week 4", 
                    scope: "365 files (3 hours)",
                    principle: "All 6 principles",
                    outcome: "Production MCP server, 10/10 tests passing",
                    metrics: "1,750x speedup, 100% accuracy, 0 violations"
                  }
                ].map((milestone, idx) => (
                  <div key={idx} className="relative flex gap-6 mb-8 last:mb-0">
                    <div className="flex-shrink-0 w-16 h-16 bg-[#00B494] rounded-full flex items-center justify-center text-white font-bold z-10">
                      {idx + 1}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline">{milestone.phase}</Badge>
                        <span className="text-sm text-muted-foreground">{milestone.date}</span>
                      </div>
                      <div className="text-lg font-semibold text-[#1F3A60] mb-1">
                        {milestone.scope}
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        <span className="font-medium">Applied:</span> {milestone.principle}
                      </div>
                      <div className="text-sm text-foreground mb-2">
                        {milestone.outcome}
                      </div>
                      <div className="text-xs text-[#00B494]">
                        {milestone.metrics}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Final Results */}
              <div className="pt-6 border-t">
                <div className="text-center">
                  <div className="text-sm font-medium text-[#1F3A60] mb-4">Total Journey: 4 weeks, 12 hours</div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-[#00B494]/10 rounded-lg">
                      <div className="text-2xl font-bold text-[#00B494]">1,750x</div>
                      <div className="text-xs text-muted-foreground">Performance</div>
                    </div>
                    <div className="p-4 bg-[#00B494]/10 rounded-lg">
                      <div className="text-2xl font-bold text-[#00B494]">100%</div>
                      <div className="text-xs text-muted-foreground">Accuracy</div>
                    </div>
                    <div className="p-4 bg-[#00B494]/10 rounded-lg">
                      <div className="text-2xl font-bold text-[#00B494]">0</div>
                      <div className="text-xs text-muted-foreground">Rework</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Lessons Learned */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1F3A60] mb-3">
              Lessons Learned
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-green-500/30 bg-green-50/50">
              <CardHeader>
                <CardTitle className="text-lg text-green-700">✅ What Worked</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex gap-2">
                  <span className="text-green-600">•</span>
                  <span>Starting tiny (4 files) made pivots cheap and learning fast</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-green-600">•</span>
                  <span>Committing after every phase = zero loss from interruptions</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-green-600">•</span>
                  <span>Observable validation caught bugs before they reached production</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-green-600">•</span>
                  <span>Metadata-first approach (no ML) = deterministic, fast, cheap</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-green-600">•</span>
                  <span>CEO escalation tiers protected strategic decision time</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-500/30 bg-amber-50/50">
              <CardHeader>
                <CardTitle className="text-lg text-amber-700">⚠️ What Didn't Work</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex gap-2">
                  <span className="text-amber-600">•</span>
                  <span>Large monolithic tasks (&gt;60 min) &rarr; timeouts, lost work</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-amber-600">•</span>
                  <span>Skipping intermediate commits → risky, hard to debug</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-amber-600">•</span>
                  <span>Over-engineering Phase 1 → wasted time, delayed validation</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-amber-600">•</span>
                  <span>Flashy animations → undermined data credibility (Opus caught this!)</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-amber-600">•</span>
                  <span>Delegating without complexity assessment → unpredictable failures</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Card className="border-[#00B494]/30">
            <CardContent className="pt-6 pb-6">
              <h3 className="text-xl font-semibold text-[#1F3A60] mb-3">
                See These Principles in Action
              </h3>
              <p className="text-muted-foreground mb-6">
                Visit the Performance Showcase to see measured results from real production workloads
              </p>
              <a 
                href="/internal/showcase" 
                className="inline-flex items-center justify-center rounded-md bg-[#00B494] px-8 py-3 text-sm font-medium text-white hover:bg-[#00B494]/90 transition-colors"
              >
                View Performance Showcase &rarr;
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  )
}
