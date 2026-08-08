"use client"

import { useEffect } from "react"

function normalizedText(value: string | null | undefined) {
  return (value ?? "").replace(/\s+/g, " ").trim()
}

function createCandidateDecision() {
  const decision = document.createElement("details")
  decision.dataset.exp2CandidateDecision = "true"
  decision.className = "group rounded-lg border border-amber-500/35 bg-amber-500/5"
  decision.innerHTML = `
    <summary class="cursor-pointer list-none p-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <span class="font-semibold text-foreground">Key decision making — candidate-set issue found</span>
        <span class="rounded-full border border-amber-600/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-900 dark:text-amber-100">Experiment 2.1 · Targeted Data Gate reopen</span>
      </div>
    </summary>
    <div class="space-y-6 border-t border-border p-5 text-sm leading-7 text-muted-foreground">
      <div class="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
        <p class="font-semibold text-foreground">Issue found during Modeling Phase 1 sanity checks</p>
        <p class="mt-2 font-mono text-xs text-foreground sm:text-sm">4,800 decisions → 4,800 candidate rows → exactly 1 eligible candidate per decision</p>
        <p class="mt-2">A second Databricks check found 4,800 exposures, 4,800 candidate/exposure matches, and 0 mismatches. The sole candidate always matched the exposed offer.</p>
      </div>

      <div class="grid gap-4 lg:grid-cols-2">
        <div class="rounded-lg border border-border bg-background p-4">
          <p class="font-semibold text-foreground">Why this is a real NBO blocker</p>
          <p class="mt-2">A response-propensity model could still answer a narrower question such as “Will this customer accept this already-provided offer?”</p>
          <p class="mt-2">But it cannot prove <strong class="text-foreground">Next Best Offer ranking</strong> because there is no competitive choice set inside a decision. The data cannot demonstrate “Offer A vs Offer B vs Offer C → choose the best.”</p>
        </div>
        <div class="rounded-lg border border-border bg-background p-4">
          <p class="font-semibold text-foreground">Decision</p>
          <p class="mt-2 font-semibold text-amber-800 dark:text-amber-200">CANDIDATE SET DESIGN REPAIR / EXPERIMENT 2.1</p>
          <p class="mt-2">Reopen the Data Gate only for candidate-set design. This is a data / analytical-contract repair discovered before training—not a model-performance repair and not a restart of the full G0–G7 lifecycle.</p>
        </div>
      </div>

      <div class="rounded-lg border border-border bg-muted/20 p-4">
        <p class="font-semibold text-foreground">Required target flow</p>
        <p class="mt-2 font-mono text-xs text-foreground sm:text-sm">1 decision → 3–8 eligible candidates → customer × offer interactions → ranking opportunity → 1 selected / exposed offer → response</p>
        <p class="mt-2">Exposure remains a separate event boundary: only the selected action is exposed unless a separately approved multi-exposure contract is introduced.</p>
      </div>

      <div>
        <p class="font-semibold text-foreground">Principles used in the decision</p>
        <div class="mt-3 grid gap-3 md:grid-cols-2">
          <div class="rounded-md border border-border bg-background p-4"><strong class="text-foreground">1. Inspect before training.</strong><p class="mt-1">Audit model-ready data first. Repair semantic or analytical gaps before optimizing metrics or starting model training.</p></div>
          <div class="rounded-md border border-border bg-background p-4"><strong class="text-foreground">2. Candidate before selection.</strong><p class="mt-1">Customer + Context → Eligibility → Candidate Set → Ranking / Selection → Exposure. Candidate generation cannot depend on the already-selected or exposed offer.</p></div>
          <div class="rounded-md border border-border bg-background p-4"><strong class="text-foreground">3. Candidate ≠ Selected ≠ Exposed ≠ Accepted.</strong><p class="mt-1">Keep decision, treatment, and response semantics separate so one stage is not mistaken for another.</p></div>
          <div class="rounded-md border border-border bg-background p-4"><strong class="text-foreground">4. Multiplicity must be meaningful.</strong><p class="mt-1">Normal ranking decisions need roughly 3–8 eligible, substantively distinct alternatives—not duplicated rows or an identical universal set.</p></div>
          <div class="rounded-md border border-border bg-background p-4"><strong class="text-foreground">5. Point-in-time + oracle independence.</strong><p class="mt-1">Candidate-visible inputs must satisfy feature_available_at ≤ prediction_time and must not use response, hidden outcome probability, latent oracle state, evaluation truth, or future reward.</p></div>
          <div class="rounded-md border border-border bg-background p-4"><strong class="text-foreground">6. Preserve historical evidence.</strong><p class="mt-1">RC4 remains immutable. Repair through a new versioned release candidate rather than changing the historical release in place.</p></div>
        </div>
      </div>

      <details class="group rounded-md border border-border bg-background">
        <summary class="cursor-pointer list-none p-4 font-semibold text-foreground">Candidate-Set Readiness Gate — G2.1 A–I</summary>
        <div class="space-y-2 border-t border-border p-4">
          <p><strong class="text-foreground">A — Candidate Multiplicity:</strong> normal decisions expose a bounded multi-offer set and candidate-count distribution is reported.</p>
          <p><strong class="text-foreground">B — Candidate Before Selection:</strong> candidate generation occurs before ranking/selection and never uses selected, exposed, response, or oracle truth.</p>
          <p><strong class="text-foreground">C — Exposure Membership:</strong> every exposed offer must exist in that decision's eligible candidate set.</p>
          <p><strong class="text-foreground">D — Candidate Diversity:</strong> alternatives must differ meaningfully by offer ID and relevant category, price, quota, or offer characteristics.</p>
          <p><strong class="text-foreground">E — Ranking Opportunity:</strong> at least two alternatives have distinguishable customer × offer interactions and ordering can vary by context.</p>
          <p><strong class="text-foreground">F — Point-in-Time Integrity:</strong> all visible features satisfy feature_available_at ≤ prediction_time.</p>
          <p><strong class="text-foreground">G — Oracle / Outcome Independence:</strong> no response state, hidden probability, latent oracle variable, answer-key coefficient, evaluation truth, or future outcome leaks into candidates.</p>
          <p><strong class="text-foreground">H — Selected / Exposure Cardinality:</strong> multiple candidates, exactly one selected offer, and one exposure per decision by default.</p>
          <p><strong class="text-foreground">I — Release Evidence:</strong> Data Team publishes multiplicity, diversity, membership, ranking-opportunity, point-in-time, leakage, and cardinality checks before handoff.</p>
        </div>
      </details>
    </div>
  `
  return decision
}

