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
      <span class="inline-flex items-center rounded-full border border-amber-600/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-900 dark:text-amber-100">BASELINE UNDER INVESTIGATION</span>
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
          <p class="font-semibold text-foreground">3. Model evaluation — Issue found; investigation in progress</p>
          <ul class="mt-2 list-disc space-y-1 pl-5">
            <li>TRAIN ROC-AUC ≈ <strong class="text-foreground">0.625</strong></li>
            <li>TEST ROC-AUC ≈ <strong class="text-foreground">0.449</strong></li>
            <li>TEST PR-AUC ≈ <strong class="text-foreground">0.071</strong>, close to the random baseline</li>
            <li>The default classification threshold predicts every TEST row as negative</li>
          </ul>
        </div>
      </div>

      <div class="rounded-lg border border-amber-600/30 bg-amber-500/5 p-4">
        <p class="font-semibold text-foreground">Investigation status</p>
        <ul class="mt-2 list-disc space-y-1 pl-5">
          <li>Some feature input distributions are relatively stable, but the <strong class="text-foreground">feature → outcome relationship is not stable between TRAIN and TEST</strong></li>
          <li>After inspecting the generator, there is <strong class="text-foreground">no evidence yet that time is an explicit rule directly creating concept drift</strong></li>
          <li>The current hypothesis points more toward the interaction of <strong class="text-foreground">selection policy + hidden latent variables + response funnel + sampling effects</strong></li>
          <li>Do not claim <code>temporal concept drift</code> until the causal mechanism is isolated or the drift pattern can be reproduced clearly</li>
        </ul>
      </div>
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
