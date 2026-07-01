import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const storyCards = [
  {
    title: "What this page is about",
    meaning:
      "This is a public portfolio case study about making the same Company M AI adoption task more measurable across three execution rounds.",
    matters:
      "A first-time reader should see the value quickly: the work improved measurement maturity, not a business outcome claim.",
    roundConnection:
      "Round 1 was hard to measure, Round 2 became measurable with weak confidence, and Round 3 became more structured and traceable.",
  },
  {
    title: "Problem being measured",
    meaning:
      "The question was whether execution quality could be compared when the task stayed constant but the control layer improved.",
    matters:
      "Without a stable comparison, a page can sound impressive while still being only internal notes.",
    roundConnection:
      "The rounds compare measurability, traceability, evidence completeness, execution readiness, deviation handling, and claim safety.",
  },
  {
    title: "What stayed constant",
    meaning:
      "The same case study, same limits on what can and cannot be claimed, and same public-safe evidence discipline stayed in place.",
    matters:
      "Keeping the task stable makes it easier to see whether the measurement system improved.",
    roundConnection:
      "Changes between rounds should come from better controls and evidence, not from changing the target.",
  },
  {
    title: "What improved",
    meaning:
      "The evidence moved from unclear baseline, to partially measurable, to controlled execution evidence ready for bounded owner review.",
    matters:
      "This is the main portfolio story: the system became more honest and easier to verify.",
    roundConnection:
      "Round 3 improved the measurement signal, but still preserves caveats and does not claim production or business impact.",
  },
]

