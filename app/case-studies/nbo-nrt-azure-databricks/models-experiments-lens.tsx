import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

const gateItems = [
  ["A", "Candidate multiplicity", "Normal decisions expose a bounded multi-offer set."],
  ["B", "Candidate before selection", "Generation precedes ranking and cannot use selected, exposed, response, or oracle truth."],
  ["C", "Exposure membership", "Every exposed offer belongs to that decision's eligible set."],
  ["D", "Candidate diversity", "Alternatives differ meaningfully, not as duplicated rows."],
  ["E", "Ranking opportunity", "At least two alternatives can vary by customer × offer context."],
  ["F", "Point-in-time integrity", "Visible features satisfy feature_available_at ≤ prediction_time."],
  ["G", "Oracle / outcome independence", "No hidden probability, evaluation truth, or future outcome leaks into candidates."],
  ["H", "Selection / exposure cardinality", "One selected and exposed offer follows the candidate set."],
  ["I", "Release evidence", "The repaired candidate set is versioned and validated before modeling."],
]

const hierarchy = [
  ["A", "Feature Contract", "CLOSED / PASS"],
  ["B", "Training Formulation", "IN PROGRESS"],
  ["B1", "Action × context support", "GUARDRAIL REQUIRED"],
  ["B2", "Candidate-policy training", "NOT YET AUTHORIZED"],
  ["C", "Candidate Generation", "NOT STARTED"],
  ["D", "Candidate Policy", "NOT STARTED"],
  ["E", "Held-out OPE", "NOT STARTED"],
  ["F", "Compare", "NOT STARTED"],
]

const investigation = [
  ["01 · Observe", "Experiment 2B evaluated a fixed greedy target policy; exploration behavior was not present, raising the question of how alternatives keep producing evidence."],
  ["02 · Hypothesize", "Use provisional adaptive_epsilon_greedy_v0_1 so smaller winner gaps preserve more exploration and larger gaps exploit more."],
  ["03 · Check", "Encode the exact four epsilon bands and four rank-2/rank-3 share pairs; keep the assumption class and PROVISIONAL status explicit."],
  ["04 · Evidence", "Inserted rows 16; read-back rows 16; exact combinations 16; aggregate/read-back PASS; open-ended upper bounds returned NULL as designed; generated decisions 0; canonical Bronze/Silver mutation NONE."],
  ["05 · Interpret", "Uncertainty buys controlled decision freedom; a clearer winner buys more exploitation. This is bounded learning behavior, not random choice."],
  ["06 · Bound", "No adaptive decisions, online safety, real-customer response, production value, causal/commercial effect, or RL deployment readiness is established."],
  ["07 · Decide", "Generate probability-logged synthetic decisions next, recording propensity and policy version so later OPE can reconstruct selection; assert no production-readiness threshold."],
]

const opeSteps = [
  ["1", "Recover persisted logged interactions", "Resume from the persisted simulation table after notebook memory reset.", "10,000 rows; null chosen-action probabilities 0; non-positive probabilities 0."],
  ["2", "Reconstruct the fixed greedy target", "Use greedy_action, chosen_action, logged propensity, and observed_reward to rebuild match and importance weights.", "Target/logged match 84.54%; mean weight 0.9986; max 1.3889."],
  ["3", "Evaluate by split", "Calculate behavior reward, IPS, and SNIPS separately for TRAIN and historical Experiment 2B TEST.", "TEST IPS +2.018 pp; SNIPS +1.250 pp; TRAIN direction also positive."],
  ["4", "Bootstrap held-out uncertainty", "Run 500 TEST bootstrap replicates with deterministic seed 20260813.", "IPS CI [+0.598,+3.220] pp; SNIPS CI [+0.313,+2.148] pp."],
  ["5", "Check action-level support", "Verify overlap for all five actions.", "Action match 80.23%–91.92%; propensity floor 0.72; max weight 1.3889; no action blind spot; held-out coverage PASS; weight stability PASS."],
  ["6", "Check effective sample size", "Measure ESS per greedy action for hidden weight concentration.", "ESS retention 98.78%–99.78%; PASS across all five actions."],
]

