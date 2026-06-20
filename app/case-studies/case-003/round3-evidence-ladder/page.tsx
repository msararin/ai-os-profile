import { PageLayout } from "@/components/page-layout"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const constants = [
  ["Case study", "CASE-003 Round 3"],
  ["Scope", "Approved owner-authorized packet"],
  ["Task source", "Round 3 task matrix"],
  ["Measurement boundary", "T4 measurement contract"],
  ["Claim constraint", "No public/prod/ROI/Hermes/replacement/full-orchestration claim"],
  ["Evidence rule", "Missing evidence downgrades claim; deviation triggers RCA"],
  ["Authority rule", "Newer validated authority records override stale status fields"],
]

const dimensions = [
  ["Executability", "Could the task be executed under approved authority?"],
  ["Authority completeness", "Did approval map to a runnable control surface?"],
  ["Runner availability", "Was there an approved command or runner?"],
  ["Evidence completeness", "Were required outputs and evidence produced?"],
  ["Deviation handling", "Were unexpected differences detected, classified, and contained?"],
  ["Claim safety", "Did the claim stay within evidence boundaries?"],
  ["Reviewer confidence", "Did Opus and Runner Gang support progression?"],
  ["Owner decision readiness", "Is the result ready for owner claim approval?"],
]

const ladderStages = [
  {
    letter: "A",
    title: "Source Validation Achievement",
    verdict: "ROUND3_NOT_EXECUTED_BLOCKED_BY_SOURCE_VALIDATION",
    gained: "Authorization alone is not executable authority.",
    achievement:
      "Detected that owner approval existed while the controlled packet lacked an approved command or runner and execution remained disabled.",
    commit: "64dce14",
    evidence: "Source validation packet 20260619-1855",
  },
  {
    letter: "B",
    title: "Runner Recovery Achievement",
    verdict: "ROUND3_STILL_BLOCKED_APPROVED_COMMAND_NOT_FOUND",
    gained: "The original runner was not recoverable, and the system refused to pretend otherwise.",
    achievement:
      "Confirmed zero recoverable approved runner candidates and preserved claim integrity.",
    commit: "78c947a",
    evidence: "Command repair packet 20260620-0518",
  },
  {
    letter: "C",
    title: "Minimal Runner Design Achievement",
    verdict: "MINIMAL_RUNNER_SPEC_READY_FOR_OWNER_APPROVAL_NOT_EXECUTABLE_YET",
    gained:
      "A new bounded runner candidate can be designed from approved sources without expanding scope.",
    achievement:
      "Created minimal runner spec, owner approval packet, validation checklist, missing evidence rule, and deviation RCA rule.",
    commit: "ec143c0",
    evidence: "Minimal runner design packet 20260620-0525",
  },
  {
    letter: "D",
    title: "Runner Approval And Enablement Achievement",
    verdict: "ROUND3_MINIMAL_RUNNER_APPROVED_EXECUTION_ENABLED_NOT_YET_RUN",
    gained:
      "A runner candidate can be converted into executable authority through owner approval and enablement.",
    achievement: "Enabled execution only as true_for_approved_minimal_runner_only.",
    commit: "5ac26b8",
    evidence: "Runner enablement packet 20260620-0532",
  },
  {
    letter: "E",
    title: "Opus And Runner Gang Gate Achievement",
    verdict: "ROUND3_GO_FOR_EXECUTION_WITH_LIMITED_CONDITIONS",
    gained: "Reviewer and deterministic preflight can distinguish true blockers from warnings.",
    achievement:
      "Opus returned GO_WITH_LIMITED_CONDITIONS. Runner Gang returned PASS_WITH_WARNINGS. True blockers: none.",
    commit: "03c1181",
    evidence: "GO/NO-GO gate packet 20260620-0543",
  },
  {
    letter: "F",
    title: "Controlled Execution Achievement",
    verdict: "ROUND3_EXECUTED_EVIDENCE_READY_FOR_POST_RUN_OPUS_CLOSEOUT",
    gained: "The approved minimal runner can produce a complete controlled evidence set.",
    achievement:
      "Created the runner script, ran the bounded evidence-production pass, produced complete evidence, and found no missing evidence.",
    commit: "7d7717f",
    evidence: "Execution evidence packet 20260620-0551",
  },
  {
    letter: "G",
    title: "Deviation And Authority-Precedence Achievement",
    verdict: "NON_BLOCKING_DEVIATION_CONTAINED_WITH_AUTHORITY_PRECEDENCE",
    gained:
      "The system can detect stale authority fields and prevent them from overriding newer validated records.",
    achievement:
      "Recorded RCA and mitigation. Newer owner authorization, runner approval, enablement, GO/NO-GO, execution evidence, and post-run Opus records were treated as authoritative.",
    commit: "b022612",
    evidence: "Authority precedence note",
  },
  {
    letter: "H",
    title: "Post-run Opus Closeout Achievement",
    verdict: "ROUND3_POST_RUN_OPUS_APPROVED_WITH_CAVEATS_FOR_OWNER_CLAIM_REVIEW",
    gained: "Execution evidence is sufficient for owner claim review, with claim boundary preserved.",
    achievement: "Opus approved with small patch and codified the authority-precedence caveat.",
    commit: "b022612",
    evidence: "Post-run Opus closeout packet 20260620-0606",
  },
]