function createStepsDone() {
  const steps = document.createElement("details")
  steps.dataset.exp2StepsDone = "true"
  steps.className = "group rounded-lg border border-sky-500/30 bg-sky-500/5"
  steps.innerHTML = `
    <summary class="cursor-pointer list-none p-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <span class="font-semibold text-foreground">Steps we did after the issue was found</span>
        <span class="rounded-full border border-sky-600/35 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-900 dark:text-sky-100">Executed / established evidence</span>
      </div>
    </summary>
    <div class="space-y-4 border-t border-border p-5 text-sm leading-7 text-muted-foreground">
      <div class="grid gap-3 md:grid-cols-2">
        <div class="rounded-md border border-border bg-background p-4"><strong class="text-foreground">1. Ran candidate-set sanity checks in Databricks.</strong><p class="mt-1">Modeling Phase 1 inspected the released candidate table before model training.</p></div>
        <div class="rounded-md border border-border bg-background p-4"><strong class="text-foreground">2. Quantified candidate multiplicity.</strong><p class="mt-1">4,800 decisions, 4,800 candidate rows; min = max = average = 1 candidate and 1 eligible candidate per decision.</p></div>
        <div class="rounded-md border border-border bg-background p-4"><strong class="text-foreground">3. Reconciled candidates to exposure.</strong><p class="mt-1">4,800 exposures matched the sole candidate; candidate/exposure mismatch = 0.</p></div>
        <div class="rounded-md border border-border bg-background p-4"><strong class="text-foreground">4. Stopped before model training.</strong><p class="mt-1">The team did not train a model or claim NBO ranking from RC4 after discovering that the released data had no alternative offer set.</p></div>
        <div class="rounded-md border border-border bg-background p-4"><strong class="text-foreground">5. Reclassified the problem correctly.</strong><p class="mt-1">The blocker was recorded as data / analytical-contract suitability, not handoff integrity and not model-performance failure.</p></div>
        <div class="rounded-md border border-border bg-background p-4"><strong class="text-foreground">6. Reopened the Data Gate in a targeted way.</strong><p class="mt-1">State changed to TARGETED_DATA_GATE_REOPEN_REQUIRED for candidate-set design only; the full G0–G7 lifecycle was not restarted.</p></div>
        <div class="rounded-md border border-border bg-background p-4"><strong class="text-foreground">7. Defined Experiment 2.1 repair controls.</strong><p class="mt-1">Target flow was defined as 3–8 eligible alternatives per normal decision, one selected/exposed offer, and a fail-closed Candidate-Set Readiness Gate G2.1 A–I.</p></div>
        <div class="rounded-md border border-border bg-background p-4"><strong class="text-foreground">8. Preserved RC4 as historical evidence.</strong><p class="mt-1">RC4 and the MODEL_HANDOFF_READY integrity evidence remain immutable; any repair must be issued as a new versioned release candidate.</p></div>
      </div>
      <div class="rounded-md border border-amber-500/30 bg-amber-500/5 p-4">
        <p class="font-semibold text-foreground">Current state</p>
        <p class="mt-1">DATA_GATE_REOPENED_FOR_CANDIDATE_SET_REPAIR. NBO ranking suitability remains blocked until a repaired release passes the targeted candidate-set gates. No model training has started.</p>
      </div>
    </div>
  `
  return steps
}

