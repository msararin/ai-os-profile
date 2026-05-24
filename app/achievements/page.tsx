"use client"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight } from "lucide-react"

export default function AchievementsPage() {
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set(['2026-05-24']))

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
      date: '2026-05-24',
      headline: 'Performance proven: 1,400× KB speedup + 2.3× multi-agent efficiency',
      summary: 'Two major systems optimized with measured, evidence-backed results',
      details: {
        kbMemory: {
          title: 'KB Memory: 1,400× Performance Improvement',
          metrics: [
            { label: 'Speed', value: '1,400×', detail: '37.5s → 0.027s' },
            { label: 'Accuracy', value: '100%', detail: '15/15 tests passed' },
            { label: 'Privacy', value: '0 violations', detail: '3-layer enforcement' },
          ],
          evidence: 'evaluation/phase-4a-test-results.json',
          methodology: 'Thin-slice validation (4 → 54 → 365 files)',
          impact: 'Production MCP server deployed, zero rework in 12 hours'
        },
        multiAgent: {
          title: 'Multi-Agent: 2.3× Speed, 50% Cost Reduction',
          metrics: [
            { label: 'Speed', value: '2.3×', detail: '90min → 18.5min (79% faster)' },
            { label: 'Cost', value: '50%', detail: '$2.71 → $1.36/deliverable' },
            { label: 'ROI', value: '653%', detail: 'Cost savings + time value' },
          ],
          evidence: 'Session logs + OpenRouter billing (May 20-24)',
          methodology: '3-agent parallel batches, measured burn rates',
          impact: '7 concurrent workstreams, $9.50 total delegated cost'
        }
      },
      tags: ['Performance', 'Evidence', 'Production']
    }
  ]

  return (
    <PageLayout>
      {/* Header */}
      <section className="border-b border-border bg-gradient-to-b from-[#1F3A60] to-[#162A48]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-4">
              Daily Achievements
            </h1>
            <p className="text-xl text-white/85 max-w-3xl mx-auto">
              Evidence-backed progress: What we built, measured, and deployed
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
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
                  <div className="flex gap-2">
                    {achievement.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>

              {/* Expanded Content */}
              {expandedDays.has(achievement.date) && (
                <CardContent className="pt-0">
                  <div className="border-t border-border pt-6 space-y-8">
                    {/* KB Memory Section */}
                    <div>
                      <h3 className="text-xl font-semibold text-[#1F3A60] mb-4 flex items-center gap-2">
                        <span>🚀</span>
                        {achievement.details.kbMemory.title}
                      </h3>
                      
                      {/* Metrics Grid */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        {achievement.details.kbMemory.metrics.map((metric) => (
                          <div 
                            key={metric.label}
                            className="bg-[#F8FAFB] border border-[#E6EEF8] rounded-lg p-4 text-center"
                          >
                            <div className="text-3xl font-bold text-[#00B494] mb-1">
                              {metric.value}
                            </div>
                            <div className="text-sm font-medium text-[#1F3A60] mb-1">
                              {metric.label}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {metric.detail}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Evidence & Impact */}
                      <div className="bg-[#F0FDF4] border-l-4 border-[#00B494] p-4 rounded-r space-y-2 text-sm">
                        <div>
                          <span className="font-semibold text-[#1F3A60]">Evidence:</span>{' '}
                          <span className="text-muted-foreground">{achievement.details.kbMemory.evidence}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-[#1F3A60]">Methodology:</span>{' '}
                          <span className="text-muted-foreground">{achievement.details.kbMemory.methodology}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-[#1F3A60]">Impact:</span>{' '}
                          <span className="text-muted-foreground">{achievement.details.kbMemory.impact}</span>
                        </div>
                      </div>

                      {/* View Detailed Report Link */}
                      <div className="mt-3">
                        <a 
                          href="/achievements/kb-memory-benchmark-2026-05-24"
                          className="text-sm text-[#00B494] hover:underline font-medium"
                        >
                          → View detailed report with full evidence
                        </a>
                      </div>
                    </div>

                    {/* Multi-Agent Section */}
                    <div>
                      <h3 className="text-xl font-semibold text-[#1F3A60] mb-4 flex items-center gap-2">
                        <span>⚡</span>
                        {achievement.details.multiAgent.title}
                      </h3>
                      
                      {/* Metrics Grid */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        {achievement.details.multiAgent.metrics.map((metric) => (
                          <div 
                            key={metric.label}
                            className="bg-[#F8FAFB] border border-[#E6EEF8] rounded-lg p-4 text-center"
                          >
                            <div className="text-3xl font-bold text-[#00B494] mb-1">
                              {metric.value}
                            </div>
                            <div className="text-sm font-medium text-[#1F3A60] mb-1">
                              {metric.label}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {metric.detail}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Evidence & Impact */}
                      <div className="bg-[#F0FDF4] border-l-4 border-[#00B494] p-4 rounded-r space-y-2 text-sm">
                        <div>
                          <span className="font-semibold text-[#1F3A60]">Evidence:</span>{' '}
                          <span className="text-muted-foreground">{achievement.details.multiAgent.evidence}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-[#1F3A60]">Methodology:</span>{' '}
                          <span className="text-muted-foreground">{achievement.details.multiAgent.methodology}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-[#1F3A60]">Impact:</span>{' '}
                          <span className="text-muted-foreground">{achievement.details.multiAgent.impact}</span>
                        </div>
                      </div>

                      {/* View Detailed Report Link */}
                      <div className="mt-3">
                        <a 
                          href="/achievements/multi-agent-performance-2026-05-24"
                          className="text-sm text-[#00B494] hover:underline font-medium"
                        >
                          → View detailed report with full evidence
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}

          {/* Coming Soon Placeholder */}
          <Card className="border-dashed border-2 border-[#E6EEF8]">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                More achievements coming soon...
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Daily progress tracked with evidence and proof
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  )
}