const comparisonRows = [
  [
    "Source Validation",
    "Detected authorization-to-execution gap",
    "Blocked",
    "Incomplete",
    "Missing",
    "Not run",
    "None",
    "Source validation blocked",
    "Blocker recorded",
    "Proved authorization was not enough",
  ],
  [
    "Command Repair",
    "Proved original runner absence",
    "Blocked",
    "Incomplete",
    "Not recoverable",
    "Not run",
    "None",
    "Recovery failed cleanly",
    "Runner absence proven",
    "Changed diagnosis from missing reference to no recoverable runner",
  ],
  [
    "Minimal Runner Design",
    "Created bounded runner candidate",
    "Not yet executable",
    "Candidate only",
    "Designed",
    "Not run",
    "Rules defined",
    "Ready for owner approval",
    "Runner design readiness",
    "Created new runner candidate without scope expansion",
  ],
  [
    "Runner Enablement",
    "Converted approval into executable authority",
    "Enabled for approved minimal runner only",
    "Complete for limited execution",
    "Approved",
    "Not run",
    "Rules preserved",
    "Source validation passed",
    "Execution enabled, not completed",
    "Approval became executable authority",
  ],
  [
    "GO/NO-GO Gate",
    "Separated warnings from true blockers",
    "Go with limited conditions",
    "Accepted",
    "Approved with warning",
    "Not run",
    "Stale status warning noted",
    "Opus and Runner Gang passed with caveats",
    "Go for execution",
    "True blockers cleared",
  ],
  [
    "Execution",
    "Produced complete execution evidence",
    "Bounded pass completed",
    "Used",
    "Script created and run",
    "Complete",
    "One non-blocking deviation with RCA",
    "Ready for post-run Opus",
    "Controlled execution evidence",
    "Enabled execution became actual evidence",
  ],
  [
    "Post-run Opus",
    "Evidence became owner-review ready",
    "Completed and reviewed",
    "Accepted with caveat",
    "Accepted within boundary",
    "Complete",
    "Non-blocking, caveat codified",
    "Approved with small patch",
    "Controlled execution evidence ready for owner decision",
    "Execution result became review-ready claim boundary",
  ],
]

