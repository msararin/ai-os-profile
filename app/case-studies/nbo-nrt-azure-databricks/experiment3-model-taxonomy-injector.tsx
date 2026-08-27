"use client"

import { useEffect } from "react"

function createTaxonomyOverview() {
  const section = document.createElement("details")
  section.dataset.experiment3ModelTaxonomy = "true"
  section.className = "group rounded-lg border border-indigo-500/30 bg-background"
  section.open = true
  section.innerHTML = `
    <summary class="cursor-pointer list-none p-5">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.12em] text-indigo-800 dark:text-indigo-200">Experiment 3 taxonomy · model evolution vs execution durability</p>
          <p class="mt-2 font-semibold text-foreground">Separate the model versions from the MLOps execution-state change</p>
          <p class="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">The Experiment 3 story now has two different kinds of evolution: the reward-model formulation changed from V1 to V2, while the execution architecture separately became durable through Unity Catalog and MLflow. Keeping those axes separate avoids treating an MLOps recovery improvement as a new model.</p>
        </div>
        <span class="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-800 dark:text-indigo-200">CURRENT TAXONOMY</span>
      </div>
    </summary>
    <div class="space-y-4 border-t border-border p-5 text-sm leading-7 text-muted-foreground">
      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-md border border-slate-400/35 bg-muted/15 p-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <p class="font-semibold text-foreground">Baseline V1 — Main-effects Logistic Regression</p>
            <span class="text-xs font-bold text-slate-600 dark:text-slate-300">CLOSED / REFERENCE</span>
          </div>
          <p class="mt-2">First supervised reward-model baseline. It established a measurable reference but the TRAIN-only probe found one global winner: <code>LOYALTY</code> in <code>8,002/8,002</code> contexts, with an average Top-1 vs Top-2 gap of about <code>0.739 pp</code>.</p>
          <p class="mt-2">This limitation is preserved as historical evidence; V1 is not RL and is no longer the current formulation.</p>
        </div>

        <div class="rounded-md border border-emerald-600/30 bg-emerald-500/5 p-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <p class="font-semibold text-foreground">V1-D — Durable Recovery Baseline</p>
            <span class="text-xs font-bold text-emerald-700 dark:text-emerald-300">PASS</span>
          </div>
          <p class="mt-2">Not a new model. V1-D names the execution-state transition in which the same baseline became recoverable from durable artifacts:</p>
          <p class="mt-2 font-mono text-xs sm:text-sm">Unity Catalog TRAIN → MLflow artifact → UC Volume temp bridge → Spark ML load → scoring</p>
          <p class="mt-2">Clean-notebook recovery, model load-back, and post-load scoring all passed. This is MLOps durability evidence, not a formulation change.</p>
        </div>

        <div class="rounded-md border border-emerald-600/30 bg-emerald-500/5 p-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <p class="font-semibold text-foreground">Reward Model V2 — Interaction-aware Logistic Regression</p>
            <span class="text-xs font-bold text-emerald-700 dark:text-emerald-300">TRAIN FORMULATION PASS</span>
          </div>
          <p class="mt-2">V2 is the actual model-formulation change: V1 main effects plus controlled <code>context × action</code> interactions for segment, event type, and decision channel.</p>
          <p class="mt-2">TRAIN ROC-AUC <code>0.613125</code>; TRAIN PR-AUC <code>0.649874</code>. The durable V2 artifact was persisted to MLflow, loaded back successfully, and scored successfully after reload.</p>
        </div>

        <div class="rounded-md border border-slate-400/35 bg-muted/15 p-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <p class="font-semibold text-foreground">RL / Policy Learning V1</p>
            <span class="text-xs font-bold text-slate-600 dark:text-slate-300">NOT STARTED</span>
          </div>
          <p class="mt-2">This is the next distinct lane. Neither reward-model V1 nor V2 is RL. Policy-learning objective, action-selection logic, exploration constraints, and held-out OPE remain downstream work.</p>
        </div>
      </div>

      <details class="rounded-md border border-border bg-muted/15">
        <summary class="cursor-pointer list-none p-4 font-semibold text-foreground">Why V2 is considered personalization-capable on TRAIN <span class="ml-1 text-xs font-normal text-muted-foreground">Expand evidence ↓</span></summary>
        <div class="space-y-3 border-t border-border p-4">
          <p><strong class="text-foreground">V1 reference:</strong> <code>1</code> distinct winning action; <code>LOYALTY</code> winner share <code>100%</code>.</p>
          <p><strong class="text-foreground">V2:</strong> <code>4</code> distinct winning actions; dominant action <code>VOICE</code>; dominant winner share <code>42.077%</code>.</p>
          <p><strong class="text-foreground">Winner separation:</strong> average Top-1 vs Top-2 gap <code>3.949 pp</code>; median <code>2.747 pp</code>; min <code>0.371 pp</code>; max <code>12.230 pp</code>.</p>
          <p><strong class="text-foreground">Structured context patterns:</strong> DIGITAL is mostly VOICE (<code>72.5%</code>), FAMILY strongly VOICE (<code>86.7%</code>), TRAVEL mostly DATA (<code>77.5%</code>), VALUE mostly LOYALTY with BUNDLE secondary. APP_OPEN is mostly LOYALTY, BALANCE_CHECK mostly VOICE, and USAGE_CHECK distributes across DATA / VOICE / LOYALTY / BUNDLE.</p>
          <p><strong class="text-foreground">Full categorical-context examples:</strong> DIGITAL + APP_OPEN + APP → LOYALTY; FAMILY + APP_OPEN + APP → DATA; TRAVEL + USAGE_CHECK + WEB → DATA; VALUE + BALANCE_CHECK + APP → BUNDLE.</p>
          <p>This supports the bounded statement that V2 repaired the V1 representational-capacity limitation on TRAIN. It does not establish production effectiveness, causal uplift, operator truth, or held-out TEST performance.</p>
        </div>
      </details>

      <div class="rounded-md border border-amber-500/30 bg-amber-500/5 p-4">
        <p class="font-semibold text-foreground">Current boundary</p>
        <p class="mt-1">Reward Model V2 is the current supervised reward-model state. TEST remains untouched. B1 support guardrails and B2 policy-training authorization remain separate gates. RL / Policy Learning has not started.</p>
      </div>
    </div>
  `
  return section
}

