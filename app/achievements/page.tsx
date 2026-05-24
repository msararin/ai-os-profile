"use client"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight } from "lucide-react"

export default function AchievementsPage() {
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set(['2026-05-25']))

  const toggleDay = (date: string) => {
    const newExpanded = new Set(expandedDays)
    if (newExpanded.has(date)) {
      newExpanded.delete(date)
    } else {
      newExpanded.add(date)
    }
    setExpandedDays(newExpanded)
  }

  const achievements = [
    {
      date: '2026-05-25',
      headline: 'Public Website Governance Recovery — First Impression Stabilized',
      summary: 'Converted confusing portfolio into clearer AIOS-first showcase through audit, quality gates, scoped patching, and deployment discipline',
      details: {
        whyItMatters: 'Reputation risk: visitors couldn\'t understand "what this site is about" in 30 seconds. Fixed through governance discipline, not panic patches.',
        evidence: [
          'Commit d9a4f2b deployed and verified live',
          'Home balance improved: 60/40 → 70/30 AIOS/Lyn',
          '30-second clarity test passed',
          'All 8 quality gates passed',
          'Governance framework: 4 docs, 21.3KB (web-governance-discipline.md, must-preserve-registry.md, pre-change-gate-template.md, public-facing-quality-gate.md)'
        ],
        skillsDemonstrated: [
          'AI governance: 5-layer enforcement (Memory → Checklist → Source-of-truth → Automated → Human gate)',
          'Quality gate design: 8-gate system preventing regression',
          'Reputation-risk handling: Highest-risk issue first, not easy wins',
          'Anti-fatigue workflow: Reduce future explanation burden',
          'Evidence discipline: Preserve-before-improve principle'
        ],
        impact: 'First impression now clear: "Working AI Operating System with governance proof, built by transformation leader" instead of "Person with transformation background"'
      },
      tags: ['Governance', 'Quality Gates', 'Public Portfolio', 'Reputation Risk']
    },
    {
      date: '2026-05-24',
      headline: 'Performance Proven: 1,400× KB Speedup + 2.3× Multi-Agent Efficiency',
      summary: 'Two major systems optimized with measured, evidence-backed results demonstrating AIOS governance capability',
      details: {
        whyItMatters: 'Proves AIOS isn\'t theory—real systems with measurable improvements, evidence-backed claims, and production deployment.',
        evidence: [
          'KB Memory: 37.5s → 0.027s (1,400×), 100% test accuracy, evaluation/phase-4a-test-results.json',
          'Multi-Agent: 90min → 18.5min (2.3×), 50% cost reduction ($2.71 → $1.36/deliverable)',
          'ROI: 653% (cost savings + time value)',
          'Production: MCP server deployed, zero rework in 12 hours',
          'Parallel execution: 7 concurrent workstreams, $9.50 total delegated cost'
        ],
        skillsDemonstrated: [
          'Thin-slice validation methodology (4 → 54 → 365 files)',
          '3-layer privacy enforcement (85% auto-protected)',
          'Measured burn rates with OpenRouter billing (May 20-24)',
          'Multi-agent orchestration (3-agent parallel batches)',
          'Evidence-backed performance claims (baseline, date, source, caveat)'
        ],
        impact: 'Demonstrates technical capability + governance discipline. Not just "fast" but "provably fast with proper measurement."'
      },
      tags: ['Performance', 'Evidence', 'Production', 'AIOS']
    },
    {
      date: '2026-05-23',
      headline: 'CV Update: 23 May 2026 Version Published',
      summary: 'Updated professional CV reflecting current AI orchestration work, governance capability, and balanced technical/transformation positioning',
      details: {
        whyItMatters: 'Employer-safe CV showing both governance depth AND technical upskilling (not governance-only perception).',
        evidence: [
          'CV dated 23 May 2026',
          'Balance: Transformation governance leader + AI technical capability',
          'Portfolio positioning: AIOS showcase + governance patterns',
          'LinkedIn: /in/msararin/ updated',
          'Target roles: AI transformation lead, Strategy & Transformation Office, Technology Enablement'
        ],
        skillsDemonstrated: [
          'Professional positioning: "Bridges AI hype ↔ implementation reality"',
          'Credibility framing: 15+ years data → banking → cloud → AI',
          'Evidence trail: Portfolio with anonymized case studies',
          'Role fit: Technical foundation + governance maturity'
        ],
        impact: 'Prevents "coordination-only" misperception. Shows technical depth (SQL, ETL, data validation) + AI upskilling (RAG, agentic workflows, Python).'
      },
      tags: ['Career', 'Positioning', 'Portfolio']
    },
    {
      date: '2026-05-21',
      headline: 'Budget Crisis Recovery: $100 Burn in <12 Hours',
      summary: 'Discovered Sonnet overuse causing rapid budget burn. Implemented role-first routing and cost-aware model selection to prevent recurrence.',
      details: {
        whyItMatters: 'Budget governance failure exposed need for cost control discipline. Fixed through routing rules, not just "be careful."',
        evidence: [
          'Budget burn: USD $100 in <12 hours (Sonnet default)',
          'Hard rule implemented: NO Sonnet default, role-first routing required',
          'Manual 11-point checklist before delegate_task',
          'Enforcement: Manual 1-2wk before automation',
          'Result: Usage optimization framework created (12.8KB USAGE_OPTIMIZATION_FRAMEWORK.md)'
        ],
        skillsDemonstrated: [
          'Crisis response: Identify root cause, not symptoms',
          'Cost governance: Routing rules + budget checkpoints',
          'Decision framework: When to use which model',
          'Telemetry requirement: "Never claim cheaper without data"',
          'Risk mitigation: Prevent through structure, not intention'
        ],
        impact: 'Proves governance includes fiscal discipline. Cost-aware model selection now enforced systematically.'
      },
      tags: ['Budget', 'Cost Control', 'Crisis Recovery', 'Governance']
    },
    {
      date: '2026-05-20',
      headline: 'Knowledge Base Phase 5 Complete: 1,750× → 1,400× Speed (Corrected with Evidence)',
      summary: 'Completed KB memory optimization with evidence-backed metrics. Corrected initial 1,750× claim to accurate 1,400× with full evidence standard.',
      details: {
        whyItMatters: 'Evidence discipline matters more than impressive numbers. Corrected metric with baseline, date, source, caveat visible.',
        evidence: [
          'Corrected: 1,750× → 1,400× (37.5s → 0.027s)',
          'Evidence source: evaluation/phase-4a-test-results.json',
          'Date measured: May 24, 2026',
          'Caveat: 54 HOT/WARM files only (not full 365-file KB)',
          'Baseline: Manual grep/browse averaged 37.5s',
          'Same task: Metadata-first search on identical query set'
        ],
        skillsDemonstrated: [
          'Evidence standard: 5 required fields (baseline, date, source, same-task, caveat)',
          'Intellectual honesty: Correct claims when evidence incomplete',
          'Metric hardening: Remove unsupported metrics or relabel clearly',
          'Credibility preservation: Better honest + lower than inflated + unsupported'
        ],
        impact: 'Sets standard for all future metrics. "Prove it or don\'t claim it."'
      },
      tags: ['Evidence', 'KB Memory', 'Metrics', 'Integrity']
    },
    {
      date: '2026-05-19',
      headline: 'Sararin.ai Domain Live: Auth-Protected Internal Cockpit Deployed',
      summary: 'Public portfolio + internal AIOS cockpit live on sararin.ai with NextAuth.js + Google OAuth + email allowlist',
      details: {
        whyItMatters: 'Proves execution capability. Not just theory—working site with 3-tier access control.',
        evidence: [
          'Domain: sararin.ai (registered, HTTPS via Vercel)',
          'Auth: NextAuth.js 5 beta + Google OAuth',
          'Access control: Public portfolio / Internal auth-protected / Secrets never rendered',
          'Internal pages: /internal/dashboard, /internal/architecture, /internal/showcase, /internal/usage',
          'Path-based routing: /internal/* requires auth',
          'Email allowlist: Configured in INTERNAL_ALLOWED_EMAILS'
        ],
        skillsDemonstrated: [
          'Full-stack deployment: Next.js 15 + Vercel + OAuth',
          'Security design: 3-tier access, path-based control',
          'Production deployment: CI/CD, environment variables, HTTPS',
          'Employer-safe positioning: "Personal portfolio" not "startup"',
          'Privacy boundaries: Internal work stays internal'
        ],
        impact: 'Portfolio is now live proof-of-execution, not just resume claims.'
      },
      tags: ['Deployment', 'Production', 'Auth', 'Portfolio']
    },
    {
      date: '2026-05-18',
      headline: 'Multi-Agent Orchestration: 3-Agent Parallel Execution Framework',
      summary: 'Built and validated multi-agent system with role-based routing, parallel execution, and measured efficiency gains',
      details: {
        whyItMatters: 'Proves multi-agent orchestration capability with real efficiency gains and cost tracking.',
        evidence: [
          'Architecture: Robert (router/reviewer) → Optimize Worker (execution) → Quality gates',
          'Parallel execution: Up to 3 concurrent subagents',
          'Measured speed: 2.3× faster (90min → 18.5min average)',
          'Cost reduction: 50% ($2.71 → $1.36 per deliverable)',
          'Session logs: May 20-24 OpenRouter billing data',
          'Real workload: 7 concurrent workstreams executed'
        ],
        skillsDemonstrated: [
          'Agent orchestration: Role-based delegation',
          'Concurrency management: Max 3 parallel (delegation.max_concurrent_children)',
          'Cost tracking: Real OpenRouter billing analysis',
          'Performance measurement: Baseline vs. optimized comparison',
          'Quality preservation: Gates prevent speed → quality tradeoff'
        ],
        impact: 'Multi-agent isn\'t just trend-chasing. Measured 2.3× speed + 50% cost reduction with evidence.'
      },
      tags: ['Multi-Agent', 'Orchestration', 'Performance', 'AIOS']
    }
  ]

  return (
    <PageLayout>
      {/* Header */}
      <section className="border-b border-border bg-gradient-to-b from-[#1F3A60] to-[#162A48]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-4">
              May 2026 Achievements
            </h1>
            <p className="text-xl text-white/85 max-w-3xl mx-auto">
              Evidence-backed progress: What we built, measured, and deployed this month
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 p-4 bg-muted/30 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">
              <strong>Format:</strong> Headline → Why it matters → Evidence/artifacts → Skills demonstrated → Impact.
              Each achievement is curated as professional evidence, not diary entries.
            </p>
          </div>

          {achievements.map((achievement) => (
            <Card 
              key={achievement.date} 
              className="mb-6 border-[#1F3A60]/20 hover:border-[#00B494] transition-colors"
            >
              {/* Day Header - Clickable */}
              <CardHeader 
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleDay(achievement.date)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {expandedDays.has(achievement.date) ? (
                      <ChevronDown className="w-6 h-6 text-[#00B494]" />
                    ) : (
                      <ChevronRight className="w-6 h-6 text-[#1F3A60]" />
                    )}
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        {new Date(achievement.date).toLocaleDateString('en-US', { 
                          weekday: 'short',
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <CardTitle className="text-2xl text-[#1F3A60]">
                        {achievement.headline}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-2">
                        {achievement.summary}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap justify-end">
                    {achievement.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline"
                        className="bg-[#00B494]/10 text-[#00B494] border-[#00B494]/30"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>

              {/* Expandable Details */}
              {expandedDays.has(achievement.date) && (
                <CardContent className="border-t border-border pt-6">
                  <div className="space-y-6">
                    {/* Why It Matters */}
                    <div>
                      <h3 className="text-lg font-semibold text-[#1F3A60] mb-2">Why It Matters</h3>
                      <p className="text-base text-muted-foreground">
                        {achievement.details.whyItMatters}
                      </p>
                    </div>

                    {/* Evidence */}
                    <div>
                      <h3 className="text-lg font-semibold text-[#1F3A60] mb-2">Evidence / Artifacts</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {achievement.details.evidence.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Skills Demonstrated */}
                    <div>
                      <h3 className="text-lg font-semibold text-[#1F3A60] mb-2">Skills Demonstrated</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {achievement.details.skillsDemonstrated.map((skill, idx) => (
                          <li key={idx}>{skill}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Impact */}
                    <div className="pt-4 border-t border-border">
                      <h3 className="text-lg font-semibold text-[#00B494] mb-2">Impact</h3>
                      <p className="text-base text-foreground font-medium">
                        {achievement.details.impact}
                      </p>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Summary Stats */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">May 2026 Summary</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-[#1F3A60]">7</div>
                <div className="text-sm text-muted-foreground mt-2">Major Achievements</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-[#00B494]">1,400×</div>
                <div className="text-sm text-muted-foreground mt-2">KB Speed Improvement</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-[#1F3A60]">2.3×</div>
                <div className="text-sm text-muted-foreground mt-2">Multi-Agent Efficiency</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-[#00B494]">100%</div>
                <div className="text-sm text-muted-foreground mt-2">Evidence-Backed Claims</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
