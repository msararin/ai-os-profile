import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const constants = [
  ["Case study", "Company M / CASE-003"],
  ["Industry context", "Mock retail-like adoption scenario"],
  ["Scope", "Owner-authorized CASE-003 execution packet"],
  ["Task source", "Round 3 task/evidence checklist"],
  ["Measurement rule", "Evidence determines claim level"],
  ["Claim guardrail", "No production, ROI, replacement, or broad performance claim"],
]

const rounds = [
  {
    round: "Round 1",
    state: "Useful-looking work, weak measurement control",
    change: "Exposed that evidence and authority were not yet strong enough to support a bounded claim.",
  },
  {
    round: "Round 2",
    state: "More traceable, still blocked by execution authority gaps",
    change: "Clarified that a recoverable approved runner was required before execution evidence could be produced.",
  },
  {
    round: "Round 3",
    state: "Controlled execution evidence produced with caveats",
    change: "Added approved runner, bounded execution, evidence checklist, deviation handling, and post-run review readiness.",
  },
]

const measurementRows = [
  ["Measurability", "Shows whether work can be evaluated instead of narrated.", "Not measurable", "Measurement rule set", "Claims become evidence-bounded", "Partially measurable", "Approved runner and checklist", "Measurement becomes executable", "Measurable with higher confidence", "Medium-high", "Keep"],
  ["Traceability", "Connects claims to artifacts and decisions.", "Scattered evidence", "Source validation packets", "Evidence gaps become visible", "Partially traceable", "Stage evidence map", "Round-specific trace improves", "Traceable by public-safe labels and commits", "Medium-high", "Keep"],
  ["Evidence completeness", "Shows whether required outputs exist.", "Incomplete", "Missing evidence rule", "Weak claims downgrade", "Partial", "Bounded evidence-production pass", "Required evidence set completes", "Complete evidence set for bounded claim", "Medium-high", "Keep"],
  ["Runner authority", "Shows whether the execution method was authorized.", "Missing", "Minimal runner design", "Runner becomes reviewable", "Candidate only", "Owner approval and enablement", "Execution authority becomes bounded", "Approved runner executed in scope", "Medium", "Keep"],
  ["Deviation handling", "Prevents unexpected differences from becoming hidden risk.", "Weak", "Deviation RCA rule", "Warnings get classified", "Warning surfaced", "Authority precedence rule", "Stale-source risk is contained", "Warning contained with caveat", "Medium", "Monitor"],
  ["Claim safety", "Keeps evidence from becoming broader claims.", "Fragile", "Claim boundary", "Reduce overclaim risk", "Improved", "Post-run review", "Boundary remains visible", "Controlled execution evidence only", "High", "Keep"],
  ["Reviewer confidence", "Separates true blockers from warnings.", "Low", "Gate review", "Readiness signals become clearer", "Medium", "Post-run review", "Confidence improves with caveats", "Review-ready with caveats", "Medium", "Monitor"],
  ["Owner decision readiness", "Shows whether a bounded owner decision is possible.", "Not ready", "Approval packet", "Decision ask narrows", "Partially ready", "Evidence and caveat", "Decision becomes bounded", "Ready for bounded owner decision", "Medium", "Monitor"],
  ["Workflow friction", "Shows whether control reduces or adds work.", "High", "Runner spec", "Less ambiguity", "Still high", "Minimal runner and checklist", "Less interpretation", "Improved, but storytelling needed rewrite", "Medium", "Improve"],
  ["Stale-source risk", "Checks whether old status fields can mislead decisions.", "High", "Source validation", "Stale data becomes visible", "Medium-high", "Authority precedence rule", "Newer records override stale fields", "Contained with caveat", "Medium", "Monitor"],
]

const interventions = [
  ["Source validation block", "Owner approval existed, but executable authority was not proven.", "Blocked execution until source and authority gaps were visible.", "Prevent false execution readiness.", "Execution stayed blocked; gap became explicit.", "High confidence blocker."],
  ["Runner recovery attempt", "The original approved runner could not be recovered.", "Checked for recoverable runner candidates and refused to pretend one existed.", "Runner authority becomes falsifiable.", "Zero recoverable candidates confirmed.", "High confidence blocker."],
  ["Minimal runner design", "No bounded method existed to produce the needed evidence.", "Designed a minimal runner candidate from approved sources.", "Execution method becomes reviewable.", "Runner spec became ready for owner approval.", "Candidate only until approved."],
  ["Owner approval and enablement", "Runner design did not yet equal executable authority.", "Enabled only the approved minimal runner.", "Authority becomes bounded and executable.", "Execution enabled for the approved path only.", "Scope remains narrow."],
  ["Opus + Runner Gang GO/NO-GO", "Warnings needed separation from true blockers.", "Ran claim-safety and deterministic preflight checks.", "True blockers clear or remain visible.", "GO with limited conditions; warnings preserved.", "Warnings were not erased."],
  ["Round 3 execution", "Approved method still needed actual evidence production.", "Ran the bounded evidence-production pass.", "Required evidence set becomes complete.", "Complete evidence set produced for controlled execution.", "Claim remains bounded."],
  ["Deviation RCA", "Stale status fields conflicted with newer authority records.", "Classified the deviation and applied authority precedence.", "Stale-source risk becomes contained.", "Non-blocking deviation recorded with caveat.", "Monitor."],
  ["Post-run Opus closeout", "Evidence needed claim-safety review after execution.", "Reviewed evidence and caveat for bounded decision readiness.", "Owner decision readiness improves.", "Controlled execution evidence became ready for owner decision.", "Not final owner approval."],
]

