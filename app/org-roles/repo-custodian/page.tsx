import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const capabilityGroups = [
  {
    title: "Know the repository state",
    description: "Triage, provenance, ownership, and drift evidence before action.",
    skills: [
      ["RC-01", "Repository State & Hygiene Triage", "INSTALLED_AND_VALIDATED_LOCAL"],
      ["RC-04", "Source Custody, Change Provenance & Ownership Map", "INSTALLED_AND_VALIDATED_LOCAL"],
      ["RC-14", "Repository Telemetry, Drift & Hygiene Automation", "INSTALLED_AND_VALIDATED_LOCAL"],
    ],
  },
  {
    title: "Protect source and isolate work",
    description: "Preserve unique work, secrets boundaries, branches, and exact-SHA lanes.",
    skills: [
      ["RC-02", "Dirty Workspace Custody & Controlled Remediation", "INSTALLED_AND_VALIDATED_LOCAL"],
      ["RC-03", "Worktree, Lane & Exact-SHA Isolation", "INSTALLED_AND_VALIDATED_LOCAL"],
      ["RC-05", "Branch, Tag & Repository Policy Guardrails", "LOCAL_VALIDATED_WITH_GAPS"],
      ["RC-06", "Secret & Sensitive Local-State Boundary", "INSTALLED_AND_VALIDATED_LOCAL"],
    ],
  },
  {
    title: "Recover and maintain safely",
    description: "Make recovery observable before cleanup or lifecycle change.",
    skills: [
      ["RC-07", "Backup, Restore, Quarantine & Recovery Readiness", "INSTALLED_AND_VALIDATED_LOCAL"],
      ["RC-08", "Repository Integrity & Maintenance", "LOCAL_VALIDATED_WITH_GAPS"],
      ["RC-12", "Repository Lifecycle, Archive, Transfer & Decommission", "LOCAL_VALIDATED_WITH_GAPS"],
      ["RC-13", "Repository Health & Contribution Contract", "LOCAL_VALIDATED_WITH_GAPS"],
    ],
  },
  {
    title: "Prepare downstream evidence",
    description: "Provide supply-chain, provenance, and baseline inputs without claiming delivery success.",
    skills: [
      ["RC-09", "Dependency & Software Supply Chain Guardrails", "LOCAL_VALIDATED_WITH_GAPS"],
      ["RC-10", "Build Artifact Provenance Interface", "LOCAL_VALIDATED_WITH_GAPS"],
      ["RC-11", "Repository Security Baseline & Scorecard Audit", "LOCAL_VALIDATED_WITH_GAPS"],
    ],
  },
] as const

const boundaries = [
  "REPO_CUSTODIAN_EVIDENCE_IS_NOT_PRODUCTION_PROOF",
  "SOURCE_CUSTODY_IS_NOT_DEPLOYMENT_VERIFICATION",
  "REFERENCE_ONLY_NOT_CROSS_LANE_PROOF",
]

export default function RepoCustodianPage() {
  return (
    <PageLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <Link href="/org-roles" className="inline-flex text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
            ← Back to org roles
          </Link>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">Repository integrity capability</Badge>
            <Badge variant="outline" className="max-w-full whitespace-normal break-words text-left">Local evidence with protected gaps</Badge>
          </div>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Repo Custodian</h1>
          <p className="mt-4 max-w-3xl text-pretty text-lg leading-8 text-muted-foreground">
            Keeps repository state, source custody, exact-SHA work, and recovery evidence understandable before another lane builds, releases, or makes a production claim.
          </p>
        </div>
      </section>

      <section className="border-b border-amber-500/30 bg-amber-500/5">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-700">Current evidence boundary</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="outline" className="max-w-full whitespace-normal break-all">INSTALLED_AND_VALIDATED_LOCAL</Badge>
            <Badge variant="outline" className="max-w-full whitespace-normal break-all">LOCAL_VALIDATED_WITH_GAPS</Badge>
            <Badge variant="outline" className="max-w-full whitespace-normal break-all">LOCAL_CANDIDATE_NOT_APPLIED</Badge>
            <Badge variant="outline" className="max-w-full whitespace-normal break-all">NOT_PROVEN</Badge>
            <Badge variant="outline" className="max-w-full whitespace-normal break-all">PATH_TO_PRODUCTION_SOURCE_STATE_UNCLEAR</Badge>
          </div>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">
            Phase D platform controls are LOCAL_CANDIDATE_NOT_APPLIED. Production worktree, branch, exact SHA, deployment verification, and production telemetry are NOT_PROVEN.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2">
            <Card><CardHeader><CardTitle>What this role protects</CardTitle></CardHeader><CardContent className="text-sm leading-6 text-muted-foreground">Repository evidence, source ownership, isolated worktrees, pinned SHAs, recoverability, policy readiness, and repository-level telemetry.</CardContent></Card>
            <Card><CardHeader><CardTitle>What it does not own</CardTitle></CardHeader><CardContent className="text-sm leading-6 text-muted-foreground">Final security acceptance, dependency business acceptance, application quality, build approval, signing, promotion, deployment, or production verification.</CardContent></Card>
          </div>

          <details className="mt-8 rounded-xl border border-border bg-card p-5 sm:p-6">
            <summary className="cursor-pointer text-lg font-semibold text-foreground">Inspect all 14 capabilities and maturity</summary>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">The capability rows are present in the page from first render. Open this section for expert detail; no skill inherits proof from another.</p>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {capabilityGroups.map((group) => (
                <section key={group.title} className="rounded-lg border border-border bg-background p-4">
                  <h3 className="font-semibold text-foreground">{group.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{group.description}</p>
                  <ul className="mt-4 space-y-3">
                    {group.skills.map(([id, name, status]) => (
                      <li key={id} className="rounded-md border border-border p-3">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <span className="text-sm font-medium text-foreground">{id} · {name}</span>
                          <Badge variant="secondary" className="max-w-full break-all bg-muted text-[10px]">{status}</Badge>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </details>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">How it contributes to Path to Production</h2>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">Repository state → source custody → clean worktree → branch and exact SHA → provenance inputs. A separate Path to Production lane must prove build, validation, promotion, deployment, runtime verification, telemetry, and its final claim.</p>
          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            {boundaries.map((boundary) => <code key={boundary} className="rounded-md border border-border bg-background p-3 text-xs text-foreground">{boundary}</code>)}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div><h2 className="text-xl font-semibold text-foreground">Risk handling</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Detect → Contain → Mitigate → Validate → Continue / Exclude / Preserve / Escalate. Unresolved non-owner risk is preserved and skipped instead of forced through.</p></div>
          <div><h2 className="text-xl font-semibold text-foreground">Evidence source</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Canonical local KB commit: 4daaedec2010c281702246706eed934551b97c71. This page is a presentation surface, not a replacement truth source.</p></div>
        </div>
      </section>
    </PageLayout>
  )
}
