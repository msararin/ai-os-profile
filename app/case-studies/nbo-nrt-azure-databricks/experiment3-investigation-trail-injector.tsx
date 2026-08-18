"use client"

import { useEffect } from "react"

function normalizedText(value: string | null | undefined) {
  return (value ?? "").replace(/\s+/g, " ").trim()
}

function createInvestigationTrail() {
  const details = document.createElement("details")
  details.dataset.experiment3InvestigationTrail = "true"
  details.className = "group rounded-lg border border-border bg-background"
  details.innerHTML = `
    <summary class="cursor-pointer list-none p-5 font-semibold text-foreground">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <span>Investigation trail — why adaptive exploration is needed</span>
        <span class="rounded-full border border-amber-500/30 bg-amber-500/5 px-3 py-1 text-xs font-semibold text-amber-800 dark:text-amber-200">7 STEPS</span>
      </div>
      <div class="mt-4 grid grid-cols-2 gap-2 text-[11px] font-semibold sm:grid-cols-4 lg:grid-cols-7">
        ${[
          ["01", "Observe"], ["02", "Hypothesize"], ["03", "Check"], ["04", "Evidence"], ["05", "Interpret"], ["06", "Bound"], ["07", "Decide"],
        ].map(([n, label]) => `<span class="rounded-md border border-border bg-muted/30 px-2 py-2 text-center text-muted-foreground"><strong class="text-foreground">${n}</strong><br/>${label}</span>`).join("")}
      </div>
    </summary>
    <div class="space-y-4 border-t border-border p-5 text-sm leading-7 text-muted-foreground">
      <div class="rounded-lg border border-border bg-background p-4">
        <div class="flex items-start gap-3"><span class="inline-flex min-w-16 justify-center rounded-md bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">STEP 01</span><div><p class="font-semibold text-foreground">Observation — what we saw</p><p class="mt-1">Experiment 2B evaluated a fixed deterministic greedy target policy. That tells us how a fixed policy compares offline with logged behavior, but a policy that always selects the current top-scoring offer can stop collecting evidence about alternatives.</p></div></div>
      </div>
      <div class="rounded-lg border border-border bg-background p-4">
        <div class="flex items-start gap-3"><span class="inline-flex min-w-16 justify-center rounded-md bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">STEP 02</span><div><p class="font-semibold text-foreground">Question / hypothesis — what we suspected</p><p class="mt-1">Can we keep most decisions focused on the offer that currently looks best while deliberately preserving enough alternative actions to continue learning? The working hypothesis is that an adaptive epsilon-greedy policy can express this trade-off explicitly.</p></div></div>
      </div>
      <div class="rounded-lg border border-border bg-background p-4">
        <div class="flex items-start gap-3"><span class="inline-flex min-w-16 justify-center rounded-md bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">STEP 03</span><div><p class="font-semibold text-foreground">Check performed — how we reasoned about it</p><p class="mt-1">We mapped policy confidence to exploration controls: epsilon bands, score-gap boundaries, and exploitation / exploration shares. Smaller score gaps represent less separation between candidate actions; larger gaps represent a clearer current winner.</p></div></div>
      </div>
      <div class="rounded-lg border border-border bg-background p-4">
        <div class="flex items-start gap-3"><span class="inline-flex min-w-16 justify-center rounded-md bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">STEP 04</span><div><p class="font-semibold text-foreground">Evidence — what exists now</p><p class="mt-1">The saved provisional contract is <code>adaptive_epsilon_greedy_v0_1</code>, with bounded epsilon / gap bands and example exploitation-exploration shares. The contract is classified as <code>ASSUMPTION_DERIVED_SIMULATION_POLICY</code> and remains <code>PROVISIONAL</code>.</p></div></div>
      </div>
      <div class="rounded-lg border border-border bg-background p-4">
        <div class="flex items-start gap-3"><span class="inline-flex min-w-16 justify-center rounded-md bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">STEP 05</span><div><p class="font-semibold text-foreground">Interpretation — what the numbers mean</p><p class="mt-1"><strong class="text-foreground">We are not choosing offers randomly, but we are also not locking ourselves into one choice.</strong> Lower epsilon / a clearer score winner means more exploitation. Higher epsilon / closer competing scores means more exploration. Exploration is therefore controlled learning budget, not randomness for its own sake.</p></div></div>
      </div>
      <div class="rounded-lg border border-border bg-background p-4">
        <div class="flex items-start gap-3"><span class="inline-flex min-w-16 justify-center rounded-md bg-slate-700 px-2 py-1 text-xs font-bold text-white">STEP 06</span><div><p class="font-semibold text-foreground">What it does NOT prove</p><p class="mt-1">This does not establish online exploration safety, real-customer response, production policy value, causal uplift, commercial benefit, or reinforcement-learning deployment readiness. The previous persistence check also returned <code>contract_row_count = 0</code>, so persisted contract read-back is not yet established.</p></div></div>
      </div>
      <div class="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
        <div class="flex items-start gap-3"><span class="inline-flex min-w-16 justify-center rounded-md bg-amber-600 px-2 py-1 text-xs font-bold text-white">STEP 07</span><div><p class="font-semibold text-foreground">Decision / next step</p><p class="mt-1">Keep Experiment 3 in the adaptive contextual-bandit lane. Next evidence should establish policy-contract persistence/read-back and decision-probability logging before treating the adaptive policy as an executable learning-policy artifact.</p></div></div>
      </div>
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