export function ModelsExperimentsLens() {
  return (
    <section
      id="models-experiments"
      className="scroll-mt-24 rounded-xl border border-violet-500/30 bg-background p-5 sm:p-6 lg:col-span-3"
      aria-labelledby="models-experiments-heading"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-violet-700 dark:text-violet-300">Primary home · Learn?</p>
          <h3 id="models-experiments-heading" className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Models &amp; Experiments</h3>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Follow the questions that changed the formulation: what failed, what the evidence means, and what decision became authorized next.</p>
        </div>
        <Badge variant="outline" className="border-emerald-600/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200">T6 migrated · legacy retained</Badge>
      </div>

      <Alert className="mt-6 border-amber-500/35 bg-amber-500/5">
        <AlertDescription className="text-sm leading-7">
          <strong>Evidence boundary:</strong> Experiment 3 results shown here are synthetic and TRAIN-only. Its held-out TEST remains untouched; no held-out accuracy, causal effect, operator truth, online-policy safety, production value, or deployment readiness is implied.
        </AlertDescription>
      </Alert>

      <section className="mt-6 rounded-xl border border-violet-500/30 bg-violet-500/5 p-5" aria-labelledby="decision-system-summary-heading">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-violet-700 dark:text-violet-300">Decision system in 30 seconds</p>
        <h4 id="decision-system-summary-heading" className="mt-2 text-xl font-semibold text-foreground">From predicting response to choosing a bounded action</h4>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-background p-4 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Question</strong><p className="mt-2">For one context, which eligible Telco offer should the system choose while preserving evidence for learning?</p></div>
          <div className="rounded-lg border border-border bg-background p-4 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Evidence</strong><p className="mt-2">Supervised generalization failed; fixed-policy OPE passed only in its synthetic lane; V2 changes TRAIN action ranking.</p></div>
          <div className="rounded-lg border border-border bg-background p-4 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Interpretation</strong><p className="mt-2">This is a one-step contextual-bandit problem, not sequential RL, and uneven support prevents unrestricted learning.</p></div>
          <div className="rounded-lg border border-border bg-background p-4 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Next decision</strong><p className="mt-2">Fix TRAIN support/formulation, then generate probability-logged synthetic decisions; Experiment 3 TEST stays sealed.</p></div>
        </div>
        <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4" aria-label="Model taxonomy at a glance">
          <p><strong className="text-foreground">V1:</strong> supervised reference</p><p><strong className="text-foreground">V1-D:</strong> same V1, durable</p><p><strong className="text-foreground">V2:</strong> interaction-aware reward model</p><p><strong className="text-foreground">Policy-learning lane:</strong> separate, not sequential RL</p>
        </div>
      </section>

      <nav className="mt-4 flex flex-wrap gap-2 text-xs" aria-label="Models and Experiments reading path">
        <a href="#knowledge-nbo-k008" className="rounded-full border border-border bg-background px-3 py-2 font-semibold text-foreground hover:border-violet-500/50">1 · Baseline</a>
        <a href="#knowledge-nbo-k010" className="rounded-full border border-border bg-background px-3 py-2 font-semibold text-foreground hover:border-violet-500/50">2 · Experiment world</a>
        <a href="#knowledge-nbo-k017" className="rounded-full border border-border bg-background px-3 py-2 font-semibold text-foreground hover:border-violet-500/50">3 · 2A vs 2B</a>
        <a href="#knowledge-nbo-k022" className="rounded-full border border-border bg-background px-3 py-2 font-semibold text-foreground hover:border-violet-500/50">4 · Policy formulation</a>
        <a href="#knowledge-nbo-k027" className="rounded-full border border-border bg-background px-3 py-2 font-semibold text-foreground hover:border-violet-500/50">5 · Current gate</a>
      </nav>

      <article id="knowledge-nbo-k008" data-knowledge-id="NBO-K008" className="mt-7 rounded-xl border border-border bg-muted/20 p-5" aria-labelledby="k008-heading">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-violet-700 dark:text-violet-300">Question 1</p>
        <h4 id="k008-heading" className="mt-2 text-xl font-semibold text-foreground">Did the first supervised baseline learn enough to support a decision?</h4>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-background p-4 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Evidence</strong><p className="mt-2">TRAIN 8,002 · TEST 1,998 · positive rate 31.48%. ROC-AUC 0.6294; PR-AUC 0.3941.</p></div>
          <div className="rounded-lg border border-border bg-background p-4 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Interpretation</strong><p className="mt-2">0.50: no positive predictions, F1 0.0000. Analyzed 0.24: F1 0.4955, precision 0.3421, recall 0.8984 — NOT APPROVED.</p></div>
          <div className="rounded-lg border border-border bg-background p-4 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Decision</strong><p className="mt-2">WEAK-TO-MODERATE discrimination. Keep Candidate as a diagnostic; do not promote to Champion or production.</p></div>
        </div>
      </article>

      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        <article id="knowledge-nbo-k010" data-knowledge-id="NBO-K010" className="rounded-xl border border-border bg-background p-5" aria-labelledby="k010-heading">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-violet-700 dark:text-violet-300">Question 2</p>
          <h4 id="k010-heading" className="mt-2 text-lg font-semibold text-foreground">What kind of experiment world was needed next?</h4>
          <p className="mt-3 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Evidence:</strong> Silver had governance metadata but sparse behavior and offer semantics, deterministic heuristic ranking, sampled synthetic response, and no business reward.</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Interpretation:</strong> more rows would not make the world decision-ready. <strong className="text-foreground">Decision:</strong> Behavior Simulation v2 + Offer Enrichment v2; validate provenance, behavioral coherence, oracle separation, and outcome independence through G7 before modeling. This is not operator-world truth.</p>
        </article>

        <article id="knowledge-nbo-k012" data-knowledge-id="NBO-K012" className="rounded-xl border border-border bg-background p-5" aria-labelledby="k012-heading">
          <h4 id="k012-heading" className="text-lg font-semibold text-foreground">How was the synthetic world grounded?</h4>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Observed seed distributions + conditional relationships + controlled assumptions + exploration policy + stochastic noise + delayed outcomes + controlled missingness + drift scenarios.</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Observed evidence, assumptions, and injected uncertainty remain distinguishable. Use versioned lanes, smoothing/backoff, deterministic reproducibility, customer-split integrity, and provenance—never duplicate source rows, overwrite canonical Bronze/Silver, or hard-code a winner.</p>
        </article>
      </div>

      <article id="knowledge-nbo-k016" data-knowledge-id="NBO-K016" className="mt-5 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5" aria-labelledby="k016-heading">
        <h4 id="k016-heading" className="text-lg font-semibold text-foreground">Why did modeling stop before training?</h4>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">The RC4 audit found 4,800 decisions, 4,800 candidate rows, exactly one candidate per decision, and 4,800 exposure matches with zero mismatches. Integrity passed, but ranking could not be learned without alternatives.</p>
        <p className="mt-3 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Decision:</strong> reopen only the candidate-set Data Gate, preserve RC4 immutably, and require 3–8 distinct eligible alternatives → interactions → ranking → one selected/exposed offer → response.</p>
        <details className="mt-4 rounded-lg border border-border bg-background">
          <summary className="cursor-pointer list-none p-4 text-sm font-semibold text-foreground">Candidate-Set Readiness Gate G2.1 A–I ↓</summary>
          <div className="grid gap-3 border-t border-border p-4 md:grid-cols-2">{gateItems.map(([key, title, body]) => <div key={key} className="text-sm leading-6 text-muted-foreground"><strong className="text-foreground">{key} — {title}:</strong> {body}</div>)}</div>
        </details>
      </article>

      <article id="knowledge-nbo-k015" data-knowledge-id="NBO-K015" className="mt-5 rounded-xl border border-border bg-background p-5" aria-labelledby="k015-heading">
        <h4 id="k015-heading" className="text-lg font-semibold text-foreground">What did the held-out supervised failure actually establish?</h4>
        <p className="mt-3 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Observation:</strong> GENERALIZATION ISSUE CHARACTERIZED; no single cause proven. LR TRAIN ROC/PR ≈ 0.625/0.085 vs TEST ≈ 0.449/0.071. RF 0.8302/0.4288 → 0.4667/0.0673; GBT 0.8716/0.4224 → 0.4966/0.0730.</p>
        <p className="mt-3 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Interpretation:</strong> same policy version, latent effect, accepted-rate shift (5.33% TRAIN → 7.17% TEST), cohort, and complexity checks did not identify a single primary cause; added complexity did not cure generalization.</p>
        <p className="mt-3 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Decision:</strong> retain the supervised baseline as a diagnostic, do not promote it, and open separate policy-evaluation/learning lanes.</p>
        <details className="mt-4 rounded-lg border border-border bg-muted/20">
          <summary className="cursor-pointer list-none p-4 text-sm font-semibold text-foreground">Root-cause hypotheses and complete status ↓</summary>
          <div className="space-y-3 border-t border-border p-4 text-sm leading-7 text-muted-foreground">
            <p><strong className="text-foreground">Preparation:</strong> RC1 candidate repair/read-back, temporal/leakage/exposure checks, training/preprocessed tables, temporal split, TRAIN-only preprocessing, and leakage preflight passed. Split: TRAIN 3,768 / TEST 1,032.</p>
            <p><strong className="text-foreground">Evaluation:</strong> baseline training and TEST scoring completed; default threshold predicted every TEST row negative; TEST PR-AUC ≈ 0.071, near random baseline.</p>
            <p><strong className="text-foreground">H1 · policy version:</strong> not supported—both splits used <code>synthetic-decision-time-heuristic-v1</code>.</p>
            <p><strong className="text-foreground">H2 · latent generator effect:</strong> not primary—<code>outcome_probability_assumption</code> has modest signal, but separation persists on both sides of the temporal boundary.</p>
            <p><strong className="text-foreground">H3 · response funnel:</strong> partial, not primary—ACCEPTED rose 5.33% → 7.17%, while CLICKED/VIEWED/IGNORED and response timing stayed broadly stable.</p>
            <p><strong className="text-foreground">H4 · cohort:</strong> not primary—device capability, subscriber type, tenure, spend, usage, utilization, and contract duration remained broadly stable.</p>
            <p><strong className="text-foreground">H5 · model complexity:</strong> not primary—RF/GBT fit TRAIN better but did not generalize; complexity did not cure the future-period failure.</p>
            <p><strong className="text-foreground">Synthesis:</strong> feature→outcome relationship instability is established, but temporal concept drift was not proven as a causal mechanism and no single root cause was established.</p>
          </div>
        </details>
      </article>

      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        <article id="knowledge-nbo-k017" data-knowledge-id="NBO-K017" className="rounded-xl border border-border bg-muted/20 p-5" aria-labelledby="k017-heading">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-violet-700 dark:text-violet-300">Question 3</p>
          <h4 id="k017-heading" className="mt-2 text-lg font-semibold text-foreground">Why are Experiment 2A and 2B separate?</h4>
          <p className="mt-3 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Evidence:</strong> both lanes share the governed synthetic world, repaired RC1 foundation, temporal/leakage/exposure/lineage controls, and the SYNTHETIC_LEARNING_AND_MLOPS_EVIDENCE_ONLY ceiling.</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Interpretation:</strong> 2A asks supervised response-label generalization using ROC/PR; 2B asks fixed greedy target-policy value using contextual-bandit OPE. <strong className="text-foreground">Decision:</strong> keep the lanes separate; a 2B PASS never repairs or overwrites 2A.</p>
        </article>

        <article id="knowledge-nbo-k018" data-knowledge-id="NBO-K018" className="rounded-xl border border-border bg-muted/20 p-5" aria-labelledby="k018-heading">
          <h4 id="k018-heading" className="text-lg font-semibold text-foreground">What did the separate OPE lane support?</h4>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">10,000 logged rows · target/logged match 84.54% · mean/max importance weight 0.9986/1.3889 · no null/non-positive propensity.</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Historical Experiment 2B TEST: IPS +2.018 pp, 95% CI [+0.598,+3.220]; SNIPS +1.250 pp, CI [+0.313,+2.148]; 500 bootstraps, seed 20260813; action match 80.23%–91.92%; propensity floor 0.72; ESS retention 98.78%–99.78%.</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Verdict:</strong> PASS_WITH_STATISTICAL_SUPPORT inside the synthetic logged environment only. This historical 2B TEST use is separate from Experiment 3, whose TEST remains untouched.</p>
          <details className="mt-4 rounded-lg border border-border bg-background">
            <summary className="cursor-pointer list-none p-4 text-sm font-semibold text-foreground">Six-step historical OPE evidence path ↓</summary>
            <div className="space-y-3 border-t border-border p-4">{opeSteps.map(([step, title, method, evidence]) => <div key={step} className="text-sm leading-6 text-muted-foreground"><strong className="text-foreground">{step} · {title}</strong><p className="mt-1">{method}</p><p className="mt-1"><strong className="text-foreground">Evidence:</strong> {evidence}</p></div>)}</div>
          </details>
        </article>
      </div>

      <article id="knowledge-nbo-k022" data-knowledge-id="NBO-K022" className="mt-7 rounded-xl border border-violet-500/25 bg-violet-500/5 p-5" aria-labelledby="k022-heading">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-violet-700 dark:text-violet-300">Question 4</p>
        <h4 id="k022-heading" className="mt-2 text-xl font-semibold text-foreground">What policy problem are we actually solving?</h4>
        <p className="mt-3 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Evidence:</strong> one context → one of five actions (BUNDLE, DATA, LOYALTY, ROAMING, VOICE) → one reward → end; no repeated transitions or trajectories are established.</p>
        <p className="mt-3 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Interpretation:</strong> this supports a contextual bandit; DQN/PPO-style sequential RL exceeds the evidence. <strong className="text-foreground">Decision:</strong> V2 scores all five TRAIN actions → winner/margin → support diagnostics → mask unsupported actions → Constrained Greedy V1. This is a bounded policy rule that consumes Reward Model V2 scores—not Reward Model V1 and not the unstarted RL/Policy Learning V1 lane.</p>
        <details className="mt-4 rounded-lg border border-border bg-background">
          <summary className="cursor-pointer list-none p-4 text-sm font-semibold text-foreground">Provisional adaptive policy and logging contract ↓</summary>
          <div className="space-y-3 border-t border-border p-4 text-sm leading-7 text-muted-foreground">
            <p><code>adaptive_epsilon_greedy_v0_1</code> · <code>ASSUMPTION_DERIVED_SIMULATION_POLICY</code> · PROVISIONAL. Gap bands [0,.05), [.05,.15), [.15,.30), [.30,∞) map to ε 0.35/0.25/0.15/0.05; rank-2/rank-3 shares are 0.55/0.45, 0.65/0.35, 0.80/0.20, 0.90/0.10.</p>
            <p>16 rows inserted/read back; 16 combinations PASS; generated decisions = 0. Later learning/OPE needs selected-action probability (propensity) and policy version. Formulation remains distinct from logging custody.</p>
          </div>
        </details>
      </article>

      <article id="knowledge-nbo-k024" data-knowledge-id="NBO-K024" className="mt-5 rounded-xl border border-border bg-background p-5" aria-labelledby="k024-heading">
        <h4 id="k024-heading" className="text-lg font-semibold text-foreground">Where is Experiment 3 in the execution hierarchy?</h4>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">{hierarchy.map(([stage, name, status]) => <div key={stage} className="rounded-lg border border-border bg-muted/20 p-3 text-sm"><p className="font-semibold text-foreground">{stage} · {name}</p><p className="mt-2 text-xs font-bold text-muted-foreground">{status}</p></div>)}</div>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">V2 TRAIN formulation passed within stage B, while B remains in progress because B1/B2 are unresolved. Experiment 2B OPE does not validate the Experiment 3 policy; no downstream stage is inferred from a plan.</p>
      </article>

      <article id="knowledge-nbo-k025" data-knowledge-id="NBO-K025" className="mt-5 rounded-xl border border-border bg-background p-5" aria-labelledby="k025-heading">
        <h4 id="k025-heading" className="text-lg font-semibold text-foreground">Model taxonomy: what changed—and what did not?</h4>
        <div className="mt-4 hidden overflow-x-auto rounded-lg border border-border md:block">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-muted/50"><tr><th className="p-3">Lane</th><th className="p-3">Identity</th><th className="p-3">Current evidence</th><th className="p-3">Boundary</th></tr></thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              <tr><th className="p-3 text-foreground">Reward Model V1</th><td className="p-3">Main-effects supervised baseline</td><td className="p-3">CLOSED / REFERENCE · LOYALTY wins 8,002/8,002 TRAIN contexts · avg gap 0.739 pp</td><td className="p-3">Representational limitation, not a policy learner</td></tr>
              <tr><th className="p-3 text-foreground">Reward Model V1-D</th><td className="p-3">Same V1 model, durable transition</td><td className="p-3">PASS</td><td className="p-3">Not a new model; engineering identity remains external</td></tr>
              <tr><th className="p-3 text-foreground">Reward Model V2</th><td className="p-3">Interaction-aware supervised LR</td><td className="p-3">TRAIN ROC 0.613125 · PR 0.649874 · four winners · VOICE 42.077% · gap avg/median/min/max 3.949/2.747/0.371/12.230 pp</td><td className="p-3">TRAIN formulation evidence, not held-out accuracy</td></tr>
              <tr><th className="p-3 text-foreground">RL / Policy Learning V1</th><td className="p-3">Separate contextual policy lane</td><td className="p-3">NOT STARTED</td><td className="p-3">V1 and V2 are reward models, not RL</td></tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 grid gap-3 md:hidden">
          <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Reward Model V1 · CLOSED / REFERENCE</strong><p className="mt-2">Main-effects supervised baseline; LOYALTY wins 8,002/8,002 TRAIN contexts; avg gap 0.739 pp. Representationally limited, not a policy learner.</p></div>
          <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Reward Model V1-D · PASS</strong><p className="mt-2">Same V1 model through a durability transition—not a new model. Engineering identity remains external.</p></div>
          <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Reward Model V2 · TRAIN FORMULATION PASS</strong><p className="mt-2">Interaction-aware supervised LR; TRAIN ROC/PR 0.613125/0.649874; four winners; VOICE 42.077%; gap avg/median/min/max 3.949/2.747/0.371/12.230 pp. Not held-out accuracy.</p></div>
          <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">RL / Policy Learning V1 · NOT STARTED</strong><p className="mt-2">Separate contextual-policy lane. Reward Models V1/V2 are supervised estimators, not RL.</p></div>
        </div>
        <a href="#knowledge-nbo-k029" className="mt-4 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline">The active reward estimator is persisted and load-back verified under the engineering identity record →</a>
      </article>

      <article id="knowledge-nbo-k026" data-knowledge-id="NBO-K026" className="mt-5 rounded-xl border border-border bg-muted/20 p-5" aria-labelledby="k026-heading">
        <h4 id="k026-heading" className="text-lg font-semibold text-foreground">The investigation trail—not just the status</h4>
        <div className="mt-4 grid gap-3 md:grid-cols-2">{investigation.map(([stage, body]) => <div key={stage} className="rounded-lg border border-border bg-background p-4 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">{stage}</strong><p className="mt-2">{body}</p></div>)}</div>
      </article>

      <article id="knowledge-nbo-k027" data-knowledge-id="NBO-K027" className="mt-7 rounded-xl border border-amber-500/35 bg-amber-500/5 p-5" aria-labelledby="k027-heading">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-amber-800 dark:text-amber-200">Question 5 · Current gate</p>
        <h4 id="k027-heading" className="mt-2 text-xl font-semibold text-foreground">Is action-by-context support strong enough for unrestricted policy learning?</h4>
        <p className="mt-3 text-lg font-semibold leading-8 text-foreground"><span className="text-sm text-muted-foreground">Interpretation · </span>DATA_USABLE = YES; CONDITIONAL_SUPPORT_IMBALANCE = DETECTED; UNRESTRICTED_POLICY_LEARNING = NOT_YET_AUTHORIZED.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4 text-sm leading-6 text-muted-foreground">
          <div className="rounded-lg border border-border bg-background p-3">109/110 cells observed · min/avg/max 1/91.74/684</div>
          <div className="rounded-lg border border-border bg-background p-3">1 zero cell: DIGITAL + APP_OPEN + WEB → ROAMING</div>
          <div className="rounded-lg border border-border bg-background p-3">&lt;5: 10 (9.2%) · &lt;10: 23 (21.1%)</div>
          <div className="rounded-lg border border-border bg-background p-3">&lt;20: 40 (36.7%) · &lt;30: 58 (53.2%)</div>
        </div>
        <p className="mt-4 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Decision · bounded synthetic guardrail v1:</strong> 0 BLOCK · 1–9 RESTRICTED · 10–29 CAUTION · 30+ NORMAL. B2 remains blocked until B1 support/formulation is fixed; these are not general or production thresholds.</p>
        <details className="mt-4 rounded-lg border border-border bg-background">
          <summary className="cursor-pointer list-none p-4 text-sm font-semibold text-foreground">B1 questions that must change the next decision ↓</summary>
          <ul className="list-disc space-y-2 border-t border-border p-4 pl-8 text-sm leading-6 text-muted-foreground">
            <li>Which context-action combinations are well supported, thinly supported, or unsupported?</li>
            <li>How often do V2 winners fall into each support class?</li>
            <li>How does support interact with the Top-1–Top-2 winner margin?</li>
            <li>Derive any next threshold from the TRAIN support distribution; do not choose one arbitrarily.</li>
          </ul>
        </details>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <a href="#knowledge-nbo-k033" className="font-semibold text-primary underline-offset-4 hover:underline">TEST remains sealed until the TRAIN-only formulation and support contract are fixed →</a>
          <a href="#knowledge-nbo-k029" className="font-semibold text-primary underline-offset-4 hover:underline">Supporting counts must resolve to governed, reproducible evidence →</a>
        </div>
      </article>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <article id="knowledge-nbo-k030" data-knowledge-id="NBO-K030" className="rounded-xl border border-border bg-background p-5" aria-labelledby="k030-heading">
          <h4 id="k030-heading" className="text-lg font-semibold text-foreground">Did the reward model have enough representational capacity?</h4>
          <p className="mt-3 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">V1 TRAIN probe:</strong> 8,002 contexts × 5 actions = 40,010 candidates; LOYALTY won 100%; average gap 0.739 pp, range 0.618–0.781. Context changed scores but not action ordering—a formulation limitation, not an accuracy or true-best claim.</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">V2 TRAIN repair proof:</strong> four winners, no global winner, structured context patterns; margins avg/median/min/max 3.949/2.747/0.371/12.230 pp. Still no held-out, causal, operator, or production claim.</p>
          <a href="#knowledge-nbo-k028" className="mt-3 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline">Execution continuity was independently proven through the recovery bootstrap →</a>
        </article>

        <article id="knowledge-nbo-k031" data-knowledge-id="NBO-K031" className="rounded-xl border border-border bg-background p-5" aria-labelledby="k031-heading">
          <h4 id="k031-heading" className="text-lg font-semibold text-foreground">How should a winner be interpreted?</h4>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Always read three dimensions together: <strong className="text-foreground">who wins</strong>, <strong className="text-foreground">how strong the Top-1–Top-2 margin is</strong>, and <strong className="text-foreground">whether the action/context has logged support</strong>.</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">V1 showed invariant ordering with a narrow stable margin. V2 produced multiple winners and a wider margin distribution. Near ties are not equivalent to large-margin winners. This remains a TRAIN-only diagnostic, not causal or production evidence.</p>
        </article>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <a href="#business-decisions" className="font-semibold text-primary underline-offset-4 hover:underline">Return to Business &amp; Decisions →</a>
        <a href="#engineering-evidence" className="font-semibold text-primary underline-offset-4 hover:underline">Trace Engineering &amp; Evidence custody →</a>
        <a href="#legacy-experiment-evidence" className="font-semibold text-primary underline-offset-4 hover:underline">Compare with retained legacy evidence →</a>
      </div>
    </section>
  )
}
