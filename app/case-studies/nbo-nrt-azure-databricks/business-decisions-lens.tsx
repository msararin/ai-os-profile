import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

const actions = ["BUNDLE", "DATA", "LOYALTY", "ROAMING", "VOICE"]

const alignment = [
  ["Product catalogue modernization", "Product and offer data ingestion"],
  ["Behavioural, transactional, and event modernization", "Customer-signal and event ingestion"],
  ["ETL migration", "Databricks Bronze-Silver processing as a PoC implementation choice"],
  ["Data to M5", "Low-latency event and payment-data preparation; M5 remains a traceability label only"],
  ["Episodic NBO model interval", "Governed recommendation interval without inferring undocumented source semantics"],
  ["NBO model direction", "Policy learning remains the direction; completed baseline and OPE lanes remain distinct"],
  ["TMF680 to LID680", "TMF680-aligned output with a simulated handoff; LID680 remains a traceability label only"],
  ["PII hashing checkpoints", "Identifier-protection controls represented without asserting production placement"],
]

const journey = [
  {
    label: "Experiment 1",
    title: "Prove the governed path",
    decision: "Retain as lifecycle and diagnostic evidence.",
    boundary: "Pipeline/MLOps execution and model registration/read-back passed. Default-threshold classification failed; discrimination remained weak-to-moderate; business readiness was NOT READY; production promotion was NOT AUTHORIZED. SYNTHETIC_EXPERIMENT_ONLY — not operator truth or production performance evidence.",
    facts: ["Default 0.50: no positive predictions; precision / recall / F1 = 0", "ROC AUC 0.6294 · PR AUC 0.3941", "Analyzed 0.24 (NOT APPROVED): F1 0.4955 · precision 0.3421 · recall 0.8984", "Candidate cannot become Champion without real-world validation and production governance"],
  },
  {
    label: "Experiment 2A",
    title: "Keep the generalization issue visible",
    decision: "Do not tune away or overwrite the held-out failure.",
    boundary: "The supervised-model issue remains a separate diagnostic result.",
    facts: [],
  },
  {
    label: "Experiment 2B",
    title: "Evaluate a fixed policy offline",
    decision: "Accept bounded offline policy evaluation (OPE) evidence without repairing 2A by implication.",
    boundary: "PASS_WITH_STATISTICAL_SUPPORT: held-out action coverage passed, observed max-weight stability passed, and effective-sample-size retention was 98.78%–99.78% by action. IPS and SNIPS support positive offline policy-value lift only inside the synthetic logged environment; production uplift remains prohibited and unestablished.",
    facts: ["10,000 rows · target/logged match 84.54%", "Mean importance weight 0.9986 · max 1.3889 · matched propensity floor 0.72", "TEST IPS lift +2.018 pp; 95% CI [+0.598,+3.220] pp", "TEST SNIPS lift +1.250 pp; 95% CI [+0.313,+2.148] pp", "500 bootstrap repetitions · seed 20260813", "Action match 80.23%–91.92% · no action blind spot"],
  },
  {
    label: "Experiment 3",
    title: "Move toward a constrained contextual policy",
    decision: "Complete TRAIN-only support diagnostics before policy training or held-out evaluation.",
    boundary: "Adaptive epsilon-greedy contextual-bandit direction; contract PROVISIONAL; persisted read-back PASS with 16 rows / 16 combinations; synthetic decisions generated = 0. Sequential RL, online safety, and production value remain unproven.",
    facts: ["Learning objective: balance exploitation and exploration", "Synthetic experiment policy only — not observed customer behavior or production policy evidence", "No causal uplift or reinforcement-learning deployment-readiness claim"],
  },
]

