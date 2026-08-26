"use client"

import { useEffect } from "react"

function clarifiedHeader() {
  return `
    <div class="w-full">
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.12em] text-indigo-800 dark:text-indigo-200">Modeling Execution Track</p>
        <h3 class="mt-2 text-xl font-semibold text-foreground">What we are building and where we are now</h3>
        <p class="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">This is the delivery view of Experiment 3. It is separate from the STEP 01–07 Investigation Trail, which explains how we reasoned and validated the approach.</p>
        <p class="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground"><strong class="text-foreground">Current focus:</strong> recovery is proven; the TRAIN-only personalization-capacity probe found a stable single-action winner, so Training Formulation remains in progress while controlled <code>context × action</code> interaction repair is prepared.</p>
      </div>
      <span class="mt-4 inline-flex rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-900 dark:text-amber-100">CONDITIONALLY ACCEPTABLE / GUARDRAIL REQUIRED</span>
    </div>
  `
}

function executionSequence() {
  return `
    <p class="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">Experiment 3 modeling execution sequence</p>
    <p class="mt-2 text-xs leading-5 text-muted-foreground">A–F identifies the delivery stages. Expand any stage for its purpose, current status, and relationship to the evidence below.</p>

    <div class="mt-4 grid gap-3 lg:grid-cols-2" aria-label="Experiment 3 A-F modeling execution sequence">
      <details class="group rounded-lg border border-emerald-600/30 bg-background">
        <summary class="cursor-pointer list-none p-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <strong class="text-foreground">A — Feature Contract</strong>
            <span class="font-semibold text-emerald-700 dark:text-emerald-300">CLOSED / PASS</span>
          </div>
          <p class="mt-1 text-xs text-muted-foreground">Defines what information the policy-learning formulation is allowed to use. <span class="font-semibold">Expand ↓</span></p>
        </summary>
        <div class="border-t border-border p-4 text-sm leading-6 text-muted-foreground">
          <p><strong class="text-foreground">Purpose:</strong> establish the feature boundary before training formulation.</p>
          <p class="mt-2"><strong class="text-foreground">Relationship:</strong> A is the prerequisite for B. Its status is already closed / pass in the current Experiment 3 execution record.</p>
        </div>
      </details>

      <details class="group rounded-lg border border-indigo-500/35 bg-indigo-500/5" open>
        <summary class="cursor-pointer list-none p-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <strong class="text-foreground">B — Training Formulation</strong>
            <span class="font-semibold text-indigo-700 dark:text-indigo-300">IN PROGRESS</span>
          </div>
          <p class="mt-1 text-xs text-muted-foreground">Defines how the learning problem can be trained safely under the available evidence. Current focus: repair context-dependent action preference before Candidate Generation. <span class="font-semibold">Expand ↓</span></p>
        </summary>
        <div class="space-y-3 border-t border-indigo-500/20 p-4">
          <details class="rounded-md border border-amber-600/30 bg-amber-500/5" open>
            <summary class="cursor-pointer list-none p-3">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <strong class="text-foreground">Current formulation finding — personalization capacity</strong>
                <span class="font-semibold text-amber-700 dark:text-amber-300">REPAIR NEXT</span>
              </div>
              <p class="mt-1 text-xs text-muted-foreground"><code>LOYALTY</code> wins all <code>8,002</code> TRAIN contexts; the winner margin is small but highly stable. <span class="font-semibold">Expand ↓</span></p>
            </summary>
            <div class="border-t border-border p-3 text-sm leading-6 text-muted-foreground">
              <p><strong class="text-foreground">Probe result:</strong> <code>40,010</code> context-action candidates scored; distinct winning actions = <code>1</code>; <code>LOYALTY</code> winner share = <code>100%</code>.</p>
              <p class="mt-2"><strong class="text-foreground">Winner margin:</strong> average <span title="Difference between the highest and second-highest predicted reward probability within the same context.">Top-1 vs Top-2 gap</span> = <code>0.739 pp</code>, with a narrow <code>0.618–0.781 pp</code> range.</p>
              <p class="mt-2"><strong class="text-foreground">Meaning:</strong> context changes predicted reward levels, but action ordering remains effectively invariant. This is a representational-capacity limitation of the main-effects baseline, not a held-out accuracy verdict and not evidence that LOYALTY is truly the best offer.</p>
              <p class="mt-2"><strong class="text-foreground">Next:</strong> introduce controlled <code>context × action</code> interactions, retrain on TRAIN only, and rerun the same probe. TEST remains untouched and no downstream stage is authorized by this finding alone.</p>
            </div>
          </details>

          <details class="rounded-md border border-amber-500/35 bg-background" open>
            <summary class="cursor-pointer list-none p-3">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <strong class="text-foreground">B1 — Action × Context Support</strong>
                <span class="font-semibold text-amber-700 dark:text-amber-300">GUARDRAIL REQUIRED</span>
              </div>
              <p class="mt-1 text-xs text-muted-foreground">Checks whether each action has enough historical support under each context. <span class="font-semibold">Expand ↓</span></p>
            </summary>
            <div class="border-t border-border p-3 text-sm leading-6 text-muted-foreground">
              <p><strong class="text-foreground">Current evidence:</strong> 109 observed context-action cells out of 110 possible observed-context × action cells; one zero-support cell.</p>
              <p class="mt-2"><strong class="text-foreground">Decision:</strong> data is usable, but unrestricted policy learning is not yet authorized. The detailed support counts and Candidate Policy v1 guardrail immediately below this execution sequence are B1 evidence.</p>
            </div>
          </details>

          <details class="rounded-md border border-red-500/30 bg-background">
            <summary class="cursor-pointer list-none p-3">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <strong class="text-foreground">B2 — Candidate-policy training</strong>
                <span class="font-semibold text-red-700 dark:text-red-300">NOT YET AUTHORIZED</span>
              </div>
              <p class="mt-1 text-xs text-muted-foreground">Training entry remains gated by the B1 support guardrail. <span class="font-semibold">Expand ↓</span></p>
            </summary>
            <div class="border-t border-border p-3 text-sm leading-6 text-muted-foreground">
              <p><strong class="text-foreground">Entry condition:</strong> candidate-policy training should respect the support treatment defined by B1 before unrestricted learning is allowed.</p>
              <p class="mt-2">No production-readiness or production-safety claim is implied by this gate.</p>
            </div>
          </details>
        </div>
      </details>

      <details class="group rounded-lg border border-slate-400/40 bg-background">
        <summary class="cursor-pointer list-none p-4">
          <div class="flex flex-wrap items-center justify-between gap-2"><strong class="text-foreground">C — Candidate Generation</strong><span class="font-semibold text-slate-600 dark:text-slate-300">NOT STARTED</span></div>
          <p class="mt-1 text-xs text-muted-foreground">Generate candidate decisions from the authorized learning formulation. <span class="font-semibold">Expand ↓</span></p>
        </summary>
        <div class="border-t border-border p-4 text-sm leading-6 text-muted-foreground">Planned downstream stage. No Experiment 3 candidate-generation evidence is claimed here yet.</div>
      </details>

      <details class="group rounded-lg border border-slate-400/40 bg-background">
        <summary class="cursor-pointer list-none p-4">
          <div class="flex flex-wrap items-center justify-between gap-2"><strong class="text-foreground">D — Candidate Policy</strong><span class="font-semibold text-slate-600 dark:text-slate-300">NOT STARTED</span></div>
          <p class="mt-1 text-xs text-muted-foreground">Form the candidate policy that will later be evaluated offline. <span class="font-semibold">Expand ↓</span></p>
        </summary>
        <div class="border-t border-border p-4 text-sm leading-6 text-muted-foreground">Planned downstream stage. No candidate-policy value claim is established at this point.</div>
      </details>

      <details class="group rounded-lg border border-slate-400/40 bg-background">
        <summary class="cursor-pointer list-none p-4">
          <div class="flex flex-wrap items-center justify-between gap-2"><strong class="text-foreground">E — Held-out OPE</strong><span class="font-semibold text-slate-600 dark:text-slate-300">NOT STARTED</span></div>
          <p class="mt-1 text-xs text-muted-foreground">Evaluate the candidate policy on held-out logged interactions. <span class="font-semibold">Expand ↓</span></p>
        </summary>
        <div class="border-t border-border p-4 text-sm leading-6 text-muted-foreground">This is a future Experiment 3 evaluation stage. Experiment 2B OPE evidence remains separate and does not automatically validate a future Experiment 3 candidate policy.</div>
      </details>

      <details class="group rounded-lg border border-slate-400/40 bg-background">
        <summary class="cursor-pointer list-none p-4">
          <div class="flex flex-wrap items-center justify-between gap-2"><strong class="text-foreground">F — Compare</strong><span class="font-semibold text-slate-600 dark:text-slate-300">NOT STARTED</span></div>
          <p class="mt-1 text-xs text-muted-foreground">Compare the candidate policy with the relevant bounded baseline/evaluation reference. <span class="font-semibold">Expand ↓</span></p>
        </summary>
        <div class="border-t border-border p-4 text-sm leading-6 text-muted-foreground">Comparison is downstream of held-out OPE. No production uplift, causal impact, or online-safety claim is established by this future stage.</div>
      </details>
    </div>
  `
}

