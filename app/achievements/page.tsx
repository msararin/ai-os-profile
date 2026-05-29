"use client"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight } from "lucide-react"

export default function AchievementsPage() {
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set(['2026-05-28', '2026-05-26', '2026-05-25']))

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
      date: '2026-05-28',
      headline: 'Knowledge Sharing Archive Refreshed Through May 28',
      summary: 'Added the May 28 LinkedIn archive item and verified the public Knowledge Sharing route with a local smoke benchmark.',
      proofType: 'content freshness update, PR review, local route benchmark',
      evidenceReference: 'PR #5, commit 94c6001, merge commit 47c6c8f',
      status: 'Merged to main after CI and Vercel checks passed',
      publicSafeResult: 'Visitors see the latest public LinkedIn archive item without exposing internal Signal Studio drafts or learning records.',
      caveat: 'This is a public content freshness benchmark, not a claim about multi-agent work, production governance maturity, or business impact.',
      details: {
        whyItMatters: 'A public knowledge-sharing archive needs to stay current and verifiable. The update proves the page can accept a new public post, render successfully, and keep internal learning material out of the public route.',
        evidence: [
          'Commit 94c6001 added LinkedIn URN urn:li:share:7465789008669782016 to app/knowledge-sharing/page.tsx',
          'Archive freshness text changed from through 24 May 2026 to through 28 May 2026',
          'Local smoke benchmark: GET /knowledge-sharing returned 200 in 150ms on the Next.js dev server',
          'Rendered HTML check found the May 28 date label, the new LinkedIn URN, height 1833, and the 28 May freshness text',
          'Internal draft markers were not found in the rendered public route',
          'PR #5 checks passed: Lint, typecheck, build, and Vercel preview/status checks'
        ],
        skillsDemonstrated: [
          'Freshness maintenance for public content',
          'Route-level smoke benchmarking before merge',
          'Public/private boundary check for Knowledge Sharing vs. Signal Studio',
          'Evidence-first PR merge discipline'
        ],
        impact: 'Keeps the public archive current with a concrete route benchmark while avoiding inflated claims about internal systems or multi-agent collaboration.'
      },
      tags: ['Freshness', 'Benchmark', 'Knowledge Sharing', 'Public Safe']
    },
    {
      date: '2026-05-28',
      headline: 'AI OS Profile v0.2 Production Release — Proof-Backed Public/Internal Boundary',
      summary: 'Merged and production-verified the AIOS profile release through PR review, freeze tagging, Vercel deployment, route checks, and accepted manual auth proof.',
      proofType: 'PR merge, freeze tag, Vercel status, live route verification',
      evidenceReference: 'PR #3, merge d7ab867, freeze tag prod-freeze-aios-profile-2026-05-28-v0-2, sararin.ai live route checks',
      status: 'Production verified 28 May 2026',
      details: {
        whyItMatters: 'The site now demonstrates a current, governed release instead of stale portfolio claims. Public proof, protected internal surfaces, and release evidence are aligned.',
        evidence: [
          'PR #3 merged to main with merge commit d7ab867758d89d5d610b7a7bff89a8341825d5ee',
          'Freeze tag prod-freeze-aios-profile-2026-05-28-v0-2 points to approved candidate 8ccf898',
          'Deployment Preflight passed on PR head 3644cee after checkout history fix',
          'Vercel statuses succeeded for ai-os-profile and v0-ai-os-profile',
          'Production routes verified on sararin.ai: public routes returned 200; internal routes redirected to auth with callback URLs',
          'AUTH_PROOF_GAP accepted based on prior manual incognito OAuth proof'
        ],
        skillsDemonstrated: [
          'Release governance through freeze tag, PR review, checks, and production verification',
          'Public/private boundary validation for Knowledge Sharing and internal Signal Studio surfaces',
          'Evidence-aware content governance: proof page updated after deployment, not left stale',
          'Rollback readiness: Vercel rollback first, Git revert path documented if source rollback is needed'
        ],
        impact: 'Established current production proof that the AIOS profile is live, governed, and boundary-aware while keeping unpublished Signal Studio learning records internal.'
      },
      tags: ['Production Release', 'Governance', 'Boundary Proof', 'Impact']
    },
    {
      date: '2026-05-28',
      headline: 'Freeze Readiness and Repo Hygiene — Clean Candidate Prepared',
      summary: 'Added validation helpers, parked untracked evidence outside the repo, created the local freeze tag, and kept the working tree clean before PR release review.',
      proofType: 'commit, freeze tag, readiness report, clean-tree proof',
      evidenceReference: 'commit 8ccf898, tag prod-freeze-aios-profile-2026-05-28-v0-2, parked evidence path, PR #3',
      status: 'Used for v0.2 release review',
      publicSafeResult: 'Release review had a clean candidate, explicit helper scripts, and parked evidence instead of mixed working-tree artifacts.',
      caveat: 'Parked evidence is outside the repo and not rendered publicly.',
      details: {
        whyItMatters: 'Production releases need more than a successful build. They need clean source control, repeatable checks, and evidence that review artifacts were not accidentally shipped.',
        evidence: [
          'Commit 8ccf898 added scripts/local-staging-regression-check.sh, scripts/validate-classifier.sh, and types/better-sqlite3.d.ts',
          'Local freeze tag prod-freeze-aios-profile-2026-05-28-v0-2 was created for the approved candidate',
          '32 untracked evidence/artifact files were parked outside the repo before freeze review',
          'Freeze candidate proceeded through PR #3 instead of direct main push'
        ],
        skillsDemonstrated: [
          'Clean-tree release discipline',
          'Freeze tag and rollback-point thinking',
          'Evidence preservation without production pollution',
          'Scoped commits and explicit staging'
        ],
        impact: 'Reduced release ambiguity: reviewers could inspect a clean candidate with validation helpers committed and non-release evidence kept out of production.'
      },
      tags: ['Freeze', 'Repo Hygiene', 'Validation', 'Release']
    },
    {
      date: '2026-05-28',
      headline: 'Public Safety and Observability Boundary — Output Reduced and Caveated',
      summary: 'Caveated achievements, simplified public IA, and reduced observability output so public routes do not expose private operational detail.',
      proofType: 'commits, route boundary review',
      evidenceReference: 'commits e71c652 and 53e800d',
      status: 'Merged into v0.2 freeze candidate',
      publicSafeResult: 'Public pages explain the operating model without exposing raw logs, private paths, sensitive metrics, or internal draft surfaces.',
      caveat: 'Observability remains intentionally minimal until a fuller protected/internal observability model is approved.',
      details: {
        whyItMatters: 'A public AIOS case study must show maturity without leaking the working system behind it.',
        evidence: [
          'Commit e71c652 simplified public navigation and profile hubs',
          'Commit 53e800d caveated achievements and limited observability output',
          'Route checks confirmed public routes remained 200 and internal routes redirected to auth',
          'Knowledge Sharing boundary checks confirmed Signal Studio draft content was not exposed publicly'
        ],
        skillsDemonstrated: [
          'Public-safe technical storytelling',
          'Information architecture as operating-model clarity',
          'Private path and sensitive metric reduction',
          'Claims caveating on proof surfaces'
        ],
        impact: 'Improved credibility by making the site easier to understand while avoiding overclaiming or leaking internal operating data.'
      },
      tags: ['Public Safety', 'Observability', 'IA', 'Boundary']
    },
    {
      date: '2026-05-28',
      headline: 'Auth-Protected Internal Review Recovery — Local Review Without Production Bypass',
      summary: 'Recovered internal review access through scoped auth fixes and explicit development-only local review mode while keeping production auth protected.',
      proofType: 'commits, manual incognito OAuth proof, route checks',
      evidenceReference: 'commits 5de2bd2 and 83cf72c, prior manual incognito proof',
      status: 'Manual proof accepted; automation gap documented',
      publicSafeResult: 'Internal Dashboard and Signal Studio can be reviewed by authorized users, while unauthenticated production visitors are redirected to auth.',
      caveat: 'AUTH_PROOF_GAP remains for shell automation when OAuth env values are not loaded.',
      details: {
        whyItMatters: 'Internal proof surfaces only matter if reviewers can reach them without weakening production security.',
        evidence: [
          'Commit 5de2bd2 recovered internal access with safe local review mode',
          'Commit 83cf72c updated internal dashboard and Signal Studio review surface',
          'Manual incognito OAuth proof was accepted for authenticated internal review surfaces',
          'Production route checks showed internal routes redirecting to /auth/signin with callback URLs'
        ],
        skillsDemonstrated: [
          'Development-only bypass design with production guardrails',
          'OAuth incident triage without hardcoding secrets',
          'Callback preservation for protected internal routes',
          'Clear documentation of automation proof gaps'
        ],
        impact: 'Unblocked Lyn review of protected work while preserving the site boundary: public proof stays public, internal operations stay behind auth.'
      },
      tags: ['Auth', 'Internal Review', 'Security', 'Signal Studio']
    },
    {
      date: '2026-05-27',
      headline: 'Signal Studio Learning Backlog — Internal Lessons Parked Before Public Claims',
      summary: 'Captured 26-27 May staging review lessons as internal learning backlog instead of promoting unreviewed draft content to public pages.',
      proofType: 'git history, internal page status',
      evidenceReference: 'commit 83cf72c previous internal status copy',
      status: 'Internal learning record, not public proof claim',
      publicSafeResult: 'The public site avoids unreviewed Signal Studio claims while the internal page tracks pending lessons for later review.',
      caveat: 'This is intentionally not framed as a production achievement; it belongs to the internal learning pipeline.',
      details: {
        whyItMatters: 'Not every useful workday creates external proof. Some days create learning patterns that should be reviewed before public reuse.',
        evidence: [
          'Git history for commit 83cf72c recorded: "Review surface updated: 2026-05-27"',
          'The same internal status noted 26-27 May lessons were not yet fully ingested',
          'Pending lessons included staging review, Knowledge Sharing preservation, internal navigation blocker, export behavior verification, and budget burn report',
          'Current Signal Studio page keeps that backlog internal and marks 28 May release learning as pending migration'
        ],
        skillsDemonstrated: [
          'Learning capture before publication',
          'Public/private boundary discipline',
          'Claims-safety review before turning lessons into external content',
          'Signal Studio separation from Achievements'
        ],
        impact: 'Protects credibility by routing unreviewed operational lessons into Signal Studio instead of presenting them as external achievements.'
      },
      tags: ['Learning', 'Signal Studio', 'Claims Safety', 'Internal']
    },
    {
      date: '2026-05-26',
      headline: 'Signal Studio Draft Surface — Learning-to-Content Pipeline Created',
      summary: 'Created the protected draft surface, export tooling, and draft data structure for turning AIOS lessons into reviewed public-safe content candidates.',
      proofType: 'commits, internal route, tracked proposal doc',
      evidenceReference: 'commits 9734b39 and 4ae8516, docs/planning/SIGNAL_STUDIO_V0_1_ROLE_MAP_PROPOSAL.md',
      status: 'Internal draft/review surface',
      publicSafeResult: 'Knowledge Sharing remains public archive only; Signal Studio draft packages remain protected under /internal/*.',
      caveat: 'Draft records are not automatically publishable; Lyn/Robert review is required before public use.',
      details: {
        whyItMatters: 'The site needs a disciplined path from learning to content without leaking drafts or overclaiming.',
        evidence: [
          'Commit 9734b39 added internal knowledge-sharing draft surface v0.5',
          'Commit 4ae8516 implemented earlier draft content surface v0.3',
          'content/signal-studio-drafts.ts defines draft records, evidence notes, public-safe claims, caveats, do-not-use lists, and review fields',
          'docs/planning/SIGNAL_STUDIO_V0_1_ROLE_MAP_PROPOSAL.md defines Signal Studio roles as proposal, not canonical truth'
        ],
        skillsDemonstrated: [
          'Learning pipeline design',
          'Bilingual content review structure',
          'Evidence reviewer and claims-safety workflow',
          'Manual publishing gates'
        ],
        impact: 'Created a repeatable internal mechanism to convert AIOS work into publishable insights only after evidence and reputation-risk review.'
      },
      tags: ['Signal Studio', 'Learning Pipeline', 'Content Governance', 'Internal']
    },
    {
      date: '2026-05-26',
      headline: 'Safe Publish Governance — 8-Gate Release Discipline Designed',
      summary: 'Documented and validated a staged safe-publish protocol with dry-run behavior, classifier validation, strategic gates, and no-force-push release discipline.',
      proofType: 'documented milestone, validation results, commit',
      evidenceReference: 'commit 44079bf, docs/planning/SAFE_PUBLISH_IMPLEMENTATION_MILESTONE.md',
      status: 'Design and dry-run validated; live safe-publish not used for this release',
      publicSafeResult: 'Demonstrates release governance maturity without claiming auto-publish is approved or active.',
      caveat: 'safe-publish was intentionally not run during the v0.2 production release path.',
      details: {
        whyItMatters: 'Release governance is part of the AI operating system, not an afterthought.',
        evidence: [
          'Commit 44079bf added Safe Publish Governance v0.1.3 implementation milestone',
          'Milestone records 8 automated safety gates and dry-run mode',
          'Classifier validation recorded 23/23 PASS',
          'Strategic content gate correctly blocked architecture page changes in dry-run validation'
        ],
        skillsDemonstrated: [
          'Risk-based approval workflow design',
          'Dry-run-first deployment governance',
          'Classifier validation and pattern-order bug detection',
          'No-force-push policy and staging-first discipline'
        ],
        impact: 'Shows how governance enables safer speed: mechanical release checks are automated while strategic judgment remains human-gated.'
      },
      tags: ['Release Governance', 'Safe Publish', 'Validation', 'Controls']
    },
    {
      date: '2026-05-26',
      headline: 'Architecture Visual Upgrade — Control Plane Thinking Made Public-Safe',
      summary: 'Added Control Plane Thinking to the architecture page so the public AIOS case study explains routing, governance, evidence, and human decision flow more clearly.',
      proofType: 'commit, public route content',
      evidenceReference: 'commit 511024c',
      status: 'Public case-study artifact',
      publicSafeResult: 'Architecture maturity is explained as a public-safe operating model rather than private implementation detail.',
      caveat: 'The page frames architecture as case-study evidence, not a claim of enterprise production scale.',
      details: {
        whyItMatters: 'Architecture is easier to trust when visitors can see the control logic, not just broad AI language.',
        evidence: [
          'Commit 511024c added the Control Plane Thinking section to app/architecture/page.tsx',
          'The section fits the AIOS public case-study layer requested in the IA restructure',
          'Subsequent route checks kept /architecture public and /internal/* protected'
        ],
        skillsDemonstrated: [
          'Systems thinking',
          'AI governance communication',
          'Evidence-routing and human-in-the-loop framing',
          'Public-safe architecture explanation'
        ],
        impact: 'Improves the public proof that Sararin understands AI-enabled work as governed flow: decisions, evidence, controls, routing, and review.'
      },
      tags: ['Architecture', 'Control Plane', 'AIOS', 'Public Proof']
    },
    {
      date: '2026-05-25',
      headline: 'Public AIOS Showcase — First Impression and Navigation Stabilized',
      summary: 'Converted a confusing portfolio impression into an AIOS-first case study with clearer Home positioning, bridge navigation, and public AIOS routes.',
      proofType: 'commits, public route structure, quality gates',
      evidenceReference: 'commits d9a4f2b, 2c83242, e81e89d, aff957a, f9afebd, eb7d8d3, 470b446',
      status: 'Public case-study baseline',
      publicSafeResult: 'Visitors can understand the site as a public AIOS case study rather than a generic portfolio.',
      caveat: 'Impact is a clarity/governance improvement, not a business outcome metric.',
      details: {
        whyItMatters: 'Reputation risk: visitors could not quickly understand what the site was about. The fix made the AIOS operating method the first-viewport story.',
        evidence: [
          'Commit d9a4f2b deployed and verified live',
          'Commit 470b446 added the 5-layer enforcement framework',
          'Commit 283c665 completed the May 2026 achievements evidence bank',
          'Commit aff957a added AIOS and How We Build public pages',
          'Commit f9afebd populated the How We Build page',
          'Commit e81e89d added bridge navigation for the AIOS showcase flow',
          'Commit 2c83242 refined Home hero AIOS showcase positioning',
          'Commit eb7d8d3 restored the Architecture link in top navigation',
          'Home balance improved: 60/40 → 70/30 AIOS/Lyn',
          '30-second clarity test passed',
          'Governance docs tracked under docs/governance/'
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
      headline: 'Performance Evidence Hardened for AIOS Lab Systems',
      summary: 'Two lab systems were optimized with measured results, source references, and visible caveats before any public claim is reused',
      details: {
        whyItMatters: 'Shows AIOS is being validated through real lab systems while keeping public claims tied to evidence, scope, and caveats.',
        evidence: [
          'KB memory benchmark documented with baseline, same-task comparison, source file, and limited-scope caveat',
          'Multi-agent comparison documented as a lab run, not a general performance guarantee',
          'Cost notes retained internally until benchmark context is ready for public use',
          'Production: MCP server deployed, zero rework in 12 hours',
          'Parallel execution evidence kept with source traces and review notes'
        ],
        skillsDemonstrated: [
          'Thin-slice validation methodology (4 → 54 → 365 files)',
          'Layered privacy enforcement with automatic protection rules',
          'Measured burn rates with OpenRouter billing (May 20-24)',
          'Multi-agent orchestration (3-agent parallel batches)',
          'Evidence-backed performance claims (baseline, date, source, caveat)'
        ],
        impact: 'Demonstrates technical capability + governance discipline: measured claims stay scoped until the evidence package is ready for public use.'
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
      headline: 'Budget Crisis Recovery: Cost Governance Added',
      summary: 'Discovered Sonnet overuse causing rapid budget burn. Implemented role-first routing and cost-aware model selection to prevent recurrence.',
      details: {
        whyItMatters: 'Budget governance failure exposed need for cost control discipline. Fixed through routing rules, not just "be careful."',
        evidence: [
          'Budget burn identified from Sonnet default usage',
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
      headline: 'Knowledge Base Phase 5 Complete: Metric Corrected with Evidence',
      summary: 'Completed KB memory optimization and corrected the public claim only after reviewing benchmark scope, source, and caveat.',
      details: {
        whyItMatters: 'Evidence discipline matters more than impressive numbers. Corrected metric with baseline, date, source, caveat visible.',
        evidence: [
          'Corrected the speed claim after benchmark review',
          'Evidence source: evaluation/phase-4a-test-results.json',
          'Date measured: May 24, 2026',
          'Caveat: HOT/WARM subset only, not the full KB',
          'Baseline: Manual grep/browse comparison documented',
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
          'Internal pages protected behind authenticated routes',
          'Path-based routing requires auth for internal surfaces',
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
      summary: 'Built and validated multi-agent system with role-based routing, parallel execution, and scoped lab measurements',
      details: {
        whyItMatters: 'Shows multi-agent orchestration capability with source-tracked lab evidence and review discipline.',
        evidence: [
          'Architecture: Robert (router/reviewer) → Optimize Worker (execution) → Quality gates',
          'Parallel execution: Up to 3 concurrent subagents',
          'Measured speed comparison retained with lab-run scope and source notes',
          'Cost comparison retained internally until public benchmark context is ready',
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
        impact: 'Multi-agent isn\'t just trend-chasing. The work is measured, scoped, and reviewed before claims are reused publicly.'
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
              Achievement Proof Gallery
            </h1>
            <p className="text-xl text-white/85 max-w-3xl mx-auto">
              Public-safe evidence of what was built, what is proven, what is caveated, and what remains internal.
            </p>
            <p className="mt-4 text-sm font-medium text-white/80">
              Evidence updated: 28 May 2026 · Production verified: 28 May 2026
            </p>
            <p className="mt-2 text-sm text-white/75">
              Latest validated milestone: AI OS Profile v0.2 production release, 28 May 2026
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 p-4 bg-muted/30 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">
              <strong>Format:</strong> what was built → why it matters → evidence/artifacts → status/caveat → public-safe result.
              Internal measurements are summarized only when the evidence package is ready for public use.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              This page records external/professional proof and impact. Internal learning patterns and reusable draft ideas stay in protected Signal Studio until claims are reviewed.
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
                      {"proofType" in achievement && achievement.proofType && (
                        <div className="mt-3 grid gap-2 text-xs text-muted-foreground sm:grid-cols-3">
                          <div>
                            <span className="font-medium text-foreground">Proof type:</span>{" "}
                            {achievement.proofType}
                          </div>
                          <div>
                            <span className="font-medium text-foreground">Status:</span>{" "}
                            {achievement.status}
                          </div>
                          <div>
                            <span className="font-medium text-foreground">Reference:</span>{" "}
                            {achievement.evidenceReference}
                          </div>
                        </div>
                      )}
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

                    {/* Public-Safe Result */}
                    <div>
                      <h3 className="text-lg font-semibold text-[#1F3A60] mb-2">Public-Safe Result</h3>
                      {"publicSafeResult" in achievement && achievement.publicSafeResult ? (
                        <p className="text-sm text-muted-foreground">{achievement.publicSafeResult}</p>
                      ) : (
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {achievement.details.skillsDemonstrated.map((skill, idx) => (
                            <li key={idx}>{skill}</li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {"caveat" in achievement && achievement.caveat && (
                      <div>
                        <h3 className="text-lg font-semibold text-[#1F3A60] mb-2">Caveat / Status</h3>
                        <p className="text-sm text-muted-foreground">{achievement.caveat}</p>
                      </div>
                    )}

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
          <h2 className="text-2xl font-semibold mb-6 text-center">May 2026 Proof Summary</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-[#1F3A60]">16</div>
                <div className="text-sm text-muted-foreground mt-2">Proof-Backed Milestones</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-[#00B494]">Live</div>
                <div className="text-sm text-muted-foreground mt-2">Production Verified</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-[#1F3A60]">Protected</div>
                <div className="text-sm text-muted-foreground mt-2">Internal Routes</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-[#00B494]">Reviewed</div>
                <div className="text-sm text-muted-foreground mt-2">Evidence Claims</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