export function BusinessDecisionsLens() {
  return (
    <section
      id="business-decisions"
      className="scroll-mt-24 rounded-xl border border-indigo-500/30 bg-background p-5 sm:p-6 lg:col-span-3"
      aria-labelledby="business-decisions-heading"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-700 dark:text-indigo-300">Primary home · Why?</p>
          <h3 id="business-decisions-heading" className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Business &amp; Decisions</h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            Start with the decision to improve, what the system may choose, what the evidence changes, and what it still cannot claim.
          </p>
        </div>
        <Badge variant="outline" className="border-emerald-600/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200">T5 migrated · legacy retained</Badge>
      </div>

      <div id="knowledge-nbo-k001" data-knowledge-id="NBO-K001" className="mt-6 rounded-xl border border-indigo-500/25 bg-indigo-500/5 p-5">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-indigo-800 dark:text-indigo-200">Decision mission</p>
        <p className="mt-3 text-lg font-semibold leading-8 text-foreground">
          Choose the most relevant eligible offer for the current customer context while preserving enough learning evidence and governance to review the decision safely.
        </p>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          The system is not only predicting response. It is progressing toward selecting one bounded action under explicit evidence, eligibility, learning, and claim constraints.
        </p>
      </div>

      <div id="knowledge-nbo-k002" data-knowledge-id="NBO-K002" className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-muted/20 p-4">
          <p className="font-semibold text-foreground">Improve relevance</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Use customer and decision context instead of one static rule.</p>
        </div>
        <div className="rounded-lg border border-border bg-muted/20 p-4">
          <p className="font-semibold text-foreground">Preserve learning</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Keep alternatives observable instead of locking permanently into an early winner.</p>
        </div>
        <div className="rounded-lg border border-border bg-muted/20 p-4">
          <p className="font-semibold text-foreground">Govern the path</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Keep policy logic, evidence identity, and authorization boundaries reviewable.</p>
        </div>
      </div>

      <section id="knowledge-nbo-k020" data-knowledge-id="NBO-K020" className="mt-7 border-t border-border pt-6" aria-labelledby="decision-space-heading">
        <h4 id="decision-space-heading" className="text-lg font-semibold text-foreground">Decision space and current policy direction</h4>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          For one current context, choose one eligible action, observe a reward, and end the decision. The evidence does not yet establish repeated state transitions required for sequential RL.
        </p>
        <div className="mt-4 flex flex-wrap gap-2" aria-label="Bounded NBO action space">
          {actions.map((action) => <Badge key={action} variant="outline">{action}</Badge>)}
        </div>
      </section>

      <section className="mt-7 border-t border-border pt-6" aria-labelledby="evidence-evolution-heading">
        <h4 id="evidence-evolution-heading" className="text-lg font-semibold text-foreground">How the business decision evolved</h4>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">Each experiment answers a different question. A later PASS does not erase an earlier limitation.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {journey.map((item) => (
            <article
              key={item.label}
              id={item.label === "Experiment 1" ? "knowledge-nbo-k009" : item.label === "Experiment 2B" ? "knowledge-nbo-k019" : item.label === "Experiment 3" ? "knowledge-nbo-k023" : undefined}
              data-knowledge-id={item.label === "Experiment 1" ? "NBO-K009" : item.label === "Experiment 2B" ? "NBO-K019" : item.label === "Experiment 3" ? "NBO-K023" : undefined}
              className="rounded-xl border border-border bg-muted/20 p-4"
            >
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-indigo-700 dark:text-indigo-300">{item.label}</p>
              <p className="mt-2 font-semibold text-foreground">{item.title}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Decision:</strong> {item.decision}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Boundary:</strong> {item.boundary}</p>
              {item.label === "Experiment 3" && (
                <a href="#knowledge-nbo-k027" className="mt-3 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline">Unrestricted policy learning remains blocked by uneven action-by-context support →</a>
              )}
              {item.facts.length > 0 && (
                <details className="mt-3 rounded-lg border border-border bg-background">
                  <summary className="cursor-pointer list-none p-3 text-sm font-semibold text-foreground">Exact evidence and status ↓</summary>
                  <ul className="list-disc space-y-2 border-t border-border p-4 pl-8 text-sm leading-6 text-muted-foreground">
                    {item.facts.map((fact) => <li key={fact}>{fact}</li>)}
                  </ul>
                </details>
              )}
            </article>
          ))}
        </div>
      </section>

      <section id="knowledge-nbo-k021" data-knowledge-id="NBO-K021" className="mt-7 border-t border-border pt-6" aria-labelledby="policy-meaning-heading">
        <h4 id="policy-meaning-heading" className="text-lg font-semibold text-foreground">What the policy numbers mean for the decision</h4>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          The saved <strong className="text-foreground">provisional</strong> synthetic contract is <code>adaptive_epsilon_greedy_v0_1</code>; these values are not production traffic commitments.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-background p-4 text-sm leading-7 text-muted-foreground">
            <p className="font-semibold text-foreground">How to read ε (epsilon)</p>
            <p className="mt-2">Lower ε relies more on the estimated winner; higher ε preserves more exploration. Score-gap bands <code>[0.00,0.05)</code>, <code>[0.05,0.15)</code>, <code>[0.15,0.30)</code>, and <code>[0.30,+∞)</code> map to provisional exploration probabilities <code>0.35</code>, <code>0.25</code>, <code>0.15</code>, and <code>0.05</code>.</p>
          </div>
          <div className="rounded-lg border border-border bg-background p-4 text-sm leading-7 text-muted-foreground">
            <p className="font-semibold text-foreground">How to read exploration shares</p>
            <p className="mt-2">Within that budget, rank-2 / rank-3 shares move from <code>0.55 / 0.45</code> when alternatives are close to <code>0.90 / 0.10</code> when rank 2 is clearly separated. Exploration never authorizes unsupported or ineligible actions.</p>
          </div>
        </div>
      </section>

      <details id="knowledge-nbo-k005" data-knowledge-id="NBO-K005" className="mt-7 rounded-lg border border-border bg-background">
        <summary className="cursor-pointer list-none p-4 font-semibold text-foreground">Recommendation-to-PoC traceability <span className="ml-2 text-xs font-normal text-muted-foreground">Expand mapping ↓</span></summary>
        <div className="overflow-x-auto border-t border-border p-4">
          <p className="mb-4 max-w-4xl text-sm leading-7 text-muted-foreground">Source-specific labels are retained for traceability only. This mapping does not assert undocumented system semantics, ownership, production interfaces, or production performance.</p>
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead><tr className="border-b border-border"><th className="p-3">Recommendation area</th><th className="p-3">Public PoC abstraction</th></tr></thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              {alignment.map(([area, abstraction]) => <tr key={area}><th className="p-3 align-top text-foreground">{area}</th><td className="p-3">{abstraction}</td></tr>)}
            </tbody>
          </table>
        </div>
      </details>

      <Alert id="knowledge-nbo-k034" data-knowledge-id="NBO-K034" className="mt-7 border-amber-500/35 bg-amber-500/5">
        <AlertDescription className="text-sm leading-7">
          <strong>Current authorization boundary:</strong> Continue only with bounded synthetic learning and MLOps evidence. Do not claim production readiness, causal uplift, operator business truth, online policy safety, production policy value, or unrestricted policy readiness. <a href="#knowledge-nbo-k033" className="font-semibold text-primary underline-offset-4 hover:underline">Held-out evidence is not yet authorized for the current design stage; its custody belongs in Engineering &amp; Evidence.</a>
        </AlertDescription>
      </Alert>

      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <a href="#models-experiments" className="font-semibold text-primary underline-offset-4 hover:underline">Review model and experiment reasoning →</a>
        <a href="#engineering-evidence" className="font-semibold text-primary underline-offset-4 hover:underline">Trace engineering and evidence controls →</a>
        <a href="#legacy-experiment-evidence" className="font-semibold text-primary underline-offset-4 hover:underline">Compare with retained legacy evidence →</a>
      </div>
    </section>
  )
}