export function Experiment3ExecutionHierarchyClarityInjector() {
  useEffect(() => {
    const install = () => {
      const section = document.querySelector<HTMLElement>("[data-experiment3-support-guardrail]")
      if (!section || section.dataset.executionHierarchyClarified === "true") return

      const header = section.querySelector<HTMLElement>(":scope > div")
      if (!header) return

      header.className = ""
      header.innerHTML = clarifiedHeader()

      const duplicateHierarchy = section.querySelector<HTMLElement>(
        '[aria-label="Experiment 3 execution hierarchy"]',
      )
      duplicateHierarchy?.remove()

      const sequenceLabel = Array.from(section.querySelectorAll<HTMLElement>("p")).find(
        (node) => node.textContent?.trim() === "Experiment 3 business sequence",
      )
      const sequenceContainer = sequenceLabel?.parentElement
      if (sequenceContainer) {
        sequenceContainer.innerHTML = executionSequence()
      }

      const technicalEvidence = Array.from(section.querySelectorAll<HTMLElement>("summary")).find((node) =>
        node.textContent?.includes("Technical evidence — support counts and Candidate Policy v1 guardrail"),
      )
      if (technicalEvidence) {
        technicalEvidence.innerHTML = `B1 — Action × Context Support · Evidence — historical support and Candidate Policy v1 guardrail <span class="ml-2 text-xs font-normal text-muted-foreground">Expand evidence ↓</span>`
      }

      section.dataset.executionHierarchyClarified = "true"
    }

    install()
    const observer = new MutationObserver(install)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return null
}
