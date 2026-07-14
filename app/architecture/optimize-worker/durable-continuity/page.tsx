import type { Metadata } from "next"
import Link from "next/link"
import { PageLayout } from "@/components/page-layout"

export const metadata: Metadata = {
  title: "Durable Workflow Continuity | Optimize-Worker Architecture",
  description:
    "How Optimize-Worker moved from session-bound execution to bounded crash and cross-session recovery—and why LangGraph remains parked pending evidence.",
}

const signals = [
  ["Context items reopened", "36", "1", "Bounded reconstruction burden reduced"],
  ["Repeated completed steps", "5", "0", "No repeated completed step observed"],
  ["Observed live-state loss", "4", "0", "No state loss observed in the bounded run"],
  ["Artifact completeness", "Not established", "71/71", "Authenticated stress corpus recovered completely"],
]

const comparisons = [
  ["Architecture intention for central orchestration", "Canonical bounded durable-checkpoint primitive", "Implementation exists on canonical main"],
  ["Session-local workflow state", "SQLite WAL-backed persisted checkpoint state", "Pause and resume from persisted state"],
  ["Manual context reconstruction", "Checkpoint-assisted restoration", "Context items reopened 36 → 1 in the paired experiment"],
  ["Completed work vulnerable to repetition", "Persisted completed-step tracking", "Repeated completed steps 5 → 0"],
  ["Live state vulnerable to interruption", "Versioned persisted workflow state", "Observed state loss 4 → 0"],
  ["Normal interruption proof only", "Worker stop, forced crash and expired-lock recovery", "No false completed state after the forced crash"],
  ["Same-session continuity", "Genuine cross-Codex-session resume", "Workflow reached COMPLETED, checkpoint version 6"],
  ["Small evidence bundle", "Authenticated 71-file PM Brain stress corpus", "Artifact completeness 71/71"],
  ["Implicit side-effect behavior", "Caller-controlled durable side-effect marker", "Side effect remained 1 → 1; runtime idempotency not proven"],
  ["Possible LangGraph adoption", "Thin custom runtime retained", "LangGraph parked pending evidence triggers"],
  ["Human value implied by automation", "Fresh Codex re-entry measured separately", "137 seconds; controlled human value remains unresolved"],
]

const criteria = [
  ["Demonstrated problem", "State continuity after interruption", "Thin checkpoint directly addresses it"],
  ["Dynamic branching, cycles or subgraphs", "No material complexity demonstrated", "No graph framework required yet"],
  ["Distributed execution", "Not currently required; local locking only", "Do not pre-build distributed orchestration"],
  ["Pause/resume and recovery", "Proven in bounded forced-crash and cross-session cases", "Retain current runtime"],
  ["State-model maintenance burden", "No material burden demonstrated", "Additional abstraction not justified"],
  ["Human-in-the-loop complexity", "Current review/revision/approval loop remains manageable", "No material trigger yet"],
  ["Replay or time travel", "No demonstrated operational requirement", "Defer framework expansion"],
  ["External side-effect idempotency", "Caller-controlled", "Must be solved explicitly regardless of framework"],
  ["Human/operator value", "No controlled human baseline", "Gather evidence; do not change framework to solve a measurement gap"],
  ["Migration net benefit", "No comparative evidence", "LangGraph remains parked"],
]

const triggers = [
  "Dynamic branches, cycles or subgraphs create measurable defects or maintenance burden.",
  "Multiple remote workers require distributed leases or concurrent ownership.",
  "Approval, interruption, revision and escalation semantics exceed the current state model.",
  "Replay, time travel or partial re-execution becomes an operational requirement.",
  "Custom checkpoint maintenance or test cost exceeds the likely migration cost.",
  "Existing telemetry cannot explain execution path, state transition or failure origin.",
  "Workflow types and integrations create demonstrable orchestration sprawl.",
  "A bounded LangGraph spike demonstrates measurable net benefit.",
]

const proven = [
  "Persisted pause/resume works.",
  "Forced-crash recovery preserved a valid non-completed state.",
  "Genuine cross-Codex-session resume completed.",
  "Completed-step repetition and observed state loss were zero.",
  "Stale/corrupt checkpoint detection passed bounded cases.",
  "Artifact completeness was 71/71.",
  "A caller-controlled side-effect marker prevented repetition.",
]

const notProven = [
  "Controlled human productivity improvement or universal speed improvement.",
  "Business value or production reliability.",
  "Distributed safety.",
  "Runtime-guaranteed external-side-effect idempotency.",
  "Full Big Crew workflow readiness.",
  "Superiority over LangGraph.",
]

