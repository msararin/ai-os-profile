"use client"

import { useEffect } from "react"

function normalizedText(value: string | null | undefined) {
  return (value ?? "").replace(/\s+/g, " ").trim()
}

function createOverallStatus() {
  const section = document.createElement("section")
  section.dataset.exp2OverallStatus = "true"
  section.className = "rounded-xl border border-border bg-background p-5 sm:p-6"
  section.innerHTML = `
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h3 class="text-xl font-semibold text-foreground">Experiment 2 — Overall Status</h3>
      <span class="inline-flex items-center rounded-full border border-amber-600/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-900 dark:text-amber-100">GENERALIZATION ISSUE CHARACTERIZED</span>
    </div>

    <div class="mt-5 space-y-5 text-sm leading-7 text-muted-foreground">
      <div class="rounded-lg border border-emerald-600/25 bg-emerald-500/5 p-4">
        <p class="font-semibold text-foreground">Data preparation / handoff — Complete</p>
        <ul class="mt-2 list-disc space-y-1 pl-5">
          <li>RC1 candidate set repaired</li>
          <li>Databricks readback passed</li>
          <li>Temporal / leakage / exposure checks passed</li>
          <li>Training table and preprocessed table are ready</li>
        </ul>
      </div>

      <div class="grid gap-4 lg:grid-cols-3">
        <div class="rounded-lg border border-emerald-600/25 bg-emerald-500/5 p-4">
          <p class="font-semibold text-foreground">1. Feature engineering / split — Complete</p>
          <ul class="mt-2 list-disc space-y-1 pl-5">
            <li>Primary temporal split locked</li>
            <li>TRAIN <strong class="text-foreground">3,768</strong> / TEST <strong class="text-foreground">1,032</strong></li>
            <li>Spark-native preprocessing fit on <strong class="text-foreground">TRAIN only</strong> passed</li>
            <li>Leakage preflight passed</li>
          </ul>
        </div>

        <div class="rounded-lg border border-emerald-600/25 bg-emerald-500/5 p-4">
          <p class="font-semibold text-foreground">2. Baseline training — Complete</p>
          <ul class="mt-2 list-disc space-y-1 pl-5">
            <li>Spark ML Logistic Regression trained successfully</li>
            <li>TEST scoring completed successfully</li>
            <li>Experiment 2 now has <strong class="text-foreground">actual model training evidence</strong></li>
          </ul>
        </div>

        <div class="rounded-lg border border-amber-600/30 bg-amber-500/5 p-4">
          <p class="font-semibold text-foreground">3. Model evaluation — Generalization issue characterized</p>
          <ul class="mt-2 list-disc space-y-1 pl-5">
            <li>TRAIN ROC-AUC ≈ <strong class="text-foreground">0.625</strong></li>
            <li>TEST ROC-AUC ≈ <strong class="text-foreground">0.449</strong></li>
            <li>TEST PR-AUC ≈ <strong class="text-foreground">0.071</strong>, close to the random baseline</li>
            <li>The default classification threshold predicts every TEST row as negative</li>
          </ul>
        </div>
      </div>

      <div class="rounded-lg border border-amber-600/30 bg-amber-500/5 p-4">
        <p class="font-semibold text-foreground">Investigation conclusion</p>
        <ul class="mt-2 list-disc space-y-1 pl-5">
          <li>Some feature input distributions are relatively stable, but the <strong class="text-foreground">feature → outcome relationship is not stable between TRAIN and TEST</strong></li>
          <li>After inspecting the generator, there is <strong class="text-foreground">no evidence that time is an explicit rule directly creating concept drift</strong></li>
          <li>First-pass screening does not support policy-version change, major cohort shift, response-timing shift, or Logistic Regression simplicity as the primary explanation</li>
          <li><code>Temporal concept drift</code> was not established as the causal mechanism</li>
        </ul>
      </div>

      <details class="rounded-lg border border-border bg-muted/20">
        <summary class="cursor-pointer list-none p-4 font-semibold text-foreground">Root-cause investigation — hypothesis results</summary>
        <div class="space-y-4 border-t border-border p-4">
          <div>
            <p class="font-semibold text-foreground">H1 · Selection-policy effect — Not supported by policy-version change</p>
            <p>TRAIN and TEST both used <code>synthetic-decision-time-heuristic-v1</code>. Candidate-set repair fixed the ranking-structure blocker, but did not solve model generalization.</p>
          </div>

          <div>
            <p class="font-semibold text-foreground">H2 · Hidden / latent generator-side effect — Not supported as primary</p>
            <p><code>outcome_probability_assumption</code> carries modest label signal, but the positive-vs-negative separation remains present in both TRAIN and TEST rather than collapsing at the temporal boundary.</p>
          </div>

          <div>
            <p class="font-semibold text-foreground">H3 · Response-funnel effect — Partially supported, not primary</p>
            <p>ACCEPTED rises from <strong class="text-foreground">5.33%</strong> in TRAIN to <strong class="text-foreground">7.17%</strong> in TEST, while CLICKED / VIEWED / IGNORED shares and response timing remain broadly stable.</p>
          </div>

          <div>
            <p class="font-semibold text-foreground">H4 · Sampling / cohort effect — Not supported as primary</p>
            <p>Checked device capability, subscriber type, tenure, spend, usage, utilization and contract-duration composition remain broadly stable across TRAIN and TEST.</p>
          </div>

          <div>
            <p class="font-semibold text-foreground">H5 · Model specification / nonlinear interactions — Not supported as primary</p>
            <div class="mt-2 overflow-x-auto">
              <table class="w-full min-w-[620px] text-left text-xs">
                <thead class="bg-muted/50">
                  <tr><th class="p-2">Model</th><th class="p-2">TRAIN ROC-AUC</th><th class="p-2">TRAIN PR-AUC</th><th class="p-2">TEST ROC-AUC</th><th class="p-2">TEST PR-AUC</th></tr>
                </thead>
                <tbody class="divide-y divide-border">
                  <tr><th class="p-2 text-foreground">Logistic Regression</th><td class="p-2">~0.625</td><td class="p-2">~0.085</td><td class="p-2">~0.449</td><td class="p-2">~0.071</td></tr>
                  <tr><th class="p-2 text-foreground">Random Forest</th><td class="p-2">0.8302</td><td class="p-2">0.4288</td><td class="p-2">0.4667</td><td class="p-2">0.0673</td></tr>
                  <tr><th class="p-2 text-foreground">GBT</th><td class="p-2">0.8716</td><td class="p-2">0.4224</td><td class="p-2">0.4966</td><td class="p-2">0.0730</td></tr>
                </tbody>
              </table>
            </div>
            <p class="mt-2">RF and GBT learn much stronger TRAIN discrimination, but the gain does not generalize. GBT reaches only approximately random TEST ROC-AUC; RF remains below random. Increasing complexity alone does not solve the future-period failure.</p>
          </div>

          <div class="rounded-md border border-amber-600/30 bg-amber-500/5 p-3">
            <p class="font-semibold text-foreground">Current synthesis</p>
            <p>The held-out generalization failure is established and the main candidate explanations were screened, but no single causal mechanism was proven. The supervised baseline is therefore retained as <strong class="text-foreground">diagnostic evidence rather than promoted</strong>. Its learning informed the move into the separate policy-learning lanes used in Experiment 2B and Experiment 3.</p>
          </div>
        </div>
      </details>
    </div>
  `
  return section
}

export function Experiment2OverallStatusInjector() {
  useEffect(() => {
    const install = () => {
      const heading = Array.from(document.querySelectorAll<HTMLHeadingElement>("h2")).find(
        (node) => normalizedText(node.textContent) === "Experiment 2 — Data Preparation Status",
      )
      if (!heading) return

      const root = heading.closest<HTMLDivElement>("div.space-y-10")
      if (!root || root.querySelector("[data-exp2-overall-status]")) return

      const introSection = heading.closest<HTMLElement>("section")
      if (!introSection) return
      introSection.insertAdjacentElement("afterend", createOverallStatus())
    }

    install()
    const observer = new MutationObserver(install)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return null
}
