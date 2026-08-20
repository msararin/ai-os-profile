"use client"

import { useEffect } from "react"

function normalizedText(value: string | null | undefined) {
  return (value ?? "").replace(/\s+/g, " ").trim()
}

function stepBlock(number: string, title: string, summary: string, body: string, tone = "complete") {
  const badgeClass = tone === "active"
    ? "bg-indigo-600 text-white"
    : "bg-emerald-600 text-white"
  return `
    <details class="group rounded-lg border border-border bg-background">
      <summary class="cursor-pointer list-none p-4">
        <div class="flex items-start gap-3">
          <span class="inline-flex min-w-16 justify-center rounded-md ${badgeClass} px-2 py-1 text-xs font-bold">STEP ${number}</span>
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <p class="font-semibold text-foreground">${title}</p>
              <span class="text-xs font-semibold text-muted-foreground">Expand values ↓</span>
            </div>
            <p class="mt-1 text-sm leading-6 text-muted-foreground">${summary}</p>
          </div>
        </div>
      </summary>
      <div class="border-t border-border bg-muted/10 p-4 text-sm leading-7 text-muted-foreground">${body}</div>
    </details>
  `
}

function createInvestigationTrail() {
  const details = document.createElement("details")
  details.dataset.experiment3InvestigationTrail = "true"
  details.className = "group rounded-lg border border-border bg-background"
  details.innerHTML = `
    <summary class="cursor-pointer list-none p-5 font-semibold text-foreground">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <span>Investigation trail — why adaptive exploration is needed</span>
        <span class="rounded-full border border-amber-500/30 bg-amber-500/5 px-3 py-1 text-xs font-semibold text-amber-800 dark:text-amber-200">7 STEPS · VALUES INSIDE</span>
      </div>
      <div class="mt-4 grid grid-cols-2 gap-2 text-[11px] font-semibold sm:grid-cols-4 lg:grid-cols-7">
        ${[
          ["01", "Observe"], ["02", "Hypothesize"], ["03", "Check"], ["04", "Evidence"], ["05", "Interpret"], ["06", "Bound"], ["07", "Decide"],
        ].map(([n, label]) => n === "07"
          ? `<span class="rounded-md border border-indigo-500/40 bg-indigo-500/10 px-2 py-2 text-center text-indigo-800 ring-1 ring-indigo-500/20 dark:text-indigo-200"><strong>${n}</strong><br/>${label}</span>`
          : `<span class="rounded-md border border-emerald-600/30 bg-emerald-500/10 px-2 py-2 text-center text-emerald-800 dark:text-emerald-200"><strong>${n}</strong><br/>${label}</span>`).join("")}
      </div>
    </summary>
    <div class="space-y-3 border-t border-border p-5">
      ${stepBlock(
        "01",
        "Observation — what we saw",
        "Experiment 2B evaluated a fixed deterministic greedy target policy; that policy does not itself preserve deliberate exploration.",
        `<p><strong class="text-foreground">Decision state carried forward from Experiment 2B:</strong> deterministic greedy target policy.</p>
         <p class="mt-2"><strong class="text-foreground">Exploration schedule in that target policy:</strong> none — Experiment 2B was evaluating a fixed greedy target policy, not an adaptive exploration policy.</p>
         <p class="mt-2">This created the Experiment 3 question: if we always choose the current winner, how do we keep collecting evidence about alternatives?</p>`,
      )}
      ${stepBlock(
        "02",
        "Question / hypothesis — what we suspected",
        "Use confidence-sensitive epsilon-greedy behavior so the policy exploits clear winners and explores more when candidate scores are close.",
        `<p><strong class="text-foreground">Working policy:</strong> <code>adaptive_epsilon_greedy_v0_1</code></p>
         <p class="mt-2"><strong class="text-foreground">Assumption class:</strong> <code>ASSUMPTION_DERIVED_SIMULATION_POLICY</code></p>
         <p class="mt-2"><strong class="text-foreground">Contract status:</strong> <code>PROVISIONAL</code></p>
         <p class="mt-2"><strong class="text-foreground">Design relationship:</strong> smaller score gap → higher exploration probability; larger score gap → lower exploration probability.</p>`,
      )}
      ${stepBlock(
        "03",
        "Check performed — how we mapped confidence to action",
        "We encoded exact score-gap bands, exploration probabilities, and rank-2/rank-3 exploration shares.",
        `<p class="font-semibold text-foreground">Rank1–Rank2 gap → total exploration probability</p>
         <div class="mt-2 overflow-x-auto"><table class="w-full min-w-[520px] text-left text-sm"><thead><tr class="border-b border-border"><th class="py-2 pr-4">Gap band</th><th class="py-2">Exploration probability ε</th></tr></thead><tbody>
           <tr class="border-b border-border"><td class="py-2 pr-4"><code>[0.00, 0.05)</code></td><td class="py-2"><strong class="text-foreground">0.35</strong></td></tr>
           <tr class="border-b border-border"><td class="py-2 pr-4"><code>[0.05, 0.15)</code></td><td class="py-2"><strong class="text-foreground">0.25</strong></td></tr>
           <tr class="border-b border-border"><td class="py-2 pr-4"><code>[0.15, 0.30)</code></td><td class="py-2"><strong class="text-foreground">0.15</strong></td></tr>
           <tr><td class="py-2 pr-4"><code>[0.30, +∞)</code></td><td class="py-2"><strong class="text-foreground">0.05</strong></td></tr>
         </tbody></table></div>
         <p class="mt-5 font-semibold text-foreground">Rank2–Rank3 gap → allocation of the exploration budget</p>
         <div class="mt-2 overflow-x-auto"><table class="w-full min-w-[620px] text-left text-sm"><thead><tr class="border-b border-border"><th class="py-2 pr-4">Gap band</th><th class="py-2 pr-4">Rank-2 share</th><th class="py-2">Rank-3 share</th></tr></thead><tbody>
           <tr class="border-b border-border"><td class="py-2 pr-4"><code>[0.00, 0.05)</code></td><td class="py-2 pr-4"><strong class="text-foreground">0.55</strong></td><td class="py-2"><strong class="text-foreground">0.45</strong></td></tr>
           <tr class="border-b border-border"><td class="py-2 pr-4"><code>[0.05, 0.15)</code></td><td class="py-2 pr-4"><strong class="text-foreground">0.65</strong></td><td class="py-2"><strong class="text-foreground">0.35</strong></td></tr>
           <tr class="border-b border-border"><td class="py-2 pr-4"><code>[0.15, 0.30)</code></td><td class="py-2 pr-4"><strong class="text-foreground">0.80</strong></td><td class="py-2"><strong class="text-foreground">0.20</strong></td></tr>
           <tr><td class="py-2 pr-4"><code>[0.30, +∞)</code></td><td class="py-2 pr-4"><strong class="text-foreground">0.90</strong></td><td class="py-2"><strong class="text-foreground">0.10</strong></td></tr>
         </tbody></table></div>`,
      )}
      ${stepBlock(
        "04",
        "Evidence — what was actually persisted and read back",
        "The provisional policy contract was inserted into the simulation lane and its full 16-combination cross-product was read back successfully.",
        `<div class="grid gap-3 sm:grid-cols-2">
           <p><strong class="text-foreground">Inserted rows:</strong> <code>16</code></p>
           <p><strong class="text-foreground">Read-back row count:</strong> <code>16</code></p>
           <p><strong class="text-foreground">Exact combination count:</strong> <code>16</code></p>
           <p><strong class="text-foreground">Aggregate validation:</strong> <code>PASS</code></p>
           <p><strong class="text-foreground">Contract read-back:</strong> <code>PASS</code></p>
           <p><strong class="text-foreground">Synthetic decisions generated:</strong> <code>0</code></p>
         </div>
         <p class="mt-3">Open-ended upper bounds were read back as <code>NULL</code> as designed. No canonical Bronze or Silver mutation occurred.</p>`,
      )}
      ${stepBlock(
        "05",
        "Interpretation — what the values mean",
        "The values implement controlled learning: uncertainty buys more exploration; a clear winner buys more exploitation.",
        `<p><strong class="text-foreground">We are not choosing offers randomly, but we are also not locking ourselves into one choice.</strong></p>
         <p class="mt-2"><code>gap &lt; 0.05 → ε = 0.35</code>: candidates are close, so the policy reserves a larger learning budget.</p>
         <p class="mt-2"><code>gap ≥ 0.30 → ε = 0.05</code>: the current winner is much clearer, so the policy exploits more heavily.</p>
         <p class="mt-2">Inside exploration, a close rank2/rank3 contest uses <code>0.55 / 0.45</code>; a clearer separation uses <code>0.90 / 0.10</code>. The numbers therefore express confidence-sensitive decision freedom.</p>`,
      )}
      ${stepBlock(
        "06",
        "What it does NOT prove",
        "The contract is validated as a synthetic simulation policy artifact, but no adaptive decisions have yet been generated from it.",
        `<p><strong class="text-foreground">Current boundary values:</strong></p>
         <ul class="mt-2 list-disc space-y-1 pl-5">
           <li>Contract status = <code>PROVISIONAL</code></li>
           <li>Synthetic decisions generated = <code>0</code></li>
           <li>Canonical Bronze/Silver mutation = <code>NONE</code></li>
         </ul>
         <p class="mt-3">Therefore this does not establish online exploration safety, real-customer response, production policy value, causal uplift, commercial benefit, or reinforcement-learning deployment readiness.</p>`,
      )}
      ${stepBlock(
        "07",
        "Decision / next step",
        "Keep Experiment 3 in the adaptive contextual-bandit lane and move from validated policy contract to generated, probability-logged decisions.",
        `<p><strong class="text-foreground">Current gate:</strong> policy contract persisted + read back = <code>PASS</code>.</p>
         <p class="mt-2"><strong class="text-foreground">Current execution value:</strong> synthetic decisions generated = <code>0</code>.</p>
         <p class="mt-2"><strong class="text-foreground">Next evidence:</strong> generate decisions under <code>adaptive_epsilon_greedy_v0_1</code> and log the selected-action probability / propensity with the policy version so later OPE can reconstruct how each action was chosen.</p>
         <p class="mt-2">No production-readiness threshold is asserted at this step.</p>`,
        "active",
      )}
    </div>
  `
  return details
}

export function Experiment3InvestigationTrailInjector() {
  useEffect(() => {
    const install = () => {
      const heading = Array.from(document.querySelectorAll<HTMLHeadingElement>("h3")).find(
        (node) => normalizedText(node.textContent) === "Making the policy numbers meaningful",
      )
      const experiment3Panel = heading?.closest<HTMLElement>("[data-experiment3-panel]")
      if (!heading || !experiment3Panel || experiment3Panel.querySelector("[data-experiment3-investigation-trail]")) return

      const section = heading.closest<HTMLElement>("section")
      if (!section) return
      section.insertAdjacentElement("afterend", createInvestigationTrail())
    }

    install()
    const observer = new MutationObserver(install)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return null
}