const measurementRows = [
  {
    parameter: "Measurability",
    meaning: "Can the work be evaluated instead of only described?",
    round1: "Low: unclear baseline and no stable measurement rules.",
    round1Why: "The first round relied on weak evidence and did not make comparison easy.",
    round2: "Medium: measurement rules existed, but the execution path was still incomplete.",
    round2Why: "The work became measurable, but confidence stayed limited because the runner path was not complete.",
    round3: "High for bounded scope: consistent rules and complete controlled evidence were present.",
    round3Why: "Round 3 used the approved execution scope and evidence checklist.",
    changed: "Measurement rules used across rounds became explicit and executable.",
    confidence: "Medium-high",
    decision: "keep monitoring",
    interpretation: "Measurement maturity improved, but the claim remains limited to controlled execution evidence.",
  },
  {
    parameter: "Traceability",
    meaning: "Can results be traced back to artifacts, decisions, and commits?",
    round1: "Low: evidence was scattered and claims were hard to follow.",
    round1Why: "A reader could not reliably connect a claim to a source artifact.",
    round2: "Medium: source validation and command repair packets made gaps visible.",
    round2Why: "Trace existed, but the runner absence still limited confidence.",
    round3: "High for bounded scope: evidence labels and commits mapped to execution stages.",
    round3Why: "The page can cite the source validation, runner, execution, deviation, and closeout chain.",
    changed: "Evidence traceability moved from scattered notes to a stage-linked evidence ladder.",
    confidence: "Medium-high",
    decision: "keep monitoring",
    interpretation: "Round 3 gives a clearer audit trail, while still avoiding broader proof claims.",
  },
  {
    parameter: "Evidence completeness",
    meaning: "Were required outputs produced, or were claims unsupported?",
    round1: "Incomplete: mostly narrative evidence.",
    round1Why: "The baseline did not prove that required artifacts existed.",
    round2: "Partial: some structured evidence existed, but not a complete controlled execution set.",
    round2Why: "The measurement structure improved before execution evidence was complete.",
    round3: "Complete for controlled execution scope.",
    round3Why: "The bounded evidence-production pass produced the expected local evidence set.",
    changed: "Missing-evidence rules and execution evidence collection were added.",
    confidence: "Medium-high",
    decision: "keep monitoring",
    interpretation: "The page can support a controlled evidence claim, not a universal completion claim.",
  },
  {
    parameter: "Execution readiness",
    meaning: "Could the approved task actually be run in a controlled way?",
    round1: "Missing or not recoverable.",
    round1Why: "Authorization existed, but executable authority was not proven.",
    round2: "Candidate approved but not yet run.",
    round2Why: "A bounded runner candidate existed, but execution evidence was still absent.",
    round3: "Approved runner executed in controlled scope.",
    round3Why: "Runner approval, enablement, and bounded execution records existed.",
    changed: "Approval became executable authority through a minimal approved runner.",
    confidence: "Medium",
    decision: "keep monitoring",
    interpretation: "Execution readiness improved materially, but only for the approved minimal runner scope.",
  },
  {
    parameter: "Deviation handling",
    meaning: "Were unexpected differences detected, classified, and contained?",
    round1: "Weak: deviations were not handled as a visible measurement object.",
    round1Why: "Unexpected differences could affect confidence without being surfaced.",
    round2: "Warning surfaced, but handling was still not mature.",
    round2Why: "A stale-status warning appeared, but the reader still needed more context.",
    round3: "Non-blocking deviation recorded with caveat.",
    round3Why: "A stale task-matrix status field was classified and contained by authority precedence.",
    changed: "Deviation handling moved from implicit warning to documented impact assessment.",
    confidence: "Medium",
    decision: "improve measurement",
    interpretation: "The handling improved, but it should stay monitored across future case studies.",
  },
  {
    parameter: "Claim safety",
    meaning: "Do the claims stay inside what the evidence actually supports?",
    round1: "Fragile: overclaim risk was high.",
    round1Why: "Weak evidence made it easy to imply more than was proven.",
    round2: "Improved, but terminology-heavy.",
    round2Why: "Boundaries existed, but a public reader still had to decode internal language.",
    round3: "Controlled execution evidence only.",
    round3Why: "The page explicitly blocks production, ROI, replacement, and full-orchestration claims.",
    changed: "The limits on what can and cannot be claimed became visible and tied to measurement confidence.",
    confidence: "High",
    decision: "keep monitoring",
    interpretation: "Credibility improves because the page states both what improved and what was not measured.",
  },
  {
    parameter: "Reviewer confidence",
    meaning: "How safe is it to compare results based on the available evidence?",
    round1: "Low or implicit.",
    round1Why: "Confidence was not stated or justified in plain language.",
    round2: "Medium.",
    round2Why: "Confidence improved because evidence existed, but the runner and story were still incomplete.",
    round3: "Approved with caveats for owner decision.",
    round3Why: "Review, execution evidence, and caveats were present, but not perfect proof.",
    changed: "Confidence became grounded in structured, traceable, repeatable evidence.",
    confidence: "Medium",
    decision: "improve measurement",
    interpretation: "Confidence is higher than earlier rounds, but caveats must remain visible.",
  },
  {
    parameter: "Owner decision readiness",
    meaning: "Can the owner make a bounded keep, improve, or remove decision?",
    round1: "Not ready.",
    round1Why: "The evidence did not support a clear bounded decision.",
    round2: "Partially ready.",
    round2Why: "The owner could see progress, but important evidence was still incomplete.",
    round3: "Ready for bounded owner decision, not final public-proof approval.",
    round3Why: "The evidence supports a controlled execution evidence decision only.",
    changed: "Decision options became clearer and tied to evidence quality.",
    confidence: "Medium",
    decision: "keep monitoring",
    interpretation: "Round 3 is ready for bounded review, not for broader public or production claims.",
  },
  {
    parameter: "Workflow friction",
    meaning: "Does the monitoring process help understanding, or does it create clutter?",
    round1: "High.",
    round1Why: "The baseline felt like internal notes.",
    round2: "Still high.",
    round2Why: "Measurement existed, but public readability was still blocked by terminology.",
    round3: "Lower after rewriting, but still worth monitoring.",
    round3Why: "The page now leads with story and comparison before evidence detail.",
    changed: "The default view moved from artifact-first to reader-first.",
    confidence: "Medium",
    decision: "improve measurement",
    interpretation: "The monitoring surface should keep reducing scratchpad language.",
  },
  {
    parameter: "Stale-source risk",
    meaning: "Can older status fields mislead the reader or override newer evidence?",
    round1: "High.",
    round1Why: "Source age and authority precedence were not controlled.",
    round2: "Medium-high.",
    round2Why: "Source validation surfaced the issue, but not all impacts were contained.",
    round3: "Contained with caveat.",
    round3Why: "Newer validated approval and evidence records override stale task-status fields.",
    changed: "Authority precedence became an explicit rule.",
    confidence: "Medium",
    decision: "keep monitoring",
    interpretation: "The risk is controlled enough for this claim, but should remain visible in future monitoring.",
  },
]