const chip = "rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground"
const card = "rounded-2xl border border-border bg-card p-5 shadow-sm"

export default function DurableContinuityPage() {
  return (
    <PageLayout>
      <main>
        <section className="border-b border-border bg-gradient-to-b from-[#E6EEF8] to-background">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
              <Link href="/architecture" className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Architecture</Link>
              <span aria-hidden="true"> / </span>Optimize-Worker / Durable Continuity
            </nav>
            <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Component Architecture Evolution</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              From session-bound execution to durable workflow continuity
            </h1>
            <p className="mt-4 max-w-3xl text-xl font-medium text-foreground">Proven mechanically; human value unresolved.</p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
              Optimize-Worker now preserves bounded workflow state across interruption, forced crash and a genuine Codex session boundary. The evidence proves mechanical continuity—not universal speed, human productivity or production reliability.
            </p>
            <div className="mt-6 flex flex-wrap gap-2" aria-label="Current status">
              <span className={chip}>Implemented on canonical main</span><span className={chip}>Bounded stress complete</span><span className={chip}>No overall operational pass</span>
            </div>
          </div>
        </section>

        <section className="py-12" aria-labelledby="executive-summary">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
              <div><p className="text-sm font-semibold uppercase tracking-wide text-primary">Executive Summary</p><h2 id="executive-summary" className="mt-2 text-3xl font-semibold tracking-tight">The smallest sufficient response to the demonstrated problem</h2>
                <div className="mt-5 space-y-4 text-base leading-7 text-muted-foreground">
                  <p>We built a bounded durable-checkpoint primitive before adopting LangGraph because the demonstrated problem was continuity loss after interruption—not graph topology or distributed orchestration.</p>
                  <p>The thin checkpoint solved the mechanical problem: reopened context fell from 36 items to 1, repeated completed steps fell from 5 to 0, observed state loss fell from 4 to 0, and the workflow recovered through a forced crash and a genuine cross-Codex-session resume.</p>
                  <p>LangGraph remains parked pending stronger complexity triggers and bounded net-benefit proof. This page documents mechanical proof, not a production recommendation. Human operational value remains unresolved because the 137-second observation represents fresh Codex re-entry, not a controlled human baseline.</p>
                </div>
              </div>
              <dl className={card}><div><dt className="text-xs uppercase tracking-wide text-muted-foreground">Runtime strategy</dt><dd className="mt-1 font-semibold">Retain thin durable checkpoint</dd></div><div className="mt-5"><dt className="text-xs uppercase tracking-wide text-muted-foreground">LangGraph</dt><dd className="mt-1 font-semibold">Parked, not rejected</dd></div><div className="mt-5"><dt className="text-xs uppercase tracking-wide text-muted-foreground">Reconsideration</dt><dd className="mt-1 text-sm">At least two material triggers plus bounded net-benefit proof</dd></div><div className="mt-5"><dt className="text-xs uppercase tracking-wide text-muted-foreground">Human value</dt><dd className="mt-1 font-semibold">Unresolved</dd></div></dl>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-muted/30 py-12" aria-labelledby="evolution-heading"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><h2 id="evolution-heading" className="text-2xl font-semibold">Architecture Evolution</h2><p className="mt-2 max-w-3xl text-muted-foreground">The architecture changed at the point of failure: workflow state, not orchestration breadth.</p>
          <figure role="img" aria-labelledby="evolution-heading" className="mt-7 grid gap-5 lg:grid-cols-2">
            <div className={`${card} border-l-4 border-l-amber-500`}><p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Before</p><div className="mt-4 grid gap-3"><Step>Session-bound execution</Step><Arrow/><Step>Interruption</Step><Arrow/><Step>Manual context reconstruction</Step><Arrow/><Step>Repeated-step and state-loss risk</Step></div></div>
            <div className={`${card} border-l-4 border-l-[#00B494]`}><p className="text-xs font-semibold uppercase tracking-wide text-[#007d68]">After</p><div className="mt-4 grid gap-3"><Step>Durable checkpoint runtime</Step><Arrow/><Step>Persisted SQLite WAL state</Step><Arrow/><Step>Crash and cross-session resume</Step><Arrow/><Step>Continue from last valid state</Step></div></div>
            <figcaption className="sr-only">Before, interruption required manual reconstruction and exposed repeated-step and state-loss risk. After, SQLite checkpoint state supports bounded crash and cross-session continuation.</figcaption>
          </figure>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{signals.map(([name,before,after,meaning])=><article key={name} className={card}><h3 className="text-sm font-semibold">{name}</h3><p className="mt-4 text-2xl font-semibold"><span className="text-muted-foreground">{before}</span> <span aria-hidden="true">→</span> {after}</p><p className="mt-3 text-xs leading-5 text-muted-foreground">{meaning}</p></article>)}</div>
        </div></section>

        <section className="py-12" aria-labelledby="comparison-heading"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><h2 id="comparison-heading" className="text-2xl font-semibold">From → To → Result</h2><div className="mt-6 grid gap-4">{comparisons.map(([from,to,result])=><article key={from} className="grid gap-4 rounded-xl border border-border bg-card p-4 md:grid-cols-3"><div><p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">From</p><p className="mt-2 text-sm">{from}</p></div><div><p className="text-xs font-semibold uppercase tracking-wide text-primary">To</p><p className="mt-2 text-sm">{to}</p></div><div><p className="text-xs font-semibold uppercase tracking-wide text-[#007d68]">Result</p><p className="mt-2 text-sm">{result}</p></div></article>)}</div></div></section>

        <section className="border-y border-border bg-muted/30 py-12" aria-labelledby="evidence-heading"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><h2 id="evidence-heading" className="text-2xl font-semibold">Evidence that changed the architecture</h2><div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{["The paired run established mechanical continuity improvement.","The stress extension authenticated 71 artifacts across three interruption points.","A forced process crash preserved REVISION_REQUIRED rather than a false completed state.","A separate process recovered an expired lock and persisted WAITING_APPROVAL.","A genuinely new Codex session resumed and completed checkpoint version 6.","Stale/corrupt cases were detected; the caller-controlled marker prevented repetition."].map(item=><p key={item} className={card}>{item}</p>)}</div><aside className="mt-6 rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground"><strong className="text-foreground">Test methodology boundary:</strong> Fresh Codex re-entry took 137 seconds and reread three experiment artifacts. There was no directly timed human baseline, so this is not evidence of human-time saving.</aside></div></section>

        <section className="py-12" aria-labelledby="recovery-heading"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><h2 id="recovery-heading" className="text-2xl font-semibold">Runtime Recovery Flow</h2><p className="mt-3 text-xs text-muted-foreground" aria-label="Sequence legend">◆ state checkpoint · ⚠ failure point · ✓ recovery</p><figure role="img" aria-labelledby="recovery-heading" className="mt-6"><div className="grid gap-3 md:grid-cols-5"><State label="Worker" note="◆ checkpoint v3"/><State label="Waiting review" note="review begins"/><State label="Revision required" note="⚠ forced crash, exit 97"/><State label="Waiting approval" note="✓ lock recovery, v5"/><State label="Completed" note="✓ new Codex session, v6"/></div><figcaption className="mt-4 text-sm text-muted-foreground">Cross-session resume was genuine, not simulated. External side-effect safety remained caller-controlled. Local advisory locking does not imply distributed-worker safety.</figcaption></figure></div></section>

        <section className="border-y border-border bg-muted/30 py-12" aria-labelledby="langgraph-heading"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><h2 id="langgraph-heading" className="text-2xl font-semibold">Why not LangGraph yet</h2><p className="mt-4 max-w-4xl leading-7 text-muted-foreground">The current evidence shows a continuity problem that the smaller checkpoint primitive addresses. It does not yet demonstrate dynamic graph complexity, distributed execution, replay complexity or maintenance burden sufficient to justify framework migration. LangGraph is parked—not rejected—and remains eligible when evidence changes.</p>
          <figure role="img" aria-labelledby="langgraph-decision" className="mt-7"><h3 id="langgraph-decision" className="text-lg font-semibold">LangGraph Decision</h3><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><State label="New workflow need" note="Evaluate current runtime"/><State label="Thin checkpoint sufficient?" note="Yes: retain"/><State label="At least 2 material triggers?" note="No: retain · Yes: spike"/><State label="Bounded spike shows net benefit?" note="Only then: separate adoption decision"/></div><figcaption className="mt-4 text-sm text-muted-foreground">Framework adoption requires material triggers, measured net benefit, acceptable migration risk and separate architecture authority.</figcaption></figure>
        </div></section>

        <section className="py-12" aria-labelledby="criteria-heading"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><h2 id="criteria-heading" className="text-2xl font-semibold">Decision Criteria</h2><div className="mt-6 overflow-hidden rounded-xl border border-border"><div className="hidden grid-cols-3 bg-muted p-3 text-xs font-semibold uppercase tracking-wide md:grid"><span>Criterion</span><span>Current evidence</span><span>Decision implication</span></div>{criteria.map(([a,b,c])=><div key={a} className="grid gap-2 border-t border-border p-4 text-sm first:border-t-0 md:grid-cols-3"><strong>{a}</strong><span className="text-muted-foreground">{b}</span><span>{c}</span></div>)}</div></div></section>

        <section className="border-y border-border bg-muted/30 py-12" aria-labelledby="triggers-heading"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><h2 id="triggers-heading" className="text-2xl font-semibold">Reconsideration Triggers</h2><ol className="mt-6 grid gap-4 sm:grid-cols-2">{triggers.map((item,index)=><li key={item} className={card}><span className="text-sm font-semibold text-primary">{String(index+1).padStart(2,"0")}</span><p className="mt-2 text-sm leading-6">{item}</p></li>)}</ol><pre className="mt-6 overflow-x-auto rounded-xl bg-[#1F3A60] p-5 text-xs leading-6 text-white"><code>AT_LEAST_TWO_MATERIAL_TRIGGERS{"\n"}+ BOUNDED_SPIKE_SHOWS_MEASURABLE_NET_BENEFIT{"\n"}+ MIGRATION_RISK_IS_ACCEPTABLE{"\n"}+ SEPARATE_ARCHITECTURE_AUTHORITY_IS_GRANTED</code></pre><p className="mt-3 text-xs text-muted-foreground">This is a bounded governance rule for this decision, not an industry standard.</p></div></section>

        <section className="py-12" aria-labelledby="boundary-heading"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><h2 id="boundary-heading" className="text-2xl font-semibold">Proven / Not Proven</h2><div className="mt-6 grid gap-5 lg:grid-cols-2"><BoundaryPanel title="Proven within bounded evidence" items={proven} tone="mint"/><BoundaryPanel title="Not proven — an honest evidence boundary" items={notProven} tone="blue"/></div></div></section>

        <section className="border-y border-border bg-[#1F3A60] py-12 text-white" aria-labelledby="status-heading"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><h2 id="status-heading" className="text-2xl font-semibold">Current Architecture Status</h2><div className="mt-6 grid min-w-0 gap-3 font-mono text-sm"><code className="break-all">CANONICAL_BOUNDED_DURABLE_CHECKPOINT_IMPLEMENTED</code><code className="break-all">MECHANICAL_CHECKPOINT_STRESS_CRITERIA_PASSED</code><code className="break-all">HUMAN_OPERATIONAL_VALUE_UNRESOLVED</code><code className="break-all">LANGGRAPH_PARKED</code></div><p className="mt-6 max-w-3xl text-sm leading-6 text-blue-100">Optimize-Worker has a canonical bounded recovery capability. Its mechanical behavior survived the tested interruptions. The evidence does not yet justify a human-value claim, a production-reliability claim or a framework migration.</p></div></section>

        <section className="py-12" aria-labelledby="references-heading"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><h2 id="references-heading" className="text-2xl font-semibold">Evidence References</h2><details className="mt-6 rounded-xl border border-border bg-card p-5"><summary className="cursor-pointer font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">View public-safe evidence identities</summary><ul className="mt-4 space-y-3 text-sm text-muted-foreground"><li>Canonical implementation — commit <code>e902d336…</code>, tree <code>acdfc7a9…</code></li><li>Paired real-workload experiment — 36→1, 5→0, 4→0</li><li>Bounded stress validation — 71/71 artifacts</li><li>Cross-session result — COMPLETED, checkpoint v6</li><li>Final interpretation — mechanical criteria passed; human value unresolved; no overall pass</li><li>KB custody — local commit preserved; remote inclusion not claimed</li></ul></details></div></section>
      </main>
    </PageLayout>
  )
}

function Step({children}:{children:React.ReactNode}) { return <div className="rounded-lg border border-border bg-background p-3 text-sm font-medium">{children}</div> }
function Arrow(){return <div aria-hidden="true" className="text-center text-muted-foreground">↓</div>}
function State({label,note}:{label:string;note:string}){return <div className="relative rounded-xl border border-border bg-card p-4"><p className="font-semibold">{label}</p><p className="mt-2 text-xs leading-5 text-muted-foreground">{note}</p></div>}
function BoundaryPanel({title,items,tone}:{title:string;items:string[];tone:"mint"|"blue"}){return <section className={`${card} ${tone==="mint"?"border-t-4 border-t-[#00B494]":"border-t-4 border-t-[#1F3A60]"}`}><h3 className="text-lg font-semibold">{title}</h3><ul className="mt-4 space-y-3">{items.map(item=><li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground"><span aria-hidden="true">{tone==="mint"?"✓":"○"}</span><span>{item}</span></li>)}</ul></section>}
