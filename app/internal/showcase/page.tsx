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

      {/* Content sections will be added in next chunks */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground">
            Additional metrics, charts, and detailed analysis coming in next implementation chunks...
          </p>
        </div>
      </section>
    </PageLayout>
  )
}
