export const experimentCards = [
  {
    match: "Experiment 1 — Volume-expanded synthetic baseline",
    eyebrow: "Experiment 1",
    title: "Volume-expanded synthetic baseline",
    description: "Completed baseline lane for end-to-end MLOps execution, threshold analysis, registration and read-back evidence.",
    tone: "foundation",
    sourceIndex: 0,
  },
  {
    match: "Experiment 2A — Post-Silver low-volume baseline",
    eyebrow: "Experiment 2A",
    title: "Post-Silver low-volume baseline",
    description: "Supervised-model lane with completed data preparation and a characterized held-out generalization issue; retained as diagnostic evidence rather than promoted.",
    tone: "investigation",
    sourceIndex: 1,
  },
  {
    match: "Experiment 2B — Offline Policy Evaluation",
    eyebrow: "Experiment 2B",
    title: "Offline Policy Evaluation",
    description: "Completed OPE lane comparing a deterministic greedy target policy against logged behavior-policy evidence.",
    tone: "complete",
    sourceIndex: 2,
  },
  {
    match: "Experiment 3 — Adaptive Contextual Bandit",
    eyebrow: "Experiment 3 · Currently Active",
    title: "Adaptive Contextual Bandit Policy",
    description: "Moves from evaluating a fixed target policy to an adaptive policy that deliberately balances exploitation and exploration.",
    tone: "active",
    sourceIndex: null,
  },
] as const