const roundChanges = [
  {
    round: "Round 1",
    summary: "Weak baseline",
    changed: "No strong control change yet; the main work was discovering that the evidence was not measurable enough.",
    expectedImpact: "Expose whether the case study could support any reliable comparison.",
    signal: "Low measurability, low traceability, incomplete evidence, and high stale-source risk.",
    confidenceImpact: "Low confidence because the evidence was mostly narrative and hard to repeat.",
  },
  {
    round: "Round 2",
    summary: "Measurable but low confidence",
    changed: "Measurement rules, source validation, command repair, and runner-candidate work were introduced.",
    expectedImpact: "Turn the case study from a story into something that could be checked.",
    signal: "Some evidence became traceable, but runner absence and terminology friction limited confidence.",
    confidenceImpact: "Medium confidence: better than Round 1, but still not enough for a strong comparison.",
  },
  {
    round: "Round 3",
    summary: "Measurable with higher confidence",
    changed: "Approved minimal runner, bounded execution, evidence collection, deviation handling, and post-run review were added.",
    expectedImpact: "Produce a controlled evidence set that could support a bounded owner decision.",
    signal: "Evidence completeness, traceability, execution readiness, and claim safety improved.",
    confidenceImpact: "Medium to medium-high confidence, depending on the metric. Higher confidence does not mean perfect proof.",
  },
]

const executionStages = [
  {
    title: "1. Source Validation",
    meaning: "Checked whether approval was enough to execute the task.",
    matters: "It prevented an authorization record from being mistaken for executable authority.",
    roundConnection: "This explains why Round 1 and early Round 2 were not yet strongly measurable.",
    evidence: "Source validation packet 20260619-1855, commit 64dce14.",
  },
  {
    title: "2. Command Repair",
    meaning: "Checked whether the original approved runner could be recovered.",
    matters: "It preserved credibility by refusing to pretend a missing runner existed.",
    roundConnection: "This converted a vague Round 2 gap into a specific evidence gap.",
    evidence: "Command repair packet 20260620-0518, commit 78c947a.",
  },
  {
    title: "3. Minimal Runner Design",
    meaning: "Designed a bounded runner candidate from approved sources.",
    matters: "It made execution possible without expanding the case-study scope.",
    roundConnection: "This is the bridge from Round 2 measurement rules to Round 3 execution readiness.",
    evidence: "Minimal runner design packet 20260620-0525, commit ec143c0.",
  },
  {
    title: "4. Runner Enablement",
    meaning: "Converted the approved runner candidate into limited executable authority.",
    matters: "It made clear that only the approved minimal runner was enabled.",
    roundConnection: "This is where Round 3 became executable within a bounded scope.",
    evidence: "Runner enablement packet 20260620-0532, commit 5ac26b8.",
  },
  {
    title: "5. Go or No-Go Review",
    meaning: "Separated true blockers from warnings before execution.",
    matters: "It kept warning-level issues visible without incorrectly blocking the controlled run.",
    roundConnection: "This raised confidence for Round 3 while preserving caveats.",
    evidence: "GO/NO-GO gate packet 20260620-0543, commit 03c1181.",
  },
  {
    title: "6. Controlled Execution",
    meaning: "Ran the bounded evidence-production pass.",
    matters: "It produced the evidence set that supports the Round 3 improvement claim.",
    roundConnection: "This is the key Round 3 change from readiness to actual controlled evidence.",
    evidence: "Execution evidence packet 20260620-0551, commit 7d7717f.",
  },
  {
    title: "7. Deviation Handling",
    meaning: "Classified a stale status-field mismatch as non-blocking with a caveat.",
    matters: "It showed that unexpected differences were not ignored.",
    roundConnection: "This improves Round 3 confidence but keeps stale-source risk monitored.",
    evidence: "Authority precedence note, commit b022612.",
  },
  {
    title: "8. Post-run Review",
    meaning: "Reviewed whether the evidence was ready for bounded owner claim review.",
    matters: "It turned execution evidence into a controlled decision packet rather than a broad public proof claim.",
    roundConnection: "This supports the Round 3 conclusion: stronger measurement, still controlled claims.",
    evidence: "Post-run Opus closeout packet 20260620-0606, commit b022612.",
  },
]