const evidenceRows = [
  ["Source Validation", "Source validation packet 20260619-1855", "Pre-execution validation", "64dce14", "ROUND3_NOT_EXECUTED_BLOCKED_BY_SOURCE_VALIDATION"],
  ["Command Repair", "Command repair packet 20260620-0518", "Approved command repair result", "78c947a", "ROUND3_STILL_BLOCKED_APPROVED_COMMAND_NOT_FOUND"],
  ["Minimal Runner Design", "Minimal runner design packet 20260620-0525", "Minimal approved runner spec", "ec143c0", "MINIMAL_RUNNER_SPEC_READY_FOR_OWNER_APPROVAL_NOT_EXECUTABLE_YET"],
  ["Runner Enablement", "Runner enablement packet 20260620-0532", "Controlled packet enablement record", "5ac26b8", "ROUND3_MINIMAL_RUNNER_APPROVED_EXECUTION_ENABLED_NOT_YET_RUN"],
  ["GO/NO-GO Gate", "GO/NO-GO gate packet 20260620-0543", "Opus and Runner Gang decision", "03c1181", "ROUND3_GO_FOR_EXECUTION_WITH_LIMITED_CONDITIONS"],
  ["Execution", "Execution evidence packet 20260620-0551", "Execution verdict", "7d7717f", "ROUND3_EXECUTED_EVIDENCE_READY_FOR_POST_RUN_OPUS_CLOSEOUT"],
  ["Post-run Opus", "Post-run Opus closeout packet 20260620-0606", "Claim boundary assessment", "b022612", "ROUND3_POST_RUN_OPUS_APPROVED_WITH_CAVEATS_FOR_OWNER_CLAIM_REVIEW"],
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
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">CASE-003</Badge>
            <Badge variant="outline">Round 3</Badge>
            <Badge variant="outline">Controlled execution evidence</Badge>
          </div>
          <h1 className="mt-4 max-w-5xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            CASE-003 Round 3 Controlled Execution Evidence Ladder
          </h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-muted-foreground sm:text-lg">
            Same case study, different control layers: measuring how authority, runner readiness,
            evidence completeness, deviation handling, and claim safety matured across each stage.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>ROUND3_POST_RUN_OPUS_APPROVED_WITH_CAVEATS_FOR_OWNER_CLAIM_REVIEW</Badge>
            <Badge variant="outline">No claim beyond controlled execution evidence</Badge>
          </div>
          <Alert className="mt-6 border-primary/25 bg-primary/5">
            <AlertDescription className="text-sm leading-6">
              CASE-003 Round 3 demonstrated a controlled AI execution lifecycle:
              owner-authorized scope, approved minimal runner, bounded execution,
              complete local evidence capture, deviation RCA, authority-precedence handling,
              and post-run Opus review readiness.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Constant variable"
            title="What Stayed Constant"
            detail="The repeated stages were controlled measurements against the same case study, not random rework."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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

      <section className="border-y border-border bg-muted/25 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Measurement dimensions"
            title="What Was Measured"
            detail="Each stage is compared against the same eight maturity dimensions."
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dimensions.map(([label, question]) => (
              <div key={label} className="rounded-lg border border-border bg-background p-4">
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{question}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Achievement ladder"
            title="Stage-by-stage Achievement"
            detail="Each rung records a measured control gain and preserves the claim boundary."
          />
          <div className="mt-8 space-y-4">
            {ladderStages.map((stage) => (
              <Card key={stage.letter} className="overflow-hidden">
                <CardContent className="grid gap-4 p-5 lg:grid-cols-[72px_1fr_220px]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-lg font-semibold text-primary-foreground">
                    {stage.letter}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold text-foreground">{stage.title}</h3>
                      <Badge variant="outline">{stage.verdict}</Badge>
                    </div>
                    <p className="mt-3 text-sm font-medium text-foreground">
                      Measurement gained: {stage.gained}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{stage.achievement}</p>
                  </div>
                  <div className="rounded-md border border-border bg-muted/30 p-3 text-sm">
                    <p className="font-medium text-foreground">Commit {stage.commit}</p>
                    <p className="mt-2 leading-5 text-muted-foreground">{stage.evidence}</p>
                  </div>
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
            title="Stage Comparison"
            detail="The table makes the maturity progression scannable without converting evidence into broader proof."
          />
          <div className="mt-6 overflow-x-auto rounded-lg border border-border bg-background">
            <table className="min-w-[1180px] text-left text-sm">
              <thead className="border-b border-border bg-muted/40 text-xs uppercase text-muted-foreground">
                <tr>
                  {[
                    "Stage",
                    "Achievement",
                    "Executability",
                    "Authority",
                    "Runner",
                    "Evidence",
                    "Deviation",
                    "Reviewer",
                    "Claim",
                    "Delta",
                  ].map((header) => (
                    <th key={header} className="px-4 py-3 font-medium">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
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
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Claim Ladder</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
              {[
                "No execution claim",
                "Blocker recorded",
                "Runner absence proven",
                "Minimal runner candidate designed",
                "Runner approved and enabled",
                "GO for execution with limited conditions",
                "Controlled execution evidence produced",
                "Controlled execution evidence ready for owner decision",
              ].map((item, index) => (
                <div key={item} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-secondary text-xs font-semibold text-secondary-foreground">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
              <div className="rounded-md border border-primary/20 bg-primary/5 p-3 text-foreground">
                CONTROLLED_EXECUTION_EVIDENCE_CLAIM_READY_FOR_OWNER_DECISION
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Deviation Handling</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Deviation:</span> stale task-matrix
                status fields still reflected an earlier pre-approval state.
              </p>
              <p>
                <span className="font-medium text-foreground">Classification:</span> non-blocking.
              </p>
              <p>
                <span className="font-medium text-foreground">RCA:</span> task-matrix status fields
                were older than the later authority records and review packets.
              </p>
              <p>
                <span className="font-medium text-foreground">Claim impact:</span> does not block
                controlled execution evidence, but the caveat must carry forward.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-y border-border bg-muted/25 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Card className="border-primary/20 bg-background">
            <CardHeader>
              <CardTitle>Authority Precedence Rule</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              Stale task-matrix status fields must not override newer owner authorization,
              minimal runner approval, controlled enablement, GO/NO-GO, execution evidence,
              or post-run Opus closeout records.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Evidence map"
            title="Artifact And Commit Navigation"
            detail="Public-safe evidence labels keep the chain traceable without exposing local paths."
          />
          <div className="mt-6 overflow-x-auto rounded-lg border border-border">
            <table className="min-w-[900px] text-left text-sm">
              <thead className="border-b border-border bg-muted/40 text-xs uppercase text-muted-foreground">
                <tr>
                  {["Stage", "Evidence label", "Key artifact", "Commit", "Verdict"].map((header) => (
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
        </div>
      </section>

      <section className="border-t border-border bg-background py-10">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <Card className="border-destructive/20">
            <CardHeader>
              <CardTitle>Still Not Claimed</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              {forbiddenClaims.map((claim) => (
                <div key={claim} className="rounded-md border border-border bg-muted/25 px-3 py-2">
                  {claim}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Decision</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Decision status:</span> pending.
              </p>
              <p>
                <span className="font-medium text-foreground">Recommended label:</span>{" "}
                CASE003_ROUND3_OWNER_APPROVED_WITH_CAVEAT_CONTROLLED_EXECUTION_EVIDENCE_CLAIM
              </p>
              <p>
                Owner approval may approve only the controlled execution evidence claim, not
                public/prod/ROI/Hermes/replacement/full-orchestration claims.
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
