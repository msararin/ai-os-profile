"use client"

import { useEffect } from "react"

function normalizedText(value: string | null | undefined) {
  return (value ?? "").replace(/\s+/g, " ").trim()
}

const cards = [
  {
    match: "Experiment 1 — Volume-expanded synthetic baseline",
    eyebrow: "Experiment 1",
    title: "Volume-expanded synthetic baseline",
    description: "Completed baseline lane for end-to-end MLOps execution, threshold analysis, registration and read-back evidence.",
    tone: "default",
    sourceIndex: 0,
  },
  {
    match: "Experiment 2A — Post-Silver low-volume baseline",
    eyebrow: "Experiment 2A",
    title: "Post-Silver low-volume baseline",
    description: "Supervised-model lane that preserves the original Experiment 2 evidence and its generalization investigation.",
    tone: "default",
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

function createExperiment3Panel() {
  const panel = document.createElement("div")
  panel.dataset.experiment3Panel = "true"
  panel.className = "space-y-8 rounded-b-xl border border-t-0 border-border bg-background p-5 sm:p-7"
  panel.hidden = true
  panel.innerHTML = `
    <section>
      <div class="flex flex-wrap items-center gap-3">
        <h2 class="text-2xl font-semibold tracking-tight text-foreground">Experiment 3 — Adaptive Contextual Bandit Policy</h2>
        <span class="inline-flex items-center rounded-full border border-amber-600/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-900 dark:text-amber-100">CURRENTLY ACTIVE</span>
      </div>
      <p class="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Experiment 3 evolves directly from Experiment 2B. Experiment 2B established bounded offline-policy-evaluation evidence for a fixed deterministic greedy target policy in the synthetic logged environment. Experiment 3 asks the next question: how should the policy choose offers when it must both use what it currently believes works best and continue learning from alternative actions?</p>
    </section>

    <section class="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5 sm:p-6">
      <p class="text-xs font-bold uppercase tracking-[0.12em] text-amber-800 dark:text-amber-200">The core trade-off</p>
      <div class="mt-3 text-lg font-semibold leading-8 text-foreground sm:text-xl">Exploitation <span class="font-normal text-muted-foreground">(ใช้สิ่งที่รู้ว่าดี)</span> <span class="mx-2 text-amber-700 dark:text-amber-300">↔</span> Exploration <span class="font-normal text-muted-foreground">(ลองสิ่งใหม่เพื่อเรียนรู้เพิ่ม)</span></div>
      <p class="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground"><strong class="text-foreground">We are not choosing offers randomly, but we are also not locking ourselves into one choice.</strong> The policy exploits what it currently believes works best while still exploring enough alternatives to learn better decisions.</p>
    </section>

    <section>
      <h3 class="text-xl font-semibold text-foreground">Making the policy numbers meaningful</h3>
      <p class="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">The saved provisional contract is <code>adaptive_epsilon_greedy_v0_1</code>. The numbers are not decorative tuning values; they describe how much decision freedom the policy keeps when confidence changes.</p>
      <div class="mt-5 grid gap-4 md:grid-cols-2">
        <div class="rounded-xl border border-border bg-muted/20 p-5">
          <p class="font-semibold text-foreground">How to read ε (epsilon)</p>
          <p class="mt-2 text-sm leading-7 text-muted-foreground"><strong class="text-foreground">Lower ε</strong> means the policy behaves more greedily: it relies more heavily on the action it currently estimates as best. <strong class="text-foreground">Higher ε</strong> creates a larger exploration budget so alternative actions can still generate learning evidence.</p>
          <p class="mt-3 text-sm leading-7 text-muted-foreground">The saved provisional bands include <code>0.00–0.05</code>, <code>0.05–0.15</code>, and <code>0.15–0.30</code>. Read them as increasing levels of uncertainty / willingness to explore, not as production traffic commitments.</p>
        </div>
        <div class="rounded-xl border border-border bg-muted/20 p-5">
          <p class="font-semibold text-foreground">How to read policy shares</p>
          <p class="mt-2 text-sm leading-7 text-muted-foreground">Example provisional splits such as <code>0.90 / 0.10</code>, <code>0.80 / 0.20</code>, <code>0.65 / 0.35</code>, and <code>0.55 / 0.45</code> translate confidence into behavior.</p>
          <ul class="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
            <li><code>0.90 / 0.10</code> — strong exploitation; only a small bounded share remains for exploration.</li>
            <li><code>0.55 / 0.45</code> — much less certainty; exploration is almost as important as exploitation.</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="grid gap-4 md:grid-cols-2">
      <div class="rounded-xl border border-border bg-background p-5">
        <p class="font-semibold text-foreground">Why score gaps matter</p>
        <p class="mt-2 text-sm leading-7 text-muted-foreground">The policy contract includes score-gap boundaries such as <code>rank2_rank3_gap_upper</code>. A small gap means the alternatives look similar, so confidence in one clear winner is weaker and exploration can reasonably increase. A large gap means the current evidence separates the preferred action more clearly, so the policy can exploit more.</p>
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
          <p class="mt-2">Policy contract: <code>adaptive_epsilon_greedy_v0_1</code>. Assumption class: <code>ASSUMPTION_DERIVED_SIMULATION_POLICY</code>. Contract status: <code>PROVISIONAL</code>.</p>
        </div>
        <div>
          <p class="font-semibold text-foreground">Current limitation</p>
          <p class="mt-2">The prior attempted persistence check returned <code>contract_row_count = 0</code>, so persisted contract read-back is not yet established and must not be presented as complete evidence.</p>
        </div>
      </div>
    </details>

    <section>
      <h3 class="text-xl font-semibold text-foreground">Current bounded status</h3>
      <div class="mt-4 grid gap-3 text-sm leading-6 text-muted-foreground md:grid-cols-2">
        <p><strong class="text-foreground">Policy direction:</strong> ADAPTIVE EPSILON-GREEDY CONTEXTUAL BANDIT</p>
        <p><strong class="text-foreground">Learning objective:</strong> BALANCE EXPLOITATION AND EXPLORATION</p>
        <p><strong class="text-foreground">Contract status:</strong> PROVISIONAL</p>
        <p><strong class="text-foreground">Persisted contract read-back:</strong> NOT YET ESTABLISHED</p>
      </div>
      <div class="mt-5 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm leading-7 text-muted-foreground"><strong class="text-foreground">Claim boundary:</strong> Synthetic experiment policy only; not observed customer behavior and not production policy evidence. Experiment 3 does not establish online exploration safety, production policy value, causal uplift, or reinforcement-learning deployment readiness.</div>
    </section>
  `
  return panel
}

export function ExperimentCardSelectorInjector() {
  useEffect(() => {
    const install = () => {
      const heading = Array.from(document.querySelectorAll<HTMLHeadingElement>("h2")).find(
        (node) => normalizedText(node.textContent) === "Experiment evidence",
      )
      const section = heading?.closest<HTMLElement>("section")
      if (!section || section.querySelector("[data-experiment-card-selector]")) return

      const buttons = Array.from(section.querySelectorAll<HTMLButtonElement>("button"))
      const sourceCards = cards.filter((card) => card.sourceIndex !== null)
      const tabButtons = sourceCards.map((card) =>
        buttons.find((button) => normalizedText(button.textContent).startsWith(card.match)),
      )
      if (tabButtons.some((button) => !button)) return

      const originalRow = tabButtons[0]?.parentElement
      if (!originalRow) return
      originalRow.classList.add("sr-only")
      originalRow.setAttribute("aria-hidden", "true")

      const contentPanel = Array.from(originalRow.parentElement?.children ?? []).find(
        (node) => node instanceof HTMLElement && node.classList.contains("rounded-b-xl"),
      ) as HTMLElement | undefined
      if (!contentPanel) return

      const selector = document.createElement("div")
      selector.dataset.experimentCardSelector = "true"
      selector.className = "grid gap-4 md:grid-cols-2 xl:grid-cols-4"

      const experiment3Panel = createExperiment3Panel()
      let experiment3Active = false

      const renderSelection = () => {
        const currentButtons = selector.querySelectorAll<HTMLButtonElement>("button[data-card-key]")
        currentButtons.forEach((cardButton, index) => {
          const card = cards[index]
          const selected = card.sourceIndex === null
            ? experiment3Active
            : !experiment3Active && (tabButtons[card.sourceIndex]?.className.includes("border-primary") ?? false)
          cardButton.setAttribute("aria-pressed", selected ? "true" : "false")
          const base = "group min-h-44 rounded-xl border p-5 text-left transition focus:outline-none focus:ring-2 focus:ring-primary/40"
          const inactive = card.tone === "active"
            ? "border-amber-500/35 bg-amber-500/5 hover:border-amber-500/60 hover:bg-amber-500/10"
            : card.tone === "complete"
              ? "border-emerald-600/30 bg-emerald-500/5 hover:border-emerald-600/50 hover:bg-emerald-500/10"
              : "border-border bg-background hover:border-primary/40 hover:bg-muted/30"
          const active = card.tone === "active"
            ? "border-amber-500 bg-amber-500/12 shadow-sm ring-1 ring-amber-500/25"
            : card.tone === "complete"
              ? "border-emerald-600 bg-emerald-500/10 shadow-sm ring-1 ring-emerald-600/20"
              : "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
          cardButton.className = `${base} ${selected ? active : inactive}`
        })
      }

      cards.forEach((card) => {
        const button = document.createElement("button")
        button.type = "button"
        button.dataset.cardKey = card.match
        button.innerHTML = `
          <div class="flex items-start justify-between gap-3">
            <span class="text-xs font-bold uppercase tracking-[0.12em] ${card.tone === "active" ? "text-amber-800 dark:text-amber-200" : card.tone === "complete" ? "text-emerald-800 dark:text-emerald-200" : "text-muted-foreground"}">${card.eyebrow}</span>
            <span class="text-lg text-muted-foreground transition-transform group-hover:translate-x-0.5">→</span>
          </div>
          <div class="mt-4 text-base font-semibold leading-6 text-foreground">${card.title}</div>
          <p class="mt-3 text-sm leading-6 text-muted-foreground">${card.description}</p>
        `
        button.addEventListener("click", () => {
          if (card.sourceIndex === null) {
            experiment3Active = true
            contentPanel.hidden = true
            experiment3Panel.hidden = false
          } else {
            experiment3Active = false
            experiment3Panel.hidden = true
            contentPanel.hidden = false
            tabButtons[card.sourceIndex]?.click()
          }
          window.setTimeout(renderSelection, 0)
        })
        selector.appendChild(button)
      })

      originalRow.insertAdjacentElement("afterend", selector)
      contentPanel.insertAdjacentElement("afterend", experiment3Panel)
      renderSelection()

      const observer = new MutationObserver(renderSelection)
      tabButtons.forEach((button) => observer.observe(button!, { attributes: true, attributeFilter: ["class"] }))
      selector.dataset.selectionObserverReady = "true"
    }

    install()
    const observer = new MutationObserver(install)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return null
}