export function createExperiment3Panel() {
  const panel = document.createElement("div")
  panel.dataset.experiment3Panel = "true"
  panel.className = "space-y-8 rounded-b-xl border border-t-0 border-border bg-background p-5 sm:p-7"
  panel.hidden = true
  panel.innerHTML = `
    <section>
      <div class="flex flex-wrap items-center gap-3">
        <h2 class="text-2xl font-semibold tracking-tight text-foreground">Experiment 3 — Adaptive Contextual Bandit Policy</h2>
        <span class="inline-flex items-center rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-800 dark:text-indigo-200">CURRENTLY ACTIVE</span>
      </div>
      <p class="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Experiment 3 evolves directly from Experiment 2B. Experiment 2B established bounded offline-policy-evaluation evidence for a fixed deterministic greedy target policy in the synthetic logged environment. Experiment 3 asks the next question: how should the policy choose offers when it must both use what it currently believes works best and continue learning from alternative actions?</p>
    </section>

    <section class="rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-5 sm:p-6">
      <p class="text-xs font-bold uppercase tracking-[0.12em] text-indigo-800 dark:text-indigo-200">The core trade-off</p>
      <div class="mt-3 text-lg font-semibold leading-8 text-foreground sm:text-xl">Exploitation <span class="font-normal text-muted-foreground">(ใช้สิ่งที่รู้ว่าดี)</span> <span class="mx-2 text-indigo-700 dark:text-indigo-300">↔</span> Exploration <span class="font-normal text-muted-foreground">(ลองสิ่งใหม่เพื่อเรียนรู้เพิ่ม)</span></div>
      <p class="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground"><strong class="text-foreground">We are not choosing offers randomly, but we are also not locking ourselves into one choice.</strong> The policy exploits what it currently believes works best while still exploring enough alternatives to learn better decisions.</p>
    </section>

    <section>
      <h3 class="text-xl font-semibold text-foreground">Making the policy numbers meaningful</h3>
      <p class="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">The saved provisional contract is <code>adaptive_epsilon_greedy_v0_1</code>. The numbers are not decorative tuning values; they describe how much decision freedom the policy keeps when confidence changes.</p>
      <div class="mt-5 grid gap-4 md:grid-cols-2">
        <div class="rounded-xl border border-border bg-muted/20 p-5">
          <p class="font-semibold text-foreground">How to read ε (epsilon)</p>
          <p class="mt-2 text-sm leading-7 text-muted-foreground"><strong class="text-foreground">Lower ε</strong> means the policy behaves more greedily: it relies more heavily on the action it currently estimates as best. <strong class="text-foreground">Higher ε</strong> creates a larger exploration budget so alternative actions can still generate learning evidence.</p>
          <p class="mt-3 text-sm leading-7 text-muted-foreground">The validated schedule uses score-gap bands <code>[0.00,0.05)</code>, <code>[0.05,0.15)</code>, <code>[0.15,0.30)</code>, and <code>[0.30,+∞)</code> with exploration probabilities <code>0.35</code>, <code>0.25</code>, <code>0.15</code>, and <code>0.05</code> respectively. These are synthetic experiment-policy values, not production traffic commitments.</p>
        </div>
        <div class="rounded-xl border border-border bg-muted/20 p-5">
          <p class="font-semibold text-foreground">How to read policy shares</p>
          <p class="mt-2 text-sm leading-7 text-muted-foreground">Within the exploration budget, the validated rank-2 / rank-3 shares move from <code>0.55 / 0.45</code> when alternatives are close to <code>0.90 / 0.10</code> when rank 2 is clearly separated from rank 3.</p>
          <ul class="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
            <li><code>0.55 / 0.45</code> — alternatives are close; learning is spread more evenly.</li>
            <li><code>0.90 / 0.10</code> — rank 2 is much clearer; most exploration mass goes to rank 2.</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="grid gap-4 md:grid-cols-2">
      <div class="rounded-xl border border-border bg-background p-5">
        <p class="font-semibold text-foreground">Why score gaps matter</p>
        <p class="mt-2 text-sm leading-7 text-muted-foreground">The policy contract uses score-gap boundaries to turn relative confidence into decision freedom. A small rank1-rank2 gap means the top actions look similar, so exploration rises. A large gap means the current winner is clearer, so exploration falls.</p>
      </div>
      <div class="rounded-xl border border-border bg-background p-5">
        <p class="font-semibold text-foreground">What the policy is learning</p>
        <p class="mt-2 text-sm leading-7 text-muted-foreground">The purpose of exploration is not randomness for its own sake. It preserves evidence about actions that the current policy would otherwise stop choosing, so future policy estimates can improve instead of becoming permanently locked to early beliefs.</p>
      </div>
    </section>

    <details class="group rounded-lg border border-border bg-background" open>
      <summary class="cursor-pointer list-none p-5 font-semibold text-foreground">Policy contract and logging meaning</summary>
      <div class="grid gap-4 border-t border-border p-5 text-sm leading-7 text-muted-foreground md:grid-cols-2">
        <div>
          <p class="font-semibold text-foreground">What we need to log</p>
          <p class="mt-2">The saved contract includes epsilon / gap bands, rank-2 and rank-3 exploration shares, assumption class, contract status, timestamps and claim limitation. These fields make the decision reproducible and explain why an action had a particular selection probability.</p>
        </div>
        <div>
          <p class="font-semibold text-foreground">Why it matters</p>
          <p class="mt-2">Without the decision probability and policy version, later learning and offline evaluation cannot distinguish a deliberate exploration action from a deterministic winner or reconstruct how the logged data was generated.</p>
        </div>
        <div>
          <p class="font-semibold text-foreground">Evidence state</p>
          <p class="mt-2">Policy contract: <code>adaptive_epsilon_greedy_v0_1</code>. Assumption class: <code>ASSUMPTION_DERIVED_SIMULATION_POLICY</code>. Contract status: <code>PROVISIONAL</code>. Read-back: <code>PASS</code> with <code>16</code> rows and all <code>16</code> gap combinations present.</p>
        </div>
        <div>
          <p class="font-semibold text-foreground">Current limitation</p>
          <p class="mt-2">Policy-contract persistence/read-back is established, but <code>SYNTHETIC_DECISIONS_GENERATED = 0</code>. The next evidence must execute the adaptive policy and log selected-action probability / propensity for each generated decision.</p>
        </div>
      </div>
    </details>

    <section>
      <h3 class="text-xl font-semibold text-foreground">Current bounded status</h3>
      <div class="mt-4 grid gap-3 text-sm leading-6 text-muted-foreground md:grid-cols-2">
        <p><strong class="text-foreground">Policy direction:</strong> ADAPTIVE EPSILON-GREEDY CONTEXTUAL BANDIT</p>
        <p><strong class="text-foreground">Learning objective:</strong> BALANCE EXPLOITATION AND EXPLORATION</p>
        <p><strong class="text-foreground">Contract status:</strong> PROVISIONAL</p>
        <p><strong class="text-foreground">Persisted contract read-back:</strong> PASS — 16 rows / 16 combinations</p>
        <p><strong class="text-foreground">Synthetic decisions generated:</strong> 0</p>
      </div>
      <div class="mt-5 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm leading-7 text-muted-foreground"><strong class="text-foreground">Claim boundary:</strong> Synthetic experiment policy only; not observed customer behavior and not production policy evidence. Experiment 3 does not establish online exploration safety, production policy value, causal uplift, or reinforcement-learning deployment readiness.</div>
    </section>
  `
  return panel
}