const terms = [
  ["Measurement Rules Used Across Rounds", "The comparison rules used consistently across Round 1, Round 2, and Round 3. Previously called the T4 Measurement Contract."],
  ["Round 3 Execution Scope", "The approved task and evidence checklist used for the bounded Round 3 run. Previously called the Round 3 Task Matrix."],
  ["Round-by-Round Comparison", "The main table comparing how each measurement parameter changed across rounds. Previously called Stage Comparison."],
  ["Measurement Signal", "The observable evidence that a metric improved, weakened, or stayed uncertain. This replaces telemetry for public readers."],
  ["What We Can and Cannot Claim", "The boundary that prevents evidence from being stretched into production, ROI, or real-world outcome claims."],
  ["Execution Readiness", "Whether the task could actually be run under approved authority. This replaces executability."],
  ["Confidence Level", "How safe it is to compare results based on structured, traceable, repeatable evidence."],
]

const forbiddenClaims = [
  "full automation",
  "production deployment proof",
  "business impact or ROI",
  "independent multi-agent execution",
  "real Company M outcome beyond the bounded case study",
  "Hermes comparison or replacement readiness",
  "whole-AIOS performance proof",
  "owner final public-claim approval",
]

export default function Case003Round3EvidenceLadderPage() {
  return (
    <PageLayout>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <Link href="/case-studies" className="mb-5 inline-flex text-sm font-medium text-primary hover:underline">
            Back to Case Studies
          </Link>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Company M case study</Badge>
            <Badge variant="outline">Round 1 to Round 3</Badge>
            <Badge variant="outline">Measurement maturity</Badge>
          </div>
          <h1 className="mt-4 max-w-5xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Company M CASE-003: Measuring AI Adoption Control Across Rounds
          </h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-muted-foreground sm:text-lg">
            This page shows how the same Company M portfolio case study became progressively more
            measurable across execution rounds. Round 1 had weak evidence and an unclear baseline.
            Round 2 became measurable but still low confidence. Round 3 became measurable with
            higher confidence because the evidence was more structured, traceable, and bounded.
          </p>
          <Alert className="mt-6 border-primary/25 bg-primary/5">
            <AlertDescription className="text-sm leading-6">
              Main conclusion: measurement maturity improved, but the limits on what can and cannot
              be claimed remain controlled.
              This is not a production deployment claim, ROI claim, full automation claim, or proof
              of real Company M business outcomes.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Reader path"
            title="Overview / Why This Exists"
            detail="These four plain-language cards explain the case study before the detailed evidence appears."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {storyCards.map((card) => (
              <ExplanationCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-primary/20 bg-primary/5 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Main measurement table"
            title="Evidence / What Changed"
            detail="This is the main evidence view. It shows what changed, why confidence changed, and what should happen next for each measurement parameter."
          />
          <div className="mt-4 rounded-lg border border-primary/20 bg-background p-4 text-sm leading-6 text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">How to read confidence:</span>{" "}
              confidence means how safe it is to compare the result across rounds based on available
              evidence. Higher confidence does not mean perfect proof. It means the evidence is more
              structured, traceable, and repeatable.
            </p>
          </div>
          <div className="mt-6 overflow-x-auto rounded-lg border border-border bg-background shadow-sm">
            <table className="min-w-[1180px] text-left text-sm">
              <thead className="border-b border-border bg-muted/40 text-xs uppercase text-muted-foreground">
                <tr>
                  {[
                    "Measurement parameter",
                    "Round 1 result",
                    "Round 2 result",
                    "Round 3 result",
                    "What changed",
                    "Confidence level",
                    "Decision",
                  ].map((header) => (
                    <th key={header} className="px-4 py-3 font-medium">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {measurementRows.map((row) => (
                  <tr key={row.parameter} className="border-b border-border align-top last:border-b-0">
                    <td className="px-4 py-4 leading-6">
                      <span className="font-medium text-foreground">{row.parameter}</span>
                      <span className="mt-1 block text-muted-foreground">{row.meaning}</span>
                    </td>
                    <td className="px-4 py-4 leading-6 text-muted-foreground">{row.round1}</td>
                    <td className="px-4 py-4 leading-6 text-muted-foreground">{row.round2}</td>
                    <td className="px-4 py-4 leading-6 text-muted-foreground">{row.round3}</td>
                    <td className="px-4 py-4 leading-6 text-muted-foreground">{row.changed}</td>
                    <td className="px-4 py-4 leading-6 text-muted-foreground">{row.confidence}</td>
                    <td className="px-4 py-4 leading-6">
                      <Badge variant="outline">{row.decision}</Badge>
                    </td>
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
            eyebrow="Round changes"
            title="What Changed Between Rounds"
            detail="Each round links implementation changes to expected impact, actual measurement signal, and confidence impact."
          />
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {roundChanges.map((round) => (
              <Card key={round.round}>
                <CardHeader>
                  <CardTitle className="text-base">{round.round}: {round.summary}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
                  <InfoLine label="What changed" value={round.changed} />
                  <InfoLine label="Expected impact" value={round.expectedImpact} />
                  <InfoLine label="Actual measurement signal" value={round.signal} />
                  <InfoLine label="Confidence impact" value={round.confidenceImpact} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/25 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Metric evolution"
            title="What Was Measured And Why Values Changed"
            detail="Each metric explains the round-by-round progression, evidence gap, interpretation, and monitoring decision."
          />
          <div className="mt-6 grid gap-4">
            {measurementRows.map((row) => (
              <Card key={row.parameter}>
                <CardHeader>
                  <CardTitle className="text-base">Metric: {row.parameter}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 text-sm leading-6 text-muted-foreground lg:grid-cols-[0.9fr_1fr_1fr_1fr]">
                  <div>
                    <p>{row.meaning}</p>
                    <InfoLine label="Interpretation" value={row.interpretation} />
                    <InfoLine label="Decision" value={row.decision} />
                  </div>
                  <RoundDetail title="Round 1" result={row.round1} why={row.round1Why} />
                  <RoundDetail title="Round 2" result={row.round2} why={row.round2Why} />
                  <RoundDetail title="Round 3" result={row.round3} why={row.round3Why} />
                  {row.parameter === "Owner decision readiness" ? (
                    <details className="rounded-md border border-primary/20 bg-primary/5 p-4 lg:col-span-4">
                      <summary className="cursor-pointer font-medium text-foreground">
                        View detailed values
                      </summary>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <InfoLine label="Round 1 value" value={row.round1} />
                        <InfoLine label="Round 2 value" value={row.round2} />
                        <InfoLine label="Round 3 value" value={row.round3} />
                        <InfoLine
                          label="Evidence basis"
                          value={`Round 1: ${row.round1Why} Round 2: ${row.round2Why} Round 3: ${row.round3Why}`}
                        />
                        <InfoLine label="Interpretation" value={row.interpretation} />
                        <InfoLine
                          label="Decision impact"
                          value={`${row.changed} Current decision: ${row.decision}.`}
                        />
                      </div>
                    </details>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>What This Proves</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
              <p>
                Confidence means how safe it is to compare the result across rounds based on available
                evidence. Higher confidence does not mean perfect proof. It means the evidence is more
                structured, traceable, and repeatable.
              </p>
              <InfoLine
                label="Higher confidence means"
                value="Evidence is structured, linked to artifacts and commits, and repeatable enough for another reviewer to inspect."
              />
              <InfoLine
                label="Higher confidence does not mean"
                value="Production readiness, business impact, zero uncertainty, full automation, or a real-world Company M outcome."
              />
            </CardContent>
          </Card>

          <Card className="border-destructive/20">
            <CardHeader>
              <CardTitle>What This Does Not Claim</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
              <p>
                The evidence supports a controlled execution evidence claim: measurement structure,
                traceability, and bounded owner decision readiness improved across rounds.
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {forbiddenClaims.map((claim) => (
                  <div key={claim} className="rounded-md border border-border bg-muted/25 px-3 py-2">
                    Not claimed: {claim}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-y border-border bg-muted/25 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Plain-language glossary"
            title="Internal Terms Renamed Or Explained"
            detail="The public labels below replace governance shorthand so the page does not require AIOS background knowledge."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {terms.map(([term, definition]) => (
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
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Detailed evidence"
            title="Round 3 Execution Scope: Stage-by-Stage Evidence"
            detail="These cards are supporting evidence, not the opening story. They explain how Round 3 produced the stronger measurement signal shown above."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {executionStages.map((stage) => (
              <ExplanationCard
                key={stage.title}
                title={stage.title}
                meaning={stage.meaning}
                matters={stage.matters}
                roundConnection={stage.roundConnection}
                evidence={stage.evidence}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/25 py-10">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>How Deviations Were Handled In Round 3</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
              <InfoLine
                label="What changed from Round 2"
                value="Round 2 surfaced warning-level issues. Round 3 recorded the stale-source deviation, classified it, and explained its claim impact."
              />
              <InfoLine
                label="Round 3 deviation"
                value="Older task-status fields still reflected an earlier pre-approval state."
              />
              <InfoLine
                label="Handling"
                value="Newer validated owner authorization, runner approval, enablement, execution evidence, and post-run review records override stale fields."
              />
              <InfoLine
                label="Confidence impact"
                value="Non-blocking for controlled execution evidence, but stale-source risk remains a monitored measurement parameter."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What To Keep, Improve, Or Remove</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
              <InfoLine
                label="Keep monitoring"
                value="Measurability, traceability, evidence completeness, execution readiness, claim safety, owner decision readiness, and stale-source risk."
              />
              <InfoLine
                label="Improve measurement"
                value="Deviation handling, reviewer confidence language, and workflow friction."
              />
              <InfoLine
                label="Cut from dashboard"
                value="No measurement parameter should be cut yet; each still protects public credibility."
              />
              <InfoLine
                label="Not enough evidence yet"
                value="Business impact, production readiness, and independent multi-agent execution should stay off this dashboard because they were not measured."
              />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t border-border bg-background py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Current Status / Next Step</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Recommended bounded label:</span>{" "}
                CASE003_ROUND3_OWNER_APPROVED_WITH_CAVEAT_CONTROLLED_EXECUTION_EVIDENCE_CLAIM
              </p>
              <p>
                The next safe decision is whether to keep monitoring the controlled evidence claim,
                improve the measurement wording and deviation handling, or hold broader claims as
                not enough evidence yet. This page does not request deployment or public-proof approval.
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
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{detail}</p>
    </div>
  )
}

function ExplanationCard({
  title,
  meaning,
  matters,
  roundConnection,
  evidence,
}: {
  title: string
  meaning: string
  matters: string
  roundConnection: string
  evidence?: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
        <p>{meaning}</p>
        <InfoLine label="Why it matters" value={matters} />
        <InfoLine label="Round 1 / Round 2 / Round 3 connection" value={roundConnection} />
        {evidence ? <InfoLine label="Evidence" value={evidence} /> : null}
      </CardContent>
    </Card>
  )
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="font-medium text-foreground">{label}:</span> {value}
    </p>
  )
}

function RoundDetail({ title, result, why }: { title: string; result: string; why: string }) {
  return (
    <div className="rounded-md border border-border bg-background p-3">
      <p className="font-medium text-foreground">{title}</p>
      <p className="mt-2">{result}</p>
      <p className="mt-2">
        <span className="font-medium text-foreground">Why / caveat:</span> {why}
      </p>
    </div>
  )
}