const glossary = [
  ["Measurement contract", "Rules that define what evidence can support which claim."],
  ["T4 measurement contract", "The measurement rule set used to decide what can be claimed from evidence."],
  ["Round 3 task matrix", "The task/evidence checklist used to compare expected execution with actual execution."],
  ["Runner", "The bounded execution method used to produce evidence."],
  ["Opus Gate", "External reviewer for claim safety and reasoning quality."],
  ["Runner Gang", "Deterministic preflight and validation layer."],
  ["Authority precedence", "Newer validated approval/evidence records override stale status fields."],
]

const evidenceRows = [
  ["Source validation block", "Source validation packet", "64dce14"],
  ["Command repair", "Approved command repair result", "78c947a"],
  ["Minimal runner design", "Minimal runner spec", "ec143c0"],
  ["Runner enablement", "Controlled enablement record", "5ac26b8"],
  ["GO/NO-GO gate", "Opus and Runner Gang decision", "03c1181"],
  ["Round 3 execution", "Execution verdict", "7d7717f"],
  ["Post-run Opus closeout", "Claim-boundary assessment", "b022612"],
]

const forbiddenClaims = [
  "public/prod/runtime readiness",
  "ROI",
  "Hermes comparison",
  "replacement readiness",
  "full orchestration proof",
  "whole-AIOS performance",
  "owner final claim approval",
  "production deployment",
  "business impact",
  "replacement capability",
]