function retitleHistoricalV1(panel: HTMLElement) {
  const evidence = panel.querySelector<HTMLElement>("[data-experiment3-representational-capacity-evidence]")
  if (!evidence) return

  const title = Array.from(evidence.querySelectorAll<HTMLElement>("p")).find((node) =>
    node.textContent?.includes("01_REPRESENTATIONAL_CAPACITY_PROBE"),
  )
  if (title) title.textContent = "Baseline V1 — Main-effects Logistic Regression · historical personalization-capacity reference"

  const badge = Array.from(evidence.querySelectorAll<HTMLElement>("span")).find((node) =>
    node.textContent?.trim() === "FORMULATION LIMITATION FOUND",
  )
  if (badge) badge.textContent = "CLOSED / REFERENCE LIMITATION"

  const statusHeading = Array.from(evidence.querySelectorAll<HTMLElement>("p")).find((node) =>
    node.textContent?.trim() === "Current status and next formulation step",
  )
  const statusBox = statusHeading?.parentElement
  if (statusBox) {
    statusBox.innerHTML = `
      <p class="font-semibold text-foreground">V1 closure and handoff</p>
      <p class="mt-1"><strong class="text-foreground">Baseline V1 is now CLOSED / REFERENCE.</strong> Its single-winner behavior remains preserved as the reason an interaction-aware formulation was introduced.</p>
      <p class="mt-2">The current supervised reward-model state is V2, recorded in the taxonomy section below. TEST remains untouched and no production claim is introduced.</p>
    `
  }
}