export function Experiment2CandidateDecisionInjector() {
  useEffect(() => {
    const install = () => {
      const heading = Array.from(document.querySelectorAll<HTMLHeadingElement>("h2")).find(
        (node) => normalizedText(node.textContent) === "Experiment 2 — Data Preparation Status",
      )
      const root = heading?.closest<HTMLDivElement>("div.space-y-10")
      if (!root) return

      const children = Array.from(root.children) as HTMLElement[]
      const originalDecision = children.find(
        (node) =>
          node.tagName === "DETAILS" &&
          normalizedText(node.querySelector(":scope > summary")?.textContent).startsWith("Key Decision — why Behavior Simulation"),
      )
      const flowSection = children.find((node) =>
        Array.from(node.querySelectorAll<HTMLHeadingElement>("h3")).some(
          (title) => normalizedText(title.textContent) === "Data Preparation flow",
        ),
      )
      const referencePrinciples = children.find(
        (node) =>
          node.tagName === "DETAILS" &&
          normalizedText(node.querySelector(":scope > summary")?.textContent).startsWith("Reference Principles"),
      )
      const gatesSection = children.find((node) =>
        Array.from(node.querySelectorAll<HTMLHeadingElement>("h3")).some(
          (title) => normalizedText(title.textContent) === "G0–G7 readiness gates",
        ),
      )
      const supportingGovernance = children.find(
        (node) =>
          node.tagName === "DETAILS" &&
          normalizedText(node.querySelector(":scope > summary")?.textContent) === "Supporting governance controls",
      )

      let bundle = root.querySelector<HTMLDetailsElement>("[data-exp2-flow-bundle]")
      if (!bundle && flowSection && referencePrinciples && gatesSection) {
        bundle = document.createElement("details")
        bundle.dataset.exp2FlowBundle = "true"
        bundle.className = "group rounded-lg border border-border bg-background"

        const summary = document.createElement("summary")
        summary.className = "cursor-pointer list-none p-5 font-semibold text-foreground"
        summary.textContent = "Data Preparation — full flow, principles & G0–G7 gates"

        const body = document.createElement("div")
        body.className = "space-y-8 border-t border-border p-5"
        bundle.append(summary, body)

        const anchor = originalDecision ?? flowSection
        root.insertBefore(bundle, anchor)
        if (originalDecision) body.append(originalDecision)
        body.append(flowSection, referencePrinciples, gatesSection)
        if (supportingGovernance) body.append(supportingGovernance)
      }

      if (!bundle) return
      const bundleBody = bundle.querySelector<HTMLElement>(":scope > div")
      if (bundleBody && originalDecision && originalDecision.parentElement !== bundleBody) bundleBody.prepend(originalDecision)
      if (bundleBody && supportingGovernance && supportingGovernance.parentElement !== bundleBody) bundleBody.append(supportingGovernance)

      const firstSection = root.querySelector<HTMLElement>(":scope > section:first-child")
      const introStrong = firstSection?.querySelector<HTMLElement>("strong")
      if (introStrong && normalizedText(introStrong.textContent) === "Key decision:") {
        introStrong.textContent = "Data-preparation principle:"
      }

      let decision = root.querySelector<HTMLDetailsElement>("[data-exp2-candidate-decision]")
      if (!decision) decision = createCandidateDecision()
      if (decision.previousElementSibling !== bundle) bundle.insertAdjacentElement("afterend", decision)

      let steps = root.querySelector<HTMLDetailsElement>("[data-exp2-steps-done]")
      if (!steps) steps = createStepsDone()
      if (steps.previousElementSibling !== decision) decision.insertAdjacentElement("afterend", steps)
    }

    const scheduleInstall = () => {
      install()
      window.setTimeout(install, 50)
      window.setTimeout(install, 200)
      window.setTimeout(install, 600)
    }

    scheduleInstall()
    const observer = new MutationObserver(scheduleInstall)
    observer.observe(document.body, { childList: true, subtree: true })

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.closest("button")) scheduleInstall()
    }
    document.addEventListener("click", handleClick, true)
    document.addEventListener("visibilitychange", scheduleInstall)

    return () => {
      observer.disconnect()
      document.removeEventListener("click", handleClick, true)
      document.removeEventListener("visibilitychange", scheduleInstall)
    }
  }, [])

  return null
}