export default function Case003Round3EvidenceLadderPage() {
  return (
    <PageLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <Link href="/case-studies" className="mb-5 inline-flex text-sm font-medium text-primary hover:underline">
            ← Back to Case Studies
          </Link>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">CASE-003</Badge>
            <Badge variant="outline">Company M</Badge>
            <Badge variant="outline">Measurement comparison</Badge>
          </div>
          <h1 className="mt-4 max-w-5xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Company M CASE-003: Measuring AI Adoption Control Across Rounds
          </h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-muted-foreground sm:text-lg">
            A mock retail-like company case study showing how AI adoption work becomes more
            measurable, traceable, and claim-safe across controlled execution rounds.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <LongBadge>CONTROLLED_EXECUTION_EVIDENCE_READY_FOR_OWNER_DECISION</LongBadge>
            <Badge variant="outline">Controlled Execution Evidence Claim</Badge>
          </div>
          <Alert className="mt-6 border-primary/25 bg-primary/5">
            <AlertDescription className="text-sm leading-6">
              CASE-003 Round 3 demonstrated controlled execution evidence: owner-authorized scope,
              approved minimal runner, bounded execution, complete evidence capture, deviation RCA,
              authority-precedence handling, and post-run review readiness.
            </AlertDescription>
          </Alert>
          <Alert className="mt-4 border-amber-500/40 bg-amber-500/5">
            <AlertDescription className="text-sm leading-6">
              Caveat: this does not claim production readiness, ROI, Hermes comparison, replacement
              readiness, full orchestration proof, or business impact.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Problem statement"
            title="From Useful-Looking Work To Measurable Adoption Control"
            detail="We created Company M as a mock retail-like company context to test how AI adoption work can move from looks useful to measurable, traceable, and claim-safe."
          />
          <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle>Company M Context</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
                <p>
                  Company M is a mock retail-like company context close enough to real adoption
                  conditions to test evidence discipline without exposing live customer data.
                </p>
                <p>
                  The same case study is used across rounds. What changes is the control layer:
                  source validation, runner authority, evidence completeness, review gates,
                  deviation handling, and claim safety.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Included / Excluded Scope</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 text-sm leading-6 text-muted-foreground sm:grid-cols-2">
                <div>
                  <p className="font-semibold text-foreground">Included</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    <li>mock Company M context</li>
                    <li>CASE-003 controlled execution evidence</li>
                    <li>round comparison of measurement maturity</li>
                    <li>evidence completeness</li>
                    <li>deviation handling</li>
                    <li>claim boundary</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Excluded</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    <li>production readiness</li>
                    <li>live customer telemetry</li>
                    <li>ROI</li>
                    <li>Hermes comparison</li>
                    <li>replacement readiness</li>
                    <li>full orchestration proof</li>
                    <li>business impact</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/25 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Controlled baseline"
            title="What Stayed Constant"
            detail="The baseline is concrete: the same mock company, adoption problem, owner-authorized scope, evidence rule, and claim guardrail stayed in place while the control layer matured."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {constants.map(([label, value]) => (
              <Card key={label}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{label}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-muted-foreground">{value}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Round framing"
            title="What Changed By Round"
            detail="The case stayed constant; the control layer and measurement maturity changed."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {rounds.map((round) => (
              <Card key={round.round}>
                <CardHeader>
                  <CardTitle>{round.round}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
                  <p className="font-medium text-foreground">{round.state}</p>
                  <p>{round.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/25 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Measurement comparison"
            title="Round 1 / Round 2 / Round 3 Parameter Comparison"
            detail="Qualitative telemetry is used where numeric telemetry is not available. No fake numeric measurements are invented."
          />
          <div className="mt-6 overflow-x-auto rounded-lg border border-border bg-background">
            <table className="min-w-[1480px] text-left text-sm">
              <thead className="border-b border-border bg-muted/40 text-xs uppercase text-muted-foreground">
                <tr>
                  {["Parameter / telemetry", "Why it matters", "Round 1 state", "Improvement introduced", "Expected change", "Round 2 state", "Improvement introduced", "Expected change", "Round 3 state", "Confidence level", "Conclusion"].map((header) => (
                    <th key={header} className="px-4 py-3 font-medium">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {measurementRows.map((row) => (
                  <tr key={row[0]} className="border-b border-border align-top last:border-b-0">
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`} className="px-4 py-4 leading-6 text-muted-foreground">
                        {index === 0 ? <span className="font-medium text-foreground">{cell}</span> : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Intervention ladder"
            title="How Achievements Changed Measurement Quality"
            detail="Each stage is shown as a measurement intervention, not a disconnected achievement log."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {interventions.map(([title, problem, intervention, expected, actual, confidence]) => (
              <Card key={title}>
                <CardHeader>
                  <CardTitle className="text-base">{title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
                  <p><span className="font-medium text-foreground">Problem found:</span> {problem}</p>
                  <p><span className="font-medium text-foreground">Intervention:</span> {intervention}</p>
                  <p><span className="font-medium text-foreground">Expected measurement change:</span> {expected}</p>
                  <p><span className="font-medium text-foreground">Actual measured state:</span> {actual}</p>
                  <p><span className="font-medium text-foreground">Confidence / caveat:</span> {confidence}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/25 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Plain-language glossary"
            title="Internal Terms Translated"
            detail="Public-safe language still needs to be reader-clear."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {glossary.map(([term, definition]) => (
              <Card key={term}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{term}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-muted-foreground">{definition}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Evidence Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-[640px] text-left text-sm">
                  <thead className="border-b border-border bg-muted/40 text-xs uppercase text-muted-foreground">
                    <tr>
                      {["Stage", "Public-safe evidence label", "Commit"].map((header) => (
                        <th key={header} className="px-4 py-3 font-medium">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {evidenceRows.map((row) => (
                      <tr key={row[0]} className="border-b border-border align-top last:border-b-0">
                        {row.map((cell, index) => (
                          <td key={`${row[0]}-${index}`} className="px-4 py-4 leading-6 text-muted-foreground">
                            {index === 0 ? <span className="font-medium text-foreground">{cell}</span> : cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-500/40 bg-amber-500/5">
            <CardHeader>
              <CardTitle>Claim Boundary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
              <p className="font-medium text-foreground">Controlled Execution Evidence Claim</p>
              <p>
                The page supports a bounded evidence claim for CASE-003 Round 3. It does not
                convert controlled evidence into broader readiness, impact, replacement, or whole-system claims.
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {forbiddenClaims.map((claim) => (
                  <div key={claim} className="rounded-md border border-border bg-background/70 px-3 py-2">
                    Not claimed: {claim}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t border-border bg-background py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Next Decision</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
              <p><span className="font-medium text-foreground">Owner final claim approval:</span> pending.</p>
              <p>
                <span className="font-medium text-foreground">Recommended final claim label:</span>{" "}
                CASE003_ROUND3_OWNER_APPROVED_WITH_CAVEAT_CONTROLLED_EXECUTION_EVIDENCE_CLAIM
              </p>
              <p>
                The decision is whether the controlled execution evidence claim is acceptable with
                caveat, not whether any broader public, business, replacement, or production claim is approved.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  )
}

function SectionHeading({
  eyebrow,
  title,
  detail,
}: {
  eyebrow: string
  title: string
  detail: string
}) {
  return (
    <div>
      <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
      <p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">{detail}</p>
    </div>
  )
}

function LongBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex max-w-full items-center rounded-md border border-primary/30 bg-primary/5 px-2.5 py-1 text-xs font-medium leading-5 text-primary">
      <span className="break-words">{children}</span>
    </span>
  )
}
