"use client"

import { useEffect } from "react"

function normalizedText(value: string | null | undefined) {
  return (value ?? "").replace(/\s+/g, " ").trim()
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

      if (flowSection && referencePrinciples && gatesSection && !root.querySelector("[data-exp2-flow-bundle]")) {
        const bundle = document.createElement("details")
        bundle.dataset.exp2FlowBundle = "true"
        bundle.className = "group rounded-lg border border-border bg-background"

        const summary = document.createElement("summary")
        summary.className = "cursor-pointer list-none p-5 font-semibold text-foreground"
        summary.textContent = "Data Preparation flow — steps, reference principles & G0–G7 gates"

        const body = document.createElement("div")
        body.className = "space-y-8 border-t border-border p-5"

        bundle.append(summary, body)
        root.insertBefore(bundle, flowSection)
        body.append(flowSection, referencePrinciples, gatesSection)
      }

      const bundle = root.querySelector<HTMLElement>("[data-exp2-flow-bundle]")
      if (!bundle || root.querySelector("[data-exp2-candidate-decision]")) return

      const decision = document.createElement("details")
      decision.dataset.exp2CandidateDecision = "true"
      decision.className = "group rounded-lg border border-amber-500/35 bg-amber-500/5"
      decision.innerHTML = `
        <summary class="cursor-pointer list-none p-5">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <span class="font-semibold text-foreground">Key decision — change in candidate set</span>
            <span class="rounded-full border border-amber-600/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-900 dark:text-amber-100">Experiment 2.1 · Targeted Data Gate reopen</span>
          </div>
        </summary>
        <div class="space-y-6 border-t border-border p-5 text-sm leading-7 text-muted-foreground">
          <div class="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
            <p class="font-semibold text-foreground">What the Databricks sanity check found</p>
            <p class="mt-2 font-mono text-xs text-foreground sm:text-sm">4,800 decisions → 4,800 candidate rows → exactly 1 eligible candidate per decision</p>
            <p class="mt-2">A second check found 4,800 exposures, all matching the sole candidate, with zero candidate/exposure mismatches.</p>
          </div>

          <div class="grid gap-4 lg:grid-cols-2">
            <div class="rounded-lg border border-border bg-background p-4">
              <p class="font-semibold text-foreground">Why this changes the experiment</p>
              <p class="mt-2">A response-propensity model could still estimate whether the customer may accept the already-provided offer, but it cannot prove <strong class="text-foreground">Next Best Offer ranking</strong> when there are no alternative eligible offers inside the same decision request.</p>
              <p class="mt-2">With one candidate, the system has no competitive choice set and cannot demonstrate “Offer A vs Offer B vs Offer C → choose the best.”</p>
            </div>
            <div class="rounded-lg border border-border bg-background p-4">
              <p class="font-semibold text-foreground">Decision</p>
              <p class="mt-2 font-semibold text-amber-800 dark:text-amber-200">CANDIDATE SET DESIGN REPAIR / EXPERIMENT 2.1</p>
              <p class="mt-2">This is a targeted Data Gate reopen discovered before training. It is a data / analytical-contract repair—not a model-performance repair and not a restart of the full G0–G7 lifecycle.</p>
            </div>
          </div>

          <div class="rounded-lg border border-border bg-muted/20 p-4">
            <p class="font-semibold text-foreground">Required target flow</p>
            <p class="mt-2 font-mono text-xs text-foreground sm:text-sm">1 decision → 3–8 eligible candidates → customer × offer interactions → ranking opportunity → 1 selected / exposed offer → response</p>
            <p class="mt-2">Exposure semantics stay bounded: only the selected action is exposed unless a separately approved multi-exposure contract is introduced.</p>
          </div>

          <div>
            <p class="font-semibold text-foreground">Principles used in the decision</p>
            <div class="mt-3 grid gap-3 md:grid-cols-2">
              <div class="rounded-md border border-border bg-background p-4"><strong class="text-foreground">1. Inspect before training.</strong><p class="mt-1">Use model-ready sanity checks to expose semantic gaps before optimizing metrics or starting MLflow training.</p></div>
              <div class="rounded-md border border-border bg-background p-4"><strong class="text-foreground">2. Candidate must exist before selection.</strong><p class="mt-1">Customer + Context → Eligibility → Candidate Set → Ranking / Selection → Exposure. Candidate generation must not depend on the already-selected or exposed offer.</p></div>
              <div class="rounded-md border border-border bg-background p-4"><strong class="text-foreground">3. Candidate ≠ Selected ≠ Exposed ≠ Accepted.</strong><p class="mt-1">Keep the decision lifecycle semantically separate so selection is not mistaken for treatment or customer response.</p></div>
              <div class="rounded-md border border-border bg-background p-4"><strong class="text-foreground">4. Multiplicity must be meaningful.</strong><p class="mt-1">Normal ranking decisions need roughly 3–8 eligible, substantively distinct alternatives—not duplicated rows or a universal identical set.</p></div>
              <div class="rounded-md border border-border bg-background p-4"><strong class="text-foreground">5. Point-in-time and oracle independence.</strong><p class="mt-1">Candidate-visible inputs must satisfy feature_available_at ≤ prediction_time and must not use response, hidden probability, latent oracle state, evaluation truth, or future outcome information.</p></div>
              <div class="rounded-md border border-border bg-background p-4"><strong class="text-foreground">6. Preserve historical evidence.</strong><p class="mt-1">RC4 remains immutable. Repair through a new versioned release candidate rather than patching the historical release in place.</p></div>
            </div>
          </div>

          <details class="group rounded-md border border-border bg-background">
            <summary class="cursor-pointer list-none p-4 font-semibold text-foreground">Candidate-Set Readiness Gate — G2.1 A–I</summary>
            <div class="space-y-2 border-t border-border p-4">
              <p><strong class="text-foreground">A — Candidate Multiplicity:</strong> normal decisions expose a bounded multi-offer set; report candidate-count distribution and exceptions.</p>
              <p><strong class="text-foreground">B — Candidate Before Selection:</strong> generation occurs before ranking/selection and never uses selected, exposed, response, or oracle truth.</p>
              <p><strong class="text-foreground">C — Exposure Membership:</strong> every exposed offer must belong to that decision's eligible candidate set.</p>
              <p><strong class="text-foreground">D — Candidate Diversity:</strong> alternatives must differ meaningfully by offer ID and relevant category/price/quota characteristics.</p>
              <p><strong class="text-foreground">E — Ranking Opportunity:</strong> at least two alternatives have distinguishable customer × offer interactions and ordering can vary by customer/context.</p>
              <p><strong class="text-foreground">F — Point-in-Time Integrity:</strong> all visible features satisfy feature_available_at ≤ prediction_time.</p>
              <p><strong class="text-foreground">G — Oracle / Outcome Independence:</strong> no response state, hidden outcome probability, latent oracle variable, answer-key coefficient, or future reward leaks into candidates.</p>
              <p><strong class="text-foreground">H — Selected / Exposure Cardinality:</strong> multiple candidates, exactly one selected offer and one exposure per decision by default.</p>
              <p><strong class="text-foreground">I — Release Evidence:</strong> Data Team must publish candidate multiplicity, diversity, membership, ranking-opportunity, point-in-time, leakage, and cardinality checks before handoff.</p>
            </div>
          </details>

          <div class="rounded-lg border border-slate-500/30 bg-slate-500/5 p-4">
            <p class="font-semibold text-foreground">Current boundary</p>
            <p class="mt-2">The historical MODEL_HANDOFF_READY evidence remains valid for RC4 handoff integrity, but NBO ranking suitability is blocked. Do not train or claim NBO ranking performance until Experiment 2.1 is versioned, released, and passes the targeted candidate-set gates.</p>
          </div>
        </div>
      `

      bundle.insertAdjacentElement("afterend", decision)
    }

    install()
    const observer = new MutationObserver(install)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return null
}