function updateExecutionTrack(panel: HTMLElement) {
  const track = panel.querySelector<HTMLElement>("[data-experiment3-support-guardrail]")
  if (!track) return

  const headerParagraphs = Array.from(track.querySelectorAll<HTMLElement>(":scope > div p"))
  const currentFocus = headerParagraphs.find((node) => node.textContent?.includes("Current focus:"))
  if (currentFocus) {
    currentFocus.innerHTML = `<strong class="text-foreground">Current focus:</strong> Baseline V1 is closed as the reference, V1-D execution durability is proven, and interaction-aware Reward Model V2 has passed the TRAIN-side personalization-capacity diagnostic. The next distinct lane is RL / Policy Learning, subject to the existing support and authorization gates.`
  }

  const executionSequence = track.querySelector<HTMLElement>('[aria-label="Experiment 3 A-F modeling execution sequence"]')
  if (!executionSequence) return

  const bStage = Array.from(executionSequence.querySelectorAll<HTMLDetailsElement>(":scope > details")).find((details) =>
    details.querySelector("summary")?.textContent?.includes("B — Training Formulation"),
  )
  if (!bStage) return

  const bSummaryText = bStage.querySelector<HTMLElement>("summary p")
  if (bSummaryText) {
    bSummaryText.innerHTML = `Reward-model formulation has progressed from V1 reference to V2 TRAIN formulation pass; overall B remains in progress because policy-learning authorization is still gated. <span class="font-semibold">Expand ↓</span>`
  }

  const currentFinding = Array.from(bStage.querySelectorAll<HTMLDetailsElement>(":scope > div > details")).find((details) =>
    details.querySelector("summary")?.textContent?.includes("Current formulation finding — personalization capacity"),
  )
  if (currentFinding) {
    currentFinding.className = "rounded-md border border-emerald-600/30 bg-emerald-500/5"
    currentFinding.innerHTML = `
      <summary class="cursor-pointer list-none p-3">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <strong class="text-foreground">Reward Model V2 — interaction-aware Logistic Regression</strong>
          <span class="font-semibold text-emerald-700 dark:text-emerald-300">TRAIN FORMULATION PASS</span>
        </div>
        <p class="mt-1 text-xs text-muted-foreground">V2 repaired the V1 single-winner limitation on TRAIN and is durably persisted / load-back verified. <span class="font-semibold">Expand ↓</span></p>
      </summary>
      <div class="space-y-2 border-t border-border p-3 text-sm leading-6 text-muted-foreground">
        <p><strong class="text-foreground">V1 reference:</strong> LOYALTY won <code>100%</code> of <code>8,002</code> TRAIN contexts; average winner margin about <code>0.739 pp</code>.</p>
        <p><strong class="text-foreground">V2 formulation:</strong> main effects + controlled segment × action, event × action, and decision-channel × action interactions.</p>
        <p><strong class="text-foreground">V2 metrics:</strong> TRAIN ROC-AUC <code>0.613125</code>; TRAIN PR-AUC <code>0.649874</code>.</p>
        <p><strong class="text-foreground">V2 capacity result:</strong> <code>4</code> distinct winners; dominant action VOICE at <code>42.077%</code>; winner identity separates systematically by segment, event, and full categorical context.</p>
        <p><strong class="text-foreground">Durability:</strong> MLflow persist PASS · load-back PASS · post-load scoring PASS.</p>
        <p><strong class="text-foreground">Boundary:</strong> TRAIN-only synthetic evidence. TEST remains untouched. This does not authorize B2, production use, causal claims, or operator truth.</p>
      </div>
    `
  }
}

export function Experiment3ModelTaxonomyInjector() {
  useEffect(() => {
    const install = () => {
      const panel = document.querySelector<HTMLElement>("[data-experiment3-panel]")
      if (!panel) return

      retitleHistoricalV1(panel)
      updateExecutionTrack(panel)

      if (!panel.querySelector("[data-experiment3-model-taxonomy]")) {
        const v1Evidence = panel.querySelector<HTMLElement>("[data-experiment3-representational-capacity-evidence]")
        if (v1Evidence) v1Evidence.insertAdjacentElement("afterend", createTaxonomyOverview())
      }
    }

    install()
    const observer = new MutationObserver(install)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return null
}
